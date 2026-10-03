# Research: CI Safeguards

Repository inspection and three grouped approvals on 2026-10-03. No runtime/remote
settings verification, workflow execution, installation or publication.

## Event and Publication Separation

**Decision**: PR tests only, main push tests/build only, manual main tests/build/deploy;
remove separate dependency review.
**Rationale**: Existing PR workflow builds/previews same-repository PRs on all bases;
dependency review runs on all PRs; main workflow builds/deploys without tests.
**Alternatives**: PR previews, automatic main publication or extra non-test PR review
jobs violate confirmed rules. Disabling all validation loses required checks.
**Evidence**: Three existing .github/workflows files and constitution Principle V.

## Ordering and Revision Identity

**Decision**: Static publication concurrency group covers manual run, no cancellation
of running deployment; checkout captured SHA and compare remote main while serialized
immediately before publication.
**Rationale**: Concurrency is exclusion, not guaranteed revision/dispatch order.
Default pending replacement can visibly cancel queued requests. Freshness check rejects
old queued/re-run SHAs without extra persistent deployment state.
**Alternatives**: Concurrency alone, interrupting provider calls, checkout latest after
testing old SHA or a deployment-state database are unsafe/unnecessarily complex.
**Source**: [GitHub concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency).
Main may advance during a provider call; later serialized publication may deploy newer
code, but a stale old request cannot follow that newer publication. Main force-push/
deletion protection is prerequisite to meaningful revision ordering.

## Merge and Fork Gates

**Decision**: Stable full-suite check, no path/source exclusion, Firebase secrets or
privileged PR event; separately verify main protection.
**Rationale**: YAML cannot force required merge checks; fork approval can be pending.
**Alternatives**: Exclude docs/forks, use pull_request_target, assume check presence
equals merge enforcement. Rejected. No merge-queue policy approved.
**Evidence**: Current PR fork exclusion and constitutional current-PR test gate.

## Test Setup and Dependency Compatibility

**Decision**: Existing Jasmine/Karma plus Node built-in policy tests using semantic
YAML parsing; direct parser dependency only if needed during implementation.
**Rationale**: No policy command exists; Karma older framework wiring needs runnable
Angular22 setup verification. Lock engine entries include ^22.22.3; current workflows
use Node22. Legacy-peer-deps is not compatibility evidence.
**Alternatives**: Regex-only tests, lint alone, forced peers or new app test framework.
Insufficient or unnecessarily broad.
**Evidence**: package.json/lock, angular.json, karma.conf.js.

## Dispatch and Bootstrap

**Decision**: Verify manual workflow/default branch and coordinate disabling old
forbidden automation before migration integration.
**Rationale**: Local files do not stop live/queued old workflows.
**Alternatives**: Claim plans disable deployment or automatically publish migration.
Rejected.
**Source**: [GitHub event reference](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch).
