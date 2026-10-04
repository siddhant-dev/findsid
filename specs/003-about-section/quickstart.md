# Quickstart Validation: Static About Me Section

For later implementation; the planning command does not execute application tests.

## Owner Content Amendment (2026-10-04)

The owner approved the replacement paragraph and requested tests that do not freeze
wording or text size/length as content evolves. The prior exact-copy expectations
below are historical and superseded by the updated about-contract.md.
Removed the independent old-copy fixture, both About copy-equality checks, the
route-level copy-equality check and About-specific numerical font-size/line-height
assertions. Kept one-paragraph/single-heading structure, no decorative/interactive
elements, width/overflow, muted presentation, no timers and no metadata side effects.
No production About content was changed by this amendment.

The three observed copy-mismatch failures are resolved: the full suite passes
191 Jasmine tests and12 Node checks (`release-content-green.log`).

## Prerequisites

Complete features 001 and 002. Reuse existing Angular 22-compatible Node/npm and
Jasmine/Karma browser runner. Restore dependencies only after missing-package failure.
No deployment; existing CI/publication gates still apply.

## Failing-First Coverage

From repository root, fix standalone fixture setup if needed, then write intended
behavior assertions before modifying production code:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/app/about/about.component.spec.ts \
  --include=src/app/app.routes.spec.ts
```

Record failures for photo/greeting/typewriter still present, Tab stops, incorrect text
presentation, timer creation and metadata mutation. Configuration errors do not count.
Spies/clocks must be installed before lifecycle and restored after tests.

Observed against the unchanged About component on 2026-10-04: the focused suite compiled
and reported the expected behavioral failures for the photo/greeting, paragraph Tab stop,
muted/left-aligned styles, typing interval creation/teardown and metadata writes/removals.
The normalized paragraph copy and base font measurements already passed. The suite also
emitted the expected request for the existing About background image. Angular's change
detection scheduler also calls `setTimeout`, so that framework operation was excluded from
the About-owned timer assertions. A cached ChromeHeadless binary was used because the
system Chrome application is not installed.

## Green

After implementation, rerun the same combined selection. Expected: unchanged normalized
copy, one paragraph, one shell-owned heading, no removed elements/side effects,
exact approved computed styles and preserved fragment navigation.

Observed on 2026-10-04: the About and application-route selection passed all 11 Jasmine
tests in ChromeHeadless. Coverage confirmed the exact normalized copy, one eager About
paragraph under the single shell heading, approved computed presentation, no image or
animation styling, no About-owned interval or metadata operations, zero About Tab stops,
reflow at 320px with 200% root text size, declared sans-serif fallback, and direct
`/#about` navigation. The paragraph remains static under reduced-motion preferences
because it has no animation rule. Font fallback was verified from the declared stack;
no manual browser session with fonts forcibly blocked was performed.

| Case | Expected |
|------|----------|
| About mount/unmount | Zero timer creation and metadata operations |
| Rendered section | One heading/one unchanged paragraph |
| Time advances | No typing/cursor/late callback |
| Keyboard | No paragraph Tab stop |
| 320px and 200% zoom | Full readable copy, no horizontal page scrolling |
| Web fonts blocked | Readable sans-serif fallback |
| Network panel | No About photo request |
| /#about direct/click/history | Existing shell behavior preserved |

Native font/zoom/network checks supplement automated assertions, not replace testable
coverage. Use the current shared styles rather than adding test-only inline styling.

For browser preview:

```sh
npm start -- --host 127.0.0.1
```

Verify responsiveness before inspection, then stop only the preview process you started.
Expand to full suite if affected results indicate broader integration changes.
No full build/deploy required for these documentation artifacts.
