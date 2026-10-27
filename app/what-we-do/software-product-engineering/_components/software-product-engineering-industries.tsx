import Image from "next/image";
import Link from "next/link";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { IndustryCard, IndustriesSection } from "../_data/types";

function IndustryTile({ industry }: { industry: IndustryCard }) {
  const card = (
    <GlassCard variant="serviceCapability">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
        {industry.icon && <Image src={industry.icon.url} alt={industry.icon.alternativeText} width={20} height={20} />}
      </span>
      <GlassCardTitle variant="serviceCapability">{industry.name}</GlassCardTitle>
      <GlassCardDescription variant="serviceCapability">{industry.description}</GlassCardDescription>
    </GlassCard>
  );

  // The CMS doesn't currently supply a destination for every industry card — render
  // a plain (non-clickable) tile when absent rather than guessing a route.
  return industry.href ? (
    <Link href={industry.href} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}

export function SoftwareProductEngineeringIndustries({ section }: { section: IndustriesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(26px,3vw,34px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {section.industries.map((industry) => (
              <IndustryTile key={industry.order} industry={industry} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
