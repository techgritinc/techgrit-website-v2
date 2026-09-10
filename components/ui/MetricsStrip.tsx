import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export interface MetricItem {
  order: number;
  value: string;
  label: string;
}

export function MetricsGrid({
  metrics,
  align = "left",
}: {
  metrics: MetricItem[];
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <RevealOnScroll>
      <div
        className={`grid gap-[18px] border-t border-b border-border-faint py-[30px] ${centered ? "text-center" : ""}`}
        style={{ gridTemplateColumns: `repeat(${Math.max(metrics.length, 1)}, minmax(0, 1fr))` }}
      >
        {metrics.map((metric) => (
          <div key={metric.order}>
            <div className="font-display text-[34px] font-bold text-orange leading-[normal]">
              {metric.value}
            </div>
            <div className="mt-[4px] text-[13.5px] text-text-soft leading-[normal]">{metric.label}</div>
          </div>
        ))}
      </div>
    </RevealOnScroll>
  );
}

export function MetricsStrip({
  metrics,
  align = "left",
}: {
  metrics: MetricItem[];
  align?: "left" | "center";
}) {
  return (
    <section>
      <div className="tg-container pt-[24px] pb-[var(--space-3)] px-[var(--space-15)]">
        <MetricsGrid metrics={metrics} align={align} />
      </div>
    </section>
  );
}
