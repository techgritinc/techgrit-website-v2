import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsightsPageContent } from "@/cms/api/insights/page-content";
import { AiModernizationWhy } from "@/app/what-we-do/ai-modernization/_components/ai-modernization-why";
import { LeadershipProfiles } from "@/app/about/leadership-advisory/_components/leadership-profiles";
import TestimonialsSection from "@/app/_home-components/TestimonialsSection";
import { InsightsHero } from "../_components/insights-hero";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInsightsPageContent("whitepapers");
  return content ? { title: content.seo.metaTitle, description: content.seo.metaDescription } : {};
}

export default async function WhitepapersPage() {
  const content = await getInsightsPageContent("whitepapers");
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      <InsightsHero section={content.hero} />
      <AiModernizationWhy section={content.why} />
      <LeadershipProfiles profiles={content.profiles} />
      <TestimonialsSection data={content.reviews} />
    </main>
  );
}
