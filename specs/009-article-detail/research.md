# Research: Blueprint Article Detail

Repository inspection and user approvals on2026-10-03. No installs/runtime tests.

## Dedicated Layout and Geometry

**Decision**: Root reading mode selected by route data; centered48rem reading surface,
side padding1.5rem, vertical3rem, major gaps1.5rem. No identity sidebar/cover banner.
**Rationale**: Both grouped recommendations approved. Reuse global canvas/bottom actions.
**Alternatives**: Keep split column (poor reading width), homepage card wrapper,
new design reference (none supplied). Existing ideas show listings, not detail pages.
**Evidence**: current detail template/SCSS; amended shell002; approved009 spec.

## Body and Ownership

**Decision**: Validate owner/detail then use framework sanitization for an HTML string.
**Rationale**: Existing service blindly wraps body_html with bypassSecurityTrustHtml;
approved content-safety change requires removing that trust bypass for detail data.
**Alternatives**: Raw trusted API HTML (not approved), reimplement Markdown parser or
add sanitizer library (not needed before testing framework preservation).
**Evidence**: articles.service.ts, dev.model.ts, article-page template.
Scoped styling must reach injected descendants; emulated host attributes are not
automatically attached to innerHTML nodes. Prefer explicit article-scope CSS rather
than relying on component descendant selectors that do not match injected content.

## States, Images and Links

**Decision**: Invalid ID/404/wrong-owner -> not-found; network/429/malformed/missing
body -> Retry error. Latest route wins; image-error fallback uses alt text or approved
message. External URLs follow006 scoped new-tab policy after sanitized rendering.
**Rationale**: User approved distinctions. Existing page shows generic loader/error and
does not clear/cancel old ID requests reliably.
**Alternatives**: Empty success, image placeholder, source probing, broad catch.
Rejected/unapproved. Use text nodes for fallback, not alt string injected as HTML.

## Listing Return

**Decision**: One in-memory plain-data snapshot with committed request checkpoint,
revealed cards and section-relative reading offset; Back/explicit return restore it.
**Rationale**: User approved restoration, no localStorage and fresh reload.007 currently
destroys session on departure; amendment preserves data, not active work.
**Alternatives**: Persistent browser cache (rejected), keep hidden Home alive (defeats
cancellation), refetch and recreate pages (loses progress), save only displayed cards
(loses lookahead/paging/deduplication state).
**Evidence**:007 data model, shell navigation lifecycle,009 grouped approval.

## Lazy Route Failure

**Decision**: Eager minimal route-load failure boundary owns Retry/Back feedback.
**Rationale**: Failed component code cannot render its own error UI.
**Alternatives**: Silent Router error, only component-level catch and global reload
remain rejected. Cache-busted import was initially prohibited.
**Amendment (owner approved 2026-10-04)**: Native testing demonstrated a cached
rejected import despite network recovery. Explicit Retry after failed lazy-code
loading may now use a fresh application-owned module URL; normal loading remains
unchanged, no automatic retry or document reload. Dependencies and stale ownership
still need native verification; policy approval is not evidence of recovery.

## Metadata and Dependencies

**Decision**: Accepted current article owns Title/Meta; Home restores canonical tags.
Keep detail social image metadata when valid even without a visible cover banner.
**Rationale**: Existing addTag/remove-all behavior can accumulate stale tags or race
other page owners. Reuse and tighten existing service rather than a new SEO subsystem.
**Alternatives**: Strip all image data (breaks existing metadata), unconditional cleanup.
Use existing Jasmine/Karma and controlled fixtures; reuse004 boneyard smoke prerequisites.
No first-feature clarification remains; runtime proof remains implementation work.
