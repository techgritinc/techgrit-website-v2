import type { Metadata } from "next";
import { servicesContent } from "./_data/services-content";
import { ServicesHero } from "./_components/services-hero";
import { ServicesOverview } from "./_components/services-overview";
import { ServiceDetailSection } from "./_components/service-detail-section";
import { ServicesFinalCta } from "./_components/services-final-cta";

export const metadata: Metadata = {
  title: servicesContent.seo.metaTitle,
  description: servicesContent.seo.metaDescription,
};

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      {servicesContent.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <ServicesHero key={section.order} section={section} />;
          case "overview":
            return <ServicesOverview key={section.order} section={section} />;
          case "serviceDetail":
            return <ServiceDetailSection key={section.order} section={section} />;
          case "finalCta":
            return <ServicesFinalCta key={section.order} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
