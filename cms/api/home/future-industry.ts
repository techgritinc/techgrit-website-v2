import type { AnySection, HomeIcon, StrapiMedia } from "./shared";
import { toIcon } from "./shared";

export type StrapiIndustry = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  ctaLink: string | null;
  icon: StrapiMedia | null;
};

export type StrapiFutureIndustrySection = {
  id: number;
  title: string;
  subtitle: string;
  exploreIndustryLabel: string;
  exploreIndustryLink: string;
  industries: StrapiIndustry[];
  __component: "home.future-industry";
};

export type IndustryCard = { id: string; slug: string; title: string; description: string; href: string | null; icon: HomeIcon | null };

export type FutureIndustryData = {
  title: string;
  subtitle: string;
  exploreLabel: string;
  exploreLink: string;
  industries: IndustryCard[];
};

export function pickFutureIndustrySection(sections: AnySection[]): StrapiFutureIndustrySection | undefined {
  return sections.find((s): s is StrapiFutureIndustrySection => s.__component === "home.future-industry");
}

export function toFutureIndustry(section: StrapiFutureIndustrySection): FutureIndustryData {
  const industries: IndustryCard[] = section.industries.map((industry) => ({
    id: String(industry.id),
    slug: industry.slug,
    title: industry.title,
    description: industry.subtitle,
    href: industry.ctaLink,
    icon: toIcon(industry.icon),
  }));

  return {
    title: section.title,
    subtitle: section.subtitle,
    exploreLabel: section.exploreIndustryLabel,
    exploreLink: section.exploreIndustryLink,
    industries,
  };
}
