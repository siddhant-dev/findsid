# UI and Navigation Contract: Sticky Portfolio Shell

Consumes [feature 001 style contract](../../001-blueprint-styles/contracts/style-contract.md).

## Identity and Bottom Actions

| Field | Exact value |
|-------|-------------|
| Name | Siddhant Jaiswal |
| Title | Lead Product Development Professional |
| Summary | Architecting scalable Angular applications, high-performance virtualized rendering engines, and accessible design systems |
| Badge | `v` followed by actual package.version; reference dashed mono badge styling |

No SYS.ARCH/sample version or unverified reference content. Current package.version is
0.9.9, not automatically 26.0.0.

Bottom Contact link is `/contact`, above icons in this order:

| Icon accessible name | URL |
|----------------------|-----|
| LinkedIn | https://www.linkedin.com/in/iamsiddj |
| Twitter | https://twitter.com/iamsidd_j |
| GitHub | https://github.com/siddhant-dev |
| CodePen | https://codepen.io/sidd_dev |
| Dev.to | https://dev.to/siddev |

Icons are decorative inside labelled links; use `aria-label` and a useful title.
External anchors use `_blank` plus `noopener noreferrer`. No visible social words and
no sidebar social/Contact duplication. Do not substitute reference generic GitHub/dev URLs.

## Layout and Canvas

- Reference max container width 1280px; side padding 24px; desktop gap 48px.
- Desktop >=1024px: shrinkable 45:50 relative column tracks, identity padding 96px
  vertically, content padding 96px vertically. Use available width after the gap rather
  than percentages plus gap that exceed container space.
- Below 1024px: stacked; identity padding 80px 0 32px; content 32px 0 96px.
  Navigation remains visible, wrapping beneath introduction; reuse reference 8px link
  padding and 16px spacing instead of inventing additional design values.
- Sticky top 0 only when identity content fits viewport. Otherwise normal flow,
  no overflow clipping or inaccessible bottom text. React to resize/font changes.
- Sections use reference 96px separation and 96px scroll margin; labels have reference
  rule treatment. Empty Lab/Experiences headings are still valid destinations.
- Reuse the single canvas owned by [feature001's style contract](../../001-blueprint-styles/contracts/style-contract.md#blueprint-canvas-scope-correction-2026-10-03):
  reference 100px/20px grid, cyan alpha 0.08/0.03, -1px position and radial vignette.
  Grid implementation moved to001 by owner request on 2026-10-03; do not duplicate it.
- Content is above canvas; decorations never intercept pointer/focus.
- Use responsive containment for current grids/cards/photo rather than masking overflow
  or applying future blueprint-card design. Preserve component data/flow.

## Destinations and Routing

**Retirement011 precedence**: Temporary `/resume` and `/work/art` support below is
intermediate only. After011, both follow general unknown-route fallback to `/`;
no dedicated retirement/artwork redirect is added. Active aliases/detail/Contact persist.

| Link label | Homepage URL | Heading ID |
|------------|--------------|------------|
| 01. About me | /#about | about-heading |
| 02. Interaction Lab | /#lab | lab-heading |
| 03. Experiences | /#experience | experience-heading |
| 04. Articles | /#articles | articles-heading |
| 05. Retro Vault | /#vault | vault-heading |

Exact full-match aliases, processed before broad Work routing:

| Input | Canonical destination |
|-------|-----------------------|
| /work | /#articles |
| /work/articles | /#articles |
| /work/apps | /#vault |

Redirect resolution replaces the intermediate alias, never pushes alias plus destination.
Existing `work/articles/:id`, `/contact`, `/resume` and `/work/art` remain functional.
The old artwork redirect may resolve onward to Articles, but no new artwork link appears.
No Work/Resume menu or page-level tab navigation on the new homepage.

## Active State and Scrolling

- Exactly one active link when Home is shown; `aria-current="location"` and reference
  cyan/indicator treatment (24px inactive line; 48px active/hover).
- Prefer explicitly requested target while scrolling. Otherwise choose the last section
  whose heading has crossed the reference 96px reading line; before first, choose About;
  at document bottom, choose the last visible section. Use ordered positions to resolve ties,
  not nondeterministic observer-entry order.
- Initial/refresh known fragment waits for permanent container render. Unknown fragment
  shows top, leaves URL untouched, does not throw or redirect.
- Changed link selection pushes one router history entry and scrolls. Same-target link
  selection scrolls but does not add another entry. Passive observation never calls navigation.
- Back/Forward restores target instantly without a new entry; explicit selections may
  smooth-scroll except under reduced motion.
- Cancel stale scroll intents on route exit, new destination or user interruption.
- During delayed content changes above the reader, preserve visible section-relative offset,
  not merely absolute document scrollTop. Coalesce resize/render work and avoid correction
  loops or snapping back after the visitor moves. Do not wait for all network requests.
- Existing skip-to-content remains keyboard usable, focusing main without a history write.
- On retained non-home routes the sidebar links return to homepage fragments; do not claim
  their exact article-detail layout redesign is part of this contract.

## Integration Responsibilities

Home owns anchors and canonical page metadata. Current embedded child components must
not reference removed tab labels, duplicate section IDs or overwrite canonical homepage
metadata as independent pages. Keep standalone compatibility where routes still exist.

Test owner-filtered article successful/loading/empty/failure states with controlled data.
Provide minimal readable empty/error embedding feedback as necessary; full article listing,
retry, missing-image and new card UX remain their own features.
Do not fabricate service success or suppress errors.

## Accepted Accessibility Cases

Keyboard-only navigation, visible focus, reduced-motion instant scroll, blocked-font
fallback, 200% zoom, 320px viewport, short desktop windows and async content stability
are required. Real CSS/media/history behavior must be checked in a browser, not only
source strings or mocked callbacks.

Any additional numerical design value absent from reference/feature 001 needs user
confirmation before implementation; behavioral arbitration above is an implementation
contract, not a new palette.

## Global Loading Amendment (2026-10-03)

**Contact010 refinement**: Route-lazy Contact is a modal retaining current Home/detail
underneath; direct entry supplies Home. Pending valid Send locks dismissal and same-app
navigation/Back until response. Eager host failure surface supports Retry/Close without
loading Contact UI; no background metadata rewrite. History/focus ownership follows010.

**Article-detail009 refinement**: Detail route is a dedicated reading layout, no
identity/sidebar, with shared canvas and bottom actions. On return/browser Back,
Home restores completed Articles snapshot/section-relative offset rather than only
scrolling to its heading. Active requests cancel; no hidden mounted Home. Direct
detail return without snapshot activates Articles normally. See009 reading contract.

Confirmed app-wide strategy supersedes eager child composition in the original shell
plan. Styles, shell/navigation and About are eager. Lab, Experiences, Articles and
Vault are lazily activated on viewport approach; their headings and anchors remain
permanent. Explicit section selection/direct fragment activates its target immediately.
Article-detail and Contact are route-lazy. No blanket eager background prefetch.

Articles request data on activation. Vault imports its bundled JSON with its lazy
feature, not a separately fetched static asset or eager Home import. Experiences'
typed data stays with its feature chunk. Lab code activation NEVER fetches the
100,000-record dataset: Start remains the sole trigger. Card/skeleton code follows
deferred consumers; eager global links must not pull in detail-page dependencies.

Home owns activation/observation lifecycle and scroll coordination. Preserve reading
position during chunk/data layout changes; explicit section/append intents take priority.
Direct navigation does not wait for all preceding lazy features. Unknown fragments
retain existing top/no-redirect behavior. Loaded sections stay mounted within Home;
do not refetch on unchanged fragment navigation. Dispose observers and invalidate
late results on route exit; imports that cannot be physically cancelled must not mount
after their owner is destroyed.

Approved trigger: section reaches within 20rem below the viewport, or is already
visible. Convert rem to actual computed root font size for observer APIs rather than
forcing a 16px root. Explicit/direct targets activate regardless of observer distance.
Keep unactivated headings visible without rendering offscreen skeletons that bring
skeleton libraries into the eager chunk; active loading uses section-specific skeletons
or the foundation static loading status while skeleton code itself loads.

Approved module failure: retain heading/anchor and show "This section couldn't be
loaded." with Retry for only that section. Keep unrelated sections functional. No
artificial skeleton delay or automatic retry loop. Loaded sections remain mounted
within Home; retry duplicate actions are blocked and late imports cannot mount.
Route-lazy detail/Contact inherit explicit route-load error feedback rather than
silent navigation failure; their later specs must define the route-specific surface.

Acceptance checks must establish eager About without deferred feature/data requests,
independent activation, direct-fragment activation, reading-position stability and
destroyed-owner guards. Build/chunk inspection must follow main-only build governance;
planning does not claim real bundle or timing measurements.
