# UI and Routing Contract: Contact Modal

## Geometry and Copy

Centered max-width32rem, padding/gaps1.5rem, viewport clearance1rem, maximum height
viewport-minus2rem with internal scrolling. Use foundation secondary/dialog/input
surface, muted1px border,4px radius, approved backdrop/focus and typography. Layout
gaps are rem; do not invent input geometry, animation durations or fixed panel height.

Title: Let's connect

Intro: Have a project or job opportunity in mind? Send me a message.

Success: Your message has been sent. I will get back to you soon.

Failure: Your message couldn't be sent. Please try again.

Curly displayed apostrophe is permitted by approved copy. Keep current fields and
validation labels consistent; no backend raw error/body displayed.

## Form and States

Name required, email OR phone, message minimum25; existing email/phone rules unchanged.
Explicit labels/autocomplete semantics, unique IDs, field-associated blur errors,
aria-invalid only when appropriate and valid-submit guard. Submit must not mark every
field touched or introduce submit-only error display. Never POST invalid input.

Editing: form, Send Message and Close.
Sending: form hidden; readable Sending status; no duplicate send; Close disabled,
Escape/backdrop ignored, same-app navigation/Back blocked.
Success: approved message and Close; Close clears submitted draft/result.
Failure: approved message, Retry and Close; immutable input retained for Retry.
Code failure: accessible dialog error with Retry/Close, background still retained.
No false success, second modal, timer-driven completion or automatic retry.

## Focus and Background

One labelled aria-modal dialog. Background inert and scrolling blocked; trap focus.
Initial focus on name. State transitions focus a programmatic status heading when
form controls disappear; headings are not ordinary Tab stops. Retain usable focused
status during Sending and explain why Close is disabled. Keyboard/pointer controls
use native semantics and visible foundation focus. Reduced motion has static status.
Permitted dismissal restores live trigger focus; direct entry uses Home fallback.
Do not overwrite underlying article/Home metadata or duplicate bottom Contact/social.

## History and Lazy Ownership

Bottom action pushes `/contact` while retaining current Home or article-detail view.
Dismiss returns to verified app-owned prior entry without new history; direct entry
uses Home and replaces to `/`. Unlocked Back dismisses/Forward reopens. Pending send
blocks in-app navigation and same-app Back; test actual URL/index restoration.
Tab close/reload/cross-document history cannot be reliably blocked or guarantee delivery.
No pushState loop or beforeunload delivery fiction.
Load UI only on opening, no global prefetch. Code-load error/Retry surface is available
without loaded Contact component; stale import resolution after permitted close cannot mount.
Draft/result remain in browser memory, never persistent storage/history/diagnostic payloads.

## Required Controlled Cases

Blank/invalid fields, email-only/phone-only/both, message24/25, phone current boundaries,
blur vs dirty/submit, invalid submit guard; pending duplicate submit/Retry; success
signal/negative/malformed response/network failure; retained input; success Close reset;
Close/Escape/backdrop/Back/router navigation lock; unlocked dismissal/Forward reopen;
direct entry/ordinary entry/detail background; lazy code failure/Retry/stale completion;
320px/200%zoom/short viewport/blocked fonts/reduced motion and focus trap/restoration.
No live sends or sensitive input logged. Browser history/focus behavior needs native evidence.
