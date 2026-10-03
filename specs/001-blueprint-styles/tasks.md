# Tasks: Blueprint Styles Foundation

**Input**: spec.md, plan.md, research.md, data-model.md, contracts/style-contract.md,
quickstart.md in `specs/001-blueprint-styles/`.
**Authorization**: Task generation approved 2026-10-03; no execution authorized.
**Tests**: Mandatory test-first; setup failures never count as behavioral red.
**Format**: Local sequential IDs; [P] only independent files at the stated phase gate.
Paths are repository-relative; proposed files are created during implementation.

## Phase 1: Setup

- [ ] T001 Verify feature012 safeguards and preserve dirty-worktree baseline before changes using specs/012-ci-safeguards/tasks.md and specs/001-blueprint-styles/quickstart.md; no publication/version bump.
- [ ] T002 Establish runnable standalone/ChromeHeadless baseline in karma.conf.js, src/test.ts and affected src/app/**/*.spec.ts; resolve only necessary setup, plain npm ci after a missing-dependency failure, no peer bypass.

## Phase 2: Foundational

- [ ] T003 Capture non-theme route/layout/article/contact/resume baseline with controlled success/loading/empty/failure/malformed/rate-limit fixtures in src/app/app.component.spec.ts and affected src/app/work-module/**/*.spec.ts before production edits.
- [ ] T004 Inventory every legacy token/helper/font/utility and theme consumer in src/vars.scss, src/styles.scss, src/app/, src/main.ts, angular.json and src/assets/site.webmanifest; map to contracts/style-contract.md, ask before any missing numerical design value.

## Phase 3: US1 - One Consistent Visual Language (P1, MVP)

**Independent test**: Exact root/seven-role values and no theme machinery under either
OS preference on current routes; baseline non-theme behavior unchanged.

- [ ] T005 [P] [US1] Add real computed-token/seven-typography-role and shared-state acceptance tests in src/styles.spec.ts for every exact value in specs/001-blueprint-styles/contracts/style-contract.md, including focus/disabled/error/success/loading/native reduced motion/blocked fonts/long text before any consumer migration.
- [ ] T006 [P] [US1] Add initial-render/no-toggle/no-preference/no-palette-link tests in src/app/app.component.spec.ts covering initial OS preferences and changes after load.
- [ ] T007 [US1] Run T005-T006 with runnable fixtures and record actual missing-value/theme-removal assertion failures against existing code in specs/001-blueprint-styles/quickstart.md before T008.
- [ ] T008 [US1] Replace src/vars.scss with import-only semantic tokens/helpers and declare exact fixed root properties once in src/styles.scss; no old-name aliases, shade ramps or universal layout reset.
- [ ] T009 [US1] Migrate all retired palette/helper/typography usages in src/app/**/*.{scss,html,ts} directly, including dynamic classes and article syntax/temporary Resume styling; preserve geometry, routes, content and branded asset fills.
- [ ] T010 [US1] Remove ThemeService/control/state/preference/provider wiring in src/app/app.component.{ts,html,scss}, src/main.ts and src/app/services/theme.service.{ts,spec.ts}; delete src/themes/light.scss and src/themes/dark.scss and their angular.json entries.
- [ ] T011 [US1] Align build/test global CSS in angular.json, Inter/Fira Code loading/fallbacks in src/index.html and fixed background/theme_color in src/assets/site.webmanifest; keep unrelated manifest metadata.
- [ ] T012 [US1] Rerun src/styles.spec.ts and src/app/app.component.spec.ts; verify no undefined or duplicate emitted tokens and no old utilities/palette resources across src/ and angular.json.

## Phase 4: US2 - Accessible Shared States (P1)

**Independent test**: Actual focus/hover/media/font states match contract without
changing business-flow state machines.

- [ ] T013 [US2] Rerun the shared-state assertions established before migration in T005-T007 in src/styles.spec.ts; add and observe a failing reproducer for any remaining missing state before its dependent edit, without requiring already-correct migrated behavior to fail again.
- [ ] T014 [US2] Implement approved shared states in src/styles.scss and migrate conflicting src/app/**/*.scss overrides: focus 2px solid #38bdf8/2px offset, error #ef4444, explanatory cyan success, muted disabled without glow, static reduced-motion loading.
- [ ] T015 [US2] Remove decorative transitions/animation and smooth scrolling under reduced motion in src/styles.scss and src/app/**/*.scss; add only necessary accessible loading-status markup, retain main programmatic-focus exception.
- [ ] T016 [US2] Verify real keyboard/hover/media/font behavior and local wide-code containment at320px/1024px/200% zoom through src/styles.spec.ts and specs/001-blueprint-styles/quickstart.md; no overflow-hiding shortcut.

## Phase 5: US3 - Continue Using Existing Flows (P2)

**Independent test**: Recorded baseline routes/interactions and response handling
remain usable; later component redesigns are not silently included.

- [ ] T017 [US3] Expand preservation tests in src/app/work-module/work/article-page/article-page.component.spec.ts, src/app/contact-module/contact/contact.component.spec.ts and src/app/resume-module/resume/resume.component.spec.ts for embedded text/local overflow and controlled responses; capture a failing regression before any necessary corrective edit.
- [ ] T018 [US3] Correct only migration-caused regressions in the corresponding src/app/ templates/styles; preserve current handling and temporary Resume until011, no later listing/modal/detail behavior bundled here.
- [ ] T019 [US3] Rerun affected route/component suites from specs/001-blueprint-styles/quickstart.md and compare T003 baseline; record unchanged non-theme behavior and readable article/Resume content.

## Phase 6: Polish and Cross-Cutting

- [ ] T020 Run affected then full test suite, optional application type check, and completeness scans from specs/001-blueprint-styles/quickstart.md; retain angular.json initial1MB/2MB and component3KB/4KB budgets, production build only through permitted main automation.
- [ ] T021 Record red/green/native evidence and confirmed scope in specs/001-blueprint-styles/quickstart.md; leave version0.9.9, no release/commit/deploy automatically.

## Dependencies and Execution Order

Cross-feature graph:012 ->001 ->002;002 ->003/004/005/006;006 ->007/008;
007+006+002 ->009;002 ->010 (009/007 regression integration before completion);
002+009+010 ->011;001-012 ->013. Feature numbers are not execution order.
Setup -> foundation -> US1 -> US2 -> US3 -> polish. T003 preservation tests precede
all migration. Every behavior change waits for its failing assertion.
T005-T007 cover coupled US2 states before T008-T011 can change them; T013 extends
coverage for remaining gaps, not the first test of migrated focus/font/state behavior.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-003, FR-004, FR-006; SC-001, SC-003 | T004-T005, T007-T009, T011-T012 |
| FR-002; SC-002 | T006-T007, T010, T012 |
| FR-005, FR-008; SC-004, SC-006 | T005, T007, T011, T013-T016 |
| FR-007, FR-009; SC-005 | T003-T004, T009, T017-T019 |
| FR-010 | T004, T014 |
| FR-011 | T001-T002, T007, T020-T021 |

## Parallel Examples

US1: T005 and T006 after T004, separate test files; join at T007.
US2: shared src/styles.spec.ts work is serial; native font/media checks can be divided
after T015 without concurrent edits.
US3: controlled detail/contact/Resume fixture runs in T017 can be independent, but
production fixes require each reproducer. No parallel writers to shared styles.

## Implementation Strategy

MVP is US1 as a development checkpoint, not a publishable release. Complete shared
accessibility and baseline preservation before002. No template instruction to commit/
deploy increments overrides the continuing owner publication hold.
