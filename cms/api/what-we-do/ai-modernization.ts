import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiAiModernizationCtaBannerSection,
  StrapiAiModernizationFaqSection,
  StrapiAiModernizationHeroSection,
  StrapiAiModernizationPage,
  StrapiAiModernizationSection,
  StrapiFeature,
  StrapiMedia,
  StrapiModernizationCapabilitiesSection,
  StrapiModernizationChallengesSection,
  StrapiServiceDetailSection,
} from "../../types/ai-modernization-types";
import type {
  AiModernizationPageContent,
  AiModernizationSection,
  Blocker,
  CapabilitiesSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  IndustriesSection,
  IntroSection,
  LifecycleSection,
  ModernizationCapability,
  OutcomeSection,
  SectionImage,
  StrategiesSection,
  ValuePropositionTile,
  WhySection,
} from "@/app/what-we-do/ai-modernization/_data/types";

const AI_MODERNIZATION_ENDPOINT = "/api/pages/by-slug/ai-accelerated-modernization";

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

function toHeroSection(section: StrapiAiModernizationHeroSection, order: number): HeroSection {
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

// The CMS's own `title` field for this component reads as a short label ("Modernization
// Is More Than Migration") rather than a full headline, while `extraTitle` carries the
// punchy declarative sentence the reference design puts in the big H2 — so title→eyebrow,
// extraTitle→heading, subtitle→paragraph, matching content length/role rather than field
// names 1:1. `eyebrow` itself is null on both occurrences this component has shipped with.
function toIntroSection(section: StrapiModernizationChallengesSection, order: number): IntroSection {
  return {
    type: "intro",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.extraTitle,
    description: section.subtitle,
    blockersLabel: section.blockers.name,
    blockers: toBlockers(section.blockers.features),
  };
}

function toCapabilitiesSection(section: StrapiModernizationCapabilitiesSection, order: number): CapabilitiesSection {
  const capabilities: ModernizationCapability[] = section.capabilityCard.map((card, index) => ({
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
  return {
    type: "strategies",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    strategies: section.approachSteps.map((step, index) => ({
      order: index + 1,
      name: step.title,
      description: step.subtitle ?? "",
    })),
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

// The "Why TechGrit?" occurrence of this same component ships zero approachSteps —
// just a heading + a multi-paragraph description — so it renders via the generic
// Outcome primitive (FR-012) instead of the tile-grid layout the other occurrences use.
function toOutcomeSection(section: StrapiServiceDetailSection, order: number): OutcomeSection {
  return {
    type: "outcome",
    order,
    eyebrow: section.serviceLabel ?? undefined,
    heading: section.title,
    description: section.subtitle ?? "",
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): AiModernizationSection | null {
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

// The CMS's `title` here is a generic section label ("Frequently Asked Questions") while
// `subtitle` carries the reference's actual headline text — same title/subtitle role-swap
// reasoning as toIntroSection above.
function toFaqSection(section: StrapiAiModernizationFaqSection, order: number): FaqSection {
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

// The CTA banner's `primaryCtaLink` has shipped as null while the real destination
// landed in `secondaryCtaLink` (with `secondaryCtaLabel` also null) — a swapped-field
// CMS data quirk, same category as `normalizeCta()` in cms/api/insights/webinar.ts.
// Falls back to the mis-filed link, then to /contact-us/ if genuinely nothing is set;
// only renders a secondary button when the CMS has actually labeled one.
function toCtaSection(section: StrapiAiModernizationCtaBannerSection, order: number): FinalCtaSection {
  const primaryCtaLink = section.primaryCtaLink ?? section.secondaryCtaLink ?? "/contact-us/";
  const hasSecondary = Boolean(section.secondaryCtaLabel) && Boolean(section.secondaryCtaLink) && section.secondaryCtaLink !== primaryCtaLink;

  return {
    type: "finalCta",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    description: section.subtitle,
    primaryCtaLabel: section.primaryCtaLabel ?? "Get in touch",
    primaryCtaLink,
    secondaryCtaLabel: hasSecondary ? section.secondaryCtaLabel! : undefined,
    secondaryCtaLink: hasSecondary ? section.secondaryCtaLink! : undefined,
  };
}

function toSection(raw: StrapiAiModernizationSection, order: number): AiModernizationSection | null {
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

// Called directly from the (async) AI Modernization Server Component
// (await getAiModernizationData()) — runs on the server for every request, so CMS edits
// show up on the next page load with no rebuild. Unlike services.ts's fixed 3-slot
// layout, this page's dynamic zone returns a variable-length, variable-order list with
// repeating component types (modernization-challenges ×2, service-detail ×5), so
// sections are mapped in the CMS's own returned order rather than picked by fixed slot;
// any section type the page doesn't render (or a genuinely malformed entry) is dropped.
// This page has no static fallback content: getAiModernizationData() returns null
// when the CMS is unreachable or returns no usable sections, and the page itself
// calls notFound() in that case.
export async function getAiModernizationData(): Promise<AiModernizationPageContent | null> {
  const data = await fetchCms<StrapiAiModernizationPage>(AI_MODERNIZATION_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is AiModernizationSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo
      ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription }
      : { metaTitle: "AI-Accelerated Modernization | TechGrit", metaDescription: "" },
    sections,
  };
}
