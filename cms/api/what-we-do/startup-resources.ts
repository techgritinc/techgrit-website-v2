import { fetchCms } from "../fetcher";
import { resolveMediaUrl } from "../../utils/media";
import type {
  StrapiResourceFeature,
  StrapiStartupResourcesCtaBannerSection,
  StrapiStartupResourcesHeroSection,
  StrapiStartupResourcesLibrarySection,
  StrapiStartupResourcesPage,
  StrapiStartupResourcesSection,
  StrapiMedia,
} from "../../types/startup-resources-types";
import type {
  FinalCtaSection,
  HeroSection,
  LibrarySection,
  ResourceLink,
  ResourceTopic,
  SectionImage,
  StartupResourcesPageContent,
  StartupResourcesSection,
} from "@/app/what-we-do/startup-resources/_data/types";

const STARTUP_RESOURCES_ENDPOINT = "/api/pages/by-slug/startup-resources";

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

function toHeroSection(section: StrapiStartupResourcesHeroSection, order: number): HeroSection {
  return {
    type: "hero",
    order,
    eyebrow: section.badgeLabel,
    title: section.title,
    titleHighlight: section.highlightTitle ?? "",
    subtitle: section.subtitle,
    primaryCtaLabel: section.primaryBtnLabel ?? undefined,
    primaryCtaLink: section.primaryBtnLink ?? undefined,
    secondaryCtaLabel: section.secondaryBtnLabel ?? undefined,
    secondaryCtaLink: section.secondaryBtnLink ?? undefined,
    image: toImage(section.backgroundImage),
  };
}

function toResourceLink(feature: StrapiResourceFeature): ResourceLink {
  return {
    id: String(feature.id),
    title: feature.title.trim(),
    description: feature.subtitle?.trim() ?? "",
    href: feature.ctaLink ?? undefined,
  };
}

function toLibrarySection(section: StrapiStartupResourcesLibrarySection, order: number): LibrarySection {
  const topics: ResourceTopic[] = section.capabilityCard.map((card) => ({
    id: String(card.id),
    categoryLabel: card.categoryLabel,
    title: card.title,
    resources: card.features.map(toResourceLink),
  }));

  return {
    type: "library",
    order,
    eyebrow: section.badgeLabel ?? "",
    title: section.title ?? "",
    description: section.subtitle ?? "",
    topics,
  };
}

function toCtaSection(section: StrapiStartupResourcesCtaBannerSection, order: number): FinalCtaSection {
  const hasSecondary = Boolean(section.secondaryCtaLabel) && Boolean(section.secondaryCtaLink);

  return {
    type: "finalCta",
    order,
    eyebrow: section.badgeLabel ?? "",
    title: section.title,
    description: section.subtitle,
    primaryCtaLabel: section.primaryCtaLabel ?? "",
    primaryCtaLink: section.primaryCtaLink ?? "",
    secondaryCtaLabel: hasSecondary ? section.secondaryCtaLabel! : undefined,
    secondaryCtaLink: hasSecondary ? section.secondaryCtaLink! : undefined,
  };
}

function toSection(raw: StrapiStartupResourcesSection, order: number): StartupResourcesSection | null {
  switch (raw.__component) {
    case "page-reusable-sections.hero":
      return toHeroSection(raw, order);
    case "page-reusable-sections.pd-modernization-capabilities":
      return toLibrarySection(raw, order);
    case "page-reusable-sections.cta-banner":
      return toCtaSection(raw, order);
    default:
      return null;
  }
}

// Called directly from the (async) Startup Resources Server Component
// (await getStartupResourcesData()) — runs on the server for every request, so CMS
// edits show up on the next page load with no rebuild. Mirrors every sibling
// "What We Do" page's own fetcher exactly: sections are mapped in the CMS's own
// returned order, any section type the page doesn't render is dropped, and there is
// no static fallback content — getStartupResourcesData() returns null when the CMS
// is unreachable or returns no usable sections, and the page itself calls notFound().
export async function getStartupResourcesData(): Promise<StartupResourcesPageContent | null> {
  const data = await fetchCms<StrapiStartupResourcesPage>(STARTUP_RESOURCES_ENDPOINT);
  if (!data) return null;

  const rawSections = data.sections ?? [];
  const sections = rawSections
    .map((raw, index) => toSection(raw, index + 1))
    .filter((section): section is StartupResourcesSection => section !== null);

  if (sections.length === 0) return null;

  return {
    seo: data.seo ? { metaTitle: data.seo.metaTitle, metaDescription: data.seo.metaDescription } : null,
    sections,
  };
}
