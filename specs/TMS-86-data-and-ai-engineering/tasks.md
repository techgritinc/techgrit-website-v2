# Tasks: Data & AI Engineering Page (TMS-86-data-and-ai-engineering)

**Input**: Design documents from `specs/TMS-86-data-and-ai-engineering/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/data-ai-engineering/`; **zero** new `components/ui/` primitives or icons (every needed shape/icon already exists — see plan.md/research.md); two cross-cutting edits in `cms/api/footer.ts` and `cms/api/header.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/data-ai-engineering/_data/` and `app/what-we-do/data-ai-engineering/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 9 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit Data AI.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I). Per plan.md's Constitution Check, zero new tokens are expected — this audit is a verification step, not exploratory.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on. No new `components/ui/` primitive or icon is built in this phase — none is needed (plan.md/research.md §3–4).

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `DataAiEngineeringSection` discriminated union in `app/what-we-do/data-ai-engineering/_data/types.ts`, per data-model.md (`HeroSection`/`HeroImage`, `Blocker`/`IntroSection`, `CapabilityBullet`/`Capability`/`CapabilitiesSection`, `LifecycleStage`/`LifecycleSection`, `WhyIconKey`/`ValuePropositionTile`/`WhySection`, `IndustryIconKey`/`IndustryCard`/`IndustriesSection`, `FaqItem`/`FaqSection`, `RelatedServiceIconKey`/`RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `DataAiEngineeringPageContent`)
- [X] T004 Create `app/what-we-do/data-ai-engineering/_data/data-ai-engineering-content.ts` exporting `dataAiEngineeringContent: DataAiEngineeringPageContent` with `seo` filled in and `sections: []` (populated incrementally by each user story's content task below)
- [X] T005 Create `app/what-we-do/data-ai-engineering/page.tsx`: `export const metadata` from `dataAiEngineeringContent.seo`, and a `switch (section.type)` over `dataAiEngineeringContent.sections` inside `<main className="overflow-x-clip">` — mirrors both sibling pages' pre-CMS-integration structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate the data & AI engineering offering end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the six capabilities, and the five-stage lifecycle, and understand TechGrit's data & AI engineering offering without leaving the page.

**Independent Test**: Load the page with only these four sections wired in; verify a reader can understand "data & AI engineering," see all six capabilities with their bullets, and see the five-stage lifecycle.

### Implementation for User Story 1

- [X] T006 [US1] Populate the hero, intro/blockers, capabilities, and lifecycle entries verbatim (per FR-001) into `dataAiEngineeringContent.sections` in `app/what-we-do/data-ai-engineering/_data/data-ai-engineering-content.ts` — the capabilities section's `title` reads "Six capabilities. One AI-first engine." (corrected from the reference's literal "Five," per Clarifications/data-model.md), and the hero's `mediaCaption` is set to "AI IMPACT™ · OrbitAI™ · PRISM™ frameworks" (per Clarifications)
- [X] T007 [P] [UI] [US1] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-capabilities.tsx`: 6-card grid reusing `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle`/`GlassCardDescription` — no new component, no new variant (already exists)
- [X] T008 [UI] [US1] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-lifecycle.tsx`: wraps the existing `ProcessSteps` primitive with the 5 lifecycle stages (Discover, Build, Enable, Govern, Optimize) under the section's own eyebrow/heading
- [X] T009 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` for the hero section with `mediaFill`, `media={<MediaSlot src="/samples/svc-qa.png" alt="..." fill priority sizes="(max-width: 960px) 100vw, 40vw" />}` in place of the reference's stat grid (FR-004), and `mediaCaption="AI IMPACT™ · OrbitAI™ · PRISM™ frameworks"` (per Clarifications — caption retained, unlike the Software Product Engineering sibling); render `<ContentBlock>` for the intro section; render the capabilities/lifecycle components (T007–T008). Confirm the hero's "See capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header.
- [X] T010 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections, including confirming the "Six capabilities" correction), and 6 (responsive pass on this story's sections)

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why the approach matters and see relevant industry fit (Priority: P2)

**Goal**: A visitor can read the six "why AI-first data engineering" tiles and the three industry cards, confirming domain fit and differentiation.

**Independent Test**: With only the hero/capabilities/lifecycle sections present, add the "Why" tiles and "Industries" cards and verify each renders independently with correct content and links.

### Implementation for User Story 2

- [X] T011 [US2] Populate the why-tiles and industries entries verbatim into `dataAiEngineeringContent.sections`
- [X] T012 [P] [UI] [US2] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-why.tsx`: page-local 6-tile grid (icon + heading + description, 2-column), matching both sibling pages' own equivalent page-local "why" pattern (research.md §3) rather than a new shared primitive; map each tile's `iconKey` to an existing `components/ui/icons.tsx` export per data-model.md/research.md §4 (`dataQuality`→`CheckCircleIcon`, `aiAdoption`→`LightningIcon`, `automation`→`NetworkNodeIcon`, `decisions`→`TrendingUpIcon`, `scale`→`ShieldIcon`, `frameworks`→`AwardIcon`) — no new icon added
- [X] T013 [P] [UI] [US2] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-industries.tsx`: 3-card grid reusing `GlassCard` (`variant="serviceCapability"`) on a 4-column desktop track, each card linking to its industry page, mapping each `iconKey` to an existing icon per research.md §4 (`healthcare`→`HealthcareIcon`, `fintech`→`IndustryFinTechIcon`, `construction`→`ConstructionIcon`) — no new icon or token added
- [X] T014 [US2] Wire the why/industries components into `page.tsx`'s section `switch`
- [X] T015 [US2] Verify Story 2 independently per quickstart.md step 2

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T016 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `dataAiEngineeringContent.sections`
- [X] T017 [P] [UI] [US3] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-faq.tsx` using the existing `Faq` primitive, with only the first item's `defaultOpen: true`
- [X] T018 [P] [UI] [US3] Build `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-related.tsx` using the existing `IconTile` primitive (`size="compact"`) for the 6 related-service cards, mapping each `iconKey` to its existing icon export per research.md §4 (`modernization`→`SvcModernizationIcon`, `engineering`→`EradicateDebtIcon` — the AI-Modernization sibling's own precedent for the "Software Product Engineering" icon gap — `platform`→`SvcPlatformIcon`, `managed`→`SvcManagedIcon`, `strategy`→`SvcStrategyIcon`, `startups`→`SvcStartupsIcon`), plus the "See all services" link to `/services`
- [X] T019 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors both sibling pages' existing `FinalCta` usage)
- [X] T020 [US3] Verify Story 3 independently per quickstart.md step 3

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T021 Update `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` — change the `slug: "svc-data-ai"` ("Data & AI Engineering") entry's `href` from `/services#svc-data-ai` to `/what-we-do/data-ai-engineering` (FR-010a; research.md §6)
- [X] T022 Update `cms/api/header.ts`'s `toMegaGroup()` — extend the existing two-service ternary chain to also match `section.title === "Data and AI Engineering"` → `/what-we-do/data-ai-engineering` (FR-010b; research.md §6)
- [X] T023 Verify FR-002/FR-009: run `git diff --stat` (or `git status`) against `main` and confirm the changed-file list contains **only**: files under `app/what-we-do/data-ai-engineering/`, `cms/api/footer.ts`, `cms/api/header.ts`, and this feature's `specs/TMS-86-data-and-ai-engineering/` docs — explicitly confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, any file under `components/ui/`, `app/tokens.css`, `app/globals.css`, and any other route or config file. The only permitted navigation-related edits in this feature are T021/T022's config data changes, not the Header/Footer components or any shared primitive.
- [X] T024 Verify FR-008: grep `app/what-we-do/data-ai-engineering/` for `fetch(`, `cms/api` imports, any other API-client import, and `async function`/`await` in `page.tsx` or any `_components`/`_data` file; confirm zero matches — the page must introduce no network request, CMS import, or API import of any kind this phase
- [X] T025 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit Data AI.dc.html` verbatim, character-for-character (SC-002) — the one confirmed, deliberate exception is the Capabilities heading's "Five" → "Six" correction (per Clarifications); confirm that is the *only* deviation
- [X] T026 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal 920px/640px media queries (plan.md Constitution Check, Principle II) — for all 9 sections (SC-003), including every item in spec.md's Edge Cases section (in particular: the "Industries" 4-column/3-card trailing gap, and the hero card's unchanged chrome with the image and caption swapped in)
- [X] T027 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate) — both must pass clean
- [~] T028 Run the full quickstart.md walkthrough (all steps) end to end. **Partial**: verified via `get_page_text`/DOM inspection rather than a literal screenshot — the Browser pane failed to composite frames this session ("the Browser pane is not displayed"), the same environment limitation hit during the sibling `TMS-86-software-product-engineering` implementation. Confirmed via other means: full content-fidelity text match including the "Six capabilities" correction (step 5); hero image (`svc-qa.png`, 200 OK) + caption render with no console errors (step 1, edge cases); FAQ items expand independently without collapsing others (step 3, via direct `<details>` DOM manipulation); all 6 related-service links and all 3 industry links resolve to the correct hrefs (steps 2–3); the header mega-menu's live-CMS "Data and AI Engineering" entry resolves to `/what-we-do/data-ai-engineering/` and the footer's link was statically edited to match (step 7, T021/T022 — also resolves the `/speckit.analyze` C1 finding: the live CMS confirms the exact title string assumed in code); capabilities/industries grids collapse to the expected column counts with zero horizontal overflow at 375px/960px/1280px, and the Industries 4-column/3-card trailing-gap edge case renders without breaking (step 6, edge cases). **Not performed**: a literal side-by-side pixel screenshot against the reference file, and the "lengthen a bullet to check layout" stress edit (low-risk, since the underlying `GlassCard`/`ProcessSteps` grid classes are byte-identical, unmodified reuse from both already-shipped siblings).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T003 blocks T004; T004 blocks T005; T005 blocks every story's wiring task T009/T014/T019)
- **User Stories (Phase 3-5)**: All depend on Foundational completion; independent of each other's *implementation* (each adds its own sections to the shared content array and its own wiring `case`s), but conventionally built in priority order P1 → P2 → P3
- **Polish (Phase 6)**: T021/T022 are independent of all stories and of each other; T023/T024 can run any time after T021/T022, since they check the cumulative diff/tree; T025/T026/T027 depend on all three stories being wired in; T028 depends on everything above

### User Story Dependencies

- **US1 (P1)**: Start after Foundational. No dependency on US2/US3.
- **US2 (P2)**: Start after Foundational. Appends to the same `sections` array and `page.tsx` switch as US1, but adds distinct cases — no logical dependency on US1's content.
- **US3 (P3)**: Start after Foundational. Same note as US2.

### Within Each User Story

- Content population task first (defines the data the components render)
- Route-local components before the `page.tsx` wiring task
- Wiring before that story's independent verification task

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- Within US1: T007 and T008 can run in parallel (different files)
- Within US2: T012 and T013 can run in parallel
- Within US3: T017 and T018 can run in parallel
- T021 and T022 (Polish) can run in parallel with each other and with the tail of Phase 5; T023 (unrelated-change diff check) and T024 (static-content grep check) are both cheap enough to run repeatedly throughout, not just once at the end
- Once Foundational completes, US1/US2/US3 could in principle be staffed in parallel by different developers, since each only adds new `case`s to the shared switch and new entries to the shared content array (a rebase/merge concern, not a design dependency)

---

## Parallel Example: User Story 1

```bash
# After T006 (content populated), launch independent component builds together:
Task: "Build data-ai-engineering-capabilities.tsx"
Task: "Build data-ai-engineering-lifecycle.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (User Story 1)
3. **STOP and VALIDATE**: run quickstart.md steps 1/4/5/6 against just these four sections
4. Demo if ready — this alone is a coherent, sellable page fragment

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. + User Story 1 → validate → demo (MVP)
3. + User Story 2 → validate → demo
4. + User Story 3 → validate → demo (content-complete)
5. Polish (Phase 6) → footer/header repoint, unrelated-change diff check, static-content check, fidelity/responsive passes, lint/build gate, full quickstart run → feature done

### Parallel Team Strategy

1. One person/session completes Setup + Foundational
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`data-ai-engineering-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged
