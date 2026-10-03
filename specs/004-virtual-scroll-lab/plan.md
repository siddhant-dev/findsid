# Implementation Plan: Virtual Scroll Interaction Lab

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

**Global loading amendment (2026-10-03)**: Home dynamically imports Lab and its
virtualization/skeleton dependencies on activation, never through eager imports.
Viewport/direct-fragment activation downloads code only; Start remains the sole
dataset-fetch trigger. Assert no dataset request before Start even after section
activation, and cancel late callbacks on destruction. Follow the
[shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

Implement an original Lab container and one virtual-scroll demo. On explicit Start,
fetch/validate the app's synthetic 100,000-record JSON. Search and sort the full dataset
before paginating into ngx-ui-scroll. Use boneyard-js for initial loading, explicit
empty/error/retry states and real first-visible-row/record-DOM metrics. Never reuse the
organization example or expose its identifiers/dependencies.

## Technical Context

**Language/Version**: Existing TypeScript ~6.0.3 / Angular ^22.1.3 standalone; SCSS/JSON.
**Primary Dependencies**: Candidate ngx-ui-scroll 4.2.0, required peer vscroll 1.8.4,
boneyard-js 1.10.0. Reconfirm versions/APIs during implementation; peer-declared Angular
compatibility is not runtime proof.
**Storage**: Bundled static JSON and per-mounted-demo memory cache; no database or API.
**Testing**: Existing Jasmine/Karma, HTTP testing providers, real library integration,
controlled timing/render signals; dependency-free Node dataset generation/validation tests.
**Target Platform**: Existing Angular browser portfolio.
**Project Type**: Frontend interactive demonstration.
**Performance Goals**: No data request before Start; no cumulative DOM growth; page
fetches slice an already queried result instead of sorting each fetch. Measure, do not
guarantee device-specific FPS or latency.
**Constraints**: 100,000 valid records; height min(400px,60vh); fixed theme; latest operation
wins; controlled tests; no organization code, silent defaults, forced peers or deployment.
**Scale/Scope**: One demo, lightweight Lab container, original provider/query/measurement
logic, bundled asset/generator, tests and Home insertion.

## Constitution Check

*Before research and after design against constitution 1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Real performance demo with clearly attributed project outcomes | Pass |
| Test-first | Library smoke setup, then failing behavior before production implementation | Pass for design; execution evidence required |
| Collaborative edge cases | User confirmed controls, states, layout and teardown | Pass |
| Dev.to | No integration changes; mock unrelated services in Home tests | Pass |
| Main-only automation | No CI/deploy change; separate safeguards required before PR execution | Execution prerequisite, no waiver |
| Angular 22 | Peer ranges include 22; runnable library smoke test mandatory | Conditional implementation gate |
| Release/artwork | No release or route retirement | Pass |

Post-design: no unresolved design value. Features 001/002 must be implemented first.
Runtime compatibility, performance on actual browsers and existing CI safeguards are
execution gates, not claims of completion. Stop and report incompatibility rather than
change user-selected libraries silently.

## Project Structure

### Documentation

```text
specs/004-virtual-scroll-lab/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/demo-contract.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source Changes

```text
package.json / package-lock.json          # verified library dependencies
scripts/generate-lab-records.mjs          # original deterministic mock-data generator
scripts/generate-lab-records.test.mjs
src/assets/lab/records.json               # exactly 100,000 synthetic records
src/app/interaction-lab/
├── interaction-lab.component.{ts,html,scss,spec.ts}
└── virtual-scroll/
    ├── virtual-scroll-demo.component.{ts,html,scss,spec.ts}
    ├── mock-record.model.ts
    ├── mock-records.service.{ts,spec.ts}  # load, validate, query/window
    └── demo-measurement.{ts,spec.ts}
src/app/home/home.component.{ts,html,spec.ts}
```

Keep helpers local and typed. No clone of the supplied component/token/interface, no
generic infinite-data framework. Home retains the single `lab` heading/anchor; Lab
component groups this demo without duplicating the section heading.

## Implementation Sequence

1. Establish foundation/shell and runner baseline. Change dependency manifests, then
   install verified package versions with normal peer resolution. Check actual package
   entrypoints/licenses and test Angular 22 mounting, datasource/window reload, empty
   EOF and skeleton destruction. No `--force` workaround or runner migration.
2. Use boneyard's loading wrapper with a visible native status. Prefer live skeleton
   capture of a representative original row/loading layout instead of a new build-time
   screenshot pipeline. Verify async capture and resize lifecycle in the smoke test.
   Explicitly give color and darkColor the same approved muted token; reduced motion
   uses solid animation and disables transitions/stagger. Its internal appearance
   observation must not produce alternate colors or app theme state.
3. Write and observe failing tests for no pre-Start request, exact validation, all query
   modes, last-selection wins, empty/error/retry/cache, metrics and destruction.
   Missing packages/configuration are setup failures, not behavioral red evidence.
4. Create deterministic neutral mock JSON and a regeneration/check script. Validate
   record count/unique IDs/required fields in generator tests and runtime. Fetch as
   HttpClient unknown on Start; validate the whole array before exposing any row.
   Successful load is cached within the demo, failures remain explicit and retryable.
   Cancel request/subscription on teardown. Do not statically import asset JSON.
5. Query using immutable full data and stable deterministic ordering from the contract.
   Compute results once per latest selection, never in every datasource fetch.
   Use operation generations to prevent stale publication; cancel or supersede pending
   work. Cooperatively chunk expensive work if responsiveness tests show main-thread
   stalls; no fictitious Web Worker claim or unapproved comparison mode.
6. Connect typed ngx datasource using its verified zero-based settings. Window requests
   return the requested ordered slice, with short/empty arrays only for real boundaries.
   Serialize adapter result swaps/reloads, guard initialization and cancel stale pending
   resets. Configure finite dataset bounds and verify shrink/grow/zero-match behavior.
   Do not assume reload alone handles a changed result set correctly.
7. Handle provider/adapter failures through explicit component error state and dispose
   the failed directive when needed; never catch failures and return `[]` as fake EOF.
   Distinguish operational failures from legitimate no matches.
8. Implement approved controls and adaptive ID/name/description rows; scroll region
   height 400px/max60vh, full column width, labelled keyboard-focusable region with
   no Tab trap. Do not invent fixed row height; verify dynamic wrapped rows in library.
9. Measure each Start/search/sort/reset from accepted user operation to first connected
   current-generation record actually intersecting the list viewport after render.
   Use performance.now and a render-frame boundary; call it observed first-row visibility,
   not precise browser paint/network timing. Keep skeleton/old rows out of measurement.
   Count scoped record DOM elements; cross-check adapter counts, not vice versa.
10. Initial/empty/error status has no fabricated duration. Update live rendered count
    as the virtual buffer changes; scrolling does not restart operation timing.
    Separate owner-reported 40–60%/80% outcomes from live metrics.
11. Replace shell's empty Lab container content with this component without replacing
    permanent anchor/headings. Verify shell position preservation with delayed startup.
    Clean up directive/datasource using verified public lifecycle, subscriptions,
    skeleton observers and pending frame/query work. Pause is not disposal.
12. Run targeted query/component/real-library tests, actual full-asset boundary tests,
    then affected Home coverage. Follow quickstart; no app publication.

## Complexity Tracking

No new constitutional exception. Libraries handle virtualization/skeletons only; one
local provider and one measurement helper isolate original data semantics and honest
results. Further abstraction, worker or benchmark comparison needs separate justification.
