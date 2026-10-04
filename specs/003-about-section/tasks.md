# Tasks: Static About Me Section

**Input**: All artifacts in `specs/003-about-section/`; exact text authority is
contracts/about-contract.md. Task generation only; mandatory test-first.

**Owner amendment (2026-10-04)**: T003's exact-copy fixture and T007's frozen-copy
requirement are superseded by owner-maintained static content. Completed markers
below describe historical implementation, not a continuing requirement to freeze
copy. Current tests preserve structure, reflow, accessibility and side-effect checks
without wording/text-size/length or numerical font-size/line-height assertions.

## Phase 1: Setup

- [X] T001 Verify001/002/012 prerequisites and preserve src/app/about/ component identity/shared assets using specs/003-about-section/plan.md; no new dependency.
- [X] T002 Correct standalone imports/providers and controlled lifecycle clock in src/app/about/about.component.spec.ts; obtain runnable baseline before assertions.

## Phase 2: Foundational

- [X] T003 Capture an independent whitespace-normalized exact paragraph fixture from specs/003-about-section/contracts/about-contract.md in src/app/about/about.component.spec.ts, preserving punctuation/case rather than deriving expectations from production text.

## Phase 3: US1 - Read a Static Introduction (P1, MVP)

**Independent test**: One unchanged paragraph under one Home heading, no photo/
greeting/typewriter and exact full-column text style.

- [X] T004 [P] [US1] Add content/removed-element/computed-style/no-text-Tab-stop/narrow-zoom-font and pre-lifecycle timer/meta/teardown failures in src/app/about/about.component.spec.ts for paragraph-only, muted Inter0.95rem/1.6, left/full width and no card; observe these coupled failures before T007-T008 removes markup/tabindex or changes text styles, restoring About-only spies/clocks after each case.
- [X] T005 [P] [US1] Add single-about-heading/eager-paragraph/unchanged-fragment tests in src/app/app.routes.spec.ts.
- [X] T006 [US1] Observe intended T004-T005 failures and record in specs/003-about-section/quickstart.md before template/style edits.
- [X] T007 [US1] Replace src/app/about/about.component.html with exact paragraph only; remove photo/Hello/typewriter markup without replacement, remove paragraph tabindex and keep shell-owned heading; remove dependent ViewChild/typing/timer/metadata machinery in about.component.ts in the same runnable increment after T004-T006 red, never leave removed DOM references executing.
- [X] T008 [US1] Simplify src/app/about/about.component.scss to approved full-width left muted body text; remove centering/70%-width/justification/photo/cursor/keyframes, no new numerical values.
- [X] T009 [US1] Rerun content/style/Home assertions in src/app/about/about.component.spec.ts and src/app/app.routes.spec.ts.

## Phase 4: US2 - Read Accessibly Without Side Effects (P1)

**Independent test**: No About timer/meta/photo work on mount/unmount; readable
320px/zoom/blocked fonts and no static text Tab stop.

- [X] T010 [US2] Rerun T004 pre-lifecycle timer/meta spies and teardown assertions in src/app/about/about.component.spec.ts; add an observed failing reproducer before correcting any remaining lifecycle defect, count About work only and restore clocks/spies.
- [X] T011 [US2] Audit src/app/about/about.component.ts for any typing fields/methods/ViewChild/interval or metadata injection/hooks left after T007; remove only residual machinery covered by T010, retaining standalone/change-detection pattern, shared MetaTagService and photo asset.
- [X] T012 [US2] Verify zero timer/meta operations/no photo request/Tab stops plus320px/200% zoom/font fallbacks through src/app/about/about.component.spec.ts and specs/003-about-section/quickstart.md.

## Phase 5: Polish and Cross-Cutting

- [X] T013 Run combined About/Home suite and native /#about/reduced-motion checks from specs/003-about-section/quickstart.md; expand only on integration regressions.
- [X] T014 Record behavioral red/green/native evidence in specs/003-about-section/quickstart.md, scan src/app/about/ for removed machinery and leave shared assets/services/routes/version unchanged.

## Dependencies and Execution Order

012 ->001 ->002 ->003. Setup -> foundation -> US1 -> US2 -> polish.
T004-T006 establish text keyboard/reflow/lifecycle/metadata coverage before US1 edits.
T007 removes markup and dependent TS together; T010 gates only residual corrections,
not the first lifecycle test after implementation.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002; SC-001 | T003-T007, T009 |
| FR-003, FR-004; SC-002 | T004, T006-T008, T010-T012, T014 |
| FR-005; SC-003 | T004, T006, T008-T009 |
| FR-006, FR-007; SC-005 | T004-T007, T012-T013 |
| FR-008; SC-004 | T004, T006-T007, T010-T012 |
| FR-009 | T001, T005, T011, T013-T014 |
| FR-010 | T002, T006, T010, T014 |
| Global loading amendment | T005, T009, T013 |

## Parallel Examples

US1 T004/T005 after T003, separate specs. US2 timer/meta assertions share one file:
serial; native network and keyboard observations after T011 may run independently.

## Implementation Strategy

US1 is paragraph-only MVP; complete US2 removal before declaring feature finished.
No publication/asset deletion/automatic commit.
