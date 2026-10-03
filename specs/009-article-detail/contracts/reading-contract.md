# UI and Content Contract: Article Detail

## Route and Layout

Retain `/work/articles/:id`, source Dev.to owner siddev and route-lazy activation.
Root reading mode removes sticky identity/navigation column, retains blueprint canvas
and bottom-only Contact/social actions once. Back to Articles above article content.
Centered48rem maximum reading surface;1.5rem side padding;3rem vertical padding;
1.5rem major-block gaps. Width/padding must not overflow narrow screens.
No forced root size, new palette or numeric sizing not approved by the owner.

## Header and Body

One h1: existing Inter2.75rem/700 title. Available date, all tags and reading time
use existing metadata/tag roles. Valid source Read on Dev.to link opens safely in new
tab. Omit missing optional values without fabricated labels/data.
Body uses Inter0.95rem/1.6, left aligned; subordinate headings use existing approved
roles without resetting heading hierarchy. Preserve complete safe paragraphs/lists/
code/tables/images/links. No whole-body tabindex, cover banner or title duplication.
No TOC/share/comment/reaction/related-post feature.

Render sanitized HTML, not blindly trusted API content. Preserve safe source formatting
without executing scripts/inline handlers/unsafe URL schemes. Annotate valid external
anchors under006 after sanitized rendering/replacement. Native browser actions remain.
Responsive body images; broken images show supplied alt text or Article image unavailable.
as accessible text, no placeholder images/artificial image dimensions. Keep valid image
metadata independent from visible banner removal.
Code/tables scroll locally and remain keyboard-readable, not page-wide overflow.

## Feedback

| Condition | Presentation |
|-----------|--------------|
| Route code pending | Lightweight shell loading status; skeleton once available |
| Route code failed | This page couldn't be loaded. + Retry + Back to Articles |
| Article data pending | Approved skeleton/status, no artificial delay |
| Invalid ID/404/wrong owner | Article not found. + Back to Articles |
| Network/rate-limit/malformed/missing body | Article couldn't be loaded. + Retry |
| Ready | Accepted current body/header; no previous-article content |

Use fixed skeleton colors independent of OS theme, static reduced motion and visible
focus. Explain error states without raw server dumps. Block duplicate retries.

## Return and Lifecycle

Back to Articles destination `/#articles`. From a prior listing, restore completed
cards/reading offset and initiating-card keyboard focus through Home's sole navigation
owner; browser Back also restores. Direct entry without snapshot activates listing
normally. In-memory snapshot only; refresh starts fresh. Cancel requests on departure.
New ID/route exit invalidates late responses, image/link callbacks and metadata writers.
Keep snapshot data inert; no hidden Home/background fetch or persistent contact data.

## Accepted Tests

Success with rich safe body; invalid ID/404/wrong owner; network429/error/malformed/
missing body; missing metadata/source URL; image errors with/without alt; long title/
prose/code/table; unsafe markup; route-code error/retry; rapid ID switch/destruction;
current metadata/no duplicate tags; return after multiple007 batches/interrupted append;
browser Back/direct entry/refresh; reduced motion, blocked fonts,320px/200%zoom.
Use controlled responses, not live Dev.to. Native scroll/focus/layout evidence is required.
