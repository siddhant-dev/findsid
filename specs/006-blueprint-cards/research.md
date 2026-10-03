# Research: Shared Blueprint Cards

Repository inspection and user decisions on 2026-10-03; no packages installed or
runtime compatibility claims made.

## Card Structure

**Decision**: Text-only natural-height card, optional date, title, optional full
description and all supplied tags; no extra metadata label.
**Rationale**: Approved user choices and reference `.blueprint-card`, `.card-meta`,
`.card-title`, `.card-desc`, `.tag-list` structure.
**Alternatives considered**: Current banner image/fixed width/three-line clamp/Open
footer; reference source/archive eyebrow. Rejected by user choices.
**Evidence**: `ideas/gemini.index.html` card CSS and Articles/Vault examples;
`src/app/work-module/work/card/card.component.{html,scss}`.

## Native Navigation

**Decision**: One native block anchor per navigable card; RouterLink for existing
`/work/articles/:id`. Static markup with "Archived" when destination is invalid/missing.
**Rationale**: Card-wide activation and native keyboard/modifier/browser actions
cannot be faithfully represented by the existing JavaScript pseudo-button.
**Alternatives considered**: Root click handler, `window.open`, separate Open button,
nested actions. Rejected: extra focus stops or lost native link behavior.
**Evidence**: Existing `card.component.ts` imperatively navigates/opens windows;
approved keyboard and archived cases in the spec.

## Source and Model Separation

**Decision**: Adapt source data to one readonly card-facing model with optional
description/date, tag array and explicit normalized destination.
**Rationale**: Existing Card/Articles require images/date and store one `tag`;
ArticlesService currently discards all but `tag_list[0]`. Detail data still needs
`cover_image`, `body_html` and metadata, so image-free cards must not erase those fields.
**Alternatives considered**: Reuse unchanged source interfaces (cannot represent approved
optionality/all tags), remove images from every article shape (breaks retained detail).
**Evidence**: `models/{card,dev}.model.ts`, `services/articles.service.ts`,
`article-page.component.{ts,html}`, `src/assets/data.json`.

## External-Link Policy

**Decision**: Classify navigable HTTP(S) URLs using browser URL resolution and actual
application origin; cross-origin anchors use `_blank` plus `noopener noreferrer`.
Apply to static social links and dynamic article body links, not only cards.
**Rationale**: User explicitly made this app-wide. An `external` data boolean alone
cannot reliably determine destination origin. Native anchors avoid popup-blocker and
modifier-key problems.
**Alternatives considered**: Card-only fix (incomplete), global click interceptor
(breaks browser actions), document-wide MutationObserver (unnecessary broad lifecycle).
**Evidence**: `app.component.html` social anchors; article-page `[innerHtml]` content;
resume same-origin/SVG/mailto/download links. No `public/` directory in the inspected tree.
**Boundary**: Mailto/tel are protocol actions, not external web pages. Same-origin
paths/fragments stay internal. Asset loads/font links/SVG references are not navigation
anchors. Future section/detail features inherit the policy.

## Tests and Governance

**Decision**: Use existing Jasmine/Karma with corrected standalone baseline and
controlled inputs/responses; observe meaningful failing assertions before implementation.
**Rationale**: Constitution mandates test-first, explicit edge approval and dependable
Dev.to tests. Existing card test has declaration-based setup and no input.
**Alternatives considered**: New runner, live-network tests, setup errors as red evidence.
Rejected; no dependency expansion needed for this planned component.
**Evidence**: `package.json`, `angular.json`, `karma.conf.js`, card spec and constitution.
Native CSS/media/modifier actions still require actual browser evidence, not mocked events.

## Resolved Decisions and Limits

All necessary card design choices and proposed edge cases are approved. No new numerical
styling values are introduced. Runtime/test execution is deliberately deferred: this
research records inspection, not evidence that implementation or runner is working.
Missing required titles/malformed feed responses remain section data-validation work,
not permission for a fabricated title or silent successful fallback here.
