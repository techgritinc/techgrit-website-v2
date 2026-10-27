# Data Model: Discovery Sprints Page

All content is static, authored directly in
`app/how-we-work/discovery-sprints/_data/discovery-sprints-content.ts`, typed by
`app/how-we-work/discovery-sprints/_data/types.ts`. No persistence, no API, no CMS — per FR-016.

Every list-rendered entity carries a stable `id`/`slug`-style field for React `key`s, per
Constitution Principle III's "Stable identity for repeated content" rule — never keyed on display
text.

## HeroContent

| Field | Type | Notes |
|---|---|---|
| `eyebrow` | `string` | "Framework 03 · Phase Zero" |
| `title` | `string` | Full H1 text |
| `titleHighlight` | `string` | Exact substring rendered with the gradient span (`Hero`'s existing `splitTitleHighlight` logic) |
| `subtitle` | `string` | Supporting paragraph |
| `primaryCta` | `{ label: string; href: string }` | → `/contact` |
| `secondaryCta` | `{ label: string; href: string }` | "See what's included" → `#capabilities` |
| `image` | `{ url: string; alt: string }` | Passed into `MediaSlot`; `url` may be `null`/absent → renders `MediaSlot`'s "Coming soon" fallback until a real asset is supplied |

## IntroContent (FR-004)

| Field | Type | Notes |
|---|---|---|
| `eyebrow` | `string` | "Why Phase Zero changes everything" |
| `title` | `string` | |
| `description` | `string` | |
| `chipsLabel` | `string` | "Questions it answers" |
| `chips` | `{ id: string; label: string }[]` | 6 entries |

## PhaseZeroContent (FR-005, new section)

| Field | Type | Notes |
|---|---|---|
| `eyebrow` | `string` | |
| `title` | `string` | "What Is a Phase Zero Assessment?" |
| `description` | `string` | |
| `card` | `{ title: string; description: string }` | Rendered via `Outcome` inside a `GlassCard` |

## CapabilityCard (FR-006, "What We Cover")

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key |
| `categoryLabel` | `string` | e.g. "01 · Business Discovery" |
| `title` | `string` | |
| `subtitle` | `string` | |
| `features` | `{ id: string; text: string }[]` | 5 per card |

Section wrapper: `{ eyebrow, title, subtitle, cards: CapabilityCard[] }` (exactly 3 cards).

## DeliverableCard (FR-007, "What You'll Receive")

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key |
| `number` | `string` | "01"–"07", display-only label (not used as key) |
| `title` | `string` | |
| `description` | `string` | |

Section wrapper: `{ eyebrow, title, subtitle, deliverables: DeliverableCard[] }` (exactly 7).

## LifecycleStep (FR-010, "How It Works")

Reuses `ProcessStep` from `components/ui/ProcessSteps.tsx` (`{ order: number; title: string;
description: string }`) — no new type needed. Section wrapper: `{ eyebrow, title, steps:
ProcessStep[] }` (exactly 4).

## WhyContent (FR-008, "Why TechGrit Discovery Sprints")

| Field | Type | Notes |
|---|---|---|
| `eyebrow` | `string` | |
| `title` | `string` | |
| `description` | `string` | |

## ExecuteTile (FR-009, "Documentation you can execute")

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key |
| `icon` | `IconName` (or inline `ReactNode` factory) | Matches `IconTile`'s `icon: ReactNode` prop |
| `title` | `string` | |
| `description` | `string` | |

Section wrapper: `{ eyebrow, title, description, tiles: ExecuteTile[] }` (exactly 6).

## AudienceCard (FR-011, "Who It's For")

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key |
| `icon` | `ReactNode` factory | |
| `title` | `string` | |
| `description` | `string` | |

Section wrapper: `{ eyebrow, title, audiences: AudienceCard[] }` (exactly 4).

## FaqItem (FR-012)

Reuses `FaqItemContent` from `components/ui/Faq.tsx` (`{ id, question, answer, defaultOpen? }`) —
no new type needed. 5 entries, first one `defaultOpen: true` (matches reference's `<details open>`
on the first item).

## ClosingCtaContent (FR-014)

Reuses `FinalCtaContent` from `components/ui/final-cta.tsx` (`{ eyebrow, title, description,
ctaLabel, ctaLink, secondaryCta? }`) — no new type needed. Both `ctaLink`/`secondaryCta.link` →
`/contact`.

## Page-level content shape

```ts
export interface DiscoverySprintsContent {
  hero: HeroContent;
  intro: IntroContent;
  phaseZero: PhaseZeroContent;
  capabilities: { eyebrow: string; title: string; subtitle: string; cards: CapabilityCard[] };
  deliverables: { eyebrow: string; title: string; subtitle: string; deliverables: DeliverableCard[] };
  lifecycle: { eyebrow: string; title: string; steps: ProcessStep[] };
  why: WhyContent;
  execute: { eyebrow: string; title: string; description: string; tiles: ExecuteTile[] };
  whoFor: { eyebrow: string; title: string; audiences: AudienceCard[] };
  faq: { eyebrow: string; title: string; items: FaqItemContent[] };
  closingCta: FinalCtaContent;
}
```

No state transitions, no lifecycle, no identity/uniqueness rules beyond the stable-`id` rule above
— this is entirely static display content.
