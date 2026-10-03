# Tasks: Experiences Section

**Input**: All artifacts in `specs/005-experiences/`; exact content-contract.md is
the independent oracle. Task generation only; mandatory failing-first tests.

## Phase 1: Setup

- [ ] T001 Verify001/002/012 prerequisites using specs/005-experiences/quickstart.md and preserve shared interactive card; no package additions.
- [ ] T002 Establish minimal content-free standalone fixture in src/app/experiences/experiences.component.ts and experiences.component.spec.ts; fix providers before behavioral red.

## Phase 2: Foundational

- [ ] T003 Build independent exact text/date/location/tag fixtures in src/app/experiences/experiences.component.spec.ts from specs/005-experiences/contracts/content-contract.md; production data cannot be its own oracle.

## Phase 3: US1 - Read Complete Work History (P1, MVP)

**Independent test**: Five distinct ordered roles,18 exact paragraphs with counts
6/3/4/3/2 and tag counts9/6/5/2/3, no rewrites.

- [ ] T004 [US1] Add and observe missing-content/order/count/metadata/tag/semantic-list/no-static-controls-or-Tab-stop failures in src/app/experiences/experiences.component.spec.ts and single-heading/fragment/no-metadata-write/lazy-mount-reading-position failures in src/app/home/home.component.spec.ts before production data/template/loader population; these coupled US2 behaviors are tested before T005-T007.
- [ ] T005 [US1] Define readonly Experience in src/app/experiences/experience.model.ts and exact records in experiences.data.ts with stable IDs from data-model.md, five unique roles,18 supplied paragraphs and dates as labels, no inferred chronology or Present update.
- [ ] T006 [US1] Render all title/company/date/location/achievement/tag content in src/app/experiences/experiences.component.html as semantic articles/subordinate headings/ul-li; multi-sentence achievement remains one bullet.
- [ ] T007 [US1] Register deferred component/data loader in src/app/home/home.component.ts without eager role imports; Home owns experience/experience-heading and metadata.
- [ ] T008 [US1] Verify exact whitespace-normalized content/order/18 bullets in src/app/experiences/experiences.component.spec.ts and activation-only data/Home behavior in src/app/home/home.component.spec.ts.

## Phase 4: US2 - Read Static Accessible Cards (P1)

**Independent test**: Natural full-text reflow, no static interaction/Tab stops,
reference decorative hover and one shell heading.

- [ ] T009 [P] [US2] Rerun T004 semantics/no-controls tests and add failing no-clipping/computed-style/native-motion cases in src/app/experiences/experiences.component.spec.ts before styling changes; already-correct static semantics need not fail again.
- [ ] T010 [P] [US2] Extend the T004 single-heading/fragment/no-metadata-write/lazy-mount-reading-position tests in src/app/home/home.component.spec.ts; observe any remaining missing behavior before its dependent correction, not after initial loader implementation.
- [ ] T011 [US2] Record intended T009-T010 failures in specs/005-experiences/quickstart.md before dependent production edits.
- [ ] T012 [US2] Apply exact reference primitives/natural height24px padding/separation,16px content spacing/8px tags/corner marks in src/app/experiences/experiences.component.scss; titles1.1rem/600, achievements0.9rem/1.6, metadata0.75rem, reduced-motion transitions off.
- [ ] T013 [US2] Keep decorations inaccessible and remove any static tabindex/link/button/logo/clamp in src/app/experiences/experiences.component.html; bullet markers remain inside approved padding, no new unapproved indentation scale.
- [ ] T014 [US2] Verify320px/200%zoom/blocked-font/full-text wrapping/static keyboard order and preserved /#experience using src/app/experiences/experiences.component.spec.ts and specs/005-experiences/quickstart.md.

## Phase 5: Polish and Cross-Cutting

- [ ] T015 Run combined Experiences/Home suite and exact copy/requests/style-budget checks from specs/005-experiences/quickstart.md; no image/data-API/timer requests.
- [ ] T016 Record red/green/native/lazy evidence in specs/005-experiences/quickstart.md and audit experiences.data.ts for unapproved claims/tags; no generic interactive card or release changes.

## Dependencies and Execution Order

012 ->001 ->002 ->005. Setup -> foundation -> US1 -> US2 -> polish.
Independent of003/004/006 after shell, except serialize Home edits.
T004 gates all content/template/loader semantics before T005-T007; T009-T011
gate remaining styling/accessibility corrections and retain the earlier coverage.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002, FR-004, FR-006; SC-001, SC-002 | T003-T008, T016 |
| FR-003, FR-005, FR-008; SC-003 | T004, T006, T009, T011-T014 |
| FR-007; SC-005 | T009, T011-T014 |
| FR-009; SC-004 | T004, T007-T008, T010-T011, T014 |
| FR-010, FR-011 | T001-T004, T011, T015-T016 |
| Global loading amendment | T004, T007-T008, T010, T015-T016 |

## Parallel Examples

US1 fixture cases share one spec: serial; Home loader verification and content check
may run independently after T007. US2 T009/T010 use separate files, join at T011.

## Implementation Strategy

US1 is complete-content development MVP, static readable styling/semantics still
mandatory. Never publish incomplete sections or silently rewrite approved copy.
