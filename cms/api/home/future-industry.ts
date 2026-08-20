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

export const DEFAULT_FUTURE_INDUSTRY_DATA: FutureIndustryData = {
  title: "Building the Future of Industry Platforms",
  subtitle:
    "Our AI-first engineering approach helps organizations modernize infrastructure and unlock innovation across key industries.",
  exploreLabel: "Explore Industry Solutions",
  exploreLink: "/construction",
  industries: [
    {
      id: "fintech",
      slug: "fintech",
      title: "Fintech",
      description:
        "Build secure and scalable financial platforms—from digital payments and investment systems to AI-driven financial analytics.",
      href: null,
      icon: null,
    },
    {
      id: "healthcare",
      slug: "healthcare",
      title: "Healthcare",
      description:
        "Design intelligent healthcare platforms that improve patient experiences, streamline workflows, and power data-driven care.",
      href: null,
      icon: null,
    },
    {
      id: "construction",
      slug: "construction",
      title: "Construction",
      description: "Develop smart construction management platforms that optimize planning, project tracking, and operational efficiency.",
      href: "/construction",
      icon: null,
    },
  ],
};

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
    industries: industries.length > 0 ? industries : DEFAULT_FUTURE_INDUSTRY_DATA.industries,
  };
}
