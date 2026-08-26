# Data Model: AI Strategy & Roadmap Page

All types below live in `app/what-we-do/ai-strategy-roadmap/_data/types.ts` (page-local, not
shared — see research.md §2 for why this stays a plain static module rather than a CMS-shaped type
set). No entity here persists anywhere; the page is server-rendered from one static array.

## Page content

```ts
export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface AiStrategyRoadmapPageContent {
  seo: PageSeo;
  sections: AiStrategyRoadmapSection[];
}

export type AiStrategyRoadmapSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | WhySection
  | AdvisorySegmentsSection
  | FaqSection
  | RelatedServicesSection
  | FinalCtaSection;
```

## Hero

```ts
export interface HeroImage {
  src: string;   // "/samples/dm-scalability.png" (Clarifications)
  alt: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;              // "Service 06 · CTO Advisory"
  title: string;                // full H1, including the highlighted phrase
  titleHighlight: string;       // exact substring rendered via Hero's .text-gradient span: "technical roadmap that hits business goals."
  subtitle: string;
  primaryCtaLabel: string;      // "Book a Strategy Session"
  primaryCtaLink: string;       // "/contact-us" (the app's real Contact route — confirmed: app/contact-us/, ROUTES.contactUs)
  secondaryCtaLabel?: string;   // "See CTO capabilities"
  secondaryCtaLink?: string;    // "#capabilities"
  image: HeroImage;             // composed into Hero's `media` slot via <MediaSlot fill .../>, mediaFill=true
  // No `mediaCaption` field — per Clarifications, this page drops the caption line
  // (matching the Software Product Engineering / Platform Engineering siblings' treatment).
}
```

No `Hero Stat Tile` fields are modeled as page content — per Clarifications, the four original
stat tiles (Advisors, Engagement, Roadmap, Outcomes) are not rendered at all; they exist only as
the sourcing rationale for the replacement image and are not part of the data shape.

## Intro / "Achieve your business goals with senior technology leadership on tap."

```ts
export interface TriggerChip {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;        // "CTO-as-a-Service"
  title: string;
  description: string;
  chipsLabel: string;     // "When teams need us"
  chips: TriggerChip[];   // exactly 6
}
```

## CTO-as-a-Service capabilities

```ts
export interface CapabilityBullet {
  id: string;
  text: string;
}

export interface Capability {
  id: string;
  order: number;
  stepLabel: string;          // "01 · Strategy" … "04 · Quality"
  title: string;               // "Tech & AI Strategy", etc.
  lede: string;
  bullets: CapabilityBullet[]; // exactly 5 per capability
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;    // "CTO-as-a-Service capabilities"
  title: string;      // "Four pillars. One executive partner."
  description: string;
  capabilities: Capability[]; // exactly 4, rendered via GlassCard variant="serviceCapability", no icon (research.md §1)
}
```

## Diagnose. Roadmap. Execute. Measure. Coach.

```ts
export interface EngagementStage {
  order: number;
  title: string;       // "Diagnose" … "Coach"
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;   // "Our engagement flow"
  title: string;     // "Diagnose. Roadmap. Execute. Measure. Coach."
  stages: EngagementStage[]; // exactly 5 — passed directly to ProcessSteps (default columns=5, no override needed)
}
```

## Why leaders choose TechGrit

```ts
export type WhyIconKey =
  | "boardGrade"    // AwardIcon
  | "delivery"        // CheckCircleIcon
  | "aiNative"          // SvcStrategyIcon
  | "flexibility"         // UserIcon (new — research.md §3)
  | "independent"          // ShieldIcon
  | "costConscious";        // FinTechIcon

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
  eyebrow: string;  // "Why leaders choose TechGrit"
  title: string;
  tiles: ValuePropositionTile[]; // exactly 6, rendered by the page-local WhyTile component (research.md §1)
}
```

## Founders. Boards. Scaling technology orgs.

```ts
export type AdvisorySegmentIconKey = "founders" | "scaleups" | "peVc" | "enterprise";
// founders -> SvcStartupsIcon, scaleups -> UserIcon (new), peVc -> HamburgerIcon, enterprise -> ConstructionIcon
// (research.md §3 — peVc/enterprise are near-exact reuses, not new icons)

export interface AdvisorySegmentCard {
  id: string;
  order: number;
  iconKey: AdvisorySegmentIconKey;
  name: string;          // "Startup Founders" | "Scale-ups" | "PE / VC Portfolio" | "Enterprise Programs"
  description: string;
  // No `href` field at all (unlike the Platform Engineering / Data & AI Engineering siblings'
  // equivalent mixed-link grids) — per Clarifications/spec.md, all four cards are non-interactive
  // in the reference (plain <div>s, no <a>s), so this entity has nothing optional to model.
}

export interface AdvisorySegmentsSection {
  type: "advisorySegments";
  order: number;
  eyebrow: string;  // "Who we advise"
  title: string;    // "Founders. Boards. Scaling technology orgs."
  cards: AdvisorySegmentCard[]; // exactly 4, rendered via GlassCard variant="serviceCapability" on a 4-column desktop track, never wrapped in a <Link>
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
  title: string;    // "What CEOs & boards ask us first."
  items: FaqItem[]; // exactly 5 — passed directly to Faq
}
```

## Related services

```ts
export type RelatedServiceIconKey =
  | "modernization"  // SvcModernizationIcon
  | "engineering"      // EradicateDebtIcon (precedent: every sibling's related-services list — research.md §1/§3)
  | "dataAi"            // SvcDataAiIcon
  | "platform"           // SvcPlatformIcon
  | "managed"             // SvcManagedIcon
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
  links: RelatedServiceLink[]; // exactly 6, rendered via IconTile size="compact", 3-column desktop grid
}
```

## Closing CTA

```ts
export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;             // "Step into an AI-first future"
  title: string;               // "Turn your AI ambition into a plan you can execute."
  description: string;
  primaryCtaLabel: string;     // "Book a Strategy Session"
  primaryCtaLink: string;      // "/contact-us"
  secondaryCtaLabel?: string;  // "Explore Discovery Sprints"
  secondaryCtaLink?: string;   // "/how-we-work/discovery-sprints" (the real, now-built Discovery Sprints route — cms/api/footer.ts confirms this is the live destination, not the older /frameworks#discovery placeholder some pre-Discovery-Sprints sibling docs used)
}
```

## Validation rules (from spec.md Functional Requirements)

- `sections` MUST render in the exact order: hero, intro, capabilities, lifecycle, why, advisorySegments, faq, related, finalCta (FR-003).
- `capabilities` MUST contain exactly 4 items; each MUST have exactly 5 bullets (FR-001/FR-006, reference verbatim); the section `title` reads "Four pillars. One executive partner." verbatim (FR-001, FR-003).
- `stages` MUST contain exactly 5 items (FR-001).
- `tiles` (Why) MUST contain exactly 6 items (FR-001).
- `cards` (Advisory Segments) MUST contain exactly 4 items; none carry an `href` (FR-001, FR-005, Edge Cases).
- `items` (FAQ) MUST contain exactly 5 items, with exactly one `defaultOpen: true` (the first) (FR-005).
- `links` (Related) MUST contain exactly 6 items, excluding this page's own service (AI Strategy & Roadmap) and including all five siblings' plus Startups (FR-001).
- `hero.image` MUST resolve to `/samples/dm-scalability.png`; `hero` MUST NOT include a `mediaCaption` value (FR-004, Clarifications).
- No field in this model is sourced from a network request or CMS this phase (FR-008).
