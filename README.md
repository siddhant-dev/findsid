# Findsid

This Angular portfolio showcases the owner's projects, articles and skills through
the homepage Articles and Retro Vault sections. Resume and artwork routes are retired:
`/resume` and `/work/art` use the general unknown-route fallback to `/`, without
dedicated redirects or retired component/download requests. `/work` and
`/work/articles` remain exact aliases to `/#articles`; `/work/apps` goes to `/#vault`.
Article detail and Contact remain active. The remote Resume PDF and Firebase
resources are unchanged; only the application's download reference was removed.
No Instagram API token is required.

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

On2026-10-04, after the owner made the repository public, approved `main` protection
was configured and verified: PRs required, strict **Portfolio tests** from GitHub
Actions required, administrators included, no PR bypass allowances, force pushes or
deletion. No merge queue or queued/active legacy workflow was found. This removes
the settings-access blocker, but actual blocked-failing-PR/fork acceptance and a
successful candidate main build remain required; see012/013 quickstarts.

Before merging a workflow migration, coordinate pausing the existing preview/deployment
automation and any queued automatic deployments through owner-controlled settings.
Changing local workflow files does not stop already-active or queued workflows. Check
that the manual workflow is available from the default branch. Manual publication is
for an explicitly approved, completed redesign only; a workflow dispatch is not
approval to publish unfinished work.

Release013 readiness is currently blocked by outstanding prerequisite acceptance/
test-first evidence, the actual desktop Chrome/Firefox/Safari and mobile Safari/
Chrome matrix, and verified main protection/build evidence. Use `YY.MM.PATCH` for
the app version and increment `PATCH` for every approved Firebase deployment. Keep
`package.json`, the lockfile and generated badge metadata in sync; the current
version is `26.10.2`. A version bump does not authorize publication: deployment
still needs explicit approval of the final versioned main SHA. See
`specs/013-release-alignment/quickstart.md` for the readiness assessment. No release
was published by this implementation.

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

## Experiences

Five static blueprint cards preserve the approved roles, dates, locations, 18 achievement
paragraphs and tags. The component and local role data load together near the viewport
or on `/#experience` navigation, without a separate data request. Cards wrap naturally,
have no links or expansion controls, and disable hover transitions under reduced motion.

## Article and Retro Vault cards

Shared blueprint cards show complete text, optional dates and all available tags without
cover images or truncation. Valid destinations use one title-named card-wide native link;
invalid or missing destinations remain static **Archived** cards. Article detail routes
and valid social-image metadata are preserved without a visible cover banner. External web links open in a new tab with
`noopener noreferrer`, including scoped annotation of replaced article-body links.
Same-origin links, mail actions and downloads retain their native behavior. Card/detail
code stays deferred with its consumers; the shell's link policy does not import them.

## Articles listing

Articles are requested only when Home activates the section. The public `siddev` feed
is enumerated in ten-record source pages, revealing ten usable unique cards per batch
with one usable lookahead for **View more**. Dated cards appear newest first; undated
cards are deferred until source exhaustion. Rejected records are diagnosed without
showing payloads or visitor warnings, and full rejected/duplicate pages do not stop paging.

Ten inert boneyard skeletons cover initial loading. Errors remain distinct from a
genuinely empty source; **Retry loading more** resumes the failed page without replacing
cards or restarting successful pages. The available-width grid uses 17.5rem minimum
tracks, 1.5rem gaps and at most three columns. Home owns append scrolling and keyboard
focus, respects reduced motion and cancels stale movement after user interruption.
Departure cancels requests/render work. A single in-memory committed checkpoint restores
cards, buffered records, paging progress and section-relative reading offset on return
from detail. Keyboard-initiated visits restore the live initiating-card focus; refresh
starts a fresh listing.

## Article detail

`/work/articles/:id` uses a centered 48rem reading surface without the identity/sidebar,
retaining the shared blueprint canvas and bottom Contact/social actions. Owner and
requested ID are validated; complete article HTML uses normal framework sanitization,
scoped descendant styles, responsive inline images and keyboard-scrollable code/tables.
Broken images become literal alt text or `Article image unavailable.` No API HTML is
marked trusted. Current-route metadata is generation-owned and Home restores canonical
tags without allowing obsolete cleanup to erase a newer page.

Invalid IDs, 404 and wrong-owner responses show `Article not found.` Other data failures
have a current-ID Retry. A lightweight eager boundary handles deferred-code failures and
keeps Back to Articles available even when detail code cannot mount. Explicit code
Retry recovers rejected browser imports by fetching the application-owned lazy module
graph with fresh URLs and parsing its imports with deferred `es-module-lexer`.
Already-loaded eager Angular/application modules retain their original identity.
Recovered modules are reused within the document; ordinary loads and data requests
are unchanged. Recovery uses temporary module blobs, not a document reload, and rejects
external dependencies and cyclic lazy graphs explicitly. A future CSP must permit
these module blobs for this recovery path.

## Contact

The bottom Contact action opens `/contact` above the entire viewport, including the
identity column. One centered, internally scrolling 32rem dialog retains the live
Home/article view and its reading position and metadata underneath. The background
is inert and scroll-locked, with trapped focus and focus restoration on dismissal.
Direct entry uses Home; Back/Forward preserves the app-owned opening history.

Draft and blur state remain in memory only. Current form validation is preserved.
A valid Send freezes one submission, hides the form and locks Close, Escape,
backdrop dismissal and same-app navigation/Back until the provider responds.
Only the provider's explicit `success === 'true'` confirms success; negative,
malformed and transport responses show failure with explicit Retry. Success Close
clears the draft; failure dismissal retains it. There is no automatic retry, timeout,
delivery guarantee or protection against full-tab reload/close. Contact code failures
use an eager Retry/Close boundary and the same explicit module recovery as article
detail; code Retry never sends a contact request.

## Retro Vault

Vault retains the five approved projects in their original order, with full copy,
historical dates, tags and URLs. Home activates its code within 20rem of the viewport
or immediately on `/#vault`; the JSON module loads only inside that deferred feature
graph, without a separate asset-data request or project URL probes.

All accepted projects render at once in the same rem-based grid as Articles. Five
inert boneyard skeletons cover real data loading, with a fixed palette and static
reduced-motion treatment. Individual invalid records are diagnosed and skipped; the
first accepted valid ID wins. Empty data, collection errors and section-code errors
remain distinct. Retry revalidates the actual bundled source without claiming to
repair immutable invalid content, and departure cancels owned subscriptions/render work.
