# Integration and Release Contract

## Owner Version Policy (2026-10-16)

The current app version is `26.10.2`, using `YY.MM.PATCH`. Increment `PATCH` for
each approved Firebase live deployment, keeping package, lockfile and generated
badge metadata aligned. This owner direction supersedes the fixed `0.9.9` and
`26.0.0` values in the original release plan; it does not waive readiness or
final-SHA publication approval. Historical evidence remains unchanged.

All001-012 contracts are release prerequisites. This feature adds no content/design
changes, deferred accessibility demo, invented numerical thresholds or budget increases.
Acceptance includes current desktop Chrome/Firefox/Safari and mobile Safari/Chrome,
version/device evidence, keyboard/focus/reduced motion, existing viewport/zoom cases,
lazy behavior, native history, restored Articles and pending Contact lock, blocked
fonts and slow/failed requests. Controlled HTTP responses; no live Contact acceptance.

Keep actual0.9.9 until integrated release readiness. Final package/lock/generated
version26.0.0 and badge v26.0.0 agree. Final versioned main revision gets owner
publication approval; planning approval is not it. Use012 manual main workflow only.
Fresh validation/build/freshness and deployed output identify the same captured SHA.

Only confirmed successful publication permits v26.0.0 tag/GitHub release at that SHA.
No tag-trigger publication or tag of later main. Failed/uncertain deployment gets
visible diagnosis, no successful release record or automatic rollback. Successful
deployment with failed record creation stays incomplete; retry matching record at
same SHA without moving conflicting tags or redeploying merely to create a record.

Published regression recovery uses a tested targeted main PR, next patch identity,
new approval and manual publication. Preserve old tags/releases; no arbitrary old
revision/unchecked artifact deployment. A year-boundary CalVer conflict needs approval.
Controlled recovery tests/rehearsal (tasks T020-T022) MUST pass before publication
approval T016. A real regression/recovery deployment is conditional, not a prerequisite.

Implementation tests cover readiness/version gates, stale/new SHAs, failed/uncertain
deploy, post-success recording, conflicting records and recovery identity before
release logic changes. Task generation was separately approved on 2026-10-03.
Planning does not execute tasks/change code/install packages/bump versions/change
settings/commit/tag/create releases/publish.
