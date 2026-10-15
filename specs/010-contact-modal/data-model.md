# Data Model: Contact Modal

## Draft

Typed strings: name,email,phone,message. Current validator semantics retained:
required name, valid optional email, valid optional phone pattern/min10/max15,
at least one contact channel, required message with minimum25.
No new trimming, limits or phone-pattern correction without separately justified
behavioral approval. Field blur/touched state owns inline errors; submit alone does not.
No contact data in URLs/router history/localStorage/logs or article snapshots.

## Session and Submission

States: editing,sending,success,failure. Session retains draft, blur state, optional
immutable submitted input and validated response/error. Submission owns one pending
request identity/subscription; views observe it instead of initiating extra POSTs.

| Transition | Rule |
|------------|------|
| Editing -> Sending | Valid Submit snapshots input and acquires lock before POST |
| Invalid Submit | Stay editing, no POST/lock or newly submit-triggered error flags |
| Sending -> Success | Explicit valid provider success, release navigation/dismissal lock |
| Sending -> Failure | Explicit negative/malformed response or transport error, retain input and release lock |
| Failure -> Sending | Explicit Retry same submitted input, one request and lock again |
| Success -> Close | Clear submitted draft/result; next open editing blank |
| Editing/Failure -> Close | Retain draft/result in memory |
| Sending -> Close/navigation | Block within app; no request cancellation/success claim |

No automatic retry, artificial timeout, completion popup or background persist.
Browser process termination/reload discards memory; server acceptance may be unknown,
so frontend must not promise exactly-once delivery under those conditions.

## Modal Route Context

Fields: background URL/view identity, relative reading/scroll offset, live focus origin,
verified owned opening history entry, direct-entry flag, activation generation,
code state idle/loading/ready/error and current overlay ownership.
Opening pushes `/contact` once; repeat opening is idempotent. Direct entry creates
Home background. Normal permitted dismissal returns to verified prior entry without
push; direct entry replaces with `/`. Same-app Back dismisses when unlocked; Forward
reopens with session state. Pending Back is cancelled/restored, not history-push spam.
Success Close resets; history-dismissed result can remain until explicit success Close.
Owner-approved amendment 2026-10-04: explicit failed-code Retry may cache-bust
the application-owned module load, without document reload or normal-load changes.
Activation generation and duplicate guards still apply; no contact data is included
in module URLs, and no contact POST is retried as a side effect.

## Provider Boundary

Outgoing Contact payload uses actual configured endpoint's documented encoding.
Incoming unknown response requires the provider's explicit success signal; current
code uses `success: 'true'`. Negative/missing/malformed success is failure.
Preserve status/reason for internal diagnostics without raw payload/contact input logs.
User-facing error remains approved text, not raw server output.
