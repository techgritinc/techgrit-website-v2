# Tasks: Engagement Models Page (How We Work)

**Input**: Design documents from `specs/TMS-88-engagement-models/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested in spec.md and no test framework is configured in this repo (per Constitution "Development Workflow") — no test tasks are generated. Verification is manual, via quickstart.md, plus `npm run lint` / `npm run build`.

**Organization**: Tasks are grouped by user story from spec.md. The "Not Sure Which Model Fits Your Needs?" section (FR-007a) has no dedicated `### User Story` block in spec.md — it is grouped into the User Story 3 phase below since FR-007a places it "immediately before the closing CTA section" and both are the page's final, conversion-adjacent stretch.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]**: Task produces user-visible frontend output — the `frontend-design` skill is invoked before executing it (Constitution Principle VI)
- **[Story]**: Maps to spec.md's User Story 1/2/3

## Path Conventions

Single Next.js app rooted at `app/`. New files live under `app/how-we-work/engagement-models/` and `cms/{api,types}/`, per plan.md's Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Route skeleton and CMS-fetch scaffolding every user story depends on.

- [X] T001 Create the route directory `app/how-we-work/engagement-models/` with an empty `_components/` subfolder
- [X] T002 [P] Create `cms/types/engagement-models-types.ts` with the base rendering types from data-model.md: `SectionImage`, `PageSeo`, `EngagementModelsPageContent`, and an initially-empty `EngagementModelsSection` union (extended per-story below)
- [X] T003 Create `cms/api/how-we-work/engagement-models.ts` with the `ENGAGEMENT_MODELS_ENDPOINT` constant (`/api/pages/by-slug/engagement-models`), `toImage()`/`toIconImage()` helpers (copy from `cms/api/how-we-work/orbit-ai-ecosystem.ts`), a `toSection()` dispatcher stub that returns `null` for every `__component` (mappers added per-story below), and the memoized `getEngagementModelsData()` (React `cache()` + `fetchCms`), returning `null` when the fetch fails or yields zero mapped sections (depends on T002)
- [X] T004 Create `app/how-we-work/engagement-models/page.tsx` with `generateMetadata()` (reads `seo.metaTitle`/`seo.metaDescription`), the async `EngagementModelsPage` Server Component calling `getEngagementModelsData()` and `notFound()` on `null`, and a `content.sections.map` `switch (section.type)` with only a `default: return null` case (depends on T003)

**Checkpoint**: `npm run dev` serves `/how-we-work/engagement-models` without crashing (renders an empty `<main>`); `npm run lint`/`npm run build` stay green.

---

## Phase 2: Foundational (Blocking Prerequisites)

No additional foundational work beyond Phase 1 — this feature has no shared service layer, auth, or cross-cutting infrastructure beyond the CMS-fetch skeleton and route scaffold already created in Setup. User story phases begin immediately after Phase 1.

---

## Phase 3: User Story 1 - Understand TechGrit's engagement options (Priority: P1) 🎯 MVP

**Goal**: Hero + "Three engagement models" render with real CMS content, giving a standalone, demonstrable page.

**Independent Test**: Load the page and confirm the hero (eyebrow, headline with gradient clause, subtitle, single primary CTA, fixed-size right-side image) and the 3-card models grid (category label, title, subtitle, feature list, structure tag) render per spec.md Acceptance Scenarios 1–3.

- [X] T005 [P] [US1] Add `StrapiEngagementModelsHeroSection` (raw) + `HeroSection` (rendering) types to `cms/types/engagement-models-types.ts` and a `toHeroSection()` mapper + `case` branch in `cms/api/how-we-work/engagement-models.ts`'s `toSection()` dispatcher
- [X] T006 [P] [US1] Add `StrapiEngagementModelsCapabilitiesSection`/`StrapiEngagementModelsCapabilityCard`/`StrapiEngagementModelsStructureInfo` (raw) + `FrameworkCard`/`FrameworkCardFeature`/`CapabilitiesSection` (rendering) types to `cms/types/engagement-models-types.ts` and a `toCapabilitiesSection()` mapper + `case` branch in `engagement-models.ts`
- [X] T007 [US1] [UI] Wire the `case "hero"` branch in `app/how-we-work/engagement-models/page.tsx`, rendering `components/ui/Hero.tsx` with `mediaFill` + `components/ui/MediaSlot.tsx` (`aspect-[4/3]`, `fill`) for the CMS-supplied image, exactly matching `ai-modernization`/`orbit-ai-ecosystem`'s hero usage (depends on T004, T005)
- [X] T008 [US1] [UI] Create `app/how-we-work/engagement-models/_components/engagement-models-capabilities.tsx` — a 3-card grid using `components/ui/GlassCard.tsx`'s `serviceCapability` variant, mirroring `app/how-we-work/orbit-ai-ecosystem/_components/orbit-ai-capabilities.tsx`'s markup exactly (category label, title, subtitle, bulleted feature list, structure tag), wrapped in `RevealOnScroll` (depends on T006)
- [X] T009 [US1] [UI] Wire the `case "capabilities"` branch in `page.tsx` to render `EngagementModelsCapabilities` (depends on T007, T008)

**Checkpoint**: User Story 1 is fully functional and independently testable — hero + models grid, responsive 3→2→1 collapse (FR-009).

---

## Phase 4: User Story 2 - Understand why TechGrit's engagement quality is consistent (Priority: P2)

**Goal**: The "Why TechGrit engagements" 2-column checklist renders after the models grid.

**Independent Test**: Scroll past the models section and confirm the eyebrow/title/description plus exactly 7 icon+text rows render in a single column at every viewport width (spec.md Acceptance Scenarios 1–2).

- [X] T010 [P] [US2] Add `StrapiEngagementModelsChallengesSection`/`StrapiEngagementModelsFeature` (raw, reusable across this and Phase 5) + `ChallengeChip`/`WhySection` (rendering) types to `cms/types/engagement-models-types.ts` and a `toWhySection()` mapper (eyebrow taken directly from the CMS `eyebrow` field, omitted when null — no fallback, per data-model.md's Validation rules / Clarification Q8) + `case` branch in `engagement-models.ts`
- [X] T011 [US2] [UI] Create `app/how-we-work/engagement-models/_components/engagement-models-why.tsx` — 2-column grid (1 column on mobile) of 7 rows, each a glass-chip row (icon from CMS media via `next/image` + one line of text, no description), wrapped in `RevealOnScroll`; renders the eyebrow line only when `section.eyebrow` is present (FR-006, Clarification Q9) (depends on T010)
- [X] T012 [US2] [UI] Wire the `case "why"` branch in `page.tsx` to render `EngagementModelsWhy` (depends on T011)

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Find your fit and take the next step (Priority: P3)

**Goal**: The "Not Sure Which Model Fits Your Needs?" comparison card (FR-007a) and the closing CTA (FR-007/FR-008) both render, completing the page.

**Independent Test**: Scroll to the bottom and confirm the 2-column goal/model comparison card (stacking at ≤560px) renders immediately above a closing CTA visually matching `ai-modernization`/`orbit-ai-ecosystem`'s pattern (spec.md User Story 3 Acceptance Scenario 1, FR-007a).

- [X] T013 [P] [US3] Add `StrapiAudienceInsightSection`/`StrapiAudienceInsightGroup`/`StrapiAudienceInsightQuestion` (raw) + `FindFitRow`/`FindFitSection` (rendering) types to `cms/types/engagement-models-types.ts` and a `toFindFitSection()` mapper (asserts `concernsCard.length === 2`, maps index 0 → `goalColumn`, index 1 → `modelColumn`, eyebrow taken directly from `badgeLabel`, omitted when null — no fallback per data-model.md/Clarification Q8) + `case` branch in `engagement-models.ts`
- [X] T014 [P] [US3] Add `StrapiEngagementModelsCtaBannerSection` (raw) + `FinalCtaSection` (rendering) types to `cms/types/engagement-models-types.ts` and a `toCtaSection()` mapper + `case` branch in `engagement-models.ts`
- [X] T015 [US3] [UI] Create `app/how-we-work/engagement-models/_components/engagement-models-find-fit.tsx` — one card, left accent border on the whole block, two divs side by side ("Your Goal" with per-row icons, "Recommended Model" bulleted) separated by a single vertical divider (no per-row horizontal lines or card-like chips), matching bold/white text weight on both sides; on mobile the two divs stack as whole groups rather than interleaving by row (FR-007a, Clarifications Q4/Q10); renders the eyebrow line only when `section.eyebrow` is present (Q8), wrapped in `RevealOnScroll` (depends on T013)
- [X] T016 [US3] [UI] Wire the `case "findFit"` branch in `page.tsx` to render `EngagementModelsFindFit` (depends on T015)
- [X] T017 [US3] [UI] Wire the `case "finalCta"` branch in `page.tsx`, rendering `components/ui/final-cta.tsx`'s `FinalCta` with `tone="orange"`, using the exact prop configuration already applied on `ai-modernization`/`orbit-ai-ecosystem` (`paddingTop={20}`, `paddingBottom={100}`, `titleFontSize="clamp(32px, 4vw, 46px)"`, etc.) (depends on T014)

**Checkpoint**: All user stories are independently functional; the full page renders end-to-end.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T018 [P] Update `cms/api/footer.ts`'s "How We Work → Engagement Models" link `href` to `/how-we-work/engagement-models` (FR-011)
- [X] T019 Walk through every step of `quickstart.md` manually in the browser (all 4 user stories, CMS-failure path, responsive breakpoints, footer link, ambient background, and the `orbit-ai-ecosystem` sibling-page regression check)
- [X] T020 Run `npm run lint` and `npm run build` and confirm both pass (Husky pre-commit gate)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Empty — user stories begin right after Setup
- **User Story 1 (Phase 3)**: Depends on Setup (T004)
- **User Story 2 (Phase 4)**: Depends on Setup (T004); independent of User Story 1's tasks (different CMS section, different component file)
- **User Story 3 (Phase 5)**: Depends on Setup (T004); independent of User Stories 1 and 2
- **Polish (Phase 6)**: Depends on all three user stories being complete (T018 is independent of story content but is sequenced last for a single coherent PR)

### Within Each User Story

- Types + CMS mapper tasks (marked `[P]`) before the component task that consumes them
- Component task before the `page.tsx` wiring task that renders it

### Parallel Opportunities

- T005 and T006 (Phase 3) — different sections of the same two files, additive, no shared lines
- T010 (Phase 4) can run in parallel with T005/T006 (Phase 3) once T004 is done — different CMS component branch
- T013 and T014 (Phase 5) — different sections of the same two files, additive
- Phases 3, 4, and 5 can be built by three different developers in parallel once Phase 1 is done, since each targets a distinct `__component` branch in the shared `toSection()` dispatcher (additive edits, not overlapping lines) and a distinct route-local component file

---

## Parallel Example: Phase 1 → Phase 3/4/5 fan-out

```bash
# After T001-T004 (Setup) complete:
Task: "Add hero + capabilities types/mappers (T005, T006) — User Story 1"
Task: "Add why types/mapper (T010) — User Story 2"
Task: "Add findFit + cta-banner types/mappers (T013, T014) — User Story 3"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (hero + models grid)
3. **STOP and VALIDATE**: quickstart.md steps 1 and 6 (desktop/tablet/mobile for the models grid)
4. Demo if ready — the page already delivers standalone decision-making value per spec.md's own P1 rationale

### Incremental Delivery

1. Setup → Phase 3 (US1) → validate → demo (MVP)
2. Add Phase 4 (US2, why-checklist) → validate → demo
3. Add Phase 5 (US3, find-fit + CTA) → validate → demo
4. Phase 6 polish (footer link, full quickstart pass, lint/build) → ship

---

## Notes

- No `[P]` marker on any `page.tsx`-wiring task (T007, T009, T012, T016, T017) — all edit the same `switch` block in the same file, so they must be sequenced, not parallelized, even across different user stories.
- Every `[UI]`-tagged task invokes the `frontend-design` skill first per Constitution Principle VI.
- T010's raw `StrapiEngagementModelsFeature` type is shared by both the "why" chips (Phase 4) and, structurally, the capability cards' `features` field (Phase 3) — if T006 lands first, T010 should reuse rather than redeclare that type; if T010 lands first, T006 should reuse it instead. Whichever task lands second checks for the existing type before adding a duplicate.
