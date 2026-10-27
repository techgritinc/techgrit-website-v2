# Feature Specification: Healthcare Industry Page

**Feature Branch**: `TMS-67-healthcare` (git branch: `feature/TMS-67-build-industries-health-care-page`)
**Created**: 2026-08-25
**Last Updated**: 2026-08-25
**Status**: Draft
**Input**: User description: "Implement the TechGrit Health Care webpage in the existing Next.js application using the reference Construction page from the existing application and existing project architecture. Use `TechGrit Construction.dc.html` as the single visual and structural reference. Place the page inside the existing Industries folder structure, following the exact file/folder architecture already established for the Construction page. Reuse existing `components/ui` primitives before creating anything new. Hero section: left side keeps badge, title, description, and CTA button(s) with no breadcrumb; right side is a fixed-size picture placeholder (does not grow) with no statistics overlay. Do not implement the integrations strip. Do not implement the lifecycle diagram. The closing CTA section must follow the same shared CTA treatment already used by the Industries/Construction page."

**2026-08-25 refinement**: The requester supplied the real CMS content payload for this page (`GET /api/pages/by-slug/healthcare`) plus an explicit section-by-section mapping of which existing page's visual pattern each Healthcare section should reuse. This refinement replaces the earlier generic "challenge/solutions/advantage/impact" placeholder structure with the actual eight sections the CMS returns, each tied to a specific existing visual reference.

## Clarifications

### Session 2026-08-25

- Q: This ticket key (`TMS-67`) is already used by the existing `specs/TMS-67` directory (Construction Industry Page). Should this feature reuse that directory, or get its own? → A: A separate directory, `specs/TMS-67-healthcare`, to avoid overwriting the Construction spec — same disambiguation pattern already used elsewhere in this repo (e.g. `TMS-65-leadership-advisory`, `TMS-85-tokens-v2-migration`).
- Q: The reference prototype (`TechGrit Construction.dc.html`) is construction-specific — should Healthcare literally reuse its section set (integrations strip, lifecycle diagram, hero stat chips), or a trimmed set? → A: Trimmed, per explicit instruction: no integrations strip, no lifecycle diagram, and no hero stat chips/statistics overlay.
- Q: Does the hero's right-side visual need to support a real photo now, or a placeholder only? → A: Follow the Construction page's own precedent — a real image is the default render path inside a fixed-height frame, with a placeholder state retained only as a defensive fallback for a missing asset, exactly as Construction already does.

### Session 2026-08-25 (content-mapping refinement)

- Q: What is the page's actual content source and section list? → A: A CMS endpoint (`GET /api/pages/by-slug/healthcare`) returning 8 ordered sections: Hero, "What We Build", "AI Across the Healthcare Product Lifecycle", "Our HealthTech Engineering Services", "HealthTech Solutions We Support", "Featured Capabilities", "Connected Healthcare Systems That Work Together", and a closing CTA banner. This CMS section list — not a generic challenge/solutions/advantage/impact placeholder — is the page's real structure.
- Q: Confirmed again — is the integrations strip needed? → A: No, confirmed excluded.
- Q: Which existing page's section pattern should "What We Build" (8 cards: icon + title + description) reuse? → A: The Construction page's challenge/pain-points section pattern (icon-topped card grid) — extended to also render each card's description line, since the CMS content supplies one and the Construction challenge cards' icon+title grid shape is otherwise the intended visual reference.
- Q: Which pattern should "AI Across the Healthcare Product Lifecycle" (6 cards) reuse? → A: The Construction page's "What We Build"/solutions section pattern (3-column card grid). The lifecycle-diagram (SVG node/connector) component from Construction is explicitly NOT used for this or any section. (The icon-vs-step-label choice for this grid was refined in the session below.)
- Q: Which pattern should "Our HealthTech Engineering Services" (7 steps) reuse? → A: The Construction page's advantage section row layout — an exact shape match. (The step-label-vs-icon choice for these rows was refined in the session below.)
- Q: Which pattern should "HealthTech Solutions We Support" (17 plain-title items, no icon, no description) reuse? → A: The About/Leadership-Advisory page's "Why It Matters" section pattern (eyebrow + centered heading/description + tile grid) — adapted to a denser, title-only tile. (Exact responsive column counts were refined in the session below.)
- Q: Which pattern should "Featured Capabilities" (2 cards: title + description, no icon, no metric) reuse? → A: The Construction page's "Proven Impact" card pattern (`GlassCard` layout) — with the large metric number and "Read case study" link omitted, since the CMS content for this section supplies neither.
- Q: Does "Connected Healthcare Systems That Work Together" (eyebrow/title/subtitle + N named categories, each holding an array of feature titles) match any existing section pattern? → A: No existing pattern fits this shape, so it needs a new, purpose-built section. (Its exact single-card-vs-multi-card form was refined in the session below.)
- Q: How should the closing CTA section behave? → A: Exactly as the Construction page's closing CTA — same shared component, same visual treatment, populated with this page's own CMS-supplied heading/description/primary-CTA text.

### Session 2026-08-25 (visual-pattern refinement)

- Q: "AI Across the Healthcare Product Lifecycle" (6 cards) — icon-topped cards as originally mapped, or something else? → A: Use numbered step labels (`1`–`6`) instead of icons — the CMS-supplied icons for this section are not used.
- Q: "Our HealthTech Engineering Services" (7 steps) — keep the numbered-step (`01`–`07`) treatment as originally mapped, or something else? → A: Use icons instead of numbered steps. Since the CMS payload's `icon` field is `null` for all 7 items, an icon set for this section must be sourced/assigned during implementation rather than read from the CMS.
- Q: "HealthTech Solutions We Support" (17 plain-title items) — what exact layout? → A: Eyebrow, title, subtitle, then the 17 items as title-only tiles (no icon, no description) in a responsive grid: 3 columns on desktop and above, 2 columns on tablet, a single stacked column on mobile.
- Q: "Connected Healthcare Systems That Work Together" — a grid of N category cards (one per category), or something else? → A: A single card containing a bulleted list, where each bullet is one category and each category's array of feature titles renders under its bullet.

### Session 2026-08-25 (no-fallback correction)

- Q: "Our HealthTech Engineering Services" previously required sourcing/assigning an icon during implementation, since the CMS supplied none. Is that still the right approach? → A: No — the requester updated the CMS to attach real icons to most of this section's 7 steps, and explicitly ruled out any fallback/placeholder logic in the code going forward. The section now simply renders whichever icon the CMS supplies per step, with no icon slot for any step the CMS leaves without one (one step still has no icon as of the latest payload) — identical treatment to every other icon-bearing section, with no special-cased fallback.
- Q: Is the captured CMS payload kept as a contracts file in this feature's spec directory? → A: No — the requester asked that no contract file be kept; the CMS endpoint itself is the live source of truth, and this spec's Clarifications sections already capture the structural decisions that mattered.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Evaluate TechGrit's healthcare offering (Priority: P1)

A healthcare technology decision-maker (hospital IT director, digital health startup founder, health-system innovation lead) lands on the Healthcare industry page — from the Industries mega-menu, a search result, or a shared link — to quickly understand whether TechGrit builds the kind of software their organization needs, and how to start a conversation.

**Why this priority**: This is the entire purpose of the page. Every other behavior (responsive layout, visual fidelity, section content) exists in service of this one evaluation-and-conversion journey. Without it, the page delivers no value.

**Independent Test**: Load `/industries/healthcare` on desktop, tablet, and mobile widths and confirm a visitor can read a clear healthcare-specific value proposition in the hero, scroll through all eight sections without any broken or missing content, and reach a working "talk to us" call-to-action at the bottom of the page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives at the Healthcare page, **When** the hero section renders, **Then** they see a "HealthTech" eyebrow badge, a headline with "HealthTech Companies" highlighted, a supporting description, exactly one primary CTA button ("Talk to Our Engineering Team"), and a fixed-size picture area on the right that does not resize based on content — with no breadcrumb trail and no statistics/metrics overlay anywhere in the hero.
2. **Given** a visitor scrolls past the hero, **When** they reach the "What We Build" section, **Then** they see 8 healthcare-specific cards (Electronic Health Records, Virtual Care & Telemedicine, Clinical Trials & Research Platforms, Revenue Cycle Management, Healthcare Document Management, Patient Engagement Platforms, Provider Operations & Practice Management, Healthcare Analytics Platforms), each with an icon, title, and description, in the Construction challenge section's card-grid structure.
3. **Given** a visitor continues scrolling, **When** they reach "AI Across the Healthcare Product Lifecycle", **Then** they see 6 healthcare-AI cards (Clinical AI Assistants, Intelligent Medical Document Processing, Revenue Cycle Intelligence, Fraud Detection & Claims Validation, Predictive Healthcare Analytics, Workflow Automation), each with a numbered step label (`1`–`6`), title, and description, in the Construction solutions section's 3-column grid.
4. **Given** a visitor reaches "Our HealthTech Engineering Services", **When** the section renders, **Then** they see 7 cards (Strategy & Design, Software Product Engineering, AI-Assisted Modernization, Platform Engineering, Data & AI Engineering, Quality Engineering, Managed Services) with title and description, in the Construction advantage section's row layout, each showing whichever icon the CMS supplies for that step (rendering with no icon slot for any step the CMS leaves without one).
5. **Given** a visitor reaches "HealthTech Solutions We Support", **When** the section renders, **Then** they see an eyebrow, a title, a subtitle, and all 17 solution names (EMR/EHR Platforms, Telemedicine Solutions, Virtual Care Management, Remote Patient Monitoring, Clinical Trial Platforms, Practice Management Systems, Revenue Cycle Management, Healthcare CRM, Healthcare Document Management, Medical Imaging Workflow Applications, Patient Portals, Care Coordination Platforms, Population Health Analytics, AI Clinical Assistants, Healthcare Fraud Detection, Healthcare Analytics & Reporting, Medical Device Connectivity) as title-only tiles (no icon, no description) in a grid that shows 3 columns on desktop and above, 2 columns on tablet, and a single stacked column on mobile.
6. **Given** a visitor reaches "Featured Capabilities", **When** the section renders, **Then** they see 2 cards (AI-Assisted Healthcare Modernization, Intelligent Healthcare Automation) with title and description, in the Construction "Proven Impact" card style, without a metric number or case-study link.
7. **Given** a visitor reaches "Connected Healthcare Systems That Work Together", **When** the section renders, **Then** they see an eyebrow, a title, a subtitle, and a single card containing a bulleted list of 7 categories (Electronic Health Records, Healthcare Standards, Practice Management & Revenue Cycle, Identity & Security, Cloud Platforms, Communication, Analytics), each bullet showing its category name followed by its own array of feature titles (e.g. Epic, Oracle Health (Cerner), athenahealth, eClinicalWorks, NextGen Healthcare under Electronic Health Records).
8. **Given** a visitor reaches the bottom of the page, **When** the closing CTA section renders, **Then** it uses the same shared CTA treatment as the Construction page's closing CTA, populated with this page's own heading ("Build the Future of Digital Healthcare"), description, and primary CTA ("Talk to Our Engineering Team").
9. **Given** the same visitor resizes their browser or opens the page on a phone, **When** the layout crosses the project's existing breakpoints, **Then** every section reflows the same way its referenced Construction/Leadership-Advisory section does at the same widths, with no arbitrary new breakpoints.

### Edge Cases

- What happens if the hero image asset is missing? The fixed-size picture area must still render at its intended dimensions (no collapse or layout shift) with a defensive placeholder rather than breaking the grid.
- What happens if a card's description text is unusually long, or a "HealthTech Solutions We Support" title is unusually long for its dense tile? Cards/tiles must wrap text rather than overflow.
- What happens when "Featured Capabilities" cards render without an icon (the CMS payload's `icon` field is `null` for both items)? The layout must not leave a broken image or misaligned gap — the icon slot is omitted cleanly, matching how the referenced Construction/CMS-driven components already handle a `null` icon.
- What happens for "Our HealthTech Engineering Services" when a step's CMS `icon` field is `null` (one step, as of the latest CMS content)? That card renders with no icon slot, cleanly — the code MUST NOT substitute a placeholder or assigned fallback icon.
- What happens if one "Connected Healthcare Systems" category bullet has a different number of feature titles than another? The single card must let each bullet's item list size to its own content without clipping or forcing equal-height bullets.
- What happens if a visitor tabs through the page with a keyboard? All interactive elements (hero CTA, closing CTA) must remain focusable and operable, consistent with existing site-wide keyboard behavior.
- What happens on the exact breakpoint boundaries (`lg`/`md`/`sm`)? The page must reflow at the same three canonical breakpoints already established site-wide, not new ones introduced for this page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST be reachable at a URL under the Industries section, following the same routing convention as the existing Construction page (e.g. `/industries/healthcare`).
- **FR-002**: The page MUST reuse the Industries/Construction page's established file-and-folder architecture (route-local components in a private `_components` folder, one component per section) rather than introducing a different pattern.
- **FR-003**: The page's content MUST be sourced from the CMS `by-slug/healthcare` page payload's ordered `sections` array, defensively rendering `null`/missing content the same way the Construction page does, rather than hardcoded copy.
- **FR-004**: The hero section MUST present, on its left side: an eyebrow badge, a headline with an optional highlighted phrase, a supporting description, and exactly one primary call-to-action button — with no breadcrumb trail.
- **FR-005**: The hero section's right side MUST present a picture area of fixed dimensions that does not grow or shrink based on content, and MUST NOT include any statistics/metrics overlay.
- **FR-006**: The page MUST NOT include an integrations-strip section.
- **FR-007**: The page MUST NOT include a lifecycle-diagram (SVG node/connector) section.
- **FR-008**: The page MUST include a "What We Build" section presenting its 8 CMS-supplied cards (icon, title, description) in the Construction challenge section's card-grid layout, extended to render each card's description.
- **FR-009**: The page MUST include an "AI Across the Healthcare Product Lifecycle" section presenting its 6 CMS-supplied cards (numbered step label `1`–`6`, title, description — the CMS-supplied icon for this section is not rendered) in the Construction solutions section's 3-column card-grid layout.
- **FR-010**: The page MUST include an "Our HealthTech Engineering Services" section presenting its 7 CMS-supplied steps (icon, title, description — no numbered step label) in the Construction advantage section's row layout; each card renders whichever icon the CMS supplies for that step, and MUST NOT substitute a fallback/placeholder icon for any step the CMS leaves without one.
- **FR-011**: The page MUST include a "HealthTech Solutions We Support" section presenting an eyebrow, a title, a subtitle, and its 17 CMS-supplied plain-title items (no icon, no description) as tiles in a grid that shows 3 columns on desktop and above, 2 columns on tablet, and 1 column on mobile — no existing component covers this dense, title-only tile shape, so a new component MUST be created for it.
- **FR-012**: The page MUST include a "Featured Capabilities" section presenting its 2 CMS-supplied cards (title, description) in the Construction "Proven Impact" card style, omitting the metric-number and case-study-link elements that section normally shows.
- **FR-013**: The page MUST include a new "Connected Healthcare Systems That Work Together" section (eyebrow, title, subtitle, and a single card containing a bulleted list of its named categories, each bullet's own array of feature titles rendered under it) — no existing component covers this shape, so a new reusable component MUST be created for it.
- **FR-014**: The page's closing call-to-action section MUST use the same shared CTA component already used by the Construction page's closing CTA, populated with this page's own CMS-supplied heading, description, and primary CTA label/link.
- **FR-015**: The page MUST be fully responsive across desktop, tablet, and mobile, reflowing at the project's existing canonical breakpoints (no new arbitrary breakpoints).
- **FR-016**: The page MUST reuse existing shared components (`components/ui/*`, the shared closing-CTA component, existing icon set) wherever they already cover a needed UI element, creating a new component only for the two shapes identified in FR-011 and FR-013.
- **FR-017**: The page MUST reuse existing design tokens (`app/tokens.css`, `app/globals.css`) for all colors, spacing, typography, radii, and shadows, adding a new token only when a CMS-driven value has no existing equivalent.
- **FR-018**: The initial render MUST NOT visibly flicker, shift layout, or show an intermediate incorrect state as the page hydrates.
- **FR-019**: No section's icon field MUST be assigned a substitute/placeholder icon when the CMS leaves it `null` — every card's icon renders only when the CMS supplies one, and is cleanly omitted otherwise. (This applies to icons specifically; it does not change the hero's existing defensive image placeholder, FR-005/Clarifications.)

### Key Entities

- **Healthcare Page Section**: A named, ordered section of the page as returned by the CMS (hero, "What We Build", "AI Across the Healthcare Product Lifecycle", "Our HealthTech Engineering Services", "HealthTech Solutions We Support", "Featured Capabilities", "Connected Healthcare Systems That Work Together", closing CTA), each with the content fields it needs to render.
- **Approach Step / Card**: A single item within "What We Build", "AI Across the Healthcare Product Lifecycle", "Our HealthTech Engineering Services", or "Featured Capabilities" — carries a title, an optional description, an optional step label, and an optional icon.
- **Solution Tile**: A single plain-title item within "HealthTech Solutions We Support" — carries only a title (no icon, no description).
- **System Category Bullet**: A single bullet within "Connected Healthcare Systems That Work Together"'s one card, named for its category (e.g. "Electronic Health Records"), holding an ordered array of feature titles (e.g. "Epic", "Oracle Health (Cerner)").

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify TechGrit's healthcare value proposition and locate a working call-to-action within the first screen of the page, without scrolling, on a standard desktop viewport.
- **SC-002**: The page renders with no visible layout shift or flash of incorrectly-sized content during initial load, on both desktop and mobile.
- **SC-003**: At the project's three canonical breakpoints, each section's layout matches the same reflow behavior already verified on its referenced source page (Construction or Leadership Advisory) — confirmed by side-by-side comparison at each breakpoint.
- **SC-004**: 100% of the page's visual styling (color, spacing, radius, typography) traces back to an existing or newly-added token — zero hardcoded hex/px/rgba literals duplicating an existing token.
- **SC-005**: The hero's picture area maintains its fixed footprint regardless of viewport width or content length (verified at desktop, tablet, and mobile widths).
- **SC-006**: All 8 CMS sections render their full content (every card/tile/category/chip present in the `by-slug/healthcare` payload) with no items silently dropped.

## Assumptions

- The CMS `by-slug/healthcare` payload (8 ordered sections) is the authoritative content and structure source for this page, superseding the earlier generic challenge/solutions/advantage/impact placeholder structure from the initial specification draft.
- The page follows the same CMS-content-shape pattern already used by the Construction page (typed section content resolved through `cms/api`, defensively rendering `null`/missing content), consistent with how every other Industries-family page in this repo is built.
- Where a CMS section's data shape doesn't perfectly match its referenced visual pattern (e.g. "What We Build" supplying descriptions where Construction's challenge cards normally show none; "Featured Capabilities" supplying no icon where that pattern normally shows one; "Our HealthTech Engineering Services" having one step with no icon while the rest have one), the component renders exactly the fields the CMS supplies and omits the rest, rather than inventing placeholder content — this applies uniformly across every section, with no exception.
- The "HealthTech Solutions We Support" section's adaptation of the Leadership Advisory "Why It Matters" tile (dropping the icon and description, and using its own 3/2/1-column responsive grid) is a new tile variant, not a change to the existing `LeadershipWhyItMatters` component's own behavior on its original page.
- The "Connected Healthcare Systems That Work Together" section's new single-card, bulleted-list component is scoped to this page's `_components` folder unless a second consumer emerges later, per the project's "nothing moves to `components/` until genuinely consumed by more than one route" convention.
- The shared closing-CTA component (`components/ui/final-cta`, already used by Construction) is reused as-is per the explicit instruction to follow "the same UI for industries/construction."
