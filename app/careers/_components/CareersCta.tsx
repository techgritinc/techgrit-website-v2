"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { ApplicationDialog } from "./application-dialog";
import type { ApplicationContext } from "./application-dialog";
import type { ClosingCtaContent } from "../_data/careers-data";

const GENERAL_APPLICATION_CONTEXT: ApplicationContext = {
  mode: "general",
  roleSlug: null,
  roleTitle: null,
};

export function CareersCta({ content }: { content: ClosingCtaContent }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [headingLead] = content.heading.split(content.headingHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[30px] pb-[90px]">
        <div className="relative flex flex-wrap items-center justify-between gap-7.5 overflow-hidden rounded-3xl border border-white/10 bg-[#0D1F2D] px-12 py-13.5">
          <div
            aria-hidden="true"
            className="absolute top-[-100px] right-[6%] h-[360px] w-[360px] rounded-full bg-[rgba(232,119,34,0.18)] blur-[110px]"
          />

          <div className="relative max-w-[620px]">
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {headingLead}
              <span className="bg-[linear-gradient(120deg,#F59E0B,#E87722)] bg-clip-text text-transparent">
                {content.headingHighlight}
              </span>
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-[1.6] tracking-[0] text-70">{content.copy}</p>
          </div>

          <Button variant="primary" size="hero" onClick={() => setIsDialogOpen(true)} className="relative gap-2.5 h-[56px] w-[224.052px]">
            {content.ctaLabel} <span className="text-[17px]">→</span>
          </Button>
        </div>
      </div>

      <ApplicationDialog
        isOpen={isDialogOpen}
        context={GENERAL_APPLICATION_CONTEXT}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
}
