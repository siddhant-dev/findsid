# Bug Fix: Article detail tag-shape rejection

- **Slug**: article-detail-load-failure
- **Fixed**: 2026-10-04
- **Assessment**: ./assessment.md
- **Status**: applied

## Summary

Detail responses no longer pass string-valued `tag_list` directly into the
listing's array-only tag validator. Endpoint-specific normalization accepts the
detail `tags` array or comma-separated `tag_list` fallback, preserving existing
array-shaped compatibility and strict listing validation.

## Changes

| File | Change | Notes |
|------|--------|-------|
| `src/app/work-module/services/articles.service.ts` | Added detail tag normalization | Prefer supplied `tags`; otherwise split/trim string `tag_list`; retain shared label validation |
| `src/app/work-module/services/articles.service.spec.ts` | Added independent detail fixtures | Array/string/missing/empty shapes, order and blank filtering; listing string tags remain rejected |
| `src/app/app.routes.spec.ts` | Added real-route regression | Controlled 429 Retry followed by complete detail-shaped response; duplicate Retry blocked |
| `src/app/work-module/work/article-page/article-page.component.html` | Styled data Retry | Reuse `blueprint-button` |
| `src/app/article-route.component.ts` | Styled code Retry | Reuse `blueprint-button`; loading policy unchanged |
| `specs/009-article-detail/quickstart.md` | Recorded regression evidence | Separates data fix from native chunk Retry blocker |

## Tests Added or Updated

- `ArticlesService / accepts detail-specific tag representations without weakening listing validation`
  checks complete content and tags from an independent detail response, comma-separated
  fallback, arrays, blank labels, empty/missing fields and retained listing rejection.
- `application routes / renders a detail-shaped response and styled data Retry through the real route`
  checks error recovery, a single request after duplicate clicks, complete title/body
  and all tags.
- The existing actual-loader recovery route test now checks code Retry button styling.

## Local Verification

- Red: service and actual-route specs produced **3 failures / 16 passes** before
  production edits (`red.log`, ignored by Git).
- Green:
  `npm test -- --watch=false --browsers=ChromeHeadless --include='src/app/work-module/services/articles.service.spec.ts' --include='src/app/app.routes.spec.ts' --include='src/app/work-module/work/article-page/*.spec.ts' --include='src/app/work-module/work/articles/*.spec.ts'`
  with the available headless Chrome binary produced **53 Jasmine passes** and
  **12 Node safeguard/dataset passes** (`green.log`, ignored by Git).
- `git diff --check` passed.
- Retained checks cover requested identity/owner, required content, sanitizer,
  stale-request cancellation, image callbacks and committed listing restoration.
- No live Dev.to request, dependency installation, production build, commit or
  deployment was performed.

## Deviations from Assessment

No production-scope deviations. The user's subsequent console trace confirmed
`Tags must be a list of text labels` at `cardTags -> readArticle -> getArticleById`,
resolving the error-category uncertainty without editing the assessment.
The affected browser's response was not captured; independent controlled
responses demonstrate the supported protocol-shape fix rather than claiming
a live-source verification.

## Follow-ups

- `/speckit-bug-test slug=article-detail-load-failure`
- The separate native rejected-module-import recovery limitation remains unchanged.
