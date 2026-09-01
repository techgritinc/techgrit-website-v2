import type { AnySection } from "./shared";

export type StrapiNewsletterFormField = {
  id: number;
  placeholder: string;
};

export type StrapiNewsletterSection = {
  id: number;
  title: string;
  subtitle: string;
  Newsletter: {
    id: number;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaFormFields: StrapiNewsletterFormField[];
  };
  __component: "home.tga-ifirst-engineer";
};

export type NewsletterField = { id: string; placeholder: string };

export type NewsletterData = {
  sectionTitle: string;
  sectionSubtitle: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  fields: NewsletterField[];
};

export function pickNewsletterSection(sections: AnySection[]): StrapiNewsletterSection | undefined {
  return sections.find((s): s is StrapiNewsletterSection => s.__component === "home.tga-ifirst-engineer");
}

export const DEFAULT_NEWSLETTER_DATA: NewsletterData = {
  sectionTitle: "15+ webinars on AI-first engineering. And counting.",
  sectionSubtitle:
    "Over the past two years, TechGrit has hosted more than 15 webinars on AI-first engineering practices.",
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
    sectionTitle: section.title,
    sectionSubtitle: section.subtitle.trim(),
    title: section.Newsletter.title,
    subtitle: section.Newsletter.subtitle,
    ctaLabel: section.Newsletter.ctaLabel,
    fields: section.Newsletter.ctaFormFields.map((field) => ({
      id: String(field.id),
      placeholder: field.placeholder,
    })),
  };
}
