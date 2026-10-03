# Validation Guide: CI Safeguards

Later implementation only; do not install, trigger workflows, change settings or deploy
during planning.

## Prerequisites

Node22 satisfying locked Angular engines (currently ^22.22.3), ChromeHeadless,
normal lock-compatible installation and runnable suite. Owner access needed for main
protection/default-branch checks. Coordinate pausing legacy forbidden automation before
migration PR; prevent old preview/auto-deploy runs defeating publication hold.

## Red Before Workflow Edits

Write semantic policy tests against current actual workflows; observe failures for
PR preview/build, extra dependency-review job and main deploy without tests.
Install/parser/browser errors do not count. Intended commands after planned setup:

```sh
npm ci
node --test scripts/ci-policy.test.mjs
npm test -- --watch=false --browsers=ChromeHeadless
```

Planned npm test wiring includes policy suite. No force/legacy-peer-deps. Do not add
a PR production build to prove its absence. Local controlled doubles test stage gates.

## Acceptance Matrix

Use [model](data-model.md) and [contract](contracts/automation-contract.md).
Cover docs/dependency/fork PRs, other bases, main/non-main pushes, manual refs, failed
install/tests/build, missing credentials, stale SHA/failed lookup, cancelled old PR
checks and serialized newer/older publication. Deployment uses a provider double.

Mutations must catch added PR build/secret/preview, broad triggers, skipped tests,
non-main publication, changed checkout/output SHA, bypassed freshness and overlap.

## Settings and CI Evidence

After approved implementation, verify stable current-revision check and main required
protection, blocked failing PR, fork approval, no obsolete dependency-review requirement,
no unapproved merge queue, no routine bypass/force pushes/deletion. Verify main tests/
build without publication; mock manual failure/concurrency instead of live acceptance.
Unavailable settings access means incomplete safeguards.

First live manual publication waits for completed-redesign approval and final version
alignment; no unfinished redesign publication merely to obtain validation evidence.
