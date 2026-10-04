# Tasks: CI Safeguards

**Input**: All artifacts in `specs/012-ci-safeguards/`.
**Authorization**: Implementation requested; repository settings and publication remain
outside this local change.
**Execution order**: First feature for safe redesign PR automation, despite number012.
**Tests**: Semantic real-file policy tests within full suite; behavioral red before YAML
edits, not parser/setup errors. Live acceptance deployment prohibited.

## Phase 1: Setup

- [X] T001 Review current .github/workflows/firebase-hosting-pull-request.yml, firebase-hosting-merge.yml and dependency-review.yml plus constitution; capture existing triggers/stages and preserve worktree, no remote run/settings change yet.
- [X] T002 Obtain owner-controlled migration/settings authorization and coordinate disabling forbidden legacy preview/review automation and queued auto-deploys before migration PR, documenting bootstrap in README.md; no-access or unsafe active runs block remote integration, not a policy waiver.
- [X] T003 Establish engine-compatible Node22/plain npm-ci/ChromeHeadless baseline with necessary karma.conf.js, angular.json, src/test.ts and standalone test setup; diagnose peer/lock incompatibility in package.json/package-lock.json rather than force/legacy-peer-deps.
- [X] T004 Establish runnable Node built-in test/YAML parser setup for scripts/ci-policy.test.mjs; add direct development parser dependency only if needed, no transitive import/new app runner.

## Phase 2: Foundational

- [X] T005 Write semantic policy tests in scripts/ci-policy.test.mjs against every real workflow/job/step and referenced package.json script, covering the complete event/stage matrix, permissions, failure gates, concurrency and captured checkout/output SHA; the freshness lookup uses an API double and no deployment is executed.
- [ ] T006 Observe intended current PR-build/preview/extra-review/main-deploy-without-tests failures in scripts/ci-policy.test.mjs and record in specs/012-ci-safeguards/quickstart.md before YAML edits; fixtures/mutations cannot be the sole oracle for actual wiring.

## Phase 3: US1 - Review Every Main-Bound Change (P1, MVP)

**Independent test**: Complete suite/stable Portfolio tests for all main-bound docs/
dependency/fork PRs, zero full build/deploy/secrets, wrong targets no trigger.

- [X] T007 [US1] Wire Node policy checks then existing Angular suite into package.json npm test with normal forwarded Angular flags/nonzero propagation; prepare package-lock.json compatibility changes without adding independent non-test PR jobs.
- [X] T008 [US1] Replace preview .github/workflows/firebase-hosting-pull-request.yml with pull_request main base filter plus matching guard, read-only permissions/plain npm ci/full ChromeHeadless suite and stable "Portfolio tests"; no path/fork exclusion/pull_request_target/build/deploy artifacts/Firebase secrets.
- [X] T009 [US1] Add PR-number-scoped cancel-in-progress grouping to .github/workflows/firebase-hosting-pull-request.yml; new revisions cancel obsolete tests without cancelling other PRs.
- [X] T010 [US1] Remove .github/workflows/dependency-review.yml and obsolete check references in README.md; verify full test-suite command still covers policy/app tests for docs/dependency/fork categories.
- [ ] T011 [US1] With later approved settings access, require current-revision Portfolio tests/PR merges on main, disallow routine bypass/force-push/deletion and verify actual blocked failing PR; record settings evidence in specs/012-ci-safeguards/quickstart.md, absent access blocks completion.
- [ ] T012 [US1] Verify actual no-deploy PR run/fork approval/default-branch settings and no unsupported merge queue via README.md migration guide; pending approval isn't green, queue needs disabling coordination or separate approved event policy.

## Phase 4: US2 - Validate Without Automatic Publication (P1)

**Independent test**: Main push tests then production build only; non-main pushes
no pipeline, failures stop later stages.

- [ ] T013 [US2] Confirm T005-T006 tests explicitly reject existing push auto-deploy/no-test gates and wrong-branch triggers in scripts/ci-policy.test.mjs before main YAML changes.
- [X] T014 [US2] Change .github/workflows/firebase-hosting-merge.yml to main push filter/guard, full suite followed only on success by production build; remove Firebase action/secrets, no always/continue-on-error bypass or automatic publication.
- [ ] T015 [US2] Verify install/test failure blocks build, main success permits build and non-main push triggers nothing with scripts/ci-policy.test.mjs; inspect actual permitted main no-deploy CI evidence later in specs/012-ci-safeguards/quickstart.md.

## Phase 5: US3 - Publish Explicitly Approved Revision (P1)

**Independent test**: Manual main-only captured-SHA fresh validation/build/output,
serialized freshness/credential gate; no failed/stale/non-main request publishes.

- [ ] T016 [US3] Add/observe missing-manual-workflow acceptance failures in scripts/ci-policy.test.mjs for rejected refs, old/new ordering, stale rerun, failed head lookup/credentials/test/build/provider before publication YAML exists.
- [X] T017 [US3] Add .github/workflows/firebase-hosting-manual.yml with workflow_dispatch explicit main-ref rejection before install/tests, immutable github.sha checkout and fresh full tests -> production build; no arbitrary user input ref/cross-run output.
- [X] T018 [US3] Serialize entire manual run with one static repository-wide concurrency group/cancel-in-progress false in .github/workflows/firebase-hosting-manual.yml; no interrupting active provider transaction, pending replacement visible not guaranteed ordering.
- [X] T019 [US3] Add serialized immediate predeploy read-only remote-main SHA comparison in .github/workflows/firebase-hosting-manual.yml; mismatch/lookup failure explicit failure, reruns keep captured SHA, new request required rather than rebuild latest.
- [X] T020 [US3] Add success-gated existing live Firebase deploy of same-run dist/findsid/browser with step-scoped credentials in .github/workflows/firebase-hosting-manual.yml; missing/invalid credentials fail, no auto retry/always/continue-on-error/secret logs/PR preview.
- [ ] T021 [US3] Validate ordering/failure/ref/secret/SHA policy with provider doubles and violating mutations in scripts/ci-policy.test.mjs; no live deployment for acceptance or publication permission from task completion.
- [X] T022 [US3] Document owner dispatch/default-branch availability/complete-redesign approval and explicit failed/stale outcome guide in README.md; first live deployment remains gated by013 final approval.

## Phase 6: Polish and Cross-Cutting

- [X] T023 Run full suite including scripts/ci-policy.test.mjs, inspect all .github/workflows/ for hidden non-test PR/build/deploy paths and confirm ordinary npm flags/generator hooks remain composable in package.json.
- [ ] T024 Record red-green/real PR-main observations/settings/bootstrap evidence in specs/012-ci-safeguards/quickstart.md; no declared safeguards completion without actual protection, no publication or version bump.

## Dependencies and Execution Order

No feature implementation prerequisite. Setup -> whole-matrix behavioral red ->
US1 -> US2 -> US3 -> polish. YAML phases may have individually passing targeted
assertions while full policy suite remains red until all workflows are aligned.
Never disable/skip failing policy tests to declare an intermediate feature complete.
012 verified safeguards precede redesign PR automation for001-011.013 waits for012
settings and no-deploy validation, not a live test deployment.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-005; SC-001 | T005-T010, T012, T023 |
| FR-002; SC-002 | T005-T006, T008, T013-T017, T021 |
| FR-003; SC-003 | T005-T006, T013-T015 |
| FR-004; SC-004 | T016-T017, T019-T022 |
| FR-006; SC-006 | T002, T011-T012, T024 |
| FR-007 | T005-T006, T008, T016, T020-T021 |
| FR-008 | T005-T007, T014-T017, T019-T021 |
| FR-009; SC-005 | T005-T006, T009, T016, T018-T019, T021 |
| FR-010, FR-011, FR-012 | T001-T006, T016, T021, T023-T024 |

## Parallel Examples

US1 PR-category fixture evaluations can run independently after T006; package wiring,
PR YAML and settings migration are serial. US2 event/failure fixtures independent
after T014. US3 stale/ref/credential/overlap doubles can run independently after T020;
one manual YAML writer, shared scripts/lockfile edits serialize.

## Implementation Strategy

US1 PR-only check is development MVP, but remote migration needs full safeguards
before old main automation can publish. Complete all stages/settings evidence; the
CI feature prepares manual deployment and never invokes it during acceptance.

## Execution Status

**Update2026-10-04**: T002/T003/T023 are complete with individual current evidence
and preserved historical dispositions in quickstart.md. Owner-approved main
protection is configured/read-back verified after the owner made the repository
public. T011 is only partially satisfied: actual failing-PR blockage is still
required. T012/T015/T024 and historical/mutation/provider evidence remain open.
The older status below describes the initial local implementation, not current
browser availability or authorization.

Local implementation completed: T001, T004-T005, T007-T010, T014, T017-T020 and T022.
Remaining tasks are intentionally unchecked where they need owner-controlled migration
authorization/settings or live GitHub evidence (T002, T011-T012, T015, T024), a
ChromeHeadless browser unavailable in this environment (T003, T023), or additional
baseline/mutation/provider-double evidence beyond the local semantic and freshness
tests (T006, T013, T016, T021). No remote workflow was run, settings changed, or
publication attempted.
