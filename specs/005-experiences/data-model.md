# Data Model: Experiences

## Experience

Fields: stable internal ID, exact title/company/location/date label, readonly ordered
achievement strings and tags. No service/loading state or persistence.

| Order | Identity | Achievement count | Tag count |
|-------|----------|-------------------|-----------|
| 1 | naviam-lead-product-development | 6 | 9 |
| 2 | lti-mindtree-module-lead | 3 | 6 |
| 3 | infosys-lead-experience-designer | 4 | 5 |
| 4 | infosys-technology-analyst | 3 | 2 |
| 5 | infosys-systems-engineer | 2 | 3 |

Validation: tests compare exact whitespace-normalized strings with
[content-contract.md](contracts/content-contract.md); five unique IDs, 18 bullets,
no omitted/mutated/added content. Dates are approved display labels, not parsed values
used to infer or overwrite employment status.

## Achievement and Tag

Each achievement is one supplied paragraph, potentially multi-sentence. Each tag is
an explicitly approved label. Neither inferred from keywords at runtime.

## Relationships and State

Home owns `experience` section/heading and navigation; component owns five article
elements. No click/expand transitions, metadata writes or asynchronous state.
Hover is decorative styling only.
