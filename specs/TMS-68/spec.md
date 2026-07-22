# Feature Specification: Case Studies Listing & Detail Pages

**Feature Branch**: `TMS-68`
**Created**: 2026-07-17
**Status**: Draft
**Input**: User description: "Consider the case studies.dc.html and case study.dc.html files as reference which are under raw-files folder — create a specification covering all case-studies page related sections, reusing the existing shared header/footer (no changes to them), content static for now but structured so it can become dynamic later — analyze only the *.dc.html files under raw-files/** — treat as TMS-68"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the case studies and find one worth reading (Priority: P1)

As a site visitor evaluating TechGrit, I want to see an overview of their case studies — one
spotlighted example plus a browsable set of others — so I can quickly find the ones most relevant
to my industry or interest and open them.

**Why this priority**: This is the entry point to all case-study content. Without a working list,
no individual case study is discoverable. This is the minimum viable slice.

**Independent Test**: Load the case-studies list page and confirm it shows an introductory hero, one
featured case study, and a grid of the remaining case studies, and that clicking any of them opens
that case study's own detail page.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the case-studies list page, **When** the page loads, **Then** they
   see an introductory hero (heading and supporting copy), one visually distinct featured case
   study, and a grid of the remaining case studies — each showing an industry/category, a headline
   metric, a title, and a short description.
2. **Given** the list page, **When** a visitor clicks the featured case study or any grid card,
   **Then** they are taken to that specific case study's own detail page.
3. **Given** the list page, **When** a visitor reaches the end of the content, **Then** they see a
   call-to-action inviting them to get in touch.

---

### User Story 2 - Read a full case study before reaching out (Priority: P1)

As a visitor deciding whether to work with TechGrit, I want to read a case study's complete story —
who the client was, what they struggled with, how TechGrit approached it, and what came of it —
along with supporting numbers, so I can judge relevant expertise and results before contacting them.

**Why this priority**: The detail page is where a visitor's evaluation actually happens; the list
page only gets them there. Both are needed for a viable case-studies section, but the detail page
carries the persuasive substance.

**Independent Test**: Open a case study's detail page directly and confirm it independently shows
the full story (title, summary, metrics, background, challenge, approach, outcome, team) and a way
to get in touch — without needing to have come from the list page first.

**Acceptance Scenarios**:

1. **Given** a case-study detail page, **When** it loads, **Then** the top of the page shows the
   case study's title, a one-paragraph summary, its published date, and its industry/category tag.
2. **Given** a case-study detail page, **When** it loads, **Then** a scannable strip of key
   engagement metrics (e.g., team size, engagement duration, outcome figures) is shown.
3. **Given** a case-study detail page, **When** a visitor reads down the page, **Then** they find
   clearly labeled sections for the client's background, the challenge faced, the approach taken
   (which may include a visual breakdown of the solution), and the resulting outcome.
4. **Given** a case-study detail page, **When** it loads, **Then** a supporting panel shows the
   engagement's team composition (roles and headcount) alongside a call-to-action to start a
   project.
5. **Given** a case-study detail page, **When** a visitor reaches the end of the content, **Then**
   they see the same get-in-touch call-to-action used on the list page.

---

### User Story 3 - Keep exploring after finishing a case study (Priority: P2)

As a visitor who just finished one case study, I want to see other related case studies and a clear
way back to the full list, so I can keep browsing TechGrit's work without extra effort.

**Why this priority**: This extends engagement once a visitor is already reading, but the detail
page still delivers its core value (User Story 2) without it. It's a valuable addition, not a
blocker.

**Independent Test**: From a case-study detail page, confirm a "back to all case studies" link and a
"more case studies" section are both present and each lead to the expected destination.

**Acceptance Scenarios**:

1. **Given** a case-study detail page, **When** it loads, **Then** a link back to the full
   case-studies list is visible near the top of the page.
2. **Given** a case-study detail page, **When** a visitor scrolls near the end of the main content,
   **Then** they see a small set of other case studies they can open next.
3. **Given** the "back to all case studies" link or a related case study, **When** a visitor clicks
   it, **Then** they land on the corresponding list or detail page.

---

### User Story 4 - Usable on a phone (Priority: P3)

As a visitor on a phone, I want the case-studies list and detail pages to stay fully readable and
usable, so a smaller screen doesn't break the layout or hide content.

**Why this priority**: This is an adaptation of the same content and functionality already
delivered by the higher-priority stories, not new capability, so it's sequenced last.

**Independent Test**: Resize the viewport to a phone width (or use a phone) on both the list page and
a detail page and confirm every section remains fully readable, with multi-column layouts
collapsing to a single column and no content clipped, overlapping, or requiring horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a visitor on a narrow/phone-width screen, **When** the list page renders, **Then** the
   case-study grid collapses to a single column with no overlapping or clipped content.
2. **Given** a visitor on a narrow/phone-width screen, **When** a detail page renders, **Then** the
   metrics strip, the two-column body, and the team panel each collapse to a single readable
   column, with the team panel appearing in the reading flow rather than pinned to the side.

---

### Edge Cases

- What happens when a visitor opens a case-study detail URL directly (not via the list page)? The
  page MUST still render completely, including its own header, footer, back-to-list link, and
  get-in-touch call-to-action.
- What happens if a requested case study no longer exists or its identifier is invalid? The system
  MUST show a clear "not found" outcome rather than a blank or broken page.
- What happens when a case study's title or description is unusually long or short? Card and hero
  layouts MUST remain readable without overlapping or cutting off text.
- What happens if there are too few case studies to fill a full grid row, or too few to populate the
  "related case studies" section? The layout MUST still render cleanly without leaving obviously
  broken gaps or duplicate/empty placeholders.
- What happens when a visitor has animations/motion disabled, or a script fails to run? All hero,
  card, and section content MUST still become fully visible — entrance animations MUST NOT be the
  only way content becomes visible.
- What happens on a touch-only device where hover isn't available? Every card and link MUST be
  fully operable by tap alone.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a case-studies list page that opens with an introductory hero
  section (an eyebrow label, a heading, and supporting copy describing the case-studies section).
- **FR-002**: The list page MUST present exactly one case study as a featured/spotlighted entry,
  visually distinct from the rest, showing its industry/category, a headline metric, a title, a
  short description, and a link into its own detail page.
- **FR-003**: The list page MUST present the remaining case studies in a browsable grid, each
  showing its industry/category, a metric or visual highlight, a title, a short description, and a
  link into its own detail page.
- **FR-004**: Every case study shown on the list, featured or in the grid, MUST link to its own
  dedicated detail page containing that case study's full story.
- **FR-005**: Each case-study detail page MUST show, near the top, the case study's title, a
  one-paragraph summary, its published date, and its industry/category tag.
- **FR-006**: Each case-study detail page MUST show a set of key engagement metrics (e.g., team
  size, engagement duration, outcome figures) presented as a scannable strip of 3-4 numbers.
- **FR-007**: Each case-study detail page MUST present the case study's full narrative in clearly
  labeled sections: client background, the challenge faced (which may include a short list of
  specific pain points), the approach taken (which may include a visual breakdown of the solution's
  components), and the resulting solution/outcome.
- **FR-008**: Each case-study detail page MUST show the engagement's team composition (a list of
  roles and their headcount) in a supporting panel alongside the main narrative, together with a
  call-to-action to start a project.
- **FR-009**: Each case-study detail page MUST include a link back to the full case-studies list,
  and a "more case studies" section suggesting a small set of other case studies to read next.
- **FR-010**: Both the case-studies list page and every case-study detail page MUST end with the
  same get-in-touch call-to-action banner already used elsewhere on the site.
- **FR-011**: Both the case-studies list page and every case-study detail page MUST use the site's
  existing shared header and footer exactly as they already appear across the rest of the site,
  with no changes to their content, structure, or behavior.
- **FR-012**: Case-study content — both the list entries and each detail page's full content — MUST
  be structured as a defined, repeatable set of case-study records (not one-off, hand-built page
  markup per case study), so that the section layout and navigation do not need to change when
  case-study content later moves to a manageable/dynamic content source.
- **FR-013**: The list page and every detail page MUST reflow to remain fully readable on both
  mobile-width and desktop-width screens: the list's grid, the detail page's metrics strip, and the
  detail page's two-column body MUST collapse to a single readable column on narrow screens, and any
  side panel that is pinned in place on wide screens MUST resume normal in-flow placement on narrow
  screens.
- **FR-014**: Entrance/reveal animations on these pages MUST NOT be the sole means by which content
  becomes visible — all content MUST render fully visible even if animations are disabled, skipped,
  or fail to run.
- **FR-015**: Every case-study card and link MUST be operable via keyboard alone and via tap on
  touch devices, and MUST expose an accessible name to assistive technology.
- **FR-016**: When a case-study detail page is requested for an identifier that does not correspond
  to any existing case study, the system MUST present a clear "not found" outcome rather than a
  blank, broken, or mismatched page.

### Key Entities

- **Case Study**: A single client engagement story — has a unique identifier, a title, a one-line
  and a one-paragraph summary, an industry/category, a published date, a featured flag, a headline
  metric, narrative sections (client background, challenge points, approach/architecture narrative,
  solution/outcome narrative), a list of at-a-glance metrics (label + value pairs), a team
  composition (role + headcount pairs), and references to related case studies.
- **Industry/Category Tag**: The label (and associated visual accent) used to classify a case study
  on both the list and detail views, and to group related case studies.
- **Metric**: A label-and-value pair representing a quantifiable highlight — used for the featured
  card's headline stat, each grid card's metric, and the detail page's metrics strip.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can go from the case-studies list to reading any individual case study's
  full story in a single click, on both desktop and mobile screen widths.
- **SC-002**: Every case study shown on the list — featured or in the grid — has a working link that
  opens a detail page showing that same case study's own content, with no dead or mismatched links.
- **SC-003**: From any case-study detail page, a visitor can return to the full list or move to a
  related case study within a single click, without relying on the browser's back button.
- **SC-004**: The case-studies list and every detail page render with no clipped, overlapping, or
  missing content across the full supported range of screen widths, from the narrowest supported
  phone width to wide desktop widths.
- **SC-005**: Replacing today's fixed case-study content with content from a future managed content
  source requires no change to the pages' section layout, structure, or navigation — only the
  underlying case-study values change.
- **SC-006**: The case-studies list and detail pages show the identical shared header and footer
  used on the rest of the site, with zero visual or navigational differences.

## Assumptions

- The reference detail-page file provides one fully narrated case study, while the list page's
  other case-study cards currently carry only short teaser copy (industry, title, description,
  metric) with no full narrative behind them — and, in the reference files, every case-study card on
  the list links to that same single detail-page template. This specification follows that same
  pattern for the current static phase: every listed case study is expected to open a detail page
  using the full section structure (background/challenge/approach/outcome/metrics/team), populated
  with the one available fully-narrated example as placeholder content wherever a case study's own
  real narrative doesn't yet exist. Real, distinct narrative content for each case study is expected
  to arrive once the future dynamic content source is in place.
- Exactly one case study is "featured" on the list at any time, matching the single spotlighted
  entry shown in the reference file.
- The "more case studies" section on a detail page shows a small representative subset (three,
  matching the reference file) rather than an exhaustive list, and excludes the case study currently
  being viewed.
- No filtering, search, sorting, or pagination controls are in scope for the list page — the
  reference file shows a single flat introductory hero plus featured entry plus grid, with no such
  controls.
- The header and footer used on these pages are the already-implemented shared components from the
  site's global layout; this feature makes no changes to their content, structure, or behavior.
- "Published date" and industry/category tag values shown on the detail page are per-case-study
  content, not fixed text — they vary with whichever case study is being viewed. 
