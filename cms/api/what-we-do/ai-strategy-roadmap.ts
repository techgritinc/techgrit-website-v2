import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiAiStrategyRoadmapCtaBannerSection,
  StrapiAiStrategyRoadmapFaqSection,
  StrapiAiStrategyRoadmapHeroSection,
  StrapiAiStrategyRoadmapPage,
  StrapiAiStrategyRoadmapSection,
  StrapiFeature,
  StrapiMedia,
  StrapiAiStrategyRoadmapCapabilitiesSection,
  StrapiAiStrategyRoadmapChallengesSection,
  StrapiServiceDetailSection,
} from "../../types/ai-strategy-roadmap-types";
import type {
  AdvisorySegmentCard,
  AdvisorySegmentsSection,
  Capability,
  CapabilitiesSection,
  TriggerChip,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  IntroSection,
  LifecycleSection,
  OutcomeSection,
  AiStrategyRoadmapPageContent,
  AiStrategyRoadmapSection,
  SectionImage,
  ValuePropositionTile,
  WhySection,
} from "@/app/what-we-do/ai-strategy-roadmap/_data/types";

const AI_STRATEGY_ROADMAP_ENDPOINT = "/api/pages/by-slug/ai-strategy-roadmap";

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

function toChips(features: StrapiFeature[]): TriggerChip[] {
  return features.map((f) => ({ id: String(f.id), label: f.title }));
}

function toHeroSection(section: StrapiAiStrategyRoadmapHeroSection, order: number): HeroSection {
  return {
    type: "hero",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    titleHighlight: section.highlightTitle ?? "",
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryBtnLabel,
    primaryCtaLink: section.primaryBtnLink,
    secondaryCtaLabel: section.secondaryBtnLabel ?? undefined,
    secondaryCtaLink: section.secondaryBtnLink ?? undefined,
    image: toImage(section.backgroundImage),
  };
}

// This page's own occurrence has shipped `eyebrow: null` and `extraTitle: null` — same
// nullable handling as the sibling "What We Do" pages' own occurrences of this shared
// component (e.g. Platform Engineering).
function toIntroSection(section: StrapiAiStrategyRoadmapChallengesSection, order: number): IntroSection {
  return {
    type: "intro",
    order,
    eyebrow: section.eyebrow ?? section.title,
    title: section.extraTitle ?? section.title,
    description: section.subtitle,
    chipsLabel: section.blockers?.name ?? "",
    chips: section.blockers ? toChips(section.blockers.features) : [],
  };
}

function toCapabilitiesSection(section: StrapiAiStrategyRoadmapCapabilitiesSection, order: number): CapabilitiesSection {
  const capabilities: Capability[] = section.capabilityCard.map((card, index) => ({
    id: String(card.id),
    order: index + 1,
    stepLabel: card.categoryLabel,
    title: card.title,
    lede: card.subtitle,
    note: card.structureInfo?.description ?? undefined,
    bullets: card.features.map((f) => ({ id: String(f.id), text: f.title })),
  }));

  return {
    type: "capabilities",
    order,
    eyebrow: section.badgeLabel ?? "",
    title: section.title,
    description: section.subtitle ?? "",
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

function toWhySection(section: StrapiServiceDetailSection, order: number): WhySection {
  const tiles: ValuePropositionTile[] = section.approachSteps.map((step, index) => ({
    id: String(step.id),
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

function toAdvisorySegmentsSection(section: StrapiServiceDetailSection, order: number): AdvisorySegmentsSection {
  const cards: AdvisorySegmentCard[] = section.approachSteps.map((step, index) => ({
    id: String(step.id),
    order: index + 1,
    icon: toIconImage(step.icon),
    name: step.title,
    description: step.subtitle ?? "",
  }));

  return {
    type: "advisorySegments",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    cards,
  };
}

// The "PD-strategiesWeSupport" occurrence on this page's dynamic zone ships zero
// `approachSteps` — just a heading + a multi-paragraph description — so it renders via
// the generic Outcome primitive, same precedent as the sibling "What We Do" pages' own
// "Why Choose TechGrit?" block (their own `PD-whyAI-assistedModernization` occurrence
// with zero approachSteps). Unlike those siblings' own `PD-strategiesWeSupport`
// occurrence (which always ships real approachSteps and renders as a tile grid via a
// dedicated Strategies component), this page's occurrence has never shipped with items —
// only the Outcome path is wired here; a populated `approachSteps` would need a real
// Strategies component added later, not assumed speculatively now.
function toOutcomeSection(section: StrapiServiceDetailSection, order: number): OutcomeSection {
  return {
    type: "outcome",
    order,
    eyebrow: section.serviceLabel ?? undefined,
    heading: section.title,
    description: section.subtitle ?? "",
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): AiStrategyRoadmapSection | null {
  switch (section.variant) {
    case "PD-modernizationLifecycle":
      return toLifecycleSection(section, order);
    case "PD-whyAI-assistedModernization":
      return toWhySection(section, order);
    case "PD-IndustriesWeModernize":
      return toAdvisorySegmentsSection(section, order);
    case "PD-strategiesWeSupport":
      return toOutcomeSection(section, order);
    default:
      return null;
  }
}

// The CMS's own `title` field for this component reads as a short label ("Frequently
// asked questions") rather than the punchy headline the reference design puts in the
// big H2, while `subtitle` carries that headline — same title→eyebrow, subtitle→heading
// swap the sibling "What We Do" pages' own FAQ sections already use.
function toFaqSection(section: StrapiAiStrategyRoadmapFaqSection, order: number): FaqSection {
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

// Same swapped-field CMS quirk as the sibling "What We Do" pages' own CTA banners:
// `primaryCtaLink` has shipped null while the real destination landed in
// `secondaryCtaLink` (with `secondaryCtaLabel` also null). Falls back to the mis-filed
// link — still genuine CMS data, just the other field on the same response; only renders
// a secondary button when the CMS has actually labeled one.
function toCtaSection(section: StrapiAiStrategyRoadmapCtaBannerSection, order: number): FinalCtaSection {
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

function toSection(raw: StrapiAiStrategyRoadmapSection, order: number): AiStrategyRoadmapSection | null {
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

// Called directly from the (async) AI Strategy & Roadmap Server Component
// (await getAiStrategyRoadmapData()) — runs on the server for every request, so CMS
// edits show up on the next page load with no rebuild. Mirrors the sibling "What We Do"
// pages' own fetchers exactly: the dynamic zone returns a variable-length, variable-order
// list with repeating component types, so sections are mapped in the CMS's own returned
// order rather than picked by fixed slot; any section type the page doesn't render (or a
// genuinely malformed entry) is dropped. This page has no static fallback content:
// getAiStrategyRoadmapData() returns null when the CMS is unreachable or returns no
// usable sections, and the page itself calls notFound() in that case.
export async function getAiStrategyRoadmapData(): Promise<AiStrategyRoadmapPageContent | null> {
  const data = await fetchCms<StrapiAiStrategyRoadmapPage>(AI_STRATEGY_ROADMAP_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is AiStrategyRoadmapSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
