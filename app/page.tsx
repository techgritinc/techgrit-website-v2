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

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedClients />
      <SubscribeBand />
      <PlatformSection />
      <MethodologySection />
      <ReImagineSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <BlogSection />
      <LifeGallery />
      <FinalCta />
    </main>
  );
}
