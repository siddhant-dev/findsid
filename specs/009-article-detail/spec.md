# Feature Specification: Blueprint Article Detail

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Redesign the existing separate article-detail page as an accessible
blueprint reading layout while preserving the owner's complete Dev.to content.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the Complete Article (Priority: P1)

A visitor reads an owner's article in a dedicated reading layout without the sticky
identity column, using the fixed blueprint background and typography.

**Why this priority**: The detail page showcases the owner's complete writing.
**Independent Test**: Load controlled owner article content and inspect its complete
structure, metadata and responsive reading surface.

**Acceptance Scenarios**:

1. **Given** valid owner content, **When** loaded, **Then** title, available publication
   date, all tags, available reading time and Read on Dev.to appear.
2. **Given** article body, **When** read, **Then** complete content/structure and body
   images remain, without a separate cover banner or whole-body Tab stop.
3. **Given** wide code/tables/images, **When** read on a narrow display, **Then** prose
   remains left-aligned, images adapt and wide content scrolls locally.
4. **Given** body image failure, **When** shown, **Then** accessible fallback text
   replaces the broken image without breaking the reading layout.
5. **Given** the detail layout, **When** inspected, **Then** Back to Articles precedes
   content and bottom-only Contact/social actions follow it; no sticky identity column.

---

### User Story 2 - Recover and Return to Articles (Priority: P1)

A visitor understands loading/errors and returns to the previously browsed listing.

**Why this priority**: Reading must not lose browsing progress or expose unrelated content.
**Independent Test**: Control requests, route transitions and prior listing state.

**Acceptance Scenarios**:

1. **Given** loading, **When** waiting, **Then** skeleton/status feedback appears.
2. **Given** request failure, **When** shown, **Then** explicit error and Retry appear;
   a missing article has a distinct not-found state.
3. **Given** wrong-owner data, **When** received, **Then** it is not displayed.
4. **Given** changed article ID or departure, **When** stale requests finish, **Then**
   stale content cannot overwrite the current route or destroyed page.
5. **Given** entry from the listing, **When** Back to Articles is selected, **Then**
   `/#articles` restores revealed cards and prior reading position.
6. **Given** direct detail entry without prior listing state, **When** returning,
   **Then** normal Articles activation/loading applies.

### Edge Cases

User approved the complete proposed direction and cases on 2026-10-03: dedicated
reading layout, no identity sidebar, complete body, missing-image fallback, local wide
content scrolling, loading/error/not-found, owner filtering, stale-request cancellation
and listing restoration. Additional cases were requested; none supplied.
Previously confirmed keyboard, reduced motion, blocked fonts, narrow/zoom and safe
external-link behavior apply. Final grouped approvals: 48rem reading width, 1.5rem
side padding/gaps, 3rem vertical padding, existing title/body/metadata roles; invalid
ID/404/wrong-owner not-found; malformed/missing-body/network/rate-limit retryable error;
body alt-text fallback; browser-session in-memory listing restoration including Back;
explicit route-code error/Retry/Back; sanitized HTML and current-article metadata.
All necessary decisions are approved; no additional user cases supplied.

On 2026-10-04 the owner approved cache-busted lazy-code Retry for 009 and 010
after native testing demonstrated cached rejected imports. Only explicit Retry
after a code-load failure may use a fresh application-owned module URL. Normal
loads remain lazy and unchanged; global reload, automatic retries and cache-busting
article data requests remain prohibited. Duplicate actions and stale completion
must remain guarded. Approval changes the policy, not the verification status.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Preserve `/work/articles/:id`, public Dev.to source and owner `siddev`.
- **FR-002**: Use a dedicated blueprint reading layout without sticky identity column,
  with Back to Articles above content and bottom-only Contact/social actions below.
- **FR-003**: Show title, available date, all tags, available reading time and a valid
  source Read on Dev.to link; external links open safely in new tabs.
- **FR-004**: Remove the separate cover banner; retain complete body content/structure
  and body images with accessible fallback text on image failure.
- **FR-005**: Left-align prose, adapt images/tables and scroll wide code/tables locally;
  no noninteractive whole-body Tab stop or clipping of content.
- **FR-006**: No extra table of contents, share controls, comments, reactions or related posts.
- **FR-007**: Lazy-load route code; show skeleton/status, explicit error/Retry and
  distinct not-found state. Filter owner and cancel stale request/render work.
- **FR-008**: Back to Articles returns to `/#articles` and restores previously revealed
  cards/reading position when available; direct entry falls back to normal listing.
- **FR-009**: Center content with a 48rem maximum reading width, 1.5rem side padding,
  3rem vertical padding and 1.5rem gaps between major header/content blocks. Use
  approved 2.75rem/700 title, 0.95rem/1.6 body and existing heading/metadata roles;
  shrink naturally and wrap long titles without forcing the root font size.
- **FR-010**: Invalid ID, HTTP404 and wrong-owner content show "Article not found."
  with Back to Articles. Network/rate-limit/malformed/missing-body failures show
  "Article couldn't be loaded." with Retry. Image failure displays supplied alt
  text or "Article image unavailable." without replacement images/artificial dimensions.
- **FR-011**: Require observed failing behavioral tests before implementation,
  controlled responses, native accessibility/media checks and explicit errors.
- **FR-012**: Planning does not implement/install/execute implementation tasks/commit/
  publish; task generation was separately approved on 2026-10-03. Preserve unrelated
  work and require separate CI safeguards before redesign PR automation.
- **FR-013**: Retain listing return snapshots in memory for the current browser
  session, not persistent storage. Cancel active work on departure; restore completed
  cards without immediate refetch. Browser Back also restores progress; refresh starts fresh.
- **FR-014**: Route-code failure shows "This page couldn't be loaded." with Retry
  and Back to Articles, not blank/success-shaped fallback content. Explicit code
  Retry may cache-bust the failed application-owned module load without reloading
  the document. Prove actual failed-chunk recovery in a native browser.
- **FR-015**: Sanitize article HTML without blind trust, preserving safe article
  formatting/links. Update current article title/social metadata and restore Home
  metadata on return; stale responses cannot write metadata.

### Key Entities

- **Article detail**: Owner identity, title, optional metadata/source URL and full body.
- **Reading session**: Current route ID, request generation and loading/ready/error/not-found.
- **Listing return snapshot**: Previously revealed cards and reading position, without
  active background requests; one inert snapshot retained only in current browser-session
  memory. Explicit return and browser Back restore it; refresh starts fresh, as in FR-013.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Complete accepted article content is available with zero separate cover
  banners, identity sidebars or added comment/share/related-content controls.
- **SC-002**: Wrong-owner/stale responses display zero unrelated or outdated articles.
- **SC-003**: Loading/error/not-found are distinct; approved narrow/zoom/font cases have
  no page-wide horizontal scrolling.
- **SC-004**: Return navigation restores prior revealed cards/reading position when
  a listing snapshot exists, otherwise initializes normal Articles loading.
- **SC-005**: Approved rem geometry/typography renders with no clipped long content;
  failed images show the approved text and no separate banner.
- **SC-006**: Unsafe article markup cannot execute; safe formatting remains readable;
  navigation produces current-page metadata without duplicate/stale article tags.

## Assumptions

- Foundation001, amended shell002, external-link/card006 and Articles007 precede
  implementation. Contact action remains current route until its modal feature.
- Homepage reference supplies palette/typography, not a detail-page layout.
- Card image removal does not require removal of detail social metadata images.
- Listing restoration refines007's route-destruction behavior: cancel requests on exit,
  retain one current in-memory return snapshot; no ongoing hidden fetch.
