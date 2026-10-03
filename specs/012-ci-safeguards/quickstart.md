# Validation Guide: CI Safeguards

Local implementation and dependency installation are complete. This guide records
local validation and remaining owner-controlled acceptance; no remote workflow was
triggered, repository setting changed or deployment attempted.

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
