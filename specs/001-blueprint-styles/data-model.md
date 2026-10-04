# Data Model: Blueprint Styles Foundation

No new business entity, endpoint, database or preference persistence.

## Visual Token

Fields: semantic name, kind (color/font/length/effect), exact value, authority
(reference or approved extension), consumers.

Relationships: typography roles and shared states consume tokens; root declaration is
unique; SCSS consumers use semantic references rather than legacy aliases.

Validation: exact values in [style-contract.md](contracts/style-contract.md);
no undefined or retired properties. Additional design values require user confirmation.

## Typography Role

Fields: purpose, family, size, specified weight, line-height, consumer usages.

Seven roles: main heading, secondary heading, title, body/form, description,
navigation/section label, metadata/tag/button.

Validation: browser-computed role values match the contract. Purpose rather than tag
number controls mapping: current h6 identity/card headings need explicit roles.

## Shared State

| State | Presentation | Behavior |
|-------|--------------|----------|
| Default | Fixed palette and role | Existing behavior |
| Hover/focus | Reference hover; approved outline | Existing behavior |
| Disabled | Muted, no glow/hover | Existing disabled binding |
| Loading | Cyan; static reduced-motion status | Existing request state |
| Error | Approved error plus text | Never implies success |
| Success | Cyan plus explicit text/icon | Requires successful response |
| Empty | Muted readable fixture | Live Articles UX later |

Visual-state changes do not introduce business transitions.

## Decorative Canvas

One shared background with the reference major/minor grid and edge vignette; owned
by feature001 and reused by shell002. It has no business state, preference or persistence.
It is hidden from assistive technology, fixed behind content, noninteractive and static.
Values and validation are defined in the style contract and grid acceptance tests.

## Removed Theme Entity

Delete theme boolean, handler, preference detection, service/provider, toggle, palette
links/files and bundles. No replacement preference state/storage/observer.

Future Contact form -> sending -> success/failure -> retry/close is recorded in the
specification but belongs to its own feature, not this data model's implementation.
