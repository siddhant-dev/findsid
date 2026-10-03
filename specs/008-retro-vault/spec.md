# Feature Specification: Retro Vault Section

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Redesign the existing Apps collection as Retro Vault, retaining the five
existing projects and their current text, dates, tags and URLs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the Existing Project Archive (Priority: P1)

A visitor reads the five existing projects as approved shared blueprint cards
within the homepage Retro Vault section.

**Why this priority**: The owner's earlier projects showcase the progression of
their work without inventing new content or historical claims.
**Independent Test**: Compare controlled rendered records with the saved content contract.

**Acceptance Scenarios**:

1. **Given** successful archive loading, **When** rendered, **Then** Authentic Weather
   App, Toonify App, Notes App, Wedding Invite App and Tic Tac Game are retained.
2. **Given** archive content, **When** read, **Then** titles, descriptions, dates,
   tags and URLs match the saved contract without rewriting.
3. **Given** valid external destinations, **When** cards are activated, **Then**
   shared-card native new-tab behavior applies.
4. **Given** the approved collection, **When** loaded, **Then** all five cards render
   in source order with no View more, introduction or filters.

---

### User Story 2 - Load Only When Needed and Recover (Priority: P1)

A visitor sees useful eager content before the archive loads, then reads Vault or
retries an explicit failure without losing access to other sections.

**Why this priority**: Deferred archive content must not delay the initial portfolio.
**Independent Test**: Control activation/import resolution and source fixtures.

**Acceptance Scenarios**:

1. **Given** inactive offscreen Vault, **When** Home opens, **Then** its heading/anchor
   exists without requesting its code/data; viewport approach within20rem activates it.
2. **Given** explicit selection/direct `/#vault`, **When** resolved, **Then** Vault
   activates immediately without waiting for a viewport observation.
3. **Given** active loading, **When** waiting, **Then** five decorative skeleton shells
   and accessible status appear once skeleton code is available, without forced delay.
4. **Given** section code failure, **When** shown, **Then** its permanent heading remains
   with "This section couldn't be loaded." and Retry; unrelated content remains usable.
5. **Given** malformed/nonempty all-unusable content, **When** validated, **Then**
   "Projects couldn't be loaded." and Retry appear, not successful empty feedback.
6. **Given** a genuinely empty collection, **When** loaded, **Then** "No archived
   projects yet." appears without Retry.
7. **Given** mixed usable/unusable records or duplicate valid IDs, **When** validated,
   **Then** unusable records are skipped and the first valid duplicate is retained.
8. **Given** duplicate Retry or route departure during loading, **When** processing,
   **Then** no duplicate load or late destroyed-owner mount occurs.

---

### User Story 3 - Read the Responsive Archive (Priority: P1)

A visitor reads full project cards in the approved rem-based grid.

**Why this priority**: Deferred delivery must preserve the same accessible card UX.
**Independent Test**: Check actual narrow/zoom/font/media and grid-fit behavior.

**Acceptance Scenarios**:

1. **Given** available width, **When** rendered, **Then** 17.5rem minimum tracks and
   1.5rem gaps fit at most three columns, shrinking a narrow single column without overflow.
2. **Given** reduced motion or OS color preference, **When** loading/reading, **Then**
   skeletons remain static under reduced motion and the fixed palette never switches.
3. **Given** delayed mounting above/below the reader, **When** layout changes, **Then**
   shell reading-position/navigation behavior remains intact.

### Edge Cases

Confirmed on 2026-10-03: retain all five current projects and their existing content
in current source order: Authentic Weather, Toonify, Notes, Wedding Invite, Tic Tac.
Previously approved feature006 card behavior remains authoritative: no images,
full descriptions, all tags, optional metadata, safe external new tabs and static
Archived cards for invalid/missing destinations.
Current order, section grid and shared lazy-loading parameters are approved.

Further confirmations on 2026-10-03:
- Reuse Articles' grid width/spacing: 17.5rem minimum tracks, 1.5rem gaps, maximum
  three columns, available-width sizing and narrow single-column shrink.
- Content always comes from bundled JSON, not a project API or URL reachability checks.
- Approve "Projects couldn't be loaded." plus Retry, duplicate-operation prevention
  and cancellation on destruction.
- Successful empty source shows "No archived projects yet." without Retry.
- Skip individual records missing essential content and do not create cards for them;
  this overrides the proposed whole-collection rejection policy.
- Only shell heading and project cards; no intro/filters/additional archive labels
  or unverified "10-year" claim.
- Confirmed global loading strategy: eager styles/shell/About; lazy later sections
  on viewport approach, immediate target activation on explicit/direct fragments,
  route-lazy article detail/Contact. No blanket background prefetch. Vault bundled
  JSON loads with its section; use five skeleton shells while that code/data is loading.
  Lab dataset remains Start-only. Existing specs/plans have been amended accordingly.
- Remaining data cases approved: log individual rejections without creating a card;
  keep first valid duplicate ID; malformed envelope/nonempty all-unusable collection
  shows error/Retry, genuinely empty source shows the empty message.
- Section activation begins within20rem below the viewport or immediately for
  explicit/direct Vault navigation. Code-load failure shows "This section couldn't
  be loaded." and section-only Retry; no artificial skeleton delay.
- All five retained projects render after successful loading without View more.
  Additional edge cases were requested; none supplied beyond the confirmed decisions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Retain all five projects and exact content in the archive content contract.
- **FR-002**: Use feature006 shared blueprint cards, not the static Experience renderer.
- **FR-003**: Preserve the shell-owned Retro Vault heading and `/#vault` destination;
  do not duplicate anchors or overwrite homepage metadata.
- **FR-004**: Preserve current source order.
  Reuse Articles grid rules: 17.5rem minimum tracks, 1.5rem gaps, at most three
  columns, available-width sizing and narrow single-column shrink.
- **FR-005**: Show "Projects couldn't be loaded." with Retry on failure; successful
  empty source shows "No archived projects yet." without Retry. Block duplicate
  operations and cancel pending work on destruction.
  Lazy-load Vault and bundled JSON under the shell loading contract; show five skeleton
  shells during active loading.
  Activate within20rem below the viewport or immediately for explicit/direct Vault
  navigation. Code-load failure retains heading/anchor and shows "This section
  couldn't be loaded." with section-only Retry. No artificial loading delay.
- **FR-006**: Skip individual records missing essential content; do not create
  cards for rejected records. Preserve approved optional-field/destination behavior.
  Keep first valid duplicate ID. Malformed envelope/nonempty all-unusable source
  shows error/Retry; only genuinely empty source shows the empty message.
- **FR-007**: Use only approved styling values and require observed failing
  behavioral tests before implementation.
- **FR-008**: Planning MUST NOT implement, install packages, execute implementation
  tasks, commit, publish or change release version. Task generation was separately
  approved on 2026-10-03. CI safeguards remain separately required.
- **FR-009**: Source content always comes from bundled JSON, without external project
  API requests or live URL reachability probes.
- **FR-010**: Show only the shell heading and cards; no intro, filters, additional
  archive labels or "10-year" claim.
- **FR-011**: Render all accepted projects after load without View more; cancelled
  or destroyed-owner imports must not mount or steal focus.

### Key Entities

- **Archive project**: Existing identity, title, complete description, display date,
  supplied tags and destination; image fields are not card presentation content.
- **Archive collection**: Five approved projects; not fabricated reference examples.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Successful rendering contains exactly five approved project cards.
- **SC-002**: All project text, dates, tags and URLs equal the content contract,
  normalizing whitespace only.
- **SC-003**: Exactly one shell-owned Retro Vault heading and existing fragment remain.
- **SC-004**: Before activation, eager Home does not request Vault code/data; direct
  navigation activates it without an observation or arbitrary wait.
- **SC-005**: Loading, empty, module error and data error have distinct approved feedback;
  duplicate actions and destroyed-owner updates are prevented.
- **SC-006**: Approved narrow/zoom/font cases retain full readable content, rem grid
  spacing and no page-wide horizontal scrolling.

## Assumptions

- Foundation001/shell002/cards006 precede implementation; currently planned.
- Existing source content is owner-approved public portfolio content. Preserve spelling
  and historical date labels rather than silently correcting them or inferring new dates.
- Existing URL values are retained; no live reachability probes or inferred retirement.
- No "10-year" claim or extra introduction is approved merely by its presence in reference.
