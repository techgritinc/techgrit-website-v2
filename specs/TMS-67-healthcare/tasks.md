# Tasks: Healthcare Industry Page

**Input**: Design documents from `/specs/TMS-67-healthcare/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Not included — spec.md does not request a TDD approach and this repo has no test
framework configured (research.md §8). Verification is manual, via quickstart.md.

**Organization**: Tasks are grouped by user story. spec.md defines exactly one user story (US1,
P1 — "Evaluate TechGrit's healthcare offering"), so all section-implementation work lives in one
story phase; Setup/Foundational carry the shared CMS plumbing every section depends on.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[UI]**: Task produces user-visible frontend output — `/speckit.implement` invokes the
  vendored `frontend-design` skill before executing it
- **[Story]**: User story label (US1) — required for Phase 3 tasks only

---

## Phase 1: Setup

**Purpose**: Establish the route and directory this feature adds

- [X] T001 Create the `app/industries/healthcare/_components/` directory (empty placeholder
  removed once T005–T011 populate it), mirroring `app/industries/construction/`'s layout per
  plan.md's Project Structure section

**Checkpoint**: Route skeleton exists. (Independent of Phase 2 — see Dependencies & Execution
Order below.)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The CMS fetch/type layer every section component reads from. **MUST complete
before any Phase 3 task**, since every section component imports its presentation type and reads
its content through `getHealthcarePageContent()`.

- [X] T002 Create `cms/types/healthcare.ts` — raw Strapi shapes (`StrapiModernizationChallengesSection`,
  `StrapiHealthCareSystemSection`) plus the 8 presentation types (`HeroSection`, `WhatWeBuildSection`,
  `ProductLifecycleSection`, `EngineeringServicesSection`, `SolutionsWeSupportSection`,
  `FeaturedCapabilitiesSection`, `ConnectedSystemsSection`, `FinalCtaSection`) and the
  `PageSectionEntry` union + `HealthcarePageContent` root type, per data-model.md. Imports
  `StrapiHeroSection`, `StrapiCtaBannerSection`, `StrapiServiceDetailSection`, `SectionIcon`,
  `mapSectionIcon` from `cms/shared/reusable-sections.ts` rather than redefining them.
- [X] T003 Create `cms/api/healthcare.ts` — mirrors `cms/api/construction.ts`'s
  fetch/parse/assemble structure: a `HEALTHCARE_ENDPOINT` populate-query string, one mapper
  function per section type, a `service-detail` disambiguation step keyed on `serviceLabel`
  (research.md §2 — NOT `variant`, which collides for 2 of the 4 entries), and a
  `cache()`-wrapped `getHealthcarePageContent()` export returning `null` on CMS failure, exactly
  like `getConstructionPageContent()`. Every mapper passes icons straight through
  `mapSectionIcon()` with no substitute/placeholder icon logic anywhere (research.md §5 — no
  fallback). Depends on T002's types.

**Checkpoint**: `getHealthcarePageContent()` is callable and typed — User Story 1 (Phase 3) can
now begin.

---

## Phase 3: User Story 1 - Evaluate TechGrit's healthcare offering (Priority: P1)

**Goal**: A visitor can load `/industries/healthcare` and see all 8 sections render correctly,
responsively, with a working hero CTA and closing CTA.

**Independent Test**: Load `/industries/healthcare` at desktop/tablet/mobile widths and walk
quickstart.md's 9-point acceptance-scenario checklist.

- [X] T004 [P] [UI] [US1] Implement `HealthcareHero` in
  `app/industries/healthcare/_components/healthcare-hero.tsx` — badge, title with optional
  highlight, subtitle, exactly one primary CTA (`components/ui/Button.tsx`), fixed-size picture
  area (defensive placeholder when `image` is `null`), no breadcrumb, no stats block. (FR-004,
  FR-005)
- [X] T005 [P] [UI] [US1] Implement `HealthcareWhatWeBuild` in
  `app/industries/healthcare/_components/healthcare-what-we-build.tsx` — 8-card icon-grid,
  Construction-challenges pattern extended to render each card's description. (FR-008)
- [X] T006 [P] [UI] [US1] Implement `HealthcareProductLifecycle` in
  `app/industries/healthcare/_components/healthcare-product-lifecycle.tsx` — 6-card 3-column
  grid (Construction-solutions layout) showing each card's CMS-supplied `stepLabel` in place of
  an icon; the CMS-supplied icon for this section is not rendered. (FR-009)
- [X] T007 [P] [UI] [US1] Implement `HealthcareEngineeringServices` in
  `app/industries/healthcare/_components/healthcare-engineering-services.tsx` — 7-card grid
  (Construction-solutions' icon-card layout, not Construction-advantage's numbered rows), each
  card rendering whichever icon the CMS supplies for that step and rendering with no icon slot
  when it supplies none — no fallback/placeholder icon logic. (FR-010, research.md §5)
- [X] T008 [P] [UI] [US1] Implement `HealthcareSolutionsWeSupport` in
  `app/industries/healthcare/_components/healthcare-solutions-we-support.tsx` — new dense,
  title-only tile component: eyebrow, title, subtitle, then 17 tiles in a grid that is 3 columns
  at `md:` and above, 2 columns between `sm:` and `md:`, 1 column below `sm:`; no icon, no
  description per tile. (FR-011, research.md §6)
- [X] T009 [P] [UI] [US1] Implement `HealthcareFeaturedCapabilities` in
  `app/industries/healthcare/_components/healthcare-featured-capabilities.tsx` — 2-card
  `GlassCard` grid in the Construction-impact visual style, with the metric-number and
  "Read case study" link omitted (CMS supplies neither). (FR-012)
- [X] T010 [P] [UI] [US1] Implement `HealthcareConnectedSystems` in
  `app/industries/healthcare/_components/healthcare-connected-systems.tsx` — new single-card
  component: eyebrow, title, subtitle, then one `GlassCard` containing a bulleted list of 7
  categories, each bullet showing its category name followed by its feature titles as wrapping
  pill/chip tags. (FR-013, research.md §7)
- [X] T011 [UI] [US1] Implement `app/industries/healthcare/page.tsx` — Server Component
  composition root mirroring `app/industries/construction/page.tsx`: calls
  `getHealthcarePageContent()`, `notFound()`s on `null`, `generateMetadata()` from the payload's
  `seo` fields, and switches over each section's `type` to render T004–T010's components in
  order plus the closing CTA via the existing `components/ui/final-cta.tsx` (no
  `healthcare-final-cta.tsx` file — FR-014). Deliberately omits any integrations-strip or
  lifecycle-diagram case (FR-006, FR-007). Depends on T002–T010.

**Checkpoint**: User Story 1 is independently complete and testable — this is the whole feature's
MVP scope (there is only one user story).

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification gates that apply across the whole feature

- [X] T012 [P] Run `npm run lint` and fix any violations across the new/modified files
- [X] T013 [P] Run `npm run build` and fix any type or build errors (Husky pre-commit gate)
- [X] T014 Walk quickstart.md's full acceptance-scenario and responsive checklist at desktop,
  tablet, and mobile widths; confirm SC-001–SC-006 and every Edge Case in spec.md
- [X] T015 Keyboard-only pass: tab through the page and confirm the hero CTA and closing CTA are
  reachable and operable (spec.md Edge Cases)

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** and **Phase 2 (Foundational)** touch disjoint paths (T001 creates
  `app/industries/healthcare/_components/`; T002/T003 create files under `cms/types/`/`cms/api/`)
  and have no dependency on each other — both can start immediately.
- **Phase 2 (Foundational) blocks Phase 3 entirely**: T002 → T003; both must complete before any
  of T004–T011, since every section component imports types/content from them.
- **Within Phase 3**: T004–T010 are mutually independent (`[P]`, distinct files, no shared
  state) and can be built in any order or in parallel. T011 depends on all of T004–T010 (it wires
  them together) and on T003.
- **Phase 4 (Polish)** depends on Phase 3 being complete (T011).

## Parallel Execution Example

Once Phase 2 (T002, T003) is done, launch T004–T010 together — 7 independent component files:

```text
Task: "Implement HealthcareHero in app/industries/healthcare/_components/healthcare-hero.tsx"
Task: "Implement HealthcareWhatWeBuild in app/industries/healthcare/_components/healthcare-what-we-build.tsx"
Task: "Implement HealthcareProductLifecycle in app/industries/healthcare/_components/healthcare-product-lifecycle.tsx"
Task: "Implement HealthcareEngineeringServices in app/industries/healthcare/_components/healthcare-engineering-services.tsx"
Task: "Implement HealthcareSolutionsWeSupport in app/industries/healthcare/_components/healthcare-solutions-we-support.tsx"
Task: "Implement HealthcareFeaturedCapabilities in app/industries/healthcare/_components/healthcare-featured-capabilities.tsx"
Task: "Implement HealthcareConnectedSystems in app/industries/healthcare/_components/healthcare-connected-systems.tsx"
```

Then T011 (page composition) runs once all 7 land.

## Implementation Strategy

**MVP = the whole feature.** Since spec.md defines a single P1 user story covering the entire
page, there is no smaller independently-shippable increment — Phase 3 (T004–T011) is the MVP.
Within Phase 3, the 7 section components (T004–T010) can be parallelized across contributors
since they touch disjoint files and share no state; T011 is the integration point.
