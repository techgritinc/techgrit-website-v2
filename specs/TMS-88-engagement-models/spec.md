# Feature Specification: Engagement Models Page (How We Work)

**Feature Branch**: `feature/TMS-88-how-we-work-enagagement-models-page`
**Created**: 2026-08-24
**Status**: Draft
**Input**: User description: "Implement the TechGrit Engagement Models webpage in the existing Next.js application using the reference prototype `raw-files-v3/TechGrit Website V2.3/TechGrit Engagement Models.dc.html` as the single visual and structural reference. The page belongs under the 'How We Work' section, following the exact file/folder architecture already established for the `what-we-do/ai-modernization` page. Maximize reuse of `components/ui` primitives before creating anything new. Tailwind only, reusing existing `tokens.css`/`globals.css` values — new tokens only when a value genuinely doesn't exist yet. Pixel-accurate fidelity to the reference for layout, spacing, typography, color, radius, icons, and responsive behavior at the project's existing breakpoints (lg=1140, md=960, sm=560), with no flicker/layout shift on load. Scope is deliberately narrower than the full reference: the hero keeps the reference's left column (badge, title, description, CTA) but replaces the right-side stat-tile grid with a fixed-size image placeholder that must not grow; the reference's 'One partner. Three ways to engage.' intro section, 'How we onboard' lifecycle section, 'Who we help' section, FAQ section, and 'Related frameworks & services' section are all explicitly excluded from this build. The 'Three engagement models' section keeps the reference's 3 model cards (category label, title, subtitle, feature list) built with the same card pattern used for the 5-capability cards on the `how-we-work/orbit-ai` page. The 'Why TechGrit engagements' section keeps the reference's eyebrow/title/description and its 5 two-column icon tiles, but drops each tile's description paragraph — showing icon + title only. The closing CTA section follows the same pattern used on the `what-we-do/ai-modernization` / `how-we-work/orbit-ai` pages. Consider this ticket TMS-88 (tracked here as TMS-88-engagement-models to avoid colliding with the existing TMS-88 Orbit AI Ecosystem spec directory)."

## Clarifications

### Session 2026-08-24

- Q1: The reference's "Three engagement models" section instruction says to build it "the same how we implemented for 5 capabilities in orbit-ai-ecosystem page" — does this mean adding two more engagement models beyond the reference's 3, or reusing that page's card component/pattern for the reference's existing 3 models? → A: Reuse the same card component/visual pattern (category label, title, subtitle, bulleted feature list) that powers the 5-capability cards on the Orbit AI page, applied to the reference's actual 3 engagement models (Dedicated Product Team, MVP Development, Staff Augmentation). No new models are invented.
- Q2: The hero's right-side element replaces the reference's 4-tile stat grid with "a picture" in a fixed-size div — which image asset should fill it? → A: Reuse an existing, currently-unused image asset from `public/` (selected during planning, matching the fixed-size treatment already established for the hero image swap on the `how-we-work/orbit-ai` page), rather than introducing a new asset.
- Q3: The "Why TechGrit engagements" tiles keep icon + title but drop each tile's description paragraph per the requester's explicit instruction — should the 5 titles/icons themselves still come verbatim from the reference? → A: Yes — reuse the reference's 5 tile titles and icons verbatim (AI-first by default, Proven delivery frameworks, Senior engineers, Agile and transparent, Cloud-native and scalable) with the icon set carried over unchanged; only the description copy is dropped.
- Q4: A new "Not Sure Which Model Fits Your Needs?" section (eyebrow, title, and a Your-Goal → Recommended-Model mapping for the 3 goals/models) is added before the CTA section — should its two lists render as one card with the lists stacked top/bottom (matching the About page's "Who You Are" card literally), or as two side-by-side columns? → A: Two side-by-side columns within one card — a left "Your Goal" column and a right "Recommended Model" column, with each of the 3 rows aligned across both columns.
- Q5: On narrow/mobile viewports (≤560px), how should the new section's two-column card respond? → A: Stack columns — each goal is immediately followed by its recommended model, matching the project's existing convention of collapsing multi-column grids to 1 column at the sm breakpoint.
- Q6: What eyebrow label should the new section use (the requester left it as "proper name")? → A: "Find Your Fit" — short, action-oriented, and distinct from this page's other eyebrows ("Three engagement models", "Why TechGrit engagements").
- Q7 (supersedes Q3): The "Why TechGrit engagements" section's content was replaced with new copy — title "Why Organizations Choose TechGrit", a description sentence, and 7 flat feature phrases (one long, naming PRISM™/4D™/AI IMPACT™/OrbitAI™) instead of the reference's 5 titled tiles. What UI should render the 7 items? → A: A single-column stacked checklist — eyebrow, title, description, then 7 rows each showing a small icon plus one line of text (no title/description split, no 2-column grid), reusing the existing dot/check bullet feature-list styling rather than the icon-tile component.
- Q8 (supersedes Q6, amends FR-006/FR-007a): Should the "Why TechGrit engagements" and "Find Your Fit" eyebrows be hardcoded literal text, or rendered directly from their CMS fields? → A: No hardcoded fallback text anywhere on this page. Every field (including eyebrow/badge labels) renders exactly what the CMS supplies; when a field is null, nothing is rendered for it — no substitute/placeholder/fallback string is invented.
- Q9 (supersedes Q7's layout, amends FR-006): After implementation review, the "Why TechGrit engagements" checklist should render as a 2-column grid (matching the reference's own `.why-grid`), not a single-column stack. → A: 2 columns on desktop/tablet, collapsing to 1 column on mobile — the "single-column at every breakpoint" requirement from Q7 is dropped; Q7's other decisions (icon+text rows, no per-row description, reusing the chip-row visual style) still stand.
- Q10 (supersedes Q4/Q5's row-pairing, amends FR-007a): After implementation review, the "Not Sure Which Model Fits Your Needs?" card should present as two independent divs — a single vertical divider between them, not per-row horizontal dividers or card-like row chips — with both sides' text given equal (bold/white) visual weight, and rows styled as plain bulleted points. → A: One card, one vertical divider between "Your Goal" and "Recommended Model". On mobile the two divs simply stack as whole groups (the entire "Your Goal" list, then the entire "Recommended Model" list below it) rather than interleaving row-by-row; the underlying goal→model pairing (Build and continuously evolve a software product → Dedicated Product Team; Validate an idea and launch quickly → MVP Development; Expand your engineering capacity with specialized talent → Staff Augmentation) is preserved by list order within each group, not by a visually-enforced row alignment.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand TechGrit's engagement options (Priority: P1)

A prospective client (an engineering leader, founder, or product owner evaluating how to work with TechGrit) lands on the Engagement Models page — from the "How We Work" navigation, a direct link, or the Orbit AI page's related content — and reads the hero promise plus the three named engagement models (Dedicated Product Team, MVP Development, Staff Augmentation) to understand which structure fits their initiative before reaching out.

**Why this priority**: This is the entire reason the page exists — without the hero and the three-model comparison, the page delivers no decision-making value regardless of what else is built.

**Independent Test**: Load the page standalone and verify a reader can, without leaving the page, understand the page's purpose (hero) and compare all three engagement models by category label, title, subtitle, and feature list — this alone constitutes a usable, demonstrable page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives on the page, **When** the hero section renders, **Then** they see the "Framework 02 · Engagement" eyebrow badge, the headline "Flexible engagement models designed to meet your engineering and business goals.", the supporting paragraph, the primary CTA ("Talk to Our Engineering Team"), and a fixed-size right-side image that does not grow or reflow at any viewport.
2. **Given** a visitor scrolls to the "Three engagement models" section, **When** the section renders, **Then** they see the eyebrow, title, and subtitle, followed by 3 cards — Dedicated Product Team, MVP Development, and Staff Augmentation — each with its category label, title, subtitle, bulleted feature list, and structure tag (Monthly Retainer / Fixed Scope Project / Fixed Capacity).
3. **Given** a visitor is on a mobile viewport (≤560px), **When** they view the models section, **Then** the 3 cards stack into a single column without losing any card content.

---

### User Story 2 - Understand why TechGrit's engagement quality is consistent (Priority: P2)

A visitor who has already reviewed the three engagement models wants reassurance that engineering quality doesn't vary by model, so they scroll to the "Why TechGrit engagements" section to see the underlying principles (AI-first engineering, dedicated leadership, agile transparency, cloud-native architecture, built-in quality/security, flexible governance, and access to TechGrit's frameworks) presented as a stacked checklist.

**Why this priority**: This section reinforces trust and differentiation after the visitor already understands the models, but the page is still functional and demonstrable without it.

**Independent Test**: Load the page, scroll past the models section, and verify the "Why TechGrit engagements" section renders its eyebrow, title, description, and a single-column checklist of 7 icon+text rows.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the "Why TechGrit engagements" section, **When** it renders, **Then** they see the eyebrow, title ("Why Organizations Choose TechGrit"), and description, followed by 7 rows in a 2-column grid, each showing a small icon and one line of text.
2. **Given** a visitor is on a mobile viewport (≤560px), **When** they view this section, **Then** the grid collapses to a single column (Q9).

---

### User Story 3 - Take the next step toward engaging TechGrit (Priority: P3)

A visitor who has read the models and the "why" section is ready to act and uses the closing CTA section to start a conversation with TechGrit's engineering team.

**Why this priority**: Conversion is the ultimate business goal of the page, but the page already delivers informational value without this section being pixel-identical to other pages — it's the lowest-risk section to finish last since it reuses an established pattern.

**Independent Test**: Load the page, scroll to the bottom, and verify the CTA section renders with the same visual treatment (glass card, gradient background accents, heading, supporting copy, primary + secondary buttons) used on the `what-we-do/ai-modernization` and `how-we-work/orbit-ai` pages' closing CTAs.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the bottom of the page, **When** the closing CTA section renders, **Then** it visually matches the established CTA pattern from the `ai-modernization`/`orbit-ai` pages (not the reference file's bespoke CTA markup), with a primary "Talk to Our Engineering Team" action.

---

### Edge Cases

- What happens on narrow viewports where the hero's fixed-size image div would otherwise overflow its column? The image div must maintain its defined dimensions and never grow to fill available space; at the `md` (960px) breakpoint the hero row stacks to a single column per the reference's own responsive rule, with the image div appearing below the text column at its fixed size (or a viewport-appropriate reduced fixed size, since it cannot exceed the narrower column).
- What happens if a reader navigates directly to this page without visiting "How We Work" first? The page must stand alone — the hero and models section together (User Story 1) must fully convey the page's purpose without requiring prior context from other pages.
- How does the page behave when JavaScript/animation is disabled or slow to load? Content must be visible and correctly laid out without relying on entrance animations to reveal information (no content hidden behind a scroll-reveal that never fires).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST be served at the route `/how-we-work/engagement-models`, placed inside the existing "How We Work" route segment alongside the existing Orbit AI page, following the same Server Component + route-local `_components` architecture already established by `app/what-we-do/ai-modernization/`.
- **FR-002**: The hero section MUST render, in this order: an eyebrow badge reading "Framework 02 · Engagement", a headline ("Flexible engagement models designed to meet your engineering and business goals." with the final clause rendered as a gradient accent per the reference), a supporting paragraph, and a primary CTA button ("Talk to Our Engineering Team"). No breadcrumb, secondary "See engagement models" link, or hamburger/burger menu control is required from the reference for this page's hero.
- **FR-003**: The hero section MUST render a right-side container sized to match the reference's stat-grid panel dimensions, containing a single image, and that container MUST NOT grow, stretch, or resize itself based on content or viewport beyond the reference's own responsive stacking behavior.
- **FR-004**: The page MUST NOT implement the reference's "One partner. Three ways to engage." intro section, "How we onboard" lifecycle section, "Who we help" section, FAQ section, or "Related frameworks & services" section.
- **FR-005**: The "Three engagement models" section MUST render an eyebrow ("Three engagement models"), a title ("Choose the model. We bring the team."), and a subtitle, followed by exactly 3 cards for Dedicated Product Team, MVP Development, and Staff Augmentation, each showing a category label (e.g., "01 · Dedicated Product Team"), a title (e.g., "Best for Product Evolution"), a subtitle/lede paragraph, and a bulleted feature list, using the same card component/pattern already built for the 5-capability cards on `how-we-work/orbit-ai`.
- **FR-006**: The "Why TechGrit engagements" section MUST render an eyebrow (taken directly from the CMS field, with nothing rendered if it is null — no hardcoded fallback, per Q8), a title ("Why Organizations Choose TechGrit"), and a description ("Every engagement model is supported by the same engineering principles and delivery excellence."), followed by a 2-column grid (1 column on mobile, per Q9) of exactly 7 rows, each showing a small icon plus one line of text (no title/description split): AI-first software engineering practices; Dedicated engineering leadership; Agile and transparent delivery; Cloud-native and scalable architectures; Built-in quality engineering and security; Flexible engagement with predictable governance; Access to TechGrit's architectural frameworks, including PRISM™, 4D™, AI IMPACT™, and OrbitAI™.
- **FR-007**: The closing CTA section MUST reuse the same visual pattern already implemented for the closing CTA on `app/what-we-do/ai-modernization` and `app/how-we-work/orbit-ai`, rather than the reference file's own CTA markup, per explicit direction.
- **FR-007a**: Immediately before the closing CTA section, the page MUST render a "Not Sure Which Model Fits Your Needs?" section with an eyebrow (taken directly from the CMS field, with nothing rendered if it is null — no hardcoded fallback, per Q8) and the given title, showing one card with a single left accent border on the whole block and two divs side by side — "Your Goal" (left) and "Recommended Model" (right) — separated by one vertical divider (not per-row horizontal dividers or card-like row chips), each row styled as a plain bulleted point with equal (bold/white) text weight on both sides, listing the 3 goal→model pairs (Build and continuously evolve a software product → Dedicated Product Team; Validate an idea and launch quickly → MVP Development; Expand your engineering capacity with specialized talent → Staff Augmentation) in matching list order. On viewports ≤560px, the two divs stack as whole groups — the full "Your Goal" list, then the full "Recommended Model" list below it (Q10) — rather than interleaving row-by-row.
- **FR-008**: All colors, spacing, radii, typography, and other styling values MUST be sourced from existing tokens in `app/tokens.css` / `app/globals.css` or existing `components/ui` primitives; a new token MUST be added only if the reference requires a value with no existing equivalent.
- **FR-009**: The page MUST be responsive at the project's existing breakpoints (lg=1140, md=960, sm=560): the models grid MUST collapse from 3 columns to fewer columns and finally to 1 column on narrow viewports; the "Why TechGrit engagements" grid MUST collapse from 2 columns to 1 column on mobile (Q9); the "Not Sure Which Model Fits Your Needs?" two-div card MUST stack to two full grouped lists on mobile (Q10) — all without altering content order or hiding any content.
- **FR-010**: The page MUST render via Server Components by default, with no client-side interactivity introduced beyond what is genuinely required (e.g., no client component needed for static content), and MUST NOT exhibit visible layout shift, flash of unstyled content, or a visibly different intermediate render between server and client output.
- **FR-011**: Existing shared components, pages, tokens, and global styles outside the scope of this feature MUST NOT be modified except for the minimal navigation/footer link updates already established as precedent (e.g., repointing an existing "Engagement Models" link to the new route), mirroring the 1-line footer-href pattern used when the Orbit AI and AI-Accelerated Modernization pages were added.

### Key Entities

- **Engagement Model**: One of the three ways a client can work with TechGrit. Attributes: category label (ordinal + name), title, subtitle/lede description, ordered list of feature bullets, and a structure tag (e.g., "Monthly Retainer").
- **Why-Engagement Point**: One of the seven reasons engagement quality is consistent across models. Attributes: icon and a single line of text (no separate title/description split).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify all three engagement models and correctly match each one to its intended use case (product evolution, new MVP, or scaling capacity) without scrolling past the "Three engagement models" section.
- **SC-002**: The hero's image container maintains its designed dimensions (no visible growth or distortion) across desktop, tablet, and mobile viewport widths.
- **SC-003**: The page renders with zero visible layout shift or flash between initial paint and fully loaded state, verified across desktop, tablet, and mobile viewport widths.
- **SC-004**: At each of the project's three breakpoints (lg=1140, md=960, sm=560), every section's content remains fully visible and correctly ordered, with card grids reflowing to fewer columns rather than clipping or overlapping content.
- **SC-005**: The implemented page matches the agreed in-scope design intent (hero left column, three-model cards, the "Why Organizations Choose TechGrit" checklist, the "Find Your Fit" comparison section, and the reused CTA pattern) when compared side-by-side at matching viewport sizes — noting the "Why" section and comparison section use requester-supplied copy/layout that intentionally diverges from the raw reference file.
