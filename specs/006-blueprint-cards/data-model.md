# Data Model: Shared Blueprint Cards

Proposed types/contracts, not implemented source.

## Card View

| Field | Type/meaning | Rule |
|-------|--------------|------|
| identity | Stable source identity | Preserve for tracking; not a generated content claim |
| kind | Article or archive | Experiences never use this model |
| title | Required nonblank text | Preserve supplied title; no fabricated fallback |
| description | Optional text | Omit null/absent/blank; otherwise show complete source text |
| publishedDate | Optional display text | Omit null/absent/blank; preserve available source label |
| tags | Readonly string list | All available nonblank tags in source order; wrap, no first-tag limit |
| destination | Internal URL, external URL, or none | Derived from source and validated before presentation |

No cover image or article-body HTML belongs in the card view. Keep detail source
data separate, including its image and metadata fields.

## Source Mapping

- Article identity and positive safe-integer ID produce `/work/articles/:id`.
  Missing/invalid ID produces no destination, not a malformed article route.
  Use existing supplied readable publication date and complete description.
  Dev.to `tag_list` maps to all tag labels, not its first entry.
- Archive record preserves existing title/description/date/URL. Migrate its `tag`
  field to a tag array in bundled data without inventing additional labels or changing
  project wording/order/dates. Existing `external` boolean is not authoritative:
  derive externality from the actual URL.
- Adapters distinguish optional omissions from malformed required records. Do not
  coerce arbitrary objects into display strings or convert a malformed whole response
  into successful empty data. Preserve explicit service failures; full listing validation
  and retry policy belongs to subsequent section features.

## Destination Rules

- Resolve against the actual document/application base with the browser URL API.
- Permit navigable HTTP(S) web destinations only for cards. Absent/blank/unparseable
  values, unsafe schemes and URLs with embedded credentials yield no destination.
- Compare normalized URL origin with the running app origin, not a hardcoded production
  domain. Same-origin paths/fragments are internal; cross-origin HTTP(S) is external.
- Retain source URL semantics; do not probe remote availability or label a valid URL
  Archived simply because the network is offline.
- All card types with no destination show "Archived"; the label describes the approved
  presentation state, not verified historical retirement.

## Presentation States

| State | Element/action | Focus and styling |
|-------|----------------|-------------------|
| Internal | One native anchor with internal route | One Tab stop; focus and hover glow |
| External | One native anchor, `_blank`, `noopener noreferrer` | One Tab stop; focus and hover glow |
| Archived | Static card and muted "Archived" text | No Tab stop, href, interactive glow or click handler |

Optional date/description/tags are independently omitted without placeholders or empty
spacing wrappers. Cards have no sending/loading state; section fetch states remain owned
by their containers. Input updates must replace link/static markup consistently.
