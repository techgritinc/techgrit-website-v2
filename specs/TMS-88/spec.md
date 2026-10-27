# Feature Specification: Orbit AI Ecosystem Page (How We Work)

**Feature Branch**: `feature/TMS-88-how-we-work-orbit-ai-ecosystem-page`
**Created**: 2026-08-24
**Status**: Draft
**Input**: User description: "TMS-88 — Implement the TechGrit Orbit AI webpage in the existing Next.js application using the reference prototype `raw-files-v3/TechGrit Website V2.3/TechGrit Orbit AI.dc.html` as the single visual and structural reference. The page belongs under the 'How We Work' section, following the exact file/folder architecture already established for the `what-we-do/ai-modernization` page (CMS-backed data, Server Component page, route-local `_components`). Maximize reuse of `components/ui` primitives (Hero, ContentBlock, GlassCard, icon tiles, FAQ, FinalCta, etc.) before creating anything new. Tailwind only, reusing existing `tokens.css`/`globals.css` values — new tokens only when a value genuinely doesn't exist yet. Pixel-accurate fidelity to the reference for layout, spacing, typography, color, radius, icons, and responsive behavior at the project's existing breakpoints (lg=1140, md=960, sm=560), with no flicker/layout shift on load. The hero keeps the reference's left column (badge, title, description, CTA) but replaces the right-side stat-tile grid with an image. The 'From AI Opportunity to Business Impact' section is centered with title + description only, dropping the reference's right-side blocker-chip list. The capabilities section ('How OrbitAI Works') keeps the reference's 5 cards (category label, title, subtitle, feature list) verbatim. The lifecycle section ('One Integrated Path') keeps the reference's 5 step cards plus one additional simple label+description card not present in the reference. The 'Built for Real-World Engineering' section keeps the reference's 6 two-column icon tiles plus one additional full-width plain-text card not present in the reference. A new 4-card 'What OrbitAI Helps You Achieve' section and a new 4-card 'From Understanding to Working Software' section are added with icon+title+description cards, neither of which exists in the reference. The reference's actual 4-card 'Who we help' section and its 'Built for the real complexity of enterprise modernization' (Why) section are both implemented as-is from the reference. The closing CTA section follows the same pattern used on the `what-we-do/ai-modernization` page. Consider this ticket TMS-88."

## Clarifications

### Session 2026-08-24

- Q1: The lifecycle section ("One Integrated Path") needs one additional card beyond the reference's 5 numbered steps, with no reference content to draw from — what should it say and how should it be laid out? → A: A single full-width card (spanning below the 5-step grid, not part of it), unnumbered, with the label "One Integrated Path" and the description "Every stage connects directly into the next, with no handoff gaps between steps."
- Q2: The "Built for Real-World Engineering" section needs one additional full-width plain-text card beyond the reference's 6 tiles, with no reference content to draw from — what should it say? → A: An engineering-standards statement: label "Engineering Standards" with the description "Every engagement is held to the same standard: code you'd be proud to hand to your own team."
- Q3: The "From Understanding to Working Software" section does not exist anywhere in the reference prototype — what should it contain? → A: Draft it around the reference's own 4D Methodology stages (already named in the "How OrbitAI Works" section: Discover → Define → Design → Deliver), reframed as an "Understanding → Working Software" narrative — four icon+title+description cards, one per stage.
- Q4: The "What OrbitAI Helps You Achieve" section has no source content in the reference — what should its cards say? → A: Six title+description cards, supplied verbatim by the requester: "Identify High-Value AI Opportunities", "Understand What You Already Have", "Build a Modernization Roadmap", "Accelerate Engineering", "Modernize With Confidence", "Continuously Improve" (see FR-008 for full text).
- Q5: Which asset should fill the hero's right-side image (replacing the reference's four-tile stat grid)? → A: The existing, currently-unused `public/samples/dm-copilot.png`, confirmed final (not a placeholder).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the OrbitAI operating model end-to-end (Priority: P1)

A prospective client (an engineering leader or founder evaluating TechGrit's "How We Work" approach) lands on the Orbit AI page — from site navigation, a "How We Work" link, or a direct link — and reads the hero promise, the five OrbitAI framework layers, and the engagement lifecycle, to understand what OrbitAI is and how an engagement would actually run before deciding to reach out.

**Why this priority**: This is the core reason the page exists — it is TechGrit's primary explainer for its flagship "How We Work" framework. Without this flow, the page delivers no value regardless of what else is built.

**Independent Test**: Load the page standalone and verify a reader can, without leaving the page, understand what OrbitAI is (hero), why an integrated AI-modernization path matters ("From AI opportunity to business impact"), and see the five named framework layers with their category labels, titles, subtitles, and feature lists — this alone constitutes a usable, demonstrable page.

**Acceptance Scenarios**:

1. **Given** a visitor arrives on the page, **When** the hero section renders, **Then** they see the "Framework 01 · OrbitAI™" eyebrow badge, the headline "The AI-first operating model for modernization and transformation that works.", the supporting paragraph, the primary CTA ("Talk to an AI Engineering Expert") and secondary CTA ("See how it works"), and a right-side image in place of the reference's four-tile stat grid.
2. **Given** a visitor scrolls to the "From AI opportunity to business impact" section, **When** it renders, **Then** they see a single centered column containing the eyebrow, title, and description paragraph — with no right-side "Common blockers we remove" chip list rendered.
3. **Given** a visitor reaches the "How OrbitAI Works" (five-layer) section, **When** it renders, **Then** they see exactly five cards (AI IMPACT, TAMAF, 4D Methodology, PRISM, Foundation Frameworks), each showing its category label, title, subtitle, and feature bullet list, matching the reference verbatim.
4. **Given** a visitor reaches the "One Integrated Path" (lifecycle) section, **When** it renders, **Then** they see the reference's five ordered steps (Assess, Prioritize, Architect, Build, Optimize) each with number, title, and description, followed below the step grid by one additional full-width, unnumbered card labeled "One Integrated Path" with the description "Every stage connects directly into the next, with no handoff gaps between steps." (Clarification Q1).

---

### User Story 2 - Confirm engineering rigor and audience fit (Priority: P2)

A visitor who understands the framework at a high level next wants to confirm the approach holds up under real engineering complexity, see who the offering is designed for, and see the concrete benefits, before treating TechGrit as a serious modernization partner.

**Why this priority**: This section builds the credibility and relevance needed to convert an already-interested visitor, but the page remains functional without a reader reaching this far (P1 covers the core pitch).

**Independent Test**: With only the hero and lifecycle sections present, add the "Built for Real-World Engineering", "What OrbitAI Helps You Achieve", "From Understanding to Working Software", "Who we help", and "Why OrbitAI" sections and verify each renders independently with correct content, without depending on interactive state from earlier sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches "Built for Real-World Engineering", **When** it renders, **Then** they see the reference's six two-column icon tiles (One Connected Approach, AI-Assisted Human-Validated, Built for Brownfield, Flexible Entry Points, Designed for Continuous Value, Proven at Enterprise Scale) followed below the tile grid by one additional full-width plain-text card labeled "Engineering Standards" with the description "Every engagement is held to the same standard: code you'd be proud to hand to your own team." (Clarification Q2).
2. **Given** a visitor reaches "What OrbitAI Helps You Achieve", **When** it renders, **Then** they see six cards — Identify High-Value AI Opportunities, Understand What You Already Have, Build a Modernization Roadmap, Accelerate Engineering, Modernize With Confidence, Continuously Improve — each with a title and description, per Clarification Q4.
3. **Given** a visitor reaches "From Understanding to Working Software", **When** it renders, **Then** they see four cards — Discover, Define, Design, Deliver — each with an icon, title, and a description reframing that 4D Methodology stage as a step from "understanding" to "working software" (Clarification Q3).
4. **Given** a visitor reaches "Who we help", **When** it renders, **Then** they see the reference's four cards (Legacy-heavy enterprises, Cloud migration programs, AI-first transformations, Regulated industries), each with icon, title, and description.
5. **Given** a visitor reaches "Built for the real complexity of enterprise modernization" (Why OrbitAI), **When** it renders, **Then** they see the reference's six two-column tiles verbatim, exactly as specified in the reference with no additions.

---

### User Story 3 - Convert after review (Priority: P3)

A visitor who has reviewed the page's substance is ready to act on a CTA (talks to an AI engineering expert or books a discovery sprint).

**Why this priority**: This drives the conversion action, but is only reached by visitors who have already engaged with P1/P2 content.

**Independent Test**: Render just the closing CTA section and verify both CTA buttons point to their respective destinations.

**Acceptance Scenarios**:

1. **Given** the closing CTA band, **When** it renders, **Then** it follows the same structural pattern used on the `what-we-do/ai-modernization` page's closing CTA (heading, supporting paragraph, primary and secondary actions), showing this page's own heading ("From technology complexity to business value — with one integrated approach."), supporting paragraph, and both the primary ("Talk to an AI Engineering Expert") and secondary ("Book a Discovery Sprint") actions.

---

### Edge Cases

- What happens on narrow viewports (mobile) where the hero's two-column layout, the five-across capability/lifecycle grids, the two-column "Built for Real-World Engineering"/"Why OrbitAI" grids, the six-card "What OrbitAI Helps You Achieve" grid, and the four-across "who we help"/understanding-to-software grids cannot fit side by side? Each must collapse to a readable single- or two-column stack rather than overflowing horizontally or shrinking text below a legible size, following the project's existing breakpoint conventions (lg=1140, md=960, sm=560).
- What happens when a visitor navigates directly to `#capabilities` (the "See how it works" hero link) via a bookmarked or shared URL? The target section must be reachable and not obscured by the sticky site header (via the project's global `scroll-margin-top` rule).
- What happens to the reference's four hero stat callouts once the right-side content is replaced with an image? The card's size, position, border radius, and framing must remain visually equivalent to the reference even though its contents changed from data tiles to an image (mirroring the precedent set on `what-we-do/ai-modernization`).
- What happens to the "Common blockers we remove" chip list once the "From AI opportunity to business impact" section is centered without a right column? That content is dropped entirely per explicit instruction — it must not reappear elsewhere on the page (e.g., folded into the centered copy) unless a future ticket reintroduces it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST live at a new route under a "How We Work" segment (e.g. `app/how-we-work/orbit-ai-ecosystem/page.tsx` → `/how-we-work/orbit-ai-ecosystem`), built as a **static local content module** — a synchronous Server Component `page.tsx` that imports its content from a route-local `_data/orbit-ai-content.ts` file (typed by `_data/types.ts`) and exports `metadata` directly, mirroring `app/construction/`'s pattern rather than `what-we-do/ai-modernization`'s CMS-backed pattern. A real, populated CMS page already exists for this feature at slug `orbit-ai-ecosystem`; per explicit requester decision, this feature does NOT read from it — the CMS content is documented in Assumptions for future reference only, and all content in this spec is authoritative as written here.
- **FR-002**: All page copy taken directly from the reference — headings, eyebrows, paragraphs, card titles, bullet/feature lists, CTA labels, and link labels — MUST be reproduced exactly as written in the reference prototype, with no rewriting, rephrasing, reordering, or unrequested content changes, EXCEPT for the explicit deviations called out in FR-003 through FR-006 below.
- **FR-003**: The hero section's right-side area MUST display the existing `public/samples/dm-copilot.png` asset (Clarification Q5) in place of the reference's four-tile stat grid (Frameworks/Approach/Entry/Outcome), while the left column (eyebrow badge, headline, supporting paragraph, primary + secondary CTAs) MUST match the reference verbatim. The image must not distort its aspect ratio at any supported viewport width.
- **FR-004**: The "From AI opportunity to business impact" section MUST render as a single centered column containing only the eyebrow, title, and description paragraph, at the reference's own copy — the reference's right-side "Common blockers we remove" chip list MUST NOT be rendered.
- **FR-005**: The "How OrbitAI Works" section MUST render the reference's five framework-layer cards (AI IMPACT, TAMAF, 4D Methodology, PRISM, Foundation Frameworks) in order, each with its category label, title, subtitle, and feature bullet list, matching the reference verbatim.
- **FR-006**: The "One Integrated Path" (lifecycle) section MUST render the reference's five ordered step cards (Assess, Prioritize, Architect, Build, Optimize) verbatim, followed below the step grid by one additional full-width, unnumbered card with the label "One Integrated Path" and the description "Every stage connects directly into the next, with no handoff gaps between steps." (Clarification Q1).
- **FR-007**: The "Built for Real-World Engineering" section MUST render the reference's six two-column icon tiles (from the reference's "Why" section: One Connected Approach, AI-Assisted Human-Validated, Built for Brownfield, Flexible Entry Points, Designed for Continuous Value, Proven at Enterprise Scale) verbatim, followed below the tile grid by one additional full-width plain-text card with the label "Engineering Standards" and the description "Every engagement is held to the same standard: code you'd be proud to hand to your own team." (Clarification Q2).
- **FR-008**: A new "What OrbitAI Helps You Achieve" section MUST render exactly these six title+description cards, in this order, per Clarification Q4:
  1. "Identify High-Value AI Opportunities" — "Move beyond AI experimentation and focus investment on opportunities with measurable business impact."
  2. "Understand What You Already Have" — "Use AI-assisted analysis to uncover dependencies, business logic, risks, and modernization opportunities."
  3. "Build a Modernization Roadmap" — "Determine what to retain, refactor, replatform, replace, or retire."
  4. "Accelerate Engineering" — "Apply AI-assisted development, automation, testing, and delivery practices throughout the SDLC."
  5. "Modernize With Confidence" — "Make incremental, informed changes rather than relying on high-risk transformation programs."
  6. "Continuously Improve" — "Track outcomes, optimize the platform, and continue identifying opportunities for AI and modernization."
- **FR-009**: A new "From Understanding to Working Software" section MUST render four cards — Discover, Define, Design, Deliver — each with an icon, title, and a description reframing that 4D Methodology stage (already introduced in "How OrbitAI Works") as a step from understanding toward working software (Clarification Q3).
- **FR-010**: The reference's actual four-card "Who we help" section (Legacy-heavy enterprises, Cloud migration programs, AI-first transformations, Regulated industries) MUST be implemented as-is, verbatim, unchanged from the reference.
- **FR-011**: The reference's "Built for the real complexity of enterprise modernization" section (six two-column tiles: labeled "Why OrbitAI" in the reference) MUST be implemented as-is, verbatim, with no additions or omissions.
- **FR-012**: *(removed — FAQ section is out of scope for this page)*
- **FR-013**: *(removed — Related section is out of scope for this page)*
- **FR-014**: The closing CTA section MUST follow the same structural pattern (component and layout) used by the `what-we-do/ai-modernization` page's closing CTA band, populated with this page's own heading, paragraph, and two CTAs from the reference.
- **FR-015**: The page's visual presentation (typography scale, weight, line-height, letter-spacing, colors, gradients, spacing, card/section dimensions, border radii, shadows, and icons) MUST match the reference prototype at the reference's desktop width for every section not explicitly modified by FR-003/FR-004, with no visually approximated values where the reference specifies an exact one.
- **FR-016**: The page's layout MUST adapt responsively across desktop, laptop, tablet, and mobile widths using the project's existing breakpoints (`lg`=1140px, `md`=960px, `sm`=560px), following the reference's own responsive behavior (multi-column grids collapsing to fewer columns, then to a single column) rather than a uniform shrink of the desktop layout.
- **FR-017**: The implementation MUST maximize reuse of existing `components/ui/` primitives established for `what-we-do/ai-modernization` (`Hero`, `ContentBlock`, `GlassCard` variants, `IconTile`, `ProcessSteps`, `FinalCta`, `MediaSlot`) before introducing any new component; a new component is created only when no existing primitive can reasonably be adapted, without duplicating an existing component merely to tweak its styling.
- **FR-018**: The implementation MUST use Tailwind utility classes exclusively for page styling, reusing existing entries in `app/tokens.css` / `app/globals.css`; a new design token is added only when the reference requires a value that has no existing token, and is placed in `tokens.css`'s appropriate numbered section with a matching `@theme inline` mapping in `globals.css`.
- **FR-019**: The page MUST render via Server Components with no client-side data fetching, so that there is no visible layout shift, content jump, or intermediate incorrect UI between server render and hydration.
- **FR-020**: No functional requirement in this specification requires modifying any page, component, or configuration outside what is needed to build this new page and its genuinely reusable supporting pieces (mirroring the `what-we-do/ai-modernization` precedent of a minimal, scoped footer/nav pointer update if an existing "How We Work → Orbit AI" link needs repointing to this page's new route).

### Key Entities

- **Framework Layer**: One of the five items in "How OrbitAI Works" — has a category label/number (e.g. "01 · AI IMPACT"), a title, a subtitle, and a list of feature bullets.
- **Lifecycle Step**: One of the five ordered stages in "One Integrated Path" — has a sequence number, a title, and a description; the section also has one additional full-width, non-numbered "One Integrated Path" summary card (Clarification Q1).
- **Engineering Tile**: One of the six two-column tiles in "Built for Real-World Engineering" — has an icon, a title, and a description; the section also has one additional full-width "Engineering Standards" plain-text card (Clarification Q2).
- **Achievement Card**: One of the six cards in "What OrbitAI Helps You Achieve" — has a title and a description (Clarification Q4).
- **Understanding-to-Software Card**: One of the four cards in "From Understanding to Working Software" (Discover, Define, Design, Deliver) — has an icon, a title, and a description (Clarification Q3).
- **Audience Segment Card**: One of the four cards in "Who we help" — has an icon, a title, and a description.
- **Why-OrbitAI Tile**: One of the six two-column tiles in "Built for the real complexity of enterprise modernization" — has an icon, a title, and a description.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A person familiar with the reference prototype, shown the implemented page side by side with the reference at the same viewport width, cannot identify a visually noticeable difference in any section not explicitly modified by an approved deviation (hero image swap, centered opportunity/impact section, added cards).
- **SC-002**: All page text taken from the reference matches it at 100% fidelity — zero content substitutions, omissions, or additions when diffed against the reference's copy, outside the approved deviations.
- **SC-003**: The page remains fully readable and free of horizontal overflow or overlapping elements at desktop, laptop, tablet, and mobile widths.
- **SC-004**: A visitor can reach every card across the framework-layer, lifecycle, engineering, achievement, understanding-to-software, and audience-segment sections without encountering a broken or dead interaction.
- **SC-005**: No visible layout shift or flash of incorrect layout is observable on initial page load, verified by comparing server-rendered HTML output to the fully hydrated client render.

## Assumptions

- The feature directory for this ticket is `specs/TMS-88` (matching the existing `TMS-86`/`TMS-85`/`TMS-74` naming convention used for prior tickets on this project), and the git branch `feature/TMS-88-how-we-work-orbit-ai-ecosystem-page` already exists and is checked out — no new branch is created by this spec.
- The new route lives at `app/how-we-work/orbit-ai-ecosystem/page.tsx` → `/how-we-work/orbit-ai-ecosystem`, mirroring `app/what-we-do/ai-modernization/page.tsx` → `/what-we-do/ai-modernization`; this is the first page under a "How We Work" route segment, so no sibling pages currently exist there.
- The hero's replacement image is the existing, currently-unused `public/samples/dm-copilot.png` asset, confirmed final per Clarification Q5 — no new asset is sourced for this feature.
- "Pixel-perfect" is evaluated at the reference's authored desktop viewport; intermediate breakpoints follow the reference's documented responsive rules and this codebase's existing responsive conventions where the reference itself does not specify a rule.
- The reference's "Why" section (headed "Built for the real complexity of enterprise modernization.") is the section this ticket's own numbering calls out twice under different informal names ("Built for Real-World Engineering" for its 6-tile content, and again later as itself, "Built for the real complexity of enterprise modernization", to "follow the UI" as-is). Per FR-007/FR-011, this specification treats the reference's six-tile content as reused verbatim in "Built for Real-World Engineering" (with one added card resolved by Clarification Q2), and does not duplicate that same content again elsewhere on the page. FR-011's separate mention of the same reference section is treated as reinforcing "implement it as the reference shows" rather than requiring a second, distinct section — only one instance of this six-tile content appears on the page.
- The reference's "Who we help" section (headed "Built for teams with real complexity to solve.") is retained under its own reference heading, verbatim, per FR-010, and is distinct from "What OrbitAI Helps You Achieve" (FR-008), which is a separate, newly-invented section.
- "What OrbitAI Helps You Achieve" (FR-008) has no source content in the reference; its six cards' exact copy was supplied directly by the requester per Clarification Q4 and is treated as final, confirmed content — not a default.
- Destination links to sibling "How We Work" pages referenced by the page (Engagement Models, Discovery Sprints) point to their intended routes regardless of whether those pages have been built yet; this page's own build does not block on their existence.
- No dedicated "How We Work" route currently exists in the application; the only existing hardcoded pointer is the footer's "How We Work → Orbit AI Framework" link (`cms/api/footer.ts`), which currently points to `/frameworks#orbit-ai`. Repointing it to this page's new route, and checking the header's CMS fallback data for an equivalent entry, is treated as a minimal, in-scope config change per FR-020, mirroring the `what-we-do/ai-modernization` precedent.
- **CMS discovered, deliberately unused**: during planning, a live, fully-populated CMS page was found at `/api/pages/by-slug/orbit-ai-ecosystem` (same Strapi backend `ai-modernization` reads from), containing real copy for every section named in this spec — including different card counts and different copy than this spec's guessed/clarified content in several places (e.g. its "One Integrated Path" section is 5 framework-name chips + a "The result" card rather than 5 lifecycle steps; its "Built for Real-World Engineering" is a 7-chip challenges block rather than icon tiles; its "From Understanding to Working Software" uses Assess/Prioritize/Architect/Build/Rebuild/Optimize rather than Discover/Define/Design/Deliver; its closing CTA has different copy and only one button). Per explicit requester decision, this feature is built as a **static page with this spec's own content**, not wired to that CMS endpoint. This note exists so a future ticket that decides to switch this page to CMS-backed content (as `ai-modernization` did after its own initial static build) has a documented pointer to the existing endpoint rather than rediscovering it.
