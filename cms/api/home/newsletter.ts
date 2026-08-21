import type { AnySection } from "./shared";

export type StrapiNewsletterFormField = {
  id: number;
  placeholder: string;
};

export type StrapiNewsletterSection = {
  id: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaFormFields: StrapiNewsletterFormField[];
  __component: "page-reusable-sections.newsletter";
};

export type NewsletterField = { id: string; placeholder: string };

export type NewsletterData = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  fields: NewsletterField[];
};

export function pickNewsletterSection(sections: AnySection[]): StrapiNewsletterSection | undefined {
  return sections.find((s): s is StrapiNewsletterSection => s.__component === "page-reusable-sections.newsletter");
}

export const DEFAULT_NEWSLETTER_DATA: NewsletterData = {
  title: "Stay ahead of the legacy.",
  subtitle: "Subscribe to be the first to know when we announce our next session.",
  ctaLabel: "Submit",
  fields: [
    { id: "name", placeholder: "Name" },
    { id: "email", placeholder: "Business Email" },
  ],
};

export function toNewsletter(section: StrapiNewsletterSection): NewsletterData {
  return {
    title: section.title,
    subtitle: section.subtitle,
    ctaLabel: section.ctaLabel,
    fields: section.ctaFormFields.map((field) => ({ id: String(field.id), placeholder: field.placeholder })),
  };
}
