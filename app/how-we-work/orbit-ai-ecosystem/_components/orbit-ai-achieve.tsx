import Image from "next/image";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { ServiceDetailSection } from "@/cms/types/orbit-ai-ecosystem-types";

export function OrbitAiAchieve({ section }: { section: ServiceDetailSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-10 text-center">
            {section.serviceLabel && (
              <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
                {section.serviceLabel}
              </div>
            )}
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mx-auto mt-3.5 max-w-[640px] text-[16.5px] leading-[1.6] text-text-66">
                {section.subtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.steps.map((step) => (
              <GlassCard key={step.id} variant="reimagineWhy">
                <span className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
                  {step.icon && <Image src={step.icon.url} alt={step.icon.alternativeText} width={20} height={20} />}
                </span>
                <GlassCardTitle variant="reimagineWhy">{step.title}</GlassCardTitle>
                <GlassCardDescription variant="reimagineWhy">{step.subtitle}</GlassCardDescription>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
