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

1. **Given** a visitor on `/` at desktop width, **When** the page loads, **Then** the hero shows one centered tagline (no sub-tagline), centered supporting copy/CTAs/metrics, no scroll-indicator affordance, and the "Trusted by our clients" logo strip appears as a section below the hero rather than inside it, becoming horizontally scrollable only if its logos overflow the container width (no automatic animation) and displaying statically otherwise.
2. **Given** a visitor on `/` at a narrow (mobile) width, **When** they reach the subscribe band, **Then** the email input and submit button use the reference's width/styling and wrap/stack normally — the subscribe band itself does not scroll horizontally.
3. **Given** a visitor viewing the "How We Deliver" section, **When** they view the eyebrow, the phase timeline, and the phase-detail card, **Then** the eyebrow shows no leading symbol, the timeline's step numbers are represented as icons (not bare numerals), and the widened phase-detail card shows the same icon as the corresponding step in the timeline (not a distinct icon or numeral).
4. **Given** a visitor viewing the Testimonials section, **When** they hover a video testimonial card, **Then** it shows the reference's hover background, a duration badge, a star rating, an avatar, an animated play affordance, a verified badge, and quotation-mark iconography.
5. **Given** a visitor scrolling to the new Blog section, **When** it renders, **Then** it shows a left-aligned eyebrow+title, a right-aligned ghost button, and three blog cards (icon, colored background, description, and a working "Read More" interaction) sourced from the same blog content used on `/blog`.
6. **Given** a visitor viewing the Life at TechGrit section, **When** it renders, **Then** the photo grid matches the reference layout and two action buttons are present.
7. **Given** a visitor viewing the closing CTA section, **When** it renders, **Then** the card width and the clickable-text typography match the reference.

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

A visitor who clicks "Industries" in the nav still lands on the existing `/construction` page (no new route), and now sees a hero with an updated ghost button and metrics panel background, a "Challenge" section without a stray dash in its eyebrow, evenly spaced "What We Build" content, a "Why TechGrit" section without an eyebrow symbol, equal-height "Proven Impact" cards, and a widened closing CTA with two updated action buttons and ghost-button styling.

**Why this priority**: Industry positioning directly supports sales conversations; scoped after the two pages with the widest surface area.

**Independent Test**: Load `/construction` end to end (hero → challenge → what-we-build → why-TechGrit → proven-impact → CTA) and confirm each subsection independently matches `TechGrit Industries.dc.html` and `TechGrit Construction.dc.html`.

**Acceptance Scenarios**:

1. **Given** a visitor who clicks "Industries" in the nav, **When** the app navigates, **Then** it opens the existing `/construction` page (no new route is introduced), and the hero's ghost button and metrics panel background match the reference.
2. **Given** a visitor viewing the Challenge section, **When** the eyebrow renders, **Then** it shows no leading dash character.
3. **Given** a visitor viewing "Why TechGrit", **When** the eyebrow renders, **Then** it shows no symbol/glyph prefix.
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

A visitor on the About page sees badges without a dot indicator, eyebrows without a symbol prefix throughout the page, and an updated image grid layout.

**Why this priority**: Small, self-contained styling changes with no new interactions.

**Independent Test**: Load `/about` and confirm badge/eyebrow treatment and the image grid independently of any other page.

**Acceptance Scenarios**:

1. **Given** a visitor on `/about`, **When** any badge renders, **Then** it shows no dot indicator.
2. **Given** a visitor scrolling the page, **When** any eyebrow renders, **Then** it shows no leading symbol/glyph.
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

## Requirements *(mandatory)*

### Functional Requirements

**Home Page**

- **FR-001**: The hero MUST show one top tagline treatment and MUST NOT show a separate sub-tagline element.
- **FR-002**: All hero content (tagline, supporting copy, CTAs, metrics) MUST be horizontally centered, and MUST NOT include a clickable scroll-indicator affordance.
- **FR-003**: The hero's ghost (secondary) button and the metrics display MUST use the updated reference styling.
- **FR-004**: The "Trusted by our clients" logo strip MUST render as its own section positioned after the hero, not nested inside the hero component, with spacing matching the reference. When the combined width of the logos exceeds the available container width, the strip MUST become horizontally scrollable (manual scroll/drag/keyboard — no automatic marquee animation); when the logos fit within the container, they MUST display statically with no scrolling.
- **FR-005**: The subscribe band MUST use the reference's overall width, input styling, and button styling; it does NOT scroll horizontally — its input and button wrap/stack per normal responsive behavior at narrow widths.
- **FR-006**: The "How We Deliver" section MUST be implemented as a component reusable by other pages; its eyebrow MUST render without its current leading symbol/dash; the top step markers MUST show icons in place of the bare numerals; and the phase-detail card below the timeline MUST be widened and MUST show, in place of its current numeral, the same icon used for that phase in the top timeline (not a separate/distinct icon).
- **FR-007**: The "Don't Migrate / Re-Imagine" card grid (4 cards) MUST use one common icon across cards (except the last), MUST show a hover background color, MUST include imagery, and its last card MUST use the TechGrit icon.
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
- **FR-017**: The Challenge section's eyebrow MUST render without a leading dash character.
- **FR-018**: Spacing between "What We Build" subsections MUST match the reference.
- **FR-019**: The "Why TechGrit" eyebrow MUST render without a symbol/glyph prefix.
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
- **FR-033**: Eyebrows MUST render without a leading symbol/glyph anywhere on the page.
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

### Key Entities

Not applicable — this feature changes presentation only. No new data entities, persistence, or content types are introduced; the one new UI element with a content shape (the homepage Blog section) reuses the existing blog-post content already modeled for `/blog`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every one of the 9 in-scope page experiences visually matches its `raw-files-v2` reference — typography, spacing, color, icons, and layout — with zero unresolved visual discrepancies at final design review, at each of the three canonical breakpoints.
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
- `TechGrit Frameworks.dc.html` (present in `raw-files-v2` but not named anywhere in the page-wise request) is out of scope for this feature.
- Visual fidelity is judged at this repository's existing canonical breakpoints (desktop ≥1140px, tablet 560–1139px, mobile <560px), not arbitrary device sizes.
- No new third-party libraries are introduced; expand/collapse, sticky, and horizontal-scroll behaviors are achieved with the existing stack (React/Tailwind/CSS).
- Build order/sequencing (e.g., which shared pieces are built before page-specific work, and how work splits across developers) is intentionally not specified here — that is a planning-level concern tracked in `impact-analysis.md`'s "Cross-Page Coordination Notes" and "Two-Developer Parallel Work Plan", and will be formalized further as task dependencies once `/speckit.tasks` runs. Note this is unrelated to the first bullet's "Phase 1" (this feature's prerequisite, the already-shipped v1 product) — the planning doc's "Phase 1" instead names the first build phase *within this feature* (the shared-foundation fixes required by FR-044).
