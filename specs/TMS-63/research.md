# Phase 0 Research: Global Header & Footer Layout

No `[NEEDS CLARIFICATION]` markers were left in the Technical Context (the constitution and
`package.json` already answer the stack questions). This document instead resolves the
implementation-approach questions that came up while turning spec.md's requirements into a
concrete design, each verified against the actual reference files and existing project files
(not assumed).

## Decision: Header and Footer are Client Components

**Rationale**: Header needs scroll position (homepage transparency, FR relates to User Story 2),
mobile-menu open/close state (FR-006), and dropdown open/close state that must work on tap, not
just hover (FR-010). Footer-only update (2026-07-30): Footer no longer needs the current route
(its link grid is fully page-invariant, FR-008) — it instead needs client-side hover/focus lift
state that must respect `prefers-reduced-motion: reduce` (FR-014, FR-015). All of that is
client-side interactive/derived state.

**Alternatives considered**: Keep both as Server Components and push all interactivity into small
leaf Client Components (e.g., a `<MobileMenuButton>` island). Rejected for this feature's scope —
the entire header is one cohesive interactive unit (scroll state affects the same DOM the nav
links live in); splitting it into many tiny client islands would add indirection without a real
performance win, since the header/footer render on every page regardless.

## Decision: Mobile-menu breakpoint reuses existing CSS hooks, no new breakpoint

**Rationale**: `app/globals.css` already ships this exact mechanism (confirmed by reading the
file, not assumed):
```css
@media (max-width: 1140px) {
  [data-desktop-nav],
  [data-cta-nav] { display: none !important; }
  [data-burger]  { display: block !important; }
}
```
This matches Constitution Principle II's canonical `lg = 1140px` breakpoint exactly. Header simply
tags its desktop-nav wrapper with `data-desktop-nav`, its CTA with `data-cta-nav`, and its mobile
menu trigger with `data-burger` — the collapse behavior is already implemented globally and needs
no new CSS.

**Alternatives considered**: A Tailwind `lg:hidden`/`hidden lg:flex` pair using the default
Tailwind breakpoints. Rejected — Tailwind's default `lg` is 1024px, not this project's 1140px, and
duplicating breakpoint logic in two places (Tailwind config and the existing `[data-*]` CSS)
would violate Principle II's "reuse these thresholds... rather than inventing new breakpoints."

## Decision: Dropdown groups (Industries, Resources) open on click, not hover

**Rationale**: FR-010 requires tap support on touch devices; hover-only dropdowns are unusable on
touch. Implementation: a button with `aria-expanded`/`aria-haspopup`, toggling open state on
click, closing on outside-click, `Escape`, and when a link inside is followed. Desktop mouse users
still get instant-feeling interaction because click response is effectively immediate.

**Alternatives considered**: Hover-to-open (matches the reference files' `.nav-item:hover
.nav-dd` CSS) with a click fallback layered on top for touch. Rejected as more code for a worse,
inconsistent result — desktop and touch would behave differently for the same component, and
FR-010 asks for one clearly-operable mechanism, not two.

## Decision: Active-nav-item derived from the current route, not a prop

**Rationale**: Header is rendered once, from the root layout, wrapping every page. Requiring every
future page to pass an `activeNavItem` prop down through the layout would re-introduce per-page
wiring — the opposite of "one shared component" (Principle III). Using `usePathname()` (from
`next/navigation`) inside Header to look up the current route in a small static config table keeps
every page's involvement at zero.

**Alternatives considered**: React Context provided by each page. Rejected — adds an abstraction
layer for something `usePathname()` already solves directly, and would still require every page to
remember to set the context, which defeats the purpose.

## Decision: Footer link content is fully static and page-invariant — no route lookup (Footer-only update, 2026-07-30)

**Rationale**: spec.md's 2026-07-30 re-derivation from `TechGrit Homepage.dc.html` (FR-007/FR-008)
established that the footer's five-group site-map link grid, brand/contact block, social row, and
utility bar carry zero page-to-page variation — superseding the earlier "footer-quick-link-group
derived from route" premise this document previously recorded. `footer-config.ts` now exports one
fixed set of link groups/content (see FR-015 for the exact enumeration) rather than a
route-keyed lookup table; `Footer.tsx` no longer needs `usePathname()` for content selection at
all — only for its own internal hover/focus/reduced-motion state (see the Client Components
decision above).

**Alternatives considered**: Keeping the route-keyed lookup table but pointing every route at the
same single entry. Rejected — carrying a lookup abstraction that will only ever resolve to one
value is needless indirection; a flat exported config object is simpler and matches what FR-008
now actually requires.

## Decision: Homepage's transparent-over-hero header is detected via pathname, not a prop

**Rationale**: Same logic as above — Header checks `usePathname() === "/"` to decide whether it
starts transparent (only true on the homepage) versus solid everywhere else, satisfying spec.md's
User Story 2 / Assumptions "Header behavior" decision without any page needing to opt in.

**Alternatives considered**: A `variant` prop passed from `page.tsx` into `layout.tsx` into
`Header`. Rejected — `layout.tsx` wraps every route uniformly by design in the App Router; forcing
page-specific props through it fights the framework's own composition model for no benefit over a
one-line pathname check.

## Decision: Nav items, dropdown sub-items, and footer link groups live in static config files

**Rationale**: No CMS or backend exists in this repository yet (confirmed — constitution's
Development Workflow section and the actual `app/` contents). Spec.md's Assumptions explicitly
scope this feature to the header/footer chrome, not content management. Two small typed config
files (`nav-config.ts`, `footer-config.ts`) colocated with the components keep the link data
easy to find and edit without inventing a data layer this feature doesn't need.

**Alternatives considered**: Hardcoding the links directly inside JSX. Rejected — the same nav
data is needed twice (desktop layout + mobile menu layout); a named config file is barely more
code and is far easier to extend when real routes start landing. Footer-only note (2026-07-30):
`footer-config.ts` now holds a flat, fully-enumerated content object (not a route-keyed table —
see the Footer link content decision above), but the same "typed config over inline JSX" rationale
still applies given the footer's ~20 links across five groups plus social/legal links.

## Decision: Icons are re-authored as inline SVG, not copied from the reference files

**Rationale**: Constitution Principle IV requires translating the reference markup, not copying
it. The reference files' chevrons, dropdown dots, hamburger icon, and social icons are inline SVGs
using either raw hex fills or `currentColor`. Re-implemented versions use `currentColor`/token-
driven `stroke` so they inherit text color and theme correctly, consistent with how the rest of
`globals.css`'s icon usage already works. Footer-only update (2026-07-30): the footer's "Follow us"
row icon set is LinkedIn, YouTube, and Spotify (podcast) — superseding this document's original
LinkedIn/YouTube/mail assumption, since email is already covered by the separate General/Careers
contact block (FR-014); a Spotify icon must be added to `icons.tsx` alongside the existing
LinkedIn/YouTube marks, and the mail icon originally scoped for footer social use is no longer
needed there.

**Alternatives considered**: An icon package (e.g., lucide-react). Rejected for this feature —
adding a new dependency for ~6 simple icons the reference files already fully specify the shape of
is unnecessary scope growth; revisit only if a later feature needs a broader icon set.

## Decision: Every FR-012–FR-018 raw value must resolve to a token before use (Footer-only, 2026-07-30)

**Rationale**: Constitution Principle I forbids hardcoded hex/px that duplicates or could duplicate
a token. spec.md's FR-012–FR-018 records raw reference values (gradient stops, glow colors/blur
radii, the fixed 36px padding, wordmark `clamp()`/letter-spacing/opacity-fade values) precisely so
implementation doesn't need to reopen the `.dc.html` file — but those are extraction data, not a
license to hardcode. Before writing any footer CSS, each raw value must be checked against
`app/tokens.css`'s existing numbered sections; any value with no existing match gets added there
first (in its matching section) and exposed via `@theme inline` in `app/globals.css`, per CLAUDE.md's
token-bug precedent (TMS-62's homepage fidelity audit).

**Alternatives considered**: Writing the FR-012–FR-018 values directly as arbitrary Tailwind
values (e.g. `bg-[rgba(232,119,34,0.10)]`) without adding tokens. Rejected — this is exactly the
"hardcode a value that duplicates an existing/needed token" pattern CLAUDE.md calls out as a real
bug, not a style nit.

## Decision: Fixed 36px footer side padding is a named, documented exception to `.container` (Footer-only, 2026-07-30)

**Rationale**: Per Clarifications (spec.md, Session 2026-07-30, Q2) and FR-013, the footer's side
padding must stay at 36px at every viewport width rather than shrinking at the site's generic
960px/560px breakpoints like the shared `.container` utility does. Implementation uses a
footer-local class (e.g. `.footer-shell`) with a fixed padding value instead of reusing
`.container`, so the exception is scoped to the footer and doesn't alter `.container`'s behavior
for any other consumer.

**Alternatives considered**: Adding a modifier prop/class to `.container` itself (e.g.
`.container--fixed-padding`). Rejected — this is a single-consumer exception; growing the shared
utility's API for one caller adds surface area other pages could accidentally opt into.

## Decision: Reduced-motion handling suppresses only the footer's transform/lift, not its color transitions (Footer-only, 2026-07-30)

**Rationale**: Per Clarifications (spec.md, Session 2026-07-30, Q3) and FR-014/FR-015, a
`@media (prefers-reduced-motion: reduce)` block scoped to the footer's own hover/focus rules
(CTA button, social icons) removes only the `translateY` part of each transition, leaving
color/background/border-tint transitions intact. `app/globals.css`'s existing reduced-motion rule
(scoped to `.bg-ambient-orbs span`) is left untouched — this is an additive, footer-local rule, not
a change to the existing one.

**Alternatives considered**: Suppressing all footer hover/focus transitions (including color)
under reduced motion. Rejected — Q3's answer explicitly keeps color-based transitions, since only
vestibular-motion-triggering transform/translation needs disabling, not simple color changes.

## Decision: Footer's Industries link set stays at four items, reusing three header destinations plus one new one (Footer-only, 2026-07-30)

**Rationale**: Per Clarifications (spec.md, Session 2026-07-30, Q4) and FR-015, the footer's
Industries group (HealthTech, FinTech, ConstructionTech, HiTech) is implemented as its own literal
link set in `footer-config.ts`, independent of `nav-config.ts`'s three-item Industries dropdown.
ConstructionTech's `href` points at the same destination as the header's existing Construction
entry; FinTech/HealthTech point at the header's same intended (currently unbuilt) destinations
under the footer's own label text; HiTech is a new `href` not present anywhere in `nav-config.ts`.

**Alternatives considered**: Deriving the footer's Industries list from `nav-config.ts` and
appending HiTech programmatically. Rejected — the two lists have different labels
("ConstructionTech" vs. "Construction") and are documented as an intentional, static deviation
(Key Entity "Footer Link Group"); deriving one from the other would obscure that the mismatch is
by design, not a bug.

## Decision: Footer anchor links keep literal hrefs even though the target section `id`s don't exist yet (Footer-only, 2026-07-30)

**Rationale**: Per Clarifications (spec.md, Session 2026-07-30, Q5) and FR-015, `footer-config.ts`
stores the "What We Do" and "Our Story"/"Leadership & Advisory" links with their literal reference
hrefs (e.g. `/services#svc-modernization`, `/about#our-story`) even though `app/services` and
`app/about` currently define none of those `id`s (confirmed via grep — zero matches in either
directory). No task in this feature adds those `id`s; that's explicitly deferred to whichever
future work builds out each page's content (spec.md Edge Cases, SC-008).

**Alternatives considered**: Stripping the anchor fragment down to a bare page link
(`/services` instead of `/services#svc-modernization`) until the target `id` exists. Rejected —
Q5's answer keeps the literal reference href; the anchor fragment is harmless (browsers simply
don't scroll if the `id` is absent) and preserves the correct link once the target page's content
ships, with no code change needed at that point.

## Decision: Cookie Preferences links to the homepage, not a dedicated page (Footer-only, 2026-07-30)

**Rationale**: Per Clarifications (spec.md, Session 2026-07-30, Q1) and FR-017, the reference
prototype's Cookie Preferences link is a literal placeholder (`href="#"`); rather than inventing an
unrequested destination, `footer-config.ts` points it at `/` — matching the reference's
placeholder intent without fabricating a cookie-settings page this feature doesn't otherwise build.
Privacy Policy and Terms of Service, by contrast, follow this project's standing "unbuilt
destination pages" convention and point at their real `/privacy`/`/terms` routes.

**Alternatives considered**: Pointing Cookie Preferences at `/privacy` (folding it into the privacy
page) or leaving it as a non-navigating `href="#"`. Rejected — folding it into `/privacy` invents a
routing decision the reference doesn't make, and a literal `href="#"` would jump to the top of the
current page in a confusing way that reads as a broken link; `/` most closely mirrors the
reference's own "goes nowhere meaningful yet" placeholder behavior in a way that is at least a real,
navigable destination.

## No API contracts

This feature has no server endpoints, forms, or data mutations — Header and Footer render static,
route-derived navigation and link content. Per the plan template's own allowance ("not all
projects have all documents"), no `contracts/` directory was generated.
