import { fetchCms } from "../fetcher";
import { mapHeroFields, mapStatistics, mapCtaBanner } from "../../shared/reusable-sections";
import { ROUTES } from "@/lib/routes";
import type {
  StrapiCapabilitiesSection,
  StrapiChallengesSection,
  StrapiConsumerLendingPage,
  StrapiConsumerLendingSection,
  StrapiCtaBannerSection,
  StrapiFaqSection,
  StrapiFeature,
  StrapiHeroSection,
  StrapiLendingLifecycleSection,
  StrapiServiceDetailSection,
  StrapiStatisticsSection,
} from "../../types/consumer-lending-types";
import type {
  AppliedAiSection,
  Blocker,
  Capability,
  CapabilitiesSection,
  ConsumerLendingPageContent,
  ConsumerLendingSection,
  DomainDepthSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  HowWeWorkSection,
  InstitutionalSection,
  IntroSection,
  LifecycleStage,
  MetricsSection,
  QuoteSection,
} from "@/app/industries/consumer-lending/_data/types";

// Confirmed against the live CMS response (no `populate` query needed — this endpoint returns
// every section fully populated, including nested repeatable fields, by default; matches the
// same no-populate-string pattern already used by data-ai-engineering.ts/ai-modernization.ts).
const CONSUMER_LENDING_ENDPOINT = "/api/pages/by-slug/consumer-lending";

// Both `primaryBtnLink` and `secondaryBtnLink` ship null in the live CMS data while their
// labels ("Start a conversation" / "See where we work") are populated. Primary falls back to
// `/contact-us/` — the same destination the shared Footer's own "Start a conversation" CTA uses
// for this exact label (`cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA.cta`), not a fabricated
// route. Secondary falls back to the Domain depth section's own in-page anchor, matching the
// reference content's intent (its equivalent button links to "#lifecycle") now that this page
// has a real Domain depth section to point at.
function toHeroSection(section: StrapiHeroSection, order: number): HeroSection {
  const fields = mapHeroFields(section);
  return {
    type: "hero",
    order,
    eyebrow: fields.eyebrow,
    title: fields.title,
    titleHighlight: fields.titleHighlight,
    subtitle: fields.subtitle,
    primaryCtaLabel: fields.primaryCtaLabel,
    primaryCtaLink: fields.primaryCtaLink,
    secondaryCtaLabel: fields.secondaryCtaLabel || undefined,
    secondaryCtaLink: fields.secondaryCtaLink || undefined,
    image: fields.image,
  };
}

function toMetricsSection(section: StrapiStatisticsSection, order: number): MetricsSection {
  return {
    type: "metrics",
    order,
    metrics: mapStatistics(section),
  };
}

function toBlockers(features: StrapiFeature[]): Blocker[] {
  return features.map((f) => ({ id: String(f.id), label: f.title, description: f.subtitle ?? "" }));
}

// This occurrence's `eyebrow` field is populated directly ("Why lenders call us"), unlike the
// Data & AI Engineering / AI-Accelerated Modernization pages' occurrences of the same component,
// which need a title→eyebrow reinterpretation. `extraTitle` on this occurrence is generic
// leftover CMS text absent from the reference content and is intentionally not rendered.
function toIntroSection(section: StrapiChallengesSection, order: number): IntroSection {
  return {
    type: "intro",
    order,
    eyebrow: section.eyebrow ?? "",
    title: section.title,
    description: section.subtitle,
    blockers: toBlockers(section.blockers.features),
  };
}

function toDomainDepthSection(section: StrapiLendingLifecycleSection, order: number): DomainDepthSection {
  const stages: LifecycleStage[] = section.tabItems.map((tab) => {
    const panel = section.controlTabs.find((control) => control.tabValue === tab.value);
    return {
      id: tab.value,
      label: tab.label,
      isDefault: Boolean(tab.isDefault),
      title: panel?.title ?? "",
      description: panel?.subtitle ?? "",
      points: (panel?.features ?? []).map((f) => ({ id: String(f.id), text: f.title })),
    };
  });

  return {
    type: "domainDepth",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    description: section.subtitle,
    stages,
  };
}

// Used 3x (badgeLabel: "The ecosystem" / "Our work" / "Operating context") — `role` lets one
// renderer handle all three instead of three near-identical components.
function toCapabilitiesSection(section: StrapiCapabilitiesSection, order: number): CapabilitiesSection {
  const role = section.badgeLabel === "Our work" ? "ourWork" : section.badgeLabel === "Operating context" ? "operatingContext" : "ecosystem";
  const capabilities: Capability[] = section.capabilityCard.map((card, index) => ({
    id: String(card.id),
    order: index + 1,
    stepLabel: card.categoryLabel,
    title: card.title ?? "",
    lede: card.subtitle ?? "",
    note: card.structureInfo?.description,
    metricLabel: card.structureInfo?.label ?? undefined,
    bullets: card.features.map((f) => ({ id: String(f.id), text: f.title })),
  }));

  return { type: "capabilities", order, role, eyebrow: section.badgeLabel ?? "", title: section.title, description: section.subtitle, capabilities };
}

function toAppliedAiSection(section: StrapiServiceDetailSection, order: number): AppliedAiSection {
  return {
    type: "appliedAi",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    description: section.subtitle ?? "",
    cards: section.approachSteps.map((step, index) => ({ order: index + 1, label: step.stepLabel ?? "", title: step.title, description: step.subtitle ?? "" })),
  };
}

// `extraTitle` is the plain-text extra card (styled like Orbit AI Ecosystem's "Built for
// Real-World Engineering" callout); the 5 `approachSteps` split 2 + 3 across the two card rows.
function toInstitutionalSection(section: StrapiServiceDetailSection, order: number): InstitutionalSection {
  const cards = section.approachSteps.map((step, index) => ({ order: index + 1, label: step.stepLabel ?? "", title: step.title, description: step.subtitle ?? "" }));
  return {
    type: "institutional",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    description: section.subtitle ?? "",
    rowOne: cards.slice(0, 2),
    rowTwo: cards.slice(2),
    extraText: section.extraTitle,
  };
}

// `title` holds the citation, `subtitle` holds the quote — same role-swap as this component's
// occurrence on the Data & AI Engineering page's Quote/Outcome branch.
function toQuoteSection(section: StrapiServiceDetailSection, order: number): QuoteSection {
  return { type: "quote", order, quote: section.subtitle ?? "", citation: section.title };
}

function toHowWeWorkSection(section: StrapiServiceDetailSection, order: number): HowWeWorkSection {
  return {
    type: "howWeWork",
    order,
    eyebrow: section.serviceLabel ?? "",
    title: section.title,
    description: section.subtitle ?? "",
    cards: section.approachSteps.map((step, index) => ({ order: index + 1, label: step.stepLabel ?? "", title: step.title, description: step.subtitle ?? "" })),
  };
}

function toServiceDetailSection(section: StrapiServiceDetailSection, order: number): ConsumerLendingSection | null {
  switch (section.variant) {
    case "PD-modernizationLifecycle":
      return toAppliedAiSection(section, order);
    case "PD-strategiesWeSupport":
      return toInstitutionalSection(section, order);
    case "PD-whyAI-assistedModernization":
      return toQuoteSection(section, order);
    case "PD-IndustriesWeModernize":
      return toHowWeWorkSection(section, order);
    default:
      return null;
  }
}

// `title`/`subtitle` are role-swapped on this component — same known quirk as
// ai-modernization.ts's/data-ai-engineering.ts's identical `toFaqSection`.
function toFaqSection(section: StrapiFaqSection, order: number): FaqSection {
  return {
    type: "faq",
    order,
    eyebrow: section.title,
    title: section.subtitle ?? "",
    items: section.questions.map((q, index) => ({ id: String(q.id), question: q.question, answer: q.answer, defaultOpen: index === 0 })),
  };
}

// Secondary CTA always renders (per spec.md Clarifications, mirroring Construction's Final CTA)
// — both `secondaryCtaLabel`/`secondaryCtaLink` fall back to the reference content's own values
// when the CMS ships them null, rather than being conditionally dropped.
function toCtaSection(section: StrapiCtaBannerSection, order: number): FinalCtaSection {
  return {
    type: "finalCta",
    order,
    ...mapCtaBanner(section),
  };
}

function toSection(raw: StrapiConsumerLendingSection, order: number): ConsumerLendingSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.statistics":
      return toMetricsSection(raw, order);
    case "page-reusable-sections.modernization-challenges":
      return toIntroSection(raw, order);
    case "industries-construction.pd-lending-lifecycle":
      return toDomainDepthSection(raw, order);
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

// Called from the Consumer Lending Server Component. Returns null when the CMS is unreachable
// or returns no usable sections — no static fallback content, matching every PD-family page.
export async function getConsumerLendingPageContent(): Promise<ConsumerLendingPageContent | null> {
  const data = await fetchCms<StrapiConsumerLendingPage>(CONSUMER_LENDING_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is ConsumerLendingSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
