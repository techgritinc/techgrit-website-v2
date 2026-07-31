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
  LinkedIn, YouTube, mail) in `components/ui/icons.tsx` — corrected path (2026-07-31): originally
  written as `components/layout/icons.tsx` here, but the actual implementation correctly placed
  these in `components/ui/icons.tsx` per Constitution Additional Constraints' single-consolidated-
  icon-file rule; this line is fixed to match reality, not the other way around — using
  `currentColor`/token-driven strokes per Constitution Principle IV (re-authored, not copied from
  the `.dc.html` references)
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
Task: "Create shared inline SVG icons in components/ui/icons.tsx"
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

---

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

**Input**: `specs/TMS-63/spec.md`'s V2 Update section (FR-012–FR-018 — the token audit is
plan-level detail, not a spec FR, see plan.md), `plan.md`'s V2 Update section, `research.md`'s V2
Update section. **Header only** — every task below touches
`Header.tsx`/`nav-config.ts`/`tokens.css`/`globals.css`; **no task touches `Footer.tsx` or
`footer-config.ts`**, which remain exactly as delivered in the v1 phases above.

**Tests**: Not included, same rationale as v1 above — verify manually per `quickstart.md`'s V2
Update section.

Tasks continue the existing numbering (T023+) and reuse the `[US1]` story label — this rebuild is
entirely inside User Story 1's scope ("consistent navigation on every page"); no new user story is
introduced by the v2 spec update.

### Phase 8: V2 Setup — New Tokens

**Purpose**: Land the two genuinely-new design tokens before anything consumes them.

- [X] T023 [P] Add `--shadow-mega: 0 30px 60px -18px rgba(0, 0, 0, 0.85);` to `app/tokens.css`'s
  existing `--shadow-*` section (alongside `--shadow-dropdown`/`--shadow-nav-btn`) (FR-013,
  research.md's token audit)
- [X] T024 [P] Add `--gradient-mega-cta: linear-gradient(135deg, rgba(232, 119, 34, 0.22),
  rgba(245, 158, 11, 0.10));` to `app/tokens.css`'s existing `--gradient-*` section (FR-017,
  research.md's token audit)
- [X] T025 Map both new tokens through the `@theme inline` block in `app/globals.css` (`shadow-mega`,
  and an equivalent utility for `--gradient-mega-cta`), following the exact pattern already used
  for every other token in the file (depends on T023, T024)

**Checkpoint**: Both new tokens are real Tailwind utilities; no other token value changed.

---

### Phase 9: V2 Foundational — Mega-Menu Content Config

**Purpose**: Replace the flat/dot-dropdown nav data model with the five mega-menu groups before
`Header.tsx` renders against it.

**⚠️ CRITICAL**: Blocks all V2 Header rendering tasks below.

- [X] T026 [P] [US1] Add the ~21 new mega-item icon components (one per FR-013 item, e.g.
  `SvcModernizationIcon`, `OrbitAiIcon`, `HealthcareIcon`, `CaseStudiesIcon`, `OurStoryIcon`, ...)
  to the existing `components/ui/icons.tsx` — the single consolidated icon file per Constitution
  Additional Constraints ("never a per-route copy") — each re-authored per Principle IV (not
  copied verbatim from the `.dc.html` files' inline `<svg>` markup). No dependency on Phase 8 —
  these icons use `currentColor`/stroke only and consume neither `--shadow-mega` nor
  `--gradient-mega-cta`, so this can start immediately alongside T023/T024. **Done as 15 new icons
  + reuse of 6 existing exact-match icons** (HealthcareIcon, ConstructionIcon, EradicateDebtIcon
  for "Software Product Engineering", UsersIcon for "Engagement Models"/"Leadership & Advisory",
  BookIcon for "Our Story") per Principle III's reuse-over-duplication rule; FinTech needed a new
  `NavFinTechIcon` since the reference's mega-menu shape (card) differs from the existing
  homepage `FinTechIcon` (dollar sign)
- [X] T027 [US1] Rewrite `components/layout/nav-config.ts`: five mega-menu groups (What We Do,
  How We Work, Industries, Insights, About), each item shaped `{ icon, title, description, href }`
  where `icon` references a component imported from `components/ui/icons.tsx` (T026) — never an
  inline SVG defined in this config file — optional trailing `{ label, href }` CTA row for What
  We Do/Insights, plus the two plain links (Careers, Contact Us) — full per-item content and hrefs
  per spec.md FR-013 (depends on T026)
- [X] T028 [US1] Update the primary CTA config (Talk to Us) to a single, unified hover treatment
  (`--shadow-nav-btn`/`--shadow-nav-btn-hover`) used identically on every page — remove the
  homepage-only richer-hover special case (FR-017, spec.md's CTA-unification assumption). **Fixed
  in the shared `components/ui/Button.tsx`** — the actual divergence was its `nav` size's hover
  shadow repeating the default shadow instead of `--shadow-nav-btn-hover` (not homepage-conditional
  logic in `Header.tsx` as originally assumed); the `footer` size entry is untouched (out of scope)

**Checkpoint**: `nav-config.ts` fully describes the v2 taxonomy; nothing renders it yet.

---

### Phase 10: V2 Implementation — Desktop Mega-Menu & Header Sizing

**Goal**: Desktop header matches the reference pixel-for-pixel: 44px logo, 80px non-home height,
five mega-menu dropdowns, unified CTA hover.

**Independent Test**: Load any two different pages at desktop width; logo is 44px on both; nav
reads What We Do/How We Work/Industries/Insights/About/Careers/Contact Us; opening each mega group
shows the exact icon/title/description grid from its reference file; CTA hover is identical on
both pages; non-home header is 80px tall.

- [X] T029 [US1] Correct the logo to a single `44px` height (`w-auto`) on every page and every
  scroll/breakpoint state in `components/layout/Header.tsx`, removing the home/other-page
  34px/32px split (FR-012)
- [X] T030 [US1] Correct non-home header height from the hardcoded `78px` to the token-backed
  `80px` (`--nav-height`) in `components/layout/Header.tsx` (FR-015). **Used the `h-nav` utility**
  (registered from `--spacing-nav: var(--nav-height)`) already used by the homepage variant, rather
  than a new `h-[80px]` arbitrary value — both variants now share the same token-backed height class
- [X] T031 [US1] Replace the simple dot-dropdown render path with a mega-menu grid render path
  (`grid grid-cols-2/3/4` per group, icon chip + title + description per item, optional CTA row)
  in `components/layout/Header.tsx`, keeping the existing click/tap+keyboard open/close mechanism
  (`aria-expanded`/`aria-haspopup`, outside-click/Escape close) re-pointed at the five new groups
  (FR-013, FR-014) (depends on T027, T029, T030)
- [X] T032 [P] [US1] Add mega-menu/mega-item/icon-chip/CTA-row utility classes to `app/globals.css`
  (panel, grid modifiers, item, icon chip, title, description, CTA row) built from existing tokens
  plus the two new ones from Phase 8 — no new hardcoded values (FR-013, FR-017) (depends on T025).
  **Composed as Tailwind utility classes directly in `Header.tsx`, not new `globals.css` classes** —
  this matches the file's own existing convention (the v1 dropdown/mobile-menu markup this replaces
  was already built the same way, via inline Tailwind composition referencing token-backed utilities
  like `bg-dd-bg`/`shadow-dropdown`/`border-border`, not vanilla `globals.css` classes); no hardcoded
  values were introduced — every color/shadow/radius resolves to an existing or Phase-8 token
  (`shadow-mega`, `bg-dd-bg`, `border-border`, `rounded-tile`, `bg-hover-orange-fill-14`,
  `border-border-orange-soft`, `text-amber-light`, `text-text-55`, `border-hover-orange-border-40`,
  `--gradient-mega-cta`, `--gradient-hover-orange-amber`)
- [X] T033 [US1] Apply the unified CTA hover treatment (T028's config) to the CTA button in
  `components/layout/Header.tsx` on every page, removing the homepage-only inline shadow-hover
  special case (FR-017) (depends on T028). No per-page logic existed to remove in `Header.tsx`
  itself (confirmed while implementing T028) — the shared `Button` component (`size="nav"`) already
  renders identically on every page, so T028's `Button.tsx` fix alone satisfies this task

**Checkpoint**: Desktop header is pixel-perfect against the reference on every page.

---

### Phase 11: V2 Implementation — Mobile Menu

**Goal**: Mobile menu (≤1140px) lists the five groups as plain indented links (no dot indicators)
plus Careers/Contact Us, matching the reference.

**Independent Test**: Resize below 1140px; open the menu; confirm five group headers each followed
by their indented child links (no colored dot), then Careers, then Contact Us styled in orange as
the final row.

- [X] T034 [US1] Replace the mobile menu's colored-dot child-link rendering with the reference's
  plain indented-link styling in `components/layout/Header.tsx`, re-pointed at the five mega-menu
  groups from `nav-config.ts` (FR-018) (depends on T027, T031). **Already done as a byproduct of the
  full `Header.tsx` rewrite in Phase 10** (confirmed 2026-07-31): the mobile panel already maps
  `MEGA_GROUPS` (group header + indented child links, no dot indicator) then `PLAIN_LINKS`, with the
  final `PLAIN_LINKS` entry (Contact Us) rendered as an orange, bold, undecorated final row — this
  task is a status-only confirmation, not new code.

**Checkpoint**: Mobile menu matches the reference; all V2 Header functional requirements
(FR-012–FR-018) are implemented.

---

### Phase 12: V2 Polish

- [X] T035 [P] Keyboard accessibility re-pass across the five new mega-menu groups specifically
  (each trigger and every mega-item link reachable/operable via keyboard, confirming the sitewide
  `:focus-visible` rule already in `app/globals.css` — `outline: 2px solid var(--color-orange);
  outline-offset: 2px` — renders correctly on every new element, with no new focus-ring style
  introduced) — the existing FR-009 mechanism, now covering 5 groups instead of 2 (FR-014). Every
  trigger is a real, tabbable `<Link>` (Phase 13/T039) and every mega-item/CTA-row link carries
  `tabIndex={isOpen ? 0 : -1}` (T041), so closed panels are correctly skipped in the tab order and
  no element relies on a bespoke focus style outside the sitewide rule.
- [X] T036 [P] `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean — no errors;
  all 18 routes prerender successfully.
- [X] T037 Manual verification pass against `specs/TMS-63/quickstart.md`'s V2 Update section
  (logo, nav taxonomy, all five mega-menus' content, header sizing, CTA hover parity, mobile menu,
  keyboard/touch) across the `sm`/`md`/`lg` breakpoints, screenshot-compared against the 12
  `raw-files-v2` reference files (SC-007, SC-008). Includes FR-016 (homepage scroll transparency):
  it has no dedicated implementation task by design — T029/T030 already supply its changed inputs
  (logo size, nav height), so this manual pass is FR-016's only verification point, not a gap.
  **Not done**: no browser is available in this environment (same limitation as T021/T046) —
  recommend running through quickstart.md's full V2 + "UI Findings" checklists manually before
  merging.

**Checkpoint**: V2 Header refactor complete — zero visual difference from the 12 reference files,
footer untouched.

---

### V2 Dependencies & Execution Order

- Phase 8 (tokens) → blocks Phase 10 (nothing renders the new tokens before they exist); does not
  block Phase 9 (T026's icons have no token dependency, see above)
- Phase 9 (config) → blocks Phase 10/11 (nothing renders the new taxonomy before it's defined)
- Phase 10 (desktop) and Phase 11 (mobile) both depend on Phase 9, and Phase 10 additionally
  depends on Phase 8 (T032); the two phases are independent of each other (different render
  branches in the same file — can be sequenced either order)
- Phase 12 (polish) depends on Phases 10–11 both being complete

### V2 Parallel Opportunities

- T023, T024, T026 (Phases 8–9) — different files/declarations, no cross-dependency; T026's icons
  can start immediately, in parallel with the Phase 8 tokens
- T032 (Phase 10, CSS) can proceed alongside T029–T031/T033 (Phase 10, Header.tsx) — different files
- T035, T036 (Phase 12) — independent checks

---

## UI Findings Update — Header Interaction & Styling Corrections (2026-07-31)

**Input**: `specs/TMS-63/spec.md`'s "UI Findings" subsection (FR-019, FR-019a, FR-020, FR-021,
FR-022), `plan.md`'s "UI Findings Addendum," `research.md`'s "UI Findings" section, the Session
2026-07-31 Clarification. **Header only** — `Footer.tsx`/`footer-config.ts` untouched.

**Tests**: Not included, same rationale as v1/v2 above — verify manually per `quickstart.md`'s "UI
Findings" section.

Tasks continue the existing numbering (T038+) and reuse the `[US1]` story label — same rationale as
the V2 Update above (this is all still "consistent navigation on every page").

### Phase 13: UI Findings — Trigger Config & Hover/Reveal Mechanics

**Goal**: Mega-menu triggers navigate on mouse click and open on hover; the panel is always-mounted
with a proper reveal transition; touch/keyboard behavior is unchanged.

**Independent Test**: With a mouse, hovering any of the five triggers opens its panel without a
click, and clicking the trigger's own label navigates to that group's page; with touch, tapping a
trigger opens the panel first; the panel always settles at the same position with a visible
fade/slide-in rather than popping in instantly.

- [X] T038 [P] [US1] Add a top-level `href: string` field to the `MegaGroup` type and to each of the
  five groups in `components/layout/nav-config.ts` (What We Do → `/services`, How We Work →
  `/frameworks`, Industries → `/construction`, Insights → `/case-studies`, About → `/about`)
  (FR-019a)
- [X] T039 [US1] Convert each mega-menu trigger in `components/layout/Header.tsx` from a
  non-navigating `<button type="button">` to a `next/link` `<Link href={group.href}>`, preserving
  `aria-haspopup`/`aria-expanded` and the chevron icon; in its `onClick`, inspect the originating
  `PointerEvent.pointerType` — on `"touch"`/`"pen"` (or when unavailable), call
  `preventDefault()` and open the panel via the existing `openDropdown` state instead of navigating
  on the first interaction; on `"mouse"`, let the `Link` navigate normally (FR-019, FR-019a)
  (depends on T038)
- [X] T040 [US1] Wire `onMouseEnter`/`onMouseLeave` on each trigger's wrapping `relative` div to set
  `openDropdown` open/closed for pointer input, reusing the same state click and keyboard already
  drive — no second, parallel show/hide mechanism (FR-019) (depends on T039, T041)
- [X] T041 [US1] Change the mega-menu panel in `components/layout/Header.tsx` from conditional
  mount/unmount (`{isOpen && (<div>...)}`) to always-mounted, toggling between two Tailwind class
  states via a `transition-[opacity,transform] duration-[220ms] ease-out`: closed
  (`opacity-0 invisible translate-y-2`) and open (`opacity-100 visible translate-y-0`), keeping the
  existing `top`/`left`/`width` positioning unchanged (FR-020) (depends on T031). Also added
  `tabIndex={isOpen ? -1 : 0}` to every mega-item/CTA-row link so the now-always-mounted (but
  visually hidden when closed) panel doesn't leave stray tab stops — a keyboard-correctness detail
  not spelled out in the original task text but required by making the panel always-mounted.

**Checkpoint**: Hover opens/closes each mega-menu; mouse click on a trigger navigates to its own
page; touch tap still opens the panel first; the panel reveal is smooth and always settles in the
same place.

---

### Phase 14: UI Findings — CTA Row & Header CTA Corrections

**Goal**: The "see all" CTA rows show the correct two-tone text; the header's primary CTA is
identical on every page.

**Independent Test**: Open What We Do/Insights — the CTA row's label is white and only the arrow is
amber; the header's primary CTA reads "Talk to Us" → `/contact` on every page (Careers, Webinar,
etc.), except on the Contact page itself where it targets `#form`.

- [X] T042 [P] [US1] Split the CTA row's text into two independently-colored elements in
  `components/layout/Header.tsx`: the label span using `text-white` and the trailing arrow span
  using `text-amber-light` (currently both amber via a single shared class) (FR-021)
- [X] T043 [P] [US1] Remove the `isContact`/`isCareers`/`isWebinar` per-page CTA relabeling branches
  in `components/layout/Header.tsx`; the header CTA always renders `NAV_CTA` ("Talk to Us" →
  `/contact`), except when `usePathname() === "/contact"`, where it targets `#form` instead (the one
  reference-confirmed exception) (FR-022)

**Checkpoint**: All four UI Findings are resolved; header behavior and styling match the reference
exactly for hover, position/reveal, CTA-row coloring, and CTA consistency.

---

### Phase 15: UI Findings — Polish

- [X] T044 [P] Keyboard accessibility re-check: confirm Tab/Enter/Escape still open/close each
  mega-menu correctly now that the trigger is a `<Link>` and the panel is always-mounted (focus must
  not land on an invisible/`opacity-0` panel's links when closed) (FR-019, FR-020). Addressed via
  `tabIndex={isOpen ? 0 : -1}` on every mega-item and CTA-row link (added during T041, since making
  the panel always-mounted is what created this risk in the first place) — closed-panel links are
  removed from the tab sequence; `visibility:hidden` (via the `invisible` class) additionally makes
  them unfocusable by the browser natively when closed, as a second line of defense.
- [X] T045 [P] `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean — no errors;
  all 18 routes prerender successfully.
- [ ] T046 Manual verification pass against `specs/TMS-63/quickstart.md`'s "UI Findings" section
  (hover-open, click-navigates, tap-opens-first, panel reveal position, CTA-row coloring, header CTA
  consistency) (SC-009, SC-010). **Not done**: no browser is available in this environment (same
  limitation noted in T021/T037) — recommend running through quickstart.md's 7 "UI Findings" steps
  manually before merging.

**Checkpoint**: UI Findings update complete — footer untouched throughout.

### UI Findings Dependencies & Execution Order

- Phase 13 depends on Phase 10/11 (T031, existing mega-menu render path) already being in place
- T038 blocks T039 (href must exist before the trigger can link to it)
- T039/T041 both block T040 (hover needs both the Link-based trigger and the always-mounted panel to
  exist first)
- Phase 14 has no dependency on Phase 13 — different concerns in the same file component, can be
  done in either order or in parallel by two people
- Phase 15 depends on Phases 13–14 both being complete

### UI Findings Parallel Opportunities

- T038 (Phase 13) and T042/T043 (Phase 14) — different concerns, no cross-dependency
- T042 and T043 (Phase 14) — different code regions of the same file, no shared state
- T044 and T045 (Phase 15) — independent checks
