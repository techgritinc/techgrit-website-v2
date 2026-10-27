import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { ServiceDetailSection } from "@/cms/types/orbit-ai-ecosystem-types";

// The CMS ships no icons for this variant (PD-strategiesWeSupport) — a numbered
// ProcessSteps strip fits the data as given, rather than forcing an icon slot
// that has nothing to render.
export function OrbitAiUnderstanding({ section }: { section: ServiceDetailSection }) {
  const steps = section.steps.map((step, index) => ({
    order: index + 1,
    title: step.title,
    description: step.subtitle,
  }));

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
          <ProcessSteps steps={steps} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
