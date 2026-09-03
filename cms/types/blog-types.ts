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

export type StrapiBlogHeroSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  highlightTitle: string;
  __component: "page-reusable-sections.hero";
};

export type StrapiBlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type StrapiBlogAuthor = {
  id: number;
  name: string;
  designation: string | null;
};

export type StrapiBlogPost = {
  id: number;
  title: string;
  subtitle: string;
  publishDatetime: string | null;
  ctaLabel: string;
  ctaLink: string;
  isFeatured: boolean;
  assets: StrapiMedia[];
  blog_category: StrapiBlogCategory | null;
  author: StrapiBlogAuthor | null;
};

// The CMS reuses this same __component for both the single-post spotlight panel
// and the multi-post grid — they're distinguished at the section-picking step by
// which occurrence holds the isFeatured post, not by the component name.
export type StrapiBlogSection = {
  blogs: StrapiBlogPost[];
  __component: "home.blog-section";
};

export type StrapiTabItem = {
  id: number;
  label: string;
  value: string;
  isDefault: boolean;
};

export type StrapiTabFiltersSection = {
  TabItems: StrapiTabItem[];
  __component: "page-reusable-sections.tab-filters";
};

export type StrapiBlogFormField = {
  id: number;
  placeholder: string;
};

export type StrapiBlogNewsletterSection = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  extraTitle: string;
  ctaFormFields: StrapiBlogFormField[];
  __component: "page-reusable-sections.newsletter";
};

export type StrapiBlogPageSection =
  | StrapiBlogHeroSection
  | StrapiBlogSection
  | StrapiTabFiltersSection
  | StrapiBlogNewsletterSection;

export type StrapiBlogPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiBlogPageSection[];
};
