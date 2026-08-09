import type { Metric } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function MetricsStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <section>
      <div className="tg-container pt-[24px] pb-[var(--space-3)] px-[var(--space-15)]">
        <RevealOnScroll>
          <div
            className="grid grid-cols-4 gap-[18px] max-[560px]:grid-cols-2 border-t border-b border-border-faint py-[30px]"
          >
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-[34px] font-bold text-teal-light">
                  {metric.value}
                </div>
                <div className="mt-[4px] text-[13.5px] text-text-soft">
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
