# Bug Fix: Remove the retired artwork showcase

- **Slug**: remove-art-showcase
- **Fixed**: 2026-10-03T14:30:00+05:30
- **Assessment**: ./assessment.md
- **Status**: applied

## Summary

Removed the artwork showcase, its Instagram API integration and token configuration, and its footer profile link. The legacy `/work/art` URL now redirects to `/work/articles`, preserving the remaining portfolio navigation.

## Changes

| File | Change | Notes |
|------|--------|-------|
| `src/app/work-module/work/work.component.html` | modified | Removed the Art tab; retained Articles and Apps. |
| `src/app/work-module/work.routes.ts` | modified | Replaced gallery loading with a full-match redirect to articles. |
| `src/app/work-module/work/art/art.component.ts` | removed | Retired gallery component and metadata/request lifecycle. |
| `src/app/work-module/work/art/art.component.html` | removed | Retired artwork images and gallery profile link. |
| `src/app/work-module/work/art/art.component.scss` | removed | Retired gallery-specific styles. |
| `src/app/work-module/work/art/art.component.spec.ts` | removed | Removed obsolete gallery creation test. |
| `src/app/work-module/services/instagram.service.ts` | removed | Removed the Instagram Graph API dependency. |
| `src/app/work-module/services/instagram.service.spec.ts` | removed | Removed obsolete service creation test. |
| `src/app/work-module/models/insta.model.ts` | removed | Removed the exclusively used gallery model. |
| `src/environments/environment.ts` | modified | Removed only `accessKey`; retained production flag, form URL, and resume URL. |
| `src/environments/environment.prod.ts` | modified | Removed only `accessKey`; retained unrelated configuration. |
| `src/app/app.component.html` | modified | Removed artwork Instagram link; retained four other social links. |
| `src/app/feather-icons/feather-icons.module.ts` | modified | Removed unused Instagram icon import and registration. |
| `src/app/work-module/work/work.component.spec.ts` | updated tests | Corrected standalone setup and covered two-tab navigation and keyboard behavior. |
| `src/app/work-module/work.routes.spec.ts` | added tests | Covered default and legacy redirects, remaining routes, and absence of Instagram HTTP requests. |
| `src/app/app.component.spec.ts` | updated tests | Corrected standalone setup and replaced obsolete scaffold title assertions with footer regression coverage. |
| `README.md` | modified | Documented retired artwork, compatibility redirect, and absence of an Instagram token requirement. |

## Tests Added or Updated

- `WorkComponent` - verifies Articles and Apps are the only tabs, with no Art tab.
- `WorkComponent` - verifies ArrowLeft and ArrowRight wrap between two tabs, update activation/tabindex, click the target, and focus it.
- `WorkComponent` - verifies Home and End focus the first/last tab without changing activation.
- `Work routes` - navigates `/work`, `/work/art`, and `/work/articles` using actual lazy-loaded components, confirming the articles URL and rendered page.
- `Work routes` - verifies work-section tab URLs remain `/work/articles` and `/work/apps`.
- `Work routes` - navigates apps and an article-detail URL, supplying HTTP test responses and verifying the rendered pages.
- `Work routes` - verifies the legacy route is full-match, redirects to articles, and has no gallery component loader.
- `Work routes` - asserts no Instagram Graph HTTP request remains and verifies all expected HTTP requests are handled after each case.
- `AppComponent` - verifies LinkedIn, Twitter, Github, and Code Pen remain while the footer contains no Instagram link.

## Local Verification

- `npm run build` -> passed; production bundles include the remaining work components and no gallery chunk.
- Initial targeted `npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/app.component.spec.ts --include=src/app/work-module/work/work.component.spec.ts --include=src/app/work-module/work.routes.spec.ts` -> blocked by a pre-existing test configuration: `/polyfills` must be an array.
- Retried with `--polyfills=src/polyfills.ts` -> test compilation passed, but the default Google Chrome binary was not installed.
- `CHROME_BIN='/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge' npm test -- --watch=false --browsers=ChromeHeadless --polyfills=src/polyfills.ts --include=src/app/app.component.spec.ts --include=src/app/work-module/work/work.component.spec.ts --include=src/app/work-module/work.routes.spec.ts` -> **12 tests passed**, using the existing installed Edge Chromium browser. No dependency installation or persistent runner configuration changes were required.
- `git diff --check` -> passed.
- Source-reference search -> no production references to the retired service, model, component, token field, profile, or Graph endpoint remain. Negative regression assertions and the compatibility redirect intentionally reference the retired feature.
- Local configuration assertions -> both environment files omit `accessKey` and retain `formURL` and `resumeURL`.
- Production JavaScript scan -> no exact `app-art` component identifier, artwork profile, Instagram Graph endpoint, or `accessKey` remains. An initial overly broad `app-art` substring check matched the unrelated `app-articles` selector; repeating with a word boundary passed.
- No live Meta API request or API-error investigation was performed, as approved by the owner. Routing and HTTP behavior were exercised in the local browser with Angular's HTTP testing backend.

## Deviations from Assessment

No implementation scope changes. Existing root-component scaffold tests referenced a nonexistent title property and obsolete scaffold markup; these were replaced as part of the assessment's planned update to that test file.

The pre-existing Karma polyfills configuration and missing default Chrome installation were handled with command-line overrides instead of modifying unrelated project configuration. The production build regenerated ignored output normally; no generated files were manually edited.

## Follow-ups

- Run `/speckit-bug-test slug=remove-art-showcase` for the downstream verification report.
- Deploy the updated build through the existing deployment process to remove the showcase from the live portfolio. Previously deployed bundles and Git history are not erased by this change.
