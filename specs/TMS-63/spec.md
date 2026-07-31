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
3. **Given** a visitor opens any of the header's dropdown-triggering navigation items (per the V2
   Update below: What We Do, How We Work, Industries, Insights, About), **When** they interact with
   it, **Then** a submenu appears listing that item's sub-sections without leaving the current page.
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
   navigation link (including every dropdown group's sub-links, grouped and labeled — per the V2
   Update below: What We Do, How We Work, Industries, Insights, About) and the primary
   call-to-action are visible and tappable, with none clipped or requiring horizontal scroll.
3. **Given** a visitor on a narrow/phone-width screen, **When** they reach the footer, **Then**
   its content stacks into a single column that remains fully readable with no overlapping text.

---

### Edge Cases

- What happens when a visitor is on a page whose destination for a given navigation or footer link
  hasn't been built yet? The link MUST still render and remain visually/structurally correct; it
  is out of scope for this feature to guarantee every destination page already exists.
- What happens on a touch device where "hover" isn't available? Opening any dropdown group's
  submenu (per the V2 Update below: What We Do, How We Work, Industries, Insights, About) MUST work
  via tap, not rely on mouse-hover-only interaction.
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

- **FR-001** *(SUPERSEDED — see "V2 Update — Header Pixel-Perfect Refactor" below, FR-012)*: The
  system MUST render one shared header at the top of every page, consisting of: a logo linked to
  the homepage, a primary navigation menu, and one primary call-to-action.
- **FR-002** *(SUPERSEDED — see FR-012/FR-013 below)*: The primary navigation MUST include, in
  order: Services, Industries, Resources, Blog, About Us, Careers, Contact Us — where Industries
  and Resources are expandable groups.
- **FR-003** *(SUPERSEDED — see FR-013 below)*: The Industries group MUST expose Construction,
  FinTech, and Healthcare as sub-items; the Resources group MUST expose Webinar and Case Studies as
  sub-items.
- **FR-004**: The header MUST remain reachable while a visitor scrolls further down any page
  (e.g., by staying pinned at the top of the viewport).
- **FR-005**: The header MUST visually mark the navigation item that corresponds to the visitor's
  current page, when such a mapping exists.
- **FR-006** *(SUPERSEDED — see FR-013/FR-018 below)*: On viewports below the defined navigation
  breakpoint, the header MUST collapse the primary navigation and call-to-action behind a single
  menu control that reveals them, including the Industries/Resources sub-items as labeled, grouped
  links, when activated.
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
- **FR-009** *(header-facing part SUPERSEDED — see FR-014 below; footer-facing part remains
  authoritative, unaffected by the V2 Update)*: Every header and footer navigation control (links,
  the mobile menu toggle, dropdown triggers) MUST be operable using only a keyboard, with a visible
  focus state, and MUST expose an accessible name to assistive technology.
- **FR-010** *(header-facing part SUPERSEDED — see FR-014 below, now covering all five dropdown
  groups instead of two)*: Dropdown/expandable navigation groups (Industries, Resources) MUST be
  operable by tap/click, not solely by mouse hover, so they function on touch devices.
- **FR-011** *(header-facing part SUPERSEDED — see FR-015/FR-018 below; footer-facing part remains
  authoritative, unaffected by the V2 Update)*: The header and footer MUST reflow to remain fully
  readable and free of clipped or overlapping content across the full range of supported screen
  widths, from small phone widths up through wide desktop widths, without introducing horizontal
  scrolling of the page.

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
  primary link, including every dropdown group's sub-links (per the V2 Update below: What We Do,
  How We Work, Industries, Insights, About), within one additional tap, with nothing clipped or
  requiring horizontal scrolling.
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


---

## Clarifications

### Session 2026-07-30

- Q: The reference's Industries mega-menu links Healthcare/FinTech to a standalone
  `/industries#ind-healthcare` / `#ind-fintech` page that doesn't exist in this codebase yet
  (today's site only has a generic `/#industries` section on the homepage). Where should these
  sub-links point? → A: Keep pointing at the existing generic homepage `/#industries` section —
  no new standalone Industries page/anchors for this header-only refactor. Additionally: the
  per-industry colored icon chips (teal/blue/amber/purple) in the reference are NOT to be
  reproduced — all Industries mega-menu icon chips use the same uniform orange chip styling as
  every other mega-menu group (`rgba(232,119,34,0.14)` background, `#F7B733` icon color), a
  deliberate deviation from the reference's per-industry color-coding.
- Q: The reference adds a 4th Industries item, "HiTech", absent from today's site (only
  Construction/FinTech/Healthcare exist today). Should the rebuilt header include it? → A: Yes —
  include HiTech as a 4th Industries mega-menu item (4-col grid retained), pointing at the
  homepage's generic `/#industries` section per the routing decision above; it 404-scrolls to the
  same generic section as Healthcare/FinTech until/unless a dedicated Industries page splits them
  out (out of scope for this header-only refactor).

### Session 2026-07-31

- Q: Now that hover opens the mega-menu (FR-019), should clicking a trigger itself (mouse click, not
  a mega-item inside the panel) navigate to that group's own overview page — matching the
  reference's real `<a href="...">` markup on every trigger — or keep today's toggle-only behavior
  (open/close, never navigate)? → A: Click navigates to the group's own page, matching the
  reference exactly: What We Do → `/services`, How We Work → `/frameworks` (unbuilt destination,
  renders per the existing 404 policy), Industries → `/construction` (the existing Industries-group
  route mapping), Insights → `/case-studies`, About → `/about`. The trigger becomes a real `<Link>`
  rather than a `<button>`. Touch tap continues to open the mega-menu first (rather than navigating
  immediately) so touch visitors see the sub-items before committing, since touch has no hover
  preview to rely on; a second tap on the trigger (or tapping a mega-item) proceeds normally.

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

**Scope of this update**: HEADER ONLY. The footer (Footer.tsx, footer-config.ts, and every
footer-related requirement above) is explicitly out of scope — it is owned by another teammate and
MUST NOT be touched by this work. Every requirement, entity, and success criterion in this section
supersedes the header-related content above (FR-001 through FR-006, and the header-facing parts of
FR-009/FR-010/FR-011) where they conflict; footer requirements (FR-007, FR-008) are unaffected and
remain authoritative.

**Source of truth**: all 12 `.dc.html` design-export files in
`raw-files-v2/TechGrit Website V2.2/` — About, Blog, Careers, Case Studies, Case Study, Construction,
Contact, Frameworks, Homepage, Industries, Services, Webinar. All 12 were read in full for their
header/nav markup and embedded `<style>` rules before writing this section. The header markup and
CSS are identical across all 12 files except for the two differences called out explicitly below
(Homepage's scroll behavior, and the per-page `is-active` link). Where this section gives a pixel
value, color, or behavior, it was read directly from these files — nothing below is guessed.

### What changes vs. the current implementation

The reference header is structurally different from what's currently built in `Header.tsx` /
`nav-config.ts`, not just a styling pass:

1. **Navigation taxonomy changes.** The current 7-item flat list (Services, Industries, Resources,
   Blog, About Us, Careers, Contact Us) is replaced by the reference's 7-item set: **What We Do**
   (dropdown), **How We Work** (dropdown), **Industries** (dropdown), **Insights** (dropdown),
   **About** (dropdown), **Careers** (plain link), **Contact Us** (plain link).
2. **Dropdown presentation changes.** The current "simple list + colored round dot" dropdown pattern
   (`--color-*-light` dot, used today only for Industries/Resources) does not appear anywhere in the
   reference markup — it exists only as unused, dead CSS (`.nav-dd`/`.dd-dot`) declared but never
   referenced by any element in any of the 12 files. Every dropdown in the reference is instead a
   **mega-menu**: a centered panel with a 2/3/4-column icon-chip grid, each item showing a
   36×36px icon chip, a bold title, and a 2-line description — and two of the five (What We Do,
   Insights) additionally end with a highlighted "see all →" CTA row. (The reference colors
   Industries' icon chips per-industry — teal/blue/amber/purple; per the Clarifications below,
   this refactor uses the same uniform orange chip as every other group instead.)
3. **Logo size changes.** Every one of the 12 files uses a single, unchanging logo size:
   `height:44px; width:auto` — the same value on every page and at every scroll/breakpoint state
   (no separate home-vs-other-page size, no shrink-on-scroll size). This replaces the current
   `114×34` (`34px`/`32px` height, home vs. other pages) sizing.
4. **Header height correction.** The reference nav height is `80px` on every non-home page (static,
   no shrink) — the current implementation hardcodes `78px` for non-home pages, a 2px deviation from
   both the reference and the project's own `--nav-height: 80px` token.

### Cross-file consistency findings

- **11 of 12 pages** (all except Homepage) use a static header: `position:sticky; top:0;
  background:rgba(0,0,0,0.7); backdrop-filter:blur(16px); border-bottom:1px solid
  rgba(255,255,255,0.07)` — no transparency, no scroll listener, no height change. These values
  already match existing tokens exactly: `--color-nav-glass` (0.70), `--blur-nav` (16px),
  `--color-border-subtle` (0.07).
- **Homepage only** is `position:fixed`, starts fully transparent, and solidifies on scroll (see
  "Homepage scroll behavior" below). The existing `--color-header-scrolled-bg` (0.88),
  `--color-border-header-scrolled` (0.08), `--shadow-header-scrolled`
  (`0 12px 34px -14px rgba(0,0,0,0.75)`), and `--blur-header-scrolled` (18px) tokens already match
  the reference's scrolled-state values exactly — no new tokens needed for this part.
- The only page-to-page markup difference besides Homepage's scroll behavior is which single
  top-level link carries the current-page highlight (`is-active`, styled identically to `:hover`):
  About→About, Blog→Insights, Careers→Careers, Case Studies→Insights, Case Study→Insights,
  Construction→Industries, Contact→Contact Us, Frameworks→How We Work, Homepage→none, Industries→
  Industries, Services→What We Do, Webinar→Insights.
- The breakpoint at which the desktop nav + CTA hide behind the hamburger is **1140px** on all 12
  files — this already matches the project's canonical `lg = 1140px` breakpoint; no new breakpoint
  is introduced.
- One inline-style divergence exists between Homepage's CTA button and the other 11 pages' CTA
  button (Homepage's hover state additionally changes `box-shadow`; the other 11 only translate on
  hover, with no inline `transition` declared for the shadow). This reads as an unintentional gap in
  the reference set rather than an intentional per-page design choice. **Assumption (resolved)**:
  unify on the richer, fuller-featured version (translate + shadow-strengthen on hover, with a
  declared transition) for the CTA on every page, since the shared header is one component and nothing
  in the feature's intent calls for the CTA's hover affordance to be weaker on 11 of 12 pages.

### New/Updated Functional Requirements (header-only; supersede FR-001–FR-006, FR-009–FR-011 above)

- **FR-012**: The header MUST render, in order: a logo (linked to the homepage) sized `44px` height
  / auto width, unchanged across every page and every scroll or breakpoint state; a primary
  nav group with five dropdown-triggering items — **What We Do, How We Work, Industries, Insights,
  About** — followed by two plain links — **Careers, Contact Us**; and one primary CTA
  ("Talk to Us", linking to Contact, with a trailing arrow glyph).
- **FR-013**: Each of the five dropdown items MUST open a **mega-menu** (not a simple link list) on
  click/tap, styled as a centered panel (top offset `14px` below the trigger, `min(940px, 100vw -
  40px)` wide, `rgba(0,0,0,0.97)` background, `16px` blur, `1px solid rgba(255,255,255,0.12)`
  border, `16px` border-radius, `0 30px 60px -18px rgba(0,0,0,0.85)` shadow), laid out as a
  2/3/4-column grid (column count per group, matching the reference) of icon-chip items — each item
  a 36×36px colored icon chip + bold title + 2-line description — with the following exact contents:
  - **What We Do** (4-col, +CTA row, 7 items): AI-Accelerated Modernization
    (`/services#svc-modernization`), Software Product Engineering (`/services#svc-product`), Data
    and AI Engineering (`/services#svc-data-ai`), Platform Engineering (`/services#svc-platform`),
    Managed Services (`/services#svc-managed`), AI Strategy & Roadmap (`/services#svc-strategy`),
    Startups (`/services#svc-startups`); CTA row "See all services →" → `/services`. None of these
    seven anchor ids exist on the built `/services` page yet — renders per the "unbuilt destination"
    policy below.
  - **How We Work** (3-col, no CTA row): Orbit AI Ecosystem (`/frameworks#orbit-ai`), Engagement
    Models (`/frameworks#engagement`), Discovery Sprints (`/frameworks#discovery`) — `/frameworks`
    is not a route that exists anywhere in this codebase today; renders per the "unbuilt
    destination" policy below (whole-page 404, not just a missing anchor).
  - **Industries** (4-col, no CTA row): Healthcare, FinTech, HiTech (per the Clarifications above,
    all three link to the existing homepage `/#industries` section — NOT the reference's per-industry
    anchors, which don't exist in this codebase), and Construction (links to the existing
    `/construction` page). **Per Clarifications**: all four use the same uniform orange icon-chip
    styling as every other mega group — the reference's per-industry teal/blue/amber/purple icon
    colors are NOT reproduced.
  - **Insights** (3-col, +CTA row): Case Studies (`/case-studies`), Blogs (`/blog`),
    Webinar (`/webinar`), Whitepapers (`/blog#whitepapers` — anchor doesn't exist on the built Blog
    page yet; renders per the "unbuilt destination" policy below), Testimonials
    (`/about#testimonials` — anchor doesn't exist on the built About page yet, same policy); CTA row
    "Explore all insights →" → `/case-studies`.
  - **About** (3-col, no CTA row): Our Story (`/about#our-story`), Leadership & Advisory
    (`/about#leadership`) — neither anchor exists on the built About page yet (same "unbuilt
    destination" policy); both currently scroll-target a page that doesn't yet expose these two
    distinct sections.
- **FR-014**: Mega-menu opening/closing MUST remain operable by click/tap (not hover-only) and by
  keyboard, and MUST close on outside click or Escape, per the existing FR-010 mechanism — the
  reference's own CSS-only `:hover` mega-menu behavior (including the chevron-flip and
  hover-bridge techniques) is a **visual** reference only; the existing tap/keyboard-driven
  open/close mechanism in `Header.tsx` MUST be preserved and re-pointed at the new five-group
  structure.
- **FR-015**: The header background/blur/border/height for every non-home page MUST be:
  `rgba(0,0,0,0.7)` background, `16px` backdrop blur, `1px solid rgba(255,255,255,0.07)`
  bottom border, `80px` nav height, `1280px` max container width, `0 36px` horizontal padding,
  `24px` gap between the header's own flex sections, `4px` gap between top-level nav items — with
  no shrink or transparency behavior (that behavior is homepage-only, per FR-016).
- **FR-016**: On the homepage only, the header MUST start fully transparent (`background:
  transparent`, no blur, invisible border, `80px` nav height) and, once `window.scrollY` exceeds
  `24px`, transition (over `300–350ms`) to: `rgba(0,0,0,0.88)` background, `18px` backdrop blur,
  `rgba(255,255,255,0.08)` bottom border, `0 12px 34px -14px rgba(0,0,0,0.75)` shadow, and `70px`
  nav height — reverting when scrolled back to the top. This already matches the current
  implementation's threshold/shrink values; only the logo-size and nav-height inputs feeding this
  behavior change (per FR-012/FR-015).
- **FR-017**: The nav link, CTA button, and mega-menu typography/spacing/color values MUST match the
  reference exactly: nav link `15px/600 weight`, `9px 14px` padding, `9px` border-radius,
  `rgba(255,255,255,0.8)` default text color, `#fff` text on `rgba(255,255,255,0.07)` background for
  `:hover`/current-page state; CTA `15px/700 weight`, `12px 22px` padding, `11px` border-radius,
  `linear-gradient(135deg, #F59E0B, #E87722)` background, `#fff` text, default shadow
  `0 8px 24px -8px rgba(232,119,34,0.7)`, hover `translateY(-2px)` + shadow
  `0 14px 32px -8px rgba(232,119,34,0.9)` (per the resolved CTA-unification assumption above); mega
  item `12px` padding, `10px` border-radius, `64px` min-height, `12px` icon-to-body gap, title
  `14px/700/#fff`, description `11.5px/rgba(255,255,255,0.55)`, icon chip `36×36px/9px radius`; CTA
  row `14px 18px` padding, `12px` border-radius, gradient background, uppercase `12.5px/800/0.08em`
  label.
- **FR-018**: The mobile menu (below `1140px`) MUST list the same five dropdown groups (each as a
  group header followed by its indented child links) plus Careers and Contact Us, in the same
  order as desktop, with Contact Us styled distinctly (orange, bold) as the final row — replacing
  the current mobile menu's colored-dot child-link styling with the plain indented-link styling the
  reference uses (no dot indicator, since the dot pattern is not part of the real design).

### New/Cleared Assumptions

- **Route mapping for new/changed nav destinations** (cleared — verified directly against every
  reference file's actual `href` values, not guessed): the exact per-item destinations are listed
  inline in FR-013 above. Two routing points required an explicit stakeholder decision rather than
  a straight reference read (see Clarifications above): Industries' Healthcare/FinTech/HiTech
  sub-links point at the existing homepage `/#industries` section (not the reference's unbuilt
  standalone `/industries#slug` anchors), and Industries' icon chips use the uniform orange styling
  shared by every other mega group (not the reference's per-industry teal/blue/amber/purple
  coding). Every other destination (Services' seven sub-anchors, Frameworks' three sub-anchors,
  Insights' five items, About's two items) matches the reference's own `href` exactly, per the
  "Unbuilt destination pages" policy above: the link renders now and resolves once its target
  page/anchor ships.
- **CTA hover divergence** (cleared): resolved above — unify on the fuller Homepage version across
  all pages.
- **Focus (`:focus-visible`) styling** (cleared): not specified anywhere in the reference (a
  visual-only export with no accessibility annotations). The existing FR-009 keyboard/focus
  requirement remains authoritative and independent of the reference; every new header element
  (mega-menu triggers, mega-item links, CTA row links) MUST use the sitewide `:focus-visible` rule
  already declared in `app/globals.css` (`outline: 2px solid var(--color-orange); outline-offset:
  2px; border-radius: var(--radius-xs);`), unmodified — no new focus-ring color, width, or shape is
  introduced for this feature.
- **Dead `.nav-dd`/`.dd-dot` CSS pattern**: confirmed unused in all 12 files — MUST NOT be carried
  into the new implementation; the mega-menu pattern (FR-013) is the only real dropdown pattern.

### Updated Success Criteria (header-only; additive to SC-001–SC-006 above)

- **SC-007**: The rebuilt header, screenshot-compared against each of the 12 reference files at
  matching viewport widths, shows zero visible difference in logo size, nav item set/order, mega-menu
  contents/columns/icons, CTA styling, header background/blur/border/height (default and homepage
  scrolled states), and mobile-menu contents.
- **SC-008**: Every one of the 12 reference pages' intended current-page nav highlight (per the
  `is-active` mapping table above) is reproduced exactly once the corresponding real route renders
  the shared header.

### AI Implementation Estimate

This feature will be implemented entirely by Claude Code under spec-driven development (no manual
coding). Estimated effort, expressed as AI agent working sessions rather than human hours:

- **Complexity driver**: this is a full navigation-taxonomy replacement (5 mega-menu groups
  replacing 2 simple dropdowns) plus new token additions (per-industry icon-chip colors, mega-menu
  shadow/grid tokens) plus pixel-value corrections (logo, nav height) — not a small styling tweak.
- **Estimate**: **1 focused implementation session (~2–4 hours of agent-driven work)** across
  `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`, covering: new `tokens.css`/`globals.css`
  entries for mega-menu/icon-chip values, a rewritten `nav-config.ts` (five mega-groups + 2 plain
  links + route table), a rewritten `Header.tsx` mega-menu render path (desktop + mobile), and a
  manual pixel-diff pass against the 12 reference files at the `sm`/`md`/`lg` breakpoints before
  sign-off. No backend/API work is involved; all content is static configuration, consistent with
  this repo's existing pattern.

### UI Findings — Header Interaction & Styling Corrections (2026-07-31)

Four specific divergences between the shipped V2 implementation and the reference files, found
during review of the built header. All four were re-verified directly against the same 12
`.dc.html` files in `raw-files-v2/TechGrit Website V2.2/` (no new reference files); nothing below is
guessed. HEADER ONLY — same footer-out-of-scope constraint as the rest of this V2 Update.

**1. Mega-menu hover-to-open (reverses part of FR-014's decision for pointer input)**

Every one of the 12 reference files' shared `<style>` block opens the mega-menu on mouse hover, not
on click:

```css
.nav-item:hover .nav-chev{transform:rotate(180deg);}
.nav-item:hover::after{content:""; position:absolute; left:0; right:0; top:calc(100% - 4px); height:22px; z-index:110;}
.nav-item:hover .nav-mega{opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);}
```

FR-014 above treated this as "a visual reference only" and kept the click/tap toggle exclusive for
all input types. That decision is now reversed for desktop pointer input specifically: the current
click-to-open behavior is confirmed incorrect for mouse users and MUST become hover-to-open, matching
the reference.

- **FR-019** *(supersedes FR-014 for pointer/mouse input only; FR-014's tap/keyboard requirement
  remains authoritative for touch and keyboard input)*: On pointer/mouse input, each of the five
  mega-menu groups MUST open when the visitor hovers over its trigger (the nav item, including the
  invisible `22px` hover-bridge strip directly beneath it that keeps the menu open while the pointer
  travels from trigger to panel — matching the reference's `.nav-item::after` technique) and MUST
  close when the pointer leaves both the trigger and the panel. The chevron icon MUST rotate 180°
  while the group is open on hover, exactly as it does on click today. Touch input MUST continue to
  open the mega-menu on first tap — rather than navigating immediately — so touch visitors see the
  sub-items before committing (a second tap on the trigger, or tapping a mega-item, then proceeds
  normally); keyboard input MUST continue to open/close via focus/Enter/Escape (FR-014) — hover is
  additive, not a replacement for the existing tap/keyboard mechanism.
- **FR-019a** *(per Clarifications, Session 2026-07-31 — corrects FR-013's implicit
  non-navigating-trigger assumption)*: Each of the five mega-menu triggers MUST be a real link (not
  a non-navigating toggle button) that, on mouse click, navigates to that group's own overview page —
  matching the reference's `<a href>` exactly: What We Do → `/services`, How We Work → `/frameworks`
  (unbuilt destination, renders per the existing "unbuilt destination pages" policy), Industries →
  `/construction` (the existing Industries-group route), Insights → `/case-studies`, About →
  `/about`. This click-navigates behavior applies to mouse input only; touch input's first tap opens
  the panel instead, per FR-019 above.

**2. Mega-menu reveal transform (root cause of the reported "position differs" behavior)**

The reference never mounts/unmounts the panel — it is always present in the DOM and toggles between
two transform states with a transition, which is what makes the panel appear to settle into its
final position smoothly rather than appearing to render in the wrong spot:

```css
.nav-mega{ /* ...position:absolute; top:calc(100% + 14px); left:50%; ... */
  transform:translateX(-50%) translateY(8px);
  opacity:0; visibility:hidden;
  transition:opacity .22s ease, transform .22s ease, visibility .22s;
}
.nav-item:hover .nav-mega{opacity:1; visibility:visible; transform:translateX(-50%) translateY(0);}
```

The current implementation conditionally mounts the panel only while open (`{isOpen && (<div>...)}`)
with no closed state and no transition — the panel's final resting position (`top:calc(100% + 14px)`,
`left:50%`/`translateX(-50%)`, `width:min(940px, calc(100vw - 40px))`) is otherwise correct per
FR-013, but the absence of the reference's transform-based reveal is what reads as the panel
appearing in "a different place."

- **FR-020**: Each mega-menu panel MUST always be present in the DOM (not conditionally
  mounted/unmounted) and MUST toggle between exactly two states via CSS transition (`0.22s ease` for
  opacity and transform): closed (`opacity:0; visibility:hidden; transform:translateX(-50%)
  translateY(8px)`) and open (`opacity:1; visibility:visible; transform:translateX(-50%)
  translateY(0)`) — positioned per FR-013's `top`/`left`/`width` values, unchanged.

**3. "See all" CTA row text coloring (What We Do, Insights — the mega-menu's last row)**

The reference's CTA row (`.m-cta`, the final grid row in the What We Do and Insights mega-menus)
uses two different text colors, not one:

```css
.nav-mega .m-cta .m-cta-label{font-size:12.5px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#fff;}
.nav-mega .m-cta .m-cta-arrow{font-size:15px; color:#F7B733; transition:transform .2s ease;}
```

The current implementation renders both the label and the arrow in the same amber tone
(`text-amber-light` applied to the whole row), confirmed incorrect against the reference.

- **FR-021** *(corrects part of FR-017's CTA-row description)*: In the "See all services" (What We
  Do) and "Explore all insights" (Insights) CTA rows, the label text MUST be white (`#fff`) and only
  the trailing arrow glyph MUST be amber (`#F7B733`) — not both elements in the same color.

**4. Header CTA button label/destination consistency**

All 12 reference files render the identical header CTA — same label, same destination, same styling,
with zero per-page variation:

```html
<a href="TechGrit Contact.dc.html" data-cta-nav style="...">Talk to Us <span style="font-size:16px;">&#8594;</span></a>
```

(Contact's own file uses an in-page `href="#form"` instead of navigating to itself — see Assumptions
below.) Labels like "Start a project," "View open roles," or "Subscribe" do not appear on any header
CTA in any of the 12 files; those strings only exist elsewhere in the reference set (Case Study's
separate in-body CTA card, Blog/Webinar/Homepage's own newsletter-subscribe form buttons) — never on
the shared header CTA. The current implementation's per-page relabeling (`Header.tsx`'s
`isContact`/`isCareers`/`isWebinar` branches swapping in "Start a project," "View open roles," and
"Subscribe") is confirmed incorrect and MUST be removed.

- **FR-022** *(corrects FR-012's CTA description)*: The header's primary CTA MUST render the
  identical label, "Talk to Us," with the identical trailing arrow glyph and identical styling, on
  every page without exception, and MUST link to the Contact page (`/contact`) — except when already
  on the Contact page itself, where it MUST link to the on-page contact form section instead of
  navigating to itself. No other page-specific label or destination substitution is permitted.

**Assumptions**

- **Contact page's own CTA target** (confirmed, not new): the reference's Contact file is the only
  one of the 12 that points its header CTA at `#form` rather than the Contact page itself — an
  expected same-page-anchor exception already implicit in "link to Contact," not a new per-page
  label variant. Careers' and Webinar's current `#roles`/`#subscribe` anchor targets and relabeled
  text are the confirmed bug this update fixes; no reference file supports them.

**Additional Success Criteria (additive to SC-001–SC-008 above)**

- **SC-009**: On a mouse/pointer-input device, hovering over any of the header's five dropdown items
  opens its mega-menu without requiring a click, and moving the pointer away from both the trigger
  and the open panel closes it — verified on every one of the 12 reference-equivalent pages.
- **SC-010**: The "See all services" and "Explore all insights" CTA rows, and the header's primary
  CTA button, show zero visible difference (text color, label text, destination) from the reference
  when compared page-by-page across all 12 reference-equivalent routes.