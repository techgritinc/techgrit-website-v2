import type { AnySection } from "./shared";

export type StrapiNewsletterFormField = {
  id: number;
  placeholder: string;
};

// The CMS nests the actual newsletter fields under a `Newsletter` sub-component,
// inside an outer dynamic-zone entry named `home.tga-ifirst-engineer` (its own
// top-level `title`/`subtitle` duplicate the reviews section's copy and aren't
// used by this mapper — SubscribeBand only renders the nested `Newsletter` data).
export type StrapiNewsletterSection = {
  id: number;
  title: string;
  subtitle: string;
  Newsletter: {
    id: number;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaLink: string | null;
    extraTitle: string | null;
    highlightTitle: string | null;
    ctaFormFields: StrapiNewsletterFormField[];
  };
  __component: "home.tga-ifirst-engineer";
};

export type NewsletterField = { id: string; placeholder: string };

export type NewsletterData = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  fields: NewsletterField[];
};

export function pickNewsletterSection(sections: AnySection[]): StrapiNewsletterSection | undefined {
  return sections.find((s): s is StrapiNewsletterSection => s.__component === "home.tga-ifirst-engineer");
}

export function toNewsletter(section: StrapiNewsletterSection): NewsletterData {
  return {
    title: section.Newsletter.title,
    subtitle: section.Newsletter.subtitle,
    ctaLabel: section.Newsletter.ctaLabel,
    fields: section.Newsletter.ctaFormFields.map((field) => ({ id: String(field.id), placeholder: field.placeholder })),
  };
}
