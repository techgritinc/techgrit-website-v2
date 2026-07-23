# Phase 1 Data Model: Construction Industry Page

All entities below are derived from `spec.md`'s Key Entities and mirror the section shapes in
`contracts/construction-page-response.json`. They are modeled as plain TypeScript types (no
ORM/DB — per research.md §3, content is a typed local module for this feature), following the
same conventions as `specs/001-about-us-page/data-model.md`.

## ConstructionPageContent (root)

The full content payload for the page.

| Field    | Type                  | Notes                                       |
|----------|-----------------------|----------------------------------------------|
| seo      | `PageSeo`              | Meta title/description for the page          |
| sections | `PageSectionEntry[]`   | Ordered; rendered in array order              |

```ts
interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}
```

## PageSectionEntry (discriminated union)

One entry per section type, discriminated by `type`. `order` is redundant with array position but
kept (matches the dummy contract, same convention as About Us) so a future CMS re-ordering is a
data change, not a code change.

```ts
type PageSectionEntry =
  | HeroSection
  | IntegrationsStripSection
  | ChallengesSection
  | SolutionsSection
  | LifecycleDiagramSection
  | AdvantageSection
  | ImpactSection
  | FinalCtaSection;
```

### HeroSection — FR-001, FR-002

| Field              | Type                    | Validation                                              |
|---------------------|--------------------------|------------------------------------------------------------|
| type                 | `"hero"`                  | —                                                          |
| order                | number                   | matches array position                                     |
| eyebrow              | string                   | non-empty (e.g. "Industries · Construction")                |
| title                | string                   | non-empty                                                   |
| titleHighlight       | string                   | non-empty; must be a substring of `title` — rendered in the orange/amber gradient accent |
| subtitle             | string                   | non-empty                                                   |
| primaryCtaLabel      | string                   | non-empty                                                   |
| primaryCtaLink       | string                   | non-empty                                                   |
| secondaryCtaLabel    | string                   | non-empty                                                   |
| secondaryCtaLink     | string                   | non-empty, in-page anchor (`#solutions`)                    |
| image                | `SectionImage \| null`     | when `null`, render placeholder (FR-013)                    |
| stats                | `HeroStat[]`              | exactly 3 (delivery speed, field hours saved, safety monitoring) |

```ts
interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface HeroStat {
  value: string; // e.g. "<30d" — display string, not necessarily numeric
  label: string;
}
```

### IntegrationsStripSection — FR-003

| Field   | Type                    | Validation      |
|----------|--------------------------|-------------------|
| type      | `"integrationsStrip"`     | —                 |
| order     | number                   | matches array position |
| label     | string                   | non-empty         |
| partners  | `IntegrationPartner[]`    | at least 1 item   |

```ts
interface IntegrationPartner {
  name: string;
}
```

### ChallengesSection — FR-004

| Field       | Type                 | Validation           |
|--------------|-----------------------|-------------------------|
| type          | `"challenges"`          | —                       |
| order         | number                | matches array position    |
| eyebrow       | string                | non-empty                |
| title         | string                | non-empty                |
| description   | string                | non-empty                |
| challenges    | `IndustryChallenge[]`  | exactly 5 (SC-005)       |

```ts
interface IndustryChallenge {
  order: number; // 1-based, also selects the fixed icon in construction-challenges.tsx
  label: string;
}
```

### SolutionsSection — FR-005

| Field    | Type              | Validation           |
|-----------|-------------------|-------------------------|
| type       | `"solutions"`       | —                       |
| order      | number            | matches array position    |
| eyebrow    | string            | non-empty                |
| title      | string            | non-empty                |
| solutions  | `SolutionOffering[]` | exactly 6 (SC-005)       |

```ts
interface SolutionOffering {
  order: number; // 1-based, also selects the fixed icon in construction-solutions.tsx
  title: string;
  description: string;
}
```

### LifecycleDiagramSection — FR-006, FR-012

| Field          | Type              | Validation           |
|-----------------|-------------------|-------------------------|
| type             | `"lifecycleDiagram"` | —                     |
| order            | number            | matches array position    |
| eyebrow          | string            | non-empty                |
| title            | string            | non-empty                |
| engineLabel      | string            | non-empty (e.g. "OrbitAI") |
| engineSubLabel   | string            | non-empty (e.g. "Engine") |
| nodes            | `LifecycleNode[]`  | exactly 8 — fixed corner-anchored layout in construction-lifecycle-diagram.tsx expects this count |

```ts
interface LifecycleNode {
  order: number; // 1-based, also selects the fixed diagram position (research.md §7)
  name: string;
}
```

### AdvantageSection — FR-007

| Field       | Type               | Validation           |
|--------------|---------------------|-------------------------|
| type          | `"advantage"`         | —                       |
| order         | number              | matches array position    |
| eyebrow       | string              | non-empty                |
| title         | string              | non-empty                |
| description   | string              | non-empty                |
| points        | `AdvantagePoint[]`   | exactly 4 (SC-005)       |

```ts
interface AdvantagePoint {
  order: number; // 1-based display order (e.g. "01")
  title: string;
  description: string;
}
```

### ImpactSection — FR-008

| Field        | Type                  | Validation      |
|---------------|------------------------|--------------------|
| type           | `"impact"`               | —                  |
| order          | number                 | matches array position |
| eyebrow        | string                 | non-empty          |
| title          | string                 | non-empty          |
| caseStudies    | `CaseStudySummary[]`   | at least 1 item    |

```ts
interface CaseStudySummary {
  order: number;
  metric: string;   // headline proof metric, e.g. "<30 days" — display string
  label: string;     // e.g. "Case Study 01"
  title: string;
  description: string;
  link: string;      // internal link, e.g. "/contact/" (matches About Us CTA link convention)
}
```

### FinalCtaSection — FR-009

| Field              | Type   | Validation |
|----------------------|--------|------------|
| type                  | `"finalCta"` | —      |
| order                 | number | matches array position |
| eyebrow               | string | non-empty  |
| title                 | string | non-empty  |
| description           | string | non-empty  |
| primaryCtaLabel       | string | non-empty  |
| primaryCtaLink        | string | non-empty; placeholder value for now (research.md §8) |
| secondaryCtaLabel     | string | non-empty  |
| secondaryCtaLink      | string | non-empty; real `mailto:` link (research.md §8) |

## Relationships

- `ConstructionPageContent` **has one** ordered list of `PageSectionEntry` (1:N, order matters).
- Each `PageSectionEntry` variant **owns** its list-typed children (`HeroStat`, `IntegrationPartner`,
  `IndustryChallenge`, `SolutionOffering`, `LifecycleNode`, `AdvantagePoint`, `CaseStudySummary`) —
  these are not shared/reused across section types.
- No entity persists across requests or has a lifecycle/state machine — this is read-only display
  content for a single static page (no create/update/delete operations in scope).

## Mapping to components (FR-010)

| Section type        | Component file                                                      |
|-----------------------|------------------------------------------------------------------------|
| hero                   | `app/construction/_components/construction-hero.tsx`                  |
| integrationsStrip      | `app/construction/_components/construction-integrations-strip.tsx`    |
| challenges             | `app/construction/_components/construction-challenges.tsx`            |
| solutions              | `app/construction/_components/construction-solutions.tsx`             |
| lifecycleDiagram       | `app/construction/_components/construction-lifecycle-diagram.tsx`     |
| advantage              | `app/construction/_components/construction-advantage.tsx`             |
| impact                 | `app/construction/_components/construction-impact.tsx`                |
| finalCta               | `app/construction/_components/construction-final-cta.tsx`             |
