# Bug Assessment: Fractional viewport height assertion

- **Slug**: viewport-height-rounding
- **Created**: 2026-10-04
- **Source**: pasted text
- **Verdict**: valid
- **Severity**: low

## Report

```text
Chrome Headless 154.0.0.0 (Linux x86_64) Virtual scroll demo explains explicit Start, loads only on acceptance and renders a bounded window FAILED
Error: Expected '262.188px' to be '262.2px'.
at src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts:77:47
```

## Symptom

The viewport acceptance test rejects a correctly constrained fractional CSS height
because it compares computed CSS text with an unrounded JavaScript calculation.
The difference is approximately 0.012px; no visible layout defect is demonstrated.

## Reproduction

1. Run the Virtual Scroll Demo component suite with Chrome Headless on Linux.
2. Use a browser viewport height yielding a fractional 60vh cap (the report's expected
   262.2px corresponds to 437px if there is no browser zoom).
3. Observe the exact-string height assertion fail on Chrome's quantized layout value.

The supplied report confirms the failure. Exact runner viewport/zoom configuration
is unknown; it is not required to identify the unsupported exact equality.

## Suspected Code Paths

- `src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts:77`:
  exact CSS height string assertion against `Math.min(400, window.innerHeight * .6)`.
- `src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.scss`:
  `.record-viewport` correctly uses border-box sizing, height 400px and max-height 60vh.

## Root Cause Hypothesis

High confidence: Chrome quantizes layout dimensions to subpixel units and serializes
the computed result rather than preserving the exact mathematical 60vh value.
The test requires stronger precision than CSS layout guarantees. The adjacent numeric
bounding-box assertion already tolerates fractional layout differences.

## Proposed Remediation

**Preferred**: Change only the test assertion to parse computed height and compare it
numerically with an explicit subpixel tolerance. Keep the actual bounding-box check
and verify the cap remains min(400px, 60vh). No production CSS change is needed.

**Files likely to change**:
- `src/app/interaction-lab/virtual-scroll/virtual-scroll-demo.component.spec.ts`

**Tests to add or update**:
- Exercise an actual fractional 60vh layout in a controlled viewport (437px high).
- Confirm the rounded computed value and actual geometry are within a small tolerance
  of 262.2px, while errors of one pixel or larger would still fail.
- Rerun the component suite to retain Start, virtualization and lifecycle coverage.

## Risks & Considerations

- Do not round to whole pixels or remove the height check.
- Keep tolerance below a pixel so a border-box sizing regression is detectable.
- The issue blocks tests, not user interaction; no data or security impact is indicated.

## Open Questions

- Exact Linux viewport/zoom configuration was not supplied.
- No additional edge cases were supplied. Proposed fractional viewport and one-pixel
  regression checks need approval before dependent fix work.
