# Phase 0 Research: Global Header & Footer Layout

No `[NEEDS CLARIFICATION]` markers were left in the Technical Context (the constitution and
`package.json` already answer the stack questions). This document instead resolves the
implementation-approach questions that came up while turning spec.md's requirements into a
concrete design, each verified against the actual reference files and existing project files
(not assumed).

## Decision: Header and Footer are Client Components

**Rationale**: Header needs scroll position (homepage transparency, FR relates to User Story 2),
mobile-menu open/close state (FR-006), and dropdown open/close state that must work on tap, not
just hover (FR-010). Footer needs the current route to pick the right quick-link group (FR-008).
All of that is client-side interactive/derived state.

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

## Decision: Active-nav-item and footer-quick-link-group derived from the current route, not props

**Rationale**: Header and Footer are rendered once, from the root layout, wrapping every page.
Requiring every future page to pass an `activeNavItem` or `footerLinkGroup` prop down through the
layout would re-introduce per-page wiring — the opposite of "one shared component" (Principle
III/FR-007). Using `usePathname()` (from `next/navigation`) inside each component to look up the
current route in a small static config table keeps every page's involvement at zero.

**Alternatives considered**: React Context provided by each page. Rejected — adds an abstraction
layer for something `usePathname()` already solves directly, and would still require every page to
remember to set the context, which defeats the purpose.

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
data is needed twice (desktop layout + mobile menu layout), and the footer's per-route lookup
needs a table to look up regardless; a named config file is barely more code and is far easier to
extend when real routes start landing.

## Decision: Icons are re-authored as inline SVG, not copied from the reference files

**Rationale**: Constitution Principle IV requires translating the reference markup, not copying
it. The reference files' chevrons, dropdown dots, hamburger icon, and social icons are inline SVGs
using either raw hex fills or `currentColor`. Re-implemented versions use `currentColor`/token-
driven `stroke` so they inherit text color and theme correctly, consistent with how the rest of
`globals.css`'s icon usage already works.

**Alternatives considered**: An icon package (e.g., lucide-react). Rejected for this feature —
adding a new dependency for ~6 simple icons the reference files already fully specify the shape of
is unnecessary scope growth; revisit only if a later feature needs a broader icon set.

## No API contracts

This feature has no server endpoints, forms, or data mutations — Header and Footer render static,
route-derived navigation and link content. Per the plan template's own allowance ("not all
projects have all documents"), no `contracts/` directory was generated.
