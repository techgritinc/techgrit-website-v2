import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWebinarData } from "@/cms/api/insights/webinar";
import { AnnouncementStrip } from "./_components/announcement-strip";
import { HeroSection } from "./_components/hero-section";
import { SessionsSection } from "./_components/sessions-section";
import { SubscribePanel } from "./_components/subscribe-panel";
import { CtaBannerSection } from "./_components/cta-banner-section";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebinarData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function WebinarPage() {
  const content = await getWebinarData();
  if (!content) notFound();

  return (
    <>
      {content.upcomingSession ? <AnnouncementStrip session={content.upcomingSession} /> : null}
      {content.hero ? <HeroSection content={content.hero} /> : null}
      <SessionsSection heading={content.sessionsHeading} releasedSessions={content.releasedSessions} />
      {content.subscribePanel ? <SubscribePanel content={content.subscribePanel} /> : null}
      {content.ctaBanner ? <CtaBannerSection content={content.ctaBanner} /> : null}
    </>
  );
}
