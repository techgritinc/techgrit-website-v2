"use client";

import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { PlayIcon } from "@/components/ui/icons";
import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import type { ReleasedSession } from "../_data/types";

export function SessionsSection({
  heading,
  releasedSessions,
}: {
  heading: string;
  releasedSessions: ReleasedSession[];
}) {
  return (
    <section className="relative">
      <div className="tg-container !px-9" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <h2 className="mb-7 text-[length:var(--text-webinar-h2)] tracking-[-0.03em] leading-[normal]">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-2">
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

function WatchNowGlyph({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-white/25 ${compact ? "h-5 w-5" : "h-[22px] w-[22px]"}`}
    >
      <PlayIcon width={compact ? 10 : 11} height={compact ? 10 : 11} fill="white" />
    </span>
  );
}

// Sessions with no functional destination (the local/default content) leave ctaLink
// empty, so the button stays a no-op — a CMS-authored recording link opens in a new
// tab, since it navigates away from this page entirely.
function handleWatchNow(ctaLink: string) {
  if (ctaLink.startsWith("http")) {
    window.open(ctaLink, "_blank", "noopener,noreferrer");
  }
}

function ReleasedCardHalf({ session }: { session: ReleasedSession }) {
  return (
    <GlassCard
      variant="webinarReleased"
      hoverBorderColor=""
      className="flex min-w-0 flex-col"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border-8">
        <MediaSlot
          src={session.image?.url}
          alt={session.image?.alt ?? session.title}
          fill
          sizes="(max-width: 960px) 100vw, 50vw"
        />
        <Button
          size="md"
          onClick={() => handleWatchNow(session.ctaLink)}
          style={{ fontFamily: "Arial, sans-serif" }}
          className="relative z-10 !py-tg-3a !px-5 !text-[14px] !gap-[9px] !rounded-full !shadow-none hover:!shadow-none hover:!translate-y-0 leading-[normal]"
        >
          {session.ctaLabel}
          <WatchNowGlyph />
        </Button>
      </div>
      <div className="px-[26px] pt-6 pb-[26px] -mt-0.5!">
        <span className="text-12 font-bold tracking-wider text-amber-light leading-[normal] uppercase">
          {session.statusLabel}
        </span>
        <GlassCardTitle variant="webinarReleased" title={session.title} className="mt-1.75">
          {session.title}
        </GlassCardTitle>
        <GlassCardDescription variant="webinarReleased" title={session.description} className="mt-[9px] text-white/60">
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
      className="flex flex-col gap-7 p-2 tg-md:col-span-2 tg-sm:flex-row tg-sm:items-center"
    >
      <div className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-lg tg-sm:w-[var(--size-220)]">
        <MediaSlot
          src={session.image?.url}
          alt={session.image?.alt ?? session.title}
          fill
          sizes="(max-width: 640px) 100vw, 220px"
        />
        <Button
          size="sm"
          onClick={() => handleWatchNow(session.ctaLink)}
          style={{ fontFamily: "Arial, sans-serif" }}
          className="relative z-10 !gap-2 !rounded-full !py-[10px] !px-tg-7 !text-[13.5px] !shadow-none hover:!shadow-none hover:!translate-y-0 leading-[normal]"
        >
          {session.ctaLabel}
          <WatchNowGlyph compact />
        </Button>
      </div>
      <div className="-mt-0.5! px-[18px] pb-[18px] tg-sm:px-0 tg-sm:py-[18px] tg-sm:pr-[26px]">
        <span className="text-12 font-bold tracking-wider text-amber-light leading-[normal] uppercase">
          {session.statusLabel}
        </span>
        <GlassCardTitle variant="webinarReleased" title={session.title} className="mt-1.25">
          {session.title}
        </GlassCardTitle>
        <GlassCardDescription
          variant="webinarReleased"
          title={session.description}
          className="mt-2! text-white/60"
        >
          {session.description}
        </GlassCardDescription>
      </div>
    </GlassCard>
  );
}
