"use client";

import Button from "@/components/ui/Button";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { ClockIcon, PlayIcon } from "@/components/ui/icons";
import type { UpcomingSession, ReleasedSession, ReleasedSessionAccent } from "../_data/types";

const RELEASED_ACCENT_COVER: Record<ReleasedSessionAccent, string> = {
  orange: "bg-[image:var(--gradient-blog-featured)]",
  blue: "bg-[image:var(--gradient-webinar-released-blue)]",
  teal: "bg-[image:var(--gradient-webinar-released-teal)]",
};

export function SessionsSection({
  heading,
  upcomingSession,
  releasedSessions,
}: {
  heading: string;
  upcomingSession: UpcomingSession;
  releasedSessions: ReleasedSession[];
}) {
  return (
    <section className="relative">
      <div className="tg-container !px-tg-15" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <h2 className="mb-7 text-[length:var(--text-webinar-h2)] tracking-[-0.03em]">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-2">
          <UpcomingPanel session={upcomingSession} />
          {releasedSessions.map((session) =>
            session.cardSize === "full" ? (
              <ReleasedCardFull key={session.id} session={session} />
            ) : (
              <ReleasedCardHalf key={session.id} session={session} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function UpcomingPanel({ session }: { session: UpcomingSession }) {
  function handleRegisterClick() {
    document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <GlassCard
      variant="webinarUpcoming"
      hoverBorderColor=""
      className="relative flex flex-wrap items-center justify-between gap-[30px] overflow-hidden tg-md:col-span-2"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[90px] right-[4%] h-80 w-80 rounded-full bg-overlay-amber-16 blur-glow-100"
      />
      <div className="relative max-w-[640px]">
        <span className="inline-flex items-center gap-2 text-12 font-bold tracking-label leading-[normal] text-yellow uppercase">
          <span className="status-dot bg-yellow shadow-glow-amber-sm" />
          {session.statusLabel}
        </span>
        <GlassCardTitle variant="webinarUpcoming" className="mt-3.5">
          {session.title}
        </GlassCardTitle>
        <GlassCardDescription variant="webinarUpcoming">{session.description}</GlassCardDescription>
        <div className="mt-4 inline-flex items-center gap-[9px] text-[length:var(--text-14-5)] font-semibold text-[var(--color-text-82)]">
          <ClockIcon stroke="var(--color-yellow)" />
          {session.date} &middot; {session.time} {session.timezone}
        </div>
      </div>
      <Button
        size="lg"
        className="relative !px-tg-13 !text-[16px] !rounded-card !shadow-btn-subscribe leading-[normal]"
        onClick={handleRegisterClick}
      >
        {session.ctaLabel} <span className="text-[17px]">&#8594;</span>
      </Button>
    </GlassCard>
  );
}

function WatchNowGlyph({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-white/25 ${compact ? "h-5 w-5" : "h-[22px] w-[22px]"}`}
    >
      <PlayIcon width={compact ? 10 : 11} height={compact ? 10 : 11} fill="white" />
    </span>
  );
}

function ReleasedCardHalf({ session }: { session: ReleasedSession }) {
  return (
    <GlassCard
      variant="webinarReleased"
      hoverBorderColor=""
      className="flex min-w-0 flex-col"
    >
      <div
        className={`relative flex h-40 items-center justify-center border-b border-border-8 ${RELEASED_ACCENT_COVER[session.accent]}`}
      >
        <Button size="md" className="!py-tg-3a !px-5 !text-xs !gap-[9px] !rounded-full !shadow-none hover:!shadow-none hover:!translate-y-0 leading-[normal]">
          {session.ctaLabel}
          <WatchNowGlyph />
        </Button>
      </div>
      <div className="px-[26px] pt-6 pb-[26px]">
        <span className="text-12 font-bold tracking-wider text-amber-light uppercase">
          {session.statusLabel}
        </span>
        <GlassCardTitle variant="webinarReleased" className="mt-2.5">
          {session.title}
        </GlassCardTitle>
        <GlassCardDescription variant="webinarReleased" className="mt-[9px] text-white/60">
          {session.description}
        </GlassCardDescription>
      </div>
    </GlassCard>
  );
}

function ReleasedCardFull({ session }: { session: ReleasedSession }) {
  return (
    <GlassCard
      variant="webinarReleased"
      hoverBorderColor=""
      className="flex flex-row items-center gap-7 p-2 tg-md:col-span-2"
    >
      <div
        className={`relative flex w-[var(--size-220)] shrink-0 items-center justify-center self-stretch rounded-lg ${RELEASED_ACCENT_COVER[session.accent]}`}
        style={{ minHeight: "var(--size-150)" }}
      >
        <Button size="sm" className="gap-2 !rounded-full !py-tg-3 !px-tg-7 !text-[13.5px] !shadow-none hover:!shadow-none hover:!translate-y-0 leading-[normal]">
          {session.ctaLabel}
          <WatchNowGlyph compact />
        </Button>
      </div>
      <div className="py-[18px] pr-[26px] pl-0">
        <span className="text-12 font-bold tracking-wider text-amber-light uppercase">
          {session.statusLabel}
        </span>
        <GlassCardTitle variant="webinarReleased" className="mt-2">
          {session.title}
        </GlassCardTitle>
        <GlassCardDescription variant="webinarReleased" className="mt-2 text-white/60">
          {session.description}
        </GlassCardDescription>
      </div>
    </GlassCard>
  );
}
