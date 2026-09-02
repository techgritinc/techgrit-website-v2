import { Fragment } from "react";
import Image from "next/image";
import { GlassCard, GlassCardDescription, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import type { FutureIndustryData } from "@/cms/api/home/future-industry";

const ICON_BG: Record<string, string> = {
  fintech: "bg-avatar-violet",
  healthcare: "bg-avatar-green",
  construction: "bg-avatar-blue",
};

const HOVER_GLOW: Record<string, string> = {
  fintech: "hover:shadow-industry-glow-violet",
  healthcare: "hover:shadow-industry-glow-green",
  construction: "hover:shadow-industry-glow-blue",
};

export default function IndustriesSection({ data }: { data: FutureIndustryData }) {
  const { title, subtitle, industries } = data;

  return (
    <section id="industries" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 py-20">
        <div className="flex flex-wrap items-end justify-between gap-7.5">
          <div>
            <h2 className="max-w-140 text-[44px] leading-[46.64px]">{title}</h2>
            <p className="mt-4 max-w-[540px] text-[17px] leading-[27.2px] text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-6 max-tg-sm:grid-cols-1 tg-sm:max-tg-lg:grid-cols-2">
          {industries.map((industry, index) => {
            const isOrphan = index === industries.length - 1 && industries.length % 2 !== 0;
            const tabletCenterClass = isOrphan
              ? "tg-sm:max-tg-lg:col-span-2 tg-sm:max-tg-lg:justify-self-center tg-sm:max-tg-lg:w-[calc(50%-12px)]"
              : "";
            const card = (
              <GlassCard
                variant="industry"
                hoverBorderColor=""
                className={HOVER_GLOW[industry.slug] ?? "hover:shadow-industry-glow-violet"}
              >
                <GlassCardIcon variant="industry" wrapperClassName={ICON_BG[industry.slug] ?? "bg-avatar-violet"}>
                  {industry.icon && <Image src={industry.icon.url} alt={industry.icon.alt} width={24} height={24} />}
                </GlassCardIcon>
                <GlassCardTitle variant="industry">{industry.title}</GlassCardTitle>
                <GlassCardDescription variant="industry">{industry.description}</GlassCardDescription>
              </GlassCard>
            );

            return industry.href ? (
              <a key={industry.id} href={industry.href} className={tabletCenterClass}>
                {card}
              </a>
            ) : (
              <Fragment key={industry.id}>
                {tabletCenterClass ? <div className={tabletCenterClass}>{card}</div> : card}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
