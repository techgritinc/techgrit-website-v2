import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import type { ConnectedSystemsSection } from "@/cms/types/healthcare";

export function HealthcareConnectedSystems({ section }: { section: ConnectedSystemsSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-10 pb-15" data-reveal>
        <div className="rounded-[22px] border border-border-orange-18 bg-[image:linear-gradient(160deg,var(--color-overlay-orange-8),var(--color-glass-hairline))] p-9">
          <div className="mx-auto mb-8 max-w-[600px] text-center">
            <SectionEyebrow tone="amber" showAccent={false} className="leading-[normal]">
              {section.eyebrow}
            </SectionEyebrow>
            <h2 className="text-[clamp(24px,2.8vw,32px)] leading-[1.1] tracking-[-0.02em]">{section.title}</h2>
            <p className="mx-auto mt-3 max-w-[600px] text-base leading-[1.6] text-60">{section.description}</p>
          </div>
          <div className="flex flex-col gap-[18px]">
            {section.categories.map((category) => {
              const isStandards = category.name.toLowerCase().includes("standard");
              return (
                <div key={category.order} className="flex flex-wrap items-baseline gap-4">
                  <span className="min-w-[130px] shrink-0 text-[11px] font-extrabold uppercase leading-[normal] tracking-[0.14em] text-40">
                    {category.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={
                          isStandards
                            ? "rounded-pill border border-border-teal-light-30 bg-overlay-teal-light-12 px-3.5 py-1.5 text-[13px] leading-[normal] text-teal-light"
                            : "rounded-pill border border-border-faint bg-glass-4 px-3.5 py-1.5 text-[13px] leading-[normal] text-secondary"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
