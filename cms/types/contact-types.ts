import type { StrapiMedia } from "./strapi-common";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — contact-page-specific components (not reused by
// other pages, mirrors the shared-vs-route-local split used elsewhere in cms/).
// ---------------------------------------------------------------------------

export type StrapiContactDetail = {
  label: string;
  value: string;
  href?: string | null;
  icon: StrapiMedia | null;
};

export type StrapiContactHeroSection = {
  __component: "contact-us.contact-us";
  title: string;
  subtitle: string;
  badgeLabel: string;
  highlightTitle: string | null;
  contactDetails: StrapiContactDetail[];
};

export type StrapiInquiryOption = {
  title: string;
};

export type StrapiContactFormField = {
  nameLabel: string;
  namePlaceholder: string;
  icon: StrapiMedia | null;
};

export type StrapiContactFormSection = {
  __component: "contact-us.contact-form";
  inquiryLabel: string;
  submitBtnText: string;
  submitBtnUrl: string;
  disclaimer: string;
  inquiryOptions: StrapiInquiryOption[];
  contactFormFields: StrapiContactFormField[];
};

export type StrapiBookCallBannerSection = {
  __component: "contact-us.book-call-banner";
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  icon: StrapiMedia | null;
};

export type StrapiContactApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string;
  icon: StrapiMedia | null;
};

// The "What happens next" section reuses the same `page-reusable-sections.service-detail`
// component construction's Challenges/Solutions/Advantage sections use, but the contact page
// only ever sends one instance of it (no `variant` disambiguation needed here).
export type StrapiNextStepsSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  approachSteps: StrapiContactApproachStep[];
};

export type StrapiUnmappedSection = { __component: string };

export type StrapiContactSection =
  | StrapiContactHeroSection
  | StrapiContactFormSection
  | StrapiBookCallBannerSection
  | StrapiNextStepsSection
  | StrapiUnmappedSection;

export type StrapiContactPage = {
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
  sections: StrapiContactSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; there is no static fallback content anymore.
// ---------------------------------------------------------------------------

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionIcon {
  url: string;
  alt: string;
}

export interface ContactDetailItem {
  order: number;
  label: string;
  value: string;
  href: string | null;
  icon: SectionIcon | null;
}

export interface ContactHeroSection {
  type: "contactHero";
  order: number;
  badgeLabel: string;
  title: string;
  titleHighlight: string | null; // exact substring of `title` to render in the gradient accent; null = no highlight
  subtitle: string;
  contactDetails: ContactDetailItem[];
}

export interface InquiryOption {
  order: number;
  title: string;
}

export interface ContactFormFieldEntry {
  order: number;
  label: string;
  placeholder: string;
  multiline: boolean;
}

export interface ContactFormSection {
  type: "contactForm";
  order: number;
  inquiryLabel: string;
  inquiryOptions: InquiryOption[];
  fields: ContactFormFieldEntry[];
  submitLabel: string;
  submitUrl: string;
  disclaimer: string;
}

export interface BookCallBannerSection {
  type: "bookCallBanner";
  order: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  icon: SectionIcon | null;
}

export interface NextStep {
  order: number;
  stepLabel: string;
  title: string;
  subtitle: string;
}

export interface NextStepsSection {
  type: "nextSteps";
  order: number;
  title: string;
  steps: NextStep[];
}

// `| undefined` is explicit and load-bearing: with no static fallback, any section the CMS
// doesn't return (or that fails to map) is genuinely absent, not defaulted.
export type ContactPageSectionEntry =
  | ContactHeroSection
  | ContactFormSection
  | BookCallBannerSection
  | NextStepsSection
  | undefined;

export interface ContactPageContent {
  seo: PageSeo;
  sections: ContactPageSectionEntry[];
}
