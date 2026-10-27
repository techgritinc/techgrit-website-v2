"use client";

import Button from "@/components/ui/Button";
import type { UpcomingSession } from "../_data/types";

export function AnnouncementStrip({ session }: { session: UpcomingSession }) {
  // Register Now always scrolls to this page's own Subscribe section — the CMS's
  // ctaLink can't be relied on to point at an in-page anchor, so it's ignored here.
  function handleRegisterClick() {
    document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative z-20">
      <div className="tg-container !px-9" style={{ marginTop: 16 }}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-[22px] rounded-[16px] border border-[var(--color-border-amber-35)] bg-[image:var(--gradient-webinar-announce)] px-[22px] py-[14px] shadow-[var(--shadow-webinar-announce)] backdrop-blur-cta transition-colors duration-200 max-tg-sm:grid-cols-1 max-tg-sm:gap-3">
          <span className="inline-flex items-center gap-[9px] whitespace-nowrap text-xs-alt font-extrabold text-yellow leading-[normal] tracking-[1.61px] uppercase">
            <span className="status-dot bg-yellow shadow-glow-amber-sm animate-[tgblink_1.8s_ease-in-out_infinite] motion-reduce:animate-none" />
            {session.statusLabel}
          </span>
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14.5px] font-semibold text-strong max-tg-sm:whitespace-normal leading-[normal]">
            {session.title} &middot; {session.when}
          </span>
          <Button
            size="sm"
            onClick={handleRegisterClick}
            className="!gap-2 !rounded-[10px] !py-[9px] !text-[13.5px] max-tg-sm:!w-full max-tg-sm:!justify-center leading-[normal] !shadow-nav-btn !hover:shadow-none hover:translate-y-0!"
          >
            {session.ctaLabel} <span className="text-[14px]">&#8594;</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
