# Data Model: Static About Me Section

No business entity, API, storage or state machine added.

## About Content

Fields: owner-maintained paragraph text and presentation role.
Authority: owner's current static template; see [about-contract.md](contracts/about-contract.md).
Validation: structural/accessibility/lifecycle checks, not exact wording or text size/length;
no typing state or fetched text.

## Shell Relationship

Home owns `about` section, `about-heading`, numbered navigation and page metadata.
About contributes exactly one paragraph. It must not duplicate the heading or mutate
metadata on mount/unmount.

## Removed State

Photo presentation, typing strings/index/direction, ViewChild reference, interval,
cursor animation and About metadata lifecycle are removed without replacement.
No transitions or content loading state remain.
