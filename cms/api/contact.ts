import { fetchCms } from "./fetcher";
import { resolveMediaUrl } from "../utils/media";
import type {
  BookCallBannerSection,
  ContactDetailItem,
  ContactFormSection,
  ContactHeroSection,
  ContactPageContent,
  ContactPageSectionEntry,
  NextStep,
  NextStepsSection,
  SectionIcon,
  StrapiBookCallBannerSection,
  StrapiContactApproachStep,
  StrapiContactDetail,
  StrapiContactFormSection,
  StrapiContactHeroSection,
  StrapiContactPage,
  StrapiContactSection,
  StrapiNextStepsSection,
} from "../types/contact-types";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax, same
// convention as cms/api/construction.ts — verified directly against the live CMS instance.
const CONTACT_ENDPOINT =
  "/api/pages/by-slug/contact-us" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][contact-us.contact-us][populate][contactDetails][populate]=icon" +
  "&populate[sections][on][contact-us.contact-form][populate][inquiryOptions]=true" +
  "&populate[sections][on][contact-us.contact-form][populate][contactFormFields][populate]=icon" +
  "&populate[sections][on][contact-us.book-call-banner][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate]=approachSteps";

function mapIcon(icon: StrapiMediaLike): SectionIcon | null {
  if (!icon) return null;
  return { url: resolveMediaUrl(icon.url), alt: icon.alternativeText ?? "" };
}

type StrapiMediaLike = { url: string; alternativeText: string | null } | null;

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

function mapContactDetail(detail: StrapiContactDetail, index: number): ContactDetailItem {
  return {
    order: index + 1,
    label: detail.label,
    value: detail.value,
    href: detail.href ?? (EMAIL_PATTERN.test(detail.value) ? `mailto:${detail.value}` : null),
    icon: mapIcon(detail.icon),
  };
}

function mapContactHero(cms: StrapiContactHeroSection, order: number): ContactHeroSection {
  return {
    type: "contactHero",
    order,
    badgeLabel: cms.badgeLabel,
    title: cms.title,
    titleHighlight:
      cms.highlightTitle && cms.title.includes(cms.highlightTitle) ? cms.highlightTitle : null,
    subtitle: cms.subtitle,
    contactDetails: cms.contactDetails.map(mapContactDetail),
  };
}

// The CMS has no explicit "multiline" flag on a form field — the last field in the array
// is treated as the long-form message field (matches the reference's own field order).
function mapContactForm(cms: StrapiContactFormSection, order: number): ContactFormSection {
  const fieldCount = cms.contactFormFields.length;
  return {
    type: "contactForm",
    order,
    inquiryLabel: cms.inquiryLabel,
    inquiryOptions: cms.inquiryOptions.map((option, index) => ({
      order: index + 1,
      title: option.title,
    })),
    fields: cms.contactFormFields.map((field, index) => ({
      order: index + 1,
      label: field.nameLabel,
      placeholder: field.namePlaceholder,
      multiline: index === fieldCount - 1,
    })),
    submitLabel: cms.submitBtnText,
    submitUrl: cms.submitBtnUrl,
    disclaimer: cms.disclaimer,
  };
}

function mapBookCallBanner(
  cms: StrapiBookCallBannerSection,
  order: number
): BookCallBannerSection {
  return {
    type: "bookCallBanner",
    order,
    title: cms.title,
    subtitle: cms.subtitle,
    ctaLabel: cms.ctaLabel,
    ctaLink: cms.ctaLink,
    icon: mapIcon(cms.icon),
  };
}

function mapNextStep(step: StrapiContactApproachStep, index: number): NextStep {
  return {
    order: index + 1,
    stepLabel: step.stepLabel,
    title: step.title,
    subtitle: step.subtitle ?? "",
  };
}

function mapNextSteps(cms: StrapiNextStepsSection, order: number): NextStepsSection {
  return {
    type: "nextSteps",
    order,
    title: cms.title,
    steps: cms.approachSteps.map(mapNextStep),
  };
}

// Walks the CMS's real section order, converting each recognized entry into its
// presentation-ready shape. A section that's missing or unrecognized is left out entirely
// — there is no static fallback to substitute in its place.
function mapContactSections(rawSections: StrapiContactSection[]): ContactPageSectionEntry[] {
  return rawSections
    .map((section, index): ContactPageSectionEntry => {
      const order = index + 1;
      switch (section.__component) {
        case "contact-us.contact-us":
          return mapContactHero(section as StrapiContactHeroSection, order);
        case "contact-us.contact-form":
          return mapContactForm(section as StrapiContactFormSection, order);
        case "contact-us.book-call-banner":
          return mapBookCallBanner(section as StrapiBookCallBannerSection, order);
        case "page-reusable-sections.service-detail":
          return mapNextSteps(section as StrapiNextStepsSection, order);
        default:
          return undefined;
      }
    })
    .filter((section): section is Exclude<ContactPageSectionEntry, undefined> => section !== undefined);
}

// Called from the Contact page's Server Component. Returns null only when the CMS itself
// is unreachable — the page then renders a 404 (see page.tsx), matching the construction
// page's own no-static-fallback pattern.
export async function getContactPageContent(): Promise<ContactPageContent | null> {
  const data = await fetchCms<StrapiContactPage>(CONTACT_ENDPOINT);
  if (!data) return null;

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    sections: mapContactSections(data.sections),
  };
}
