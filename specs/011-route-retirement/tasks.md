# Tasks: Route Retirement

**Input**: All artifacts in `specs/011-route-retirement/`. Generation only; exact
source cleanup occurs later, never remote PDF/Firebase deletion.

## Phase 1: Setup

- [X] T001 Verify001/002/009/010/012 routing prerequisites and preserve actual worktree using specs/011-route-retirement/quickstart.md; no remote resource changes.
- [X] T002 Establish actual APP_ROUTES/controlled Home-detail-Contact harness in src/app/app.routes.spec.ts and src/app/work-module/work.routes.spec.ts; setup errors are not red.

## Phase 2: Foundational

- [X] T003 Inventory exact Resume route/import/four component files/menu/config/style consumers in src/app/, src/environments/environment.ts and environment.prod.ts; inspect shared asset usages before deletion, never reproduce remote download token.
- [X] T004 Capture active-alias/detail/Contact and pending navigation-lock baseline in src/app/app.routes.spec.ts before cleanup, including unknown nested Work paths.

## Phase 3: US1 - Resolve Retired URLs Consistently (P1, MVP)

**Independent test**: /resume and /work/art general fallback to '/', zero dedicated
retirement redirect/component/PDF/artwork request.

- [X] T005 [US1] Write and observe actual-router /resume and /work/art expected-fallback failures in src/app/app.routes.spec.ts and src/app/work-module/work.routes.spec.ts before removing routes/files; replace old artwork-to-Articles assertions with approved expectations.
- [X] T006 [US1] Record intended red evidence in specs/011-route-retirement/quickstart.md; direct/refresh/history and unknown nested-path tests must be runnable, not only source-table comparisons.
- [X] T007 [US1] Remove Resume route/import from src/app/app.routes.ts and exact artwork redirect from src/app/work-module/work.routes.ts; let generic unknown handling reach '/', no named Resume/art redirect or broad detail-consuming alias.
- [X] T008 [US1] Delete only src/app/resume-module/resume/resume.component.ts, resume.component.html, resume.component.scss and resume.component.spec.ts after route removal; remove remaining unused Resume menu/styles in src/app/app.component.html and src/styles.scss.
- [X] T009 [US1] Remove unused resumeURL reference from src/environments/environment.ts and src/environments/environment.prod.ts, leaving contact config/remote PDF/Firebase resources untouched.
- [X] T010 [US1] Verify retired fallback and no retired import/control/request with actual router tests and supplemental src/ scans through specs/011-route-retirement/quickstart.md.

## Phase 4: US2 - Preserve Active Portfolio Navigation (P1)

**Independent test**: Exact three aliases/detail/Contact and shared assets remain,
pending Send still blocks attempted retired/active navigation.

- [X] T011 [US2] Expand preservation tests in src/app/app.routes.spec.ts and src/app/work-module/work.routes.spec.ts for aliases /#articles and /#vault, positive detail path, Contact/history/lock; capture behavioral reproducer before any cleanup-caused corrective edit.
- [X] T012 [US2] Correct only retirement-caused route/cleanup regressions in src/app/app.routes.ts and src/app/work-module/work.routes.ts, using T011 evidence; general Firebase rewrite in firebase.json remains unchanged.
- [X] T013 [US2] Update related portfolio/retired-art description in README.md and verify shared assets/services/Feather/current components still consumed; do not rewrite historic intermediate specs as if retirement happened earlier.
- [X] T014 [US2] Check native direct-entry/refresh/Back-Forward/unknown nested paths and Contact pending lock with controlled fixtures via specs/011-route-retirement/quickstart.md; no publication to prove hosting behavior.

## Phase 5: Polish and Cross-Cutting

- [X] T015 Run combined root/routes/Home/Contact suite from specs/011-route-retirement/quickstart.md and supplemental obsolete-reference scan in src/; no behavioral evidence replaced by grep.
- [X] T016 Record red-green/native/cleanup-boundary evidence in specs/011-route-retirement/quickstart.md; verify remote PDF/Firebase/shared assets unchanged and no version/commit/publication.

## Dependencies and Execution Order

012 ->001 ->002;002+009+010 ->011. Setup -> foundation -> US1 -> US2 -> polish.
All active preservation baselines T004 precede retirement, and any regression fix
gets its own red test.013 waits for011.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002; SC-002 | T003, T005-T010, T015 |
| FR-003; SC-001 | T002, T005-T007, T010, T014 |
| FR-004, FR-005; SC-003 | T004, T007, T011-T015 |
| FR-006 | T005-T006, T011, T013 |
| FR-007; SC-004 | T001, T003, T009, T013, T016 |
| FR-008, FR-009 | T001-T002, T005-T006, T014-T016 |

## Parallel Examples

US1 router tests share route configuration: serial; exact file/config consumer
inspection can split read-only after T003. US2 active-route observations and shared-
asset usage verification can run independently after T010; no parallel route writers.

## Implementation Strategy

US1 is retired fallback MVP, US2 prevents collateral route/asset damage. No PDF
deletion, dedicated retired redirects or release.
