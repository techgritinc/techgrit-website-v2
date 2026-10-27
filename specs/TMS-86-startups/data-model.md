# Data Model: Startups Page

All types below live in `app/what-we-do/startups/_data/types.ts` (page-local, not shared — see research.md §1 for why this stays a plain static module rather than a CMS-shaped type set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface StartupsPageContent {
  seo: PageSeo;
  sections: StartupsSection[];
}

export type StartupsSection =
  | HeroSection
  | IntroSection
  | GrowthJourneySection
  | CapabilitiesSection
  | WhySection
  | WhoWeHelpSection
  | FaqSection
  | RelatedServicesSection
  | FinalCtaSection;
```

## Hero

```ts
export interface HeroImage {
  src: string;   // "/samples/ind-fintech.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 07 · Startups"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "startups that move fast and build to last."
  subtitle: string;
  primaryCtaLabel: string;      // "Talk to a Startup Advisor"
  primaryCtaLink: string;       // "/contact-us"
  secondaryCtaLabel?: string;   // "See capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
  // No `mediaCaption` field — per FR-004, this page drops the caption line, matching
  // every sibling "What We Do" page's own hero-image-replacement treatment.
}
```

No "Hero Stat Tile" fields are modeled as page content — per FR-004/Clarifications, the four original stat tiles (Speed, Access, Models, Track Record) are not rendered at all; they exist only as the sourcing rationale for the replacement image and are not part of the data shape.

## Intro / "Great ideas stall when engineering doesn't keep pace with your ambition."

```ts
export interface Challenge {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "Built for founders who move fast"
  title: string;
  description: string;
  chipsLabel: string;     // "Challenges we solve for founders"
  chips: Challenge[];     // exactly 6
}
```

## Growth journey / "From first idea to institutional scale."

```ts
export interface GrowthStageBullet {
  id: string;
  text: string;
}

export interface GrowthStage {
  id: string;
  order: number;
  badgeLabel: string;          // "Pre-Seed & Seed" | "Series A" | "Series B+"
  title: string;                // "Validate & Build Your MVP", etc.
  lede: string;
  bullets: GrowthStageBullet[]; // exactly 4 per stage
  highlighted?: boolean;        // true only for "Pre-Seed & Seed" (order 1) — the reference gives this
                                 // card and its badge a visibly stronger background/border intensity
                                 // than the other two; analogous to the "+ Network" bonus card's
                                 // distinguishing treatment in the capabilities section below
                                 // (Speckit analysis U1). Token mapping (all pre-existing except the
                                 // 2 marked *new*, added per Speckit analysis C1):
                                 //   highlighted: card bg --color-overlay-orange-07 (*new*), border --color-border-orange-22;
                                 //                badge bg --color-hover-orange-fill-15, border --color-hover-orange-border-40
                                 //   default:     card bg --color-overlay-orange-04 (*new*), border --color-overlay-orange-14;
                                 //                badge bg --color-overlay-orange-10, border --color-overlay-orange-strong
}

export interface GrowthJourneySection {
  type: "growthJourney";
  order: number;
  eyebrow: string;   // "We grow with you"
  title: string;     // "From first idea to institutional scale."
  stages: GrowthStage[]; // exactly 3, rendered inside a single bordered panel via GlassCard variant="serviceCapability"
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
  stepLabel: string;           // "01 · Discover" … "05 · Sustain", or "+ Network" for the bonus 6th card
  title: string;                // "Product Discovery & Validation", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 4 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "What we build for startups"
  title: string;      // "Six capabilities. Every startup stage." (FR-003a: corrected from the reference's literal "Five capabilities." per Clarifications — a deliberate count-error fix, not a reference-content omission)
  description: string;
  capabilities: Capability[]; // exactly 6, rendered via GlassCard variant="serviceCapability"; the 6th ("+ Network") additionally carries a distinguishing gradient background className, matching the reference
}
```

## Why TechGrit for startups

```ts
export type WhyIconKey =
  | "seniorTeam"    // UsersIcon
  | "aiNative"        // SvcStartupsIcon
  | "flexiblePricing"   // CreditCardIcon
  | "trackRecord"          // CheckCircleIcon
  | "protectRunway"          // ShieldIcon
  | "network";                 // NetworkNodeIcon

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
  eyebrow: string;  // "Why TechGrit for startups"
  title: string;
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component in a 2-column grid
}
```

## Who we help / "Founders, venture teams, and builders at every stage."

```ts
export type FounderSegmentIconKey = "soloFounders" | "seedSeriesA" | "vcPePortcos" | "corporateInnovation";
// Icon + tint mapping (each key maps to both, 1:1 — reference gives each card a distinct
// icon tint, unlike the siblings' own single-tint "Industries" cards; Speckit analysis U2).
// Only the first 2 backgrounds had an exact pre-existing token; the other 2 needed a new
// token each (added to tokens.css + globals.css's @theme inline block, same as the
// growth-journey card backgrounds — Speckit analysis C1/C2):
// soloFounders      -> SvcStartupsIcon,   tint: --color-orange       (bg --color-overlay-orange-18,       text orange)      [pre-existing]
// seedSeriesA        -> UsersIcon,          tint: --color-amber-light  (bg --color-overlay-orange-14,       text amber-light) [pre-existing]
// vcPePortcos          -> SvcStrategyIcon,    tint: --color-blue-light   (bg --color-overlay-blue-light-14,   text blue-light)  [*new*]
// corporateInnovation   -> LayoutDashboardIcon, tint: --color-violet       (bg --color-overlay-violet-light-18, text violet)      [*new* — matches --color-violet's hue, distinct from the darker pre-existing --color-overlay-violet-14/-10]

export interface FounderSegmentCard {
  id: string;
  order: number;
  iconKey: FounderSegmentIconKey;
  name: string;          // "Solo & Co-Founders" | "Seed & Series A Teams" | "VC & PE Portcos" | "Corporate Innovation"
  description: string;
  // No `href` field at all — per Edge Cases, all four cards are non-interactive in the
  // reference (rendered as <div>, never <a>), a genuine content fact, not a data gap.
}

export interface WhoWeHelpSection {
  type: "whoWeHelp";
  order: number;
  eyebrow: string;  // "Who we work with"
  title: string;    // "Founders, venture teams, and builders at every stage."
  segments: FounderSegmentCard[]; // exactly 4, rendered via GlassCard variant="serviceCapability" on a 4-column desktop track, all non-linked
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
  title: string;    // "What founders ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "engineering"      // EradicateDebtIcon (established precedent — see research.md §4)
  | "strategy"           // SvcStrategyIcon
  | "dataAi"              // SvcDataAiIcon
  | "modernization"        // SvcModernizationIcon
  | "platform"              // SvcPlatformIcon
  | "managed";               // SvcManagedIcon

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
  eyebrow: string;             // "Ready to build something real?"
  title: string;               // "Your idea deserves senior engineers, not excuses."
  description: string;
  primaryCtaLabel: string;     // "Talk to a Startup Advisor"
  primaryCtaLink: string;      // "/contact-us"
  secondaryCtaLabel?: string;  // "Book a Discovery Sprint"
  secondaryCtaLink?: string;   // "/how-we-work/discovery-sprints" (already-built route — see quickstart.md)
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, growthJourney, capabilities, why, whoWeHelp, faq, related, finalCta (FR-003).
- `stages` (growthJourney) MUST contain exactly 3 items; each MUST have exactly 4 bullets (FR-001); exactly one (order 1, "Pre-Seed & Seed") MUST have `highlighted: true`, and the other two MUST leave it unset/false (FR-006).
- `capabilities` MUST contain exactly 6 items; each MUST have exactly 4 bullets (FR-001); the section `title` reads "Six capabilities. Every startup stage." — corrected from the reference's literal count per FR-003a/Clarifications, not verbatim.
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `segments` (Who we help) MUST contain exactly 4 items; none MUST carry an `href` field (FR-001, Edge Cases); each MUST render with its own distinct icon tint (FR-006) — see the `FounderSegmentIconKey` tint mapping above.
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items, excluding this page's own service and including all six siblings' (FR-001).
- `hero.image` MUST resolve to `/samples/ind-fintech.png`; `hero` MUST NOT include a `mediaCaption` value (FR-004, Clarifications).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
