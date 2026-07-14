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

**Goal**: Every page's footer shows the same brand block, social links, get-in-touch block, and
legal row, with only the quick-link group's content varying by page.

**Independent Test**: Load any page, scroll to the bottom; confirm brand block, social links
(LinkedIn/YouTube/email), a contact method, and Privacy/Terms links are present; confirm the
quick-link group's content differs sensibly between, e.g., `/` and another route while everything
else stays the same; confirm no dead links.

- [X] T013 [P] [US3] Define `components/layout/footer-config.ts`: social links (LinkedIn, YouTube,
  email), legal links (Privacy Policy, Terms & Conditions), contact details, and a route→quick-link
  -group lookup table with at least a default group and a `/`-specific group (FR-007, FR-008)
- [X] T014 [US3] Implement the full `components/layout/Footer.tsx` structure: brand block, social
  links row, the quick-link group selected via `usePathname()` against `footer-config.ts`,
  get-in-touch block, and legal row (FR-007, FR-008) (depends on T013, T004)
- [X] T015 [P] [US3] Add footer utility classes (link columns, legal row, social icon row) to
  `app/globals.css`, built only from existing `tokens.css` values

**Checkpoint**: User Story 3 is independently testable — footer is consistent and correct on every
page.

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
- [X] T018 [US4] Verify/adjust responsive column stacking for `components/layout/Footer.tsx` at the
  existing `md`/`sm` breakpoints (960px/560px) in `app/globals.css` (FR-011) (depends on T014)

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
- [ ] T021 Manual verification pass against `specs/TMS-63/quickstart.md` (desktop, scroll, mobile,
  keyboard, touch). **Partially done**: confirmed via curl against the running dev server that
  Header/Footer render server-side with no runtime errors (logo, nav labels, footer contact/legal
  links all present in the HTML). Visual/interactive checks (scroll transparency, dropdown
  open/close, mobile-width collapse, touch tap, keyboard tab-through) were NOT verified in an
  actual browser — no browser is available in this environment. Recommend running through
  quickstart.md's 9 steps manually before merging.
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
- **User Story 4 (Phase 6)**: Depends on US1 (T008/T009) for the header half, and US3 (T014) for
  the footer half
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
- T013 and T015 (US3) — different files (config vs. CSS)
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
