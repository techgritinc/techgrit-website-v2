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
  gradient?: boolean;
};

export type HeroData = {
  badge: { label: string; text: string; href: string };
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

// Last-resort fallback if the CMS is genuinely unreachable — matches the
// header/footer precedent of a "bare" rather than pixel-identical rare-case degrade.
export const DEFAULT_HERO_DATA: HeroData = {
  badge: { label: "Live Webinar", text: "Orchestrating the AI-First SDLC", href: "/insights/webinar" },
  title: "From strategic intent to production-grade software, with full accountability.",
  highlightTitle: "production-grade software,",
  subtitle:
    "For over a decade, mid-market enterprises have trusted TechGrit to turn complex technology decisions into real, working systems. We don't hand off a prototype and leave. We own the outcome, end to end.",
  primaryBtn: { label: "Build Your AI-First Future", href: "#contact" },
  secondaryBtn: { label: "View the OrbitAI™ Methodology", href: "#methodology" },
  stats: [
    { id: "sucessful-projects", count: 500, suffix: "+", suffixClassName: "text-amber-light", label: "Successful Projects" },
    { id: "sucessful-clients", count: 70, suffix: "+", suffixClassName: "text-amber-light", label: "Successful Clients" },
    {
      id: "deep-industry-expertise",
      count: 12,
      suffix: "+",
      suffixClassName: "text-amber-light",
      postSuffix: "years",
      postSuffixClassName: "text-amber-light text-stat ml-2",
      label: "Deep Industry Expertise",
    },
    {
      id: "sprint-to-scale",
      count: 6,
      suffix: " weeks",
      suffixClassName: "text-amber-light text-stat",
      label: "AI deployed. Fast. Scalable.",
      gradient: true,
    },
  ],
};

export function toHeroStats(statistics: StrapiStatistic[] | undefined): HeroStat[] {
  if (!statistics) return DEFAULT_HERO_DATA.stats;
  return statistics.map((stat, index) => {
    const isLast = index === statistics.length - 1;
    const parsed = parseStatValue(stat.title, stat.highlightTitle);
    return {
      id: String(stat.id),
      label: stat.subtitle ?? "",
      ...parsed,
      suffixClassName: isLast ? "text-amber-light text-stat" : "text-amber-light",
      postSuffixClassName: parsed.postSuffix ? "text-amber-light text-stat ml-2" : undefined,
      gradient: isLast,
    };
  });
}

export function toHero(section: StrapiHeroSection, badgeStat: StrapiStatistic | undefined): HeroData {
  return {
    badge: badgeStat
      ? { label: badgeStat.title, text: badgeStat.subtitle ?? "", href: badgeStat.ctaLink ?? DEFAULT_HERO_DATA.badge.href }
      : DEFAULT_HERO_DATA.badge,
    title: section.title,
    highlightTitle: section.highlightTitle,
    subtitle: section.subtitle,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    stats: DEFAULT_HERO_DATA.stats,
  };
}
