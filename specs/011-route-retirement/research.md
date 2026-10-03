# Research: Route Retirement

Repository inspection/user approvals on2026-10-03; no runtime tests/source deletion.

## Baseline and Approved Fallback

**Decision**: Remove `/resume` and exact `/work/art` redirect, use general unknown `/`.
**Rationale**: Confirmed no dedicated redirects; grouped approval chose existing wildcard.
**Alternatives**: Keep artwork alias to Articles, new retired page or named redirects.
Rejected. Root currently has `** -> ''`; Work child unmatched handling must be tested,
not assumed from root table alone.
**Evidence**: app.routes.ts, work.routes.ts and work.routes.spec.ts.

## Cleanup Boundaries

**Decision**: Remove exact four Resume component files, route/config/navigation/orphan
styles and related README/test assertions. Retain shared assets/active services/components.
**Rationale**: User approved removing application surface, not broad resource cleanup.
**Alternatives**: Recursive asset/directory deletion, remote PDF delete, Firebase changes.
Unapproved. Remote download references exist in environment variants; remove references
without duplicating access-token-bearing URLs into artifacts.
**Evidence**: resume component/source file inventory, README, environment usage search.
No separate matching artwork component/assets were found in this inspected baseline.

## Hosting and Governance

**Decision**: Firebase SPA rewrite remains untouched.
**Rationale**: Existing `** -> /index.html` lets Angular resolve URLs; no server410/404
contract requested. Browser route fallback is not a claimed HTTP404/410 response.
**Alternatives**: Hosting retirement redirects/status rules require separate approval.
**Evidence**: firebase.json and constitution artwork exception for approved redesign.
Tests precede implementation; no publication/version change/CI waiver.
