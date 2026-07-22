---

description: "Task list for Construction Industry Page feature implementation"
---

# Tasks: Construction Industry Page

**Input**: Design documents from `/specs/002-construction-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/construction-page-response.json

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

Single Next.js App Router project, all new page-specific code colocated under
`app/construction/` (per plan.md's Structure Decision — no new top-level `components/`/`lib/`
split). Cross-page-reusable pieces live in the existing top-level `reusable-components/`. The
site-wide `Header`/`Footer` (`components/layout/`) already wrap every page via `app/layout.tsx` —
this feature does not touch them.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/construction/`, `app/construction/_components/`, `app/construction/_data/`
- [X] T002 [P] ~~Add hero image assets~~ — no real photography exists yet; `construction-content.ts` (T005) sets `image: null` for the hero instead of fabricating a fake stock image, exercising the FR-013 placeholder path by default until a real asset is supplied

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Extend `reusable-components/section-eyebrow.tsx` with an optional `tone?: "orange" | "amber"` prop (default `"orange"`) that switches the dash + label color to `var(--color-amber-light)` when `tone="amber"` (research.md §5) — used by the Solutions, Lifecycle Diagram, and Impact sections later in this feature; About Us's existing usage is unaffected since it relies on the default
- [X] T004 [P] Create `app/construction/_data/types.ts` with the `PageSectionEntry` discriminated union and all section field types from data-model.md (`HeroSection`, `IntegrationsStripSection`, `ChallengesSection`, `SolutionsSection`, `LifecycleDiagramSection`, `AdvantageSection`, `ImpactSection`, `FinalCtaSection`, `SectionImage`, `PageSeo`, `ConstructionPageContent`)
- [X] T005 Create `app/construction/_data/construction-content.ts` exporting a typed `ConstructionPageContent` object populated with the content from `specs/002-construction-page/contracts/construction-page-response.json` (depends on T004)
- [X] T006 Create `app/construction/page.tsx` as the composition root: import `construction-content.ts`, set page `metadata` from `content.seo`, and map `content.sections` to a per-`type` switch that will render each section's component (component imports added incrementally as each user story lands) (depends on T004, T005)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Understand the construction-industry problem TechGrit solves (Priority: P1) 🎯 MVP

**Goal**: Render the hero, integrations strip, and industry challenges sections so a construction
visitor can recognize the page speaks to their industry and see the problems TechGrit addresses.

**Independent Test**: Load `/construction` and confirm the hero intro (with both CTAs and its 3
proof stats), the integrations strip (5 named tools), and all 5 industry challenges render, in
order, independent of any other section existing.

### Implementation for User Story 1

- [X] T007 [P] [US1] Create `app/construction/_components/construction-hero.tsx` rendering `HeroSection` (eyebrow pill, title with gradient highlight, subtitle, primary/secondary CTAs, hero visual or placeholder, 3 proof stats) using `.btn`/`.btn-primary`/`.btn-ghost`/`.text-gradient`, matching the About Us hero's pill-badge pattern (FR-001, FR-002, FR-013)
- [X] T008 [P] [US1] Create `app/construction/_components/construction-integrations-strip.tsx` rendering `IntegrationsStripSection` (label + partner names) as a bordered strip that wraps to a centered stack on narrow widths (FR-003, FR-012)
- [X] T009 [P] [US1] Create `app/construction/_components/construction-challenges.tsx` rendering `ChallengesSection` (eyebrow via `SectionEyebrow` default `tone="orange"`, title, description, all 5 `IndustryChallenge` entries) as an icon-card grid (5 columns desktop, collapsing at `md:`/`sm:`) using a local per-`order` icon map (research.md §6) (FR-004, FR-012, SC-005 — exactly 5 challenges)
- [X] T010 [US1] Wire `construction-hero`, `construction-integrations-strip`, and `construction-challenges` into the section-type switch in `app/construction/page.tsx` (depends on T006-T009)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Explore the AI solutions and how they connect across a project (Priority: P1)

**Goal**: Render the solutions list and the lifecycle-connection diagram so a visitor can see what
TechGrit builds and how it fits together across a project.

**Independent Test**: Load `/construction`, scroll to this part of the page, and confirm all 6
solution offerings and the 8-node lifecycle diagram (with its mobile/tablet fallback) render
correctly, independent of the advantage or impact sections.

### Implementation for User Story 2

- [X] T011 [P] [US2] Create `app/construction/_components/construction-solutions.tsx` rendering `SolutionsSection` (eyebrow via `SectionEyebrow tone="amber"`, title, all 6 `SolutionOffering` entries) as an icon-card grid (3 columns desktop, collapsing at `md:`/`sm:`) using a local per-`order` icon map (research.md §6) (FR-005, FR-012, SC-005 — exactly 6 solutions)
- [X] T012 [P] [US2] Create `app/construction/_components/construction-lifecycle-diagram.tsx` rendering `LifecycleDiagramSection` (eyebrow via `SectionEyebrow tone="amber"`, title, central `engineLabel`/`engineSubLabel`, all 8 `LifecycleNode` entries) with a fixed-position connector-line SVG layout shown at `lg:` and above, and a 2-column stacked grid fallback shown below `lg:` (research.md §7) (FR-006, FR-012)
- [X] T013 [US2] Wire `construction-solutions` and `construction-lifecycle-diagram` into the section-type switch in `app/construction/page.tsx` (depends on T006, T010, T011-T012)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Evaluate credibility and take action (Priority: P2)

**Goal**: Render the advantage list, the impact/case-study summaries, and the closing CTA so an
interested visitor sees evidence of credibility and has a clear way to start a conversation.

**Independent Test**: Load `/construction`, scroll to this part of the page, and confirm all 4
advantage points, all 3 case-study summaries, and the closing CTA (with its scheduling and email
actions) render and are actionable, independent of earlier sections.

### Implementation for User Story 3

- [X] T014 [P] [US3] Create `app/construction/_components/construction-advantage.tsx` rendering `AdvantageSection` (eyebrow via `SectionEyebrow` default `tone="orange"`, title, description, all 4 `AdvantagePoint` entries as a numbered list, matching the About Us process-step numbering pattern — no icon) (FR-007, SC-005 — exactly 4 advantage points)
- [X] T015 [P] [US3] Create `app/construction/_components/construction-impact.tsx` rendering `ImpactSection` (eyebrow via `SectionEyebrow tone="amber"`, title, all `CaseStudySummary` entries) as a 3-column card grid (`.card`) collapsing at `md:`/`sm:`, each card linking to its `link` field (FR-008)
- [X] T016 [P] [US3] Create `app/construction/_components/construction-final-cta.tsx` rendering `FinalCtaSection` (plain amber label — no `SectionEyebrow` dash, matching the About Us final-CTA convention — title, description, primary "schedule" CTA using its placeholder link, secondary "email the team" `mailto:` CTA) inside a `.glass-card` panel (FR-009; research.md §8 for the placeholder scheduling link) — implemented by reusing the shared `reusable-components/final-cta.tsx` directly in `page.tsx`, matching About Us's actual precedent exactly (no separate wrapper file needed; `FinalCta` already renders a plain amber eyebrow label inside a `.glass-card` panel)
- [X] T017 [US3] Wire `construction-advantage`, `construction-impact`, and `construction-final-cta` into the section-type switch in `app/construction/page.tsx` (depends on T006, T013, T014-T016)

**Checkpoint**: All eight content sections should now be independently functional and composed in
order on `/construction`

---

## Phase 6: User Story 4 - Read the page comfortably on any device (Priority: P1)

**Goal**: Confirm and finish the page-level responsive behavior (beyond what's already built into
each section component in US1-US3) so the whole page works cleanly at mobile, tablet, and desktop
widths with no overflow, overlap, or an illegible lifecycle diagram.

**Independent Test**: Load `/construction` at ~375-430px, ~768-1024px, and ~1280px+ widths and
confirm every section (from any story) remains readable, correctly laid out, and fully
interactive — including the lifecycle diagram's swap to its stacked fallback — per quickstart.md's
Story 4 checklist.

### Implementation for User Story 4

- [X] T018 [US4] Audit `app/construction/page.tsx` and all `app/construction/_components/*.tsx` for consistent use of `.tg-container`/`.section` and confirm no element causes horizontal overflow at any of the three breakpoints (depends on T010, T013, T017)
- [X] T019 [US4] Run the full responsive walkthrough from quickstart.md Story 4 at mobile/tablet/desktop widths across all 8 sections; confirm the lifecycle diagram swaps cleanly between its connector-line and stacked-grid presentations at the `lg:` breakpoint; fix any component whose grid/columns don't collapse correctly (depends on T018)

**Checkpoint**: All four user stories independently functional; the full page is responsive
end-to-end

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [X] T020 Run `npm run lint` and `npm run build`; fix any issues found across `app/construction/**` and the extended `reusable-components/section-eyebrow.tsx` (matches the Husky pre-commit gate)
- [X] T021 Run the remaining quickstart.md edge-case checks: missing-hero-image placeholder (default `null` state in `construction-content.ts`), direct navigation to `/construction#solutions`, and reduced-motion fallback for the shared `reveal-on-scroll.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - no dependency on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational; its page.tsx wiring task (T013) is
  sequenced after T010 only because both edit the same `page.tsx` switch statement, not because
  US2's components depend on US1
- **User Story 3 (Phase 5)**: Same as US2 — depends on Foundational; T017 sequenced after T013
  only for the shared `page.tsx` edit
- **User Story 4 (Phase 6)**: Depends on US1+US2+US3 wiring being complete, since it audits/tests
  the composed page as a whole
- **Polish (Phase 7)**: Depends on all prior phases

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- T003 and T004 (Foundational) can run in parallel — different files; T005 depends on T004; T006
  depends on T004+T005
- All component-creation tasks within a single user story phase (T007-T009, T011-T012, T014-T016)
  are marked [P] — different files, no dependency on each other
- Each user story's own components can be built in parallel by different people; only the shared
  `page.tsx` wiring task at the end of each phase must be sequenced

---

## Parallel Example: User Story 1

```bash
# Launch all three independent section components for User Story 1 together:
Task: "Create app/construction/_components/construction-hero.tsx per FR-001, FR-002"
Task: "Create app/construction/_components/construction-integrations-strip.tsx per FR-003"
Task: "Create app/construction/_components/construction-challenges.tsx per FR-004"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — hero, integrations strip, and industry challenges are a credible
   standalone landing above-the-fold experience even before Stories 2-4 land

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
- Every section component must independently satisfy FR-010 (self-contained, reorderable) and
  FR-011 (responsive at sm:/md:/lg:) — these are baked into each component task, not deferred to
  a separate cleanup pass
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
