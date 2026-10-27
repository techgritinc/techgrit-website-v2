# Feature Specification: Software Product Engineering Page (What We Do)

**Feature Branch**: `feature/TMS-86-what-we-do-software-product-engineering-page`
**Created**: 2026-08-23
**Status**: Draft
**Input**: User description: "Consider this feature as TMS-86-software-product-engineering and Implement the TechGrit Product Engineering webpage in the existing Next.js application using the reference prototype and existing project architecture. Reference Source: `raw-files-v3/TechGrit Website V2.3/TechGrit Product Engineering.dc.html`. This page belongs under the 'What We Do' section of the website; follow the exact file and folder architecture already established for the existing `ai-acceleration-modernization` page — do not introduce a different architectural pattern. Before creating any new component, inspect `components/ui` and reuse whatever already covers the need; only build a new reusable primitive when nothing existing fits, never a one-off. Use Tailwind CSS only; reuse existing `tokens.css`/`globals.css` tokens and utility classes, only adding a genuinely new token when the reference requires a value that doesn't already exist. Treat the reference HTML as the pixel-accurate source of truth for layout, spacing, typography, colors, icons, borders, shadows, and responsive behavior at desktop/laptop/tablet/mobile — no approximated values. No visual flicker or layout shift on render; prefer Server Components; avoid unnecessary client-side JavaScript. Keep the implementation minimal: no unnecessary abstractions, no wrapper-only components, no changes to unrelated pages/components/configuration, no new dependencies."

## Clarifications

### Session 2026-08-23

- Q: This ticket number (TMS-86) already has a spec directory (`specs/TMS-86/`) for a different, previously-shipped feature (the AI-Accelerated Modernization page). What should this feature's spec directory be named to avoid overwriting that work? → A: `specs/TMS-86-software-product-engineering/`, mirroring the existing disambiguation pattern already used elsewhere in this repo (`specs/TMS-85-tokens-v2-migration/`).
- Q: The reference prototype's hero right-side card shows four literal stat callouts (Velocity, Escape rate, Cloud-native, Squad size) rendered as text tiles — unlike the sibling AI-Accelerated Modernization page, where an explicit prior decision replaced that same card pattern with a static image. Should this page follow that same image-replacement treatment, or render the stats as given? → A: Follow the same image-replacement treatment as the sibling AI-Accelerated Modernization page: replace the card's stat-tile content with a static image, keeping the card's dimensions, position, border radius, spacing, and visual treatment equivalent to the reference.
- Q: Should this phase wire the page to a CMS/API, matching the now-CMS-integrated state of the sibling AI-Accelerated Modernization page (which shipped statically first, then received CMS integration as a separate, later piece of work)? → A: No — this phase ships static content only, consistent with how every other page in this codebase (including AI-Accelerated Modernization itself) was first built statically before any CMS integration followed as its own separate ticket.
- Q: The hero's right-side card should show an image the same way the AI-Accelerated Modernization page's hero card does — which existing image asset should fill it? → A: `public/samples/svc-eng.png` — the only candidate asset not already used elsewhere in the app, and its filename directly matches this service ("Software Product Engineering"), unlike `dm-scalability.png`/`dm-copilot.png` which are both already used on the homepage.
- Q: The hero's right-side card also carried a caption line below the image ("4D™ discovery · OrbitAI™ delivery engine"), retained from the reference's original stat-card content. Should that caption stay? → A: No — remove it. Only the image fills the card; no caption line beneath it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluate the product engineering offering end-to-end (Priority: P1)

A prospective client (an engineering leader, CTO, or founder researching vendors) lands on the Software Product Engineering page — from site navigation, the homepage, or a direct link — and reads through the hero promise, the six core capabilities, and the five-stage delivery lifecycle, to decide whether TechGrit's product engineering approach fits their build/scale problem before requesting contact.

**Why this priority**: This is the entire reason the page exists — it is TechGrit's primary sales asset for the product engineering service line. Without this flow working, the page delivers no value regardless of what else is built.

**Independent Test**: Load the page standalone and verify a reader can, without leaving the page, understand what "AI-first product engineering" means, see the six named capabilities (Strategy, Design, Build, AI, Quality, Ops) with their supporting bullet points, and see the five-stage delivery lifecycle — this alone constitutes a usable, demonstrable page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives on the page, **When** the hero section renders, **Then** they see the "Service 02 · Product Engineering" eyebrow, the headline "AI-first product engineering for modern enterprises." (with "modern enterprises." rendered as the gradient-accented phrase), the supporting paragraph, both hero CTAs ("Talk to a Product Engineering Expert", "See capabilities"), and the right-side highlight card showing only the replacement image (per FR-004) — with the original four stat callouts (Velocity 2–3×, Escape rate <0.5%, Cloud-native AWS/Azure/GCP, Squad size 4–12) and the "4D™ discovery · OrbitAI™ delivery engine" caption line not rendered at all, as text/tiles or as a caption beneath the image.
2. **Given** a visitor scrolls past the hero, **When** they reach the "Product engineering, end-to-end" intro section, **Then** they see the section's heading and paragraph on one side and the "Where teams get stuck" chip list (six blocker chips) on the other.
3. **Given** a visitor reaches the "Core capabilities" section, **When** it renders, **Then** they see exactly six capability cards (Product Strategy & Architecture, Product Design, Development & Modernization, AI & Automation Integration, Quality Engineering, DevOps/CI-CD & Cloud), each with its numbered/disciplined label ("01 · Strategy" through "06 · Ops"), heading, lead paragraph, and bullet list, matching the reference verbatim.
4. **Given** a visitor reaches the "Our delivery lifecycle" section, **When** it renders, **Then** they see the five ordered steps (Discover, Design, Build, Validate, Evolve) each with its number, title, and description.

---

### User Story 2 - Understand why the approach matters and see relevant industry fit (Priority: P2)

A visitor who is already sold on the need for product engineering help but is evaluating *why TechGrit specifically* reads the "Why product teams pick TechGrit" tiles and the "Industries we build for" cards to confirm TechGrit understands the delivery-risk angle and has relevant domain experience (HealthTech, FinTech, Construction Tech) before proceeding further.

**Why this priority**: This section builds the trust and differentiation needed to convert an already-interested visitor, but the page is still functional and valuable without a reader reaching this far (P1 covers the core pitch).

**Independent Test**: With only the hero, intro, capabilities, and lifecycle sections present, add the "Why" tiles and "Industries" cards and verify each renders independently with correct content and links, without depending on any interactive state from earlier sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the "Why product teams pick TechGrit" section, **When** it renders, **Then** they see all six tiles (Ship faster honestly, Own the outcome, AI-native by default, Predictable delivery, Enterprise-grade quality, Lower total cost) with icon, heading, and description.
2. **Given** a visitor reaches the "Industries we build for" section, **When** it renders, **Then** they see three linked industry cards (HealthTech, FinTech, Construction Tech) each navigating to that industry's page.

---

### User Story 3 - Resolve open questions and convert (Priority: P3)

A visitor with specific procedural concerns (engagement models, AI-first delivery differentiation, quality ownership, in-flight product takeover, IP protection) expands the FAQ accordion to get direct answers, optionally checks related services, and then acts on a CTA (schedules a consultation or books a discovery sprint) or navigates to a related service page.

**Why this priority**: This closes remaining objections and drives the conversion action, but is only reached by visitors who have already engaged with P1/P2 content — it is the funnel's final step, not its entry point.

**Independent Test**: Render just the FAQ, related-services, and closing CTA sections and verify each FAQ item expands/collapses independently, related-service links are correct, and both CTA buttons point to their respective destinations.

**Acceptance Scenarios**:

1. **Given** the FAQ section is visible, **When** a visitor clicks a closed question, **Then** that question's answer expands in place (the first question, "What engagement models do you offer?", is expanded by default) without affecting the state of other questions.
2. **Given** the "Related services" section, **When** it renders, **Then** it shows six linked service cards (AI-Accelerated Modernization, Data & AI Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups).
3. **Given** the closing CTA band, **When** it renders, **Then** it shows the heading "Tell us what you're building.", the supporting paragraph, and both the primary ("Schedule a Consultation") and secondary ("Book a Discovery Sprint") actions.

---

### Edge Cases

- What happens on narrow viewports (mobile) where the hero's two-column layout, the three/six-across capability and industry grids, and the five-across lifecycle strip cannot fit side by side? Each must collapse to a readable single- or two-column stack rather than overflowing horizontally or shrinking text below a legible size.
- What happens when a visitor navigates directly to `#capabilities` (the "See capabilities" hero link) via a bookmarked or shared URL? The target section must be reachable and not obscured by the sticky site header.
- What happens if a visitor expands multiple FAQ items in sequence? Each item's expand/collapse state must be independent of the others (no accordion-style forced-collapse of previously opened items).
- What happens in the "Industries we build for" grid, which the reference lays out on a four-column track while supplying only three cards? The layout must not visibly break or leave an awkward gap that reads as a missing/broken card — it must render the way the reference itself renders it (three cards, trailing space) at every breakpoint.
- What happens to the four hero stat callouts and the hero card's decorative treatment once the right-side content is replaced with an image, per FR-004? The card's size, position, border radius, and framing must remain visually equivalent to the reference even though its contents changed from data tiles to an image, and the image must not distort or crop awkwardly at any supported viewport width. The card's caption row (present on the sibling AI-Accelerated Modernization page's equivalent card) is intentionally omitted here — the card contains only the image, per Clarifications.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST present all page copy — headings, eyebrows, paragraphs, card titles, bullet lists, FAQ questions/answers, CTA labels, and link labels — exactly as written in the reference prototype, with no rewriting, rephrasing, shortening, expanding, reordering, or added/removed content.
- **FR-002**: The page MUST reuse the site's existing shared Header and Footer components without modification or duplication of either component's code, and MUST reuse existing `components/ui/` primitives — `Hero` (including its `MediaSlot`-based image media), `ContentBlock`, `GlassCard` (capability-card variant), `ProcessSteps`, `Faq`, `IconTile`, and `final-cta` — wherever their shape already matches this page's sections, in place of building new one-off equivalents.
- **FR-003**: The page MUST render, in reference order: hero, "Product engineering, end-to-end" intro/blockers block, six-capability "Core capabilities" grid, five-stage "Our delivery lifecycle" strip, six-tile "Why product teams pick TechGrit" grid, three-card "Industries we build for" grid, five-item FAQ accordion, six-card "Related services" grid, and closing CTA band.
- **FR-004**: The hero section's right-side highlight card MUST display only a static image (`public/samples/svc-eng.png`) — with no caption line beneath it and no rendering of the reference's four stat-tile callouts or the "4D™ discovery · OrbitAI™ delivery engine" caption as text/tiles anywhere on or around the card — and without distorting the image's aspect ratio at any supported viewport width, matching the sibling AI-Accelerated Modernization page's hero-card chrome (dimensions, position, border radius, spacing) minus that page's own caption row (per Clarifications).
- **FR-005**: Every interactive affordance present in the reference MUST work in the implementation: each FAQ item independently expands/collapses; the "See capabilities" hero link scrolls to the capabilities section without that section being hidden under the sticky header; all CTA, card, and related-service links navigate to their intended destination (or a page-appropriate equivalent where the destination does not yet exist as a built route).
- **FR-006**: The page's visual presentation (typography scale, weight, line-height, letter-spacing, colors, gradients, spacing, card/section dimensions, border radii, shadows, and icons) MUST match the reference prototype at the reference's desktop width, with no visually approximated values where the reference specifies an exact one.
- **FR-007**: The page's layout MUST adapt responsively across desktop, laptop, tablet, and mobile widths, following the reference's own breakpoint behavior (e.g., multi-column grids collapsing to fewer columns, then to a single column; the hero's two-column split stacking on narrow viewports) rather than a uniform shrink of the desktop layout.
- **FR-008**: This phase MUST implement static content only — no network requests, data fetching, CMS integration, or client-side data-derived state — while remaining structured so that content can later be supplied dynamically without a rebuild of the page's visual structure (per Clarifications).
- **FR-009**: No functional requirement in this specification requires modifying any page, component, or configuration outside what is needed to build this new page and the minimal navigation-pointer updates in FR-010.
- **FR-010**: The site's existing "What We Do → Software Product Engineering" entry points MUST resolve to the new page at the route `/what-we-do/software-product-engineering` once built. Concretely: (a) the footer's "What We Do" link config (`cms/api/footer.ts`) MUST have its "Software Product Engineering" entry's `href` updated from `/services#svc-product` to `/what-we-do/software-product-engineering`; and (b) the header's mega-menu mapping (`cms/api/header.ts`'s `toMegaGroup`), which already special-cases the "AI-Accelerated Modernization" entry to override a stale CMS-supplied link, MUST gain an equivalent special-case for the "Software Product Engineering" entry pointing to the same new route — following the exact precedent already established in that file. Live CMS content, the rest of the `/services` page, and all other navigation entries remain untouched.
- **FR-011**: This feature MUST NOT introduce any new shared `components/ui/` primitive. Every section this page needs (hero with its image-media treatment, intro/blockers content block, capability card, numbered process step, icon/text tile, FAQ accordion, and closing CTA band) already has a matching, unmodified `components/ui/` component established by the sibling AI-Accelerated Modernization page; this page's own build work is limited to page-local composition (route-scoped section components under `app/what-we-do/software-product-engineering/_components/`) that supplies this page's content and copy to those existing primitives.

### Key Entities

- **Capability**: One of the six service offerings shown in "Core capabilities" — has a discipline label/number, a title, a short lead description, and a list of supporting bullet points.
- **Lifecycle Stage**: One of the five ordered stages in "Our delivery lifecycle" — has a sequence number, a title, and a description.
- **Value Proposition Tile**: One of the six items in "Why product teams pick TechGrit" — has an icon, a heading, and a description.
- **Industry Card**: One of the three items in "Industries we build for" — has an icon, a name, a description, and a link to that industry's page.
- **FAQ Item**: One of the five question/answer pairs — has a question, an answer, and an independent expanded/collapsed state.
- **Related Service Link**: One of the six items in "Related services" — has an icon, a name, a short description, and a link to that service's page.
- **Hero Stat**: One of the four stat callouts originally shown in the hero's right-side card (Velocity, Escape rate, Cloud-native, Squad size) — retained as the source content that the replacement hero image (`svc-eng.png`) visually represents, matching the sibling AI-Accelerated Modernization page's equivalent treatment (per Clarifications).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A person familiar with the reference prototype, shown the implemented page side by side with the reference at the same viewport width, cannot identify a visually noticeable difference in any of the nine sections.
- **SC-002**: All page text matches the reference prototype at 100% fidelity — zero content substitutions, omissions, or additions when diffed against the reference's copy.
- **SC-003**: The page remains fully readable and free of horizontal overflow or overlapping elements at desktop, laptop, tablet, and mobile widths.
- **SC-004**: A visitor can independently expand each of the 5 FAQ items and reach every one of the 6 capability cards, 5 lifecycle stages, 6 "why" tiles, 3 industry cards, and 6 related-service links without encountering a broken or dead interaction.
- **SC-005**: Both site-wide navigation entry points for this service ("What We Do" footer link and header mega-menu entry) resolve to the new page rather than the old `/services` anchor.

## Assumptions

- The reference prototype (`TechGrit Product Engineering.dc.html`) is the sixth of the seven "What We Do" sibling design prototypes already present in `raw-files-v3/TechGrit Website V2.3/`. It reuses the exact hero, content-block, capability-card, process-step, icon-tile, FAQ, and CTA-band markup structure the sibling AI-Accelerated Modernization page already extracted into `components/ui/` (`Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps`, `Faq`, `IconTile`, `final-cta`), differing only in copy, stat values, and section counts. This is the basis for FR-011: no new shared primitive is needed for this page.
- This phase ships static content only, consistent with how every other page in this codebase (including the sibling AI-Accelerated Modernization page) was first built statically before any CMS integration followed later as its own separate, dedicated piece of work (per Clarifications).
- The "Why product teams pick TechGrit" tile pattern is implemented as a page-local composition (not a new shared `components/ui/` primitive), matching the precedent already set by the sibling AI-Accelerated Modernization page's own equivalent "Why AI-assisted modernization" section, which made the same architectural choice for the same visual pattern.
- Destination links to sibling "What We Do" / Industries pages referenced by this page (e.g., AI-Accelerated Modernization, Data & AI Engineering, HealthTech, FinTech) point to those pages' intended routes regardless of whether each sibling page has been built yet; this page's own build does not block on their existence.
- "Pixel-perfect" is evaluated at the reference's authored desktop viewport; intermediate breakpoints follow the reference's documented responsive rules and this codebase's existing responsive conventions where the reference itself does not specify a rule.
- Legal/placeholder footer links (Privacy Policy, Terms of Service, Cookie Preferences) inherit whatever the existing shared Footer already does site-wide; this feature does not alter Footer behavior.
- The replacement hero image is the existing `public/samples/svc-eng.png` asset, reused here rather than a newly supplied asset, chosen (per Clarifications) because it is the only candidate among the assets already present in `public/samples/` that is not already used elsewhere in the app, and its filename directly matches this service — unlike `dm-scalability.png` and `dm-copilot.png`, both already used on the homepage's value-proposition section, or `dm-tech-debt.png`, already used on the sibling AI-Accelerated Modernization page's own hero card.
- The hero's right-side card renders only the image — no caption row — per Clarifications; this diverges from the sibling AI-Accelerated Modernization page's own hero card, which does keep a caption ("PRISM™ · OrbitAI™ frameworks in every engagement") beneath its image. Both pages still reuse the identical, unmodified `Hero` component (`components/ui/Hero.tsx`) — the caption is an optional prop (`mediaCaption`) that this page simply omits, not a divergent component or a new variant.
- The new page lives at `/what-we-do/software-product-engineering` (`app/what-we-do/software-product-engineering/page.tsx`), following the exact routing and file/folder pattern already established by `app/what-we-do/ai-modernization/`. Today, both the footer's "What We Do" list and the header's live CMS-driven mega menu point this service at `/services#svc-product`, an anchor inside the combined Services page; FR-010 repoints both to the new route, mirroring the precedent already set for the AI-Accelerated Modernization entry in both files.
