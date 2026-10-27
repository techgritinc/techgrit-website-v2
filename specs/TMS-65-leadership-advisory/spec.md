# Feature Specification: Leadership & Advisory Page (About sub-route restructure)

**Feature Branch**: `TMS-65-leadership-advisory`
**Ticket**: TMS-65
**Created**: 2026-08-20
**Status**: Draft
**Reference (source of truth)**: `raw-files-v3/TechGrit Website V2.3/TechGrit Leadership.dc.html`
**Input**: User description — build the Leadership & Advisory page from the V2.3 design reference, restructure the About area into two sub-routes, and make the header's "About" parent a hover-only trigger.

---

## Overview

The About area currently exposes a single page at `/about`. This feature splits it into two sibling pages under an About parent that is itself no longer a destination:

- `/about/our-story` — the existing About page content, relocated unchanged.
- `/about/leadership-advisory` — a **new** page introducing the people who guide TechGrit: three leader/advisor profiles, a "why it matters" rationale block, and a closing conversation CTA.

The header's "About" top-level item stops navigating anywhere; it only reveals its two-item dropdown, whose first entry ("Our Story") is the destination that previously lived at `/about`.

Header and footer *markup/behaviour* are owned by another workstream. The only header change in scope is the About parent's navigation behaviour (below); the only footer change in scope is repointing its two existing About links to the new URLs.

---

## Clarifications

### Session 2026-08-20

- Q: How large should the leader photo circle be, given the reference's 110px? → A: 120px diameter, on the existing spacing scale, no new token
- Q: Which interim images should the three profiles use? → A: The same existing team photo (`glasses.png`) on all three, as an honest placeholder
- Q: Which existing icon substitutes for the reference's desktop-monitor glyph on "Enterprise pedigree"? → A: `LayoutDashboardIcon`, the closest existing screen-like glyph
- Q: What happens if the CMS still returns `/about` for the "Our Story" sub-item? → A: The UI resolves it to `/about/our-story` so the click navigates there directly; the CMS data is corrected later by the team
- Q: Where do the profile card and breadcrumb live, given the constitution's rule against speculative shared structure? → A: Both go in `components/ui/` now — an accepted, recorded deviation

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluate who is behind TechGrit (Priority: P1)

A prospective client or partner who is vetting TechGrit wants to know who leads the company and what their track record is, so they can judge whether TechGrit is credible enough to trust with a regulated, high-stakes engagement.

**Why this priority**: This is the entire reason the page exists. Without the profile content and the rationale block there is no feature — everything else (routing, nav behaviour) is plumbing around it.

**Independent Test**: Navigate directly to `/about/leadership-advisory`. The page renders the hero, the three leader profiles with role, name, biography and a working LinkedIn link each, the "Why it matters" block with its four supporting tiles, and the closing CTA — with no dependency on the header change or the `/about` relocation.

**Acceptance Scenarios**:

1. **Given** a visitor lands on `/about/leadership-advisory`, **When** the page loads, **Then** they see, in order: the hero (breadcrumb, badge, headline, subtitle, two CTAs), three leader profile cards, the "Why it matters" block with four tiles, and the closing CTA panel.
2. **Given** a visitor is reading a leader profile, **When** they activate its LinkedIn capsule, **Then** that leader's LinkedIn profile opens in a new browser tab and the visitor's place on the TechGrit page is preserved.
3. **Given** a visitor is on a viewport 900px wide or narrower, **When** they scroll the page, **Then** the three profile cards stack into a single centred column and the four rationale tiles stack into a single column, with no horizontal page scrolling at any width down to 360px.
4. **Given** a visitor reaches the closing CTA, **When** they activate its primary action, **Then** they arrive on the Contact page; **When** they activate its secondary action, **Then** they arrive on the Careers page.

---

### User Story 2 - Reach the right About page from the header (Priority: P2)

A visitor exploring the site hovers "About" in the header and picks between "Our Story" and "Leadership & Advisory", rather than being dumped onto a single combined About page.

**Why this priority**: The page from Story 1 is unreachable through normal browsing without this. It is P2 only because that page is independently testable by direct URL first.

**Independent Test**: With the header rendered, hover "About" and confirm the two-item panel appears and that "About" itself does not navigate; then confirm each panel item lands on its respective page.

**Acceptance Scenarios**:

1. **Given** a visitor on any page with a pointer device, **When** they hover the header's "About" item, **Then** its dropdown reveals exactly the two existing sub-items in their existing order and styling.
2. **Given** the "About" dropdown is open, **When** the visitor activates "About" itself (click, tap, or keyboard), **Then** no navigation occurs — the dropdown simply opens or stays open.
3. **Given** the "About" dropdown is open, **When** the visitor activates the first sub-item ("Our Story"), **Then** they arrive on the relocated About page at `/about/our-story` showing the same content `/about` previously showed.
4. **Given** the visitor is on either About sub-page, **When** they look at the header, **Then** the "About" parent renders in its active state, as any other parent whose child route is current does today.
5. **Given** a visitor on a touch or keyboard-only device, **When** they reach the "About" item, **Then** they can open the panel and select a sub-item without any activation of "About" navigating them away.

---

### User Story 3 - Follow existing About links without hitting a dead end (Priority: P3)

Someone following a footer link, a bookmark, or an inbound search result that points at the old About location still ends up on real content instead of an error page.

**Why this priority**: A correctness/no-regression concern rather than new value; the feature is demonstrable without it, but shipping without it breaks existing links.

**Independent Test**: Activate every in-product link that previously targeted the About area and confirm each resolves to a live page.

**Acceptance Scenarios**:

1. **Given** a visitor in the footer's company column, **When** they activate "Our Story", **Then** they arrive on `/about/our-story`.
2. **Given** a visitor in the footer's company column, **When** they activate "Leadership & Advisory", **Then** they arrive on `/about/leadership-advisory`, replacing today's non-functional in-page anchor.
3. **Given** a visitor on the homepage's "Inside TechGrit" gallery, **When** they activate its About action, **Then** they arrive on `/about/our-story`.
4. **Given** a visitor requests the old `/about` URL directly, **When** the request resolves, **Then** they are redirected permanently to `/about/our-story`.

---

### Edge Cases

- **A leader has no photograph available.** The circular photo frame still renders at its full size with the page's orange-ringed treatment and no broken-image artefact, and the card's remaining content is unaffected. The reference's initials-in-a-gradient fallback is explicitly out of scope (removed by request). In practice every profile ships with an image per FR-023a.
- **A leader has no LinkedIn URL.** The capsule is omitted entirely rather than rendering as a dead control; the card's bottom spacing collapses accordingly.
- **A biography is materially longer or shorter than the others.** Cards in the same row are equal height and stay top-aligned on their photo/role/name; no biography is truncated or clipped.
- **Only one or two leaders are supplied.** The grid keeps its three-column track — cards do not stretch to fill the row.
- **Very narrow viewports (down to 360px).** Hero headline, breadcrumb, badge, and both CTA rows wrap without overflowing; the page never scrolls horizontally.
- **Reduced-motion preference.** Entrance reveals and the ambient orb drift respect the visitor's reduced-motion preference exactly as every other page on the site already does.
- **Missing content at build time.** If the page's content set cannot be resolved, the page behaves the way the site's other content-driven pages already do rather than rendering a partially-empty shell.

---

## Requirements *(mandatory)*

### Routing & information architecture

- **FR-001**: The existing About page MUST be relocated so its content is served at `/about/our-story`, with its content, sections, metadata, and behaviour unchanged.
- **FR-002**: A new page MUST be served at `/about/leadership-advisory`.
- **FR-003**: The `/about` path MUST NOT render a page of its own; requests for it MUST resolve to `/about/our-story` via a permanent redirect.
- **FR-004**: Both About sub-pages MUST keep the ambient background treatment currently used by the About page — the same four-orb set, unchanged in colour, size, position and animation — rather than the reference file's own slightly-different orb opacities.
- **FR-005**: Every existing in-product link that targets the About area MUST be repointed: the footer's "Our Story" and "Leadership & Advisory" entries, and the homepage gallery's About action.
- **FR-006**: The shared route constants MUST gain entries for both new paths so no consumer hardcodes them.

### Header "About" behaviour

- **FR-007**: The header's "About" top-level item MUST NOT navigate on activation by any input method (mouse click, touch tap, or keyboard Enter/Space). Activation MUST open, or leave open, its dropdown panel instead.
- **FR-008**: The "About" dropdown MUST continue to reveal on hover, with its existing two sub-items, order, icons, copy, and panel styling entirely unchanged.
- **FR-008a**: Activating the "Our Story" sub-item MUST navigate directly to `/about/our-story`. Because the nav's hrefs are CMS-supplied and the CMS still returns the old `/about` value, the UI MUST resolve that value to `/about/our-story` at render time rather than relying on the FR-003 redirect. The resolution MUST become a no-op once the team corrects the CMS entry.
- **FR-009**: The "About" parent MUST continue to render its active/current state when the visitor is on any page beneath it.
- **FR-010**: The change in FR-007 MUST apply only to the About group — every other top-level nav group keeps navigating to its own overview page exactly as it does today.
- **FR-011**: The mobile menu's existing behaviour MUST be preserved: the "About" group label remains a non-interactive heading and its two sub-items remain the only navigable rows.
- **FR-012**: No other aspect of the header or footer — layout, styling, mega-menu structure, CTA — may change.

### Leadership & Advisory page — Hero

- **FR-013**: The hero MUST be centre-aligned and MUST present, each on its own line stacked vertically and never side by side at any viewport width: (1) a breadcrumb trail, then (2) an eyebrow badge capsule, then (3) the headline, (4) the subtitle, (5) the action row.
- **FR-014**: The breadcrumb MUST read "About" (linking to `/about/our-story`) followed by a separator and the non-interactive current-page label "Leadership & Advisory", rendered as small uppercase wide-tracked label text with the current page visually emphasised over the ancestor link.
- **FR-015**: The eyebrow badge MUST be a pill with a soft-orange fill and orange hairline border containing a small glowing orange status dot followed by the uppercase label "About TechGrit · Leadership".
- **FR-016**: The headline MUST read "Meet the people guiding our vision and values." with "vision and values." rendered in the brand gradient and the preceding words in plain white — using the same plain-text/highlight-text split treatment the Construction page's hero already uses.
- **FR-017**: The subtitle MUST read: "The team and advisors who shape TechGrit's strategy, culture, and growth — and who are personally invested in every client's success."
- **FR-018**: The hero MUST present exactly two actions: a primary "Join Our Team" with a trailing right-arrow leading to Careers, and a secondary "Get in Touch" leading to Contact. The secondary MUST use the project's existing ghost button treatment, not the reference file's own inline-styled variant.
- **FR-019**: Hero elements MUST enter with the site's existing staggered rise-in reveal, sequenced breadcrumb → badge → headline → subtitle → actions.

### Leadership & Advisory page — Leader profiles

- **FR-020**: The page MUST present three leader/advisor profile cards in a three-across grid on desktop, collapsing to a single centred column at 900px and below.
- **FR-021**: Each profile card MUST be built on the project's existing glass-card primitive — extended with a new variant rather than forked — be centre-aligned, and lift slightly with an orange-tinted border on hover.
- **FR-022**: Each card MUST present, top to bottom: a circular photo frame, the role label, the name, the biography, and a LinkedIn capsule.
- **FR-023**: The circular photo frame MUST be 120px in diameter — larger than the reference's 110px so a headshot reads clearly — MUST be a perfect circle with an orange hairline ring, MUST clip its image to the circle without distorting the subject's aspect ratio, and MUST NOT render the reference's decorative gradient fill or initials-text fallback. The 120px value MUST come from the existing spacing scale, not a new token.
- **FR-023a**: Until real headshots are supplied, all three profiles MUST use the same existing team photograph (`glasses.png` from the project's `team` image folder) as a deliberate placeholder, so no circle renders empty and no distinct portrait is implied. The reference's own headshot filenames are not used, as those files do not exist.
- **FR-024**: The role label MUST be small uppercase wide-tracked orange text; the name MUST be a larger tight-tracked white heading; the biography MUST be relaxed-leading muted body copy.
- **FR-025**: The LinkedIn capsule MUST be a clickable pill containing the LinkedIn glyph and the label "LinkedIn", using the existing shared LinkedIn icon. It MUST open the target profile in a new tab with no referrer leakage, and MUST change to a brighter label with an orange-tinted border and fill on hover and on keyboard focus.
- **FR-026**: The three profiles MUST carry exactly this content:
  - **Founder & CEO — Jithendra Ganji** — "An enterprise tech leader with 25+ years of experience at Fortune 500s like GE and Wells Fargo, he has spent the last 12 years scaling TechGrit into an AI-first engineering partner. Having delivered 500+ projects across regulated industries, Jittu now leads digital transformation for HealthTech, FinTech, and ConstructionTech." — `https://www.linkedin.com/in/jithendra-ganji/`
  - **Executive Chairman — Hemant Elhence** — "A technology entrepreneur, venture investor (GP at 3Lines VC, Venture Partner at Sentiero VC), and the Founder/CEO of Synerzip — an Agile product engineering services company he scaled to 400+ professionals over 18 years before a successful PE-backed exit. He now brings institutional-grade growth discipline to TechGrit's expansion." — `https://www.linkedin.com/in/hemant-elhence/`
  - **Advisory Board Member — Jonathan Gelhaus** — "A technology executive with over 27 years of experience in cybersecurity, digital transformation, and enterprise leadership. Currently the CIO at Time Investment Company, he brings deep expertise in financial services and governance. He guides TechGrit in scaling AI-first engineering and data platforms while managing complex regulatory risks." — `https://www.linkedin.com/in/jonathangelhaus/`
- **FR-027**: This section MUST have no section heading, eyebrow, or introductory description — the cards are the whole section.

### Leadership & Advisory page — Why it matters

- **FR-028**: The section MUST open with a centred header block: the uppercase orange eyebrow "Why it matters", the heading "Practitioners, not consultants.", and the description "Our leadership team has operated inside Fortune 500s, scaled engineering organizations, built and exited software companies, and navigated complex regulated environments. That experience informs every client engagement, every architectural decision, and every delivery commitment we make."
- **FR-029**: The eyebrow MUST use the project's existing section-eyebrow primitive, configured to match the reference's accent-mark-free presentation.
- **FR-030**: Below the header, four tiles MUST render in a two-by-two grid, collapsing to a single column at 900px and below.
- **FR-031**: Each tile MUST be a horizontal row: a fixed-size rounded-square icon holder with a soft-orange tint and an orange glyph on the left, and a title plus one-line supporting sentence stacked on the right. Tiles MUST brighten their fill and take an orange-tinted border on hover.
- **FR-032**: The four tiles MUST carry exactly this content, in this order:
  1. **Enterprise pedigree** — "Fortune 500 operational experience across GE, Wells Fargo, and financial institutions."
  2. **Startup discipline** — "PE-backed exits and institutional growth frameworks applied to client programs."
  3. **AI-first thinking** — "Senior leaders who understand what AI-first engineering actually means in practice."
  4. **Long-term investment** — "Personally accountable for the quality, outcomes, and trust built with every client."
- **FR-033**: Tile icons MUST be drawn from the project's existing shared icon set — no new icons may be added — choosing for each tile the existing icon that most closely reproduces the reference's glyph.

### Leadership & Advisory page — Closing CTA

- **FR-034**: The closing CTA MUST be rendered by the project's existing shared final-CTA component rather than bespoke markup, supplying: the eyebrow "Work with us", the heading "Start a conversation with the team.", the description "Whether you're exploring a partnership or want to understand our approach, we're here to talk. No pitch, no pressure — just a direct conversation.", a primary action "Get in Touch" leading to Contact, and a secondary action "See Open Roles" leading to Careers.
- **FR-035**: The secondary action MUST use the project's existing ghost button treatment, not the reference file's own inline-styled variant.
- **FR-036**: Where the shared final-CTA component's own panel geometry (corner radius, internal padding, heading scale, glow placement) differs from the reference's hand-styled panel, the shared component's values govern — the deviation is accepted in exchange for consistency with every other page's closing CTA.

### Content, structure & styling constraints

- **FR-037**: The page's content MUST be supplied as a typed static content module so it can later be swapped for a CMS-backed source with no change to the section components. The type definitions MUST live alongside the project's other CMS type modules; the dummy values MUST live in a page-local data module.
- **FR-038**: Each of the page's four sections MUST be its own component under the new route's private components folder; the route's page file MUST only compose them.
- **FR-039**: The profile card and the breadcrumb trail MUST both be placed in the shared UI component folder, not the route-local folder, even though neither has a second consumer yet. This is a knowing deviation from the constitution's rule against pre-scaffolding speculative shared structure, accepted because both are expected to be reused by later V2.3 pages.
- **FR-040**: All colour, spacing, radius, shadow, typography, opacity and blur values MUST resolve to existing design tokens. A new token may be added only where the reference demands a value that no existing token already carries; where an existing token already carries the required value, that token MUST be reused.
- **FR-041**: Styling MUST prefer standard utility scale classes, falling back to arbitrary-value utilities only where the reference's measurement has no scale equivalent.
- **FR-042**: The page MUST NOT reimplement any primitive the project already provides — buttons, badges, glass cards, section eyebrows, icons, ambient orbs, reveal-on-scroll, and the final CTA are all to be reused or extended, never forked.
- **FR-043**: The page MUST carry its own page title and meta description.
- **FR-044**: The design reference's preview-tool artefacts — its wrapper element, inline `<style>` block, hand-written nav and footer, and inline `onerror` attributes — MUST NOT be carried into production code.

### Reference fidelity targets

- **FR-045**: The page MUST reproduce the reference's layout, spacing, sizing, typography, colour, border, shadow, radius, icon, image and alignment values, and its responsive behaviour, except where an explicit instruction in this specification overrides the reference: the stacked hero breadcrumb/badge, the enlarged photo frame with no gradient or initials fallback, the existing ghost buttons, the shared final-CTA panel, and the About page's orb set.
- **FR-046**: The reference's single responsive breakpoint for this page's own content is 900px — profile grid to one column, rationale grid to one column, headline steps down. This MUST be implemented using the project's canonical breakpoint scale rather than a newly invented pixel value.

---

## Key Entities

- **Leader profile** — one person presented on the page. Attributes: display order, photograph (optional), role label, full name, biography, LinkedIn profile URL (optional).
- **Rationale tile** — one supporting reason in the "Why it matters" block. Attributes: display order, icon identity, title, supporting sentence.
- **Page content set** — the whole page's copy as one addressable unit: hero (breadcrumb ancestor label and target, badge label, headline plain and highlighted parts, subtitle, two action labels and targets), the ordered leader profiles, the rationale block (eyebrow, heading, description, ordered tiles), the closing CTA (eyebrow, heading, description, two action labels and targets), and the page's title and meta description.

---

## Success Criteria *(mandatory)*

- **SC-001**: A visitor can reach the Leadership & Advisory page from the header in two interactions (hover About, select the item) and from the footer in one, from any page on the site.
- **SC-002**: A side-by-side comparison of the implemented page against the design reference at 1440px, 1024px, 900px, 768px and 375px shows no unintended difference in section order, copy, spacing, sizing, colour, radius, alignment or wrap behaviour — every remaining difference traces to an override explicitly listed in FR-045.
- **SC-003**: 100% of the page's colour, spacing, radius, shadow, typography, opacity and blur values resolve to design tokens; a review of the diff finds zero hardcoded hex colours, raw pixel/rem literals, or `rgba()` literals duplicating an existing token.
- **SC-004**: The page introduces zero new icons and zero forked copies of an existing shared primitive.
- **SC-005**: No in-product link anywhere on the site resolves to a missing page after the restructure, and the previous About URL resolves to live content.
- **SC-006**: Activating the header's "About" parent by mouse, touch, or keyboard never navigates, while both of its sub-items always do — verified on all three input methods.
- **SC-007**: The page produces no horizontal page scrolling at any viewport width from 360px to 2560px.
- **SC-008**: The project's linting and production build both pass with no new warnings or errors.
- **SC-009**: Every leader's LinkedIn capsule is reachable and operable by keyboard alone, with a visible focus indicator, and opens the correct external profile.
- **SC-010**: Swapping the static content module for a CMS-backed source later requires changes only to the data module and its loader — the four section components consume the same shapes unchanged.

---

## Assumptions

1. **URL slugs.** The requested "about/leadership & advisory" and "about/ourstory" are rendered as the URL-safe, convention-consistent `/about/leadership-advisory` and `/about/our-story`. The site's existing trailing-slash convention is followed.
2. **Old `/about` handling.** *(Confirmed)* `/about` issues a permanent redirect to `/about/our-story`, rather than a 404, to preserve inbound links and search equity.
3. **Leader photographs.** *(Confirmed)* The reference's three headshot files exist neither in the repository nor in the reference's own asset folder. Three of the existing `team` folder photographs stand in as interim images (FR-023a); replacing them with real headshots later touches only the data module.
4. **"Testimonials section".** The request's wording for section (b) refers to the reference's three leader/advisor cards; it is specified as a leader-profiles section, not as client testimonials.
5. **Enlarged photo frame size.** *(Resolved — see Clarifications)* 120px, one step up the existing spacing scale from the reference's 110px.
6. **"Enterprise pedigree" icon.** *(Resolved — see Clarifications)* The reference draws a desktop monitor, for which the shared icon set has no equivalent. `LayoutDashboardIcon` is substituted and the difference accepted. The other three tiles map exactly onto existing icons — the rocket, orbit and heart glyphs.
7. **Rocket glyph difference.** The reference's "Startup discipline" glyph is a two-path subset of the existing rocket icon's four paths; the existing full icon is used as-is.
8. **Closing-CTA eyebrow colour.** The reference's pale-amber eyebrow is served by the existing final-CTA component's amber tone rather than by extending that component with a new tone, accepting a small hue difference.
9. **Ambient orbs.** Per explicit instruction, the About page's existing orb set is reused verbatim, overriding the reference's own slightly lower orb opacities.
10. **Header and footer ownership.** Header/footer presentation is owned by another workstream; only the About parent's navigation behaviour and the footer's two About link targets are touched here.
11. **Nav content source.** The header's nav items are supplied by the CMS, so the About parent's sub-item labels, order and icons are not authored in this feature — only the parent's activation behaviour is.
12. **No new page-level animation.** Entrance motion reuses the site's existing rise/reveal mechanisms; no new keyframes are introduced.
13. **Content module location.** Type definitions go with the project's other CMS type modules; the dummy values go in a page-local `_data/data.ts`, matching how the Webinar, Blog and Services pages already stage pre-CMS content.
14. **Metadata copy.** Page title and meta description are authored for this page — the reference file carries none — following the phrasing pattern of the existing About page's metadata.

---

## Out of Scope

- Any header or footer change beyond the About parent's activation behaviour and the footer's two About link targets.
- CMS/API integration for this page's content — a follow-up, mirroring how other pages were migrated.
- Sourcing, cropping, or optimising real leader headshot images — interim images come from the existing `team` folder (FR-023a).
- Adding new icons to the shared icon set.
- Adding further About sub-pages, or restructuring any other nav group.
- Retro-fixing the known accessibility contrast debt recorded against the v2 token set.

---

## Dependencies

- The header's nav content (including the About group's two sub-items) is CMS-supplied and still points "Our Story" at the old `/about`. FR-008a covers this in the UI for now; correcting the CMS entries is a follow-up owned by the team.
- The shared glass-card, button, badge, section-eyebrow, icon, ambient-orb and final-CTA primitives must remain available and extensible.
- The design reference file `raw-files-v3/TechGrit Website V2.3/TechGrit Leadership.dc.html` is the fidelity baseline.

---

## Resolved Decisions

All three questions raised during specification were answered on 2026-08-20; no open questions remain.

- **Q1 — Old `/about` URL.** Permanent redirect to `/about/our-story`. Captured in FR-003.
- **Q2 — Leader headshots.** Use three of the photographs already in the project's `team` image folder as interim images. Captured in FR-023a.
- **Q3 — Scope of the non-navigable parent.** About only: its parent item stops being clickable, its hover panel is unchanged, and its first sub-item navigates to the relocated About page at `/about/our-story`. Every other parent group keeps its current click-to-overview behaviour. Captured in FR-007, FR-008 and FR-010.
