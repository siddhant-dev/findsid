# Validation Guide: Final Integration and Release Alignment

Execution was requested on 2026-10-04, after route retirement011. The readiness
assessment below is blocked; no version alignment or publication has occurred.
Execution permission does not override the explicit readiness/final-SHA approval gates.

## Owner Follow-up (2026-10-04)

The owner will perform actual desktop/mobile browser acceptance manually and report
bugs. This assigns responsibility; it does not claim the matrix has passed. Record
the tested revision, browser/device versions and results when supplied. Automated
fixtures and controlled acceptance checks remain part of implementation.

The owner also requested completion of prior feature tasks and the remaining
CI/release conditions, with clarification for conflicts. Historical requirements
to observe failures before an already-completed implementation cannot be satisfied
by a new green run or retrospective red run. A narrowly scoped governance decision
is required before treating those historical gaps as resolved. Existing evidence
must remain intact; future behavior changes still require test-first delivery.

Remote safeguards currently lack verified administrative access. Requiring checks,
changing bypass/force-push/deletion/merge-queue rules, cancelling legacy publication
or creating/merging a PR must be explicitly scoped before execution. No remote
administrative operation, commit, merge, version bump or publication is implied by
this follow-up. Final publication approval remains separately bound to the main SHA.

## Current Readiness Assessment (2026-10-04)

**State: implementing / blocked, not integrated ready.** Baseline commit:
`26418f2389f70d2a531d45780bb290ecaf1b017b`, branch `feat/release-check`.
The tested working tree includes the uncommitted011 retirement changes; it is not
an approved immutable release candidate. Read-only remote lookup reported main at
`62f5db7a6f2be1002b931352afaabee3f49cf48c`; this is not evidence that this working
tree is on main, protected, built or deployed.

Both011/013 requirements checklists passed16/16 without edits. Pre-implementation
hooks parsed successfully with none registered. Node22.23.1 and the existing
ChromeHeadless153.0.8010.12 runner are usable. No installation was needed.

### Prerequisite Traceability

Each row references that feature's `contracts/`, `tasks.md` and `quickstart.md`.
Checked tasks alone do not prove current five-browser or remote CI acceptance.
Older Resume/art expectations in001/002 are superseded by011; retirement does not
repair their historical test-first evidence.

| Feature | Contract/evidence area | Checked / total | Readiness finding |
|---------|------------------------|----------------:|-------------------|
| 001 | Fixed palette, typography, canvas and shared states | 20/25 | Original baseline/red chronology and native preservation evidence remain open |
| 002 | Shell,20rem lazy activation, sections/history and generated badge | 14/29 | Acceptance/red chronology and permitted production-chunk evidence remain open |
| 003 | Exact About content | 14/14 | Feature evidence recorded; final browser matrix still required |
| 004 | Start-only100k records and bounded window/memory proxy | 27/27 | Feature evidence recorded; final browser matrix still required |
| 005 | Exact Experiences content/cards | 16/16 | Feature evidence recorded; final browser matrix still required |
| 006 | Blueprint cards and safe native links | 24/24 | Feature evidence recorded; final browser matrix still required |
| 007 | Paging/checkpoints/return and append ownership | 26/26 | Feature evidence recorded; final browser matrix still required |
| 008 | Exact Vault content/deferred source/states | 21/21 | Feature evidence recorded; final browser matrix still required |
| 009 | Sanitized detail, metadata, return and real code Retry | 26/27 | Original T004 source-guard red gate remains unfulfilled |
| 010 | Fullscreen Contact/draft/send/history/focus/retry | 22/26 | Four historical pre-implementation evidence gates remain unfulfilled |
| 011 | General retired fallback/exact active aliases/cleanup scope | 16/16 | Completed in this run; native controlled retirement checks pass |
| 012 | Test-only PR/main build/manual SHA-bound publication | 13/24 | Remote migration/protection/real CI evidence and remaining acceptance tasks open |

There are36 unchecked prerequisite tasks across001/002/009/010/012. Some are
historical procedural gaps, others require fresh acceptance/settings evidence.
Passing later tests cannot retroactively satisfy a required pre-implementation red
gate. No prerequisite task/checklist was silently closed as part of this assessment.

### Automated Baseline and Existing Evidence

The full repository command passed191 Jasmine tests and12 Node checks
(`release-baseline.log` in the session). It includes the actual workflow semantic
tests, version generator tests, dataset generator/count checks, and rendered Lab
tests asserting zero dataset requests before Start and a bounded record window
after controlled100k data loading. All external responses are controlled.
This green baseline is not proof of all prerequisite acceptance or publication.

`node scripts/generate-app-version.mjs --check` passes. Package version, lockfile
top-level/root-package versions and generated constant all remain0.9.9; the badge
still derives from that constant. No26.0.0 expectation was implemented before the
mandatory T011 readiness gate.

The local production budgets remain exactly1MB/2MB initial warning/error and
3KB/4KB per-component style warning/error. No full application production build was
run on this non-main branch. Current permitted main build/production-chunk evidence
is unavailable; local test compilation/preview is not a substitute.

### Browser/Device Matrix

| Required category | Available observation | Acceptance status |
|-------------------|-----------------------|-------------------|
| Desktop Chrome | Automated Chromium153.0.8010.12;011 native direct/refresh/history/lock checks pass | Supplemental evidence only; complete current-stable matrix not run |
| Desktop Firefox | No installed automation binary or actual Firefox test evidence | Blocked |
| Desktop Safari | Local Safari27.0 is installed; not exercised in this run | Blocked pending actual Safari acceptance |
| Mobile Safari | No actual iOS device/version/journey evidence available in this session | Blocked |
| Mobile Chrome | No actual Android device/version/journey evidence available in this session | Blocked |

Existing feature010 Chromium evidence includes real200% zoom,320px/short windows,
blocked fonts, reduced motion, native send/history/focus and actual entry/dependency
Retry. Those checks do not stand in for Safari/Firefox/mobile engines or a complete
new-candidate matrix at320px/1023px/1024px.

### Remote Safeguards and Execution Boundary

GitHub connector commit/main-run lookups returned404. An alternate public GitHub
branch API lookup also returned404; authenticated git remote lookup revealed only
the main SHA. No readable protection/ruleset/current-revision required-check evidence,
blocked-failing-PR observation, fork/merge-queue/bootstrap confirmation or matching
main test/build run was obtained. Local YAML and semantic tests do not prove these
owner-controlled settings. No remote setting or workflow run was modified.

T001/T002 prerequisite assessment cannot establish readiness, so dependent release
implementation stops here. The baseline suite is recorded without claiming T003-T011
or the five-browser matrix complete. Version tasks T012-T014 remain gated. No new
release-management service or fixture-only manual-procedure test was invented.
Controlled recovery rehearsal T020-T022 is still required before final-SHA approval
T016; no publication/tag/release/rollback was attempted.

To resume: resolve or obtain an explicit governed decision on historical prerequisite
evidence gaps, complete outstanding acceptance and remote CI safeguards, provide
actual browser/device evidence and a permitted matching main build. Only then may
the versioned candidate be prepared and separately approved for publication.

## Prerequisites and Red Evidence

001-012 implemented with test-first evidence and verified012 protection/settings.
Supported Node/Chrome runner, actual approved browsers/devices, controlled external
fixtures and existing002 generator. Establish missing runnable tests; observe intended
integration/release failures before corresponding fixes. Setup failures are not red.

## Intended Automated Commands

After planned tests/scripts exist:

```sh
node --test scripts/generate-app-version.test.mjs scripts/release-alignment.test.mjs
node scripts/generate-app-version.mjs --check
npm test -- --watch=false --browsers=ChromeHeadless
```

Full suite includes012 policy tests. Production build evidence comes from main
automation only; no PR production build/deployment. Check existing budgets unchanged.

## Integrated Browser Matrix

Record versions/devices for desktop Chrome/Firefox/Safari and mobile Safari/Chrome.
Test exact ordered content, wrapping navigation,320px/1023px/1024px/200% zoom/short
windows, blocked fonts, reduced motion, code-load Retry/teardown and delayed reading
position. Check root-font20rem activation and zero100k dataset requests before Start.
Validate real bounded DOM/visibility timing without invented performance guarantees.

Exercise direct/unknown fragments, Back/Forward, retired/active aliases, detail/list
snapshot, sanitization, external safe links, Contact direct entry/history/drafts,
blur validation and native pending-send lock with controlled responses. Existing
feature quickstarts remain exact expected-output authorities. Missing browser access
blocks acceptance; emulation alone does not prove mobile Safari/Chrome.

## Version and Release Gates

After integrated readiness, verify26.0.0 in package/lock/generated constant and v26.0.0
badge. Rerun checks; final main validation/build and owner approval refer to candidate
SHA. Simulate stale main, failed tests/build/provider, uncertain provider, conflicting
tag and record retry without real deployment.

Only after explicit final approval, owner manually uses012 publication. Confirm
provider outcome and non-destructive live version/route smoke; never send a test contact
message. Then record tag/GitHub release at captured deployed SHA. Assert no successful
record before deployment and no automatic rollback.

## Recovery

Simulate failed publication diagnosis/current-gate retry and published regression
tested main PR/next patch/new approval. Verify old tag is unchanged. Deployed-but-
unrecorded case completes matching record idempotently, not arbitrary redeployment.
Record passing controlled recovery tests/rehearsal T020-T022 before publication
approval T016; phase numbering is not permission to publish before this gate.
No release completion claim until acceptance, deployment and recording are evidenced.
