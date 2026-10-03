# Feature Specification: CI Safeguards

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Align automation with test-only PRs, main-only builds and explicit manual
publication after approval of the completed redesign.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review Every Main-Bound Change (Priority: P1)

The owner receives a required full-suite result before merging a change to main,
without publishing an unfinished portfolio.

**Why this priority**: Changes must be checked without exposing deployment credentials
or triggering forbidden builds/previews.
**Independent Test**: Exercise the event policy with controlled workflow/test outcomes.

**Acceptance Scenarios**:

1. **Given** any PR targeting main, including fork, dependency and documentation-only
   changes, **When** evaluated, **Then** the complete suite runs and its stable check
   is required before merge; no full application build or deployment runs.
2. **Given** a PR targeting another branch or a non-main push, **When** evaluated,
   **Then** this PR-test/build/deployment pipeline is not triggered.
3. **Given** a newer PR revision, **When** its checks start, **Then** obsolete runs
   are cancelled and an old result cannot authorize merging the new revision.

### User Story 2 - Validate Without Automatic Publication (Priority: P1)

The owner can integrate work on main while the live portfolio remains unchanged.

**Why this priority**: The redesign must not publish incrementally.
**Independent Test**: Verify main-event stage execution and deployment exclusion.

**Acceptance Scenarios**:

1. **Given** a main push, **When** tests pass, **Then** a production build follows,
   but there is no automatic deployment.
2. **Given** installation or test failure, **When** validation ends, **Then** the build
   does not run; failures are visible rather than success-shaped skips.

### User Story 3 - Publish an Explicitly Approved Revision (Priority: P1)

After the completed redesign is approved, the owner explicitly requests publication
of a main revision that passes fresh validation.

**Why this priority**: Publication must be deliberate, validated and non-overlapping.
**Independent Test**: Simulate manual requests, failures and overlapping revisions
without sending a real deployment.

**Acceptance Scenarios**:

1. **Given** explicit manual publication from main, **When** the requested revision
   passes fresh tests and production build, **Then** that same revision may deploy.
2. **Given** a non-main request, missing credentials, failed tests/build or stale
   revision, **When** publication is attempted, **Then** deployment is blocked with
   an explicit outcome.
3. **Given** overlapping publication requests, **When** processed, **Then** deployments
   do not overlap and an older revision never publishes after a newer revision.

### Edge Cases

All three grouped recommendations approved on 2026-10-03; additional cases requested,
none supplied. Accepted cases include fork/docs/dependency PRs, obsolete PR checks,
failed installation/tests/build, absent credentials and concurrent/stale publication.
Test setup failures are not behavioral red evidence. Dependency compatibility must be
resolved rather than bypassed. Required merge protection is a repository-settings
prerequisite, not a guarantee workflow files alone provide.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Main-bound PRs MUST run only the complete test suite and supporting
  installation/test tooling, including test-policy checks; no full build or deployment.
- **FR-002**: Non-main pushes and PRs targeting other branches MUST NOT trigger this
  pipeline. Manual publication MUST accept main only.
- **FR-003**: Main pushes MUST run tests followed by production build on success,
  without automatic publication.
- **FR-004**: Publication MUST require an explicit manual request after completed
  redesign approval and fresh successful tests/build of the same main revision.
- **FR-005**: Remove PR Firebase previews and the separate dependency-review workflow
  to meet the constitution's test-only PR rule.
- **FR-006**: Main merges MUST require the stable full-suite check for the current
  revision through repository protection settings; document and verify this prerequisite.
- **FR-007**: Fork PR checks MUST use no deployment credentials. Deployment credentials
  MUST be confined to the permitted publication stage.
- **FR-008**: Installation/test/build failures MUST block dependent stages; missing
  publication credentials and stale requests MUST fail explicitly.
- **FR-009**: Cancel obsolete PR checks; serialize publication and prevent older
  revisions publishing after newer ones.
- **FR-010**: Establish runnable workflow-policy tests and observe intended failures
  against existing workflow behavior before changing automation. Resolve dependency
  compatibility without retaining peer-dependency bypasses.
- **FR-011**: Preserve controlled external responses in application tests; no live
  Dev.to, contact submissions or acceptance deployments.
- **FR-012**: Planning MUST NOT implement workflows/settings, install packages, execute
  implementation tasks, commit, publish or change release versions. Task generation
  was separately approved on 2026-10-03. Preserve unrelated changes.

### Key Entities

- **Validation run**: Event, target revision, stable test result and permitted stages.
- **Publication request**: Explicit owner intent, main revision, fresh validation and
  serialized publication outcome.
- **Merge prerequisite**: Required current-revision check and verified main protection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All accepted main-bound PR categories receive full-suite results;
  zero PR full builds, previews or deployments occur.
- **SC-002**: Zero non-main pushes/other-target PRs trigger this pipeline.
- **SC-003**: Every main push builds only after tests succeed and publishes zero times.
- **SC-004**: Every publication has explicit approval and successful same-revision
  tests/build; zero failed, stale or non-main requests publish.
- **SC-005**: Zero overlapping deployments or older-after-newer publications occur.
- **SC-006**: Protected merges require a successful current-revision suite result,
  with settings evidence recorded before declaring safeguards complete.

## Assumptions

- Existing Firebase destination is retained; this feature adds no hosting resource.
- Manual request is the owner's explicit publication authorization, not automatic
  approval of incomplete work. Completed redesign approval remains a release prerequisite.
- Repository settings access is required later; inability to configure protection
  blocks completion and must be reported, not silently waived.
- Release/version alignment is separate; current package version remains unchanged.
