---
description: "Task list for Global Header & Footer Layout (TMS-63)"
---

# Tasks: Global Header & Footer Layout

**Input**: Design documents from `specs/TMS-63/` (plan.md, research.md, data-model.md [N/A —
UI-only, no data entities], quickstart.md)
**Prerequisites**: plan.md, spec.md (4 user stories, priorities P1/P2/P2/P3)

**Tests**: Not included. No test framework exists in this repository and spec.md did not request
automated tests (see plan.md → Technical Context). Verification is manual, per quickstart.md.

**Organization**: Tasks are grouped by user story so each story is independently completable and
testable, per spec.md's own "Independent Test" for each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Maps to spec.md's user stories (US1–US4)
- File paths are exact and relative to the repository root

## Path Conventions

- Shared layout components: `components/layout/` (existing, currently-empty top-level directory
  — see plan.md's Constitution Check and Complexity Tracking for why this is the correct location)
- Root layout wiring: `app/layout.tsx`
- Shared styling: `app/globals.css`, `app/tokens.css` (only additive changes — no existing rule is
  removed or overridden, per Constitution Principle I)

---

## Phase 1: Setup

**Purpose**: Prepare the one new directory this feature needs.

- [X] T001 Create `components/layout/` directory (the top-level `components/` folder already
  exists and is empty; this feature is the first to add real files to it)

**Checkpoint**: Directory ready for foundational files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Stand up the two shared components as minimal, mounted placeholders and the shared
icon set every user story's work will extend. No page currently renders a header or footer, so
this phase makes that true before any story-specific behavior is added.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Create shared inline SVG icon components (chevron, dropdown dot, hamburger,
  LinkedIn, YouTube, mail) in `components/layout/icons.tsx`, using `currentColor`/token-driven
  strokes per Constitution Principle IV (re-authored, not copied from the `.dc.html` references)
- [X] T003 [P] Create `components/layout/Header.tsx` as a minimal Client Component rendering only
  the logo (linked to `/`) inside a `<header>` element
- [X] T004 [P] Create `components/layout/Footer.tsx` as a minimal Client Component rendering only
  the brand block (logo + one-line description) inside a `<footer>` element
- [X] T005 Wire `<Header />` and `<Footer />` into `app/layout.tsx`, rendering
  `<Header /> {children} <Footer />` inside `<body>` (depends on T003, T004)

**Checkpoint**: Every page now renders a (minimal) header and footer. User story implementation
can begin.

---

## Phase 3: User Story 1 - Consistent navigation on every page (Priority: P1) 🎯 MVP

**Goal**: A full primary navigation menu (with working Industries/Resources dropdowns, active-item
highlighting, and the primary CTA) appears identically on every page, at desktop widths.

**Independent Test**: Load any two different pages; confirm identical logo, nav links (in order),
and CTA; confirm clicking the logo returns to `/`; confirm Industries/Resources open a submenu
without navigating away; confirm the nav item matching the current page is visually marked active.

- [X] T006 [P] [US1] Define `components/layout/nav-config.ts`: the 7 primary items (Services,
  Industries, Resources, Blog, About Us, Careers, Contact Us) with Industries →
  Construction/FinTech/Healthcare and Resources → Webinar/Case Studies as sub-items (FR-002,
  FR-003)
- [X] T007 [US1] Implement desktop primary nav rendering in `components/layout/Header.tsx` (nav
  links + primary CTA) driven by `nav-config.ts` (FR-001) (depends on T006)
- [X] T008 [US1] Implement Industries/Resources dropdown behavior in `components/layout/Header.tsx`
  — click/tap to open (not hover-only), `aria-expanded`/`aria-haspopup`, closes on outside
  click/Escape/link-follow (FR-002, FR-003, FR-010) (depends on T007)
- [X] T009 [US1] Implement active-nav-item detection in `components/layout/Header.tsx` using
  `usePathname()` against each item's `matchPaths` (FR-005) (depends on T007)
- [X] T010 [P] [US1] Add nav/dropdown utility classes to `app/globals.css` (kebab-case,
  base+modifier, following the file's existing catalog) built only from existing `tokens.css`
  values — no new colors/spacing (Constitution Principle I, III)

**Checkpoint**: User Story 1 is fully functional and independently testable — desktop navigation
works identically on every page.

---

## Phase 4: User Story 2 - Reliable way to scroll and still navigate (Priority: P2)

**Goal**: The header stays reachable while scrolling on every page, and on the homepage
specifically starts transparent over the hero and solidifies on scroll.

**Independent Test**: Scroll down any page — header remains visible/pinned. On `/`, confirm it
starts blended into the hero visual and becomes fully opaque once scrolling begins; on every other
page it should already be solid at the top.

- [X] T011 [US2] Implement pinned/sticky header positioning in `components/layout/Header.tsx`,
  reusing the existing `--nav-height` token and the `[id] { scroll-margin-top: var(--nav-height); }`
  rule already in `app/globals.css` (FR-004) (depends on T007)
- [X] T012 [US2] Implement the homepage-only transparent-over-hero → solid-on-scroll variant in
  `components/layout/Header.tsx`, gated on `usePathname() === "/"` plus a scroll listener (per
  spec.md's "Header behavior" decision) (depends on T011)

**Checkpoint**: User Story 2 is independently testable — header remains usable while scrolling on
every page, with the homepage's variant behaving correctly.

---

## Phase 5: User Story 3 - Consistent footer with contact and legal info (Priority: P2)

**Goal (Footer-only update, 2026-07-30)**: Every page's footer shows the fully identical brand
block, contact block, five-group site-map link grid, "Follow us" social row, decorative wordmark,
and legal utility bar — pixel-matched to `TechGrit Homepage.dc.html` per spec.md FR-012–FR-018 —
with **zero page-to-page variation** (supersedes the earlier "quick-link group varies by page"
goal; see spec.md FR-008).

**Independent Test (Footer-only update, 2026-07-30)**: Load any page, scroll to the bottom; confirm
the brand+contact row, the five-group link grid (What We Do, How We Work, Industries, Insights,
Company), the "Follow us" row (LinkedIn/YouTube/Spotify), the wordmark, and the utility bar
(copyright + Privacy Policy/Terms of Service/Cookie Preferences) are present and byte-for-byte
identical on every page; confirm no dead links, including anchor-fragment links to not-yet-built
page sections (spec.md Edge Cases, SC-008).

- [X] T013 [P] [US3] Rewrite `components/layout/footer-config.ts` (Footer-only update, 2026-07-30
  — supersedes the original route-keyed lookup table) as a flat, page-invariant config exporting:
  the five-group site-map link grid content exactly as enumerated in spec.md FR-015 (What We Do: 7
  links; How We Work: 3; Industries: 4 — HealthTech/FinTech/ConstructionTech/HiTech; Insights: 3;
  Company: 4), social links (LinkedIn, YouTube, Spotify), legal links (Privacy Policy → `/privacy`,
  Terms of Service → `/terms`, Cookie Preferences → `/`), and the General/Careers contact details
  (FR-014, FR-015, FR-017; spec.md Clarifications Q1, Q4, Q5)
- [X] T014 [US3] Rebuild `components/layout/Footer.tsx`'s brand+contact top row (Footer-only
  update, 2026-07-30): brand block (logo, one-line description, gradient-fill pill "Start a
  conversation" CTA linking to the Contact page) beside the two-column General/Careers contact
  block, separated from the link grid below by a hairline bottom border (FR-014) (depends on T013)
- [X] T015 [P] [US3] Rewrite footer utility classes in `app/globals.css` (Footer-only update,
  2026-07-30) for the link-grid columns, "Follow us" row, and utility bar, built only from existing
  or newly-added `tokens.css` values (depends on T023)

**Checkpoint**: User Story 3 is independently testable — footer is consistent and correct on every
page.

### Phase 5 continued — Footer pixel-fidelity enhancement (Footer-only update, 2026-07-30)

**Purpose**: Bring the already-scaffolded Footer up to the pixel/color/spacing/interaction detail
newly captured in spec.md FR-012–FR-018, using `TechGrit Homepage.dc.html` as sole source of truth.
Appended with new task IDs (rather than renumbering T016+) to avoid touching any Header-owned task
numbering.

- [X] T023 [P] [US3] Cross-check every FR-012–FR-018 raw value (gradient bar stops, glow
  colors/blur radii, the fixed 36px padding, wordmark `clamp()`/letter-spacing/opacity-fade values)
  against `app/tokens.css`; add any value with no existing match to its matching numbered section
  and expose it via `@theme inline` in `app/globals.css` (Constitution Principle I; research.md's
  token cross-check decision)
- [X] T024 [US3] Implement the footer's decorative outer chrome in `components/layout/Footer.tsx`
  and `app/globals.css`: `overflow:hidden` region with a hairline top border, a 3px full-width
  gradient bar (`#0284C7 → #0F766E → #F59E0B → #E87722`), and two absolutely-positioned, blurred
  520×520px glow circles — all `aria-hidden`, non-interactive, and clipped so they never cause
  horizontal scroll (FR-012) (depends on T023)
- [X] T025 [US3] Implement the footer's fixed-36px-padding, 1280px-max-width shell in
  `app/globals.css` as a documented, footer-scoped exception to the shared `.container` utility
  (does not modify `.container` itself) (FR-013; research.md's fixed-padding decision) (depends on
  T023)
- [X] T026 [P] [US3] Implement the site-map link grid layout in `components/layout/Footer.tsx`
  (narrow "What We Do" single column + wide 4-column "How We Work"/"Industries"/"Insights"/"Company"
  sub-grid) and the "Follow us" icon row beneath it, driven entirely by the rewritten
  `footer-config.ts` (FR-015) (depends on T013)
- [X] T027 [US3] Add a Spotify inline SVG icon to `components/layout/icons.tsx` alongside the
  existing LinkedIn/YouTube marks (the mail icon originally scoped for footer social use is no
  longer needed there — email is covered by the General/Careers contact block) (FR-015;
  research.md's icon decision)
- [X] T028 [US3] Implement the decorative, center-aligned "TechGrit" wordmark below the link grid
  in `components/layout/Footer.tsx`/`app/globals.css`: `margin-top:36px`, fluid
  `clamp(74px, 17vw, 232px)` size, `line-height:0.74`, `font-weight:700`,
  `letter-spacing:-0.045em`, `white-space:nowrap`, top-to-bottom gradient-fade fill, `aria-hidden`,
  `user-select:none` (FR-016)
- [X] T029 [US3] Rebuild the utility bar in `components/layout/Footer.tsx`: darker background band
  with its own hairline top border, centered row with the copyright notice followed by Privacy
  Policy, Terms of Service, and Cookie Preferences (replacing the prior 2-link Privacy/Terms-only
  version) (FR-017) (depends on T013)
- [X] T030 [US3] Implement footer hover/focus micro-interactions in `app/globals.css` — CTA lift +
  stronger shadow, link brightening to full white, social-icon background/border tint + slight
  lift — plus a `prefers-reduced-motion: reduce` override, additive to (not replacing) the existing
  reduced-motion rule scoped to `.bg-ambient-orbs span`, that suppresses only each rule's
  `translateY` while leaving color/shadow transitions intact (FR-014, FR-015; spec.md
  Clarifications Q3) (depends on T014, T026)
- [X] T031 [US3] Implement the footer's two dedicated responsive breakpoints in `app/globals.css`
  — replacing the prior generic 960px/560px assumption: at ≤1080px, stack the brand/contact row and
  stack "What We Do" above the right region (whose sub-grid becomes 2 columns); at ≤640px, collapse
  the sub-grid to a single column, stack the "Follow us" label above its icons, and switch the
  utility bar to a left-aligned stacked column; no intermediate breakpoint between them (FR-018)
  (depends on T026, T029)

**Checkpoint**: Footer matches `TechGrit Homepage.dc.html` pixel-for-pixel per SC-007, with zero
page-to-page content variation per SC-002/FR-008, at every documented breakpoint.

---

## Phase 6: User Story 4 - Usable on small screens (Priority: P3)

**Goal**: Header collapses into a single mobile menu control below the project's 1140px
breakpoint; footer stacks into one readable column on narrow screens.

**Independent Test**: Resize to a phone width — header's nav/CTA hide behind a menu control that,
when opened, reveals every link (including grouped, labeled Industries/Resources sub-items) and
the CTA with nothing clipped; footer columns stack into one column with no overlap.

- [X] T016 [US4] Implement the mobile menu toggle + overlay panel in `components/layout/Header.tsx`
  using the existing `[data-desktop-nav]`, `[data-cta-nav]`, `[data-burger]` hooks and the
  `max-width:1140px` rule already in `app/globals.css` — no new breakpoint (FR-006) (depends on
  T008, T009)
- [X] T017 [US4] Render Industries/Resources sub-items as grouped, labeled links inside the mobile
  panel (FR-006) (depends on T016)
- [X] T018 [US4] Verify responsive column stacking for `components/layout/Footer.tsx` (Footer-only
  update, 2026-07-30 — supersedes the original 960px/560px assumption; the footer's actual
  breakpoints are its own dedicated 1080px/640px thresholds, implemented in T031 in Phase 5) —
  confirm no overlap, clipping, or horizontal scroll at any width between and around those two
  breakpoints (FR-011, FR-018) (depends on T031)

**Checkpoint**: All four user stories are independently functional — feature is complete for
manual verification.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story quality gates that apply to both components together.

- [X] T019 [P] Keyboard accessibility pass across `components/layout/Header.tsx` and
  `components/layout/Footer.tsx`: every link, the menu toggle, and dropdown triggers reachable and
  operable via keyboard with a visible focus indicator; icon-only social links have accessible
  names (FR-009, SC-004)
- [X] T020 [P] Run `npm run lint` and `npm run build`; fix any errors (existing Husky pre-commit
  gate per constitution's Development Workflow) — both pass clean
- [X] T021 Manual verification pass against `specs/TMS-63/quickstart.md` (desktop, scroll, mobile,
  keyboard, touch). **Partially done**: confirmed via curl against the running dev server that
  Header/Footer render server-side with no runtime errors (logo, nav labels, footer contact/legal
  links all present in the HTML). Visual/interactive checks (scroll transparency, dropdown
  open/close, mobile-width collapse, touch tap, keyboard tab-through) were NOT verified in an
  actual browser — no browser is available in this environment. Recommend running through
  quickstart.md's 9 steps manually before merging. **Footer-only addendum (2026-07-31)**: rebuilt
  Footer.tsx against `TechGrit Homepage.dc.html`'s exact footer markup (lines 900-1015); re-ran
  `npm run lint` and `npm run build` (both pass clean) and confirmed via curl against the dev
  server that the brand/contact block, five-group link grid, Follow-us row, wordmark, and utility
  bar all render byte-for-byte identically on `/` and `/contact` (Steps 5-6's content-parity
  requirement). Steps 5-6's visual pixel-fidelity, hover-lift, and
  `prefers-reduced-motion: reduce` checks still require a real browser and were not run here —
  recommend a manual pass before merging.
- [X] T022 Amend `.specify/memory/constitution.md`'s "Additional Constraints" section to record
  that `components/` now holds real code (`components/layout/`) — the follow-up flagged in
  plan.md's Constitution Check. Bumped constitution to v1.2.0.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational + US1's Header base (T007) — extends the
  same file
- **User Story 3 (Phase 5)**: Depends on Foundational only — independent of US1/US2 (different
  component, different files)
- **User Story 4 (Phase 6)**: Depends on US1 (T008/T009) for the header half, and US3 (T031,
  Footer-only update 2026-07-30 — was T014) for the footer half
- **Polish (Phase 7)**: Depends on all four user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories — buildable and testable alone once Foundational is
  done
- **US2 (P2)**: Builds on US1's Header (same file, additive) but is its own independently testable
  slice (scroll/pin behavior)
- **US3 (P2)**: No dependency on US1/US2 — entirely separate component/files; can be built in
  parallel with US1/US2 by a different person
- **US4 (P3)**: Depends on both US1 (header nav to collapse) and US3 (footer to stack) existing
  first

### Parallel Opportunities

- T002, T003, T004 (Foundational) — different files, no cross-dependency
- T006 and T010 (US1) — different files (config vs. CSS)
- T013 and T023 (US3) — different files (config vs. tokens), both startable immediately
  (Footer-only update, 2026-07-30 — supersedes "T013 and T015" now that T015 depends on T023)
- T026 and T027 (US3) — different files (Footer.tsx layout vs. icons.tsx), once T013 lands
- US3 (Phase 5) can proceed in parallel with US1/US2 (Phases 3–4) once Foundational is done, since
  Header and Footer are separate files with no shared state
- T019 and T020 (Polish) — independent checks

---

## Parallel Example: Foundational Phase

```bash
# Launch T002, T003, T004 together — three independent new files:
Task: "Create shared inline SVG icons in components/layout/icons.tsx"
Task: "Create minimal placeholder Header.tsx in components/layout/Header.tsx"
Task: "Create minimal placeholder Footer.tsx in components/layout/Footer.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: every page has a working desktop nav with dropdowns and active-state
   highlighting
5. This alone is a shippable improvement over the current single hardcoded homepage scaffold

### Incremental Delivery

1. Setup + Foundational → header/footer are mounted everywhere (minimal)
2. Add US1 → full desktop nav → validate → this is the MVP
3. Add US2 → scroll/pin + homepage transparency → validate
4. Add US3 → full footer → validate (can be done in parallel with US2 by a second person, since
   it touches entirely different files)
5. Add US4 → mobile collapse for both → validate
6. Polish → accessibility + lint/build + constitution amendment

### Parallel Team Strategy

With two people: once Foundational is done, one takes US1 → US2 (Header) while the other takes
US3 (Footer) in parallel — they only need to coordinate for US4, which depends on both.

---

## Notes

- [P] tasks touch different files with no unresolved dependency
- [Story] label maps every user-story-phase task back to spec.md for traceability
- No test tasks were generated — see the "Tests" line at the top of this file
- Commit after each task or logical group
- Stop at any checkpoint to validate that story independently before continuing
