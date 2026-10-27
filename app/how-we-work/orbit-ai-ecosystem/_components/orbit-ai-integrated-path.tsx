import { ResultCard } from "@/components/ui/ResultCard";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { IntegratedPathSection } from "@/cms/types/orbit-ai-ecosystem-types";

export function OrbitAiIntegratedPath({ section }: { section: IntegratedPathSection }) {
  const steps = section.features.map((feature, index) => ({
    order: index + 1,
    title: feature.title,
    description: feature.subtitle,
  }));

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[16.5px] leading-[1.6] text-text-66">
              {section.subtitle}
            </p>
          </div>
          <ProcessSteps steps={steps} />
          {section.resultLabel && section.resultText && (
            <ResultCard label={section.resultLabel} description={section.resultText} />
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
