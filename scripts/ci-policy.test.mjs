import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';

const workflowDirectory = new URL('../.github/workflows/', import.meta.url);

function readWorkflow(fileName) {
  const source = readFileSync(new URL(fileName, workflowDirectory), 'utf8');
  const workflow = parse(source);

  assert.ok(workflow && typeof workflow === 'object', `${fileName} must contain a workflow`);
  return workflow;
}

function allSteps(workflow) {
  return Object.values(workflow.jobs ?? {}).flatMap((job) => job.steps ?? []);
}

function runCommands(job) {
  return (job.steps ?? []).map((step) => step.run ?? '').filter(Boolean);
}

function stepIndex(job, pattern) {
  return (job.steps ?? []).findIndex((step) =>
    pattern.test(`${step.name ?? ''}\n${step.run ?? ''}\n${step.uses ?? ''}`),
  );
}

test('main-bound PRs run the full suite without builds, deploys, or privileged access', () => {
  const workflow = readWorkflow('firebase-hosting-pull-request.yml');
  const events = workflow.on;
  const testJob = Object.values(workflow.jobs ?? {}).find((job) => job.name === 'Portfolio tests');

  assert.deepEqual(events, { pull_request: { branches: ['main'] } });
  assert.deepEqual(events.pull_request.branches, ['main']);
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  assert.ok(testJob, 'the stable Portfolio tests check must exist');
  assert.match(testJob.if, /github\.event\.pull_request\.base\.ref\s*==\s*'main'/);
  assert.equal(workflow.concurrency['cancel-in-progress'], true);
  assert.match(workflow.concurrency.group, /github\.event\.pull_request\.number/);

  const commands = runCommands(testJob);
  assert.ok(commands.some((command) => command.trim() === 'npm ci'));
  assert.ok(commands.some((command) =>
    command.trim() === 'npm test -- --watch=false --browsers=ChromeHeadless',
  ));
  assert.equal(commands.some((command) => /npm run build|ng build/.test(command)), false);
  assert.equal(
    allSteps(workflow).some((step) => /FirebaseExtended\/action-hosting-deploy/i.test(step.uses ?? '')),
    false,
  );
  assert.doesNotMatch(JSON.stringify(workflow), /pull_request_target|FIREBASE_SERVICE_ACCOUNT|secrets\.GITHUB_TOKEN/);
  assert.equal(
    Object.values(workflow.jobs).some((job) => /head\.repo\.full_name/.test(job.if ?? '')),
    false,
    'fork PRs must not be excluded from the check',
  );
});

test('main pushes run tests before a production build and never deploy', () => {
  const workflow = readWorkflow('firebase-hosting-merge.yml');
  const events = workflow.on;
  const validation = Object.values(workflow.jobs ?? {})[0];
  const commands = runCommands(validation);

  assert.deepEqual(Object.keys(events), ['push']);
  assert.deepEqual(events.push.branches, ['main']);
  assert.match(validation.if ?? '', /refs\/heads\/main/);
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  assert.ok(commands.some((command) => command.trim() === 'npm ci'));
  assert.ok(commands.some((command) =>
    command.trim() === 'npm test -- --watch=false --browsers=ChromeHeadless',
  ));
  assert.ok(commands.some((command) => command.trim() === 'npm run build'));
  assert.ok(
    stepIndex(validation, /npm test/) < stepIndex(validation, /npm run build/),
    'the build must follow the full suite',
  );
  assert.equal(
    allSteps(workflow).some((step) => /FirebaseExtended\/action-hosting-deploy/i.test(step.uses ?? '')),
    false,
  );
  assert.doesNotMatch(JSON.stringify(workflow), /FIREBASE_SERVICE_ACCOUNT|secrets\.GITHUB_TOKEN|always\(\)|continue-on-error/);
});

test('manual publication rejects other refs and deploys only the captured, fresh main build', () => {
  const workflow = readWorkflow('firebase-hosting-manual.yml');
  const events = workflow.on;
  const validation = workflow.jobs['validate-ref'];
  const publication = workflow.jobs.publish;
  const rejection = validation.steps[0];
  const checkout = publication.steps.find((step) => step.uses?.startsWith('actions/checkout@'));
  const freshness = publication.steps.find((step) => step.uses?.startsWith('actions/github-script@'));
  const deploy = publication.steps.find((step) =>
    step.uses?.startsWith('FirebaseExtended/action-hosting-deploy@'),
  );
  const deployIndex = publication.steps.indexOf(deploy);

  assert.deepEqual(Object.keys(events), ['workflow_dispatch']);
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  assert.equal(workflow.concurrency.group, 'findsid-firebase-live-publication');
  assert.match(rejection.if, /github\.ref\s*!=\s*'refs\/heads\/main'/);
  assert.match(rejection.run, /::error::/);
  assert.match(rejection.run, /exit 1/);
  assert.ok(!/npm ci|npm test|npm run build/.test(rejection.run));
  assert.ok(publication.needs.includes('validate-ref'));
  assert.match(publication.if, /github\.ref\s*==\s*'refs\/heads\/main'/);
  assert.equal(checkout.with.ref, '${{ github.sha }}');
  assert.ok(runCommands(publication).some((command) => command.trim() === 'npm ci'));
  assert.ok(runCommands(publication).some((command) =>
    command.trim() === 'npm test -- --watch=false --browsers=ChromeHeadless',
  ));
  assert.ok(runCommands(publication).some((command) => command.trim() === 'npm run build'));
  assert.ok(freshness, 'a serialized main-head freshness check is required');
  assert.match(freshness.with.script, /getBranch/);
  assert.match(freshness.with.script, /branch:\s*['"]main['"]/);
  assert.match(freshness.with.script, /context\.sha/);
  assert.match(freshness.with.script, /data\.commit\.sha/);
  assert.ok(deployIndex > publication.steps.indexOf(freshness));
  assert.deepEqual(deploy.with, {
    firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_FINDSIDDEV }}',
    channelId: 'live',
    projectId: 'findsiddev',
  });
  assert.equal(
    allSteps(workflow).filter((step) => /FIREBASE_SERVICE_ACCOUNT/.test(JSON.stringify(step))).length,
    1,
    'Firebase credentials must be scoped to the deployment step',
  );
  assert.ok(
    stepIndex(publication, /npm run build/) < deployIndex,
    'deployment must follow a successful build',
  );
  assert.doesNotMatch(JSON.stringify(workflow), /always\(\)|continue-on-error/);
});

test('manual publication freshness check rejects stale revisions and surfaces lookup failures', async () => {
  const workflow = readWorkflow('firebase-hosting-manual.yml');
  const script = workflow.jobs.publish.steps.find((step) =>
    step.uses?.startsWith('actions/github-script@'),
  ).with.script;

  async function runFreshnessCheck(capturedSha, mainSha, lookupError) {
    let failure;
    await runInNewContext(
      `(async () => {\n${script}\n})()`,
      {
        context: { repo: { owner: 'owner', repo: 'repo' }, sha: capturedSha },
        github: {
          rest: {
            repos: {
              getBranch: async ({ branch }) => {
                assert.equal(branch, 'main');
                if (lookupError) throw lookupError;
                return { data: { commit: { sha: mainSha } } };
              },
            },
          },
        },
        core: { setFailed: (message) => { failure = message; } },
      },
    );
    return failure;
  }

  assert.equal(await runFreshnessCheck('same-sha', 'same-sha'), undefined);
  assert.match(await runFreshnessCheck('old-sha', 'new-sha'), /stale revision old-sha.*main is now new-sha/);
  await assert.rejects(
    runFreshnessCheck('captured-sha', undefined, new Error('main lookup failed')),
    /main lookup failed/,
  );
});

test('the npm test command runs semantic policy checks before the Angular suite', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const commands = packageJson.scripts.test.split('&&').map((command) => command.trim());

  assert.deepEqual(commands, [
    'node --test scripts/ci-policy.test.mjs scripts/generate-app-version.test.mjs scripts/generate-lab-records.test.mjs',
    'ng test',
  ]);
});

test('the standalone dependency-review workflow has been removed', () => {
  assert.equal(existsSync(new URL('../.github/workflows/dependency-review.yml', import.meta.url)), false);
});
