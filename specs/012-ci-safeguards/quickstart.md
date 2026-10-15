# Validation Guide: CI Safeguards

Local implementation and dependency installation are complete. This guide records
local validation and remaining owner-controlled acceptance. Approved main protection
was configured on2026-10-04; no remote workflow was triggered or deployment attempted.

## Public Repository Safeguards (2026-10-04)

The owner made the repository public and requested continuing the previously
approved safeguards configuration. Authenticated API inspection verified public
visibility, default branch main and administrative permission. Before changes,
main was unprotected and no rulesets existed. Protection was applied and independently
read back through `/branches/main/protection`:

| Setting | Verified value |
|---------|----------------|
| Required check | Portfolio tests, GitHub Actions app15368 |
| Up-to-date branch requirement | Enabled (`strict: true`) |
| Pull request requirement | Enabled; zero mandatory reviewers for this owner-operated repository |
| Administrator enforcement | Enabled |
| PR bypass allowances | None |
| Force pushes / branch deletion | Both prohibited |
| Merge queue | No configured ruleset/queue; only exact-main classic protection |

The provider rejected the combined create/checks API payload with422. Creating
protection using its contexts schema, then updating required checks to pin app15368,
succeeded. Final read-back confirms the exact intended policy; rejected requests
are not treated as successful settings evidence.

Exactly three remote workflows are active: Portfolio tests, Validate main and
Publish to Firebase Hosting. The manual workflow is present on the default branch.
Queued and in-progress run queries both returned empty; no legacy run needed
cancellation. Repository automatic merging is disabled. Fork contributor approval
is `first_time_contributors`; pending approval is not a passing check. No merge,
commit, branch push, workflow dispatch, tag, release or deployment was performed.

The current working tree based on `972fa11a1bb3a1339b251c814b401789fc08c0e1`
passes191 Jasmine and12 Node checks (`release-public-protection-green.log`).
Plain npm-ci success from the original setup remains recorded below; current Node22
and the existing ChromeHeadless153.0.8010.12 binary provide a runnable baseline.
No dependency reinstall, bypass flags or non-main production build was needed.
All three local workflow files were inspected; no other workflow or independent
non-test PR job exists, and ordinary forwarded npm flags/generator hooks still work.

Task dispositions: T002's approved migration/bootstrap coordination is now verified
against current remote workflows/settings/run state, not claimed to have preceded
the already-existing remote migration. T003's current substantive runnable-baseline
requirement is satisfied; its original unavailable-browser evidence remains below.
Any missing historical chronology for that already-implemented setup is disposed
under constitution2.0.0's approved exception, not represented as original red.
T023's complete-suite/local-workflow inspection requirement is satisfied.

T011 remains incomplete: configured protection is verified, but an actual failing
main-bound PR blocked from merging has not been observed. No main-bound PR exists
in the inspected current evidence and settings authorization does not authorize
creating/committing a test PR. T012 still needs actual PR/fork-run acceptance.
Latest main run37142607610 at62f5db7a6f2be1002b931352afaabee3f49cf48c failed tests
and skipped production build, so T015's successful main build is not established.
Historical/mutation/provider-double gates T006/T013/T016/T021 and final T024 remain
open. Public visibility removes the provider-plan restriction, not these gates.

## Prerequisites

Node22 satisfying locked Angular engines (currently ^22.22.3), ChromeHeadless,
normal lock-compatible installation and runnable suite. Owner access needed for main
protection/default-branch checks. Coordinate pausing legacy forbidden automation before
migration PR; prevent old preview/auto-deploy runs defeating publication hold.

## Red-Green Evidence

Semantic tests parse the actual workflow files with the `yaml` development dependency.
Before workflow edits, `node --test scripts/ci-policy.test.mjs` failed on the existing
unfiltered PR trigger, absent main-branch job guard, missing manual-publication workflow,
missing policy-test npm wiring, and existing dependency-review workflow. Inspection of
the original files also confirmed the PR preview/build and main build/deploy without
tests. Parser/setup failures were not used as red evidence.

The pre-change Angular test attempt exposed a test-target configuration error:
`angular.json` supplied `polyfills` as a string although the Angular 22 Karma builder
requires an array. The test target now uses an array. Commands used for local validation:

```sh
npm ci
node --test scripts/ci-policy.test.mjs
npm test -- --watch=false --browsers=ChromeHeadless
```

The full command runs the policy suite before the Angular suite. `npm ci`, the six
semantic policy tests and production build passed. The Angular test bundle compiled,
but Karma could not execute tests because ChromeHeadless is not installed in this
environment. No force/legacy-peer-deps. Do not add a PR production build to prove its
absence.

## Acceptance Matrix

Use [model](data-model.md) and [contract](contracts/automation-contract.md).
Cover docs/dependency/fork PRs, other bases, main/non-main pushes, manual refs, failed
install/tests/build, missing credentials, stale SHA/failed lookup, cancelled old PR
checks and serialized newer/older publication. The main-head API lookup is tested with
a controlled double; a deployment is never executed for acceptance.

Mutations must catch added PR build/secret/preview, broad triggers, skipped tests,
non-main publication, changed checkout/output SHA, bypassed freshness and overlap.

## Settings and CI Evidence

Local workflow and policy-test implementation does not establish repository settings
or live GitHub behavior. After owner-authorized migration, verify stable
current-revision check and main required protection, blocked failing PR, fork approval,
no obsolete dependency-review requirement, no unapproved merge queue, no routine
bypass/force pushes/deletion. Verify main tests/build without publication; use provider
doubles for manual failure/freshness/concurrency and never deploy for acceptance.
Unavailable settings access means incomplete safeguards. Before migration, coordinate
pausing existing preview/deployment automation and queued runs; no remote settings or
workflow run was changed as part of this local implementation.

First live manual publication waits for completed-redesign approval and final version
alignment; no unfinished redesign publication merely to obtain validation evidence.
