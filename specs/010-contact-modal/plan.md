# Implementation Plan: Contact Modal

**Branch**: `feat/blueprint` | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Replace the routed full-page form and separate result overlay with one lazy,
route-addressable blueprint modal. Keep originating content mounted beneath `/contact`;
direct entry supplies Home. Use typed current validators, memory-only draft/submission
state, blur-driven feedback and real Sending/success/failure. Pending Send locks all
modal dismissal and same-app navigation. Confirmed success Close resets the form.

## Technical Context

**Language/Version**: Angular ^22.1.3 standalone, TypeScript ~6.0.3, HTML/SCSS.
**Primary Dependencies**: Existing Angular forms/router/CDK Overlay/Portal/A11y/RxJS/
HttpClient and Feather icons. No new package required.
**Storage**: Current browser memory only; existing configured contact endpoint.
**Testing**: Existing Jasmine/Karma, standalone TestBed, HttpTestingController,
controlled route-loader/response fixtures and native history/dialog/focus checks.
**Target Platform**: Browser portfolio.
**Project Type**: Lazy routed overlay with app-owned submission state.
**Performance Goals**: No eager Contact UI/request; one pending POST maximum; no
background retries, timed success fallback or artificial loading delay.
**Constraints**: Current validation, input retention, real success, pending dismissal/
navigation lock, approved geometry, test-first, no publication/version change.
**Scale/Scope**: Existing Contact component/service/model, root routed-modal host,
memory session and routing/history/overlay integration. Backend unchanged.

## Constitution Check

*Pre-research and post-design against constitution1.0.1.*

| Gate | Response | Result |
|------|----------|--------|
| Portfolio | Reliable bottom contact action for employers | Pass |
| Test-first | Runnable baseline then meaningful validation/state/routing failures first | Pass for plan; execution evidence required |
| Edge collaboration | Grouped decisions plus final sending-lock/success-reset approved | Pass |
| Dev.to reliability | No article API changes; controlled underlying Home/detail fixtures | Pass |
| Main-only CI | Separate safeguards required before redesign PR automation | No waiver |
| Standalone | Reuse framework/CDK, no package additions | Pass |
| Artwork/CalVer | No route retirement or release edit | Pass |

Dependencies: foundation001 and amended shell002; preserve009 reading layout and007
listing snapshots. No runtime/test success claimed from planning.

## Project Structure

### Documentation

```text
specs/010-contact-modal/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/modal-contract.md
└── checklists/requirements.md
```

`tasks.md` was generated separately with owner approval on 2026-10-03; no execution is authorized.

### Proposed Source

```text
src/app/contact-module/contact/contact.component.{ts,html,scss,spec.ts}
src/app/contact-module/contact/contact-dialog.spec.ts
src/app/contact-module/services/contact.service.{ts,spec.ts}
src/app/contact-module/services/contact-session.service.{ts,spec.ts}
src/app/contact-module/models/contact.model.ts
src/app/app.component.{ts,html,scss,spec.ts}
src/app/app.routes.{ts,spec.ts}
src/app/shared/contact-modal-host.{ts,spec.ts}
```

**Structure Decision**: Existing CDK overlay remains, with one dialog for all states.
Root owns route/background/history and lightweight lazy-loader failure surface.
Contact session owns memory draft and submission, not component subscription lifetime.
Keep eager routing lock/interface independent from form/CDK feature graph so it does
not defeat lazy Contact loading. No global persistent store or new dialog framework.

## Implementation Sequence

1. Establish runnable standalone/HTTP/overlay/router baseline: current tests incorrectly
   declare standalone component and omit providers. Infrastructure failures are not red.
2. Write failing tests for required name/either contact channel/message25, existing email/
   phone rules, blur-only feedback, draft reopen, sending lock, duplicate POST, true/false/
   malformed backend success, transport failure and success reset before production edits.
3. Add failing route/history tests: underlying Home/detail preserved, push open/no duplicate
   open, Close to originating entry, direct-entry replacement, Back/Forward reopen,
   pending navigation cancellation and actual browser URL restoration. Add code-load error.
4. Introduce typed nonnullable controls and explicit typed session/submission states.
   Preserve existing validation behavior; no new trim/phone regex/message limits hidden
   behind redesign. Make error visibility depend on blur/touched, not dirty or a global
   submitted flag. Invalid submit does not POST or enter lock; disabled invalid button
   and a defensive submit guard remain.
5. Retain actual ContactService endpoint/configuration. Define guarded response parsing
   from the current provider contract: current code checks `success === 'true'`.
   Verify its configured provider's documented transport/encoding during implementation
   without sending private data; do not silently claim HTTP200 means successful delivery.
   Current body/header mismatch (object with form-urlencoded header) requires correct
   encoding if provider contract requires form encoding. Use controlled outgoing-body
   tests, no live sends. False/malformed success becomes explicit failure, retaining input.
6. Maintain immutable submitted input snapshot and one app-owned pending subscription.
   No automatic Retry, result popup or request cancellation merely due to overlay view.
   Valid Send locks dismissal before initiating POST, including Retry; response/error
   always releases lock. Do not add arbitrary timeouts or claim offline delivery.
7. Build one labelled `role=dialog`/aria-modal overlay; inert background, block background
   scroll, trap/restore focus. Name input initial focus; state changes move focus to
   programmatic state heading when prior form controls disappear, not extra Tab stops.
   Close becomes disabled while Sending; Escape/backdrop handlers use session lock.
   Use title/body/form/focus/error/loading primitives and approved32rem/1.5rem/1rem/
   viewport-minus2rem geometry, no double margins or new scale. Short viewport scrolls
   within panel. Reduced motion uses static sending status.
8. Root routed-modal host retains the existing route component/view instead of replacing
   it with Contact. Store return URL/scroll/focus and own Contact history context.
   Direct `/contact` mounts Home below; repeated opening shares one overlay/load.
   Contact Back/Forward toggles overlay and underlying snapshot without navigation loops.
9. During pending Send gate root navigation with a router guard and correct cancelled
   same-app popstate restoration (evaluate Angular computed cancellation restoration,
   not pushState spam). Browser Back is not preventDefault-cancellable: prove actual
   URL/history index restoration and retained overlay, not just a guard return value.
   Do not trap full-tab close/reload or cross-document exits, fake a delivery guarantee
   or introduce beforeunload hacks. UI explains Sending; pending forever remains pending.
10. Permitted Close/Escape/backdrop returns to a verified app-owned opening entry without
    new history; direct entry replaces with `/`. Restore focus only to a live originating
    control; otherwise use appropriate page focus fallback. Browser Back/Forward causes
    no second history push. After success Close clears draft/result; failure Close keeps
    draft/result for next opening.
11. Eager lightweight modal error surface handles failed lazy UI code with Retry/Close;
    retry actual loader without global reload/cache-busting and block repeated actions.
    Pending code import cannot mount after close/navigation invalidates its owner.
12. Contact overlay does not rewrite background Home/detail metadata or add duplicate
    page headings/Contact buttons. Keep bottom-only trigger and safe social links.
13. Run targeted suites and actual keyboard/history/320px/200%zoom/fonts/short-window/
    reduced-motion checks, controlled server responses only. No deployment/live sends.

## Complexity Tracking

No exception. Root route-overlay ownership and memory session are required by preserved
background/history and pending-send lock. Reusing CDK avoids a replacement framework;
root lock must not become a global form/store abstraction.
