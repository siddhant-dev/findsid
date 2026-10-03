# Research: Virtual Scroll Interaction Lab

**Date**: 2026-10-03

Public package/documentation research used generic library questions only. No repository
or organization code was sent to external services. No installs or runtime tests performed.

## Virtualization

**Decision**: Candidate ngx-ui-scroll 4.2.0 plus required peer vscroll 1.8.4.
Standalone components import UiScrollModule and use typed Datasource.
**Rationale**: User chose it; public peer ranges Angular core/common >=17 and
vscroll ^1.8.3 include the app version. Maintainer examples inspected use Angular 21,
not proof of Angular22 runtime behavior.
**Alternatives considered**: CDK (user chose ngx), render-all comparison (explicitly excluded).
**Sources**: https://registry.npmjs.org/ngx-ui-scroll,
https://registry.npmjs.org/vscroll,
https://github.com/dhilt/ngx-ui-scroll/blob/master/README.md

Public datasource supports callback/Promise/Observable; short slices signal boundaries.
Adapter provides reset/reload, loading/init/visible state and item counts. Error/disposal
behavior must be checked against actual installed API; no fake-empty fallback.

## Skeletons

**Decision**: Candidate boneyard-js 1.10.0 Angular SkeletonComponent entrypoint;
explicit fixed colors and reduced-motion settings.
**Rationale**: Package declares optional Angular core >=14; Angular adapter generates
styles and manages observers. No built-in reduced-motion handling found; app must bind it.
Dark preference handling must not change the palette.
**Alternatives considered**: Organization skeleton (prohibited), different package
(not requested), Playwright snapshot build pipeline (unnecessary).
**Sources**: https://registry.npmjs.org/boneyard-js,
https://github.com/0xGF/boneyard,
https://github.com/0xGF/boneyard/blob/main/packages/boneyard/src/angular.ts

Both libraries report MIT licenses. Boneyard package also includes CLI-related Playwright
dependency: account for lockfile/install footprint, never bundle CLI into browser.
Angular22 integration remains unexecuted, not guaranteed.

## Original Data and Querying

**Decision**: Generate neutral JSON independently; click-to-fetch/validate/cache;
filter/sort globally before slicing. Stable IDs, query generations and serialized
adapter work govern stale operations.
**Rationale**: User rejected org-code reuse and chose JSON. Virtualized DOM does not
eliminate parsing/filtering/sorting cost of 100K records.
**Alternatives considered**: Runtime-only generated array (not bundled JSON), live org
provider (prohibited), per-window searching (incorrect), sorting every fetch (wasteful).

## Measurements

**Decision**: Real first-visible current-operation row duration and scoped record DOM count.
Owner-reported project improvements are separate.
**Rationale**: Reference metrics are synthetic; data-arrival time is not row visibility.
Adapter buffer counts require actual DOM verification. Empty results have no first row.
**Alternatives considered**: Fixed 60 FPS/28 rows/80% demo claims (misleading),
all-row stress baseline (user excluded).

## Design and Validation

**Decision**: Reference blueprint styles plus approved 400px/max60vh region; no new
palette, row-height or fake loading delay. Reuse Karma and controlled response/clock tests,
with real-library dynamic-height/boundary/teardown checks.
**Rationale**: User confirmed missing size and all edge cases; runtime compatibility
requires executable evidence before dependent implementation.
**Alternatives considered**: Force installation, silently switch library, source-only
tests or assume adapter promise resolves after actual paint (not acceptable).

No first-feature design clarification remains. Compatibility failure must block execution
and be reported; peer-declared support is not certified support.
