# Routing and Cleanup Contract: Retirement

Both retired URLs use general application wildcard fallback to `/`, with no dedicated
replacement redirect and no artwork-to-Articles special handling. Active aliases remain
exact as defined in [route model](../data-model.md), detail009 and Contact010 unchanged.

Direct/refresh/history resolution loads no retired component or Resume download;
preserve normal homepage behavior and pending Contact same-app navigation guard.
Do not promise HTTP410/404: Firebase SPA rewrite is unchanged.

Implementation removes only explicit Resume component TS/HTML/SCSS/spec files,
route/download config/menu references and orphaned styles verified unused. Remove exact
art route and update related tests/README. Preserve shared assets, active metadata/icon
services and article/archive components. No remote PDF/Firebase deletion or changes.
Historical plans' temporary Resume/art support ends when011 is implemented, not earlier.

Tests use actual app route tree and controlled owner-qualified article/modal fixtures,
not source strings as sole evidence. Test retired/unknown nested paths, exact aliases,
detail path capture, direct entry/refresh/Back/Forward and absence of retired requests.
No new palette/layout value, installation, release change or publication belongs here.
