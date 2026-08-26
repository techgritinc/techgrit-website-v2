export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
};

export type StrapiStartupResourcesHeroSection = {
  title: string;
  highlightTitle: string | null;
  subtitle: string;
  primaryBtnLabel: string | null;
  primaryBtnLink: string | null;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiResourceFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  icon: StrapiMedia | null;
};

export type StrapiResourceCard = {
  id: number;
  categoryLabel: string;
  title: string;
  subtitle: string | null;
  features: StrapiResourceFeature[];
};

// Same `__component` as every other "What We Do" page's capability grid, but on this
// page it occurs once with title/subtitle/badgeLabel all null — it's rendered as a
// plain resource-link library, not a titled capabilities section (unlike the Startups
// sibling, which needs badgeLabel-based disambiguation for its two occurrences).
export type StrapiStartupResourcesLibrarySection = {
  title: string | null;
  subtitle: string | null;
  badgeLabel: string | null;
  capabilityCard: StrapiResourceCard[];
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiStartupResourcesCtaBannerSection = {
  title: string;
  highlightTitle: string | null;
  subtitle: string;
  badgeLabel: string | null;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiStartupResourcesSection =
  | StrapiStartupResourcesHeroSection
  | StrapiStartupResourcesLibrarySection
  | StrapiStartupResourcesCtaBannerSection;

export type StrapiStartupResourcesPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiStartupResourcesSection[];
};
