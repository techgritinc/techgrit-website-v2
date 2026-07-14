
# Feature Specification: Construction Industry Page

**Feature Branch**: `002-construction-page`
**Created**: 2026-07-14
**Status**: Draft
**Input**: User description: "Build the TechGrit Construction industry page using TechGrit Construction.dc.html as the exact visual reference. Implement each section of the page as its own separate reusable component. The page must be fully responsive across desktop, tablet, and mobile breakpoints. Populate the page content through a typed in-repo dummy data module rather than hardcoding content inline, following the same implementation approach used for the About Us page."

## Clarifications

### Session 2026-07-14

- Q: Is building a site-wide header/nav and footer in scope for this feature, or is this page scoped to just the 8 main content sections? → A: Out of scope — another team member is already building the shared header/footer; this feature covers only the 8 main content sections.
- Q: Should the closing CTA's scheduling action use the real external Calendly URL from the reference, or a placeholder link consistent with this feature's dummy-data phase? → A: Use a placeholder/dummy link for now; the real scheduling link will be wired in later.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the construction-industry problem TechGrit solves (Priority: P1)

A construction-industry decision-maker (owner, contractor, or project executive) lands on the page for the first time. Within the opening view and first scroll, they need to recognize that this page speaks directly to construction, understand what industry pain points TechGrit addresses, and see that TechGrit already integrates with the tools their firm runs on, so they can quickly judge relevance and credibility.

**Why this priority**: This is the trust-building and relevance-confirming content of the page. Without it, a construction visitor has no reason to believe the page — or TechGrit — understands their industry, and will not keep reading.

**Independent Test**: Can be fully tested by loading the page and verifying the industry-specific hero positioning, supporting proof stats, the integrations strip, and the list of industry challenges are all present, readable, and correctly ordered — independent of any other section existing.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Construction page, **When** the page loads, **Then** they see an industry-labeled introduction ("Industries · Construction"), a headline stating TechGrit's construction-tech positioning, a supporting description, a primary action to talk to an expert, and a secondary action to jump to the solutions section.
2. **Given** a visitor views the opening section, **When** they look at the supporting visual, **Then** they see proof-point figures illustrating delivery speed, field-hours saved, and safety monitoring coverage.
3. **Given** a visitor scrolls past the introduction, **When** they reach the following sections, **Then** they see a strip naming the industry tools TechGrit integrates with, followed by a list of named construction-industry challenges, each with a short label.

---

### User Story 2 - Explore the AI solutions and how they connect across a project (Priority: P1)

A visitor who recognizes their industry's problems wants to see exactly what TechGrit builds to solve them, and how those individual solutions relate to one another across the life of a construction project, so they can judge whether TechGrit's offering is comprehensive enough for their needs.

**Why this priority**: This is the core offering content of the page — it converts "they understand our problems" into "they have a real solution," and is essential to the page delivering its primary value.

**Independent Test**: Can be fully tested by scrolling to this part of the page and verifying the list of named AI solutions and the lifecycle-connection diagram are both present and correctly described, independent of the advantage or impact sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the solutions section, **When** they view it, **Then** they see a list of named AI solution offerings, each with a title and a short description of what it does.
2. **Given** a visitor reaches the "how it fits together" section, **When** they view it, **Then** they see a single central engine connected to each of the named workflow areas it covers, illustrating one unified AI layer across the project lifecycle.
3. **Given** a visitor views the lifecycle diagram on a narrow screen, **When** the connector-diagram layout would no longer be legible, **Then** they instead see the same set of workflow areas presented as a simple stacked/grid list.

---

### User Story 3 - Evaluate credibility and take action (Priority: P2)

A visitor who is interested in TechGrit's construction solutions wants evidence that TechGrit can be trusted to deliver — through its stated advantages and real proof points from past work — and wants a clear, low-friction way to start a conversation once convinced.

**Why this priority**: This content converts interest into intent to contact. It matters less than the core problem/solution narrative (Stories 1–2) but is the key evidence and conversion point that closes the page.

**Independent Test**: Can be fully tested by scrolling to this part of the page and verifying the list of stated advantages, the set of proof-point case study summaries, and the closing call-to-action are all present and actionable, independent of earlier sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the advantage section, **When** they view it, **Then** they see a numbered list of reasons to choose TechGrit, each with a title and short description.
2. **Given** a visitor reaches the impact section, **When** they view it, **Then** they see a set of case-study summaries, each showing a headline proof metric, a title, and a short description.
3. **Given** a visitor reaches the end of the page, **When** they view the closing section, **Then** they see a clear invitation to talk to a construction-tech expert, with at least one primary action to schedule time and one alternative action to reach the team by email.

---

### User Story 4 - Read the page comfortably on any device (Priority: P1)

A visitor opens the Construction page on a phone, a tablet, or a desktop/laptop browser. Regardless of device, they need every section's text, imagery, and calls-to-action to be fully visible, correctly arranged, and easy to interact with — no overlapping content, no horizontal scrolling, no oversized or clipped elements.

**Why this priority**: A majority of first-time visits to a marketing/industry page happen on mobile or tablet devices. If the page is not usable at those widths, the core value proposition (Stories 1–2) never reaches a large share of visitors, regardless of how good the content is.

**Independent Test**: Can be fully tested by loading the Construction page at common mobile (~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths and verifying every section remains readable, correctly laid out, and fully interactive at each size, independent of network speed or content values.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a mobile-width screen, **When** the page renders, **Then** multi-column sections (hero, challenges, solutions, advantage, impact) collapse into a single readable column (or a reduced column count) with no overlapping text, no clipped content, and no horizontal scrolling, and the lifecycle diagram falls back to its stacked list presentation.
2. **Given** a visitor opens the page on a tablet-width screen, **When** the page renders, **Then** sections use an intermediate layout appropriate to the available width (e.g., two columns where desktop shows three or five), remaining fully readable and correctly spaced.
3. **Given** a visitor opens the page on a desktop-width screen, **When** the page renders, **Then** all sections use their full multi-column layout as designed, with content centered and constrained to a readable maximum width, and the connector-line lifecycle diagram is shown.
4. **Given** a visitor rotates a tablet or resizes a browser window between breakpoints, **When** the width changes, **Then** the layout adapts smoothly without content becoming unreadable or controls becoming unreachable at any point in between.

---

### Edge Cases

- What happens when the hero visual has not yet been supplied? The section MUST still render with a clear placeholder in place of the missing image, without breaking the surrounding layout.
- How does the page behave on narrow (mobile) screens? All sections MUST reflow into a single-column, readable layout rather than clipping, overlapping, or requiring horizontal scrolling.
- How does the page behave on tablet-width screens between the mobile and desktop breakpoints? Sections MUST use an intermediate layout (not simply the desktop layout shrunk or the mobile layout stretched) so spacing and column counts remain appropriate to the available width.
- How does the page behave if entrance/reveal animations fail to run or are disabled (e.g., reduced-motion preference, slow device)? All content MUST still become fully visible and readable, not remain hidden or stuck mid-transition.
- What happens to the lifecycle-connection diagram at widths where the connector-line layout would overlap or become illegible? The page MUST switch to the simplified stacked/grid presentation of the same workflow areas instead of rendering an unreadable diagram.
- What happens when a visitor navigates directly to the in-page solutions anchor via a shared link? The page MUST scroll to and display that section correctly on initial load.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST present an introductory hero section identifying the page as construction-industry content, stating TechGrit's construction-tech positioning, a short supporting description, a primary call-to-action to talk to a construction tech expert, and a secondary action that leads to the solutions section.
- **FR-002**: The hero section MUST display a supporting visual alongside a small set of proof-point figures (e.g., time-to-MVP, field hours saved, safety monitoring coverage).
- **FR-003**: The page MUST present a strip naming the third-party industry tools/platforms TechGrit integrates with.
- **FR-004**: The page MUST present a section listing the construction industry's key challenges, each identified with a short label.
- **FR-005**: The page MUST present a section listing TechGrit's AI solution offerings for construction, each with a title and a short description.
- **FR-006**: The page MUST present a section illustrating how TechGrit's solutions connect as one unified layer across the project lifecycle, naming each connected workflow area.
- **FR-007**: The page MUST present a section listing TechGrit's stated competitive advantages for this industry, each with an order, a title, and a short description.
- **FR-008**: The page MUST present a section summarizing proven impact through a set of case-study entries, each with a headline metric, a title, and a short description.
- **FR-009**: The page MUST end with a closing call-to-action section inviting the visitor to talk to a construction tech expert, offering both a scheduling action and an email action.
- **FR-010**: Each distinct content section of the page (hero, integrations strip, industry challenges, solutions, lifecycle diagram, advantage, impact/case studies, closing call-to-action) MUST be built as an independent, self-contained content block that can be developed, reviewed, and reordered without requiring changes to other sections. The page's scope is limited to these 8 content sections; the shared site header/navigation and footer are being developed separately by another team member and are explicitly out of scope for this feature.
- **FR-011**: The page MUST remain fully readable, correctly laid out, and navigable across common desktop, tablet, and mobile screen widths, with each multi-column section adapting its column count to the available width rather than using one fixed layout for all devices.
- **FR-012**: The lifecycle diagram section MUST provide a simplified, non-diagram fallback presentation of the same workflow areas for widths where the connector-line diagram would not remain legible.
- **FR-013**: Any section that depends on a photographic image (the hero visual) MUST show a descriptive placeholder when the image is unavailable, rather than a broken or empty layout.
- **FR-014**: All calls-to-action on the page (talk to an expert, jump to solutions, schedule time, email the team) MUST be reachable and usable from every section of the page without requiring a page reload.
- **FR-015**: The content for each section MUST be sourced from a structured content response — an ordered list of typed section entries, one per section — rather than hard-coded page markup, so content can be updated without a code change.

### Key Entities

- **Industry Challenge**: A single named pain point facing the construction industry; represented by a short label.
- **Integration Partner**: A single named third-party tool/platform TechGrit integrates with; represented by its name.
- **Solution Offering**: A single AI solution TechGrit builds for construction; represented by a title and a short description.
- **Lifecycle Node**: A single workflow area connected to the central engine in the "how it fits together" diagram; represented by a name.
- **Advantage Point**: A single stated competitive advantage; represented by an order, a title, and a short description.
- **Case Study Summary**: A single proof-of-impact entry; represented by a headline metric, a label (e.g., "Case Study 01"), a title, and a short description.
- **Page Section Entry**: A single entry in the page's content response representing one section of the page; identified by a section type and its position in the ordered list, and containing the fields specific to that section type (titles, descriptions, images, lists of challenges/solutions/nodes/advantages/case studies, and call-to-action labels/links).

## Assumptions

- Page content is delivered through a content API that returns the Construction page as a single record containing page metadata (SEO title/description) and an ordered `sections` list, where each entry is typed (identifies which section it represents) and carries only the fields relevant to that section — mirroring the approach used for the About Us page.
- For this feature, a dummy/mock version of this content response (an in-repo typed data module) is used as the reference data shape and sample content, populated with the copy and figures shown in the `TechGrit Construction.dc.html` reference; wiring to a live content API is out of scope for this spec and will be addressed during planning/implementation.
- The lifecycle-connection diagram is treated as a presentational component driven by the list of Lifecycle Node entries, rather than as a separate image asset.
- The "schedule time" call-to-action and the "email the team" call-to-action link targets are provided as configurable data (link + label), matching the pattern already used for calls-to-action on the About Us page, so they can be updated without a code change. The scheduling action uses a placeholder link for now rather than a live external booking URL; wiring the real scheduling destination is out of scope for this spec.
- The site-wide header/navigation and footer are being developed separately by another team member as part of different work. This feature's page component covers only the 8 main content sections and may render standalone (without a shared layout wrapper) until that separate work is integrated.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time construction-industry visitor can identify that the page speaks to their industry and what TechGrit offers within the first screen of the page, without scrolling.
- **SC-002**: All eight defined content sections (hero, integrations strip, industry challenges, solutions, lifecycle diagram, advantage, impact/case studies, closing call-to-action) render correctly and legibly at desktop, tablet, and mobile widths, with no horizontal scrolling, overlapping content, or clipped text at any of the three.
- **SC-003**: Every call-to-action on the page (talk to an expert, jump to solutions, schedule time, email the team) can be located and activated by a visitor within a single interaction from anywhere on the page.
- **SC-004**: The page remains fully readable — no missing, broken, or blocked content — even when the hero image has not yet been supplied, entrance animations do not run, or the viewport is too narrow for the lifecycle connector diagram.
- **SC-005**: A visitor can locate and read all five industry challenges, all six solution offerings, and all four advantage points without needing to leave the page.
