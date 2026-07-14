# Feature Specification: Global Header & Footer Layout

**Feature Branch**: `TMS-63`
**Created**: 2026-07-13
**Status**: Draft
**Input**: User description: "Build Header component and footer component as a infrastructure global layout taking HTML Reference Files - Analyze ONLY the *.dc.html files located under: raw-files/** — Consider as TMS-63"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent navigation on every page (Priority: P1)

As a site visitor, no matter which page I land on, I see the same header at the top with the
logo, the site's main sections, and a clear way to start a conversation with the company — so I
never have to re-learn how to get around the site.

**Why this priority**: Navigation is the backbone of every other page on the site. Nothing else
(footer, page content) is useful if visitors can't reliably move between sections. This is the
minimum viable slice — a header that appears identically on every page.

**Independent Test**: Load any two different pages and confirm the header shows the same logo,
the same primary links in the same order, and the same primary call-to-action, and that clicking
the logo returns to the homepage from anywhere.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** the page loads, **Then** a header is visible at
   the top showing the logo, the primary navigation links, and a primary call-to-action button.
2. **Given** a visitor is on any page, **When** they click the logo, **Then** they are taken to
   the homepage.
3. **Given** a visitor opens the "Industries" or "Resources" navigation item, **When** they
   interact with it, **Then** a submenu appears listing that item's sub-sections without leaving
   the current page.
4. **Given** a visitor is on a page that corresponds to one of the primary navigation items,
   **When** the header renders, **Then** that navigation item is visually marked as the current
   one.

---

### User Story 2 - Reliable way to scroll and still navigate (Priority: P2)

As a site visitor reading a long page, I want the header to stay reachable as I scroll, so I can
jump to another section or start a conversation without scrolling back to the top.

**Why this priority**: Pages like About, Blog, and Case Studies are long. Losing the header while
scrolling forces visitors to scroll all the way back up, which is a common source of drop-off.

**Independent Test**: Scroll down any page past the first screen and confirm the header (or a
persistent way to reach its links) remains visible/reachable without needing to scroll to the top.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls down a page, **When** they continue scrolling, **Then** the header
   remains visible or is instantly reachable (e.g., stays pinned) rather than disappearing.
2. **Given** the homepage specifically, **When** a visitor is at the very top viewing the
   introductory visual, **Then** the header may appear visually blended into that visual, and
   **When** they begin scrolling, **Then** it becomes fully opaque/legible.

---

### User Story 3 - Consistent footer with contact and legal info (Priority: P2)

As a site visitor on any page, I want a footer with the company's contact details, relevant quick
links, and legal links (privacy, terms), so I can find how to get in touch or review policies
without hunting for them.

**Why this priority**: Contact and legal access are baseline expectations for a company site and
are frequently checked by visitors and by search engines/compliance reviewers. This is
independently valuable even before every individual page exists.

**Independent Test**: Load any page, scroll to the bottom, and confirm a footer is present with a
brand description, at least one group of quick links, social links, a way to contact the company,
and links to the privacy and terms pages.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they reach the bottom, **Then** a footer is shown
   with the company logo/description, the company's social links, a "get in touch" contact
   method, and legal links — with the same overall structure on every page.
2. **Given** a visitor is on a specific page (e.g., a services or industry page), **When** they
   view that page's footer, **Then** the footer's quick-link group reflects links relevant to that
   page's area rather than a generic list, while the surrounding footer structure (brand block,
   social links, get-in-touch block, legal row) stays the same as on every other page.
3. **Given** a visitor clicks a footer quick link, social link, or contact method, **When** the
   link is followed, **Then** it takes them to the correct destination (a page, an anchor on the
   current page, a social profile, or an email/phone action) with no dead links.

---

### User Story 4 - Usable on small screens (Priority: P3)

As a visitor on a phone, I want the header's navigation to collapse into a single menu control I
can open, and the footer to remain fully readable in a single column, so the layout doesn't break
or become unusable on a small screen.

**Why this priority**: A meaningful share of visits are on mobile. This is prioritized after the
core desktop experience because it's an adaptation of the same content, not new functionality.

**Independent Test**: Resize the viewport to a phone width (or use a phone) and confirm the header
collapses to a single menu control that reveals all navigation when opened, and the footer's
columns stack into one readable column with no overlapping or clipped content.

**Acceptance Scenarios**:

1. **Given** a visitor on a narrow/phone-width screen, **When** the header renders, **Then** the
   primary navigation links and CTA are hidden behind a single menu control.
2. **Given** a visitor taps the menu control, **When** it opens, **Then** every primary
   navigation link (including the Industries/Resources sub-links, grouped and labeled) and the
   primary call-to-action are visible and tappable, with none clipped or requiring horizontal
   scroll.
3. **Given** a visitor on a narrow/phone-width screen, **When** they reach the footer, **Then**
   its content stacks into a single column that remains fully readable with no overlapping text.

---

### Edge Cases

- What happens when a visitor is on a page whose destination for a given navigation or footer link
  hasn't been built yet? The link MUST still render and remain visually/structurally correct; it
  is out of scope for this feature to guarantee every destination page already exists.
- What happens on a touch device where "hover" isn't available? Opening the Industries/Resources
  submenus MUST work via tap, not rely on mouse-hover-only interaction.
- What happens if the visitor's screen is extremely narrow (e.g., under 360px wide) or they have
  enlarged text/zoom? Navigation and footer content MUST reflow without any element being cut off
  or requiring horizontal scrolling of the whole page.
- What happens when a page has no natural mapping to a primary navigation item (e.g., a legal or
  utility page)? The header MUST still render correctly with no navigation item marked as active.
- What happens when the visitor uses only a keyboard? Every header and footer interactive element
  (links, the menu toggle, dropdown triggers) MUST be reachable and operable via keyboard, with a
  visible focus indicator at each step.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render one shared header at the top of every page, consisting of: a
  logo linked to the homepage, a primary navigation menu, and one primary call-to-action.
- **FR-002**: The primary navigation MUST include, in order: Services, Industries, Resources,
  Blog, About Us, Careers, Contact Us — where Industries and Resources are expandable groups.
- **FR-003**: The Industries group MUST expose Construction, FinTech, and Healthcare as
  sub-items; the Resources group MUST expose Webinar and Case Studies as sub-items.
- **FR-004**: The header MUST remain reachable while a visitor scrolls further down any page
  (e.g., by staying pinned at the top of the viewport).
- **FR-005**: The header MUST visually mark the navigation item that corresponds to the visitor's
  current page, when such a mapping exists.
- **FR-006**: On viewports below the defined navigation breakpoint, the header MUST collapse the
  primary navigation and call-to-action behind a single menu control that reveals them, including
  the Industries/Resources sub-items as labeled, grouped links, when activated.
- **FR-007**: The system MUST render one shared footer, with the same overall structure on every
  page, consisting of: a brand block (logo and short description), a set of social links (at
  minimum LinkedIn, YouTube, and email), one or more quick-link groups, a "get in touch" block
  with at least a contact email, and a legal row with a copyright notice and links to the Privacy
  Policy and Terms & Conditions.
- **FR-008**: The footer's quick-link group(s) MUST reflect links relevant to the page's own
  content area (e.g., a services page links to that page's own sections; a resource page links to
  related resources) rather than showing an unrelated generic list; this is the only part of the
  footer that varies page-to-page — the brand block, social links, get-in-touch block, and legal
  row MUST be identical on every page.
- **FR-009**: Every header and footer navigation control (links, the mobile menu toggle, dropdown
  triggers) MUST be operable using only a keyboard, with a visible focus state, and MUST expose an
  accessible name to assistive technology.
- **FR-010**: Dropdown/expandable navigation groups (Industries, Resources) MUST be operable by
  tap/click, not solely by mouse hover, so they function on touch devices.
- **FR-011**: The header and footer MUST reflow to remain fully readable and free of clipped or
  overlapping content across the full range of supported screen widths, from small phone widths
  up through wide desktop widths, without introducing horizontal scrolling of the page.

### Key Entities

- **Navigation Item**: A single entry in the header's primary menu — has a label, a destination
  (a page or an in-page section), an optional set of child items (for Industries/Resources), and
  an active/current state relative to the page being viewed.
- **Footer Link Group**: A labeled collection of links shown in the footer — has a heading and an
  ordered list of links; its contents vary depending on which page the footer appears on.
- **Contact Detail**: A way to reach the company shown in the footer — has a type (email or
  phone), a displayed value, and the action it triggers (e.g., opening an email draft).
- **Legal Link**: A footer link to a policy document — has a label (e.g., "Privacy Policy",
  "Terms & Conditions") and a destination.
- **Social Link**: A footer link to the company's presence on an external platform (e.g.,
  LinkedIn, YouTube) or a direct contact action (e.g., email) — has a platform/type, an icon, and
  a destination; appears identically on every page's footer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach any primary section of the site from any other page in a single
  interaction (one click or tap), on both desktop and mobile screen widths.
- **SC-002**: Every page on the site shows the identical header structure (aside from the
  homepage's scroll-transparency treatment and the current-page highlight) and the fully identical
  footer structure (aside from the page-relevant quick-link group), eliminating inconsistent
  navigation and footer content between pages.
- **SC-003**: On a phone-width screen, a visitor can open the navigation menu and see every
  primary link, including Industries and Resources sub-links, within one additional tap, with
  nothing clipped or requiring horizontal scrolling.
- **SC-004**: Every interactive element in the header and footer is operable via keyboard alone,
  with a visible focus indicator at each step, verified by tabbing through the entire header and
  footer without a mouse.
- **SC-005**: From any page, a visitor can find a way to contact the company (email or a contact
  page) via the footer without needing to first return to the homepage.
- **SC-006**: The header and footer render correctly (no clipped, overlapping, or missing content)
  across the full supported range of screen widths, from the narrowest supported phone width to
  wide desktop widths.

## Assumptions

- The primary navigation's link set (Services, Industries [Construction/FinTech/Healthcare],
  Resources [Webinar/Case Studies], Blog, About Us, Careers, Contact Us) and the footer's contact
  method (company email) reflect the current, settled site structure; if the site's information
  architecture changes, this navigation set changes with it.
- "Every page" refers to every page delivered by this website; utility pages that have no natural
  primary-navigation match (if any) still receive the shared header and footer, simply with no
  navigation item marked active.

### Decisions confirmed with stakeholder (2026-07-13)

- **Header behavior**: the homepage keeps its own variant — transparent over the introductory
  visual, solidifying once the visitor scrolls. Every other page uses the plain solid header from
  the start. (See User Story 2, Acceptance Scenario 2.)
- **Footer structure**: normalized across the whole site — every page's footer includes the same
  brand block, the same social links (LinkedIn, YouTube, email), and the same get-in-touch/legal
  structure. Only the quick-link group's content changes page-to-page. (See FR-007/FR-008 and Key
  Entity "Social Link".) This is a deliberate change from the current reference files, where only
  the homepage footer shows social links and a fourth column — the reference set is being
  standardized on the more complete pattern rather than the leaner one.
- **Unbuilt destination pages**: navigation and footer links point to their real intended
  destination now, even for pages that don't exist yet (e.g., Services, Careers, Blog). Those
  links will 404 until each page ships; this feature's scope is the header/footer chrome only, not
  guaranteeing every destination page already exists.
