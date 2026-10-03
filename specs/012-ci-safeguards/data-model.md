# Automation State Model

## Validation Run

Fields: event, base/ref, revision SHA, optional PR number, test/build results, outcome.

| Event | Tests | Production build | Deployment |
|-------|-------|------------------|------------|
| PR targeting main, any category/source | Full suite | Never | Never |
| PR targeting other branch | No run | No run | No run |
| Push main | Full suite | After tests pass | Never |
| Push non-main | No run | No run | No run |
| Manual main dispatch | Fresh full suite | After tests pass | After build/freshness/credentials |
| Manual other-ref dispatch | Explicit rejection | Never | Never |

PR identity keys cancellation; manual publication has one static repository-wide group.
Pending approval/setup failure is not a successful check.

## Publication Request

Fields: captured main SHA, dispatch actor/run identity, serialized ownership,
test/build results, freshness/credential gate and publication result.
SHA immutable: tests/build/output/deploy refer to it.

State: requested -> serialized -> tests -> build -> freshness/credential gate ->
deploying -> succeeded/failed. Any failure stops later stages. Queued cancellation
is not success. Re-run old SHA still checks freshness. Main advancement before deploy
rejects stale requests; advancement during provider call permits no overlapping deploy.

## Merge Prerequisite

Fields: main protection, stable required `Portfolio tests`, current-revision success
and enforcement evidence. No routine bypass/force pushes/deletion. Settings evidence
and actual blocking behavior are separate from YAML tests; unavailable access blocks
completion. Merge queue requires separate approved policy.
