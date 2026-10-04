# Validation Guide: Route Retirement

Implementation authorized 2026-10-04; no hosted content changes.

## Observed Baseline and Red (2026-10-04)

At baseline `26418f2389f70d2a531d45780bb290ecaf1b017b` on `feat/release-check`,
the actual app/Work/Contact route harness produced four intended failures and
21 passes (`retirement-red.log` in the session). `/resume` still mounted Resume,
`/work/art` still entered Articles in both harnesses, and the supplemental route
table assertion still found the dedicated art redirect. Active aliases, direct
owner-qualified detail, unknown nested paths and pending Contact navigation
attempts passed before cleanup. The 12 Node prerequisite checks also passed.
No setup/compiler failures counted as red.

The runnable native preview also reproduced `/resume` remaining at `/resume`
instead of resolving to `/` before cleanup (`retirement-native-red.log`).

Inventory confirmed exactly four Resume component files and two single-line
download configuration entries. The 2.1 MB template contains inline SVG and no
local asset references. There are no remaining Resume menu/global-style consumers;
shared Feather icons, metadata services and safe-link directives remain active.
Removal is confined to those files, config entries and the two retired routes.

## Red Before Cleanup

Use runnable Jasmine/Karma/actual router harness. Write `/resume` and `/work/art`
fallback expectations and observe current behavior failures before removing routes/files.
Setup/import/provider/browser errors are not red evidence. Use controlled requests,
never live Dev.to/contact/PDF probes.

## Targeted Runner

After planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/app*.spec.ts' \
  --include='src/app/work-module/work.routes.spec.ts' \
  --include='src/app/shared/contact-modal-host.spec.ts' \
  --include='src/app/home/*.spec.ts' \
  --include='src/app/contact-module/**/*.spec.ts'
```

## Expected Results

Retired URLs -> `/` via general wildcard, zero dedicated retired aliases. All three
active section aliases, detail009 and Contact010 usable. No retired component/PDF/
artwork requests; no obsolete Resume navigation/config. Shared assets/services unchanged.
Pending Send navigation lock still works. Source scans supplement route behavior.

Check native direct entry/refresh/history against local SPA fallback without publishing.
README describes retirement, not art-to-Articles redirect. Remote PDF/Firebase resources
are untouched. Main-only full-build/deploy and publication approval gates remain.

## Green and Native Evidence

The combined root/routes/Work/Home/Contact suite passed 63 Jasmine tests and
12 Node checks (`retirement-green.log`). No retirement-caused active-route
regression required a corrective edit.

Chromium native checks (`retirement-native.log`, controlled external responses)
passed direct entry, refresh, Back/Forward and router page-index restoration for
`/resume`, `/work/art`, `/work/art/nested`, `/work/unknown` and
`/work/articles/42/nested`. All resolve to `/` through the existing general fallback.
The three exact active aliases, owner-qualified detail and Contact remain usable.
During a delayed synthetic Send, attempted retired/unknown/active navigation and
actual Back retain `/contact`, its history index and history length. Success
releases the lock and Close returns to the original live detail. Exactly one
synthetic POST occurred; no live request was sent.

Request capture found zero Resume component/PDF/artwork requests. Supplemental
source scan found zero Resume component/import/config or named retired routes.
Only the two environment Resume lines were removed; comparison to the baseline
confirmed all other configuration bytes unchanged. Shared assets, Firebase
hosting/resources, CI workflows, package/lock/version and active services/icons
were untouched. No remote operations, full production build, commit or publication.
Before/after implementation hooks parsed successfully and contain no registered hooks.
