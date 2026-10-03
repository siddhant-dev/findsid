# Validation Guide: Shared Blueprint Cards

For the later implementation phase only. No commands below were run during planning.

## Prerequisites

Complete styles001/shell002 first. Use existing repository dependencies and supported
Angular runtime/browser setup. Correct standalone TestBed setup and input/provider
fixtures before red evidence; tooling/dependency/browser errors are not behavioral failures.
CI safeguards must be resolved before redesign PR automation. No publication.

## Red Before Green

1. Establish a runnable existing-card baseline.
2. Add acceptance assertions from [contract](contracts/card-contract.md) and observe
   failures specifically for old image/clamp/single-tag/pseudo-button behavior.
3. Add failing controlled external-link and rendered-article-content cases before
   implementing the app-wide rule. No live network requests.
4. Implement only after documenting each affected behavioral red result.

## Targeted Suites

After the proposed tests exist, run the existing runner:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/card/*.spec.ts' \
  --include='src/app/work-module/services/articles.service.spec.ts' \
  --include='src/app/shared/links/*.spec.ts' \
  --include='src/app/work-module/work/article-page/*.spec.ts' \
  --include='src/app/work-module/work/articles/*.spec.ts' \
  --include='src/app/work-module/work/apps/*.spec.ts' \
  --include='src/app/app.component.spec.ts' \
  --include='src/app/resume-module/resume/*.spec.ts'
```

Use actual generated test locations if they differ. Expand only when integration
indicates a broader regression; do not run builds/deployments on a non-main PR.

## Expected Outcomes

- Both kinds are image-free and full-height; date is sole metadata and only appears
  when supplied. Missing description/tags have no placeholders.
- All supplied tags render. Detail images/metadata and article route remain usable.
- Clickable cards have one native link focus stop and preserved browser link actions.
- Invalid/missing destinations are static "Archived" cards, with no interaction/glow.
- Static social and dynamic article-body external links open safely in new tabs;
  internal links/fragments and local downloads/mailto actions preserve behavior.
- Controlled successful/loading/empty/failure article states remain distinguishable.

## Browser Evidence

Check real Tab/Enter/modifier/context-menu behavior, focus outlines and hover; mocked
clicks alone do not establish native behavior. Check 320px, 200% zoom, long unbroken
text/tags, blocked fonts and reduced-motion transitions. Verify no horizontal page
overflow, clipped focus/corners or card image requests. Test replacement article HTML
and route exit, not only initial insertion. Use controlled fixtures and record outcomes.
No new numerical styling value may be introduced without user approval.
