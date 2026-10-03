# Implementation Plan: Blueprint Styles Foundation

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

**Feature identifier**: `001-blueprint-styles`

**Input**: `specs/001-blueprint-styles/spec.md`

## Summary

**Global loading amendment (2026-10-03)**: Foundation CSS remains eager; deferred
components reuse it without delaying first useful shell/About content or flashing
another palette. Apply the [shared loading contract](../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

Implement only the redesign's first feature: replace the current SCSS variables,
helpers, typography utilities and all consumers directly with the reference's fixed
visual language; remove theme switching entirely. No transitional aliases, component
layout redesign, route changes, content replacement or publication.

Keep `src/vars.scss` as an import-only semantic SCSS module. Emit the single fixed root
palette and shared styles from `src/styles.scss`. Each later component redesign gets
its own specification, plan, tasks and test-first cycle.

## Technical Context

**Language/Version**: TypeScript ~6.0.3, SCSS, HTML.

**Primary Dependencies**: Angular ^22.1.3 standalone components, Angular CLI/build
^22.1.5, CDK ^22.1.3, RxJS ^7.8.2, existing Feather integration.

**Storage**: None added; no theme preference persistence.

**Testing**: Existing Jasmine/Karma through `@angular/build:karma`; real browser
computed-style fixtures, affected component tests, controlled HTTP/service responses.
Browser availability and runner compatibility must be established during test setup.

**Target Platform**: Existing Angular browser application; Firebase Hosting unchanged.

**Project Type**: Single frontend application.

**Performance Goals**: Zero runtime palette stylesheet requests; no repeated root
token emission in component styles. Preserve existing initial CSS/application and
component-style budgets (1MB/2MB initial warning/error; 3KB/4KB component warning/error).

**Constraints**: Approved/reference values only; no legacy aliases; failing behavioral
tests before implementation; no new flows or component geometry changes. No deployment.
GitHub Actions full builds/deployment main-only; PR checks test-only.

**Scale/Scope**: Global styles, all current SCSS and typography consumers, theme
root/bootstrap wiring, font entry point, static manifest palette metadata and tests.

## Constitution Check

*Checked before research and re-evaluated after design against constitution 1.0.1.*

| Gate | Design response | Result |
|------|-----------------|--------|
| Portfolio purpose | Preserve content and current non-theme behavior | Pass |
| Test-first | Establish runnable baseline; record missing-behavior failures before production edits | Pass for design; execution evidence required |
| Collaborative edge cases | User confirmed scope, values, typography and edge cases | Pass |
| Dev.to reliability | Keep owner source; controlled success/loading/empty/error fixtures and preservation tests | Pass; new live retry/empty UX deferred |
| Main-only CI | No workflow change in this feature; separately scoped alignment required before PR execution | Execution prerequisite, not waived |
| Angular 22 standalone | Keep existing architecture and runner | Pass |
| Artwork baseline | Keep redirect in this feature; approved later redesign explicitly removes it | Pass |
| CalVer | No release here; 26.0.0 metadata alignment belongs to final release | Pass for non-release scope |

**Post-design result**: No unresolved first-feature design decisions. Existing Firebase
PR preview builds/deployments and absence of test gates conflict with the constitution.
Dependency-review PR automation also requires alignment with the strict test-only rule.
Complete separately scoped CI safeguards before opening/merging redesign PRs. Enforce
the user publication hold before any merge to auto-deploying main. These repository
gates are not claimed satisfied by this plan.

## Project Structure

### Documentation (this feature)

```text
specs/001-blueprint-styles/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/style-contract.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Source Code (repository root)

```text
angular.json                         # build/test shared global CSS; remove theme bundles
src/
├── vars.scss                        # replace semantic variables/helpers
├── styles.scss                      # root tokens and shared roles/states
├── styles.spec.ts                   # proposed browser contract tests
├── index.html                       # Inter/Fira Code loading/fallbacks
├── main.ts                          # remove ThemeService provider/import
├── assets/site.webmanifest          # static palette metadata
├── themes/{light,dark}.scss          # delete
└── app/
    ├── app.component.{ts,html,scss,spec.ts}
    ├── services/theme.service.{ts,spec.ts} # delete
    ├── about/*
    ├── contact-module/contact/*
    ├── resume-module/resume/*
    └── work-module/
        ├── loader/*
        └── work/{work,apps,articles,card,article-page}*
```

**Structure Decision**: Reuse existing styles and test infrastructure. No styling
framework, theme abstraction, token service or replacement component suite.

## First-Feature Implementation Sequence

### A. Baseline and Red Evidence

1. Establish a runnable targeted Karma baseline. Fix affected standalone TestBed
   imports/providers only as necessary. Missing browsers/configuration failures do
   not count as red-green evidence.
2. Capture existing routes, navigation, skip-content, contact, article and resume flows,
   plus layout/overflow baseline. Use controlled network responses.
3. Add `src/styles.spec.ts` with mounted typography/state fixtures and actual global
   CSS. Extend root tests for absent toggle/palette links and no color-scheme detection.
4. Observe failures for new root values/typography, existing theme control and preference
   calls before editing production code. Retain passing non-theme baseline assertions.
5. Include successful/loading/empty/failure article presentation fixtures and controlled
   error/malformed/rate-limit preservation cases. Do not claim missing live UX is implemented.

### B. Replace the Foundation

1. Replace `vars.scss` declarations/helpers with semantic reference names and approved
   extensions; remove shade ramps, color aliases and hard offset-shadow helpers.
2. Declare root custom properties once in `styles.scss`; only that stylesheet is a global
   build/test entry. Component imports must not repeatedly emit root tokens.
3. Replace typography utilities directly at all usages, including dynamic active classes,
   using [style-contract.md](contracts/style-contract.md). Do not copy the reference's
   universal margin reset because it changes preserved layout geometry.
4. Remove theme markup/CSS, boolean/handler, color-scheme detection, service injection,
   bootstrap provider/import, theme-only root FormsModule import, service/spec, files
   and bundle entries. Keep unrelated navigation/forms logic.
5. Replace Montserrat/Roboto loading with Inter/Fira Code and reference fallback stacks.
   Align manifest colors to the fixed background; preserve unrelated metadata/assets.

### C. Direct Consumer Sweep

1. Update all component SCSS consumers and typography classes; no old aliases remain.
   Map palette-dependent surfaces, borders, shadows, tags, controls, disabled/error
   states and article code styles to the new contract.
2. Preserve flex/grid structure, dimensions, breakpoints, route definitions and event
   handlers. Shared colors, typography, borders and effects intentionally change.
3. Replace interactive focus-suppression overrides with the approved ring; retain
   the programmatically focused main-container exception.
4. Migrate temporary resume style references, including the CSS-variable/`#fff` SCSS
   conditional, without deleting its component/route or recoloring branded artwork.
5. Make loaders cyan and add minimal accessible status text. Disable decorative CSS
   animation and smooth scrolling under reduced motion. Do not rewrite loader/typewriter flows.
6. Do not add sticky shell/background canvas, section navigation, new cards, photo removal,
   new contact dialog behavior or section content here.

### D. Validation and Handoff

Follow [quickstart.md](quickstart.md): exact computed values, light/dark preference
invariance, focus, disabled/feedback states, reduced motion, blocked fonts, long-text
containment, affected flows and stale-reference scans. Full suite follows targeted
coverage because the foundation touches every style consumer. No publication.

## Later Small-Feature Roadmap

The table below preserves the original roadmap, not outstanding design questions.
All thirteen features now have separately approved specs, plans and task lists.
Their current artifacts and task dependency graphs supersede this historical table.

| Feature | Primary component/work | Prerequisite | Later clarification |
|---------|------------------------|--------------|----------------------|
| CI safeguards | Test-only PRs, main-only test/build/deploy, publication hold | Independent; required before PR/release automation | Publication-hold enforcement |
| 001: Blueprint styles | Foundation and consumer migration | None | Confirmed |
| Sticky shell | Root identity/sidebar, blueprint canvas, anchors, wrapping mobile links below 1024px | 001 | Planned in ../002-sticky-shell/plan.md; retain existing detail route |
| About me | Existing About copy, remove photo | Shell | No replacement copy/photo |
| Interaction Lab | New interactive lab component | Shell | Demo selection, actual behavior and measurable outputs |
| Experiences | New experience component | Shell | Verified content, dates and order |
| Blueprint card | Shared card component | 001 | Fields, imagery/fallback and interactive semantics |
| Articles | Dev.to section in page stream | Shell/card | Listing limits/order; empty/failure/retry and malformed/rate-limit cases |
| Retro Vault | Apps component becomes archive section | Shell/card | Data, ordering, labels and link behavior |
| Contact dialog | Contact component, /contact entry, bottom-only trigger above social icons | Shell/001 | Reopen after completion; route/history dismissal |
| Article detail | Separate article-page redesign | 001 and Articles/card interface | New ideas/design, URL/back navigation, response states |
| Route retirement | Remove old Work section pages, Resume and /work/art | Replacement components ready | Legacy section/detail URL behavior |
| Integration/release | End-to-end polish, accessibility, CalVer | All features and CI gates | Explicit publication approval |

Presentation order remains About me -> Interaction Lab -> Experiences -> Articles ->
Retro Vault. Implementation order may put shared cards earlier to avoid duplicate work.
Future Contact uses the confirmed sending/success/error/retry/close behavior recorded
in `spec.md`; this feature does not implement it.

## Complexity Tracking

No constitutional exceptions or extra abstractions requested. A complete SCSS sweep is
necessary because the user rejected aliases, not because component redesigns are bundled.
