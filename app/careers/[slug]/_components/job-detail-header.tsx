"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { ApplicationDialog } from "../../_components/application-dialog";
import type { ApplicationFormContent } from "@/cms/types/careers-types";
import type { JobDetailHeaderContent } from "@/cms/types/job-detail-types";
import type { SectionIcon } from "@/cms/shared/reusable-sections";

// Meta row follows MetricsStrip's own proportions/border treatment (components/ui/MetricsStrip.tsx)
// — a bordered row of equal columns — with each column's "big" element being the CMS's own
// per-job icon image instead of a number.
function MetaItem({ icon, value }: { icon: SectionIcon | null; value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      {icon ? <Image src={icon.url} alt={icon.alt} width={30} height={30} className="text-orange" /> : null}
      <div className="mt-[10px] text-[13.5px] text-text-soft leading-[normal]">{value}</div>
    </div>
  );
}

export function JobDetailHeader({
  header,
  applicationForm,
  roleSlug,
}: {
  header: JobDetailHeaderContent;
  applicationForm: ApplicationFormContent;
  roleSlug: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header>
      <div className="tg-container px-[var(--space-15)] pt-[56px] pb-[24px]">
        <SectionEyebrow>{header.badgeLabel}</SectionEyebrow>
        <h1 className="text-[clamp(34px,4.4vw,52px)] leading-[1.05] tracking-[-0.035em]">{header.title}</h1>
        <Button variant="primary" size="md" className="mt-[26px]" onClick={() => setIsDialogOpen(true)}>
          {header.ctaLabel}
        </Button>
      </div>

      <div className="tg-container px-[var(--space-15)] pb-[var(--space-3)]">
        <div className="grid grid-cols-3 gap-[18px] border-t border-b border-border-faint py-[30px]">
          <MetaItem icon={header.jobTypeIcon} value={header.jobType} />
          <MetaItem icon={header.locationIcon} value={header.location} />
          <MetaItem icon={header.calendarIcon} value={`${header.publishedDateLabel}: ${header.publishedDate}`} />
        </div>
      </div>

      <ApplicationDialog
        isOpen={isDialogOpen}
        context={{ mode: "role", roleSlug, roleTitle: header.title }}
        content={applicationForm}
        onClose={() => setIsDialogOpen(false)}
      />
    </header>
  );
}
