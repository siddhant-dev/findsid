# Tasks: Articles Section

**Input**: All artifacts in `specs/007-articles-section/`, including009 return amendment.
Task generation only. Controlled responses and observed behavioral red are mandatory.

## Phase 1: Setup

- [ ] T001 Verify001/002/006/012 prerequisites and runnable HTTP/standalone fixtures in src/app/work-module/work/articles/articles.component.spec.ts and src/app/work-module/services/articles.service.spec.ts.
- [ ] T002 Reuse004 skeleton smoke evidence or establish equivalent boneyard Angular22 integration in src/app/work-module/work/articles/skeleton-integration.spec.ts after necessary package.json/package-lock.json changes; no force/substitution, fixed color/darkColor/static motion/cleanup/browser entrypoint.

## Phase 2: Foundational

- [ ] T003 Establish independent paged fixtures/session scaffold in src/app/work-module/work/articles/article-list-session.spec.ts for0/1/9/10/11/20/21 usable records, invalid/duplicate/undated/wrong-owner pages and malformed envelopes; no accepted paging behavior in scaffold.
- [ ] T004 Add committed-checkpoint versus uncommitted-operation fixture expectations in src/app/work-module/work/articles/article-list-session.spec.ts from data-model.md; later009 snapshot must preserve cursor/lookahead/buffers/IDs, not just displayed cards.

## Phase 3: US1 - Browse Complete Writing Portfolio (P1, MVP)

**Independent test**: Ten accepted unique cards/remainder per atomic batch, global
dated-descending/undated-last and accurate one-usable-record lookahead.

- [ ] T005 [P] [US1] Add failing global paging/filter/dedupe/atomic/lookahead/undated/ties/exhaustion tests in src/app/work-module/work/articles/article-list-session.spec.ts; cover coupled failure-after-partial/no-partial-commit/malformed-envelope/duplicate-operation/cancellation cases and component activation-only/View-more retention in articles.component.spec.ts before T008-T011 changes session/service/component behavior.
- [ ] T006 [P] [US1] Add public request/owner/unknown-shape/optional-field adapter failures in src/app/work-module/services/articles.service.spec.ts; valid ID "Optional positive safe-integer", owner equals siddev, title "Required nonblank string".
- [ ] T007 [US1] Observe T005-T006 failures and record in specs/007-articles-section/quickstart.md before session/service implementation.
- [ ] T008 [US1] Add public paged GET username=siddev,page=N,per_page=10 and guarded unknown adapter in src/app/work-module/services/articles.service.ts and src/app/work-module/models/dev.model.ts; no API key/body-fetch, missing ID remains Archived, preserve detail method/data.
- [ ] T009 [US1] Implement accepted IDs/encounter keys/dated-undated/raw remainder/source progress in src/app/work-module/work/articles/article-list-session.ts; keep first accepted valid ID, rejected records don't reserve IDs, log reasons without full payload/visitor warning.
- [ ] T010 [US1] Implement serial ten-plus-one-lookahead/atomic batches in src/app/work-module/work/articles/article-list-session.ts: raw short/empty page alone ends source, continue full rejected/duplicate-only pages, defer undated until raw exhaustion, stable ties, no arbitrary cap.
- [ ] T011 [US1] Wire activation-only initial request/View more/retained existing cards in src/app/work-module/work/articles/articles.component.{ts,html}; no eager root fetch, same-Home fragments keep session, button only for actual more.
- [ ] T012 [US1] Verify every accepted fixed-fixture record eventually appears once in correct order and all batch sizes via src/app/work-module/work/articles/article-list-session.spec.ts and articles.component.spec.ts; no snapshot-isolation guarantee for concurrent live source mutation.

## Phase 4: US2 - Understand Loading and Recover (P1)

**Independent test**: Distinct loading/true-empty/errors, resumable pending batches
and no duplicate/stale operation.

- [ ] T013 [US2] Extend T005-T007 coupled atomic/failure/operation coverage with observed failing missing Retry progress, all-invalid versus true empty,429/protocol/network and visible initial/append-state cases in src/app/work-module/work/articles/article-list-session.spec.ts and articles.component.spec.ts before retry/state edits; rerun existing green duplicate/cancellation assertions.
- [ ] T014 [US2] Implement initial-loading/ready/empty/initial-error/appending/append-error/disposed and pending-progress Retry in src/app/work-module/work/articles/article-list-session.ts; resume failed page, preserve staged/displayed state, all-unusable completed source Retry restarts explicitly.
- [ ] T015 [US2] Render ten inert initial skeletons/accessibly separate status, disabled "Loading more..." button, initial Retry/inline "Retry loading more", true "No articles published yet." and all-unusable "Articles couldn't be loaded." in src/app/work-module/work/articles/articles.component.html; no artificial delay/auto retries.
- [ ] T016 [US2] Apply fixed boneyard color/darkColor and native reduced-motion binding in src/app/work-module/work/articles/articles.component.ts; cancel HTTP/query/render work on destruction, discard active uncommitted work but expose inert committed checkpoint for009.
- [ ] T017 [US2] Verify no partial commit/refetch of successful pending pages/no stale updates with src/app/work-module/work/articles/article-list-session.spec.ts and articles.component.spec.ts; exhausted zero-new append keeps cards and removes View more, not a new data error.

## Phase 5: US3 - Accessible Responsive Grid (P1)

**Independent test**:17.5rem minimum/1.5rem gaps/max3 by available width and approved
append movement/focus through Home sole scroll owner.

- [ ] T018 [P] [US3] Add failing grid/native focus/motion/skeleton/Archived-heading/enlarged-root tests in src/app/work-module/work/articles/articles.component.spec.ts.
- [ ] T019 [P] [US3] Add failed/late/interrupted/no-new append scroll arbitration/no-history tests in src/app/home/section-navigation.spec.ts.
- [ ] T020 [US3] Record T018-T019 intended failures in specs/007-articles-section/quickstart.md before styling/navigation edits.
- [ ] T021 [US3] Replace viewport grid in src/app/work-module/work/articles/articles.component.scss with available-width17.5rem/1.5rem/max3 rules; narrow single column shrinks, no new breakpoint/root font override or double margins.
- [ ] T022 [US3] Coordinate committed append render with src/app/home/section-navigation.ts and src/app/work-module/work/articles/articles.component.ts: first-new scroll, keyboard link focus or programmatic Archived heading, instant reduced motion, no URL/history writes and stale focus cancellation.
- [ ] T023 [US3] Provide stable section focus fallback when no cards append/control vanishes and verify no shell correction undoes movement in src/app/home/section-navigation.spec.ts and src/app/work-module/work/articles/articles.component.spec.ts.
- [ ] T024 [US3] Verify actual320px/200%zoom/blocked-font/root-font/grid/media/focus and single heading/home metadata via specs/007-articles-section/quickstart.md; pointer append doesn't force keyboard focus.

## Phase 6: Polish and Cross-Cutting

- [ ] T025 Run combined session/service/cards/detail/Home suites from specs/007-articles-section/quickstart.md with controlled fixtures; check detail compatibility and committed cursor for interrupted append.
- [ ] T026 Record behavioral/native/library/paging evidence in specs/007-articles-section/quickstart.md; no live owner call, publication/version bump or whole004-demo dependency.

## Dependencies and Execution Order

012 ->001 ->002 ->006 ->007; boneyard smoke gate required, entire004 not required.
Setup -> foundation -> US1 -> US2 -> US3 -> polish.009 later owns root snapshot service/
route return;007 must expose tested committed state now without depending on009.
T005-T007 gate coupled atomic/error/cancellation and activation/View-more behavior
before T008-T011; T013 adds the remaining Retry and visible-state failures.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-005, FR-012, FR-015, FR-016; SC-001, SC-002 | T003-T005, T007, T009-T012 |
| FR-002, FR-007 | T005-T010, T013-T014 |
| FR-003, FR-008; SC-006 | T006, T008, T024-T025 |
| FR-004 | T024-T025 |
| FR-006, FR-013, FR-014; SC-003 | T013-T017 |
| FR-017, FR-018 | T004-T005, T007, T010-T011, T013-T017 |
| FR-011; SC-004 | T018, T020-T021, T024 |
| FR-019; SC-005 | T018-T020, T022-T024 |
| FR-020 | T002, T015-T016, T018, T024 |
| FR-009, FR-010 | T001-T007, T013, T020, T025-T026 |
| Global loading/return amendments | T004-T005, T011, T016, T019, T025-T026 |

## Parallel Examples

US1 T005/T006; US2 session/component fixtures may be split into separate files after
US1, production session state serial; US3 T018/T019. Shared services/Home/manifest
edits serialize with008/009/004.

## Implementation Strategy

US1 browsing MVP, then recoverability and accessible movement. All source articles
remain reachable; no early release or arbitrary request cap to make tests pass.
