# Validation Guide: Article Detail

Implementation validation below uses controlled responses, not live Dev.to.
Failed-chunk and dependency Retry now have native recovery evidence under the
owner-approved 2026-10-04 cache-busting amendment. Document reload remains prohibited.
The original T004 source-guard red-gate omission remains documented and unchecked.

## Prerequisites and Red

The first runnable controlled detail/service/root suite produced four intended
behavioral failures and twelve retained passes before reading/layout implementation.
One nested-test setup failure was excluded, corrected, and rerun; source guard and
sanitization assertions are now green. Evidence is stored in the session's
`detail-red.log`. Existing
boneyard Angular 22 smoke evidence from 004/007/008 is reused; no install is needed.

The initial nested service-test placement prevented the guard assertions from running
before guard implementation. It was a setup failure, not behavioral red; corrected
guard/sanitization coverage passes, but the original T004 source-guard red gate cannot
be claimed retroactively and remains unchecked.

The recovery phase produced six intended behavioral failures and seventeen passes
(`detail-state-red.log`): invalid/latest IDs and Retry, inert snapshot retrieval,
metadata ownership, actual route-code recovery, and real listing return. These
failures preceded state/snapshot/metadata integration.

Complete required001/002/006/007 changes and runnable standalone router/HTTP baseline.
Reuse boneyard integration smoke evidence or establish it before dependent implementation.
Write/observe behavioral failures for layout/sidebar removal, states/body safety, stale
IDs/metadata and listing return before production edits. Setup errors are not red.

## Targeted Runner

Run the affected suites (set `CHROME_BIN` when Chrome is not installed):

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/article-page/*.spec.ts' \
  --include='src/app/work-module/services/articles.service.spec.ts' \
  --include='src/app/work-module/work/articles/*.spec.ts' \
  --include='src/app/shared/links/*.spec.ts' \
  --include='src/app/services/meta-tag.service.spec.ts' \
  --include='src/app/app*.spec.ts' \
  --include='src/app/home/*.spec.ts'
```

Adjust actual planned paths as needed; no live owner requests/full non-main build/deploy.

## Expected Evidence

Dedicated48rem reading layout with approved rem spacing/title/body, no sidebar/cover,
complete safe body and bottom actions once. Optional metadata omitted, all tags retained,
source/external links safe new tabs. Broken-image alt/default fallback, no injected HTML.
Invalid ID avoids fetch;404/wrong-owner distinct from retryable429/network/malformed/
missing-body. Latest ID wins and destroyed component cannot write content/metadata.
Unsafe body markup cannot execute; safe content preserves structure and local wide scrolling.
Current title/social metadata has no stale tags; Home canonical metadata restored.
After multiple listing batches, detail return/browser Back restores completed cards/
reading position without immediate refetch. Interrupted append does not skip source data;
direct entry/refresh uses fresh normal loading. Code-load failure surface remains usable
even when detail chunk never mounted.

## Native Checks

Controlled fixtures at320px/200%zoom/blocked fonts and enlarged root font settings;
long title/prose/code/tables/images no page-wide overflow. Tab/link/context-menu actions,
focus restoration, reduced-motion static skeleton/instant navigation and image fallback
announcement must be checked in a browser. Verify scoped body CSS actually matches
innerHTML descendants. No forced loading delay or measured performance claim from planning.

## Observed Implementation Evidence

The subsequent `article-detail-load-failure` regression confirmed that detail
responses must not reuse the listing's array-only `tag_list` assumption. Detail
mapping now uses the supplied `tags` array or normalizes comma-separated
`tag_list` text when that array is absent, retaining array-shaped compatibility.
Independent service and real-route fixtures reproduce the original rejection and
verify complete rendering after the fix. Listing tag validation remains strict.
Both Retry surfaces use the shared blueprint button styling. The focused bug suite
passed 53 Jasmine tests and 12 Node checks; see
`.specify/bugs/article-detail-load-failure/fix.md`. This fixes data loading, not
the separate native failed-chunk recovery limitation.

Final affected runner: **95 Jasmine tests and 12 Node safeguard/dataset checks passed**
(`detail-final.log`), including retained archive service and legacy Work-route coverage.
The legacy detail fixture now supplies the required `siddev` owner. Passing unit tests
do not waive the failed native chunk-recovery acceptance requirement below.

The additional optional-metadata regression failed once before correction
(`detail-optional-red.log`): invalid optional description/date/image values now omit
those fields without rejecting otherwise usable required title/body content.

The session runner `verify-detail-browser.mjs` and `detail-native.log` verify:

- Actual 48rem maximum, 1.5rem side padding/gaps, 3rem vertical padding, 2.75rem/700
  title and 0.95rem/1.6 left-aligned body in injected descendants, no identity/sidebar
  or cover banner, and one shared footer.
- Full safe prose/headings/lists/quotation/code/tables/inline images; inert unsafe
  scripts/handlers/URLs; literal image alt/default fallback; actual keyboard horizontal
  code/table scrolling and keyboard new-tab link opening with no popup opener.
- 320px and desktop layouts, 20px user root fonts, blocked remote fonts, fixed palette,
  static reduced-motion captured bones, and genuine Chrome 200% zoom (verified by
  `chrome.tabs.getZoom` and 320 CSS-pixel viewport), without page-wide overflow.
- Explicit return and native Back/Forward after multiple batches retain committed cards
  and cursor without page-one refetch; interrupted append refetches its uncommitted page
  without skipping data. Section-relative offset restores within 1 CSS pixel and the
  live initiating-card keyboard focus restores. Browser restoration adds no entry.
- Direct entry and refresh start normal fresh listing requests; invalid IDs avoid data
  requests; actual 404/wrong-owner/empty-sanitized-body/429 feedback and data Retry;
  native rapid ID replacement leaves only the newest body/title.
- Idempotent current metadata/Home canonical restoration, no visible/social-image
  request, and no detail-body request or detail component code on initial Home.

Native checks exposed and fixed two restoration ordering bugs: native keyboard
departure must be captured before RouterLink navigation starts; stale `scrollend`
must not finish a pending return restoration before its render frame.

### Outstanding Acceptance Requirement

The native runner aborts the **actual detail component chunk fetch** once, then allows
the same URL. The eager boundary displays the approved code error and Back link.
Retry invokes the real loader again, but Chrome returns the cached rejected module
import without fetching it again. It still shows the error, never a false success;
no detail data request is issued. By contrast, the controlled Promise loader test
recovers and mounts detail on Retry, which proves boundary wiring only.

At the time of that test, T020 and the chunk-recovery part of T025 remained unchecked;
global reload and cache-busted import were both prohibited, and neither was used.
On 2026-10-04 the owner approved cache-busted application-owned module loading only
on explicit failed-code Retry for 009 and 010. Global reload remains prohibited.
The subsequent Contact implementation added shared parsed-ESM recovery. Native
`verify-code-retry.mjs` now aborts actual Article/Contact entry and dependency requests,
restores networking and double-activates Retry. All four cases recover without a
second document navigation; each recovered source is fetched only once. Successful
Contact recovery also preserves Home, inert state and draft after dismissal/reopening.
Generation ownership prevents a late component mount after departure in routed tests.
The shared loader also passed a native held-fetch/Close/late-resolution Contact case.
T020/T025 are now checked. No production chunk validation is claimed.

The earlier detail-only evidence is from development serving and controlled tests. No packages, production
build, release/version change, deployment or commit was made. Existing 008 edits were
preserved. Post-implementation hooks were parsed and are empty.
