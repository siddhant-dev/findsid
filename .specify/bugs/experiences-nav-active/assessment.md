# Bug Assessment: Experiences Leaves Interaction Lab Navigation Active

- **Slug**: experiences-nav-active
- **Created**: 2026-10-15
- **Source**: pasted text and attached screenshot
- **Verdict**: likely valid, needs reproduction
- **Severity**: low

## Report (verbatim or summarized)

> when I'm on expreince section the side menu shows Interaction nav link as active

The attached screenshot shows the Experiences heading and role cards while the sidebar highlights "02. Interaction Lab" rather than "03. Experiences". No report URL was supplied or fetched.

## Symptom

Experiences is visible at the top of the content column, but Interaction Lab remains the active sidebar item. After navigating to Experiences and allowing scrolling to settle, Experiences should be the active item, including its `aria-current="location"` state.

## Reproduction

1. Open the portfolio home page, which contains the Interaction Lab and Experiences sections and the sidebar navigation.
2. Select "03. Experiences" and allow scrolling and lazy section rendering to settle. This is a code-supported candidate reproduction path, not a confirmed description of the user's interaction.
3. Compare the visible Experiences heading with the highlighted sidebar item and its `aria-current` attribute.

[NEEDS CLARIFICATION: Did the screenshot follow a sidebar click, direct fragment navigation, browser history navigation, or manual scrolling? What browser, zoom level, and viewport dimensions were used?]

Browser reproduction has not been performed. The screenshot establishes the reported mismatch, but not its triggering sequence or exact CSS-pixel geometry.

## Suspected Code Paths

- `src/app/home/section-navigation.ts:activeSectionFromPositions()` selects the last ordered heading whose top is less than or equal to the exact 96px reading line; a heading even slightly below it leaves the preceding section active.
- `src/app/home/home.component.ts:handleNavigationIntent()` scrolls the requested heading toward exactly 96px from the viewport top, using a potentially fractional document coordinate.
- `src/app/home/home.component.ts:finishIntent()` clears the explicit-navigation guard and immediately recomputes the active section from measured heading positions.
- `src/app/home/home.component.ts:updateActiveSection()` passes fractional `getBoundingClientRect().top` values to the strict reading-line comparison.
- `src/app/home/section-navigation.ts:setPassiveActiveSection()` publishes that recomputed section after the navigation guard has cleared.
- `src/app/app.component.html:23` binds both `aria-current` and the active class to the published section, so the mismatch affects accessible state as well as styling.
- `src/app/home/section-navigation.spec.ts` covers the exact 96px boundary, but not subpixel positions immediately beyond it. `src/app/home/home.component.spec.ts` checks fragment preservation and Experiences mounting without asserting the final active section.

## Root Cause Hypothesis

**Confidence: medium.** Navigation targets the same exact boundary that passive tracking uses as a strict cutoff. Browser scroll-coordinate quantization can leave the Experiences heading at, for example, 96.25px rather than 96px. Once `finishIntent()` releases the requested section, `activeSectionFromPositions()` then selects the preceding Lab heading and overwrites the correct explicit-navigation state. The screenshot is consistent with this mechanism, but actual browser geometry has not been measured. A cheap discriminating check is to execute the existing selection function with ordered heading positions and compare Experiences at 96px, 96.25px, and 97px; the first should select Experiences and the latter two should currently select Lab. If the actual Experiences heading is well below 96px, passive tracking may instead be following its documented reading-line rule, and the trigger/layout needs investigation before changing that rule.

**Read-only check performed**: Extracted the existing `activeSectionFromPositions()` function using the TypeScript parser, transpiled it, and executed it without modifying source. With About at -900px and Lab at -400px, Experiences at 96px selected `experience`; Experiences at 96.25px and 97px selected `lab`. All three assertions passed. This confirms the selector's boundary sensitivity, not that fractional positioning caused the screenshot. The assessment's required headings were also validated.

## Proposed Remediation

**Preferred**: First reproduce the navigation sequence and capture the settled Experiences heading position and active section immediately before and after intent completion. If this confirms a subpixel boundary miss, introduce a small, explicit CSS-pixel tolerance in the shared heading-selection rule, keeping the intended 96px reading line. Use the tolerance consistently for section selection rather than special-casing Experiences or permanently locking the active item to the URL fragment.

Preserve ordered section selection, the About fallback, the document-bottom override, and passive updates during genuine user scrolling. Do not enlarge the activation region to most of the viewport without evidence that the intended reading-line behavior should change.

**Files likely to change**:

- `src/app/home/section-navigation.ts`
- `src/app/home/section-navigation.spec.ts`
- `src/app/home/home.component.spec.ts`
- `src/app/home/home.component.ts` only if browser reproduction identifies an additional intent-completion or layout-timing defect.

**Tests to add or update**:

- Verify Experiences wins at the exact reading line and just beyond it within the chosen subpixel tolerance.
- Verify Lab remains selected when Experiences is meaningfully below the tolerated reading line; retain About and document-bottom cases.
- Navigate to Experiences, complete the navigation intent with fractional heading geometry, and assert that the fragment and active section remain `experience` after passive recomputation.
- Cover direct fragment navigation and subsequent manual scrolling back to Lab, ensuring the tolerance does not create a persistent navigation lock.
- In a real browser, verify the sidebar active class and `aria-current` after scrolling settles, including fractional geometry caused by zoom or display scaling and delayed lazy-section layout changes.

## Risks & Considerations

- Impact is incorrect navigation feedback and accessible current-location state; content remains available, with no evidence of data loss or security impact. Regression history is unknown.
- The selection helper is shared by all home sections. A tolerance changes their activation boundary slightly, so it should be small and covered by boundary tests.
- Manual scrolling intentionally does not synchronize the URL fragment, so a fragment alone is not evidence of the currently active section.
- Lazy loading and reading-position preservation can also move headings; measure their timing if a small boundary tolerance does not explain the browser result.
- No source files are changed by this assessment. No API changes, migrations, or new runtime dependencies are proposed.

## Open Questions

- [NEEDS CLARIFICATION: Which navigation action immediately preceded the screenshot?]
- [NEEDS CLARIFICATION: What are the browser, zoom level, viewport dimensions, and settled Experiences heading `getBoundingClientRect().top` value?]
- [NEEDS CLARIFICATION: Does the wrong highlight persist after scrolling farther into Experiences, or only at the initial landing position?]