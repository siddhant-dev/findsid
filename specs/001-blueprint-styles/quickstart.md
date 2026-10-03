# Quickstart Validation: Blueprint Styles Foundation

For later implementation; no application tests are claimed run by the plan command.
Run commands from repository root.

## Prerequisites

Use an Angular 22-compatible Node/npm environment and a Chromium executable available
to Karma. Set CHROME_BIN to the actual installed executable if needed. Reuse existing
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
setup blockers, not missing-behavior red evidence.
Capture current non-theme routes/flows and layout at 320px/1024px and 200% zoom.

Write the planned style/root acceptance tests, then:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/styles.spec.ts \
  --include=src/app/app.component.spec.ts
```

Expected before production edits: behavioral assertions fail for absent new root
properties, old typography, present theme control/resources and color-scheme calls.
Record assertion names/actual values; unrelated baseline assertions stay green.

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
