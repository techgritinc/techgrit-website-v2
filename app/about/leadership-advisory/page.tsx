import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLeadershipPageContent } from "./_data/data";
import { LeadershipHero } from "./_components/leadership-hero";
import { LeadershipProfiles } from "./_components/leadership-profiles";
import { LeadershipWhyItMatters } from "./_components/leadership-why-it-matters";
import { FinalCta } from "@/components/ui/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLeadershipPageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function LeadershipAdvisoryPage() {
  const content = await getLeadershipPageContent();
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      <LeadershipHero section={content.hero} />
      <LeadershipProfiles profiles={content.profiles} />
      <LeadershipWhyItMatters section={content.whyItMatters} />
      <FinalCta section={content.finalCta} maxWidth={1280} paddingTop={20} paddingBottom={100} titleLineHeight={1.06} />
    </main>
  );
}
