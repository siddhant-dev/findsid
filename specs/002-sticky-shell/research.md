# Research: Sticky Portfolio Shell

**Date**: 2026-10-03

Local code/reference inspection and one bounded routing/version research agent.
No application implementation, package installation, build or live requests.

## Composition and Route Ownership

**Global loading amendment (2026-10-03)**: User approved eager styles/shell/About,
viewport-triggered later sections within20rem, immediate explicit/direct target loading
and route-lazy detail/Contact. This overrides eager Home child imports below. Use scoped
dynamic imports and explicit idle/loading/ready/error state with section-only Retry.
Convert rem using current computed root size for observer margin; no eager barrels or
blanket background prefetch. Imports may not be physically cancellable, so generation/
ownership guards must prevent destroyed-owner mount. Failed import retry must be
proven against actual Angular/browser behavior; no cache-busting/global reload shortcut.

Permanent headings alone can initially cluster because deferred content has no height.
Do not invent fixed placeholder heights to claim bundle savings. Re-evaluate visibility
after mounted content changes, and report actual eager/viewport-triggered requests;
a section genuinely inside the approved range may activate on initial entry.
No measured first-content/bundle reduction is established by these artifacts.

**Decision**: Root shell retains router outlet; new standalone Home composes current
About, Articles and Apps with permanent section wrappers and empty Lab/Experiences containers.
Use exact app-level legacy redirects before Work loader, preserving article detail.

**Rationale**: Current APP_ROUTES makes About the root and lazy Work owns articles/apps/detail.
Cards navigate explicitly to `work/articles/:id`. Deleting the Work prefix prematurely
would break these links. Permanent anchors avoid loading-dependent target availability.

**Alternatives considered**: Putting all sections directly in AppComponent (also mounts
them on contact/detail views), removing all Work routes (breaks detail), wildcard aliases
(capture detail URLs).

**Evidence**: `app.routes.ts`, `work.routes.ts`, `card.component.ts`,
`articles.component.html`, `apps.component.html`.

## Scroll and History

**Decision**: One shared coordinator with a Home-owned lifecycle owns fragment scroll
after render and history restoration. Root reads active state without running another
observer. Router owns URLs/history; observers own passive active state only.
Use UrlTree redirects and real harness tests rather than source-table assertions alone.

**Rationale**: Bootstrap currently has no automatic anchor scrolling. ViewportScroller
is existing prior art for skip-content. Automatic router scrolling plus ad hoc callbacks
would create races, especially after delayed data changes.

**Alternatives considered**: Updating fragment on every scroll (history/URL confusion),
multiple scroll owners, arbitrary rendering delays (unreliable), section IDs inside lists
(anchors disappear during loading).

**Evidence**: Root ViewportScroller use; research of standalone bootstrap and route tests.
RouterTestingHarness with provideRouter already exists. Exact API/runtime behavior must
be verified by failing-first tests against installed Angular 22; this is not claimed executed.

## Responsive Containment

**Decision**: Use reference 1280px container, 24px side padding, 48px desktop gap and
45:50 column ratio with shrinkable tracks. Disable sticky when actual content does not fit.
Current child lists may receive minimal container-responsive embedding changes.

**Rationale**: Reference percentage widths plus a fixed gap can overflow at some widths.
Existing lists use viewport-based two/three-column grids while current cards have fixed
widths; they cannot simply be placed unchanged in a half-page column.

**Alternatives considered**: Hiding horizontal overflow (masks defects), nested scrolling
sidebar (unnecessary UX change), transplanting redesigned cards (breaks feature boundary).

**Evidence**: Reference layout; Apps/Articles SCSS and card dimensions; confirmed short-window
and zoom cases. Use existing/reference values, not unapproved new design measurements.

## Embedded Lifecycle and Accessibility

**Decision**: Permanent section IDs/headings own anchor and labelling; remove duplicate
list IDs/dead old tab labels. Preserve old content but test embedded component teardown
and page metadata so mounting several previously routed components does not leak.

**Rationale**: Existing article list uses `id="articles"` and a removed tab label.
About creates an interval without clearing it; route/section integration must not add
more leaks or stale metadata. Only integration-coupled fixes with regression tests belong here.

**Alternatives considered**: Keep duplicate anchors (unreliable target selection),
ignore detached callbacks (regression risk), broad component refactoring (out of scope).

## App Version

**Decision**: Generate a small typed derivative in `src/app/generated/app-version.ts`
from package.version using a dependency-free Node script; run on npm lifecycle hooks,
check freshness and commit the derivative for direct CLI compilation.

**Rationale**: No existing version pipeline; TypeScript project is src-rooted. Avoid
importing the full package manifest into browser code or weakening config unnecessarily.
Current metadata is 0.9.9; displaying it is not a release/version migration.

**Alternatives considered**: Hardcoded badge (drifts), fetch entire package.json (unnecessary
manifest exposure/request), direct JSON import (requires config/toolchain investigation),
custom build plugin (unnecessary).

**Evidence**: `package.json`, tsconfig app rootDir, research of scripts/config. JSON import
failure is not claimed runtime-proven; generator is chosen independently for explicit ownership.

## State Coverage and Release Gates

**Decision**: Reuse controlled service tests for embedded successful/loading/empty/failure
states; minimal integration feedback only, not full retry/listing redesign. Retain owner's
Dev.to account. No deploy; foundation and separately scoped CI safeguards precede execution.

**Rationale**: Constitution requires reliability even when presentation changes.
Existing article template lacks explicit empty UI; embedding tests must not certify it
as complete by ignoring the state. Future article feature retains full state/retry design.

**Alternatives considered**: Live calls (nondeterministic), bypass reliability requirement
(not allowed), bundle all article redesign (violates agreed scope).

## Resolution

Shell design decisions resolved. Installation/API compatibility and real browser geometry/
history behavior are implementation validation gates, not implied successful execution.
Contact dialog and article-detail redesign history choices remain their own future scope.
