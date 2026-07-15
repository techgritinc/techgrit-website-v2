import { LightningIcon, PlayIcon } from "@/components/ui/icons";
import { COMPARISON_METRICS, DIFFERENTIATORS } from "./home-data";

export default function ReImagineSection() {
  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-15 pb-25">
        <div className="text-center">
          <h2 className="inline-flex flex-wrap items-center justify-center gap-5 text-[48px] leading-[1.06]">
            <span className="text-primary">Don&rsquo;t Migrate.</span>
            <PlayIcon width={40} height={40} className="text-orange drop-shadow-[0_0_14px_rgba(232,119,34,0.6)]" />
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">Re-Imagine.</span>
          </h2>
          <p className="mx-auto mt-4.5 max-w-[680px] text-[17.5px] leading-[1.6] text-muted">
            Lifting and shifting legacy code is a path to obsolescence. The AI era demands a clean slate, orchestrated
            by intelligent agents that build natively for modern scale.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[20px] border border-border bg-[rgba(255,255,255,0.04)] p-8 backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-orange"
              >
                <div className="mb-5.5 flex h-13 w-13 items-center justify-center rounded-md bg-[rgba(232,119,34,0.15)]">
                  <Icon width={24} height={24} className="text-orange" />
                </div>
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.6] text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-[0.8fr_1.2fr] items-center gap-12 rounded-[20px] border border-border bg-[rgba(255,255,255,0.04)] p-10 backdrop-blur-md max-tg-md:grid-cols-1">
          <div className="flex items-start gap-4.5">
            <div className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-md bg-[rgba(232,119,34,0.15)]">
              <LightningIcon className="text-orange" />
            </div>
            <div>
              <h3 className="text-[22px]">Why AI-First Matters</h3>
              <p className="mt-2 text-sm leading-[1.55] text-muted">
                We don&rsquo;t &ldquo;add&rdquo; AI to our process. We built our process around the capabilities of
                LLMs and autonomous agents.
              </p>
            </div>
          </div>
          <div>
            {COMPARISON_METRICS.map((metric, index) => (
              <div key={metric.label} className={index > 0 ? "" : "mb-6"}>
                <div
                  className={`mb-2.5 flex justify-between text-sm font-bold ${index === 0 ? "text-muted font-normal" : "text-orange"}`}
                >
                  <span>{metric.label}</span>
                  <span>{metric.displayValue}</span>
                </div>
                <div className="h-3.5 rounded-full bg-[rgba(255,255,255,0.1)]">
                  <div
                    className={`h-full rounded-full ${index === 0 ? "bg-[rgba(255,255,255,0.22)]" : "bg-[linear-gradient(90deg,var(--color-amber),var(--color-orange))] shadow-[0_0_18px_rgba(232,119,34,0.6)]"}`}
                    style={{ width: `${metric.barPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
