---

description: "Task list for Blog Page feature implementation"
---

# Tasks: Blog Page

**Input**: Design documents from `/specs/TMS-69/`
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

Single Next.js App Router project, all new route-local code colocated under `app/blog/` (per
plan.md's Structure Decision — no top-level `components/`/`lib/` split), plus backward-compatible
extensions to the already-shared `components/ui/GlassCard.tsx`, `components/ui/Badge.tsx`, and
`components/ui/icons.tsx`, and new tokens added to `app/tokens.css`/`app/globals.css`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/blog/`, `app/blog/_components/`,
  `app/blog/_data/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Add the 7 new tokens identified in research.md §1 to `app/tokens.css`, each in its
  existing numbered section: `--text-blog-hero: clamp(40px, 5.4vw, 58px)` (§6 Typography, after
  `--text-h4`), `--measure-blog-lead: 640px`, `--size-42: 42px`, `--size-130: 130px`,
  `--size-300: 300px` (§8 Layout, after `--size-82`), `--blur-glow-md: 70px`,
  `--blur-glow-xl: 115px` (§14 Backdrop Blur, after `--blur-glow-lg`)
- [X] T003 [P] Map the 6 Tailwind-consumed tokens from T002 (all except `--text-blog-hero`, which
  is consumed via an arbitrary value per Constitution Principle I's heading-override rule) into
  `app/globals.css`'s `@theme inline` block (depends on T002)
- [X] T004 [P] [UI] Extend `components/ui/GlassCard.tsx`: add `"blogCard"` (
  `rounded-2xl border-border bg-glass-4 overflow-hidden hover:-translate-y-[5px]`) and
  `"blogFeatured"` (same, `rounded-4xl`) to the `GlassCardVariant` union, with matching entries
  across all four variant maps (research.md §2)
- [X] T005 [P] [UI] Extend `components/ui/Badge.tsx`: add `"accent"` to the `BadgeTone` union with
  a matching `TONE_CLASSES` entry (`bg-glass-4 border border-border` neutral fallback; per-post
  accent color applied via inline `style`, not a hardcoded class) (research.md §3)
- [X] T006 [P] Create `app/blog/_data/types.ts` with `BlogPageContent`, `BlogHeroContent`,
  `FeaturedPost`, `PostAuthor`, `BlogPost`, `BlogAccentToken`, and `NewsletterPanelContent` per
  data-model.md
- [X] T007 Create `app/blog/_data/blog-content.ts` exporting a typed `BlogPageContent` object
  populated from `raw-files/TechGrit Blog.dc.html`'s copy (hero, the featured post, all 9 grid
  posts, the 7 topics, newsletter panel copy) carried over verbatim per spec.md's Assumptions
  (depends on T006)
- [X] T008 [P] [UI] Add a decorative network-node icon to `components/ui/icons.tsx` for the
  featured-story panel's supporting visual (FR-002)
- [X] T009 Create `app/blog/page.tsx` as the composition root: import `blog-content.ts` and render
  each section component in order (component imports added incrementally as each user story
  lands), reusing the shared `Header`/`Footer` via the root layout — no local reimplementation
  (FR-012) (depends on T007)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Get oriented on arrival (Priority: P1) 🎯 MVP

**Goal**: Render the hero so a first-time visitor immediately understands this is TechGrit's
editorial content hub and what topics it covers.

**Independent Test**: Load `/blog` and confirm the eyebrow label, headline (with its accent phrase
visually distinguished), and supporting sentence render correctly — independent of the featured
story or grid existing yet.

### Implementation for User Story 1

- [X] T010 [UI] [US1] Create `app/blog/_components/blog-hero.tsx` rendering `BlogHeroContent`:
  eyebrow, headline with `headingHighlight` in the `--gradient-brand-text` accent, lead paragraph
  (FR-001)
- [X] T011 [US1] Wire `blog-hero` into `app/blog/page.tsx` (depends on T009, T010)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Discover the flagship story immediately (Priority: P1)

**Goal**: Render the single featured-story panel directly beneath the hero.

**Independent Test**: Scroll past the hero and confirm the featured-story panel's topic label,
headline, excerpt, author identity, read time, and "Read article" action all render, and the whole
panel — not just the CTA text — is one actionable target, independent of the filterable grid below
it.

### Implementation for User Story 2

- [X] T012 [UI] [US2] Create `app/blog/_components/featured-post.tsx` rendering `FeaturedPost`
  inside `GlassCard variant="blogFeatured"`, with the topic label via `Badge tone="accent"`, the
  decorative network-node icon (T008) on an accent-tinted panel, author name/role/initials, read
  time, and a "Read article" CTA; the whole panel wraps in a single `<Link>` (FR-002, FR-003)
  (depends on T004, T005, T008)
- [X] T013 [US2] Wire `featured-post` into `app/blog/page.tsx` (depends on T009, T012)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Browse and narrow posts by topic (Priority: P1)

**Goal**: Render the topic filter row and the full post grid, with filtering that narrows the grid
to one topic without a full page reload.

**Independent Test**: Load `/blog`, confirm every topic chip (including "All", selected by default)
and the full unfiltered grid render, then select a single topic and confirm the grid updates to
show only matching posts with no page reload; select "All" again and confirm every post reappears.

### Implementation for User Story 3

- [X] T014 [UI] [US3] Create `app/blog/_components/topic-filter.tsx` rendering the topic chips with
  active/inactive styling driven by a controlled `activeTopic`/`onSelect` prop pair (FR-004)
- [X] T015 [UI] [US3] Create `app/blog/_components/blog-post-grid.tsx`: owns
  `useState<string>("All")` for `activeTopic` (research.md §4), renders `topic-filter` plus the
  filtered `BlogPost[]` grid using `GlassCard variant="blogCard"` items with `Badge tone="accent"`
  topic tags, author initials/name/publishDate/readTime, each card wrapped in a single `<Link>`,
  and a "no posts match" message when the filtered list is empty (FR-005, FR-006, FR-007, FR-015)
  (depends on T004, T005, T014)
- [X] T016 [US3] Wire `blog-post-grid` into `app/blog/page.tsx` (depends on T009, T015)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Subscribe to get future posts by email (Priority: P2)

**Goal**: Render the subscribe panel with client-side email validation and a confirmation state.

**Independent Test**: Submit a validly formatted email and confirm the form is replaced by an
on-page confirmation with no navigation; submit an invalid or empty email and confirm the form
stays visible with an inline error, with no navigation.

### Implementation for User Story 4

- [X] T017 [UI] [US4] Create `app/blog/_components/newsletter-panel.tsx` mirroring
  `app/_home-components/SubscribeBand.tsx`'s `email`/`error`/`submitted` `useState` pattern and
  email regex (research.md §7), rendering `NewsletterPanelContent`'s heading/copy/CTA with inline
  validation-error and success-confirmation states (FR-008, FR-009, FR-010)
- [X] T018 [US4] Wire `newsletter-panel` into `app/blog/page.tsx` (depends on T009, T017)

**Checkpoint**: All four content sections (hero, featured post, filterable grid, subscribe) should
now be independently functional and composed in order on `/blog`

---

## Phase 7: User Story 5 - Read comfortably on any device (Priority: P1)

**Goal**: Confirm and finish page-level responsive behavior so the whole page works cleanly at
mobile, tablet, and desktop widths with no overflow or overlap.

**Independent Test**: Load `/blog` at ~375–430px, ~768–1024px, and ~1280px+ widths and confirm
every section (hero, featured panel, topic filter, grid, subscribe panel) remains readable,
correctly laid out, and fully interactive, per quickstart.md's Story 5 checklist.

### Implementation for User Story 5

- [X] T019 [US5] Audit `app/blog/page.tsx` and all `app/blog/_components/*.tsx` for correct use of
  the canonical `lg`/`md`/`sm` breakpoints (1140px/960px/560px), mapped from the reference's
  980px/640px per research.md §6: featured-panel and subscribe-panel stack to one column at `md`,
  the post grid collapses 3→2→1 columns at `md`/`sm` (FR-014) (depends on T011, T013, T016, T018)
- [X] T020 [US5] Run the full responsive walkthrough from quickstart.md Story 5 at mobile/tablet/
  desktop widths; fix any component whose layout doesn't collapse correctly (depends on T019)

**Checkpoint**: All five user stories independently functional; the full page is responsive
end-to-end

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [X] T021 Run `npm run lint` and `npm run build`; fix any issues found across `app/blog/**`,
  `app/tokens.css`, `app/globals.css`, and the `components/ui/GlassCard.tsx`/`Badge.tsx`/`icons.tsx`
  edits (matches the Husky pre-commit gate); confirm no other page's existing `GlassCard`/`Badge`
  usages are affected by the new variant/tone entries
- [X] T022 Run the remaining quickstart.md edge-case checks: empty-filter "no posts" message
  (FR-015), reduced-motion fallback for reveal animations, full keyboard-only navigation through
  the topic filters/featured panel/post cards/subscribe form with visible focus and accessible
  names (FR-013), an unusually long post title/excerpt not breaking grid alignment, and repeated
  subscribe-form submissions each validating independently

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - no dependency on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (specifically T004, T005, T008); its
  `page.tsx` wiring task (T013) is sequenced after T011 only because both edit the same
  `page.tsx` composition, not because US2's components depend on US1
- **User Story 3 (Phase 5)**: Depends on Foundational (specifically T004, T005); T016 sequenced
  after T013 for the shared `page.tsx` edit
- **User Story 4 (Phase 6)**: Depends on Foundational; T018 sequenced after T016 for the shared
  `page.tsx` edit
- **User Story 5 (Phase 7)**: Depends on US1+US2+US3+US4 wiring being complete, since it audits the
  composed page as a whole
- **Polish (Phase 8)**: Depends on all prior phases

### Parallel Opportunities

- T002–T008 (Foundational) are marked [P] — different files, no dependency on each other; T003
  depends on T002, T007 depends on T006, T009 depends on T007
- T012 (US2) can start as soon as T004/T005/T008 (Foundational) are done — it doesn't depend on
  US1's T010/T011
- T014 (US3's filter chip UI) can be built in parallel with T012 (US2) — different files
- Each user story's own components can be built in parallel by different people; only the shared
  `page.tsx` wiring task at the end of each phase must be sequenced

---

## Parallel Example: Foundational Phase

```bash
# Launch independent foundational tasks together:
Task: "Add 7 new tokens to app/tokens.css per research.md §1"
Task: "Extend components/ui/GlassCard.tsx with blogCard/blogFeatured variants per research.md §2"
Task: "Extend components/ui/Badge.tsx with an accent tone per research.md §3"
Task: "Create app/blog/_data/types.ts per data-model.md"
Task: "Add a decorative network-node icon to components/ui/icons.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — the hero alone establishes the page's identity even before the featured
   story, grid, and subscribe panel land

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
- Every section component must independently satisfy FR-014 (responsive at `lg`/`md`/`sm`) and
  FR-013 (keyboard-operable, visible focus, accessible name) — these are baked into each component
  task, not deferred to a separate cleanup pass
- Individual post/article pages are intentionally NOT built by any task — see spec.md Assumptions
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
