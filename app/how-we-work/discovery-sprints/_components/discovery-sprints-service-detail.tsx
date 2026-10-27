import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { ServiceDetailSection } from "@/cms/types/discovery-sprints-types";

export function DiscoverySprintsServiceDetail({ section }: { section: ServiceDetailSection }) {
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
              <p className="mx-auto mt-3.5 max-w-[640px] whitespace-pre-line text-[16.5px] leading-[1.6] text-text-66">
                {section.subtitle}
              </p>
            )}
          </div>
          {section.steps.length > 0 && (
            <ProcessSteps
              steps={section.steps.map((step) => ({ order: step.order, title: step.title, description: step.subtitle }))}
              columns={section.steps.length}
            />
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
