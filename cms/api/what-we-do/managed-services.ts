import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiManagedServicesChallengesSection,
  StrapiManagedServicesCtaBannerSection,
  StrapiManagedServicesFaqSection,
  StrapiManagedServicesHeroSection,
  StrapiManagedServicesPage,
  StrapiManagedServicesSection,
  StrapiFeature,
  StrapiMedia,
  StrapiManagedServicesCapabilitiesSection,
  StrapiServiceDetailSection,
} from "../../types/managed-services-types";
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
  ManagedServiceStrategy,
  ManagedServicesPageContent,
  ManagedServicesSection,
  OutcomeSection,
  SectionImage,
  StrategiesSection,
  ValuePropositionTile,
  WhySection,
} from "@/app/what-we-do/managed-services/_data/types";

const MANAGED_SERVICES_ENDPOINT = "/api/pages/by-slug/managed-services";

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

function toHeroSection(section: StrapiManagedServicesHeroSection, order: number): HeroSection {
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

// The "Move Beyond Traditional Support" challenges card an earlier CMS response had
// folded into the first `pd-modernization-capabilities` card now ships as its own proper
// top-level section — same title→eyebrow / extraTitle→heading role-swap every sibling
// "What We Do" page's own `modernization-challenges` mapper already uses (the CMS's
// `title` field reads as a short label while `extraTitle` carries the actual headline).
function toIntroSection(section: StrapiManagedServicesChallengesSection, order: number): IntroSection {
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

// This page's own occurrence has shipped `categoryLabel: null` on a couple of individual
// cards (their `title` carries the heading instead) — modeled as nullable throughout
// rather than assumed-present, confirmed against two successive real CMS responses.
function toCapabilitiesSection(section: StrapiManagedServicesCapabilitiesSection, order: number): CapabilitiesSection {
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
    title: section.title ?? "",
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

function toStrategiesSection(section: StrapiServiceDetailSection, order: number): StrategiesSection {
  const strategies: ManagedServiceStrategy[] = section.approachSteps.map((step, index) => ({
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

// `extraTitle` carries a real supporting statement on this page's own "why" occurrence
// (none of the sibling "What We Do" pages' own service-detail sections had this field
// populated, so their type files never declared it) — surfaced as `statement`.
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
    statement: section.extraTitle ?? undefined,
    tiles,
  };
}

// The CMS doesn't currently supply a destination for any industry card on this page —
// render a plain (non-clickable) tile when absent rather than guessing a route, same
// precedent as every sibling "What We Do" page's own industries mapping.
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
// description block (the Outcome primitive), not a tile grid — same distinction every
// sibling "What We Do" page's own mapper already makes for its own "Why TechGrit?" block.
function toOutcomeSection(section: StrapiServiceDetailSection, order: number): OutcomeSection {
  return {
    type: "outcome",
    order,
    eyebrow: section.serviceLabel ?? undefined,
    heading: section.title,
    description: section.subtitle ?? "",
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): ManagedServicesSection | null {
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

function toFaqSection(section: StrapiManagedServicesFaqSection, order: number): FaqSection {
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
// link — still genuine CMS data, never a hardcoded destination; only renders a secondary
// button when the CMS has actually labeled one.
function toCtaSection(section: StrapiManagedServicesCtaBannerSection, order: number): FinalCtaSection {
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

function toSection(raw: StrapiManagedServicesSection, order: number): ManagedServicesSection | null {
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

// Called directly from the (async) Managed Services Server Component
// (await getManagedServicesData()) — runs on the server for every request, so CMS edits
// show up on the next page load with no rebuild. Mirrors every sibling "What We Do"
// page's own fetcher exactly: the dynamic zone returns a variable-length, variable-order
// list with repeating component types (service-detail x5), so sections are mapped in the
// CMS's own returned order rather than picked by fixed slot; any section type the page
// doesn't render (or a genuinely malformed entry) is dropped. This page has no static
// fallback content: getManagedServicesData() returns null when the CMS is unreachable
// or returns no usable sections, and the page itself calls notFound() in that case.
export async function getManagedServicesData(): Promise<ManagedServicesPageContent | null> {
  const data = await fetchCms<StrapiManagedServicesPage>(MANAGED_SERVICES_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is ManagedServicesSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
