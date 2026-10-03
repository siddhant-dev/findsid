# Tasks: Retro Vault Section

**Input**: All artifacts in `specs/008-retro-vault/`; exact content-contract.md and
ui-contract.md. Generation only; tests before behavior changes.

## Phase 1: Setup

- [ ] T001 Verify001/002/006/012 and runnable standalone Apps/service/Home fixtures via specs/008-retro-vault/quickstart.md;007 whole feature not required for approved grid values.
- [ ] T002 Reuse proven004/007 boneyard smoke evidence or establish local fixed-palette/reduced-motion/cleanup smoke in src/app/work-module/work/apps/skeleton-integration.spec.ts before dependent rendering; no peer workaround/substitution.

## Phase 2: Foundational

- [ ] T003 Capture independent five-project source-order/text/date/tag/URL fixtures from specs/008-retro-vault/contracts/content-contract.md in src/app/work-module/work/apps/apps.component.spec.ts; preserve Charcter and Tic Tac date, don't use production JSON as expected oracle.

## Phase 3: US1 - Read Existing Project Archive (P1, MVP)

**Independent test**: All five exact approved cards/source order, no intro/filter/
View more or invented archive claim.

- [ ] T004 [US1] Add and observe exact-content/order/all-cards/shared-link/no-extra-controls/single-shell-heading/no-metadata-write failures in src/app/work-module/work/apps/apps.component.spec.ts before archive edits; retain006 invalid-destination/optional-field behavior while new source validation remains deferred to US2.
- [ ] T005 [US1] Adapt existing src/assets/data.json through src/app/work-module/services/app.service.ts to006 card views without rewriting copy/date/URLs/tags; normalize only whitespace/tag representation already approved, retaining the current loading mechanism and deferring new unknown-shape validation/deduplication/deferred JSON importing to T011-T012 after T008-T010 red.
- [ ] T006 [US1] Render all accepted shared cards in src/app/work-module/work/apps/apps.component.{ts,html}, retain shell vault heading/anchor/metadata ownership; no intro/filter/extra label/10-year claim/View more.
- [ ] T007 [US1] Verify independent five-record equality and safe external card destinations in src/app/work-module/work/apps/apps.component.spec.ts.

## Phase 4: US2 - Load When Needed and Recover (P1)

**Independent test**: Lazy bundled data/code, code/data/true-empty distinctions,
first-valid dedupe and invalid-record diagnostic policy.

- [ ] T008 [P] [US2] Add failing unknown-source/optional/title/dedupe/empty/malformed/all-rejected tests in src/app/work-module/services/app.service.spec.ts; title "required nonblank", invalid URL => Archived not rejection, rejected ID not reserved.
- [ ] T009 [P] [US2] Add offscreen/direct/20rem/code-retry/duplicate/late-owner tests in src/app/home/home.component.spec.ts with controlled load promises and data; no separate JSON HTTP request or reachability probe.
- [ ] T010 [US2] Record T008-T009 intended failures in specs/008-retro-vault/quickstart.md before lazy-data/state edits.
- [ ] T011 [US2] Import src/assets/data.json only inside Apps lazy graph in src/app/work-module/services/app.service.ts; make only necessary JSON-module config changes in tsconfig.json/tsconfig.app.json after verification, no eager Home data import.
- [ ] T012 [US2] Validate unknown array/individual essential shapes, first accepted valid ID and encounter identity in src/app/work-module/services/app.service.ts; log rejection reasons sans payload, mixed source skips records, nonarray/nonempty-all-invalid errors, empty succeeds.
- [ ] T013 [US2] Wire data-error "Projects couldn't be loaded." Retry and true-empty "No archived projects yet." without Retry in src/app/work-module/work/apps/apps.component.{ts,html}; corrupted immutable data Retry revalidates without fake healing.
- [ ] T014 [US2] Use Home scoped activation/module-error Retry and five inert skeleton shells once code available in src/app/home/home.component.ts and src/app/work-module/work/apps/apps.component.html; foundation status until skeleton code, no forced delay/eager libraries.
- [ ] T015 [US2] Verify duplicate guards/destroyed-owner no-mount/direct activation/permanent heading and data versus code error in src/app/home/home.component.spec.ts and src/app/work-module/work/apps/apps.component.spec.ts.

## Phase 5: US3 - Read Responsive Archive (P1)

**Independent test**: Available-width rem grid, full content/keyboard/native media
and preserved reading position across lazy mount.

- [ ] T016 [US3] Add and observe rem-grid/root-font/reflow/reduced-motion/reading-offset failures in src/app/work-module/work/apps/apps.component.spec.ts and src/app/home/section-navigation.spec.ts before related style changes.
- [ ] T017 [US3] Implement17.5rem minimum/1.5rem gaps/max3 columns/shrinkable narrow column in src/app/work-module/work/apps/apps.component.scss, avoid double card spacing and forced root size.
- [ ] T018 [US3] Bind fixed boneyard colors/static reduced motion and route teardown in src/app/work-module/work/apps/apps.component.ts; preserve Home sole navigation/reading owner, no new scroll handler.
- [ ] T019 [US3] Check actual320px/200%zoom/blocked-font/enlarged-root/keyboard/reading-position cases using specs/008-retro-vault/quickstart.md, inheriting006 native/Archived behavior.

## Phase 6: Polish and Cross-Cutting

- [ ] T020 Run combined Apps/AppService/cards/Home suite from specs/008-retro-vault/quickstart.md and inspect actual network/deferred chunk isolation through permitted main build evidence, not import syntax alone.
- [ ] T021 Record red-green/native/content/lazy/retry evidence in specs/008-retro-vault/quickstart.md; retain image assets/shared services and leave release/route retirement separate.

## Dependencies and Execution Order

012 ->001 ->002 ->006 ->008. Skeleton smoke only, not all004 or007.
Setup -> foundation -> US1 -> US2 -> US3 -> polish.006 may already normalize tags;
reuse that representation, don't duplicate migration.
US1 content adaptation does not implement the US2 source-validation/deduplication/
lazy-import policy before T008-T010. Home's existing activation contract remains intact.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002; SC-001, SC-002 | T003-T007 |
| FR-003; SC-003 | T004, T006, T009, T015, T019 |
| FR-004; SC-006 | T003-T007, T016-T019 |
| FR-005; SC-004, SC-005 | T002, T008-T015, T018, T020 |
| FR-006 | T008, T010, T012-T013 |
| FR-007, FR-008 | T001-T004, T010, T016, T020-T021 |
| FR-009 | T009-T011, T020 |
| FR-010, FR-011 | T004, T006-T007, T009-T010, T014-T015 |

## Parallel Examples

US1 content fixtures are serial in one spec; external-card check can run separately
after T006. US2 T008/T009 use separate files, join at T010. US3 component/navigation
tests in T016 can be split after US2; shared Home/service/data writes serialize.

## Implementation Strategy

US1 exact-content MVP; lazy validation/failure UX and reflow required for completion.
No paging/API/URL probe or publication.
