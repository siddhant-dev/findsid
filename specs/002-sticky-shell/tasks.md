# Tasks: Sticky Portfolio Shell

**Input**: All design artifacts in `specs/002-sticky-shell/`, especially amended
contracts/shell-contract.md. Task generation only approved; no implementation now.
**Tests**: Mandatory red-green; real browser geometry/history supplement deterministic
tests. Local IDs; [P] means independent file work after prerequisite gate.

## Phase 1: Setup

- [ ] T001 Verify001 and012 completion/evidence via specs/001-blueprint-styles/tasks.md and specs/012-ci-safeguards/tasks.md; preserve worktree,0.9.9 and no-publication boundary.
- [ ] T002 Establish standalone root/Home/router/HTTP fixtures in src/app/app.component.spec.ts, src/app/app.routes.spec.ts and src/app/home/home.component.spec.ts without accepted shell implementation; correct setup before red evidence.

## Phase 2: Foundational

- [ ] T003 Capture retained detail/contact/resume/art/owner-article states in src/app/app.routes.spec.ts and src/app/work-module/work.routes.spec.ts; approve only necessary embedding fixes, not later redesigns.
- [ ] T004 Add and observe failing controlled loader/lifecycle tests in src/app/home/section-activation.spec.ts for permanent anchors, idle/loading/ready/error/disposed, shared pending activation, late import ownership, computed-root20rem, immediate explicit/direct activation and section-only actual Retry before implementing activation; activation intent is separate from US2 scroll/history changes.

## Phase 3: US1 - Read the Portfolio in One Stream (P1, MVP)

**Independent test**: Five permanent ordered containers, eager About, responsive
sticky/stacked layout and independently activated deferred sections.

- [ ] T005 [P] [US1] Add ordered-section/single-heading/embedding/metadata/eager-About tests in src/app/home/home.component.spec.ts, including controlled late-layout changes, offscreen sentinels outside20rem and retained owner-only successful/loading/empty/failure/malformed/rate-limit fixtures before embedding changes.
- [ ] T006 [P] [US1] Add real root layout/canvas/320px/1023px/1024px/short-window/200% zoom/blocked-font assertions in src/app/app.component.spec.ts.
- [ ] T007 [US1] Observe T004-T006 intended assertion failures and record evidence in specs/002-sticky-shell/quickstart.md before shell/activation implementation.
- [ ] T008 [US1] Build standalone ordered Home composition in src/app/home/home.component.{ts,html,scss}, retaining about/lab/experience/articles/vault headings/anchors immediately; eager About only, empty Lab/Experiences until004/005, existing Articles/Apps code deferred.
- [ ] T009 [US1] Replace old menu/hamburger with reference root columns/canvas/outlet in src/app/app.component.{ts,html,scss}:1280px max,24px sides,48px gap,45:50 shrinkable tracks,>=1024px fit-aware sticky; exact remaining geometry from contracts/shell-contract.md.
- [ ] T010 [US1] Implement Home-owned activation in src/app/home/section-activation.ts with scoped loaders, computed-root20rem margin/resize updates, immediate explicit/direct target activation, single pending load and generation guards; no eager barrels/prefetch or unapproved placeholder height.
- [ ] T011 [US1] Render foundation code-loading/error status with retained anchor and "This section couldn't be loaded." plus section Retry in src/app/home/home.component.html; prove loader Retry without cache-busting/global reload and prevent duplicate/late mounts.
- [ ] T012 [US1] Fix only embedded containment/duplicate IDs/dead tab labels/metadata in src/app/work-module/work/{articles,apps,card}/ and src/app/about/; add cleanup regression before bounded About interval repair, retain old child content/design.
- [ ] T013 [US1] Verify eager About versus legitimately in-range clustered headings in src/app/home/home.component.spec.ts; initially eligible lazy sections may load, but Lab code activation must never request records.json.

## Phase 4: US2 - Navigate Sections and History (P1)

**Independent test**: Changed explicit selection pushes once; passive/history/delayed
layout adds zero entries; aliases preserve detail.

- [ ] T014 [P] [US2] Add deterministic failing intent/active-order/96px reading-line/offset/interruption/teardown tests in src/app/home/section-navigation.spec.ts.
- [ ] T015 [P] [US2] Add failing actual APP_ROUTES aliases/detail/direct-known/unknown-fragment and Back/Forward tests in src/app/app.routes.spec.ts and src/app/work-module/work.routes.spec.ts.
- [ ] T016 [US2] Record intended T014-T015 failures in specs/002-sticky-shell/quickstart.md before navigation/route changes.
- [ ] T017 [US2] Implement one shared coordinator with Home lifecycle in src/app/home/section-navigation.ts and read-only root state: initial render waiting, changed-only push, same-target scroll, passive no URL writes, instant history/reduced-motion restore and user-intent cancellation.
- [ ] T018 [US2] Implement coalesced section-relative reading compensation and observer arbitration in src/app/home/section-navigation.ts; avoid competing router/browser scroll owners in src/main.ts and restore global settings on teardown.
- [ ] T019 [US2] Configure exact full-match /work,/work/articles ->/#articles and /work/apps ->/#vault UrlTree aliases before broad Work loader in src/app/app.routes.ts; retain current detail/contact/resume/art until009/010/011 own refinements.
- [ ] T020 [US2] Wire native section anchors/aria-current/skip-content to coordinator in src/app/app.component.html and src/app/home/home.component.ts; test real popstate/scroll and delayed reading position via specs/002-sticky-shell/quickstart.md.

## Phase 5: US3 - Identify and Contact the Owner (P2)

**Independent test**: Exact identity, derived actual version and bottom-only Contact/
five safe named social links.

- [ ] T021 [P] [US3] Add failing deterministic generator validation/freshness tests with temporary manifests in scripts/generate-app-version.test.mjs; empty/malformed version must error, not fallback.
- [ ] T022 [P] [US3] Add exact identity/summary/version/footer/order/accessibility tests in src/app/app.component.spec.ts against contracts/shell-contract.md.
- [ ] T023 [US3] Record T021-T022 failures in specs/002-sticky-shell/quickstart.md before identity/version/action edits.
- [ ] T024 [US3] Implement deterministic generator/check mode in scripts/generate-app-version.mjs, derive src/app/generated/app-version.ts and wire prestart/prebuild/pretest/prewatch in package.json; do not hand-edit derivative/bump version or bypass012 test-suite scripts.
- [ ] T025 [US3] Render exact name/title/summary and v(actual version) in src/app/app.component.html; render Contact /contact then LinkedIn/Twitter/GitHub/CodePen/Dev.to exact safe icon-only profile links once at bottom, register necessary icons in src/app/feather-icons/feather-icons.module.ts.
- [ ] T026 [US3] Validate keyboard/native safe links, no sidebar duplicates, current Contact route and generator --check in src/app/app.component.spec.ts and specs/002-sticky-shell/quickstart.md.

## Phase 6: Polish and Cross-Cutting

- [ ] T027 Run combined root/Home/routes/version suite and native matrix from specs/002-sticky-shell/quickstart.md; full suite after targeted coverage, controlled requests only.
- [ ] T028 Inspect actual initial network/chunk isolation through permitted main validation for src/app/home/home.component.ts and src/app/home/section-activation.ts; record measurements without fabricated bundle savings or arbitrary loading delay.
- [ ] T029 Record shell red/green/teardown/native evidence in specs/002-sticky-shell/quickstart.md; preserve interfaces for009 reading mode/010 routed-modal host/011 retirement, don't implement those features here.

## Dependencies and Execution Order

012 ->001 ->002;002 unlocks003/004/005/006 and core010. Within feature:
setup -> foundation -> US1 -> US2 -> US3 -> polish. Loader tests T004 precede
activation implementation. Lab/Experiences loaders are registered by004/005 when
those files exist, not unresolved imports in002.009/010 own later shell refinements.
T004 covers immediate target activation before T010; URL/history/scroll implementation
remains deferred until T014-T016. Existing correct baseline assertions need not fail.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002, FR-006; SC-002 | T005-T009, T027 |
| FR-003, FR-008, FR-009; SC-001 | T005, T007-T008, T012-T013 |
| FR-004, FR-005, FR-014; SC-003, SC-004 | T004, T014-T018, T020 |
| FR-010, FR-011; SC-005 | T003, T015-T016, T019 |
| FR-007; SC-007 | T021-T024, T025-T026 |
| FR-012, FR-013; SC-006 | T022-T023, T025-T026 |
| FR-015; SC-008 | T003, T005-T007, T012, T027 |
| FR-016 | T001, T029 |
| Global loading amendment | T004-T005, T007-T013, T028-T029 |

## Parallel Examples

US1 T005/T006; US2 T014/T015; US3 T021/T022: each pair after preceding phase,
separate files, joins at red-evidence task. Shared Home/root files and package hooks
are serial; other features must not concurrently edit them.

## Implementation Strategy

US1 is a development MVP with titled empty Lab/Experiences, not a release. Add
navigation then identity/actions; all accepted gates required before component features.
