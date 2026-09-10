import { cache } from "react";
import { fetchCms } from "../fetcher";
import { pickStatisticsSections } from "./statistics";
import { pickHeroSection, toHero, toHeroStats } from "./hero";
import { pickTrustedClientsSection, toTrustedClients } from "./trusted-clients";
import { pickNewsletterSection, toNewsletter } from "./newsletter";
import { pickDeliveryEngineSection, toDeliveryEngine } from "./delivery-engine";
import { pickFrameworkPhasesSection, toFrameworkPhases } from "./framework-phases";
import { pickValuePropositionSection, toValueProposition } from "./value-proposition";
import { pickFutureIndustrySection, toFutureIndustry } from "./future-industry";
import { pickReviewsSection, toReviews } from "./reviews";
import { pickCaseStudiesSection, toCaseStudies } from "./case-studies";
import { pickBlogSection, toBlogSection } from "./blog-section";
import { pickCultureGallerySection, toCultureGallery } from "./culture-gallery";
import { pickCtaBannerSection, toCtaBanner } from "./cta-banner";
import type { StrapiStatisticsSection } from "./statistics";
import type { StrapiHeroSection, HeroData } from "./hero";
import type { StrapiTrustedClientsSection, TrustedClientsData } from "./trusted-clients";
import type { StrapiNewsletterSection, NewsletterData } from "./newsletter";
import type { StrapiDeliveryEngineSection, DeliveryEngineData } from "./delivery-engine";
import type { StrapiFrameworkPhasesSection, FrameworkPhasesData } from "./framework-phases";
import type { StrapiValuePropositionSection, ValuePropositionData } from "./value-proposition";
import type { StrapiFutureIndustrySection, FutureIndustryData } from "./future-industry";
import type { StrapiReviewsSection, ReviewsData } from "./reviews";
import type { StrapiCaseStudiesSection, CaseStudiesData } from "./case-studies";
import type { StrapiBlogSection, BlogSectionData } from "./blog-section";
import type { StrapiCultureGallerySection, CultureGalleryData } from "./culture-gallery";
import type { StrapiCtaBannerSection, CtaBannerData } from "./cta-banner";

// The homepage is a single Strapi dynamic zone (`sections`), unlike header/footer's
// fixed-shape single-collection endpoints — the whole page is fetched in one call here,
// and each `./` sibling file owns picking its own section out of the zone (by
// `__component`), its own Strapi/view types, its own default, and its own mapper.
const HOME_ENDPOINT = "/api/pages/by-slug/home";

type StrapiHomeSection =
  | StrapiStatisticsSection
  | StrapiHeroSection
  | StrapiTrustedClientsSection
  | StrapiNewsletterSection
  | StrapiDeliveryEngineSection
  | StrapiFrameworkPhasesSection
  | StrapiValuePropositionSection
  | StrapiFutureIndustrySection
  | StrapiReviewsSection
  | StrapiCaseStudiesSection
  | StrapiBlogSection
  | StrapiCultureGallerySection
  | StrapiCtaBannerSection;

type StrapiHomeData = {
  sections: StrapiHomeSection[];
};

export type HomeData = {
  hero?: HeroData;
  trustedClients?: TrustedClientsData;
  newsletter?: NewsletterData;
  deliveryEngine?: DeliveryEngineData;
  frameworkPhases?: FrameworkPhasesData;
  valueProposition?: ValuePropositionData;
  futureIndustry?: FutureIndustryData;
  reviews?: ReviewsData;
  caseStudies?: CaseStudiesData;
  blogSection?: BlogSectionData;
  cultureGallery?: CultureGalleryData;
  ctaBanner?: CtaBannerData;
};

// Called directly from the (async) homepage Server Component (await getHomeData()) —
// runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild, and the browser never sees a loading state for this data. There is
// no static fallback content: the page returns null when the CMS is unreachable (the
// Server Component calls notFound()), and any individual section absent from the
// dynamic zone is simply omitted from the returned object — the page renders only
// what the CMS actually supplies, nothing backfilled.
//
// Wrapped in React's cache() (same reasoning as getConstructionPageContent) — if the
// homepage's own generateMetadata() or any other render-pass caller ever needs this
// same data, it's memoized per-request so only the first call actually hits the CMS.
export const getHomeData = cache(async (): Promise<HomeData | null> => {
  const data = await fetchCms<StrapiHomeData>(HOME_ENDPOINT);
  if (!data) return null;

  const sections = data.sections ?? [];
  const statisticsSections = pickStatisticsSections(sections);

  const heroSection = pickHeroSection(sections);
  const hero = heroSection ? toHero(heroSection, statisticsSections[0]?.statistics[0]) : undefined;
  if (hero) hero.stats = toHeroStats(statisticsSections[1]?.statistics);

  const trustedClientsSection = pickTrustedClientsSection(sections);
  const newsletterSection = pickNewsletterSection(sections);
  const deliveryEngineSection = pickDeliveryEngineSection(sections);
  const frameworkPhasesSection = pickFrameworkPhasesSection(sections);
  const valuePropositionSection = pickValuePropositionSection(sections);
  const futureIndustrySection = pickFutureIndustrySection(sections);
  const reviewsSection = pickReviewsSection(sections);
  const caseStudiesSection = pickCaseStudiesSection(sections);
  const blogSection = pickBlogSection(sections);
  const cultureGallerySection = pickCultureGallerySection(sections);
  const ctaBannerSection = pickCtaBannerSection(sections);

  return {
    hero,
    trustedClients: trustedClientsSection ? toTrustedClients(trustedClientsSection) : undefined,
    newsletter: newsletterSection ? toNewsletter(newsletterSection) : undefined,
    deliveryEngine: deliveryEngineSection ? toDeliveryEngine(deliveryEngineSection) : undefined,
    frameworkPhases: frameworkPhasesSection ? toFrameworkPhases(frameworkPhasesSection) : undefined,
    valueProposition: valuePropositionSection ? toValueProposition(valuePropositionSection) : undefined,
    futureIndustry: futureIndustrySection ? toFutureIndustry(futureIndustrySection) : undefined,
    reviews: reviewsSection ? toReviews(reviewsSection, statisticsSections[2]) : undefined,
    caseStudies: caseStudiesSection ? toCaseStudies(caseStudiesSection) : undefined,
    blogSection: blogSection ? toBlogSection(blogSection) : undefined,
    cultureGallery: cultureGallerySection ? toCultureGallery(cultureGallerySection) : undefined,
    ctaBanner: ctaBannerSection ? toCtaBanner(ctaBannerSection) : undefined,
  };
});
