import Button from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { ClockIcon, LocationIcon } from "@/components/ui/icons";
import type { JobDetailHeader as JobDetailHeaderContent } from "../_data/types";

// Meta row follows MetricsStrip's own proportions/border treatment (components/ui/MetricsStrip.tsx)
// — a bordered row of equal columns — with each column's "big" element being an icon instead of a
// number, per this page's own header shape (icon on top, value text below).
function MetaItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-orange">{icon}</span>
      <div className="mt-[10px] text-[13.5px] text-text-soft leading-[normal]">{value}</div>
    </div>
  );
}

export function JobDetailHeader({ header }: { header: JobDetailHeaderContent }) {
  return (
    <header>
      <div className="tg-container px-[var(--space-15)] pt-[56px] pb-[24px]">
        <SectionEyebrow>{header.badgeLabel}</SectionEyebrow>
        <h1 className="text-[clamp(34px,4.4vw,52px)] leading-[1.05] tracking-[-0.035em]">{header.title}</h1>
        <Button href={header.ctaLink} variant="primary" size="md" className="mt-[26px]">
          {header.ctaLabel}
        </Button>
      </div>

      <div className="tg-container px-[var(--space-15)] pb-[var(--space-3)]">
        <div className="grid grid-cols-3 gap-[18px] border-t border-b border-border-faint py-[30px]">
          <MetaItem icon={<ClockIcon width="26" height="26" />} value={header.jobType} />
          <MetaItem icon={<LocationIcon width="26" height="26" />} value={header.location} />
          <MetaItem icon={<ClockIcon width="26" height="26" />} value={header.publishedDate} />
        </div>
      </div>
    </header>
  );
}
