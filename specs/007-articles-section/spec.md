# Feature Specification: Articles Section

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Showcase the owner's complete writing portfolio through ten-card initial
and appended batches in a responsive homepage grid, with accessible loading and retry.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the Complete Writing Portfolio (Priority: P1)

A visitor reads the owner's articles newest first and uses View more to reveal
remaining articles without leaving the portfolio.

**Why this priority**: Writing sells the owner's skills to potential employers.
**Independent Test**: Supply controlled paged data and browse every accepted record.

**Acceptance Scenarios**:

1. **Given** at least ten usable unique articles, **When** initial loading succeeds,
   **Then** exactly ten cards appear, with View more only when further usable cards exist.
2. **Given** fewer than ten remaining articles, **When** loading succeeds,
   **Then** all remaining articles appear and View more disappears.
3. **Given** View more, **When** selected, **Then** ten usable unique cards are appended
   without replacing existing cards, or the smaller remainder on source exhaustion.
4. **Given** valid dates, **When** displayed, **Then** articles are newest first;
   otherwise usable articles with absent/invalid dates have no date and appear last.
5. **Given** an article card, **When** activated, **Then** feature006 behavior and
   the existing separate article-detail route remain intact.

---

### User Story 2 - Understand Loading and Recover from Errors (Priority: P1)

A visitor distinguishes loading, genuinely empty results and errors, and retries
without losing already displayed content.

**Why this priority**: External-source failures must not resemble an empty portfolio.
**Independent Test**: Control initial/append responses and retries, including rate limits.

**Acceptance Scenarios**:

1. **Given** initial loading, **When** waiting, **Then** skeleton cards and an
   accessible loading status appear, without fabricated cards or extra focus stops.
2. **Given** append loading, **When** waiting, **Then** existing cards remain and
   View more is disabled with "Loading more..." text.
3. **Given** initial failure, **When** shown, **Then** an explicit error and Retry appear.
4. **Given** append failure, **When** shown, **Then** existing cards remain with an
   inline error and Retry loading more for that failed batch.
5. **Given** an incomplete pending batch followed by a failed request, **When**
   Retry succeeds, **Then** the batch completes without restarting or duplicating cards.
6. **Given** a genuinely empty successful source, **When** completed, **Then**
   "No articles published yet." appears with no View more or Retry.
7. **Given** nonempty source data but no usable articles after completed retrieval,
   **When** shown, **Then** "Articles couldn't be loaded." and Retry appear, not empty success.

---

### User Story 3 - Browse an Accessible Responsive Grid (Priority: P1)

A visitor reads full cards at different sizes and moves directly to newly loaded content.

**Why this priority**: Complete writing must remain readable and easy to browse.
**Independent Test**: Inspect actual grid widths, keyboard focus and reduced-motion behavior.

**Acceptance Scenarios**:

1. **Given** the available section width, **When** rendered, **Then** the grid uses
   a 17.5rem minimum, 1.5rem gaps and at most three columns; a narrow single column
   can shrink below the minimum without horizontal page overflow.
2. **Given** user font settings, narrow screens, 200% zoom or blocked fonts, **When**
   rendered, **Then** full card content wraps and the root font size is not forced.
3. **Given** successful View more, **When** new cards render, **Then** scroll to the
   first new card and focus its link for keyboard users; reduced motion is instant.
4. **Given** a first new card that is static Archived content, **When** moving keyboard
   focus, **Then** focus its heading programmatically without adding a normal Tab stop.
5. **Given** Home composition, **When** rendered, **Then** one shell-owned Articles
   heading/anchor and homepage metadata remain unchanged.

### Edge Cases

Confirmed on 2026-10-03:
- Ten usable unique cards initially and per append, or the available remainder.
- Retain existing cards; newest first; undated/invalid-date articles last with date hidden.
- Reject unusable articles individually; no visible rejection warning. Keep explicit
  diagnostics rather than silently swallowing rejections or inventing content.
- Deduplicate by valid article ID, keeping the first accepted version.
- Continue through rejected/duplicate-only pages; never treat them as source exhaustion.
- Only completed nonempty retrieval with no usable articles yields the data-error state.
- Keep incomplete batches pending on failure; Retry resumes rather than restarts.
- Initial skeletons; disabled Loading more button; distinct initial/append retry and empty states.
- Prevent duplicate load/retry operations; hide View more after exhaustion; network/
  rate-limit failures are retryable; cancel on departure and ignore destroyed-section responses.
- Move to new cards; heading focus fallback for Archived cards; reduced-motion instant scroll.
- Responsive grid and rem gaps as approved above; inherited feature006 card edge cases.

Additional user cases were requested in the final grouped approval; none supplied.
Earlier "show everything immediately" was superseded by ten-card/View more behavior.
Earlier all-unusable-page error behavior was superseded by continuing through those
pages and deciding at completed retrieval. No unresolved user question remains.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Initially display ten usable unique articles, or the available smaller total.
- **FR-002**: Retrieve only the owner's published Dev.to articles (`siddev`).
- **FR-003**: Use feature006 cards; preserve article-detail routing and its separate redesign scope.
- **FR-004**: Keep one shell-owned Articles heading/anchor and homepage metadata.
- **FR-005**: Order dated articles newest first; retain otherwise usable undated/
  invalid-date articles after dated articles and omit their date metadata.
- **FR-006**: Show initial skeleton cards; while appending keep existing cards visible
  and disable View more with "Loading more..." text.
- **FR-007**: Reject unusable individual records, not their usable batch peers; no
  visible omission warning. Record diagnostic reasons without complete payloads.
  Continue through rejected/duplicate-only pages.
- **FR-008**: Preserve detail-page data/images, routes and metadata outside this scope.
- **FR-009**: Require observed failing behavioral tests before implementation and
  controlled service responses, not live Dev.to. Use only approved styles.
- **FR-010**: Do not implement/install/execute implementation tasks/commit/publish
  during planning; task generation was separately approved on 2026-10-03.
  No release-version change or waiver of separately required CI safeguards.
- **FR-011**: Use available-width responsive grid sizing: 17.5rem minimum card width,
  1.5rem gaps and at most three columns. Shrink a narrow single column without overflow.
  Use rem layout gaps rather than fixed pixels without forcing root font size.
- **FR-012**: View more appends ten usable unique articles, or the smaller remainder,
  retaining existing cards; show it only when further usable cards exist.
- **FR-013**: Initial failure shows explicit error and Retry; append failure keeps
  existing cards with inline error and Retry loading more for that batch.
- **FR-014**: Only successful genuinely empty retrieval shows "No articles published
  yet." without View more/Retry. Completed nonempty retrieval with no usable articles
  shows "Articles couldn't be loaded." and Retry instead.
- **FR-015**: Deduplicate by article ID, retaining the first accepted version.
- **FR-016**: Continue source pagination to fill ten usable unique cards or reach
  exhaustion; skip unusable records and duplicates without silently capping the portfolio.
- **FR-017**: Block duplicate operations, provide retryable network/rate-limit errors,
  cancel pending work on destruction and ignore late responses.
- **FR-018**: Commit batches only on completion/exhaustion. Preserve pending collected
  cards and displayed content on request failure; Retry resumes that operation.
- **FR-019**: Successful View more scrolls to the first new card and focuses its link
  for keyboard users, or its heading programmatically if Archived. Reduced motion
  scrolls instantly. Do not add noninteractive Tab stops.
- **FR-020**: Skeletons use the fixed blueprint palette regardless of OS color
  preference and remain static under reduced motion.

### Key Entities

- **Article**: Owner content adapted to the approved card, sortable publication date
  separate from its optional display label, and source identity.
- **Batch**: Up to ten usable unique cards, pending until the operation succeeds.
- **Listing session**: Displayed cards, pending cards, source progress, duplicate
  identities, deferred undated cards, more/exhaustion state and retry lifecycle.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every successful operation adds exactly ten usable unique cards unless
  fewer remain; all accepted source articles can eventually be revealed.
- **SC-002**: Zero repeated valid article IDs; dated articles descend chronologically
  and undated articles follow them.
- **SC-003**: Loading, empty, initial error and append error remain visibly distinct;
  failed partial batches add zero cards until resumed successfully.
- **SC-004**: At most three columns, approved rem gaps, no page-wide horizontal overflow
  at 320px/200% zoom/blocked fonts or enlarged user font settings.
- **SC-005**: First appended card receives the approved scroll/keyboard focus behavior;
  reduced-motion scroll and skeleton treatment are static/instant.
- **SC-006**: Exactly one shell-owned Articles heading; existing detail destinations
  remain usable; destroyed sections receive no late updates.

## Assumptions

### Article-Detail Return Amendment009

User approved in-memory current-browser-session restoration of revealed cards and
reading position on explicit Back to Articles and browser Back. Cancel active work
on departure, but retain completed listing state/checkpoint in one inert snapshot.
Restore without immediate refetch; refresh starts fresh, no localStorage. This refines
the original destruction behavior, not permission to keep hidden requests running.

### Global Loading Amendment (2026-10-03)

Lazy-load the Articles component near the viewport or immediately on explicit/direct
Articles navigation. Only activation starts its initial article request; permanent
shell heading/anchor and eager About do not initiate it. Skeleton/status covers active
loading without a forced delay; preserve all approved batch/retry behavior.
Follow the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

- Styles001, shell002 and cards006 are planned implementation prerequisites.
- All available means published source content, not drafts/deleted articles.
- Fixed-source fixtures can prove enumeration/order; the public paginated API does
  not promise a snapshot while the owner concurrently publishes/deletes articles.
- Stable source-order tie breaking for equal dates/undated articles avoids invented
  curation. No new date format is required.
- Boneyard research is not runtime proof; inherit mandatory integration smoke check
  and no force-peer workaround or silent substitution from feature004.
