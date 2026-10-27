# Feature Specification: AI-Accelerated Modernization Page (What We Do)

**Feature Branch**: `feature/TMS-86-what-we-do-ai-acclerated-modernization-page`
**Created**: 2026-08-20
**Status**: Draft
**Input**: User description: "TMS-86 — Implement the TechGrit AI Modernization static page using Spec-Driven Development. Use `raw-files-v3/TechGrit Website V2.3/TechGrit AI Modernization.dc.html` as the single source of truth for content, layout, typography, spacing, colors, and responsive behavior — pixel-perfect, with zero content changes (no rewriting, rephrasing, reordering, or adding/removing text). Build the page-specific composition under a dedicated `AI acceleration` location scoped to this page, and extract genuinely reusable section patterns (hero, section heading/content block, content/feature/icon cards, an Outcome heading+description pattern, CTA band) into the shared `components/ui/` component library so future 'What We Do' service pages can reuse them — reusing the existing `GlassCard` component wherever it fits rather than creating a duplicate card implementation, and never hardcoding page-specific copy inside a generic/shared component. In the hero's right-side card, replace the reference's inline stat/data visualization with an equivalent image asset, preserving the card's dimensions, position, border radius, spacing, and visual treatment. Reuse the existing Header and Footer unchanged. Use the existing Tailwind/token design system (no new duplicate tokens, no hardcoded raw values when an existing token or utility already covers the value; only add a new token when the reference truly needs one that doesn't exist yet). Fully responsive across desktop/laptop/tablet/mobile matching the reference's breakpoint behavior, not a naive shrink. Static UI only for this phase — no API/CMS integration, no data fetching, no unnecessary client-side state — but structure reusable components so API/CMS data can be passed in later without a UI rework. Stay strictly in scope: no changes to Header, Footer, unrelated pages, unrelated components, or project configuration."

## Clarifications

### Session 2026-08-20

- Q: What URL route should the new standalone page live at? → A: Explicit parent segment: `app/what-we-do/ai-modernization/page.tsx` → `/what-we-do/ai-modernization`
- Q: Should the reusable Outcome component be built in this ticket even though this page has no Outcome content to render with it? → A: Yes — build it now (`components/ui/Outcome.tsx`) as an unused-but-established shared primitive, ahead of a sibling page's need.
- Q: Does the nav-repointing requirement (FR-011) touch the CMS header fallback data, or only the footer config? → A: Both, in principle — update the footer config's href AND the header's CMS fallback data so the fallback nav matches when the CMS is unreachable. In practice, `cms/api/header.ts`'s `DEFAULT_HEADER_DATA.megaGroups` is an empty array by design (the header degrades to a bare logo+CTA when the CMS is unreachable, with no per-service entries at all to repoint) — so this requirement resolves to a footer-only code change; there is nothing to repoint on the header side.
- Q: Which existing image asset should fill the hero's right-side card? → A: `public/samples/dm-tech-debt.png` ("Eradicate Technical Debt"), reused from the homepage.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluate the modernization offering end-to-end (Priority: P1)

A prospective client (an engineering leader or founder researching vendors) lands on the AI-Accelerated Modernization page — from site navigation, the homepage, or a direct link — and reads through the hero promise, the six modernization capabilities, the five-step lifecycle, and the supported modernization strategies, to decide whether TechGrit's approach fits their legacy-system problem before requesting contact.

**Why this priority**: This is the entire reason the page exists — it is TechGrit's primary sales asset for the modernization service line. Without this flow working, the page delivers no value regardless of what else is built.

**Independent Test**: Load the page standalone and verify a reader can, without leaving the page, understand what "AI-accelerated modernization" means, see the six named capabilities with their supporting bullet points, and see the five-stage lifecycle — this alone constitutes a usable, demonstrable page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives on the page, **When** the hero section renders, **Then** they see the "Service 01 · Modernization" eyebrow, the headline "Modernize legacy systems faster with AI-assisted engineering.", the supporting paragraph, both hero CTAs ("Schedule a Modernization Assessment", "See capabilities"), and the right-side highlight card showing the replacement image (per FR-004) — with the original four stat callouts (3× faster, ~40% cheaper, 80%+ coverage, <1% downtime) not rendered as separate text/tiles — alongside the retained "PRISM™ · OrbitAI™ frameworks in every engagement" caption line.
2. **Given** a visitor scrolls past the hero, **When** they reach the "Our modernization services" section, **Then** they see exactly six capability cards (Legacy Application Assessment, Application Modernization, Cloud Migration & Re-Platforming, Legacy Code Transformation, Platform Modernization, Data Modernization), each with its numbered/verb label, heading, lead paragraph, and bullet list, matching the reference verbatim.
3. **Given** a visitor reaches the "Modernization lifecycle" section, **When** it renders, **Then** they see the five ordered steps (Assess, Analyze, Modernize, Validate, Optimize) each with its number, title, and description.
4. **Given** a visitor reaches the "Strategies we support" band, **When** it renders, **Then** they see all six strategy tiles (Rehost, Replatform, Refactor, Rearchitect, Rebuild, Replace) with their descriptions.

---

### User Story 2 - Understand why AI-assistance matters and see relevant industry/domain fit (Priority: P2)

A visitor who is already sold on modernizing but is evaluating *why an AI-assisted approach specifically* reads the "Why AI-assisted modernization" tiles and the "Industries we modernize" cards to confirm TechGrit understands the risk/quality angle and has relevant domain experience (HealthTech, FinTech, Construction Tech) before proceeding further.

**Why this priority**: This section builds the trust and differentiation needed to convert an already-interested visitor, but the page is still functional and valuable without a reader reaching this far (P1 covers the core pitch).

**Independent Test**: With only the hero and capabilities sections present, add the "Why" tiles and "Industries" cards and verify each renders independently with correct content and links, without depending on any interactive state from earlier sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the "Why AI-assisted modernization" section, **When** it renders, **Then** they see all six tiles (Faster Application Discovery, Accelerated Code Transformation, Improved Quality, Reduced Risk, Lower Costs, Enterprise-Grade Delivery) with icon, heading, and description.
2. **Given** a visitor reaches the "Industries we modernize" section, **When** it renders, **Then** they see three linked industry cards (HealthTech, FinTech, Construction Tech) each navigating to that industry's page.

---

### User Story 3 - Resolve open questions and convert (Priority: P3)

A visitor with specific procedural concerns (cloud platform support, downtime risk, hybrid/on-prem workloads) expands the FAQ accordion to get direct answers, optionally checks related services, and then acts on a CTA (schedules an assessment or books a discovery sprint) or navigates to a related service page.

**Why this priority**: This closes remaining objections and drives the conversion action, but is only reached by visitors who have already engaged with P1/P2 content — it is the funnel's final step, not its entry point.

**Independent Test**: Render just the FAQ, related-services, and closing CTA sections and verify each FAQ item expands/collapses independently, related-service links are correct, and both CTA buttons point to their respective destinations.

**Acceptance Scenarios**:

1. **Given** the FAQ section is visible, **When** a visitor clicks a closed question, **Then** that question's answer expands in place (the first question, "What is AI-assisted modernization?", is expanded by default) without affecting the state of other questions.
2. **Given** the "Related services" section, **When** it renders, **Then** it shows six linked service cards (Software Product Engineering, Data & AI Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups).
3. **Given** the closing CTA band, **When** it renders, **Then** it shows the heading "Legacy systems should enable growth, not hold it back.", the supporting paragraph, and both the primary ("Schedule a Modernization Assessment") and secondary ("Book a Discovery Sprint") actions.

---

### Edge Cases

- What happens on narrow viewports (mobile) where the hero's two-column layout, the six-across capability/strategy grids, and the five-across lifecycle strip cannot fit side by side? Each must collapse to a readable single- or two-column stack rather than overflowing horizontally or shrinking text below a legible size.
- What happens when a visitor navigates directly to `#capabilities` (the "See capabilities" hero link) via a bookmarked or shared URL? The target section must be reachable and not obscured by the sticky site header.
- What happens if a visitor expands multiple FAQ items in sequence? Each item's expand/collapse state must be independent of the others (no accordion-style forced-collapse of previously opened items).
- What happens to the four hero stat callouts and the hero card's decorative treatment once the right-side data visualization is replaced with an image, per the content-replacement requirement below? The card's size, position, border radius, and framing must remain visually equivalent to the reference even though its contents changed from data tiles to an image.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST present all page copy — headings, eyebrows, paragraphs, card titles, bullet lists, FAQ questions/answers, CTA labels, and link labels — exactly as written in the reference prototype, with no rewriting, rephrasing, shortening, expanding, reordering, or added/removed content.
- **FR-002**: The page MUST reuse the site's existing shared Header and Footer **components** (`components/layout/Header.tsx`, `Footer.tsx`, `HeaderClient.tsx`) without modification or duplication of either component's code. This does not preclude the minimal navigation-*configuration* data edit explicitly scoped by FR-011 (a link `href` value in `cms/api/footer.ts`) — that is a content/config change, not a change to the Header or Footer component itself.
- **FR-003**: The page MUST render, in reference order: hero, "Modernization is more than migration" intro/blockers block, six-capability "Our modernization services" grid, five-stage "Modernization lifecycle" strip, six-tile "Strategies we support" band, six-tile "Why AI-assisted modernization" grid, three-card "Industries we modernize" grid, five-item FAQ accordion, six-card "Related services" grid, and closing CTA band.
- **FR-004**: The hero section's right-side highlight card MUST display a static image in place of the reference's inline stat/data-visualization content, without also rendering that same data as text/tiles alongside or on top of the image, and without distorting the image's aspect ratio at any supported viewport width.
- **FR-005**: Every interactive affordance present in the reference MUST work in the implementation: each FAQ item independently expands/collapses; the "See capabilities" hero link scrolls to the capabilities section without that section being hidden under the sticky header; all CTA, card, and related-service links navigate to their intended destination (or a page-appropriate equivalent where the destination does not yet exist as a built route).
- **FR-006**: The page's visual presentation (typography scale, weight, line-height, letter-spacing, colors, gradients, spacing, card/section dimensions, border radii, shadows, and icons) MUST match the reference prototype at the reference's desktop width, with no visually approximated values where the reference specifies an exact one.
- **FR-007**: The page's layout MUST adapt responsively across desktop, laptop, tablet, and mobile widths, following the reference's own breakpoint behavior (e.g., multi-column grids collapsing to fewer columns, then to a single column; the hero's two-column split stacking on narrow viewports) rather than a uniform shrink of the desktop layout.
- **FR-008**: This phase MUST implement static content only — no network requests, data fetching, CMS integration, or client-side data-derived state — while remaining structured so that content can later be supplied dynamically without a rebuild of the page's visual structure.
- **FR-009**: The hero (eyebrow, headline, subtitle, CTAs, and right-side media card), the heading/eyebrow/paragraph content block ("Modernization is more than migration" and its blocker-chip list), the icon-and-text card, the numbered process step, and the closing CTA band MUST each be built as configurable, content-agnostic `components/ui/` building blocks — not page-specific one-off implementations. This is not a hypothetical "might be reused" judgment call: the six sibling "What We Do" service page design prototypes already present in `raw-files-v3/TechGrit Website V2.3/` (Product Engineering, Data & AI Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups) share this page's hero and content-block markup structure verbatim — same card chrome, same two-column layout, same six-chip list shape — differing only in copy, stats, and images. None of these patterns may be hardwired with this page's specific copy.
- **FR-010**: No functional requirement in this specification requires modifying any page, component, or configuration outside what is needed to build this new page and its genuinely reusable supporting pieces.
- **FR-011**: The site's existing "What We Do → AI-Accelerated Modernization" entry point (today an in-page anchor on the combined Services page) MUST resolve to the new page at the route `/what-we-do/ai-modernization` once built. Concretely, this means updating the one hardcoded pointer that exists — the footer's "What We Do" link config (`cms/api/footer.ts`) — as the minimal routing change necessary. The header nav's CMS fallback data (`DEFAULT_HEADER_DATA` in `cms/api/header.ts`) carries no per-service entries to repoint (`megaGroups: []` by design), so no header-side code change is needed or made; live CMS content, the rest of the `/services` page, and all other navigation entries remain untouched.
- **FR-012**: A reusable Outcome heading-plus-description component MUST be built under `components/ui/` as part of this feature, taking only a heading and a description via props/configuration — deliberately simple and content-agnostic, with no speculative functionality beyond that. This page's own content has no Outcome section to pass into it (see Assumptions), but the component is established now, not deferred, per confirmed product direction that upcoming "What We Do" pages will use this pattern.

### Key Entities

- **Modernization Capability**: One of the six service offerings shown in "Our modernization services" — has a step label/number, a title, a short lead description, and a list of supporting bullet points.
- **Lifecycle Stage**: One of the five ordered stages in "Modernization lifecycle" — has a sequence number, a title, and a description.
- **Modernization Strategy**: One of the six approaches in "Strategies we support" — has a name and a short description.
- **Value Proposition Tile**: One of the six items in "Why AI-assisted modernization" — has an icon, a heading, and a description.
- **Industry Card**: One of the three items in "Industries we modernize" — has an icon, a name, a description, and a link to that industry's page.
- **FAQ Item**: One of the five question/answer pairs — has a question, an answer, and an independent expanded/collapsed state.
- **Related Service Link**: One of the six items in "Related services" — has an icon, a name, a short description, and a link to that service's page.
- **Hero Stat**: One of the four stat callouts originally shown in the hero's right-side card (Faster/Cheaper/Coverage/Downtime) — retained as the source content that the replacement hero image visually represents.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A person familiar with the reference prototype, shown the implemented page side by side with the reference at the same viewport width, cannot identify a visually noticeable difference in any of the ten sections.
- **SC-002**: All page text matches the reference prototype at 100% fidelity — zero content substitutions, omissions, or additions when diffed against the reference's copy.
- **SC-003**: The page remains fully readable and free of horizontal overflow or overlapping elements at desktop, laptop, tablet, and mobile widths.
- **SC-004**: A visitor can independently expand each of the 5 FAQ items and reach every one of the 6 capability cards, 5 lifecycle stages, 6 strategy tiles, 6 "why" tiles, 3 industry cards, and 6 related-service links without encountering a broken or dead interaction.
- **SC-005**: At least the hero, content-block, icon/text-card, and CTA-band patterns introduced for this page are reused, unmodified in their shared form, by at least one subsequent "What We Do" page built after this one (validated at the time that next page is built).

## Assumptions

- The reference prototype (`TechGrit AI Modernization.dc.html`) does not contain a section literally labeled "Outcome" with a heading-plus-description pair; the closing CTA band plays the equivalent narrative role ("Legacy systems should enable growth, not hold it back."). Per clarification and confirmed product direction (not this page's own content), the reusable Outcome component (FR-012) is built now rather than deferred — it ships unused on this page and is exercised when the next "What We Do" page that has real Outcome content is built.
- The six sibling "What We Do" service page design prototypes (`raw-files-v3/TechGrit Website V2.3/TechGrit {Product Engineering, Data AI, Platform Engineering, Managed Services, AI Strategy, Startups}.dc.html`) already exist in this repository and were inspected directly during planning: their HERO and INTRO sections are structurally identical to this page's (same card chrome/decorative treatment, same two-column layout, same six-chip list shape), differing only in copy, stat values, and images. This is the concrete basis for FR-009's requirement that the Hero and content-block patterns be built as shared `components/ui/` primitives now rather than as page-local one-offs — and it is also why building them (and Outcome, per FR-012) ahead of a second page's actual implementation is a documented, evidence-backed decision rather than speculative abstraction (see plan.md's Complexity Tracking). This ticket's own scope is unchanged by this evidence: it does not build any of those six sibling pages, their routes, or their content — only the shared components they will later consume.
- Destination links to sibling "What We Do" / Industries / Insights pages referenced by this page (e.g., Software Product Engineering, Data & AI Engineering, HealthTech, FinTech) point to those pages' intended routes regardless of whether each sibling page has been built yet; this page's own build does not block on their existence.
- The replacement hero image is the existing `public/samples/dm-tech-debt.png` asset (already used on the homepage's "Eradicate Technical Debt" value-proposition card), reused here rather than a newly supplied asset, chosen as the closest semantic fit to the reference's "faster / cheaper / higher test coverage / lower downtime" modernization story despite duplicating its homepage usage.
- "Pixel-perfect" is evaluated at the reference's authored desktop viewport; intermediate breakpoints follow the reference's documented responsive rules and this codebase's existing responsive conventions where the reference itself does not specify a rule.
- Legal/placeholder footer links (Privacy Policy, Terms of Service, Cookie Preferences) inherit whatever the existing shared Footer already does site-wide; this feature does not alter Footer behavior.
- No dedicated "What We Do" route currently exists in the application (the only built services route is a single combined `/services` page); this feature introduces the first standalone page in that information architecture, living at `/what-we-do/ai-modernization` (see Clarifications). Today's "AI-Accelerated Modernization" link exists only as a hardcoded pointer in the footer's "What We Do" list (`cms/api/footer.ts`), pointing to `/services#svc-modernization`, an anchor inside the combined page. The header nav has no equivalent hardcoded entry — its CMS fallback (`DEFAULT_HEADER_DATA` in `cms/api/header.ts`) ships with `megaGroups: []` by design, degrading to a bare logo+CTA rather than any per-service list when the CMS is unreachable. Per clarification, repointing the "AI-Accelerated Modernization" entry to the new page (FR-011) is therefore a footer-only code change — it does not extend to the live CMS content itself, restructuring the rest of the `/services` page, the mega-menu layout, or any other nav entry.
