# Bug Assessment: Respect Preferred Font Size and Scale Shared Layout

- **Slug**: accessible-font-scaling
- **Created**: 2026-10-15
- **Source**: pasted text and conversation context
- **Verdict**: valid
- **Severity**: medium

## Report (verbatim or summarized)

> before we do that why are all css values in pixels it does not scales with device font size and thus does not clear WCAG 2.0 guidelines

> create a bug spec for this and then implement it

Most typography already uses rem, but the root and body explicitly fix their font size at 16px. Shared shell spacing, control padding, and section reading offsets still use fixed pixel lengths. No report URL was provided or fetched.

## Symptom

The browser's preferred default font size cannot determine the document root font size, limiting the benefit of existing rem typography. Increasing text size also leaves shared shell/control spacing and the navigation reading offset fixed instead of following the text scale.

This is a confirmed preference-responsiveness defect, not a finding that all pixel values violate WCAG. WCAG 2.0 SC 1.4.4 requires text resizing to 200% without loss of content or functionality; full conformance requires behavioral verification, not a unit-name check.

## Reproduction

1. Inspect the `html, body` rule in `src/styles.scss`: it declares `font-size: 16px` for both elements.
2. Increase the browser's default font size from 16px to 20px or 32px and reload. The author-specified root remains 16px rather than following that preference.
3. Inspect Home section scroll margins and navigation computations: the CSS and three JavaScript call sites independently hardcode 96px.

Static inspection confirms both causes. Browser tests should distinguish a changed browser default, an explicit root-size override, text-only resizing, and full-page zoom rather than treating them as equivalent.

## Suspected Code Paths

- `src/styles.scss`: the shared root/body font rule overrides the default font preference; typography roles already mostly use rem.
- `src/vars.scss`: shared button/tag padding uses px while their text uses rem.
- `src/app/app.component.scss`: shell widths, spacing, section padding, and navigation decoration combine fixed pixels with relative text. The owner heading also includes viewport-dependent text sizing.
- `src/app/home/home.component.scss`: section spacing and scroll margins are fixed at 96px.
- `src/app/home/home.component.ts:handleNavigationIntent()`, `handleAppendNavigation()`, and `updateActiveSection()` independently use a fixed 96px reading offset, which would diverge from scalable CSS unless updated together.
- `src/styles.spec.ts`, `src/app/app.component.spec.ts`, and `src/app/home/home.component.spec.ts` provide existing homes for style, shell, and navigation regression tests.

## Root Cause Hypothesis

**Confidence: high.** The root font size is explicitly anchored to 16 CSS pixels, so rem values cannot track a changed initial browser font size. Several shared layout measurements were separately copied from the original 16px-based design, including navigation's 96px reading line. Merely replacing the root font declaration would leave JavaScript navigation and layout spacing disconnected from the larger text. A cheap discriminating check is to verify that the root style uses a percentage, then render at 16px, 20px, and 32px root sizes and compare text, shared control padding, section scroll margins, and the offset actually used for navigation.

## Proposed Remediation

**Preferred**: Let the root follow the browser default with `font-size: 100%`, let body inherit, and convert text-related shared control padding and shell/Home spacing to rem using the existing 16px appearance as the baseline. Keep borders, decorative grid strokes, and rounding tolerances in pixels. Replace the owner heading's viewport-based sizing with responsive rem sizing without introducing a new visual design. Preserve existing breakpoint behavior unless evidence requires a coordinated change.

Declare a shared rem-based section reading-offset token, apply it through Home's `scroll-margin-top`, and read the computed CSS-pixel scroll margin for JavaScript navigation and passive selection. Use that resolved value for explicit section navigation, appended article navigation, and active-section selection, retaining the existing one-pixel rounding tolerance. Do not add listeners or observers unless required by focused tests.

**Files likely to change**:

- `src/styles.scss`
- `src/vars.scss`
- `src/app/app.component.scss`
- `src/app/home/home.component.scss`
- `src/app/home/home.component.ts`
- `src/styles.spec.ts`
- `src/app/app.component.spec.ts`
- `src/app/home/home.component.spec.ts`

**Tests to add or update**:

- Verify the root follows the browser default and the body inherits it rather than declaring a fixed font size.
- At root sizes 16px, 20px, and 32px, verify typography and shared button/tag padding scale together and restore root styles after every test.
- Verify shell spacing and Home's computed scroll margin scale without losing the baseline appearance.
- Assert explicit section navigation and appended article navigation subtract the computed reading offset, and passive selection uses that same offset, including fractional positions and manual scrolling.
- Check desktop and narrow mobile layouts with enlarged root fonts for document overflow, clipped controls, and navigation overlap. Check preferred browser font size and 200% page zoom where the available tooling permits; clearly disclose emulation limits.
- Run focused existing style, Home, and navigation tests. Do not fix unrelated pre-existing failures.

## Risks & Considerations

- The change affects shared typography and layout, so test at the default and enlarged sizes rather than asserting unit conversions alone. Severity is medium because users with larger-text preferences are affected across the application; no data or security risk is identified.
- Pixel units are valid for thin borders, decorative artwork, DOM coordinates, and small rounding tolerances. Do not convert all pixel occurrences mechanically.
- Virtualized row dimensions and other fixed-format domain measurements are outside this shared-layout fix; changing them without coordinating their rendering engines can break scrolling.
- A percentage root respects the browser's default font preference but does not guarantee that every OS accessibility setting is forwarded by the browser.
- Existing startup-scroll behavior recorded under `experiences-nav-active` is a separate issue. This fix must not claim to resolve it or broaden into a navigation-lifecycle refactor.
- Preserve unrelated user edits and the earlier section-boundary regression tests. No new dependencies, APIs, or migrations are needed.

## Open Questions

- Full WCAG conformance is not asserted by this bug fix. Native browser text-only zoom and platform-specific font-preference coverage may require manual verification beyond available automated checks.
- If browser testing reveals clipping in an individual component outside the listed shared surfaces, document it for targeted follow-up rather than applying an unreviewed repository-wide unit conversion.