import { cache } from "react";
import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type { StrapiMedia } from "../../types/header-types";
import type {
  CapabilitiesSection,
  ChipItem,
  DeliverablesSection,
  DiscoverySprintsPageContent,
  DiscoverySprintsSection,
  FaqSection,
  FinalCtaSection,
  FrameworkCard,
  HeroSection,
  IdealForSection,
  IntroSection,
  PhaseZeroSection,
  SectionImage,
  ServiceDetailSection,
  ServiceDetailVariant,
  StrapiDiscoverySprintsCapabilitiesSection,
  StrapiDiscoverySprintsChallengesSection,
  StrapiDiscoverySprintsCtaBannerSection,
  StrapiDiscoverySprintsFaqSection,
  StrapiDiscoverySprintsFeature,
  StrapiDiscoverySprintsHeroSection,
  StrapiDiscoverySprintsPage,
  StrapiDiscoverySprintsSection,
  StrapiDiscoverySprintsServiceDetailSection,
} from "../../types/discovery-sprints-types";

const DISCOVERY_SPRINTS_ENDPOINT = "/api/pages/by-slug/discovery-sprints";

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

function toHeroSection(section: StrapiDiscoverySprintsHeroSection, order: number): HeroSection {
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

// "modernization-challenges" is reused 4 times with no discriminator field — classify by shape.
function classifyChallenges(
  section: StrapiDiscoverySprintsChallengesSection
): "intro" | "phaseZero" | "deliverables" | "idealFor" {
  const features = section.blockers?.features ?? [];
  if (features.length === 1) return "phaseZero";
  if (section.eyebrow === null && section.subtitle === null) return "idealFor";
  if (section.eyebrow?.toLowerCase().includes("artifact")) return "deliverables";
  return "intro";
}

function toIntroSection(section: StrapiDiscoverySprintsChallengesSection, order: number): IntroSection {
  const features: StrapiDiscoverySprintsFeature[] = section.blockers?.features ?? [];
  return {
    type: "intro",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.title,
    subtitle: section.subtitle ?? "",
    extraTitle: section.extraTitle ?? undefined,
    chipsLabel: section.blockers?.name ?? undefined,
    chips: features.map(
      (f): ChipItem => ({ id: String(f.id), label: f.title, icon: toIconImage(f.icon) })
    ),
  };
}

function toPhaseZeroSection(section: StrapiDiscoverySprintsChallengesSection, order: number): PhaseZeroSection {
  const card = section.blockers!.features[0];
  return {
    type: "phaseZero",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.title,
    subtitle: section.subtitle ?? "",
    cardTitle: card.title,
    cardDescription: card.subtitle ?? "",
  };
}

function toDeliverablesSection(section: StrapiDiscoverySprintsChallengesSection, order: number): DeliverablesSection {
  const features: StrapiDiscoverySprintsFeature[] = section.blockers?.features ?? [];
  return {
    type: "deliverables",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.title,
    subtitle: section.subtitle ?? "",
    deliverables: features.map((f, index) => ({
      id: String(f.id),
      number: String(index + 1).padStart(2, "0"),
      title: f.title,
      description: f.subtitle ?? "",
    })),
  };
}

function toIdealForSection(section: StrapiDiscoverySprintsChallengesSection, order: number): IdealForSection {
  const features: StrapiDiscoverySprintsFeature[] = section.blockers?.features ?? [];
  return {
    type: "idealFor",
    order,
    title: section.title,
    items: features.map((f) => ({ id: String(f.id), label: f.title })),
  };
}

function toChallengesSection(
  section: StrapiDiscoverySprintsChallengesSection,
  order: number
): DiscoverySprintsSection {
  switch (classifyChallenges(section)) {
    case "phaseZero":
      return toPhaseZeroSection(section, order);
    case "deliverables":
      return toDeliverablesSection(section, order);
    case "idealFor":
      return toIdealForSection(section, order);
    default:
      return toIntroSection(section, order);
  }
}

function toCapabilitiesSection(section: StrapiDiscoverySprintsCapabilitiesSection, order: number): CapabilitiesSection {
  const cards: FrameworkCard[] = section.capabilityCard.map((card) => ({
    id: String(card.id),
    categoryLabel: card.categoryLabel ?? "",
    title: card.title ?? "",
    subtitle: card.subtitle ?? "",
    features: card.features.map((f) => ({ id: String(f.id), text: f.title })),
  }));

  return {
    type: "capabilities",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    cards,
  };
}

const SERVICE_DETAIL_VARIANTS: Record<string, ServiceDetailVariant> = {
  "PD-whyAI-assistedModernization": "why",
  "PD-IndustriesWeModernize": "lifecycle",
};

function toServiceDetailSection(
  section: StrapiDiscoverySprintsServiceDetailSection,
  order: number
): ServiceDetailSection | null {
  const variant = SERVICE_DETAIL_VARIANTS[section.variant];
  if (!variant) return null;

  return {
    type: "serviceDetail",
    order,
    variant,
    serviceLabel: section.serviceLabel ?? undefined,
    title: section.title,
    subtitle: section.subtitle ?? undefined,
    steps: section.approachSteps.map((step, index) => ({
      id: String(step.id),
      order: index + 1,
      title: step.title,
      subtitle: step.subtitle ?? "",
      icon: toIconImage(step.icon),
    })),
  };
}

// `title` is a generic label, `subtitle` carries the real headline (same swap as ai-modernization).
function toFaqSection(section: StrapiDiscoverySprintsFaqSection, order: number): FaqSection {
  return {
    type: "faq",
    order,
    eyebrow: section.title,
    title: section.subtitle ?? "",
    items: section.questions.map((q) => ({ id: String(q.id), question: q.question, answer: q.answer })),
  };
}

function toCtaSection(section: StrapiDiscoverySprintsCtaBannerSection, order: number): FinalCtaSection {
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

function toSection(raw: StrapiDiscoverySprintsSection, order: number): DiscoverySprintsSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toChallengesSection(raw, order);
    case "page-reusable-sections.pd-modernization-capabilities":
      return toCapabilitiesSection(raw, order);
    case "page-reusable-sections.service-detail":
      return toServiceDetailSection(raw, order);
    case "page-reusable-sections.pd-faq":
      return toFaqSection(raw, order);
    case "page-reusable-sections.cta-banner":
      return toCtaSection(raw, order);
    default:
      return null;
  }
}

// No static fallback: returns null on CMS failure/empty data; page calls notFound(). cache()
// avoids a duplicate fetch since generateMetadata() and the page component both call this.
export const getDiscoverySprintsData = cache(async (): Promise<DiscoverySprintsPageContent | null> => {
  const data = await fetchCms<StrapiDiscoverySprintsPage>(DISCOVERY_SPRINTS_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is DiscoverySprintsSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "Discovery Sprints | Phase Zero Assessment | TechGrit",
      metaDescription:
        data.seo?.metaDescription ??
        "Validate your product vision, reduce delivery risk, and build an actionable roadmap — before you invest in development.",
    },
    sections,
  };
});
