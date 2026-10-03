# Feature Specification: Contact Modal

**Feature Branch**: `feat/blueprint`
**Created**: 2026-10-03
**Status**: Ready for planning
**Input**: Replace the Contact page with a route-addressable, lazy blueprint modal.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Compose a Contact Message (Priority: P1)

A visitor opens the bottom Contact action, enters a message and sees field validation.

**Why this priority**: Potential employers need a dependable contact flow.
**Independent Test**: Open with controlled routing and validate the existing fields.

**Acceptance Scenarios**:

1. **Given** Contact selection, **When** opened, **Then** `/contact` is pushed while
   the originating page stays underneath the focused modal.
2. **Given** direct `/contact`, **When** opened, **Then** Home is underneath; dismissal
   replaces the URL with `/`, not a navigation away from the site.
3. **Given** unsent input, **When** dismissed and reopened, **Then** its browser-memory
   draft remains; refresh clears it without persistent storage.
4. **Given** invalid input, **When** its field blurs, **Then** associated validation
   feedback appears. Submission must never send invalid input.

---

### User Story 2 - Send and Observe the Real Result (Priority: P1)

A visitor submits once, waits for the actual server response and sees success or failure.

**Why this priority**: Duplicate requests and false success are unacceptable.
**Independent Test**: Control pending/success/error responses without real contact sends.

**Acceptance Scenarios**:

1. **Given** valid input, **When** submitted, **Then** the form hides and the same
   modal shows Sending; duplicate submissions are blocked.
2. **Given** a pending request, **When** Close/Escape/backdrop dismissal is attempted,
   **Then** the modal remains open until a server response.
3. **Given** confirmed success, **When** received, **Then** the approved success message
   and Close appear, not success before the response.
4. **Given** failure, **When** received, **Then** explicit error, Retry and Close
   appear with retained inputs.
5. **Given** pending Send, **When** in-app navigation or same-app browser Back is
   attempted, **Then** the modal/route remains until the response without another send.
6. **Given** success, **When** Close is selected and Contact later reopened, **Then**
   submitted draft/result has cleared and a blank form appears.
7. **Given** a lazy Contact-code failure, **When** opening, **Then** accessible Retry/
   Close feedback appears while the underlying page remains usable after dismissal.
8. **Given** a short/narrow/enlarged viewport or blocked fonts, **When** used, **Then**
   the approved geometry scrolls internally and focus/controls remain reachable.

### Edge Cases

Confirmed earlier: bottom-only action; required name, email OR phone, message at least
25 characters; current email/phone rules; focus trap/restoration; draft retention;
same-dialog states; explicit retry and duplicate-send prevention.

Grouped confirmations on2026-10-03:
- Unsent/failed drafts remain browser-session memory only, refresh clears.
- Opening pushes `/contact` with current page underneath; dismissal returns without
  adding history; Back dismisses/Forward reopens when dismissal is permitted.
- Direct entry uses Home background and replacement dismissal to `/`.
- Geometry/copy below approved; field validation appears after blur, not newly triggered
  merely by submit.
- Lazy Contact code failure gives accessible Retry/Close while background stays usable.
- Navigating elsewhere during sending was also approved to dismiss while an app-owned
  request continues, with no automatic popup and result on next opening.

Final approval resolves the conflict: pending valid Send blocks Close/Escape/backdrop,
in-app navigation and same-app browser Back until the response. This supersedes both
earlier dismissal-while-sending and navigation-away exceptions. Browser tab close/
reload/cross-document departure cannot be reliably prevented or guarantee delivery.
After confirmed success, selecting Close clears submitted draft/result; next opening
is a blank form. Failure retains input/Retry. All necessary decisions are approved.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Route-addressable lazy Contact modal; bottom-only trigger, no sidebar duplicate.
- **FR-002**: Keep name required, email OR phone and message minimum25 characters,
  existing email/phone validity rules; no new field limits.
- **FR-003**: Trap focus and restore it on permitted dismissal; Escape/backdrop/Close
  dismiss except during the newly confirmed pending-send lock.
- **FR-004**: Keep unsent/failed draft in memory only for browser session; no localStorage.
- **FR-005**: Send hides form, shows Sending, blocks duplicates and locks modal
  dismissal until server response. Show only real success; errors retain input/Retry.
- **FR-006**: Use history/background/direct-entry behavior confirmed above.
  Pending send also blocks in-app navigation and same-app browser Back; release
  dismissal/navigation only after actual response or explicit request failure.
- **FR-007**: Center modal at32rem maximum width,1.5rem padding/gaps,1rem viewport
  clearance and maximum height viewport minus2rem; internally scroll on short windows.
  Fixed foundation input/dialog/backdrop/focus/feedback styles remain authoritative.
- **FR-008**: Title "Let's connect"; introduction "Have a project or job opportunity
  in mind? Send me a message." Success "Your message has been sent. I will get back
  to you soon." Error "Your message couldn't be sent. Please try again."
  Apostrophe typography may use the approved displayed curly form without rewriting copy.
- **FR-009**: Show field errors after blur and associate them with the corresponding
  fields; don't introduce submit-triggered field-error display.
- **FR-010**: Lazy-code failure retains background and accessible modal Retry/Close.
- **FR-011**: After confirmed success, selecting Close clears submitted draft/result;
  next opening is blank. Failure dismissal keeps the failed input and Retry state.
- **FR-012**: Controlled-response tests observed failing before implementation;
  keyboard/narrow/zoom/fonts/reduced-motion behavior and real state transitions required.
- **FR-013**: Planning only: no application changes/install/task execution/commit/
  publication. Task generation was separately approved on 2026-10-03.
  Existing CI safeguards remain mandatory and release version unchanged.

### Key Entities

- **Draft**: Existing contact fields retained in session memory.
- **Submission**: App-owned input snapshot, pending/result and duplicate guard.
- **Modal route context**: Underlying destination, opening history context and focus origin.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At most one contact request per active send operation; zero premature success.
- **SC-002**: Close/Escape/backdrop cannot dismiss while pending; post-response dismissal works.
- **SC-003**: Draft survives permitted dismissal without persistent browser storage.
- **SC-004**: One bottom trigger, trapped/restored focus and approved viewport-fitting geometry.

## Assumptions

- Foundation001/amended shell002 precede implementation; current contact backend remains.
- Sending lock starts only after valid submission; invalid clicks cannot create a permanent lock.
- Full-tab close/reload cannot be guaranteed preventable by a web app; no fake delivery claim.
- No invented timeout/delivery claim: full-tab close/reload/external history departure
  is outside reliably enforceable same-app navigation guards.
