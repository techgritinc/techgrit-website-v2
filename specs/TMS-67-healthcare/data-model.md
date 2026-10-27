# Phase 1 Data Model: Healthcare Industry Page

All entities are derived from `spec.md`'s Key Entities and the real CMS payload captured there
(spec.md's Clarifications), following the same raw-Strapi-shape / presentation-shape split as
`cms/types/construction.ts`.
Shared shapes (`StrapiHeroSection`, `StrapiCtaBannerSection`, `StrapiServiceDetailSection`,
`SectionIcon`, `mapHeroFields`, `mapCtaBanner`, `mapSectionIcon`) are imported from
`cms/shared/reusable-sections.ts` and reused as-is — see research.md §1–§3.

## HealthcarePageContent (root)

| Field    | Type                | Notes |
|----------|---------------------|-------|
| seo      | `PageSeo`           | Meta title/description (payload's `seo` is currently `null`; falls back to empty strings) |
| sections | `PageSectionEntry[]`| Ordered; rendered in array order |

## PageSectionEntry (discriminated union)

```ts
type PageSectionEntry =
  | HeroSection
  | WhatWeBuildSection
  | ProductLifecycleSection
  | EngineeringServicesSection
  | SolutionsWeSupportSection
  | FeaturedCapabilitiesSection
  | ConnectedSystemsSection
  | FinalCtaSection;
```

### HeroSection — FR-004, FR-005

Reuses `StrapiHeroSection` + `mapHeroFields()` from `cms/shared/reusable-sections.ts` verbatim.
No `stats` field is read or rendered (FR-005 — no statistics overlay), even though the shared
`HeroFields` type doesn't itself carry stats (Construction's stats come from a separate
`page-reusable-sections.statistics` section that the Healthcare payload does not include).

| Field | Type | Notes |
|---|---|---|
| type | `"hero"` | — |
| order | number | matches array position |
| eyebrow | string | `badgeLabel`, e.g. "Industry · HealthTech" |
| title | string | `title` |
| titleHighlight | `string \| null` | `highlightTitle`, e.g. "HealthTech Companies" |
| subtitle | string | `subtitle` |
| primaryCtaLabel | string | `primaryBtnLabel` — the only CTA (FR-004: exactly one) |
| primaryCtaLink | string | `primaryBtnLink` |
| image | `SectionImage \| null` | from `backgroundImage[0]`; `null` → defensive placeholder (FR-005 fixed-size frame) |

Note: `secondaryBtnLabel`/`secondaryBtnLink` are `null` in the real payload — the mapper's
existing `?? ""` fallback naturally yields no second button; the hero component renders only one
`Button` (not two, as Construction does).

### WhatWeBuildSection — FR-008

Mapped from the `service-detail` entry whose `serviceLabel === "What We Build"`.

| Field | Type | Notes |
|---|---|---|
| type | `"whatWeBuild"` | — |
| order | number | — |
| eyebrow | string | `serviceLabel` |
| title | string | `title` |
| cards | `IconCard[]` | 8 items from `approachSteps` |

```ts
interface IconCard {
  order: number;
  title: string;
  description: string; // approachSteps[].subtitle ?? ""
  icon: SectionIcon | null; // mapSectionIcon(approachSteps[].icon)
}
```

Rendered via the Construction-challenges card-grid pattern, extended to show `description`
(research.md §4).

### ProductLifecycleSection — FR-009

Mapped from the `service-detail` entry whose `serviceLabel === "Healthcare Product Lifecycle"`.

| Field | Type | Notes |
|---|---|---|
| type | `"productLifecycle"` | — |
| order | number | — |
| eyebrow | string | `serviceLabel` |
| title | string | `title` |
| description | string | `subtitle ?? ""` |
| cards | `StepCard[]` | 6 items from `approachSteps` |

```ts
interface StepCard {
  order: number;       // array position — used for React key only, not displayed
  stepLabel: string;   // approachSteps[].stepLabel, e.g. "01".."06" — rendered as the visible label
  title: string;
  description: string; // approachSteps[].subtitle ?? ""
  // no icon field — the CMS-supplied icon is intentionally not read (research.md §4)
}
```

Rendered via the Construction-solutions 3-column card-grid pattern, showing each card's CMS-supplied
`stepLabel` where Construction shows an icon. No icon field is read for this section, and no
numbering is invented client-side — the label comes straight from the CMS.

### EngineeringServicesSection — FR-010

Mapped from the `service-detail` entry whose `serviceLabel === "HealthTech Engineering Services"`.

| Field | Type | Notes |
|---|---|---|
| type | `"engineeringServices"` | — |
| order | number | — |
| eyebrow | string | `serviceLabel` |
| title | string | `title` |
| cards | `IconCard[]` | 7 items from `approachSteps` |

Reuses the `IconCard` shape from WhatWeBuildSection as-is, including `icon: SectionIcon | null`.
The CMS now supplies a real icon for most of these 7 steps; whichever step's `icon` is still
`null` (one, as of the latest payload) renders with no icon slot — the mapper does not assign a
substitute (research.md §5, "no fallback").

### SolutionsWeSupportSection — FR-011

Mapped from the `page-reusable-sections.modernization-challenges` entry.

| Field | Type | Notes |
|---|---|---|
| type | `"solutionsWeSupport"` | — |
| order | number | — |
| eyebrow | string | `eyebrow ?? ""` (currently `null` in the payload) |
| title | string | `title` |
| subtitle | string | `subtitle ?? ""` (currently `null`) |
| tiles | `SolutionTile[]` | 17 items from `blockers.features` |

```ts
interface SolutionTile {
  order: number;
  title: string; // features[].title — no icon, no description field read
}
```

### FeaturedCapabilitiesSection — FR-012

Mapped from the `service-detail` entry whose `serviceLabel === "Featured Capabilities"`.

| Field | Type | Notes |
|---|---|---|
| type | `"featuredCapabilities"` | — |
| order | number | — |
| eyebrow | string | `serviceLabel` |
| title | string | `title` |
| cards | `CapabilityCard[]` | 2 items from `approachSteps` |

```ts
interface CapabilityCard {
  order: number;
  title: string;
  description: string; // approachSteps[].subtitle ?? ""
  // no metric/label/link fields — the CMS content supplies none (research.md §4)
}
```

### ConnectedSystemsSection — FR-013

Mapped from the `industries-construction.pd-health-care-system` entry.

| Field | Type | Notes |
|---|---|---|
| type | `"connectedSystems"` | — |
| order | number | — |
| eyebrow | string | `badgeLabel` |
| title | string | `title` |
| description | string | `subtitle ?? ""` |
| categories | `SystemCategory[]` | 7 items from `categories[]` — rendered as bullets inside one card |

```ts
interface SystemCategory {
  order: number;
  name: string;           // e.g. "Electronic Health Records"
  items: string[];        // features[].title, e.g. ["Epic", "Oracle Health (Cerner)", ...]
}
```

Rendered as a single card containing one bullet per `SystemCategory`, each bullet's `items`
rendered as wrapping chip-style tags beneath the category `name` (research.md §7).

### FinalCtaSection — FR-014

Reuses `StrapiCtaBannerSection` + `mapCtaBanner()` verbatim (identical shape to Construction's).

| Field | Type | Notes |
|---|---|---|
| type | `"finalCta"` | — |
| order | number | — |
| eyebrow | string | `badgeLabel` |
| title | string | `title` |
| titleHighlight | `string \| null` | `highlightTitle` (currently `null`) |
| description | string | `subtitle ?? ""` |
| primaryCtaLabel | string | `primaryCtaLabel` |
| primaryCtaLink | string | `primaryCtaLink` |
| secondaryCtaLabel | string | `secondaryCtaLabel ?? ""` (currently empty — no secondary CTA rendered) |
| secondaryCtaLink | string | `secondaryCtaLink ?? ""` |

Rendered via the existing `FinalCta` component exactly as Construction does (FR-014).

## Section-type discriminator → CMS matching rule

| Presentation `type` | Raw `__component` | Disambiguator |
|---|---|---|
| `hero` | `page-reusable-sections.hero` | — (only one hero) |
| `whatWeBuild` | `page-reusable-sections.service-detail` | `serviceLabel === "What We Build"` |
| `productLifecycle` | `page-reusable-sections.service-detail` | `serviceLabel === "Healthcare Product Lifecycle"` |
| `engineeringServices` | `page-reusable-sections.service-detail` | `serviceLabel === "HealthTech Engineering Services"` |
| `featuredCapabilities` | `page-reusable-sections.service-detail` | `serviceLabel === "Featured Capabilities"` |
| `solutionsWeSupport` | `page-reusable-sections.modernization-challenges` | — (only one) |
| `connectedSystems` | `industries-construction.pd-health-care-system` | — (only one) |
| `finalCta` | `page-reusable-sections.cta-banner` | — (only one) |

Any entry whose `__component`/`serviceLabel` doesn't match one of the rows above is skipped
(`undefined`, filtered out before reaching the page), matching Construction's existing
"no static fallback" convention (FR-003).
