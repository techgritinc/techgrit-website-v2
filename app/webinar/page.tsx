import { webinarPageContent } from "./_data/webinar-content";
import { HeroSection } from "./_components/hero-section";
import { SessionsSection } from "./_components/sessions-section";
import { SubscribePanel } from "./_components/subscribe-panel";

export default function WebinarPage() {
  return (
    <>
      <HeroSection content={webinarPageContent.hero} />
      <SessionsSection
        heading={webinarPageContent.sessionsHeading}
        upcomingSession={webinarPageContent.upcomingSession}
        releasedSessions={webinarPageContent.releasedSessions}
      />
      <SubscribePanel content={webinarPageContent.subscribePanel} />
    </>
  );
}
