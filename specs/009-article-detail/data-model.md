# Data Model: Article Detail

## Detail Record

| Field | Rule |
|-------|------|
| id | Requested positive safe integer; response ID must match |
| ownerUsername | siddev; wrong owner -> not-found |
| title | Required nonblank string, preserved |
| bodyHtml | Required nonblank untrusted string; sanitized when rendered |
| description | Optional source text used for metadata, no fabricated fallback claims |
| publicationInstant/dateLabel | Optional valid source metadata; omit invalid/missing |
| tags | All available source string labels, existing006 normalization |
| readingTimeMinutes | Optional valid positive numeric source reading time |
| sourceUrl | Optional valid external HTTP(S) source URL; omit unsafe/missing rather than invent |
| socialImageUrl | Optional valid source image for metadata, not a visible cover |

Non-object response/missing title/body/wrong requested identity is malformed data error.
Invalid route ID yields not-found before fetch; HTTP404/wrong-owner yields not-found.
Network/429/server/protocol failure yields retryable load error. Sanitized body
containing no usable content must not become a success-shaped blank article.

## Reading State

route-loading (shell-owned code load), loading, ready, error, not-found, disposed.
Current ID/request generation gates body, image/link callbacks and metadata.
New ID resets ready content/status and cancels old request. Retry retries current
ID only. Code Retry reloads route component via eager failure boundary; no page reload.
Under the owner-approved 2026-10-04 amendment, explicit failed-code Retry may
cache-bust the application-owned module URL. The attempt remains generation-owned
and duplicate guarded; data requests and ordinary code loads are unchanged.
Body image failures are individual fallback states, not whole-article request errors.

## Listing Snapshot Amendment

One root-memory snapshot of completed007 state: displayed records, committed page
checkpoint, buffered lookahead/raw remainder/deferred-undated data, accepted IDs,
source-exhaustion/more state, article-section-relative offset and initiating card key.
Preserve no active request/subscription, DOM node, observer, timer or uncommitted
operation. If interrupted append advanced pages privately, restore committed cursor/
checkpoint so no records are skipped. Uncommitted pages may need refetch after return.
This differs from retry inside a still-mounted007 session, which retains pending work.

Return restores snapshot without immediate fetch, then subsequent View more uses its
progress. Browser Back restores without adding a history entry; explicit return uses
`/#articles` navigation. Refresh/new browser instance has no snapshot. One current
snapshot is replaced by later completed listing state rather than accumulating copies.

## Metadata Ownership

Ready accepted detail owns title/description/canonical social URL/type and optional image
tags. Loading/error/not-found cannot retain misleading prior-article metadata. Use
idempotent update/removal by owned selectors; route change invalidates old writers.
Home restoration supplies canonical metadata, not unconditional global tag removal.
