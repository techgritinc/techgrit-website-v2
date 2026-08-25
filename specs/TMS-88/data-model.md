# Data Model: Orbit AI Ecosystem Page (TMS-88)

All entities below are **static TypeScript data**, defined in `app/how-we-work/orbit-ai-ecosystem/_data/types.ts` and populated in `app/how-we-work/orbit-ai-ecosystem/_data/orbit-ai-content.ts` (per research.md §2 — deliberately not read from the live CMS). Nothing here is fetched, persisted, or mutated at runtime. Every list item carries a stable `order`/`id` field for `.map()` keys, per Constitution Principle III's "stable identity for repeated content" rule.

## Page-local entities (`app/how-we-work/orbit-ai-ecosystem/_data/types.ts`)

### `HeroSection`

Maps to spec.md's hero acceptance criteria + FR-003. Rendered by passing its fields as props into `components/ui/Hero.tsx`.

| Field | Type | Notes |
|---|---|---|
| `type` | `"hero"` | discriminant |
| `crumbs` | `{ id: string; label: string; href?: string }[]` | "How We Work" (linked) → "Orbit AI Ecosystem" (current, no href) |
| `eyebrow` | `string` | "Framework 01 · OrbitAI™" |
| `title` | `string` | full headline text |
| `titleHighlight` | `string` | exact substring rendered via the gradient span (`"transformation that works."`) |
| `subtitle` | `string` | supporting paragraph |
| `primaryCtaLabel` / `primaryCtaLink` | `string` | "Talk to an AI Engineering Expert" → `/contact` |
| `secondaryCtaLabel` / `secondaryCtaLink` | `string` | "See how it works" → `#capabilities` |
| `image` | `SectionImage` | `dm-copilot.png` (FR-003, Clarification Q5) — composed into `Hero`'s `media` slot, `mediaFill` |

### `IntroSection` ("From AI opportunity to business impact")

Renders via `components/ui/ContentBlock.tsx` with `chips`/`chipsLabel` omitted (research.md §4), producing the FR-004 centered layout.

| Field | Type | Notes |
|---|---|---|
| `type` | `"intro"` | discriminant |
| `eyebrow`, `title`, `description` | `string` | the only fields used — no `chips`/`chipsLabel` on this occurrence |

### `FrameworkLayer` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | stable key |
| `order` | `number` | 1–5 |
| `categoryLabel` | `string` | e.g. "01 · AI IMPACT" |
| `title` | `string` | e.g. "Identify where AI can create value" |
| `subtitle` | `string` | short lead paragraph |
| `features` | `{ id: string; text: string }[]` | exactly 4 per layer |

`CapabilitiesSection { type: "capabilities"; eyebrow; title; description; layers: FrameworkLayer[] }` — exactly 5, rendered via `GlassCard` `serviceCapability` variant (research.md §3).

### `LifecycleStep` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–5 |
| `title` | `string` | "Assess", "Prioritize", "Architect", "Build", "Optimize" |
| `description` | `string` | |

`LifecycleSection { type: "lifecycle"; eyebrow; title; steps: LifecycleStep[]; extraCard: { label: string; description: string } }` — exactly 5 steps rendered via `components/ui/ProcessSteps.tsx`, plus `extraCard` (Clarification Q1 — label "One Integrated Path", description "Every stage connects directly into the next, with no handoff gaps between steps.") rendered via `components/ui/Outcome.tsx` below the step grid.

### `EngineeringTile` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6 |
| `icon` | `string` | icon key resolved to an `icons.tsx` export at render time (research.md §8) |
| `title` | `string` | "One Connected Approach", "AI-Assisted, Human-Validated", "Built for Brownfield", "Flexible Entry Points", "Designed for Continuous Value", "Proven at Enterprise Scale" |
| `description` | `string` | |

`EngineeringSection { type: "engineering"; eyebrow; title; tiles: EngineeringTile[]; extraCard: { label: string; description: string } }` — exactly 6 tiles rendered via `components/ui/IconTile.tsx`, plus `extraCard` (Clarification Q2 — label "Engineering Standards", description "Every engagement is held to the same standard: code you'd be proud to hand to your own team.") rendered via `components/ui/Outcome.tsx` below the tile grid. This same tile content satisfies both FR-007 and FR-011 (see spec.md Assumptions — one section, not two).

### `AchievementCard` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–6 |
| `title` | `string` | "Identify High-Value AI Opportunities", "Understand What You Already Have", "Build a Modernization Roadmap", "Accelerate Engineering", "Modernize With Confidence", "Continuously Improve" |
| `description` | `string` | requester-supplied verbatim (Clarification Q4) |

`AchieveSection { type: "achieve"; title: string; cards: AchievementCard[] }` — exactly 6, rendered via `GlassCard` `reimagineWhy` variant, `GlassCardIcon` omitted (no icon field on this entity, per FR-008's confirmed content — no icon was supplied).

### `UnderstandingCard` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–4 |
| `icon` | `string` | icon key |
| `title` | `string` | "Discover", "Define", "Design", "Deliver" |
| `description` | `string` | Clarification Q3 — reframes each 4D-methodology stage toward "understanding → working software" |

`UnderstandingSection { type: "understanding"; title: string; cards: UnderstandingCard[] }` — exactly 4, rendered via `components/ui/IconTile.tsx`.

### `AudienceSegmentCard` (spec.md Key Entity)

| Field | Type | Notes |
|---|---|---|
| `order` | `number` | 1–4 |
| `icon` | `string` | icon key |
| `title` | `string` | "Legacy-heavy enterprises", "Cloud migration programs", "AI-first transformations", "Regulated industries" |
| `description` | `string` | |

`WhoWeHelpSection { type: "whoWeHelp"; eyebrow; title; cards: AudienceSegmentCard[] }` — exactly 4, rendered via `GlassCard` `industry` variant (FR-010, verbatim from the reference).

### `FinalCtaSection`

Renders via `components/ui/final-cta.tsx`, the same mapping pattern `construction/page.tsx` and `ai-modernization/page.tsx` already use.

| Field | Type | Notes |
|---|---|---|
| `type` | `"finalCta"` | discriminant |
| `eyebrow`, `title`, `description` | `string` | closing CTA copy, verbatim from the reference |
| `primaryCtaLabel` / `primaryCtaLink` | `string` | "Talk to an AI Engineering Expert" → `/contact` |
| `secondaryCtaLabel` / `secondaryCtaLink` | `string` | "Book a Discovery Sprint" → sibling "How We Work" route (FR-014) |

### `OrbitAiSection` (discriminated union)

```ts
type OrbitAiSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | EngineeringSection
  | AchieveSection
  | UnderstandingSection
  | WhoWeHelpSection
  | FinalCtaSection;
```

No `FaqSection` or `RelatedServicesSection` variant exists in this union — both were explicitly descoped (see spec.md's later scope-trim). `page.tsx` renders `orbitAiContent.sections.map(...)` through a `switch (section.type)`, identical in shape to `app/construction/page.tsx` and `app/what-we-do/ai-modernization/_data/types.ts`'s `AiModernizationSection` union.
