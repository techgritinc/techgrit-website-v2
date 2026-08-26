# Feature Specification: Consumer Lending Industries Page

**Feature Branch**: `TMS-67-consumer-lending`
**Created**: 2026-08-26
**Status**: Draft
**Input**: User description: "taking this file as reference: consumer lending marketing HTML — just content as reference, no visual/design-system requirement. Build a Consumer Lending page under the Industries section, following the existing UI/tokens/layout/breakpoints of the codebase. 15 ordered sections specified, reusing existing components (Hero same as Fintech, MetricsStrip from case studies, Why-Orbit-AI-style cards, a new Domain Depth tabbed section, capability cards for several sections, FAQ matching AI-Accelerated Modernization, FinalCta), with two named sections (Engagement Models, Who is Accountable) explicitly excluded."

## Clarifications

### Session 2026-08-26

- Q: Is page content sourced from a static local content module, or a live CMS? → A: Live CMS — `/api/pages/by-slug/consumer-lending` is already live and returns all 13 required sections, each mapping to a `__component` shape already handled by the Fintech/Healthcare/AI-Accelerated Modernization/Construction pages' CMS integrations (`page-reusable-sections.hero`, `.statistics`, `.modernization-challenges`, `.pd-modernization-capabilities`, `.service-detail`, `.pd-faq`, `.cta-banner`, plus the new `industries-construction.pd-lending-lifecycle` for Domain depth).
- Q: The Final CTA's CMS entry has `primaryCtaLabel/Link` populated ("Talk to us" → `/contact-us/`) but `secondaryCtaLabel`/`secondaryCtaLink` both `null` — how should the required second "Request an estimate" button be sourced? → A: Take reference from the Construction industries page's Final CTA — Construction's `page.tsx` always passes a `secondaryCta` object into the shared `FinalCta` component (not conditionally, unlike the AI-Modernization page's drop-if-missing pattern). Consumer Lending's Final CTA follows that same unconditional-secondary-button structure, falling back to the reference content's own values ("Request an estimate" → `/request-for-estimate/`) whenever the CMS field is empty, so the button always renders.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Lending prospect evaluates TechGrit's domain depth (Priority: P1)

A decision-maker at a dealer-originated or indirect consumer lending company (or a credit union/bank considering a lending platform partner) lands on the Consumer Lending industries page to determine whether TechGrit understands their specific lifecycle stage and systems before reaching out.

**Why this priority**: This is the core conversion path for the page — a visitor who cannot quickly confirm domain fit will leave without contacting sales. Every other section supports this judgment.

**Independent Test**: Can be fully tested by loading `/industries/consumer-lending` and confirming the hero, proof metrics, "why lenders call us" cards, and the domain-depth lifecycle tabs render with the reference content and let the visitor identify their lifecycle stage (dealer network, origination, funding, servicing, collections, or finance & compliance) without leaving the page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives at the Consumer Lending page, **When** the page loads, **Then** they see a hero with an eyebrow, headline, supporting description, and two calls to action, followed immediately by a proof-metrics strip of value/label pairs.
2. **Given** the visitor scrolls to the Domain Depth section, **When** they click a lifecycle-stage tab other than the first, **Then** the body content below the tabs updates to show that stage's title, description, and its list of capability points, while the previously selected tab is no longer marked active.
3. **Given** the visitor has not clicked any tab, **When** the Domain Depth section first renders, **Then** the first lifecycle stage ("Dealer network") is shown as the active tab and its content is visible by default.

---

### User Story 2 - Lending prospect assesses delivered work and applied AI maturity (Priority: P2)

The same visitor continues scrolling to evaluate the breadth of systems TechGrit has integrated, which AI capabilities are actually in production versus still in progress, and concrete past engagements, so they can gauge credibility before requesting a conversation.

**Why this priority**: Credibility content (ecosystem integrations, applied AI status, delivered work, the client quote) is what converts an interested visitor into an inbound lead; it is necessary but secondary to the domain-fit judgment in User Story 1.

**Independent Test**: Can be tested independently by scrolling through the ecosystem, applied AI, institutional platforms, our-work, and quote sections and confirming each renders its full reference content (system categories, AI item statuses, case summaries with metrics, and the pull quote) without requiring the Domain Depth tabs to be interacted with first.

**Acceptance Scenarios**:

1. **Given** the visitor reaches the "The ecosystem" section, **When** the section renders, **Then** it shows three columns of system-category cards, each with a title and its list of integrated systems/features.
2. **Given** the visitor reaches "Applied AI", **When** the section renders, **Then** each of the two-column cards shows a status label (e.g., in production, in build, in prototype, delivered), a title, and a description.
3. **Given** the visitor reaches "Institutional platforms", **When** the section renders, **Then** the first row shows two cards, the following row shows three cards, and one additional plain-text card (styled like the Orbit AI Ecosystem page's "Built for Real-World Engineering" callout) appears for the supplementary note about core adapters.
4. **Given** the visitor reaches "Our work", **When** the section renders, **Then** three cards per row each show an eyebrow (sector), a title, a description, a labeled metric heading, and its supporting plain-text detail.
5. **Given** the visitor reaches the quote section, **When** it renders, **Then** a single full-width card shows the quote text and attribution.

---

### User Story 3 - Lending prospect understands engagement approach and gets answers before contacting sales (Priority: P3)

The visitor reviews how TechGrit runs engagements (How we work), the regulatory/metrics context TechGrit already operates in (Operating context), and common objections (FAQ), then uses the final call-to-action to start a conversation or request an estimate.

**Why this priority**: This closes the funnel. It matters, but a visitor who is unconvinced by Domain Depth (P1) or credibility content (P2) will not reach this section, so it is the lowest-priority slice while still being required for the page to be complete.

**Independent Test**: Can be tested independently by scrolling to How we work, Operating context, the FAQ, and the final CTA, and confirming each renders correctly and that both CTA buttons are present and link out.

**Acceptance Scenarios**:

1. **Given** the visitor reaches "How we work", **When** the section renders, **Then** three cards per row each show an eyebrow, a title, and a description (no feature list).
2. **Given** the visitor reaches "Operating context", **When** the section renders, **Then** two cards per row each show an eyebrow, a title, a feature list (the regulation/metric chips), and a supporting plain-text line.
3. **Given** the visitor reaches "Common questions", **When** they click a closed question, **Then** its answer expands in place, matching the interaction and visual treatment of the FAQ section on the AI-Accelerated Modernization page.
4. **Given** the visitor reaches the final CTA, **When** the section renders, **Then** it spans the full page width and offers a primary "Talk to us" action and a secondary "Request an estimate" action.
5. **Given** the visitor is on a mobile-width viewport at any section, **When** they scroll through the full page, **Then** every section reflows using the site's existing responsive breakpoints (no horizontal scrolling, no overlapping content).

### Edge Cases

- What happens when a Domain Depth lifecycle stage has a different number of capability points than another stage? The two-column point list must reflow per stage without leaving a visibly broken single-item row layout.
- How does the page handle the source reference's "Engagement models" and "Who is accountable" sections? Both are explicitly out of scope and MUST NOT appear anywhere on the page.
- What happens on very small viewports for the Domain Depth tab row? Tabs must remain usable (e.g., wrapping or horizontal scroll consistent with existing tabbed patterns in the codebase) rather than being clipped or overlapping.
- What happens if a visitor navigates directly to an in-page anchor (e.g., a lifecycle or FAQ anchor) from outside the page? The target section must be reachable and correctly offset below the sticky header, consistent with the rest of the site.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST be reachable at the Industries section under a consumer-lending route and MUST be reachable via standard site navigation to the Industries area.
- **FR-002**: The page MUST render, in order: Hero, Metrics strip, Why lenders call us, Domain depth, The ecosystem, Applied AI, Institutional platforms, Our work, Quote, How we work, Operating context, Common questions, Final CTA.
- **FR-003**: The page MUST NOT render an "Engagement models" section or a "Who is accountable" (leadership/advisory) section.
- **FR-004**: The Hero section MUST present an eyebrow label, a headline, a supporting description, and two calls to action, matching the structure already used by the Fintech industries page's hero.
- **FR-005**: The Metrics strip MUST present a set of value/label pairs in a horizontal strip, matching the structure already used by the case-studies metrics strip (four metrics, per the reference content: founding year, projects delivered, systems integrated, lifecycle stages).
- **FR-006**: The "Why lenders call us" section MUST present an eyebrow, a title, a description, and a set of cards, each with a title and a supporting subtitle/description, matching the structure of the "Why Orbit AI?" section on the Orbit AI Ecosystem page.
- **FR-007**: The Domain depth section MUST present an eyebrow, a title, a description, and a full-width row of underlined, clickable tabs (one per lifecycle stage: Dealer network, Origination, Funding, Servicing, Collections, Finance & compliance).
- **FR-008**: Selecting a Domain depth tab MUST update the body content below the tabs to show only that stage's content; exactly one tab MUST be marked active/selected at a time, defaulting to the first stage on initial render.
- **FR-009**: Each Domain depth stage's body MUST show, on the left, a stage title and description, and on the right, a two-column list of capability points, each point prefixed with a dot/bullet marker in a capsule-shaped row.
- **FR-010**: "The ecosystem" section MUST present an eyebrow, a title, a description, and three columns of cards, each with a title and its list of features/items, matching the codebase's capability-card pattern.
- **FR-011**: "Applied AI" section MUST present an eyebrow, a title, a description, and two columns of cards, each with an eyebrow (status label), a title, and a description, matching the same capability-card pattern used elsewhere without a feature list.
- **FR-012**: "Institutional platforms" section MUST present an eyebrow, a title, a description, a first row of two cards, a second row of three cards, and one additional card containing only plain supporting text, matching the visual treatment of the "Built for Real-World Engineering" card on the Orbit AI Ecosystem page.
- **FR-013**: "Our work" section MUST present an eyebrow, a title, a description, and three cards per row, each using the capability-card pattern without a feature list but including an eyebrow, a title, a description, a labeled metric heading, and its supporting plain text.
- **FR-014**: The Quote section MUST present a single full-width card containing a quotation and its attribution.
- **FR-015**: "How we work" section MUST present an eyebrow, a title, a description, and three cards per row, each using the capability-card pattern with an eyebrow, a title, and a description (no feature list).
- **FR-016**: "Operating context" section MUST present an eyebrow, a title, a description, and two cards per row, each using the capability-card pattern with an eyebrow, a title, a feature list, and supporting plain text.
- **FR-017**: "Common questions" section MUST present an eyebrow, a title, and a set of expandable question/answer pairs, reusing the same FAQ component and interaction pattern as the AI-Accelerated Modernization page.
- **FR-018**: The Final CTA MUST span the full page width and present a title, description, and two calls to action ("Talk to us" and "Request an estimate"), matching the existing final-CTA component; the secondary action MUST always render, falling back to the reference content's own label/link when the CMS entry leaves it empty (mirroring the Construction industries page's Final CTA, which always supplies a secondary action rather than conditionally omitting it).
- **FR-019**: All section content (copy, labels, statuses, chip lists, metrics) MUST be sourced from the live CMS page at the `consumer-lending` slug and MUST match the reference document's content for each corresponding section, adapted only where a section is explicitly new (Domain depth) or explicitly reuses another page's visual pattern.
- **FR-022**: The page MUST render nothing (or a not-found state, consistent with how other CMS-backed industry pages behave) if the CMS is unreachable or returns no usable sections — there is no static content fallback.
- **FR-020**: The page MUST use only the site's existing design tokens, shared components/primitives, spacing scale, and responsive breakpoints; it MUST NOT introduce a new design system, new color values, or new breakpoints.
- **FR-021**: The page MUST be fully responsive at the site's existing breakpoints, with every section reflowing without horizontal overflow or overlapping content.

### Key Entities

- **Domain Depth Lifecycle Stage**: One lending lifecycle stage (Dealer network, Origination, Funding, Servicing, Collections, Finance & compliance) with a tab label, a stage title, a stage description, and an ordered list of capability points.
- **Metric**: A value/label pair shown in the proof-metrics strip.
- **Capability Card**: A reusable card shape (used across Why lenders call us, The ecosystem, Applied AI, Institutional platforms, Our work, How we work, and Operating context) carrying some combination of eyebrow, title, description, feature list, and plain-text note, per section.
- **Case Summary**: An entry in "Our work" with a sector eyebrow, title, description, and a labeled metric (heading + supporting text).
- **FAQ Item**: A question and its expandable answer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify which lending lifecycle stage matches their need by interacting with the Domain Depth tabs, without navigating away from the page.
- **SC-002**: All 13 required sections render in the specified order with zero missing or reordered sections, verified against the reference content.
- **SC-003**: The "Engagement models" and "Who is accountable" sections are absent from the rendered page in 100% of checks.
- **SC-004**: The page reflows correctly (no horizontal scrolling, no overlapping content) across the site's existing small, medium, and large breakpoints.
- **SC-005**: Every call-to-action on the page (hero, final CTA) is present and points to an existing, working destination (contact or estimate-request flow).
