# Implementation Plan: Static About Me Section

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

**Input**: `specs/003-about-section/spec.md`

**Owner amendment (2026-10-04)**: Preserve the current owner-authored paragraph and
permit future copy edits without exact wording/text-size/length assertions. Earlier
unchanged-copy and exact-copy test instructions are historical and superseded by
the amended about-contract.md. Retain structural/accessibility/overflow/lifecycle
checks; do not freeze numerical font-size/line-height in About-specific tests.

## Summary

**Global loading amendment (2026-10-03)**: Keep About eager with shell/styles; no
viewport defer or skeleton for the single paragraph. Assert immediate paragraph
availability without loading later feature chunks. Follow the
[shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

After features 001 and 002, reduce the existing standalone About component to its
unchanged personal paragraph. Remove the photo, greeting, typewriter state/timer,
cursor animation, presentation-only Tab stops and component-owned metadata.
Home retains the single numbered About heading/anchor and homepage metadata.

Use existing shared typography/tokens: Inter 0.95rem, line-height 1.6, muted color,
left-aligned full column width, no card. No route change, new abstraction or dependency.

## Technical Context

**Language/Version**: TypeScript ~6.0.3, Angular ^22.1.3 standalone, HTML/SCSS.
**Primary Dependencies**: Existing Angular compiler/test runner; no new runtime dependency.
**Storage**: None; static existing copy.
**Testing**: Existing Jasmine/Karma; component DOM/computed-style/lifecycle assertions
and a Home integration test.
**Target Platform**: Existing browser portfolio.
**Project Type**: Single frontend component feature.
**Performance Goals**: Zero About-owned timers, animation work or photo requests;
retain existing style budgets.
**Constraints**: Exact copy preservation; shell-owned heading/metadata; failing tests
before code; no publication or unrelated component/service cleanup.
**Scale/Scope**: About TS/template/SCSS/spec and narrowly necessary Home integration
assertions. Shared photo asset and MetaTagService remain intact.

## Constitution Check

*Pre-research and post-design review against constitution 1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Preserve owner's copy; remove redundant identity animation | Pass |
| Test-first | Correct standalone test setup, then failing behavioral assertions before implementation | Pass for plan; execution evidence required |
| Collaborative edge cases | All About cases requested and confirmed | Pass |
| Dev.to | No retrieval/presentation changes; no live requests in Home tests | Pass |
| Main-only automation | No CI/build/deployment change; existing separate CI safeguards still required | Execution prerequisite, not waived |
| Angular 22 standalone | Retain standalone About with simpler dependencies | Pass |
| Artwork/release | No route or release changes | Pass |

No new exception or unresolved feature decision. Foundation/shell are planned, not
implemented: both are prerequisites. No claim existing CI conflicts have been repaired.
Publication hold and final CalVer alignment remain unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/003-about-section/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/about-contract.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Source Code (repository root)

```text
src/app/about/
├── about.component.ts
├── about.component.html
├── about.component.scss
└── about.component.spec.ts
src/app/home/home.component.spec.ts  # shell composition assertions after feature 002
```

**Structure Decision**: Preserve component identity/selector/import interface, simplify
its implementation. No new content model service, route or reusable abstraction.

## Implementation Sequence

1. Complete foundation and shell, establish the affected test baseline. Current About
   is standalone while its test uses `declarations`; use `imports` and required temporary
   providers to reach actual behavioral assertions. Setup failures are not red evidence.
2. Capture the approved baseline text in a test fixture as recorded in the contract.
   Compare normalized whitespace only; preserve words, capitalization and punctuation.
3. Add failing tests for paragraph-only component, one integrated heading, no photo/
   greeting/typing elements, no Tab stops, exact computed styles, no timer creation and
   no metadata operations on creation/destruction.
4. Install timer spies before lifecycle execution; run the test without letting the old
   infinite interval escape the fixture. Use a local controlled spy/clock and restore it
   after each test; account only for About-owned timer work, not unrelated shell/browser
   timers. Explicitly asserting no timer creation is stronger than merely observing no error.
5. Observe intended failures against the prior component before production edits.
6. Replace template with the existing paragraph using shared body role and muted text.
   No component heading: Home owns `about-heading` in section `about`. Remove dependent
   ViewChild/timer/typing/metadata TS in the same runnable increment after step5 red;
   do not execute old DOM-dependent callbacks against the paragraph-only template.
7. Remove ViewChild/ElementRef, typing fields/methods, interval, lifecycle hooks and
   metadata injection/methods/imports once unused. Keep standalone component and existing
   change-detection pattern. Do not edit the shared metadata service.
8. Replace old container centering/70%-width/justification, hero-image and cursor/
   keyframe/breakpoint styles with only required full-width text styling. Reuse shared
   tokens; add no new numerical value. Remove `tabindex` from paragraph.
9. Keep the photo asset itself unless separate asset cleanup is explicitly scoped;
   removing this component's markup/CSS must eliminate its photo request.
10. Run About and Home coverage together, inspect real narrow/zoom/blocked-font rendering,
    then expand testing only if integration results require it. Preserve `/#about` behavior.

## Complexity Tracking

No additional complexity or constitutional exception. Integration tests cover shell
ownership without moving metadata/heading responsibilities back into the child.
