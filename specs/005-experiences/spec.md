# Feature Specification: Experiences Section

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Render the five user-supplied roles as static, naturally sized blueprint
cards. Preserve wording, dates, locations and claims; one supplied achievement paragraph
per bullet; approved tags; no logos, links, truncation or expansion.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Complete Work History (Priority: P1)

A visitor reads all five roles newest first with title/company, dates, location,
complete achievements and approved tags.

**Why this priority**: Full professional context is the section's primary value.
**Independent Test**: Compare all rendered content with the approved content contract.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** Experiences renders, **Then** five cards appear
   newest first with three separate Infosys roles.
2. **Given** any card, **When** read, **Then** every supplied achievement paragraph
   appears as one complete bullet without truncation, rewriting or added claims.
3. **Given** dates, locations and tags, **When** inspected, **Then** each exactly
   matches its approved role data.

---

### User Story 2 - Read Static Accessible Cards (Priority: P1)

A visitor reads naturally expanding cards on narrow/enlarged displays without
unnecessary interactions or keyboard stops.

**Why this priority**: Dense content must remain readable in the shell's content column.
**Independent Test**: Inspect semantics, actual reflow and reduced-motion behavior.

**Acceptance Scenarios**:

1. **Given** long text/tags at 320px or 200% zoom, **When** rendered, **Then** content
   wraps and card height grows without clipping or page-wide horizontal scrolling.
2. **Given** keyboard navigation, **When** traversing the section, **Then** static
   cards/text are not extra Tab stops and achievements use semantic lists.
3. **Given** the reference styling, **When** hovered, **Then** border/glow/corner
   treatment appears without making cards clickable; reduced motion disables transitions.
4. **Given** shell composition, **When** rendered, **Then** there is exactly one
   shell-owned Experiences heading and the existing fragment destination works.

### Edge Cases

User confirmed all proposed cases on 2026-10-03: exact copy/dates/locations/claims,
one supplied paragraph per bullet including multi-sentence paragraphs; distinct
Infosys roles; wrapping titles/bullets/tags; no fixed height; semantic lists; one
heading; reduced-motion transitions disabled; no noninteractive Tab stops.
No additional user-supplied cases. Blocked fonts use foundation fallbacks.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Render exactly five roles in the approved order, with no merging of roles.
- **FR-002**: Preserve all supplied text, dates, locations and percentage claims exactly,
  normalizing layout whitespace only. Do not add reference sample claims/citations.
- **FR-003**: Display all achievements as bullets, one supplied paragraph per bullet,
  even when it contains multiple sentences; no clamp, fixed height or read-more.
- **FR-004**: Display approved tags for each role as recorded in the content contract.
- **FR-005**: Use reference blueprint surfaces, border, corner marks, typography and hover
  glow; cards are static, with no click behavior, company links, logos or expansion controls.
- **FR-006**: Render title/company, dates and location above achievements and tags.
- **FR-007**: Wrap content at 320px and 200% zoom; preserve readability with unavailable fonts.
- **FR-008**: Use semantic achievement lists and no noninteractive Tab stops.
  Disable hover transitions under reduced motion.
- **FR-009**: Keep the shell-owned Experiences heading/anchor; no duplicate heading,
  page metadata ownership or new routes.
- **FR-010**: Write/observe failing acceptance tests before implementation; use only
  approved styles and ask before introducing missing design values.
- **FR-011**: This feature MUST NOT publish, alter other sections or redesign the
  existing generic article/archive card component.

### Key Entities

- **Experience**: Stable identity, title, company, location, date label, ordered
  achievement paragraphs and ordered approved tags.
- **Achievement**: Exact supplied paragraph, rendered as one list item.
- **Tag**: Approved label attached to one role, not an inferred extra technology.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Exactly five cards and 18 achievement bullets (6, 3, 4, 3, 2) render.
- **SC-002**: All titles, companies, dates, locations, achievement strings and tags
  equal the approved contract after whitespace normalization.
- **SC-003**: Zero links/buttons/logos/Tab stops or truncation controls inside cards.
- **SC-004**: One Experiences section heading; existing `/#experience` navigation preserved.
- **SC-005**: 320px, 200% zoom and blocked-font cases show full content without page-wide
  horizontal scrolling; reduced-motion hover transitions are disabled.

## Assumptions

### Global Loading Amendment (2026-10-03)

Lazy-load Experiences and its exact static role data together near the viewport,
or immediately on explicit/direct navigation. Permanent shell heading/anchor remains;
no eager role-data import through Home. "No runtime fetch" elsewhere in this spec
means no separate data API, not that the lazy JavaScript chunk is already downloaded.
Follow the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

- Implementation depends on completed styles001/shell002, currently planning artifacts.
- User-supplied employment/achievement statements are public-portfolio content approved
  by the owner; this feature does not claim independent employer verification.
- "Present" is preserved, not automatically changed by inferred employment status.
- No missing content fallback needed: this is static approved data, not a fetched feed.
