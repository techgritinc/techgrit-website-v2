# Phase 1 Data Model: About Us Page

All entities below are derived from `spec.md`'s Key Entities and mirror the section shapes in
`contracts/about-us-page-response.json`. They are modeled as plain TypeScript types (no ORM/DB —
per research.md §3, content is a typed local module for this feature).

## AboutUsPageContent (root)

The full content payload for the page.

| Field    | Type                  | Notes                                                        |
|----------|-----------------------|---------------------------------------------------------------|
| seo      | `PageSeo`              | Meta title/description for the page                          |
| sections | `PageSectionEntry[]`   | Ordered; rendered in array order                              |

```ts
interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}
```

## PageSectionEntry (discriminated union)

One entry per section type, discriminated by `type`. `order` is redundant with array position but
kept (matches the dummy contract) so a future CMS re-ordering is a data change, not a code change.

**Mapping from the dummy contract**: `contracts/about-us-page-response.json` discriminates each
entry by `__component` (e.g. `"page-reusable-sections.about-us-hero"`), not by `type` — that
dotted string is a CMS/Strapi-flavored implementation detail of the dummy response, not the shape
the TS layer should carry. `about-us-content.ts` (T005) MUST translate each contract entry's
`__component` suffix (the part after `about-us-`) into the matching `type` literal below when
building the typed `AboutUsPageContent` object (e.g. `about-us-hero` → `"hero"`,
`about-us-who-you-are` → `"whoYouAre"`, `about-us-culture-gallery` → `"cultureGallery"`). Every
section interface below also carries a top-level `order: number` field (matching the contract),
used only for authoring clarity — components render in array order, not by re-sorting on `order`.

```ts
type PageSectionEntry =
  | HeroSection
  | ShowcaseSection
  | WhoYouAreSection
  | OurRoleSection
  | ValuesSection
  | ProcessSection
  | AchievementsSection
  | PartnerSection
  | CultureGallerySection
  | FinalCtaSection;
```

### HeroSection — FR-001

| Field              | Type   | Validation                          |
|---------------------|--------|--------------------------------------|
| type                 | `"hero"` | —                                   |
| order                | number | matches array position               |
| eyebrow              | string | non-empty                            |
| title                | string | non-empty                            |
| titleHighlight       | string | non-empty; must be a substring of `title` — rendered in the orange/amber gradient accent |
| subtitle             | string | non-empty                            |
| primaryCtaLabel      | string | non-empty                            |
| primaryCtaLink       | string | non-empty                            |
| secondaryCtaLabel    | string | non-empty                            |
| secondaryCtaLink     | string | non-empty, in-page anchor (`#...`)   |

### ShowcaseSection — FR-002, FR-013

| Field | Type              | Validation |
|-------|-------------------|------------|
| type  | `"showcase"`        | —          |
| order | number            | matches array position |
| image | `SectionImage \| null` | when `null`, render placeholder (FR-013) |

```ts
interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
  // `formats` (thumbnail/small/medium/large) intentionally omitted — next/image
  // generates its own responsive srcset from width/height (research.md §6);
  // the contract JSON's `formats` field is not consumed by the TS layer.
}
```

### WhoYouAreSection — FR-003

| Field            | Type       | Validation      |
|-------------------|------------|-----------------|
| type               | `"whoYouAre"` | —             |
| order              | number     | matches array position |
| eyebrow            | string     | non-empty       |
| title              | string     | non-empty       |
| paragraphs         | string[]   | at least 1 item |
| concernsCard       | `ConcernsCard` | —          |

```ts
interface ConcernsCard {
  label: string;
  concerns: string[];        // at least 1
  closingStatement: string;
}
```

### OurRoleSection — FR-004

| Field       | Type       | Validation |
|--------------|------------|------------|
| type          | `"ourRole"` | —         |
| order         | number     | matches array position |
| eyebrow       | string     | non-empty  |
| title         | string     | non-empty  |
| description   | string     | non-empty  |

### ValuesSection — FR-005

| Field    | Type            | Validation             |
|-----------|-----------------|--------------------------|
| type       | `"values"`       | —                       |
| order      | number          | matches array position   |
| eyebrow    | string          | non-empty                |
| title      | string          | non-empty                |
| values     | `CompanyValue[]` | exactly 6 (SC-005)       |

```ts
interface CompanyValue {
  order: number;      // 1-based display order
  title: string;
  description: string;
}
```

### ProcessSection — FR-006

| Field    | Type            | Validation          |
|-----------|-----------------|-----------------------|
| type       | `"process"`      | —                    |
| order      | number          | matches array position |
| eyebrow    | string          | non-empty             |
| title      | string          | non-empty             |
| subtitle   | string          | non-empty             |
| steps      | `ProcessStep[]`  | exactly 3 (SC-005)    |

```ts
interface ProcessStep {
  order: number;
  label: string;      // e.g. "Step 01"
  title: string;
  description: string;
}
```

### AchievementsSection — FR-007

| Field | Type                  | Validation      |
|-------|-----------------------|-------------------|
| type   | `"achievements"`        | —                |
| order  | number                | matches array position |
| stats  | `AchievementMetric[]`  | at least 1 item   |

```ts
interface AchievementMetric {
  value: string;   // e.g. "60+" — display string, not necessarily numeric
  label: string;
}
```

### PartnerSection — FR-008

| Field        | Type                  | Validation      |
|---------------|-----------------------|-------------------|
| type           | `"partner"`             | —                |
| order          | number                | matches array position |
| eyebrow        | string                | non-empty         |
| title          | string                | non-empty         |
| description    | string                | non-empty         |
| outcomes       | `PartnershipOutcome[]` | at least 1 item   |

```ts
interface PartnershipOutcome {
  text: string;
}
```

### CultureGallerySection — FR-009, FR-013

| Field     | Type            | Validation      |
|------------|-----------------|-------------------|
| type        | `"cultureGallery"` | —              |
| order       | number          | matches array position |
| eyebrow     | string          | non-empty         |
| title       | string          | non-empty         |
| subtitle    | string          | non-empty         |
| photos      | `CulturePhoto[]` | at least 1 item   |

```ts
interface CulturePhoto {
  layout: "tall" | "square" | "wide"; // grid placement hint, mirrors reference gallery layout
  image: SectionImage | null;         // null → render placeholder (FR-013)
}
```

### FinalCtaSection — FR-010

| Field        | Type          | Validation |
|---------------|---------------|------------|
| type           | `"finalCta"`    | —         |
| order          | number        | matches array position |
| eyebrow        | string        | non-empty  |
| title          | string        | non-empty  |
| description    | string        | non-empty  |
| ctaLabel       | string        | non-empty  |
| ctaLink        | string        | non-empty  |

## Relationships

- `AboutUsPageContent` **has one** ordered list of `PageSectionEntry` (1:N, order matters).
- Each `PageSectionEntry` variant **owns** its list-typed children (`CompanyValue`, `ProcessStep`,
  `AchievementMetric`, `PartnershipOutcome`, `CulturePhoto`) — these are not shared/reused across
  section types.
- No entity persists across requests or has a lifecycle/state machine — this is read-only display
  content for a single static page (no create/update/delete operations in scope).

## Mapping to components (FR-011)

| Section type      | Component file                                          |
|--------------------|----------------------------------------------------------|
| hero                | `app/about/_components/about-us-hero.tsx`                |
| showcase            | `app/about/_components/about-us-showcase.tsx`             |
| whoYouAre           | `app/about/_components/about-us-who-you-are.tsx`          |
| ourRole             | `app/about/_components/about-us-our-role.tsx`             |
| values              | `app/about/_components/about-us-values.tsx`               |
| process             | `app/about/_components/about-us-process.tsx`              |
| achievements        | `app/about/_components/about-us-achievements.tsx`         |
| partner             | `app/about/_components/about-us-partner.tsx`               |
| cultureGallery      | `app/about/_components/about-us-culture-gallery.tsx`      |
| finalCta            | `app/about/_components/about-us-final-cta.tsx`            |
