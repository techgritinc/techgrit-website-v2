import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapHeroFields, mapSectionIcon } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";
import type {
  LeaderProfile,
  LeadershipPageContent,
  RationaleTile,
  WhyItMattersSection,
} from "../types/leadership-types";

const LEADERSHIP_ENDPOINT =
  "/api/pages/by-slug/leadership-advisory" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][about-us.leadership-team][populate][cards][populate]=profileImage" +
  "&populate[sections][on][about-us.why-it-matters][populate][features][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

type StrapiLeadershipCard = {
  id: number;
  name: string;
  designation: string;
  shortBio: string;
  linkedInUrl: string | null;
  profileImage: StrapiMedia[];
};

type StrapiLeadershipTeamSection = {
  __component: "about-us.leadership-team";
  cards: StrapiLeadershipCard[];
};

type StrapiWhyItMattersFeature = {
  id: number;
  title: string;
  subtitle: string;
  icon: StrapiMedia | null;
};

type StrapiWhyItMattersSection = {
  __component: "about-us.why-it-matters";
  title: string;
  subtitle: string;
  badgeLabel: string | null;
  features: StrapiWhyItMattersFeature[];
};

type StrapiLeadershipSection =
  | StrapiHeroSection
  | StrapiLeadershipTeamSection
  | StrapiWhyItMattersSection
  | StrapiCtaBannerSection
  | { __component: string };

type StrapiLeadershipPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiLeadershipSection[];
};

function mapProfile(card: StrapiLeadershipCard, order: number): LeaderProfile {
  const media = card.profileImage[0];
  const asset = media ? pickMediaAsset(media, ["medium", "small"]) : null;

  return {
    order,
    name: card.name,
    role: card.designation,
    bio: card.shortBio,
    image:
      asset && media
        ? {
            url: resolveMediaUrl(asset.url),
            alternativeText: media.alternativeText ?? "",
            width: asset.width,
            height: asset.height,
          }
        : null,
    linkedInUrl: card.linkedInUrl,
  };
}

function mapWhyItMatters(cms: StrapiWhyItMattersSection): WhyItMattersSection {
  return {
    eyebrow: cms.badgeLabel ?? "",
    title: cms.title,
    description: cms.subtitle,
    tiles: cms.features.map((feature, index): RationaleTile => ({
      order: index + 1,
      icon: mapSectionIcon(feature.icon),
      title: feature.title,
      description: feature.subtitle,
    })),
  };
}

// Called from the Leadership & Advisory page's Server Component. Returns null only when
// the CMS itself is unreachable, or the four expected sections aren't all present — the
// page then renders a 404, matching About/Construction's pattern.
//
// Wrapped in React's cache() because generateMetadata() and the page component each call
// this independently — without memoization, one page request fires two identical CMS
// requests.
export const getLeadershipPageContent = cache(async (): Promise<LeadershipPageContent | null> => {
  const data = await fetchCms<StrapiLeadershipPage>(LEADERSHIP_ENDPOINT);
  if (!data) return null;

  const hero = data.sections.find(
    (section): section is StrapiHeroSection => section.__component === "page-reusable-sections.hero"
  );
  const team = data.sections.find(
    (section): section is StrapiLeadershipTeamSection => section.__component === "about-us.leadership-team"
  );
  const whyItMatters = data.sections.find(
    (section): section is StrapiWhyItMattersSection => section.__component === "about-us.why-it-matters"
  );
  const finalCta = data.sections.find(
    (section): section is StrapiCtaBannerSection => section.__component === "page-reusable-sections.cta-banner"
  );

  if (!hero || !team || !whyItMatters || !finalCta) return null;

  const heroFields = mapHeroFields(hero);
  const ctaFields = mapCtaBanner(finalCta);

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    hero: {
      badgeLabel: heroFields.eyebrow,
      title: heroFields.title,
      titleHighlight: heroFields.titleHighlight,
      subtitle: heroFields.subtitle,
      primaryCtaLabel: heroFields.primaryCtaLabel,
      primaryCtaLink: heroFields.primaryCtaLink,
      secondaryCtaLabel: heroFields.secondaryCtaLabel,
      secondaryCtaLink: heroFields.secondaryCtaLink,
    },
    profiles: team.cards.map((card, index) => mapProfile(card, index + 1)),
    whyItMatters: mapWhyItMatters(whyItMatters),
    finalCta: {
      eyebrow: ctaFields.eyebrow,
      title: ctaFields.title,
      description: ctaFields.description,
      ctaLabel: ctaFields.primaryCtaLabel,
      ctaLink: ctaFields.primaryCtaLink,
      secondaryCta:
        ctaFields.secondaryCtaLabel && ctaFields.secondaryCtaLink
          ? { label: ctaFields.secondaryCtaLabel, link: ctaFields.secondaryCtaLink }
          : undefined,
    },
  };
});
