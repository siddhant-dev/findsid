# Data Model: Articles Section

Proposed contracts, not application code.

## Accepted Article

| Field | Meaning/rule |
|-------|--------------|
| sessionKey | Stable identity for rendering within this mounted listing |
| sourceId | Optional positive safe-integer Dev.to ID; valid IDs support deduplication |
| owner | Validated user.username equals siddev |
| title | Required nonblank string; preserve supplied content |
| description | Optional string, complete text; absent/blank omitted |
| tags | All available string labels in source order, per006 adapter |
| publicationInstant | Valid machine publication timestamp, otherwise absent |
| dateLabel | Available display label only if publicationInstant is valid |
| encounterOrder | Stable source order for equal dates and undated records |
| card | Adapted feature006 view, including Archived for no valid destination |

Validate raw response as unknown. Non-array envelope is a retryable protocol error,
not individual-record rejection or successful empty. Reject invalid record object,
missing usable title, wrong/missing owner or invalid non-optional shape; log reason
without full payload. Missing dates/descriptions/tags follow approved omission rules,
not record rejection. Never fabricate required text. Valid title/content with invalid
ID uses Archived behavior rather than introducing an inconsistent card exception.

## Listing Session

**Return snapshot009 amendment**: Disposal cancels active work but may retain one
plain-data committed checkpoint for detail return/browser Back: displayed sequence,
buffers/lookahead/deferred data, accepted IDs, committed cursor/end state, relative
reading offset and initiating card key. Do not persist pending callbacks/requests or
uncommitted operation. Restore checkpoint without initial refetch; refresh clears memory.

| Field | Meaning |
|-------|---------|
| displayed | Committed card sequence; unchanged on append failure |
| staged | Current batch candidates not yet committed |
| datedBuffer | Accepted dated records available for current/future batches |
| undatedBuffer | Deferred records, available only after raw-source exhaustion |
| acceptedIds | First accepted valid IDs across displayed/staged/buffered records |
| nextPage | Raw source page to request; advances only on successful processing |
| rawRemainder | Unconsumed accepted page content; never lost on retry |
| sourceExhausted | Successful raw response length below per_page, not filtered count |
| sourceHadRecords | Distinguishes truly empty source from entirely rejected content |
| hasMore | Accepted lookahead exists, including deferred records after exhaustion |
| operation | Current initial/append intent, request and generation ownership |
| inputModality | Keyboard-originated operation for approved focus transfer |
| state | initial-loading, ready, empty, initial-error, appending, append-error, disposed |

## Batch Rules

Batch size is ten. Consume newest dated candidates first; when exhausted, consume
undated candidates in encounter order. Ensure one accepted record beyond the batch
or confirmed exhaustion before committing so View more is accurate. Lookahead remains
buffered, not rendered early. This may require extra source requests even on initial load.
Skip duplicate/rejected-only pages without terminating; an undated-only page is also
not exhaustion. Do not release undated candidates before later dated pages are consumed.
Source is documented newest-first; do not infer popularity ordering from an unfiltered feed.

Deduplicate only valid IDs and retain first accepted version. Rejecting an invalid
record does not reserve its ID against a later usable copy. A missing/invalid ID
cannot safely be deduplicated using title; use encounter identity instead.

## Transitions

- Mount -> initial-loading; initial complete batch -> ready; true empty -> empty;
  request/protocol failure or exhausted entirely unusable source -> initial-error.
- Ready with hasMore -> appending; successful commit -> ready with updated hasMore;
  failure -> append-error while displayed stays unchanged.
- Retry -> resume pending initial/append request with retained progress. For completed
  all-unusable-source error, start a fresh initial enumeration on explicit Retry.
- Any state -> disposed on destruction; cancel HTTP/render work and invalidate generation.
  Duplicate actions during loading have no second request chain.
- Exhaustion with zero new accepted cards after existing displayed cards is normal
  completion, not a new empty/data error. Preserve displayed cards and remove View more.

No automatic timed retries, localStorage cache or live-source polling. Network/rate
limits remain errors; valid HTTP response with zero source articles is the only empty success.
