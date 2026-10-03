# Quickstart Validation: Sticky Portfolio Shell

This is a later implementation guide, not evidence the shell exists or tests pass.

## Prerequisites

**Global loading amendment checks (2026-10-03)**: Test immediate eager About with
unactivated sections outside the approved20rem range, no early article/Vault/Lab
dataset request, explicit/direct fragment activation and route-lazy detail/Contact.
Fixtures must place section sentinels realistically: initially clustered headings
may be within range and legitimately activate; do not assert all lazy sections always
stay unrequested on entry. Verify current-root-font20rem conversion, real code-load
failure/section-only Retry, duplicate guard, destroyed-owner late resolution and
reading-position preservation. No artificial skeleton delay/placeholder height.
Use controlled loaders/responses; inspect actual chunk factoring under permitted
main-only build validation, not source imports as a proxy for initial bundle size.

Complete feature 001. Establish Angular 22-compatible Node/npm and the existing Karma
browser runner; restore packages only after missing-dependency failure. Apply separately
scoped CI safeguards before PR automation. No deploy or live contact/Dev.to requests.
Run commands from repository root.

## Red Before Implementation

Write new root/Home/navigation/route/version tests before production changes.
Use existing RouterTestingHarness, HTTP test providers and deterministic observation fixtures.

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include=src/app/app.component.spec.ts \
  --include=src/app/app.routes.spec.ts \
  '--include=src/app/home/**/*.spec.ts' \
  --include=src/app/work-module/work.routes.spec.ts
```

Observe intended failures: missing ordered stream/new identity/footer/version, incorrect
legacy routes, absent fragment/history behavior. Dependency/config/browser errors are
not valid red evidence. Keep current detail/contact baseline assertions independently green.

## Green and Version Freshness

After implementation, rerun the combined selection, then:

```sh
node --test scripts/generate-app-version.test.mjs
node scripts/generate-app-version.mjs --check
npm test -- --watch=false --browsers=ChromeHeadless
```

Version tests use temporary fixture manifests, never edit the real package release.
Expected: badge derivative matches package.version, all affected suites green.
Direct `ng` users must run generation/check rather than bypass freshness validation.

## End-to-End Browser Scenarios

```sh
npm start -- --host 127.0.0.1
```

Confirm local server responds before inspection. Use controlled/delayed article responses.
Stop only the specific preview process started for this task when finished.

| Scenario | Expected outcome |
|----------|------------------|
| 1024px/1280px desktop | Blueprint canvas, sticky identity beside ordered stream |
| 320px/1023px | Stacked content; five visible wrapping links; no horizontal page scroll |
| Short desktop and 200% zoom | All identity text/links reachable; sticky disables if needed |
| Five section clicks | Correct fragments; one history entry per changed destination |
| Same-target click | Scroll without another history entry |
| Passive scroll | Deterministic active link/aria-current; no URL/history writes |
| Direct fragment/refresh | Correct rendered target; no arbitrary network wait |
| Unknown fragment | Top; no forced URL change |
| Back/Forward | Restores section; no extra entry or competing scroll |
| Delayed content above Vault | Reading offset retained; no unexpected jump |
| User interrupts scroll/correction | No later stale snap-back |
| Legacy aliases | Three correct canonical URLs; alias not an extra Back step |
| Article detail/contact/resume/art | Existing routes usable; no alias hijack |
| Contact and icons | Bottom-only Contact above five accessible safe profile links |
| Version | Exact current package.version, no sample SYS.ARCH version |
| Lab/Experiences | Titled empty containers; no invented demo/employment facts |
| Reduced motion/fonts blocked | Instant scroll; readable fallback; no decorative animation |
| Dev.to response states | Controlled success/loading/empty/error; errors distinct from empty |
| Teardown/remount | Observers/timers disposed; no duplicate requests or stale metadata |

Automate testable cases before dependent implementation. Router mocks/harness can verify
intent and resolved URLs, but alone do not prove native sticky geometry, popstate scroll
or media-query behavior. Use real-browser assertions; manual preview supplements them.

See [shell-contract.md](contracts/shell-contract.md) for exact content/values and
[data-model.md](data-model.md) for transition ownership.

No tasks or release generated here. Full build belongs to constitution-compliant main-only
automation; publication remains held until the entire redesign is approved.
