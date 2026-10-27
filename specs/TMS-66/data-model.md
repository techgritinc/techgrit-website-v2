# Phase 1 Data Model: Services Page

All entities below are derived from `spec.md`'s Key Entities. They are modeled as plain TypeScript
types in `app/services/_data/types.ts` (no ORM/DB — per research.md §3, content is a typed local
module for this feature, with no separate published JSON contract).

## ServicesPageContent (root)

The full content payload for the page.

| Field    | Type                | Notes                             |
|----------|---------------------|------------------------------------|
| seo      | `PageSeo`           | Meta title/description for the page |
| sections | `PageSectionEntry[]` | Ordered; rendered in array order   |

```ts
interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}
```

## PageSectionEntry (discriminated union)

One entry per section type, discriminated by `type`. Rendered in array order by
`app/services/page.tsx`'s composition switch, matching `app/about/page.tsx`'s existing pattern.

```ts
type PageSectionEntry =
  | HeroSection
  | OverviewSection
  | ServiceDetailSection
  | FinalCtaSection;
```

### HeroSection — FR-001

| Field             | Type     | Validation |
|-------------------|----------|------------|
| type              | `"hero"` | —          |
| order             | number   | matches array position |
| eyebrow           | string   | non-empty |
| title             | string   | non-empty; plain text (SUPERSEDED 2026-07-15: no longer contains anchor-linked verbs — see research.md §9) |
| titleHighlight    | string   | non-empty; must be a substring of `title` — rendered in the orange/amber gradient accent, matching the reference's gradient-highlighted phrase exactly |
| subtitle          | string   | non-empty |
| primaryCtaLabel   | string   | non-empty |
| primaryCtaHref    | string   | `"/contact"` — both page CTAs share this destination (Clarifications, 2026-07-15) |
| secondaryCtaLabel | string   | non-empty |
| secondaryCtaHref  | string   | in-page anchor (`#service-...`) matching the first service detail section |

### OverviewSection — FR-002, FR-003

| Field | Type                     | Validation |
|-------|--------------------------|------------|
| type  | `"overview"`             | —          |
| order | number                   | matches array position |
| cards | `ServiceOverviewCard[]`  | exactly 3 (spec.md Assumptions: scope is exactly 3 services) |

```ts
interface ServiceOverviewCard {
  sequenceLabel: string;        // e.g. "Service 01"
  title: string;                // e.g. "UI/UX Design"
  description: string;          // one line
  image: SectionImage | null;   // FR-010: null renders a placeholder
  targetId: string;             // matches the ServiceDetailSection.anchorId it links to
  accentColor: ServiceAccent;   // drives hover border glow + "Explore" link color (research.md §7)
}

type ServiceAccent = "blue" | "orange" | "teal"; // maps to --color-blue-light / --color-orange / --color-teal-light
```

### ServiceDetailSection — FR-004, FR-005, FR-006

One entry per service (3 total). `supportingItems` is a discriminated union so the component can
tell an ordered approach from an unordered capability set without inferring it from array shape.

| Field           | Type                     | Validation |
|-----------------|--------------------------|------------|
| type            | `"serviceDetail"`       | —          |
| order           | number                   | matches array position |
| anchorId         | string                   | unique; target of the matching overview card's link (e.g. `"service-uiux"`) |
| accentColor      | `ServiceAccent`         | same value as the matching `ServiceOverviewCard.accentColor` |
| categoryLabel    | string                   | e.g. "Service 01 · UI/UX Design" |
| heading          | string                   | non-empty |
| description      | string                   | non-empty |
| image            | `SectionImage \| null`   | FR-010: null renders a placeholder |
| supportingItems  | `SupportingItemList`    | see below |

**Correction (2026-07-15, during implementation)**: an earlier draft of this model and spec.md's
FR-006 claimed the image position alternates left/right across the three sections. Re-reading
`raw-files/TechGrit Services.dc.html` closely shows the Engineering section's `order:2`/`order:1`
CSS exists specifically to *cancel out* its swapped DOM order — all three sections render
identically, text-left/image-right. There is no `imagePosition` field; every `ServiceDetailSection`
places its image to the right of the text on wide screens.

```ts
type SupportingItemList =
  | { kind: "orderedApproach"; items: ApproachStep[] }   // UI/UX Design only
  | { kind: "capabilityGrid"; items: CapabilityItem[] }; // Engineering, QA

interface ApproachStep {
  stepNumber: number;  // 1-6, in process order — order carries real information here
  title: string;
  description: string;
}

interface CapabilityItem {
  title: string;
  description: string;
  // deliberately no order/index field — this set has no meaningful sequence (plan.md UI Design Approach §3)
}
```

**Rendering correction (2026-07-15, exact-parity pass)**: `orderedApproach` items render as the
reference's actual 3-column grid with a plain `01`–`06` digit label per item (not the "connected
timeline with circular badges" an earlier pass invented) — see plan.md's 2026-07-15 revision note.
`capabilityGrid` items render with no heading/label above the grid at all for Engineering and QA
(the reference has no such label there; only the UI/UX section's "Our approach" label exists).

### FinalCtaSection — FR-007

| Field       | Type          | Validation |
|-------------|---------------|------------|
| type        | `"finalCta"` | —          |
| order       | number        | matches array position |
| eyebrow     | string        | non-empty |
| heading     | string        | non-empty |
| description | string        | non-empty |
| ctaLabel    | string        | non-empty |
| ctaHref     | string        | `"/contact"` — same destination as the hero CTA (Clarifications, 2026-07-15) |

## SectionImage (shared)

```ts
interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}
```

Used by `ServiceOverviewCard.image` and `ServiceDetailSection.image`. When `null`, the rendering
component shows a descriptive placeholder (FR-010) instead of a broken/empty layout.

## Mapping to components

| Section type      | Component                                             |
|--------------------|--------------------------------------------------------|
| `hero`             | `app/services/_components/services-hero.tsx`           |
| `overview`         | `app/services/_components/services-overview.tsx`       |
| `serviceDetail`    | `app/services/_components/service-detail-section.tsx` (rendered once per entry — 3 times total) |
| `finalCta`         | `app/services/_components/services-final-cta.tsx`      |

## Footer (out of scope)

Per research.md §2, the shared footer (`components/layout/footer-config.ts`) is not modified by
this feature — it renders one fixed link set on every route today, with no per-page mechanism to
hook into without changing `Footer.tsx` itself, which is outside this feature's boundary (FR-011).
