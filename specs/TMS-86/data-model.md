# Data Model: AI-Accelerated Modernization Page (TMS-86)

All entities below are **static TypeScript data**, defined in `app/what-we-do/ai-modernization/_data/types.ts` and populated verbatim (per FR-001) in `app/what-we-do/ai-modernization/_data/ai-modernization-content.ts`. Nothing here is fetched, persisted, or mutated at runtime (FR-008). Every list item carries a stable `order`/`id` field for `.map()` keys, per Constitution Principle III's "stable identity for repeated content" rule — never keyed on display text.

## Page-local entities (`app/what-we-do/ai-modernization/_data/types.ts`)

### `HeroSection`
Maps to spec.md's hero acceptance criteria + FR-004. This page's `page.tsx` renders this section by passing its fields as props straight into the shared `components/ui/Hero.tsx` (per FR-009 — see "New shared `components/ui/` primitive contracts" below), the same way `FinalCtaSection` already maps onto `components/ui/final-cta.tsx`.

| Field | Type | Notes |
|---|---|---|
| `type` | `"hero"` | discriminant |
| `crumbs` | `{ id: string; label: string; href?: string }[]` | "What We Do" (linked) → "AI-Accelerated Modernization" (current, no href) |
| `eyebrow` | `string` | "Service 01 · Modernization" |
| `title` | `string` | full headline text |
| `titleHighlight` | `string` | exact substring rendered in the orange→amber gradient span (`"AI-assisted engineering."`) |
| `subtitle` | `string` | supporting paragraph |
| `primaryCtaLabel` / `primaryCtaLink` | `string` | "Schedule a Modernization Assessment" → `/contact` |
| `secondaryCtaLabel` / `secondaryCtaLink` | `string` | "See capabilities" → `#capabilities` |
| `image` | `SectionImage` | the replacement hero-card image (FR-004) — `dm-tech-debt.png` per research.md §5; composed into `Hero`'s `media` slot at the `page.tsx` call site, not inside `Hero` itself |
| `frameworksCaption` | `string` | retained "PRISM™ · OrbitAI™ frameworks in every engagement" line — passed as `Hero`'s `mediaCaption` |

### `IntroSection` ("Modernization is more than migration")

Renders via the shared `components/ui/ContentBlock.tsx` (per FR-009), the same mapping pattern as `HeroSection`/`Hero` above.

| Field | Type | Notes |
|---|---|---|
| `type` | `"intro"` | discriminant |
| `eyebrow`, `title`, `description` | `string` | left column |
| `blockersLabel` | `string` | "Common modernization blockers" |
| `blockers` | `{ id: string; label: string }[]` | 6 chip items — `id` (not array index) is the `.map()` key per Constitution Principle III's stable-identity rule, carried through into `ContentBlock`'s `chips` prop rather than flattened to bare strings |

### `ModernizationCapability` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6, also renders as the zero-padded "01 · Assess" label |
| `stepLabel` | `string` | "Assess", "Refactor", "Migrate", "Transform", "Platform", "Data" |
| `title` | `string` | e.g. "Legacy Application Assessment" |
| `lede` | `string` | short lead paragraph |
| `bullets` | `string[]` | exactly 4 per capability |

`CapabilitiesSection { type: "capabilities"; eyebrow; title; description; capabilities: ModernizationCapability[] }` — exactly 6.

### `LifecycleStage` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–5 |
| `title` | `string` | "Assess", "Analyze", "Modernize", "Validate", "Optimize" |
| `description` | `string` | |

`LifecycleSection { type: "lifecycle"; eyebrow; title; stages: LifecycleStage[] }` — exactly 5. Rendered via the new shared `components/ui/ProcessSteps.tsx`.

### `ModernizationStrategy` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6 |
| `name` | `string` | "Rehost", "Replatform", "Refactor", "Rearchitect", "Rebuild", "Replace" |
| `description` | `string` | |

`StrategiesSection { type: "strategies"; eyebrow; title; strategies: ModernizationStrategy[] }` — exactly 6. Rendered as page-local markup (research.md §3 — no shared abstraction; too simple to justify one).

### `ValuePropositionTile` (spec.md Key Entity: "Why AI-assisted modernization")

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6 |
| `icon` | `IconName` (reference into `components/ui/icons.tsx`) | |
| `title` | `string` | e.g. "Faster Application Discovery" |
| `description` | `string` | |

`WhySection { type: "why"; eyebrow; title; tiles: ValuePropositionTile[] }` — exactly 6. Rendered via `GlassCard` `reimagineWhy` variant, or `components/ui/IconTile.tsx` if the icon-box sizing doesn't tolerance-fit (research.md §3).

### `IndustryCard` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–3 |
| `icon` | `IconName` | teal/orange/amber tinted per reference |
| `name` | `string` | "HealthTech", "FinTech", "Construction Tech" |
| `description` | `string` | |
| `href` | `string` | link to that industry's page |

`IndustriesSection { type: "industries"; eyebrow; title; industries: IndustryCard[] }` — exactly 3. Rendered via `GlassCard` `industry` variant.

### `FaqItem` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–5 |
| `question` | `string` | |
| `answer` | `string` | |
| `defaultOpen` | `boolean` | true only for item 1, per reference's `<details open>` |

`FaqSection { type: "faq"; eyebrow; title; items: FaqItem[] }` — exactly 5. Rendered via the new shared `components/ui/Faq.tsx` — independent expand/collapse state per FR-005 comes from native `<details>`, no React state (FR-008).

### `RelatedServiceLink` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6 |
| `icon` | `IconName` | |
| `name` | `string` | "Software Product Engineering", etc. |
| `description` | `string` | |
| `href` | `string` | that service's route (may point to a not-yet-built sibling route, per spec.md Assumptions) |

`RelatedServicesSection { type: "related"; title; seeAllLabel; seeAllHref; links: RelatedServiceLink[] }` — exactly 6. Rendered via `components/ui/IconTile.tsx`.

### `FinalCtaSection`
Maps directly onto the existing `components/ui/final-cta.tsx`'s `FinalCtaContent` shape — no new type needed; `page.tsx` passes this section's fields straight into `<FinalCta section={...} />` exactly as `app/construction/page.tsx` already does.

### `HeroStat` (spec.md Key Entity — retained for content parity, not rendered as a separate tile)

Kept only as source-of-truth comments/JSDoc alongside the hero image field (`3× faster / ~40% cheaper / 80%+ coverage / <1% downtime`), since FR-004 requires this data be represented by the image, not duplicated as text. Not a rendered entity.

### `AiModernizationSection` (discriminated union)

```
type AiModernizationSection =
  | HeroSection | IntroSection | CapabilitiesSection | LifecycleSection
  | StrategiesSection | WhySection | IndustriesSection | FaqSection
  | RelatedServicesSection | FinalCtaSection;
```

### `AiModernizationPageContent`

```
interface AiModernizationPageContent {
  seo: PageSeo;              // reuse construction's PageSeo shape
  sections: AiModernizationSection[];  // in reference order, per FR-003
}
```

## New shared `components/ui/` primitive contracts

These are prop-shape sketches for planning purposes — exact implementation is a `/speckit.tasks` + `/speckit.implement` concern, not fixed here.

### `Hero`
```
{
  crumbs: { id: string; label: string; href?: string }[];
  eyebrow: string;
  title: string;
  titleHighlight: string;      // exact substring of `title` rendered in the gradient span
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  media: ReactNode;             // right-card main content — this page: an <Image>; other pages: a stat grid, etc.
  mediaCaption?: string;        // bottom caption line inside the card (e.g. "PRISM™ · OrbitAI™ frameworks...")
}
```
Owns the card wrapper chrome (padding, radius, gradient background, decorative blurred-orb corner, bottom-divider caption row) generically — confirmed identical across every sibling "What We Do" prototype inspected (research.md §4) — with `media`/`mediaCaption` as the only two content slots. No page-specific copy compiled into the component itself.

### `ContentBlock`
```
{
  eyebrow: string;
  title: string;
  description: string;
  chipsLabel: string;
  chips: { id: string; label: string }[];  // stable `id`, not array index, per Constitution Principle III
}
```
Renders the confirmed-identical two-column shape (research.md §4): left eyebrow/title/description, right chips-label + wrapping chip-pill list. A typed `chips` array, not an unconstrained `ReactNode` slot, since the sibling prototypes confirm this exact shape recurs — always a label plus a chip list, never something else.

### `ProcessSteps`
```
{ steps: { order: number; title: string; description: string }[] }
```
No page-specific copy inside the component; caller supplies the eyebrow/title of the containing section separately (matches `SectionEyebrow` + `<h2>` composition already used by every other section).

### `IconTile`
```
{
  icon: ReactNode;           // pre-rendered icon element (RSC-safe, matches PhaseShowcase's existing convention)
  title: string;
  description: string;
  href?: string;             // renders as a link wrapper when present (related-service cards), plain div otherwise (why-tiles)
  size?: "compact" | "default"; // compact = related-service card type scale, default = why-tile type scale
}
```

### `Faq`
```
{ items: { id: string; question: string; answer: string; defaultOpen?: boolean }[] }
```
Renders a `<details>`/`<summary>` per item; no client component needed.

### `Outcome` (FR-012 — built, unused on this page)
```
{ heading: string; description: string; className?: string }
```

## Validation rules (from Functional Requirements)

- `sections` array order is fixed at exactly the 10-section sequence in FR-003 — not independently reorderable per page instance (this is a static content module, not a CMS-editable list).
- `capabilities.length === 6`, `stages.length === 5`, `strategies.length === 6`, `tiles.length === 6`, `industries.length === 3`, `items.length === 5` (FAQ), `links.length === 6` (related services) — enforced by matching the reference 1:1, not by runtime validation (no schema/validation layer for static local data, consistent with every other route's `_data` module in this repo).
- Exactly one `FaqItem.defaultOpen === true` (item 1), matching the reference's single `<details open>`.
- `HeroSection.titleHighlight` must be an exact substring of `HeroSection.title` (mirrors `construction`'s existing `titleHighlight` convention) so the gradient span can be derived by string split rather than hand-authored JSX with embedded markup.
