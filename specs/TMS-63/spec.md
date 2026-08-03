# Feature Specification: Global Header & Footer Layout

**Feature Branch**: `TMS-63`
**Created**: 2026-07-13
**Status**: Draft
**Input**: User description: "Build Header component and footer component as a infrastructure global layout taking HTML Reference Files - Analyze ONLY the *.dc.html files located under: raw-files/** — Consider as TMS-63"

## Clarifications

### Session 2026-07-30

- Q: What should the "Cookie Preferences" footer link do in this implementation? → A: Link routes to the homepage, matching the reference prototype's literal placeholder behavior (`href="#"`) — it is not built out as its own destination page in this feature, unlike Privacy Policy/Terms of Service.
- Q: Should the footer's side padding reuse the shared `.container` utility (which shrinks at the site's generic 960px/560px breakpoints) or stay fixed at 36px like the reference? → A: Footer keeps a fixed 36px side padding at every viewport width — an explicit, documented exception to the shared `.container` utility's padding-shrink behavior.
- Q: Should the footer's hover/focus micro-interactions (CTA lift, social-icon lift, color transitions) respect `prefers-reduced-motion: reduce`? → A: Under `prefers-reduced-motion: reduce`, the transform/lift (translateY) part of hover/focus effects is suppressed; color-based transitions (text/icon brightening, background/border tint) remain.
- Q: The footer's "Industries" link group lists four items (HealthTech, FinTech, ConstructionTech, HiTech) while the header's Industries dropdown (FR-003, unchanged) lists only three (Construction, FinTech, Healthcare), with no HiTech. How should the footer's four links resolve against that mismatch? → A: The footer keeps all four real, distinct destinations exactly as shown in the reference: ConstructionTech reuses the header's already-built Construction page; FinTech and HealthTech reuse the header's same intended (currently unbuilt) FinTech/Healthcare destinations under the footer's own link-label wording; HiTech is an entirely new destination not scoped anywhere else in this spec. The footer's industry set is intentionally one item larger than the header's dropdown — a documented deviation, not an inconsistency to reconcile.
- Q: Most of the footer's "What We Do" links and two "Company" links point to in-page section anchors (`#svc-modernization`, `#our-story`, `#leadership`, etc.) on the Services/About pages, but none of those anchor `id`s currently exist in either page's implementation. Should this feature add the missing `id`s, or drop the anchors? → A: Footer links keep their literal anchor hrefs exactly as shown in the reference (page URL + anchor fragment, e.g. `/services#svc-modernization`); adding the corresponding section `id` attributes to the Services and About pages is deferred to whichever future work builds out each page's own content, and is out of scope for this footer feature. Until that future work lands, these links correctly navigate to the target page but will not scroll to a specific section — that is an accepted, temporary limitation, not a defect to fix here.

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

As a site visitor on any page, I want a footer with the company's brand statement, a way to
contact the company, a full map of the site's sections, the company's social/media presence, and
legal links (privacy, terms, cookies), so I can find how to get in touch, explore the rest of the
site, or review policies without hunting for them.

**Why this priority**: Contact and legal access are baseline expectations for a company site and
are frequently checked by visitors and by search engines/compliance reviewers. This is
independently valuable even before every individual page exists.

**Independent Test**: Load any page, scroll to the bottom, and confirm the footer shows, top to
bottom: a brand block (logo, one-line description, "Start a conversation" call-to-action) beside a
two-column contact block (General and Careers emails); a five-group site-map link grid (What We
Do, How We Work, Industries, Insights, Company) with a "Follow us" row of social links beneath it;
a large decorative "TechGrit" wordmark; and a separate utility bar with a copyright notice and the
Privacy Policy, Terms of Service, and Cookie Preferences links — identically on every page.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they reach the bottom, **Then** a footer is shown
   with the company logo/description and CTA, the General/Careers contact emails, the five-group
   site-map link grid, the "Follow us" social links (LinkedIn, YouTube, Spotify), and the utility
   bar's copyright and legal links — with the identical structure and content on every page.
2. **Given** a visitor is on any page, **When** they view that page's footer, **Then** the
   five-group link grid (What We Do, How We Work, Industries, Insights, Company) shows the same
   links in the same order as on every other page — the footer carries no page-specific content;
   it is the single, fully standardized global footer for the whole site.
3. **Given** a visitor clicks a footer link, social icon, contact email, or legal link, **When**
   the link is followed, **Then** it takes them to the correct destination (a page, an anchor on
   the current page, a social/media profile, or an email action) with no dead links.
4. **Given** a visitor hovers or focuses a footer link, social icon, or the "Start a conversation"
   button, **When** the pointer/focus state activates, **Then** the element shows its defined hover
   treatment (text brightening to full white, the social icon's background/border tinting orange
   with a slight upward lift, or the CTA button lifting with a stronger shadow) with a smooth
   transition, not an instant/jarring change.

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
3. **Given** a visitor on a mid-width screen (tablet/laptop, ≤1080px), **When** they reach the
   footer, **Then** the brand block and contact block stack into a single column, and the
   site-map link grid's left column ("What We Do") stacks above its right block (whose four
   sub-groups now show as a 2-column grid) rather than sitting side by side.
4. **Given** a visitor on a narrow/phone-width screen (≤640px), **When** they reach the footer,
   **Then** the site-map's four sub-groups stack into a single column, the "Follow us" row stacks
   its label above its icons, the contact block's two columns (General/Careers) stack into one
   column, and the utility bar's copyright and legal links stack into a single left-aligned
   column — with no overlapping text and no content requiring horizontal scroll.

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
- What happens when the visitor's system has `prefers-reduced-motion: reduce` set? The footer's
  hover/focus lift effects (CTA button, social icons) MUST suppress their transform/translateY
  animation while their color-based transitions (brightening, tinting) still apply (see
  Clarifications, Session 2026-07-30; FR-014, FR-015).
- What happens when a footer link targets a page-section anchor whose `id` doesn't yet exist on
  the destination page (the "What We Do" and "Our Story"/"Leadership & Advisory" links, pointing at
  not-yet-built sections of the Services/About pages)? The link MUST still use its literal
  reference href and navigate to the destination page; not scrolling to the specific section in
  that interim state is an accepted limitation, not a defect, until that page's own content ships
  (see Clarifications, Session 2026-07-30; FR-015).

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
- **FR-007**: The system MUST render one shared footer, with the fully identical structure and
  content on every page, consisting of: a brand block (logo, one-line brand description, and a
  "Start a conversation" call-to-action), a two-column contact block (General and Careers
  contacts), a five-group site-map link grid (What We Do, How We Work, Industries, Insights,
  Company), a "Follow us" row of social links, a decorative brand wordmark, and a utility bar with
  a copyright notice and links to the Privacy Policy, Terms of Service, and Cookie Preferences.
- **FR-008**: The footer's five-group site-map link grid and every link within it MUST be
  identical on every page — the footer carries no page-specific or section-specific link
  variation of any kind; brand block, contact block, link grid, "Follow us" row, and utility bar
  are all part of one fully standardized, site-wide footer. (This supersedes the earlier
  assumption that the footer's quick-link group varies per page — see "Decisions confirmed with
  stakeholder (2026-07-30)" below.)
- **FR-009**: Every header and footer navigation control (links, the mobile menu toggle, dropdown
  triggers) MUST be operable using only a keyboard, with a visible focus state, and MUST expose an
  accessible name to assistive technology.
- **FR-010**: Dropdown/expandable navigation groups (Industries, Resources) MUST be operable by
  tap/click, not solely by mouse hover, so they function on touch devices.
- **FR-011**: The header and footer MUST reflow to remain fully readable and free of clipped or
  overlapping content across the full range of supported screen widths, from small phone widths
  up through wide desktop widths, without introducing horizontal scrolling of the page.

#### Footer Detailed Visual & Responsive Requirements

*Reference: `raw-files-v2/TechGrit Website V2.2/TechGrit Homepage.dc.html` (single source of truth
for all values below). Recorded at this level of detail specifically so the Footer can be
implemented without reopening the reference file; the project's own token-driven styling system
governs how these raw values are mapped to reusable tokens at implementation time.*

- **FR-012**: The footer's outermost region MUST have `overflow:hidden` and a hairline top border
  (`1px solid rgba(255,255,255,0.08)`) separating it from preceding page content, and MUST display,
  purely decoratively (not interactive, hidden from assistive technology):
  - A 3px-tall horizontal gradient bar spanning the full width at the very top, sweeping left to
    right through `#0284C7 → #0F766E → #F59E0B → #E87722`.
  - Two large, softly blurred circular glows, each 520×520px with `border-radius:50%`, positioned
    absolutely and offset outside the footer's own bounds: one at `top:-160px; right:-120px`
    (amber `rgba(232,119,34,0.10)`, blur `140px`), one at `bottom:-140px; left:-120px` (amber
    `rgba(247,183,51,0.06)`, blur `150px`). The footer's own `overflow:hidden` clips both so
    neither ever causes page-level horizontal scroll at any viewport width.
  - None of these decorative layers may intercept clicks/taps.
- **FR-013**: The footer's main content area (and its utility bar) MUST be horizontally centered
  with a 1280px maximum content width, matching the same max-width convention used elsewhere on the
  page. Unlike the shared page-content convention, the footer's left/right side padding MUST stay
  fixed at 36px at every viewport width — it does not shrink at the site's generic breakpoints —
  because the reference prototype never varies this padding at any width (see Clarifications,
  Session 2026-07-30).
- **FR-014**: The top row of the footer MUST place the brand block and the contact block
  side-by-side (brand block wider than contact block), separated from the link grid below by a
  hairline bottom border:
  - **Brand block**: company logo image, a one-line brand/product description below it, and a
    pill-shaped "Start a conversation" button below that, linking to the site's Contact page —
    the button MUST use the brand's gradient fill, uppercase bold small-caps-style label with an
    arrow glyph, and MUST lift upward with a stronger shadow on hover/focus, except under
    `prefers-reduced-motion: reduce`, where the upward lift MUST be suppressed while the shadow
    change still applies (see Clarifications, Session 2026-07-30).
  - **Contact block**: two side-by-side columns, "General" and "Careers", each with a small
    uppercase eyebrow label, a bold email address (`hello@techgrit.com` / `careers@techgrit.com`)
    that brightens to an amber highlight on hover/focus, and a short muted sublabel ("Partnerships
    & press" / "Join the team").
- **FR-015**: Below the brand/contact row, the footer MUST render a site-map link grid with two
  top-level regions:
  - A narrower left region containing exactly one group, **"What We Do"**, listing its links in a
    single vertical column: "AI-Accelerated Modernization", "Software Product Engineering", "Data
    & AI Engineering", "Platform Engineering", "Managed Services", "AI Strategy & Roadmap",
    "Startups" — each pointing to its corresponding section anchor on the site's Services page
    (e.g. `/services#svc-modernization`). These anchor `id`s do not yet exist on the Services page
    as of this feature; per Clarifications (Session 2026-07-30), the links MUST still use their
    literal anchor hrefs, and adding the matching `id`s to the Services page is out of scope here.
  - A wider right region containing, in a 4-column sub-grid: **"How We Work"**, **"Industries"**,
    **"Insights"**, and **"Company"** — each with an uppercase eyebrow heading and its own
    vertical list of links. Every link brightens to full white on hover/focus.
    - **How We Work**: "Orbit AI Framework", "Engagement Models", "Discovery Sprints" — pointing
      to sections on a dedicated Frameworks destination. No such page/section exists anywhere
      else in this spec (header or otherwise); per this feature's standing "unbuilt destination
      pages" convention, these point to their real intended (not-yet-built) destination rather
      than a placeholder.
    - **Industries**: "HealthTech", "FinTech", "ConstructionTech", "HiTech" — four real, distinct
      destinations, one item larger than the header's own Industries dropdown (FR-003):
      ConstructionTech reuses the header's already-built Construction page; FinTech and
      HealthTech reuse the header's same intended (currently unbuilt) FinTech/Healthcare
      destinations under this footer-specific label wording; HiTech is a new destination not
      scoped elsewhere in this spec (see Clarifications, Session 2026-07-30).
    - **Insights**: "Case Studies", "Blog", "Webinar" — pointing to the site's existing Case
      Studies, Blog, and Webinar pages respectively.
    - **Company**: "Our Story", "Leadership & Advisory" (both intended as section anchors on the
      site's About page, e.g. `/about#our-story` — these anchor `id`s do not yet exist on the About
      page as of this feature; same deferred-anchor handling as "What We Do" above applies),
      "Careers", "Contact" — pointing to the site's existing About, Careers, and Contact pages.
  - Directly beneath the 4-column sub-grid, a **"Follow us"** row MUST show an uppercase label
    followed by circular icon buttons linking to the company's LinkedIn, YouTube, and Spotify
    (podcast) profiles, each opening in a new tab with an accessible name identifying the
    platform; on hover/focus each icon's background/border tints amber and it lifts slightly,
    except under `prefers-reduced-motion: reduce`, where the lift MUST be suppressed while the
    color tint still applies (see Clarifications, Session 2026-07-30).
- **FR-016**: Below the site-map link grid, the footer MUST display a purely decorative,
  center-aligned "TechGrit" wordmark with `margin-top:36px`, font-size fluidly scaling via
  `clamp(74px, 17vw, 232px)` (i.e. it resizes continuously with viewport width between a 74px
  floor and 232px ceiling — not tied to the 1080px/640px footer breakpoints), `line-height:0.74`,
  `font-weight:700`, `letter-spacing:-0.045em`, `white-space:nowrap`, rendered with a top-to-bottom
  fading gradient fill (`rgba(255,255,255,0.09)` → transparent) and no interactive affordance
  (hidden from assistive technology, not selectable, `user-select:none`).
- **FR-017**: The footer MUST end with a visually distinct utility bar (a darker background band,
  separated by its own hairline top border) that is horizontally centered and contains, in a
  single row: a muted copyright notice ("© 2026 TechGrit Inc. All rights reserved.") followed by
  the Privacy Policy, Terms of Service, and Cookie Preferences links, each brightening to full
  white on hover/focus. Privacy Policy and Terms of Service link to their real (currently unbuilt)
  `/privacy` and `/terms` destinations; Cookie Preferences links to the homepage (`/`), matching
  the reference prototype's literal placeholder behavior rather than a dedicated cookie-preferences
  page (see Clarifications, Session 2026-07-30).
- **FR-018**: The footer's responsive behavior MUST follow exactly two content breakpoints (in
  addition to the shared header/footer reflow requirement in FR-011):
  - **At or below 1080px wide** (tablet/laptop range): the brand block and contact block (FR-014)
    stack into a single column; the site-map link grid's "What We Do" column and its right region
    stack into a single column; the 4-column sub-grid (FR-015) becomes a 2-column grid; the
    "Follow us" row's top padding increases to compensate for the new stacked layout above it.
  - **At or below 640px wide** (mobile range): the sub-grid (already 2-column) collapses to a
    single column; the "Follow us" row switches from a horizontal row to a stacked column (label
    above icons); the contact block's General/Careers columns (already stacked at this point)
    remain single-column; the utility bar switches from a centered horizontal row to a
    left-aligned stacked column.
  - No intermediate breakpoint exists between 1080px and 640px for the footer — content at any
    width in that range MUST match the "at or below 1080px" behavior described above.

### Key Entities

- **Navigation Item**: A single entry in the header's primary menu — has a label, a destination
  (a page or an in-page section), an optional set of child items (for Industries/Resources), and
  an active/current state relative to the page being viewed.
- **Footer Link Group**: A labeled collection of links shown in the footer's site-map grid — has a
  heading (one of "What We Do", "How We Work", "Industries", "Insights", "Company") and an ordered
  list of links (see FR-015 for the exact label/destination of every link in every group); identical
  on every page (no page-to-page variation). The "Industries" group's link count and label wording
  intentionally differs from the header's own Industries dropdown (FR-003) — see Clarifications,
  Session 2026-07-30.
- **Contact Detail**: A way to reach the company shown in the footer's contact block — has a type
  ("General" or "Careers"), a displayed email value (`hello@techgrit.com` /
  `careers@techgrit.com`), a short sublabel, and the action it triggers (opening an email draft).
- **Legal Link**: A footer utility-bar link to a policy document or the homepage — has a label
  ("Privacy Policy", "Terms of Service", or "Cookie Preferences") and a destination: Privacy Policy
  and Terms of Service point to their real (currently unbuilt) `/privacy` and `/terms` routes;
  Cookie Preferences points to the homepage (`/`), per its reference-prototype placeholder behavior
  (see Clarifications, Session 2026-07-30).
- **Social Link**: A footer "Follow us" link to the company's presence on an external platform
  (LinkedIn, YouTube, or Spotify) — has a platform/type, an icon, and a destination that opens in
  a new tab; appears identically on every page's footer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach any primary section of the site from any other page in a single
  interaction (one click or tap), on both desktop and mobile screen widths.
- **SC-002**: Every page on the site shows the identical header structure (aside from the
  homepage's scroll-transparency treatment and the current-page highlight) and the fully identical
  footer structure and content — brand block, contact block, five-group site-map link grid,
  "Follow us" social links, and utility bar are pixel-for-pixel the same on every page — eliminating
  inconsistent navigation and footer content between pages.
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
- **SC-007**: The implemented footer is visually indistinguishable from the reference design —
  matching layout, spacing, alignment, sizing, positioning, typography, color, and decorative
  detail with no measurable (including sub-pixel-rounding-only) difference — across the desktop
  (above 1080px), tablet/laptop (641px–1080px), and mobile (640px and below) viewport ranges
  defined for the footer, with no layout shifts, overlap, clipping, or unintended wrapping at any
  width in between.
- **SC-008**: Every footer link, contact email action, and social icon resolves to its correct,
  intended destination page with zero dead or mismatched links, verified at every supported
  viewport range. For the anchor-based links whose target section `id` doesn't exist yet (see
  Edge Cases and Clarifications, Session 2026-07-30), "correct, intended destination" means
  successfully navigating to the destination page itself — not scrolling to a specific in-page
  section is an accepted, temporary limitation for those links, not a failure of this criterion.

## Assumptions

- The primary navigation's link set (Services, Industries [Construction/FinTech/Healthcare],
  Resources [Webinar/Case Studies], Blog, About Us, Careers, Contact Us) reflects the current,
  settled site structure; if the site's information architecture changes, this navigation set
  changes with it. The footer's contact methods (General: `hello@techgrit.com`; Careers:
  `careers@techgrit.com`) and its five-group site-map link grid (What We Do, How We Work,
  Industries, Insights, Company) are likewise treated as the current, settled footer content.
- "Every page" refers to every page delivered by this website; utility pages that have no natural
  primary-navigation match (if any) still receive the shared header and footer, simply with no
  navigation item marked active.

### Decisions confirmed with stakeholder (2026-07-13)

- **Header behavior**: the homepage keeps its own variant — transparent over the introductory
  visual, solidifying once the visitor scrolls. Every other page uses the plain solid header from
  the start. (See User Story 2, Acceptance Scenario 2.)
- **Footer structure**: normalized across the whole site — every page's footer includes the same
  brand block, contact block, site-map link grid, "Follow us" social links, and utility bar. (See
  FR-007/FR-008 and Key Entity "Social Link".) Superseded by the 2026-07-30 decision below, which
  confirms the link grid itself is also fully standardized (not page-varying).
- **Unbuilt destination pages**: navigation and footer links point to their real intended
  destination now, even for pages that don't exist yet (e.g., Services, Careers, Blog). Those
  links will 404 until each page ships; this feature's scope is the header/footer chrome only, not
  guaranteeing every destination page already exists.

### Decisions confirmed with stakeholder (2026-07-30) — Footer-only re-analysis

The Footer implementation was split off to a separate developer, and the Footer requirements were
re-derived from a newer reference file
(`raw-files-v2/TechGrit Website V2.2/TechGrit Homepage.dc.html`), taken as sole source of truth for
this update. Header requirements above are untouched by this pass.

- **Footer content is fully site-wide, with no per-page variation**: the newer reference shows a
  complete, five-group site-map link grid (What We Do, How We Work, Industries, Insights,
  Company) covering the entire site's sections, rather than a page-relevant subset. This
  supersedes the earlier assumption (2026-07-13 decision above, and original FR-008) that the
  footer's quick-link group would vary per page — there is now no footer content that varies by
  page. (See FR-007/FR-008/FR-015 and Key Entity "Footer Link Group".)
- **Social platforms updated to LinkedIn, YouTube, and Spotify**: the newer reference's "Follow
  us" row links to LinkedIn, YouTube, and a Spotify podcast profile — not email (email is already
  covered separately by the General/Careers contact block). This supersedes the earlier assumption
  of "LinkedIn, YouTube, and email" as the footer's social links. (See FR-015 and Key Entity
  "Social Link".)
- **Utility-bar legal links expanded to three**: the newer reference's bottom bar shows Privacy
  Policy, Terms of Service, and Cookie Preferences (three links), rather than the two originally
  assumed ("Privacy Policy" and "Terms & Conditions"). (See FR-007/FR-017 and Key Entity "Legal
  Link".) The reference points all three at a placeholder destination (`#`); per this project's
  standing convention for reference-file translation, Privacy Policy and Terms of Service route to
  real `/privacy` and `/terms` destinations in implementation — this remains covered by the
  "Unbuilt destination pages" decision above. Cookie Preferences is the one exception: it routes to
  the homepage instead of a dedicated page, per the Clarifications session below.
- **Footer's Industries link set intentionally larger than the header's**: the newer reference's
  footer site-map lists four industries (HealthTech, FinTech, ConstructionTech, HiTech) versus the
  header's unchanged three-item Industries dropdown (Construction, FinTech, Healthcare — FR-003).
  Rather than reconciling the two to match, the footer keeps all four literal destinations from
  the reference, reusing the header's existing Construction/FinTech/Healthcare destinations for
  three of them (under the footer's own label wording) and treating "HiTech" as a new destination.
  (See FR-015 and Key Entity "Footer Link Group".)
- **Footer anchor links kept literal even where the target section doesn't exist yet**: the
  reference's "What We Do" links and two "Company" links ("Our Story", "Leadership & Advisory")
  point to section anchors on the Services/About pages that don't currently exist. Adding those
  anchor `id`s is deferred to whichever future work builds out each page's content and is out of
  scope for this footer-only feature; the footer links keep their literal reference hrefs
  regardless. (See FR-015, Edge Cases, and Clarifications, Session 2026-07-30.)
- **Full pixel/visual/responsive detail captured directly in this spec** (see "Footer Detailed
  Visual & Responsive Requirements", FR-012–FR-018): decorative chrome (gradient top border,
  ambient background glows, oversized wordmark), the brand/contact row, the site-map grid and
  "Follow us" row, the utility bar, and both footer-specific responsive breakpoints (1080px and
  640px) are now documented in enough detail that implementation does not require reopening the
  reference HTML.
