# Bug Assessment: Remove the retired artwork showcase

- **Slug**: remove-art-showcase
- **Created**: 2026-10-03T14:22:20+05:30
- **Source**: pasted text
- **Verdict**: valid
- **Severity**: medium

## Report (verbatim or summarized)

> The art page useed to relay on API key from meta and api key has expired I don't want showcase my artwork anymore in my portfolio hence I want it removed

The owner wants the artwork showcase retired, not the Meta/Instagram credential renewed. The slug was auto-generated in autopilot mode; no existing bug directory was overwritten.

Owner clarification (2026-10-03):

> The exact API error does not matter as we are removing the entire feature rest of the assumptions are good to me

The owner confirmed the proposed scope, including removal of the artwork-profile footer link and redirecting `/work/art` to `/work/articles`. Investigating the exact API error is explicitly out of scope.

## Symptom

The portfolio still exposes an Art tab and `/work/art`, which requests artwork from Instagram using an environment-configured access token. The owner reports that the token has expired and expects the artwork showcase and its API dependency to be removed.

## Reproduction

1. Run the documented development server with `npm start`, then open `/work`.
2. Select the Art tab, or navigate directly to `/work/art`.
3. The route loads `ArtComponent`, whose initialization calls `InstagramService.getAllPosts()` and requests `https://graph.instagram.com/me/media` with an access token. If the API rejects the token, the component's error callback stops the loader and displays the returned error instead of artwork.

These steps are derived from the source, not an executed browser reproduction. No external API request was made, and no credential values were inspected or copied.

The exact production response, token expiry date, and visible error message were not supplied. Token expiry is reported by the owner, not independently verified; the owner confirmed that investigating it is unnecessary for retiring the feature.

## Suspected Code Paths

- `src/app/work-module/work/work.component.html:8-9` - renders the Art tab and links it to the `art` child route.
- `src/app/work-module/work.routes.ts:26-30` - registers the art route and lazy-loads `ArtComponent`; `/work` currently defaults to articles.
- `src/app/work-module/work/art/art.component.ts:41-56` - initialization triggers the API request; success populates up to 24 posts, while failure displays an error.
- `src/app/work-module/work/art/art.component.ts:34-38` - destruction iterates `instaPosts` even when an unsuccessful request has left it undefined, potentially throwing when navigating away after an API failure.
- `src/app/work-module/work/art/art.component.html:3-12` - renders artwork images and a "View more on Instagram" link.
- `src/app/work-module/services/instagram.service.ts:15-36` - requests the Instagram Graph endpoint using `environment.accessKey`.
- `src/environments/environment.ts:7` and `src/environments/environment.prod.ts:3` - both declare the access-key field; values deliberately omitted.
- `src/app/work-module/models/insta.model.ts:1` - gallery-specific response model, imported by the art component and Instagram service.
- `src/app/app.component.html:54-55` - the shared footer links to the same artwork Instagram profile independently of the Art page.
- `src/app/feather-icons/feather-icons.module.ts` - imports and registers the Instagram icon used by the footer.
- `src/app/app.routes.ts` - mounts the work routes and supplies a top-level wildcard redirect to the home page.
- `src/app/work-module/work/work.component.ts` - calculates keyboard navigation from the rendered tab count, rather than assuming three tabs.
- `src/app/work-module/work/art/art.component.spec.ts`, `src/app/work-module/services/instagram.service.spec.ts`, and `src/app/work-module/work/work.component.spec.ts` - existing tests only assert creation; they do not cover removal, routing, requests, or keyboard behavior.

## Root Cause Hypothesis

**Confidence: high** that the unwanted showcase remains wired into the portfolio: the navigation, route, component, service, and token configuration are all present. **Confidence: medium** in credential expiry as the specific API failure cause, because no response or runtime reproduction was provided. The removal request is valid and clearly grounded in current code, even though retiring a feature is a product change rather than repairing token handling. A separate but tightly coupled failure path exists on component destruction after a failed fetch; deleting the retired component eliminates that path without investing in obsolete gallery behavior.

Severity is **medium** because a public portfolio section is reportedly nonfunctional and remains contrary to the owner's desired content. The observed scope is the artwork section, with a potential navigation-time exception after a failed fetch; there is no evidence of data loss or a site-wide outage.

## Proposed Remediation

**Preferred**: Retire the artwork feature completely. Remove the Art navigation item and replace the gallery route with a full-match redirect from `art` to `articles`, preserving old `/work/art` bookmarks without loading artwork. Keep the existing articles default and all other work routes intact. Delete the art component, template, stylesheet, and component test, then remove the exclusively used Instagram service, its test, and the `Insta` model. Remove `accessKey` from both environment configurations while preserving unrelated environment fields and shared HTTP setup used by other features. Do not renew the token or replace the gallery with cached images.

Treat the footer's link to the same artwork profile as part of the showcase removal: remove that specific anchor and its now-unused Instagram icon import/registration, retaining the other social links. The owner explicitly approved this scope and the legacy-URL redirect. Add a short directly related README note that artwork is retired, the old URL redirects to articles, and no Instagram token is required. Do not alter generated `dist` output manually.

**Alternatives**:
- Remove the art route entirely and rely on the existing wildcard redirect to home. This is less code but sends old artwork bookmarks away from the work section.
- Hide only the navigation item. Not recommended: direct URLs would still expose artwork and retain the broken API dependency.

**Files likely to change**:
- `src/app/work-module/work/work.component.html` - remove the Art tab.
- `src/app/work-module/work.routes.ts` - replace gallery loading with the legacy redirect.
- `src/app/work-module/work/art/art.component.ts` - delete.
- `src/app/work-module/work/art/art.component.html` - delete.
- `src/app/work-module/work/art/art.component.scss` - delete.
- `src/app/work-module/work/art/art.component.spec.ts` - delete.
- `src/app/work-module/services/instagram.service.ts` - delete.
- `src/app/work-module/services/instagram.service.spec.ts` - delete.
- `src/app/work-module/models/insta.model.ts` - delete.
- `src/environments/environment.ts` - remove only the artwork access-key field.
- `src/environments/environment.prod.ts` - remove only the artwork access-key field.
- `src/app/app.component.html` - remove the artwork-profile social link.
- `src/app/feather-icons/feather-icons.module.ts` - remove unused Instagram icon registration.
- `src/app/work-module/work/work.component.spec.ts` - update standalone-component setup and add relevant navigation coverage.
- `src/app/work-module/work.routes.spec.ts` - proposed new routing regression tests.
- `src/app/app.component.spec.ts` - update or add a footer regression assertion after inspecting existing setup.
- `README.md` - document retirement and legacy-URL behavior.

**Tests to add or update**:
- Assert the work tab list contains Articles and Apps, with no Art tab or gallery link.
- Assert `/work` still defaults to articles and `/work/art` redirects to `/work/articles` without loading `ArtComponent`.
- Exercise ArrowLeft/ArrowRight wraparound and Home/End focus with the two remaining tabs, preserving tab activation and focus behavior.
- Verify articles, article-detail, and apps routes remain registered and usable.
- Assert the footer no longer links to the artwork Instagram profile and other social links remain.
- Confirm browsing the remaining pages and legacy art URL makes no Instagram Graph media requests.
- Search maintained source for remaining gallery imports, `accessKey`, and Graph endpoint references after removal. The compatibility `art` redirect is intentional and must not be mistaken for remaining gallery functionality.
- Run targeted Karma tests using the repository's existing `npm test` tooling and a production build with `npm run build`; the build replaces the development environment with the production one, covering both token-removal surfaces.

## Risks & Considerations

- Old URLs need deliberate behavior. The preferred full-match redirect retains navigation continuity; merely hiding the tab is insufficient.
- Preserve all unrelated environment fields, services, loader components, metadata helpers, and HTTP providers. They may support the remaining portfolio sections.
- Keyboard tab navigation derives its bounds from rendered tabs, so no count-specific implementation change is evident; regression coverage is still warranted.
- Existing component tests use `declarations` for standalone components. Correct the setup only in tests touched for this remediation; do not expand into unrelated suite repairs.
- No migration, package removal, or backend API change is indicated. Instagram is accessed through Angular's shared HTTP client, not a dedicated dependency.
- Removing environment credentials prevents future bundles from carrying this feature's token; it does not erase previously deployed bundles or Git history. Do not record token values in remediation or test reports.
- The owner approved removal of the artwork-profile footer link, not all social media links. Only the identified artwork-profile link should be removed.
- Expiry and the exact production symptom remain unverified. Static evidence is sufficient to plan retirement, not to claim a reproduced external API failure.

## Open Questions

None. The owner confirmed the proposed assumptions and that the exact API error does not matter for complete feature removal.
