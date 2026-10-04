# Feature Specification: Static About Me Section

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Content amendment (2026-10-04)**: The owner approved the replacement About paragraph
and future owner edits. Exact-copy/wording and text-size/length acceptance assertions
are retired. This amendment supersedes FR-001, the copy-equality part of SC-001 and
earlier unchanged-copy references below. Structure, accessibility, static rendering,
side-effect isolation and responsive overflow requirements remain. About tests do
not assert numerical font-size/line-height; shared style-contract tests remain separate.
**Input**: Redesign only About me after styles and shell. Keep existing paragraph wording;
remove photo, greeting and typewriter. Use muted, left-aligned Inter 0.95rem text with
line-height 1.6 across the content column, without a card. User confirmed all decisions
and proposed edge cases individually on 2026-10-03.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a Static Introduction (Priority: P1)

A visitor reads the existing personal introduction beneath one About me section heading,
without a second identity greeting, photo or animation.

**Why this priority**: The shell already introduces the owner; this section supplies
personal context without duplicating that introduction.

**Independent Test**: Inspect the composed homepage and compare the paragraph to the
approved existing text.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** About me renders, **Then** exactly one About heading
   and one unchanged paragraph appear within that section.
2. **Given** About me, **When** it is read or observed over time, **Then** it has no
   photo, Hello greeting, animated identity text, blinking cursor or replacement image.
3. **Given** the content column, **When** rendered, **Then** the paragraph is muted,
   left-aligned Inter 0.95rem with line-height 1.6, full available column width and no card.

---

### User Story 2 - Read Accessibly Without Side Effects (Priority: P1)

A visitor can read static text on narrow screens or enlarged display settings without
extra keyboard stops, moving text or section-driven page metadata changes.

**Why this priority**: This is a content-only component, not a page or interactive widget.

**Independent Test**: Inspect narrow/zoom/font fallback rendering, keyboard order and
mount/unmount behavior.

**Acceptance Scenarios**:

1. **Given** 320px width, 200% zoom or blocked fonts, **When** text renders, **Then**
   the full paragraph remains readable without page-wide horizontal scrolling.
2. **Given** keyboard navigation, **When** tabbing through the page, **Then** the
   noninteractive About text does not introduce a Tab stop.
3. **Given** homepage metadata owned by the shell, **When** About mounts or unmounts,
   **Then** it neither adds nor removes page metadata.
4. **Given** repeated mount/unmount, **When** time advances, **Then** About creates
   no typing timers, callbacks or animation effects.

### Edge Cases

User approved: a single heading despite shell composition; no photo request/timer/cursor/
leftover animation; 320px and 200% zoom; blocked fonts; noninteractive text excluded from
Tab order; no section metadata ownership. Previously approved reduced-motion behavior
is satisfied by static content. No additional user-supplied cases.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The paragraph MUST remain owner-maintained static content. Tests MUST NOT
  constrain wording, punctuation, text size or length as the owner updates it.
- **FR-002**: The About section MUST contain exactly one heading and one paragraph.
  The shell-owned heading MUST NOT be duplicated inside the embedded component.
- **FR-003**: Photo and greeting/typewriter content MUST be removed without replacement.
- **FR-004**: All About-owned typing state, timers, cursor animation and photo styling/
  requests MUST be removed, not merely hidden.
- **FR-005**: Text MUST use approved Inter 0.95rem, line-height 1.6, muted color,
  left alignment and available column width, with no card border or justified layout.
- **FR-006**: Text MUST remain readable at 320px, 200% zoom and with unavailable fonts.
- **FR-007**: Noninteractive text MUST NOT be in the sequential keyboard Tab order.
- **FR-008**: About MUST NOT add/remove page metadata; homepage shell owns it.
- **FR-009**: Section fragment/navigation semantics MUST remain those of feature 002.
  Other components, routes, shared assets, services and release behavior are outside scope.
- **FR-010**: Accepted cases MUST have failing-first automated acceptance coverage before
  implementation. This feature MUST NOT publish the app.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: One heading/one static paragraph within About, independent of its wording
  and text length.
- **SC-002**: Zero About photos, greetings, typing timers, cursor animations or photo requests.
- **SC-003**: Computed paragraph styles match all confirmed values and column width.
- **SC-004**: Zero text Tab stops and zero About metadata writes/removals across mount/unmount.
- **SC-005**: All narrow/zoom/font fallback cases remain readable without horizontal
  page scrolling; existing `/#about` navigation still passes.

## Assumptions

### Global Loading Amendment (2026-10-03)

About's exact paragraph stays eager with styles/shell, providing immediate useful
content rather than waiting for viewport activation. No skeleton or artificial delay.
Follow the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

- Features 001 and 002 must be implemented before this component redesign.
- About's shell heading stays in Home; the embedded About component supplies the paragraph.
- Preserve original copy, not the reference's sample architectural/employment claims.
- Remove this component's reference to the photo; deleting the shared asset itself is not
  required and must not break unrelated consumers.
- No new design values, business data, interaction or metadata policy is introduced.
