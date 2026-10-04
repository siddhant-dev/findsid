# UI Contract: Static About Me Section

Consumes [style foundation](../../001-blueprint-styles/contracts/style-contract.md) and
[shell contract](../../002-sticky-shell/contracts/shell-contract.md).

## Owner-Maintained Content (Amended 2026-10-04)

The owner maintains the paragraph in `src/app/about/about.component.html` and may
update it over time. The replacement professional introduction is approved.
Automated tests MUST NOT freeze its wording, punctuation, character/word count,
text length or rendered text dimensions. About tests also do not fix numerical
font-size or line-height values. Structural, accessibility, overflow and lifecycle
checks remain required. This supersedes the original exact-copy fixture requirement;
historical implementation evidence is retained, not rewritten.

## Structure

- Home retains section `id="about"` and one heading `id="about-heading"` with About me label.
- Embedded `app-about` renders one paragraph, no heading, greeting, image or controls.
- Noninteractive paragraph has no tabindex. Section/skip-navigation focus behavior remains
  shell-owned; do not remove accessibility mechanisms elsewhere.
- No decorative background/card wrapper in this component.

## Presentation

Inter/fallback sans-serif stack, 0.95rem, line-height 1.6, `--text-muted`,
left-aligned, full available content-column width. Reuse foundation values.
No justification, 70% width, photo-derived geometry or blink animation.

## Side Effects and Preservation

No About-owned setInterval/setTimeout/typing callback, photo request, metadata operation
or animation on creation, rendering or destruction. Shared asset/service files remain.
No changes to fragment navigation, other sections or release/version behavior.

## Evidence

Component tests assert one paragraph, no removed decoration/Tab stops,
zero timer/meta operations and readable noninteractive presentation. Home test asserts a single section
heading and unchanged `/#about` navigation. Browser checks cover 320px, 200% zoom and
fonts unavailable. No live service dependency required.
