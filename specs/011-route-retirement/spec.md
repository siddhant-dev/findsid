# Feature Specification: Retire Resume and Artwork Routes

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Retire Resume and the legacy artwork redirect without dedicated replacement
redirects; preserve active homepage aliases, article detail and Contact.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Resolve Retired URLs Consistently (Priority: P1)

A visitor entering a retired URL receives the existing general unknown-route behavior,
not a obsolete page or artwork-specific redirect.

**Why this priority**: Retired content must not remain an alternate portfolio surface.
**Independent Test**: Navigate retired URLs through actual application route configuration.

**Acceptance Scenarios**:

1. **Given** `/resume`, **When** entered directly/refreshed/restored through history,
   **Then** general unknown-route handling returns to `/` without loading Resume.
2. **Given** `/work/art`, **When** entered, **Then** general unknown-route handling
   returns to `/`, not a dedicated redirect to Articles.
3. **Given** retired routes, **When** resolved, **Then** no retired code/download/
   artwork requests or retired navigation controls appear.

---

### User Story 2 - Preserve Active Portfolio Navigation (Priority: P1)

A visitor continues using approved section aliases, article detail and Contact.

**Why this priority**: Cleanup must not break live portfolio destinations.
**Independent Test**: Exercise active routes with controlled source responses.

**Acceptance Scenarios**:

1. **Given** `/work` or `/work/articles`, **When** opened, **Then** `/#articles` resolves.
2. **Given** `/work/apps`, **When** opened, **Then** `/#vault` resolves.
3. **Given** `/work/articles/:id` or `/contact`, **When** opened, **Then** their approved
   detail/modal behavior remains usable.
4. **Given** cleanup, **When** inspecting active content/assets, **Then** shared assets/
   components remain and remotely hosted Resume PDF is not modified/deleted.

### Edge Cases

Grouped recommendations approved on2026-10-03: existing wildcard fallback to `/`;
no dedicated retirement redirect; remove Resume component/template/styles/tests,
download config/references; remove artwork redirect and update tests/docs; preserve
shared assets, active routes, externally hosted PDF and Firebase resources.
Direct entry, refresh and history cases approved; additional cases requested, none supplied.
Existing lazy-loading, controlled responses, keyboard/history and pending Contact
navigation-lock rules still apply. Retirement does not bypass a pending Contact guard.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Remove `/resume` route and Resume application component/template/styles/
  tests plus its download configuration and remaining navigation references.
- **FR-002**: Remove `/work/art` redirect; do not add a dedicated retired-path redirect.
- **FR-003**: Retired paths follow existing general unknown-route fallback to `/`.
- **FR-004**: Preserve exact aliases `/work` and `/work/articles` to `/#articles`,
  `/work/apps` to `/#vault`; do not capture valid article-detail paths.
- **FR-005**: Preserve article-detail/Contact routes and shared active assets/components.
- **FR-006**: Update directly related route tests and documentation to describe retirement.
- **FR-007**: Remove only remote Resume PDF reference; do not delete/change hosted
  file, Firebase configuration/resources or unrelated assets.
- **FR-008**: Observe failing route behavior tests before implementation; use actual
  routes and controlled responses, not source scans alone.
- **FR-009**: Planning only: no source implementation, installs, task execution,
  commit/publication, release-version change or waiver of CI safeguards.
  Task generation was separately approved on 2026-10-03.

### Key Entities

- **Retired destination**: Removed Resume or legacy artwork path, resolved by wildcard.
- **Active alias**: Exact approved section redirect, distinct from article-detail paths.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both retired paths end at `/` with zero dedicated retirement redirects.
- **SC-002**: Zero Resume/artwork route code loads, retired controls or download requests.
- **SC-003**: All three section aliases, detail route and Contact retain approved behavior.
- **SC-004**: Remote PDF/Firebase resources/shared active assets remain unchanged.

## Assumptions

- Shell002 and approved detail/modal routing009/010 precede final retirement integration.
- Constitution's artwork baseline explicitly permits approved redesign changes; this
  feature supplies that approval without altering unrelated governance.
- Source/config/route cleanup is later implementation work; planning deletes no source files.
