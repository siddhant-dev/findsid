# Quickstart Validation: Experiences

For later implementation; no application tests executed by this planning command.

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
