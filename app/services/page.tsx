import type { Metadata } from "next";
import { getServicesData } from "@/cms/api/services";
import { ServicesHero } from "./_components/services-hero";
import { ServicesAccordion } from "./_components/services-accordion";
import { ServicesFinalCta } from "./_components/services-final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicesData();
  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function ServicesPage() {
  const content = await getServicesData();

  return (
    <main className="overflow-x-clip">
      {content.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <ServicesHero key={section.order} section={section} />;
          case "accordion":
            return <ServicesAccordion key={section.order} section={section} />;
          case "finalCta":
            return <ServicesFinalCta key={section.order} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
