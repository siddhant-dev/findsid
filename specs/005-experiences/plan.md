# Implementation Plan: Experiences Section

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

**Global loading amendment (2026-10-03)**: Home dynamically imports Experiences;
typed local role data stays inside that deferred dependency graph. Do not eagerly
import the component/data into Home. All five roles render after activation; no
separate data API. Preserve scroll/heading and assert role chunks are absent before
activation. Follow the [shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

Add one standalone Experiences component containing five static blueprint role cards,
using typed local approved data. Preserve all 18 supplied achievement paragraphs and
approved tags. Replace shell's empty Experiences container content, not its heading/
anchor. No generic article-card redesign, links/logos/expansion, route or release change.

## Technical Context

**Language/Version**: Existing Angular ^22.1.3 standalone, TypeScript ~6.0.3, HTML/SCSS.
**Primary Dependencies**: Existing framework/shared styles only; no dependency additions.
**Storage**: Local readonly typed experience data; no network or database.
**Testing**: Existing Jasmine/Karma; component content/semantics/computed-style tests
and Home integration coverage.
**Target Platform**: Existing browser portfolio.
**Project Type**: Static frontend section.
**Performance Goals**: Five naturally sized cards, no runtime fetch/timer/image requests;
retain component-style budgets by reusing shared primitives.
**Constraints**: Exact copy, 18 bullets, approved tags, static content, responsive wrapping,
reduced motion, single heading, test-first, no publication.
**Scale/Scope**: One new component, local data/model, tests and Home insertion.

## Constitution Check

*Pre-research and post-design against constitution 1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Approved full professional history without invented claims | Pass |
| Test-first | Runnable scaffold then observed missing-content failures before implementation | Pass for plan; execution evidence required |
| Edge-case collaboration | All copy/reflow/semantics cases confirmed | Pass |
| Dev.to | No changes; mock unrelated Home requests | Pass |
| Main-only CI | No automation/deployment changes; separate safeguards remain prerequisite | Not waived |
| Angular standalone | New standalone component; no framework upgrade | Pass |
| Artwork/CalVer | No route retirement or release changes | Pass |

No unresolved first-feature design value or constitutional exception. Styles001 and
shell002 must be completed first; currently artifacts do not prove implementation.
Existing CI noncompliance/publication hold are unchanged.

## Project Structure

### Documentation

```text
specs/005-experiences/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/content-contract.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/experiences/
├── experiences.component.{ts,html,scss,spec.ts}
├── experience.model.ts
└── experiences.data.ts
src/app/home/home.component.{ts,html,spec.ts}
```

**Structure Decision**: A single Experiences component iterates readonly local records.
No fetch service, generic card hierarchy or projection API; share SCSS blueprint
primitives, not the existing interactive article/archive card.

## Implementation Sequence

1. Complete styles/shell; establish runnable standalone TestBed baseline. Existing
   card/About specs are minimal declaration-based scaffolds, not adequate acceptance
   evidence. New component belongs in imports; unrelated tests need no redesign.
2. Add a minimal runnable component scaffold without accepted content, then write tests
   against independent expected text/metadata/tags in the approved contract. Observe
   missing cards/order/bullets failures before populating production data/template.
   Missing imports/providers are not valid red evidence.
3. Cover exactly five records, bullet counts [6,3,4,3,2], dates/locations and tag order.
   Do not simply import production data as the expected oracle; that hides copy omissions.
   Include semantic lists/no static controls or Tab stops and Home single-heading/
   fragment/no metadata writes/lazy reading-position assertions before data/template/
   loader edits; later styling tests cannot be the first tests of those coupled behaviors.
4. Add typed immutable data: stable role IDs, exact strings, ordered achievements/tags.
   Keep three separate Infosys records, no inferred chronology merge or auto-date change.
5. Render semantic articles with subordinate title headings, dates/company/location,
   achievement ul/li and wrapped tag lists. No links, buttons, tabindex or hidden details.
   Preserve multi-sentence LTI paragraph as one bullet and both Systems Engineer bullets.
6. Apply existing reference surface/tag/title/metadata primitives, natural heights,
   24px padding/separation, corner marks and hover border/glow. Reuse reference spacings;
   no new unapproved palette/sizes. Avoid accessible announcement of corner symbols.
   Disable transitions under reduced motion.
7. Insert into Home's permanent `experience` section without another section heading
   or metadata writer. Keep section history/active navigation behavior.
8. Verify exact normalized text, all tags, semantics, lack of click/Tab affordances,
   native reflow/zoom/fonts and reduced-motion behavior. Run targeted component/Home
   suites; expand only if integration indicates broader regression.

## Complexity Tracking

No added abstraction or exception. Static typed content and one component fully address
scope; no runtime validation fallback or backend is needed.
