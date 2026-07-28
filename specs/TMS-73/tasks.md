---

description: "Task list for Webinar Series Page feature implementation"
---

# Tasks: Webinar Series Page

**Input**: Design documents from `/specs/TMS-73/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No test tasks are included. No test framework is configured in this repo (per
constitution's Development Workflow section) and the spec did not request a TDD approach.
Verification is manual — see quickstart.md and the checkpoints below.

**Organization**: Tasks are grouped by user story (spec.md) to enable independent implementation
and testing of each story. Per an explicit follow-up plan directive, this feature's route-local
component surface is exactly 3 section files (`hero-section.tsx`, `sessions-section.tsx`,
`subscribe-panel.tsx`, research.md §8) rather than one file per sub-piece — several tasks below
therefore create or extend the *same* section file rather than a dedicated file per user story.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]** (Constitution Principle VI): Task produces user-visible frontend output; the vendored
  `frontend-design` skill is invoked before executing it. Not applied to data/config/token tasks.
- **[Story]**: Which user story this task belongs to (US1–US5, per spec.md)
- Exact file paths are included in each description

## Path Conventions

Single Next.js App Router project, all new route-local code colocated under `app/webinar/` (per
plan.md's Structure Decision — 3 section files, no top-level `components/`/`lib/` split), plus
backward-compatible extensions to the already-shared `components/ui/GlassCard.tsx`,
`components/ui/Badge.tsx`, and `components/ui/icons.tsx`, and new tokens added to
`app/tokens.css`/`app/globals.css`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/webinar/`, `app/webinar/_components/`,
  `app/webinar/_data/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Add the 21 new tokens identified in research.md §1c to `app/tokens.css`, each in its
  existing numbered section: `--color-overlay-orange-10`, `--color-border-orange-soft`,
  `--color-overlay-orange-06`, `--color-border-amber-medium`, `--color-overlay-amber-04`,
  `--color-border-blue-light-soft`, `--color-overlay-blue-light-06`,
  `--color-overlay-blue-light-18`, `--color-border-amber-30`, `--color-overlay-amber-16`,
  `--color-text-66`, `--color-text-82` (§4 Borders & Glass); `--gradient-webinar-upcoming` (§5
  Gradients); `--text-webinar-hero`, `--text-webinar-h2`, `--text-14-5` (§6 Typography);
  `--size-220`, `--size-150` (§8 Layout); `--radius-tile` (§9 Border Radius);
  `--shadow-glow-amber-sm` (§10 Shadows); `--blur-glow-100` (§14 Backdrop Blur)
- [X] T003 [P] Map 18 of the 21 tokens from T002 into `app/globals.css`'s `@theme inline` block.
  Leave 3 unmapped: `--text-webinar-hero`/`--text-webinar-h2` (consumed via arbitrary values per
  Constitution Principle I's heading-override rule) and `--gradient-webinar-upcoming` (no
  `--gradient-*` token is ever mapped in this codebase — confirmed `--gradient-brand`/
  `--gradient-brand-text` aren't either; consumed via `bg-[image:var(--gradient-webinar-upcoming)]`)
  (depends on T002)
- [X] T004 [P] [UI] Extend `components/ui/Badge.tsx`: add `"orangeOutline"` to the `BadgeTone` union
  with a matching `TONE_CLASSES` entry (`bg-[var(--color-overlay-orange-10)]
  border border-[var(--color-border-orange-soft)] text-strong`) (research.md §2)
- [X] T005 [P] [UI] Extend `components/ui/GlassCard.tsx`: add `"webinarUpcoming"` (`rounded-3xl
  border-[var(--color-border-amber-30)] bg-[image:var(--gradient-webinar-upcoming)] px-9 py-[38px]`)
  and `"webinarReleased"` (`rounded-2xl border-border-image bg-glass-4 overflow-hidden`) to the
  `GlassCardVariant` union, with matching entries across all four variant maps (research.md §3)
- [X] T006 [P] [UI] Add `ClockIcon` (circle + clock-hands path) to `components/ui/icons.tsx` for the
  upcoming-session date/time row (research.md §5)
- [X] T007 [P] Create `app/webinar/_data/types.ts` with `WebinarPageContent`, `WebinarHeroContent`,
  `HeroCollageTile`, `HeroCollageTileKind`, `UpcomingSession`, `ReleasedSession`,
  `ReleasedSessionAccent`, `ReleasedSessionCardSize`, and `SubscribePanelContent` per data-model.md
- [X] T008 Create `app/webinar/_data/webinar-content.ts` exporting a typed `WebinarPageContent`
  object populated from `raw-files/TechGrit Webinar.dc.html`'s copy (hero, the 9 collage tiles
  reusing `public/assets/team/glasses.png`/`rooftop.png`/`painting.png`/`diwali.png`, the upcoming
  session with structured date/time/timezone, all 3 released sessions with their per-session accent
  and card size, and the Subscribe panel copy) carried over verbatim per spec.md's Assumptions
  (depends on T007)
- [X] T009 Create `app/webinar/page.tsx` as the composition root: import `webinar-content.ts` and
  render each of the 3 section components in order (component imports added incrementally as each
  user story lands), reusing the shared `Header`/`Footer` via the root layout — no local
  reimplementation (FR-012) (depends on T008)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Get oriented on arrival (Priority: P1) 🎯 MVP

**Goal**: Render the hero so a first-time visitor immediately understands this is TechGrit's
webinar series, sees the value promise, an email capture form, and the 9-cell visual collage.

**Independent Test**: Load `/webinar` and confirm the badge, headline (with its accent phrase
visually distinguished), lead paragraph, hero email form, and 9-cell collage all render correctly —
independent of the Sessions grid or Subscribe section existing yet.

### Implementation for User Story 1

- [X] T010 [UI] [US1] Create `app/webinar/_components/hero-section.tsx` — one component owning: (a)
  `Badge tone="orangeOutline"` badge, H1 with `headingHighlight` in the `--gradient-brand-text`
  accent (`text-[length:var(--text-webinar-hero)]`), lead paragraph; (b) the 9-cell collage as
  internal, non-exported JSX/sub-functions within this same file — 6 `next/image` photo tiles
  (border-image, radius-tile), a spin-ring decorative tile (reuses the existing `tgspin` keyframe),
  a play-triangle decorative tile (reuses `PlayIcon` with `fill="none"` + `stroke` per research.md
  §5), and a pulse-dot decorative tile (nested divs); (c) its own inline email-capture form with a
  local `email`/`error`/`submitted` `useState` using `FormField`/`Button`, client-side-only
  validation (no network call) — staggered `[data-rise]` entrance per plan.md's UI Design Approach
  (FR-001, FR-002, FR-003, FR-010, FR-011, FR-015; research.md §8) (depends on T004, T007)
- [X] T011 [US1] Wire `hero-section` into `app/webinar/page.tsx` (depends on T009, T010)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Register for the upcoming live session (Priority: P1)

**Goal**: Render the full-width upcoming-session panel at the top of the Sessions grid, with a
"Register Now" button that scrolls to the Subscribe section.

**Independent Test**: Scroll to the Sessions grid and confirm the upcoming session's live status
indicator, title, description, composed date/time, and "Register Now" button all render as a single
full-width entry; confirm "Register Now" is a real `<button>` element (not an anchor tag). **Note**:
the scroll-to-`#subscribe` behavior itself cannot be fully verified until Phase 6 (T016) creates the
`<section id="subscribe">` target — until then, confirm only that the button calls the scroll
(`element.scrollIntoView`/anchor-hash logic) without erroring on a missing target; the end-to-end
"lands on the Subscribe section" check is part of Phase 6's own Independent Test and the Phase 7
walkthrough, not this phase's.

### Implementation for User Story 2

- [X] T012 [UI] [US2] Create `app/webinar/_components/sessions-section.tsx` — one component owning
  the "Sessions" heading (`text-[length:var(--text-webinar-h2)]`) and the upcoming-session panel as
  internal, non-exported JSX within this file: `GlassCard variant="webinarUpcoming"`, a "live"
  status dot (reuses the existing `.status-dot`/`.status-live`/`tgblink` classes — no new
  animation), `ClockIcon` + composed `date · time timezone` text, title, description, and a
  "Register Now" `<button type="button">` (real `<button>`, keyboard-focusable with a visible focus
  ring per FR-013 — no `tabIndex`/`role` workaround needed since it's a real button element) that
  smooth-scrolls to `#subscribe` (released sessions added in User Story 3). Use this codebase's
  established `tg-md:`/`max-tg-sm:` breakpoint prefixes (not native Tailwind `lg:`/`md:`/`sm:` —
  see plan.md's corrected Constitution Check) for any responsive collapse this component needs
  (FR-004, FR-005, FR-006, FR-013, FR-014, FR-016; research.md §8) (depends on T005, T006, T007)
- [X] T013 [US2] Wire `sessions-section` into `app/webinar/page.tsx` (depends on T009, T011, T012)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Browse released session recordings (Priority: P1)

**Goal**: Render every released session below the upcoming panel, in the reference's mixed
half/half/full-width card layout.

**Independent Test**: Confirm every released session shows a "Released" label, title, description,
and a "Watch Now" button (a real `<button>` element, not an anchor tag), laid out as two half-width
cards followed by one full-width card — not three uniform cards.

### Implementation for User Story 3

- [X] T014 [UI] [US3] Extend `sessions-section.tsx` (T012) to render `releasedSessions.map(...)`
  after the upcoming panel, as internal JSX within the same file: wrap the mapped cards in a 2-column
  grid (`grid grid-cols-2 gap-6 tg-md:grid-cols-1`, matching the FR-014 single-column collapse) where
  each `GlassCard variant="webinarReleased"` sits in its own grid cell and a card whose
  `cardSize === "full"` gets `col-span-2` (both columns) while `cardSize === "half"` gets no span
  override (one column) — this is the mechanism that produces the reference's two-half-plus-one-full
  layout; GlassCard's own variant class carries no width/col-span styling, so this wrapping and
  span logic lives entirely in this file. Each card also gets a per-card `hoverBorderColor`
  arbitrary-rgba prop keyed off `ReleasedSession.accent` (research.md §4), a "Watch Now" `<button>`
  reusing `PlayIcon` for its small circular glyph — a real `<button type="button">`, keyboard-focusable
  with a visible focus ring per FR-013 — and internal layout that switches between the half-width
  (stacked thumbnail-above-text) and full-width (side-by-side thumbnail-and-text) treatments based on
  each session's fixed authored `cardSize` — no auto-cycled pattern (FR-004, FR-007, FR-008, FR-013,
  FR-014, FR-016; research.md §8) (depends on T005, T012)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently — no
additional `page.tsx` wiring needed since `sessions-section.tsx` was already wired in T013

---

## Phase 6: User Story 4 - Subscribe for future session announcements (Priority: P2)

**Goal**: Render the Subscribe panel with its own independent email validation and confirmation
state, as a second entry point alongside the hero form.

**Independent Test**: At the Subscribe panel, submit a validly formatted email and confirm an
on-page confirmation replaces that form with no navigation; submit an invalid or empty email and
confirm the form stays visible with a corrective message; confirm submitting the hero form (User
Story 1) does not change the Subscribe panel's state, and vice versa. This phase's `<section
id="subscribe">` (T016) also completes Phase 4's "Register Now" scroll target — re-verify at this
point that "Register Now" now actually lands on this section (closing out the check deferred in
Phase 4's own Independent Test).

### Implementation for User Story 4

- [X] T015 [UI] [US4] Create `app/webinar/_components/subscribe-panel.tsx` using `GlassCard
  variant="blogFeatured"` (reused as-is per research.md §3), passing `className="hover:-translate-y-0"`
  (or equivalent) to cancel `blogFeatured`'s built-in `hover:-translate-y-[5px]` lift — this panel is
  a static informational block, not a hoverable card, so the lift is overridden rather than left in
  (resolves research.md §3's previously-open question): heading, copy, and its own inline
  email-capture form — a separate local `email`/`error`/`submitted` `useState` using
  `FormField`/`Button` (both keyboard-focusable with a visible focus ring per FR-013),
  implemented independently from `hero-section.tsx`'s form (not imported from it — research.md §8),
  client-side-only validation (no network call). Use this codebase's established `tg-md:`/`tg-sm:`
  breakpoint prefixes (not native Tailwind `lg:`/`md:`/`sm:`) for any responsive stacking this
  component needs (FR-009, FR-010, FR-011, FR-013, FR-014, FR-015) (depends on T007)
- [X] T016 [US4] Wire `subscribe-panel` into `app/webinar/page.tsx` inside a `<section
  id="subscribe">` (the "Register Now" scroll target from T012) (depends on T009, T013, T015)

**Checkpoint**: All three section components (hero, Sessions grid, Subscribe panel) should now be
independently functional and composed in order on `/webinar`

---

## Phase 7: User Story 5 - Use the page comfortably on any device (Priority: P1)

**Goal**: Confirm and finish page-level responsive behavior so the whole page works cleanly at
mobile, tablet, and desktop widths with no overflow or overlap.

**Independent Test**: Load `/webinar` at ~375–430px, ~768–1024px, and ~1280px+ widths and confirm
every section (hero, collage, Sessions grid, Subscribe panel) remains readable, correctly laid out,
and fully interactive, per quickstart.md's Story 5 checklist.

### Implementation for User Story 5

- [ ] T017 [US5] Audit `app/webinar/page.tsx`, `hero-section.tsx`, `sessions-section.tsx`, and
  `subscribe-panel.tsx` for correct use of the canonical `lg`/`md`/`sm` breakpoints
  (1140px/960px/560px) via this codebase's `tg-md:`/`tg-sm:`/`max-tg-sm:` prefix convention — **not**
  native Tailwind `lg:`/`md:`/`sm:`, which are never used for structural breakpoints anywhere in this
  repo (confirmed and corrected once already, in `hero-section.tsx` during Phase 3). The reference's
  own 960px/560px values already coincide exactly with `md`/`sm` (research.md §7, no value mapping
  needed): hero stacks to one column and the collage reflows to 2 columns at `sm`, the Sessions grid
  collapses to one column at `md` (FR-014) (depends on T011, T013, T014, T016)
- [ ] T018 [US5] Run the full responsive walkthrough from quickstart.md Story 5 at mobile/tablet/
  desktop widths; fix any component whose layout doesn't collapse correctly (depends on T017)

**Checkpoint**: All five user stories independently functional; the full page is responsive
end-to-end

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [ ] T019 Run `npm run lint` and `npm run build`; fix any issues found across `app/webinar/**`,
  `app/tokens.css`, `app/globals.css`, and the `components/ui/GlassCard.tsx`/`Badge.tsx`/`icons.tsx`
  edits (matches the Husky pre-commit gate); confirm no other page's existing `GlassCard`/`Badge`
  usages are affected by the new variant/tone entries
- [ ] T020 Run the remaining quickstart.md edge-case checks: reduced-motion fallback for reveal
  animations, full keyboard-only navigation through the hero form/"Register Now"/every "Watch
  Now"/the Subscribe form with visible focus and accessible names (FR-013), confirm both
  "Register Now" and every "Watch Now" render as `<button>` elements in the DOM (FR-006, FR-007,
  FR-016), an unusually long session title/description not breaking grid alignment, and repeated
  submissions on either subscribe form each validating independently without affecting the other
  form

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - no dependency on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (specifically T005, T006, T007); its
  `page.tsx` wiring task (T013) is sequenced after T011 only because both edit the same `page.tsx`
  composition, not because US2's components depend on US1
- **User Story 3 (Phase 5)**: Depends on Foundational (specifically T005) and directly extends
  US2's `sessions-section.tsx` file (T014 depends on T012) — the one case where a later story's
  task edits an earlier story's file, because both share one section component per plan.md's
  consolidation directive
- **User Story 4 (Phase 6)**: Depends on Foundational (specifically T007); T016 sequenced after
  T013 for the shared `page.tsx` edit; independent of US1's own inline form (research.md §8 — no
  shared form file between them)
- **User Story 5 (Phase 7)**: Depends on US1+US2+US3+US4 wiring being complete, since it audits the
  composed page as a whole
- **Polish (Phase 8)**: Depends on all prior phases

### Parallel Opportunities

- T002–T008 (Foundational) are marked [P] where they touch different files — T003 depends on T002,
  T008 depends on T007, T009 depends on T008
- T012 (US2) can start as soon as T005/T006/T007 (Foundational) are done — it doesn't depend on
  US1's T010
- T015 (US4) can start as soon as T007 (Foundational) is done — independent of US1/US2/US3
- T014 (US3) cannot start in parallel with T012 (US2) — both edit `sessions-section.tsx`
  sequentially, per the consolidation directive
- T010 (US1) and T015 (US4) can be built in parallel with T012 (US2) — different files

---

## Parallel Example: Foundational Phase

```bash
# Launch independent foundational tasks together:
Task: "Add 21 new tokens to app/tokens.css per research.md §1c"
Task: "Extend components/ui/Badge.tsx with an orangeOutline tone per research.md §2"
Task: "Extend components/ui/GlassCard.tsx with webinarUpcoming/webinarReleased variants per research.md §3"
Task: "Add ClockIcon to components/ui/icons.tsx"
Task: "Create app/webinar/_data/types.ts per data-model.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — the hero alone establishes the page's identity even before the Sessions
   grid and Subscribe panel land

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → Deploy/Demo (MVP!)
3. Add User Story 2 → Validate → Deploy/Demo
4. Add User Story 3 → Validate → Deploy/Demo
5. Add User Story 4 → Validate → Deploy/Demo
6. Add User Story 5 → Final responsive audit across everything → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [UI] tasks = produce user-visible frontend output; the `frontend-design` skill is invoked before
  executing them (Constitution Principle VI)
- [Story] label maps task to specific user story for traceability
- Exactly 3 route-local section components exist (`hero-section.tsx`, `sessions-section.tsx`,
  `subscribe-panel.tsx`) — sub-pieces (the collage, the upcoming/released cards, each inline
  subscribe form) are internal JSX within their owning section file, not separate component files
  (plan.md Structure Decision, research.md §8)
- Every section component must independently satisfy FR-014 (responsive, via the `tg-md:`/`tg-sm:`/
  `max-tg-sm:` prefix convention — not native Tailwind `lg:`/`md:`/`sm:`) and FR-013
  (keyboard-operable, visible focus, accessible name) — each component task (T010, T012, T014, T015)
  now names its own concrete breakpoint/button/focus requirement rather than leaving it implicit;
  T017/T018 and T020 still exist as the composed-page audit and final DOM/a11y verification pass, not
  as the first time these requirements are considered
- "Register Now" and every "Watch Now" MUST be `<button>` elements per FR-006/FR-007/FR-016 — this
  is checked explicitly in T020, not assumed from the reference's own anchor-tag markup
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
