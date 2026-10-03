# Validation Guide: Retro Vault

For later implementation only; no installs, tests or runtime commands performed in planning.

## Prerequisites and Red Evidence

Complete amended shell002/styles001/cards006 and establish standalone Jasmine/Karma
baseline. Reuse or establish the mandatory boneyard Angular22 integration smoke check.
Write and observe acceptance failures before application changes: exact content,
deferred JSON/code, individual rejection, states, grid and direct activation.
Setup/import/browser/dependency failures are not behavioral red evidence.

## Targeted Command

After planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/apps/*.spec.ts' \
  --include='src/app/work-module/services/app.service.spec.ts' \
  --include='src/app/work-module/work/card/*.spec.ts' \
  --include='src/app/home/*.spec.ts'
```

Use actual paths if implementation names differ. Acceptance data is controlled, not
live project URL probes or Dev.to requests. No non-main full build/deploy.

## Expected Results

Compare all five cards/ordering/content against independent expected contract strings.
No image, clamp, View more/intro/filter/new claim. Valid links open safely in new tabs;
invalid destinations retain static Archived content. Reject essential invalid records
individually; duplicate valid ID keeps first; malformed/all-invalid is error, true empty
is successful-empty. Diagnostics are explicit without visitor warning or full payloads.

Control loader pending/rejection/success and confirm section-only Retry, duplicate guard,
permanent anchor and no destroyed-owner mount. Retry corrupted immutable data cannot
falsely succeed. Direct/#vault entry triggers activation without observer dependency.

## Native/Network Evidence

Observe eager useful About and no inactive Vault code/data request before viewport
approach. Check current-root conversion of20rem and no eager skeleton/card dependency
leak. Verify available-width17.5rem/1.5rem/max3 grid,320px,200%zoom, blocked fonts and
enlarged user font settings. No horizontal overflow/clipped full content/focus.
Check fixed skeleton palette and static reduced motion, no artificial delay, actual
reading-position stability on lazy mount and native card keyboard actions.
Main-only build/chunk inspection governs production isolation evidence; do not infer
measured speed/bundle improvements from planning or dynamic-import source alone.
