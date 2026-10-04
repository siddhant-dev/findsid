# Tasks: Shared Blueprint Cards

**Input**: All artifacts in `specs/006-blueprint-cards/`. Task generation only;
mandatory red-green, no live requests. [P] only independent files after phase gates.

## Phase 1: Setup

- [X] T001 Verify001/002/012 prerequisites via specs/006-blueprint-cards/quickstart.md; inventory retained external anchors in src/app/, preserving article-detail image/metadata and temporary Resume.
- [X] T002 Fix standalone imports/required input/router fixtures in src/app/work-module/work/card/card.component.spec.ts and controlled HTTP baseline in src/app/work-module/services/articles.service.spec.ts before behavioral assertions.

## Phase 2: Foundational

- [X] T003 Capture independent long/missing-optional/internal/external/Archived data and controlled article states in src/app/work-module/work/card/card.component.spec.ts; title "Required nonblank text", description/date independently omitted, tags all available nonblank source strings.

## Phase 3: US1 - Read Complete Text-Only Cards (P1, MVP)

**Independent test**: Both kinds show full source text/all tags, sole optional date
metadata, zero images/placeholders and no missing-field filler.

- [X] T004 [P] [US1] Add image/full-description/optional-date-description-tags/content-order failures in src/app/work-module/work/card/card.component.spec.ts.
- [X] T005 [P] [US1] Add adapter/all-tag/preserved-detail-data failures in src/app/work-module/services/articles.service.spec.ts with owner-filtered success/loading/empty/failure fixtures; defer destination classification to US2, retaining unchanged existing destination data in US1.
- [X] T006 [US1] Observe T004-T005 intended failures in specs/006-blueprint-cards/quickstart.md before model/template edits.
- [X] T007 [US1] Define readonly card view and explicit content adapters in src/app/work-module/models/card.model.ts and src/app/work-module/services/articles.service.ts: required nonblank title, optional complete text/date, readonly all tags and kind article/archive; retain existing destination values unchanged and separate detail source fields in dev.model.ts, deferring URL normalization/classification to T014 after T011-T013 red.
- [X] T008 [US1] Normalize existing bundled single tag to arrays in src/assets/data.json and update src/app/work-module/work/{articles,apps}/ consumers; preserve exact five-project strings/order/dates/URLs, no invented labels or listing-policy changes.
- [X] T009 [US1] Replace image/clamp/Open-footer markup with date/title/complete optional description/all tags in src/app/work-module/work/card/card.component.html; omit absent wrappers, no source/archive metadata label, preserve title heading semantics.
- [X] T010 [US1] Verify content adapters and consumer regressions using src/app/work-module/work/card/card.component.spec.ts and articles.service.spec.ts; no card image request while detail images remain.

## Phase 4: US2 - Open a Card's Destination (P1)

**Independent test**: Native one-link card; internal detail same tab, cross-origin safe
new tab; invalid/missing destinations static Archived, app-wide external policy.

- [X] T011 [P] [US2] Add failing URL-policy tests in src/app/shared/links/link-policy.spec.ts for actual-base resolution, HTTP(S) only, credentials/unsafe schemes/blank/unparseable denial, same-origin fragments/paths and valid offline URLs.
- [X] T012 [P] [US2] Add failing scoped initial/replaced article-anchor processing/cleanup tests in src/app/shared/links/external-links.directive.spec.ts.
- [X] T013 [US2] Add native card/link/Archived/router/modifier/focus-stop failures in src/app/work-module/work/card/card.component.spec.ts; observe T011-T013 and record in specs/006-blueprint-cards/quickstart.md before navigation edits.
- [X] T014 [US2] Implement pure actual-origin URL classifier in src/app/shared/links/link-policy.ts; derive externality from URL rather than existing external boolean, invalid article ID creates no destination, no network probe.
- [X] T015 [US2] Replace imperative Router/window.open/click handling with native block RouterLink/anchor or static Archived markup in src/app/work-module/work/card/card.component.{ts,html}; one title-named link, no nested controls, native Enter/Ctrl-Cmd/middle/context-menu behavior.
- [X] T016 [US2] Implement host-scoped post-render/replacement external annotation in src/app/shared/links/external-links.directive.ts with disposal; apply _blank/noopener noreferrer to external web anchors, retain sanitization/no trust bypass and internal/mailto/download contexts.
- [X] T017 [US2] Apply app-wide policy to src/app/app.component.html, src/app/work-module/work/article-page/article-page.component.{ts,html} and retained src/app/resume-module/resume/resume.component.html where external web navigation exists; no document-wide observer/interceptor or premature route retirement.
- [X] T018 [US2] Verify native link behaviors and static Archived no href/role/Tab stop/glow in src/app/work-module/work/card/card.component.spec.ts and specs/006-blueprint-cards/quickstart.md.

## Phase 5: US3 - Read Accessible Blueprint Cards (P1)

**Independent test**: Actual natural reflow/hover/focus/font/media behavior with one
shell heading and no premature lazy feature dependencies.

- [X] T019 [US3] Add and observe failing real computed-style/reflow/corner/focus/reduced-motion cases in src/app/work-module/work/card/card.component.spec.ts before card-style rewrite.
- [X] T020 [US3] Apply exact contracts/card-contract.md surface/24px padding/corners/title/date/description/tag spacing in src/app/work-module/work/card/card.component.scss; natural width/height, no transform/clamp, clickable-only glow, reduced-motion transitions off.
- [X] T021 [US3] Correct only necessary parent containment in src/app/work-module/work/{articles,apps}/ styles, avoiding duplicate24px separation; preserve section IDs/metadata and verify320px/200%zoom/blocked fonts/focus without clipped corners.
- [X] T022 [US3] Verify deferred consumers keep card/detail chunks out of eager Home graph and lightweight link policy remains independent using src/app/home/home.component.spec.ts and permitted main chunk evidence in specs/006-blueprint-cards/quickstart.md.

## Phase 6: Polish and Cross-Cutting

- [X] T023 Run targeted card/adapters/link/article-body/consumer/Resume regression suites from specs/006-blueprint-cards/quickstart.md, then broader suite only on regression; controlled responses only.
- [X] T024 Record native/red-green/content/link/lifecycle evidence in specs/006-blueprint-cards/quickstart.md; retain007/008 listing state policies and009 detail redesign as separate work.

## Dependencies and Execution Order

012 ->001 ->002 ->006. Setup -> foundation -> US1 -> US2 -> US3 -> polish.
006 unlocks007/008;009 reuses external annotation after its sanitizer changes.
No simultaneous writers to Home/services/asset across features.
US1 changes content only, not URL validation/native navigation/Archived behavior.
T011-T013 precede destination normalization and navigation edits in T014-T017.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001 | T001, T019-T021, T024 |
| FR-002, FR-003; SC-001, SC-002 | T004, T006-T010 |
| FR-004, FR-008, FR-015, FR-016; SC-003, SC-005 | T003-T010 |
| FR-005, FR-006; SC-004 | T011, T013-T015, T018 |
| FR-007 | T011-T014, T016-T018, T023 |
| FR-009; SC-006 | T011, T013-T015, T018-T020 |
| FR-010; SC-007 | T013, T015, T018-T021 |
| FR-011, FR-012 | T001, T007-T008, T020-T024 |
| FR-013, FR-014 | T002-T006, T013, T019, T024 |
| Global loading amendment | T012, T016-T017, T022 |

## Parallel Examples

US1 T004/T005; US2 T011/T012 after US1, card tests T013 separate; join before edits.
US3 same card spec/styles serial, independent native-font and chunk observations after
T020. Never label shared service/model/consumer edits parallel.

## Implementation Strategy

US1 content MVP retains usable existing navigation until US2 replaces it. All three
stories are required before cards are complete. No publication/version/dependency change.
