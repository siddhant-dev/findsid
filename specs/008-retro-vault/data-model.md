# Data Model: Retro Vault

## Source Record and Card Adapter

Use exact [content contract](contracts/content-contract.md) in current source order.
Fields: existing identity, required nonblank title, optional complete description,
optional date label, available tags and optional destination URL. No card image.
Normalize existing single tag to an array per006 without inventing labels.

Validate unknown imported JSON as array. Reject individual invalid record shapes/
missing essential title content with explicit diagnostics, not a visible warning.
Optional date/description/tags may be absent; invalid/missing destination means Archived
per006, not rejected. Valid source IDs support first-accepted deduplication; missing/
invalid ID may use encounter identity when content is otherwise usable, consistent
with the shared card. Do not reserve IDs for rejected records.

## Collection Outcome

| Input | Outcome |
|-------|---------|
| Current valid JSON | Five cards in current order |
| Mixed valid/rejected | Valid records only, original relative order |
| Repeated valid ID | First accepted record retained |
| Empty array | No archived projects yet.; no Retry |
| Non-array envelope | Projects couldn't be loaded.; Retry |
| Nonempty with no usable records | Projects couldn't be loaded.; Retry |

## Activation State

Home owns idle/loading/ready/error/disposed module state under amended shell002.
The lazy feature owns validated ready/empty/data-error outcome. No separate project
network provider. Active loading may display five skeletons once adapter code is
available; bootstrap status remains foundation-only to avoid eager skeleton imports.
Retry module failure repeats scoped activation; Retry data failure revalidates actual
source without pretending immutable malformed bundled content has healed.
Loaded content stays mounted within Home; departure invalidates pending ownership.
