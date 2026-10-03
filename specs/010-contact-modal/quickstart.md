# Validation Guide: Contact Modal

For later implementation only; no tests/installs/live sends performed in planning.

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
