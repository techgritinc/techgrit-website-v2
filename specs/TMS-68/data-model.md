# Phase 1 Data Model: Case Studies Listing & Detail Pages

Source: spec.md Key Entities, reconciled against the exact `raw-files/TechGrit Case Studies.dc.html`
and `raw-files/TechGrit Case Study.dc.html` markup. Implemented as TypeScript types in
`app/case-studies/_data/types.ts` and populated in `app/case-studies/_data/case-studies-content.ts` —
no database/ORM involved (this feature has no persistence layer).

## `CaseStudyAccent`

```ts
type CaseStudyAccent =
  | "blue-light"   // #38bdf8 → var(--color-blue-light)
  | "blue"         // #0284C7 → var(--color-blue)
  | "orange"       // #E87722 → var(--color-orange)
  | "amber"        // #F59E0B → var(--color-amber)
  | "teal-light"   // #2dd4bf → var(--color-teal-light)
  | "yellow";      // #fbbf24 → var(--color-yellow)
```

A closed union, not a free `string` — every value must already exist as a named token (research.md
§6), so the type itself enforces Principle I at compile time.

## `Metric`

```ts
type Metric = {
  label: string;   // e.g. "lines migrated to .NET 10", "team members at peak"
  value: string;    // e.g. "2.5M", "15" — string, not number, to preserve formatting like "6 yrs"/"100%"
};
```

Used for: a featured card's headline stat (1), each grid card's metric (1 each), and a detail page's
metrics strip (3–4).

## `TeamRole`

```ts
type TeamRole = {
  role: string;    // e.g. "Solutions Architect", "Backend Engineer"
  count: number;   // headcount for this role
};
```

Sum of `count` across a case study's `team` array is its total team-size metric (e.g. 15).

## `IntegrationChip`

```ts
type IntegrationChip = {
  label: string;   // e.g. "Amazon S3", "RDS Database", "Office Calendar", "Google Calendar"
};
```

Rendered as the 4 small chips beneath the architecture flow diagram.

## `ArchitectureFlow`

```ts
type ArchitectureFlow = {
  nodes: [string, string, string];  // e.g. ["Next.js Web App", "AWS ECS", "NestJS API"]
  integrations: IntegrationChip[];
};
```

Drives the 3-node flow diagram inside the "The architecture" narrative section.

## `NarrativeSection`

```ts
type NarrativeSection =
  | { id: "background"; heading: string; paragraphs: string[] }
  | { id: "challenge"; heading: string; intro: string; painPoints: { title: string; description: string }[] }
  | { id: "architecture"; heading: string; intro: string; flow: ArchitectureFlow }
  | { id: "solutions"; heading: string; paragraphs: string[] };
```

A discriminated union on `id`, one entry per anchor (`#background`, `#challenge`, `#architecture`,
`#solutions`) — matches spec.md FR-007's four required narrative sections exactly, and the `id`
field doubles as the in-page anchor slug consumed by `case-study-narrative.tsx`.

## `CaseStudyNarrative`

```ts
type CaseStudyNarrative = {
  metrics: Metric[];                 // 3-4 entries for the detail page's metric strip
  sections: NarrativeSection[];      // exactly the 4 NarrativeSection variants, in order
  team: TeamRole[];                  // role/headcount rows for the team panel
};
```

**Placeholder-content mechanism (FR-012/Assumptions)**: exactly one `CaseStudyNarrative` object —
`CANONICAL_NARRATIVE` — is authored from the fully-narrated reference file and referenced by every
`CaseStudy.narrative` field below. This makes the "every case study currently shares one placeholder
narrative" behavior explicit and swap-safe: replacing static content with a dynamic source later means
giving each `CaseStudy` record its own distinct `narrative` value, with zero change to any component
that consumes it.

## `CaseStudy`

```ts
type CaseStudy = {
  slug: string;                 // unique identifier, used in the [slug] route segment
  title: string;                // full detail-page title (may differ in length from the card title)
  cardTitle: string;            // shorter title shown on list/related cards
  summary: string;               // one-paragraph summary (detail page hero)
  description: string;           // short one-line description (list/grid/related cards)
  industry: string;               // e.g. "FinTech", "Construction", "AI Enablement"
  category: string;               // detail-page hero badge text, e.g. "Enterprise SaaS"
  accent: CaseStudyAccent;
  featured: boolean;               // exactly one CaseStudy in the array has featured: true
  publishedDate: string;           // ISO date string, formatted for display (e.g. "26 Nov, 2024")
  headlineMetric: Metric;          // featured/grid card's single displayed stat
  narrative: CaseStudyNarrative;   // always CANONICAL_NARRATIVE for this static phase
};
```

**Validation rules** (enforced by content authoring, not runtime validation — no user input reaches
this data):
- Exactly one record has `featured: true` (spec.md Assumptions — "Exactly one case study is
  'featured' ... at any time").
- `slug` values are unique across the array (required for `generateStaticParams`/route resolution and
  FR-016's not-found behavior for any slug not present).
- `accent` must be one of the 6 `CaseStudyAccent` values — enforced by the TypeScript union.

## Relationships

- `CaseStudy.narrative` → `CaseStudyNarrative` (currently 6:1, all pointing at `CANONICAL_NARRATIVE`;
  becomes 1:1 once real per-case-study narratives exist).
- "Related case studies" (spec.md FR-009, Assumptions) is a derived view, not a stored reference:
  given the current `CaseStudy.slug`, select 3 other records from the full array (excluding the
  current one — research.md §10), in array order. No `relatedSlugs` field is stored on `CaseStudy`
  itself, since the exclude-self + take-3 rule is fully determined by the existing array.

## Content module shape

```ts
// app/case-studies/_data/case-studies-content.ts
export const CANONICAL_NARRATIVE: CaseStudyNarrative = { /* from the fully-narrated reference */ };
export const CASE_STUDIES: CaseStudy[] = [ /* 6 records, one with featured: true */ ];
```

`app/case-studies/page.tsx` derives `featuredCaseStudy = CASE_STUDIES.find(c => c.featured)` and
`gridCaseStudies = CASE_STUDIES.filter(c => !c.featured)`.
`app/case-studies/[slug]/page.tsx` derives `caseStudy = CASE_STUDIES.find(c => c.slug === params.slug)`
— calling `notFound()` when no match exists (FR-016) — and
`related = CASE_STUDIES.filter(c => c.slug !== caseStudy.slug).slice(0, 3)` (research.md §10).
