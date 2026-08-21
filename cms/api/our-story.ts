import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapHeroFields, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import type {
  StrapiCtaBannerSection,
  StrapiHeroSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type {
  AboutPageContent,
  AboutPageSectionEntry,
  AchievementsSection,
  CultureGallerySection,
  FinalCtaSection,
  HeroSection,
  OurRoleSection,
  PartnerSection,
  ProcessSection,
  ShowcaseSection,
  StrapiAboutPage,
  StrapiAboutSection,
  StrapiAudienceInsightSection,
  StrapiCultureGallerySection,
  StrapiMissionStatementSection,
  StrapiPartnerSuccessSection,
  StrapiServiceDetailSection,
  ValuesSection,
  WhoYouAreSection,
} from "../types/our-story-types";

// Populate paths follow Strapi v5's `on`-keyed dynamic-zone syntax, same convention as
// cms/api/construction.ts and cms/api/contact.ts.
const ABOUT_ENDPOINT =
  "/api/pages/by-slug/our-story" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][about-us.audience-insight][populate][concernsCard][populate]=questions" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate][approachSteps][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.statistics][populate]=statistics" +
  "&populate[sections][on][page-reusable-sections.culture-gallery][populate]=image" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

// --- Per-section mappers ---

function mapHero(fields: ReturnType<typeof mapHeroFields>, order: number): HeroSection {
  return {
    type: "hero",
    order,
    eyebrow: fields.eyebrow,
    title: fields.title,
    titleHighlight: fields.titleHighlight,
    subtitle: fields.subtitle,
    primaryCtaLabel: fields.primaryCtaLabel,
    primaryCtaLink: fields.primaryCtaLink,
    secondaryCtaLabel: fields.secondaryCtaLabel,
    secondaryCtaLink: fields.secondaryCtaLink,
  };
}

// No dedicated CMS component for Showcase — reuses Hero's backgroundImage (see ShowcaseSection).
function mapShowcase(fields: ReturnType<typeof mapHeroFields>, order: number): ShowcaseSection {
  return { type: "showcase", order, image: fields.image };
}

// Matches a concernsCard entry by title (case-insensitive), falling back to positional index
// if the CMS ever renames these labels.
function findConcernCard<T extends { title: string }>(cards: T[], title: string, fallbackIndex: number): T | undefined {
  return cards.find((card) => card.title.toLowerCase() === title.toLowerCase()) ?? cards[fallbackIndex];
}

function mapWhoYouAre(cms: StrapiAudienceInsightSection, order: number): WhoYouAreSection {
  const situationsCard = findConcernCard(cms.concernsCard, "You may be", 0);
  const concernsCardEntry = findConcernCard(cms.concernsCard, "The real concerns", 1);
  const [closingLead = "", closingStatement = ""] = cms.summary.split(/\n\n+/).map((part) => part.trim()).filter(Boolean);

  return {
    type: "whoYouAre",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    paragraphs: cms.subtitle
      .split(/\n\n+/)
      .map((text) => ({ text: text.trim() }))
      .filter((paragraph) => paragraph.text.length > 0),
    concernsCard: {
      situationsLabel: situationsCard?.title ?? "",
      situations: situationsCard?.questions.map((entry) => entry.question) ?? [],
      label: concernsCardEntry?.title ?? "",
      concerns: concernsCardEntry?.questions.map((entry) => entry.question) ?? [],
      closingLead,
      closingStatement,
    },
  };
}

function mapOurRole(cms: StrapiMissionStatementSection, order: number): OurRoleSection {
  return {
    type: "ourRole",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    titleHighlight: cms.highlightTitle && cms.title.includes(cms.highlightTitle) ? cms.highlightTitle : null,
    description: cms.subtitle,
  };
}

// Disambiguates the two "service-detail" entries (values grid vs. 3-step plan) — the CMS
// sends `variant: null` for both, so this checks icon presence instead: values populate
// `icon` on every approach step, process never does.
function isValuesVariant(detail: StrapiServiceDetailSection): boolean {
  return detail.approachSteps.some((step) => step.icon !== null);
}

function mapValues(cms: StrapiServiceDetailSection, order: number): ValuesSection {
  return {
    type: "values",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    values: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
      icon: mapSectionIcon(step.icon),
    })),
  };
}

function mapProcess(cms: StrapiServiceDetailSection, order: number): ProcessSection {
  return {
    type: "process",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    subtitle: cms.subtitle ?? "",
    steps: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      label: step.stepLabel ?? "",
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

function mapAchievements(cms: StrapiStatisticsSection, order: number): AchievementsSection {
  return { type: "achievements", order, stats: mapStatistics(cms) };
}

function mapPartner(cms: StrapiPartnerSuccessSection, order: number): PartnerSection {
  const important = cms.importantSection[0];
  return {
    type: "partner",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    description: cms.subtitle,
    outcomes: cms.benefits.map((benefit, index) => ({ order: index + 1, text: benefit.title })),
    closingLabel: important?.label ?? "",
    closingText: important?.value ?? "",
  };
}

function mapCultureGallery(cms: StrapiCultureGallerySection, order: number): CultureGallerySection {
  return {
    type: "cultureGallery",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    subtitle: cms.subtitle,
    photos: cms.image.map((media) => {
      const asset = pickMediaAsset(media, ["medium", "small"]);
      return { id: String(media.url), src: resolveMediaUrl(asset.url), alt: media.alternativeText ?? "" };
    }),
  };
}

// Walks the CMS's real section order into presentation-ready entries. A missing or
// unrecognized section is left out entirely — no static fallback. Hero is the one exception:
// it expands into two entries (Hero + the synthesized Showcase), hence the running counter.
function mapAboutSections(rawSections: StrapiAboutSection[]): AboutPageSectionEntry[] {
  const entries: Exclude<AboutPageSectionEntry, undefined>[] = [];
  let order = 0;

  for (const section of rawSections) {
    switch (section.__component) {
      case "page-reusable-sections.hero": {
        const fields = mapHeroFields(section as StrapiHeroSection);
        entries.push(mapHero(fields, ++order), mapShowcase(fields, ++order));
        break;
      }
      case "about-us.audience-insight":
        entries.push(mapWhoYouAre(section as StrapiAudienceInsightSection, ++order));
        break;
      case "about-us.mission-statement":
        entries.push(mapOurRole(section as StrapiMissionStatementSection, ++order));
        break;
      case "page-reusable-sections.service-detail": {
        const detail = section as StrapiServiceDetailSection;
        entries.push(isValuesVariant(detail) ? mapValues(detail, ++order) : mapProcess(detail, ++order));
        break;
      }
      case "page-reusable-sections.statistics":
        entries.push(mapAchievements(section as StrapiStatisticsSection, ++order));
        break;
      case "about-us.partner-success":
        entries.push(mapPartner(section as StrapiPartnerSuccessSection, ++order));
        break;
      case "page-reusable-sections.culture-gallery":
        entries.push(mapCultureGallery(section as StrapiCultureGallerySection, ++order));
        break;
      case "page-reusable-sections.cta-banner": {
        const fields = mapCtaBanner(section as StrapiCtaBannerSection);
        entries.push({
          type: "finalCta",
          order: ++order,
          eyebrow: fields.eyebrow,
          title: fields.title,
          description: fields.description,
          ctaLabel: fields.primaryCtaLabel,
          ctaLink: fields.primaryCtaLink,
        } satisfies FinalCtaSection);
        break;
      }
      default:
        break;
    }
  }

  return entries;
}

// Called from the About page's Server Component. Returns null only when the CMS itself is
// unreachable — the page then renders a 404, matching Contact/Construction's pattern.
//
// Wrapped in React's cache() because generateMetadata() and the page component each call
// this independently — without memoization, one page request fires two identical CMS
// requests. cache() scopes the memoized result to a single request's render pass (not
// shared across requests), so only the first call actually hits the network.
export const getAboutPageContent = cache(async (): Promise<AboutPageContent | null> => {
  const data = await fetchCms<StrapiAboutPage>(ABOUT_ENDPOINT);
  if (!data) return null;

  return {
    seo: { metaTitle: data.seo?.metaTitle ?? "", metaDescription: data.seo?.metaDescription ?? "" },
    sections: mapAboutSections(data.sections),
  };
});
