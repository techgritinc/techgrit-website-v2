import type { StatValue } from "@/cms/types/case-study-detail-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function MetricsStrip({ metrics }: { metrics: StatValue[] }) {
  return (
    <section>
      <div className="tg-container pt-[24px] pb-[var(--space-3)] px-[var(--space-15)]">
        <RevealOnScroll>
          <div
            className="grid grid-cols-4 gap-[18px] border-t border-b border-border-faint py-[30px]"
          >
            {metrics.map((metric) => (
              <div key={metric.order}>
                <div className="font-display text-[34px] font-bold text-teal-light leading-[normal]">
                  {metric.value}
                </div>
                <div className="mt-[4px] text-[13.5px] text-text-soft leading-[normal]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
