# Validation Guide: Articles Section

For later implementation only; no installation/test/browser command was run in planning.

## Prerequisites

Complete styles001/shell002/cards006. Establish runnable Jasmine/Karma standalone/HTTP
baseline; missing providers, dependency/browser errors are not failing behavioral evidence.
Reuse or establish the boneyard Angular22 smoke check from004 before dependent rendering.
No force-peer workaround, silent substitution, live Dev.to fixtures or publication.

## Red Before Green

Write session/HTTP/component expectations from [contract](contracts/listing-contract.md)
and observe missing-behavior failures before production changes. Include ten usable cards,
source-page continuation, accurate more-state, undated deferral, atomic retry and focus.
Test setup must succeed before assertions are treated as red evidence.

## Targeted Runner

After the planned tests exist:

```sh
npm test -- --watch=false --browsers=ChromeHeadless \
  --include='src/app/work-module/work/articles/*.spec.ts' \
  --include='src/app/work-module/services/articles.service.spec.ts' \
  --include='src/app/work-module/work/card/*.spec.ts' \
  --include='src/app/work-module/work/article-page/*.spec.ts' \
  --include='src/app/home/*.spec.ts'
```

Adjust only to actual test paths. Escalate scope on integration regressions. Respect
main-only build/deploy policy and separate CI prerequisites; no deployment in this feature.

## Expected Evidence

- 0/1/9/10/11/20/21 accepted-record fixtures prove exact batch counts and button removal.
- Raw10 with rejects/duplicates fetches further pages; filtered short counts never
  falsely signal exhaustion. Undated articles are deferred until after all dated ones.
- Missing title/wrong owner rejects record without visible warning; malformed envelope
  is error. Nonempty all-rejected source is retryable data error, not empty success.
- Partial batch/request or lookahead failure preserves displayed list and staged progress;
  Retry succeeds without re-fetching completed pages, duplicating cards or losing records.
- Repeated clicks do not start duplicate chains; network/rate limits show explicit retry;
  route destruction cancels/ignores late work.
- Approved card/detail behavior and one shell heading/metadata ownership remain intact.

## Native Browser Checks

Using controlled responses, inspect grid widths in split and stacked shell layouts,
17.5rem minimum/1.5rem gap/maximum3 columns, 320px, 200% zoom and enlarged root user
settings without forcing root size. Test long text/tags, blocked fonts, both OS palette
preferences and reduced motion. Confirm static skeleton and no card image requests.
Keyboard View more focuses the first appended link or Archived heading; no permanent
extra Tab stop. Verify actual scroll ownership, no history write and no shell correction
undoing append movement. Do not count mocked focus/scroll calls as complete native evidence.
