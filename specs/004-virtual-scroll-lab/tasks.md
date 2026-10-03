# Tasks: Virtual Scroll Interaction Lab

**Input**: All artifacts in `specs/004-virtual-scroll-lab/`; demo/data contracts
are authoritative. Task generation only, no organization code reuse or execution.

## Phase 1: Setup

- [ ] T001 Verify001/002/012 runner/shell/fixed-style prerequisites using specs/004-virtual-scroll-lab/quickstart.md; preserve unrelated work and prohibit organization/@fingertip source/interfaces/tokens/data in every new file.
- [ ] T002 Verify actual entrypoints/peers/licenses for candidate ngx-ui-scroll4.2.0,vscroll1.8.4,boneyard-js1.10.0 before package.json/package-lock.json changes; normal peer resolution only, incompatibility blocks/report rather than forced install/substitution.
- [ ] T003 Establish runnable real-library smoke fixtures in src/app/interaction-lab/virtual-scroll/library-integration.spec.ts for Angular22 mount/window/reset/empty/dynamic rows and boneyard capture/resize/cleanup; package/setup failure is not behavioral red.

## Phase 2: Foundational

- [ ] T004 Verify boneyard actual Angular entrypoint/fixed color=darkColor/reduced-motion solid/no-stagger/teardown in src/app/interaction-lab/virtual-scroll/library-integration.spec.ts; record reusable smoke evidence in specs/004-virtual-scroll-lab/quickstart.md for007/008/009 without requiring whole-demo completion.
- [ ] T005 Create minimal runnable demo/service/measurement scaffolds in src/app/interaction-lab/virtual-scroll/ and generator test harness scripts/generate-lab-records.test.mjs without accepted records/query implementation; independent fixtures must be runnable before red.

## Phase 3: US1 - Start and Explore a Large List (P1, MVP)

**Independent test**: Explicit Start alone loads exactly100K validated records,
real bounded scrolling reaches first/last ID in min(400px,60vh) region.

- [ ] T006 [P] [US1] Add failing generator/count/uniqueness/schema/check-mode assertions in scripts/generate-lab-records.test.mjs for "exactly 100,000 records with IDs 1..100000 unique".
- [ ] T007 [P] [US1] Add failing no-pre-Start-request/load/whole-dataset validation/negative-window-intersection/finite-boundary/virtual-DOM/400px-max60vh tests in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts and mock-records.service.spec.ts plus code-only Lab activation/permanent-heading tests in src/app/home/home.component.spec.ts; include coupled provider/adapter-error distinction, keyboard/no-Tab-trap, fixed palette/static motion, cancellation and destroyed-response cases before first service/demo/window/loader edits.
- [ ] T008 [US1] Record actual T006-T007 failures in specs/004-virtual-scroll-lab/quickstart.md before dataset/service/demo implementation.
- [ ] T009 [US1] Implement original deterministic generator/check mode in scripts/generate-lab-records.mjs and src/assets/lab/records.json with id "positive safe integer", name/description "nonempty strings"; exactly100000 synthetic IDs1..100000, no eager JSON import.
- [ ] T010 [US1] Define typed MockRecord in src/app/interaction-lab/virtual-scroll/mock-record.model.ts and fetch unknown JSON only on Start in mock-records.service.ts; reject entire wrong-count/schema/duplicate/missing-fields array, cache successful validated data for mounted session.
- [ ] T011 [US1] Implement Lab/demo templates/components in src/app/interaction-lab/interaction-lab.component.{ts,html,scss} and virtual-scroll/virtual-scroll-demo.component.{ts,html,scss}: Start notice, fixed-palette/static-motion skeleton/status, wrapped ID/name/description, min(400px,60vh) labelled native scroll region, no duplicate lab heading; implement only coupled states/cleanup covered by T007-T008, leaving full Retry/measurement UX for US3.
- [ ] T012 [US1] Connect verified typed ngx datasource finite bounds/zero-based windows in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.ts; negative requested indices return only true range intersections, serialize adapter resets, no fake [] error EOF.
- [ ] T013 [US1] Register scoped Lab loader in src/app/home/home.component.ts and test code-only activation in src/app/home/home.component.spec.ts; never eagerly import libraries/asset, preserve permanent lab anchor.
- [ ] T014 [US1] Verify actual full src/assets/lab/records.json first/last traversal and noncumulative record DOM growth with real-library tests; small fixtures alone do not satisfy100K requirement.

## Phase 4: US2 - Search, Sort and Reset (P1)

**Independent test**: Global matching/all four sort modes, deterministic ties,
latest-only updates and cached Reset to top.

- [ ] T015 [US2] Write and observe failures for global search/ID-name asc-desc/negative windows/ties/rapid superseded work/Reset in src/app/interaction-lab/virtual-scroll/mock-records.service.spec.ts before querying implementation.
- [ ] T016 [US2] Implement immutable full-result query in src/app/interaction-lab/virtual-scroll/mock-records.service.ts: "trimmed search", "case-insensitive substring OR matching", ID numeric, normalized lexical code-point name order with ID ascending tie-break; query once then slice, no regex/per-window sorting.
- [ ] T017 [US2] Add failing latest-selection adapter/scroll/control tests then wire controls/generation/top reset in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.{ts,html}; Reset empty/ID asc uses cache, no refetch; if measured stalls occur chunk work without claiming workers.
- [ ] T018 [US2] Verify newest-only rows/status after shrink/grow/empty/reset/out-of-order adapter work in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts; cached query failure retry differs from asset refetch.

## Phase 5: US3 - Understand Honest Results and Failures (P2)

**Independent test**: Measured current first-visible-row/actual DOM count, explicit
states/retry, accessible static motion and complete cleanup.

- [ ] T019 [P] [US3] Add failing controlled generation/clock/viewport/render-frame/count tests in src/app/interaction-lab/virtual-scroll/demo-measurement.spec.ts; exclude skeleton/old rows and nullable timing for empty/error.
- [ ] T020 [P] [US3] Extend T007-T008 provider-error/keyboard/teardown/native-motion coverage in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts with failing missing Retry/query-lifecycle/owner-outcome cases; rerun already-green coupled behaviors rather than requiring them to fail again.
- [ ] T021 [US3] Record T019-T020 behavioral failures in specs/004-virtual-scroll-lab/quickstart.md before measurements/error/lifecycle changes.
- [ ] T022 [US3] Implement scoped real first-connected-current-row viewport intersection after frame/performance.now timing and actual record-element count in src/app/interaction-lab/virtual-scroll/demo-measurement.ts; Start includes fetch, search/sort/reset don't invent network, scrolling doesn't restart operation time.
- [ ] T023 [US3] Render distinct loading/ready/querying/empty/error/Retry and separate owner-reported40-60%/80% claim in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.html; no fake FPS/guaranteed counts/improvement, no timing for empty/failure.
- [ ] T024 [US3] Implement request/query/adapter/frame/observer/skeleton disposal and stale-generation protection in src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.ts and demo-measurement.ts; dispose failed directives, never broad catch-to-empty or pause-only cleanup.
- [ ] T025 [US3] Validate labelled native scroll region/no row Tab stops/no focus trap, min400px/60vh,320px/200%zoom/fixed OS palette/static reduced-motion skeleton in specs/004-virtual-scroll-lab/quickstart.md and actual component/library fixtures.

## Phase 6: Polish and Cross-Cutting

- [ ] T026 Run generator --check/Node tests, query/component/real-library/Home suites from specs/004-virtual-scroll-lab/quickstart.md and verify src/assets/lab/records.json exact shape/count.
- [ ] T027 Record actual device/red-green/compatibility/DOM/timing/teardown evidence in specs/004-virtual-scroll-lab/quickstart.md; audit src/app/interaction-lab/ and asset for prohibited organization reuse, no accessibility-demo/render-all/release expansion.

## Dependencies and Execution Order

012 ->001 ->002 ->004. Setup/smoke -> foundation -> US1 -> US2 -> US3 -> polish.
T004 skeleton gate may be reused by007/008/009; those may establish equivalent local
smoke evidence if they precede004. Whole004 is not their prerequisite. No concurrent
package/Home writers across features.
T007-T008 cover negative window intersections and coupled state/accessibility/lifecycle
behavior before T010-T013; T015/T020 add only still-missing query and recovery cases.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001, FR-002 | T001, T005, T011, T027 |
| FR-003; SC-001 | T006-T010, T026 |
| FR-004 | T007-T010, T013, T015-T018 |
| FR-005, FR-006; SC-002, SC-003 | T015-T018 |
| FR-007; SC-004 | T007-T008, T011-T012, T014, T022, T025 |
| FR-008, FR-009; SC-006 | T003-T004, T007-T008, T010-T011, T020-T021, T023-T025 |
| FR-010; SC-005 | T019-T023 |
| FR-011; SC-007 | T020-T023, T025, T027 |
| FR-012, FR-013 | T007-T008, T011-T013, T020-T021, T024-T025 |
| FR-014, FR-015 | T001-T004, T008, T026-T027 |
| Global loading amendment | T007-T008, T013, T026-T027 |

## Parallel Examples

US1 T006/T007; US2 service query cases in T015 serialize with same-file work,
independent full-asset/window observations can run after T017; US3 T019/T020 after
US2. Join all parallel test work at respective red gate before production edits.

## Implementation Strategy

MVP is Start plus correct100K virtualization; querying and honest failure/accessibility
metrics remain mandatory for completion. No measured latency/FPS promise or publication.
