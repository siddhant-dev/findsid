# Bug Fix: Accessible Font Scaling

- **Slug**: accessible-font-scaling
- **Fixed**: 2026-10-15
- **Assessment**: ./assessment.md
- **Status**: applied

## Summary

The document now follows the browser's preferred default font size, and shared shell spacing and button/tag padding scale with text. Home navigation resolves its reading offset from computed CSS instead of duplicating a fixed 96px value. Enlarged social links wrap within narrow footers rather than causing page overflow.

## Changes

| File | Change | Notes |
|------|--------|-------|
| `src/styles.scss` | modified | Root uses 100%, body inherits, and a shared 6rem section reading-offset token is declared. |
| `src/vars.scss` | modified | Button/tag padding uses baseline-equivalent rem values; borders remain pixels. |
| `src/app/app.component.scss` | modified | Shared layout spacing and maximum width use rem; identity typography no longer depends on viewport width; social links wrap within their parent. |
| `src/app/home/home.component.scss` | modified | Section spacing uses rem and scroll margins consume the shared reading-offset token. Removes the now-redundant mobile override. |
| `src/app/home/home.component.ts` | modified | Section selection, append movement, and passive active-section tracking use the computed section scroll margin in CSS pixels. |
| `src/styles.spec.ts` | added test | Verifies percentage root sizing, inherited body size, typography, and shared control padding at 16px, 20px, and 32px roots. |
| `src/app/app.component.spec.ts` | added test | Verifies shell spacing, identity typography, and narrow-footer social wrapping at the same font sizes. |
| `src/app/home/home.component.spec.ts` | updated tests | Extends selection/fragment fractional-landing regressions across three root sizes and adds a CSS-overridden append-offset test. |

## Tests Added or Updated

- `Blueprint style contract`: root sizing declaration, inherited body text, body-text typography, button text/padding, and tag padding scale at 16px, 20px, and 32px.
- `AppComponent`: shell padding, maximum width, gap, and identity font size scale; the social row wraps inside a constrained footer without horizontal overflow.
- `Home Experiences activation`: selection and fragment navigation each retain Experiences at fractional reading-line positions at 16px, 20px, and 32px; actual scroll destinations use the computed offset, and subsequent manual movement selects Lab without rewriting the fragment.
- `Home Experiences activation`: appended article movement honors a locally overridden 7rem reading offset at a 32px root, subtracting 224px rather than a hardcoded 96px.
- Existing About/document-bottom selection, one-pixel rounding tolerance, lazy-section mounting, and reading-position tests are retained.

## Local Verification

- Initial root/control slice: `CHROME_BIN='/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge' ./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless --include=src/styles.spec.ts` passed all 9 tests.
- Final focused command: `CHROME_BIN='/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge' ./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless --include=src/styles.spec.ts --include=src/app/home/home.component.spec.ts --include=src/app/home/section-navigation.spec.ts --include=src/app/app.component.spec.ts` compiled successfully and finished with 40 passing tests and one unrelated existing failure. All newly added or extended scaling tests passed. The same result was confirmed after formatting-only cleanup.
- Existing failure: `AppComponent renders the approved identity and five ordered section destinations` expects the badge text `v0.9.9`; the unchanged application template renders `SYS.ARCH | 9.8 years`. That expectation existed before this work and was not modified.
- Editor diagnostics reported no errors in the eight changed source/test files before final formatting cleanup. The subsequent focused build also compiled successfully.
- Browser checks on the existing development server used widths 1440px, 390px, and 320px with explicit root sizes 16px, 20px, and 32px. Root/body sizes agreed, shell horizontal padding was 24/30/48px, and section scroll margins were 96/120/192px. No navigation-link overlap was detected in the initial matrix.
- Browser testing discovered that the original fixed social row overflowed narrow pages at a 32px root. After the scoped wrapping fix, no document-level horizontal overflow remained at 1440px, 390px, or 320px, including checks after Experiences, Lab, Articles, and Vault content had mounted.
- Native browser preference check: Chromium DevTools `Page.setFontSizes` changed the browser's standard default font size to 32px with no root CSS override. Computed root and body were both 32px and the Home reading offset was 192px. This verifies browser font preference handling, not just a stylesheet override.
- After content mounted, explicit Experiences navigation with that native 32px default landed at 192.4375px against the computed 192px reading offset; both active class and `aria-current` selected Experiences. A narrow mobile positioning check landed at 191.546875px with no document overflow.
- Desktop and mobile screenshots at the native 32px browser default showed enlarged content wrapping rather than being clipped. These are focused visual checks, not an audit of every interaction or route.
- Unchanged-region save-formatting churn was removed using mechanical formatting cleanup with TypeScript AST equivalence checks and normalized SCSS comparisons, preserving the implementation and earlier navigation regressions.

## Deviations from Assessment

- Browser testing identified the social row as a concrete enlarged-text overflow source. The repair remained inside the already-listed shared shell stylesheet and its existing test file; no scope expansion or new dependency was necessary.
- The earlier first-load/lazy-layout navigation drift also appeared while changing the browser font preference and loading content. It was not attributed to the new reading-offset computation and was not repaired here; it is the separate issue already recorded under `experiences-nav-active`. Navigation after mounting uses the correct scalable offset.
- The root-size matrix and Chromium's native default-font preference were tested. Native text-only zoom controls, actual 200% full-page browser zoom, other browser engines, and OS-specific accessibility font settings were not verified. This report does not certify WCAG conformance.
- Borders, decorative blueprint grid measurements, the one-pixel rounding tolerance, responsive breakpoints, and virtualized row measurements were intentionally retained. Existing navigation assessment/fix reports and unrelated package/TypeScript configuration changes were not edited.

## Follow-ups

- Run `/speckit-bug-test slug=accessible-font-scaling` for independent verification.
- Manually verify text-only resizing and 200% full-page zoom in supported browsers, including contact form and virtualized-lab interactions, before claiming full SC 1.4.4 compliance.
- Address the stale badge expectation separately and reassess the previously reported first-load navigation drift.