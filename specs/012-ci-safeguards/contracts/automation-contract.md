# Automation Contract

`Portfolio tests` is the stable required PR check for the current revision. Policy
and complete application tests run for main-bound docs/dependency/fork PRs with no
path exclusion. Other-target PRs/non-main pushes do not trigger the pipeline.
No PR full build, Firebase preview, privileged PR event or independent dependency-review
job remains. Fork approval may be pending, never silently interpreted as green.

Main pushes mean tests -> production build, never publication. Manual publication
from main, after completed-redesign approval, means fresh tests -> production build ->
serialized freshness/credential gate -> live deployment of that captured revision.
Do not select another revision, latest checkout or another run's unchecked output.
Existing Firebase destination/rewrite remains unchanged.

Install/test/build failures stop later stages. Non-main dispatch rejects before
test/build/deploy. Missing credentials, failed main-head lookup or stale SHA fails
explicitly. Obsolete PR revisions cancel checks; deployments serialize without
interrupting provider calls. Freshness tests prevent older-after-newer publication;
concurrency alone is not ordering evidence.

Main protection/current-revision required check is a settings prerequisite, not a YAML
guarantee. Prohibit routine bypass/force pushes/deletion. Verify default-branch dispatch
availability and old queued automation during migration.

Semantic policy tests parse actual workflow files and follow scripts/stages; cover
events, outcomes, permissions/secret scope, stale/overlap and violating mutations.
They run within full suite, not an extra non-test PR job. Observe intended failures
against current workflows before edits. No live Dev.to/contact/Firebase acceptance.

Planning changes no workflows/settings/packages/releases. Actual settings access
failure blocks completion. Final readiness/CalVer and completed-redesign approval
remain separate from CI implementation readiness.
