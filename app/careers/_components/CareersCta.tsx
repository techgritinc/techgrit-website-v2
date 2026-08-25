"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { ApplicationDialog } from "./application-dialog";
import type { ApplicationContext } from "./application-dialog";
import type { ApplicationFormContent, ClosingCtaContent } from "@/cms/types/careers-types";

const GENERAL_APPLICATION_CONTEXT: ApplicationContext = {
  mode: "general",
  roleSlug: null,
  roleTitle: null,
};

export function CareersCta({
  content,
  applicationForm,
}: {
  content: ClosingCtaContent;
  applicationForm: ApplicationFormContent;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [headingLead] = content.heading.split(content.headingHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[30px] pb-[90px]">
        <div className="relative flex flex-wrap items-center justify-between gap-[30px] overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.04] px-[48px] py-[54px] backdrop-blur-[12px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[100px] right-[6%] h-[360px] w-[360px] rounded-full bg-overlay-orange-18 blur-[110px]"
          />

          <div className="relative max-w-[620px]">
            <h2 className="font-body text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {headingLead}
              <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">
                {content.headingHighlight}
              </span>
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-[1.6] tracking-[0] text-text-70">
              {content.copy}
            </p>
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="!h-[52px] !w-[226.594px] !gap-[10px] !rounded-[12px] !px-[30px] !py-[15px] !text-[18px]"
          >
            {content.ctaLabel} <span className="text-[17px] font-normal">&#8594;</span>
          </Button>
        </div>
      </div>

      <ApplicationDialog
        isOpen={isDialogOpen}
        context={GENERAL_APPLICATION_CONTEXT}
        content={applicationForm}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
}
