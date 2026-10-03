# Tasks: Contact Modal

**Input**: All artifacts in `specs/010-contact-modal/`; latest pending-navigation lock
supersedes earlier navigation-away permission. Generation only; no live sends.

## Phase 1: Setup

- [ ] T001 Verify001/002/012 and runnable CDK/router/HTTP fixtures through specs/010-contact-modal/quickstart.md;007/009 background regressions must be covered before final completion.
- [ ] T002 Repair standalone imports/providers in src/app/contact-module/contact/contact.component.spec.ts and establish actual history/overlay baseline in src/app/shared/contact-modal-host.spec.ts before behavioral red.

## Phase 2: Foundational

- [ ] T003 Capture current validators/provider encoding/success contract using src/app/contact-module/contact/contact.component.ts, src/app/contact-module/services/contact.service.ts and synthetic tests; don't copy endpoint/contact data into logs/docs or change phone regex/trim/limits silently.
- [ ] T004 Add state/lock/session scaffold tests in src/app/contact-module/services/contact-session.service.spec.ts for editing/sending/success/failure and immutable input; no actual POST or accepted session implementation in scaffold.

## Phase 3: US1 - Compose a Contact Message (P1, MVP)

**Independent test**: Route-lazy one dialog retains background/draft, correct current
validators/blur-only errors and allowed history/focus behavior.

- [ ] T005 [P] [US1] Add failing required-name/email-or-phone/message24-25/current-phone10-15/email/blur-not-dirty-submit/draft tests in src/app/contact-module/contact/contact.component.spec.ts.
- [ ] T006 [P] [US1] Add failing ordinary/direct /contact/open-once/unlocked Back-Forward/background/focus/code-error tests in src/app/shared/contact-modal-host.spec.ts plus dialog geometry/inert-background/Tab-ShiftTab-trap/320px-zoom-font-static-motion cases in an independent src/app/contact-module/contact/contact-dialog.spec.ts before T010-T013 changes overlay presentation.
- [ ] T007 [US1] Observe T005-T006 intended failures and record in specs/010-contact-modal/quickstart.md before form/modal routing edits.
- [ ] T008 [US1] Introduce nonnullable typed controls/current rules in src/app/contact-module/contact/contact.component.ts and models/contact.model.ts: required name, valid optional email/phone, "at least one contact channel", message required/min25; blur/touched owns errors, invalid submit never POSTs/locks or touches every field.
- [ ] T009 [US1] Implement memory-only editing draft/blur-state in src/app/contact-module/services/contact-session.service.ts; no URLs/history/localStorage/log payloads, refresh clears, permitted editing/failure dismissal retains input.
- [ ] T010 [US1] Build one labelled CDK aria-modal dialog in src/app/contact-module/contact/contact.component.{ts,html,scss} with exact approved title/intro, field labels/autocomplete/errors,32rem max/1.5rem padding-gaps/1rem clearance/viewport-minus2rem internal scroll; inert background/focus trap/name focus/restore, keeping valid Send unavailable until US2 provider/lock red-green gates pass.
- [ ] T011 [US1] Implement lightweight root route/background/opening-history ownership in src/app/shared/contact-modal-host.ts and src/app/app.component.{ts,html}; ordinary opening pushes once/keeps live Home-detail, direct entry Home/dismiss replace '/', no eager Contact/CDK form graph.
- [ ] T012 [US1] Wire lazy /contact integration in src/app/app.routes.ts, unlocked dismissal to verified owned prior entry without push and Forward reopen in contact-modal-host.ts; live trigger focus or page fallback, background metadata unchanged.
- [ ] T013 [US1] Implement eager accessible code-load Retry/Close failure surface in src/app/shared/contact-modal-host.ts; actual failed-loader Retry/duplicate guard/generation no late mount after close, no cache-busting/global reload.
- [ ] T014 [US1] Verify compose/draft/history/focus/blur semantics in src/app/contact-module/contact/contact.component.spec.ts and contact-modal-host.spec.ts; one bottom trigger/no sidebar/metadata duplicates.

## Phase 4: US2 - Send and Observe Real Result (P1)

**Independent test**: One valid immutable POST, all pending dismissal/navigation/
same-app Back blocked, true provider response only, retained failure Retry/reset success.

- [ ] T015 [P] [US2] Add failing true-string/negative/missing/malformed/HTTP200/network/outgoing-encoding tests in src/app/contact-module/services/contact.service.spec.ts, using documented provider contract and synthetic payloads only.
- [ ] T016 [P] [US2] Add failing immutable snapshot/duplicate Retry/lock-response-release/success-Close-clear/failure-retention tests in src/app/contact-module/services/contact-session.service.spec.ts.
- [ ] T017 [US2] Add actual pending Back URL/history-index/route/Escape/backdrop/Close/state-focus failures in src/app/shared/contact-modal-host.spec.ts and src/app/contact-module/contact/contact.component.spec.ts; record T015-T017 red in specs/010-contact-modal/quickstart.md before send/guard edits.
- [ ] T018 [US2] Correct typed payload/guarded unknown provider response and required actual encoding in src/app/contact-module/services/contact.service.ts; success signal remains explicit documented success === 'true', arbitrary200 not success, negative/protocol/transport failure explicit without raw payload logs.
- [ ] T019 [US2] Implement app-owned one pending subscription/immutable input snapshot and state transitions in src/app/contact-module/services/contact-session.service.ts; acquire lock before POST/Retry, response/error releases, no automatic retry/timeout/overlay-cancel/popup/delivery guarantee.
- [ ] T020 [US2] Render same-dialog Sending/form-hidden/disabled Close, approved success/error/Retry/Close and programmatic state-heading focus in src/app/contact-module/contact/contact.component.{ts,html}; success explicit Close clears input/result, history-dismissed success may persist, failure keeps submitted input.
- [ ] T021 [US2] Wire eager lightweight pending lock to root guard/history restoration in src/app/shared/contact-modal-host.ts and src/app/app.routes.ts; prove Angular22 cancelled-popstate actual URL/index restoration, no pushState spam/popstate preventDefault fiction/eager form imports.
- [ ] T022 [US2] Guard Close/Escape/backdrop and same-app navigation/Back in src/app/contact-module/contact/contact.component.ts and contact-modal-host.ts until response; invalid submit no lock, full-tab reload/close/cross-document departure outside guaranteed protection.
- [ ] T023 [US2] Verify native synthetic-delayed sending lock/unlocked restore, Tab-ShiftTab trap/inert background/state focus/internal scroll/static motion at320px/200%zoom/short windows/fonts using specs/010-contact-modal/quickstart.md.
- [ ] T024 [US2] Verify retained007 listing/009 detail mounted underneath Contact and unchanged metadata/reading position through src/app/app.routes.spec.ts, src/app/home/home.component.spec.ts and src/app/work-module/work/article-page/article-page.component.spec.ts; no second POST on reopening.

## Phase 5: Polish and Cross-Cutting

- [ ] T025 Run combined Contact/session/service/host/root/Home plus affected007/009 suites from specs/010-contact-modal/quickstart.md; controlled provider only, no live sends.
- [ ] T026 Record red-green/native/provider-encoding/history/focus evidence in specs/010-contact-modal/quickstart.md; audit privacy/lazy graph and leave backend/resources/version/publication unchanged.

## Dependencies and Execution Order

012 ->001 ->002 ->010 core;007/009 must exist before final T024 background acceptance.
Recommended integration order009 ->010 avoids simultaneous root/route writers.
Setup -> foundation -> US1 -> US2 -> polish; pending guard implementation waits for
T017 native-history red, not merely a mocked guard false.

## Parallel Examples

US1 T005/T006; US2 T015/T016 after US1, join with T017. Host/root/router changes
serial; native phone/blur and sending-history observations independent after T022.

## Implementation Strategy

US1 compose-only development MVP; do not enable live sending before verified US2
lock/provider semantics. No publication or false exactly-once/offline guarantee.

## Requirement Coverage

| Requirement keys | Task IDs |
|------------------|----------|
| FR-001 | T006-T007, T010-T014, T024 |
| FR-002, FR-009 | T003, T005, T007-T008, T014 |
| FR-003, FR-007; SC-004 | T006-T007, T010-T014, T017, T022-T023 |
| FR-004; SC-003 | T004-T007, T009, T014, T016, T019-T020 |
| FR-005, FR-006; SC-001, SC-002 | T006-T007, T011-T012, T015-T023 |
| FR-008 | T010, T017, T020 |
| FR-010 | T006-T007, T013-T014 |
| FR-011 | T016-T017, T019-T020, T022-T024 |
| FR-012, FR-013 | T001-T007, T017, T023-T026 |
