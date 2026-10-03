# Research: Final Integration and Release Alignment

Repository artifacts and grouped approval on2026-10-03; no execution/publication.

## Integrated Acceptance

**Decision**: Separate final integration feature covers001-012, five approved browser
categories, slow/failed network, blocked fonts and existing accessibility/history cases.
**Rationale**: Individual component suites cannot prove composition/native history.
**Alternatives**: Release checklist only, assume Chrome proves Safari/mobile, new
design/performance targets. Rejected by approved feature scope.
**Evidence**:001 roadmap;002 shell;004 bounded metrics;009 return;010 pending lock;
012 protected/manual publication contract.004 explicitly approves no FPS/time threshold.

## One Version Source

**Decision**: Final readiness precedes26.0.0 package/lock/generated metadata alignment;
002 generator remains authority for typed browser constant.
**Rationale**: Current package0.9.9 is intentionally retained during feature work.
**Alternatives**: Early bump, hand-coded badge/version constant, importing full manifest.
Rejected. Use existing tooling without implicit tags/commits/install effects.
**Evidence**: package.json and002 version generation plan/contract; constitution CalVer.

## Release Record After Deployment

**Decision**: Manual tag/GitHub release at confirmed deployed SHA after success; exact
approval/evidence and records distinguish preparation, publication and recording.
**Rationale**:012 main push never publishes; a tag must not create another deploy path.
**Alternatives**: Pre-tag release, auto-publication/extra workflow write scopes, tag latest
main after deploy. Rejected as premature or wrong identity.
**Evidence**: Approved release recommendation and012 SHA-bound manual model.
Record failure after deployment is recoverable at same SHA, not proof deployment failed.

## Recovery

**Decision**: Diagnose uncertain outcomes; no automatic rollback/arbitrary old artifact.
Published regression corrected/reverted via tested PR, next patch and manual approval.
**Rationale**: Preserves main-only freshness and immutable release history.
**Alternatives**: Redeploy old SHA outside gates, move v26.0.0 tag or bypass tests.
Rejected. If release year changes, clarify CalVer rather than fabricate new identity.
