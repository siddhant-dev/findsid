# Data Model: Sticky Portfolio Shell

No database, external API change or persistent preference.

## Owner Identity

Fields: name, title, summary, application version.

Confirmed values are in the UI contract. Version derives from package.version; empty/
malformed version is an explicit generation error, not a success-shaped fallback.
Release version update automatically changes badge on regeneration.

## Section Destination

| Order | ID | Label | Initial content |
|-------|----|-------|-----------------|
| 1 | about | About me | Existing About component |
| 2 | lab | Interaction Lab | Titled empty container |
| 3 | experience | Experiences | Titled empty container |
| 4 | articles | Articles | Existing Articles component |
| 5 | vault | Retro Vault | Existing Apps component |

Each destination has a unique permanent container, heading ID and link; lists do not
duplicate its ID. Order is canonical for arbitration and navigation rendering.

## Navigation Intent

Fields: source (selection/initial/history/passive), requested destination, active
destination, pending render work, current section-relative reading offset, cancellation identity.

| Event | URL/history | Scroll/state |
|-------|-------------|--------------|
| Changed explicit destination | Router push | Scroll to target; prefer requested active during transition |
| Repeated same destination | No new entry | Scroll to target |
| Initial known fragment | No new entry | Wait for render, then target |
| Unknown fragment | No forced URL change | Top; active About |
| Back/Forward | Browser/router restores existing entry | Instant target restoration |
| Passive reading | No URL/history write | Observe active section and relative offset |
| Delayed layout above reading position | No URL/history write | Preserve section-relative offset |
| User/new navigation interrupts correction | No extra entry | Cancel old intent; follow latest reading/request |
| Route exit | No coordinator navigation | Dispose observers and pending work |

Exactly one owner performs section scroll. Global scroll-restoration settings used by
that owner are restored on destruction.

## Lazy Section Activation (2026-10-03 Amendment)

Each non-About section has state idle/loading/ready/error/disposed, a scoped
dynamic-import loader, current activation generation and optional failure.
Viewport approach within20rem, direct fragment or explicit navigation activates it.
Concurrent intents share one pending load; successful content stays mounted in Home.
Failure keeps the heading/anchor with Retry. Route exit invalidates ownership even
when the module download cannot physically be aborted. Article requests begin only
after activation; Lab dataset remains Start-only. See the amended shell contract.

## Bottom Action Details

Fields: name, destination, icon, navigation type, accessible name.
Contact is internal `/contact`; social URLs are external and open safely in new tabs.
Only one bottom Contact action; no sidebar copies.

## Version Derivative

Fields: generated version constant and source provenance.
No separate manually maintained release value. Generator output is deterministic and
freshness-tested; browser code consumes only the small src-rooted module.
