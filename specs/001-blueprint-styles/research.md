# Research: Blueprint Styles Foundation

**Date**: 2026-10-03

Local source investigation plus one bounded test-infrastructure research agent.
No application code, dependency, test execution or deployment change.

## Fixed Tokens

**Decision**: Import-only semantic declarations/helpers in `src/vars.scss`; one eager
root declaration in `src/styles.scss`, used by build and test.

**Rationale**: Current SCSS wrappers depend on custom properties loaded by separate
light/dark bundles. Component imports must not duplicate root CSS.

**Alternatives considered**: Old-name aliases (user rejected), runtime token service
(unnecessary), new CSS framework (out of scope).

**Evidence**: `vars.scss`, both theme files, `styles.scss`, `angular.json`.

## Theme Removal

**Decision**: Remove all toggle/state/preference/service/bootstrap/bundle wiring.
Update static manifest palette metadata; its `theme_color` is not a theme-switch mechanism.

**Rationale**: Root constructor uses color-scheme matchMedia; service creates a palette
link. `src/main.ts` also explicitly provides ThemeService, so deleting only its component
injection is incomplete.

**Alternatives considered**: Hidden toggle or always-one-theme service (retains rejected
machinery).

**Evidence**: `app.component.{ts,html,scss}`, `theme.service.ts`, `main.ts`, manifest.

## Scope and Values

**Decision**: Directly migrate every style consumer, but preserve component geometry,
routes/content/flows. Minimal role-class/status-markup edits are allowed.
Use only exact reference and confirmed extension/typography values.

**Rationale**: User rejected transitional aliases and deferred each component redesign.
Reference layout/reset rules cannot be pasted wholesale. Deliberately low-contrast demo
styles, fabricated metrics/citations and sample employment text are not approved content.
Article syntax uses the new approved palette rather than inventing shade ramps.

**Alternatives considered**: Variables-only replacement (leaves broken symbols), complete
mockup transplant (violates small-feature scope), guessing missing values (user prohibited).

**Evidence**: Reference HTML, component SCSS/templates and recorded user decisions.

## Test Strategy

**Grid scope correction (2026-10-03)**: The owner moved the reference canvas into this
foundation and confirmed mobile/zoom, scrolling, input layering and reduced-motion cases.
Use a fixed inset-zero canvas with the reference's four gradients and radial vignette.
An isolated root stacking context keeps the negative-z decoration above the document
background but behind existing content/dialogs. This avoids positive content z-index
overrides and does not require the later sticky-shell geometry.
Real computed-style/root tests failed before implementation; viewport/scroll/hit-test
evidence and its CSS-zoom limitation are recorded in `quickstart.md`.

**Decision**: Reuse Jasmine/Karma real-browser computed-style tests and affected standalone
component tests. Establish baseline, then actual missing-behavior red evidence.

**Rationale**: Existing `ng test` uses `@angular/build:karma`. No computed-style coverage
was found. Some standalone TestBed setups may be stale; runner/browser compatibility is
not runtime-verified. This is a setup prerequisite, not proof tests pass.

**Alternatives considered**: Jest/jsdom (not configured; weaker cascade verification),
new Playwright/Cypress stack (not needed for first contract checks).

**Execution detail**: `--watch=false --browsers=ChromeHeadless` overrides interactive
defaults using the built-in launcher. Add a custom launcher only if an observed environment
failure requires it. Restore dependencies only after missing-dependency failure or manifest
change. Native CSS reduced-motion checks need media emulation, not merely JS matchMedia mocks.

**Evidence**: Research of package/Angular/Karma config, `src/test.ts`, existing specs.

## Network-State Preservation

**Decision**: Controlled success/loading/empty/failure fixtures and mocked flow tests;
live retry/empty/malformed-data UX remains later work.

**Rationale**: Styling must not conceal current gaps or broaden scope into business flow
changes. Tests must not depend on Dev.to availability or send actual contact messages.

**Alternatives considered**: Live API smoke tests (nondeterministic/side effects), bundled
flow fixes (violates boundary).

**Evidence**: Articles and contact components, constitution Principle IV.

## Automation Gates

**Decision**: Separately scope CI alignment before redesign PR execution; enforce publication
hold before merging into auto-deploying main. No CI edits or release in feature 001.

**Rationale**: Current PR Firebase workflow builds/deploys previews; main workflow lacks
tests. Dependency-review is another non-test PR job. Constitution explicitly requires
separate alignment. Current application 0.9.9 release metadata becomes later CalVer work.

**Alternatives considered**: Silently accept conflicting CI (not allowed); include all CI
work in styles (scope creep); publish each feature (user rejected).

**Evidence**: Test-infrastructure research of `.github/workflows`, constitution, package.json.

## Resolution

First-feature design clarifications are resolved. Tool compatibility is an execution
prerequisite. Legacy URLs, verified Experiences content, actual Lab demos and detail-page
ideas remain explicitly deferred questions in their own features, not implied approvals.
