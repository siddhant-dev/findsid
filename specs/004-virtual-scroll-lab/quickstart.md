# Quickstart Validation: Virtual Scroll Interaction Lab

For later implementation, not evidence tests/libraries already run.

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
| Project outcomes | Attributed historical claims, separate from live metrics |

Automate accepted testable cases using real library fixtures; fake adapters alone cannot
prove windowing/cleanup/dynamic row-height behavior. Browser measurement APIs require
actual viewport intersection; response arrival alone is insufficient.
No artificial performance threshold is asserted. Record actual device conditions.

Stop only the preview process started for this work. Expand to full suite if integration
results require it. Full build belongs to compliant main-only automation; no publication.
