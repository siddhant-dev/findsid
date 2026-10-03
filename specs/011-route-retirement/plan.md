# Implementation Plan: Route Retirement

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Remove Resume route/component/configuration and the exact legacy artwork redirect.
Let existing general wildcard handling resolve retired paths to `/`; add no dedicated
replacement redirects. Preserve section aliases, article detail, Contact, shared assets
and remote Firebase/PDF resources. Planning performs no source cleanup.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone router; TypeScript ~6.0.3.
**Primary Dependencies**: Existing Router, no additions.
**Storage**: No new storage; remove unused Resume download config during implementation.
**Testing**: Existing Jasmine/Karma, RouterTestingHarness, controlled HTTP fixtures and
native direct-entry/history checks.
**Target Platform**: Browser portfolio/Firebase SPA fallback, unchanged.
**Project Type**: Bounded route/source/documentation retirement.
**Performance Goals**: No retired lazy-component import or PDF/artwork request.
**Constraints**: No dedicated retired-path redirect; preserve active behavior; test-first;
no remote deletion, publishing or release changes.
**Scale/Scope**: App/Work route tables/tests, four Resume component files, unused
configuration/navigation/style references and related README paragraph.

## Constitution Check

*Pre-research and post-design against constitution1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Remove superseded views without harming current showcase | Pass |
| Test-first | Actual-router failing retirement assertions before deletion | Pass for plan; execution evidence required |
| Edge collaboration | Grouped retirement/fallback/cleanup/remote-scope cases approved | Pass |
| Dev.to reliability | Controlled active-route fixtures; no API redesign | Pass |
| Main-only CI | Separate safeguards mandatory before redesign PR automation | No waiver |
| Standalone | Existing router infrastructure | Pass |
| Artwork baseline | Constitution permits explicit redesign approval;011 supplies it | Pass |
| CalVer | No version/release work | Pass |

Integrate after shell002/detail009/Contact010 routes are established. No constitutional
amendment needed for artwork retirement because approved redesign exception is explicit.

## Project Structure

### Documentation

```text
specs/011-route-retirement/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/route-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source Changes

```text
src/app/app.routes.{ts,spec.ts}
src/app/work-module/work.routes.{ts,spec.ts}
src/app/resume-module/resume/resume.component.{ts,html,scss,spec.ts}  # remove later
src/app/app.component.html
src/environments/environment{,.prod}.ts
src/styles.scss                     # only orphaned Resume selectors, if any remain
README.md
```

**Structure Decision**: Remove exact obsolete files/routes/config; no replacement page,
redirect component, broad directory deletion or routing framework.

## Implementation Sequence

1. Establish runnable actual APP_ROUTES harness with controlled Home/article/Contact
   dependencies. Add retirement assertions and observe current `/resume` component and
   `/work/art` redirect behavior failing expected fallback; setup errors are not red.
2. Cover `/resume`, `/work/art`, unknown nested paths, direct entry and history. Preserve
   exact aliases and `/work/articles/:id`; assert no accidental broad Work redirect.
   Pending Contact navigation lock remains authoritative when an attempt is blocked.
3. Remove Resume route/import and four specific Resume component files only. Remove
   unused resumeURL from both environment variants without copying its remote token
   into logs/tests/docs. Remove actual remaining menu/style references after usage checks.
4. Remove exact artwork redirect. Ensure unmatched Work children reach general root
   fallback rather than error, blank Work shell or Articles wildcard. Add no named
   Resume/art fallback routes; generic unknown routing remains application-wide.
5. Update existing work.routes.spec.ts expectations: it currently groups `/work/art`
   with Articles and asserts the exact art redirect. Keep active alias/detail regressions
   aligned with prior feature routes and controlled owner-qualified detail fixtures.
6. Update README's retired-art redirect statement and portfolio destinations; avoid
   unrelated documentation/tooling rewrite. Preserve historic specs as intermediate
   behavior with explicit011 precedence instead of pretending retirement happened earlier.
7. Verify no retired dynamic import/menu/PDF/art request remains. Shared assets/Feather
   icons/metadata service remain if active consumers exist. No hosted PDF/Firebase mutation.
8. Run targeted routing/root/navigation suites and native direct/history/refresh cases.
   General Firebase rewrite remains unchanged; production-host checks wait for approved
   release, not permission to publish now.

## Complexity Tracking

No exception or added abstraction. Exact route/source cleanup and existing generic
fallback fully satisfy retirement.
