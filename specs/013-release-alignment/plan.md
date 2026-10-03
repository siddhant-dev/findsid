# Implementation Plan: Final Integration and Release Alignment

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Verify the assembled redesign against001-012, record cross-browser acceptance and
readiness, then align final package/lock/generated version to26.0.0. Obtain owner
approval of the final main SHA before CI012 manual publication. After confirmed
deployment success, record immutable v26.0.0 tag/GitHub release at the deployed SHA.
Recovery uses a tested main PR and new patch, never automatic rollback.

## Technical Context

**Language/Version**: Existing Angular22/TypeScript6, Node22 engine-compatible tools.
**Primary Dependencies**: Existing Jasmine/Karma, Node version/policy tests planned
in002/012, real desktop/mobile browsers; existing Git/Firebase/GitHub interfaces.
**Storage**: Revision-bound acceptance/release evidence, generated typed version
derivative from package.json; no new app persistence.
**Testing**: Integrated browser fixtures, controlled HTTP responses, Node version/
release consistency tests and deployment/recording doubles.
**Target Platform**: Desktop Chrome/Firefox/Safari, mobile Safari/Chrome; Firebase live.
**Project Type**: Final integration, version alignment and owner-controlled release.
**Performance Goals**: Existing feature004 behavior criteria and001 build budgets,
no new numerical promises.
**Constraints**: All twelve prerequisite contracts, failing tests before release logic,
main-only production build/manual publication, no new design/new live test sends.
**Scale/Scope**: Integrated tests, package/lock version fields, generated metadata,
release documentation and post-deployment tag/release. No implementation now.

## Constitution Check

Pre-research and post-design against constitution1.0.1:

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Complete integrated portfolio before publication | Pass |
| Test-first | Missing integration/release invariants fail before fixes | Plan passes; runtime evidence required |
| Edge collaboration | Three grouped decisions approved | Pass |
| Dev.to reliability | Owner filtering and controlled loading/empty/failure coverage | Pass |
| Main-only automation | Use012; no PR production build/deploy | Pass |
| Standalone | Preserve planned architecture | Pass |
| CalVer | Final26.0.0; same identity across metadata/release | Pass |

No governance exception. No claim prerequisite implementation/evidence already exists.
The constitution's temporary sync report must be removed before a future constitution
commit per its existing instruction; do not rewrite governance as part of release.

## Project Structure

Documentation under `specs/013-release-alignment/`: spec, plan, research, data-model,
quickstart, contracts/release-contract.md and requirements checklist. `tasks.md` was
generated separately with owner approval on 2026-10-03; no execution is authorized.

Proposed source surfaces:

```text
package.json / package-lock.json                  # version only after readiness
src/app/generated/app-version.ts                 #002 generated derivative
scripts/generate-app-version{,.test}.mjs          #002 reuse/check, no duplicate literal
scripts/release-alignment.test.mjs               # proposed release invariants
src/app/**/*.spec.ts                             # integrated behavior where appropriate
README.md                                       # final release/readiness/recovery guide
```

**Structure Decision**: Reuse existing feature tests/generator/CI. Manual release
recording avoids adding automatic write permissions to012 or a second deployment path.
Record evidence in a release PR/GitHub release with exact SHAs/browser versions;
do not invent an elaborate release-management service or planning notes files.

## Implementation Sequence

1. Confirm001-012 implementation and red/green evidence, especially012 workflow/
   main settings enforcement. Build a traceable integrated case matrix from their
   contracts; missing evidence is a blocker. Establish runnable missing tests before
   integrated fixes/release logic; behavioral red, not setup errors.
2. Run full automated suite including Node metadata/policy tests and real-browser
   fixtures. Validate home -> detail -> restored list, fragments/Back/Forward,
   delayed layout reading position, bottom Contact/history, native pending-Send lock,
   retry/error/lazy teardown and external native links. Controlled HTTP/provider only.
3. Record current stable desktop Chrome/Firefox/Safari and mobile Safari/Chrome
   versions/devices. Use actual Safari/iOS/Android for their acceptance categories;
   Chrome mobile emulation is supplemental, not proof of mobile engine behavior.
   Existing Karma Chrome automation does not prove all engines. Manual browser
   acceptance supplements automated test-first fixtures without adding unapproved
   browser frameworks/installations in planning.
4. Cover existing320px/1023px/1024px,200% zoom and short-window cases, reduced motion,
   font blocking/fallback and slow/failing network. Preserve shell20rem computed-root
   lazy trigger and Start-only100k dataset. Verify real bounded record DOM/first-row
   measurement, no invented FPS/time/percentage claims. Preserve1MB/2MB initial
   warning/error and3KB/4KB component-style budgets; do not raise budgets to pass.
   Production build evidence is from permitted main automation, not PR build jobs.
5. Resolve only defects against approved contracts, with regression tests. Missing
   numerical styling values/new product scope need owner decisions, not release polish
   guesses. Block readiness for inaccessible browser/device/provider/setup evidence.
6. Once integrated readiness is established, write failing version-consistency
   expectations, update package.version and relevant lock root metadata to26.0.0
   using version tooling without implicit git-tag/commit/install scripts. Regenerate
  002 typed constant via existing generator, never hand-edit derivative or import
   whole package into browser. Verify v26.0.0 badge and Node --check behavior.
7. Final version PR runs full tests only; protected main merge then runs tests/build
   without deployment. Revalidate versioned final candidate; record readiness/build
   SHA. Complete mandatory controlled recovery tests and rehearsal (tasks T020-T022)
   before asking owner for explicit publication approval T016 of that exact main
   revision; task phase numbering cannot postpone recovery readiness until publication.
   A material/new revision invalidates prior candidate approval/evidence as applicable.
8. Owner triggers012 manual publication on approved main; fresh tests/build and
   serialized freshness gate bind output/deployment to captured SHA. If main advances,
   reject stale attempt and reassess/approve current candidate, never deploy arbitrary
   previous artifact. No planning/acceptance live publication.
9. After confirmed provider success and non-destructive deployed-version/route smoke
   checks, record v26.0.0 tag and GitHub release at captured deployed SHA, not whatever
   main points to now. Never use tag creation as a deploy trigger. No live Contact test
   submissions; verify displayed version and approved navigation without side effects.
10. If tag/release creation fails after deployment, record deployed-but-unrecorded
    state. Reconcile the same SHA idempotently: an existing correct tag may be reused
    to complete the matching record; conflicting existing tag/version blocks recording
    and needs owner resolution. Never move/delete/overwrite published release identity.
11. On failed/uncertain deploy, diagnose provider outcome before claiming success or
    retrying; no successful release record until verified success, no auto rollback.
    Retry through current012 gates. A published regression gets controlled reproducer,
    tested targeted revert/fix PR to main and next patch26.0.1 in2026 for first recovery,
    regenerated metadata, fresh approval and manual publication. A year boundary
    requires confirmed CalVer alignment, not silent26 reuse.

## Completion Boundaries

Release planning is complete when artifacts persist. Release implementation readiness
requires all acceptance and settings evidence. Publication completion additionally
requires explicit owner approval, confirmed deployment and matching immutable records.
These are separate states; do not conflate them. Never mark incomplete/browser-blocked/
failed-recording release as complete.

## Complexity Tracking

No exception or release service. Manual post-success recording and tested main recovery
reuse012 and prevent accidental publication/tag-trigger paths.
