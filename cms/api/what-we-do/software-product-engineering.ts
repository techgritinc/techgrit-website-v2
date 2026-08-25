import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiSoftwareProductEngineeringCtaBannerSection,
  StrapiSoftwareProductEngineeringFaqSection,
  StrapiSoftwareProductEngineeringHeroSection,
  StrapiSoftwareProductEngineeringPage,
  StrapiSoftwareProductEngineeringSection,
  StrapiFeature,
  StrapiMedia,
  StrapiModernizationCapabilitiesSection,
  StrapiModernizationChallengesSection,
  StrapiServiceDetailSection,
} from "../../types/software-product-engineering-types";
import type {
  Blocker,
  Capability,
  CapabilitiesSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  IndustriesSection,
  IntroSection,
  LifecycleSection,
  ModernizationStrategy,
  OutcomeSection,
  SectionImage,
  SoftwareProductEngineeringPageContent,
  SoftwareProductEngineeringSection,
  StrategiesSection,
  ValuePropositionTile,
  WhySection,
} from "@/app/what-we-do/software-product-engineering/_data/types";

const SOFTWARE_PRODUCT_ENGINEERING_ENDPOINT = "/api/pages/by-slug/software-product-engineering";

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

function toBlockers(features: StrapiFeature[]): Blocker[] {
  return features.map((f) => ({ id: String(f.id), label: f.title }));
}

function toHeroSection(section: StrapiSoftwareProductEngineeringHeroSection, order: number): HeroSection {
  return {
    type: "hero",
    order,
    eyebrow: section.badgeLabel,
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

// Unlike the sibling AI-Accelerated Modernization page, this component's `extraTitle`
// and `blockers` have both shipped null for this page's occurrence. `eyebrow`/`title`
// fall back to this same section's own `title` field (still CMS content, just a
// different field on the same response) — never a hardcoded string. `chipsLabel`/
// `chips` fall back to empty (no fabricated label or chip data) when `blockers` is null.
function toIntroSection(section: StrapiModernizationChallengesSection, order: number): IntroSection {
  return {
    type: "intro",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.extraTitle ?? section.title,
    description: section.subtitle,
    chipsLabel: section.blockers?.name ?? "",
    chips: section.blockers ? toBlockers(section.blockers.features) : [],
  };
}

function toCapabilitiesSection(section: StrapiModernizationCapabilitiesSection, order: number): CapabilitiesSection {
  const capabilities: Capability[] = section.capabilityCard.map((card, index) => ({
    id: String(card.id),
    order: index + 1,
    stepLabel: card.categoryLabel,
    title: card.title,
    lede: card.subtitle,
    note: card.structureInfo?.description,
    bullets: card.features.map((f) => ({ id: String(f.id), text: f.title })),
  }));

  return {
    type: "capabilities",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    description: section.subtitle,
    capabilities,
  };
}

function toLifecycleSection(section: StrapiServiceDetailSection, order: number): LifecycleSection {
  return {
    type: "lifecycle",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    stages: section.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

function toStrategiesSection(section: StrapiServiceDetailSection, order: number): StrategiesSection {
  const strategies: ModernizationStrategy[] = section.approachSteps.map((step, index) => ({
    order: index + 1,
    name: step.title,
    description: step.subtitle ?? "",
  }));

  return {
    type: "strategies",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    strategies,
  };
}

function toWhySection(section: StrapiServiceDetailSection, order: number): WhySection {
  const tiles: ValuePropositionTile[] = section.approachSteps.map((step, index) => ({
    order: index + 1,
    icon: toIconImage(step.icon),
    title: step.title,
    description: step.subtitle ?? "",
  }));

  return {
    type: "why",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    tiles,
  };
}

// The CMS doesn't currently supply a destination for every industry card — render a
// plain (non-clickable) tile when absent rather than guessing a route (same precedent
// as the sibling AI-Accelerated Modernization page's own industries mapping).
function toIndustriesSection(section: StrapiServiceDetailSection, order: number): IndustriesSection {
  return {
    type: "industries",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    industries: section.approachSteps.map((step, index) => ({
      order: index + 1,
      icon: toIconImage(step.icon),
      name: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

// An occurrence of `service-detail` with zero `approachSteps` is a plain heading +
// description block (FR-012's Outcome primitive), not a tile grid — same distinction
// the sibling AI-Accelerated Modernization page's mapper already makes.
function toOutcomeSection(section: StrapiServiceDetailSection, order: number): OutcomeSection {
  return {
    type: "outcome",
    order,
    eyebrow: section.serviceLabel ?? undefined,
    heading: section.title,
    description: section.subtitle ?? "",
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): SoftwareProductEngineeringSection | null {
  switch (section.variant) {
    case "PD-modernizationLifecycle":
      return toLifecycleSection(section, order);
    case "PD-strategiesWeSupport":
      return toStrategiesSection(section, order);
    case "PD-whyAI-assistedModernization":
      return section.approachSteps.length > 0 ? toWhySection(section, order) : toOutcomeSection(section, order);
    case "PD-IndustriesWeModernize":
      return toIndustriesSection(section, order);
    default:
      return null;
  }
}

function toFaqSection(section: StrapiSoftwareProductEngineeringFaqSection, order: number): FaqSection {
  return {
    type: "faq",
    order,
    eyebrow: section.title,
    title: section.subtitle ?? "",
    items: section.questions.map((q, index) => ({
      id: String(q.id),
      question: q.question,
      answer: q.answer,
      defaultOpen: index === 0,
    })),
  };
}

// Same swapped-field CMS quirk as the sibling AI-Accelerated Modernization page's CTA
// banner: `primaryCtaLink` has shipped null while the real destination landed in
// `secondaryCtaLink` (with `secondaryCtaLabel` also null). Falls back to the mis-filed
// link — still genuine CMS data, just the other field on the same response — never a
// hardcoded destination; only renders a secondary button when the CMS has actually
// labeled one.
function toCtaSection(section: StrapiSoftwareProductEngineeringCtaBannerSection, order: number): FinalCtaSection {
  const primaryCtaLink = section.primaryCtaLink ?? section.secondaryCtaLink ?? "";
  const hasSecondary = Boolean(section.secondaryCtaLabel) && Boolean(section.secondaryCtaLink) && section.secondaryCtaLink !== primaryCtaLink;

  return {
    type: "finalCta",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    description: section.subtitle,
    primaryCtaLabel: section.primaryCtaLabel ?? "",
    primaryCtaLink,
    secondaryCtaLabel: hasSecondary ? section.secondaryCtaLabel! : undefined,
    secondaryCtaLink: hasSecondary ? section.secondaryCtaLink! : undefined,
  };
}

function toSection(raw: StrapiSoftwareProductEngineeringSection, order: number): SoftwareProductEngineeringSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toIntroSection(raw, order);
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

// Called directly from the (async) Software Product Engineering Server Component
// (await getSoftwareProductEngineeringData()) — runs on the server for every request,
// so CMS edits show up on the next page load with no rebuild. Mirrors the sibling
// AI-Accelerated Modernization page's `getAiModernizationData()` exactly: the dynamic
// zone returns a variable-length, variable-order list with repeating component types
// (service-detail x4+), so sections are mapped in the CMS's own returned order rather
// than picked by fixed slot; any section type the page doesn't render (or a genuinely
// malformed entry) is dropped. This page has no static fallback content for
// CMS-sourced sections: getSoftwareProductEngineeringData() returns null when the CMS
// is unreachable or returns no usable sections, and the page itself calls notFound()
// in that case.
export async function getSoftwareProductEngineeringData(): Promise<SoftwareProductEngineeringPageContent | null> {
  const data = await fetchCms<StrapiSoftwareProductEngineeringPage>(SOFTWARE_PRODUCT_ENGINEERING_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is SoftwareProductEngineeringSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
