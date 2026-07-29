# Feature Specification: Careers Page

**Feature Branch**: `TMS-74`
**Created**: 2026-07-27
**Status**: Draft
**Input**: User description: "You are an experienced frontend architect responsible for implementing this application using Next.js. You are task is to analyze the reference HTML located at raw-files/TechGrit careers.dc.html This HTML file is ONLY the source of truth. Do not rely on assumptions, interpretations, inferred design decisions, implementation, or visual approximations. Every layout, spacing, typography, color, border, shadow, radius, images, icon and more — every structural detail must be extracted directly from the HTML and its associated styles. The final Next.js implementation must be visually indistinguishable from the reference HTML, with zero intentional visual deviation. Do not redesign, modernize, simplify, or optimize the UI, and do not introduce new features unless explicitly requested. Reuse existing reusable components instead of duplicating code; only create new reusable components where none already exist. The Careers page contains: a Hero section with a careers badge, large heading, primary CTA, secondary CTA, and a right-side image collage (exact layout, sizing, alignment, and arrangement preserved — no rearranging or resizing); a metrics/stats section matching the HTML's typography, gaps, and responsive behavior; a \"Why people join and stay\" section using a reusable card component (title, icon, description) preserving card dimensions, padding, border, radius, and typography; an Open Roles section with functional capsule filters (All, Engineering, Design, Quality, Product) preserving exact sizing, spacing, active/hover styling and transitions; job role cards (as a reusable component) showing position, department, location, employment type, and an Apply action — replacing the reference's mailto behavior with a reusable dialog/modal reusing existing form patterns (Button.tsx, form fields), collecting first name, last name, email address, phone number, and a \"tell us why you're a great fit\" message, with Submit and Cancel actions, and the target position name shown in the dialog's top-left so the selection can later be associated with a backend submission; a \"Life at TechGrit\" section reusing the existing homepage implementation (made configurable via props if necessary, no duplication) with this page's own content; and a closing CTA section (heading, description, \"Send your resume\" button) whose mailto behavior is replaced by opening the same application dialog as a general application (no position name) instead. The shared header and footer must be reused unchanged. Follow modern Next.js best practices: reusable/modular component architecture, clean and maintainable code, consistent naming, props-driven configurability, a clear split between shared and feature-specific components, and a scalable organization for long-term maintenance — reusing components already in components/ui and other reusable-component locations rather than duplicating them. Since the backend is not ready yet, everything is built static for now but structured so it can become dynamic later. Treat this work as TMS-74 and generate the specification following the project's spec-driven development conventions."

## Clarifications

### Session 2026-07-28

- Q: The `Application Submission` entity needs a "role reference" (FR-012), but how is a role identified — a stable id/slug, or just its display title text? → A: Each Open Role gets a stable, unique identifier (e.g., a slug) separate from its display title; the submission stores that identifier.
- Q: What happens immediately after a successful submission — does the dialog stay open, or close in favor of a separate confirmation? → A: The dialog stays open; its form is replaced by an on-page success message inside the dialog, and the visitor closes it manually.
- Q: Do backdrop click and the Escape key dismiss the application dialog the same way Cancel does? → A: Yes — backdrop click and Escape both dismiss the dialog exactly like Cancel, discarding any entered data.
- Q: Are an Open Role's `location` and `employment type` constrained to a fixed enum, or free text? → A: Both are free-text strings, set independently per role in the static content list.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse open roles and apply (Priority: P1)

A job seeker visits the Careers page to see what positions are currently open at TechGrit. They
want to narrow the list down to the kind of work they do (for example, only Engineering roles),
then quickly express interest in a specific role without leaving the page or opening their email
app.

**Why this priority**: This is the page's core conversion action — everything else on the page
exists to build enough trust and interest to get a visitor to this point. Without a working,
on-page way to apply, the page cannot fulfill its purpose.

**Independent Test**: Can be fully tested by loading the Careers page, selecting a department
filter and verifying the role list narrows accordingly, then selecting a role's Apply action,
filling out the resulting dialog, and submitting it — verifying an on-page confirmation appears
and no email client is launched.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the Open Roles section, **When** no filter is selected, **Then**
   every listed role is visible, "All" is the active filter, and each role card shows its position
   title, department, location, employment type, and an Apply action.
2. **Given** a visitor selects the "Engineering" filter, **When** the selection changes, **Then**
   only Engineering-department roles remain visible, the "Engineering" filter is visually
   distinguished as active, and no full-page navigation occurs.
3. **Given** a visitor selects "All" again after narrowing the list, **When** the selection
   changes, **Then** every role reappears.
4. **Given** a visitor selects a role's Apply action, **When** the dialog opens, **Then** it shows
   that role's exact position title in its top-left area and presents fields for first name, last
   name, email address, phone number, and a message describing why they're a great fit, along with
   Submit and Cancel actions.
5. **Given** the application dialog is open with all required fields completed, **When** the
   visitor selects Submit, **Then** the dialog's form is replaced by an on-page success message
   inside the dialog, no email client opens, and the submission is associated with that role.
6. **Given** the application dialog is open, **When** the visitor selects Cancel, **Then** the
   dialog closes and no data is submitted.

---

### User Story 2 - Understand why to join TechGrit (Priority: P2)

A visitor evaluating TechGrit as an employer wants a fast sense of the company's scale and culture
— team size, work style, shipping speed — and the concrete reasons people choose to stay, before
they commit time to browsing individual roles.

**Why this priority**: This context builds the trust and interest that leads a visitor into Story
1. The page still functions without it, but conversion to an application is weaker without this
supporting evidence.

**Independent Test**: Can be fully tested by loading the Careers page and verifying the hero, the
four-statistic metrics strip, and the six "why people join and stay" cards (each with an icon,
title, and description) all render with their full content, independent of the roles list below.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Careers page, **When** the page loads, **Then** they see a
   careers badge, a headline with an accent-highlighted phrase, a supporting statement, a primary
   CTA to open roles, a secondary CTA to the life-at-TechGrit content, and an image collage.
2. **Given** a visitor scrolls past the hero, **When** they reach the metrics strip, **Then** they
   see exactly four statistics, each with a headline figure and a supporting label.
3. **Given** a visitor reaches the "Why people join — and stay" section, **When** the section
   renders, **Then** they see six cards, each showing an icon, a title, and a description, arranged
   in a consistent grid.

---

### User Story 3 - Explore life at TechGrit (Priority: P2)

A visitor wants to see what day-to-day culture and camaraderie look like at TechGrit — beyond the
job requirements — through a photo collage of the team.

**Why this priority**: Culture proof reinforces the decision to apply but is not the primary
conversion mechanism, so it ranks behind the roles list and its filtering/apply flow.

**Independent Test**: Can be fully tested by scrolling to the "Life at TechGrit" section and
verifying its heading, supporting statement, and photo collage render with this page's own content,
independent of the homepage's version of the same section.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the "Life at TechGrit" section, **When** the section renders,
   **Then** they see a heading, a supporting statement, and an image collage arranged in the same
   pattern used elsewhere on the site, populated with this page's own content.

---

### User Story 4 - Reach out when no listed role fits (Priority: P3)

A visitor who doesn't see an exact match among the open roles still wants a way to express
interest, so they don't have to wait for a future posting.

**Why this priority**: This is a secondary conversion path for a smaller segment of visitors (those
not matched by a current opening); the page delivers its primary value without it.

**Independent Test**: Can be fully tested by scrolling to the closing CTA section, selecting "Send
your resume," and verifying the same application dialog opens but labeled as a general application
(no position name) rather than tied to a specific role.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the closing CTA section, **When** the section renders, **Then** they
   see a heading, a supporting statement, and a "Send your resume" action.
2. **Given** a visitor selects "Send your resume," **When** the dialog opens, **Then** its top-left
   area indicates a general application (no specific position name), and any submission from it
   carries no role reference.

---

### User Story 5 - Use the page comfortably on any device (Priority: P1)

A visitor opens the Careers page on a phone, a tablet, or a desktop browser. Regardless of device,
every section — hero and collage, metrics, benefit cards, filterable role list, application
dialog, life-at-TechGrit collage, and closing CTA — needs to remain fully visible, correctly
arranged, and easy to interact with.

**Why this priority**: A meaningful share of visits happen on mobile, and the page's core value
(Stories 1–4) never reaches those visitors if the layout breaks at smaller widths.

**Independent Test**: Can be fully tested by loading the Careers page at common mobile
(~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths and verifying every section
remains readable, correctly laid out, and fully interactive at each size.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a mobile-width screen, **When** the page renders, **Then**
   the hero collapses to a single column, the benefit-card grid and image collages reflow to fewer
   columns, and role cards stack their content vertically — all without horizontal scrolling or
   overlapping content.
2. **Given** a visitor opens the page on a tablet-width screen, **When** the page renders, **Then**
   the benefit-card grid and collages use an intermediate column count appropriate to the available
   width.
3. **Given** a visitor opens the page on a desktop-width screen, **When** the page renders, **Then**
   all sections use their full multi-column layout, centered and constrained to a readable maximum
   width.

---

### Edge Cases

- What happens when a department filter has no matching roles? The list MUST show a clear message
  indicating no roles match, rather than an empty blank area.
- What happens if a visitor submits the application dialog with a missing or invalid required
  field (e.g., malformed email)? The dialog MUST remain open and show a corrective message, and the
  submission MUST NOT be accepted.
- What happens if a visitor closes the dialog after opening it from one role, then opens it again
  from a different role? The dialog MUST reset to reflect the newly selected role's title and
  context, not the previously opened role's.
- What happens if a visitor opens the dialog from the closing CTA's "Send your resume" action
  after previously opening it from a specific role? The dialog MUST show general-application
  context (no position name), not the earlier role's.
- How does the page behave if entrance/reveal animations fail to run or are disabled (e.g.,
  reduced-motion preference, slow device)? All content MUST still become fully visible and
  readable, not remain hidden or stuck mid-transition.
- What happens when a role's position title is unusually long? The role card's layout MUST remain
  intact (text wraps or is constrained) without breaking alignment or overlapping neighboring
  elements.
- What happens if a visitor interacts with the department filters, role cards' Apply actions, the
  closing CTA's action, or any field inside the application dialog using only a keyboard? Each MUST
  be reachable and operable via keyboard, with a visible focus indicator.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Careers page MUST present a hero section with a careers eyebrow badge, a headline
  with one phrase visually distinguished as an accent, a supporting statement, a primary CTA
  linking to the Open Roles section, a secondary CTA linking to the Life at TechGrit section, and a
  four-image collage arranged with one tall image, two standard images, and one wide image — in
  that exact arrangement, without resizing or reordering.
- **FR-002**: The page MUST present a metrics strip directly below the hero showing exactly four
  statistics, each with a headline figure and a supporting label, in a single row on wide screens.
- **FR-003**: The page MUST present a "Why people join — and stay" section with a heading followed
  by six benefit cards in a grid, each card showing an icon, a title, and a description, with
  consistent dimensions, padding, border, and radius across all six.
- **FR-004**: The page MUST present an Open Roles section with a heading and a row of department
  filter controls: All, Engineering, Design, Quality, and Product.
- **FR-005**: Selecting a department filter MUST immediately narrow the displayed role list to
  roles belonging to that department, without a full page reload; selecting "All" MUST restore
  every role. The active filter MUST be visually distinguished from inactive ones.
- **FR-006**: Each open role MUST render as a single role card showing its position title,
  department, location, employment type, and an Apply action, preserving the reference's layout,
  spacing, and typography.
- **FR-007**: Selecting a role card's Apply action MUST open an on-page application dialog instead
  of launching an external email client.
- **FR-008**: The application dialog MUST display the target position's exact title in its
  top-left area when opened from a specific role's Apply action.
- **FR-009**: The application dialog MUST collect first name, last name, email address, phone
  number, and a free-text message describing why the applicant is a great fit, and MUST present
  Submit and Cancel actions.
- **FR-010**: Submitting the application dialog with all required fields completed MUST replace the
  dialog's form with an on-page success message inside that same dialog, without navigating away
  from the page or opening an email client; the visitor MUST close the dialog manually to return to
  the page.
- **FR-011**: Selecting Cancel, clicking the backdrop overlay, or pressing Escape MUST each close
  the application dialog and discard any entered data without submitting.
- **FR-012**: Every application submission MUST carry a reference to which role it was submitted
  for, using that role's stable unique identifier (or an explicit "no role" indicator for a general
  application), so the submission's context is preserved for future backend association.
- **FR-013**: The "Life at TechGrit" section MUST reuse the same section pattern already used on
  the homepage (heading, supporting statement, image collage), populated with this page's own
  heading, description, and images — not a separate, duplicated implementation.
- **FR-014**: The page MUST present a closing call-to-action section with a heading, a supporting
  statement, and a "Send your resume" action.
- **FR-015**: Selecting "Send your resume" MUST open the same application dialog used by role
  Apply actions, but as a general application: its top-left area MUST indicate a general
  application (no specific position name), and its submission MUST carry no role reference.
- **FR-016**: The Careers page MUST reuse the site's existing shared header and footer components
  unchanged; this feature's scope is limited to the page's own content between them.
- **FR-017**: All interactive controls (department filters, role cards' Apply actions, the closing
  CTA's action, and every field/action inside the application dialog) MUST be operable using only a
  keyboard, with a visible focus state and an accessible name.
- **FR-018**: The page MUST remain fully readable, correctly laid out, and navigable across common
  desktop, tablet, and mobile widths, with the hero, benefit-card grid, image collages, and role
  cards each adapting their layout to the available width rather than using one fixed layout for
  all devices.
- **FR-019**: All role, filter, and benefit-card content MUST be sourced from a structured, ordered
  content definition rather than hard-coded, one-off markup, so content can be updated without
  restructuring the page.
- **FR-020**: The application dialog's Submit action MUST be a client-side-only interaction for
  this feature (no backend persistence), consistent with the project's existing static-content
  conventions, since the backend integration is not yet in place.
- **FR-021**: When a department filter has no matching roles, the list MUST show a clear "no roles"
  message instead of rendering an empty area.

### Key Entities

- **Open Role**: One entry in the filterable role list — has a stable unique identifier (distinct
  from its display title, so submissions remain correctly associated even if a title is later
  edited), a position title, a department (Engineering, Design, Quality, or Product), a free-text
  location, a free-text employment type, and an accent identity used for its status indicator. Each
  role sets its own location and employment type independently — neither is constrained to a fixed
  enum. Sourced from a structured, ordered list; not persisted data.
- **Department Filter**: One selectable control in the filter row — has a label (All, Engineering,
  Design, Quality, Product) and an active/inactive state; the active filter determines which Open
  Roles are visible.
- **Benefit**: One of the six fixed "why people join and stay" highlights — has an icon, a title,
  and a description.
- **Application Submission**: The application dialog's transient interaction state — holds the
  applicant's first name, last name, email, phone, and fit-statement message, a target role
  reference (that role's stable unique identifier, or none for a general application), and a
  submitted/confirmed state once validly submitted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can narrow the open-roles list to a single department and see updated
  results in a single interaction, with no full page reload.
- **SC-002**: A visitor can go from selecting Apply on a role to seeing the in-dialog success
  message for their submitted application in under 90 seconds, with no email client ever opening.
- **SC-003**: Every application submission — whether started from a specific role's Apply action or
  the closing CTA's "Send your resume" action — carries the correct context (the exact role title,
  or none for a general application), verified across all listed roles and the general-application
  entry point.
- **SC-004**: The hero collage, benefit-card grid, role list, and life-at-TechGrit collage each
  render their full content correctly and legibly at desktop, tablet, and mobile widths, with no
  horizontal scrolling, overlapping content, or clipped text at any of the three.
- **SC-005**: A visitor who submits the application dialog with a missing or invalid required field
  is shown a corrective message before any submission is accepted, every time.
- **SC-006**: The page's layout, spacing, typography, colors, and image arrangement show no
  measurable visual deviation from the reference design when compared side by side at matching
  widths.

## Assumptions

- **A new reusable dialog/modal primitive is required.** No Modal or Dialog component exists
  anywhere in the codebase today (`components/ui` or elsewhere). This feature introduces the first
  one, and reuses that single primitive for both the role-specific and general application flows
  rather than building two separate dialogs.
- **The existing `FormField.tsx` has no multi-line variant.** It currently renders a single-line
  `<input>` (usable for name/email/phone), but has no textarea mode. Delivering the "why you're a
  great fit" field requires extending `FormField.tsx` with a textarea variant (or an equivalent
  matching reusable field), rather than hand-rolling one-off markup, to avoid duplicating the
  project's form-field convention.
- **The existing Contact page form is not a drop-in template.** `app/(marketing)/contact/_components/contact-hero-form.tsx`
  hand-rolls its own input/textarea/button markup and does not use `FormField.tsx` or `Button.tsx`.
  The application dialog instead composes `FormField.tsx` (extended) and `Button.tsx` directly, per
  the user's explicit instruction and the project's newer Tailwind-first primitive convention.
- **The "why people join and stay" cards reuse the existing `GlassCard` family**
  (`components/ui/GlassCard.tsx`) — the app's established icon + title + description card pattern
  already used elsewhere (industries, re-imagine, case studies, blog) — rather than a new one-off
  card component.
- **`LifeGallery` (`app/_home-components/LifeGallery.tsx`) needs to become configurable.** Today it
  hardcodes its heading, eyebrow, and description, only externalizing its image list. Reusing it
  for this page's own copy without duplicating the section requires making it accept heading,
  eyebrow, description, and image set as props, per the user's explicit allowance to make it
  configurable "if necessary."
- **Role, department, location, employment-type, and filter data are carried over verbatim as
  static structured content** — the same seven roles and five filter labels (All, Engineering,
  Design, Quality, Product) present in the reference — consistent with the project's documented
  convention that current site content is static configuration, not persisted data.
- **The application dialog's Submit action is a client-side-only visual state transition** (an
  on-page confirmation shown, no network call), consistent with the project's documented Contact
  page behavior, since the backend is not yet ready per the user's explicit instruction. The
  submission's captured fields and role reference are structured so a future backend integration
  can consume them without reshaping this feature's data.
- **First name, last name, email, and the fit-statement message are required before Submit
  succeeds; phone number is collected as free text with no format/country enforcement beyond basic
  presence.** The reference file has no validation logic of its own to derive stricter rules from,
  so this follows typical job-application form conventions.
- **This project's canonical breakpoints (`lg` 1140px, `md` 960px, `sm` 560px) already match the
  reference's own responsive breakpoints** for this page (1140px, 960px, 560px), so no breakpoint
  remapping is needed, unlike prior features that had to translate a reference's arbitrary pixel
  values onto the canonical set.
- **Header and footer are fully out of scope.** They were already delivered as a shared, reusable
  global layout by feature TMS-63 (`specs/TMS-63`); this feature only builds the Careers page's own
  content and reuses those components as-is.
- **Reveal/entrance animations are decorative.** Per the Edge Cases above, all content must be fully
  visible and readable whether or not those animations run, so no functional requirement depends on
  them, mirroring the precedent set for the Blog page (TMS-69).
