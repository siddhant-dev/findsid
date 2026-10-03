# UI Contract: Static About Me Section

Consumes [style foundation](../../001-blueprint-styles/contracts/style-contract.md) and
[shell contract](../../002-sticky-shell/contracts/shell-contract.md).

## Exact Copy

Whitespace-normalized text must equal:

> I am a millennial born in Kolkata, Enjoy working as UI Developer and moved to UX design to strengthen my knowledge and bridge the gap between user interfaces and user need. Beyond work you’ll find me smashing and killing enemies in RPG games, dribbling in football games, travelling, watching movies/shows, designing or sleeping. For me learning never stops and I work on small personal projects to improve my skill.

The typographic apostrophe above is preserved from the existing content. Do not copy-edit
grammar, capitalize differently or add the reference's unverified claims.

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

Component tests assert exact normalized copy, one paragraph, no removed content/Tab stops,
zero timer/meta operations and exact computed styles. Home test asserts a single section
heading and unchanged `/#about` navigation. Browser checks cover 320px, 200% zoom and
fonts unavailable. No live service dependency required.
