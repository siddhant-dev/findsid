# UI and Retrieval Contract: Articles Section

Authority: [spec](../spec.md), [cards006](../../006-blueprint-cards/contracts/card-contract.md),
[shell002](../../002-sticky-shell/contracts/shell-contract.md) and fixed foundation001.

## Composition and Grid

Home owns `articles` / `articles-heading`. Listing supplies a semantic collection,
status and bottom actions, not a duplicate heading/anchor or homepage metadata writer.
Cards use006 unchanged except parent layout containment; Experience cards stay separate.
Use available section width, minimum17.5rem tracks and gap1.5rem, with at most three
columns. One column shrinks below its minimum at narrow widths. Derive fitting thresholds
from approved track/gap values; do not invent viewport breakpoints or fixed root font size.
Use rem for layout gaps and reference-equivalent spacing. Do not double card margin
and grid row gap. All typography/text/tags grow and wrap; no fixed-height grid cards.

## States

| State | Visible content/action |
|-------|------------------------|
| Initial loading | Ten decorative skeleton card shells and accessible Loading articles status |
| Ready, more | Committed cards and View more |
| Ready, exhausted | Committed cards; no View more |
| Appending | Existing cards; disabled button reading Loading more...; accessible busy status |
| Empty | No articles published yet.; no View more or Retry |
| Initial error | Explicit error plus Retry |
| Append error | Existing cards; inline error plus Retry loading more |
| Entirely unusable source | Articles couldn't be loaded. plus Retry; not empty |

Use explanatory error text, not raw server dumps. No visible per-record omission warning.
Reject diagnostics contain reason/source identity when available, not article payload/body.
Use foundation button/error/loading styles. Skeletons are aria-hidden, inert and have
no image requests; accessible status is separate. Fixed boneyard color/darkColor prevent
OS preference changes, and explicit reduced-motion binding disables shimmer.
Reuse reference card geometry and text roles; no new bar-height/duration assumptions.

## Source and Batch Contract

Public owner-filtered source, explicit page/per_page10. Every initial/append display
operation commits ten accepted unique records or the smaller exhausted remainder.
Keep one usable lookahead to distinguish more from exhausted. Continue past unusable/
duplicate-only pages; reserve missing/invalid-date records for the end. Sort by machine
date, not readable display text. Retain stable source order for ties.

Network/rate-limit/protocol errors preserve pending progress. Retry resumes failed page;
successful pages are not restarted. All-invalid-source explicit Retry starts fresh.
Nonempty wholly rejected source is not empty. Duplicate operations are blocked.
No API key, authenticated private drafts, fake-success catch or fetch of article bodies
for card listing. Detail API/images/metadata remain usable and out of redesign scope.

## Append Focus and Navigation

**Detail-return009 amendment**: Preserve committed data/checkpoint and reading offset
in browser memory when leaving for detail; cancel active work. Explicit return and
browser Back restore without immediate fetch through Home navigation ownership.
No localStorage/hidden Home/background requests; refresh loses snapshot. This is
separate from View more focus behavior below.

After successful append with new cards, scroll to first new card. Keyboard users focus
its link, or programmatically focus heading with tabindex=-1 if it is Archived.
Pointer activation does not unnecessarily force keyboard focus. Reduced motion uses
instant scrolling; otherwise reuse shell approved scroll behavior. No URL/history writes.
Coordinate explicit append intent with shell layout compensation, not a competing scroll
handler. If navigation/user interruption invalidates the intent, do not later steal focus.
Cancelled or failed append does not scroll to staged content.

Hide the bottom control on exhaustion without stranding focus; normal successful final
append focus goes to its first new card. If no cards were added, retain a stable section
focus fallback rather than focusing removed controls. Same-Home fragments retain session;
route destruction cancels session/requests/render callbacks and blocks late updates.

## Required Controlled Cases

0/1/9/10/11/20/21 usable records; full and short raw pages; individually malformed
records mixed with valid data; rejected-only/duplicate-only middle pages; duplicates
within/across pages; entirely unusable source; malformed envelope; wrong-owner records;
missing/invalid dates followed by later dated pages; equal dates; valid Archived cards;
failure after partial accumulation/lookahead; retry without duplicate/stale commit;
network/429 failure; pending destruction; repeated clicks; exact final batch/exhaustion.

Native checks: container-based column count, rem gaps/enlarged font settings, 320px,
200% zoom, blocked fonts, reduced-motion static skeleton/instant scroll, keyboard focus,
long content and shell reading-position integration. No live Dev.to in acceptance tests.
