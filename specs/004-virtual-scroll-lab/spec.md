# Feature Specification: Virtual Scroll Interaction Lab

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Create the Lab container and one original virtual-scroll demo using ngx-ui-scroll,
boneyard-js and app-bundled mock JSON. Do not reuse organization-specific implementation,
interfaces or utilities. Decisions and edge cases were confirmed individually.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start and Explore a Large List (Priority: P1)

A visitor explicitly starts a demo showing virtualized access to 100,000 neutral mock
records, without downloading the dataset when first opening the portfolio.

**Why this priority**: Demonstrates actual large-list behavior without production data
or a browser-freezing render-all mode.

**Independent Test**: Verify no dataset request before Start, then start and scroll through
the actual bundled dataset while inspecting visible rows and rendered-row count.

**Acceptance Scenarios**:

1. **Given** the initial Lab, **When** viewed, **Then** it explains that Start loads
   100,000 mock records and does not yet request the JSON.
2. **Given** Start, **When** activated, **Then** skeletons and accessible loading text
   appear until a validated dataset can render.
3. **Given** the ready dataset, **When** scrolling, **Then** rows show ID, name and
   description and only a virtualized subset is rendered.
4. **Given** a short browser window, **When** viewing the list, **Then** its scroll
   area is 400px high, capped at 60% of viewport height.

---

### User Story 2 - Search, Sort and Reset (Priority: P1)

A visitor searches names/descriptions, sorts by ID/name and restores the initial view.

**Why this priority**: Demonstrates full-dataset querying before pagination, not filtering
only the current window.

**Independent Test**: Search a record beyond the initial window, test all four sort
combinations, rapidly change controls, then Reset.

**Acceptance Scenarios**:

1. **Given** a query, **When** searching, **Then** it matches names/descriptions across
   the entire dataset before pagination and returns the list to the top.
2. **Given** ID or name sorting in either direction, **When** selected, **Then** the
   entire matching dataset is ordered before windowing and returns to the top.
3. **Given** rapid changes, **When** operations complete out of order, **Then** only
   the newest selection may publish rows, status or measurements.
4. **Given** no matches, **When** search completes, **Then** "No matching records" appears.
5. **Given** a loaded dataset, **When** Reset is selected, **Then** search clears, ID
   ascending returns, scrolling goes to top and the JSON is not downloaded again.

---

### User Story 3 - Understand Honest Results and Failures (Priority: P2)

A visitor sees real operation measurements, estimated row-memory savings, and usable
error/accessibility behavior.

**Why this priority**: Neither reference numbers nor row-count memory estimates should
be misrepresented as this demo's measured RAM or performance.

**Independent Test**: Use controlled clock/render observations, invalid responses,
reduced motion, keyboard interaction and route teardown.

**Acceptance Scenarios**:

1. **Given** a nonempty operation, **When** its first record is actually visible,
   **Then** elapsed first-row time is measured and labelled for that operation;
   rendered-row count describes actual record DOM rows, not total matches.
2. **Given** ready nonempty results, **When** rows render, **Then** estimated rendered-row
   memory savings compares current DOM rows with all matching records using
   `(1 - rendered rows / matches) * 100`. Label equal-per-row assumptions and exclusions;
   this is not measured RAM. Empty/error/pending results have no estimate.
3. **Given** unavailable/invalid JSON, duplicate IDs or missing fields, **When** loading,
   **Then** an explicit error and Retry appear without publishing partial data.
4. **Given** reduced motion, narrow display or keyboard use, **When** interacting,
   **Then** skeletons are static, rows fit and the scroll region does not trap focus.
5. **Given** page exit, **When** the demo is destroyed, **Then** pending work and the
   virtual-scroll/skeleton lifecycle are disposed without late updates.

### Edge Cases

User confirmed: latest-change wins; empty results; invalid JSON/duplicate IDs/required
fields; retry; cached reset; static reduced-motion skeletons; keyboard scroll without
trapping; mobile/200% zoom; latest-operation metrics; teardown; explicit Start notice.
The list height 400px/max 60vh was separately confirmed.
Additional analyzed measurement case: an empty result has no first visible row, so report
first-row timing as not applicable rather than inventing a duration.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Include the Lab container and this one demo; no accessibility demo or
  all-100,000-rows comparison mode in this feature.
- **FR-002**: Use a fresh implementation with ngx-ui-scroll and boneyard-js. Organization
  code, tokens, utilities, names and data MUST NOT be copied or included.
- **FR-003**: Bundle JSON with exactly 100,000 synthetic records containing unique ID,
  name and description; no organization/customer/production data.
- **FR-004**: Dataset loading MUST start only after explicit Start; reuse validated
  in-memory data for search/sort/reset during that demo session.
- **FR-005**: Search name/description over all records and sort by ID/name ascending/
  descending before pagination. Latest selection alone may update presentation.
- **FR-006**: Search/sort/reset MUST return the list to the top. Reset clears search
  and restores ID ascending without another successful-load request.
- **FR-007**: Render a bounded virtualized window; viewport height is 400px capped at 60vh.
- **FR-008**: Use skeletons and readable loading status; reduced motion MUST remove skeleton
  animation. OS color preference MUST NOT change the fixed palette.
- **FR-009**: Distinguish loading, ready, empty and failure. Invalid dataset MUST fail
  as a whole with Retry, not silently drop malformed records.
- **FR-010**: Measure elapsed time to a real first visible record and actual rendered
  record count; label the latest operation. Empty/error operations have no first-row value.
- **FR-011** (owner amendment 2026-10-04): Replace historical project improvements with
  estimated row-memory savings, explicitly a row-count proxy rather than measured RAM.
  Both approaches retain the full dataset; exclude shared page/library overhead.
  No fabricated FPS, fixed rendered counts, guaranteed improvement or worker claim.
- **FR-012**: Controls and list MUST be keyboard accessible and reflow at 320px/200% zoom.
- **FR-013**: Teardown MUST cancel requests/pending operations, dispose observers/library
  instances and prevent stale completion updates.
- **FR-014**: Libraries MUST pass Angular 22 integration checks before dependent
  implementation; no forced peer install, silent substitute or ignored incompatibility.
- **FR-015**: Reuse approved blueprint tokens. Any missing design values MUST be
  confirmed before dependent implementation. No publication or other component redesign.

### Key Entities

- **Mock record**: Unique numeric ID, nonempty name and description.
- **Dataset session**: Validated full array, load state and current query/result ordering.
- **Query selection**: Search text, sort field/direction and latest-operation identity.
- **Measurement**: Operation identity, start, first-visible duration and record DOM count.
- **Row-memory estimate**: Nullable reduction in rendered rows versus all current matches,
  assuming equal per-row memory; not measured total RAM.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Exactly 100,000 valid unique records in the asset; zero dataset requests before Start.
- **SC-002**: Search finds records outside the first window and all four sort combinations
  produce the expected full-result ordering.
- **SC-003**: Zero stale updates in controlled out-of-order tests; Reset makes zero
  additional dataset requests after successful load.
- **SC-004**: Record DOM count stays below total matches for the full dataset and does
  not grow with cumulative scrolling; measured count equals actual record elements.
- **SC-005**: Controlled timing tests prove latest-operation first-row timing ends on
  real visibility, not JSON arrival; empty/failure display no invented timing.
- **SC-006**: Every loading/empty/failure/retry, keyboard, reduced-motion and teardown
  acceptance case passes before feature completion.
- **SC-007**: Scroll height is min(400px, 60vh); 320px/200% zoom cases need no page-wide
  horizontal scrolling. No performance percentage is falsely presented as a live result.

## Assumptions

### Global Loading Amendment (2026-10-03)

Lazy-load Lab component and its library code near the viewport or immediately on
explicit/direct Lab navigation. Its shell heading/anchor stays permanent. Loading the
component MUST NOT fetch/import the 100,000-record dataset; explicit Start still owns
that request. Follow the [shell loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

- Depends on implemented styles001 and shell002; currently these are planning artifacts.
- The supplied organization example is contextual only, not source material to reuse.
- JSON is a separately requested static asset, not eagerly imported into the app bundle.
- No artificial delay is needed just to show skeletons.
- Query matching details and deterministic ordering are defined in the data contract.
- Package peer ranges permit Angular 22; actual integration still needs executable evidence.
- All safety/performance claims are bounded to measured behavior; no guaranteed FPS or
  time threshold was approved.
