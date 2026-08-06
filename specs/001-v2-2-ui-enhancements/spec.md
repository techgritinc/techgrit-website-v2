# Feature Specification: TMS-V2.2-Enhancements — Pixel-Perfect UI Refinement (v2.2)

**Feature Branch**: `001-v2-2-ui-enhancements`
**Created**: 2026-08-03
**Status**: Draft
**Input**: User description: "TMS-V2.2-Enhancements: UI modernization/refinement of the existing Next.js application which acts as single source of truth to match 12 approved raw-files-v2 dc.html design references pixel-perfectly across Home, Services, Industries, Case Studies, Blog, Webinar, About, Careers, and Contact pages. Refactor existing components, update design tokens, no rebuild of architecture or business logic."

## Summary

This is a UI-refinement pass over an already-shipped Next.js application (Phase 1 complete). No new business logic, routing, or architecture is introduced. Every page's current markup is brought into pixel-level alignment with its corresponding `raw-files-v2/TechGrit Website V2.2/*.dc.html` reference (typography, spacing, color, icons, hover/focus/active states, responsive behavior), by refactoring existing components and reusable primitives, adding one net-new homepage section (Blog), and updating `app/tokens.css` wherever the references introduce a value with no existing token.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Home Page brought to reference fidelity (Priority: P1)

A visitor lands on the homepage and experiences a centered, decluttered hero (single tagline, no sub-tagline, no clickable scroll indicator), a "Trusted by our clients" strip as its own section rather than nested in the hero (scrollable only if its logos overflow the container width, with no auto-playing animation), an updated (but non-scrolling) subscribe row, a "How We Deliver" methodology section usable as a shared component (symbol-free eyebrow, a widened phase-detail card sharing its icon with the top timeline), an updated "Don't Migrate / Re-Imagine" 4-card grid, a refreshed Construction industry card, a left-aligned Testimonials section with a metrics card and richer video-testimonial cards, a brand-new Blog teaser section, an updated Life at TechGrit photo grid with two action buttons, and a resized final CTA card.

**Why this priority**: The homepage is the highest-traffic entry point and carries the widest set of changes in the request; it is the best single indicator of whether the v2.2 visual language has been applied correctly.

**Independent Test**: Load `/` at desktop, tablet, and mobile breakpoints and visually diff every section against `TechGrit Homepage.dc.html`; confirm the page ships and reads correctly with no other page touched.

**Acceptance Scenarios**:

1. **Given** a visitor on `/` at desktop width, **When** the page loads, **Then** the hero shows one tagline (no sub-tagline) with its "Live Webinar" badge showing a live green status dot and ripple, left-aligned supporting copy/CTAs/metrics inside a content column that itself stays horizontally centered within the page's max-width container, no scroll-indicator affordance, and the "Trusted by our clients" logo strip appears as a section below the hero rather than inside it, becoming horizontally scrollable only if its logos overflow the container width (no automatic animation) and displaying statically otherwise.
2. **Given** a visitor on `/` at a narrow (mobile) width, **When** they reach the subscribe band, **Then** the email input and submit button use the reference's width/styling and wrap/stack normally — the subscribe band itself does not scroll horizontally.
3. **Given** a visitor viewing the "How We Deliver" section, **When** they view the eyebrow, the phase timeline, and the phase-detail card, **Then** the eyebrow shows no leading symbol, the timeline's step numbers are represented as icons (not bare numerals), and the widened phase-detail card shows the same icon as the corresponding step in the timeline (not a distinct icon or numeral).
4. **Given** a visitor scrolling to the "Don't Migrate / Re-Imagine" section, **When** it renders, **Then** the first 3 cards each show the same shared icon, their own image, and a subtle orange background tint on hover (in addition to the existing lift/border), and the 4th card ("Why AI-First Matters") shows the TechGrit icon and has no hover effect at all.
5. **Given** a visitor viewing the Testimonials section, **When** they hover a video testimonial card, **Then** it shows the reference's hover background, a duration badge, a star rating, an avatar, an animated play affordance, a verified badge, and quotation-mark iconography.
6. **Given** a visitor scrolling to the new Blog section, **When** it renders, **Then** it shows a left-aligned eyebrow+title, a right-aligned ghost button, and three blog cards (icon, colored background, description, and a working "Read More" interaction) sourced from the same blog content used on `/blog`.
7. **Given** a visitor viewing the Life at TechGrit section, **When** it renders, **Then** the photo grid matches the reference layout and two action buttons are present.
8. **Given** a visitor viewing the closing CTA section, **When** it renders, **Then** the card width and the clickable-text typography match the reference.

---

### User Story 2 - Services page expandable service cards (Priority: P2)

A prospective client visiting `/services` sees background ambient orbs and a hero badge without a dot, can expand any of the three top-level service cards to reveal the specific related services nested under it, with an updated hover treatment, and views a resized final CTA with an updated button.

**Why this priority**: Services is a primary consideration page for prospects evaluating TechGrit; the expandable-card interaction is a new interaction pattern (not just a style pass) and is called out as its own deliverable.

**Independent Test**: Load `/services`, expand/collapse each of the three top-level cards independently, and confirm nested related services appear/disappear correctly without affecting any other page.

**Acceptance Scenarios**:

1. **Given** a visitor on `/services`, **When** the page loads, **Then** background ambient orbs are visible and the hero's top badge shows no dot indicator, with the ghost button using the updated reference styling.
2. **Given** a visitor on `/services`, **When** they activate a top-level service card, **Then** it expands in place to reveal its related sub-services, and collapses again on a second activation.
3. **Given** a visitor hovering a service card, **When** the pointer is over the card, **Then** the hover background matches the reference.
4. **Given** a visitor scrolling to the closing CTA, **When** it renders, **Then** the card width and CTA button match the reference.

---

### User Story 3 - Industries (`/construction`) page reference alignment (Priority: P2)

A visitor who clicks "Industries" in the nav still lands on the existing `/construction` page (no new route), and now sees a hero with an updated ghost button and metrics panel background, a "Challenge" section without its eyebrow's leading accent symbol, evenly spaced "What We Build" content, a "Why TechGrit" section without its eyebrow's leading accent symbol, equal-height "Proven Impact" cards, and a widened closing CTA with two updated action buttons and ghost-button styling.

**Why this priority**: Industry positioning directly supports sales conversations; scoped after the two pages with the widest surface area.

**Independent Test**: Load `/construction` end to end (hero → challenge → what-we-build → why-TechGrit → proven-impact → CTA) and confirm each subsection independently matches `TechGrit Industries.dc.html` and `TechGrit Construction.dc.html`.

**Acceptance Scenarios**:

1. **Given** a visitor who clicks "Industries" in the nav, **When** the app navigates, **Then** it opens the existing `/construction` page (no new route is introduced), and the hero's ghost button and metrics panel background match the reference.
2. **Given** a visitor viewing the Challenge section, **When** the eyebrow renders, **Then** it shows no leading accent symbol.
3. **Given** a visitor viewing "Why TechGrit", **When** the eyebrow renders, **Then** it shows no leading accent symbol.
4. **Given** a visitor viewing "Proven Impact", **When** the cards render in a row, **Then** every card in the row is the same height regardless of its content length, and no card is individually wrapped in a link (the per-card CTA link is removed).
5. **Given** a visitor at the closing CTA, **When** it renders, **Then** the card is wider than before and both action buttons (including the ghost button) match the reference styling.

---

### User Story 4 - Insights: Case Studies hub and detail pages (Priority: P3)

A visitor browsing case studies sees updated background ambient orbs and no hover borders on cards, a hero badge without a dot, a dark sticky filter bar (with a filter label) positioned below the featured article that actually filters the grid, a case-study detail page with background orbs, and a closing CTA with an updated background and a reusable Button component in place of a plain link.

**Why this priority**: Case studies are a mid-funnel trust-building surface; functional filtering is a genuinely new behavior (not just styling) and is scoped after the higher-traffic Home/Services/Industries pages.

**Independent Test**: Load `/case-studies`, apply each available filter and confirm only matching cards remain, then open a case-study detail page and confirm the closing CTA and background orbs independently of any other page's state.

**Acceptance Scenarios**:

1. **Given** a visitor on `/case-studies`, **When** the page loads, **Then** background ambient orbs match the reference and no card shows a hover border.
2. **Given** a visitor viewing the hero badge, **When** it renders, **Then** it shows no dot indicator.
3. **Given** a visitor scrolling past the featured article, **When** they reach the filter bar and then continue scrolling, **Then** the bar has a dark background, a visible filter label, sits below the featured article, and remains stuck to the top of the viewport while filterable content scrolls beneath it.
4. **Given** a visitor selecting a filter option, **When** the selection changes, **Then** the case-study grid updates to show only matching entries with no page reload.
5. **Given** a visitor selecting a filter option, **When** that selection matches zero case studies, **Then** the grid is replaced with a "no results" message and a control to clear/reset the filter back to "All", and the filter bar remains usable.
6. **Given** a visitor on a case-study detail page, **When** it renders, **Then** background orbs are present and the closing CTA uses the shared Button component with an updated background.

---

### User Story 5 - Insights: Blog page reference alignment (Priority: P3)

A visitor browsing the blog sees a hero badge without a dot, a dark sticky filter bar with a filter label, and a newsletter panel with an updated background color.

**Why this priority**: The blog already has working topic filtering; this story is a smaller styling-only pass relative to Case Studies.

**Independent Test**: Load `/blog`, confirm the hero badge, sticky filter bar styling, and newsletter panel independently of other Insights pages.

**Acceptance Scenarios**:

1. **Given** a visitor on `/blog`, **When** the hero badge renders, **Then** it shows no dot indicator.
2. **Given** a visitor scrolling past the topic filter, **When** they continue scrolling, **Then** the filter bar has a dark background, shows a filter label, and stays stuck to the top of the viewport.
3. **Given** a visitor selecting a topic filter, **When** that selection matches zero posts, **Then** the grid is replaced with a "no results" message and a control to clear/reset the filter back to "All", and the filter bar remains usable.
4. **Given** a visitor scrolling to the newsletter panel, **When** it renders, **Then** its background color matches the reference.

---

### User Story 6 - Insights: Webinar page reference alignment (Priority: P3)

A visitor lands on the webinar page and sees the upcoming webinar presented inside the hero itself (using the new hero layout) rather than in a separate "Upcoming Live" block, with updated colors and typography in the sessions list.

**Why this priority**: Structural move of the "Upcoming Webinar" content into the hero is a layout change with no new business logic; scoped alongside the other Insights pages.

**Independent Test**: Load `/webinar` and confirm the upcoming session is presented in the hero and the "Upcoming Live" block no longer exists as a separate element.

**Acceptance Scenarios**:

1. **Given** a visitor on `/webinar`, **When** the hero renders, **Then** the upcoming webinar's details appear inside the hero in the new layout.
2. **Given** a visitor viewing the sessions list, **When** it renders, **Then** there is no separate "Upcoming Live" section, and colors/typography match the reference.

---

### User Story 7 - About Us page reference alignment (Priority: P4)

A visitor on the About page sees badges without a dot indicator, eyebrows without their leading accent symbol throughout the page, and an updated image grid layout.

**Why this priority**: Small, self-contained styling changes with no new interactions.

**Independent Test**: Load `/about` and confirm badge/eyebrow treatment and the image grid independently of any other page.

**Acceptance Scenarios**:

1. **Given** a visitor on `/about`, **When** any badge renders, **Then** it shows no dot indicator.
2. **Given** a visitor scrolling the page, **When** any eyebrow renders, **Then** it shows no leading accent symbol.
3. **Given** a visitor viewing the imagery section, **When** it renders, **Then** the grid layout matches the reference.

---

### User Story 8 - Careers page reference alignment (Priority: P4)

A prospective candidate on the Careers page sees updated hero typography/colors/ghost button, an improved sticky filter behavior and alignment in Open Roles, an updated Apply form and ghost Apply-button styling, an updated Life at TechGrit image layout with a new "Inside TechGrit" badge, and refreshed supporting copy.

**Why this priority**: Careers is an important but lower-traffic page than Home/Services/Industries/Insights; changes here are style and minor-interaction only.

**Independent Test**: Load `/careers`, exercise the role filters and the Apply flow, and confirm the Life at TechGrit section independently of the homepage's copy of the same gallery.

**Acceptance Scenarios**:

1. **Given** a visitor on `/careers`, **When** the hero renders, **Then** typography, colors, and the ghost button match the reference.
2. **Given** a visitor scrolling Open Roles, **When** they scroll past the filter row, **Then** it sticks with corrected alignment.
3. **Given** a visitor opening the Apply form, **When** it renders, **Then** its fields and the ghost Apply button match the reference styling.
4. **Given** a visitor viewing Life at TechGrit, **When** it renders, **Then** the image layout matches the reference and a new "Inside TechGrit" badge is present with updated supporting content.

---

### User Story 9 - Contact Us page reference alignment (Priority: P4)

A visitor on the Contact page sees a new left-hand "Skip the Form" card offering a direct scheduling path alongside the existing contact form, with a gradient background matching the reference.

**Why this priority**: Additive, self-contained change to one existing page; lowest interdependency with the rest of the scope.

**Independent Test**: Load `/contact` and confirm the new left-hand card renders alongside the existing form without altering form submission behavior.

**Acceptance Scenarios**:

1. **Given** a visitor on `/contact`, **When** the page renders, **Then** a "Skip the Form" card is visible near the existing form with a gradient background matching the reference.
2. **Given** a visitor submitting the existing contact form, **When** they submit, **Then** the existing client-side success behavior is unchanged.

---

### Edge Cases

- When a Case Studies or Blog filter selection matches zero entries, a "no results" message replaces the grid, with a control to clear/reset the filter back to "All"; the sticky filter bar itself remains usable throughout.
- How does the sticky filter bar (Case Studies / Blog) behave on short viewports where the bar plus header could consume most of the visible area?
- When the "Trusted by our clients" strip is scrollable (logos overflow the container), is the scroll region reachable and operable via keyboard (arrow keys/tab) for keyboard-only and screen-reader users? (No reduced-motion handling is needed since the strip never auto-animates.)
- What happens to the expanded/collapsed state of a Services card when the visitor resizes the viewport across the `md`/`lg` breakpoints mid-interaction?
- What happens if a visitor lands on a URL for one of the reference's other industry tabs (e.g. a FinTech- or Healthcare-specific path) that this feature does not build — is a standard 404 acceptable, or does it need a redirect to `/construction`?
- How does the new homepage Blog section behave if the underlying blog content list has fewer than three entries?

## Clarifications

### Session 2026-08-03

- Q: There is no standalone `/industries` route today — "Industries" in the nav opens the existing `/construction` page, and individual industry cards (Healthcare, FinTech, HiTech) link to a homepage grid section. The new `TechGrit Industries.dc.html` reference is a distinct multi-industry hub (hero + FinTech/Healthcare/Construction tabs) with no single matching existing page. How should the "INDUSTRIES PAGE" scope be resolved? → A: No new route. "Industries" continues to open the existing `/construction` page; the Industries-page bullets (hero ghost button/metrics panel, Challenge eyebrow, What We Build spacing, Why TechGrit eyebrow, Proven Impact equal-height cards, CTA width/buttons) are applied directly to that page, on top of its own separately-listed "Construction Section" bullets. FinTech/Healthcare-specific pages implied by the reference's tabs are not built in this feature and remain unrouted (404 if navigated to directly).
- Q: On Home, which element gets the horizontal-scroll treatment at narrow widths — the subscribe band's input/button row, or the "Trusted by our clients" logo strip? → A: The "Trusted by our clients" logo strip scrolls horizontally (a continuous logo strip, matching this codebase's existing `tg`-prefixed marquee-style motion convention); the subscribe band does not scroll horizontally — its input and button simply wrap/stack per normal responsive behavior.
- Q: For the "How We Deliver" section, what exactly changes on the eyebrow and on the phase-detail card beyond the top-timeline icon swap already specified? → A: The eyebrow's leading symbol/dash is removed, matching the convention already used elsewhere (Industries "Why TechGrit", About). The phase-detail card below the timeline is widened, and its icon — replacing the current giant phase numeral — MUST be the same icon used for that phase in the top timeline, not a separate/distinct icon.
- Q: On the Construction (`/construction`) page, which "cards" have their final CTA link removed? → A: The Proven Impact cards (`construction-impact.tsx`), which today each wrap their content in a link — that per-card link is removed so each card is no longer individually clickable. The page's one final CTA section keeps its own link/buttons.
- Q: Does the Services page need background ambient orbs and hero badge/ghost-button updates, and do these exist today? → A: The Services page has no background ambient orbs today — add them to match the reference. Its hero's top badge currently shows a dot indicator that must be removed (same convention as other pages' badges), and its ghost button needs the same reference styling update used elsewhere.
- Q: When a Case Studies or Blog filter selection matches zero entries, what should the grid show? → A: Show a "no results" message in place of the grid, with a control to clear/reset the filter back to "All".
- Q: For the horizontally-scrolling "Trusted by our clients" logo strip, how should motion preference and keyboard/screen-reader access be handled? → A: No automatic marquee/auto-scroll animation. The strip becomes horizontally scrollable (manual scroll/drag/keyboard) only when the combined logo width exceeds the available container width; when the logos fit within the container, they display statically with no scrolling.
- Q: The "shared foundation" pieces (Badge/eyebrow, ghost button, shared FilterBar, LifeGallery) were sequenced as a Phase 1 that's built before page-specific work in `impact-analysis.md`'s planning breakdown — should that build order also be captured in spec.md? → A: No — build sequencing/phasing is a planning-level decision (it stays in `impact-analysis.md`'s Cross-Page Coordination Notes and Two-Developer Parallel Work Plan, and will be formalized further as task dependencies once `/speckit.tasks` runs); spec.md states WHAT must be true, not in what order it's built. What spec.md was missing, and now states explicitly, is the underlying WHAT-level requirement those shared pieces exist to satisfy: every visual treatment requested on more than one page (badge-dot removal, eyebrow-symbol removal, ghost-button styling, the sticky/dark/labeled filter bar) MUST be one consistent treatment everywhere it appears, not a divergent per-page implementation (see new FR-044).

### Session 2026-08-04

- Q: How should the "10X" and "6 weeks" hero stat colors map to `TechGrit Homepage.dc.html` (lines 333-338), which gives each stat two independently-colored segments rather than one uniform color per stat? → A: Reference-exact. "10" renders white with "X" in amber (`#F7B733`); "6" renders with the brand orange→amber gradient text-clip and " weeks" renders in the same amber (`#F7B733`) as the "X" suffix — not gradient-clipped. The third stat ("zero" / Legacy Debt) stays plain white, unchanged.
- Q: The prior addendum (research.md §5) deliberately centered all hero content, overriding `TechGrit Homepage.dc.html`'s own left-aligned `max-width:780px` hero column, on the theory that spec.md's acceptance scenario required centering. Should that deviation stand? → A: No — reversed. The hero content column (tagline, paragraph, CTA row, stat row) MUST stay left-aligned exactly as the reference shows it; only the column's container remains horizontally centered within the page's max-width wrapper (unchanged from the app's existing outer layout). FR-002 and its acceptance scenario are corrected to match the reference, not the other way around.
- Q: Does the hero's top "Live Webinar" badge need any change beyond what Phase 1's ghost-button work and the FR-004 extraction already cover? → A: Yes — the reference gives this badge a solid gradient inner label chip with a live green status dot plus a looping ripple ring (`animation:tgLiveRipple`), and specific padding/border-radius/gradient/border/blur/shadow values distinct from the app's shared generic `Badge` sizing. None of this exists in the current implementation; it is now in scope as FR-003a, sized and animated to match the reference exactly (not reusing `Badge`'s default dimensions).
- Q: Is the hero headline's current font-size/line-height already reference-correct? → A: Almost — the shared `--text-h1`/`--lh-tight` tokens already resolve to the reference's 62px/1.02 at desktop, but `Hero.tsx`'s h1 carries a per-instance `leading-[0.99]` override that diverges from `--lh-tight` (1.02) for no reference-backed reason. FR-002a requires removing that override so the headline inherits the already-correct shared value.
- Q: For the "6 weeks" stat, is the " weeks" suffix the same 44px size as everything else, given it's already established as non-gradient amber? → A: No — the reference sets " weeks" at a distinctly smaller 26px (vs. 44px for every digit and the "X" suffix). FR-003 is extended to require this size split, not just the color split already recorded above.
- Q: Should the newly-extracted Trusted-Clients section adopt the reference's own plain-background/grayscale-then-color-on-hover logo treatment (research.md addendum §8's prior decision), or keep the app's current white-card logo treatment? → A: Keep the current treatment. The white rounded logo cards, shadow, and hover-lift stay exactly as implemented today — only the section's position (own section, not nested in the hero) and its overflow-scroll behavior are in scope, not a new logo visual treatment. FR-004 is amended accordingly.
- Q: Should "scrollable only if logos overflow" continue to be approximated by a fixed breakpoint (current implementation switches to scroll only below `sm`, since today's 6 logos never overflow above it), or does it need to hold generally? → A: It must hold generally, independent of viewport breakpoint, so the behavior stays correct if the logo count grows. FR-004 now requires the scroll-vs-static decision to be driven by measuring the strip's actual content width against its container at runtime, not inferred from a fixed breakpoint.
- Q: After implementing FR-002a, the hero h1 still rendered at 44px instead of 62px at desktop widths, even though `--text-h1` itself correctly resolved to `clamp(44px, 5.5vw, 62px)`. What's the actual cause, and how far does the fix reach? → A: A legacy, pre-v2-migration `h1 { font-size: 44px; }` rule inside `globals.css`'s `@media (min-width: 960px)` block was unconditionally overriding every page's `h1` at desktop widths — not a Hero-specific bug. It is removed (FR-045); its sibling rules in the same media block are untouched. This has a sitewide blast radius (confirmed fix on About/Construction too, both previously stuck at 44px instead of their own 60px/54px caps) but is in scope here because it was the root cause blocking FR-002a itself.
- Q: The first implementation of FR-003's suffix split rendered "10" and "X" at visibly different sizes. Why, and what's the actual fix? → A: A structural bug, not a data/value bug — the shared 44px font-size was placed on the digit `<span>` instead of the shared wrapper `<div>` both the digit and suffix sit inside. Since the suffix is a sibling of the digit, not its descendant, it never inherited that size. Fixed by moving `text-stat-count`/`tracking-stat-count`/`font-bold` onto the wrapper (matching the reference's own `class="disp"` container, which is where these properties live in `TechGrit Homepage.dc.html`), so both the digit and the "X"/"weeks" suffix inherit the shared size correctly, with only the suffix's own color (and, for "weeks", its own smaller size) overriding per element.
- Q: Was the hero paragraph's styling actually wrong? → A: No — independently verified byte-exact against the reference (`18.5px`/`1.65`/`rgba(255,255,255,0.72)`/`540px`/`26px`, all confirmed via computed styles) both before and after the other fixes in this session. No change was made to it.
- Q: The badge-to-headline gap read as 16px instead of the reference's 38px. Why? → A: The h1's own `margin-top:22px` (reference line 331) was missing entirely — only the badge's `margin-bottom:16px` existed. Fixed by adding the h1's own top margin.
- Q: At mobile widths, should the hero's side padding be the app's shared responsive `--container-padding` token (36→28→20px) or the reference's own literal, non-responsive value? → A: The reference's own literal value — `TechGrit Homepage.dc.html` specifies a flat `36px` with no `@media` reduction at all (it's a desktop-only export). `Hero.tsx` reverts to plain `px-9` (36px at every breakpoint), not the app's `--container-padding` stepping. Measurement during this decision showed padding was never going to fix the mobile 3-line headline wrap either way — even zero padding leaves an 18px shortfall against "Software is no longer built." alone at the shared mobile `--text-h1` size — so this is purely a "match the reference's literal value" decision, not a wrap-count fix.
- Q: Given the padding revert doesn't fix it, is the mobile 3-line headline wrap in scope for this pass? → A: Not resolved in this pass. Three remediation paths were identified (shrink the shared mobile `--text-h1` token sitewide, drop the forced `<br/>` below `sm` and let the phrase reflow naturally, or accept the 3-line wrap as normal responsive behavior) but none has been chosen — the reference itself defines no mobile treatment to adjudicate between them. Left open for a future decision (research.md §6b).

### Session 2026-08-05

- Q: What section-level padding should the subscribe band's container use? → A: 80px vertical / 36px horizontal, matching `TechGrit Homepage.dc.html`'s literal `padding:80px 36px 80px` value.
- Q: SubscribeBand's outer container is currently `max-w-[1020px]`, but the reference uses `max-width:1280px` — the same width already correctly used by the adjacent Trusted-Clients section right above it. Should the subscribe card's container widen to 1280px? → A: Yes — widen to 1280px, matching the reference and the sibling Trusted-Clients section's container width; the current 1020px was an unintentional outlier, not a deliberate narrower-reading-width choice.
- Q: The Name/Email inputs currently use fixed pixel widths (`w-[150px]`/`w-[180px]`). The reference instead uses a flexible proportional layout (`flex:1` for Name, `flex:2` for Email, full-width, no wrap). Should inputs switch to the reference's flexible proportional widths? → A: Yes — switch to the reference's flexible `flex:1`/`flex:2` proportional widths so the form fills the available row width responsively instead of leaving fixed-width gaps.
- Q: The reference's `<section>` for the subscribe band declares no background or border at all, but the current implementation adds an extra `rgba(255,255,255,0.015)` background tint and a top border that don't exist in the reference. Should these be removed to match the reference exactly? → A: Yes — remove both; the page's black background shows through untinted between the Trusted-Clients and Subscribe sections, matching the reference exactly.
- Q: The reference's Submit button uses `15px` vertical padding and an explicit `min-height:52px` (aligning its height with the 52px-tall input fields); the current button uses `12px` vertical padding with no min-height set. Should the button's sizing be corrected to match? → A: Yes — match the reference exactly (`15px` padding, `min-height:52px`), vertically aligning the button with the adjacent input fields.
- Q: FR-006 says the phase-detail card and top-timeline step markers show icons "in place of the bare numerals," but doesn't say whether all 4 phases share one common icon or each phase gets its own distinct icon. `TechGrit Homepage.dc.html` shows 4 visibly different icons (circle+flag / forward-arrows / shield+check / torch), one per phase. Which should the spec require? → A: 4 distinct, reference-exact icons — extracted verbatim from the reference's 4 SVGs, one per phase, with the same icon reused identically in both the top-rail node and the enlarged phase-detail circle for that phase (not a single icon shared across all 4 phases).
- Q: The prior clarification (Session 2026-08-03) said the phase-detail card is "widened" but never gave a target value. The current implementation's content column is `max-w-[1100px]`; the reference's own inner wrapper for this section is `max-width:1280px` (matching every other homepage section). What should "widened" resolve to? → A: `1280px` — matches `TechGrit Homepage.dc.html` exactly and is consistent with every other homepage section's container width.
- Q: The reference's own CSS tries to collapse the phase-detail panel (`1.25fr 0.75fr` grid) to one column at narrow widths, but the selector it uses (`[data-phase-card]`/`[data-step-panel]`) doesn't actually match the panel's real `data-phase-panel` attribute — so it never fires, even in the reference itself. Should the spec require the collapse anyway? → A: Yes — collapse to a single column at the app's canonical `md` breakpoint (960px); the reference's broken selector is a preview-tool authoring bug, not an intentional two-column-on-mobile design, and a fixed 1.25fr/0.75fr split would visibly break on tablet/mobile widths.
- Q: What exactly should replace the phase-detail visual panel's current giant numeral (a 170px-font-size gradient-text digit)? → A: A 170px-diameter circular badge with the reference's `linear-gradient(140deg,#F7B733,#E87722)` background, containing the phase's icon at 82px (the same icon used in that phase's top-rail node, per the icon-design answer above), with the reference's "Phase 0{n}" label pinned to the badge's bottom-right (`11.5px`, `0.18em` tracking, `rgba(255,255,255,0.4)`) — matching `TechGrit Homepage.dc.html` lines 491-497 exactly.
- Q: `MethodologySection.tsx`'s phase-title and phase-week labels (top rail) both carry a hardcoded `fontFamily: "Arial, sans-serif"` inline override. Is this reference-backed? → A: No — confirmed bug, not a design choice. `TechGrit Homepage.dc.html`'s `titleStyle`/`weekStyle` objects (lines 1378-1379) set no `font-family` at all (they inherit the page's body font), and the app's own brand system (Principle V) never uses Arial. Both hardcoded overrides MUST be removed so the labels inherit the shared `--font-body`/`--font-display` stack like every other page element.
- Q: `/speckit.analyze` flagged FR-006's "reusable by other pages" clause as a Constitution Alignment issue (C1) — `MethodologySection.tsx` hardcodes an import of `./home-data`, and the constitution's own rule ("nothing moves to `components/ui/` until genuinely consumed by more than one route") means the requirement can't be honestly satisfied without a named second consumer. `TechGrit Frameworks.dc.html` (raw-files-v2) has a "Framework Portfolio" section using the exact same scroll-pinned phase-panel mechanic (its own source comment: "same technique as homepage Sprint-to-Scale"), and `nav-config.ts` already links to a currently-404ing `/frameworks` route. Should this feature's scope expand to build that page's Framework Portfolio section as the real second consumer, or stay limited to making `MethodologySection` generically reusable without shipping a second consuming page? → A: Keep it generic-but-unconsumed for now. Refactor `MethodologySection` to accept its content via props (decoupled from `home-data.ts`), but do not build `/frameworks` in this feature — that page remains out of scope, unchanged from the existing Assumption below. The component stays in `app/_home-components/` (not moved to `components/ui/`) since no second route consumes it yet, per the constitution's own anti-speculative-structure rule.
- Q: Since `/frameworks` isn't being built now, how far should the refactored component's props go — matching only today's exact visual shape (one accent color, single-column deliverables checklist), or anticipating Frameworks' fuller shape (per-phase accent color, a 2-column features+"Best for"+CTA content mode) even without a consumer to prove it? → A: Minimal — parameterize only phases data, per-phase icon, eyebrow text, and heading (decoupling from `home-data.ts` and satisfying "reusable" honestly), keeping today's exact visual behavior (one fixed accent color, single-column checklist) as the only supported shape. No props are added for Frameworks-specific variations (per-phase accent color, features grid, CTA row) since no current consumer needs them — consistent with the constitution's "don't pre-scaffold speculative structure" rule.
- Q: **Reverses the file-location half of the prior C1 answer above.** Should the scroll-pinned phase-showcase engine actually be extracted into `components/ui/` now, with `app/_home-components/MethodologySection.tsx` becoming a thin wrapper that supplies homepage-specific content to it — even though only the homepage consumes it in this feature, which is the exact situation the constitution's anti-speculative-structure rule is written to prevent? → A: Yes — extract now. Create a new `components/ui/` primitive holding the generic scroll-pin/rail/panel engine; `MethodologySection.tsx` stays in `app/_home-components/` as a thin homepage-specific wrapper around it. This is a deliberate, explicit exception to the anti-speculative-structure rule, made here by direct instruction rather than left as silent drift — the props-shape decision (minimal props, no Frameworks-specific fields) from the prior two answers is unaffected, only the file location changes.
- Q: `SectionEyebrow` (`components/ui/section-eyebrow.tsx`) has no `className` prop, so no consumer can override its built-in spacing — this is why the Methodology eyebrow's margin-bottom was previously left at the component's default `16px` instead of the reference's `14px` (an accepted, documented delta). Should `SectionEyebrow` gain a `className` prop to allow instance-specific pixel fixes? → A: Yes — add an optional `className` prop that merges onto `SectionEyebrow`'s outer wrapper `<div>` (additive, not a replacement of its base classes), the same additive-className convention `Button`/`Badge` already use. The Methodology eyebrow then uses it to correct its margin-bottom to the reference's `14px`, closing the previously-accepted delta. No other `SectionEyebrow` consumer changes behavior (the prop is optional and unused elsewhere).
- Q: `TechGrit Homepage.dc.html` (lines 148-158) defines its own page-level ambient-orb background — 4 orbs, all warm-toned (the file's own comment: "brand-warm shades of black, no cool casts") — with different positions, sizes, opacities, and blur radii than the shared, globally-wired `AmbientOrbs` component (`components/ui/ambient-orbs.tsx`), which also includes a blue orb the homepage reference explicitly avoids. `/construction` already has an established precedent for this exact situation: it opts out of the shared component (via a pathname check inside `AmbientOrbs`) and renders its own page-local, token-based orb markup. Should the homepage follow the same pattern? → A: Yes — add `/` to `AmbientOrbs`' exclusion check (exact-match, not `startsWith`, so it doesn't accidentally exclude every route) and add homepage-local ambient-orb markup (reference-exact: 4 orbs, positions/sizes/opacities/blur radii/animation timings from `TechGrit Homepage.dc.html` lines 148-158) to `app/_home-components/`, using tokens for the color values per Principle I (matching Construction's `var(--color-overlay-orange)`-style convention, not raw `rgba()` literals). Scoped strictly to the homepage's own background layer — no other page's orb treatment changes.
- Q: **Revises the file-location and styling-mechanism halves of the answer above.** `app/case-studies/[slug]/page.tsx` already establishes a different, newer precedent for a page-local orb override than Construction's: Tailwind utility classes end to end (`className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full bg-overlay-teal blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]"`) with zero `style={{...}}` objects, unlike Construction's inline-`style` approach. Given this newer, no-inline-style convention already exists in the codebase, should the homepage's 4-orb variant follow it instead of Construction's pattern, and should it live inside the shared `components/ui/ambient-orbs.tsx` itself (branching on the exact `/` pathname to render a second orb set) rather than as a separate `app/_home-components/` file plus a route-exclusion entry? → A: Yes to both. `components/ui/ambient-orbs.tsx` gains a `pathname === "/"` branch rendering the homepage's own reference-exact 4-orb, all-warm-toned set entirely via Tailwind classes — arbitrary-value utilities for position/size/blur/animation timing (matching `case-studies/[slug]/page.tsx`'s exact convention: `top-[...]`, `w-[...]`, `blur-[...]`, `animate-[tgorb_..._infinite...]`) and canonical `bg-overlay-*` utilities for color (Principle I) — no inline `style` anywhere in the file. No route-exclusion-check addition and no new `app/_home-components/` file: the homepage keeps going through the same shared, globally-wired component, just a different rendering branch of it. The existing 3-orb default (still used by every route except `/case-studies`, `/construction`, and now-branched `/`) is converted to the same Tailwind-class convention in the same pass, for consistency within one file — no inline style survives anywhere in `ambient-orbs.tsx`.

## Requirements *(mandatory)*

### Functional Requirements

**Home Page**

- **FR-001**: The hero MUST show one top tagline treatment and MUST NOT show a separate sub-tagline element.
- **FR-002**: The hero content column's outer position MUST stay horizontally centered within the page's max-width container (unchanged from the app's existing outer layout). The tagline, supporting copy, CTA row, and metrics row inside that column MUST be left-aligned, exactly as `TechGrit Homepage.dc.html` shows it — not centered. The hero MUST NOT include a clickable scroll-indicator affordance.
- **FR-002a**: The hero headline MUST render at the reference's 62px/1.02-line-height sizing already provided by the app's shared `--text-h1`/`--lh-tight` tokens, with no per-instance override (e.g. a diverging `line-height`) that departs from those shared values.
- **FR-003**: The hero's ghost (secondary) button and the metrics display MUST use the updated reference styling, including per-segment stat coloring and sizing: the "10" and "6" stat numbers/suffixes MUST NOT share one uniform color — "10" is white with its "X" suffix in amber, "6" uses the brand orange→amber gradient text-clip with its " weeks" suffix in the same amber (not gradient); the third stat ("zero" / Legacy Debt) stays plain white. The " weeks" suffix MUST additionally render at the reference's smaller 26px size — every digit and the "X" suffix stay at the full 44px stat size.
- **FR-003a**: The hero's top "Live Webinar" badge MUST show a live green status dot with a looping ripple/pulse ring inside its inner label chip (not a static dot), and the badge's full sizing — outer padding, border-radius, gradient background, border, blur, and inner-chip treatment — MUST match the reference's values exactly, distinct from the app's shared generic `Badge` component sizing.
- **FR-004**: The "Trusted by our clients" logo strip MUST render as its own section positioned after the hero, not nested inside the hero component, with spacing matching the reference, and MUST retain its current (pre-extraction) visual treatment — white rounded logo cards, shadow, and hover-lift — rather than adopting the reference's own plain-background/grayscale logo treatment. The strip's scroll-vs-static behavior MUST be driven by measuring its actual content width against its container at runtime: when the combined width of the logos exceeds the available container width, the strip MUST become horizontally scrollable (manual scroll/drag/keyboard — no automatic marquee animation); when the logos fit within the container, they MUST display statically with no scrolling — independent of viewport breakpoint, so the behavior continues to hold if more logos are added later.
- **FR-005**: The subscribe band's section container MUST use the reference's `max-width:1280px` with `80px` vertical / `36px` horizontal padding (matching the adjacent Trusted-Clients section's container width), and the outer section element MUST NOT carry any background tint or top border of its own beyond what the reference specifies (none) — the underlying page background shows through unmodified. The Name and Email inputs MUST use the reference's flexible proportional widths (`flex:1` / `flex:2` of the available row width, spanning the full row, no wrap) rather than fixed pixel widths. The Submit button MUST use the reference's `15px` vertical / `24px` horizontal padding with an explicit `min-height:52px` matching the input fields' height. It does NOT scroll horizontally — its input and button wrap/stack per normal responsive behavior at narrow widths.
- **FR-006**: The "How We Deliver" section MUST be implemented as a component reusable by other pages — concretely, the scroll-pinned phase-showcase engine (rail, progress fill, phase-detail panel, pin mechanics) MUST be extracted into a new `components/ui/` primitive, accepting phases data, per-phase icon, eyebrow text, and heading as props; `app/_home-components/MethodologySection.tsx` becomes a thin homepage-specific wrapper supplying that content, no longer importing `home-data.ts` internally. This is a deliberate, explicitly-recorded exception to the constitution's anti-speculative-structure rule (Clarifications, Session 2026-08-05) — building `/frameworks`'s own "Framework Portfolio" section (which uses this same scroll-pinned pattern, per `TechGrit Frameworks.dc.html`) remains explicitly out of scope, per the Assumptions below. Its eyebrow MUST render without its leading accent symbol (the same `SectionEyebrow` toggle as FR-017/FR-019/FR-033); the top step markers MUST show icons in place of the bare numerals; and the phase-detail card below the timeline MUST be widened and MUST show, in place of its current numeral, the same icon used for that phase in the top timeline (not a separate/distinct icon). Each of the 4 phases MUST use its own distinct icon (reference-exact: circle+flag for Architect, forward-arrows for Agentic Build, shield+check for Industrialize, torch for Impact) — not one icon shared across all phases. The section's content column MUST widen to `1280px` (from the current `1100px`), matching `TechGrit Homepage.dc.html`'s own inner-wrapper width. The phase-detail card's two-column (`1.25fr 0.75fr`) grid MUST collapse to a single column at the `md` breakpoint (960px), independent of the reference's own broken collapse selector. The phase-detail card's visual panel MUST replace its current 170px-font-size gradient-text numeral with a 170px-diameter circular badge (`linear-gradient(140deg,#F7B733,#E87722)` background) containing that phase's icon at 82px, with the reference's "Phase 0{n}" label pinned to the badge's bottom-right. The top-rail phase title and week labels MUST NOT carry a hardcoded `font-family` override (a confirmed bug, not reference-backed) — both MUST inherit the shared `--font-body`/`--font-display` stack like every other page element.
- **FR-006a**: `SectionEyebrow` (`components/ui/section-eyebrow.tsx`) MUST accept an optional `className` prop that merges onto its outer wrapper element (additive, matching the convention already used by `Button`/`Badge`), so a consumer can correct instance-specific spacing without forking the component. The "How We Deliver" eyebrow MUST use this to correct its margin-bottom to the reference's `14px` (replacing the previously-accepted `16px` default-spacing delta). No other existing `SectionEyebrow` consumer's rendered output changes.
- **FR-006b**: The homepage MUST show its own page-level ambient-orb background matching `TechGrit Homepage.dc.html` (lines 148-158) exactly — 4 orbs, reference-exact positions/sizes/opacities/blur radii/animation timings, all warm-toned (no blue) — instead of the shared, globally-wired `AmbientOrbs` component's default 3-orb set (which includes a blue orb not present in this reference). This variant MUST live inside `components/ui/ambient-orbs.tsx` itself, as a branch keyed on an exact match of the pathname to `/` (not a route-exclusion entry plus a separate page-local file). Both the homepage's 4-orb variant and the component's existing default 3-orb set MUST be implemented entirely with Tailwind utility classes — arbitrary-value position/size/blur/animation-timing classes plus canonical `bg-overlay-*` color utilities, per the convention already established by `app/case-studies/[slug]/page.tsx` — with no inline `style` objects anywhere in the file.
- **FR-007**: The "Don't Migrate / Re-Imagine" section MUST be a four-card grid, all four cards built from the shared `GlassCard` component:
  - Cards 1-3 are differentiator points (icon, title, description, and imagery), sharing one common icon across all three (the star-burst icon already used identically on all three differentiator cards in `raw-files-v2/TechGrit Website V2.2/TechGrit Homepage.dc.html`). Each card's imagery MUST use its real asset already present at `public/samples/dm-copilot.png`, `public/samples/dm-tech-debt.png`, and `public/samples/dm-scalability.png` respectively — no placeholder state applies to this section.
  - Card 4 is the existing "Why AI-First Matters" panel — title "Why AI-First Matters", description "We don't 'add' AI to our process; we built our process around the capabilities of LLMs and autonomous agents.", and the traditional-vs-OrbitAI comparison bars in place of imagery — with its icon replaced by the TechGrit icon (distinct from the shared icon on cards 1-3).
  - Cards 1-3 MUST show a hover background-color fill (`--color-hover-orange-fill-14`) in addition to any existing hover border/shadow treatment.
  - Card 4 MUST opt out of `GlassCard`'s default hover lift/border-color treatment entirely (no translate, no border-color change, no background fill on hover) — the reference shows no hover state on this panel, and adopting the shared component's default hover MUST NOT introduce one.
  - This card-based structure replaces the previous plain-div layout for both the 3-card row and the panel, while preserving the current pixel-exact layout otherwise.
  - For every element this section shares with `raw-files-v2/TechGrit Website V2.2/TechGrit Homepage.dc.html` (card spacing, radius, padding, image sizing, hover transform/shadow geometry, typography), the implementation MUST match the reference's exact values; literal measurements are worked out in the technical plan rather than enumerated here.
- **FR-008**: The existing standalone Construction page ("Construction Section" in the request) MUST use the updated ghost button styling, replace its current icon set, remove its hero background image, and remove the per-card link currently wrapping its Proven Impact cards (see also FR-020) so those cards are no longer individually clickable — the page's one final CTA section retains its own link/buttons.
- **FR-009**: The Testimonials section MUST left-align its eyebrow and title, MUST show a metrics card in the top-right, MUST update card hover background/typography/duration-badge styling, MUST show a star rating, an avatar, an animated play affordance, a verified badge, and quotation-mark icons on each testimonial.
- **FR-010**: A new Blog section MUST be added to the homepage with a left-aligned eyebrow+title, a right-aligned ghost button, and three blog cards, each showing an icon, a background color, a description, and a working "Read More" interaction; content MUST be sourced from the existing blog content used on `/blog`.
- **FR-011**: The Life at TechGrit section MUST use the reference's photo-grid layout and MUST show two action buttons.
- **FR-012**: The closing CTA section MUST use the reference's card width and clickable-text typography.

**Services Page**

- **FR-013**: Each of the three top-level service cards MUST become expandable/collapsible in place to reveal its related sub-services, independent of the other two cards' state.
- **FR-013a**: The Services page MUST show background ambient orbs matching the reference (no background orbs exist on this page today).
- **FR-013b**: The Services hero's top badge MUST render without its current dot indicator, and its ghost button MUST use the updated reference styling.
- **FR-014**: Service cards MUST show the reference's hover background color.
- **FR-015**: The closing CTA section MUST use the reference's card width and CTA button styling.

**Industries (`/construction`) Page** — no new route; these apply to the existing `/construction` page alongside the Home Page "Construction Section" requirements above (FR-008)

- **FR-016**: The "Industries" nav item MUST continue to open the existing `/construction` page; no new `/industries` route is introduced, and paths implied by the reference's other industry tabs (FinTech, Healthcare) are not routed in this feature.
- **FR-016a**: The `/construction` hero MUST present the reference's ghost button and metrics-panel background.
- **FR-017**: The Challenge section's eyebrow MUST render without its leading accent symbol (the same `SectionEyebrow` toggle as FR-006/FR-019/FR-033 — not a literal text character to trim).
- **FR-018**: Spacing between "What We Build" subsections MUST match the reference.
- **FR-019**: The "Why TechGrit" eyebrow MUST render without its leading accent symbol (same toggle as FR-006/FR-017/FR-033).
- **FR-020**: "Proven Impact" cards MUST render at equal height within each row regardless of content length.
- **FR-021**: The closing CTA MUST use an increased width, updated styling for both action buttons, and updated ghost-button styling.

**Insights — Case Studies**

- **FR-022**: Background ambient orbs across Case Studies pages MUST match the reference, and cards MUST NOT show a hover border.
- **FR-023**: The hero badge MUST render without a dot indicator.
- **FR-024**: The filter bar MUST use a dark background, MUST display a filter label, MUST be positioned below the featured article, MUST remain fixed to the top of the viewport once scrolled to, and MUST functionally filter the case-study grid with no full page reload. When a filter selection matches zero entries, the grid MUST be replaced with a "no results" message and a control to clear/reset the filter back to "All"; the filter bar MUST remain usable while this message is shown.
- **FR-025**: Case-study detail pages MUST show background ambient orbs matching the reference.
- **FR-026**: The closing CTA section MUST use the reference's updated background and MUST use the shared reusable Button component in place of a plain link.

**Insights — Blog**

- **FR-027**: The hero badge MUST render without a dot indicator.
- **FR-028**: The topic filter bar MUST use a dark background, MUST display a filter label, and MUST remain fixed to the top of the viewport once scrolled to. When a topic selection matches zero posts, the grid MUST be replaced with a "no results" message and a control to clear/reset the filter back to "All"; the filter bar MUST remain usable while this message is shown.
- **FR-029**: The newsletter panel MUST use the reference's updated background color.

**Insights — Webinar**

- **FR-030**: The upcoming webinar's details MUST be presented inside the hero using the reference's combined hero+upcoming-session layout, rather than as a separate section.
- **FR-031**: The sessions list MUST NOT show a separate "Upcoming Live" element, and MUST use the reference's updated colors and typography.

**About Us Page**

- **FR-032**: Badges MUST render without a dot indicator anywhere on the page.
- **FR-033**: Eyebrows MUST render without their leading accent symbol anywhere on the page (same toggle as FR-006/FR-017/FR-019).
- **FR-034**: The imagery/showcase section MUST use the reference's grid layout.

**Careers Page**

- **FR-035**: The hero MUST use the reference's typography, colors, and ghost-button styling.
- **FR-036**: The Open Roles filter row MUST use the reference's sticky behavior and alignment.
- **FR-037**: The Apply form MUST use the reference's field styling, and the ghost Apply button MUST use the reference's styling.
- **FR-038**: The Life at TechGrit section on Careers MUST use the reference's image layout, MUST show a new "Inside TechGrit" badge, and MUST use updated supporting copy.

**Contact Us Page**

- **FR-039**: A new "Skip the Form" card MUST be added near the existing contact form, offering a direct scheduling path, using the reference's gradient background.
- **FR-040**: The existing contact form's current client-side submission behavior MUST remain unchanged.

**Cross-Cutting**

- **FR-041**: Any color, spacing, radius, shadow, typography, opacity, blur, gradient, or timing value introduced by a reference that has no existing equivalent MUST be added as a named token rather than hardcoded inline.
- **FR-042**: Every change MUST preserve existing page routes, existing navigation targets, and existing business logic (e.g., form submission behavior, filter data sources) unless a requirement above explicitly changes it.
- **FR-043**: Every updated or new section MUST render correctly at the three canonical breakpoints already in use across the application (desktop, tablet, and mobile).
- **FR-044**: Where a visual treatment is requested on more than one page — badge-dot removal (Services, Case Studies, Blog, About), eyebrow-symbol removal (How We Deliver, Industries, About), ghost-button styling (Home, Construction/Industries, Services, Careers), and the sticky/dark/labeled filter bar (Case Studies, Blog) — it MUST be one consistent treatment applied identically everywhere it appears, not a divergent implementation per page.
- **FR-045**: The legacy `h1 { font-size: 44px; }` rule inside `globals.css`'s `@media (min-width: 960px)` block — a leftover from the pre-v2-migration discrete-breakpoint system that unconditionally overrides every page's token-driven `--text-h1` clamp at desktop widths — MUST be removed, without altering that media block's other, unrelated rules. Every page's h1 MUST resolve to its own intended cap at desktop width (e.g. Home 62px, About 60px, Construction 54px) rather than a uniform 44px.

### Key Entities

Not applicable — this feature changes presentation only. No new data entities, persistence, or content types are introduced; the one new UI element with a content shape (the homepage Blog section) reuses the existing blog-post content already modeled for `/blog`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every one of the 9 in-scope page experiences visually matches its `raw-files-v2` reference — typography, spacing, color, icons, and layout — with zero unresolved visual discrepancies at final design review, at each of the three canonical breakpoints. **Approved exception (Trusted Clients)**: the Homepage Trusted-Clients logo strip intentionally keeps its current white-card treatment rather than the reference's grayscale-then-color-on-hover styling (FR-004, Clarifications Session 2026-08-04) — this is a recorded, approved discrepancy, not a gap to flag at review. **Approved exception (Re-Imagine grid)**: the "Don't Migrate / Re-Imagine" section intentionally has a 4th card, a hover background-color fill on cards 1-3, and a TechGrit-icon card 4 — none of which exist in the reference's own 3-card, hover-less version of this section (FR-007) — this is a recorded, approved discrepancy, not a gap to flag at review.
- **SC-002**: Every updated interactive element (buttons, cards, filters) demonstrates the correct hover, active, and focus treatment on first inspection, for 100% of the components touched by this feature.
- **SC-003**: The Case Studies and Blog filter controls return the correct set of results for every available filter value, with no full-page reload and no console errors.
- **SC-004**: All pre-existing functionality unrelated to this feature's requirements (navigation, routing, the contact form's submission flow, existing filters) continues to work exactly as before, with zero regressions.
- **SC-005**: The production lint and build gates (already required by this repository's pre-commit process) remain green after all changes.
- **SC-006**: No new hardcoded color, spacing, radius, shadow, or gradient value duplicates an existing design token anywhere in the changed code.

## Assumptions

- Phase 1 functionality (routing, forms, business logic, content data) is complete and unchanged except where a requirement above explicitly calls for a behavior change (Services card expand/collapse, Case Studies filtering, Contact's new card).
- "Construction Section" bullets in the original request (Ghost Button, icon replacement, background-image removal, final-CTA-link removal) refer to the existing standalone `/construction` deep-dive page (`app/construction/`), not a section embedded in the homepage — the homepage has no dedicated Construction section with a background image, ghost button, or CTA link; Construction appears there only as one card inside the Industries preview grid. Per Clarifications, the "INDUSTRIES PAGE" bullets target this same `/construction` page — there is no separate new route.
- The homepage's "Clients Section" refers to the existing "Trusted by our clients" logo strip currently rendered as part of the hero component; "move outside the Hero section" means promoting it to its own top-level section in the same document position shown in `TechGrit Homepage.dc.html`.
- The new homepage Blog section and the "Life at TechGrit" gallery reuse existing shared content/components (blog content data, and the gallery component already shared with Careers) rather than introducing parallel copies.
- Case-study detail background orbs reuse whatever shared ambient-orb presentation already exists elsewhere in the app rather than introducing a new one.
- `TechGrit Frameworks.dc.html` (present in `raw-files-v2` but not named anywhere in the page-wise request) is out of scope for this feature — its own "Framework Portfolio" section reuses the same scroll-pinned phase-panel pattern as Home's "How We Deliver" (informing FR-006's reusable-component prop shape, Clarifications Session 2026-08-05), but building `/frameworks` itself (the route `nav-config.ts` already links to, currently 404ing) remains a future feature's work.
- Visual fidelity is judged at this repository's existing canonical breakpoints (desktop ≥1140px, tablet 560–1139px, mobile <560px), not arbitrary device sizes.
- No new third-party libraries are introduced; expand/collapse, sticky, and horizontal-scroll behaviors are achieved with the existing stack (React/Tailwind/CSS).
- Build order/sequencing (e.g., which shared pieces are built before page-specific work, and how work splits across developers) is intentionally not specified here — that is a planning-level concern tracked in `impact-analysis.md`'s "Cross-Page Coordination Notes" and "Two-Developer Parallel Work Plan", and will be formalized further as task dependencies once `/speckit.tasks` runs. Note this is unrelated to the first bullet's "Phase 1" (this feature's prerequisite, the already-shipped v1 product) — the planning doc's "Phase 1" instead names the first build phase *within this feature* (the shared-foundation fixes required by FR-044).
