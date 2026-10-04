# Data Model: Virtual Scroll Interaction Lab

## MockRecord

Fields: `id` positive safe integer; `name` and `description` nonempty strings.
Dataset: exactly 100,000 records with IDs 1..100000 unique; original neutral text.
Validation consumes unknown JSON, rejects wrong shape/count/type/duplicate/missing values
as a whole, never drops records quietly.

## QuerySelection

Fields: trimmed search, sort field (`id`/`name`), direction (`asc`/`desc`), generation.
Default: empty search, ID ascending. Name/description case-insensitive substring OR
matching; no regex interpretation. ID numeric sort; name deterministic lexical sort
with ID ascending as tie-breaker. Dataset never mutates.

## DatasetSession

Fields: state, validated data, ordered matching result, current generation, active
request/query/adapter work.
Transitions: idle -> loading -> ready/error; ready -> querying -> ready/empty/error;
error -> retry -> loading (asset failure) or querying (cached operation failure);
reset -> current-generation default query; any -> disposed.
Only successful validated data is cached. Asset retry refetches; cached query/reset
does not. Route destruction releases demo memory and work.

## Measurement

Fields: generation, operation label, start timestamp, nullable first-row elapsed ms,
current rendered-record count. Finish only on visible attached current-generation row.
Empty/error shows not applicable, not zero/fake success. Superseded measurements
cannot overwrite latest state.

## EstimatedRowMemorySavings (2026-10-04 amendment)

Derived nullable percentage: `(1 - rendered-record count / matching-record count) * 100`.
Only available for current-generation ready results with positive counts and rendered
count no greater than match count. Zero is valid; loading/empty/error/stale states have
no estimate. Equal per-row memory is assumed. This is a row-count proxy, not measured
RAM, and excludes shared dataset/page/library memory. Replaces historical project claims.
