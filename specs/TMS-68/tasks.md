# Tasks: Case Studies Listing & Detail Pages

**Input**: Design documents from `/specs/TMS-68/` (plan.md, research.md, data-model.md, quickstart.md)
**Branch**: `TMS-68` (see plan.md header note on the shared scripts' branch-naming gate)
**Tests**: No automated test framework is configured in this repo (research.md §13) — verification
tasks below are manual, per `quickstart.md`.

**Organization**: Tasks are grouped by user story (US1–US4 from spec.md) to enable independent
implementation and testing. US1 and US2 are both P1 and independently buildable in parallel once
Foundational is done; US3 extends US2's detail page; US4 is a cross-cutting responsive pass over
both pages' already-built components.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1, US2, US3, or US4 — omitted for Setup/Foundational/Polish tasks
- All file paths are absolute-from-repo-root

---

## Phase 1: Setup

- [X] T001 Create the `app/case-studies/_components/` and `app/case-studies/_data/` directories (no
      route files yet — this just establishes the structure from plan.md's Project Structure)

**Checkpoint**: Directory structure ready.

---

## Phase 2: Foundational (blocking prerequisites for all user stories)

- [X] T002 [P] Define all content types (`CaseStudyAccent`, `Metric`, `TeamRole`, `IntegrationChip`,
      `ArchitectureFlow`, `NarrativeSection`, `CaseStudyNarrative`, `CaseStudy`) in
      `app/case-studies/_data/types.ts` per data-model.md
- [X] T003 Author `CANONICAL_NARRATIVE` (the one fully-narrated case study from
      `raw-files/TechGrit Case Study.dc.html`) and the `CASE_STUDIES` array of 6 records (from
      `raw-files/TechGrit Case Studies.dc.html`, one marked `featured: true`) in
      `app/case-studies/_data/case-studies-content.ts` — depends on T002
- [X] T004 [P] Build the shared closing CTA banner component in
      `app/case-studies/_components/case-studies-final-cta.tsx` (solid `--color-ink-mid` card, orange
      blur blob, eyebrow/H2/paragraph/button — research.md §9), reused by both the list page and every
      detail page

**Checkpoint**: Content module and shared CTA exist — both P1 user stories can now start.

---

## Phase 3: User Story 1 - Browse the case studies and find one worth reading (Priority: P1) 🎯 MVP

**Goal**: List page shows intro hero, one featured case study, a grid of the rest, and a closing CTA;
every card/link opens its own detail page.

**Independent Test**: Load `/case-studies` and confirm the hero, featured card, grid, and CTA all
render, and every card/link points to a distinct case study's own detail page.

- [X] T005 [P] [US1] Build `case-studies-hero.tsx` (eyebrow, gradient-highlighted heading, supporting
      copy) in `app/case-studies/_components/case-studies-hero.tsx`
- [X] T006 [P] [US1] Build `featured-case-study.tsx` (spotlighted card: badge, headline metric, title,
      description, "Read case study →" link) in `app/case-studies/_components/featured-case-study.tsx`
- [X] T007 [P] [US1] Build `case-studies-grid.tsx` (teaser grid card: accent dot + industry label,
      metric, title, description, link; `color-mix()`-derived cover gradient and glow per accent —
      research.md §6) in `app/case-studies/_components/case-studies-grid.tsx`
- [X] T008 [US1] Compose `app/case-studies/page.tsx`: import `CASE_STUDIES`, derive `featured`/`grid`
      subsets, render hero → featured card → grid → `case-studies-final-cta`, each wrapped in its own
      `RevealOnScroll` group (research.md §12) — depends on T004–T007
- [X] T009 [US1] Manual verification of quickstart.md's User Story 1 steps 1–4 at desktop width

**Checkpoint**: List page fully functional and independently testable.

---

## Phase 4: User Story 2 - Read a full case study before reaching out (Priority: P1)

**Goal**: A case-study detail page, opened directly by URL, independently shows the complete story
(title, summary, metrics, background, challenge, approach, outcome, team) and a get-in-touch CTA.

**Independent Test**: Open a case study's detail page directly (not via the list) and confirm every
required section renders, including the not-found outcome for an invalid slug.

- [X] T010 [P] [US2] Build `case-study-detail-hero.tsx` (title, one-paragraph summary, published date
      with calendar icon, category badge reusing `.badge-teal`, decorative SVG panel) in
      `app/case-studies/_components/case-study-detail-hero.tsx`
- [X] T011 [P] [US2] Build `metrics-strip.tsx` (3–4 metric cells, teal-light valued numbers per
      reference) in `app/case-studies/_components/metrics-strip.tsx`
- [X] T012 [P] [US2] Build `architecture-diagram.tsx` (3-node flow: Next.js Web App → AWS ECS →
      NestJS API, plus 4 integration chips) in `app/case-studies/_components/architecture-diagram.tsx`
- [X] T013 [US2] Build `case-study-narrative.tsx` (4 anchored sections — `#background`, `#challenge`
      with pain-point cards, `#architecture` embedding `architecture-diagram`, `#solutions` — each its
      own `RevealOnScroll` group) in `app/case-studies/_components/case-study-narrative.tsx` — depends
      on T012
- [X] T014 [P] [US2] Build `team-panel.tsx` (role/headcount rows summing to team size, "Start a
      project →" CTA, pinned via `[data-aside]` on desktop) in
      `app/case-studies/_components/team-panel.tsx`
- [X] T015 [US2] Compose `app/case-studies/[slug]/page.tsx`: `generateStaticParams` from
      `CASE_STUDIES`, resolve `caseStudy` by `params.slug`, call `notFound()` when no match (FR-016),
      render hero → metrics-strip → narrative (+ team-panel aside) → `case-studies-final-cta` — depends
      on T010, T011, T013, T014
- [X] T016 [US2] Manual verification of quickstart.md's User Story 2 steps 1–5 and Edge case 1
      (`/case-studies/not-a-real-slug`)

**Checkpoint**: Detail page fully functional and independently testable, including not-found handling.

---

## Phase 5: User Story 3 - Keep exploring after finishing a case study (Priority: P2)

**Goal**: Every detail page offers a back-to-list link and a "more case studies" section that excludes
the case study currently being viewed.

**Independent Test**: From a detail page, confirm the back-link returns to `/case-studies` and each
related card opens a different case study's own detail page.

- [X] T017 [P] [US3] Add the "← All case studies" back-link near the top of
      `app/case-studies/_components/case-study-detail-hero.tsx`
- [X] T018 [US3] Build `related-case-studies.tsx` (3-card "More case studies" grid, selecting
      `CASE_STUDIES` entries excluding the current slug — research.md §10) in
      `app/case-studies/_components/related-case-studies.tsx`
- [X] T019 [US3] Wire `related-case-studies.tsx` into `app/case-studies/[slug]/page.tsx` between the
      narrative/team-panel section and the closing CTA — depends on T018
- [X] T020 [US3] Manual verification of quickstart.md's User Story 3 steps 1–4

**Checkpoint**: Detail-page exploration loop (back-link + related cases) complete.

---

## Phase 6: User Story 4 - Usable on a phone (Priority: P3)

**Goal**: Both pages reflow cleanly at phone widths — single-column grid, single-column metrics/body,
team panel resumes in-flow instead of staying pinned.

**Independent Test**: Resize to phone width on both pages and confirm no clipped/overlapping content
and the team panel appears in the reading flow, not pinned to the side.

- [X] T021 [US4] Add `tg-sm:`/`tg-md:`/`tg-lg:` responsive classes to
      `app/case-studies/_components/case-studies-grid.tsx` so the grid collapses to one column below
      `tg-md`
- [X] T022 [US4] Add `tg-sm:`/`tg-md:`/`tg-lg:` responsive classes to
      `app/case-studies/_components/metrics-strip.tsx` and the 2-column body layout in
      `app/case-studies/[slug]/page.tsx`/`case-study-narrative.tsx` so both collapse to one column
      below `tg-md`
- [X] T023 [US4] Add the `[data-aside]{position:static !important; order:-1;}`-equivalent responsive
      reflow to `app/case-studies/_components/team-panel.tsx` so it resumes normal in-flow placement
      below the narrative at ≤960px (research.md, spec.md FR-013) — implemented via inline Tailwind
      utility classes (`order-last tg-md:sticky tg-md:top-24 tg-md:order-none`) rather than a new
      global `[data-aside]` selector, avoiding an unnecessary repo-wide CSS rule for a single-component
      need
- [X] T024 [US4] Manual verification of quickstart.md's User Story 4 steps 1–2 at mobile width on both
      pages

**Checkpoint**: Both pages fully responsive across the supported width range.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T025 [P] Keyboard-operability and accessible-name pass across every card/link on both pages
      (FR-015) — quickstart.md Edge case 3
- [X] T026 [P] Confirm reveal animations are never the sole means of visibility (disable JS / observe
      the 1500ms safety-timeout) on both pages (FR-014) — quickstart.md Edge case 2
- [X] T027 Run `npm run lint` (passes clean) — `npm run build` is currently blocked on this machine
      by a pre-existing environment issue (`@next/swc-win32-x64-msvc` native binary fails to load,
      unrelated to this feature's code — see quickstart.md build-gate note); lint and dev-server
      runtime checks confirm the feature code itself is sound
- [ ] T028 Full `quickstart.md` gate checklist sign-off — blocked only on the `npm run build` item
      above pending an environment fix

---

## Dependencies & Execution Order

1. **Setup (T001)** — no dependencies.
2. **Foundational (T002–T004)** — depends on Setup; T003 depends on T002; T004 is independent of
   T002/T003. Blocks all user stories.
3. **User Story 1 (T005–T009)** and **User Story 2 (T010–T016)** — both depend only on Foundational;
   independent of each other and can proceed in parallel (both P1).
4. **User Story 3 (T017–T020)** — depends on User Story 2 (extends `[slug]/page.tsx` and
   `case-study-detail-hero.tsx`).
5. **User Story 4 (T021–T024)** — depends on User Story 1 and User Story 2 (styles their already-built
   components); best done once T009 and T016 (or at least T007/T008/T011/T013/T015) are complete.
6. **Polish (T025–T028)** — depends on all prior phases.

## Parallel Opportunities

- T002 and T004 (Foundational) — different files, no shared dependency.
- T005, T006, T007 (US1) — different files.
- T010, T011, T012, T014 (US2) — different files (T013 depends on T012 only).
- User Story 1's phase and User Story 2's phase can be assigned to two different people/sessions
  entirely in parallel once Foundational lands.
- T025 and T026 (Polish) — independent verification passes.

## Implementation Strategy

**Suggested MVP**: User Story 1 + User Story 2 (both P1) — the list page and detail page together are
the minimum viable case-studies section per spec.md's own priority assignment (P1 stories share equal
priority and each independently delivers the primary value: discoverability + persuasive content).
User Story 3 (related-cases exploration) and User Story 4 (phone responsiveness) are valuable
incremental additions, sequenced by their P2/P3 priority.

**Incremental delivery**: Setup → Foundational → (US1 ∥ US2) → US3 → US4 → Polish. Each user-story
checkpoint above is independently demoable and testable via its own quickstart.md section before
moving to the next.

## Format Validation

All 28 tasks follow `- [ ] T0XX [P?] [USn?] Description with file path`:
- Setup: T001 (no story label, no [P] — single task)
- Foundational: T002 [P], T003, T004 [P] (no story labels)
- US1: T005–T009, all labeled `[US1]`
- US2: T010–T016, all labeled `[US2]`
- US3: T017–T020, all labeled `[US3]`
- US4: T021–T024, all labeled `[US4]`
- Polish: T025 [P], T026 [P], T027, T028 (no story labels)

---

## Summary

- **Total tasks**: 28
- **Per story**: Setup 1, Foundational 3, US1 5, US2 7, US3 4, US4 4, Polish 4
- **Parallel opportunities**: 2 in Foundational, 3 in US1, 4 in US2 (3 fully parallel + 1 dependent),
  2 in Polish, plus US1's and US2's entire phases in parallel with each other
- **Suggested MVP scope**: User Story 1 + User Story 2 (T001–T016)
- **Suggested next command**: `/speckit.analyze` (cross-artifact consistency check) or
  `/speckit.implement` (begin execution)
