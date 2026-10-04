# Research: Contact Modal

Repository inspection and grouped user confirmations on2026-10-03; no live sends,
installations or runtime tests.

## Confirmed Policy Change

**Decision**: Valid Send locks Close/Escape/backdrop and same-app navigation/Back until
response/error. Success Close clears draft/result. Failed drafts survive dismissal in memory.
**Rationale**: Latest explicit approval supersedes earlier dismissal/navigation-away permission.
**Alternatives**: Allow closure while request continues (previously approved, now superseded),
automatic success, persistent drafts. Rejected/unapproved.
Full browser close/reload/external history cannot be reliably blocked; no delivery guarantee.

## Existing Form and Backend

**Decision**: Preserve current validators with typed controls and blur-only visibility.
**Rationale**: Existing controls require name, email OR phone, message25; email validation,
phone pattern/min10/max15. No new numerical input limits approved.
**Evidence**: contact.component.ts/html and contact.model.ts.
Current submission resets input before checking success and trusts an untyped response;
new state model must retain failed input and validate actual provider success.
Current service posts an object with form-urlencoded Content-type. Implementation must
verify configured provider's encoding contract and test correct outbound body without
real submissions. Endpoint/config values remain in existing configuration, not copied
into planning artifacts. Documented current success field is string "true"; arbitrary
200 responses are not proof of delivery.

## Overlay and Lazy Boundary

**Decision**: Reuse CDK Overlay/Portal/A11y for one form/status/result dialog. Root retains
underlying route and owns a small lazy-load failure surface.
**Rationale**: Existing form page opens a separate result overlay; it does not satisfy
route-addressable modal/background preservation.
**Alternatives**: Two dialogs, replace whole route with Contact, new library. Rejected.
Contact code is lazy; route bookkeeping/lock cannot pull the full form into eager Home.

## Router History and Sending Lock

**Decision**: Root owns verified opening entry/return context, guarded navigation and
same-app cancelled-popstate restoration.
**Rationale**: Browser Back changes history before a guard can reject route activation.
Testing only guard false cannot establish unchanged URL/history index/modal behavior.
**Alternatives**: preventDefault on popstate (not cancellable), push history on every
Back (history pollution), global reload/cancel all browser exits (not reliable).
Actual Angular22 computed cancellation restoration and lazy-import retry behavior require
runtime tests; planning claims no verified compatibility. Direct entry dismisses via
replacement `/`; ordinary opening uses its known originating entry.

**Owner amendment (2026-10-04)**: 009 native evidence showed a cached rejected
dynamic import despite restored network availability. Explicit lazy-code Retry
may now cache-bust the application-owned module URL in both 009 and 010.
Document reload and automatic retry remain prohibited. Draft/background/history
must survive, duplicate requests and stale mounting must be blocked, and dependency
recovery must be verified in a browser. No contact POST behavior is changed.

## Accessibility and Geometry

**Decision**: Modal max32rem,padding/gaps1.5rem,viewport clearance1rem,max-height
viewport-minus2rem. Inert background/scroll block, trapped focus, live states and
post-state focus target; blur feedback associated with fields.
**Rationale**: Approved grouped choices and foundation palette/state primitives.
**Alternatives**: Old50%-width translated form, noninteractive Tab stops, hidden errors,
new dimension scale. Not approved.

## Tests and Gates

**Decision**: Existing Jasmine/Karma/CDK/router/HTTP controlled tests plus native checks.
**Rationale**: Current declaration-based standalone tests cannot count as red until runnable.
Accepted response/timeout/network states need controlled completion, never live contact.
No first-feature clarification remains; backend transport and browser history must be
verified in implementation, not silently assumed or worked around.
