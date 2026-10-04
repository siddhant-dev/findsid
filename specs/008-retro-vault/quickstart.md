# Validation Guide: Retro Vault

Planning ran no installs, tests or runtime commands. Implementation evidence follows.

## Prerequisites and Red Evidence

Implementation: the first runnable content suite produced one intended semantic/
metadata failure and four passes. Independent contract copy/order/link assertions and
both inherited Angular 22 library integration tests passed. The US1 fix removes the
collection Tab stop and legacy metadata writer while preserving exact five-card data.
No dependency/configuration changes were needed; JSON-module support already exists.
The next controlled suite exposed validation/deferred-loader failures before US2
implementation. Three nested component-fixture setup failures were excluded from
behavioral evidence and corrected; the initial optional-ID compiler error also did
not count as behavioral red. Home's scoped module retry, duplicate guard and late-owner
rejection already passed and were preserved. The corrected US2 suite passed 27 tests.
The grid/native-motion phase then produced two intended failures and 23 retained
passes before the rem tracks and native media binding were applied.

Complete amended shell002/styles001/cards006 and establish standalone Jasmine/Karma
baseline. Reuse or establish the mandatory boneyard Angular22 integration smoke check.
Write and observe acceptance failures before application changes: exact content,
deferred JSON/code, individual rejection, states, grid and direct activation.
Setup/import/browser/dependency failures are not behavioral red evidence.

## Targeted Command

After planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/apps/*.spec.ts' \
  --include='src/app/work-module/services/app.service.spec.ts' \
  --include='src/app/work-module/work/card/*.spec.ts' \
  --include='src/app/home/*.spec.ts' \
  --include='src/app/app.routes.spec.ts' \
  --include='src/app/work-module/work.routes.spec.ts'
```

Use actual paths if implementation names differ. Acceptance data is controlled, not
live project URL probes or Dev.to requests. No non-main full build/deploy.

## Expected Results

Compare all five cards/ordering/content against independent expected contract strings.
No image, clamp, View more/intro/filter/new claim. Valid links open safely in new tabs;
invalid destinations retain static Archived content. Reject essential invalid records
individually; duplicate valid ID keeps first; malformed/all-invalid is error, true empty
is successful-empty. Diagnostics are explicit without visitor warning or full payloads.

Control loader pending/rejection/success and confirm section-only Retry, duplicate guard,
permanent anchor and no destroyed-owner mount. Retry corrupted immutable data cannot
falsely succeed. Direct/#vault entry triggers activation without observer dependency.

## Native/Network Evidence

Observe eager useful About and no inactive Vault code/data request before viewport
approach. Check current-root conversion of20rem and no eager skeleton/card dependency
leak. Verify available-width17.5rem/1.5rem/max3 grid,320px,200%zoom, blocked fonts and
enlarged user font settings. No horizontal overflow/clipped full content/focus.
Check fixed skeleton palette and static reduced motion, no artificial delay, actual
reading-position stability on lazy mount and native card keyboard actions.
Main-only build/chunk inspection governs production isolation evidence; do not infer
measured speed/bundle improvements from planning or dynamic-import source alone.

## Implementation Evidence

- Independent card expectations were transcribed from the content contract, including
  `Charcter`, Tic Tac's supplied date and every description/tag/URL. The native runner
  also parses the original Markdown contract, not production JSON, as its oracle.
  `src/assets/data.json` is unchanged.
- Validation handles unknown envelopes, individual required/optional shape rejection,
  rejected IDs followed by usable copies, first-valid deduplication, invalid/missing
  destinations and encounter identities. Diagnostics contain reason/valid identity,
  not complete payloads or visitor omission warnings.
- The actual bundled loader is subscription-driven and imports JSON dynamically.
  Retry runs validation again; corrupted immutable data stays erroneous. Module/data
  failures remain distinct from successful empty data. Duplicate actions and owned
  subscription/render/media cleanup are covered.
- Controlled Home loader promises verify scoped code-load error/Retry, one in-flight
  retry, permanent anchors and no late mount after destruction. Same-Home fragments
  retain mounted content; the shell remains the only scroll/navigation owner.
- Native development-server requests/chunk bodies contained no Vault implementation,
  shared card or five-project JSON before activation. The Apps chunk arrived first;
  while the data chunk was held, five captured inert skeleton shells and separate
  loading status appeared. No artificial delay exists in application code.
- Native IntersectionObserver activation was checked with Vault initially beyond the
  viewport plus 20rem, then scrolled into the approved approach range. Direct `/#vault`
  worked without observer events. No standalone `assets/data.json`/project API/image
  requests occurred. All external popup requests and Dev.to responses were controlled.
- Live bones use identical fixed colors under light/dark OS settings, with no animation
  under reduced motion. Palette/motion changes and injected-style cleanup are tested.
- At 320px, page/document widths both remained 320px and cards used the 272px available
  track. The 623.17px split-shell section used two tracks; an actual 1000px DOM fixture
  used three. A 20px user root font changed the gap from 24px to 30px and correctly
  reduced the split section to one column; no root size/breakpoint override was added.
- Genuine Chrome 200% zoom was verified with `chrome.tabs.getZoom() === 2` at CSS widths
  640px/320px. Page widths matched, full text/tags wrapped without meaningful clipping,
  and temporary browser profiles were closed/removed.
- Actual Enter activation opened the approved project URL with `window.opener === null`;
  keyboard focus retained the foundation outline. Delayed data mounting preserved
  the Vault heading's reading offset and homepage metadata.
- Development chunk evidence establishes actual local deferred loading, not production
  bundle sizes or measured speed improvements. No full production build was run under
  the main-only policy; no dependency install, version change, publication or deployment.
- The affected Work-route suite exposed three stale pre-007 request expectations. They
  now use the approved paged Articles endpoint; route behavior was not changed.

Final combined result: **53 Jasmine tests and 12 Node checks passed**, including
Apps, collection validation, cards, Home/navigation and application/legacy Work routes.
Both inherited library smoke checks also passed at the initial gate. All 21 tasks are
complete. T020 records development-server chunk/network evidence rather than a
non-main production build; production isolation/size was not claimed. No extension
hooks were registered. The task-owned preview was stopped after verification.
