# Feature Specification: Discovery Sprints Page

**Feature Branch**: `005-discovery-sprints`
**Created**: 2026-08-24
**Status**: Draft
**Input**: User description: "Implement the TechGrit Discovery Sprints webpage in the existing Next.js application using the reference prototype and existing project architecture" (TMS-88-discovery-sprints)

## Clarifications

### Session 2026-08-24

- Q: The hero's right column changes from the reference's stat/summary panel to an image. Where should the stat data (Duration, Deliverables, Outcome, Powered-by) go? → A: Drop the stats entirely — build the hero using the same `Hero` component pattern already used on the Engagement Models page (eyebrow, title, subtitle, primary/secondary CTA, fixed-aspect-ratio `MediaSlot` image on the right, no stat panel).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluate the Discovery Sprint offering (Priority: P1)

A prospective client (founder, product leader, or enterprise stakeholder) browsing "How We Work" lands on the Discovery Sprints page to understand what a Phase Zero Assessment is, what it includes, and whether it fits their situation before committing budget to a full engagement.

**Why this priority**: This is the core purpose of the page — without it, the page has no value. Everything else (FAQ) supports this primary understanding journey.

**Independent Test**: Can be fully tested by navigating to `/how-we-work/discovery-sprints` and confirming the hero, "Why Phase Zero changes everything," the new "What Is a Phase Zero Assessment?" explainer, "What We Cover," and "What You'll Receive" sections render the correct copy, in the correct order, matching the reference layout.

**Acceptance Scenarios**:

1. **Given** a visitor on the How We Work navigation menu, **When** they select "Discovery Sprints," **Then** they land on a page whose hero states the Phase Zero value proposition with a primary CTA on the left and a fixed-aspect-ratio supporting image on the right (built with the same `Hero`/`MediaSlot` pattern as the Engagement Models page, no stat panel), with no breadcrumb rendered.
2. **Given** a visitor reading the page, **When** they scroll past the intro section, **Then** they see three structured coverage areas (Business Discovery, Product & Technical Assessment, Delivery Planning) each with a category label, title, subtitle, and feature list.
3. **Given** a visitor evaluating deliverables, **When** they reach the "What You'll Receive" section, **Then** they see all seven numbered deliverable cards from the reference (Executive Summary through Risk & Dependency Assessment).

---

### User Story 2 - Resolve open questions via FAQ (Priority: P2)

A stakeholder who is close to booking wants quick answers to common objections (duration, ownership of artifacts, whether it's only for new products) without contacting sales.

**Why this priority**: Reduces friction to conversion but is secondary to first understanding the offering itself.

**Independent Test**: Can be tested independently by scrolling to the FAQ section and expanding/collapsing each question to confirm the reusable accordion component displays the correct answer text.

**Acceptance Scenarios**:

1. **Given** the FAQ section, **When** a visitor clicks a closed question, **Then** the answer expands using the project's existing reusable FAQ/accordion component.
2. **Given** the FAQ section, **When** a visitor clicks an already-open question, **Then** it collapses.

---

### User Story 3 - Move from evaluation to contact (Priority: P3)

A convinced visitor wants to act and book a Discovery Sprint.

**Why this priority**: Conversion matters but only after the visitor is informed (Stories 1 and 2).

**Independent Test**: Can be tested by clicking the hero CTA and the closing CTA section's buttons and confirming they route to the Contact page.

**Acceptance Scenarios**:

1. **Given** the hero section, **When** a visitor clicks "Book a Discovery Sprint," **Then** they are taken to the Contact page.
2. **Given** the closing CTA section, **When** a visitor clicks either CTA button, **Then** they are taken to the Contact page, matching the CTA pattern already used on the AI-Accelerated Modernization and Orbit AI Ecosystem pages.

---

### Edge Cases

- What happens on narrow viewports (mobile/tablet) where the hero's two-column layout (copy + image) cannot sit side by side? → Stack vertically, copy first, preserving the fixed-size image without letting it grow to fill the width.
- How does the page behave if a visitor deep-links directly to `/how-we-work/discovery-sprints` without visiting other pages? → Page must render fully and independently (no reliance on prior navigation state).
- What happens to the "What We Cover" cards' feature list on small screens? → Cards stack to a single column, preserving full feature list content without truncation.
- How does the FAQ section behave when JavaScript hydration is delayed? → The first FAQ item should not require client interaction to convey its content is expandable (native disclosure semantics preferred, consistent with existing reusable FAQ component behavior).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST be reachable at a route under the "How We Work" section, following the same route-segment and file/folder pattern already established by the existing How We Work pages (e.g., `app/how-we-work/<slug>/page.tsx` with a co-located `_components` folder).
- **FR-002**: The hero section MUST display, on the left: no breadcrumb, an eyebrow/badge ("Framework 03 · Phase Zero"), a title with gradient-accented closing phrase, a supporting description, and a primary CTA button ("Book a Discovery Sprint") plus a secondary link-style CTA ("See what's included").
- **FR-003**: The hero section MUST display, on the right, a fixed-aspect-ratio image (via the existing `Hero` component's `media`/`MediaSlot` pattern, as already used on the Engagement Models page hero) that does not grow or stretch to fill available space beyond its intrinsic sizing. The reference prototype's stat/summary panel (Duration, Deliverables, Outcome, Powered-by) is dropped entirely — no stat data is carried elsewhere on the page.
- **FR-004**: The page MUST include a "Why Phase Zero changes everything" section with an eyebrow, title, and description on the left, and a right-side list of highlight chips representing the questions a Discovery Sprint answers.
- **FR-005**: The page MUST include a new "What Is a Phase Zero Assessment?" section (not present in the reference prototype) consisting of a stacked eyebrow, title, and description, followed by a full-width card containing its own title and description, explaining the Phase Zero Assessment concept as a bridge before the "What We Cover" section.
- **FR-006**: The page MUST include a "What We Cover" section with an eyebrow, title, and subtitle, followed by exactly three cards, each with a category label, title, subtitle, and a bulleted feature list — using the same card composition pattern already used for the three capability cards on the Engagement Models page (no separate "structure label" or extra description field beyond category label/title/subtitle/features).
- **FR-007**: The page MUST include a "What You'll Receive" (artifacts) section reproducing the seven numbered deliverable cards from the reference prototype verbatim (title + description each).
- **FR-008**: The page MUST include a "Why TechGrit Discovery Sprints" section with only an eyebrow, title, and description (no supporting tiles/grid beyond what the reference calls for at this specific section per clarified scope — icon+title tiles belong to the "Documentation you can execute" section, see FR-009).
- **FR-009**: The page MUST include a section using the eyebrow "Documentation you can execute. Not slides that gather dust." pattern with an eyebrow, title, description, and a set of icon+title tiles (the six "why-tile" entries from the reference: execution-ready docs, AI IMPACT™ built in, architecture expertise, business/tech alignment, independent of delivery, reduced risk).
- **FR-010**: The page MUST include a "How It Works" lifecycle section reproducing the four-step process (Discover, Assess, Blueprint, Execute) exactly as structured in the reference, using the existing reusable process/step component where one already exists in `components/ui`.
- **FR-011**: The page MUST include a "Who It's For" section reproducing the four audience cards from the reference (New product teams, Legacy modernization programs, AI adoption initiatives, Enterprise platform builds).
- **FR-012**: The page MUST include a "Frequently Asked" section built using the project's existing reusable FAQ/accordion component, reproducing all five Q&A pairs from the reference verbatim.
- **FR-013**: The page MUST NOT include a "Related frameworks & services" section — this section from the reference prototype is explicitly excluded from scope.
- **FR-014**: The page MUST end with a closing CTA section styled and structured identically to the CTA pattern already implemented on the AI-Accelerated Modernization and Orbit AI Ecosystem pages (gradient-bordered panel, eyebrow, title, description, two CTA buttons routing to Contact).
- **FR-015**: All interactive elements (CTA buttons, FAQ toggles) MUST route to their existing in-app destinations (Contact page) rather than the reference's static `.dc.html` file paths.
- **FR-016**: The page's content (copy, numbers, labels) MUST be sourced from a static local content module, consistent with how other static How We Work/What We Do pages in this codebase are structured — no CMS or API call is required for this feature.
- **FR-017**: The page MUST reuse existing `components/ui` primitives (cards, badges, chips, process steps, FAQ accordion, CTA section) wherever an equivalent already exists, and introduce a new reusable component only when no existing primitive covers a required element.
- **FR-018**: The page MUST be responsive across desktop, tablet, and mobile viewports using the project's existing breakpoints (`lg`=1140px, `md`=960px, `sm`=560px), reproducing the reference's responsive stacking behavior (hero to single column, 3-col/4-col grids collapsing to 2-col then 1-col, etc.) rather than uniformly scaling the desktop layout down.
- **FR-019**: The page MUST NOT introduce new design tokens, colors, or spacing values where an existing token in `tokens.css`/`globals.css` already represents the required value.
- **FR-020**: The page MUST render without visible flicker or layout shift on initial load, using Server Components by default and avoiding unnecessary client-side rendering.

### Key Entities

- **Discovery Sprint Page Content**: The static content model backing the page — hero copy and image, coverage-area cards (category label, title, subtitle, features), deliverable cards, lifecycle steps, why-tiles, audience cards, and FAQ entries — analogous in shape to the existing AI-Accelerated Modernization and Engagement Models content modules.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify what a Discovery Sprint / Phase Zero Assessment is and why it matters within 30 seconds of landing on the page, from the hero's title, subtitle, and image alone (specific numbers like duration and deliverable count are conveyed later, in the "What We Cover" and "What You'll Receive" sections, not in the hero).
- **SC-002**: 100% of the in-scope reference prototype content sections (hero, intro, capabilities, deliverables, lifecycle, why, who-it's-for, FAQ, CTA) are represented on the implemented page, plus the one new section explicitly requested ("What Is a Phase Zero Assessment?"); the reference's "Related frameworks & services" section is deliberately excluded.
- **SC-003**: The implemented page is visually indistinguishable from the reference prototype at matching viewport sizes (desktop ≥1280px, tablet ~768–960px, mobile ~375–560px) for layout, spacing, typography, and color usage.
- **SC-004**: All primary and secondary CTAs on the page successfully route to the Contact page with zero broken links.
- **SC-005**: The page introduces zero duplicate design tokens and reuses existing `components/ui` primitives for at least the FAQ, CTA, and process-step sections.
