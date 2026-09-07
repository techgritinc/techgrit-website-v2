import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHealthcarePageContent } from "@/cms/api/industries/healthcare";
import { IndustryHero } from "@/components/ui/IndustryHero";
import { IndustryCardGrid } from "@/components/ui/IndustryCardGrid";
import { IndustryStepGrid } from "@/components/ui/IndustryStepGrid";
import { IndustryServiceRows } from "@/components/ui/IndustryServiceRows";
import { IndustryTileGrid } from "@/components/ui/IndustryTileGrid";
import { IndustryFeaturedCases } from "@/components/ui/IndustryFeaturedCases";
import { ConnectedSystems } from "@/components/ui/ConnectedSystems";
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
            return <IndustryHero key={section.order} section={section} />;
          case "whatWeBuild":
            return <IndustryCardGrid key={section.order} section={section} />;
          case "productLifecycle":
            return <IndustryStepGrid key={section.order} section={section} />;
          case "engineeringServices":
            return <IndustryServiceRows key={section.order} section={section} />;
          case "solutionsWeSupport":
            return <IndustryTileGrid key={section.order} section={section} />;
          case "featuredCapabilities":
            return <IndustryFeaturedCases key={section.order} section={section} />;
          case "connectedSystems":
            return <ConnectedSystems key={section.order} section={section} />;
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
