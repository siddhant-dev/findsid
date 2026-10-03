# Implementation Plan: Retro Vault Section

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Retain five existing projects in their current order, using feature006 cards and
Articles' approved rem-based grid. Dynamically import Vault and its bundled JSON only
on Home activation (within20rem below viewport or explicit/direct navigation).
Render all accepted cards, with no View more. Distinguish section-code, collection-data
and genuinely empty states. This planning command changes no application source.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone, TypeScript ~6.0.3, HTML/SCSS.
**Primary Dependencies**: Existing framework/browser APIs and candidate boneyard-js
1.10.0 Angular adapter, with inherited mandatory integration smoke check.
**Storage**: Existing owner-approved bundled JSON; no external project API.
**Testing**: Existing Jasmine/Karma, standalone TestBed, controlled module-loader/data
fixtures and real browser grid/media/focus/network checks.
**Target Platform**: Browser portfolio.
**Project Type**: Deferred local-content section.
**Performance Goals**: No Vault data/code in initial eager graph; no separate JSON
HTTP request or live URL probe; five cards maximum for current approved content.
**Constraints**: Exact copy/dates/URLs/order, full descriptions, no images; fixed palette;
17.5rem tracks/1.5rem gaps/max3 columns; failing tests first; no publication/version change.
**Scale/Scope**: Existing Apps component/service/data integration and Home loader coverage.

## Constitution Check

*Pre-research and post-design against constitution1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Retains exact five approved projects without extra historical claims | Pass |
| Test-first | Runnable baseline then observed data/layout/lazy behavior failures | Pass for plan; execution evidence required |
| Edge collaboration | Source/order/grid/states/rejection/lifecycle/loading strategy approved | Pass |
| Dev.to | No retrieval changes; mock Home article responses in integration tests | Pass |
| Main-only CI | Separate safeguards remain before redesign PR automation | No waiver |
| Standalone | Reuse standalone Apps and tested skeleton Angular adapter | Smoke prerequisite |
| Artwork/CalVer | No retirement, version or release edits | Pass |

Styles001, amended shell002 and cards006 precede implementation. Reuse Articles'
grid rules and boneyard integration evidence when available; Articles need not be
implemented solely to copy grid dimensions. No force-peer workaround or substitution.

## Project Structure

### Documentation

```text
specs/008-retro-vault/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/content-contract.md
├── contracts/ui-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/work-module/work/apps/apps.component.{ts,html,scss,spec.ts}
src/app/work-module/services/app.service.{ts,spec.ts}
src/assets/data.json
src/app/home/home.component.{ts,html,spec.ts}
src/app/home/section-navigation.{ts,spec.ts}
```

**Structure Decision**: Reuse existing standalone Apps component beneath Vault heading;
renaming folders/selectors is unnecessary. Replace separately fetched local data with
a JSON module import reachable only through the lazy feature graph. Adapt/validate
unknown data in existing service/helper; no new generic archive framework.

## Implementation Sequence

1. Establish runnable standalone tests with valid input/providers. Record independent
   expected content from the contract, not production data imported as the test oracle.
2. Write and observe failures for exact five records/order/copy, local deferred import,
   no initial Vault request, no separate JSON fetch, grid sizing and distinct states.
   Cover partial invalid content, duplicate IDs, malformed envelope, all-invalid and empty.
3. Complete amended shell loader with controlled import resolution/rejection tests;
   eager About/shell must not import Vault/Card/skeleton data eagerly. Reuse boneyard
   smoke evidence or establish it before dependent implementation.
4. Import JSON inside the lazy dependency graph and validate each record, preserving
   exact data and source order. Skip invalid essential shapes/titles with explicit
   diagnostics; optional fields/invalid destinations follow006. First accepted valid
   duplicate wins. Malformed envelope or nonempty all-rejected collection yields data
   error, not empty. Avoid `any`, source mutation and invented defaults.
5. Render all accepted semantic cards; keep Home heading/anchor/metadata ownership.
   Apply available-width rem grid with at most three columns and no double gap/margin.
   Share existing styling if suitable, without an abstraction solely for identical values.
6. Home loading status covers module fetch; when skeleton adapter is available show
   five decorative shells. Fixed colors/static reduced motion; no artificial delay.
   Section module error retains shell heading with section-only Retry; data validation
   error uses Projects couldn't be loaded. Distinguish explicit Retry revalidation from
   failed-module retry. No forced reload/cache-busting hacks; imported malformed data
   remains erroneous until actually corrected.
7. Guard repeated actions/late module completion; dispose activation/observer work on
   route exit. Direct/#vault navigation activates immediately and uses Home scroll
   arbitration, not an independent handler. Preserve reading position on delayed mount.
8. Run affected component/service/Home suites; real-browser narrow/zoom/fonts/rem/media/
   keyboard and request/chunk checks. Main-only full-build policy still governs chunk
   inspection. Planning does not prove actual bundle size or first-content timing.

## Complexity Tracking

No exception/new framework. Reuse shell's activation owner and existing card/data
surfaces; five local projects do not need paging, a cache or reachability service.
