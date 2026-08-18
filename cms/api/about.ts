import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapHeroFields, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiHeroSection, StrapiStatisticsSection } from "../shared/reusable-sections";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";
import { aboutUsContent } from "@/app/about/_data/about-us-content";
import type {
  AchievementsSection,
  CultureGallerySection,
  FinalCtaSection,
  HeroSection,
  OurRoleSection,
  PartnerSection,
  ProcessSection,
  ValuesSection,
  WhoYouAreSection,
} from "@/app/about/_data/types";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax, same
// convention as cms/api/construction.ts and cms/api/contact.ts. This is the single source
// for the About route — every place that needs the About endpoint imports this constant
// rather than re-typing the slug.
//
// All sections are CMS-driven now — Hero, Who You Are, Our Role, Values, Process,
// Achievements, Partner, Culture Gallery, and Final CTA. Only Showcase still has no
// dedicated CMS component (see getAboutHeroContent's note) and app/about/_data/*.ts remains
// as the fallback source when the CMS is unreachable and for the fields flagged as missing.
const ABOUT_ENDPOINT =
  "/api/pages/by-slug/about" +
  "?populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][about-us.audience-insight][populate][concernsCard][populate]=questions" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate][approachSteps][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.statistics][populate]=statistics" +
  "&populate[sections][on][page-reusable-sections.culture-gallery][populate]=image" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

type StrapiAboutPageSections = {
  sections: { __component: string }[];
};

type StrapiConcernQuestion = {
  question: string;
  answer: string | null;
};

type StrapiConcernsCard = {
  title: string;
  summary: string;
  questions: StrapiConcernQuestion[];
};

// NOTE: the CMS's "about-us.audience-insight" component has no fields for the static
// "You may be: ..." situations list or the closing-lead sentence — flagged to the CMS team
// as missing; see the fallback values used in getAboutWhoYouAreContent below.
type StrapiAudienceInsightSection = {
  __component: "about-us.audience-insight";
  title: string;
  subtitle: string;
  badgeLabel: string;
  concernsCard: StrapiConcernsCard;
};

type StrapiMissionStatementSection = {
  __component: "about-us.mission-statement";
  title: string;
  subtitle: string;
  badgeLabel: string;
  highlightTitle: string | null;
};

// NOTE: this component is reused for both the "core values" grid and the "3-step plan" — the
// CMS sends `variant: null` for both (unlike Construction's service-detail, which
// disambiguates via a real `variant` string) — flagged to the CMS team to add one. Until
// then, disambiguated below by icon presence: the values instance populates `icon` on every
// approach step, the 3-step-plan instance never does.
type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string;
  variant: string | null;
  approachSteps: StrapiApproachStep[];
};

function isValuesVariant(detail: StrapiServiceDetailSection): boolean {
  return detail.approachSteps.some((step) => step.icon !== null);
}

type StrapiBenefit = {
  title: string;
};

// NOTE: the CMS's "about-us.partner-success" component has no fields at all for the static
// "most importantly: ..." closing bar — flagged to the CMS team as missing; see the fallback
// values used in getAboutPartnerContent below.
type StrapiPartnerSuccessSection = {
  __component: "about-us.partner-success";
  title: string;
  subtitle: string;
  badgeLabel: string;
  benefits: StrapiBenefit[];
};

// The one static WhoYouAreSection entry — used only to source the 3 fields the CMS doesn't
// provide yet (situationsLabel, situations, closingLead) until the CMS team adds them.
const staticWhoYouAre = aboutUsContent.sections.find(
  (section): section is WhoYouAreSection => section.type === "whoYouAre"
);

// The one static PartnerSection entry — used only to source the 3 closing-bar fields the CMS
// doesn't provide yet (closingLabel, closingLead, closingSupport) until the CMS team adds them.
const staticPartner = aboutUsContent.sections.find(
  (section): section is PartnerSection => section.type === "partner"
);

type StrapiCultureGallerySection = {
  __component: "page-reusable-sections.culture-gallery";
  title: string;
  subtitle: string;
  badgeLabel: string;
  image: StrapiMedia[];
};

// Returns the About page's Hero section mapped into the exact shape the static content
// already used (see app/about/_data/types.ts), so about-us-hero.tsx needs no prop-shape
// changes. Returns null when the CMS is unreachable or the hero section isn't present, so
// the caller can fall back to the static hero content.
export async function getAboutHeroContent(): Promise<HeroSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const heroRaw = data.sections.find(
    (section): section is StrapiHeroSection => section.__component === "page-reusable-sections.hero"
  );
  if (!heroRaw) return null;

  const fields = mapHeroFields(heroRaw);
  return {
    type: "hero",
    order: 1,
    eyebrow: fields.eyebrow,
    title: fields.title,
    // The static HeroSection type requires a non-null titleHighlight (the previous
    // component split on it unconditionally); fall back to "" when the CMS sends no
    // highlight so about-us-hero.tsx's split-and-render guard has a safe value.
    titleHighlight: fields.titleHighlight ?? "",
    subtitle: fields.subtitle,
    primaryCtaLabel: fields.primaryCtaLabel,
    primaryCtaLink: fields.primaryCtaLink,
    secondaryCtaLabel: fields.secondaryCtaLabel,
    secondaryCtaLink: fields.secondaryCtaLink,
  };
}

// Returns the About page's Who You Are section. `eyebrow`/`title`/`paragraphs` (plain, no
// per-paragraph highlight — see below) and `concernsCard.label`/`concerns`/`closingStatement`
// come straight from the CMS; `situationsLabel`/`situations`/`closingLead` fall back to the
// static content's values since the CMS doesn't provide them yet. Returns null when the CMS
// is unreachable or the section isn't present, so the caller can fall back to static data.
export async function getAboutWhoYouAreContent(): Promise<WhoYouAreSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiAudienceInsightSection =>
      section.__component === "about-us.audience-insight"
  );
  if (!raw) return null;

  return {
    type: "whoYouAre",
    order: 3,
    eyebrow: raw.badgeLabel,
    title: raw.title,
    // The CMS sends one plain `subtitle` string (paragraph breaks via "\n\n") with no
    // per-paragraph highlight data — rendered as plain paragraphs, no bold emphasis.
    paragraphs: raw.subtitle
      .split(/\n\n+/)
      .map((text) => ({ text: text.trim() }))
      .filter((paragraph) => paragraph.text.length > 0),
    concernsCard: {
      situationsLabel: staticWhoYouAre?.concernsCard.situationsLabel ?? "",
      situations: staticWhoYouAre?.concernsCard.situations ?? [],
      label: raw.concernsCard.title,
      concerns: raw.concernsCard.questions.map((entry) => entry.question),
      closingLead: staticWhoYouAre?.concernsCard.closingLead ?? "",
      closingStatement: raw.concernsCard.summary,
    },
  };
}

// Returns the About page's Our Role section — every field maps cleanly from the CMS's
// "about-us.mission-statement" component, no gaps. Returns null when the CMS is unreachable
// or the section isn't present, so the caller can fall back to static data.
export async function getAboutOurRoleContent(): Promise<OurRoleSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiMissionStatementSection =>
      section.__component === "about-us.mission-statement"
  );
  if (!raw) return null;

  return {
    type: "ourRole",
    order: 4,
    eyebrow: raw.badgeLabel,
    title: raw.title,
    titleHighlight: raw.highlightTitle && raw.title.includes(raw.highlightTitle) ? raw.highlightTitle : "",
    description: raw.subtitle,
  };
}

// Returns the About page's Values (core values grid) section — every field maps cleanly
// from the CMS's "page-reusable-sections.service-detail" component (the values instance,
// disambiguated via isValuesVariant above), including real per-value icons the static
// content never had. Returns null when the CMS is unreachable or the section isn't present.
export async function getAboutValuesContent(): Promise<ValuesSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections
    .filter(
      (section): section is StrapiServiceDetailSection =>
        section.__component === "page-reusable-sections.service-detail"
    )
    .find(isValuesVariant);
  if (!raw) return null;

  return {
    type: "values",
    order: 5,
    eyebrow: raw.serviceLabel,
    title: raw.title,
    values: raw.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
      icon: mapSectionIcon(step.icon),
    })),
  };
}

// Returns the About page's Process (3-step plan) section — every field maps cleanly from
// the CMS's "page-reusable-sections.service-detail" component (the non-values instance,
// disambiguated via isValuesVariant above), no gaps. Returns null when the CMS is
// unreachable or the section isn't present, so the caller can fall back to static data.
export async function getAboutProcessContent(): Promise<ProcessSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections
    .filter(
      (section): section is StrapiServiceDetailSection =>
        section.__component === "page-reusable-sections.service-detail"
    )
    .find((detail) => !isValuesVariant(detail));
  if (!raw) return null;

  return {
    type: "process",
    order: 6,
    eyebrow: raw.serviceLabel,
    title: raw.title,
    subtitle: raw.subtitle ?? "",
    steps: raw.approachSteps.map((step, index) => ({
      order: index + 1,
      label: step.stepLabel ?? "",
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

// Returns the About page's Achievements (stats) section — every field maps cleanly from the
// CMS's "page-reusable-sections.statistics" component via the shared mapStatistics helper,
// no gaps. Returns null when the CMS is unreachable or the section isn't present, so the
// caller can fall back to static data.
export async function getAboutAchievementsContent(): Promise<AchievementsSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiStatisticsSection =>
      section.__component === "page-reusable-sections.statistics"
  );
  if (!raw) return null;

  return {
    type: "achievements",
    order: 7,
    stats: mapStatistics(raw),
  };
}

// Returns the About page's Partner ("here's what success looks like") section.
// `eyebrow`/`title`/`description`/`outcomes` come straight from the CMS; `closingLabel`/
// `closingLead`/`closingSupport` fall back to the static content's values since the CMS's
// "about-us.partner-success" component doesn't provide them yet. Returns null when the CMS
// is unreachable or the section isn't present, so the caller can fall back to static data.
export async function getAboutPartnerContent(): Promise<PartnerSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiPartnerSuccessSection =>
      section.__component === "about-us.partner-success"
  );
  if (!raw) return null;

  return {
    type: "partner",
    order: 8,
    eyebrow: raw.badgeLabel,
    title: raw.title,
    description: raw.subtitle,
    outcomes: raw.benefits.map((benefit) => ({ text: benefit.title })),
    closingLabel: staticPartner?.closingLabel ?? "",
    closingLead: staticPartner?.closingLead ?? "",
    closingSupport: staticPartner?.closingSupport ?? "",
  };
}

// Returns the About page's Culture Gallery ("Life at TechGrit") section — every field maps
// cleanly from the CMS's "page-reusable-sections.culture-gallery" component, including real
// photos the static content never had (LifeGallery.tsx previously always rendered a
// hardcoded set regardless of section data). Returns null when the CMS is unreachable or the
// section isn't present, so the caller can fall back to static data.
export async function getAboutCultureGalleryContent(): Promise<CultureGallerySection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiCultureGallerySection =>
      section.__component === "page-reusable-sections.culture-gallery"
  );
  if (!raw) return null;

  return {
    type: "cultureGallery",
    order: 9,
    eyebrow: raw.badgeLabel,
    title: raw.title,
    subtitle: raw.subtitle,
    images: raw.image.map((media) => {
      const asset = pickMediaAsset(media, ["medium", "small"]);
      return {
        id: String(media.url),
        src: resolveMediaUrl(asset.url),
        alt: media.alternativeText ?? "",
      };
    }),
  };
}

// Returns the About page's Final CTA ("Getting started is simple") section — every field
// maps cleanly from the CMS's "page-reusable-sections.cta-banner" component via the shared
// mapCtaBanner helper, no gaps. Returns null when the CMS is unreachable or the section isn't
// present, so the caller can fall back to static data.
export async function getAboutFinalCtaContent(): Promise<FinalCtaSection | null> {
  const data = await fetchCms<StrapiAboutPageSections>(ABOUT_ENDPOINT);
  if (!data) return null;

  const raw = data.sections.find(
    (section): section is StrapiCtaBannerSection =>
      section.__component === "page-reusable-sections.cta-banner"
  );
  if (!raw) return null;

  const fields = mapCtaBanner(raw);
  return {
    type: "finalCta",
    order: 10,
    eyebrow: fields.eyebrow,
    title: fields.title,
    description: fields.description,
    ctaLabel: fields.primaryCtaLabel,
    ctaLink: fields.primaryCtaLink,
  };
}
