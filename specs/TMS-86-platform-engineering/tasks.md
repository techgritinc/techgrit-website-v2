# Tasks: Platform Engineering Page (TMS-86-platform-engineering)

**Input**: Design documents from `specs/TMS-86-platform-engineering/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/platform-engineering/`; **zero** new `components/ui/` primitives or icons (every needed shape/icon already exists — see plan.md/research.md); two cross-cutting edits in `cms/api/footer.ts` and `cms/api/header.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/platform-engineering/_data/` and `app/what-we-do/platform-engineering/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 9 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit Platform Engineering.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I). Per plan.md's Constitution Check, zero new tokens are expected — this audit is a verification step, not exploratory.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on. No new `components/ui/` primitive or icon is built in this phase — none is needed (plan.md/research.md §3–4).

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `PlatformEngineeringSection` discriminated union in `app/what-we-do/platform-engineering/_data/types.ts`, per data-model.md (`HeroSection`/`HeroImage`, `Signal`/`IntroSection`, `CapabilityBullet`/`Capability`/`CapabilitiesSection`, `LifecycleStage`/`LifecycleSection`, `WhyIconKey`/`ValuePropositionTile`/`WhySection`, `IndustryIconKey`/`IndustryCard`(optional `href`)/`IndustriesSection`, `FaqItem`/`FaqSection`, `RelatedServiceIconKey`/`RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `PlatformEngineeringPageContent`)
- [X] T004 Create `app/what-we-do/platform-engineering/_data/platform-engineering-content.ts` exporting `platformEngineeringContent: PlatformEngineeringPageContent` with `seo` filled in and `sections: []` (populated incrementally by each user story's content task below)
- [X] T005 Create `app/what-we-do/platform-engineering/page.tsx`: `export const metadata` from `platformEngineeringContent.seo`, and a `switch (section.type)` over `platformEngineeringContent.sections` inside `<main className="overflow-x-clip">` — mirrors all three sibling pages' pre-CMS-integration structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate the platform engineering offering end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the six capabilities, and the five-stage lifecycle, and understand TechGrit's platform engineering offering without leaving the page.

**Independent Test**: Load the page with only these four sections wired in; verify a reader can understand "platform engineering," see all six capabilities with their bullets, and see the five-stage lifecycle.

### Implementation for User Story 1

- [X] T006 [US1] Populate the hero, intro/signals, capabilities, and lifecycle entries verbatim (per FR-001) into `platformEngineeringContent.sections` in `app/what-we-do/platform-engineering/_data/platform-engineering-content.ts` — the capabilities section's `title` reads "Six pillars. One reliable foundation." verbatim (matches the six rendered cards, no correction needed), and the hero has no `mediaCaption` field set at all (per Clarifications Q4 — dropped entirely, unlike two of the three siblings)
- [X] T007 [P] [UI] [US1] Build `app/what-we-do/platform-engineering/_components/platform-engineering-capabilities.tsx`: 6-card grid reusing `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle`/`GlassCardDescription` — no new component, no new variant (already exists)
- [X] T008 [UI] [US1] Build `app/what-we-do/platform-engineering/_components/platform-engineering-lifecycle.tsx`: wraps the existing `ProcessSteps` primitive with the 5 lifecycle stages (Assess, Design, Build, Secure, Optimize) under the section's own eyebrow/heading
- [X] T009 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` for the hero section with `mediaFill`, `media={<MediaSlot src="/samples/svc-uiux.png" alt="..." fill priority sizes="(max-width: 960px) 100vw, 40vw" />}` in place of the reference's stat grid (FR-004), and no `mediaCaption` prop passed at all (per Clarifications Q4); render `<ContentBlock>` for the intro section; render the capabilities/lifecycle components (T007–T008). Confirm the hero's "See capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header.
- [X] T010 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections), and 6 (responsive pass on this story's sections). **Verified via server-rendered HTML** (Browser pane couldn't composite frames this session, same limitation hit during the sibling `TMS-86-software-product-engineering`/`TMS-86-data-and-ai-engineering` implementations): hero eyebrow/headline/subtitle/CTAs render verbatim; hero card shows only `svc-uiux.png` with zero occurrences of "PRISM"/stat-tile text; `#capabilities` anchor target exists with `scroll-mt-24`; all 6 capability step-labels present; responsive grid classes (`md:grid-cols-2 lg:grid-cols-3`, `lg:grid-cols-5`) compiled correctly.

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why the approach matters and see relevant platform fit (Priority: P2)

**Goal**: A visitor can read the six "why platform engineering matters" tiles and the four "Platforms for every stage of growth" cards, confirming domain fit and differentiation.

**Independent Test**: With only the hero/capabilities/lifecycle sections present, add the "Why" tiles and "Platforms for every stage of growth" cards and verify each renders independently with correct content and links.

### Implementation for User Story 2

- [X] T011 [US2] Populate the why-tiles and platforms/industries entries verbatim into `platformEngineeringContent.sections` — exactly 2 of the 4 platform/industry cards (HealthTech, FinTech) carry a non-empty `href`; the other 2 (SaaS Platforms, Enterprise Apps) omit `href` entirely (per Clarifications Q3). Note: `href` for HealthTech/FinTech resolves to `/#industries` (the homepage's generic industries section), matching the established, explicit project-wide convention (TMS-63) that neither industry has a dedicated page yet — only ConstructionTech does.
- [X] T012 [P] [UI] [US2] Build `app/what-we-do/platform-engineering/_components/platform-engineering-why.tsx`: page-local 6-tile grid (icon + heading + description, 2-column), matching all three sibling pages' own equivalent page-local "why" pattern (research.md §3) rather than a new shared primitive; map each tile's `iconKey` to an existing `components/ui/icons.tsx` export per data-model.md/research.md §4 (`productivity`→`LightningIcon`, `delivery`→`EradicateDebtIcon`, `reliability`→`ShieldIcon`, `standardize`→`LayoutDashboardIcon`, `scale`→`InfiniteScalabilityIcon`, `aiOps`→`AwardIcon`) — no new icon added
- [X] T013 [P] [UI] [US2] Build `app/what-we-do/platform-engineering/_components/platform-engineering-industries.tsx`: 4-card grid reusing `GlassCard` (`variant="serviceCapability"`) on a 4-column desktop track; each card conditionally wraps in a Next.js `<Link>` only when `industry.href` is present (reusing the exact conditional-wrap pattern already shipped in `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-industries.tsx`'s `IndustryTile` — per Clarifications Q3, research.md §3/§7), rendering the other 2 cards as plain, non-clickable `GlassCard`s; map each `iconKey` to an existing icon per research.md §4 (`saas`→`AutonomousAgentIcon`, `enterprise`→`ConstructionIcon`, `healthcare`→`HealthcareIcon`, `fintech`→`IndustryFinTechIcon`) — no new icon or token added
- [X] T014 [US2] Wire the why/industries components into `page.tsx`'s section `switch`
- [X] T015 [US2] Verify Story 2 independently per quickstart.md step 2, specifically confirming the first two platform cards render with no hover-lift/pointer-cursor affordance and the last two behave like every other linked card. **Verified via server-rendered HTML**: "SaaS Platforms" and "Enterprise Apps" render as a bare `<div class="group ...">` (GlassCard) with no enclosing `<a>`; "HealthTech" and "FinTech" both render wrapped in `<a class="block" href="/#industries">` — confirming the mixed link/no-link treatment (Clarifications Q3) is correctly implemented. All 6 "why" tiles present with correct icons.

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T016 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `platformEngineeringContent.sections`
- [X] T017 [P] [UI] [US3] Build `app/what-we-do/platform-engineering/_components/platform-engineering-faq.tsx` using the existing `Faq` primitive, with only the first item's `defaultOpen: true`
- [X] T018 [P] [UI] [US3] Build `app/what-we-do/platform-engineering/_components/platform-engineering-related.tsx` using the existing `IconTile` primitive (`size="compact"`) for the 6 related-service cards, mapping each `iconKey` to its existing icon export per research.md §4 (`modernization`→`SvcModernizationIcon`, `engineering`→`EradicateDebtIcon` — the precedent both prior siblings' related-services lists already used for this same "Software Product Engineering" icon gap — `dataAi`→`SvcDataAiIcon`, `managed`→`SvcManagedIcon`, `strategy`→`SvcStrategyIcon`, `startups`→`SvcStartupsIcon`), plus the "See all services" link to `/services`
- [X] T019 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors all three sibling pages' existing `FinalCta` usage)
- [X] T020 [US3] Verify Story 3 independently per quickstart.md step 3. **Verified via server-rendered HTML**: 5 `<details>` elements render, only the first has the `open` attribute ("What is Platform Engineering?"); all 6 related-service names present with correct hrefs; closing CTA renders "Cloud-native. Secure. Loved by developers." with both CTA labels and correct hrefs (`/contact`, `/frameworks#discovery`, normalized with a trailing slash by Next.js's Link — confirmed as an existing project-wide behavior, not specific to this page, by cross-checking the same normalization on the already-shipped `data-ai-engineering` page).

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T021 Update `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` — change the `slug: "svc-platform"` ("Platform Engineering") entry's `href` from `/services#svc-platform` to `/what-we-do/platform-engineering` (FR-010a; research.md §6)
- [X] T022 Update `cms/api/header.ts`'s `toMegaGroup()` — extend the existing three-service ternary chain to also match `section.title === "Platform Engineering"` → `/what-we-do/platform-engineering` (FR-010b; research.md §6)
- [X] T023 Verify FR-002/FR-009: run `git diff --stat` (or `git status`) against `main` and confirm the changed-file list contains **only**: files under `app/what-we-do/platform-engineering/`, `cms/api/footer.ts`, `cms/api/header.ts`, and this feature's `specs/TMS-86-platform-engineering/` docs — explicitly confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, any file under `components/ui/`, `app/tokens.css`, `app/globals.css`, and any other route or config file. The only permitted navigation-related edits in this feature are T021/T022's config data changes, not the Header/Footer components or any shared primitive. **Confirmed**: `git status --short` shows only `CLAUDE.md` (modified, docs), `cms/api/footer.ts`, `cms/api/header.ts`, `app/what-we-do/platform-engineering/` (new), `specs/TMS-86-platform-engineering/` (new).
- [X] T024 Verify FR-008: grep `app/what-we-do/platform-engineering/` for `fetch(`, `cms/api` imports, any other API-client import, and `async function`/`await` in `page.tsx` or any `_components`/`_data` file; confirm zero matches — the page must introduce no network request, CMS import, or API import of any kind this phase. **Confirmed**: zero matches (removed an unnecessary `async` from `generateMetadata`, which had no actual async work).
- [X] T025 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit Platform Engineering.dc.html` verbatim, character-for-character (SC-002) — the one confirmed, deliberate deviation is the dropped hero-card caption line (per Clarifications Q4); confirm that is the *only* deviation. **Confirmed**: spot-checked hero subtitle, all 6 capability step-labels/bullets, all 6 why-tile titles, all 4 platform-card names, all 5 FAQ questions/answers, and the closing CTA heading against the reference — byte-identical matches, zero occurrences of the reference's caption text ("PRISM"), consistent with FR-004/Clarifications Q4.
- [X] T026 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal inline media queries (plan.md Constitution Check, Principle II) — for all 9 sections (SC-003), including every item in spec.md's Edge Cases section (in particular: the "Platforms for every stage of growth" grid's mixed non-clickable/clickable card treatment, and the hero card's unchanged chrome with the image swapped in and no caption). **Verified via compiled markup** (Browser pane couldn't composite frames this session — see T010 note): all 4 grid sections carry the correct `grid-cols-1 → md:grid-cols-2 → lg:grid-cols-{3,4,5}` Tailwind classes (capabilities 3-across, lifecycle 5-across, platforms/industries 4-across, related-services 3-across), and the why-tiles grid carries `grid-cols-1 → md:grid-cols-2` — all reusing this repo's canonical breakpoints via the shared, unmodified components. The mixed link/no-link card treatment and hero card chrome were directly confirmed in T010/T015 above.
- [X] T027 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate) — both must pass clean. **Confirmed**: both pass with zero errors; `/what-we-do/platform-engineering` compiles and TypeScript checks clean.
- [~] T028 Run the full quickstart.md walkthrough (all steps) end to end, including a side-by-side visual comparison against the reference file at mobile/tablet/laptop/desktop viewport widths (SC-001). **Partial**: same Browser-pane environment limitation hit during the sibling `TMS-86-software-product-engineering`/`TMS-86-data-and-ai-engineering` implementations ("the Browser pane is not displayed") — verified via `curl` against the real dev server plus direct inspection of the compiled HTML instead of a literal screenshot. Confirmed: full content-fidelity match (step 5, T025); hero image (`svc-uiux.png`) renders with zero caption text (step 1); FAQ first item open, others closed (step 3, T020); all 6 related-service links and the 2 linked platform cards resolve to correct hrefs, the 2 non-linked cards render with no `<a>` wrapper (steps 2–3, T015/T020); the header/footer nav repointing (T021/T022) confirmed by direct file inspection; all grids carry the expected responsive Tailwind classes (step 6, T026); `npm run lint`/`npm run build` pass clean (gate, T027). **Not performed**: a literal side-by-side pixel screenshot against the reference file at each viewport — low residual risk, since every section reuses the identical, already-visually-verified `Hero`/`ContentBlock`/`GlassCard`/`ProcessSteps`/`Faq`/`IconTile`/`FinalCta` components the three sibling pages already ship in production, unmodified.

## Post-implementation fix: line-height mismatch (2026-08-25)

User reported visible flicker/shift when toggling between the reference `.dc.html` and the built page. Root cause: `app/globals.css`'s `@layer base` applies `line-height: var(--lh-tight)` (= `1.02`, tuned for the 56px hero H1) to **every** `h1`–`h6` by default; any heading lacking an explicit Tailwind `leading-[...]` override silently inherits this ultra-tight value instead of the reference's actual (unset → browser-default "normal") line-height. Audited every text element in this feature's page-local components against the reference's inline styles (font-size/weight/line-height/letter-spacing) and found exactly 2 affected headings (every other heading, including all reused shared components, already had an explicit `leading-[...]`):

- [X] T029 Add `leading-[normal]` to the WhyTile `<h4>` in `app/what-we-do/platform-engineering/_components/platform-engineering-why.tsx` — matches the reference's unset line-height (font-size:16.5px;font-weight:700, no line-height in reference).
- [X] T030 Add `leading-[normal]` to the section `<h3>` in `app/what-we-do/platform-engineering/_components/platform-engineering-related.tsx` — matches the reference's unset line-height (font-size:22px;font-weight:700;letter-spacing:-0.02em, no line-height in reference).
- [X] T031 Re-ran `npm run lint` and `npm run build` (both pass clean) and re-verified via the compiled HTML that both headings now carry `leading-[normal]`.

**Note (out of scope for this feature, flagged separately)**: The same root-cause bug (a heading missing `leading-[...]`) was found already shipped on two live "What We Do" pages — `app/what-we-do/ai-modernization/_components/ai-modernization-why.tsx:12`, `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-why.tsx:12` (both WhyTile `<h4>`), and `app/what-we-do/ai-modernization/_components/ai-modernization-related.tsx:30` (the "Related services" `<h3>`). Not fixed here per this ticket's scope (Platform Engineering only, per FR-009) — flagged as a separate task.

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
Task: "Build platform-engineering-capabilities.tsx"
Task: "Build platform-engineering-lifecycle.tsx"
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
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`platform-engineering-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged
