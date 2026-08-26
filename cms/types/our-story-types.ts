import type {
  SectionIcon,
  StrapiCtaBannerSection,
  StrapiHeroSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";
import type { StrapiMedia } from "./strapi-common";

export type { SectionIcon } from "../shared/reusable-sections";

// --- Strapi-side raw shapes (about-specific components) ---

export type StrapiConcernQuestion = { question: string; answer: string | null };
export type StrapiConcernCard = { title: string; questions: StrapiConcernQuestion[] };

// `concernsCard` is an array of 2 cards (matched by title in cms/api/about.ts) plus a
// top-level `summary` combining the old closingLead+closingStatement, separated by "\n\n".
// No field exists yet for per-paragraph bold emphasis inside `subtitle`.
export type StrapiAudienceInsightSection = {
  __component: "about-us.audience-insight";
  title: string;
  subtitle: string;
  badgeLabel: string;
  summary: string;
  concernsCard: StrapiConcernCard[];
};

export type StrapiMissionStatementSection = {
  __component: "about-us.mission-statement";
  title: string;
  subtitle: string;
  badgeLabel: string;
  highlightTitle: string | null;
};

// Reused for both the "core values" grid and the "3-step plan" — the CMS sends
// `variant: null` for both (unlike Construction's service-detail), so cms/api/about.ts
// disambiguates by icon presence: the values instance always populates `icon`, process never does.
export type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

export type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string;
  variant: string | null;
  approachSteps: StrapiApproachStep[];
};

export type StrapiBenefit = { title: string };
export type StrapiImportantSection = { label: string; value: string };

export type StrapiPartnerSuccessSection = {
  __component: "about-us.partner-success";
  title: string;
  subtitle: string;
  badgeLabel: string;
  benefits: StrapiBenefit[];
  importantSection: StrapiImportantSection[];
};

export type StrapiCultureGallerySection = {
  __component: "page-reusable-sections.culture-gallery";
  title: string;
  subtitle: string;
  badgeLabel: string;
  image: StrapiMedia[];
};

export type StrapiUnmappedSection = { __component: string };

export type StrapiAboutSection =
  | StrapiHeroSection
  | StrapiAudienceInsightSection
  | StrapiMissionStatementSection
  | StrapiServiceDetailSection
  | StrapiStatisticsSection
  | StrapiPartnerSuccessSection
  | StrapiCultureGallerySection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiAboutPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiAboutSection[];
};

// --- Presentational shapes (produced by mapping the Strapi shapes above) ---

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null; // substring of `title` to render in the gradient accent; null = no highlight
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

// The CMS has no dedicated component for this strip — cms/api/about.ts synthesizes it from
// Hero's own `backgroundImage`, the only image field available for this part of the page.
export interface ShowcaseSection {
  type: "showcase";
  order: number;
  image: SectionImage | null;
}

export interface ConcernsCard {
  situationsLabel: string;
  situations: string[];
  label: string;
  concerns: string[];
  closingLead: string; // plain-weight sentence above the bold closingStatement
  closingStatement: string;
}

export interface WhoYouAreParagraph {
  text: string;
  highlight?: string; // substring of `text` to bold — no CMS field for this yet, always undefined today
}

export interface WhoYouAreSection {
  type: "whoYouAre";
  order: number;
  eyebrow: string;
  title: string;
  paragraphs: WhoYouAreParagraph[];
  concernsCard: ConcernsCard;
}

export interface OurRoleSection {
  type: "ourRole";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null;
  description: string;
}

export interface CompanyValue {
  order: number;
  title: string;
  description: string;
  icon: SectionIcon | null;
}

export interface ValuesSection {
  type: "values";
  order: number;
  eyebrow: string;
  title: string;
  values: CompanyValue[];
}

export interface ProcessStep {
  order: number;
  label: string;
  title: string;
  description: string;
}

export interface ProcessSection {
  type: "process";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface AchievementMetric {
  order: number;
  value: string;
  label: string;
}

export interface AchievementsSection {
  type: "achievements";
  order: number;
  stats: AchievementMetric[];
}

export interface PartnershipOutcome {
  order: number;
  text: string;
}

// `closingText` is a single sentence — the CMS's "importantSection" gives one {label, value}
// pair, not a separate bold-lead + plain-support pair.
export interface PartnerSection {
  type: "partner";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: PartnershipOutcome[];
  closingLabel: string;
  closingText: string;
}

export interface CultureGalleryPhoto {
  id: string;
  src: string | null;
  alt: string;
  type?: "image" | "video";
}

export interface CultureGallerySection {
  type: "cultureGallery";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  photos: CultureGalleryPhoto[];
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

// `| undefined`: with no static fallback, a section the CMS doesn't return (or fails to map)
// is genuinely absent, not defaulted. cms/api/about.ts filters these out before this array
// reaches the page.
export type AboutPageSectionEntry =
  | HeroSection
  | ShowcaseSection
  | WhoYouAreSection
  | OurRoleSection
  | ValuesSection
  | ProcessSection
  | AchievementsSection
  | PartnerSection
  | CultureGallerySection
  | FinalCtaSection
  | undefined;

export interface AboutPageContent {
  seo: PageSeo;
  sections: AboutPageSectionEntry[];
}
