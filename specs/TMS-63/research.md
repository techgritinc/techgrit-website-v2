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

---

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

### Decision: Mega-menu is plain CSS grid + existing icon-authoring convention, no new dependency

**Rationale**: The reference's `.nav-mega`/`.nav-mega--2/3/4col` pattern is `display:grid;
grid-template-columns:repeat(N, minmax(0,1fr))` — directly expressible with Tailwind's grid
utilities (`grid grid-cols-2/3/4`). Each item's icon is a small inline `<svg>` (18×18,
`stroke="currentColor"`), matching this project's existing `components/ui/icons.tsx` convention
(re-authored, not copied, per Principle IV) — no icon package is needed for the ~21 mega-item
icons the reference already fully specifies.

**Alternatives considered**: An icon package (e.g., lucide-react) to source the 21 mega-item icons
by name-matching. Rejected — the reference already supplies the exact path data for every icon;
introducing a package would mean re-selecting visually-different icons rather than reproducing the
reference pixel-for-pixel, defeating this feature's own "zero visual difference" requirement.

### Decision: Mega-menu open/close reuses the existing click/tap+keyboard mechanism, not the reference's CSS-only `:hover`

**Rationale**: The reference's `.nav-item:hover .nav-mega` (plus a `::after` hover-bridge strip and
chevron-flip) is a visual-only, mouse-hover-dependent pattern — unusable on touch and already
superseded in this codebase by FR-010's click/tap-driven dropdown, which `Header.tsx` already
implements (button + `aria-expanded`/`aria-haspopup`, outside-click/Escape close). The v2 rebuild
keeps that existing interaction model and re-points it at five mega-groups instead of two simple
lists; only the *visual* content of the open panel changes (grid of icon-chip items instead of a
list of dot-prefixed links).

**Alternatives considered**: Reproduce the reference's hover-open behavior literally, layering a
click handler on top for touch. Rejected — same reasoning as the v1 research decision above
(inconsistent desktop/touch behavior for no benefit); the existing mechanism is already the
FR-010-compliant one and needs no redesign, only new content.

### Decision: Two new tokens added; every other new value reuses an existing token

**Rationale**: Constitution Principle I forbids a hardcoded value that duplicates an existing
token. Cross-referencing every new pixel/color value FR-013/FR-017 introduce against
`app/tokens.css` found exact matches for nearly all of them:

| New value | Existing token |
|---|---|
| Mega panel bg `rgba(0,0,0,0.97)` | `--color-dd-bg` |
| Mega panel border `rgba(255,255,255,0.12)` | `--color-border` |
| Mega panel radius `16px` | `--radius-tile` (value-identical; reused rather than duplicated) |
| Nav link radius `9px` | `--radius-sm` |
| CTA radius `11px` | `--radius-md` |
| CTA gradient | `--gradient-brand` |
| CTA shadow (default/hover) | `--shadow-nav-btn` / `--shadow-nav-btn-hover` |
| Icon chip bg `rgba(232,119,34,0.14)` | `--color-hover-orange-fill-14` |
| Icon chip border `rgba(232,119,34,0.3)` | `--color-border-orange-soft` |
| Icon color `#F7B733` | `--color-amber-light` |
| CTA-row hover gradient | `--gradient-hover-orange-amber` |
| CTA-row border `rgba(232,119,34,0.4)` | `--color-hover-orange-border-40` |

Only **two** values have no existing match and are added as new tokens in `tokens.css`'s existing
numbered sections (and mapped through `globals.css`'s `@theme inline` block, per the file's own
pattern):

- `--shadow-mega: 0 30px 60px -18px rgba(0, 0, 0, 0.85);` — kept distinct from the existing
  `--shadow-dropdown` (`0 26px 54px -16px rgba(0,0,0,0.75)`) deliberately: that token is also
  consumed by `components/ui/Modal.tsx` (the Careers "Apply" dialog), so repurposing its value
  would silently change an unrelated component outside this feature's scope.
- `--gradient-mega-cta: linear-gradient(135deg, rgba(232, 119, 34, 0.22), rgba(245, 158, 11,
  0.10));` — the mega-menu "see all →" CTA row's resting-state background; the hover-state
  gradient for the same row already exists as `--gradient-hover-orange-amber`.

**Alternatives considered**: Repurposing `--shadow-dropdown`'s value to match the mega-menu shadow
directly, avoiding a new token. Rejected per the Modal.tsx collision above. Composing the CTA-row's
resting gradient inline from two existing atomic overlay tokens (`--color-overlay-orange-22` +
`--color-overlay-amber`) via an arbitrary Tailwind value instead of a named token. Rejected for
consistency — every other gradient in this codebase (`--gradient-brand`, `--gradient-phase-node`,
`--gradient-hover-orange-amber`, etc.) is its own named `--gradient-*` token in `tokens.css`, not
composed inline at the call site; breaking that pattern for one gradient would be inconsistent with
the file's own established convention.

### Decision: Industries sub-links point at the existing homepage `/#industries` section; icon chips use the uniform orange styling

**Rationale**: Recorded as an explicit stakeholder Clarification in spec.md, not a default — the
reference's own `href`s point at a standalone `/industries#ind-*` page/anchors that don't exist in
this codebase (only a generic `IndustriesSection` on the homepage does, plus the separate
`/construction` page). Building new anchors on the homepage section, or a new standalone Industries
page, was explicitly ruled out of scope for this header-only refactor. Per the same Clarification,
Industries' icon chips do NOT get the reference's per-industry colors (teal/blue/amber/purple) —
they use the same uniform orange chip as every other mega group, avoiding color-coding a
page-level distinction (per-industry destinations) that doesn't actually exist yet.

**Alternatives considered**: Point Industries sub-links at `/industries#ind-*` now anyway (per the
project's general "unbuilt destination" policy for other unbuilt targets like `/frameworks`).
Rejected specifically for Industries, per the stakeholder's explicit answer — Industries already
has a real, live destination today (`/#industries`); routing away from a working destination to an
entirely nonexistent page was judged worse than the alternative unbuilt-target cases (which have no
existing destination to fall back to).

---

## UI Findings — Header Interaction & Styling Corrections (2026-07-31)

### Decision: Hover-open reuses the existing `openDropdown` state via `onMouseEnter`/`onMouseLeave`, not a parallel CSS `group-hover` mechanism

**Rationale**: The reference's `.nav-item:hover .nav-mega` is pure CSS with no JS state. This
codebase's mega-menu already has one JS-driven state (`openDropdown`) serving click and keyboard.
Introducing Tailwind's `group`/`group-hover:` utilities as a *second*, independent show/hide
mechanism would mean the panel's visibility is governed by two unrelated systems (CSS pseudo-class
vs. React state) that must then be reconciled for combined cases (e.g., a keyboard user tabs the
panel open, then the mouse happens to leave the trigger — which system wins?). Wiring
`onMouseEnter`/`onMouseLeave` on the same wrapper that already holds the click handler routes hover
through the identical `openDropdown` state click and keyboard already use — one source of truth.
Because FR-020 makes the panel always-mounted as a descendant of that same wrapper, the browser's
native mouseenter/mouseleave semantics (computed over the wrapper *and its descendants* as one
region) already cover the 14px trigger-to-panel gap without a dedicated `::after` hover-bridge
element — the reference's bridge trick is reproduced as a side effect of the DOM structure, not a
separate CSS rule.

**Alternatives considered**: Tailwind `group`/`group-hover:` utilities driving visibility purely in
CSS, with the existing `openDropdown` state left to govern only click/keyboard, combined via two
independent conditionals (e.g. `opacity-0 group-hover:opacity-100 data-[open=true]:opacity-100`).
Rejected — doable, but adds a second parallel toggle path for a state (open/closed) that is
conceptually singular; one `onMouseEnter`/`onMouseLeave`-fed state is simpler to reason about and to
close correctly (outside-click/Escape) since there's only ever one state value to inspect.

### Decision: Mouse-click-vs-touch-tap on the trigger is distinguished via `PointerEvent.pointerType`, not viewport width

**Rationale**: FR-019/FR-019a require different click behavior depending on input capability
(mouse: navigate to the group's own page; touch: open the panel on first tap, matching FR-019's
"touch has no hover preview" rationale) — not depending on screen size. A touch-capable laptop at a
wide viewport is still touch input; a mouse plugged into a narrow window is still mouse input.
Capturing `pointerType` off the underlying `PointerEvent` in the click handler (`"mouse"` navigates;
`"touch"`/`"pen"`/absent opens-then-navigates) correctly separates input *capability* from viewport
*width*, which the mobile-menu breakpoint (FR-018) already owns as a separate, unrelated concern.

**Alternatives considered**: `matchMedia('(hover: hover) and (pointer: fine)')` checked once on
mount. Rejected — static media-query capability detection doesn't update per-interaction on hybrid
devices (touchscreen laptops with an attached mouse) the way inspecting each event's own
`pointerType` does; the per-event approach is exact where the media-query approach would need to
average across an ambiguous device class.

### Decision: Mega-menu panel is always-mounted with a two-state Tailwind transition, replacing conditional mount/unmount

**Rationale**: The reported "panel appears in the wrong place" symptom traces to the panel never
having a defined *closed* visual state today — it simply doesn't exist in the DOM until `isOpen`
flips true, so it has no reveal transition and no resting-then-settling motion the way the
reference's always-present, opacity/transform-toggled panel does. Matching the reference's approach
(panel permanently in the DOM, toggling `opacity`/`visibility`/`transform` with a `0.22s ease`
transition) fixes the root cause directly, and is also what the hover mechanism above depends on
(an unmounted panel can't be part of the wrapper's hoverable region).

**Alternatives considered**: Keep conditional mounting, but wrap the mount/unmount in a `<Transition>`
-style library (e.g. Framer Motion `AnimatePresence`) to fake an enter/exit animation. Rejected —
adds a new dependency for something plain always-mounted CSS classes already solve exactly the way
the reference itself does, with no runtime library needed.

### Decision: CTA-row label/arrow are two independently-colored elements, not one

**Rationale**: The reference's CSS assigns `.m-cta-label{color:#fff}` and
`.m-cta-arrow{color:#F7B733}` — two separate rules. The shipped implementation applies a single
`text-amber-light` class to the whole row (label text + arrow), which is a straightforward,
confirmed miscoloring rather than a design choice — correcting it means splitting the row's text
into two elements with two distinct color classes (`text-white` label, `text-amber-light` arrow).

### Decision: Header CTA's per-page label/destination overrides are removed entirely

**Rationale**: All 12 reference files render one identical CTA (`Talk to Us` → the Contact page),
with the single reference-confirmed exception of the Contact file itself linking to its own `#form`
in-page anchor rather than navigating to itself. The shipped implementation's
`isContact`/`isCareers`/`isWebinar` branches (relabeling to "Start a project," "View open roles," and
"Subscribe" with different anchor targets) have no support anywhere in the 12 reference files and
are removed; only the Contact-page `#form` exception is retained, since it is the one case the
reference set itself confirms.
