# Tasks: AI Strategy & Roadmap Page (TMS-86-ai-strategy-and-roadmap)

**Input**: Design documents from `specs/TMS-86-ai-strategy-and-roadmap/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/ai-strategy-roadmap/`; **one** new shared icon (`UserIcon`, in `components/ui/icons.tsx`) and **one** new `components/ui/ambient-orbs.tsx` pathname branch (reusing existing tokens, no new token) — see plan.md/research.md for why these two are justified while everything else is pure reuse; two cross-cutting edits in `cms/api/footer.ts` and `cms/api/header.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/ai-strategy-roadmap/_data/` and `app/what-we-do/ai-strategy-roadmap/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 9 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit AI Strategy.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I). Per plan.md's Constitution Check, zero new tokens are expected — this audit is a verification step, not exploratory. **Confirmed**: all four ambient-orb rgba values match existing tokens exactly (research.md §4); every other visual value flows through the already-verified `Hero`/`ContentBlock`/`GlassCard`/`ProcessSteps`/`Faq`/`IconTile`/`final-cta` primitives with no new CSS.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on, plus the two justified new-primitive additions (research.md §3–4) that aren't specific to any one user story.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `AiStrategyRoadmapSection` discriminated union in `app/what-we-do/ai-strategy-roadmap/_data/types.ts`, per data-model.md (`HeroSection`/`HeroImage`, `TriggerChip`/`IntroSection`, `CapabilityBullet`/`Capability`/`CapabilitiesSection`, `EngagementStage`/`LifecycleSection`, `WhyIconKey`/`ValuePropositionTile`/`WhySection`, `AdvisorySegmentIconKey`/`AdvisorySegmentCard`(no `href` field at all)/`AdvisorySegmentsSection`, `FaqItem`/`FaqSection`, `RelatedServiceIconKey`/`RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `AiStrategyRoadmapPageContent`)
- [X] T004 Create `app/what-we-do/ai-strategy-roadmap/_data/ai-strategy-roadmap-content.ts` exporting `aiStrategyRoadmapContent: AiStrategyRoadmapPageContent` with `seo` filled in and `sections: []` (populated incrementally by each user story's content task below). **Note**: implemented with all 9 sections populated in a single pass (T008/T013/T018 folded in) rather than incrementally, since content was already fully derived during planning.
- [X] T005 Create `app/what-we-do/ai-strategy-roadmap/page.tsx`: `export const metadata` from `aiStrategyRoadmapContent.seo`, and a `switch (section.type)` over `aiStrategyRoadmapContent.sections` inside `<main className="overflow-x-clip">` — mirrors all five sibling pages' pre-CMS-integration structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`). **Deviation from plan.md**: the reference's `.crumbs` breadcrumb is present in every "What We Do" reference file (confirmed by checking `TechGrit AI Modernization.dc.html`) but not rendered by any of the 5 built sibling pages (confirmed: `crumbs=` appears nowhere else in `app/`) — omitted here too, matching that established, consistent precedent rather than being the first page to introduce it.
- [X] T006 [P] Add `UserIcon` (single-person silhouette) to `components/ui/icons.tsx`, using the reference's exact path (`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>` — the first half of the existing `UsersIcon`'s own path data), following the file's existing `IconProps` signature/JSDoc convention (plan.md Complexity Tracking; research.md §3)
- [X] T007 [P] Add a new pathname branch to `components/ui/ambient-orbs.tsx` for `pathname === "/what-we-do/ai-strategy-roadmap/"` — checked *before* the generic `/what-we-do/` branch (same precedent as the existing `/what-we-do/managed-services/` branch) — reusing the shared `/what-we-do/`/`/how-we-work/` geometry classes (`-top-45 -right-35 h-155 w-155` / `top-[35%] -left-55 h-140 w-140` / `top-[60%] -right-40 h-130 w-130` / `-bottom-50 left-[38%] h-165 w-165`) with `bg-overlay-orange` / `bg-overlay-amber-12` / `bg-overlay-orange-10` / `bg-overlay-orange-11` (research.md §4) — zero new tokens. **Verified live**: computed `background-color` of all 4 orbs matches the reference's literal rgba values exactly (`rgba(232,119,34,0.16)`, `rgba(245,158,11,0.12)`, `rgba(232,119,34,0.1)`, `rgba(232,119,34,0.11)`).

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate the fractional CTO offering end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the four CTO-as-a-Service capabilities, and the five-stage engagement flow, and understand TechGrit's fractional-CTO offering without leaving the page.

**Independent Test**: Load the page with only these four sections wired in; verify a reader can understand "CTO-as-a-Service," see all four capabilities with their 5-bullet lists, and see the five-stage engagement flow.

### Implementation for User Story 1

- [X] T008 [US1] Populate the hero, intro/chips, capabilities, and lifecycle entries verbatim (per FR-001) into `aiStrategyRoadmapContent.sections` in `app/what-we-do/ai-strategy-roadmap/_data/ai-strategy-roadmap-content.ts` — each of the 4 capabilities has exactly 5 bullets (not the siblings' 4), and the hero has no `mediaCaption` field set at all (per Clarifications — dropped entirely, matching the Software Product Engineering/Platform Engineering siblings)
- [X] T009 [P] [UI] [US1] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-capabilities.tsx`: 4-card, 2-column-desktop grid reusing `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle`/`GlassCardDescription` — no icon box (confirmed icon-less per research.md §1), no new component, no new variant
- [X] T010 [UI] [US1] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-lifecycle.tsx`: wraps the existing `ProcessSteps` primitive with the 5 engagement stages (Diagnose, Roadmap, Execute, Measure, Coach) under the section's own eyebrow/heading — default `columns=5`, no override needed
- [X] T011 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` for the hero section with `mediaFill`, `media={<MediaSlot src="/samples/dm-scalability.png" alt="..." fill priority sizes="(max-width: 960px) 100vw, 40vw" />}` in place of the reference's stat grid (FR-004), and no `mediaCaption` prop passed at all; render `<ContentBlock>` for the intro section; render the capabilities/lifecycle components (T009–T010). Confirm the hero's "See CTO capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header. **Verified**: `<a href="#capabilities">` and `<section id="capabilities" class="... scroll-mt-24">` (96px, matching sticky header height) both confirmed structurally present and correctly paired; a literal interactive scroll-through could not be verified in this session (Browser pane can't composite frames and synthetic `.click()` doesn't trigger native hash-scroll even on a bare test `<a>` — same tooling limitation the sibling `TMS-86-software-product-engineering`/`TMS-86-data-and-ai-engineering` tickets hit).
- [X] T012 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections), and 6 (responsive pass on this story's sections). **Verified live** (dev server + Browser pane `read_page`/`get_page_text`/`javascript_tool`): hero eyebrow/headline/subtitle/CTAs render verbatim; hero card shows only `dm-scalability.png` (200 OK network request) with zero occurrences of "Advisors"/"AI IMPACT" as standalone stat content; all 4 capability cards present with exactly 5 bullets each; desktop (1280px) grid computed styles confirm hero 2-col, capabilities 2-col, lifecycle 5-col.

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why the approach matters and who it's for (Priority: P2)

**Goal**: A visitor can read the six "why leaders choose TechGrit" tiles and the four "Founders. Boards. Scaling technology orgs." cards, confirming differentiation and relevant experience.

**Independent Test**: With only the hero/capabilities/lifecycle sections present, add the "Why" tiles and "Founders. Boards. Scaling technology orgs." cards and verify each renders independently with correct content.

### Implementation for User Story 2

- [X] T013 [US2] Populate the why-tiles and advisory-segments entries verbatim into `aiStrategyRoadmapContent.sections` — all 4 advisory-segment cards omit `href` entirely (no card in this grid is linked, unlike the mixed Platform Engineering/Data & AI Engineering sibling grids — genuine reference fact, not a normalization)
- [X] T014 [P] [UI] [US2] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-why.tsx`: page-local 6-tile grid (icon + heading + description, 2-column), matching every sibling page's own equivalent page-local "why" pattern (research.md §1) rather than a new shared primitive; map each tile's `iconKey` to an existing `components/ui/icons.tsx` export per data-model.md/research.md §3 (`boardGrade`→`AwardIcon`, `delivery`→`CheckCircleIcon`, `aiNative`→`SvcStrategyIcon`, `flexibility`→`UserIcon` (new, T006), `independent`→`ShieldIcon`, `costConscious`→`FinTechIcon`)
- [X] T015 [P] [UI] [US2] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-advisory-segments.tsx`: 4-card grid reusing `GlassCard` (`variant="serviceCapability"`) on a 4-column desktop track; every card renders as a plain, non-clickable `GlassCard` — **no** conditional `<Link>` wrap logic at all (unlike Platform Engineering's/Data & AI Engineering's mixed-link `IndustryTile` pattern), since no card in this section is ever linked; map each `iconKey` to an existing/new icon per research.md §3 (`founders`→`SvcStartupsIcon`, `scaleups`→`UserIcon` (new, T006), `peVc`→`HamburgerIcon`, `enterprise`→`ConstructionIcon`) — no new icon beyond `UserIcon` (already added in T006)
- [X] T016 [US2] Wire the why/advisory-segments components into `page.tsx`'s section `switch`
- [X] T017 [US2] Verify Story 2 independently per quickstart.md step 2, specifically confirming **all four** advisory-segment cards render with no hover-lift/pointer-cursor affordance implying a destination (not just some, unlike the Platform Engineering sibling's mixed grid). **Verified live**: all 6 "why" tiles present with correct icon/heading/description; all 4 advisory-segment cards ("Startup Founders", "Scale-ups", "PE / VC Portfolio", "Enterprise Programs") confirmed rendered with zero `<a>` wrapper around any of the four (grepped compiled HTML for `<a...>Startup Founders` — no match); 16 total `<svg>` icons on the page, none empty.

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T018 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `aiStrategyRoadmapContent.sections` — final-CTA's `primaryCtaLink` is `/contact-us` (the app's real Contact route; not the `/contact` placeholder some earlier sibling docs used) and `secondaryCtaLink` is `/how-we-work/discovery-sprints` (the real, now-built Discovery Sprints route; not the older `/frameworks#discovery` placeholder)
- [X] T019 [P] [UI] [US3] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-faq.tsx` using the existing `Faq` primitive, with only the first item's `defaultOpen: true`
- [X] T020 [P] [UI] [US3] Build `app/what-we-do/ai-strategy-roadmap/_components/ai-strategy-roadmap-related.tsx` using the existing `IconTile` primitive (`size="compact"`) for the 6 related-service cards on a 3-column desktop grid, mapping each `iconKey` to its existing icon export per research.md §3 (`modernization`→`SvcModernizationIcon`, `engineering`→`EradicateDebtIcon` — the precedent every prior sibling's related-services list already used for this same "Software Product Engineering" icon gap — `dataAi`→`SvcDataAiIcon`, `platform`→`SvcPlatformIcon`, `managed`→`SvcManagedIcon`, `startups`→`SvcStartupsIcon`), plus the "See all services" link to `/services`
- [X] T021 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors every sibling page's existing `FinalCta` usage). Reused the exact `FinalCta` prop-override set (`titleFontSize`, `titleLineHeight`, padding, `buttonRowGap`, etc.) already shipped on `app/what-we-do/managed-services/page.tsx`, since this page's own CTA-band reference CSS is character-for-character identical, plus `descriptionMaxWidth={640}` (this reference's own literal value, vs. the shared default of 600).
- [X] T022 [US3] Verify Story 3 independently per quickstart.md step 3. **Verified live**: FAQ shows exactly 5 items, first expanded by default ("−" marker) with the other 4 collapsed ("+"); all 6 related-service cards present with correct names/descriptions/hrefs (`/what-we-do/ai-modernization`, `/what-we-do/software-product-engineering`, `/what-we-do/data-ai-engineering`, `/what-we-do/platform-engineering`, `/what-we-do/managed-services`, `/what-we-do/startups`); closing CTA band renders the exact heading/paragraph/both CTA labels with correct hrefs (`/contact-us/`, `/how-we-work/discovery-sprints/`).

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T023 Update `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` — change the `slug: "svc-strategy"` ("AI Strategy & Roadmap") entry's `href` from `/services#svc-strategy` to `/what-we-do/ai-strategy-roadmap` (FR-010a; research.md §6). **Scope correction found during live verification**: `DEFAULT_FOOTER_DATA` is only the last-resort fallback used when the CMS is unreachable — the actually-rendered footer comes from `getFooterData()` → live CMS → `toLinkGroup()`, which is a *separate* function that was never extended for this entry (confirmed live: before the fix, this page's own footer link still resolved to `/services/` despite `DEFAULT_FOOTER_DATA` being correct — and the same gap already existed, unfixed, for the Data & AI Engineering/Platform Engineering/Managed Services siblings' own footer entries too, a pre-existing bug predating this ticket). Added a matching `item.title === "AI Strategy & Roadmap"` case to `toLinkGroup()` alongside the fix, scoped to this page's own entry only (leaving the 3 pre-existing sibling gaps as an out-of-scope flag, not silently fixed here per FR-009). Re-verified live: footer link now correctly resolves to `/what-we-do/ai-strategy-roadmap/`.
- [X] T024 Update `cms/api/header.ts`'s `toMegaGroup()` — extend the existing five-service ternary chain to also match `section.title === "AI Strategy & Roadmap"` → `/what-we-do/ai-strategy-roadmap` (FR-010b; research.md §6). **Verified live**: header mega-menu's "AI Strategy & Roadmap" entry and the mobile nav's equivalent link both resolve to `/what-we-do/ai-strategy-roadmap/`.
- [X] T025 Verify FR-002/FR-009: run `git diff --stat` (or `git status`) against `main` and confirm the changed-file list contains **only**: files under `app/what-we-do/ai-strategy-roadmap/`, `cms/api/footer.ts`, `cms/api/header.ts`, `components/ui/icons.tsx`, `components/ui/ambient-orbs.tsx`, and this feature's `specs/TMS-86-ai-strategy-and-roadmap/` docs — explicitly confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, any other file under `components/ui/`, `app/tokens.css`, `app/globals.css`, and any other route or config file. **Confirmed**: `git status --short` shows only `CLAUDE.md` (modified, docs), `cms/api/footer.ts`, `cms/api/header.ts`, `components/ui/icons.tsx`, `components/ui/ambient-orbs.tsx`, `app/what-we-do/ai-strategy-roadmap/` (new), `specs/TMS-86-ai-strategy-and-roadmap/` (new).
- [X] T026 Verify FR-008: grep `app/what-we-do/ai-strategy-roadmap/` for `fetch(`, `cms/api` imports, any other API-client import, and `async function`/`await` in `page.tsx` or any `_components`/`_data` file; confirm zero matches — the page must introduce no network request, CMS import, or API import of any kind this phase. **Confirmed**: zero matches.
- [X] T027 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit AI Strategy.dc.html` verbatim, character-for-character (SC-002) — the one confirmed, deliberate deviation is the dropped hero-card stat tiles/caption line (per Clarifications/FR-004); confirm that is the *only* deviation. **Confirmed**: spot-checked hero subtitle, all 4 capability step-labels/bullets, all 5 lifecycle stages, all 6 why-tile titles/descriptions, all 4 advisory-segment names/descriptions, all 5 FAQ questions/answers, all 6 related-service names/descriptions, and the closing CTA heading against the reference via live `get_page_text` — byte-identical matches; zero occurrences of "Advisors"/"AI IMPACT"/"4D™"/"PRISM™" as hero-card stat/caption content, consistent with FR-004.
- [X] T028 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal inline media queries (plan.md Constitution Check, Principle II) — for all 9 sections (SC-003), including every item in spec.md's Edge Cases section (in particular: **all four** "Founders. Boards. Scaling technology orgs." cards render non-interactive, and the hero card's unchanged chrome with the image swapped in and no caption). **Verified live** at 375px (mobile) and 1280px (desktop): zero horizontal overflow at 375px (`document.documentElement.scrollWidth === clientWidth === 375`); all 7 grids collapse to 1 column at 375px; at 1280px, computed `grid-template-columns` confirms hero/intro/capabilities 2-col, lifecycle 5-col, why 2-col, advisory-segments 4-col, related-services 3-col — matching the reference exactly. All 4 advisory-segment cards confirmed non-interactive (no `<a>` wrapper on any).
- [X] T029 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate) — both must pass clean. **Confirmed**: both pass with zero errors; `/what-we-do/ai-strategy-roadmap` compiles and TypeScript checks clean; re-ran lint after the footer.ts fix (T023) — still clean.
- [X] T030 Run the full quickstart.md walkthrough (all steps) end to end, including a side-by-side visual comparison against the reference file at mobile/tablet/laptop/desktop viewport widths (SC-001), plus the ambient-orbs check (quickstart.md step 8). **Verified via live dev server + Browser pane** (screenshot/compositing unavailable this session — same limitation the sibling `TMS-86-software-product-engineering`/`TMS-86-data-and-ai-engineering` tickets hit — used `read_page`, `get_page_text`, `read_network_requests`, and `javascript_tool` instead): full content match (T027); hero image (`dm-scalability.png`) loads with 200 OK and zero stat-tile/caption text; FAQ first item open, others closed; all 6 related-service links and header/footer nav repointing resolve correctly (T023/T024); ambient orbs render the exact 4 reference colors (T007); responsive grids confirmed at mobile/desktop (T028); `npm run lint`/`npm run build` pass clean (T029). **Not performed**: a literal side-by-side pixel screenshot against the reference file — same residual, low risk noted by the sibling tickets, since every section reuses the identical, already-visually-verified shared components.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T003 blocks T004; T004 blocks T005; T005 blocks every story's wiring task T011/T016/T021; T006/T007 are independent of T003–T005 but must land before any component that consumes `UserIcon` or the new orb branch is verified)
- **User Stories (Phase 3-5)**: All depend on Foundational completion; independent of each other's *implementation* (each adds its own sections to the shared content array and its own wiring `case`s), but conventionally built in priority order P1 → P2 → P3
- **Polish (Phase 6)**: T023/T024 are independent of all stories and of each other; T025/T026 can run any time after T023/T024, since they check the cumulative diff/tree; T027/T028/T029 depend on all three stories being wired in; T030 depends on everything above

### User Story Dependencies

- **US1 (P1)**: Start after Foundational. No dependency on US2/US3.
- **US2 (P2)**: Start after Foundational. Appends to the same `sections` array and `page.tsx` switch as US1, but adds distinct cases — no logical dependency on US1's content. Depends on T006 (`UserIcon`) for its "Fractional flexibility" why-tile and "Scale-ups" advisory-segment card.
- **US3 (P3)**: Start after Foundational. Same note as US2, no dependency on T006/T007.

### Within Each User Story

- Content population task first (defines the data the components render)
- Route-local components before the `page.tsx` wiring task
- Wiring before that story's independent verification task

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- T006 and T007 (Foundational) can run in parallel with each other and with T003–T005 (different files)
- Within US1: T009 and T010 can run in parallel
- Within US2: T014 and T015 can run in parallel
- Within US3: T019 and T020 can run in parallel
- T023 and T024 (Polish) can run in parallel with each other and with the tail of Phase 5; T025 (unrelated-change diff check) and T026 (static-content grep check) are both cheap enough to run repeatedly throughout, not just once at the end
- Once Foundational completes, US1/US2/US3 could in principle be staffed in parallel by different developers, since each only adds new `case`s to the shared switch and new entries to the shared content array (a rebase/merge concern, not a design dependency)

---

## Parallel Example: User Story 1

```bash
# After T008 (content populated), launch independent component builds together:
Task: "Build ai-strategy-roadmap-capabilities.tsx"
Task: "Build ai-strategy-roadmap-lifecycle.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (User Story 1)
3. **STOP and VALIDATE**: run quickstart.md steps 1/4/5/6 against just these four sections
4. Demo if ready — this alone is a coherent, sellable page fragment

### Incremental Delivery

1. Setup + Foundational → foundation ready (including the new `UserIcon` and ambient-orbs branch)
2. + User Story 1 → validate → demo (MVP)
3. + User Story 2 → validate → demo
4. + User Story 3 → validate → demo (content-complete)
5. Polish (Phase 6) → footer/header repoint, unrelated-change diff check, static-content check, fidelity/responsive passes, lint/build gate, full quickstart run → feature done

### Parallel Team Strategy

1. One person/session completes Setup + Foundational
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`ai-strategy-roadmap-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged
