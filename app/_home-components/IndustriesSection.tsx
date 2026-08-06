import { Fragment } from "react";
import Button from "@/components/ui/Button";
import { GlassCard, GlassCardDescription, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import { INDUSTRY_CARDS, type IndustryCard } from "./home-data";

const HOVER_GLOW: Record<IndustryCard["id"], string> = {
  fintech: "hover:shadow-industry-glow-violet",
  healthcare: "hover:shadow-industry-glow-green",
  construction: "hover:shadow-industry-glow-blue",
};

export default function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-15 pb-25">
        <div className="flex flex-wrap items-end justify-between gap-7.5">
          <div>
            <h2 className="max-w-140 text-[44px] leading-[46.64px]">
              Building the Future of Industry Platforms
            </h2>
            <p className="mt-4 max-w-[540px] text-[17px] leading-[27.2px] text-muted">
              Our AI-first engineering approach helps organizations modernize infrastructure and unlock innovation
              across key industries.
            </p>
          </div>
          <Button href="/construction" variant="ghost" className="py-4! leading-[normal] text-[16px]">
            Explore Industry Solutions <span aria-hidden="true" className="text-orange text-[16px]">&rarr;</span>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {INDUSTRY_CARDS.map((industry) => {
            const Icon = industry.icon;
            const card = (
              <GlassCard
                variant="industry"
                hoverBorderColor=""
                className={HOVER_GLOW[industry.id]}
              >
                <GlassCardIcon variant="industry" wrapperClassName={industry.iconBg}>
                  <Icon className="text-white" />
                </GlassCardIcon>
                <GlassCardTitle variant="industry">{industry.title}</GlassCardTitle>
                <GlassCardDescription variant="industry">{industry.description}</GlassCardDescription>
              </GlassCard>
            );

            return industry.href ? (
              <a key={industry.id} href={industry.href}>
                {card}
              </a>
            ) : (
              <Fragment key={industry.id}>{card}</Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
