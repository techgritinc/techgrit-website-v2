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

export type StrapiWebinarGalleryItem = {
  id: number;
  assets: StrapiMedia[];
};

export type StrapiWebinarFormField = {
  id: number;
  placeholder: string;
  buttonLabel: string;
  buttonUrl: string;
};

export type StrapiUpcomingWebinarSection = {
  id: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  badgeLabel: string;
  __component: "insights-webinar.upcomming-live-webinar-card";
};

export type StrapiWebinarSignupSection = {
  id: number;
  title: string;
  badgeLabel: string | null;
  subtitle: string;
  highlightTitle: string;
  webinarFormFields: StrapiWebinarFormField[];
  galleryItems: StrapiWebinarGalleryItem[];
  __component: "insights-webinar.webinar-signup";
};

export type StrapiWebinarRecordingItem = {
  id: number;
  title: string;
  subtitle: string;
  statusLabel: string;
  ctaLabel: string;
  ctaLink: string;
};

export type StrapiWebinarRecordingSection = {
  id: number;
  sectionTitle: string | null;
  webinar: StrapiWebinarRecordingItem[];
  __component: "insights-webinar.webinar-recording";
};

export type StrapiWebinarNewsletterFormField = {
  id: number;
  placeholder: string;
};

export type StrapiWebinarNewsletterSection = {
  id: number;
  title: string;
  subtitle: string | null;
  ctaLabel: string;
  extraTitle: string | null;
  ctaFormFields: StrapiWebinarNewsletterFormField[];
  __component: "page-reusable-sections.newsletter";
};

export type StrapiWebinarCtaBannerSection = {
  id: number;
  title: string;
  subtitle: string;
  badgeLabel: string | null;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  highlightTitle: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiWebinarPageSection =
  | StrapiUpcomingWebinarSection
  | StrapiWebinarSignupSection
  | StrapiWebinarRecordingSection
  | StrapiWebinarNewsletterSection
  | StrapiWebinarCtaBannerSection;

export type StrapiWebinarPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiWebinarPageSection[];
};
