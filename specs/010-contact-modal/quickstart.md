# Validation Guide: Contact Modal

Implementation evidence uses controlled synthetic responses; no live sends.

Implementation began 2026-10-04. The initial runnable contact suite produced seven
intended failures and two passes (`contact-red.log` in the session): blur-only
validation/invalid submission, retained draft/dialog, detached memory state, immutable
pending submission/lock, provider JSON/true-response parsing and retained Home/modal.
A test-only serialization union type setup error was corrected before this run and
was not counted as behavioral red. No live messages were sent.

Provider transport reference: https://formsubmit.co/ajax-documentation and its
linked Fetch example document `Content-Type: application/json`, `Accept:
application/json` and JSON serialization. Use that supported transport rather than
labelling an object as form-urlencoded. Preserve the configured endpoint and existing
explicit `success === 'true'` signal; do not include endpoint/contact data in evidence.

Owner clarification 2026-10-04: the backdrop/overlay covers the whole viewport,
including the identity column, not merely the right content column. The approved
centered 32rem form-panel maximum and viewport clearance remain unchanged.

Owner-approved policy amendment 2026-10-04: explicit Retry after lazy-code failure
may cache-bust the application-owned module load in 009 and 010. Normal code loads,
contact POSTs and document lifetime remain unchanged; global reload and automatic
retry are prohibited. This approval removes the policy blocker but does not claim
implementation or successful native recovery by itself. See the verified recovery
evidence below.

## Prerequisites and Red

Complete foundation/shell changes and establish standalone/CDK/router/HTTP baseline.
Current declaration/provider failures are not red evidence. Write and observe expected
validation/state/history/focus failures before production changes. All responses and
form input are controlled synthetic fixtures, not real contact submissions.

## Targeted Runner

After the planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/contact-module/**/*.spec.ts' \
  --include='src/app/shared/contact-modal-host.spec.ts' \
  --include='src/app/shared/retry-module-graph.spec.ts' \
  --include='src/app/app*.spec.ts' \
  --include='src/app/home/*.spec.ts'
```

Adjust planned paths if needed. Preserve affected009/007 regression coverage where
modal routing touches their background/reading state. No non-main build/deployment.

## Required Outcomes

Single route-addressable dialog and bottom action; preserved underlying content.
Current validators/blur-only field errors; invalid submit has no request or lock.
One immutable valid send snapshot/POST; pending locks Close/Escape/backdrop/navigation/
same-app Back; actual success/negative/malformed/network completion releases lock.
Success Close resets; failure keeps input/Retry; drafts reopen from memory, refresh fresh.
Correct provider encoding/success signal verified with controlled request/response tests,
not arbitrary HTTP200 or real emails. No raw contact data in diagnostics/history/storage.
Opening pushes once, unlocked dismissal creates no history entry, direct dismissal
replaces `/`, Forward reopens. Code load failure is Retry/Close, no blank page.

## Native Browser Evidence

Use synthetic delayed responses to inspect actual Back URL/history-index restoration,
not only guard calls. Verify no history growth or overlay destruction while Sending.
Full reload/tab close is outside guaranteed protection; never mark unseen send success.
Check Tab/Shift-Tab trap, inert background/scroll lock, focus after state changes and
dismissal, disabled Close explanation,320px/200%zoom/short windows/fonts/motion.
Panel uses approved rem dimensions and internal scrolling without inaccessible controls.
No artificially delayed status or claimed runtime success from planning.
Abort the actual Contact chunk fetch once, then restore network access and select
Retry: verify real recovery, one active attempt, retained background/draft/history,
no POST before Send, and no late mounting after Close. Include a failed dependency
case; a fresh top-level URL alone is not proof its cached failed dependencies recover.

## Execution Evidence (2026-10-04)

The final combined Contact, route/root, Home/navigation, Articles/Vault/detail,
shared cards/links and metadata run passed 139 Jasmine tests and 12 Node checks
(`contact-final.log`). Tests include guarded provider encoding/unknown responses,
immutable submission, invalid-submit defense, retained draft, success reset after
view destruction, accessible errors, geometry, pending navigation, code-boundary
duplicates and stale resolution, and parsed-module recovery/failure guards.

Native synthetic checks (`contact-native.log`, `contact-layout.log`) verified:

- A 1280x900 body-level backdrop covering both columns, one bounded panel, preserved
  live Home/detail DOM and unchanged title/social/canonical metadata.
- Delayed Sending, hidden form, state-heading focus, Tab/Shift-Tab without leaving
  the pending dialog, disabled Close, blocked Escape/backdrop/imperative navigation
  and actual Back restoring the same URL/router page index with no history growth.
- Real negative response followed by one explicit Retry, true-string success,
  cleared draft on success Close, live trigger focus restoration and Forward reopen
  with no second POST.
- Direct `/contact` uses Home and replaces `/` on dismissal; ordinary history uses
  the verified opening entry. Twenty-card multibatch Articles retain their exact
  nodes, request count and section offset within 1 CSS pixel; editing draft reopens.
- 320px/short windows, enlarged text, blocked web fonts, reduced motion and
  bidirectional focus trap. Genuine browser zoom was confirmed by `tabs.getZoom=2`
  and DPR2, with 320 CSS pixels, full fractional CSS viewport coverage, internal
  scrolling and reachable Close.

`contact-code-red.log` reproduced actual cached-import Retry failure before recovery.
`code-retry.log` now proves four real entry/dependency failures (Contact and Article)
recover after explicit duplicate Retry without document reload, duplicate source
fetches or POSTs. Contact recovery preserves the original Home/inert state and draft
on reopening. A small deferred ESM lexer parses actual import positions; fresh
same-origin lazy sources use temporary blobs while eager modules retain identity.
Redirects/external dependencies/cycles fail explicitly; blobs are revoked after
static linking and the recovered namespace is reused for the document lifetime.
An additional native case holds the real Retry fetch, closes Contact, then releases
it: there is no late modal mount, and a subsequent ordinary opening succeeds.
Normal code loads, article requests and contact POSTs are not cache-busted. Vite's
one-time dependency-optimizer reload during dependency installation was excluded;
the stable-preview evidence above contains only the original document navigation.

**Historical test-first gaps:** the complete native history/overlay baseline and
expanded US1 geometry/history matrix were not established before the first modal
implementation. The initial seven behavioral failures are genuine, but cannot be
stretched to cover those later checks. The native pending-history red gate also
was not run before the guard was implemented. T002/T006/T007/T017 remain unchecked
as procedural gaps; current passing checks do not retroactively satisfy them.
The section-preservation regression was separately observed red before its fix
(`contact-section-red.log`). No checklist markers were changed.

Only the declared lexer dependency was added. Endpoint/backend/resources/version
and publication configuration remain unchanged. No live POST, production build,
commit, deployment or release was performed. Extension hooks parsed successfully;
there are no registered implementation hooks.
