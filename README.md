# Findsid

This Angular portfolio showcases the owner's projects, articles and skills. The Work
section contains Articles and Apps. The artwork showcase has been retired, and old
`/work/art` links redirect to `/work/articles`. No Instagram API token is required.

## CI and publication

| Event | Automated work | Publication |
|---|---|---|
| Pull request targeting `main` (including forks, docs and dependency changes) | Full test suite; required check name: **Portfolio tests** | None |
| Push to `main` | Full test suite, then production build | None |
| Push to another branch or pull request targeting another branch | No portfolio CI workflow | None |
| Manual workflow dispatch from `main` | Fresh tests and build, then a main-head freshness check | Live Firebase Hosting only if every prior step succeeds |

The PR workflow has read-only repository access, no Firebase credentials, no build or
preview deploy, and cancels older runs for the same PR. The manual workflow checks out
the dispatch SHA; if `main` advances before publication, it fails and requires a new
dispatch rather than rebuilding a different revision. Manual runs are serialized. GitHub
may replace an already-pending run when a newer run is queued, so dispatch order is not
a guarantee that every request will publish.

**Repository settings are a separate prerequisite and are not configured by these
workflow files.** Before declaring the safeguards active, protect `main`, require the
current-revision **Portfolio tests** check, require PR merges, and prohibit routine
bypasses, force pushes and branch deletion. Verify a failing check blocks a merge and
remove obsolete required-check references. Merge queues are not covered; disable one
or obtain separate approval for a `merge_group` policy. If settings access is
unavailable, safeguards completion remains blocked.

Before merging a workflow migration, coordinate pausing the existing preview/deployment
automation and any queued automatic deployments through owner-controlled settings.
Changing local workflow files does not stop already-active or queued workflows. Check
that the manual workflow is available from the default branch. Manual publication is
for an explicitly approved, completed redesign only; a workflow dispatch is not
approval to publish unfinished work.

Run `npm ci` with a Node 22 release satisfying the lockfile engines, then run the
complete suite with:

```sh
npm test -- --watch=false --browsers=ChromeHeadless
```

This runs workflow-policy, version metadata and synthetic Lab dataset tests before the
Angular/Karma application tests. Karma needs a Chrome/Chromium executable; if it is not
installed at the default location, set `CHROME_BIN` to its absolute path. Use
`--browsers=ChromeHeadless` for a headless-only executable.
The CI workflows use plain `npm ci`; do not use peer-dependency bypass flags. Policy
tests parse the actual workflow files. Tests for external services use controlled
responses; acceptance checks must not contact live Dev.to, submit contact forms, or
deploy to Firebase.

## Development

Run `ng serve` for a development server at `http://localhost:4200/`.

Run `ng build` to build the application. Artifacts are written to `dist/`.

For Angular CLI help, run `ng help`.

## Interaction Lab

The homepage loads the Lab's code near the viewport or on `/#lab` navigation. The
virtual scroll explorer uses ngx-ui-scroll and boneyard-js. Its separate, approximately
13.7 MB JSON asset is requested only after **Start**, contains exactly 100,000 original
synthetic records and is cached for the mounted demo session. Search and sorting operate
on all records before windowing; Reset reuses the validated dataset.

Regenerate or verify the deterministic asset with:

```sh
node scripts/generate-lab-records.mjs
node scripts/generate-lab-records.mjs --check
```

Live first-visible-row timing and rendered record DOM counts are measured in the current
browser. Estimated rendered-row memory savings compares that count with rendering every
matching record: `(1 - rendered rows / matching records) * 100`. It assumes equal memory
per row and is a row-count proxy, **not measured RAM or total browser-memory savings**.
Both approaches retain the full dataset; shared page and virtualization overhead are
excluded. The normal-scroll baseline is theoretical and is not mounted.
