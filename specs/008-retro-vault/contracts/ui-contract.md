# UI Contract: Retro Vault

Home owns `vault` and `vault-heading`; exact content is in
[content-contract.md](content-contract.md). Use
[cards006](../../006-blueprint-cards/contracts/card-contract.md) and
[global loading](../../002-sticky-shell/contracts/shell-contract.md#global-loading-amendment-2026-10-03).

## Grid and Content

All five valid projects render in current order without View more, intro, filters,
additional archive labels or "10-year" claim. Available-width sizing uses17.5rem
minimum tracks,1.5rem gaps,max3 columns. Narrow single column shrinks without overflow.
Use rem layout gaps; no forced root font size or new breakpoints. Apply spacing once,
not grid gaps plus old24px card margins.
Preserve exact content, full descriptions and all supplied tags; no images/placeholders.
Keyboard/focus/external-new-tab/Archived behavior is inherited, not reinvented.

## Loading and Feedback

Within20rem below viewport or explicit/direct activation loads Vault and bundled JSON.
Headings/anchors remain permanent. No separate asset-data fetch/live URL check.
During real loading use five inert aria-hidden skeleton shells with accessible status;
until skeleton code arrives, foundation static status is sufficient. No forced delay.
Skeleton palette is fixed under OS themes; reduced motion is static.

Code-load failure: This section couldn't be loaded. + Retry, scoped to Vault.
Collection validation failure: Projects couldn't be loaded. + Retry.
Genuinely empty source: No archived projects yet., no Retry.
Mixed malformed source: skip unusable records with diagnostic reasons, no visible warning.
Nonempty wholly rejected source is a data error, never empty success.
Diagnostics omit complete project payloads. Duplicate actions cannot start parallel loads.

## Shell and Lifecycle

Use Home navigation/reading-position owner, no URL/history writes from passive mount.
Direct fragment activates even outside observer range. Preserve unknown-fragment behavior.
Late imports do not mount after departure; loaded content persists during same-Home
fragment navigation. Retry is explicit, no automatic retry loop or global reload.

## Accepted Validation

Exact five-record contract; partial rejection; valid duplicate IDs; optional data omissions;
invalid/missing destination Archived; non-array/all-invalid/empty; module failure/Retry;
preactivation no Vault requests; direct activation; cancellation/late resolution;
320px/200%zoom/blocked fonts/enlarged font settings; reduced motion/fixed OS palette;
long full text/tags; grid-fit/rem gap; no duplicated headings/metadata or reading jump.
