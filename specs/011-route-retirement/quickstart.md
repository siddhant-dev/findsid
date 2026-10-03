# Validation Guide: Route Retirement

For later implementation only. Planning deletes no source files or hosted content.

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
