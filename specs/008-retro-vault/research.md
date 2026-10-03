# Research: Retro Vault and Global Lazy Loading

Repository inspection/user approvals on2026-10-03. No installation/runtime validation.

## Approved Content

**Decision**: Retain exact five projects/current order in content contract.
**Rationale**: User explicitly approved existing text/dates/tags/URLs.
**Alternatives**: Reference sample/10-year claim, chronological sorting, copy correction.
Rejected or unapproved; do not infer Tic Tac date or correct Charcter.
**Evidence**: `src/assets/data.json`, approved content contract.

## Bundled JSON and Deferred Code

**Decision**: JSON module belongs to Vault's dynamically imported dependency graph.
**Rationale**: User wants permanently bundled content and app-wide priority loading;
current AppService separately requests `../../assets/data.json`.
**Alternatives**: Eager root JSON import (defeats lazy strategy), runtime asset HTTP
(unnecessary separate request), hardcoded replacement array (duplicates authoritative data).
**Execution check**: Verify TypeScript JSON module support and Angular chunk factoring;
make only required configuration changes if needed in implementation. Do not assume
source syntax proves the data is outside initial bundles.

## Global Loading Authority

**Decision**: Eager styles/shell/About; deferred Lab/Experiences/Articles/Vault activated
within20rem below viewport or immediately by explicit/direct navigation. Detail/Contact
remain route-lazy. No all-feature background preload.
**Rationale**: Confirmed fastest-useful-first-content direction; preserve permanent anchors.
**Alternatives**: Only Vault lazy (user rejected), all eager, arbitrary scroll delays.
**Evidence**: amended shell002 contract and specs/plans001-007.
Convert rem using current computed root font size for observer API margins. Dynamic import
cannot necessarily be physically cancelled; invalidate owner before resolution can mount.
Chosen loading state must support explicit failure/Retry; do not assume framework lazy
block errors are automatically retryable. No new numerical placeholder height approved.

## Validation

**Decision**: Skip unusable individual records; diagnostics, no omission warning;
first accepted valid duplicate ID retained; malformed/all-unusable source -> data error.
**Rationale**: User overrode proposed full-collection rejection. Shared-card optional
fields/destination behavior applies; missing URL is Archived, not unusable.
**Alternatives**: Entire mixed batch rejection, fabricated fallback title, silent empty.
Rejected. Current approved source has all five valid records; tests inject malformed data.

## Presentation/Dependencies

**Decision**: All accepted cards visible, approved Articles grid and five skeleton shells
only during real active loading. Reuse boneyard research/smoke check from004/007.
**Rationale**: User approved grid and conditional skeletons for lazy loading.
**Alternatives**: View more/paging, intro/filters, forced loading delay. Not approved.
**Sources**: [library research](../004-virtual-scroll-lab/research.md),
[grid contract](../007-articles-section/contracts/listing-contract.md).
No library runtime compatibility or timing improvement has been measured in planning.
