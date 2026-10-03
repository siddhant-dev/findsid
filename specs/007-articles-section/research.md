# Research: Articles Section

Repository/public-documentation inspection on 2026-10-03. No installs, live-owner
requests or runtime tests. No private source was sent to external services.

## Public Retrieval and Ordering

**Decision**: Retain public `https://dev.to/api/articles` with `username=siddev`,
explicit `page` and `per_page=10`, no API key or authenticated `/me` endpoint.
**Rationale**: Forem published-article documentation says `username` returns user/
organization articles descending by publication date and supports page/per_page.
Default general feed is popularity ordered, so owner filtering is essential.
**Alternatives**: Default single page (incomplete); `/articles/latest` without owner
filter (wrong account); authenticated endpoints (unnecessary secrets/private drafts).
**Sources**: https://developers.forem.com/api/v0 (Published articles, username/page/
per_page parameters), https://developers.forem.com/api, https://developers.forem.com/api/v1.
V1 documentation currently exposes authenticated endpoints more prominently; do not
mistake that page's initial description for the public list endpoint. V0 documentation
is marked deprecated; future API migration must preserve tested public-owner semantics.
No endpoint/runtime compatibility was certified here.

## Ten Usable Records and Accurate View More

**Decision**: Serial raw-source paging, usable-record buffer and one-record lookahead.
**Rationale**: Ten raw entries may yield fewer usable unique cards. Exactly ten accepted
cards does not prove further content exists. Continue past duplicate/rejected-only pages.
Short raw page or empty raw page means exhaustion, never short filtered output.
**Alternatives**: Show View more until an empty click (false-positive button); cap raw
requests (silently omit portfolio); fetch entire source eagerly (unnecessary normally).
**Limit**: Public offset pagination is not snapshot-isolated; concurrent publication/
deletion can shift pages. Deduplication prevents repeated accepted IDs, not guaranteed
snapshot completeness during external mutation.

## Dates and Source Identity

**Decision**: Use valid machine publication timestamp for ordering, readable source
label only for display. Stable encounter order breaks equal-date ties. Defer missing/
invalid-date records until dated source exhaustion.
**Rationale**: Current readable labels can omit year. Placing undated records at the end
of each page would put later dated cards behind them after appending.
**Alternatives**: Reject undated (user rejected), invent date (incorrect), page-local
undated-last (violates global order).
**Evidence**: Existing ArticlesService maps only readable_publish_date; public response
examples include published_at/published_timestamp, user.username and array tag_list.
Missing/invalid ID can produce an Archived card per006; use session encounter identity
for those records, deduplicate only when a valid source ID is available.

## Rejection, Atomic Retry and Diagnostics

**Decision**: Reject unusable individual records, explicitly diagnose reasons without
visitor warning/payload logging. Malformed whole response/network/rate-limit failures
are retryable errors. Hold incomplete batches and resume failed page.
**Rationale**: User rejected batch-wide rejection and visible skip warning, but approved
distinct data-error vs true-empty states and atomic pending-batch behavior.
**Alternatives**: Silent catch/empty fallback (violates governance); partial commit
on failed operation (user rejected); restart successful pages (duplicates/lost progress).
Entirely unusable source is evaluated only at exhaustion. Source entries rejected for
wrong owner/required shape count as rejected, not a genuinely empty source.

## Skeletons and Grid

**Decision**: Reuse boneyard-js 1.10.0 candidate/Angular adapter research from004;
ten initial skeleton shells, fixed palette and explicit reduced-motion controls.
Use available-width grid: minimum17.5rem, gap1.5rem, maximum three columns.
**Rationale**: User approved library treatment and converted sizing/gaps to rem.
**Alternatives**: Spinner (replaced), static invented placeholder content (misleading),
viewport-only columns (does not fit split shell), force root16px (breaks user preference).
**Sources**: [feature004 research](../004-virtual-scroll-lab/research.md),
https://registry.npmjs.org/boneyard-js,
https://github.com/0xGF/boneyard/blob/main/packages/boneyard/src/angular.ts.
Declared Angular peer support is not executable Angular22 evidence. Mandatory integration
smoke check remains; do not force peers, silently switch libraries or copy organization code.

## Focus and Scroll Ownership

**Decision**: Coordinate successful append scroll with the Home-owned navigation lifecycle;
keyboard users focus first new link, or static heading fallback. No fragment/history write.
**Rationale**: User explicitly wants movement to new cards, whereas shell normally preserves
reading position during delayed layout. Uncoordinated correction could undo the movement.
**Alternatives**: Keep button focus (rejected); independent competing scrolling (unreliable).
**Evidence**: shell002 contract and approved final focus/teardown cases.

No required user decision remains unresolved. Execution must prove library and behavioral
claims; planning artifacts themselves do not constitute implementation evidence.
