import type { Metadata } from "next";
import { getWebinarData } from "@/cms/api/insights/webinar";
import { AnnouncementStrip } from "./_components/announcement-strip";
import { HeroSection } from "./_components/hero-section";
import { SessionsSection } from "./_components/sessions-section";
import { SubscribePanel } from "./_components/subscribe-panel";
import { CtaBannerSection } from "./_components/cta-banner-section";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebinarData();
  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function WebinarPage() {
  const content = await getWebinarData();

  return (
    <>
      <AnnouncementStrip session={content.upcomingSession} />
      <HeroSection content={content.hero} />
      <SessionsSection heading={content.sessionsHeading} releasedSessions={content.releasedSessions} />
      <SubscribePanel content={content.subscribePanel} />
      <CtaBannerSection content={content.ctaBanner} />
    </>
  );
}
