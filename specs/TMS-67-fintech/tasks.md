# Tasks: FinTech Industry Page

**Input**: Design documents from `/specs/TMS-67-fintech/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not included — spec.md does not request a TDD approach and this repo has no test
framework configured. Verification is manual, via quickstart.md.

**Organization**: spec.md defines exactly one user story (US1, P1 — "Evaluate TechGrit's FinTech
offering"). The shared-component extraction and Healthcare migration are Foundational work: they
block US1 (FinTech's page can't be built until the shared components/mappers exist) and are not
FinTech-specific on their own, so they carry no `[US1]` label.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[UI]**: Task produces user-visible frontend output
- **[Story]**: User story label (US1) — required for Phase 3 tasks only

---

## Phase 1: Setup

- [X] T001 Create the `app/industries/fintech/` route directory (no `_components/` subfolder —
  the page consumes only shared `components/ui/` primitives, per FR-016)

**Checkpoint**: Route skeleton exists.

---

## Phase 2: Foundational — shared extraction + Healthcare migration (Blocking Prerequisites)

**Purpose**: Extract the six section shapes Healthcare and FinTech share into
`components/ui/Industry*.tsx` + `cms/shared/industry-sections.ts`, migrate Healthcare onto them
with zero visual change (SC-007), then build FinTech's own CMS layer on the same shared pieces.
**MUST complete before Phase 3.**

- [X] T002 Create `cms/shared/industry-sections.ts` — move `StrapiApproachStep`,
  `StrapiServiceDetailSection`, `StrapiModernizationFeature`, `StrapiModernizationChallengesSection`,
  `StrapiCaseStudyCard`, `StrapiProvenImpactSection` (raw shapes) and `IconCard`,
  `WhatWeBuildSection`, `StepCard`, `ProductLifecycleSection`, `EngineeringServicesSection`,
  `SolutionTile`, `SolutionsWeSupportSection`, `CapabilityCard`, `FeaturedCapabilitiesSection`
  (presentation shapes) out of `cms/types/healthcare.ts`, plus the five mapper functions
  (`mapWhatWeBuild`, `mapProductLifecycle`, `mapEngineeringServices`, `mapSolutionsWeSupport`,
  `mapFeaturedCapabilities`) out of `cms/api/healthcare.ts`. Add `WhatWeBuildSection.description`
  (`cms.subtitle ?? ""`) and an optional `titleOverride?: string` param on `mapProductLifecycle`/
  `mapEngineeringServices` (`title: titleOverride ?? cms.title`), per data-model.md. Imports
  `SectionIcon`/`mapSectionIcon` from the existing `cms/shared/reusable-sections.ts`.
- [X] T003 [P] Trim `cms/types/healthcare.ts` to re-export the shared types from T002 and keep
  only `StrapiHealthCareSystemCategory`/`StrapiHealthCareSystemSection`/`ConnectedSystemsSection`
  (healthcare-only) plus the page-level `StrapiHealthcareSection` union/`HealthcarePageContent`.
  Depends on T002.
- [X] T004 [P] Update `cms/api/healthcare.ts` to call the shared mappers from T002 instead of its
  own now-deleted local copies; keep `SERVICE_LABELS` and the `switch (section.__component)`
  orchestration local (research.md's "shared mapper bodies, page-local assembly" split). No
  behavior change. Depends on T002, T003.
- [X] T005 [P] [UI] Create `components/ui/IndustryHero.tsx` — generalized, verbatim relocation of
  `app/industries/healthcare/_components/healthcare-hero.tsx` (same markup/tokens/breakpoints),
  typed against the shared `HeroSection`/`HeroFields` shape. Depends on T002.
- [X] T006 [P] [UI] Create `components/ui/IndustryCardGrid.tsx` — generalized relocation of
  `healthcare-what-we-build.tsx`, extended to render `section.description` under the heading when
  non-empty (spec.md Clarification). Depends on T002.
- [X] T007 [P] [UI] Create `components/ui/IndustryStepGrid.tsx` — generalized, verbatim relocation
  of `healthcare-product-lifecycle.tsx`. Depends on T002.
- [X] T008 [P] [UI] Create `components/ui/IndustryServiceRows.tsx` — generalized, verbatim
  relocation of `healthcare-engineering-services.tsx` (no-fallback icon rule preserved). Depends
  on T002.
- [X] T009 [P] [UI] Create `components/ui/IndustryTileGrid.tsx` — generalized, verbatim relocation
  of `healthcare-solutions-we-support.tsx`. Depends on T002.
- [X] T010 [P] [UI] Create `components/ui/IndustryFeaturedCases.tsx` — generalized, verbatim
  relocation of `healthcare-featured-capabilities.tsx`. Depends on T002.
- [X] T011 [UI] Update `app/industries/healthcare/page.tsx` to import `IndustryHero`,
  `IndustryCardGrid`, `IndustryStepGrid`, `IndustryServiceRows`, `IndustryTileGrid`,
  `IndustryFeaturedCases` from `components/ui/` instead of `./_components/*`; keep
  `HealthcareConnectedSystems` and `components/ui/final-cta` imports unchanged. Depends on
  T005–T010.
- [X] T012 [P] Delete `app/industries/healthcare/_components/healthcare-hero.tsx`,
  `healthcare-what-we-build.tsx`, `healthcare-product-lifecycle.tsx`,
  `healthcare-engineering-services.tsx`, `healthcare-solutions-we-support.tsx`,
  `healthcare-featured-capabilities.tsx` — superseded by T005–T010; no half-migrated leftovers
  (SC-008). Depends on T011.
- [X] T013 [P] Create `cms/types/fintech.ts` — imports the shared types from T002 plus
  `StrapiHeroSection`/`StrapiCtaBannerSection` from `cms/shared/reusable-sections.ts`; defines
  `StrapiFintechSection` (union, no HealthCareSystem variant), `StrapiFintechPage`, and
  `FintechPageContent`/`PageSectionEntry` per data-model.md. Depends on T002.
- [X] T014 Create `cms/api/fintech.ts` — mirrors `cms/api/healthcare.ts`'s fetch/parse/assemble
  structure: a `FINTECH_ENDPOINT` populate-query string (no health-care-system populate branch),
  `SERVICE_LABELS` (`whatWeBuild: "What We Build"`, `productLifecycle: "Lifecycle"`,
  `engineeringServices: "HealthTech Engineering Services"` — the raw CMS value, research.md §2),
  calls the shared mappers from T002 passing `titleOverride: "AI Across the FinTech Product
  Lifecycle"` / `"Our FinTech Engineering Services"` at the two corrected call sites, and a
  `cache()`-wrapped `getFintechPageContent()` returning `null` on CMS failure. Depends on T002,
  T013.

**Checkpoint**: `getFintechPageContent()` is callable and typed; Healthcare renders unchanged
through the new shared components. User Story 1 (Phase 3) can now begin.

---

## Phase 3: User Story 1 - Evaluate TechGrit's FinTech offering (Priority: P1)

**Goal**: A visitor can load `/industries/fintech` and see all 7 sections render correctly,
responsively, with a working hero CTA and closing CTA.

**Independent Test**: Load `/industries/fintech` at desktop/tablet/mobile widths and walk
quickstart.md's acceptance-scenario checklist.

- [X] T015 [UI] [US1] Implement `app/industries/fintech/page.tsx` — Server Component composition
  root mirroring `app/industries/healthcare/page.tsx`: calls `getFintechPageContent()`,
  `notFound()`s on `null`, `generateMetadata()` from the payload's `seo` fields, and switches over
  each section's `type` to render `IndustryHero`, `IndustryCardGrid`, `IndustryStepGrid`,
  `IndustryServiceRows`, `IndustryTileGrid`, `IndustryFeaturedCases` in order, plus the closing CTA
  via `components/ui/final-cta.tsx` (tone `amber`). No `connectedSystems` case (FR-008). Depends
  on T005–T010, T014.

**Checkpoint**: User Story 1 is independently complete and testable — this is the whole feature's
MVP scope (there is only one user story).

---

## Phase 4: Polish & Cross-Cutting Concerns

- [X] T016 [P] Run `npm run lint` and fix any violations across new/modified files
- [X] T017 [P] Run `npm run build` and fix any type or build errors (Husky pre-commit gate)
- [X] T018 Walk quickstart.md's FinTech acceptance-scenario and responsive checklist at desktop,
  tablet, and mobile widths; confirm SC-001, SC-002, SC-003, SC-005, SC-006 and every Edge Case
- [X] T019 Walk quickstart.md's Healthcare regression check — confirm Healthcare's rendered page
  is pixel-identical to before this feature at all three breakpoints (SC-007)
- [X] T020 [P] Keyboard-only pass on `/industries/fintech`: tab through and confirm the hero CTA
  and closing CTA are reachable and operable

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** has no dependency on Phase 2 and can start immediately.
- **Phase 2 (Foundational) blocks Phase 3 entirely.** Within Phase 2: T002 blocks everything else
  in the phase; T003/T004 (healthcare types/api update) and T005–T010 (six new shared components)
  and T013 (fintech types) can all run in parallel once T002 lands; T011 depends on T005–T010;
  T012 depends on T011; T014 depends on T002 and T013.
- **Within Phase 3**: T015 depends on T005–T010 and T014.
- **Phase 4 (Polish)** depends on Phase 3 (T015) and, for T019, on Phase 2's Healthcare migration
  (T011/T012) being complete.

## Parallel Execution Example

Once T002 lands, launch the independent Phase 2 tracks together:

```text
Task: "Trim cms/types/healthcare.ts to re-export shared types (T003)"
Task: "Create components/ui/IndustryHero.tsx (T005)"
Task: "Create components/ui/IndustryCardGrid.tsx (T006)"
Task: "Create components/ui/IndustryStepGrid.tsx (T007)"
Task: "Create components/ui/IndustryServiceRows.tsx (T008)"
Task: "Create components/ui/IndustryTileGrid.tsx (T009)"
Task: "Create components/ui/IndustryFeaturedCases.tsx (T010)"
Task: "Create cms/types/fintech.ts (T013)"
```

Then T004 (needs T003), T011 (needs T005–T010), T012 (needs T011), and T014 (needs T013) follow;
T015 runs once T005–T010 and T014 are all done.

## Implementation Strategy

**MVP = the whole feature.** Since spec.md defines a single P1 user story, Phase 3 (T015) is the
MVP — but it cannot start until Phase 2's shared-component extraction is fully in place, since
FinTech's page introduces no components of its own. The bulk of this feature's real work is Phase
2, not Phase 3.
