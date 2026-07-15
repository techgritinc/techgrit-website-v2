---

description: "Task list for About Us Page feature implementation"
---

# Tasks: About Us Page

**Input**: Design documents from `/specs/001-about-us-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/about-us-page-response.json

**Tests**: No test tasks are included. No test framework is configured in this repo (per
constitution's Development Workflow section) and the spec did not request a TDD approach.
Verification is manual — see quickstart.md and the checkpoints below.

**Organization**: Tasks are grouped by user story (spec.md) to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths are included in each description

## Path Conventions

Single Next.js App Router project, all new code colocated under `app/about/` (per plan.md's
Structure Decision — no top-level `components/`/`lib/` split).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/about/`, `app/about/_components/`, `app/about/_data/`, `public/images/about-us/`
- [X] T002 [P] ~~Add placeholder image assets~~ — no real photography exists yet; `about-us-content.ts` (T005) sets `image: null` for the showcase and every culture-gallery photo instead of fabricating fake stock images, exercising the FR-013 placeholder path by default until real assets are supplied

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Add `--breakpoint-sm: 560px`, `--breakpoint-md: 960px`, `--breakpoint-lg: 1140px` to the `@theme inline` block in `app/globals.css` so Tailwind's `sm:`/`md:`/`lg:` prefixes match the constitution's documented breakpoint contract (research.md §5)
- [X] T004 [P] Create `app/about/_data/types.ts` with the `PageSectionEntry` discriminated union and all section field types from data-model.md (`HeroSection`, `ShowcaseSection`, `WhoYouAreSection`, `OurRoleSection`, `ValuesSection`, `ProcessSection`, `AchievementsSection`, `PartnerSection`, `CultureGallerySection`, `FinalCtaSection`, `SectionImage`, `PageSeo`, `AboutUsPageContent`)
- [X] T005 Create `app/about/_data/about-us-content.ts` exporting a typed `AboutUsPageContent` object populated with the content from `specs/001-about-us-page/contracts/about-us-page-response.json`, mapped onto local image paths under `/images/about-us/` (depends on T004)
- [X] T006 [P] Create `app/about/_components/reveal-on-scroll.tsx`, a `"use client"` component using `IntersectionObserver` to apply the existing `tgrise`/`[data-rise]` reveal (reusing `globals.css`, per research.md §7), with a safety timeout fallback so content is never left hidden
- [X] T007 Create `app/about/page.tsx` as the composition root: import `about-us-content.ts`, set page `metadata` from `content.seo`, and map `content.sections` to a per-`type` switch that will render each section's component (component imports added incrementally as each user story lands) (depends on T004, T005)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Understand who TechGrit is and what it stands for (Priority: P1) 🎯 MVP

**Goal**: Render the hero, showcase image, "who you are", "our role", and values sections so a
first-time visitor can identify what TechGrit does, who it serves, and what it values.

**Independent Test**: Load `/about` and confirm the hero intro (with both CTAs), the showcase
image (or its placeholder), the visitor-profile/concerns card, the role statement, and all 6
values render, in order, independent of any other section existing.

### Implementation for User Story 1

- [X] T008 [P] [US1] Create `app/about/_components/about-us-hero.tsx` rendering `HeroSection` (eyebrow, title, subtitle, primary CTA, secondary in-page anchor CTA) using `.eyebrow`/`.btn`/`.btn-primary`/`.btn-ghost`/`.text-gradient` (FR-001)
- [X] T009 [P] [US1] Create `app/about/_components/about-us-showcase.tsx` rendering `ShowcaseSection` via `next/image` with `preload` (it is the likely LCP element) when `image` is present, and a descriptive placeholder block when `image` is `null` (FR-002, FR-013)
- [X] T010 [P] [US1] Create `app/about/_components/about-us-who-you-are.tsx` rendering `WhoYouAreSection` (eyebrow, title, paragraphs, and the concerns card) as a two-column layout on desktop that collapses to one column at `md:`/`sm:` (FR-003, FR-012)
- [X] T011 [P] [US1] Create `app/about/_components/about-us-our-role.tsx` rendering `OurRoleSection` (centered eyebrow/title/description) using `.text-gradient` for the highlighted phrase (FR-004)
- [X] T012 [P] [US1] Create `app/about/_components/about-us-values.tsx` rendering all `CompanyValue` entries in a 2-column grid that collapses to 1 column at `sm:`, using `.divider`/`.eyebrow` (FR-005, FR-012, SC-005 — exactly 6 values)
- [X] T013 [US1] Wire `about-us-hero`, `about-us-showcase`, `about-us-who-you-are`, `about-us-our-role`, and `about-us-values` into the section-type switch in `app/about/page.tsx` (depends on T007-T012)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Evaluate TechGrit's process and credibility (Priority: P2)

**Goal**: Render the 3-step engagement process, achievement metrics, and partnership outcomes so
an interested visitor can judge TechGrit's process and credibility.

**Independent Test**: Load `/about`, scroll to this part of the page, and confirm the 3 ordered
process steps, the 4 achievement stats, and the partnership outcomes list all render correctly,
independent of the hero/values or culture-gallery sections.

### Implementation for User Story 2

- [X] T014 [P] [US2] Create `app/about/_components/about-us-process.tsx` rendering all `ProcessStep` entries as a 3-column card grid (`.card`) collapsing to 1 column at `md:` (FR-006, FR-012, SC-005 — exactly 3 steps)
- [X] T015 [P] [US2] Create `app/about/_components/about-us-achievements.tsx` rendering `AchievementMetric` entries in a `.glass-card`-wrapped stat grid (4 columns desktop, collapsing to 2 at `sm:`) using `.text-gradient` for the numbers (FR-007, FR-012)
- [X] T016 [P] [US2] Create `app/about/_components/about-us-partner.tsx` rendering `PartnerSection` (eyebrow/title/description) alongside the `PartnershipOutcome` list, two-column desktop layout collapsing to one column at `md:` (FR-008, FR-012)
- [X] T017 [US2] Wire `about-us-process`, `about-us-achievements`, and `about-us-partner` into the section-type switch in `app/about/page.tsx` (depends on T007, T013, T014-T016)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Explore culture and take action (Priority: P3)

**Goal**: Render the culture photo gallery and the closing call-to-action so a visitor gets a
sense of company culture and has a clear final action.

**Independent Test**: Load `/about`, scroll to the end, and confirm the culture gallery (or
placeholders for any missing photos) and the final CTA render and are actionable, independent of
earlier sections.

### Implementation for User Story 3

- [X] T018 [P] [US3] Create `app/about/_components/about-us-culture-gallery.tsx` rendering `CulturePhoto` entries via `next/image` (`loading="lazy"`) in a `tall`/`square`/`wide`-aware grid that collapses to 1-2 columns at `sm:`/`md:`, with a placeholder per photo when `image` is `null` (FR-009, FR-012, FR-013)
- [X] T019 [P] [US3] Create `app/about/_components/about-us-final-cta.tsx` rendering `FinalCtaSection` (eyebrow/title/description/CTA) inside a `.glass-card` panel (FR-010)
- [X] T020 [US3] Wire `about-us-culture-gallery` and `about-us-final-cta` into the section-type switch in `app/about/page.tsx` (depends on T007, T017, T018-T019)

**Checkpoint**: All ten content sections should now be independently functional and composed in
order on `/about`

---

## Phase 6: User Story 4 - Read the page comfortably on any device (Priority: P1)

**Goal**: Confirm and finish the page-level responsive behavior (beyond what's already built into
each section component in US1-US3) so the whole page works cleanly at mobile, tablet, and desktop
widths with no overflow or overlap.

**Independent Test**: Load `/about` at ~375-430px, ~768-1024px, and ~1280px+ widths and confirm
every section (from any story) remains readable, correctly laid out, and fully interactive, per
quickstart.md's Story 4 checklist.

### Implementation for User Story 4

- [X] T021 [US4] Audit `app/about/page.tsx` and all `app/about/_components/*.tsx` for consistent use of `.container`/`.section` and confirm no element causes horizontal overflow at any of the three breakpoints (add `overflow-x-clip` on the page wrapper if needed) (depends on T013, T017, T020) — `<main className="overflow-x-clip">` added in page.tsx; all sections use `.container`/`.section`/Tailwind max-width utilities
- [X] T022 [US4] Run the full responsive walkthrough from quickstart.md Story 4 at mobile/tablet/desktop widths across all 10 sections; fix any component whose grid/columns don't collapse correctly (depends on T021) — verified via Playwright screenshots at 390px/820px/1440px: all grids (who-you-are, values, process, achievements, partner, gallery) collapse correctly at the 560/960/1140 breakpoints, no horizontal overflow or overlap

**Checkpoint**: All four user stories independently functional; the full page is responsive
end-to-end

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [X] T023 Run `npm run lint` and `npm run build`; fix any issues found across `app/about/**` (matches the Husky pre-commit gate) — lint fixed one `react-hooks/set-state-in-effect` violation in `reveal-on-scroll.tsx`; build succeeds, `/about` prerendered as static content
- [X] T024 Run the remaining quickstart.md edge-case checks: missing-image placeholder (temporarily null an image in `about-us-content.ts`), direct navigation to `/about#values`, and reduced-motion fallback for `reveal-on-scroll.tsx` — missing-image placeholder is the default content state (verified visually in all 3 screenshots); `id="values"` + native anchor `href="#values"` + existing global `[id]{scroll-margin-top}` rule handle direct navigation with no custom JS to fail; reveal fallback verified by confirming content becomes visible after the 1.5s safety timeout

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - no dependency on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational; its page.tsx wiring task (T017) is
  sequenced after T013 only because both edit the same `page.tsx` switch statement, not because
  US2's components depend on US1
- **User Story 3 (Phase 5)**: Same as US2 — depends on Foundational; T020 sequenced after T017
  only for the shared `page.tsx` edit
- **User Story 4 (Phase 6)**: Depends on US1+US2+US3 wiring being complete, since it audits/tests
  the composed page as a whole
- **Polish (Phase 7)**: Depends on all prior phases

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- T004 and T006 (Foundational) can run in parallel; T005 depends on T004; T007 depends on T004+T005
- All component-creation tasks within a single user story phase (T008-T012, T014-T016, T018-T019)
  are marked [P] — different files, no dependency on each other
- Each user story's own components can be built in parallel by different people; only the shared
  `page.tsx` wiring task at the end of each phase must be sequenced

---

## Parallel Example: User Story 1

```bash
# Launch all four independent section components for User Story 1 together:
Task: "Create app/about/_components/about-us-hero.tsx per FR-001"
Task: "Create app/about/_components/about-us-showcase.tsx per FR-002, FR-013"
Task: "Create app/about/_components/about-us-who-you-are.tsx per FR-003"
Task: "Create app/about/_components/about-us-our-role.tsx per FR-004"
Task: "Create app/about/_components/about-us-values.tsx per FR-005"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — hero, showcase, who-you-are, our-role, and values are a credible
   standalone About Us page even before Stories 2-4 land

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → Deploy/Demo (MVP!)
3. Add User Story 2 → Validate → Deploy/Demo
4. Add User Story 3 → Validate → Deploy/Demo
5. Add User Story 4 → Final responsive audit across everything → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Every section component must independently satisfy FR-011 (self-contained, reorderable) and
  FR-012 (responsive at sm:/md:/lg:) — these are baked into each component task, not deferred to
  a separate cleanup pass
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
