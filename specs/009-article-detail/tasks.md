# Tasks: Blueprint Article Detail

**Input**: All artifacts in `specs/009-article-detail/`, plus007 committed checkpoint
and002/006 contracts. Task generation only; controlled tests mandatory.

## Phase 1: Setup

- [X] T001 Verify001/002/006/007/012 prerequisites and skeleton smoke evidence in specs/009-article-detail/quickstart.md; no whole004 requirement.
- [X] T002 Establish runnable actual router/HTTP/standalone detail baseline in src/app/work-module/work/article-page/article-page.component.spec.ts and src/app/app.routes.spec.ts before behavior assertions.

## Phase 2: Foundational

- [X] T003 Prepare independent rich safe/unsafe HTML, image/metadata/owner/ID fixtures and rendered descendant CSS checks in src/app/work-module/work/article-page/article-page.component.spec.ts; no live Dev.to/network oracle.

## Phase 3: US1 - Read Complete Article (P1, MVP)

**Independent test**: Dedicated48rem reading layout, complete sanitized current owner
body/header, no sidebar/cover, responsive local code/table/image behavior.

- [ ] T004 [P] [US1] Add failing safe-body/optional metadata/all tags/source/image-alt-fallback/sanitizer tests in src/app/work-module/work/article-page/article-page.component.spec.ts and coupled requested-ID/owner/required-title-body/empty-sanitized-body failures in src/app/work-module/services/articles.service.spec.ts; cover image/link callback replacement/destroy ownership before T007-T012 guard/body/listener edits.
- [X] T005 [P] [US1] Add failing no-sidebar/single-bottom-actions/reading-layout tests in src/app/app.component.spec.ts.
- [X] T006 [US1] Record T004-T005 intended failures in specs/009-article-detail/quickstart.md before detail body/layout edits.
- [X] T007 [US1] Define detail source guard in src/app/work-module/models/dev.model.ts and src/app/work-module/services/articles.service.ts: id "Requested positive safe integer; response ID must match", owner siddev, title/body "Required nonblank", body untrusted string, optional positive numeric reading time and safe HTTP(S) metadata URLs.
- [X] T008 [US1] Replace bypassSecurityTrustHtml with normal string sanitization/binding in src/app/work-module/services/articles.service.ts and article-page/article-page.component.{ts,html}; safe structure preserved, unusably empty sanitized body errors, unsafe handlers/schemes/scripts cannot execute.
- [X] T009 [US1] Select dedicated reading mode via src/app/app.routes.ts and src/app/app.component.{ts,html,scss}; no identity/sidebar, retain canvas/outlet/shared bottom actions without importing full Home/detail eagerly.
- [X] T010 [US1] Render Back to Articles, one h1/title/optional date/all tags/reading time/source link and complete body in src/app/work-module/work/article-page/article-page.component.html; remove cover/banner/whole-body tabindex, no TOC/share/comments/related additions.
- [X] T011 [US1] Apply48rem max/1.5rem sides and block gaps/3rem vertical/title2.75rem700/body0.95rem1.6 in src/app/work-module/work/article-page/article-page.component.scss; scoped styles must reach innerHTML descendants without ::ng-deep/global reset, code/tables local keyboard-readable overflow.
- [X] T012 [US1] Handle image errors as supplied alt or "Article image unavailable." text and006 external annotation after sanitized replacements in src/app/work-module/work/article-page/article-page.component.ts; dispose listeners on replacement/destroy, no replacement image/unapproved dimensions.
- [X] T013 [US1] Verify full safe body/actual injected CSS/source native links/images/long-content reflow via src/app/work-module/work/article-page/article-page.component.spec.ts and specs/009-article-detail/quickstart.md.

## Phase 4: US2 - Recover and Return to Articles (P1)

**Independent test**: Distinct code/data/error/not-found, latest IDs/metadata and
inert complete listing return on explicit/browser Back without immediate refetch.

- [X] T014 [P] [US2] Extend T004-T006 source-guard tests in src/app/work-module/services/articles.service.spec.ts with observed failing missing invalid-route-ID/no-request/404/429/network/latest-ID/cancel/Retry states; retain already-green owner/malformed/required-body assertions instead of demanding another failure after guard implementation.
- [X] T015 [P] [US2] Add failing committed snapshot/lookahead/deferred/IDs/offset/interrupted-append/direct/refresh tests in src/app/work-module/work/articles/article-list-snapshot.service.spec.ts.
- [X] T016 [P] [US2] Add failing metadata ownership/race/duplicate/removal tests in src/app/services/meta-tag.service.spec.ts.
- [X] T017 [US2] Add real-route code-failure/Retry/Back/return/history/focus failures in src/app/app.routes.spec.ts and src/app/home/section-navigation.spec.ts; record T014-T017 red in specs/009-article-detail/quickstart.md before state/snapshot/metadata edits.
- [X] T018 [US2] Implement strict positive-safe-integer route parsing/latest-request cancellation/generation and loading/ready/error/not-found in src/app/work-module/work/article-page/article-page.component.ts; invalid/404/wrong-owner -> "Article not found.", network429/malformed/missing-body -> "Article couldn't be loaded." Retry.
- [X] T019 [US2] Render fixed-palette/static-motion skeleton/status and guarded data Retry in src/app/work-module/work/article-page/article-page.component.html; no old article content during new route loading.
- [ ] T020 [US2] Implement lightweight eager route-load error/Retry/Back boundary in src/app/app.component.ts and src/app/app.routes.ts showing "This page couldn't be loaded."; prove actual retry without global reload/cache-busting, failed component cannot own its sole error UI.
- [X] T021 [US2] Implement one inert root-memory snapshot in src/app/work-module/work/articles/article-list-snapshot.service.ts; save displayed/committed cursor/raw remainder/lookahead/deferred/IDs/end-more/offset/card key via article-list-session.ts and articles.component.ts, no requests/DOM/callbacks/HTML/persistent storage.
- [X] T022 [US2] On departure cancel/discard uncommitted work and restore checkpoint without initial refetch on explicit /#articles or browser Back through src/app/home/home.component.ts and section-navigation.ts; interrupted pages may refetch later but no source data skipped, direct entry/refresh fresh.
- [X] T023 [US2] Restore offset/live initiating-card focus after render with sole Home scroll owner in src/app/home/section-navigation.ts; browser restoration adds no entries, no hidden mounted Home/background fetch.
- [X] T024 [US2] Implement current-generation idempotent Title/Meta updates and safe ownership cleanup in src/app/services/meta-tag.service.ts and article-page/article-page.component.ts; clear prior article metadata during nonready states, retain valid social image without banner, restore Home canonical tags without deleting next owner's tags.
- [ ] T025 [US2] Verify native Back/Forward/return, new-ID races, actual loader Retry and metadata/image-listener cleanup in specs/009-article-detail/quickstart.md using synthetic responses.

## Phase 5: Polish and Cross-Cutting

- [X] T026 Run combined detail/service/listing/snapshot/links/meta/root/Home suites from specs/009-article-detail/quickstart.md and native320px/200%zoom/fonts/media/code-table focus checks.
- [X] T027 Record red-green/native/sanitization/return/metadata/chunk evidence in specs/009-article-detail/quickstart.md; no eager detail request, source probe, live submission or publication.

## Dependencies and Execution Order

012 ->001 ->002 ->006 ->007 ->009; skeleton smoke only from004/007.
Setup -> foundation -> US1 -> US2 -> polish.007 exposes committed state,009 owns
snapshot/route-return integration; no circular feature dependency.010 later overlays
Contact over this reading page;011 waits for009/010 route integration.
T004-T006 gate source validation, sanitized-body error and DOM callback ownership
before T007-T012; route-state/snapshot/metadata implementation still waits for T017.

## Parallel Examples

US1 T004/T005 use separate component/service versus root specs;
US2 T014/T015/T016 separate specs after US1, join with T017.
Snapshot/service/Home/meta production writers are serial; never assume a fake router
or source scan proves native history or sanitation.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-003 | T004, T006-T007, T010, T012-T014, T018 |
| FR-002, FR-006; SC-001 | T004-T006, T009-T010, T013 |
| FR-004, FR-005, FR-009; SC-005 | T004-T006, T008, T010-T013, T026 |
| FR-007, FR-010; SC-002, SC-003 | T004, T006-T008, T012, T014, T017-T020, T025-T026 |
| FR-008, FR-013; SC-004 | T015, T017, T021-T023, T025 |
| FR-014 | T017, T020, T025 |
| FR-015; SC-006 | T004, T006-T008, T012-T013, T016-T017, T024-T026 |
| FR-011, FR-012 | T001-T006, T017, T026-T027 |

## Implementation Strategy

US1 reading MVP is not completion without reliable return/error/metadata behavior.
Preserve complete writing and safe formatting; no premature release.
