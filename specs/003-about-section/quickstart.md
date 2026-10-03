# Quickstart Validation: Static About Me Section

For later implementation; the planning command does not execute application tests.

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
  --include=src/app/home/home.component.spec.ts
```

Record failures for photo/greeting/typewriter still present, Tab stops, incorrect text
presentation, timer creation and metadata mutation. Configuration errors do not count.
Spies/clocks must be installed before lifecycle and restored after tests.

## Green

After implementation, rerun the same combined selection. Expected: unchanged normalized
copy, one paragraph, one shell-owned heading, no removed elements/side effects,
exact approved computed styles and preserved fragment navigation.

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
