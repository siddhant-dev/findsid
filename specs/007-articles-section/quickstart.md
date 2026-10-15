# Validation Guide: Articles Section

Planning ran no installation/test/browser commands. Implementation evidence is below.

## Prerequisites

Complete styles001/shell002/cards006. Establish runnable Jasmine/Karma standalone/HTTP
baseline; missing providers, dependency/browser errors are not failing behavioral evidence.
Reuse or establish the boneyard Angular22 smoke check from004 before dependent rendering.
No force-peer workaround, silent substitution, live Dev.to fixtures or publication.

## Red Before Green

Implementation evidence: the first runnable controlled session/service/component suite
produced **16 behavioral failures and 9 passes** (including both inherited Angular 22
library smoke checks). Missing paging, atomic commits, cancellation and ten-skeleton
presentation were observed before implementing those behaviors. Evidence is retained
in the session's `articles-red.log`. Existing boneyard 1.10.0 is reused without installs.
After correcting controlled fixture completion/date construction, the US1 suite passed
23 tests. Extended recovery coverage passed 19 tests and exposed one missing live
skeleton capture. The grid/navigation phase then produced four intended failures with
23 retained passes before responsive tracks and Home-owned append movement were wired.

Write session/HTTP/component expectations from [contract](contracts/listing-contract.md)
and observe missing-behavior failures before production changes. Include ten usable cards,
source-page continuation, accurate more-state, undated deferral, atomic retry and focus.
Test setup must succeed before assertions are treated as red evidence.

## Targeted Runner

After the planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/articles/*.spec.ts' \
  --include='src/app/work-module/services/articles.service.spec.ts' \
  --include='src/app/work-module/work/card/*.spec.ts' \
  --include='src/app/work-module/work/article-page/*.spec.ts' \
  --include='src/app/home/*.spec.ts' \
  --include='src/app/shared/links/*.spec.ts' \
  --include='src/app/app.component.spec.ts' \
  --include='src/app/app.routes.spec.ts'
```

Adjust only to actual test paths. Escalate scope on integration regressions. Respect
main-only build/deploy policy and separate CI prerequisites; no deployment in this feature.

## Expected Evidence

- 0/1/9/10/11/20/21 accepted-record fixtures prove exact batch counts and button removal.
- Raw10 with rejects/duplicates fetches further pages; filtered short counts never
  falsely signal exhaustion. Undated articles are deferred until after all dated ones.
- Missing title/wrong owner rejects record without visible warning; malformed envelope
  is error. Nonempty all-rejected source is retryable data error, not empty success.
- Partial batch/request or lookahead failure preserves displayed list and staged progress;
  Retry succeeds without re-fetching completed pages, duplicating cards or losing records.
- Repeated clicks do not start duplicate chains; network/rate limits show explicit retry;
  route destruction cancels/ignores late work.
- Approved card/detail behavior and one shell heading/metadata ownership remain intact.

## Native Browser Checks

Using controlled responses, inspect grid widths in split and stacked shell layouts,
17.5rem minimum/1.5rem gap/maximum3 columns, 320px, 200% zoom and enlarged root user
settings without forcing root size. Test long text/tags, blocked fonts, both OS palette
preferences and reduced motion. Confirm static skeleton and no card image requests.
Keyboard View more focuses the first appended link or Archived heading; no permanent
extra Tab stop. Verify actual scroll ownership, no history write and no shell correction
undoing append movement. Do not count mocked focus/scroll calls as complete native evidence.

## Implementation Evidence

- Controlled fixtures cover 0/1/9/10/11/20/21 accepted records, 30 consecutive full
  rejected pages, deduplication, optional IDs/fields, both machine timestamp fields,
  stable date ties and global undated deferral. Invalid records do not reserve IDs.
- Initial and append batches stay atomic across collection/lookahead failures. Retry
  resumes the failed page; successful pages, accepted IDs and pending content are kept.
  The detached committed checkpoint includes displayed cards, dated/undated remainder,
  IDs, encounter keys, source cursor/exhaustion and accurate more-state.
- Component/Home checks cover mounted-only requests, same-Home fragment retention,
  true empty versus all-invalid/errors, ten captured skeletons, disabled append state,
  teardown, interrupted movement and cancellation of multiple queued render intents.
- The native runner used controlled Dev.to responses and blocked fonts. The initial
  graph contained no listing session and made no feed request before explicit activation.
  No listing image was requested; Home retained its single heading.
- At 320px page and document widths both stayed 320px. The grid uses one 272px track.
  At a 623.17px section width it uses two approximately 299.59px tracks, and an actual
  1000px DOM fixture uses three tracks. No viewport breakpoint was introduced.
- A 20px user root-font override increases the gap from 24px to 30px and changes the
  623.17px section to one column. No feature-level root font override was added.
- Genuine Chrome 200% zoom was verified via `chrome.tabs.getZoom() === 2` at CSS viewport
  widths 640px and 320px; page widths matched, complete descriptions/tags wrapped and
  no meaningful card content clipped. Temporary zoom profiles were closed and removed.
- Live skeleton bones use the same fixed palette under light/dark OS preferences;
  reduced motion disables animation/stagger/transition. Library cleanup is covered.
- Actual keyboard append/Retry focuses the new Archived heading (`tabindex=-1`) or
  native link. Reduced-motion scrolling is instant, URL/history stay unchanged, and
  later shell resize compensation does not undo movement. Pointer append does not
  force card focus; a real ArrowDown interruption blocks late scroll/focus.
- Browser harness setup corrections (bone attribute selector and response-listener
  lifetime) are distinct from application behavioral failures. All remote responses
  were controlled; no live owner call, install, production build, release or deployment.

Feature 009 still owns snapshot storage/route-return restoration. This feature exposes
only the inert committed checkpoint and cancels active work on departure. The separate
Lab viewport rounding assessment remains unpatched.

Final combined result: **74 Jasmine tests and 12 Node checks passed**. This includes
the updated paged activation/legacy-redirect expectations; detail routes are unchanged.
An additional machine-date fallback regression was observed failing before accepting
the valid secondary timestamp. All 26 tasks are complete. No extension hooks were
registered; the task-owned preview was stopped after verification.
