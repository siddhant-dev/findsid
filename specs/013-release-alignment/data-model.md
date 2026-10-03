# Release State Model

## Readiness Evidence

Fields: candidate SHA,001-012 case references, automated results, browser/device/version,
network/font/motion/zoom cases, CI protection/build evidence and unresolved blockers.
Evidence belongs to tested revision; revised candidate reassesses affected evidence.
No missing category can be represented as passing.

## Release Identity

Fields: version26.0.0, package/lock/generated equality, main SHA, final owner approval,
fresh CI run, deployment outcome, tag SHA and GitHub release/tag.

States:

1. Implementing -> integrated ready: prerequisites and acceptance satisfied.
2. Integrated ready -> versioned candidate: aligned metadata, rerun checks.
3. Versioned candidate -> approved: explicit final-revision owner approval.
4. Approved -> deploying:012 fresh same-SHA gates succeed.
5. Deploying -> failed/uncertain or confirmed deployed.
6. Confirmed deployed -> recorded: matching immutable v26.0.0 tag/GitHub release.

Record failure leaves deployed/unrecorded, not complete. Correct existing same-SHA tag
can support retry; conflicting identity blocks. Never move/reuse published tag at new SHA.
Main advancement before publication rejects stale candidate. Main advancement afterward
does not change the captured deployed SHA used for recording.

## Recovery Candidate

Fields: regression reproducer, targeted revert/fix PR, next patch/versioned main SHA,
test evidence and new owner approval. Initial2026 recovery patch is26.0.1; later patch
increments follow last recorded release, not a permanently hard-coded recovery value.
No automatic rollback state or unvalidated older-artifact deployment exists.
