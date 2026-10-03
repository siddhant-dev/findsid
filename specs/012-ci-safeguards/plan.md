# Implementation Plan: CI Safeguards

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)
**Input**: Three grouped CI recommendations approved.

## Summary

Replace PR previews with full-suite checks for all main-bound PRs. Main pushes run
tests then production build without deployment. Separate manual main-only publication
reruns tests/build at a captured revision and deploys that output only after a serialized
freshness check. Remove separate dependency review; verify main protection separately.

## Technical Context

**Language/Version**: GitHub Actions YAML, Node 22 compatible with locked Angular
engines (currently ^22.22.3), Angular ^22.1.3, TypeScript ~6.0.3.
**Primary Dependencies**: Existing npm lockfile, Jasmine/Karma/ChromeHeadless and
checkout/setup-node/Firebase action. Node built-in test runner for policy tests;
declare a direct YAML parser development dependency if needed, no transitive imports.
**Storage**: Same-run commit-scoped build output; no cross-run deployment artifact cache.
**Testing**: Semantic policy tests and full app suite, controlled HTTP/provider doubles.
**Target Platform**: GitHub-hosted Linux, existing Firebase Hosting destination.
**Project Type**: Automation and repository-settings prerequisite.
**Performance Goals**: Cancel obsolete PR runs; zero overlapping deployment.
**Constraints**: PR tests only; main-only full build/deploy; manual publication;
plain npm ci, no peer bypasses; no live acceptance deployment.
**Scale/Scope**: Three existing workflows, one manual workflow, policy tests, necessary
test script/setup/dependency wiring, README and main protection settings later.

## Constitution Check

Pre-research and post-design against constitution 1.0.1:

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Keep unfinished redesign off live site | Pass |
| Test-first | Policy tests fail against current workflows before edits | Plan passes; execution evidence required |
| Edge collaboration | Three approvals cover events/forks/failures/overlap | Pass |
| Dev.to reliability | Controlled responses in complete suite | Pass |
| Main-only automation | PR tests only; main tests/build; manual main deploy | Pass |
| Standalone Angular | No architecture change | Pass |
| CalVer | No release bump; alignment separate | Pass |

No amendment: main-only deploy is eligibility, not automatic publication permission.
Existing noncompliance remains until implementation/settings are verified. Integrate
safeguards before redesign PR automation; bootstrap requires coordinating existing
workflows, not an exemption from the no-preview/publication hold.

## Project Structure

### Documentation

`specs/012-ci-safeguards/` contains spec, plan, research, data-model, quickstart,
contracts/automation-contract.md and checklists/requirements.md. `tasks.md` was
generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Implementation Surfaces

```text
.github/workflows/firebase-hosting-pull-request.yml  # replace with PR tests
.github/workflows/firebase-hosting-merge.yml         # main tests/build, no deploy
.github/workflows/firebase-hosting-manual.yml        # manual main publication
.github/workflows/dependency-review.yml              # remove later
scripts/ci-policy.test.mjs                           # semantic policy tests
package.json / package-lock.json                    # suite wiring/needed parser
karma.conf.js / angular.json / src/test.ts           # necessary runnable setup only
README.md                                          # checks/settings/publication
```

**Structure Decision**: Three explicit workflows, no reusable-workflow indirection,
independent PR lint/build jobs or replacement application test framework.

## Implementation Sequence

1. Establish runnable Node policy tests with parsed YAML. Test real workflow files,
   all jobs/steps and referenced scripts, not formatting substrings. Observe behavioral
   red against current PR previews, extra dependency review and main deploy without
   tests. Parser/install/browser errors are not red evidence.
2. Repair only necessary Angular standalone/Karma full-suite setup. Select Node 22
   satisfying actual lock engines. Diagnose peers/lock drift; resolve compatibility
   normally and update lock, never force/legacy-peer-deps. Lab compatibility remains
   governed by004; no silent library replacement. No dependencies installed now.
3. Wire policy tests before Angular tests within `npm test`, retaining forwarded
   Angular flags and nonzero failure propagation. Stable PR check `Portfolio tests`
   runs the full suite with watch off/ChromeHeadless; main/manual checks have distinct
   job names. No separate non-test PR jobs.
4. PR workflow uses pull_request base main and matching job guard, no path filters or
   same-repository-only exclusion. Read-only repository access, no Firebase secrets,
   no pull_request_target/full build/deploy artifacts. Fork approval may be pending,
   not green. Cancellation group per PR number prevents cancelling unrelated PRs.
5. Main push workflow uses main trigger plus guard; tests gate production build.
   No Firebase credential/action. Remove dependency-review workflow and obsolete
   required check references.
6. Manual workflow_dispatch rejects non-main refs explicitly before dependency
   execution; no arbitrary user-supplied checkout ref. Capture github.sha, checkout
   that SHA, rerun tests/build and retain exact output. One static repository-wide
   publication concurrency group covers the whole manual run, cancel-in-progress
   false: never interrupt a running Firebase transaction for a newer request.
7. While serialized, immediately before deployment compare captured SHA with remote
   main head through read-only access. Failed lookup/mismatch fails visibly, requiring
   a new manual request. Re-runs retain old SHA and check freshness. Do not silently
   rebuild latest. Concurrency ordering alone does not prevent stale publication.
8. Deploy successful same-run dist/findsid/browser to existing live channel/project.
   Scope Firebase credentials to deploy step. Missing/invalid credentials fail;
   no continue-on-error/always() deploy, hidden transaction retries or secret logging.
9. Configure main protection later: require current-revision `Portfolio tests` and
   PR-based merges, prohibit routine bypass/force pushes/deletion. Verify settings
   evidence and blocked failing PR. No access means blocked completion. If merge queue
   exists, coordinate disabling it or seek policy approval; do not silently add
   merge_group events or accept stuck required checks.
10. Update README with event matrix, required check/settings, migration and explicit
    publication guide. Verify default-branch workflow availability and no-deploy CI
    observations. Use provider doubles for deploy acceptance. Final completed-redesign
    approval/readiness/CalVer belongs to separate release work.

## Bootstrap and Validation Boundaries

Before migration PR, coordinate pausing forbidden legacy preview/dependency-review
automation through owner-controlled settings as necessary; no settings changes now.
Default-branch workflows and queued old main auto-deploys may remain active until
migration. Inspect/prevent those runs from publishing during the hold. Do not claim
local artifacts or replacement YAML already guarantee safety.

Policy tests simulate event/stage gates and inspect actual workflow wiring. They
cannot alone prove GitHub scheduling, permission/settings enforcement or provider
behavior. Verify actual test/build-only CI later without a live deployment; first
publication waits for explicit completed-redesign release approval.

## Complexity Tracking

No exception. Serialized manual publication plus SHA freshness check is needed
because mutual exclusion alone does not guarantee revision order.
