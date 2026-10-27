import type { AnySection } from "./shared";
import type { StrapiStatistic } from "./statistics";
import { parseStatValue } from "./statistics";

export type StrapiHeroSection = {
  id: number;
  title: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string;
  secondaryBtnLink: string;
  highlightTitle: string;
  __component: "page-reusable-sections.hero";
};

export type HeroStat = {
  id: string;
  label: string;
  count?: number;
  suffix?: string;
  suffixClassName?: string;
  postSuffix?: string;
  postSuffixClassName?: string;
  staticValue?: string;
};

export type HeroData = {
  badge?: { label: string; text: string; href: string };
  title: string;
  highlightTitle: string;
  subtitle: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  stats: HeroStat[];
};

export function pickHeroSection(sections: AnySection[]): StrapiHeroSection | undefined {
  return sections.find((s): s is StrapiHeroSection => s.__component === "page-reusable-sections.hero");
}

export function toHeroStats(statistics: StrapiStatistic[] | undefined): HeroStat[] {
  if (!statistics) return [];
  return statistics.map((stat, index) => {
    const isLast = index === statistics.length - 1;
    const parsed = parseStatValue(stat.title, stat.highlightTitle);
    // The "+" suffix (500+, 70+, 12+) reads as part of the number, so it's white
    // like the digits themselves; a word suffix ("years", "weeks") keeps the amber accent.
    const suffixColor = parsed.suffix === "+" ? "text-primary" : "text-amber-light";
    return {
      id: String(stat.id),
      label: stat.subtitle ?? "",
      ...parsed,
      suffixClassName: isLast ? `${suffixColor} text-stat` : suffixColor,
      postSuffixClassName: parsed.postSuffix ? "text-amber-light text-stat ml-2" : undefined,
    };
  });
}

export function toHero(section: StrapiHeroSection, badgeStat: StrapiStatistic | undefined): HeroData {
  return {
    badge: badgeStat ? { label: badgeStat.title, text: badgeStat.subtitle ?? "", href: badgeStat.ctaLink ?? "" } : undefined,
    title: section.title,
    highlightTitle: section.highlightTitle,
    subtitle: section.subtitle,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    stats: [],
  };
}
