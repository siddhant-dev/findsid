# Validation Guide: Shared Blueprint Cards

For the later implementation phase only. No commands below were run during planning.

## Execution evidence (2026-10-04)

Requirements checklist passed 16/16. Existing Angular/standalone shell, blueprint
tokens, test-only CI policy and Node/cache/environment ignores were verified; no
new packages or publication ignores are needed for this private app. The concurrent
`tsconfig.json` edit is preserved.

Independent long/optional/multi-tag fixtures and controlled owner-filtered feed,
loading/empty/error/detail cases ran before content changes: **4 behavioral failures,
3 baseline checks passing**. Failures identified card images/clamping/missing optional
wrappers/content order and discarded source tags. Article detail image/HTML remain
separate source fields. URL validation/native link behavior is gated by a later red phase.

The content/adapters/consumer suite then passed **11 tests**. Runnable URL/link fixtures
subsequently reported **6 behavioral failures, 10 passing checks** before navigation
implementation: actual-base HTTP(S) classification, scoped initial/replacement external
annotation, card-wide internal links/modifiers, safe external anchors, and static Archived
presentation. Optional/malformed feed checks preserve errors instead of empty success.

Native destinations/scoped annotation passed **16 tests**. A separate actual
computed-style phase failed for missing 24px padding, full width, blur, spacing and
wrapping before the card SCSS rewrite (**1 failure, 12 passing consumer/card checks**).
Angular RouterLink modifier handling is tested without invoking browser default
navigation inside Karma (which would reload its runner); real native activation is
checked separately through local-browser fixtures.

Final browser acceptance used a local preview with controlled Dev.to and external
destination responses, blocked Google fonts and no live remote navigation. It verified:

- All supplied description/tags and no card cover requests; separate detail banner
  and body links preserved.
- Initial loaded JavaScript contained no card or article-detail implementation.
  Activating Articles fetched the card code without fetching detail code.
- Native Enter navigated same-tab to `/work/articles/42`; middle-click opened its
  real detail URL in a separate page, as did native macOS Cmd-click. Right-click preserved
  the card URL/native action. RouterLink Ctrl modifier handling also remained unintercepted
  in the component tests.
- Click on external card description opened one new page with `window.opener === null`
  and left the original `/#vault` page in place.
- Keyboard-mode focus used the foundation 2px cyan outline/2px offset; interactive
  hover showed the 20px glow. Archived cards had no link/Tab stop or hover shadow.
- Reduced-motion computed transition duration was `0s`.

| Native browser case | CSS viewport/page width | Complete long content |
|---|---|---|
| Desktop, blocked fonts | 1280 / 1280 | First card height 666px, no clipping |
| Narrow, reduced motion, blocked fonts | 320 / 320 | First card height 1460px, no clipping |
| Genuine Chrome 200% zoom | 640 / 640 | First card height 710px, no clipping |
| Genuine Chrome 200% zoom, narrow window | 320 / 320 | First card height 1456px, no clipping |

Zoom was verified by browser `chrome.tabs.getZoom() === 2` through a temporary local
test extension. A Zone-incompatible observer stub initially prevented preview route
teardown; fixing only that session-only test fixture allowed native navigation to pass.
No production observer workaround was introduced.

The archive asset was compared against HEAD: all five titles/descriptions/dates/URLs,
order and source metadata are byte-equivalent JSON values except the approved `tag`
to one-element `tags` array migration. Compiled compressed card styles are **960 bytes**
(existing budgets: 3KB warning/4KB error), with parent separation applied once at 24px.
No packages, routes, release metadata, Experiences or Lab behavior changed. The separate
Lab subpixel-rounding assessment remains pending; it was not patched in this feature.

Final combined verification: **57 Jasmine tests passed**, covering cards, adapters,
URL policy/directive lifecycle, article bodies, listing states, Resume, App, Home,
navigation/activation coordinators and routes, plus **12 Node checks passed**.
No extension hooks were registered. The task-owned preview was stopped.

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
