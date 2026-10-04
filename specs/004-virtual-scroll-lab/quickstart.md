# Quickstart Validation: Virtual Scroll Interaction Lab

## Row-memory comparison amendment (2026-10-04)

The Start button is centered inside the idle list viewport. The entire measurement/
memory footer is hidden until current-generation rows render, and hidden again for
loading/querying, empty results or errors.

Historical project statistics were replaced at the owner's request by estimated
rendered-row memory savings. The live calculation is
`(1 - current rendered rows / current matching records) * 100`: 10 of 100,000 rows
gives 99.99%; one rendered match out of one gives 0%. This assumes equal per-row
memory, not measured RAM. Dataset/page/library memory is excluded, and the
normal-scroll baseline is theoretical, not mounted.

The estimate is withheld for pending, empty, failed or stale operations and zero
rendered rows. Targeted verification passed 12 component tests plus 12 Node tests,
including exact percentage/formatting, filtered baselines, zero savings, unavailable
states and actual DOM-count consistency.

For later implementation, not evidence tests/libraries already run.

## Execution evidence (2026-10-04)

Normal peer resolution installed ngx-ui-scroll 4.2.0, vscroll 1.8.4 and boneyard-js
1.10.0 (MIT). Their actual Angular entrypoints compiled under Angular 22.1.3.
Two real-library smoke tests passed: dynamic-height finite scrolling/reload/empty
reset/disposal, and live DOM skeleton capture/fixed color/solid animation/style cleanup.
The Angular skeleton adapter requires explicit `snapshotBones` capture; it does not
automatically capture projected content at runtime.

Before production dataset/provider/demo/Home implementation: 16 acceptance tests failed
for absent Start notice/request, whole-array validation/cache/cancellation, finite
negative window intersections, global query semantics, retry and direct Lab activation.
The two library smoke tests remained green. Three Node generator/asset/check-mode tests
also failed against the runnable generator scaffold. These were behavioral failures,
not package or compiler errors.

The generator/asset/check-mode tests then passed (3/3), and provider validation,
cancellation, finite windows and global sorting/search tests passed (11/11).
Before measurement implementation, both controlled measurement tests failed for missing
current-generation visibility timing, DOM counts and nullable empty/error results.

An extended loading/resize test reproduced a skeleton lifecycle defect: capturing the
library's fallback slot detached that slot and its resize observer subsequently captured
zero bones. This failing case was added before correcting the capture lifecycle to keep
the representative row projected and recapture its measured layout on resize.

Additional failing regressions caught a one-pixel viewport border-height discrepancy
(fixed with border-box sizing) and UTF-16 rather than Unicode code-point name ordering
(fixed with an explicit code-point comparator).

### Integration decisions

Each accepted query destroys the previous ngx directive before creating a datasource for
the new immutable result. This serializes swaps through Angular destruction/rendering
instead of maintaining overlapping adapter resets; the library's DestroyRef disposes its
workflow. Real-library reset/empty behavior was independently smoke-tested. This keeps
finite bounds, buffered rows and stale callbacks scoped to exactly one operation.

The app imports the Angular boneyard adapter and browser DOM capture API, never its CLI.
Loading rows are captured from an original projected sample; resize recaptures the live
layout. Both colors use `--text-muted`, with solid/no-stagger/no-transition reduced motion.

### Native browser evidence

Local development preview responded with HTTP 200 for the app and the complete
13,669,792-byte asset. Automated Chromium 153 native checks on macOS used desktop
1280x900 and narrow 320x600 windows, blocked web fonts, controlled Dev.to responses,
reduced motion and both OS color preferences:

- No asset request before Start, one after Start and none on cached search/sort/Reset.
- Actual scrolling through the full asset reached ID 100000. Four successive positions
  rendered 10, 10, 10 and 7 record elements (observations, not fixed expectations).
- Search found the last record; all four sort modes, empty results and cached Reset/top
  passed. Native Tab exited the scroll region; rows added no Tab stops.
- Actual viewport border-box heights were 400px desktop, 360px at 600px window height,
  and 180px at 300px window height.
- Fixed skeleton bones remained rgb(148, 163, 184) under light/dark OS preferences and
  had no animation under reduced motion. Captured loading layout survived narrow resize.
- First-row time settled only after real visible rows rendered; the live DOM count
  matched actual elements. No benchmark threshold or FPS guarantee was inferred.
- Wrong-count JSON produced an error; Retry loaded the actual asset; route exit removed
  the demo and all its skeleton keyframe styles. No page exceptions were observed.

At 320px with doubled root text, **the Lab itself fits**, but the existing shell footer's
`.social-links` overflows the page to 424px. This unrelated shell issue was not changed.
The 320px baseline page has no horizontal overflow.

Genuine **200% Chrome browser zoom** was subsequently verified using the browser's
`chrome.tabs.setZoom` API through a temporary local test extension (not app code).
`getZoom` returned 2 and devicePixelRatio was 2. At both 640px and 320px CSS widths,
page scroll width equalled viewport width, five actual records rendered, and the
viewport's measured height (243.8984375px) matched its computed 60vh cap (243.9px).
Thus the footer issue concerns the additional doubled-root-font stress case, not the
required native 200% browser zoom behavior.

Final combined verification passed **53 Angular/Jasmine tests** covering Lab, real
libraries, measurement/provider behavior, Home navigation/activation, App and About,
plus **12 Node tests** for CI policy, version metadata and generator integrity.
Generator `--check` passed. No production build, publication, route or version change
was made; no after-implementation hooks were registered.

For this machine's cached browser, prefix the test command with:

```sh
export CHROME_BIN="$HOME/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
```

## Prerequisites

Complete styles001 and shell002; existing Angular22/Karma runner and browser available.
After dependency manifest changes, install verified user-selected packages normally;
never force peer resolution. Smoke-test real ngx/boneyard render/reset/cleanup before
dependent implementation. Report incompatible APIs rather than silently substitute.
No production calls, organization code or deployment.

## Red Then Green

Write and observe failing acceptance assertions before demo production changes:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  '--include=src/app/interaction-lab/**/*.spec.ts' \
  --include=src/app/home/home.component.spec.ts
```

Configuration/package failures are not red evidence. Use HTTP testing responses and
controlled query/render clocks. After implementation rerun this combined selection:

```sh
node --test scripts/generate-lab-records.test.mjs
node scripts/generate-lab-records.mjs --check
```

Expected: actual asset exactly100K valid unique records, current generator output,
successful controlled states and no stale updates. Small fixtures test query semantics;
also run actual full-asset first/last boundaries and scrolling—tiny tests alone do not
prove the required dataset/count/virtualization.

## Browser Acceptance

```sh
npm start -- --host 127.0.0.1
```

Verify server responds, inspect with local mock asset and controlled failures.

| Case | Expected |
|------|----------|
| Initial page | Zero records.json requests before Start |
| Start | Skeleton/status then actual rows, timing on first visible row |
| Full asset | Exactly100K; scroll to last ID, no duplicate/missing boundary rows |
| Search beyond first window | Correct full-dataset matches |
| ID/name asc/desc | Correct result-wide ordering |
| Rapid controls/delayed work | Latest-only rows/status/timing |
| No matches | Explicit empty; no first-row timing |
| Malformed/count/duplicate/missing fields | Whole-load error and Retry |
| Cached Reset | Empty search, ID asc, top; no refetch |
| Virtual DOM | Actual scoped record count matches metric; stays bounded during traversal |
| Reduced motion/light vs dark OS | Static skeleton and identical palette |
| 320px/200% zoom/short window | Reflow; height min400px/60vh; no Tab trap |
| Page exit during load/query | No late updates; observers/library/request disposed |
| Row-memory estimate | Current DOM rows versus all matches; equal-row assumption, not measured RAM |

Automate accepted testable cases using real library fixtures; fake adapters alone cannot
prove windowing/cleanup/dynamic row-height behavior. Browser measurement APIs require
actual viewport intersection; response arrival alone is insufficient.
No artificial performance threshold is asserted. Record actual device conditions.

Stop only the preview process started for this work. Expand to full suite if integration
results require it. Full build belongs to compliant main-only automation; no publication.
