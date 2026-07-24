
# Feature Specification: Construction Industry Page

**Feature Branch**: `TMS-67`
**Created**: 2026-07-14
**Last Updated**: 2026-07-23
**Status**: Draft
**Input**: User description: "Build the TechGrit Construction industry page using TechGrit Construction.dc.html as the exact visual reference. Implement each section of the page as its own separate reusable component. The page must be fully responsive across desktop, tablet, and mobile breakpoints. Populate the page content through a typed in-repo dummy data module rather than hardcoding content inline, following the same implementation approach used for the About Us page."

**2026-07-23 refinement**: Re-specified for strict UI/visual fidelity against `raw-files/TechGrit Website V2/TechGrit Construction.dc.html` (also mirrored at the same relative path outside the repo). Scope, data approach, and header/footer exclusion are unchanged from the original spec above — this refinement adds section-by-section visual acceptance criteria (layout, spacing, sizing, typography, color, borders, shadows, radii, icons, alignment, responsive behavior) so the existing implementation (`app/construction/`) can be audited and corrected against the reference with nothing left to guesswork. Any value in the reference with no equivalent design token is called out as an assumption rather than guessed.

## Clarifications

### Session 2026-07-14

- Q: Is building a site-wide header/nav and footer in scope for this feature, or is this page scoped to just the 8 main content sections? → A: Out of scope — another team member is already building the shared header/footer; this feature covers only the 8 main content sections.
- Q: Should the closing CTA's scheduling action use the real external Calendly URL from the reference, or a placeholder link consistent with this feature's dummy-data phase? → A: Use a placeholder/dummy link for now; the real scheduling link will be wired in later.

### Session 2026-07-23

- Q: The reference HTML's desktop lifecycle diagram has 8 workflow nodes, but its own mobile/tablet fallback markup hardcodes only 6 of them (omitting "Scheduling" and "Cost Control") — should the implementation reproduce that 6-node fallback exactly, or show all 8 nodes when stacked? → A: Show all 8 nodes in the stacked/grid fallback. This is treated as an authoring gap in the reference prototype, not an intentional design decision — FR-006/FR-012 already require the fallback to present "the same set of workflow areas" as the diagram, and the current implementation already stacks all 8.
- Q: The reference's exact colors are inline hex/rgba values (e.g., `#0A1822`, `#E87722`, `#F59E0B`, `#fbbf24`, `#F7B733`) rather than this project's design tokens — should the spec mandate the literal hex values in code, or require mapping to existing/extended tokens? → A: Values below are the literal visual target (what must be seen on screen); implementation must express them via the existing `tokens.css` scale where an equivalent already exists, and add a new token (never a hardcoded literal) where it doesn't, per the project constitution's token-driven styling rule.
- Q: SC-006 requires "no perceptible difference" from the reference — how is that verified, given this repo has no test framework or visual-regression tooling? → A: Manual, checklist-driven side-by-side comparison (developer opens `TechGrit Construction.dc.html` and `/construction` together at desktop/tablet/mobile widths and confirms each FR-016–024 item against `quickstart.md`) — no new tooling introduced. This runs as a dedicated task in the Polish & Cross-Cutting Concerns phase during `/speckit.implement` (the same slot `tasks.md` already uses for its edge-case checks). Drift found there is fixed directly in the relevant `app/construction/_components/*.tsx` file (adding a `tokens.css`/`globals.css` token first if none exists yet) — the spec itself only changes if the review reveals the spec's stated value was wrong, not for routine code-vs-spec drift.
- Q: The reference's lifecycle diagram places its 8 nodes at specific asymmetric, corner-clustered positions with curved connector paths from a centered core — the current implementation instead uses a symmetric, evenly-spaced radial layout with straight lines and a single small circle (not the reference's two-ring pulsing core). Given SC-006, must the rebuild match the reference's literal geometry, or is a faithful-but-approximate arrangement acceptable? → A: Match the reference's literal node positions, connector-curve shapes, and two-ring pulsing core exactly — this is a real component rebuild, not a cosmetic/token-only pass. Implementers must read the exact coordinates/curves directly from `TechGrit Construction.dc.html`'s inline SVG and overlay-label positioning during planning/implementation rather than approximating a symmetric substitute.
- Q: A later merge from `dev` (TMS-68) added a shared `reusable-components/ambient-orbs.tsx`, now wired globally into `app/layout.tsx` for every page except `/case-studies`, so `/construction` inherits it automatically — but its second orb is blue (`--color-overlay-blue-soft`, matching the Homepage/global standard) where `TechGrit Construction.dc.html`'s own inline styles specify that orb as amber. Should Construction reuse the shared global orbs as-is, or opt out like `/case-studies` and keep its own page-local, reference-exact orb set? → A: Opt out of the shared `AmbientOrbs` component (same exclusion pattern as `/case-studies`) and keep FR-016's page-local, reference-exact orb set (amber second orb, `top:1100px`) — this feature's mandate is literal fidelity to `TechGrit Construction.dc.html` specifically (SC-006), and the shared component's blue variant is a Homepage-driven choice, not a Construction-page fact.
- Q (2026-07-23, follow-up): Should the hero's two CTAs be rendered via `components/ui/Badge.tsx` as literally requested? → A: No — `Badge` is a non-interactive `<span>` status/label pill with no `href`/click support; swapping to it would silently break both CTAs' navigation. Used `components/ui/Button.tsx` instead (`variant="primary"`/`"ghost"`, `size="hero"`), which already supports `href` via Next.js `Link` and matches the two CTA styles exactly.
- Q (2026-07-23, follow-up): A real hero photo now exists at `public/samples/ind-construction.png` (720×360) — should it be wired in now, superseding the original `image: null`/placeholder default? → A: Yes — this asset did not exist on 2026-07-14 when the spec's Assumptions were written (hence `image: null`); now that it does, FR-017/FR-013 are updated so the real image is the default render path, with the placeholder retained only as a defensive fallback for a future missing-asset case.

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

### UI Fidelity Requirements (Visual Reference Mapping)

The values below are extracted directly from `TechGrit Construction.dc.html` and are the literal visual target for each section — layout, spacing, sizing, typography, color, borders, shadows, radii, icons, and alignment must match at desktop (≥961px), tablet (561–960px), and mobile (≤560px) widths. These breakpoints correspond to this project's canonical `md`/`sm` breakpoints; the reference's own `1140px` breakpoint governs only nav collapse, which is out of scope (header/footer). Colors/spacing/radii/shadows must be expressed through existing or newly-added `tokens.css` entries, never hardcoded literals (Constitution Principle I).

- **FR-016 (Global page chrome)**: The page background MUST be the dark ink surface (`#0A1822`) with three fixed, decorative, blurred gradient orbs behind all content (top-right orange, ~560×560, `rgba(232,119,34,0.16)`, blur 120px; mid-left **amber**, ~520×520, `rgba(245,158,11,0.10)`, blur 130px, positioned at `top:1100px`; bottom-center amber, ~600×600, `rgba(245,158,11,0.08)`, blur 140px), each with a slow ambient float animation. These orbs are page-level content owned by this feature. Since the shared, globally-wired `reusable-components/ambient-orbs.tsx` (mounted in `app/layout.tsx` for every page) renders a different, blue-toned second orb, the Construction page MUST opt out of that shared component (the same exclusion pattern already used for `/case-studies`) and render this page-local, reference-exact orb set instead — see Clarifications 2026-07-23.
- **FR-017 (Hero)**: Two-column layout (~1.05fr/0.95fr, 64px gap) collapsing to a single column below `md` with the visual reordered above the text. Left column: a pill badge (dot + "Industries · Construction" label, amber-tinted background/border, fully-rounded), a 54px/1.04-line-height headline (shrinking to ~44px below `md`) with the phrase "smarter, faster, safer" rendered in the brand orange→amber gradient as text, an 18px supporting paragraph capped at ~560px width, and a primary gradient CTA ("Talk to a Construction Tech Expert") plus a secondary bordered/ghost CTA ("See Solutions") that jumps to the solutions section — both CTAs MUST render via the shared `components/ui/Button.tsx` component (`variant="primary"`/`variant="ghost"`), not page-local markup, matching the reusability convention established for other shared primitives on this page (**updated 2026-07-23**: replaces the originally-shipped raw `<a className="btn ...">` markup — see Clarifications 2026-07-23). Right column: a rounded (~22px), bordered, shadowed image card — using the real photographic asset at `public/samples/ind-construction.png` (720×360; **updated 2026-07-23**, this asset did not exist when the spec/Assumptions were first written — see Clarifications 2026-07-23), 360px tall, cover-fit, bottom gradient scrim — overlaid with 3 equal-width proof-stat chips ("<30d to first MVP", "1000s field hours saved", "24/7 safety monitoring"), each a small blurred glass panel with a bold amber stat value and a muted label. Entrance content reveals with a staggered fade/rise-up sequence. FR-013's placeholder-when-missing behavior remains in place as a defensive fallback (e.g., if the asset is ever removed), it is just no longer the default rendering path.
- **FR-018 (Integrations strip)**: A single top/bottom-bordered bar with a muted uppercase label ("Integrates with the tools you run on") on the left and the 5 partner names (Procore, Autodesk, Bluebeam, Newforma, Oracle Primavera) on the right, rendered as bold display-font wordmarks (not logo images), wrapping to a centered stack with tighter gap on narrow screens.
- **FR-019 (Challenges)**: An eyebrow (short dash + "The challenge" label in orange) above a headline ("The construction industry is facing digital pressure.") and supporting paragraph, both capped at ~760px width, followed by a 5-column icon-card grid (collapsing to 2 columns below `md`, 1 column below `sm`). Each card is a subtly-tinted bordered panel with a small rounded icon tile (orange-tinted background, amber stroke icon) above a bold short label; the 5 labels and their icons are, in order: a document icon for "Manual submittal & RFI workflows", a trending-line/dollar icon for "Cost overruns & schedule delays", a people icon for "Fragmented field-to-office comms", an alert-triangle icon for "Safety, compliance & reporting risk", and an eye icon for "No real-time project visibility".
- **FR-020 (Solutions)**: An eyebrow (dash + "What we build" label in amber) above a headline ("AI solutions that transform construction workflows."), followed by a 3-column card grid (collapsing to 2 columns below `md`, 1 column below `sm`) of the 6 solution offerings, each card a bordered/blurred panel with a larger rounded gradient icon tile, a bold title, and a muted description, with a lift + amber-border hover effect. Titles in order: "AI-Driven Submittal & RFI Management", "Predictive Project Analytics", "Field-to-Office Integration", "Safety & Compliance Monitoring", "Construction ERP Enhancements", "Digital Twin & BIM AI Tools" — each with its own distinct icon matching the reference (checklist, forecast/trend-line, mobile device, shield-check, stacked-database, layered-cube respectively).
- **FR-021 (Lifecycle diagram)**: A large rounded, bordered panel with a soft ambient glow, containing a centered eyebrow ("How it fits together") and headline ("One AI layer, across the entire project lifecycle."). At `md` and above (**corrected 2026-07-23 per `/speckit.analyze` finding F1** — the reference's own CSS swaps this diagram at `max-width:960px`, i.e. this project's `md` breakpoint, not `lg`/1140px as earlier drafts of this requirement and the current implementation incorrectly used): a centered, two-ring "OrbitAI / Engine" core (an outer translucent amber ring plus an inner solid-gradient circle with a slow pulse animation) connected by 8 animated dashed *curved* lines to 8 surrounding node pills, clustered in asymmetric pairs toward the panel's four corners (not evenly spaced around a circle) — each pill a small blurred dark card with a bold centered label: "Submittals & RFIs", "Predictive Analytics", "Field & Office", "Safety & Compliance", "ERP Sync", "BIM & Digital Twin", "Scheduling", "Cost Control". The node positions, connector-curve shapes, and dual-ring core MUST match the reference's literal geometry (read directly from its inline SVG/overlay markup during implementation), not an approximate symmetric substitute (see Clarifications 2026-07-23). Below `md`: the connector diagram is replaced by a simple 2-column grid of the same 8 node pills (see Clarifications 2026-07-23 re: node count).
- **FR-022 (Advantage)**: An asymmetric two-column layout (~0.8fr/1.2fr, collapsing to one column below `md`): left side carries an eyebrow (dash + "Why TechGrit" label in orange), a headline ("The TechGrit advantage."), and a supporting paragraph; right side is a top-bordered list of the 4 advantage points, each row a bold amber two-digit index ("01"–"04") beside a bold title and a muted description, rows separated by hairline borders. Titles in order: "AI-First Engineering", "Domain Expertise", "Integration Ready", "Scalable Teams".
- **FR-023 (Impact / case studies)**: An eyebrow (dash + "Proven impact" label in amber) above a headline ("Proven impact in construction tech."), followed by a 3-column card grid (collapsing to 1 column below `md` — no intermediate 2-column step, per the reference) of 3 clickable case-study cards, each a bordered/blurred panel with a large bold amber metric ("<30 days", "1000s hrs", "Virtual bid"), a muted uppercase "Case Study 0X" label, a bold title, a muted description, and an amber "Read case study →" link affordance, with the same lift + amber-border hover effect as the solutions cards.
- **FR-024 (Final CTA)**: A centered, rounded, bordered/blurred panel with a bottom-anchored soft amber glow, containing an amber uppercase label ("Build on time, on budget"), a large headline ("Talk to a construction tech expert."), a supporting paragraph capped at ~600px, and two centered CTAs: a primary gradient button labeled "Book on Calendly →" (using the feature's placeholder scheduling link per the 2026-07-14 clarification, not the literal Calendly URL) and a secondary bordered/ghost button labeled "Email the team" (`mailto:` link with a prefilled subject).

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
- The reference's integration-strip partner names (Procore, Autodesk, Bluebeam, Newforma, Oracle Primavera) are styled text wordmarks in the source HTML, not logo image assets — this feature reproduces them the same way (styled text) rather than sourcing/fabricating partner logo images.
- Every literal color, spacing, radius, shadow, and typography value called out in the UI Fidelity Requirements is the visual target, not a mandate to hardcode; where `tokens.css` already has an equivalent value it must be reused via its existing token, and where it doesn't a new token must be added in its appropriate numbered section (per Constitution Principle I) before use — this spec does not prescribe exact token names.
- The lifecycle diagram's mobile/tablet stacked fallback shows all 8 workflow-node labels (matching the desktop diagram), not the 6 the reference HTML's own fallback markup happens to hardcode — see Clarifications 2026-07-23.
- This refinement does not change any functional/data-layer assumption from the 2026-07-14 spec: content remains a typed, in-repo dummy data module; the scheduling CTA remains a placeholder link; no backend or live content API is introduced.
- The shared `reusable-components/ambient-orbs.tsx` component already implements a path-based exclusion for `/case-studies` (via `usePathname()`); the Construction page's opt-out (FR-016) is expected to extend that same exclusion mechanism to `/construction` rather than introducing a different pattern, keeping the shared component's exclusion logic in one place.
- The construction components already key every `.map()`-rendered list (challenges, solutions, lifecycle nodes) on each entry's numeric `order` field, not display text — already compliant with Constitution v1.6.0's "stable identity for repeated content" rule added by a later `dev` merge; no spec or code change needed for this.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time construction-industry visitor can identify that the page speaks to their industry and what TechGrit offers within the first screen of the page, without scrolling.
- **SC-002**: All eight defined content sections (hero, integrations strip, industry challenges, solutions, lifecycle diagram, advantage, impact/case studies, closing call-to-action) render correctly and legibly at desktop, tablet, and mobile widths, with no horizontal scrolling, overlapping content, or clipped text at any of the three.
- **SC-003**: Every call-to-action on the page (talk to an expert, jump to solutions, schedule time, email the team) can be located and activated by a visitor within a single interaction from anywhere on the page.
- **SC-004**: The page remains fully readable — no missing, broken, or blocked content — even when the hero image has not yet been supplied, entrance animations do not run, or the viewport is too narrow for the lifecycle connector diagram.
- **SC-005**: A visitor can locate and read all five industry challenges, all six solution offerings, and all four advantage points without needing to leave the page.
- **SC-006**: Placed side-by-side with `TechGrit Construction.dc.html`, each of the 8 sections shows no perceptible difference in layout, spacing, sizing, typography, color, borders, shadows, radii, icons, or alignment at desktop, tablet, and mobile widths — verified manually via a `quickstart.md` checklist walkthrough (see Clarifications 2026-07-23), not automated tooling.
