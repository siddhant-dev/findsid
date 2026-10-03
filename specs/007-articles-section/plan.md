# Implementation Plan: Articles Section

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

**Article-detail return amendment009**: Save one inert committed listing checkpoint
including displayed/buffered/deferred records, accepted IDs, cursor/exhaustion and
reading offset/card key. Cancel on departure, discard uncommitted active operation;
restore on return/Back without immediate refetch. Snapshot service has no active
requests/DOM refs and survives only memory lifetime. Refresh starts fresh.

**Global loading amendment (2026-10-03)**: Start article enumeration only after
Home activates the lazily imported section. Preserve permanent heading/anchor, approved
skeletons and batch rules. No root/Home service call prefetches articles before activation;
share skeleton code without pulling Lab virtualization/dataset into initial JavaScript.
Test no requests/chunks before activation and direct-fragment activation without scroll.
Follow the [shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

Replace the old viewport-based article grid with available-width responsive columns.
Retrieve `siddev` published articles in source pages; reveal ten usable unique cards
initially and on View more. Retain pending progress on failure, use one usable-record
lookahead to determine whether View more is needed, and defer undated records until
dated-source exhaustion. Use feature006 cards and approved skeleton treatment.
Preserve shell anchors/metadata and the separate article-detail page.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone, TypeScript ~6.0.3, HTML/SCSS.
**Primary Dependencies**: Existing HttpClient/Router/RxJS; boneyard-js 1.10.0 candidate
from feature004 research, subject to actual integration smoke check. No new runner.
**Storage**: Home-owned in-memory session; public Dev.to API, no private credentials.
**Testing**: Existing Jasmine/Karma, HttpTestingController, standalone component tests,
Home/navigation tests and real browser grid/media/focus checks.
**Target Platform**: Browser portfolio.
**Project Type**: Paged frontend listing with controlled source adapter.
**Performance Goals**: Demand-driven source pages, no article image requests, no duplicate
active request chains, no render-all initial grid or arbitrary delays.
**Constraints**: Exactly ten usable unique cards unless exhausted; explicit errors;
keep existing cards; fixed palette/static reduced motion; rem sizing; test-first;
no publication or version change; preserve article detail.
**Scale/Scope**: Existing Articles component/service plus a narrowly scoped listing
session helper and tests; all available published owner records, not just one API page.

## Constitution Check

*Pre-research and post-design against constitution 1.0.1.*

| Gate | Planned response | Result |
|------|------------------|--------|
| Portfolio | All accepted articles reachable in ten-card batches | Pass |
| Test-first | Runnable baseline then observed behavioral failures before production changes | Pass for plan; execution evidence required |
| Edge collaboration | User confirmed states, filtering, batching, grid and final lifecycle/focus cases | Pass |
| Dev.to reliability | Owner filtering, controlled paged success/loading/empty/error/rate-limit tests | Pass |
| Main-only CI | Separate safeguards before redesign PR automation; no waiver or deploy here | Prerequisite remains |
| Angular standalone | Existing standalone component and selected Angular skeleton adapter | Smoke-check prerequisite |
| Artwork/CalVer | No route retirement, badge/version or release work | Pass |

Styles001/shell002/cards006 precede implementation. Reuse feature004's skeleton
compatibility evidence if available; that entire demo need not precede Articles.
No silent library substitution or force-peer workaround. No runtime validation
occurred during planning. No constitutional exception.

## Project Structure

### Documentation

```text
specs/007-articles-section/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/listing-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/work-module/work/articles/
├── articles.component.{ts,html,scss,spec.ts}
└── article-list-session.{ts,spec.ts}
src/app/work-module/services/articles.service.{ts,spec.ts}
src/app/work-module/models/dev.model.ts
src/app/home/home.component.spec.ts
src/app/home/section-navigation.{ts,spec.ts}
package.json / package-lock.json       # only if skeleton dependency not already integrated
```

**Structure Decision**: One component plus a testable listing-session helper; service
provides typed paged source data. No app-global cache, generalized paging framework
or source polling. Keep detail API method/data compatible.

## Implementation Sequence

1. Establish a runnable standalone TestBed/HTTP baseline and satisfy style/shell/card
   prerequisites. Configuration/browser/dependency failures are not red evidence.
2. Write failing fixtures for initial ten, remainder, repeated View more, page lookahead,
   invalid/duplicate-only pages, undated deferral, source exhaustion, individual rejection,
   malformed whole envelope, wrong owner, retryable network/rate limits and pending batches.
   Observe missing-behavior failures before session/service implementation.
3. Add failing component tests for skeleton/empty/errors/buttons, duplicate-action
   guard, destroyed-response protection, focus targets and rem/grid styling.
4. Run the boneyard Angular22 integration smoke check before dependent styling.
   Reuse already established version/lockfile if feature004 has integrated it; otherwise
   change manifest/install only in implementation. Verify fixed color/darkColor and
   explicit reduced motion, teardown and browser bundle entrypoint.
5. Add paged public GET using `username=siddev&page=N&per_page=10`; retain owner-filter
   validation. Parse unknown responses with proper guards rather than `any`.
   Positive safe-integer IDs support duplicate detection; valid owner/title/content
   records with missing/invalid destination IDs remain usable Archived cards under006.
   Keep machine timestamp distinct from display label; do not sort readable month/day text.
6. Implement session buffering, first-accepted-ID deduplication, undated queue and
   source progress. Consume raw pages serially, advancing on successful array responses.
   A short raw page proves exhaustion; a full page does not. Do not use filtered count
   to infer the source end. Fetch only enough for the next ten plus one usable lookahead,
   except when undated deferral requires reaching source exhaustion.
7. Commit batches atomically only after ten/remainder and more-state are known. Retain
   staged cards, raw-page remainder, deferred cards and successful progress on failure.
   Retry the failed request; never reprocess consumed cards or clear displayed content.
   No automatic retry loop. Initial all-invalid-source Retry explicitly starts a new
   attempt because there is no failed network page to resume.
8. Render semantic grid/list with feature006 cards, ten initial aria-hidden skeleton
   shells and accessible loading/error status. Use reference spacing and approved
   17.5rem/1.5rem grid, at most three columns, based on content width. Reuse typography
   for skeleton content dimensions rather than inventing bar sizes. Ask if another
   numerical geometry becomes necessary; no fixed root font size.
9. After successful append and actual DOM render, use Home's scroll ownership to move
   to the first appended card without URL/history writes. Focus link for keyboard
   users, or heading with temporary/programmatic tabindex=-1 for Archived. Coordinate
   this explicit intent with the shell's async reading-position compensation so it
   does not undo the requested movement. Honour reduced motion and cancel stale intents.
10. Cancel request chain/render callbacks on component destruction; late results cannot
    commit. Same-Home fragment navigation must not reconstruct/refetch the section.
11. Run targeted suites and native grid/focus/media checks; preserve detail routes/data/
    metadata. Source scans cannot replace real reflow, focus or failing-test evidence.

## Complexity Tracking

No exception. A scoped session helper is justified by cross-page filtering, deduplication,
atomic retry, lookahead and deferred undated records; the current single-request mapping
cannot satisfy those requirements.
