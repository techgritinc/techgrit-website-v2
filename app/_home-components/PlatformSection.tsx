import { PLATFORM_CAPABILITIES } from "./home-data";

const PIPELINE_AGENTS = [
  { label: "UI Agent", percent: 94, color: "var(--color-blue)" },
  { label: "Logic Agent", percent: 81, color: "var(--color-blue)" },
  { label: "Data Agent", percent: 88, color: "var(--color-teal)" },
  { label: "QA Agent", percent: 67, color: "var(--color-amber)" },
  { label: "CI/CD Agent", percent: 97, color: "var(--color-orange)" },
];

export default function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-(--nav-height)">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.05fr] items-center gap-14 px-9 py-[108px] max-tg-md:grid-cols-1">
        <div>
          <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase">Meet OrbitAI&trade;</div>
          <h2 className="mt-4 max-w-[560px] text-[46px] leading-[1.04]">Our AI-First Delivery Platform.</h2>
          <p className="mt-5 max-w-[440px] text-[17.5px] leading-[1.65] text-muted">
            Competitors sell hours. We sell outcomes, powered by OrbitAI, our orchestration layer that automates the
            grind so our engineers focus on strategy, architecture, and innovation.
          </p>

          <div className="mt-8 flex flex-col gap-[22px]">
            {PLATFORM_CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="flex items-start gap-3.5">
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md bg-[rgba(2,132,199,0.16)]">
                    <Icon width={20} height={20} className="text-blue-light" />
                  </div>
                  <div>
                    <h3 className="text-[17px]">{capability.title}</h3>
                    <p className="mt-1.5 text-sm leading-[1.5] text-faint">{capability.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border bg-[rgba(13,24,33,0.72)] backdrop-blur-lg">
          <div className="flex items-center gap-2 border-b border-border-subtle bg-[rgba(255,255,255,0.03)] px-[18px] py-3.5">
            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[12.5px] font-semibold text-muted">OrbitAI Console</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.12)] px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-green">
              <span
                className="h-1.5 w-1.5 animate-[tgblink_1.6s_ease-in-out_infinite] rounded-full bg-green motion-reduce:animate-none"
                aria-hidden="true"
              />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 p-5">
            {[
              { value: "10x", label: "Throughput", color: "text-[#F7B733]" },
              { value: "98%", label: "Coverage", color: "text-blue-light" },
              { value: "6 wk", label: "Cycle", color: "text-teal-light" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-md border border-border bg-[rgba(255,255,255,0.04)] p-3.5">
                <div className={`font-display text-[26px] font-bold ${stat.color}`}>{stat.value}</div>
                <div className="mt-1 text-[10.5px] font-bold tracking-wide text-faint uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-1.5">
            <div className="mb-3 text-[10.5px] font-bold tracking-wide text-muted uppercase">Agent Pipeline</div>
            {PIPELINE_AGENTS.map((agent) => (
              <div key={agent.label} className="mb-[11px] flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: agent.color }} />
                <span className="w-[82px] shrink-0 text-[12.5px] font-semibold text-primary">{agent.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                  <div className="h-full rounded-full" style={{ width: `${agent.percent}%`, background: agent.color }} />
                </div>
                <span className="w-[30px] shrink-0 text-right text-[11.5px] font-bold text-muted">{agent.percent}%</span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-border-subtle px-5 py-3.5">
            <span className="text-xs text-muted">Prompt &rarr; Production &middot; 0 handoffs</span>
            <span className="text-xs font-bold text-green">Shipping in 6 weeks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
