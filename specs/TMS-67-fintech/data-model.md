# Phase 1 Data Model: FinTech Industry Page

All shapes below are produced by mapping Strapi's raw JSON — never rendered from raw field names
in JSX (Constitution Principle IV). Shapes marked **Shared** live in the new
`cms/shared/industry-sections.ts` and are imported by both `cms/types/healthcare.ts` and
`cms/types/fintech.ts`. Shapes marked **FinTech-only** or **Healthcare-only** stay in their
respective per-page type file.

## Raw Strapi shapes

| Type | Scope | Notes |
|---|---|---|
| `StrapiHeroSection` | Shared (already in `reusable-sections.ts`) | unchanged |
| `StrapiCtaBannerSection` | Shared (already in `reusable-sections.ts`) | unchanged |
| `StrapiApproachStep` | **Shared (new)** | `{ title, subtitle, stepLabel, icon }` — moved from `cms/types/healthcare.ts` |
| `StrapiServiceDetailSection` | **Shared (new)** | `{ __component: "page-reusable-sections.service-detail", title, subtitle, serviceLabel, variant, approachSteps }` |
| `StrapiModernizationFeature` | **Shared (new)** | `{ title }` |
| `StrapiModernizationChallengesSection` | **Shared (new)** | `{ __component: "page-reusable-sections.modernization-challenges", title, subtitle, eyebrow, blockers: { features } }` |
| `StrapiCaseStudyCard` | **Shared (new)** | `{ name, caseLabel, title, subtitle, ctaLabel, ctaLink }` |
| `StrapiProvenImpactSection` | **Shared (new)** | `{ __component: "industries-construction.proven-impact", title, badgeLabel, caseStudyCards }` |
| `StrapiHealthCareSystemCategory` / `StrapiHealthCareSystemSection` | Healthcare-only | unchanged, stays in `cms/types/healthcare.ts` — FinTech has no equivalent |
| `StrapiFintechSection` (union) | FinTech-only | `Hero \| ServiceDetail \| ModernizationChallenges \| ProvenImpact \| CtaBanner \| Unmapped` (no HealthCareSystem variant) |
| `StrapiHealthcareSection` (union) | Healthcare-only | unchanged shape, now composed from the shared pieces above |

## Presentation shapes

| Type | Scope | Fields | Change from Healthcare's current shape |
|---|---|---|---|
| `HeroSection` | Shared (already in `reusable-sections.ts`'s `HeroFields`, re-exported as the page-level `HeroSection` in each page's own file) | `eyebrow, title, titleHighlight, subtitle, primaryCtaLabel, primaryCtaLink, image` | none |
| `IconCard` | **Shared (new)** | `order, title, description, icon: SectionIcon \| null` | none |
| `WhatWeBuildSection` | **Shared (new)** | `type: "whatWeBuild", order, eyebrow, title, description: string, cards: IconCard[]` | **+ `description`** (spec.md Clarification — rendered only when non-empty; empty for Healthcare today, so no visual change there) |
| `StepCard` | **Shared (new)** | `order, stepLabel, title, description` | none |
| `ProductLifecycleSection` | **Shared (new)** | `type: "productLifecycle", order, eyebrow, title, description, cards: StepCard[]` | none |
| `EngineeringServicesSection` | **Shared (new)** | `type: "engineeringServices", order, eyebrow, title, cards: IconCard[]` | none |
| `SolutionTile` | **Shared (new)** | `order, title` | none |
| `SolutionsWeSupportSection` | **Shared (new)** | `type: "solutionsWeSupport", order, eyebrow, title, subtitle, tiles: SolutionTile[]` | none |
| `CapabilityCard` | **Shared (new)** | `order, metric, label, title, description, linkLabel, link` | none |
| `FeaturedCapabilitiesSection` | **Shared (new)** | `type: "featuredCapabilities", order, eyebrow, title, cards: CapabilityCard[]` | none |
| `SystemCategory` / `ConnectedSystemsSection` | Healthcare-only | unchanged | FinTech has no equivalent section (explicitly excluded) |
| `FinalCtaSection` | Shared (already in `reusable-sections.ts`'s `CtaBannerFields`) | unchanged | none |

## Mapper functions (all in `cms/shared/industry-sections.ts`)

| Function | Signature | Notes |
|---|---|---|
| `mapWhatWeBuild` | `(cms: StrapiServiceDetailSection, order: number) => WhatWeBuildSection` | `description: cms.subtitle ?? ""` |
| `mapProductLifecycle` | `(cms: StrapiServiceDetailSection, order: number, titleOverride?: string) => ProductLifecycleSection` | `title: titleOverride ?? cms.title` |
| `mapEngineeringServices` | `(cms: StrapiServiceDetailSection, order: number, titleOverride?: string) => EngineeringServicesSection` | `title: titleOverride ?? cms.title` |
| `mapSolutionsWeSupport` | `(cms: StrapiModernizationChallengesSection, order: number) => SolutionsWeSupportSection` | unchanged from Healthcare's current logic |
| `mapFeaturedCapabilities` | `(cms: StrapiProvenImpactSection, order: number) => FeaturedCapabilitiesSection` | unchanged from Healthcare's current logic |

`cms/api/fintech.ts` and `cms/api/healthcare.ts` each keep their own `SERVICE_LABELS` constant and
`switch (section.__component)` orchestration — only the per-shape mapper *bodies* are shared, not
the page-specific disambiguation/assembly logic (mirrors how `mapHeroFields`/`mapCtaBanner` are
already shared today while each page's fetch/assemble function stays local).

## FinTech page content (7 ordered sections, per live CMS)

| Order | Section | Count | Notes |
|---|---|---|---|
| 1 | Hero | — | `badgeLabel: "Industry · FinTech"`, `highlightTitle: "FinTech Companies"` |
| 2 | What We Build | 8 cards | has a populated `subtitle` → rendered via `WhatWeBuildSection.description` |
| 3 | Product Lifecycle | 6 cards | title corrected to "AI Across the FinTech Product Lifecycle" |
| 4 | Engineering Services | 7 steps | title corrected to "Our FinTech Engineering Services"; all 7 `icon: null` |
| 5 | Solutions We Support | 18 tiles | eyebrow "We Support" |
| 6 | Featured Case Studies | 2 cards | shares Healthcare's exact mapper/component; `ctaLabel`/`ctaLink` populated |
| 7 | Closing CTA | — | `components/ui/final-cta`, tone `amber` |

No Connected Systems section (excluded per spec, and absent from the live payload).
