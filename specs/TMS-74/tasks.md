---

description: "Task list for Careers Page feature implementation"
---

# Tasks: Careers Page

**Input**: Design documents from `/specs/TMS-74/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No test tasks are included. No test framework is configured in this repo (per
constitution's Development Workflow section) and the spec did not request a TDD approach.
Verification is manual — see quickstart.md and the checkpoints below.

**Organization**: Tasks are grouped by user story (spec.md) to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]** (Constitution Principle VI): Task produces user-visible frontend output; the vendored
  `frontend-design` skill is invoked before executing it. Not applied to data/config/token tasks.
- **[Story]**: Which user story this task belongs to (US1–US5, per spec.md)
- Exact file paths are included in each description

## Path Conventions

Single Next.js App Router project, all new route-local code colocated under `app/careers/` (per
plan.md's Structure Decision), plus backward-compatible extensions to `components/ui/Modal.tsx`
(new), `components/ui/FormField.tsx`, `components/ui/icons.tsx`, `app/globals.css`, and
`app/_home-components/LifeGallery.tsx`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/careers/`, `app/careers/_components/`,
  `app/careers/_data/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Add the missing `--spacing-tg-12: var(--space-12)` entry to `app/globals.css`'s
  `@theme inline` spacing block (research.md §1) — fixes the pre-existing Principle I gap so
  `py-tg-12`/`px-tg-12` resolve to 28px instead of silently falling back to Tailwind's default
- [X] T003 [P] [UI] Create `components/ui/Modal.tsx` — the first Modal/Dialog primitive in the
  codebase: full-screen backdrop (click-to-close) + centered glass panel styled off `.nav-dd`
  (`rgba(13,26,37,0.97)` fill, `blur(16px)`, `border-white/12`), closes on Escape/backdrop
  click/explicit close using the existing `CloseIcon`, no portal library (research.md §5)
- [X] T004 [P] [UI] Extend `components/ui/FormField.tsx` with an additive `multiline` boolean prop
  that renders a `<textarea>` instead of `<input>`, reusing the same `label`/`error`/`useId`/
  `aria-*` wiring; default `false` so all existing single-line call sites are unchanged
  (research.md §6)
- [X] T005 [P] [UI] Add new icons to `components/ui/icons.tsx`: six benefit icons (lightning, book,
  home, heart, barChart, users — matched path-for-path against the reference, reusing
  `LightningIcon` if it already covers "Ship at AI speed") and two role-meta icons (location
  map-pin, employment-type clock) (plan.md UI Design Approach)
- [X] T006 Create `app/careers/_data/careers-data.ts` exporting a typed `CareersPageContent`
  object (`CareersHeroContent`, `Stat[]`, `Benefit[]`, `DepartmentFilter[]`, `OpenRole[]`,
  `LifeAtTechGritContent`, `ClosingCtaContent` per data-model.md) populated verbatim from
  `raw-files/TechGrit Careers.dc.html`: 4 collage images (tall/default/default/wide), 4 stats, 6
  benefits (icon names from T005), 5 filters, 7 roles each with a stable `slug` distinct from its
  `title`, and the Life-at-TechGrit/closing-CTA copy (depends on T005)
- [X] T007 Create `app/careers/page.tsx` as the composition root: import `careers-data.ts` and
  render each section component in order (component imports added incrementally as each user
  story lands), reusing the shared `Header`/`Footer` via the root layout — no local
  reimplementation (FR-016) (depends on T006)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Browse open roles and apply (Priority: P1) 🎯 MVP

**Goal**: Render a filterable Open Roles list where selecting a role's Apply action opens an
on-page application dialog instead of a `mailto:` link, and a valid submission shows an in-dialog
success message.

**Independent Test**: Load the Careers page, select a department filter and verify the role list
narrows accordingly, then select a role's Apply action, fill out the resulting dialog, and submit
it — verifying an on-page confirmation appears and no email client is launched.

### Implementation for User Story 1

- [X] T008 [UI] [US1] Create `app/careers/_components/RoleFilters.tsx`: All/Engineering/Design/
  Quality/Product capsule pills as controlled `activeFilter`/`onSelect` props, plain `<button>`s
  with token-backed Tailwind classes, keyed by each `DepartmentFilter.value` (never its label)
  (research.md §3)
- [X] T009 [UI] [US1] Create `app/careers/_components/RoleCard.tsx`: renders one `OpenRole`
  (position title, department, location, employment type, accent status dot) with an Apply action
  (`Button` `ghost` variant) that calls an `onApply(role)` prop instead of a `mailto:` link
  (research.md §2, FR-006, FR-007)
- [X] T010 [UI] [US1] Create `app/careers/_components/ApplicationDialog.tsx` built on `Modal`:
  accepts an `ApplicationContext` prop (`mode`/`roleSlug`/`roleTitle`) shown in its top-left area,
  composes four single-line `FormField`s (first name, last name, email, phone) plus one
  `multiline` `FormField` ("tell us why you're a great fit"), and two `Button`s (`primary` =
  Submit, `ghost` = Cancel); holds local `ApplicationFormValues` + `idle`/`submitted` status,
  validates required fields + email format before accepting Submit (showing a corrective message
  otherwise), replaces the form with an in-dialog success message on valid submit, and resets to a
  fresh `idle` state whenever it is reopened with a new context; Cancel, backdrop click, and
  Escape each close it and discard entered data (data-model.md, FR-007–FR-012, FR-020, Edge Cases)
  (depends on T003, T004)
- [X] T011 [US1] Create `app/careers/_components/OpenRolesSection.tsx`: owns
  `useState<string>("All")` filter state (research.md §4), renders a heading + `RoleFilters` +
  the filtered `RoleCard` list keyed by `slug` + a "no roles match" message when the filtered list
  is empty (FR-021), and owns the `ApplicationDialog`'s open/context state, wiring each
  `RoleCard`'s Apply action to open it with `{ mode: "role", roleSlug, roleTitle }` (depends on
  T008, T009, T010)
- [X] T012 [US1] Wire `OpenRolesSection` into `app/careers/page.tsx` (depends on T007, T011)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Understand why to join TechGrit (Priority: P2)

**Goal**: Render the hero, the four-statistic metrics strip, and the six "why people join and
stay" benefit cards.

**Independent Test**: Load the Careers page and verify the hero, metrics strip, and benefit cards
all render with their full content, independent of the roles list below.

### Implementation for User Story 2

- [X] T013 [UI] [US2] Create `app/careers/_components/CareersHero.tsx`: eyebrow badge (inline
  `.status-dot.status-orange` pattern per `Hero.tsx`/`blog-hero.tsx`), heading with
  `headingHighlight` in the `--gradient-brand` accent, lead paragraph, primary CTA anchored to the
  Open Roles section and secondary CTA anchored to the Life at TechGrit section, and the 4-image
  collage in fixed tall/default/default/wide order (FR-001)
- [X] T014 [UI] [US2] Create `app/careers/_components/StatsStrip.tsx`: renders exactly the 4
  `Stat` entries (value + label) in a single row on wide screens (FR-002)
- [X] T015 [UI] [US2] Create `app/careers/_components/WhyJoinSection.tsx`: heading followed by 6
  `GlassCard` benefit cards (icon from T005, title, description) sharing identical dimensions,
  padding (28px via the T002 token), border, and radius (FR-003) (depends on T002, T005)
- [X] T016 [US2] Wire `CareersHero`, `StatsStrip`, and `WhyJoinSection` into
  `app/careers/page.tsx` ahead of the Open Roles section (depends on T007, T012, T013, T014, T015)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Explore life at TechGrit (Priority: P2)

**Goal**: Render the Life at TechGrit section reusing the homepage's own `LifeGallery`
implementation, populated with this page's own heading, description, and 4-image collage.

**Independent Test**: Scroll to the Life at TechGrit section and verify its heading, supporting
statement, and photo collage render with this page's own content, independent of the homepage's
version of the same section.

### Implementation for User Story 3

- [X] T017 [UI] [US3] Extend `app/_home-components/LifeGallery.tsx` with optional `heading`/
  `description`/`images` props (each defaulting to today's hardcoded homepage
  copy/data, so the homepage call site needs zero changes), plus optional `variant`/`id`/`columns`
  props (default `"home"`/`undefined`/`3`) and one additive `SPAN_CLASSES` key `"wide3"`
  (`col-span-3`) (research.md §9)
- [X] T018 [US3] Wire `LifeGallery` into `app/careers/page.tsx`, passing `columns={4}` and this
  page's `lifeAtTechGrit` content with image spans `["tall","wide","default","wide3"]` to
  reproduce the reference's 4-column collage (FR-013) (depends on T007, T016, T017)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Reach out when no listed role fits (Priority: P3)

**Goal**: Render the closing CTA panel whose "Send your resume" action opens the same
application dialog as a general application (no position name).

**Independent Test**: Scroll to the closing CTA section, select "Send your resume," and verify
the same application dialog opens but labeled as a general application rather than tied to a
specific role.

### Implementation for User Story 4

- [X] T019 [UI] [US4] Create `app/careers/_components/CareersCta.tsx`: heading, supporting
  copy, and a "Send your resume" `Button` that opens the existing `ApplicationDialog` (T010) with
  `{ mode: "general", roleSlug: null, roleTitle: null }` — reuses the T010 dialog as-is, no new
  dialog code (FR-014, FR-015)
- [X] T020 [US4] Wire `CareersCta` into `app/careers/page.tsx` as the final section, owning its
  own dialog-open state independent of `OpenRolesSection`'s (depends on T007, T010, T018, T019)

**Checkpoint**: All four content sections (hero/stats/benefits, roles+apply, life at TechGrit,
closing CTA) should now be independently functional and composed in order on `/careers`

---

## Phase 7: User Story 5 - Use the page comfortably on any device (Priority: P1)

**Goal**: Confirm and finish page-level responsive behavior so the whole page works cleanly at
mobile, tablet, and desktop widths with no overflow or overlap.

**Independent Test**: Load the Careers page at ~375–430px, ~768–1024px, and ~1280px+ widths and
confirm every section (hero/collage, metrics, benefit cards, filterable role list, application
dialog, life-at-TechGrit collage, closing CTA) remains readable, correctly laid out, and fully
interactive, per quickstart.md's Story 5 checklist.

### Implementation for User Story 5

- [X] T021 [US5] Audit `app/careers/page.tsx` and all `app/careers/_components/*.tsx` for correct
  use of the canonical `lg`/`md`/`sm` breakpoints (1140px/960px/560px — no remapping needed per
  research.md §8): hero collapses to a single column and the collage reflows at `md`, the
  benefit-card grid and role list stack at `md`/`sm`, and the `ApplicationDialog` stays usable at
  `sm` (FR-018) (depends on T012, T016, T018, T020)
- [X] T022 [US5] Run the full responsive walkthrough from quickstart.md Story 5 at mobile/tablet/
  desktop widths; fix any component whose layout doesn't collapse correctly (depends on T021)

**Checkpoint**: All five user stories independently functional; the full page is responsive
end-to-end

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [X] T023 Run `npm run lint` and `npm run build`; fix any issues found across `app/careers/**`,
  `app/globals.css`, `app/_home-components/LifeGallery.tsx`, and the
  `components/ui/Modal.tsx`/`FormField.tsx`/`icons.tsx` edits (matches the Husky pre-commit gate);
  confirm no other route's existing `FormField` or `LifeGallery` usage is affected by the new
  prop additions
- [X] T024 Run the remaining quickstart.md edge-case checks: no-department-match message
  (FR-021), missing/invalid-field submission blocked with a corrective message (SC-005), the
  dialog resetting to a fresh state when reopened from a different role or from the general-
  application entry point rather than showing stale data (Edge Cases), reduced-motion reveal
  fallback, an unusually long role title/benefit description not breaking card layout, and full
  keyboard-only navigation through the filters/Apply actions/closing CTA/dialog fields with
  visible focus and accessible names (FR-017)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (specifically T003, T004) - no dependency
  on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (specifically T002, T005); its `page.tsx`
  wiring task (T016) is sequenced after T012 only because both edit the same `page.tsx`
  composition, not because US2's components depend on US1
- **User Story 3 (Phase 5)**: Depends on Foundational; T018 sequenced after T016 for the shared
  `page.tsx` edit
- **User Story 4 (Phase 6)**: Depends on US1's `ApplicationDialog` (T010) being built, since it
  reuses that same dialog rather than creating a new one; T020 sequenced after T018 for the
  shared `page.tsx` edit
- **User Story 5 (Phase 7)**: Depends on US1+US2+US3+US4 wiring being complete, since it audits
  the composed page as a whole
- **Polish (Phase 8)**: Depends on all prior phases

### Parallel Opportunities

- T002–T005 (Foundational) are marked [P] — different files, no dependency on each other; T006
  depends on T005, T007 depends on T006
- T008 and T009 (US1's filter/card UI) can be built in parallel — different files
- T013, T014, T015 (US2) can start as soon as T002/T005 (Foundational) are done — they don't
  depend on US1's T008–T012
- Each user story's own components can be built in parallel by different people; only the shared
  `page.tsx` wiring task at the end of each phase must be sequenced

---

## Parallel Example: Foundational Phase

```bash
# Launch independent foundational tasks together:
Task: "Add the missing --spacing-tg-12 @theme inline entry to app/globals.css per research.md §1"
Task: "Create components/ui/Modal.tsx per research.md §5"
Task: "Extend components/ui/FormField.tsx with a multiline prop per research.md §6"
Task: "Add benefit + role-meta icons to components/ui/icons.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — the filterable roles list and working application dialog is the page's
   core conversion action even before the hero/stats/benefits, Life at TechGrit, closing CTA, and
   final responsive polish land

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
- [UI] tasks = produce user-visible frontend output; the `frontend-design` skill is invoked
  before executing them (Constitution Principle VI)
- [Story] label maps task to specific user story for traceability
- Every section component must independently satisfy FR-018 (responsive at `lg`/`md`/`sm`) and
  FR-017 (keyboard-operable, visible focus, accessible name) — these are baked into each
  component task, not deferred to a separate cleanup pass
- `ApplicationDialog` (T010) is built once, in US1, and reused unchanged by US4 — no duplicate
  dialog is ever created
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
