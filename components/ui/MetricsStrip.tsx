import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export interface MetricItem {
  order: number;
  value: string;
  label: string;
}

/** Proof-metrics strip — value/label pairs in a bordered horizontal row. Originated on the
 * Case Study detail page; promoted here once Consumer Lending became a second consumer. */
export function MetricsStrip({ metrics }: { metrics: MetricItem[] }) {
  return (
    <section>
      <div className="tg-container pt-[24px] pb-[var(--space-3)] px-[var(--space-15)]">
        <RevealOnScroll>
          <div
            className="grid grid-cols-4 gap-[18px] border-t border-b border-border-faint py-[30px]"
          >
            {metrics.map((metric) => (
              <div key={metric.order}>
                <div className="font-display text-[34px] font-bold text-orange leading-[normal]">
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
