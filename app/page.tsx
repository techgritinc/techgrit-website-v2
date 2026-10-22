import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getHomeData } from "@/cms/api/home";
import BlogSection from "@/app/_home-components/BlogSection";
import CaseStudiesSection from "@/app/_home-components/CaseStudiesSection";
import FinalCta from "@/app/_home-components/FinalCta";
import Hero from "@/app/_home-components/Hero";
import IndustriesSection from "@/app/_home-components/IndustriesSection";
import MethodologySection from "@/app/_home-components/MethodologySection";
import PlatformSection from "@/app/_home-components/PlatformSection";
import TrustedClients from "@/app/_home-components/TrustedClients";

const ReImagineSection = dynamic(() => import("@/app/_home-components/ReImagineSection"));
const TestimonialsSection = dynamic(() => import("@/app/_home-components/TestimonialsSection"));
const SubscribeBand = dynamic(() => import("@/app/_home-components/SubscribeBand"));
const LifeGallery = dynamic(() => import("@/app/_home-components/LifeGallery"));

export default async function Home() {
  const data = await getHomeData();
  if (!data) notFound();

  return (
    <main>
      {data.hero && <Hero data={data.hero} />}
      {data.trustedClients && <TrustedClients data={data.trustedClients} />}
      {data.deliveryEngine && <PlatformSection data={data.deliveryEngine} />}
      {data.frameworkPhases && <MethodologySection data={data.frameworkPhases} />}
      {data.valueProposition && <ReImagineSection data={data.valueProposition} />}
      {data.futureIndustry && <IndustriesSection data={data.futureIndustry} />}
      {data.reviews && <TestimonialsSection data={data.reviews} />}
      {data.newsletter && <SubscribeBand data={data.newsletter} />}
      {data.caseStudies && <CaseStudiesSection data={data.caseStudies} />}
      {data.blogSection && <BlogSection data={data.blogSection} />}
      {data.cultureGallery && (
        <LifeGallery
          showActions
          videoOnly
          heading={data.cultureGallery.title}
          description={data.cultureGallery.subtitle}
          images={data.cultureGallery.images}
          primaryBtnLabel={data.cultureGallery.primaryBtn.label}
          primaryBtnLink={data.cultureGallery.primaryBtn.href}
          secondaryBtnLabel={data.cultureGallery.secondaryBtn.label}
          secondaryBtnLink={data.cultureGallery.secondaryBtn.href}
        />
      )}
      {data.ctaBanner && <FinalCta data={data.ctaBanner} />}
    </main>
  );
}
