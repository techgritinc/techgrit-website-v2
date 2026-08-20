import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LifeGallery from "../_home-components/LifeGallery";
import { CareersHero } from "./_components/CareersHero";
import { StatsStrip } from "./_components/StatsStrip";
import { WhyJoinSection } from "./_components/WhyJoinSection";
import { OpenRolesSection } from "./_components/open-roles-section";
import { CareersCta } from "./_components/CareersCta";
import { getCareersPageContent } from "@/cms/api/careers";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCareersPageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function CareersPage() {
  const content = await getCareersPageContent();
  if (!content) notFound();

  return (
    <>
      <CareersHero content={content.hero} />
      <StatsStrip stats={content.stats} />
      <WhyJoinSection heading={content.whyJoin.heading} benefits={content.benefits} />
      <OpenRolesSection
        filters={content.filters}
        roles={content.roles}
        applicationForm={content.applicationForm}
      />
      <LifeGallery
        id="life"
        heading={content.lifeAtTechGrit.heading}
        description={content.lifeAtTechGrit.description}
        eyebrow={content.lifeAtTechGrit.eyebrow}
        images={content.lifeAtTechGrit.images}
      />
      <CareersCta content={content.cta} applicationForm={content.applicationForm} />
    </>
  );
}
