# Quickstart Validation: Experiences

For later implementation; no application tests executed by this planning command.

## Implementation evidence (2026-10-04)

Prerequisites verified: existing standalone Angular 22 runner, blueprint tokens and
shell loading/navigation coordinators, test-only CI policy, appropriate Node/cache/
environment ignores and private package (no publishing ignore needed). No new packages.
Checklist: 10/10 checked; no extension hooks registered.

A content-free standalone scaffold and independent exact contract transcription were
tested before data/template/loader changes. Initial test setup compilation/observer
constructor errors were corrected and do not count as red evidence. The runnable
combined suite then reported **6 behavioral failures and 1 existing Lab test passing**:
missing five cards/18 bullets/metadata/tags/semantics, viewport registration/deferred
mount, explicit/direct fragment activation, and cards after reading-position correction.

Content/activation implementation passed all **7 combined tests** before styling.
Two new actual computed-style/reflow tests then failed (7 existing tests still passed):
missing padding/border/radius/surface/blur/separation/line-height/tag wrapping/corner
positioning and tag containment. The SCSS was added only after those failures.
Reference corner marks intentionally extend beyond card edges; containment assertions
apply to meaningful text/lists/tags, with full-page overflow checked in the browser.

The final affected suite passed **22 Jasmine tests** (Experiences, Home, activation/
navigation coordinators and application routes) and **12 Node checks**. Independent
expectations cover every string/date/location/tag, role IDs/order, 18 bullet counts,
static semantics, actual computed styles and 320px content containment. Home cases
cover deferred activation, one heading, explicit/direct fragments, no metadata writes,
reading-position correction and reuse of the mounted component.

Native Chrome checks used a task-owned local preview, mocked Dev.to and blocked Google
fonts. Actual loaded JavaScript contained no role content before activation; explicit
navigation fetched the deferred role chunk. All five cards matched the original Markdown
content contract after activation. Native viewport-near activation also passed.
No Lab asset, role-data API or company image request was introduced.

| Browser case | CSS viewport/page width | Outcome |
|---|---|---|
| Desktop explicit activation, fonts blocked | 1280 / 1280 | 5 roles, 18 bullets, full copy |
| Narrow direct fragment, reduced motion, fonts blocked | 320 / 320 | Wrapped full text/tags, no clipping |
| Native viewport-near activation | 1024 / 1024 | Deferred cards mounted |
| Genuine Chrome 200% zoom | 640 / 640 | Full text, no clipping/overflow |
| Genuine Chrome 200% zoom, narrow window | 320 / 320 | Full text, no clipping/overflow |

Browser zoom was set through a temporary local extension and verified with
`chrome.tabs.getZoom() === 2`, not simulated by enlarging fonts. Static cards added
no Tab stops; native Tab navigation exited the section heading without entering cards.
Hover reached the approved active border/20px glow with no pointer cursor; emulated
reduced motion produced computed transition duration `0s`. Card heights grew naturally
(first card approximately 676px desktop and 1541px narrow).
Compressed component CSS is **922 bytes**, below the existing 3KB warning/4KB error
budgets; no full production build was run. No packages, generic interactive card,
release metadata, routes or publication settings changed. No post-hooks registered.

## Prerequisites

Implemented styles001/shell002, existing Angular22-compatible environment and Karma
browser. Restore dependencies only after missing-package failure; no new package needed.
No deployment; separate CI safeguards and publication hold remain.

## Failing-First and Green

Create runnable standalone scaffold/tests before accepted production implementation:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/app/experiences/experiences.component.spec.ts \
  --include=src/app/home/home.component.spec.ts
```

Observe actual missing-content/count/order/semantics failures, not module setup errors.
Use independent expected content; then implement and rerun same combined suite.

| Case | Expected |
|------|----------|
| Roles | Five in approved order; three separate Infosys cards |
| Bullets | 18 total, counts6/3/4/3/2; all exact paragraphs |
| Metadata/tags | Exact approved dates, locations, titles, company names and tags |
| Interaction | No links/buttons/logos/Tab stops/read-more |
| Semantics | One shell Experiences heading; subordinate job headings and ul/li |
| Layout | Natural heights, wrapped text/tags, no clamping |
| 320px and 200% zoom | Entire text readable, no horizontal page scrolling |
| Fonts blocked | Readable fallback |
| Hover/reduced motion | Reference border/glow; transitions disabled under reduced motion |
| /#experience | Existing direct/click/history/active behavior preserved |

For actual browser geometry/keyboard/media checks:

```sh
npm start -- --host 127.0.0.1
```

Verify server responds, then inspect the approved reference styling and contract content.
Automated testable cases are required; manual preview supplements them.
Stop only the preview process started for this work. Expand to broader suites if affected
results require it. No publication/full build needed for documentation-only artifacts.
