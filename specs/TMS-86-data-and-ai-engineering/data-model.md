# Data Model: Data & AI Engineering Page

All types below live in `app/what-we-do/data-ai-engineering/_data/types.ts` (page-local, not shared — see research.md §2 for why this stays a plain static module rather than a CMS-shaped type set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface DataAiEngineeringPageContent {
  seo: PageSeo;
  sections: DataAiEngineeringSection[];
}

export type DataAiEngineeringSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | WhySection
  | IndustriesSection
  | FaqSection
  | RelatedServicesSection
  | FinalCtaSection;
```

## Hero

```ts
export interface HeroImage {
  src: string;   // "/samples/svc-qa.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 03 · Data & AI"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "intelligence & agentic action."
  subtitle: string;
  primaryCtaLabel: string;      // "Schedule an AI Readiness Assessment"
  primaryCtaLink: string;       // "/contact"
  secondaryCtaLabel?: string;   // "See capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
  mediaCaption: string;         // "AI IMPACT™ · OrbitAI™ · PRISM™ frameworks" (Clarifications: caption retained, unlike the Software Product Engineering sibling)
}
```

No `Hero Stat` fields are modeled as page content — per Clarifications, the four original stat tiles (Pipelines, Agents, Governance, Time to value) are not rendered at all; they exist only as the sourcing rationale for the replacement image and are not part of the data shape.

## Intro / "Where AI programs stall"

```ts
export interface Blocker {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "Data & AI that pay for themselves"
  title: string;
  description: string;
  chipsLabel: string;     // "Where AI programs stall"
  chips: Blocker[];       // exactly 6
}
```

## Capabilities

```ts
export interface CapabilityBullet {
  id: string;
  text: string;
}

export interface Capability {
  id: string;
  order: number;
  stepLabel: string;         // "01 · Strategy" … "06 · Enable"
  title: string;              // "Data Strategy & AI Readiness", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 4 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "End-to-end data & AI"
  title: string;      // "Six capabilities. One AI-first engine." (corrected from reference's "Five" — Clarifications)
  description: string;
  capabilities: Capability[]; // exactly 6, rendered via GlassCard variant="serviceCapability"
}
```

## Discover. Build. Enable. Govern. Optimize.

```ts
export interface LifecycleStage {
  order: number;
  title: string;       // "Discover" … "Optimize"
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;   // "Our data & AI journey"
  title: string;     // "Discover. Build. Enable. Govern. Optimize."
  stages: LifecycleStage[]; // exactly 5 — passed directly to ProcessSteps
}
```

## Why AI-first data engineering

```ts
export type WhyIconKey =
  | "dataQuality"     // CheckCircleIcon
  | "aiAdoption"       // LightningIcon
  | "automation"        // NetworkNodeIcon
  | "decisions"          // TrendingUpIcon
  | "scale"               // ShieldIcon
  | "frameworks";          // AwardIcon

export interface ValuePropositionTile {
  id: string;
  order: number;
  iconKey: WhyIconKey;
  title: string;
  description: string;
}

export interface WhySection {
  type: "why";
  order: number;
  eyebrow: string;  // "Why AI-first data engineering"
  title: string;
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component
}
```

## Industries we empower

```ts
export type IndustryIconKey = "healthcare" | "fintech" | "construction";

export interface IndustryCard {
  id: string;
  order: number;
  iconKey: IndustryIconKey;
  name: string;          // "HealthTech" | "FinTech" | "Construction Tech"
  description: string;
  href: string;           // linked to that industry's page
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;  // "Industries we empower"
  title: string;
  industries: IndustryCard[]; // exactly 3, rendered via GlassCard variant="serviceCapability" on a 4-column desktop track (research.md §4)
}
```

## FAQ

```ts
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean; // true only for the first item
}

export interface FaqSection {
  type: "faq";
  order: number;
  eyebrow: string;  // "Frequently asked"
  title: string;    // "What data & AI leaders ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "modernization"  // SvcModernizationIcon
  | "engineering"      // EradicateDebtIcon (precedent: ai-modernization-related.tsx's "codeArrows" key — research.md §4)
  | "platform"          // SvcPlatformIcon
  | "managed"            // SvcManagedIcon
  | "strategy"            // SvcStrategyIcon
  | "startups";            // SvcStartupsIcon

export interface RelatedServiceLink {
  id: string;
  order: number;
  iconKey: RelatedServiceIconKey;
  name: string;
  description: string;
  href: string;
}

export interface RelatedServicesSection {
  type: "related";
  order: number;
  title: string;         // "Related services"
  seeAllLabel: string;   // "See all services"
  seeAllHref: string;    // "/services"
  links: RelatedServiceLink[]; // exactly 6, rendered via IconTile size="compact"
}
```

## Closing CTA

```ts
export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;             // "Ready to turn data into advantage?"
  title: string;               // "Whether it's a data platform, embedded AI, or agentic workflows — we've shipped it."
  description: string;
  primaryCtaLabel: string;     // "Schedule an AI Readiness Assessment"
  primaryCtaLink: string;     // "/contact"
  secondaryCtaLabel?: string;  // "Book a Discovery Sprint"
  secondaryCtaLink?: string;   // "/frameworks#discovery" (mirrors both siblings' Discovery Sprint destination convention — see quickstart.md)
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, capabilities, lifecycle, why, industries, faq, related, finalCta (FR-003).
- `capabilities` MUST contain exactly 6 items; each MUST have exactly 4 bullets (FR-001/FR-006, reference verbatim); the section `title` reads "Six capabilities. One AI-first engine." — corrected from the reference's literal "Five" (FR-001, FR-003, Clarifications).
- `stages` MUST contain exactly 5 items (FR-001).
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `industries` MUST contain exactly 3 items despite the 4-column grid track (FR-001, Edge Cases).
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items, excluding this page's own service and including both siblings' (FR-001).
- `hero.image` MUST resolve to `/samples/svc-qa.png`; `hero.mediaCaption` MUST be present (not omitted) (FR-004, Clarifications).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
