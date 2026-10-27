# Feature Specification: Homepage Content Sections

**Feature Branch**: `TMS-62`
**Created**: 2026-07-14
**Status**: Draft
**Input**: User description: "\"C:\techgrit\Techgrit website\TechGrit Website V2\TechGrit Homepage.dc.html\" this is the html i want to create using the spec driven development, so create a specification file for this which will cover all the home page related all sections but we have separate header and footer code is already generated no need to consider. make buttons or badges or if forms as reusable components, if svgs are there place them in a icons.tsx maintain all the svgs in the same file"

## Clarifications

### Session 2026-07-14

- Q: Should the subscribe form's success/error state be a purely client-side behavior, or must it call a real backend/email-CRM API before showing success? → A: Client-side only — form validates and shows success/error state locally; no real email/CRM system is called in this feature (matches current reference behavior).
- Q: Should this spec require conversion/analytics tracking (e.g. demo-request clicks, subscribe submissions, phase-tab interactions)? → A: Out of scope — analytics/tracking instrumentation is not a requirement of this spec.
- Q: Does the subscribe form need an explicit consent control (e.g. a checkbox or Privacy Policy link) before submission is allowed? → A: No — submitting the form with a valid name and email is sufficient; no separate consent control is required (matches current reference behavior).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Grasp the value proposition and act on it (Priority: P1)

As a first-time visitor landing on the homepage, I want to immediately understand what TechGrit
does and how it's different, see proof that real clients trust them, and have an obvious way to
start a conversation — so I can decide within seconds whether to keep exploring or reach out.

**Why this priority**: The hero is the very first thing every visitor sees. If it doesn't
communicate the value proposition and offer a clear next step, every other section on the page
becomes irrelevant because the visitor has already left. This is the smallest possible slice that
delivers value on its own.

**Independent Test**: Load the homepage and, without scrolling, confirm a headline, a supporting
description, a set of delivery highlights (e.g. speed, timeline, technical debt), a primary and
secondary call-to-action, and a row of recognizable client logos are all visible or reachable, and
that both calls-to-action are clickable.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** the page loads, **Then** a headline and
   supporting description communicating TechGrit's core value proposition are visible without
   requiring any interaction.
2. **Given** a visitor is viewing the hero, **When** they look at the highlighted delivery
   statistics, **Then** they see at least three distinct metrics (e.g. delivery speed, timeline,
   technical debt) presented clearly.
3. **Given** a visitor wants to engage, **When** they select the primary call-to-action, **Then**
   they are taken to the contact/demo-request destination; **When** they select the secondary
   call-to-action, **Then** they are taken to the methodology section further down the page.
4. **Given** a visitor scrolls to the bottom of the hero, **When** they view the "trusted by"
   area, **Then** a row of client logos is visible.

---

### User Story 2 - Understand how TechGrit delivers (Priority: P2)

As a visitor evaluating whether TechGrit can execute, I want to see the platform capabilities
behind their delivery model and a clear breakdown of their delivery timeline, so I can judge
whether their process fits how fast I need to move.

**Why this priority**: Once a visitor's attention is captured, the next objection is credibility —
"how do they actually deliver this?" This content builds the trust needed before a visitor will
commit to industry proof or a demo request, but the page is still valuable without it if a visitor
only sees the hero and converts directly.

**Independent Test**: Scroll to the platform section and confirm the platform capability list and
its supporting visual render; scroll to the methodology section and confirm exactly one delivery
phase's detail (title, week range, description, and deliverables) is shown at a time, and that
selecting a different phase (via its tab or by scrolling) updates which phase is shown.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the platform section, **When** it renders, **Then** they see a
   short set of platform capabilities (each with a title and description) and an illustrative
   delivery-pipeline visual.
2. **Given** a visitor reaches the methodology section, **When** it renders, **Then** they see all
   delivery phases listed as selectable steps, with one phase's full detail (title, week range,
   description, and a list of deliverables) shown as currently active.
3. **Given** a visitor selects a different phase tab, **When** the selection changes, **Then** the
   detail panel updates to show that phase's title, week range, description, and deliverables.
4. **Given** a visitor scrolls through the methodology section without clicking a tab, **When**
   they pass through the section, **Then** the active phase advances in step with their scroll
   position and always lands on a single valid phase (never between two, never none selected).

---

### User Story 3 - Understand what makes the approach different (Priority: P3)

As a visitor comparing TechGrit against a traditional software vendor, I want to see the specific
ways their AI-first approach differs from a conventional build, and a concrete comparison of
delivery time, so I can judge the magnitude of the difference.

**Why this priority**: This reinforces the credibility built in User Story 2 with a sharper,
comparison-driven pitch. It's valuable content but the homepage still functions as a lead-gen page
without it if a visitor already decided to convert from the hero or the methodology section.

**Independent Test**: Scroll to the "Don't Migrate, Re-Imagine" section and confirm three
differentiator points render, each with a title and description; confirm the adjoining "why
AI-first matters" panel shows a labeled comparison between traditional development time and
TechGrit's delivery time.

**Acceptance Scenarios**:

1. **Given** a visitor reaches this section, **When** it renders, **Then** three differentiator
   points are shown, each with an icon, a title, and a short description.
2. **Given** a visitor views the comparison panel, **When** it renders, **Then** they see two
   labeled bars or values — one for traditional development time and one for TechGrit's delivery
   time — making the difference in duration visually obvious.

---

### User Story 4 - Find proof relevant to my industry (Priority: P4)

As a visitor from a specific industry (FinTech, Healthcare, or Construction), I want to see that
TechGrit has relevant experience in my space, so I can judge whether they understand my domain's
constraints.

**Why this priority**: Industry relevance strongly influences whether a qualified visitor converts,
but it is one of several proof points on the page (alongside testimonials and case studies) rather
than the sole driver of conversion, so it is sequenced after the core value/credibility content.

**Independent Test**: Scroll to the industries section and confirm three industry cards (FinTech,
Healthcare, Construction) render, each with imagery, a title, and a description, and that the
section-level and Construction-specific links navigate to their destinations.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the industries section, **When** it renders, **Then** three industry
   cards are shown, each with representative imagery, a title, and a short description.
2. **Given** a visitor wants to see more industries content, **When** they select the section's
   "explore industry solutions" link, **Then** they are taken to the industries/services
   destination.
3. **Given** a visitor is interested specifically in Construction, **When** they select the
   Construction card's own link, **Then** they are taken to the Construction-specific destination.

---

### User Story 5 - Evaluate social proof before converting (Priority: P5)

As a visitor who is close to deciding, I want to read what other clients say and see measurable
outcomes from past projects, so I can validate that TechGrit delivers real results before I commit
to reaching out.

**Why this priority**: Social proof (testimonials and case studies) is typically consulted late in
a visitor's evaluation, after the value proposition and credibility content have already been
absorbed, so it is sequenced after those stories while still being an independently valuable and
testable slice of the page.

**Independent Test**: Scroll to the testimonials section and confirm testimonial cards render and
can be browsed by scrolling/dragging horizontally, that selecting a video testimonial opens a
lightbox, and that closing it returns to the page; scroll to the case studies section and confirm
one featured case study and at least three supporting case studies render with an outcome metric
each.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the testimonials section, **When** it renders, **Then** a
   horizontally browsable set of testimonial cards is shown, each with a quote, author name, and
   role, and text-based cards additionally show a star rating.
2. **Given** a visitor selects a testimonial marked as a video testimonial, **When** they select
   it, **Then** a lightbox opens showing that testimonial's video (or a placeholder state if no
   video is available) along with the author's name and role; **When** they close the lightbox,
   **Then** they return to the underlying page in its prior scroll position.
3. **Given** a visitor reaches the case studies section, **When** it renders, **Then** one case
   study is shown as featured (with industry tag, outcome metric, title, and description) and at
   least three additional case studies are shown, each with an industry tag, outcome metric, and
   title.
4. **Given** a visitor wants to see more case studies, **When** they select "view all case
   studies," **Then** they are taken to the case studies destination.

---

### User Story 6 - Stay engaged beyond a single visit (Priority: P6)

As a visitor who isn't ready to request a demo today, I want a lightweight way to subscribe for
future updates, a sense of the people and culture behind the company, and one more clear
opportunity to reach out, so I can stay connected without commitment.

**Why this priority**: This is supplementary engagement content — valuable for nurturing visitors
who don't convert on their first visit, but the page delivers its primary purpose (lead generation
and credibility) without it, making it the right content to sequence last.

**Independent Test**: Confirm the subscribe form accepts a name and email and shows a success
confirmation after submission (and a validation error on invalid/missing input); confirm the "Life
at TechGrit" gallery renders a set of culture images; confirm the final call-to-action band at the
bottom of the page renders with its own primary and secondary calls-to-action.

**Acceptance Scenarios**:

1. **Given** a visitor wants webinar/podcast updates, **When** they submit the subscribe form with
   a name and valid email, **Then** the form is replaced with a confirmation message.
2. **Given** a visitor submits the subscribe form with an invalid or missing email, **When** they
   submit, **Then** a validation message is shown and the form is not marked as submitted.
3. **Given** a visitor scrolls to the "Life at TechGrit" section, **When** it renders, **Then** a
   gallery of culture/team images is shown.
4. **Given** a visitor reaches the bottom of the page, **When** the final call-to-action band
   renders, **Then** it shows its own heading, description, a primary call-to-action (contact/demo
   request), and a secondary link back to the methodology section.

---

### Edge Cases

- What happens when a testimonial is marked as a video testimonial but has no video source
  available? The lightbox MUST show a clear placeholder state (e.g. "video testimonial") rather
  than a broken or empty player.
- What happens when a visitor submits the subscribe form with a malformed email or empty name?
  The system MUST reject the submission with an inline, clearly worded error and MUST NOT show the
  success confirmation state.
- What happens on an extremely narrow screen (e.g. under 360px wide) or with enlarged text/zoom?
  Every section's grid, card row, and stat row MUST reflow into a single column/stack that remains
  fully readable, without clipped content or page-level horizontal scrolling.
- What happens when a visitor has JavaScript disabled or a reduced-motion preference set? Core
  content (headline, descriptions, stats, cards, links, forms) MUST remain visible and usable
  without depending on scroll-driven, count-up, or ambient decorative animations; decorative
  motion MUST NOT be required to read or act on any content.
- What happens when a visitor scrolls quickly through the 6-week methodology section? The active
  delivery phase indicator MUST always resolve to exactly one valid phase, never an in-between or
  unset state.
- What happens when an industry, case-study, or gallery image fails to load? The layout MUST
  reserve the image's space (no collapse or overlap of surrounding content).
- What happens when a visitor uses only a keyboard? Every interactive element on the page —
  buttons, links, form fields, phase tabs, testimonial cards, and the video lightbox's close
  control — MUST be reachable and operable via keyboard, with a visible focus indicator.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST present a hero section with a primary headline, a supporting
  description of TechGrit's value proposition, at least three highlighted delivery metrics, a
  primary call-to-action (contact/demo request), a secondary call-to-action (jump to methodology),
  and a row of client logos, all visible without requiring scrolling on standard desktop viewports.
- **FR-002**: The hero MUST include a small "live event" indicator and a status badge, each
  presented as a distinct, reusable badge/pill style rather than one-off markup.
- **FR-003**: The homepage MUST present a subscribe form (name and business email) that, on valid
  submission, replaces itself with a success confirmation shown immediately once client-side
  validation passes — with no dependency on any external email/CRM system in this feature — and on
  invalid/missing input, shows an inline validation error without submitting.
- **FR-004**: The homepage MUST present a platform section describing TechGrit's delivery platform
  with a short list of platform capabilities (each with a title and description) alongside an
  illustrative delivery-pipeline visual.
- **FR-005**: The homepage MUST present a methodology section listing every delivery phase as a
  selectable step, showing exactly one phase's detail (title, week range, description, and
  deliverables list) as active at a time.
- **FR-006**: Selecting a phase step MUST update the active phase detail to match; scrolling
  through the methodology section without an explicit selection MUST also advance the active phase
  in step with scroll position, always resolving to a single valid phase.
- **FR-007**: The homepage MUST present a differentiation section with exactly three
  differentiator points (icon, title, description) and a comparison panel showing traditional
  development time against TechGrit's delivery time.
- **FR-008**: The homepage MUST present an industries section with three industry cards (FinTech,
  Healthcare, Construction), each showing imagery, a title, and a description; the section MUST
  offer a link to explore industry solutions, and the Construction card MUST additionally offer its
  own dedicated link. At the `md` (tablet) breakpoint the cards MUST lay out as the first two cards
  in one row with the third card centered on the row below, not stacked full-width; desktop (`lg`)
  and small/mobile layouts are unaffected.
- **FR-009**: The homepage MUST present a testimonials section as a horizontally browsable
  collection of testimonial cards, each showing a quote, author name, and role; text testimonials
  MUST additionally show a star rating, and video testimonials MUST open a lightbox showing the
  video (or a placeholder if unavailable) plus the author's name and role.
- **FR-010**: The homepage MUST present a case studies section with one featured case study
  (industry tag, outcome metric, title, description) and at least three additional case studies
  (industry tag, outcome metric, title), plus a link to view all case studies.
- **FR-011**: The homepage MUST present a "Life at TechGrit" gallery of culture/team images.
- **FR-012**: The homepage MUST present a final call-to-action band with its own heading,
  description, primary call-to-action (contact/demo request), and a secondary link back to the
  methodology section.
- **FR-013**: Every call-to-action and standalone action across the homepage (hero, subscribe
  form, final CTA band, section-level "explore"/"view all" links that are styled as buttons) MUST
  be built from a shared, reusable button component so visual style and behavior stay consistent
  across the page.
- **FR-014**: Every status/label pill on the homepage (e.g. the hero's live-event and status
  indicators, industry tags on case studies) MUST be built from a shared, reusable badge component.
- **FR-015**: The subscribe form's input fields and submit control MUST be built from shared,
  reusable form components so validation and styling behave consistently.
- **FR-016**: Every icon used across the homepage sections in scope MUST be sourced from one
  consolidated icon collection, rather than duplicated inline per section.
- **FR-017**: This feature covers only the homepage's own content sections (hero through final
  call-to-action band, as enumerated above); the shared site header and footer are out of scope,
  as they are already implemented separately.
- **FR-018**: Every interactive element in scope (buttons, links, form fields, phase tabs,
  testimonial cards, the video lightbox and its close control) MUST be operable via keyboard alone,
  with a visible focus state and an accessible name.
- **FR-019**: All homepage sections in scope MUST reflow to remain fully readable, with no clipped
  or overlapping content and no page-level horizontal scrolling, from small phone widths through
  wide desktop widths.
- **FR-020**: Decorative motion (ambient background effects, scroll-reveal transitions, count-up
  numbers, shimmer/pulse effects) MUST NOT be required for a visitor to read or act on any content;
  all content and controls MUST remain fully usable if such motion is absent or reduced.

### Key Entities

- **Delivery Stat**: A highlighted hero metric — has a value (e.g. "10X"), and a label (e.g.
  "Delivery Speed").
- **Trusted Client Logo**: A client logo shown in the hero's trust row — has an image and an
  accessible name.
- **Platform Capability**: A bullet describing an OrbitAI platform capability — has an icon, a
  title, and a description.
- **Methodology Phase**: One step of the 6-week delivery framework — has a sequence number, a week
  range, a title, a description, and an ordered list of deliverables; exactly one is "active" at any
  time.
- **Differentiator Point**: One of the three "re-imagine" pillars — has an icon, a title, and a
  description.
- **Comparison Metric**: A labeled duration used in the traditional-vs-OrbitAI comparison — has a
  label and a relative value used to size its bar.
- **Industry Card**: A represented industry — has imagery, an icon, a title, a description, and an
  optional dedicated link (used only by Construction in this spec).
- **Testimonial**: A client quote — has a quote, author name, author role, initials, a type (text or
  video), and for text testimonials a star rating; video testimonials optionally reference a video
  source.
- **Case Study**: A client outcome story — has an industry tag, an outcome metric with label, a
  title, a description (featured case study only), and a "featured" flag.
- **Culture Gallery Image**: An image shown in the "Life at TechGrit" gallery — has an image and
  an accessible description.
- **Newsletter Subscription Submission**: A visitor's subscribe-form entry — has a name and a
  business email, and a submission state (idle, error, success).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify TechGrit's core value proposition and see a way to take
  action within the first screen of the homepage, with no scrolling required, on standard desktop
  and mobile viewport sizes.
- **SC-002**: A visitor can reach a contact/demo-request action from at least two distinct points
  on the page (the hero and the final call-to-action band) in a single interaction each.
- **SC-003**: A visitor can review every delivery phase of the 6-week methodology, either by direct
  selection or by scrolling, and at every point in that interaction exactly one phase's full detail
  is displayed.
- **SC-004**: A visitor can browse all testimonials and open any video testimonial without the page
  navigating away or losing scroll position.
- **SC-005**: A visitor can review at least four case studies with outcome metrics without leaving
  the homepage.
- **SC-006**: A visitor completes the subscribe form and reaches a success confirmation, or a clear
  correction message on invalid input, in under 30 seconds.
- **SC-007**: Every interactive element on the homepage is operable using only a keyboard, with a
  visible focus indicator at each step, verified by tabbing through the full page without a mouse.
- **SC-008**: All homepage sections render with no clipped, overlapping, or missing content across
  the full supported range of screen widths, from the narrowest supported phone width to wide
  desktop widths.
- **SC-009**: All homepage content and controls remain fully readable and usable with decorative
  motion/animation disabled or absent (e.g. reduced-motion preference, JavaScript unavailable).

## Assumptions

- The shared site header and footer are already implemented as a separate feature and are
  explicitly out of scope for this spec, per the request; this spec covers only the homepage's own
  content sections, from the hero through the final call-to-action band.
- Using a shared, reusable button component for all calls-to-action, a shared badge component for
  status/label pills, shared form components for the subscribe form, and one consolidated icon
  collection for every icon are treated as binding constraints on this feature (per the request)
  and will be carried into the technical plan; they are captured here as functional requirements
  (FR-013 through FR-016) rather than left to implementation discretion.
- Marketing copy and figures shown in the reference (stat values, testimonial quotes, case-study
  metrics, client logos) reflect current, approved content; if that content changes, it is a
  content update rather than a change to this spec's structure.
- The subscribe form's success/error behavior is scoped to the visitor-facing experience described
  here (client-side validation and confirmation state); connecting submissions to an actual
  email/CRM delivery system is a backend integration concern outside this spec's scope.
- Video testimonials are expected to reference an externally hosted video; no video
  hosting/transcoding backend is assumed to exist as part of this feature — only the lightbox
  presentation and its no-video fallback state are in scope.
- Conversion/analytics tracking (e.g. instrumenting CTA clicks, subscribe submissions, or phase-tab
  interactions for marketing measurement) is out of scope for this spec; it is not required by any
  functional requirement here and would be addressed as a separate, later concern if needed.
- The subscribe form does not require a separate consent control (e.g. a checkbox or Privacy Policy
  link); submitting a valid name and business email is treated as sufficient opt-in, matching the
  reference behavior. If a compliance requirement for explicit consent emerges later, it would be
  a scope change to this spec's FR-003.
- Decorative/illustrative elements (ambient background glows, the console mock's animated stat
  bars, scroll-reveal and count-up effects) are brand treatment rather than functional requirements
  and may be simplified, as long as FR-020's requirement that they never gate access to content is
  met.
