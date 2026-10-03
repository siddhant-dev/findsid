# Feature Specification: Sticky Portfolio Shell

**Feature Branch**: `feat/blueprint`

**Created**: 2026-10-03

**Status**: Ready for planning

**Input**: Build the next small redesign feature: the reference-inspired sticky column
shell, one-page section integration, section navigation/history and bottom Contact/social
area. Decisions and shell edge cases were clarified individually and confirmed by the
user before this specification.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the Portfolio in One Stream (Priority: P1)

A visitor reads About me, Interaction Lab, Experiences, Articles and Retro Vault in
that order while the desktop identity/navigation column stays accessible.

**Why this priority**: The shell enables all later component redesigns.

**Independent Test**: Open the homepage on desktop and mobile and inspect the identity,
ordered sections and accessible bottom actions.

**Acceptance Scenarios**:

1. **Given** a desktop viewport at least 1024px wide, **When** the visitor scrolls,
   **Then** the reference-inspired identity column is sticky beside the content stream,
   with the blueprint background behind both.
2. **Given** a narrower viewport, **When** the page renders, **Then** identity precedes
   content and all five numbered navigation links remain visible and wrap as needed.
3. **Given** a short window or enlarged text, **When** reading the identity column,
   **Then** no text or navigation becomes unreachable because of sticky positioning.
4. **Given** the intermediate redesign, **When** inspecting sections, **Then** current
   About, Articles and Apps content is integrated without their individual redesigns;
   Interaction Lab and Experiences have titled containers, not invented content.

---

### User Story 2 - Navigate Sections and History (Priority: P1)

A visitor selects a section, shares its URL, and uses Back/Forward without opening a
separate About, Apps or Articles section page.

**Why this priority**: Navigation and compatibility links must agree with the one-page flow.

**Independent Test**: Click section links, scroll manually, load fragment URLs and exercise
browser history and approved legacy routes.

**Acceptance Scenarios**:

1. **Given** a numbered link, **When** selected, **Then** it updates the URL fragment,
   adds a history entry and scrolls to its section, instantly under reduced motion.
2. **Given** manual scrolling, **When** the visible section changes, **Then** the active
   navigation indicator follows without creating browser-history entries.
3. **Given** a direct section URL or refresh, **When** content renders, **Then** navigation
   waits for the target and scrolls there; an unknown fragment displays the page at the top.
4. **Given** a selected section and delayed article response, **When** article content
   loads, **Then** it does not unexpectedly displace the visitor from that section.
5. **Given** section-selection history, **When** Back/Forward is used, **Then** the selected
   section is restored without adding another entry.
6. **Given** `/work` or `/work/articles`, **When** opened, **Then** the visitor arrives at
   `/#articles`; `/work/apps` arrives at `/#vault`.

---

### User Story 3 - Identify and Contact the Owner (Priority: P2)

A visitor sees the owner's actual title, approved summary and app version, then reaches
Contact and social profiles at the bottom of the page.

**Why this priority**: The shell owns identity and page-wide actions, not the future dialog.

**Independent Test**: Compare visible identity/version with approved content/release metadata;
activate Contact and inspect all five social links using keyboard navigation.

**Acceptance Scenarios**:

1. **Given** the identity column, **When** read, **Then** it shows Siddhant Jaiswal,
   Lead Product Development Professional, the confirmed summary, and the actual app version.
2. **Given** the bottom area, **When** inspected, **Then** Contact appears above accessible
   icons for LinkedIn, Twitter, GitHub, CodePen and Dev.to; no sidebar copies appear.
3. **Given** Contact, **When** activated in this intermediate feature, **Then** it opens the
   existing `/contact` page; the later Contact feature will replace that with a dialog.
4. **Given** a social icon, **When** focused/activated, **Then** its name is accessible,
   focus is visible and its correct profile opens safely in a new tab.

### Edge Cases

User approved all proposed shell cases on 2026-10-03:

- Short desktop window/enlarged text: sidebar remains reachable; no sticky clipping.
- Direct fragment/refresh: scroll after section render, not after an arbitrary delay.
- Unknown fragment: show the top without an error or forced redirect.
- Manual scrolling: update active state without history pollution.
- Link clicks versus Back/Forward: push only selections; restoration never pushes.
- Delayed article loading: preserve the current reading/selection position.
- Bottom icons: accessible names, focus and safe external links.

Previously confirmed cross-feature cases remain applicable: reduced motion, blocked fonts,
narrow screens/zoom, long titles, keyboard-only use and controlled Dev.to states.
No additional user-supplied cases were provided.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST use the reference-inspired sticky column and blueprint
  background, consuming feature 001's fixed visual language without adding a theme.
- **FR-002**: At widths below 1024px, it MUST use a stacked layout with visible wrapping
  section links beneath the introduction, not hidden navigation or a hamburger.
- **FR-003**: It MUST expose numbered About me, Interaction Lab, Experiences, Articles,
  Retro Vault links and sections in exactly that order.
- **FR-004**: Link selection MUST update the fragment and history; manual scrolling MUST
  update active navigation without adding history entries; Back/Forward MUST restore selection.
- **FR-005**: Direct fragments MUST be applied after render; unknown fragments MUST show
  the page top without forcing navigation.
- **FR-006**: Sticky behavior MUST preserve access to all identity/navigation content in
  short windows and at 200% zoom; page layout MUST not require horizontal scrolling.
- **FR-007**: Identity MUST show the exact name/title and summary:
  "Architecting scalable Angular applications, high-performance virtualized rendering engines, and accessible design systems".
  The badge MUST show the actual app version rather than the reference's sample version.
- **FR-008**: The shell MUST integrate current About, Articles and Apps components;
  Apps appears under Retro Vault. It MUST NOT redesign their copy, cards or interaction
  flows. The About photo remains until its own feature removes it.
- **FR-009**: Interaction Lab and Experiences MUST initially have titled section containers
  with no fabricated demos, employment facts or placeholder performance claims.
- **FR-010**: `/work` and `/work/articles` MUST redirect to `/#articles`;
  `/work/apps` MUST redirect to `/#vault`. Redirects MUST not leave an intermediate
  legacy URL in history or capture existing article-detail URLs.
- **FR-011**: Existing article-detail and `/contact` routes MUST remain usable. Removing
  `/resume` and `/work/art` remains separate route-retirement work; they are not new menu links.
- **FR-012**: The bottom area MUST contain Contact followed by five icon-only social links.
  Existing profile URLs are retained and Dev.to uses `https://dev.to/siddev`.
  Each icon MUST have an accessible name, visible focus, and safe new-tab behavior.
- **FR-013**: Contact/social links MUST NOT also appear in the sidebar. This explicitly
  supersedes the earlier two-location Contact decision.
- **FR-014**: The shell MUST preserve selected/visible section position across asynchronous
  article layout changes and honor reduced motion without competing scroll handlers.
- **FR-015**: Existing Dev.to owner integration MUST remain unchanged; shell integration
  MUST be tested with controlled successful/loading/empty/failure states, including
  unavailable/malformed responses, rate limits and owner filtering.
- **FR-016**: No publication, individual section redesign, contact-modal flow, new article
  detail design or unrelated route removal belongs to this feature.

### Key Entities

- **Section destination**: A stable fragment, numbered label, container and active state.
- **Owner identity**: Confirmed name, professional title, summary and actual app version.
- **Bottom action**: Contact route or accessible icon link to an owner profile.
- **Navigation intent**: Selection, initial fragment, history restoration or manual reading;
  determines history and scrolling behavior.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Exactly five numbered links and five section containers appear in approved order.
- **SC-002**: At 1024px and wider, the column is sticky when it fits; at 320px and 1023px,
  navigation is visible, content stacks and no page-wide horizontal scrolling is required.
- **SC-003**: All five valid fragments work on direct entry, refresh and Back/Forward;
  unknown fragments display the top.
- **SC-004**: One history entry is added per changed section selection; manual scrolling,
  delayed content and restoration add zero entries.
- **SC-005**: All three approved legacy section URLs arrive at the correct canonical
  fragment without breaking existing article-detail links.
- **SC-006**: Exactly one Contact link and five named social icon links appear in the
  homepage bottom area, with no sidebar duplicates.
- **SC-007**: Sidebar title/summary exactly match confirmed text and the badge matches
  current application version metadata.
- **SC-008**: All keyboard, reduced-motion, short-window and controlled loading/state
  acceptance scenarios pass before this feature is declared complete.

## Assumptions

**Retirement011 precedence**: Existing Resume/artwork support described in this
intermediate shell feature ends when011 is implemented. Retired URLs then use general
unknown fallback to `/`; active section aliases/detail/Contact remain unchanged.

### Global Loading Amendment (2026-10-03)

**Contact010 amendment**: `/contact` is a lazy modal over the retained originating page,
or Home on direct entry. It does not replace background content/metadata. Pending valid
Send blocks dismissal and same-app navigation/Back until response; permitted history
dismissal/restoration is owned by routed-modal context. See010 modal contract.

**Article-detail amendment009**: The retained detail route now uses a dedicated reading
layout without the sticky identity/navigation column, with shared canvas/bottom actions.
This supersedes generic non-home split-shell presentation for article detail only.
Listing return/browser Back restores completed Articles data and reading offset from
an inert memory snapshot; active requests still cancel on departure.

Eagerly render styles, shell/navigation and About. Keep all five section headings/
anchors permanent, but lazy-load Lab, Experiences, Articles and Vault as they approach
the viewport. Explicit selection/direct fragment activates its target immediately.
Article-detail and Contact code loads on route navigation. Do not immediately prefetch
all deferred features in the background. Preserve reading position across lazy code/data
rendering and coordinate with the approved explicit Articles append movement.
Articles fetch on activation; Vault JSON belongs to its lazy chunk; Lab dataset remains
Start-only. This supersedes eager static section embedding in the original plan.
See the [loading contract](contracts/shell-contract.md#global-loading-amendment-2026-10-03);
activate viewport-driven loading within 20rem below the viewport. Module failures
keep headings/anchors and show "This section couldn't be loaded." with Retry for
that section; other content stays usable. No artificial skeleton delay.

- Implementation depends on completing feature 001, which is currently planned, not implemented.
- Current app version is read from authoritative release metadata; this feature does not
  silently change it to 26.0.0 or publish a release.
- Retaining existing components permits narrowly necessary responsive containment to fit
  the new column, but not card/form/component visual redesign.
- Manual reading need only change the active indicator, not the URL; this avoids confusing
  browser history and preserves the last explicit destination.
- Intermediate empty Lab/Experiences containers are an approved development state, not
  a publishable portfolio.
- Detailed article-page shell treatment and contact-dialog history are approved in
  features009/010; their implementation remains outside this intermediate feature,
  whose current routes stay functional until those later refinements.
