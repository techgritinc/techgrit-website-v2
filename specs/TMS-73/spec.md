# Feature Specification: Webinar Series Page

**Feature Branch**: `TMS-73`
**Created**: 2026-07-27
**Status**: Draft
**Input**: User description: "Build the Webinar Series page using \"C:\techgrit\Techgrit website\TechGrit Website V2\TechGrit Webinar.dc.html\" as the source of truth: a two-column hero (badge, title, description, email form, action button on the left; a nine-cell collage of photos and icon tiles on the right), a Sessions grid (one upcoming/live session plus released sessions), and a Subscribe section (headline, description, email form). Reuse existing shared components, the design system, and project constitution; match the reference exactly (layout, spacing, sizing, typography, colors, borders, shadows, radii, images, icons, alignment, responsive behavior); document anything unclear as an assumption instead of guessing; reuse the project's Next.js tech stack; build section components in their own route-local folder, promoting any pattern useful elsewhere into components/ui/; do not touch the shared Header/Footer; also provide AI-assisted (Claude Code, spec-driven) time estimates for building this page."

## Clarifications

### Session 2026-07-27

- Q: Does submitting the hero form or the Subscribe section form persist the email anywhere (backend/CRM), or is it a client-side-only visual state transition? → A: Client-side only — email is validated and a success/error state is shown; no request is sent to any backend or CRM.
- Q: Is the upcoming session's date/time a single freeform authored string, or structured fields (date, time, timezone) composed for display? → A: Structured fields — date, time, and timezone are stored separately and composed for display.
- Q: Should a released session's card size (half/full) be a fixed per-session authored value, or should the grid auto-cycle a size pattern for however many sessions exist? → A: Fixed, per-session authored size — no auto-cycling pattern is implied.
- Q: For elements needing exact-color/pixel matches with no fitting existing Badge tone/GlassCard variant (hero eyebrow, session cards, subscribe panel), should the feature extend `Badge`/`GlassCard` with new tone/variant entries, or build bespoke one-off styled elements? → A: Extend shared components — add new Badge tone(s)/GlassCard variant(s) reproducing the reference's exact colors; reuse `Badge`/`Button`/`GlassCard` everywhere they structurally fit.
- Q: Should "Register Now" and "Watch Now" be implemented as actionable `<button>` elements, or as anchor/link elements styled to look like buttons (as the reference's own markup does for "Register Now")? → A: Actionable `<button>` elements for both — neither triggers a real page-to-page navigation (Register Now performs an in-page scroll; Watch Now has no destination per existing Assumptions), so neither should be an anchor tag with button styling.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Get oriented on arrival (Priority: P1)

A visitor lands on the Webinar page for the first time. Within the opening view, they need to
immediately understand this is TechGrit's ongoing webinar series, what it's about, and see a
low-effort way to stay informed, alongside a visual sense of the people behind the sessions.

**Why this priority**: This is the entry point of the whole page. Without a clear identity and
value promise, visitors have no reason to scroll into the Sessions grid or the Subscribe section.

**Independent Test**: Can be fully tested by loading the Webinar page and verifying a badge
labeling the page as the webinar series, a headline (with its accent phrase visually distinguished
from the rest of the headline), a supporting statement, an email capture form with a submit action,
and a nine-cell decorative visual collage are all present and readable, independent of the Sessions
grid or Subscribe section further down the page.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Webinar page, **When** the page loads, **Then** they see a badge
   identifying the page as the webinar series, a headline describing the page's purpose (with one
   phrase visually distinguished as an accent), a supporting sentence beneath it, and an email
   capture form with a submit action.
2. **Given** a visitor opens the Webinar page, **When** the page loads, **Then** they see a
   nine-cell visual collage beside the hero text, mixing photographic tiles with decorative
   non-photographic tiles.

---

### User Story 2 - Register for the upcoming live session (Priority: P1)

A visitor wants to know about TechGrit's next live webinar and register interest without having to
scan past older content first.

**Why this priority**: The upcoming/live session is the page's primary conversion moment — it is
the most time-sensitive piece of content on the page and anchors the value of returning to the
page.

**Independent Test**: Can be fully tested by verifying a single, visually distinct "upcoming" session
panel appears at the top of the Sessions grid, showing a live status indicator, the session title,
a description, a date/time, and a "Register Now" action — independent of the released sessions
beneath it.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the Sessions grid, **When** they view its top entry, **Then** they
   see a single upcoming session spanning the full width of the grid, with a "live" status
   indicator, its title, a description, its date and time, and a "Register Now" action.
2. **Given** a visitor selects "Register Now", **When** the action activates, **Then** they are
   taken to the page's Subscribe section without a full page reload.

---

### User Story 3 - Browse released session recordings (Priority: P1)

A visitor wants to see what past webinar sessions are available to watch, so they can decide which
recordings are relevant to them.

**Why this priority**: Released sessions are the bulk of the page's content and the reason a
returning visitor keeps coming back to browse; without them the page has no library to offer.

**Independent Test**: Can be fully tested by loading the Webinar page, scrolling to the Sessions
grid, and verifying every released session renders with a status label, a "Watch Now" action,
title, and description, laid out beneath the upcoming session.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the Sessions grid, **When** they view the entries below the upcoming
   session, **Then** every released session shows a "Released" label, a title, a description, and a
   "Watch Now" action.
2. **Given** a visitor activates a "Watch Now" action, **When** they select it, **Then** the control
   responds as an actionable element (this feature's scope does not include an actual video
   playback destination — see Assumptions).

---

### User Story 4 - Subscribe for future session announcements (Priority: P2)

A visitor who is not ready to register for a specific session wants a low-effort way to be notified
whenever a new webinar is announced.

**Why this priority**: This is the page's secondary conversion point. The page still delivers its
core browsing value without it (Stories 1–3), but it's what turns a one-time visit into an ongoing
relationship. The page offers two entry points into this same action — the hero's email form and a
dedicated Subscribe section further down.

**Independent Test**: Can be fully tested by locating either the hero email form or the dedicated
Subscribe section near the end of the page, submitting a valid email and verifying an on-page
confirmation appears, and separately submitting an invalid email and verifying a corrective message
appears without navigating away.

**Acceptance Scenarios**:

1. **Given** a visitor is at the hero or the Subscribe section, **When** they submit a validly
   formatted email address, **Then** an on-page confirmation message appears in that form's own
   context and no page navigation occurs.
2. **Given** a visitor is at the hero or the Subscribe section, **When** they submit an invalid or
   empty email address, **Then** the form remains visible and a corrective message appears, without
   navigating away.

---

### User Story 5 - Use the page comfortably on any device (Priority: P1)

A visitor opens the Webinar page on a phone, a tablet, or a desktop browser. Regardless of device,
the hero, Sessions grid, and Subscribe section need to be fully visible, correctly arranged, and
easy to interact with — no overlapping content, no horizontal scrolling, no clipped elements.

**Why this priority**: A meaningful share of visits to a content/marketing page happen on mobile.
If the page breaks or becomes hard to use at those widths, the core content (Stories 1–4) never
effectively reaches those visitors.

**Independent Test**: Can be fully tested by loading the Webinar page at common mobile (~375–430px),
tablet (~768–1024px), and desktop (~1280px+) widths and verifying every section remains readable,
correctly laid out, and fully interactive at each size.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a mobile-width screen, **When** the page renders, **Then**
   the hero's text and collage stack into a single column, the Sessions grid collapses to a single
   column, the Subscribe section stacks its text above its form, and the nine-cell collage
   reflows to two columns — all with no overlapping text, no clipped content, and no horizontal
   scrolling.
2. **Given** a visitor opens the page on a tablet-width screen, **When** the page renders, **Then**
   the Sessions grid and hero collapse to their single-column layout per the project's canonical
   breakpoints, remaining fully readable and correctly spaced.
3. **Given** a visitor opens the page on a desktop-width screen, **When** the page renders, **Then**
   all sections use their full multi-column layout as designed, centered and constrained to a
   readable maximum width.

---

### Edge Cases

- What happens if there is currently no upcoming/live session to feature? Out of scope for this
  feature — the content model always defines exactly one upcoming session (see Assumptions).
- How does the page behave if entrance/reveal animations fail to run or are disabled (e.g.,
  reduced-motion preference, slow device)? All content MUST still become fully visible and
  readable, not remain hidden or stuck mid-transition.
- How does the page behave on narrow (mobile) screens? All sections MUST reflow into a
  single-column, readable layout rather than clipping, overlapping, or requiring horizontal
  scrolling.
- What happens if a visitor interacts with the hero form, the "Register Now" action, any "Watch
  Now" action, or the Subscribe form using only a keyboard? Each MUST be reachable and operable via
  keyboard, with a visible focus indicator.
- What happens when a session's title or description is unusually long? The card layout MUST
  remain intact (text wraps or is constrained) without breaking the grid's alignment or
  overlapping neighboring cards.
- What happens if a visitor submits either subscribe form multiple times in a row? Each submission
  MUST be independently validated; a prior success state MUST NOT block a later attempt from a
  cleared form.
- What happens if a visitor submits the hero form and then the Subscribe section form (or vice
  versa) in the same visit? Each form's success/error state is independent of the other (see
  Assumptions).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Webinar page MUST present a hero section with a badge identifying the page as the
  webinar series, a headline describing the page's purpose (with one phrase visually distinguished
  as an accent), and a supporting statement beneath it.
- **FR-002**: The hero MUST present an email capture form (email input plus a submit action)
  independent of the Subscribe section's own form.
- **FR-003**: The hero MUST present a nine-cell visual collage arranged in a fixed 3-by-3 grid,
  composed of six photographic tiles and three non-photographic decorative tiles (an icon or
  motion-styled treatment), reflowing to two columns on narrow screens.
- **FR-004**: The page MUST present a Sessions section with a heading, followed by a grid
  containing exactly one upcoming session and one or more released sessions.
- **FR-005**: The upcoming session MUST render as a single entry spanning the full width of the
  Sessions grid, visually distinguished from released sessions, showing a "live" status indicator,
  a title, a description, a date and time, and a "Register Now" action.
- **FR-006**: The "Register Now" action MUST be an actionable `<button>` element (not an
  anchor/link element styled to look like a button) that, when activated, scrolls the page to the
  Subscribe section without a full page reload.
- **FR-007**: Each released session MUST render with a "Released" status label, a title, a
  description, and a "Watch Now" action implemented as an actionable `<button>` element (not an
  anchor/link element); each released session's card size (half-width or full-width) MUST be a
  fixed value authored on that session's own content entry — not computed from its position or
  auto-cycled from a repeating pattern — matching the reference's mix of narrower and one wider
  card treatment.
- **FR-008**: All Sessions grid content (the upcoming session and every released session) MUST be
  sourced from a structured, ordered content definition rather than hard-coded, one-off markup, so
  content can be updated without restructuring the page.
- **FR-009**: The page MUST present a Subscribe section, separate from the hero form, with a
  headline, supporting copy, an email input, and a submit action.
- **FR-010**: Submitting either the hero form or the Subscribe section form with a validly formatted
  email MUST show an on-page confirmation in that form's own context, without navigating away from
  the page.
- **FR-011**: Submitting either the hero form or the Subscribe section form with an invalid or empty
  email MUST keep that form visible and show a corrective message, without navigating away from the
  page.
- **FR-012**: The Webinar page MUST reuse the site's existing shared header and footer components
  rather than defining its own; this feature's scope is limited to the page's own content between
  the header and footer.
- **FR-013**: All interactive controls on the page (the hero form's input and submit action, the
  "Register Now" action, every "Watch Now" action, and the Subscribe form's input and submit
  action) MUST be operable using only a keyboard, with a visible focus state, and MUST expose an
  accessible name to assistive technology.
- **FR-014**: The page MUST remain fully readable, correctly laid out, and navigable across common
  desktop, tablet, and mobile screen widths, with each multi-column section (the hero, the
  nine-cell collage, the Sessions grid, the Subscribe section) adapting its layout to the available
  width rather than using one fixed layout for all devices.
- **FR-015**: Submitting the hero form or the Subscribe section form MUST NOT send the entered
  email to any backend service or CRM; both forms' success/error states are client-side-only visual
  transitions, consistent with the Contact page, the Blog subscribe panel, and the homepage's
  `SubscribeBand`.
- **FR-016**: Because neither "Register Now" (an in-page scroll) nor any "Watch Now" action (no
  navigation destination in scope) triggers a real page-to-page navigation, both MUST be
  implemented using actionable `<button>` elements rather than anchor/`<a>` elements styled to
  look like buttons — regardless of how the reference file's own markup happens to implement
  either control.

### Key Entities

- **Webinar Session**: One entry in the Sessions grid — has a status (`upcoming` or `released`), a
  title, a description, an accent identity used for its card treatment, and, only when upcoming, a
  live indicator plus a date, a time, and a timezone label stored as separate structured fields
  (not one freeform string) and composed for display. Released sessions additionally carry the
  layout size used for their card (half-width or full-width) as authored per-session, matching the
  reference's non-uniform card sizing.
- **Hero Collage Tile**: One of the nine fixed cells in the hero's visual collage — has a position
  (1–9), a kind (`photo` or `decorative`), and, when a photo, an image reference.
- **Newsletter Subscription**: The transient interaction state of either subscribe entry point (hero
  form or Subscribe section form) — holds the entered email value, a validation/error message when
  invalid, and a submitted/confirmed state once a valid email has been submitted, scoped
  independently to whichever form was submitted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the webinar series' purpose and see the current
  upcoming session's date and time within the first two screens of the page (hero and top of the
  Sessions grid), without needing to reach the Subscribe section.
- **SC-002**: A visitor can move from the upcoming session's "Register Now" action to the Subscribe
  section in a single interaction, with no full page reload.
- **SC-003**: The upcoming session panel and every released session card render their full content
  — status, title, description, and (for the upcoming session) date/time — correctly and legibly at
  desktop, tablet, and mobile widths, with no horizontal scrolling, overlapping content, or clipped
  text at any of the three.
- **SC-004**: A visitor can submit a valid email in either the hero form or the Subscribe section and
  receive on-page confirmation in a single interaction, without leaving the page.
- **SC-005**: A visitor who submits an invalid email in either form is shown a corrective message
  before any navigation occurs, every time.
- **SC-006**: The page remains fully readable — no missing, broken, or blocked content — even when
  entrance animations do not run.

## Assumptions

- **The upcoming session is always exactly one, editorially authored entry — not derived or
  computed from released sessions or a date comparison.** The reference embeds one hardcoded
  upcoming session; this feature carries that same single-entry, hand-authored pattern forward as a
  structured content definition, consistent with FR-008 and the project's documented convention that
  current page content (navigation, footer, homepage sections, and the TMS-69 Blog page's featured
  post) is static configuration, not persisted or computed data.
- **The hero email form and the Subscribe section's email form are treated as two independent
  subscribe entry points, each with its own isolated validation and success state**, rather than
  sharing one state. The reference implementation happens to share a single state value between
  both forms (so submitting one visually "completes" the other too), but that reads as an
  incidental side effect of the reference file being a single-component preview-tool mockup, not an
  intentional product behavior — no part of the reference's visual design communicates that the two
  forms are meant to be linked. This also matches the project's established, independent-per-form
  precedent (TMS-69's Blog subscribe panel, the homepage's `SubscribeBand`, and the Contact page).
- **"Watch Now" and "Register Now" are treated per the reference's own scope**: "Register Now"
  scrolls to this page's own Subscribe section (matching the reference's own scroll-to-section
  behavior, but as a `<button>` rather than the reference's anchor-styled-as-button markup — see
  FR-006/FR-016), while "Watch Now" is an actionable control with no functional destination in
  scope — the reference itself only prevents default behavior on click with no video player, modal,
  or navigation target defined. Building an actual video-playback experience is out of scope for
  this feature.
- **Email validation reuses this project's existing shared form-field/validation convention**
  (`components/ui/FormField.tsx` and its established error-state pattern, as already used by the
  homepage's `SubscribeBand` and the Contact page) rather than relying only on the browser's native
  `type="email" required` tooltip that the reference file uses, so the page's validation experience
  is consistent with the rest of the site.
- **Strict visual fidelity to the reference is achieved by extending the shared `Badge`,
  `Button`, and `GlassCard` primitives with new tone/variant entries, not by forking bespoke
  one-off markup.** None of Badge's five existing tones or GlassCard's eight existing variants
  reproduce this reference's specific colors (the hero eyebrow's orange-outline pill, the upcoming
  session's amber gradient panel, the released-session cards, the subscribe panel's glass
  treatment), so this feature adds new tone/variant entries to `components/ui/Badge.tsx` and
  `components/ui/GlassCard.tsx` for these treatments — consistent with the project constitution
  ("reuse whatever primitive already covers the need; a one-off reimplementation is only justified
  when neither convention has a fit") and the precedent already set by TMS-69's Blog page (which
  added `blogCard`/`blogFeatured` GlassCard variants rather than forking new card markup). `Button`
  is reused as-is (its existing `primary` variant already matches the reference's gradient CTA
  styling) with no new variant required.
- **Every icon the reference renders inline (nav chevron, clock, play-triangle, decorative spinner
  ring, dot) is added to the single consolidated `components/ui/icons.tsx` file rather than
  duplicated inline per component**, per the project's existing convention that this is the one
  icon file for the whole app.
- **Header and footer are fully out of scope.** They were already delivered as a shared, reusable
  global layout by feature TMS-63 (`specs/TMS-63`); this feature only builds the Webinar page's own
  content and reuses those components as-is. The shared navigation already exposes "Webinar"
  pointing at this page's route under a "Resources" group, per the reference's own nav structure.
- **Responsive layout follows this project's canonical breakpoints, not the reference file's
  literal pixel values.** The reference's inline styles switch the hero, collage, and Sessions grid
  layouts at 960px and 560px. Per this project's constitution, breakpoints must reuse the canonical
  `lg` (1140px), `md` (960px), and `sm` (560px) values rather than inventing new pixel breakpoints;
  this feature preserves the reference's column-count behavior (two-column hero to stacked; 3x3
  collage to 2-column) but maps those transitions onto the canonical breakpoints instead of the
  reference's own values.
- **The four distinct photographs used across the collage's six photo tiles
  (`public/assets/team/glasses.png`, `rooftop.png`, `painting.png`, `diwali.png`) are reused verbatim
  from existing site assets already present in `public/assets/team/`**, including the two tiles that
  reuse an image with a different crop/focal point (`object-position`), matching the reference
  exactly.
- **Reveal/entrance animations are decorative.** Per the Edge Cases above, all content must be
  fully visible and readable whether or not those animations run, so no functional requirement
  depends on them.

## Implementation Estimate — AI-Assisted, Spec-Driven Development

These are elapsed **active AI-generation** estimates for producing this page end-to-end through
Claude Code's spec-kit workflow (`/speckit.specify` → `/speckit.clarify` → `/speckit.plan` →
`/speckit.tasks` → `/speckit.implement`), assuming no backend work and full reuse of existing
tokens/components. They reflect generation + self-verification time only, not calendar time waiting
on human reviewers. This page is lower-complexity than the recently shipped Blog page (TMS-69,
which had client-side filtering and a distinct featured-story layout) — it has three static sections
and no interactive filtering logic — so estimates trend toward the low end of this project's recent
per-page range.

| Phase | What Claude Code produces | AI-generation estimate |
|---|---|---|
| `/speckit.specify` (this phase) | Reference analysis + this spec.md + quality checklist | 25–30 min |
| `/speckit.clarify` | Resolves any open ambiguity into the spec | 15–20 min (3 questions asked and resolved) |
| `/speckit.plan` | Technical plan: component breakdown, data-model shape, token additions if any | 25–30 min |
| `/speckit.tasks` | Dependency-ordered task list from the plan | 25–30 min |
| `/speckit.implement` | All components (hero, collage, session cards, subscribe form), content/data module, any new tokens, lint/build fixes | 90–120 min |
| **Total AI-generation time** | | **~2.5–3.5 hours** |

Add a human review/QA pass (visual diff against the reference at desktop/tablet/mobile, PR review,
any requested revisions) on top of this — consistent with this project's other recent pages, that
typically spans an additional half-day to one full day of calendar time, independent of the AI
generation time above.
