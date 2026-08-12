import { webinarPageContent } from "./_data/webinar-content";
import { AnnouncementStrip } from "./_components/announcement-strip";
import { HeroSection } from "./_components/hero-section";
import { SessionsSection } from "./_components/sessions-section";
import { SubscribePanel } from "./_components/subscribe-panel";

export default function WebinarPage() {
  return (
    <>
      <AnnouncementStrip session={webinarPageContent.upcomingSession} />
      <HeroSection content={webinarPageContent.hero} />
      <SessionsSection
        heading={webinarPageContent.sessionsHeading}
        releasedSessions={webinarPageContent.releasedSessions}
      />
      <SubscribePanel content={webinarPageContent.subscribePanel} />
    </>
  );
}
