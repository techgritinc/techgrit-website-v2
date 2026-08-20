import { fetchCms } from "../fetcher";
import { pickStatisticsSections } from "./statistics";
import { DEFAULT_HERO_DATA, pickHeroSection, toHero, toHeroStats } from "./hero";
import { DEFAULT_TRUSTED_CLIENTS_DATA, pickTrustedClientsSection, toTrustedClients } from "./trusted-clients";
import { DEFAULT_NEWSLETTER_DATA, pickNewsletterSection, toNewsletter } from "./newsletter";
import { DEFAULT_DELIVERY_ENGINE_DATA, pickDeliveryEngineSection, toDeliveryEngine } from "./delivery-engine";
import { DEFAULT_FRAMEWORK_PHASES_DATA, pickFrameworkPhasesSection, toFrameworkPhases } from "./framework-phases";
import { DEFAULT_VALUE_PROPOSITION_DATA, pickValuePropositionSection, toValueProposition } from "./value-proposition";
import { DEFAULT_FUTURE_INDUSTRY_DATA, pickFutureIndustrySection, toFutureIndustry } from "./future-industry";
import { DEFAULT_REVIEWS_DATA, pickReviewsSection, toReviews } from "./reviews";
import { DEFAULT_CASE_STUDIES_DATA, pickCaseStudiesSection, toCaseStudies } from "./case-studies";
import { DEFAULT_BLOG_SECTION_DATA, pickBlogSection, toBlogSection } from "./blog-section";
import { DEFAULT_CULTURE_GALLERY_DATA, pickCultureGallerySection, toCultureGallery } from "./culture-gallery";
import { DEFAULT_CTA_BANNER_DATA, pickCtaBannerSection, toCtaBanner } from "./cta-banner";
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
  hero: HeroData;
  trustedClients: TrustedClientsData;
  newsletter: NewsletterData;
  deliveryEngine: DeliveryEngineData;
  frameworkPhases: FrameworkPhasesData;
  valueProposition: ValuePropositionData;
  futureIndustry: FutureIndustryData;
  reviews: ReviewsData;
  caseStudies: CaseStudiesData;
  blogSection: BlogSectionData;
  cultureGallery: CultureGalleryData;
  ctaBanner: CtaBannerData;
};

// Last-resort fallback if the CMS is genuinely unreachable — the homepage degrades to
// the same static content it shipped with before CMS integration, rather than
// crashing the page, matching the header/footer fallback precedent.
export const DEFAULT_HOME_DATA: HomeData = {
  hero: DEFAULT_HERO_DATA,
  trustedClients: DEFAULT_TRUSTED_CLIENTS_DATA,
  newsletter: DEFAULT_NEWSLETTER_DATA,
  deliveryEngine: DEFAULT_DELIVERY_ENGINE_DATA,
  frameworkPhases: DEFAULT_FRAMEWORK_PHASES_DATA,
  valueProposition: DEFAULT_VALUE_PROPOSITION_DATA,
  futureIndustry: DEFAULT_FUTURE_INDUSTRY_DATA,
  reviews: DEFAULT_REVIEWS_DATA,
  caseStudies: DEFAULT_CASE_STUDIES_DATA,
  blogSection: DEFAULT_BLOG_SECTION_DATA,
  cultureGallery: DEFAULT_CULTURE_GALLERY_DATA,
  ctaBanner: DEFAULT_CTA_BANNER_DATA,
};

// Called directly from the (async) homepage Server Component (await getHomeData()) —
// runs on the server for every request, so CMS edits show up on the next page load
// with no rebuild, and the browser never sees a loading state for this data. Each
// section degrades independently to its own default when absent from the dynamic
// zone; the whole page degrades to DEFAULT_HOME_DATA only when the CMS is entirely
// unreachable.
export async function getHomeData(): Promise<HomeData> {
  const data = await fetchCms<StrapiHomeData>(HOME_ENDPOINT);
  if (!data) return DEFAULT_HOME_DATA;

  const sections = data.sections ?? [];
  const statisticsSections = pickStatisticsSections(sections);

  const heroSection = pickHeroSection(sections);
  const hero = heroSection ? toHero(heroSection, statisticsSections[0]?.statistics[0]) : DEFAULT_HOME_DATA.hero;
  hero.stats = toHeroStats(statisticsSections[1]?.statistics);

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
    trustedClients: trustedClientsSection ? toTrustedClients(trustedClientsSection) : DEFAULT_HOME_DATA.trustedClients,
    newsletter: newsletterSection ? toNewsletter(newsletterSection) : DEFAULT_HOME_DATA.newsletter,
    deliveryEngine: deliveryEngineSection ? toDeliveryEngine(deliveryEngineSection) : DEFAULT_HOME_DATA.deliveryEngine,
    frameworkPhases: frameworkPhasesSection ? toFrameworkPhases(frameworkPhasesSection) : DEFAULT_HOME_DATA.frameworkPhases,
    valueProposition: valuePropositionSection ? toValueProposition(valuePropositionSection) : DEFAULT_HOME_DATA.valueProposition,
    futureIndustry: futureIndustrySection ? toFutureIndustry(futureIndustrySection) : DEFAULT_HOME_DATA.futureIndustry,
    reviews: reviewsSection ? toReviews(reviewsSection, statisticsSections[2]) : DEFAULT_HOME_DATA.reviews,
    caseStudies: caseStudiesSection ? toCaseStudies(caseStudiesSection) : DEFAULT_HOME_DATA.caseStudies,
    blogSection: blogSection ? toBlogSection(blogSection) : DEFAULT_HOME_DATA.blogSection,
    cultureGallery: cultureGallerySection ? toCultureGallery(cultureGallerySection) : DEFAULT_HOME_DATA.cultureGallery,
    ctaBanner: ctaBannerSection ? toCtaBanner(ctaBannerSection) : DEFAULT_HOME_DATA.ctaBanner,
  };
}
