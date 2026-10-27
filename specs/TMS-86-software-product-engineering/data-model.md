# Data Model: Software Product Engineering Page

All types below live in `app/what-we-do/software-product-engineering/_data/types.ts` (page-local, not shared — see research.md §2 for why this stays a plain static module rather than a CMS-shaped type set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SoftwareProductEngineeringPageContent {
  seo: PageSeo;
  sections: SoftwareProductEngineeringSection[];
}

export type SoftwareProductEngineeringSection =
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
  src: string;   // "/samples/svc-eng.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 02 · Product Engineering"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "modern enterprises."
  subtitle: string;
  primaryCtaLabel: string;      // "Talk to a Product Engineering Expert"
  primaryCtaLink: string;       // "/contact"
  secondaryCtaLabel?: string;   // "See capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
}
```

No `Hero Stat` fields are modeled as page content — per Clarifications, the four original stat callouts (Velocity, Escape rate, Cloud-native, Squad size) are not rendered at all; they exist only as the sourcing rationale for the replacement image and are not part of the data shape. `Hero`'s optional `mediaCaption` prop is likewise not used here — per Clarifications, this page's hero card renders only the image, with no caption row beneath it (unlike the sibling AI-Accelerated Modernization page, which does pass one).

## Intro / "Where teams get stuck"

```ts
export interface Blocker {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "Product engineering, end-to-end"
  title: string;
  description: string;
  chipsLabel: string;     // "Where teams get stuck"
  chips: Blocker[];       // exactly 6
}
```

## Core capabilities

```ts
export interface CapabilityBullet {
  id: string;
  text: string;
}

export interface Capability {
  id: string;
  order: number;
  stepLabel: string;         // "01 · Strategy" … "06 · Ops"
  title: string;              // "Product Strategy & Architecture", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 4 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "Core capabilities"
  title: string;      // "Six disciplines. One AI-first delivery engine."
  description: string;
  capabilities: Capability[]; // exactly 6, rendered via GlassCard variant="serviceCapability"
}
```

## Delivery lifecycle

```ts
export interface LifecycleStage {
  order: number;
  title: string;       // "Discover" … "Evolve"
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;   // "Our delivery lifecycle"
  title: string;     // "Discover. Design. Build. Validate. Evolve."
  stages: LifecycleStage[]; // exactly 5 — passed directly to ProcessSteps
}
```

## Why product teams pick TechGrit

```ts
export type WhyIconKey =
  | "shipFast"      // LightningIcon
  | "ownOutcome"    // CheckIcon
  | "aiNative"      // LayoutDashboardIcon
  | "predictable"   // ClockIcon
  | "quality"       // ShieldIcon
  | "cost";         // CreditCardIcon

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
  eyebrow: string;  // "Why product teams pick TechGrit"
  title: string;
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component
}
```

## Industries we build for

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
  eyebrow: string;  // "Industries we build for"
  title: string;
  industries: IndustryCard[]; // exactly 3, rendered via GlassCard variant="serviceCapability" (research.md §7: uniform orange icon treatment, not per-industry accent)
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
  title: string;    // "What product leaders ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "modernization"  // SvcModernizationIcon
  | "dataAi"          // SvcDataAiIcon
  | "platform"        // SvcPlatformIcon
  | "managed"         // SvcManagedIcon
  | "strategy"        // SvcStrategyIcon
  | "startups";       // SvcStartupsIcon

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
  eyebrow: string;             // "Let's build together"
  title: string;               // "Tell us what you're building."
  description: string;
  primaryCtaLabel: string;     // "Schedule a Consultation"
  primaryCtaLink: string;      // "/contact"
  secondaryCtaLabel?: string;  // "Book a Discovery Sprint"
  secondaryCtaLink?: string;   // "/frameworks#discovery" (see quickstart.md — mirrors sibling's Discovery Sprint destination convention)
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, capabilities, lifecycle, why, industries, faq, related, finalCta (FR-003).
- `capabilities` MUST contain exactly 6 items; each MUST have exactly 4 bullets (FR-001/FR-006, reference verbatim).
- `stages` MUST contain exactly 5 items (FR-001).
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `industries` MUST contain exactly 3 items despite the 4-column grid track (FR-001, Edge Cases).
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items (FR-001).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
