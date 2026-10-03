# Validation Guide: Article Detail

For later implementation only; no test/install/runtime commands run during planning.

## Prerequisites and Red

Complete required001/002/006/007 changes and runnable standalone router/HTTP baseline.
Reuse boneyard integration smoke evidence or establish it before dependent implementation.
Write/observe behavioral failures for layout/sidebar removal, states/body safety, stale
IDs/metadata and listing return before production edits. Setup errors are not red.

## Targeted Runner

After planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/article-page/*.spec.ts' \
  --include='src/app/work-module/services/articles.service.spec.ts' \
  --include='src/app/work-module/work/articles/*.spec.ts' \
  --include='src/app/shared/links/*.spec.ts' \
  --include='src/app/services/meta-tag.service.spec.ts' \
  --include='src/app/app*.spec.ts' \
  --include='src/app/home/*.spec.ts'
```

Adjust actual planned paths as needed; no live owner requests/full non-main build/deploy.

## Expected Evidence

Dedicated48rem reading layout with approved rem spacing/title/body, no sidebar/cover,
complete safe body and bottom actions once. Optional metadata omitted, all tags retained,
source/external links safe new tabs. Broken-image alt/default fallback, no injected HTML.
Invalid ID avoids fetch;404/wrong-owner distinct from retryable429/network/malformed/
missing-body. Latest ID wins and destroyed component cannot write content/metadata.
Unsafe body markup cannot execute; safe content preserves structure and local wide scrolling.
Current title/social metadata has no stale tags; Home canonical metadata restored.
After multiple listing batches, detail return/browser Back restores completed cards/
reading position without immediate refetch. Interrupted append does not skip source data;
direct entry/refresh uses fresh normal loading. Code-load failure surface remains usable
even when detail chunk never mounted.

## Native Checks

Controlled fixtures at320px/200%zoom/blocked fonts and enlarged root font settings;
long title/prose/code/tables/images no page-wide overflow. Tab/link/context-menu actions,
focus restoration, reduced-motion static skeleton/instant navigation and image fallback
announcement must be checked in a browser. Verify scoped body CSS actually matches
innerHTML descendants. No forced loading delay or measured performance claim from planning.
