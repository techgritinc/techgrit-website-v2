import { cache } from "react";
import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type { StrapiMedia, StrapiSeo } from "../../types/strapi-common";
import type { LeaderProfile } from "../../types/leadership-types";
import type { ReviewsData, Testimonial } from "../home/reviews";
import type { HeroSection, WhySection } from "@/app/what-we-do/ai-modernization/_data/types";

type StrapiHeroSection = {
  __component: "page-reusable-sections.hero";
  title: string;
  highlightTitle: string | null;
  subtitle: string | null;
  badgeLabel: string | null;
  downloadBtnLabel: string | null;
  primaryBtnLabel: string | null;
  primaryBtnLink: string | null;
  document: StrapiMedia | null;
  backgroundImage: StrapiMedia[];
};

type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  variant: string | null;
  title: string;
  serviceLabel: string | null;
  approachSteps: { id: number; title: string; subtitle: string | null; icon: StrapiMedia | null }[];
};

type StrapiLeadershipTeamSection = {
  __component: "about-us.leadership-team";
  cards: {
    id: number;
    name: string;
    designation: string;
    shortBio: string | null;
    linkedInUrl: string | null;
    profileImage: StrapiMedia[];
  }[];
};

type StrapiReviewsSection = {
  __component: "home.reviews";
  title: string;
  subtitle: string | null;
  badgeLabel: string | null;
  testimonial: {
    id: number;
    reviwerDescription: string;
    mediaType: "Video" | null;
    ratings: number | null;
    video: StrapiMedia | null;
    authors: { name: string; designation: string | null }[];
  }[];
};

type StrapiInsightsSection =
  | StrapiHeroSection
  | StrapiServiceDetailSection
  | StrapiLeadershipTeamSection
  | StrapiReviewsSection
  | { __component: string };

type StrapiInsightsPage = { seo: StrapiSeo; sections: StrapiInsightsSection[] };

export type InsightsPageContent = {
  seo: { metaTitle: string; metaDescription: string };
  hero: HeroSection;
  why: WhySection;
  profiles: LeaderProfile[];
  reviews: ReviewsData;
};

function toInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "TG";
}

function toHero(section: StrapiHeroSection): HeroSection {
  const media = section.backgroundImage[0];
  const ctaLabel = section.downloadBtnLabel ?? section.primaryBtnLabel ?? "";
  const ctaLink = section.document ? resolveMediaUrl(section.document.url) : section.primaryBtnLink ?? "";

  return {
    type: "hero",
    order: 1,
    eyebrow: section.badgeLabel ?? "",
    title: section.title,
    titleHighlight: section.highlightTitle && section.title.includes(section.highlightTitle) ? section.highlightTitle : "",
    subtitle: section.subtitle ?? "",
    primaryCtaLabel: ctaLabel,
    primaryCtaLink: ctaLink,
    image: media
      ? {
          url: resolveMediaUrl(media.url),
          alternativeText: media.alternativeText ?? "",
          width: media.width,
          height: media.height,
        }
      : null,
  };
}

function toWhy(section: StrapiServiceDetailSection): WhySection {
  return {
    type: "why",
    order: 2,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    tiles: section.approachSteps.map((step, index) => ({
      order: index + 1,
      icon: step.icon
        ? {
            url: resolveMediaUrl(step.icon.url),
            alternativeText: step.icon.alternativeText ?? "",
            width: step.icon.width,
            height: step.icon.height,
          }
        : null,
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

function toProfiles(section: StrapiLeadershipTeamSection): LeaderProfile[] {
  return section.cards.map((card, index) => {
    const media = card.profileImage[0];
    return {
      order: index + 1,
      name: card.name,
      role: card.designation,
      bio: card.shortBio ?? "",
      image: media
        ? {
            url: resolveMediaUrl(media.url),
            alternativeText: media.alternativeText ?? "",
            width: media.width,
            height: media.height,
          }
        : null,
      linkedInUrl: card.linkedInUrl,
    };
  });
}

function toReviews(section: StrapiReviewsSection): ReviewsData {
  const testimonials: Testimonial[] = section.testimonial.map((item) => {
    const author = item.authors[0];
    const name = author?.name ?? "TechGrit Client";
    return {
      id: String(item.id),
      type: item.mediaType === "Video" ? "video" : "text",
      quote: item.reviwerDescription,
      name,
      role: author?.designation ?? "",
      initials: toInitials(name),
      rating: item.ratings ?? undefined,
      videoUrl: item.video ? resolveMediaUrl(item.video.url) : null,
    };
  });

  return {
    badgeLabel: section.badgeLabel ?? "What our clients say",
    title: section.title,
    subtitle: section.subtitle ?? "",
    testimonials,
    metrics: [],
  };
}

export const getInsightsPageContent = cache(async (slug: "whitepapers" | "testimonials"): Promise<InsightsPageContent | null> => {
  const data = await fetchCms<StrapiInsightsPage>(`/api/pages/by-slug/${slug}`);
  if (!data) return null;

  const hero = data.sections.find((section): section is StrapiHeroSection => section.__component === "page-reusable-sections.hero");
  const why = data.sections.find((section): section is StrapiServiceDetailSection => {
    if (section.__component !== "page-reusable-sections.service-detail") return false;
    return (section as StrapiServiceDetailSection).variant === "PD-whyAI-assistedModernization";
  });
  const team = data.sections.find(
    (section): section is StrapiLeadershipTeamSection => section.__component === "about-us.leadership-team"
  );
  const reviews = data.sections.find((section): section is StrapiReviewsSection => section.__component === "home.reviews");

  if (!hero || !why || !team || !reviews) return null;

  return {
    seo: { metaTitle: data.seo?.metaTitle ?? data.seo?.metaDescription ?? hero.title, metaDescription: data.seo?.metaDescription ?? hero.subtitle ?? "" },
    hero: toHero(hero),
    why: toWhy(why),
    profiles: toProfiles(team),
    reviews: toReviews(reviews),
  };
});
