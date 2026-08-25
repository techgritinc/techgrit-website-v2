# Tasks: AI-Accelerated Modernization Page (TMS-86)

**Input**: Design documents from `specs/TMS-86/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/ai-modernization/`; shared primitives under `components/ui/`; one cross-cutting edit in `cms/api/footer.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/ai-modernization/_data/` and `app/what-we-do/ai-modernization/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 10 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit AI Modernization.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I). Document findings inline as code comments only if a genuinely new token turns out to be required — none are expected per plan.md's Constitution Check.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `AiModernizationSection` discriminated union in `app/what-we-do/ai-modernization/_data/types.ts`, per data-model.md (`HeroSection`, `IntroSection`, `ModernizationCapability`/`CapabilitiesSection`, `LifecycleStage`/`LifecycleSection`, `ModernizationStrategy`/`StrategiesSection`, `ValuePropositionTile`/`WhySection`, `IndustryCard`/`IndustriesSection`, `FaqItem`/`FaqSection`, `RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `AiModernizationPageContent`)
- [X] T004 Create `app/what-we-do/ai-modernization/_data/ai-modernization-content.ts` exporting `aiModernizationContent: AiModernizationPageContent` with `seo` filled in and `sections: []` (populated incrementally by each user story's content task below)
- [X] T005 Create `app/what-we-do/ai-modernization/page.tsx`: `export const metadata` from `aiModernizationContent.seo`, and a `switch (section.type)` over `aiModernizationContent.sections` inside `<main className="overflow-x-clip">` — mirrors `app/construction/page.tsx`'s structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`)
- [X] T006 [P] Add a new `/what-we-do/` pathname branch to `components/ui/ambient-orbs.tsx` reproducing the reference's exact 4-orb geometry (top-right 620×620 `rgba(232,119,34,0.14)` blur 130 / mid-left 560×560 `rgba(2,132,199,0.10)` blur 140 / mid-right 520×520 `rgba(232,119,34,0.10)` blur 140 / bottom 660×660 `rgba(232,119,34,0.11)` blur 150), per research.md §7 — existing branches/behavior for every other route untouched
- [X] T007 [P] Add one new variant (e.g. `serviceCapability`) to `components/ui/GlassCard.tsx`'s four variant maps (`CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, `DESC_VARIANTS`) for the numbered-eyebrow + heading + lede + bullet-list capability-card shape, per research.md §3 — every existing variant left unmodified

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate the modernization offering end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the six modernization capabilities, the five-stage lifecycle, and the six supported strategies, and understand TechGrit's modernization offering without leaving the page.

**Independent Test**: Load the page with only these five sections wired in; verify a reader can understand "AI-accelerated modernization," see all six capabilities with their bullets, and see the five-stage lifecycle.

### Implementation for User Story 1

- [X] T008 [US1] Populate the hero, intro/blockers, capabilities, lifecycle, and strategies entries verbatim (per FR-001) into `aiModernizationContent.sections` in `app/what-we-do/ai-modernization/_data/ai-modernization-content.ts`
- [X] T009 [P] [UI] [US1] Build `components/ui/Hero.tsx`: a generic, configurable hero primitive — breadcrumbs, eyebrow, headline with a gradient-accented substring, subtitle, primary+secondary CTA, and the right-side card's shared chrome (padding, border radius, gradient background, decorative blurred-orb corner accent, bottom-divider caption row) around two content slots, `media: ReactNode` and `mediaCaption?: string` — confirmed reusable per the sibling "What We Do" prototypes' byte-identical hero markup (research.md §4; plan.md Complexity Tracking). No page-specific copy inside the component.
- [X] T010 [P] [UI] [US1] Build `components/ui/ContentBlock.tsx`: a generic two-column content-block primitive — left eyebrow/title/description, right chips-label + wrapping chip-pill list (`chips: { id, label }[]`, keyed on `id`, not array index) — confirmed reusable per the same sibling prototypes' byte-identical intro markup (research.md §4)
- [X] T011 [UI] [US1] Build `components/ui/ProcessSteps.tsx`: generic numbered step-strip primitive taking `{ steps: { order, title, description }[] }`, per data-model.md — no page-specific copy inside the component
- [X] T012 [P] [UI] [US1] Build `app/what-we-do/ai-modernization/_components/ai-modernization-capabilities.tsx`: 6-card grid using the new `GlassCard` capability variant (T007), each with its numbered "01 · Assess"-style label, heading, lede, and full 4-item bullet list
- [X] T013 [UI] [US1] Build `app/what-we-do/ai-modernization/_components/ai-modernization-lifecycle.tsx`: wraps `ProcessSteps` (T011) with the 5 lifecycle stages under the section's own eyebrow/heading
- [X] T014 [P] [UI] [US1] Build `app/what-we-do/ai-modernization/_components/ai-modernization-strategies.tsx`: the 6-tile "Strategies we support" band as page-local Tailwind markup (per research.md §3 — no shared abstraction)
- [X] T015 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` (T009) for the hero section, passing `media={<Image src="/samples/dm-tech-debt.png" .../>}` in place of the reference's stat grid (FR-004) and `mediaCaption` as the retained PRISM/OrbitAI line; render `<ContentBlock>` (T010) for the intro section; render the capabilities/lifecycle/strategies components (T012–T014). Confirm the hero's "See capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header.
- [X] T016 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections), and 6 (responsive pass on this story's sections)

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why AI-assistance matters and industry fit (Priority: P2)

**Goal**: A visitor can read the six "why AI-assisted" value tiles and the three industry cards, confirming domain fit and differentiation.

**Independent Test**: With only the hero/capabilities sections present, add the "Why" tiles and "Industries" cards and verify each renders independently with correct content and links.

### Implementation for User Story 2

- [X] T017 [US2] Populate the why-tiles and industries entries verbatim into `aiModernizationContent.sections`
- [X] T018 [P] [UI] [US2] Build `app/what-we-do/ai-modernization/_components/ai-modernization-why.tsx`: 6-tile grid using `GlassCard`'s `reimagineWhy` variant (fall back to a page-local tile only if its icon-box sizing genuinely can't tolerance-fit the reference's 40×40 box — see research.md §3); reuse existing exports in `components/ui/icons.tsx` where an exact path match exists (research.md §8 — confirmed matches for "Accelerated Code Transformation," "Lower Costs," and "Reduced Risk"); add any genuinely missing icon shape as a new export in that same file, never a per-route copy
- [X] T019 [P] [UI] [US2] Build `app/what-we-do/ai-modernization/_components/ai-modernization-industries.tsx`: 3-card grid using `GlassCard`'s `industry` variant, each card linking to its industry page (`/construction`, or the appropriate route for HealthTech/FinTech per spec.md Assumptions)
- [X] T020 [US2] Wire the why/industries components into `page.tsx`'s section `switch`
- [X] T021 [US2] Verify Story 2 independently per quickstart.md step 2

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T022 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `aiModernizationContent.sections`
- [X] T023 [UI] [US3] Build `components/ui/Faq.tsx`: generic native `<details>`/`<summary>` accordion primitive taking `{ items: { id, question, answer, defaultOpen? }[] }` — no client-side state needed, independent per-item expand/collapse is native (FR-005, FR-008)
- [X] T024 [P] [UI] [US3] Build `app/what-we-do/ai-modernization/_components/ai-modernization-faq.tsx` using `Faq` (T023), with only the first item's `defaultOpen: true`
- [X] T025 [UI] [US3] Build `components/ui/IconTile.tsx`: generic icon-led compact tile primitive taking `{ icon, title, description, href?, size? }`, per data-model.md
- [X] T026 [P] [UI] [US3] Build `app/what-we-do/ai-modernization/_components/ai-modernization-related.tsx` using `IconTile` (T025) for the 6 related-service cards, plus the "See all services" link to `/services`
- [X] T027 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors `app/construction/page.tsx`'s existing `FinalCta` usage)
- [X] T028 [US3] Verify Story 3 independently per quickstart.md step 3

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T029 [P] [UI] Build `components/ui/Outcome.tsx`: generic `{ heading, description, className? }` heading+description block per FR-012 — built now per clarification even though this page does not render it anywhere; keep it to exactly these two content props, no speculative variants/options
- [X] T030 Update `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` — change the "AI-Accelerated Modernization" link's `href` from `/services#svc-modernization` to `/what-we-do/ai-modernization` (FR-011); no other footer or header content touched (research.md §6)
- [X] T031 Verify FR-002: run `git diff` (or `git status`) against `main` and confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, and `components/layout/HeaderClient.tsx` — the only permitted navigation-related edit in this feature is T030's `cms/api/footer.ts` data change, not the Header/Footer components themselves
- [X] T032 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit AI Modernization.dc.html` verbatim, character-for-character (SC-002)
- [X] T033 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal 920px/640px media queries (plan.md Constitution Check, Principle II) — for all 10 sections (SC-003), including every item in spec.md's Edge Cases section. Avoid introducing any new arbitrary breakpoint value; if the canonical contract ever produces a visibly broken layout the reference's own breakpoints wouldn't have, flag it rather than silently adding a one-off value.
- [X] T034 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate)
- [X] T035 Run the full quickstart.md walkthrough (all steps) end to end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T003 blocks T004; T004 blocks T005; T005 blocks every story's wiring task T015/T020/T027; T007 blocks T012)
- **User Stories (Phase 3-5)**: All depend on Foundational completion; independent of each other's *implementation* (each adds its own sections to the shared content array and its own wiring `case`s), but conventionally built in priority order P1 → P2 → P3
- **Polish (Phase 6)**: T029 has no dependency on any story (Outcome is unused on this page); T030 is independent of all stories; T031 (Header/Footer no-diff check) can run any time after T030, since it's checking the cumulative diff; T032/T033/T034 depend on all three stories being wired in; T035 depends on everything above

### User Story Dependencies

- **US1 (P1)**: Start after Foundational. No dependency on US2/US3.
- **US2 (P2)**: Start after Foundational. Appends to the same `sections` array and `page.tsx` switch as US1, but adds distinct cases — no logical dependency on US1's content.
- **US3 (P3)**: Start after Foundational. Same note as US2.

### Within Each User Story

- Content population task first (defines the data the components render)
- Shared primitive (if new) before the route-local component that consumes it (e.g. T011 before T013; T023 before T024; T025 before T026)
- Route-local components before the `page.tsx` wiring task
- Wiring before that story's independent verification task

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- T006 and T007 (Foundational) can run in parallel — different files
- Within US1: T009, T010, T012, T014 can run in parallel (different files); T011 must land before T013 consumes it
- Within US2: T018 and T019 can run in parallel
- Within US3: T024 can run in parallel with T025/T026's start, but T026 needs T025 done first; T023 must precede T024
- T029 and T030 (Polish) can run in parallel with each other and with the tail of Phase 5; T031 (Header/Footer no-diff check) is cheap enough to run repeatedly throughout, not just once at the end
- Once Foundational completes, US1/US2/US3 could in principle be staffed in parallel by different developers, since each only adds new `case`s to the shared switch and new entries to the shared content array (a rebase/merge concern, not a design dependency)

---

## Parallel Example: User Story 1

```bash
# After T008 (content populated), launch independent component builds together:
Task: "Build components/ui/Hero.tsx"
Task: "Build components/ui/ContentBlock.tsx"
Task: "Build ai-modernization-capabilities.tsx"
Task: "Build ai-modernization-strategies.tsx"
# ProcessSteps (T011) and its consumer ai-modernization-lifecycle.tsx (T013) are sequential, not parallel with each other
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (User Story 1)
3. **STOP and VALIDATE**: run quickstart.md steps 1/4/5/6 against just these five sections
4. Demo if ready — this alone is a coherent, sellable page fragment

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. + User Story 1 → validate → demo (MVP)
3. + User Story 2 → validate → demo
4. + User Story 3 → validate → demo (content-complete)
5. Polish (Phase 6) → Outcome component, footer repoint, Header/Footer no-diff check, fidelity/responsive passes, lint/build gate, full quickstart run → feature done

### Parallel Team Strategy

1. One person/session completes Setup + Foundational
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`ai-modernization-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged
