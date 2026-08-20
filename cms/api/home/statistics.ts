import type { AnySection } from "./shared";

// page-reusable-sections.statistics — reused 3x across the page (hero live-webinar
// badge, hero delivery stats, testimonial metrics), disambiguated by occurrence
// order rather than a distinguishing field.

export type StrapiStatistic = {
  id: number;
  title: string;
  highlightTitle: string | null;
  subtitle: string | null;
  featureLabel: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
};

export type StrapiStatisticsSection = {
  id: number;
  statistics: StrapiStatistic[];
  __component: "page-reusable-sections.statistics";
};

export function pickStatisticsSections(sections: AnySection[]): StrapiStatisticsSection[] {
  return sections.filter((s): s is StrapiStatisticsSection => s.__component === "page-reusable-sections.statistics");
}

// Parses a stat's leading number out of its title (e.g. "12+ years", "500+",
// "6wk") and — when `highlightTitle` names the trailing portion — splits the
// remainder into a `suffix` (rendered right after the number) and a `postSuffix`
// (rendered as its own styled span). Shared by hero.ts (delivery stats) and
// reviews.ts (testimonial metrics), the other two consumers of this component.
export function parseStatValue(
  raw: string,
  highlightTitle: string | null,
): { count?: number; suffix?: string; postSuffix?: string; staticValue?: string } {
  const match = raw.match(/^(\d+)/);
  if (!match) return { staticValue: raw };
  const count = Number(match[0]);
  const rest = raw.slice(match[0].length);
  if (highlightTitle && rest.length > highlightTitle.length && rest.toLowerCase().endsWith(highlightTitle.toLowerCase())) {
    const suffix = rest.slice(0, rest.length - highlightTitle.length).trim();
    return { count, suffix: suffix || undefined, postSuffix: highlightTitle };
  }
  return { count, suffix: rest.trim() || undefined };
}
