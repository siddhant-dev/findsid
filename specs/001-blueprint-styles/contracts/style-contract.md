# UI Contract: Blueprint Styles Foundation

Authority: `ideas/gemini.index.html` and user decisions in `spec.md`.

## Fixed Root Properties

| Property | Exact value |
|----------|-------------|
| `--bg-color` | `#0b192c` |
| `--bg-secondary` | `#1e293b` |
| `--border-color` | `rgba(56, 189, 248, 0.25)` |
| `--border-active` | `#38bdf8` |
| `--text-main` | `#f8fafc` |
| `--text-muted` | `#94a3b8` |
| `--accent` | `#38bdf8` |
| `--accent-glow` | `rgba(56, 189, 248, 0.15)` |
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-mono` | `'Fira Code', monospace` |

SCSS names match semantic properties, e.g. `$bg-color`, `$text-main`. No old-name aliases.
Main heading uses reference `#fff`; text on cyan fill uses background color, not light text.
Manifest background/theme_color both use the fixed background.

## Reference Primitives

| Primitive | Values |
|-----------|--------|
| Surface | rgba(30,41,59,0.4), 1px muted border, 4px corners, 4px blur |
| Hover | Active border; 0 0 20px accent glow; 0.2s ease |
| Tag | Mono 0.75rem; accent/glow; 2px 8px padding; 2px radius; 1px rgba(56,189,248,0.2) border |
| Button | Transparent; active 1px border; accent text; 6px 12px padding; mono 0.75rem; 0.2s transition |
| Button hover | Accent fill; background-color text |
| Section label | Mono 0.85rem; accent; uppercase; 0.1em tracking |

Current component geometry stays unchanged. Reference card spacing/corner marks and
canvas/split-layout rules belong to later component features. Do not copy a universal
margin reset into preserved layouts.

## Approved Extensions

| State/surface | Value |
|---------------|-------|
| Input/dialog | #1e293b; reference muted 1px border; 4px radius |
| Placeholder | Muted text |
| Focus | 2px solid #38bdf8; 2px outline offset |
| Error | #ef4444 plus explanatory text/icon |
| Success | #38bdf8 plus explicit text/icon |
| Disabled | Muted text/border; no hover/glow |
| Backdrop | rgba(11,25,44,0.8); no additional alpha-multiplying opacity |
| Loading | Cyan; accessible static status under reduced motion |

New extension names may be semantic (`--error-color`, `--modal-backdrop`). No generated
shade ramps. If verification requires another value, ask the user rather than guessing.

## Typography

| Role | New role class suggestion | Family | Size | Weight |
|------|---------------------------|--------|------|--------|
| Main heading | page-title | Inter | 2.75rem | 700 |
| Secondary heading | section-heading | Fira Code | 1.25rem | 500 |
| Card/dialog title | content-title | Inter | 1.1rem | 600 |
| Body/form | body-text | Inter | 0.95rem | Reference normal |
| Description | description-text | Inter | 0.9rem | Reference normal |
| Nav/section label | navigation-text / section-title | Fira Code | 0.85rem | Reference normal |
| Metadata/tag/button | metadata-text / primitive class | Fira Code | 0.75rem | Reference normal |

Body/form line-height 1.6. Other unspecified weights inherit reference normal values.
Keep semantic strong/emphasis markup; remove 800-weight utility usage.
Replace old `.header-*`, `.regular`, `.text`, `.sub*`, `.overline`, `.bold`, `.extra-bold`,
`.btn-text`, `.form-text`, `.blue`, `.blue-bg` declarations and usages, including dynamic
active classes. Do not mistake unrelated structural class names for old utilities.

## Direct Consumer Replacement

| Old usage | New role |
|-----------|----------|
| Primary links/active | Accent / active border |
| Body/secondary copy | Main / muted text |
| Page/form-dialog backgrounds | Background / secondary surface |
| Black/shade borders | Muted / active border by state |
| Yellow/green panels/tag backgrounds | Secondary surface / accent glow |
| Error ramps | Approved error with readable message |
| Offset shadows/click translation | Border/glow interaction |
| White/blue button helpers | New blueprint button helper |
| Multicolor loader rings | Cyan; reduced-motion status |
| Temporary resume background/text/presentation/separator | Background/main/accent |
| Article code | Secondary surface, mono, local horizontal overflow |
| Syntax names/keywords/strings | Accent |
| Syntax comments/plain/punctuation/errors | Muted / main / main / error |

This mapping is documentation, not a compatibility layer. Existing branded image/SVG
fills are content, not palette tokens; do not recolor assets here.

## Accessibility and Removal

- No OS color-scheme handling; reduced-motion media query is accessibility-only.
- Remove interactive outline-suppression overrides; retain main programmatic-focus exception.
- Disable decorative animation/transitions and smooth scrolling under reduced motion.
- Wrap long text/URLs; wide code scrolls locally. Do not hide page overflow to mask defects.
- No ThemeService/provider, boolean/handler, toggle CSS, theme files/bundle entries,
  dynamic palette links, retired custom properties/variables/helpers/utilities or aliases.
- Build/test use identical global stylesheet. Existing routes/layouts/flows stay unchanged.

## Evidence

Tests assert actual root/computed values, seven typography roles, focus, disabled,
feedback/loading states and no preference calls/theme links. Include controlled article
state fixtures. Source scans supplement behavioral checks, never replace them.
Native CSS media/hover/focus checks need actual browser state, not only JS mocks.
