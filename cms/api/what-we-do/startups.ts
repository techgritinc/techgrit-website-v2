import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiStartupsCtaBannerSection,
  StrapiStartupsFaqSection,
  StrapiStartupsHeroSection,
  StrapiStartupsPage,
  StrapiStartupsSection,
  StrapiFeature,
  StrapiMedia,
  StrapiStartupsCapabilitiesSection,
  StrapiStartupsChallengesSection,
  StrapiServiceDetailSection,
} from "../../types/startups-types";
import type {
  Challenge,
  Capability,
  CapabilitiesSection,
  FaqSection,
  FinalCtaSection,
  FounderSegmentCard,
  GrowthJourneySection,
  GrowthStage,
  HeroSection,
  IntroSection,
  SectionImage,
  StartupsPageContent,
  StartupsSection,
  ValuePropositionTile,
  WhoWeHelpSection,
  WhySection,
} from "@/app/what-we-do/startups/_data/types";

const STARTUPS_ENDPOINT = "/api/pages/by-slug/startups";

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

function toChips(features: StrapiFeature[]): Challenge[] {
  return features.map((f) => ({ id: String(f.id), label: f.title }));
}

function toHeroSection(section: StrapiStartupsHeroSection, order: number): HeroSection {
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

function toIntroSection(section: StrapiStartupsChallengesSection, order: number): IntroSection {
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

// The first card is visually distinguished on this page (stronger background/border) —
// a presentational rule applied to whichever card the CMS returns first, not content
// the CMS supplies itself (Speckit analysis U1, TMS-86-startups).
function toGrowthJourneySection(section: StrapiStartupsCapabilitiesSection, order: number): GrowthJourneySection {
  const stages: GrowthStage[] = section.capabilityCard.map((card, index) => ({
    id: String(card.id),
    order: index + 1,
    badgeLabel: card.categoryLabel,
    title: card.title,
    lede: card.subtitle,
    bullets: card.features.map((f) => ({ id: String(f.id), text: f.title })),
    highlighted: index === 0,
  }));

  return {
    type: "growthJourney",
    order,
    eyebrow: section.badgeLabel ?? "",
    title: section.title,
    stages,
  };
}

function toCapabilitiesSection(section: StrapiStartupsCapabilitiesSection, order: number): CapabilitiesSection {
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

// `page-reusable-sections.pd-modernization-capabilities` occurs twice on this page with
// no `variant` field to tell them apart (unlike `service-detail` below) — distinguished
// by `badgeLabel`, the only stable per-occurrence signal the CMS provides. Confirmed live
// (2026-08-26): "We grow with you" → growth journey, "What we build for startups" →
// capabilities. If the CMS ever changes either badgeLabel, this will silently fall through
// to the `default: capabilities` branch — same class of risk every sibling "What We Do"
// page's own header.ts/footer.ts title-matching already carries.
function toModernizationCapabilitiesSection(
  section: StrapiStartupsCapabilitiesSection,
  order: number,
): StartupsSection {
  switch (section.badgeLabel) {
    case "We grow with you":
      return toGrowthJourneySection(section, order);
    default:
      return toCapabilitiesSection(section, order);
  }
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

function toWhoWeHelpSection(section: StrapiServiceDetailSection, order: number): WhoWeHelpSection {
  const segments: FounderSegmentCard[] = section.approachSteps.map((step, index) => ({
    id: String(step.id),
    order: index + 1,
    icon: toIconImage(step.icon),
    name: step.title,
    description: step.subtitle ?? "",
  }));

  return {
    type: "whoWeHelp",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    segments,
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): StartupsSection | null {
  switch (section.variant) {
    case "PD-whyAI-assistedModernization":
      return toWhySection(section, order);
    case "PD-IndustriesWeModernize":
      return toWhoWeHelpSection(section, order);
    default:
      return null;
  }
}

function toFaqSection(section: StrapiStartupsFaqSection, order: number): FaqSection {
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

// Same swapped-field CMS quirk as every sibling "What We Do" page's own CTA banner:
// `primaryCtaLink` has shipped null while the real destination landed in
// `secondaryCtaLink` (with `secondaryCtaLabel` also null). Falls back to the mis-filed
// link — still genuine CMS data, just the other field on the same response; only renders
// a secondary button when the CMS has actually labeled one.
function toCtaSection(section: StrapiStartupsCtaBannerSection, order: number): FinalCtaSection {
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

function toSection(raw: StrapiStartupsSection, order: number): StartupsSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toIntroSection(raw, order);
    case "page-reusable-sections.pd-modernization-capabilities":
      return toModernizationCapabilitiesSection(raw, order);
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

// Called directly from the (async) Startups Server Component (await getStartupsData()) —
// runs on the server for every request, so CMS edits show up on the next page load with
// no rebuild. Mirrors every sibling "What We Do" page's own fetcher exactly: the dynamic
// zone returns a variable-length, variable-order list with repeating component types, so
// sections are mapped in the CMS's own returned order rather than picked by fixed slot;
// any section type the page doesn't render (or a genuinely malformed entry) is dropped —
// this page's CMS response has no "related services"-style component at all, so that
// section simply doesn't render, same as it doesn't for the AI Strategy & Roadmap sibling.
// This page has no static fallback content: getStartupsData() returns null when the CMS
// is unreachable or returns no usable sections, and the page itself calls notFound() in
// that case.
export async function getStartupsData(): Promise<StartupsPageContent | null> {
  const data = await fetchCms<StrapiStartupsPage>(STARTUPS_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is StartupsSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
