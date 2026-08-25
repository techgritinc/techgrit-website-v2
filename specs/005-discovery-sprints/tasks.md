---

description: "Task list for Discovery Sprints page (005-discovery-sprints)"
---

# Tasks: Discovery Sprints Page

**Input**: Design documents from `/specs/005-discovery-sprints/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test framework is configured in this repository (per `CLAUDE.md`);
verification is manual via `quickstart.md`.

**Organization**: Tasks are grouped by user story (US1 = evaluate the offering, US2 = FAQ, US3 =
convert to contact) per `spec.md`.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — invoke the
  vendored `frontend-design` skill before executing
- **[Story]**: Maps task to US1/US2/US3

## Path Conventions

Single Next.js App Router project. New route: `app/how-we-work/discovery-sprints/`.

---

## Phase 1: Setup

**Purpose**: Route scaffolding and the one unrelated nav fix, both independent of content work.

- [X] T001 Create route skeleton: `app/how-we-work/discovery-sprints/page.tsx` (empty shell),
      `app/how-we-work/discovery-sprints/_data/`, `app/how-we-work/discovery-sprints/_components/`
      folders, mirroring `app/what-we-do/ai-modernization/`'s structure exactly.
- [X] T002 [P] Repoint the Discovery Sprints footer link in `cms/api/footer.ts` (the
      `{ slug: "discovery", ... }` entry) from `href: "/frameworks#discovery"` to
      `href: "/how-we-work/discovery-sprints"`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared component change and static content that every user story's sections consume.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 [P] [UI] Add an optional `columns` prop (default `5`, preserving current
      `lg:grid-cols-5` behavior) to `components/ui/ProcessSteps.tsx`, applying
      `lg:grid-cols-{columns}` instead of the hardcoded value.
- [X] T004 Define all content types in `app/how-we-work/discovery-sprints/_data/types.ts` per
      `data-model.md` (`HeroContent`, `IntroContent`, `PhaseZeroContent`, `CapabilityCard`,
      `DeliverableCard`, `WhyContent`, `ExecuteTile`, `AudienceCard`, and the page-level
      `DiscoverySprintsContent` shape — reusing `ProcessStep` from `ProcessSteps.tsx`,
      `FaqItemContent` from `Faq.tsx`, and `FinalCtaContent` from `final-cta.tsx` rather than
      redefining them).
- [X] T005 Author the full static content object in
      `app/how-we-work/discovery-sprints/_data/discovery-sprints-content.ts` (depends on T004),
      transcribing all copy from `raw-files-v3/TechGrit Website V2.3/TechGrit Discovery
      Sprint.dc.html` per FR-002–FR-014 (hero copy, 6 intro chips, the new Phase Zero Assessment
      copy, 3 capability cards with 5 features each, 7 deliverable cards, 4 lifecycle steps, "Why
      TechGrit" copy, 6 execute tiles, 4 audience cards, 5 FAQ entries with the first
      `defaultOpen: true`, closing CTA copy) — all CTA `href`s point to `/contact` (or
      `#capabilities` for the hero's secondary CTA), never the reference's `.dc.html` paths
      (FR-015).

**Checkpoint**: Foundation ready — all user story sections can now be built in parallel.

---

## Phase 3: User Story 1 - Evaluate the Discovery Sprint offering (Priority: P1) 🎯 MVP

**Goal**: Render the hero and every core informational section so a visitor can understand what a
Discovery Sprint / Phase Zero Assessment includes.

**Independent Test**: Navigate to `/how-we-work/discovery-sprints` and confirm the hero, intro,
Phase Zero Assessment, capabilities, deliverables, lifecycle, why, execute, and who-for sections
render the correct copy in the correct order (spec.md User Story 1, Acceptance Scenarios 1–3).

### Implementation for User Story 1

- [X] T006 [UI] [US1] Wire the hero in `page.tsx` using `Hero` (no `crumbs`, `mediaFill`) with a
      `MediaSlot` (`fill`, wrapped in a fixed `aspect-[4/3]` container) in the `media` slot,
      primary CTA → `/contact`, secondary CTA → `#capabilities`.
- [X] T007 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-intro.tsx` — "Why Phase
      Zero changes everything" via `ContentBlock` (`chips` variant).
- [X] T008 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-phase-zero.tsx` — new
      "What Is a Phase Zero Assessment?" section: `ContentBlock` (no-`chips` variant) followed by a
      `GlassCard` (`variant="default"`) wrapping an `Outcome` block.
- [X] T009 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-capabilities.tsx` —
      "What We Cover," `id="capabilities"` on the section, 3 `GlassCard` (`variant=
      "serviceCapability"`) cards with category label, `GlassCardTitle`, `GlassCardDescription`,
      and a bulleted feature list, mirroring
      `app/how-we-work/engagement-models/_components/engagement-models-capabilities.tsx`.
- [X] T010 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-deliverables.tsx` — "What
      You'll Receive," 7 `GlassCard` (`variant="default"`) cards with a small numeral label
      (`text-[11px] font-extrabold tracking-[0.14em] text-orange`) plus title/description, 4-col
      grid collapsing per FR-018.
- [X] T011 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-lifecycle.tsx` — "How It
      Works," `ProcessSteps` with `columns={4}` (from T003).
- [X] T012 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-why-execute.tsx` —
      "Documentation you can execute. Not slides that gather dust.": eyebrow/title/description
      header, then 6 `IconTile` (`size="default"`) tiles in a `grid-cols-1 md:grid-cols-2` layout.
- [X] T013 [P] [UI] [US1] Create
      `app/how-we-work/discovery-sprints/_components/discovery-sprints-who-for.tsx` — "Who It's
      For," 4 `GlassCard` (`variant="serviceCapability"`) cards with an icon chip, title,
      description, mirroring
      `app/what-we-do/ai-modernization/_components/ai-modernization-industries.tsx`'s
      `IndustryTile`.
- [X] T014 [UI] [US1] Assemble `page.tsx`: import T006–T013's components plus one inline
      `ContentBlock` (no-`chips` variant) usage for the text-only "Why TechGrit Discovery Sprints"
      section (FR-008 — no dedicated component file needed), render all sections in spec order
      (Hero → Intro → Phase Zero → Capabilities → Deliverables → Lifecycle → Why → Execute →
      Who-For), wrapping each in `RevealOnScroll` consistent with sibling pages.
- [X] T015 [US1] Add `generateMetadata()` to `page.tsx` (SEO title/description from the content
      module), matching the pattern in `app/how-we-work/engagement-models/page.tsx`.

**Checkpoint**: User Story 1 is fully functional and independently testable — the page renders all
core content sections end-to-end.

---

## Phase 4: User Story 2 - Resolve open questions via FAQ (Priority: P2)

**Goal**: Visitors can expand/collapse FAQ answers without leaving the page.

**Independent Test**: Scroll to the FAQ section and toggle each question (spec.md User Story 2,
Acceptance Scenarios 1–2).

### Implementation for User Story 2

- [X] T016 [UI] [US2] Wire the FAQ section in `page.tsx` using `Faq` with the 5 entries from
      `discovery-sprints-content.ts` (first entry `defaultOpen: true`).

**Checkpoint**: FAQ is independently testable — expand/collapse works without any US1/US3 code.

---

## Phase 5: User Story 3 - Move from evaluation to contact (Priority: P3)

**Goal**: Every CTA on the page reliably routes a convinced visitor to Contact.

**Independent Test**: Click the hero CTA and the closing CTA section's buttons; confirm both reach
`/contact` (spec.md User Story 3, Acceptance Scenarios 1–2).

### Implementation for User Story 3

- [X] T017 [UI] [US3] Wire the closing CTA section in `page.tsx` using `FinalCta`
      (`tone="orange"`), matching the sizing/padding overrides already used in
      `app/what-we-do/ai-modernization/page.tsx` and
      `app/how-we-work/orbit-ai-ecosystem/page.tsx`'s `finalCta` case, both buttons → `/contact`.
- [X] T018 [US3] Verify the hero's primary CTA (T006) resolves to `/contact` and its secondary CTA
      resolves to the `#capabilities` anchor set on the capabilities section (T009) — fix either
      href if it doesn't scroll/navigate correctly.

**Checkpoint**: All user stories (US1, US2, US3) are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T019 [P] Confirm `components/ui/ambient-orbs.tsx`'s existing `/how-we-work/` pathname branch
      renders on `/how-we-work/discovery-sprints` with no code change needed (per research.md R10).
- [X] T020 Run the full `quickstart.md` manual verification checklist (section order, visual
      parity against the reference at desktop/tablet/mobile widths, CTA routing, component reuse,
      responsive collapse, no flicker).
- [X] T021 Run `npm run lint` and `npm run build` (required green before commit per
      `.husky/pre-commit`).

---

## Post-Implementation Revisions (user review pass, 2026-08-24)

Applied after initial implementation, per direct user feedback on the rendered page:

- Removed the "Why TechGrit Discovery Sprints" section entirely (was FR-008; user determined it
  was not required once seen alongside the other sections).
- Reordered sections: Deliverables → **Who It's For** → **Documentation you can execute** → **How
  It Works** → FAQ → Closing CTA (previously Deliverables → How It Works → Why → Documentation →
  Who It's For → FAQ → CTA).
- Removed `defaultOpen: true` from the first FAQ item — all 5 items now start collapsed, which
  also resolved the reported "gap/size varies" symptom (it was solely caused by the first item
  being pre-expanded to a taller height than its 4 closed siblings; all 5 now render at a uniform
  69–70px with identical 17px summary text).
- Verified (not changed): the closing CTA's primary button already renders at 17px (`--text-base`
  token, confirmed via computed styles) — matches the reference's closing-CTA button exactly. The
  hero's primary button intentionally stays at 16px, matching the reference's hero button, which
  specifies a different literal size than the closing CTA; changing this would require editing the
  shared `Hero` component and would regress Engagement Models/AI Modernization's hero buttons.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T001/T002 can start immediately and run in parallel.
- **Foundational (Phase 2)**: T003 has no dependency; T004 depends on nothing beyond Setup; T005
  depends on T004. Phase 2 BLOCKS all user stories.
- **User Stories (Phase 3–5)**: All depend on Phase 2 completion. US1's component tasks (T007–T013)
  are mutually independent ([P]); T014/T015 depend on all of T006–T013. US2 (T016) and US3
  (T017–T018) each only need Phase 2 + their own small task, so they can proceed in parallel with
  US1's component-building, but T018's verification depends on T006 and T009 already existing.
- **Polish (Phase 6)**: Depends on US1–US3 all being complete.

### Parallel Opportunities

- T001, T002 together.
- T003 alongside T004 (different files); T005 waits on T004.
- T007–T013 (7 section components) all in parallel once Phase 2 is done.
- T016 and T017 can be built in parallel with US1's T007–T013 (different files), though T014 should
  land before final integration testing since it's the page assembly point.

---

## Parallel Example: Phase 3 (User Story 1)

```bash
# Once Phase 2 (T003–T005) is complete, launch all 7 section components together:
Task: "Create discovery-sprints-intro.tsx"
Task: "Create discovery-sprints-phase-zero.tsx"
Task: "Create discovery-sprints-capabilities.tsx"
Task: "Create discovery-sprints-deliverables.tsx"
Task: "Create discovery-sprints-lifecycle.tsx"
Task: "Create discovery-sprints-why-execute.tsx"
Task: "Create discovery-sprints-who-for.tsx"
# Then T006 (hero) and T014 (assembly) once the above land.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational).
2. Complete Phase 3 (US1) — T006–T015.
3. **STOP and VALIDATE**: load the page, confirm every core section renders and matches the
   reference visually (quickstart.md steps 1–3, 6, 7).
4. This alone is a demoable, content-complete page (FAQ and CTA wiring are thin additions on top).

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → informational page complete → validate against reference.
3. US2 → FAQ interactive → validate expand/collapse.
4. US3 → CTAs wired → validate all routes to `/contact`.
5. Polish → lint/build green, full quickstart checklist passes.

---

## Notes

- [P] tasks touch different files with no dependencies on incomplete tasks.
- [UI] tasks require the `frontend-design` skill invocation before execution (Constitution
  Principle VI) — already synthesized once in `plan.md`'s "UI Design Approach"; re-invoke per-task
  only if a task's specific craft question wasn't already covered there.
- No test tasks — no test framework is configured in this repository; `quickstart.md` is the
  verification mechanism (T020).
- Zero new shared components are created; T003 is the only shared-component change, and it's
  additive/backward-compatible.
