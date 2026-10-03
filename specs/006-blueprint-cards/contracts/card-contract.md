# UI and Navigation Contract: Shared Blueprint Cards

Authority: [spec](../spec.md), confirmed user choices, `ideas/gemini.index.html`,
and [foundation](../../001-blueprint-styles/contracts/style-contract.md).

## Content Order

1. Optional publication date as the only metadata above the title.
2. Supplied title as a subordinate semantic heading.
3. Optional complete description.
4. All available tags as wrapping chips in a semantic list.
5. Muted "Archived" text only when no valid destination exists.

No images/placeholders, source labels, Open button, fixed height, truncation or read-more.
No rewriting reference samples into real content. Omit missing optional areas, including
date, without placeholders. Preserve detail-page image/metadata behavior.

## Reference Geometry and Typography

| Treatment | Approved value |
|-----------|----------------|
| Surface | rgba(30,41,59,0.4); muted 1px border; 4px radius; 4px blur |
| Padding/separation | Reference 24px padding and 24px inter-card separation, applied once |
| Corners | Reference plus marks: 12px mono; top/bottom -8px; left/right -5px |
| Date | Fira Code 0.75rem muted; reference 8px following space |
| Title | Inter 1.1rem/600 main text; reference 12px following space |
| Description | Inter 0.9rem/1.6 muted; reference 16px following space |
| Tags | Foundation chip primitive; reference 8px wrapping gap |
| Archived | Existing metadata role, muted; reuse reference spacing, no new sizing scale |
| Interactive hover | Active border; 0 0 20px accent glow; reference 0.2s ease |
| Focus | Foundation 2px cyan outline with 2px offset |

No transform animation, invented scale or fixed card width. Size to available content
column and grow with text. Preserve inter-item spacing without double margins.
Corner marks are decorative, not accessible name/text; prevent their offsets causing
page-wide overflow without clipping content or focus.

## Interaction and Accessibility

- Card-wide single native anchor for valid destinations; no nested interactive content.
- Use the title for the link accessible name without reading the entire description/tags
  as the link name. Supporting text remains available in the accessibility tree.
- Internal article links retain `/work/articles/:id` and native same-tab navigation.
- External HTTP(S) links use `_blank` and `noopener noreferrer`. Communicate new-tab
  behavior accessibly without adding another action or replacing the title.
- Preserve Enter, Ctrl/Cmd/middle-click, context-menu open and normal browser link behavior;
  no preventDefault/window.open workaround. Space remains native link/browser behavior.
- Static Archived cards have no href, link role, tabindex, click handler or interactive
  hover/glow. Foundation colors are not changed merely for being archived.
- Disable transitions under reduced motion. Test visible focus and pointer states natively.
- Full titles/text/tags wrap at 320px and 200% zoom with blocked-font fallbacks.
- Home owns section headings, anchors and metadata. Do not introduce duplicate section IDs.

## App-Wide External-Link Migration

Retained social links and rendered article-body external links obey the same new-tab rule.
Annotate article content after initial render and replacements using scoped lifecycle
processing; preserve sanitization and native event handling. Tests use controlled HTML.
Same-origin resume links, SVG asset references, local downloads and mailto actions retain
their purposes. No asset/font request becomes a navigation link. Routes slated for later
retirement are not removed here.

## Required Fixtures

Article and archive with long complete text; several tags; each missing optional field;
valid internal/external destination; absent/blank/invalid destination; invalid article ID;
valid but offline external URL; dynamic article content with mixed internal/external links.
Archived fixtures verify the label, absence of interaction and retained content.
Exercise owner-filtered controlled article success/loading/empty/failure states without
changing their listing UX or fabricating successful responses.
