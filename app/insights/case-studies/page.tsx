import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudiesPageContent } from "@/cms/api/case-studies";
import { NewsletterPanel } from "@/components/ui/NewsletterPanel";
import { CaseStudiesHero } from "./_components/case-studies-hero";
import { FeaturedCaseStudy } from "./_components/featured-case-study";
import { CaseStudiesFilterSection } from "./_components/case-studies-filter-section";
import { CaseStudiesFinalCta } from "./_components/case-studies-final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCaseStudiesPageContent();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function CaseStudiesPage() {
  const content = await getCaseStudiesPageContent();
  if (!content) notFound();

  const hero = content.sections.find((section) => section?.type === "hero");
  const tabFilters = content.sections.find((section) => section?.type === "tabFilters");
  const cardsSection = content.sections.find((section) => section?.type === "caseStudyCards");
  const newsletter = content.sections.find((section) => section?.type === "newsletter");
  const finalCta = content.sections.find((section) => section?.type === "finalCta");
  const featured = cardsSection?.caseStudies.find((caseStudy) => caseStudy.isFeatured);

  return (
    <main>
      {hero ? (
        <CaseStudiesHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          titleHighlight={hero.titleHighlight}
          subtitle={hero.subtitle}
        />
      ) : null}
      {featured ? <FeaturedCaseStudy caseStudy={featured} /> : null}
      {cardsSection && tabFilters ? (
        <CaseStudiesFilterSection caseStudies={cardsSection.caseStudies} tabs={tabFilters.tabs} />
      ) : null}
      {newsletter ? (
        <NewsletterPanel
          content={{
            heading: newsletter.heading,
            copy: newsletter.copy,
            ctaLabel: newsletter.ctaLabel,
            placeholder: newsletter.placeholder,
            helperText: newsletter.helperText,
            successText: newsletter.successText,
          }}
          category="case-studies"
        />
      ) : null}
      {finalCta ? (
        <CaseStudiesFinalCta
          title={finalCta.title}
          titleHighlight={finalCta.titleHighlight}
          description={finalCta.description}
          ctaLabel={finalCta.primaryCtaLabel}
          ctaLink={finalCta.primaryCtaLink}
        />
      ) : null}
    </main>
  );
}
