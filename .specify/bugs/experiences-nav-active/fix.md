# Bug Fix: Experiences Navigation Activation Boundary

- **Slug**: experiences-nav-active
- **Fixed**: 2026-10-15
- **Assessment**: ./assessment.md
- **Status**: partial

## Summary

Added a one-CSS-pixel tolerance to the shared heading activation boundary so scroll-coordinate rounding does not switch the active item back to Interaction Lab after landing on Experiences. The 96px reading line, section ordering, About fallback, document-bottom override, and passive scrolling behavior remain intact.

The boundary defect is fixed, but a subsequent fresh-document fragment check exposed a separate unresolved startup-scroll failure. Source changes stopped at that finding rather than expanding into an unassessed navigation-lifecycle change.

## Changes

| File | Change | Notes |
|------|--------|-------|
| `src/app/home/section-navigation.ts` | modified | Adds `READING_LINE_TOLERANCE = 1` to the heading comparison. |
| `src/app/home/section-navigation.spec.ts` | added test | Covers exact, fractional, tolerance-edge, out-of-range, and custom reading-line positions. |
| `src/app/home/home.component.spec.ts` | added tests | Covers explicit selection and fragment navigation, completed intents, mounted Experiences content, and subsequent manual scrolling. |

## Tests Added or Updated

- `section-navigation.spec.ts`: `tolerates one CSS pixel of reading-line rounding without activating a distant heading` checks 96px, 96.25px, 96.5px, and 97px select Experiences; 97.01px, 100px, and 240px retain Lab. A custom 64px reading line also receives the same tolerance.
- `home.component.spec.ts`: two parameterized cases named `keeps Experiences active after fractional selection/fragment landing and releases it on manual scroll` assert that a completed navigation with the heading at 96.25px retains `experience`, renders all five roles, and preserves the fragment. Moving the heading to 400px and dispatching user-scroll events selects Lab without rewriting the fragment.
- Existing tests continue to cover About, document bottom, history decisions, modal preservation, lazy mounting, and reading-position preservation.

## Local Verification

- Command: `./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless --include=src/app/home/section-navigation.spec.ts --include=src/app/home/home.component.spec.ts` compiled successfully but could not launch the default Google Chrome binary, which is not installed at Karma's expected location.
- Command: `CHROME_BIN='/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge' ./node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless --include=src/app/home/section-navigation.spec.ts --include=src/app/home/home.component.spec.ts` passed all 18 tests, including a repeat after restoring original formatting outside the intended changes. No packages or browser binaries were installed.
- Editor diagnostics reported no errors in the three changed source/test files.
- Browser reproduction on the existing development server at `http://localhost:4200/`: ordinary 100% layout at widths 1255, 1280, 1366, 1400, and 1440 landed at 95.75px and selected Experiences correctly before the fix.
- Controlled browser reproduction: adding a temporary 0.5px top padding to the Experiences section produced a real settled heading position of 96.25px. After navigation intent completion, the original code selected `lab` for both the active class and `aria-current`, despite the `#experience` fragment. The updated code selected `experience` for both at the same measured 96.25px landing.
- Browser passive-scroll check: scrolling 100px upward from that landing moved the Experiences heading to 196.25px and correctly selected Lab for both active class and `aria-current`, retaining `#experience`.
- Fresh-document fragment check at `http://localhost:4200/?navigation-check=experiences-nav-active#experience` did not pass: after loading all five Experiences roles, the heading was at -4051.25px and both active class and `aria-current` selected Vault, with no pending navigation target. This larger startup-scroll issue is not explained by a one-pixel activation-boundary error and remains unresolved. The query parameter was used to force a new document rather than same-document fragment navigation.
- `git diff --check` passed. The final source/test diff contains 94 added lines and one removed line across the three intended files, with unrelated save-formatting churn removed.
- Checks were focused on the changed navigation paths; the full project suite was not run.

## Deviations from Assessment

- The user explicitly approved proceeding despite unresolved reproduction details. The user's original browser, zoom, and interaction sequence remain unknown; the boundary failure was confirmed using a controlled, temporary fractional layout offset rather than claiming to reproduce those exact settings. The temporary padding is not part of the source changes.
- CSS layout-zoom probes also produced larger landing offsets. Those probes are not native browser zoom and do not establish a separate root cause; the one-pixel fix does not claim to correct arbitrary larger offsets.
- The final fresh-document check shows the assessment is incomplete for startup navigation: fragment navigation in an already-created Home fixture passes, but fresh-document loading can settle far beyond the intended target. Per the workflow guardrail, no additional source changes were made after this discovery. Re-run `/speckit-bug-assess` for this startup-scroll path before changing intent completion or reading-position preservation.
- No implementation scope expansion was needed. The existing navigation-intent lifecycle was retained, and the assessment was not modified.

## Follow-ups

- Run `/speckit-bug-test slug=experiences-nav-active` for independent verification.
- Reassess the fresh-document `#experience` startup-scroll failure; distinguish native fragment scrolling, lazy layout changes, and navigation-intent completion before proposing another fix.
- Verify the original browser/zoom combination when available. If the mismatch persists with a heading more than one pixel below the reading line, reassess navigation/layout timing rather than increasing the tolerance without evidence.