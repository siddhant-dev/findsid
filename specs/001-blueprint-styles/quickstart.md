# Quickstart Validation: Blueprint Styles Foundation

Run commands from the repository root. The implementation validation record is at
the end of this file.

## Prerequisites

Use an Angular 22-compatible Node/npm environment and a Chromium executable available
to Karma. Set CHROME_BIN to the actual installed executable if needed; this session
used a temporary Playwright Chromium install without changing project dependencies.
Reuse existing
dependencies; restore with plain `npm ci` only after missing dependencies
are observed. Feature012 supersedes the earlier peer-bypass allowance: diagnose and
resolve compatibility instead of using `--legacy-peer-deps` or `--force`.
No live article/contact calls or deployment.

Complete separately scoped CI safeguards before redesign PR automation; enforce the
publication hold before merging into auto-deploying main.

## Baseline and Red

```sh
npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/app.component.spec.ts
```

Expected: runnable baseline. Browser/config/dependency/standalone TestBed errors are
setup blockers, not missing-behavior red evidence. Capture current non-theme
routes/flows and layout at 320px/1024px and 200% zoom before changing production code.

Write the planned style/root acceptance tests, then:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/styles.spec.ts \
  --include=src/app/app.component.spec.ts
```

Expected before production edits: behavioral assertions fail for absent new root
properties, old typography, present theme control/resources and color-scheme calls.
Record assertion names/actual values; unrelated baseline assertions stay green.
Do not treat a browser launch/setup failure as behavioral red evidence.

## Green and Preserved Flows

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/styles.spec.ts \
  --include=src/app/app.component.spec.ts \
  --include=src/app/about/about.component.spec.ts \
  '--include=src/app/work-module/**/*.spec.ts' \
  '--include=src/app/contact-module/**/*.spec.ts' \
  '--include=src/app/resume-module/**/*.spec.ts'
npm test -- --watch=false --browsers=ChromeHeadless
```

Expected: green contract/affected/full suites and no undefined SCSS symbols.
Do not hide unrelated baseline failures or declare completion with required failures.

Run the loader contract under an actual reduced-motion preference:

```sh
npm test -- --watch=false --browsers=ChromeHeadlessReducedMotion \
  --include=src/app/work-module/loader/loader.component.spec.ts \
  --include=src/styles.spec.ts
```

## Acceptance Matrix

| Scenario | Expected evidence |
|----------|-------------------|
| Root properties | Exact contract values; compare normalized browser color values |
| Typography | Seven role families/sizes; specified weights; body/form line-height 1.6 |
| Device preferences | Identical fixed palette; no color-scheme matchMedia calls |
| Initial render | Eager palette CSS; no dynamic light/dark request or alternate flash |
| Focus | Actual keyboard focus: 2px cyan outline, 2px offset |
| Disabled hover | Muted, no glow/hover/activation |
| Feedback | Approved error/success with explanatory content |
| Reduced motion | Native CSS emulation: animation off, non-smooth scroll, static status |
| Fonts blocked | Readable fallback stacks, not hidden content |
| Narrow/long content | No new overflow relative to baseline; code scrolls locally |
| Network states | Controlled success/loading/empty/failure presentation fixtures |
| Current flows | Unchanged non-theme routes/tabs/article/resume/contact behaviors |
| Blueprint grid | Both 100px/20px cyan grid scales, exact alpha/alignment and radial vignette; one canvas behind content |

Use [style-contract.md](contracts/style-contract.md) for exact values and
[data-model.md](data-model.md) for ownership. JS matchMedia mocks alone cannot prove
CSS reduced-motion behavior; family declarations alone cannot prove blocked-font rendering.

## Completeness Scan and Browser Preview

```sh
rg -n 'ThemeService|onThemeChange|prefers-color-scheme|light\.css|dark\.css|themes/(light|dark)' src angular.json
rg -n -- '--(primary|secondary|tertiary|quaternary)-color|--background-color|--text-color|--black-(800|100)' src
rg -n 'Montserrat|Roboto|extra-bold|header-[2456]|sub-2|overline|btn-text|form-text' src --glob '*.{scss,html,ts}'
```

Expected: no obsolete production matches. Also inspect all retired SCSS symbols/helpers
and class usages against the contract; these abbreviated scans are not complete acceptance.
Static manifest theme_color is not a switching mechanism.

```sh
npm start -- --host 127.0.0.1
```

Verify server responds, then inspect existing routes with actual keyboard/hover states,
native media emulation, blocked fonts, narrow screens and zoom. Stop only the specific
preview process you started. Automate testable accepted cases with existing browser
facilities; manual preview supplements, not replaces, required assertions.

Optional application type check: `npx tsc --noEmit -p tsconfig.app.json`.
Full build/style-budget validation belongs to constitution-compliant main-only automation;
no Firebase publication until the complete redesign is approved.

## Execution Evidence (2026-10-03)

**Grid amendment completed**: The owner requested the missing reference grid after the
foundation run below and confirmed all four grid edge cases. It now belongs to feature
001 (FR-012/SC-007), with T022-T025 complete; feature002 reuses this single canvas.

- Before adding production canvas markup/styles, the new real-browser tests reported
  **3 failed, 10 passed**: missing major/minor gradients/vignette, missing fixed
  viewport bounds, and missing root canvas. These were behavioral failures, not setup errors.
- The shared eager stylesheet now provides the exact reference gradients/vignette.
  Root markup adds one aria-hidden decoration. Root stacking isolation and negative
  canvas z-index keep it behind content without changing layout geometry. Inset-zero
  bounds avoid the scrollbar overflow of a 100vw canvas.
- Final full suite: **40 Angular tests and 6 CI policy tests passed**. Native
  reduced-motion run covering style/root/loader fixtures: **15 passed**. Both
  TypeScript checks and `git diff --check` passed.
- A responsive local preview was verified through Chromium at **320px and 1024px**
  with **100% and 200% CSS zoom**. The canvas added zero horizontal overflow compared
  with hiding it. Fixed bounds exclude scrollbar space; scrolling leaves its top at
  zero. Real hit testing/focus and a controlled dialog fixture verified content above
  the canvas. External requests were blocked, covering unavailable web fonts without
  live article/contact calls. A screenshot confirmed the visible major/minor grid.
- CSS zoom is an automated stress check, not a manual browser-zoom baseline comparison.
  Original T016/T019 verification gaps and the earlier test-first chronology gaps
  remain unchanged; the new grid work does not retroactively complete them.
- Local preview/debugging processes were stopped after verification. No production
  build, version change, commit, release or deployment was performed.

### Original Foundation Evidence

- Initial ChromeHeadless execution compiled the Angular tests and passed all six CI
  policy tests, but could not launch because Chrome was absent. A temporary Playwright
  Chromium was installed for local validation; no package manifest or lockfile changed.
- An isolated detached worktree at clean pre-feature `HEAD` was then given the acceptance
  specs and run in ChromeHeadless: **8 failed, 2 passed**, with failures for missing root
  tokens, typography/focus states, the rendered theme control, and color-scheme access.
  This retrospective red run confirms the missing behavior but occurred after production
  edits had started, so it does not satisfy the required pre-implementation ordering.
- Existing standalone component specs had stale `declarations` setup and live service
  requests. Their TestBed setup now imports standalone components and uses controlled
  service fixtures.
- Final validation passed: full ChromeHeadless suite **37/37**, reduced-motion suite
  **8/8**, CI policy tests **6/6**, and both application/spec TypeScript checks. The
  reduced-motion launcher verifies native CSS behavior, including the static, accessible
  loader status.
- The 320px/1024px fixture verifies long-text wrapping and local code overflow without
  adding an overflow-hiding workaround. A manual 200% zoom and route-layout baseline
  comparison were not captured.
- The retrospective red run is recorded, but the original pre-migration baseline and
  red-green ordering are incomplete. A manual 200% zoom/route-layout comparison and
  actual pointer-hover verification were not captured. T003, T005, T007, T016, and T019
  remain incomplete.
- No production build, version change, commit, release, or deployment was performed.
