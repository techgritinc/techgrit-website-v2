# Feature Specification: Blog Page

**Feature Branch**: `TMS-69`
**Created**: 2026-07-21
**Status**: Draft
**Input**: User description: "Build the blog page using this page \"C:\techgrit\Techgrit website\TechGrit Website V2\TechGrit Blog.dc.html\", consider this as the source of truth. Reuse the existing shared componets,dsign system,project constitution and coding standards. analayze the complete reference before generating spec, capture every section,componets and ui elements. match the reference asaccurate as possible (layout,spacing,sizing,typography,colors,borders,shadows,radii,images,icons,alignment and responsive behaviurs). dont guess anything if anything is unclear document as assummption instead of guessing, follow the techstack stack of the project"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Get oriented on arrival (Priority: P1)

A visitor lands on the Blog page for the first time. Within the opening view, they need to
immediately understand this is TechGrit's editorial content hub and what kind of topics it covers,
so they can decide whether to keep reading.

**Why this priority**: This is the entry point of the whole page. Without a clear identity and
topic promise, visitors have no reason to keep scrolling into the featured story or the post grid.

**Independent Test**: Can be fully tested by loading the Blog page and verifying an eyebrow label
identifying the page as TechGrit's blog, a headline stating the page's editorial focus, and a
supporting statement are all present and readable, independent of any post content further down
the page.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Blog page, **When** the page loads, **Then** they see an eyebrow
   label identifying it as TechGrit's blog, a headline describing the page's editorial focus (with
   its accent phrase visually distinguished from the rest of the headline), and a supporting
   sentence beneath it.

---

### User Story 2 - Discover the flagship story immediately (Priority: P1)

A visitor who has just arrived wants to see TechGrit's most important or most recent piece of
writing without having to scan the whole grid, so they can quickly gauge the quality and depth of
the content before committing time to browse further.

**Why this priority**: The featured story is the page's strongest piece of social proof — it's the
first full piece of content a visitor evaluates, and it anchors their expectation for everything
else on the page.

**Independent Test**: Can be fully tested by verifying a single, visually distinct featured-story
panel appears directly beneath the hero, showing a topic label, headline, excerpt, author identity
(name, role, estimated read time), and a "Read article" action — independent of the filterable
grid below it.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls past the hero, **When** they reach the featured-story panel,
   **Then** they see its topic label, full headline, excerpt, author's name and role, an estimated
   read time, and a "Read article" action, alongside a decorative supporting visual.
2. **Given** a visitor activates the featured-story panel, **When** they select it, **Then** the
   whole panel is a single actionable target (not just the "Read article" text).

---

### User Story 3 - Browse and narrow posts by topic (Priority: P1)

A visitor wants to scan all of TechGrit's posts, and optionally narrow the list down to just the
topic they care about (for example, only "Engineering" posts), so they can find relevant content
faster than reading every entry.

**Why this priority**: The post grid and its topic filter are the page's core browsing mechanism —
without them, a visitor can only ever see the one featured story and has no way to explore the rest
of the content.

**Independent Test**: Can be fully tested by loading the Blog page, verifying every topic filter
control and the full unfiltered post grid render correctly, then selecting a single topic and
verifying the grid updates to show only posts of that topic, with no full page reload.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the post grid, **When** no topic filter is selected, **Then** every
   available topic control is visible (including an "All" option that is selected by default) and
   every post renders as a card showing its topic label, title, excerpt, and author identity
   (name, initials, publish date, read time).
2. **Given** a visitor selects a single topic filter, **When** the selection changes, **Then** only
   posts matching that topic remain visible in the grid, the selected filter is visually
   distinguished from the others, and no full-page navigation occurs.
3. **Given** a visitor has narrowed the grid to one topic, **When** they select "All" again,
   **Then** every post reappears in the grid.
4. **Given** a visitor activates any post card, **When** they select it, **Then** the whole card is
   a single actionable target (not just its title).

---

### User Story 4 - Subscribe to get future posts by email (Priority: P2)

A visitor who has been reading wants a low-effort way to be notified the next time TechGrit
publishes, without having to remember to check back.

**Why this priority**: This is the page's conversion point. The page still delivers its core
reading value without it (Stories 1–3), but it's what turns a one-time visit into an ongoing
relationship.

**Independent Test**: Can be fully tested by locating the subscribe panel near the end of the
page, submitting a valid work email and verifying a confirmation state replaces the form, and
separately submitting an invalid email and verifying an inline error appears without navigating
away.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the subscribe panel, **When** they submit a validly formatted email
   address, **Then** the form is replaced with an on-page confirmation message and no page
   navigation occurs.
2. **Given** a visitor reaches the subscribe panel, **When** they submit an invalid or empty email
   address, **Then** the form remains visible and an inline message tells them to enter a valid
   email, without navigating away.

---

### User Story 5 - Read comfortably on any device (Priority: P1)

A visitor opens the Blog page on a phone, a tablet, or a desktop browser. Regardless of device, the
hero, featured story, topic filters, post grid, and subscribe panel need to be fully visible,
correctly arranged, and easy to interact with — no overlapping content, no horizontal scrolling, no
clipped elements.

**Why this priority**: A meaningful share of visits to a content/marketing page happen on mobile.
If the page breaks or becomes hard to use at those widths, the core content (Stories 1–4) never
effectively reaches those visitors.

**Independent Test**: Can be fully tested by loading the Blog page at common mobile (~375–430px),
tablet (~768–1024px), and desktop (~1280px+) widths and verifying every section remains readable,
correctly laid out, and fully interactive at each size.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a mobile-width screen, **When** the page renders, **Then**
   the featured-story panel stacks its text above its visual, the subscribe panel stacks its text
   above its form, and the post grid collapses to a single column — all with no overlapping text,
   no clipped content, and no horizontal scrolling.
2. **Given** a visitor opens the page on a tablet-width screen, **When** the page renders, **Then**
   the post grid uses an intermediate multi-column layout appropriate to the available width,
   remaining fully readable and correctly spaced.
3. **Given** a visitor opens the page on a desktop-width screen, **When** the page renders, **Then**
   all sections use their full multi-column layout as designed, centered and constrained to a
   readable maximum width.

---

### Edge Cases

- What happens when a topic filter has no matching posts? The grid MUST show a clear message
  indicating no posts match, rather than an empty blank area.
- How does the page behave if entrance/reveal animations fail to run or are disabled (e.g.,
  reduced-motion preference, slow device)? All content MUST still become fully visible and
  readable, not remain hidden or stuck mid-transition.
- How does the page behave on narrow (mobile) screens? All sections MUST reflow into a
  single-column, readable layout rather than clipping, overlapping, or requiring horizontal
  scrolling.
- What happens if a visitor interacts with the topic filters, the featured panel, post cards, or
  the subscribe form using only a keyboard? Each MUST be reachable and operable via keyboard, with
  a visible focus indicator.
- What happens when a post's title or excerpt is unusually long? The card layout MUST remain
  intact (text wraps or is constrained) without breaking the grid's alignment or overlapping
  neighboring cards.
- What happens if a visitor submits the subscribe form multiple times in a row? Each submission
  MUST be independently validated; a prior success state MUST NOT block a later attempt from
  a cleared form.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Blog page MUST present a hero section with an eyebrow label identifying the page
  as TechGrit's blog, a headline describing the page's editorial focus (with one phrase visually
  distinguished as an accent), and a supporting statement beneath it.
- **FR-002**: The page MUST present exactly one featured-story panel directly beneath the hero,
  showing a topic label, headline, excerpt, author identity (name, role, estimated read time), and
  a "Read article" action, distinct from and unaffected by the topic filter and post grid below it.
- **FR-003**: The featured-story panel MUST be a single actionable target (its full visual area,
  not only its "Read article" text) that links to that story's own article page.
- **FR-004**: The page MUST present a set of topic filter controls, including an "All" option
  selected by default, covering every topic present among the post grid's content.
- **FR-005**: Selecting a topic filter MUST immediately narrow the post grid to only posts of that
  topic, without a full page reload; selecting "All" MUST restore every post to the grid. The
  currently selected filter MUST be visually distinguished from the others.
- **FR-006**: The page MUST present a grid of post cards, each showing a topic label, title,
  excerpt, and author identity (name, initials, publish date, and estimated read time), reflecting
  only the posts matching the current topic filter.
- **FR-007**: Each post card in the grid MUST be a single actionable target (its full visual area,
  not only its title) that links to that post's own article page.
- **FR-008**: The page MUST present a subscribe panel with a headline, supporting copy, an email
  input, and a submit action.
- **FR-009**: Submitting the subscribe form with a validly formatted email MUST replace the form
  with an on-page confirmation state, without navigating away from the page.
- **FR-010**: Submitting the subscribe form with an invalid or empty email MUST keep the form
  visible and show an inline message describing the problem, without navigating away from the
  page.
- **FR-011**: All post content (the featured story, every grid post, and the set of topic filters)
  MUST be sourced from a structured, ordered content definition rather than hard-coded, one-off
  markup, so content can be updated without restructuring the page.
- **FR-012**: The Blog page MUST reuse the site's existing shared header and footer components
  rather than defining its own; this feature's scope is limited to the page's own content between
  the header and footer.
- **FR-013**: All interactive controls on the page (topic filters, the featured-story link, every
  post card link, and the subscribe form's input and submit action) MUST be operable using only a
  keyboard, with a visible focus state, and MUST expose an accessible name to assistive technology.
- **FR-014**: The page MUST remain fully readable, correctly laid out, and navigable across common
  desktop, tablet, and mobile screen widths, with each multi-column section (the featured-story
  panel, the topic filter row, the post grid, the subscribe panel) adapting its layout to the
  available width rather than using one fixed layout for all devices.
- **FR-015**: When a topic filter has no matching posts, the grid MUST show a clear "no posts"
  message instead of rendering an empty area.

### Key Entities

- **Featured Post**: The single, editorially curated flagship entry shown directly beneath the
  hero — has a topic label, headline, excerpt, author (name, role), estimated read time, a
  supporting decorative visual, and a link to its own article page. Authored independently of the
  filterable grid list; it is not automatically derived from it.
- **Blog Post (grid item)**: One entry in the filterable grid — has a topic, an accent identity
  used for its cover treatment, a title, an excerpt, an author (name, initials), a publish date, an
  estimated read time, and a link to its own article page.
- **Topic Filter**: One selectable control in the filter row — has a label (e.g., "All",
  "Engineering") and an active/inactive state; the active filter determines which Blog Posts are
  visible in the grid.
- **Newsletter Subscription**: The subscribe panel's transient interaction state — holds the
  entered email value, a validation/error message when invalid, and a submitted/confirmed state
  once a valid email has been submitted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the blog's editorial focus and read the full
  featured-story summary within the first two screens of the page (hero and featured panel),
  without needing to reach the post grid.
- **SC-002**: A visitor can narrow the post grid to a single topic and see the updated results in a
  single interaction, with no full page reload.
- **SC-003**: The featured-story panel and every post card in the grid render their full content —
  topic label, title/headline, excerpt, and author identity — correctly and legibly at desktop,
  tablet, and mobile widths, with no horizontal scrolling, overlapping content, or clipped text at
  any of the three.
- **SC-004**: A visitor can submit a valid work email in the subscribe panel and receive on-page
  confirmation in a single interaction, without leaving the page.
- **SC-005**: A visitor who submits an invalid email is shown a corrective message before any
  navigation occurs, every time.
- **SC-006**: The page remains fully readable — no missing, broken, or blocked content — even when
  entrance animations do not run.

## Assumptions

- **Individual post/article pages are out of scope for this feature.** The featured-story panel
  and every grid post card link to that story's own article page, but building that article page's
  template and content is not part of this feature — only the destination structure. This mirrors
  an existing pattern already shipped on the homepage, where the Case Studies cards link to
  `/case-studies` (`app/_home-components/CaseStudiesSection.tsx`) even though that page has not yet
  been built; this feature follows the same precedent for its own post links.
- **Post content is static, structured seed data, not a CMS or backend.** The reference file embeds
  one featured post and nine grid posts as hardcoded sample data in client-side script. This
  feature carries that content over verbatim (copy, topics, authors, dates, read times) as a
  structured, ordered content definition — consistent with the project's documented convention
  that current content (navigation, footer, homepage sections) is static configuration, not
  persisted data, and with the existing per-route `_data` folders (`app/services/_data`,
  `app/about/_data`) and `app/_home-components/home-data.ts`.
- **The subscribe action is a client-side-only visual state transition, with no real email/CRM
  backend call.** This matches the project's documented behavior for the Contact page ("client-side
  visual state transition only — no backend persistence") and the homepage's own webinar subscribe
  panel (`app/_home-components/SubscribeBand.tsx`), which validates and shows a success state with
  no network call.
- **Header and footer are fully out of scope.** They were already delivered as a shared, reusable
  global layout by feature TMS-63 (`specs/TMS-63`); this feature only builds the Blog page's own
  content and reuses those components as-is. The shared navigation (`components/layout/nav-config.ts`)
  already exposes "Blog" pointing at `/blog`, and the shared footer's link groups are one fixed set
  used on every page (no blog-specific quick-links column), per the existing convention already
  established for other content pages (e.g. TMS-66's Services page).
- **Responsive layout follows this project's canonical breakpoints, not the reference file's
  literal pixel values.** The reference's inline styles switch the post grid and featured/subscribe
  panels' column counts at 980px and 640px. Per this project's constitution, breakpoints must reuse
  the canonical `lg` (1140px), `md` (960px), and `sm` (560px) values rather than inventing new
  pixel breakpoints; this feature preserves the reference's column-count behavior (three columns to
  two to one for the grid; two-column to stacked for the featured and subscribe panels) but maps
  those transitions onto the canonical breakpoints instead of the reference's own 980px/640px
  values.
- **Each post's accent color is authored per-post, not derived from a fixed topic-to-color
  lookup.** In the reference's sample data, two different "Engineering" posts use two different
  accent colors, while other repeated topics (e.g. "Modernization", "Product") happen to reuse the
  same accent both times. This feature preserves accent as a per-post property in the content
  definition rather than inferring it strictly from topic.
- **The topic filter set is fixed to the seven values used by the reference's sample content**:
  All, Engineering, Modernization, Product, Methodology, Industry, Design. Adding, removing, or
  reordering topics beyond these is out of scope for this feature.
- **Post cover art is fully decorative and CSS-generated (gradient + dot texture + glow, tinted by
  each post's accent color) — no photographic images are used for post covers in the reference.**
  Unlike the Services page, this feature has no "missing image" fallback concern because no actual
  image asset is used for post covers.
- **Reveal/entrance animations are decorative.** Per the Edge Cases above, all content must be
  fully visible and readable whether or not those animations run, so no functional requirement
  depends on them.
