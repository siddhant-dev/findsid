# Bug Assessment: Article detail shows only load error

- **Slug**: article-detail-load-failure
- **Created**: 2026-10-04T16:48:25+05:30
- **Source**: pasted text and attached screenshot
- **Verdict**: likely valid, needs reproduction
- **Severity**: high

## Report (verbatim or summarized)

> it is not working I can only see this

The screenshot shows the dedicated reading surface with "Back to Articles",
"Article couldn't be loaded.", an unstyled full-width Retry button, and the shared
Contact/social footer. No article header or body is visible. The visible browser
address includes `/work/articles/805`; the full address/ID is not reliably legible.
The user approved the proposed slug on 2026-10-04.

No report URL was supplied or fetched. No live Dev.to probe was performed; feature
009 requires controlled fixtures rather than live-source test oracles.

## Symptom

Opening an article displays a data-load error instead of its complete reading
content. This is not the previously documented route-chunk error: the screenshot
shows the detail component's data-error message, not "This page couldn't be loaded."

## Reproduction

1. Open an article detail route as shown in the screenshot.
2. Observe "Article couldn't be loaded." and no article content.
3. Inspect the browser console for `Article request failed:` and the Network
   response for the corresponding `https://dev.to/api/articles/<id>` request.

[NEEDS CLARIFICATION: Exact article ID, response status and response field types
have not been captured from the affected browser.]

For a controlled candidate reproduction, supply otherwise valid requested-ID,
`siddev` owner, title and HTML body with a string-valued `tag_list`. The current
guard rejects that value before body rendering; this follows directly from the
array-only `cardTags` implementation but has not been executed as a regression
test during this assessment.

## Suspected Code Paths

- `src/app/work-module/services/articles.service.ts:80-83` — detail response is
  passed to the same reader used for listing responses.
- `src/app/work-module/services/articles.service.ts:121` — that reader always
  normalizes `tag_list` with the shared array-only card tag helper.
- `src/app/work-module/models/card.model.ts:28-33` — any non-array tag value
  throws `Tags must be a list of text labels`.
- `src/app/work-module/services/articles.service.ts:126` — logs and propagates
  request/validation errors.
- `src/app/work-module/work/article-page/article-page.component.ts:78-83` —
  errors other than 404/wrong-owner become the exact message in the screenshot.
- `src/app/work-module/services/articles.service.spec.ts:17` — the shared
  synthetic source fixture represents `tag_list` as an array for both listing
  and detail tests; no detail-specific string-tag case exists.
- `src/app/work-module/work/article-page/article-page.component.html:40` —
  Retry has only the typography class `navigation-text`, not `blueprint-button`.
- `src/styles.scss:143-148,170-172` — typography styling does not supply the
  shared button treatment, explaining the screenshot's default-looking Retry.

## Root Cause Hypothesis

**Confidence: medium for the reported failure; high for the guard behavior.**
The detail reader assumes the listing endpoint's tag representation. If the
affected detail response contains a string-valued `tag_list` (with its labels
available as an array in `tags`, or as a comma-separated tag list), `cardTags`
throws before the otherwise usable HTML can render. Repeating Retry would
repeat this deterministic response-validation failure. The tests reused a
listing-shaped fixture for detail and therefore cannot detect this mismatch.

The screenshot establishes a data-error state but cannot distinguish this
hypothesis from a network/429/other malformed-response failure. Inspect the
actual logged error or confirm the endpoint contract before claiming the
specific root cause is reproduced.

The Retry appearance is separately grounded in its missing shared button class.

## Proposed Remediation

**Preferred**: Give detail mapping endpoint-specific tag normalization without
weakening the listing or shared card validators. Confirm the detail tag contract,
then normalize its supported array/string representations into the existing
readonly label array. Preserve all supplied labels/order and use the existing
blank-label filtering. Retain strict requested-ID, owner, title/body and HTML
sanitization checks; do not turn unrelated request failures into empty success.

Create an independent, detail-shaped controlled response fixture rather than
spreading the listing fixture. Observe its current failure before changing the
mapper. Verify it succeeds through the real detail route as well as the service.
If browser evidence instead identifies an HTTP/network failure, remediate that
cause rather than assuming the tag hypothesis.

Apply the existing `blueprint-button` class to data Retry, and the eager
route-code Retry where the same missing treatment occurs. This does not authorize
cache-busting or change the separately blocked chunk-recovery requirement.

**Files likely to change**:

- `src/app/work-module/services/articles.service.ts`
- `src/app/work-module/services/articles.service.spec.ts`
- `src/app/app.routes.spec.ts`
- `src/app/work-module/work/article-page/article-page.component.html`
- `src/app/article-route.component.ts`
- `specs/009-article-detail/quickstart.md`

**Tests to add or update**:

- A valid detail-specific response with the supported tag shape renders its
  complete title/body/tags rather than failing.
- Empty/missing tags, supported alternate shapes, label order and blank filtering.
- Existing listing malformed-tag rejection remains unchanged.
- Existing owner/identity/required-content/sanitization guards remain intact.
- Real routed detail succeeds with the independent response fixture.
- Both Retry surfaces use the shared button treatment and preserve duplicate
  request prevention.

## Risks & Considerations

- Weakening `cardTags` globally could hide malformed listing/archive data; keep
  protocol normalization at the detail endpoint boundary.
- Do not fetch live article content as the regression-test oracle.
- Do not remove owner validation or bypass HTML sanitization to make rendering
  appear successful.
- The screenshot does not establish a CORS/server problem or cached module error.
- Existing uncommitted feature 008/009 changes must be preserved.

## Open Questions

- [NEEDS CLARIFICATION: Does the affected console report
  `Tags must be a list of text labels`, or an HTTP/network/other validation error?]
- [NEEDS CLARIFICATION: What are `tag_list` and `tags` in that detail response?]
