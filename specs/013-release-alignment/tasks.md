# Tasks: Final Integration and Release Alignment

**Input**: All artifacts in `specs/013-release-alignment/` and001-012 contracts.
**Authorization**: Task generation only. Version changes, commits, remote settings,
tags/releases and publication are NOT authorized by this task list.
**Release gate**: T016-T019 require a later explicit owner approval of final main SHA.
Recovery operational task T023 is conditional on a regression and new approval.
**Tests**: Mandatory runnable behavioral red before integrated fixes/release logic;
controlled HTTP/provider responses, real browser evidence, no live Contact sends.

## Phase 1: Setup

- [ ] T001 Verify001-012 tasks/acceptance/red-green evidence and012 main protection in specs/001-blueprint-styles/ through specs/012-ci-safeguards/; record blockers, missing tasks/evidence cannot equal release readiness.
- [ ] T002 Establish supported Node/current Chrome-Firefox-Safari desktop and Safari-Chrome mobile access using specs/013-release-alignment/quickstart.md; record exact versions/devices, emulation doesn't substitute actual mobile engines, missing access blocks acceptance.

## Phase 2: Foundational

- [ ] T003 Build revision-bound contract/case traceability and release-state fixtures in specs/013-release-alignment/quickstart.md and scripts/release-alignment.test.mjs; use actual package/generator/012 workflow inputs where executable, don't invent a release-management service to test manual procedures.
- [ ] T004 Add and observe failing missing integration/identity/gating assertions in src/app/app.routes.spec.ts, src/app/home/home.component.spec.ts and scripts/release-alignment.test.mjs before corresponding fixes; missing tooling/config is not red.

## Phase 3: US1 - Approve Complete Portfolio (P1, MVP)

**Independent test**: All001-012 accepted contract cases/evidence across five browser
categories, no unresolved blockers, no publication or premature version bump.

- [ ] T005 [US1] Add integrated Home-detail-list restoration/direct-fragments/lazy-retry/reading-position/native-history regressions in src/app/app.routes.spec.ts and src/app/home/section-navigation.spec.ts; observe intended behavioral failures before fixes.
- [ ] T006 [US1] Add pending Contact lock/background/metadata/focus/response-state regressions in src/app/shared/contact-modal-host.spec.ts and src/app/contact-module/contact/contact.component.spec.ts using controlled synthetic delayed responses.
- [ ] T007 [US1] Correct only reproduced contract violations in affected src/app/ implementation after T005-T006 red; exact005/008 content remains unchanged, no new design/claims/accessibility-demo scope or unapproved numerical styling.
- [ ] T008 [US1] Run full suite including scripts/generate-app-version.test.mjs, scripts/ci-policy.test.mjs and actual src/assets/lab/records.json count/window tests; verify zero pre-Start dataset requests and bounded real record DOM/visibility measurement.
- [ ] T009 [US1] Execute five-browser actual matrix from specs/013-release-alignment/quickstart.md with320px/1023px/1024px/200%zoom/short windows, keyboard/focus, reduced motion, blocked fonts and slow/failed code-data requests; record versions/devices/SHA and every blocker.
- [ ] T010 [US1] Verify root-font20rem lazy trigger/real chunk isolation and unchanged initial1MB/2MB/component3KB/4KB budgets using angular.json and permitted main build evidence; no arbitrary FPS/time/bundle savings claim/budget increase or PR production build.
- [ ] T011 [US1] Record integrated-ready decision/evidence in specs/013-release-alignment/quickstart.md only when all001-012 accepted cases pass; missing browser/settings/provider evidence blocks progression to version alignment.

## Phase 4: US2 - Publish Consistent Release Identity (P1)

**Independent test**: Readiness-gated26.0.0 package/lock/derivative/badge equality;
successful exact-SHA deploy precedes immutable matching tag/release.

- [ ] T012 [US2] Add and observe26.0.0 package/lock/generated/badge mismatch failures in scripts/release-alignment.test.mjs and src/app/app.component.spec.ts after T011, using existing scripts/generate-app-version.mjs check behavior.
- [ ] T013 [US2] Align package.json and root package-lock.json version metadata to26.0.0 using tooling without implicit commit/tag/install side effects; regenerate src/app/generated/app-version.ts via002 script, no hardcoded browser/duplicate source version.
- [ ] T014 [US2] Rerun metadata/check/full suite and finalize versioned candidate acceptance through specs/013-release-alignment/quickstart.md; main-only build after protected test-only version PR, main push still cannot publish.
- [ ] T015 [US2] Validate failed/uncertain/stale-deploy/post-success-record/conflicting-tag procedures using scripts/release-alignment.test.mjs plus actual012 semantic wiring; document expected manual outcomes in README.md, controlled provider doubles only, no new tag-trigger deploy path.
- [ ] T016 [US2] Only after T014-T015 and mandatory T020-T022 recovery tests/rehearsal pass, obtain later explicit owner publication approval for final versioned main SHA and evidence via specs/013-release-alignment/contracts/release-contract.md; planning/task approval is insufficient, changed candidate needs reassessment/approval.
- [ ] T017 [US2] Only after T016 authorization, owner invokes .github/workflows/firebase-hosting-manual.yml on approved main for fresh tests/build/serialized freshness and exact captured-SHA deployment; stale/failure/uncertainty stops successful-record creation.
- [ ] T018 [US2] After confirmed provider success, perform non-destructive live badge/route smoke using specs/013-release-alignment/quickstart.md; no live test Contact submission, record deployed SHA separately from current main.
- [ ] T019 [US2] Only after confirmed success and recording authorization, create matching immutable v26.0.0 Git tag/GitHub release at captured deployed SHA following README.md; reconcile same-SHA existing tag idempotently, conflicting identity blocks, never move/publish tag to trigger another deployment.

## Phase 5: US3 - Recover Deliberately (P1)

**Independent test**: Failed versus uncertain versus deployed-unrecorded outcomes
remain explicit; published regression requires tested main PR/new patch/new approval.

- [ ] T020 [US3] Add controlled failure/retry/current-freshness/deployed-unrecorded/conflicting-record/recovery-version invariant tests in scripts/release-alignment.test.mjs and scripts/ci-policy.test.mjs before modifying any related recovery tooling.
- [ ] T021 [US3] Document tested failed-publication diagnosis/gated retry/no-auto-rollback and same-SHA record repair in README.md; distinguish provider uncertainty from no deployment and record failure from provider failure.
- [ ] T022 [US3] Validate recovery rehearsal with controlled doubles through specs/013-release-alignment/quickstart.md: regression reproducer, targeted revert/fix PR, next patch initially26.0.1 in2026, regenerated metadata, fresh approval and012 manual gates, immutable old tag; no live rollback.
- [ ] T023 [US3] If a real published regression occurs, obtain new owner authorization and execute tested main recovery per README.md and specs/013-release-alignment/contracts/release-contract.md; no arbitrary old artifact/SHA redeploy, year-boundary identity conflict needs clarification.

## Phase 6: Polish and Cross-Cutting

- [ ] T024 Record final acceptance/deployment/record identities and outcomes in specs/013-release-alignment/quickstart.md and authorized GitHub release; deployed-but-unrecorded/blocked evidence cannot be labelled complete.
- [ ] T025 Audit README.md release/recovery documentation against001-013 and current owner approval; preserve unrelated work and governance, no implicit commits/publication from task completion.

## Dependencies and Execution Order

All001-012 implementations/evidence/settings ->013. Setup -> foundation -> US1 ->
US2 candidate version/validation T012-T015 -> US3 recovery tests/rehearsal T020-T022 ->
US2 approval/publication/record T016-T019 -> polish. T020-T022 MUST complete before
T016: story phase numbering does not override this dependency, and an unrehearsed
release cannot receive publication approval. T023 remains conditional and requires
separate new approval. T024 final release completion depends on T019 and T022, not T023
(an actual regression is not required to complete a successful release).

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001; SC-001 | T001, T003-T011 |
| FR-002; SC-002 | T002, T005-T006, T008-T010 |
| FR-003 | T001-T004, T009, T011, T014, T016 |
| FR-004; SC-003 | T011-T014, T018-T019 |
| FR-005 | T014-T017 |
| FR-006; SC-004 | T015-T019, T020-T021, T024 |
| FR-007 | T015, T017-T018, T020-T022, T024 |
| FR-008; SC-005 | T020-T023 |
| FR-009 | T003-T010, T015, T020-T022 |
| FR-010, FR-011 | T003-T007, T012, T016, T020, T025 |

## Parallel Examples

US1 browser/device runs in T009 can be parallel after automated fixtures, no conflicting
production edits. US2 package/generator/tests/records serial; independent static
record-conflict/provider-fixture evaluations in T015 may run after T014.
US3 diagnosis/record-repair fixtures independent after T020; any real recovery is
serial through protected main/012. No parallel publication.

## Implementation Strategy

US1 integrated-ready MVP is a development milestone, not permission to deploy.
Version candidate follows readiness; explicit SHA approval gates publication and
recording. Recovery rehearsal is mandatory, an actual rollback/regression is not.
