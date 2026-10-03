# Implementation Plan: Shared Blueprint Cards

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

**Global loading amendment (2026-10-03)**: Cards follow their deferred consumers;
Home does not import card code eagerly. Keep the tiny external-link policy independent
of article-detail/card chunks so eager social links do not pull those features in.
Verify shared chunk factoring does not defeat initial-load isolation. Follow the
[shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

Redesign the existing shared Article/Retro Vault card as a naturally sized, image-free
blueprint card: optional date above title, full optional description, all supplied tags.
Use one native card-wide link for valid destinations; otherwise static "Archived"
content. Preserve article-detail routing. Apply the approved external-new-tab rule to
all user-facing external web links, including rendered article content, without
redesigning unrelated pages. No implementation, installation or publication in planning.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone; TypeScript ~6.0.3; HTML/SCSS.
**Primary Dependencies**: Existing Router/RouterLink, browser URL/anchor APIs and styles.
No package additions.
**Storage**: Existing Dev.to owner `siddev` and bundled `src/assets/data.json`.
**Testing**: Existing Jasmine/Karma with standalone TestBed, RouterTestingHarness and
controlled HTTP fixtures; real browser checks for native link, motion and reflow behavior.
**Target Platform**: Browser portfolio.
**Project Type**: Shared presentation component plus bounded external-link migration.
**Performance Goals**: Zero card image requests; no per-card timers, observers or
manual window-opening handlers; naturally sized content within the shell column.
**Constraints**: Approved values only; full content; one link focus stop; static archived
cards; failing behavioral tests first; preserve article-detail images/metadata;
no listing-state redesign, route retirement or version change.
**Scale/Scope**: Existing card, typed card-facing adapters, shared link policy and
retained external-link consumers; five existing archive records plus fetched articles.

## Constitution Check

*Pre-research and post-design against constitution 1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Clear complete writing/project previews; no fabricated archive copy | Pass |
| Test-first | Runnable baseline then observed card/link behavioral failures before implementation | Pass for plan; execution evidence required |
| Edge-case collaboration | Missing data, Archived behavior and proposed keyboard/reflow/motion cases approved | Pass |
| Dev.to reliability | Preserve owner/retrieval; controlled success/loading/empty/failure regression fixtures | Pass |
| Main-only CI | Existing PR preview/build and missing gates remain separately scoped prerequisites | Not waived |
| Angular standalone | Existing component remains standalone; native links with RouterLink | Pass |
| Artwork/CalVer | No retirement or release/badge changes | Pass |

Styles001 and shell002 must precede implementation. CI safeguards are mandatory before
redesign PR automation. No publication until the completed redesign is approved.
No constitutional exception or unresolved card decision.

## Project Structure

### Documentation

```text
specs/006-blueprint-cards/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/card-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/work-module/work/card/card.component.{ts,html,scss,spec.ts}
src/app/work-module/models/card.model.ts
src/app/work-module/models/dev.model.ts
src/app/work-module/services/articles.service.{ts,spec.ts}
src/app/work-module/work/{articles,apps}/
src/app/shared/links/link-policy.{ts,spec.ts}
src/app/shared/links/external-links.directive.{ts,spec.ts}
src/app/work-module/work/article-page/article-page.component.{ts,html,spec.ts}
src/app/app.component.{html,spec.ts}
src/app/resume-module/resume/resume.component.{html,spec.ts}
src/assets/data.json
```

**Structure Decision**: Reuse the shared card, not Experience rendering. Keep a small
pure URL classifier for card destinations and external-link annotation. The standalone
directive handles dynamically rendered article anchors; static consumers can declare
targets directly. No global document observer, click interception or component hierarchy.
Proposed file names are implementation locations, not already existing source.

## Implementation Sequence

1. Complete foundation/shell and obtain a runnable standalone test baseline. Existing
   card spec incorrectly declares a standalone component and has no input fixture.
   Correct setup before behavioral assertions; setup/browser/dependency failures are
   not red evidence.
2. Write tests for image removal, full description, optional date/description/tags,
   all tags, card-wide link semantics, static Archived state and approved styling.
   Observe failures against current behavior before implementing these changes.
3. Separately write failing URL-policy, external-anchor and article-body tests.
   Use controlled HTTP/article HTML, never live Dev.to. Assert invalid destinations
   cannot become hrefs and internal detail routing remains unchanged.
4. Introduce a typed card-facing view model and explicit source adapters. Stop selecting
   `tag_list[0]`; preserve all tags in source order. Normalize the bundled single tag
   to the same array representation. Remove image fields only from card presentation,
   retaining detail-page image/metadata data. Do not silently swallow malformed responses.
5. Replace the Open button/manual Router/window.open path with one block-level native
   anchor and RouterLink for internal article URLs. Give it the title as its accessible
   name, preserve Ctrl/Cmd/middle-click/context-menu actions, and put no nested links/
   buttons or extra tabindex inside it. Render static markup for absent/invalid destinations.
6. Apply reference surface, corner marks, padding, spacing and approved typography.
   Use natural height/available width, wrapped text/tags, no clamp or fixed card dimensions.
   Gate hover/glow to clickable cards, retain foundation focus, disable transitions under
   reduced motion. Change parent containment only where necessary for this card.
7. Apply `_blank` and `noopener noreferrer` to retained social/external anchors and
   external anchors in rendered article HTML after content updates. Preserve existing
   article-body sanitization behavior; do not introduce a new trust bypass for link
   annotation. Keep internal fragments/downloads/mailto native and in their proper contexts.
   Resume same-origin web URLs are internal, not external; preserve its download behavior.
   Scope DOM processing to the directive host and rendered-content lifecycle; dispose
   lifecycle work on destruction. No polling or document-wide observer.
8. Run targeted card/adapters/link-policy/article-body suites and embedding regressions,
   including controlled success/loading/empty/failure responses. Check real browser focus,
   native activation, reduced motion, narrow/zoom/blocked fonts and natural height.
   Source checks supplement, never replace, behavioral evidence.

## Complexity Tracking

No exception or new dependency. A small shared URL classifier and scoped article-content
directive avoid duplicated external-link rules while retaining native browser behavior.
