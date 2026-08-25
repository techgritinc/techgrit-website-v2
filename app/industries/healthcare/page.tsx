import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHealthcarePageContent } from "@/cms/api/healthcare";
import { HealthcareHero } from "./_components/healthcare-hero";
import { HealthcareWhatWeBuild } from "./_components/healthcare-what-we-build";
import { HealthcareProductLifecycle } from "./_components/healthcare-product-lifecycle";
import { HealthcareEngineeringServices } from "./_components/healthcare-engineering-services";
import { HealthcareSolutionsWeSupport } from "./_components/healthcare-solutions-we-support";
import { HealthcareFeaturedCapabilities } from "./_components/healthcare-featured-capabilities";
import { HealthcareConnectedSystems } from "./_components/healthcare-connected-systems";
import { FinalCta } from "@/components/ui/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHealthcarePageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function HealthcarePage() {
  const content = await getHealthcarePageContent();
  if (!content) notFound();

  const sections = content.sections.filter((section) => section !== undefined);

  return (
    <main className="overflow-x-clip">
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <HealthcareHero key={section.order} section={section} />;
          case "whatWeBuild":
            return <HealthcareWhatWeBuild key={section.order} section={section} />;
          case "productLifecycle":
            return <HealthcareProductLifecycle key={section.order} section={section} />;
          case "engineeringServices":
            return <HealthcareEngineeringServices key={section.order} section={section} />;
          case "solutionsWeSupport":
            return <HealthcareSolutionsWeSupport key={section.order} section={section} />;
          case "featuredCapabilities":
            return <HealthcareFeaturedCapabilities key={section.order} section={section} />;
          case "connectedSystems":
            return <HealthcareConnectedSystems key={section.order} section={section} />;
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
                tone="amber"
                maxWidth={1280}
                section={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  description: section.description,
                  ctaLabel: section.primaryCtaLabel,
                  ctaLink: section.primaryCtaLink,
                }}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
