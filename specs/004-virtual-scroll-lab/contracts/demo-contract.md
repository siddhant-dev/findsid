# Demo UI and Data Contract

Consumes [style contract](../../001-blueprint-styles/contracts/style-contract.md) and
[shell contract](../../002-sticky-shell/contracts/shell-contract.md).

## Structure and Controls

Home owns `lab` / `lab-heading`. Lab adds one blueprint demo with a descriptive title,
neutral-data explanation, Start control, state area and measurements. No second section
heading, org branding, accessibility demo or render-all toggle.

Controls after Start: labelled search (name/description), sort field ID/name, direction
ascending/descending and Reset. Initial/reset selection: empty, ID ascending.
JSON asset path: `assets/lab/records.json`; one full-array request only after Start.
No module-level eager JSON import.

List: 400px high, max-height60vh, width available column, adaptive wrapped text.
Rows: name, description and ID; no production/customer fields or fixed unapproved height.
Use foundation title/body/metadata roles, borders/surfaces and reference Lab styles.
Any missing numerical design value needs approval.

## Data and Pagination

Exactly 100,000 original synthetic records: positive unique numeric IDs1..100000,
nonempty name/description. No reuse of supplied organization classes/interfaces/token.

Trim case-insensitive substring search over name OR description before sorting.
Numeric ID sort; name sort by normalized lexical code-point order with numeric ID
ascending tie-break. Direction affects primary comparator; deterministic ties.
Query once per latest selection, then slice windows. Negative library indices yield
only valid intersections with the finite result range; do not clamp negative start and
return an incorrect duplicated window. Empty/short window means true boundary only.

## States

- Idle: explain 100,000 mock records; Start; no data fetch/metrics.
- Loading: boneyard skeleton with "Loading records…" accessible status. No forced delay.
- Ready/querying: preserve latest intent; loading/query status; no stale rows or metrics
  certified as current. Search/sort return top after latest result commits.
- Empty: "No matching records"; controls remain usable; first-row timing not applicable.
- Error: descriptive failure and Retry, not an empty result. Reject whole invalid dataset.
- Reset: latest default query/top, cached data, no successful-load refetch.
- Disposed: cancelled work, detached directive, no late status updates.

Skeleton color/darkColor both use approved muted color. Reduced motion forces solid and
no transition/stagger. No OS theme alternate. Status text is separate from decorative bones.
Use real library render lifecycle; cleanup is not merely adapter.pause().

## Honest Metrics

Label latest operation: Start/search/sort/reset. Start clock begins at accepted Start
and includes fetch/parse/validation/query/render; later operations include their processing/
render, not a network request that did not happen.

Finish after connected current-generation row intersects the list viewport at a rendered
frame. Exclude skeleton/old row elements. This is observed first-row visibility, not an
exact paint benchmark. Scoped rendered-record element count includes buffered record
elements, not skeletons/spacer nodes. Show match count separately if displayed.
Never confuse adapter.itemsCount with total search matches.

Owner-reported project outcomes: "Improved performance by 40–60% and reduced loading
time by 80%" in a separate labelled project-results area. No live percentage calculation,
guaranteed FPS, Web Worker or true remote-pagination claim.

## Lifecycle and Accessibility

Latest generation wins for data, reload, status and measurement; stale pending library
callbacks cannot commit old data. Cancel request/query/frame/observer work on destruction.
Dataset lives for mounted session only. No retained org/private content in assets/docs/code.

Keyboard reachable labelled controls and scroll region; native scrolling, no focus trap.
No per-row Tab stops. Mobile/zoom reflow and static reduced-motion loading required.
Shell fragment/history and async-position preservation remain unchanged.
