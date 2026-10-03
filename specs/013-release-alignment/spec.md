# Feature Specification: Final Integration and Release Alignment

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Approved integrated acceptance, final 26.0.0 alignment, post-deployment
release record and tested main-only recovery.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Approve a Complete Portfolio (Priority: P1)

The owner reviews a complete, consistent redesign rather than publishing partial work.

**Why this priority**: Component completion does not prove integrated visitor journeys.
**Independent Test**: Exercise the completed portfolio against all twelve approved
features with controlled external responses and browser evidence.

**Acceptance Scenarios**:

1. **Given** features001-012 are implemented, **When** integrated acceptance runs,
   **Then** exact content, presentation, navigation/history, accessibility, lazy loading,
   article return state and Contact sending lock satisfy their contracts.
2. **Given** current desktop Chrome/Firefox/Safari and mobile Safari/Chrome,
   **When** normal, narrow, zoomed, reduced-motion and network/font-failure cases run,
   **Then** approved journeys remain usable with explicit failures.
3. **Given** incomplete evidence, failing cases or absent CI protection, **When**
   readiness is assessed, **Then** release approval remains blocked.

### User Story 2 - Publish Consistent Release Identity (Priority: P1)

The owner and visitors see one version identifying the approved deployed revision.

**Why this priority**: The badge, package metadata and release record must agree.
**Independent Test**: Validate version consistency and release-stage outcomes.

**Acceptance Scenarios**:

1. **Given** the integrated redesign is release-ready, **When** final metadata is
   updated, **Then** package/lock/derived metadata agree on26.0.0 and badge shows v26.0.0.
2. **Given** owner approval of the final revision, **When** manually published through
   CI012, **Then** fresh same-revision tests/build and freshness gates precede deployment.
3. **Given** confirmed successful deployment, **When** release is recorded, **Then**
   tag v26.0.0 and matching GitHub release identify the deployed commit.
4. **Given** failed or uncertain deployment, **When** recording is attempted,
   **Then** no successful release record is created until success is verified.

### User Story 3 - Recover Deliberately (Priority: P1)

The owner can recover a regression without bypassing main validation or changing
published release history.

**Why this priority**: Failed deployment and regression are distinct recovery cases.
**Independent Test**: Simulate both cases without a real deployment.

**Acceptance Scenarios**:

1. **Given** a failed publication, **When** diagnosed/retried, **Then** current CI gates
   must pass; stale revisions are rejected and no automatic rollback occurs.
2. **Given** a published regression, **When** recovery is approved, **Then** affected
   changes are reverted via a tested main-bound PR, next patch version is assigned,
   and publication is manual after approval.
3. **Given** an existing published tag, **When** recovery is prepared, **Then** it is
   not moved/reused; the new release identifies the recovery commit.

### Edge Cases

All grouped recommendations approved2026-10-03; additional cases requested, none
supplied. Accepted: blocked fonts, slow/failed requests, browser/zoom/reduced-motion
differences, stale revision, failed deployment and published regression. Record-creation
failure after deployment is not deployment failure: reconcile record idempotently
against the confirmed deployed SHA, never move tags or claim completion falsely.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Integrate acceptance of all twelve features without new design/content
  scope; preserve their exact contracts and approved thresholds.
- **FR-002**: Cover current desktop Chrome/Firefox/Safari and mobile Safari/Chrome,
  keyboard/focus, reduced motion, responsive/zoom, lazy loading, history/return state,
  sending lock, blocked fonts and slow/failed responses.
- **FR-003**: Missing evidence, unresolved accepted cases or failed tests/CI settings
  MUST block readiness, not be silently waived.
- **FR-004**: Align package, lockfile and generated version metadata to26.0.0 only
  after integrated readiness; badge MUST derive v26.0.0 from the package version.
- **FR-005**: Publication MUST remain explicit and main-only through012, with approval
  tied to the final revision and successful fresh tests/build/freshness gates.
- **FR-006**: Only after confirmed deployment success, create matching v26.0.0 tag
  and GitHub release tied to that deployed commit.
- **FR-007**: Failed/uncertain publication MUST be explicit, create no successful
  release record and receive no automatic rollback/arbitrary old-revision deployment.
- **FR-008**: Published-regression recovery MUST use a tested main PR, next patch
  version and approved manual publication, preserving existing release history.
- **FR-009**: Use controlled external responses and deployment doubles for acceptance;
  preserve approved performance criteria/build budgets without inventing thresholds.
- **FR-010**: Release-only logic MUST have runnable failing acceptance tests before
  implementation; prior feature tests/evidence remain required.
- **FR-011**: Planning MUST NOT implement/install/execute implementation tasks/commit/
  tag/publish, change versions or settings; task generation was separately approved
  on 2026-10-03. Preserve unrelated work.

### Key Entities

- **Readiness evidence**: Feature coverage, tested revision, browser cases and blockers.
- **Release identity**: Version, main SHA, approval, validation/deployment outcome,
  matching tag and release.
- **Recovery candidate**: Tested correction/revert, next patch version and new approval.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All twelve feature contracts and accepted integrated cases have recorded
  passing evidence; zero unresolved release blockers.
- **SC-002**: All five approved browser categories have identified version/device
  evidence; unavailable categories are blockers, not assumed passes.
- **SC-003**: Package/lock/derived badge/tag/release agree on26.0.0 and deployed SHA.
- **SC-004**: Zero premature publications, failed-deployment successful release records,
  moved published tags or automatic rollbacks occur.
- **SC-005**: Every recovery publication passes current main-only gates and receives
  a new patch identity and explicit approval.

## Assumptions

- Features001-012 and their evidence precede final readiness; accessibility demo remains
  deferred. Planning approval is not final publication approval.
- Initial release occurs in2026 as confirmed by26.0.0; a year change before release
  requires owner clarification rather than silently violating CalVer.
- Device/browser/settings access is required later; absence blocks acceptance.
