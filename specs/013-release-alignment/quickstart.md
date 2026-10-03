# Validation Guide: Final Integration and Release Alignment

Later execution only. Nothing here authorizes installation, version changes,
commits/tags or deployment during planning.

## Prerequisites and Red Evidence

001-012 implemented with test-first evidence and verified012 protection/settings.
Supported Node/Chrome runner, actual approved browsers/devices, controlled external
fixtures and existing002 generator. Establish missing runnable tests; observe intended
integration/release failures before corresponding fixes. Setup failures are not red.

## Intended Automated Commands

After planned tests/scripts exist:

```sh
node --test scripts/generate-app-version.test.mjs scripts/release-alignment.test.mjs
node scripts/generate-app-version.mjs --check
npm test -- --watch=false --browsers=ChromeHeadless
```

Full suite includes012 policy tests. Production build evidence comes from main
automation only; no PR production build/deployment. Check existing budgets unchanged.

## Integrated Browser Matrix

Record versions/devices for desktop Chrome/Firefox/Safari and mobile Safari/Chrome.
Test exact ordered content, wrapping navigation,320px/1023px/1024px/200% zoom/short
windows, blocked fonts, reduced motion, code-load Retry/teardown and delayed reading
position. Check root-font20rem activation and zero100k dataset requests before Start.
Validate real bounded DOM/visibility timing without invented performance guarantees.

Exercise direct/unknown fragments, Back/Forward, retired/active aliases, detail/list
snapshot, sanitization, external safe links, Contact direct entry/history/drafts,
blur validation and native pending-send lock with controlled responses. Existing
feature quickstarts remain exact expected-output authorities. Missing browser access
blocks acceptance; emulation alone does not prove mobile Safari/Chrome.

## Version and Release Gates

After integrated readiness, verify26.0.0 in package/lock/generated constant and v26.0.0
badge. Rerun checks; final main validation/build and owner approval refer to candidate
SHA. Simulate stale main, failed tests/build/provider, uncertain provider, conflicting
tag and record retry without real deployment.

Only after explicit final approval, owner manually uses012 publication. Confirm
provider outcome and non-destructive live version/route smoke; never send a test contact
message. Then record tag/GitHub release at captured deployed SHA. Assert no successful
record before deployment and no automatic rollback.

## Recovery

Simulate failed publication diagnosis/current-gate retry and published regression
tested main PR/next patch/new approval. Verify old tag is unchanged. Deployed-but-
unrecorded case completes matching record idempotently, not arbitrary redeployment.
Record passing controlled recovery tests/rehearsal T020-T022 before publication
approval T016; phase numbering is not permission to publish before this gate.
No release completion claim until acceptance, deployment and recording are evidenced.
