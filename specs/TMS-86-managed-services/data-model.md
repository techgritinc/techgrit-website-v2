# Data Model: Managed Services Page

All types below live in `app/what-we-do/managed-services/_data/types.ts` (page-local, not shared — see research.md §2 for why this stays a plain static module rather than a CMS-shaped type set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface ManagedServicesPageContent {
  seo: PageSeo;
  sections: ManagedServicesSection[];
}

export type ManagedServicesSection =
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
  src: string;   // "/samples/ind-healthcare.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 05 · Managed Services"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "reliable, secure, and continuously improving."
  subtitle: string;
  primaryCtaLabel: string;      // "Talk to Our Managed Services Team"
  primaryCtaLink: string;       // "/contact"
  secondaryCtaLabel?: string;   // "See capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
  // No `mediaCaption` field — per Clarifications, this page drops the caption line
  // (matching the Software Product Engineering / Platform Engineering siblings' treatment).
}
```

No `Hero Stat` fields are modeled as page content — per Clarifications, the four original stat tiles (Coverage, Detect, Resolve, Uptime) are not rendered at all; they exist only as the sourcing rationale for the replacement image and are not part of the data shape.

## Intro / "Maintaining software shouldn't crowd out building software."

```ts
export interface TeamSignal {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "Beyond traditional support"
  title: string;
  description: string;
  chipsLabel: string;     // "What we hear from teams"
  chips: TeamSignal[];    // exactly 6
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
  stepLabel: string;          // "01 · Support" … "06 · Security"
  title: string;               // "Application Support & Maintenance", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 4 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "Our managed services"
  title: string;      // "Six capabilities. One always-on team."
  description: string;
  capabilities: Capability[]; // exactly 6, rendered via GlassCard variant="serviceCapability"
}
```

## Monitor. Detect. Resolve. Optimize. Evolve.

```ts
export interface LifecycleStage {
  order: number;
  title: string;       // "Monitor" … "Evolve"
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;   // "Managed services lifecycle"
  title: string;     // "Monitor. Detect. Resolve. Optimize. Evolve."
  stages: LifecycleStage[]; // exactly 5 — passed directly to ProcessSteps
}
```

## Why choose TechGrit

```ts
export type WhyIconKey =
  | "reliability"    // CheckCircleIcon
  | "overhead"          // SelfHealingIcon
  | "delivery"             // EradicateDebtIcon
  | "techDebt"              // ShieldIcon
  | "engineering"            // UsersIcon
  | "modernization";          // AwardIcon

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
  eyebrow: string;  // "Why choose TechGrit"
  title: string;    // "Not ticket-closing — outcomes."
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component on a 2-column desktop grid (reference-confirmed, research.md §3)
}
```

## Applications we support

```ts
export type IndustryIconKey = "healthcare" | "fintech" | "construction";

export interface IndustryCard {
  id: string;
  order: number;
  iconKey: IndustryIconKey;
  name: string;          // "HealthTech" | "FinTech" | "Construction Tech"
  description: string;
  href: string;           // always present — all 3 cards are linked (research.md §7), unlike Platform Engineering's mixed-link case
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;  // "Applications we support"
  title: string;    // "Any stack. Any origin. Any scale."
  industries: IndustryCard[]; // exactly 3, rendered via GlassCard variant="serviceCapability" on a 3-column desktop track (research.md §7); each card's icon chip uses a distinct per-industry accent color (research.md §5)
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
  title: string;    // "What ops leaders ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "modernization"  // SvcModernizationIcon
  | "engineering"      // EradicateDebtIcon (precedent: prior siblings' related-services lists — research.md §4)
  | "dataAi"            // SvcDataAiIcon
  | "platform"           // SvcPlatformIcon
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
  eyebrow: string;             // "Keep your applications running. Keep your business moving."
  title: string;               // "Managed services that evolve your software — not just maintain it."
  description: string;
  primaryCtaLabel: string;     // "Schedule a Managed Services Assessment"
  primaryCtaLink: string;     // "/contact"
  secondaryCtaLabel?: string;  // "Explore engagement models"
  secondaryCtaLink?: string;   // "/frameworks#engagement" (existing footer.ts route for "Engagement Models")
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, capabilities, lifecycle, why, industries, faq, related, finalCta (FR-003).
- `capabilities` MUST contain exactly 6 items; each MUST have exactly 4 bullets (FR-001/FR-006, reference verbatim); the section `title` reads "Six capabilities. One always-on team." verbatim (FR-001, FR-003).
- `stages` MUST contain exactly 5 items (FR-001).
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `industries` MUST contain exactly 3 items, every one with a non-empty `href` (FR-001, FR-005).
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items, excluding this page's own service and including all four siblings' (FR-001).
- `hero.image` MUST resolve to `/samples/ind-healthcare.png`; `hero` MUST NOT include a `mediaCaption` value (FR-004, Clarifications).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
