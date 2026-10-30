import { resolveMediaUrl } from "../../utils/media";
import type { AnySection, StrapiMedia } from "./shared";
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
  backgroundImage?: StrapiMedia[] | null;
  __component: "page-reusable-sections.hero";
};

// Bundled with the site, so the hero still has a background when the CMS hero has no
// video in `backgroundImage`.
export const HERO_FALLBACK_VIDEO = "/assets/hero/wave.mp4";

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
  background: { videoSrc: string; posterSrc?: string };
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

// The CMS field is named backgroundImage but accepts videos too: the first video is the
// hero background and the first image its poster (shown until the video can play). The
// poster is only used alongside a CMS video, so an image meant for something else never
// sits over the bundled fallback video.
function toHeroBackground(media: StrapiMedia[] | null | undefined): HeroData["background"] {
  const items = media ?? [];
  const video = items.find((m) => m.mime?.startsWith("video/"));
  if (!video) return { videoSrc: HERO_FALLBACK_VIDEO };
  const poster = items.find((m) => m.mime?.startsWith("image/"));
  return {
    videoSrc: resolveMediaUrl(video.url),
    posterSrc: poster ? resolveMediaUrl(poster.url) : undefined,
  };
}

export function toHero(section: StrapiHeroSection, badgeStat: StrapiStatistic | undefined): HeroData {
  return {
    badge: badgeStat ? { label: badgeStat.title, text: badgeStat.subtitle ?? "", href: badgeStat.ctaLink ?? "" } : undefined,
    title: section.title,
    highlightTitle: section.highlightTitle,
    subtitle: section.subtitle,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    background: toHeroBackground(section.backgroundImage),
    stats: [],
  };
}
