# Implementation Plan: Sticky Portfolio Shell

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

**Input**: `specs/002-sticky-shell/spec.md`

## Summary

**Contact010 amendment**: Root routed-modal host keeps originating Home/detail mounted
beneath `/contact`, or mounts Home for direct entry. Contact code remains lazy; eager
host owns loader failure and pending-navigation lock through a tiny interface, not
eager form imports. Preserve background scroll/metadata and restore permitted history/
focus; latest sending-lock policy supersedes prior dismissal-while-sending decisions.

**Article-detail amendment009**: Route data selects dedicated reading mode without
identity/sidebar, reusing canvas/bottom actions. Eager root failure boundary handles
failed detail code with Retry/Back. Home owns restoration of completed Articles
snapshot/reading offset and initiating-card focus; no hidden Home or background fetch.

**Global loading amendment (2026-10-03)**: This overrides eager section imports in
the original stages below. Home eagerly owns shell containers/anchors/About and a scoped
activation coordinator; dynamically import later standalone sections on viewport approach
or explicit fragment intent. Retain outlet and route-level lazy detail/Contact. Do not
eagerly import card/role/Vault data or preload every feature immediately. Use retryable
code-loading state without competing scrolling, dispose observation/intent callbacks,
and verify actual initial-network/chunk isolation (not just source dynamic-import syntax).
Follow the [shared loading contract](contracts/shell-contract.md#global-loading-amendment-2026-10-03);
activate within 20rem below the viewport and show section-scoped code-load error/Retry.
Convert 20rem to current computed root-font pixels for IntersectionObserver rootMargin,
re-evaluating changed font settings. Prefer scoped dynamic imports with explicit state
over an unretryable deferred block. Use failure-tested retry without forced reload,
cache-busting imports or premature mount. Do not place all loaders in an eager barrel.

Build the next feature after the styles foundation: the reference-inspired sticky
identity/navigation column, blueprint canvas, five-section homepage and bottom Contact
plus social icons. Reuse current About, Articles and Apps content; use titled empty
containers for Interaction Lab and Experiences. Implement fragment/history navigation
and three exact legacy redirects. Do not redesign section components, article detail
or contact submission, remove unrelated routes, or publish.

The root component owns shell layout; a new standalone homepage component owns ordered
section composition and section-scroll coordination. Keep a root router outlet so
existing article detail, Contact and temporary Resume still have a usable content area.

## Technical Context

**Language/Version**: TypeScript ~6.0.3, HTML, SCSS; dependency-free Node script for version metadata.

**Primary Dependencies**: Angular ^22.1.3 standalone/router, CLI/build ^22.1.5,
RxJS ^7.8.2, current Feather icons. Native intersection/resize observation.

**Storage**: Browser navigation history only; no persistent user state or new backend.

**Testing**: Existing Jasmine/Karma; RouterTestingHarness and controlled network
providers; fake observation and scroll adapters for deterministic coordinator tests.
Node's built-in tests for metadata generation. Real browser geometry/media/history
checks supplement mocks.

**Target Platform**: Browser portfolio, Firebase destination unchanged.

**Project Type**: Single Angular frontend.

**Performance Goals**: No per-scroll Angular render loop; use native observers and
bounded, coalesced layout work. No duplicated article fetch when fragment changes.
Retain existing build/style budgets, with no new framework dependency.

**Constraints**: Depends on completed feature 001; exact reference/approved design
values; one scroll owner; explicit selection pushes history, passive scroll does not.
No invented Lab/Experiences content. No deployment; existing CI safeguards apply.

**Scale/Scope**: Root shell, one homepage composition component, one narrowly scoped
navigation coordinator, routing tests, icon registration, derived version metadata
and minimal embedding fixes to existing components.

## Constitution Check

*Pre-research gate and post-design recheck against constitution 1.0.1.*

| Gate | Planned compliance | Result |
|------|--------------------|--------|
| Portfolio purpose | One readable stream; verified identity; no fake content | Pass |
| Test-first | Runnable baseline then failing layout/navigation/action tests before production edits | Pass for design; evidence required in implementation |
| Collaborative edge cases | Decisions and short-window/history/async cases confirmed individually | Pass |
| Dev.to reliability | Keep owner source, controlled successful/loading/empty/failure/malformed/rate-limit tests | Pass with minimal integration state coverage |
| Main-only CI | No workflow/deployment edits here; separate CI safeguards before redesign PR execution | Execution prerequisite; no waiver |
| Angular 22 standalone | Reuse standalone components and router harness | Pass |
| Artwork route baseline | Preserve until approved route-retirement feature | Pass |
| CalVer | Read current actual version; release/version migration remains final work | Pass for non-release scope |

**Post-design outcome**: No unresolved shell design clarification or new constitutional
exception. Feature 001 is planned, not implemented; it is an implementation prerequisite.
Existing CI noncompliance and publication hold remain explicit execution/release gates
as recorded in feature 001. Do not call the app or gates complete from these artifacts.

## Project Structure

### Documentation (this feature)

```text
specs/002-sticky-shell/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/shell-contract.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Source Code (repository root)

```text
package.json                         # metadata-generation lifecycle hooks
scripts/
├── generate-app-version.mjs          # proposed dependency-free generator/check mode
└── generate-app-version.test.mjs     # proposed Node tests
src/
├── main.ts                          # avoid competing automatic fragment scroll
├── app/
│   ├── app.component.{ts,html,scss,spec.ts}
│   ├── app.routes.ts
│   ├── app.routes.spec.ts            # proposed app-level routing coverage
│   ├── home/
│   │   ├── home.component.{ts,html,scss,spec.ts}
│   │   └── section-navigation.{ts,spec.ts}
│   ├── generated/app-version.ts     # generated/checked-in derivative, never hand-edited
│   ├── feather-icons/feather-icons.module.ts
│   └── work-module/
│       ├── work.routes.{ts,spec.ts}
│       └── work/{apps,articles,card}/* # embedding/accessibility/containment only
└── app/about/*                      # minimal lifecycle/containment fixes if required
```

**Structure Decision**: Root owns shared identity/background/actions and route outlet.
Home owns section anchors and navigation lifecycle. A small coordinator is justified
by history, render timing and asynchronous geometry; no generic scrolling framework.
Future sections replace containers without redesigning the root again.

## Implementation Stages

### A. Prerequisites and Failing Tests

1. Finish feature 001 before shell production edits; establish a runnable existing
   browser suite. Infrastructure failures do not count as behavioral red evidence.
2. Add root/home tests for exact identity, version, five sections and bottom-only actions.
   Add routing tests using actual APP_ROUTES and separate tests for legacy detail routes.
3. Add deterministic coordinator tests for explicit selection, repeat clicks, initial
   fragments, unknown fragments, popstate restoration, observer-driven active changes,
   delayed geometry, user interruption and teardown.
4. Add real mounted browser geometry checks at 320/1023/1024px, 200% zoom and short
   windows; verify native reduced-motion state rather than only mocking matchMedia.
5. Record intended failures before implementation: homepage not composed, old header/menu,
   missing anchors/bottom icons, old route destinations. Baseline article/contact/detail
   functionality remains independently covered with controlled responses.

### B. Identity, Layout and Composition

1. Replace root fixed top-menu/hamburger shell with reference-inspired columns and canvas,
   using feature 001's token/typography primitives. Apply values in the contract.
2. Import current About/Articles/Apps in standalone Home; add all five permanent section
   containers immediately so anchors do not depend on network completion.
3. Make desktop column sticky only when measured content fits the available viewport;
   otherwise it participates in ordinary document flow. Re-evaluate after resize/fonts.
   Never clip or trap sidebar overflow. Below 1024px use visible wrapping links.
4. Preserve existing section component content and card interactions. Make narrowly scoped
   responsive embedding changes where fixed card widths/viewport grids cannot fit the new
   column: container-based grid reflow, images/cards max-width, min-width zero.
   This is containment, not the future blueprint-card redesign.
5. Remove duplicate `id="articles"` from the existing list (the permanent section owns it).
   Replace dead `aria-labelledby="tab-article"`/`tab-apps` references with actual section
   heading IDs in embedded mode; ensure standalone legacy usages remain valid.
6. If mounted About navigation reveals its existing interval surviving teardown, add
   bounded cleanup with a regression test; do not rewrite its copy/typewriter/photo.
   Avoid accumulating page metadata as multiple previously routed components coexist;
   root/home owns canonical homepage metadata, with minimal embedded-mode suppression of
   route-only child metadata and preservation of article-detail metadata.

### C. Navigation and Compatibility

1. Use native anchor semantics with Angular router fragments; sidebar Home destinations
   navigate to root even from a retained detail/contact/resume route.
2. Put exact `pathMatch: 'full'` aliases before the broad Work loader. Return a parsed
   canonical fragment UrlTree from redirects; verify Angular 22 redirect behavior with
   RouterTestingHarness. Keep `work/articles/:id` unaffected and current contact/resume/art.
3. Provide one coordinator shared by root and Home. Root renders its read-only active
   destination; only Home starts/stops its section-observation session and owns section
   scrolling. No root observer duplicates Home work. The coordinator owns
   initial/selected/history scrolling after render.
   Do not also enable router automatic anchor restoration or browser restoration that
   races it. Restore previous global browser settings on teardown.
4. Observe section geometry for active state; passive callbacks never navigate.
   During intentional scrolling, hold the requested active destination until settled
   or interrupted. History restoration is instant; explicit selection is smooth unless
   reduced motion. Same-fragment selection scrolls without pushing another entry.
5. Track the requested target until rendered; no arbitrary timeout. Use render/resize
   signals, coalesced work and deterministic anchor arbitration from the contract.
   Preserve the currently read section/relative offset during delayed changes above it;
   stop stale corrections as soon as a new navigation/user scroll supersedes them.
6. Disconnect observers/listeners and cancel pending work on route exit/destruction.
   Skip-to-content remains keyboard usable and distinct from section history changes.

### D. Bottom Actions and Version

1. Render bottom Contact then five icons; no sidebar social/contact copies. Keep current
   profile URLs and add confirmed Dev.to link. Register only needed icons; a small local
   Dev.to SVG/icon is acceptable if Feather lacks its brand symbol, with accessible link name.
2. Contact remains a real `/contact` link in this feature; do not implement modal state.
3. Generate a small typed version constant inside `src` from `package.json.version`,
   without importing the full manifest or maintaining another version literal.
   Use a dependency-free script with validation, deterministic output and check mode.
4. Run generation on npm prestart/prebuild/pretest/prewatch; commit the derivative so
   direct CLI compilation works, and require freshness validation for direct CLI workflows.
   Validate generation in tests using temporary manifests rather than changing the real release.
   Do not bump version here; currently the actual app version is 0.9.9.

### E. Validation

Run the guide in `quickstart.md`. Establish failing-first and passing affected coverage,
then full suite. Controlled Dev.to states include successful/loading/empty/failure,
malformed/unavailable data and rate limits. Add only necessary readable empty/failure
embedding feedback when current UI would disappear or fail; do not bundle listing/card/
retry redesign. Failures must not be presented as successful empty results.

No section component design, Contact dialog, detail redesign, Resume/art deletion,
release-version bump, CI implementation or deployment in this feature.

## Complexity Tracking

No constitutional exception. New Home separates composition from retained route views;
one small coordinator prevents competing scroll/history behavior. Metadata derivation
avoids a copied version literal. Minimal child containment/lifecycle/metadata corrections
are tightly coupled integration work, not extra component features.
