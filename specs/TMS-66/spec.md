# Feature Specification: Services Page

**Feature Branch**: `TMS-66`
**Created**: 2026-07-15
**Status**: Draft
**Input**: User description: "take the HTML file services.dc.html file as a reference which is under the raw-files folder and we need to develop this using the spec-driven development, so create a specification file for this which will cover all the service page related sections but we have seperate header and footer components and these are need to be reused and don't write a specific code for this and implement only services page and analyze only the dc.html files which is under the raw-files use the reference files as the source for the page structure and content and treat this works as fetaure 'TMS-66'"

## Clarifications

### Session 2026-07-15

- Q: The reference file has two "Schedule a Consultation" calls-to-action with different
  destinations (hero → Contact Us page, closing section → a direct email/mailto action). Should
  both keep their own destination, or should they be unified? → A: Unify them — both the hero and
  the closing-section "Schedule a Consultation" calls-to-action must navigate to the Contact Us
  page. The closing section must no longer open a direct email/mailto action.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See what TechGrit offers, at a glance (Priority: P1)

A prospective client lands on the Services page for the first time. Within the opening view and
first scroll, they need to understand TechGrit's overall value proposition and see the three core
service areas the company offers, so they can quickly judge whether to keep exploring or jump
straight to the area they care about.

**Why this priority**: This is the entry point of the whole page. Without a clear introduction and
overview, visitors have no map of what's available and no reason to scroll further into the
service detail sections.

**Independent Test**: Can be fully tested by loading the Services page and verifying the
introductory statement and all three service overview cards (title, one-line description, and a
way to jump to that service's detail section) are present, readable, and correctly ordered —
independent of any detail section's own content.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Services page, **When** the page loads, **Then** they see an
   introductory headline and supporting statement describing TechGrit's overall service offering,
   plus a primary action to start a conversation and a secondary action to jump into the service
   details.
2. **Given** a visitor scrolls past the introduction, **When** they reach the overview section,
   **Then** they see exactly three service overview cards, each showing a sequence label, a title,
   a one-line description, and a supporting image.
3. **Given** a visitor selects one of the three overview cards, **When** they activate it, **Then**
   they are taken to that service's own detail section further down the same page, without a full
   page reload.

---

### User Story 2 - Explore a specific service in depth (Priority: P1)

A visitor who is interested in one particular capability (design, engineering, or quality) wants
to understand what that service actually includes — the outcome it delivers and the concrete
activities or capabilities behind it — so they can judge whether it matches what they need.

**Why this priority**: The detail sections are where a visitor decides whether TechGrit can
actually solve their specific problem. This is the core evidentiary content of the page, without
which the overview cards would be making promises with nothing behind them.

**Independent Test**: Can be fully tested by scrolling to any one of the three service detail
sections and verifying its category label, heading, description, supporting image, and its list of
supporting items (approach steps or capabilities) are all present and correctly described,
independent of the other two service sections.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the UI/UX Design detail section, **When** they view it, **Then**
   they see a heading and description of the design outcome TechGrit delivers, a supporting image,
   and an ordered set of approach steps describing how a design engagement proceeds.
2. **Given** a visitor reaches the Software Product Engineering detail section, **When** they view
   it, **Then** they see a heading and description of the engineering outcome TechGrit delivers, a
   supporting image, and a set of labeled engineering capabilities.
3. **Given** a visitor reaches the Quality Engineering detail section, **When** they view it,
   **Then** they see a heading and description of the quality outcome TechGrit delivers, a
   supporting image, and a set of labeled quality-assurance capabilities.

---

### User Story 3 - Start a conversation about a project (Priority: P2)

A visitor who has seen enough — either right away from the hero, or after reading through the
service details — wants an easy, unmissable way to start a conversation with TechGrit about their
own project.

**Why this priority**: This is the page's conversion point. It matters less than the informational
content (Stories 1 and 2) in the sense that the page still delivers value without it being
perfect, but it's what turns a visitor's interest into an actual lead.

**Independent Test**: Can be fully tested by verifying a call-to-action to start a conversation
exists at the top of the page (hero) and again at the bottom of the page (closing section), and
that each is independently reachable and takes the visitor to the Contact Us page.

**Acceptance Scenarios**:

1. **Given** a visitor is anywhere on the page, **When** they want to start a conversation,
   **Then** they can do so from a call-to-action in the hero without needing to scroll further,
   and it takes them to the Contact Us page.
2. **Given** a visitor reaches the end of the page, **When** they view the closing section,
   **Then** they see a restated summary of the offer and a clear call-to-action that also takes
   them to the Contact Us page — the same destination as the hero's call-to-action, not a direct
   email action.

---

### User Story 4 - Read the page comfortably on any device (Priority: P1)

A visitor opens the Services page on a phone, a tablet, or a desktop browser. Regardless of
device, they need the hero, the three overview cards, all three service detail sections, and the
closing call-to-action to be fully visible, correctly arranged, and easy to interact with — no
overlapping content, no horizontal scrolling, no clipped elements.

**Why this priority**: A meaningful share of visits to a marketing page happen on mobile. If the
page breaks or becomes hard to use at those widths, the core content (Stories 1–3) never
effectively reaches those visitors.

**Independent Test**: Can be fully tested by loading the Services page at common mobile
(~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths and verifying every section
remains readable, correctly laid out, and fully interactive at each size.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a mobile-width screen, **When** the page renders,
   **Then** the three overview cards, the per-service capability/approach grids, and the image +
   text detail rows collapse into a single readable column, with no overlapping text, no clipped
   content, and no horizontal scrolling.
2. **Given** a visitor opens the page on a tablet-width screen, **When** the page renders, **Then**
   sections use an intermediate column layout appropriate to the available width, remaining fully
   readable and correctly spaced.
3. **Given** a visitor opens the page on a desktop-width screen, **When** the page renders,
   **Then** all sections use their full multi-column layout as designed, centered and constrained
   to a readable maximum width.

---

### Edge Cases

- What happens when a service's supporting image has not yet been supplied? The section MUST
  still render with a clear placeholder in place of the missing image, without breaking the
  surrounding layout.
- What happens when a visitor navigates directly to one service's detail section via a shared
  in-page link (e.g., a link straight to the Quality Engineering section)? The page MUST scroll to
  and display that section correctly on initial load.
- How does the page behave if entrance/reveal animations fail to run or are disabled (e.g.,
  reduced-motion preference, slow device)? All content MUST still become fully visible and
  readable, not remain hidden or stuck mid-transition.
- How does the page behave on narrow (mobile) screens? All sections MUST reflow into a
  single-column, readable layout rather than clipping, overlapping, or requiring horizontal
  scrolling.
- What happens if a visitor interacts with the overview cards or in-page navigation using only a
  keyboard? Each card and anchor link MUST be reachable and operable via keyboard, with a visible
  focus indicator.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Services page MUST present an introductory hero section stating TechGrit's
  overall service positioning, with a short supporting description, a primary call-to-action that
  navigates to the Contact Us page, and a secondary action that leads into the service
  overview/detail content.
- **FR-002**: The page MUST present exactly three service overview cards — UI/UX Design, Software
  Product Engineering, and Quality Engineering — each showing a sequence label, a title, a
  one-line description, and a supporting image.
- **FR-003**: Each service overview card MUST link to that same service's own detail section
  further down the page, without requiring a full page reload.
- **FR-004**: The page MUST present one detail section per service (three total: UI/UX Design,
  Software Product Engineering, Quality Engineering), each consisting of a category label, a
  heading, a supporting description, and a supporting image.
- **FR-005**: Each service detail section MUST present a structured list of supporting items
  relevant to that service — either an ordered set of approach steps (as for UI/UX Design) or a
  set of labeled capabilities (as for Software Product Engineering and Quality Engineering) — each
  item carrying at least a title and a short description.
- **FR-006**: The image and text content within each service detail section MUST be arranged
  side-by-side on wide screens — text on the left, image on the right, consistently across all
  three service sections — and MUST stack into a single readable column (text above image) on
  narrow screens.
- **FR-007**: The page MUST end with a closing call-to-action section restating the offer and
  providing a clear, actionable call-to-action that also navigates to the Contact Us page — the
  same destination as the hero's call-to-action, not a direct email/mailto action.
- **FR-008**: All in-page navigation controls (overview card links, any anchor links into service
  sections) MUST be operable using only a keyboard, with a visible focus state, and MUST expose an
  accessible name to assistive technology.
- **FR-009**: The page MUST remain fully readable, correctly laid out, and navigable across common
  desktop, tablet, and mobile screen widths, with each multi-column section (overview cards,
  per-service capability/approach grids, image + text detail rows) adapting its column count to
  the available width rather than using one fixed layout for all devices.
- **FR-010**: Any section that depends on an image (overview cards, service detail sections) MUST
  show a descriptive placeholder when the image is unavailable, rather than a broken or empty
  layout.
- **FR-011**: The Services page MUST reuse the site's existing shared header and footer components
  rather than defining its own; this feature's scope is limited to the page's own content between
  the header and footer.
- **FR-012**: The content for each section (hero, overview cards, service detail sections, closing
  call-to-action) MUST be sourced from a structured, ordered content definition rather than
  hard-coded, one-off markup, so content can be updated without restructuring the page.

### Key Entities

- **Service Overview Card**: A single entry in the top overview grid — has a sequence label (e.g.,
  "Service 01"), a title, a one-line description, a supporting image, and a link to its matching
  detail section.
- **Service Detail Section**: The full write-up for one service — has a category label, a heading,
  a description, a supporting image positioned to the right of the text on wide screens
  (consistently across all three sections), and an ordered list of supporting items.
- **Service Supporting Item**: A single approach step or capability listed within a service detail
  section — has a title and a short description, and, when part of an ordered approach, a step
  number.
- **Page Call-To-Action**: A single actionable prompt to start a conversation — has a label and
  navigates to the Contact Us page; appears at least in the hero and in the closing section, both
  sharing the same destination.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify all three of TechGrit's core service areas within
  the first two screens of the page (hero and overview), without needing to reach the detail
  sections.
- **SC-002**: A visitor can reach any one specific service's full detail section from the top
  overview cards in a single interaction.
- **SC-003**: All three service detail sections (UI/UX Design, Software Product Engineering,
  Quality Engineering) render their full supporting content — heading, description, image, and
  list of supporting items — correctly and legibly at desktop, tablet, and mobile widths, with no
  horizontal scrolling, overlapping content, or clipped text at any of the three.
- **SC-004**: A visitor can locate and activate a way to start a conversation from at least two
  distinct points on the page (the hero and the closing section) without needing to scroll back to
  the top.
- **SC-005**: The page remains fully readable — no missing, broken, or blocked content — even when
  service images have not yet been supplied or entrance animations do not run.

## Assumptions

- **Scope is exactly the three services shown in the reference file** — UI/UX Design, Software
  Product Engineering, and Quality Engineering. Adding, removing, or reordering service categories
  is out of scope for this feature.
- **Header and footer are out of scope.** They were already delivered as a shared, reusable global
  layout by feature TMS-63 (`specs/TMS-63`); this feature only builds the Services page's own
  content and reuses those components as-is. Note: TMS-63's spec described the footer's
  quick-link group as varying per page (its FR-008), but the shipped `Footer`/`footer-config.ts`
  currently renders one fixed set of quick links on every page, with no per-route mechanism yet.
  Reconciling that gap is outside this feature's scope; this feature does not modify the footer.
- **Both calls-to-action share one destination.** Per the 2026-07-15 clarification, the hero's and
  the closing section's "Schedule a Consultation" calls-to-action both navigate to the Contact Us
  page. This is an intentional deviation from the reference file, where the closing section's
  action opens a direct email/mailto action instead — that behavior is not carried into this spec.
- **Reveal/entrance animations are decorative.** Per the Edge Cases above, all content must be
  fully visible and readable whether or not those animations run, so no functional requirement
  depends on them.
- **Per-service supporting items differ in shape by design**: the UI/UX Design section presents an
  ordered sequence of approach steps because the reference content frames it as a process with a
  meaningful order, while the Engineering and Quality Engineering sections present an unordered set
  of labeled capabilities because their reference content is a set of capabilities, not a sequence.

## Review of Existing Feature Directories

Before creating this specification, the existing `specs/` folders were reviewed:

- **`specs/002-services-page/`** — created previously, empty (no `spec.md` or other files). This
  appears to be an earlier, abandoned attempt to start this same feature under the numbered
  `NNN-short-name` directory convention used by the `/speckit.specify` script's auto-numbering.
  Superseded by this directory; no content was carried over because none existed.
- **`specs/001-contact-us-page/`** and **`specs/contact-page/`** — both also empty, appearing to be
  similarly abandoned early attempts predating the Contact Us page's actual spec work.
- **`specs/TMS-63/`** — the most recently completed, fully-populated feature spec (Global Header &
  Footer Layout), using the `TMS-<ticket-number>` directory naming convention directly (no numeric
  prefix). This feature follows that same convention for consistency, since it matches this
  project's active branch naming (`feature/TMS-66-services-overview-page`) and Jira ticket
  numbering.
- No content from any empty folder was needed or reused; they are left in place for the user to
  clean up if desired, rather than deleted as part of this specification work.
