# Data Model: Platform Engineering Page

All types below live in `app/what-we-do/platform-engineering/_data/types.ts` (page-local, not shared — see research.md §2 for why this stays a plain static module rather than a CMS-shaped type set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface PlatformEngineeringPageContent {
  seo: PageSeo;
  sections: PlatformEngineeringSection[];
}

export type PlatformEngineeringSection =
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
  src: string;   // "/samples/svc-uiux.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 04 · Platform Engineering"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "accelerate software delivery."
  subtitle: string;
  primaryCtaLabel: string;      // "Talk to a Platform Engineering Expert"
  primaryCtaLink: string;       // "/contact"
  secondaryCtaLabel?: string;   // "See capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
  // No `mediaCaption` field — per Clarifications Q4, this page drops the caption line
  // (matching the Software Product Engineering sibling's treatment).
}
```

No `Hero Stat` fields are modeled as page content — per Clarifications, the four original stat tiles (Deploy freq, MTTR, Uptime, FinOps) are not rendered at all; they exist only as the sourcing rationale for the replacement image and are not part of the data shape.

## Intro / "Stop solving the same infrastructure problem in every team."

```ts
export interface Signal {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "Engineering platforms for continuous innovation"
  title: string;
  description: string;
  chipsLabel: string;     // "Signals you need a platform"
  chips: Signal[];        // exactly 6
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
  stepLabel: string;          // "01 · Strategy" … "06 · Security"
  title: string;               // "Platform Strategy & Architecture", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 4 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "Our platform capabilities"
  title: string;      // "Six pillars. One reliable foundation." (matches the reference verbatim — no numeral correction needed)
  description: string;
  capabilities: Capability[]; // exactly 6, rendered via GlassCard variant="serviceCapability"
}
```

## Assess. Design. Build. Secure. Optimize.

```ts
export interface LifecycleStage {
  order: number;
  title: string;       // "Assess" … "Optimize"
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;   // "Platform engineering journey"
  title: string;     // "Assess. Design. Build. Secure. Optimize."
  stages: LifecycleStage[]; // exactly 5 — passed directly to ProcessSteps
}
```

## Why platform engineering matters

```ts
export type WhyIconKey =
  | "productivity"    // LightningIcon
  | "delivery"          // EradicateDebtIcon
  | "reliability"         // ShieldIcon
  | "standardize"          // LayoutDashboardIcon
  | "scale"                 // InfiniteScalabilityIcon
  | "aiOps";                 // AwardIcon

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
  eyebrow: string;  // "Why platform engineering matters"
  title: string;
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component
}
```

## Platforms for every stage of growth

```ts
export type IndustryIconKey = "saas" | "enterprise" | "healthcare" | "fintech";

export interface IndustryCard {
  id: string;
  order: number;
  iconKey: IndustryIconKey;
  name: string;          // "SaaS Platforms" | "Enterprise Apps" | "HealthTech" | "FinTech"
  description: string;
  href?: string;          // present only for HealthTech and FinTech (Clarifications Q3) — absent for SaaS Platforms/Enterprise Apps
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;  // "Platforms for every stage of growth"
  title: string;    // "SaaS to enterprise — sized to your team."
  industries: IndustryCard[]; // exactly 4, rendered via GlassCard variant="serviceCapability" on a 4-column desktop track; the two without `href` render as plain (non-clickable) cards
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
  title: string;    // "What platform leaders ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "modernization"  // SvcModernizationIcon
  | "engineering"      // EradicateDebtIcon (precedent: both prior siblings' related-services lists — research.md §4)
  | "dataAi"            // SvcDataAiIcon
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
  eyebrow: string;             // "Ready to build a platform that powers innovation?"
  title: string;               // "Cloud-native. Secure. Loved by developers."
  description: string;
  primaryCtaLabel: string;     // "Talk to a Platform Expert"
  primaryCtaLink: string;     // "/contact"
  secondaryCtaLabel?: string;  // "Book a Discovery Sprint"
  secondaryCtaLink?: string;   // "/frameworks#discovery" (mirrors every sibling's Discovery Sprint destination convention — see quickstart.md)
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, capabilities, lifecycle, why, industries, faq, related, finalCta (FR-003).
- `capabilities` MUST contain exactly 6 items; each MUST have exactly 4 bullets (FR-001/FR-006, reference verbatim); the section `title` reads "Six pillars. One reliable foundation." verbatim (FR-001, FR-003).
- `stages` MUST contain exactly 5 items (FR-001).
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `industries` MUST contain exactly 4 items; exactly 2 (HealthTech, FinTech) MUST carry a non-empty `href`; the other 2 (SaaS Platforms, Enterprise Apps) MUST NOT carry an `href` (FR-001, FR-005, Clarifications Q3).
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items, excluding this page's own service and including all three siblings' (FR-001).
- `hero.image` MUST resolve to `/samples/svc-uiux.png`; `hero` MUST NOT include a `mediaCaption` value (FR-004, Clarifications Q4).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
