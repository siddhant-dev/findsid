# Feature Specification: Shared Blueprint Article and Retro Vault Cards

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Redesign the shared Article/Retro Vault card before their section features,
using the blueprint reference. Experience cards remain separate static rendering.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Complete Text-Only Cards (Priority: P1)

A visitor reads a card's title and complete description without images or expansion
controls, and sees its publication date when supplied.

**Why this priority**: Cards communicate the owner's writing and archived projects.
**Independent Test**: Render controlled article and archive records with and without
publication dates and compare their visible text with the supplied content.

**Acceptance Scenarios**:

1. **Given** either card type, **When** rendered, **Then** no cover image appears.
2. **Given** a long description, **When** read, **Then** the complete description
   is visible without truncation or a read-more action.
3. **Given** an available publication date, **When** rendered, **Then** it is visible.
4. **Given** no publication date, **When** rendered, **Then** the date metadata is hidden.
5. **Given** multiple supplied tags, **When** rendered, **Then** every tag is visible
   as a wrapping chip rather than selecting only the first tag.
6. **Given** absent description or tags, **When** rendered, **Then** their areas
   are omitted without placeholder text.
7. **Given** a publication date, **When** rendered, **Then** it is the only metadata
   above the title, without an additional source/archive label.

---

### User Story 2 - Open a Card's Destination (Priority: P1)

A visitor activates any part of the card to open its destination.

**Why this priority**: A single card-wide action makes the destination easy to select.
**Independent Test**: Activate controlled cards and verify internal and external
navigation without contacting live services.

**Acceptance Scenarios**:

1. **Given** an article card, **When** activated, **Then** its existing separate
   article-detail destination opens in the same tab.
2. **Given** a Vault card with an external destination, **When** activated,
   **Then** the destination opens in a new tab.
3. **Given** a card's non-image content area, **When** activated,
   **Then** the same card destination is used.
4. **Given** a missing or invalid destination, **When** rendered, **Then** the card
   stays visible with "Archived", without a link, Tab stop or interactive glow.
5. **Given** a clickable card, **When** navigated with the keyboard, **Then** it
   has one meaningful link focus stop, visible focus and native Enter activation.
6. **Given** a valid card link, **When** Ctrl/Cmd-clicked or opened through native
   link actions, **Then** browser link behavior is preserved.

---

### User Story 3 - Read Accessible Blueprint Cards (Priority: P1)

A visitor reads complete cards on narrow or enlarged displays, with unavailable
fonts or reduced-motion preferences.

**Why this priority**: Text-only cards must remain readable without hidden content.
**Independent Test**: Check actual reflow, font fallbacks and browser motion/focus states.

**Acceptance Scenarios**:

1. **Given** long titles/descriptions/tags at 320px or 200% zoom, **When** rendered,
   **Then** text wraps and card height grows without clipping or page-wide scrolling.
2. **Given** unavailable web fonts, **When** rendered, **Then** fallback fonts
   preserve readable content and usable links.
3. **Given** a clickable card, **When** hovered, **Then** its blueprint border/glow
   appears; reduced motion disables transitions.
4. **Given** the existing shell, **When** cards render, **Then** section headings,
   anchors and metadata ownership remain unchanged.

### Edge Cases

Confirmed by the user on 2026-10-03:
- Missing publication date hides the date metadata.
- Publication date is the sole metadata above the title; no additional source/archive label.
- All card images are removed, not replaced with placeholders.
- Full descriptions remain visible.
- All available tags appear as wrapping chips; do not limit cards to the first tag.
- Missing descriptions or tags omit their areas without placeholder text; retain
  the title and any available content.
- The entire card is clickable.
- A card without a valid destination remains visible but non-clickable and shows
  "Archived" for either card type, including articles. This approved display label
  does not independently verify that content was intentionally retired.
- External URLs open in new tabs throughout the app, not just on cards.

User approved the proposed accessibility/reflow/motion cases on 2026-10-03:
native Enter/Ctrl/Cmd-click behavior; one meaningful link Tab stop per clickable card;
visible focus and hover glow; no Tab stop or interactive glow for Archived cards;
full wrapping at 320px and 200% zoom; blocked-font fallbacks; reduced-motion
transitions disabled. Additional user cases were requested; none were supplied.
Missing date/description/tags and missing/invalid destinations were separately confirmed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Redesign the shared Article/Retro Vault card using the fixed navy/cyan
  blueprint appearance and approved typography. Do not redesign static Experience cards.
- **FR-002**: Remove all card images; do not introduce image placeholders.
- **FR-003**: Show the title and complete description without clamping, fixed-height
  clipping, expansion controls or rewritten content.
- **FR-004**: Show publication date only when available; hide it when absent.
- **FR-005**: Make the entire card activate its single destination.
- **FR-006**: Preserve the existing separate article-detail route and same-tab behavior.
- **FR-007**: External URLs MUST open in new tabs throughout the app with safe opener
  isolation. This global decision supersedes card-only external-navigation treatment.
- **FR-008**: Show all available tags as wrapping chips, not only the first tag.
- **FR-015**: Publication date is the sole metadata above the title; do not add
  "Published on Dev.to", "Retro Vault" or other source/archive labels.
- **FR-009**: Keep cards without a valid destination visible but non-clickable.
  Show "Archived" for either card type, including articles, without a link or
  interactive affordance.
- **FR-016**: Omit absent descriptions and tags without placeholder text; retain
  the title and any available content.
- **FR-010**: Provide native link actions, one meaningful Tab stop per clickable card,
  visible focus/hover glow, responsive full-text/tag wrapping at 320px and 200% zoom,
  font fallbacks and no transitions under reduced motion. Archived cards MUST NOT
  have link semantics, a Tab stop or interactive glow.
- **FR-011**: Keep section listing limits/order, loading/empty/failure/retry design,
  archive content curation and article-detail redesign in their own features.
- **FR-012**: Use only approved reference/foundation design values; ask before adding
  any missing numerical styling value.
- **FR-013**: Require acceptance-relevant tests observed failing for missing behavior
  before implementation. Use controlled article/archive data, not live services.
- **FR-014**: Planning work MUST NOT implement application changes, install packages,
  execute implementation tasks, commit or publish. Task generation was separately
  approved on 2026-10-03. No release-version change belongs to this feature.

### Key Entities

- **Card**: Article or archive item with identity, title, full description, optional
  publication date, all supplied tags, and a destination.
- **Destination**: Existing internal article-detail location or archive destination;
  external locations open in new tabs.
- **Publication date**: Supplied date metadata, omitted when unavailable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both card types display zero images or image placeholders.
- **SC-002**: All supplied description text is visible without expansion or truncation.
- **SC-003**: Publication dates appear for records that supply them and are absent
  for records without them.
- **SC-004**: Every approved valid card destination can be activated across the card;
  articles retain their separate detail pages and external links open in new tabs.
- **SC-005**: Every supplied tag is displayed as a wrapping chip.
- **SC-006**: Each clickable card has exactly one link Tab stop; Archived cards have
  zero. Native activation and link actions work without nested interactive controls.
- **SC-007**: Approved narrow/zoom/font cases preserve all text without page-wide
  horizontal scrolling; reduced-motion card transitions are disabled.

## Assumptions

### Global Loading Amendment (2026-10-03)

Shared card code loads with deferred Articles/Vault consumers, not through eager Home
imports. This shared component does not independently observe the viewport or fetch data.
Preserve eager shell/About and lazy-route external-link policy integration without
bringing article-detail code into initial JavaScript.
Follow the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

- Styles001 and shell002 are dependencies, currently planned rather than implemented.
- `ideas/gemini.index.html` supplies visual structure, not approved article/archive copy.
- Existing models provide a single tag and required date/image fields; these baseline
  shapes do not override the newly confirmed optional-date and image-free presentation.
- App-wide external-link behavior is confirmed; its precise migration scope must be
  inventoried in planning without prematurely redesigning unrelated components.
- Necessary decisions and proposed edge cases are approved; planning may proceed.
