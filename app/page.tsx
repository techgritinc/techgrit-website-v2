import { getHomeData } from "@/cms/api/home";
import BlogSection from "@/app/_home-components/BlogSection";
import CaseStudiesSection from "@/app/_home-components/CaseStudiesSection";
import FinalCta from "@/app/_home-components/FinalCta";
import Hero from "@/app/_home-components/Hero";
import IndustriesSection from "@/app/_home-components/IndustriesSection";
import LifeGallery from "@/app/_home-components/LifeGallery";
import MethodologySection from "@/app/_home-components/MethodologySection";
import PlatformSection from "@/app/_home-components/PlatformSection";
import ReImagineSection from "@/app/_home-components/ReImagineSection";
import SubscribeBand from "@/app/_home-components/SubscribeBand";
import TestimonialsSection from "@/app/_home-components/TestimonialsSection";
import TrustedClients from "@/app/_home-components/TrustedClients";

export default async function Home() {
  const data = await getHomeData();

  return (
    <main>
      <Hero data={data.hero} />
      <TrustedClients data={data.trustedClients} />
      <PlatformSection data={data.deliveryEngine} />
      <MethodologySection data={data.frameworkPhases} />
      <ReImagineSection data={data.valueProposition} />
      <IndustriesSection data={data.futureIndustry} />
      <TestimonialsSection data={data.reviews} />
      <SubscribeBand data={data.newsletter} />
      <CaseStudiesSection data={data.caseStudies} />
      <BlogSection data={data.blogSection} />
      <LifeGallery
        showActions
        heading={data.cultureGallery.title}
        description={data.cultureGallery.subtitle}
        images={data.cultureGallery.images}
        primaryBtnLabel={data.cultureGallery.primaryBtn.label}
        primaryBtnLink={data.cultureGallery.primaryBtn.href}
        secondaryBtnLabel={data.cultureGallery.secondaryBtn.label}
        secondaryBtnLink={data.cultureGallery.secondaryBtn.href}
      />
      <FinalCta data={data.ctaBanner} />
    </main>
  );
}
