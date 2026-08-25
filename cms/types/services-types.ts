export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
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

export type StrapiServicesHeroSection = {
  title: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string;
  secondaryBtnLink: string;
  badgeLabel: string;
  highlightTitle: string;
  __component: "page-reusable-sections.hero";
};

export type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
};

export type StrapiServiceItem = {
  id: number;
  title: string;
  subtitle: string;
  serviceLabel: string;
  stepNumber: string;
  approachLabel: string | null;
  image: StrapiMedia[];
  approachSteps: StrapiApproachStep[];
};

export type StrapiAiFirstEngineSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  services: StrapiServiceItem[];
  __component: "page-reusable-sections.ai-first-engine";
};

export type StrapiServicesCtaBannerSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiServicesSection = StrapiServicesHeroSection | StrapiAiFirstEngineSection | StrapiServicesCtaBannerSection;

export type StrapiServicesPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiServicesSection[];
};
