import { cache } from "react";
import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type { StrapiMedia } from "../../types/header-types";
import type {
  CapabilitiesSection,
  FinalCtaSection,
  FindFitSection,
  FrameworkCard,
  HeroSection,
  EngagementModelsPageContent,
  EngagementModelsSection,
  SectionImage,
  StrapiAudienceInsightSection,
  StrapiEngagementModelsCapabilitiesSection,
  StrapiEngagementModelsChallengesSection,
  StrapiEngagementModelsCtaBannerSection,
  StrapiEngagementModelsFeature,
  StrapiEngagementModelsHeroSection,
  StrapiEngagementModelsPage,
  StrapiEngagementModelsSection,
  WhySection,
} from "../../types/engagement-models-types";

const ENGAGEMENT_MODELS_ENDPOINT = "/api/pages/by-slug/engagement-models";

function toImage(media: StrapiMedia[] | undefined): SectionImage | null {
  const first = media?.[0];
  if (!first) return null;
  return {
    url: resolveMediaUrl(first.url),
    alternativeText: first.alternativeText ?? "",
    width: first.width,
    height: first.height,
  };
}

function toIconImage(media: StrapiMedia | null): SectionImage | null {
  if (!media) return null;
  return {
    url: resolveMediaUrl(media.url),
    alternativeText: media.alternativeText ?? "",
    width: media.width,
    height: media.height,
  };
}

function toHeroSection(section: StrapiEngagementModelsHeroSection, order: number): HeroSection {
  return {
    type: "hero",
    order,
    badgeLabel: section.badgeLabel ?? undefined,
    title: section.title,
    titleHighlight: section.highlightTitle,
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryBtnLabel,
    primaryCtaLink: section.primaryBtnLink,
    secondaryCtaLabel: section.secondaryBtnLabel ?? undefined,
    secondaryCtaLink: section.secondaryBtnLink ?? undefined,
    image: toImage(section.backgroundImage),
  };
}

function toCapabilitiesSection(section: StrapiEngagementModelsCapabilitiesSection, order: number): CapabilitiesSection {
  const cards: FrameworkCard[] = section.capabilityCard.map((card) => ({
    id: String(card.id),
    categoryLabel: card.categoryLabel ?? "",
    title: card.title ?? "",
    subtitle: card.subtitle ?? "",
    features: card.features.map((f) => ({ id: String(f.id), text: f.title })),
    outcomeLabel: card.structureInfo?.label ?? undefined,
    outcomeText: card.structureInfo?.description ?? undefined,
  }));

  return {
    type: "capabilities",
    order,
    eyebrow: section.badgeLabel ?? undefined,
    title: section.title,
    description: section.subtitle,
    cards,
  };
}

// No fallback: `eyebrow` renders exactly what the CMS supplies, omitted when
// null — deliberately NOT the `eyebrow ?? title` convention used by the
// equivalent component on orbit-ai-ecosystem/ai-modernization (Clarification Q8).
function toWhySection(section: StrapiEngagementModelsChallengesSection, order: number): WhySection {
  const features: StrapiEngagementModelsFeature[] = section.blockers?.features ?? [];
  return {
    type: "why",
    order,
    eyebrow: section.eyebrow ?? undefined,
    title: section.title,
    description: section.subtitle,
    chips: features.map((f) => ({
      id: String(f.id),
      label: f.title,
      icon: toIconImage(f.icon),
    })),
  };
}

// New CMS component with no existing parser elsewhere in the codebase — a
// generic 2-group comparison shape (`concernsCard`), confirmed live as
// "Your Goal" (index 0, icons present) / "Recommended Model" (index 1, no
// icons). Rows pair by array index across both groups. `eyebrow` renders
// `badgeLabel` as-is, omitted when null — no hardcoded fallback (Q8
// supersedes Q6). A malformed payload (not exactly 2 groups) is dropped
// entirely rather than rendering a partial/misaligned comparison.
function toFindFitSection(section: StrapiAudienceInsightSection, order: number): FindFitSection | null {
  if (section.concernsCard.length !== 2) return null;
  const [goal, model] = section.concernsCard;

  return {
    type: "findFit",
    order,
    eyebrow: section.badgeLabel ?? undefined,
    title: section.title,
    goalColumn: {
      label: goal.title,
      rows: goal.questions.map((q) => ({
        id: String(q.id),
        text: q.question,
        icon: toIconImage(q.icon),
      })),
    },
    modelColumn: {
      label: model.title,
      rows: model.questions.map((q) => ({
        id: String(q.id),
        text: q.question,
        icon: toIconImage(q.icon),
      })),
    },
  };
}

function toCtaSection(section: StrapiEngagementModelsCtaBannerSection, order: number): FinalCtaSection {
  return {
    type: "finalCta",
    order,
    badgeLabel: section.badgeLabel ?? undefined,
    title: section.title,
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryCtaLabel ?? "Get in touch",
    primaryCtaLink: section.primaryCtaLink ?? "/contact-us/",
    secondaryCtaLabel: section.secondaryCtaLabel ?? undefined,
    secondaryCtaLink: section.secondaryCtaLink ?? undefined,
  };
}

function toSection(raw: StrapiEngagementModelsSection, order: number): EngagementModelsSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.pd-modernization-capabilities":
      return toCapabilitiesSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toWhySection(raw, order);
    case "about-us.audience-insight":
      return toFindFitSection(raw, order);
    case "page-reusable-sections.cta-banner":
      return toCtaSection(raw, order);
    default:
      return null;
  }
}

// Called directly from the (async) Engagement Models Server Component
// (await getEngagementModelsData()) — runs on the server for every request,
// so CMS edits show up on the next page load with no rebuild. No static
// fallback content: getEngagementModelsData() returns null when the CMS is
// unreachable or returns no usable sections, and the page itself calls
// notFound() in that case — matching the ai-modernization/orbit-ai-ecosystem
// precedent exactly.
//
// Wrapped in React's cache() because generateMetadata() and the page
// component each call this independently — without memoization, one page
// request fires two identical CMS requests.
export const getEngagementModelsData = cache(async (): Promise<EngagementModelsPageContent | null> => {
  const data = await fetchCms<StrapiEngagementModelsPage>(ENGAGEMENT_MODELS_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is EngagementModelsSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "Engagement Models | TechGrit",
      metaDescription:
        data.seo?.metaDescription ??
        "Flexible engagement models — Dedicated Product Team, MVP Development, and Staff Augmentation — backed by TechGrit's AI-first engineering practices and proven delivery frameworks.",
    },
    sections,
  };
});
