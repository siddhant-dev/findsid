# Feature Specification: Blueprint Styles Foundation

**Feature Branch**: `feat/blueprint`

**Feature Directory**: `specs/001-blueprint-styles`

**Created**: 2026-10-03

**Status**: Ready for planning

**Input**: Establish the first small feature of the portfolio redesign using
`ideas/gemini.index.html`. Directly replace existing style variables and their usages,
without compatibility aliases. Remove theme switching entirely. Preserve component
layouts and flows until their own features. Do not publish until the redesign is complete.

**Grid scope correction (2026-10-03)**: The user explicitly requested that the reference
grid boxes be included in this visual-style foundation, not deferred to the sticky shell.
Grid inclusion, reference appearance and the edge cases below are approved.

## Clarifications

### Session 2026-10-03

- Q: Keep the grid fixed while scrolling, visible on mobile/200% zoom without overflow, behind content/dialogs without intercepting input, and static under reduced motion? -> A: Yes; all four cases confirmed.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One Consistent Visual Language (Priority: P1)

As a visitor, I see one navy/cyan visual language with consistent typography on every
existing page, regardless of my device's preferred appearance.

**Why this priority**: This establishes the approved foundation every later component
feature depends on.

**Independent Test**: Visit the existing pages with light and dark device preferences;
compare palette, text roles, controls, and feedback with the approved style contract.

**Acceptance Scenarios**:

1. **Given** either device appearance preference, **When** I open or reload a page,
   **Then** the same approved palette appears from initial rendering, without an
   alternate-palette flash.
2. **Given** existing headings, descriptions, metadata, tags, and controls, **When**
   they render, **Then** they use the approved role-based typography and colors.
3. **Given** the existing navigation, **When** I inspect or use it, **Then** no theme
   switch is present and all non-theme navigation remains available.
4. **Given** any existing page, **When** it renders, **Then** the reference's faint
   cyan major/minor grid and dark edge vignette appear behind the content, not just
   a solid navy background, without altering the page's layout or interactions.

---

### User Story 2 - Accessible Shared States (Priority: P1)

As a visitor using a keyboard or reduced-motion preference, I can identify focused
controls, read feedback, and use existing pages without relying on animation or color alone.

**Why this priority**: Removing the old styles must not remove usable focus, validation,
or loading feedback.

**Independent Test**: Tab through existing controls and exercise approved styles for
focus, disabled, error, success, and loading states with reduced motion enabled.

**Acceptance Scenarios**:

1. **Given** keyboard navigation, **When** an interactive element receives focus,
   **Then** it has the approved cyan focus outline unless it is the programmatically
   focused main-content container.
2. **Given** reduced motion, **When** a loader or decorative animation is displayed,
   **Then** loading has static status text and decorative animation/smooth scrolling
   are disabled.
3. **Given** disabled controls or validation errors, **When** they appear,
   **Then** approved muted/error styling is applied and existing explanatory text
   remains visible; success is never inferred solely from a color.
4. **Given** unavailable web fonts, **When** the page renders,
   **Then** system sans-serif and monospace fallbacks keep the content readable.

---

### User Story 3 - Continue Using Existing Flows (Priority: P2)

As a visitor during development, I can still use the existing portfolio navigation,
article links, resume actions, and contact form while their redesign features are pending.

**Why this priority**: A direct style migration must be complete without bundling all
future component and routing changes into this first feature.

**Independent Test**: Exercise the current route and interaction baseline with
controlled article/contact responses before and after the styles migration.

**Acceptance Scenarios**:

1. **Given** current routes and component arrangements, **When** styles are migrated,
   **Then** routes, content, layout structure, and non-theme interactions remain unchanged.
2. **Given** controlled successful and failing article/contact responses,
   **When** existing flows execute, **Then** style replacement does not change their
   response handling or discard existing feedback.
3. **Given** embedded article content and the temporary resume view, **When** rendered,
   **Then** both remain readable without depending on retired style variables.

### Edge Cases

User was asked for edge cases and approved the proposed cases on 2026-10-03.
The following cases are accepted, not inferred confirmation.

| Case | Expected outcome | Feature ownership |
|------|------------------|-------------------|
| Light/dark device preference, including changes after load | Identical fixed appearance; no preference observer or theme resource | This feature |
| Keyboard-only use | Reachable controls and visible focus; existing skip-content behavior preserved | This feature; redesigned navigation and dialog trapping/restoration later |
| Reduced motion | No decorative animation or smooth scrolling; static loading status | This feature |
| Web fonts blocked | Readable system sans-serif/monospace fallback | This feature |
| Narrow screen/zoom and long titles/URLs | No new overflow caused by typography; content wraps | This feature; full layout acceptance belongs to shell/components |
| Wide article code | Local code scrolling, not forced page-wide scrolling | This feature; article-detail redesign later |
| Missing images | No broken-image UI in redesigned components | Later cards/article feature; image behavior is unchanged here |
| Dev.to loading/empty/failure/rate limits/malformed data | Distinct states, failures offer retry, controlled tests | Later Articles feature; this feature preserves current flow and styles existing states |
| Contact request failure | Retain input; show explicit error, Retry and Close | Later Contact feature |
| Pending Contact send | Modal dismissal/in-app navigation blocked until response; never claim premature success | Contact010 supersedes earlier dismissal permission |

### Grid Amendment Edge Cases

The user confirmed all four additional grid cases on 2026-10-03.

| Proposed case | Proposed outcome | Status |
|---------------|------------------|--------|
| Mobile, narrow windows and 200% zoom | Same reference grid; no new page-wide overflow | Confirmed |
| Long pages and scrolling | Grid stays fixed to the viewport; content scrolls above it | Confirmed |
| Links, keyboard focus and dialogs | Decoration never intercepts input or focus and stays behind content/dialogs | Confirmed |
| Reduced motion | Grid and vignette remain static, with no animation or parallax | Confirmed |

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All application-owned styling MUST use the fixed reference visual language,
  with no old palette aliases or compatibility layer.
- **FR-002**: Theme switching MUST be removed entirely, including its control, preference
  detection, runtime state, and separate appearance resources.
- **FR-003**: The reference's explicit color and font values MUST be reused exactly.
  Normal application UI MUST NOT adopt the reference demo's intentionally low-contrast state.
- **FR-004**: Typography MUST use the confirmed mapping: main heading Inter 2.75rem/700;
  secondary heading Fira Code 1.25rem/500; card/dialog titles Inter 1.1rem/600;
  body/form text Inter 0.95rem with line-height 1.6; descriptions Inter 0.9rem;
  navigation/section labels Fira Code 0.85rem; metadata/tags/buttons Fira Code 0.75rem.
  Existing typography utilities MUST be replaced at their usages, not retained as aliases.
- **FR-005**: Shared states MUST use approved extensions: input/dialog surface #1e293b,
  reference muted border, 4px corners; focus outline 2px solid #38bdf8 with 2px offset;
  error #ef4444; success #38bdf8 with text/icons; muted disabled controls without
  hover/glow; modal backdrop rgba(11, 25, 44, 0.8); cyan loading with static
  reduced-motion status.
- **FR-006**: Every current consumer of retired style variables, helpers, fonts, and
  typography utilities MUST be migrated directly. No stale consumer may remain.
- **FR-007**: Non-theme component structure, route definitions, content, interaction
  logic, and page-layout breakpoints MUST remain unchanged in this feature.
  Style-class replacements, minimal loading-status markup and a noninteractive
  decorative background layer are permitted; these must not change layout geometry.
- **FR-008**: Keyboard focus, reduced motion, font fallbacks, and long-text containment
  MUST be covered by acceptance-relevant automated tests before implementation.
- **FR-009**: Embedded article styling and temporarily retained resume styling MUST
  use the new palette without introducing a second syntax or artwork palette.
  Existing branded imagery is not recolored by this foundation feature.
- **FR-010**: Any additional design value absent from the reference and approved decisions
  MUST be brought to the user before dependent implementation; it MUST NOT be guessed.
- **FR-011**: This feature MUST NOT publish the application. Later component features
  MUST have their own specifications, plans, and failing acceptance tests.
- **FR-012**: The shared background MUST include the reference's 1px cyan grid lines:
  100px major squares at alpha 0.08 and 20px minor squares at alpha 0.03, aligned
  at -1px on both axes over #0b192c. Its centered dark vignette MUST fade from
  transparent at 40% to rgba(11,25,44,0.8) at 100%. Feature 001 owns this visual
  treatment; feature 002 reuses it rather than introducing a second grid.

### Key Entities

- **Visual token**: A named color, font, border, effect, or sizing value; its source is
  either the reference file or an explicit approved extension.
- **Typography role**: The approved font family, size, weight where specified, and
  purpose of a text element.
- **Shared state**: Focus, hover, disabled, loading, error, or success presentation;
  it does not change an existing business-flow state machine.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of current application-owned style consumers use the new visual
  language; zero retired variables, compatibility aliases, or typography utilities remain.
- **SC-002**: Zero theme controls or alternate appearance resources remain, and all
  tested routes display identical palette values for light and dark device preferences.
- **SC-003**: All seven approved typography roles match their confirmed family and size;
  specified weights and body/form line-height match as well.
- **SC-004**: Every tested interactive control has visible keyboard focus; disabled
  controls have no hover/glow; reduced-motion cases have zero decorative animation.
- **SC-005**: All existing non-theme navigation and interaction acceptance scenarios
  retain their baseline behavior; no route or component layout is redesigned here.
- **SC-006**: At 320px and 1024px viewports and 200% zoom, migrated text introduces no
  new page-wide overflow compared with baseline; missing fonts do not hide content.
- **SC-007**: All existing page backgrounds display both reference grid scales and the
  vignette; there is exactly one shared decorative canvas, with no change to existing
  route layouts or interactions.

## Assumptions

### Global Loading Amendment (2026-10-03)

Styles, shell/navigation and About are eager for useful initial content. Later
sections and routes are lazy under the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).
Foundation styles must be available before deferred content appears, with no palette flash.

- This feature is a development foundation, not a release of the complete redesign.
- The reference is style inspiration, not approved replacement copy, employment data,
  working demo logic, or measured performance evidence.
- Existing component-level geometry remains until the corresponding redesign feature.
  Shared styling may change borders, colors, typography, and effects.
- No new business data, persistence, article source, or contact endpoint is needed.
- Future choices do not block this bounded feature; unknown later behaviors must be
  confirmed in their own specifications before implementation.

## Confirmed Redesign Direction and Deferred Features

These decisions are recorded here to retain context, not to expand FR-007.
The following list preserves early planning chronology; later-feature questions are
now resolved by the approved specs002-013. Their contracts supersede historical
future-decision wording here without expanding this foundation's implementation scope.

- Desktop uses a sticky identity/navigation column inspired by the reference.
  Below 1024px, visible wrapping section links sit beneath the introduction.
- Page order: About me -> Interaction Lab -> Experiences -> Articles -> Retro Vault.
- Current About copy stays; its photo is removed without replacement in its own feature.
- Apps becomes Retro Vault. About, Apps, and Articles are no longer separate section pages.
- Article cards follow the reference; articles open a separate detail page with its own
  future feature, plan, and ideas.
- Remove `/work/art` and Resume entirely, including `/resume`, in the later routing work.
  Do not silently preserve the former artwork redirect.
- `/contact` opens the contact form modal in its later feature. Updated during shell
  clarification: Contact appears only at the page bottom, above social icons; no sidebar trigger.
- Contact retains current fields/validation: required name, email or phone, message
  minimum 25 characters. Drafts survive dismissal; focus is trapped/restored.
  Escape/backdrop/Close dismiss when not sending. Contact010 supersedes earlier permission
  to dismiss while sending: valid pending Send locks dismissal and same-app navigation/
  Back until response. Success Close resets input/result; failure retains draft/Retry.
- Send hides the form. The same dialog shows Sending, then confirmed success with Close,
  or explicit failure with Retry and Close. Input is retained for retry; duplicate sends
  are blocked.
- Updated during shell clarification: `/work` and `/work/articles` redirect to `/#articles`;
  `/work/apps` redirects to `/#vault`. The exact article-detail redesign URL/back navigation,
  Interaction Lab functionality, and Experiences content require later-feature decisions.
  See `../002-sticky-shell/spec.md` for the confirmed shell scope.
