# Findsid — Complete Redesign Plan

## Problem
The current Angular portfolio (`about`, `work` (articles/apps/art), `resume`, `contact`) has dated visuals. Two static HTML demos exist in `ideas/` exploring a new direction. This is a **full redesign** — none of the current visual design, header/footer chrome, or section layout is preserved. Only the underlying data/routing plumbing needed to keep the site functional is carried forward.

## Confirmed direction
- **Layout & background**: from `ideas/gemini.index.html` — fixed blueprint grid canvas background, sticky left-column header (badge, name, title, lead text, in-page nav, social links) on desktop that collapses to a stacked header on mobile, single scrolling right-hand content column.
- **Content & copy**: from `ideas/claude.index.html` — hero framing, About narrative, Experience (role history), Toolkit/Skills groups, Work (current projects), Writing intro, Contact panel copy, and stat callouts. This becomes the actual site copy (replacing all current about/resume text).
- **Articles behavior**: Writing/Articles render as a **card grid** (styled in the new blueprint aesthetic). Clicking a card navigates to a **dedicated article detail route** that renders the full `dev.to` article body — same functional pattern as today's `/work/articles/:id` (fetch by id, sanitize `body_html`, display), fully restyled to match the new design.
- Apps (existing dev-to driven section) is kept as a functional data source but re-skinned as a card grid consistent with the new "Work" section, since the new design doesn't need a tabbed UI — cards grouped under labeled sub-groups (Projects / Apps) inside one Work section, avoiding loss of any existing content feed.
- **Art section is removed entirely for now** — `work/art` route, `art.component.*`, and the Instagram-driven art card feed are deleted from the app (not just hidden). `InstagramService`/`insta.model.ts` are removed if no longer referenced elsewhere.
- Resume: kept as a section/card (download + summary), not a separate stale page design — reuses `environment.resumeURL`.
- Contact: kept functional (reactive form, validation, submit-success/error modal) — but table/panel completely restyled to the new aesthetic; copy adapted from Claude's contact panel.

## What gets removed
- Current header/nav bar, hamburger menu, theme toggle switch, footer icon row, hero image, `about`/`resume`/`work` component markup & SCSS, typewriter effect — all replaced.
- Old Montserrat-based type system in `styles.scss`/`vars.scss` header rules — replaced with the new font pairing (mono + sans) and blueprint tokens, scoped so it doesn't collide with dynamically injected article `body_html` (dev.to markup needs its own readable content styles).

## What gets kept (functional only, not visual)
- Angular standalone component/routing structure (`app.routes.ts`, `work.routes.ts`).
- `ArticlesService`, `InstagramService`/apps & art data sources, `card.model.ts`, `dev.model.ts`.
- `ContactService` + reactive form validation logic.
- `MetaTagService`, SEO tag handling per route.
- Accessibility patterns: skip-to-content, focus management, aria labelling — re-implemented against new markup.

## Removed scope
- **Art section** (route, component, Instagram data source) is dropped entirely for now, per explicit request — not deferred to "hidden," fully deleted from routing and codebase.

## Implementation steps
1. **Design tokens & shell**
   - New root CSS custom properties (blueprint navy/accent palette from Gemini) in `vars.scss`/root styles; load new fonts (self-hosted or Google Fonts preconnect) with `prefers-reduced-motion` guard.
   - Rebuild `app.component.html/scss`: fixed blueprint grid background layer, sticky left sidebar (badge/name/title/lead/nav/socials) on desktop ≥1024px, collapsible top header on mobile, `<router-outlet>` content column with in-page anchor nav matching sidebar links.
2. **Content restructure**
   - Replace `about` route content with Hero + About copy (from Claude demo, adapted to current real bio/stats — flagged for your review since dates/employers must reflect fact, not the demo's placeholder text verbatim).
   - Add Experience and Toolkit sections (new components or extend `about`) using Claude's role list and skill groupings.
3. **Work module redesign**
   - Restyle `work.component` to render card-grid groups (Projects/Apps/Writing) instead of tabs; keep routes `work/articles`, `work/apps` for direct linking, but present them as anchored sub-sections in one scroll (or keep as routed sub-views styled identically — to be decided during build based on what best matches the "one continuous column" Gemini layout).
   - Remove `work/art` route from `work.routes.ts`, delete `art/art.component.*`, and remove any nav/card references to it.
   - Article cards: cover image, title, tag, date — clicking routes to `work/articles/:id`.
   - Restyle `article-page.component` to a readable "specimen sheet" layout matching the new design, with safe rendering of `body_html`.
4. **Resume & Contact redesign**
   - Resume: a Work/About sub-section or standalone route with resume summary + download button, blueprint-card style.
   - Contact: reactive form restyled into blueprint-card form; keep validation states, success/error modal, but reskinned.
5. **Responsive pass**
   - Verify sticky sidebar → stacked header collapse at Gemini's breakpoint (1024px), spacing/type scale at mobile widths, touch target sizes, and nav scroll-spy/active-link behavior.
6. **Validation**
   - `ng build`, `ng test` (existing specs likely need markup updates, including removal of art component specs), manual check of routes (`/`, `/work`, `/work/articles/:id`, `/work/apps`, `/resume`, `/contact`), keyboard nav, and reduced-motion behavior.

## Open items to confirm before/while building
- Real bio/experience copy: I will adapt Claude's demo text to your actual facts — please review before publish since some numbers/dates in the demo are illustrative.
- Whether Apps keeps a separate route or becomes an anchored subsection on one Work page (affects deep-linking).
