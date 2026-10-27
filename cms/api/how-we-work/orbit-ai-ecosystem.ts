import { cache } from "react";
import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type { StrapiMedia } from "../../types/header-types";
import type {
  CapabilitiesSection,
  ChallengesSection,
  FinalCtaSection,
  FrameworkCard,
  HeroSection,
  IntegratedPathSection,
  OrbitAiPageContent,
  OrbitAiSection,
  SectionImage,
  ServiceDetailSection,
  ServiceDetailVariant,
  StrapiOrbitAiCapabilitiesSection,
  StrapiOrbitAiChallengesSection,
  StrapiOrbitAiCtaBannerSection,
  StrapiOrbitAiFeature,
  StrapiOrbitAiHeroSection,
  StrapiOrbitAiPage,
  StrapiOrbitAiSection,
  StrapiOrbitAiServiceDetailSection,
} from "../../types/orbit-ai-ecosystem-types";

const ORBIT_AI_ECOSYSTEM_ENDPOINT = "/api/pages/by-slug/orbit-ai-ecosystem";

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

function toHeroSection(section: StrapiOrbitAiHeroSection, order: number): HeroSection {
  return {
    type: "hero",
    order,
    badgeLabel: section.badgeLabel,
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

// The CMS's `eyebrow` field ships null on both occurrences of this component —
// falls back to `title` itself, same convention as `toIntroSection` in
// cms/api/what-we-do/ai-modernization.ts (and matches the reference design,
// where the eyebrow label and the heading show the same text).
function toChallengesSection(section: StrapiOrbitAiChallengesSection, order: number): ChallengesSection {
  const features: StrapiOrbitAiFeature[] = section.blockers?.features ?? [];
  return {
    type: "challenges",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.title,
    subtitle: section.subtitle,
    extraTitle: section.extraTitle ?? undefined,
    chips: features.map((f) => ({
      id: String(f.id),
      label: f.title,
      icon: toIconImage(f.icon),
    })),
  };
}

// "How OrbitAI Works" ships 5 fully-populated cards; "One Integrated Path" ships
// exactly 1 card with categoryLabel/title/subtitle all null — that single-null-card
// shape is how the CMS distinguishes the two occurrences of this same component.
function isIntegratedPathShape(section: StrapiOrbitAiCapabilitiesSection): boolean {
  return section.capabilityCard.length === 1 && section.capabilityCard[0].title === null;
}

function toCapabilitiesSection(section: StrapiOrbitAiCapabilitiesSection, order: number): CapabilitiesSection {
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
    eyebrow: section.badgeLabel,
    title: section.title,
    description: section.subtitle,
    cards,
  };
}

function toIntegratedPathSection(section: StrapiOrbitAiCapabilitiesSection, order: number): IntegratedPathSection {
  const card = section.capabilityCard[0];
  return {
    type: "integratedPath",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    features: card.features.map((f) => ({
      id: String(f.id),
      title: f.title,
      subtitle: f.subtitle ?? "",
    })),
    resultLabel: card.structureInfo?.label ?? undefined,
    resultText: card.structureInfo?.description ?? undefined,
  };
}

const SERVICE_DETAIL_VARIANTS: Record<string, ServiceDetailVariant> = {
  "PD-modernizationLifecycle": "achieve",
  "PD-strategiesWeSupport": "understanding",
  "PD-whyAI-assistedModernization": "why",
};

function toServiceDetailSection(section: StrapiOrbitAiServiceDetailSection, order: number): ServiceDetailSection | null {
  const variant = SERVICE_DETAIL_VARIANTS[section.variant];
  if (!variant) return null;

  return {
    type: "serviceDetail",
    order,
    variant,
    serviceLabel: section.serviceLabel ?? undefined,
    title: section.title,
    subtitle: section.subtitle ?? undefined,
    steps: section.approachSteps.map((step) => ({
      id: String(step.id),
      order: step.id,
      title: step.title,
      subtitle: step.subtitle ?? "",
      icon: toIconImage(step.icon),
    })),
  };
}

function toCtaSection(section: StrapiOrbitAiCtaBannerSection, order: number): FinalCtaSection {
  return {
    type: "finalCta",
    order,
    badgeLabel: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryCtaLabel ?? "Get in touch",
    primaryCtaLink: section.primaryCtaLink ?? "/contact-us/",
    secondaryCtaLabel: section.secondaryCtaLabel ?? undefined,
    secondaryCtaLink: section.secondaryCtaLink ?? undefined,
  };
}

function toSection(raw: StrapiOrbitAiSection, order: number): OrbitAiSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toChallengesSection(raw, order);
    case "page-reusable-sections.pd-modernization-capabilities":
      return isIntegratedPathShape(raw) ? toIntegratedPathSection(raw, order) : toCapabilitiesSection(raw, order);
    case "page-reusable-sections.service-detail":
      return toServiceDetailSection(raw, order);
    case "page-reusable-sections.cta-banner":
      return toCtaSection(raw, order);
    default:
      return null;
  }
}

// Called directly from the (async) Orbit AI Ecosystem Server Component
// (await getOrbitAiEcosystemData()) — runs on the server for every request, so
// CMS edits show up on the next page load with no rebuild. No static fallback
// content: getOrbitAiEcosystemData() returns null when the CMS is unreachable
// or returns no usable sections, and the page itself calls notFound() in that
// case — matching the what-we-do/ai-modernization precedent exactly.
//
// Wrapped in React's cache() because generateMetadata() and the page component
// each call this independently — without memoization, one page request fires
// two identical CMS requests.
export const getOrbitAiEcosystemData = cache(async (): Promise<OrbitAiPageContent | null> => {
  const data = await fetchCms<StrapiOrbitAiPage>(ORBIT_AI_ECOSYSTEM_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is OrbitAiSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "Orbit AI Ecosystem | TechGrit",
      metaDescription:
        data.seo?.metaDescription ??
        "OrbitAI brings TechGrit's proprietary frameworks, AI-assisted engineering capabilities, and delivery methodologies together in one integrated operating model.",
    },
    sections,
  };
});
