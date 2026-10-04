# Implementation Plan: Blueprint Article Detail

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Keep `/work/articles/:id` but render a route-lazy dedicated reading page without the
identity sidebar. Preserve owner content through sanitized HTML, optional metadata,
responsive body images and local wide-content scrolling. Add explicit states,
current-page metadata and an in-memory Articles return snapshot. Reuse fixed styles,
external-link annotation, skeleton smoke evidence and bottom actions.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone; TypeScript ~6.0.3; HTML/SCSS.
**Primary Dependencies**: Existing Router/HttpClient/RxJS, Angular sanitization and
Meta/Title; boneyard-js candidate1.10.0 with inherited integration smoke check.
Owner-approved failed-code Retry additionally uses deferred `es-module-lexer` to
parse and recover the application-owned ESM graph without duplicating eager modules.
**Storage**: Public Dev.to article endpoint; one browser-memory listing snapshot.
**Testing**: Existing Jasmine/Karma, RouterTestingHarness, HttpTestingController,
controlled body/image/loader fixtures and native reading/media/focus checks.
**Target Platform**: Browser portfolio.
**Project Type**: Lazy routed reading page.
**Performance Goals**: No eager detail chunk/body request; one latest-ID request;
no initial cover image or fetch of related/comment data; no artificial skeleton delay.
**Constraints**: Owner-only content, full safe body, approved rem geometry, native links,
explicit errors, stale-response protection, test-first, no publication/version change.
**Scale/Scope**: Existing article page/model/service, root layout mode and bottom actions,
route-load failure surface, metadata ownership and Articles return snapshot.

## Constitution Check

*Pre-research and post-design against constitution1.0.1.*

| Gate | Planned compliance | Result |
|------|--------------------|--------|
| Portfolio | Complete owner writing in dedicated reading view | Pass |
| Test-first | Runnable setup then meaningful route/body/state/restoration failures first | Pass for plan; execution evidence required |
| Edge collaboration | Two grouped approvals cover layout, state, safety, images and return lifetime | Pass |
| Dev.to reliability | Controlled success/loading/error/404/owner/malformed/rate-limit fixtures | Pass |
| Main-only CI | Separate safeguards mandatory before redesign PR automation | No waiver |
| Standalone | Existing standalone routing and framework sanitizer | Pass; skeleton smoke prerequisite |
| Artwork/CalVer | No retirement, version or release changes | Pass |

Dependencies: foundation001, amended shell002, external link policy006 and listing007.
Reuse established skeleton compatibility evidence; no force-peer workaround/substitution.
Planning is not runtime/test evidence.

## Project Structure

### Documentation

```text
specs/009-article-detail/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/reading-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/work-module/work/article-page/article-page.component.{ts,html,scss,spec.ts}
src/app/work-module/services/articles.service.{ts,spec.ts}
src/app/work-module/models/dev.model.ts
src/app/work-module/work/articles/article-list-session.{ts,spec.ts}
src/app/work-module/work/articles/article-list-snapshot.service.{ts,spec.ts}
src/app/shared/links/external-links.directive.{ts,spec.ts}
src/app/app.component.{ts,html,scss,spec.ts}
src/app/app.routes.{ts,spec.ts}
src/app/services/meta-tag.service.{ts,spec.ts}
src/app/home/{home.component,section-navigation}.{ts,spec.ts}
```

**Structure Decision**: Reuse detail component; root route-data selects reading layout.
Use shared bottom actions without importing full Home. One snapshot service retains
inert plain data; tiny root interface must not eagerly import listing/card dependencies.
No new HTML parser/framework, global document observer or browser-persistent cache.
The ESM lexer is limited to explicit code recovery, not article-body processing.

## Implementation Sequence

1. Establish runnable standalone router/HTTP baseline; setup failures are not red.
   Write failing detail layout, fields, body, state, wrong-owner, malformed/404 and
   latest-ID/cancellation tests before modifying production logic.
2. Add failing real-route metadata/Back/return snapshot, code-loader error/Retry and
   safe-body tests. Use controlled markup/image errors and old/new request responses.
3. Give route a dedicated reading-layout flag; root omits sticky identity/sidebar,
   retains canvas/outlet, shared bottom-only actions and 48rem centered reading container.
   Home remains unchanged. Respect lazy boundary so eager shell does not import detail.
   Detail supplies one h1 and Back to Articles above content.
4. Parse route ID strictly as a positive safe integer, not coercion of partial strings.
   Invalid ID needs no network request. Use latest-route `switchMap`/ownership generation;
   reset old body/status before request and cancel on destruction.
5. Validate unknown detail response: requested identity, owner.username=siddev, usable
   title/body; map404/wrong-owner to not-found, malformed/missing-body/network/429 to error.
   Keep optional source URL/metadata omission explicit, no fabricated title/body/source link.
6. Replace detail HTML `bypassSecurityTrustHtml` with normal HTML sanitization/binding;
   keep body as untrusted string, not SafeHtml asserted from API. Preserve safe headings,
   paragraphs/lists/links/images/code/tables. Unsafe attributes/schemes/scripts cannot execute.
   Apply scoped006 link policy after sanitized content render/replacement, not trust bypass.
7. Style body via scoped article selectors so injected descendants actually receive styles;
   account for Angular emulated encapsulation without unscoped global resets or `::ng-deep`.
   Use approved body/title/metadata roles and semantic heading hierarchy. Adapt images,
   left-align prose and contain tables/pre code locally with usable keyboard scrolling.
8. Handle each body image error once, showing its supplied alt text or approved fallback
   as text, not HTML. Preserve source image metadata separately; no cover banner.
   Dispose DOM/image listeners on content replacement/destruction; do not reload broken URLs.
9. Show route-code error from eager lightweight router failure surface, with scoped Retry
   and Back; cannot be implemented only inside a component whose chunk failed to load.
   Route data loading uses selected skeleton/status without arbitrary dimensions/delay.
   Retry the actual route loader without page reload; explicit failed-code Retry
   may cache-bust the application-owned module URL under the 2026-10-04 approval.
   Keep ordinary loads unchanged, guard duplicates/stale completion and prove
   actual native failed-chunk recovery, including dependencies.
10. Save completed listing state and next-source progress before leaving007; cancel active
    requests and discard uncommitted operation so return can resume from committed checkpoint.
    Snapshot includes buffered lookahead/deferred records/accepted IDs, no subscriptions,
    callbacks, DOM nodes or executable body HTML. Restore on explicit Back to Articles and
    browser Back; do not immediately refetch. Refresh loses memory.
11. Restore section-relative viewport offset and initiating card focus after Home render
    via sole navigation owner; no extra history entries on browser restoration. Direct
    detail return without snapshot activates Articles normally. Do not make a hidden Home
    stay mounted or continue background requests solely to preserve state.
12. Update page Title/Meta idempotently after current accepted response; remove stale
    image tags for image-less article and restore canonical Home metadata on return.
    Cleanup cannot remove tags newly owned by another route; test ordering/races.
13. Run targeted suites and native320px/200%zoom/fonts/motion/code/table/link/image checks.
    Verify no sidebar/cover, bottom actions once, source new-tab behavior and return
    geometry. Main-only build constraints still govern production/chunk validation.

## Complexity Tracking

No exception. Small route-layout state and plain-data return snapshot are justified
by approved dedicated reading UX and preserved listing progress; full Home retention,
persistent browser storage or a new rendering framework would be unnecessary.
