# Data Model: Engagement Models Page (How We Work)

All types live in `cms/types/engagement-models-types.ts`, split into raw Strapi shapes (prefixed `Strapi`) and rendering-oriented shapes consumed by `page.tsx`/`_components/*`, mirroring `cms/types/orbit-ai-ecosystem-types.ts`'s own split exactly.

## Raw Strapi shapes

```ts
import type { StrapiMedia } from "./header-types";

export type StrapiEngagementModelsHeroSection = {
  title: string;
  highlightTitle: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiEngagementModelsFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

export type StrapiEngagementModelsStructureInfo = { label: string | null; description: string };

export type StrapiEngagementModelsCapabilityCard = {
  id: number;
  categoryLabel: string | null;
  title: string | null;
  subtitle: string | null;
  structureInfo: StrapiEngagementModelsStructureInfo | null;
  features: StrapiEngagementModelsFeature[];
};

export type StrapiEngagementModelsCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  capabilityCard: StrapiEngagementModelsCapabilityCard[]; // exactly 3
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiEngagementModelsChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: { name: string | null; features: StrapiEngagementModelsFeature[] } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiAudienceInsightQuestion = { id: number; question: string; answer: string | null; icon: StrapiMedia | null };
export type StrapiAudienceInsightGroup = { id: number; title: string; questions: StrapiAudienceInsightQuestion[] };
export type StrapiAudienceInsightSection = {
  title: string;
  subtitle: string | null;
  badgeLabel: string | null;
  summary: string | null;
  concernsCard: StrapiAudienceInsightGroup[]; // exactly 2: "Your Goal", "Recommended Model"
  __component: "about-us.audience-insight";
};

export type StrapiEngagementModelsCtaBannerSection = {
  title: string;
  highlightTitle: string | null;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiEngagementModelsSection =
  | StrapiEngagementModelsHeroSection
  | StrapiEngagementModelsCapabilitiesSection
  | StrapiEngagementModelsChallengesSection
  | StrapiAudienceInsightSection
  | StrapiEngagementModelsCtaBannerSection;

export type StrapiEngagementModelsPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiEngagementModelsSection[];
};
```

## Rendering-oriented shapes

```ts
export interface SectionImage { url: string; alternativeText: string; width: number; height: number; }

export interface HeroSection {
  type: "hero"; order: number;
  badgeLabel: string; title: string; titleHighlight: string; subtitle: string;
  primaryCtaLabel: string; primaryCtaLink: string;
  secondaryCtaLabel?: string; secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface FrameworkCardFeature { id: string; text: string; }
export interface FrameworkCard {
  id: string; categoryLabel: string; title: string; subtitle: string;
  features: FrameworkCardFeature[]; outcomeLabel?: string; outcomeText?: string;
}
export interface CapabilitiesSection {
  type: "capabilities"; order: number;
  eyebrow: string; title: string; description: string; cards: FrameworkCard[]; // exactly 3
}

export interface ChallengeChip { id: string; label: string; icon: SectionImage | null; }
export interface WhySection {
  type: "why"; order: number;
  eyebrow?: string; // taken directly from CMS `eyebrow`; undefined when null — no fallback (Q8)
  title: string; description: string; chips: ChallengeChip[]; // exactly 7
}

export interface FindFitRow { id: string; text: string; icon?: SectionImage | null; }
export interface FindFitSection {
  type: "findFit"; order: number;
  eyebrow?: string; // taken directly from CMS `badgeLabel`; undefined when null — no fallback (Q8 supersedes Q6)
  title: string;
  goalColumn: { label: string; rows: FindFitRow[] };   // "Your Goal" — icon present per row
  modelColumn: { label: string; rows: FindFitRow[] };  // "Recommended Model" — text only
}

export interface FinalCtaSection {
  type: "finalCta"; order: number;
  badgeLabel: string; title: string; subtitle: string;
  primaryCtaLabel: string; primaryCtaLink: string;
  secondaryCtaLabel?: string; secondaryCtaLink?: string;
}

export type EngagementModelsSection =
  | HeroSection | CapabilitiesSection | WhySection | FindFitSection | FinalCtaSection;

export interface PageSeo { metaTitle: string; metaDescription: string; }
export interface EngagementModelsPageContent { seo: PageSeo; sections: EngagementModelsSection[]; }
```

## Validation / mapping rules

- `toSection()` switches on `__component`; an unrecognized component returns `null` and is filtered out (matches sibling pages — forward-compatible with CMS additions).
- `FindFitSection` parsing asserts `concernsCard.length === 2`; if the CMS ever ships a different count, the section is dropped (returns `null` from its mapper) rather than rendering a malformed comparison — matches the existing "no partial/broken render" principle already applied to `getOrbitAiEcosystemData`.
- `FindFitRow.icon` is populated only for `goalColumn` rows (the CMS's `modelColumn` group ships `icon: null` for every row in the confirmed payload); `modelColumn` rows always render as plain text.
- `WhySection.eyebrow` and `FindFitSection.eyebrow` are taken directly from their CMS fields (`eyebrow`, `badgeLabel`) with no fallback — when the field is null, the mapper omits the property and the component renders no eyebrow line for that section (Q8). This deliberately does NOT reuse the `section.eyebrow ?? section.title` convention `toChallengesSection` (`cms/api/how-we-work/orbit-ai-ecosystem.ts`) and `toIntroSection` (`cms/api/what-we-do/ai-modernization.ts`) use for their own pages.
- Row pairing in `FindFitSection` is by array index (row `i` of `goalColumn.rows` pairs with row `i` of `modelColumn.rows`) — both groups are confirmed to ship the same length (3) in the live payload; a length mismatch is a CMS data-entry error out of scope for this feature to guard against beyond simply rendering whatever rows exist per column.
