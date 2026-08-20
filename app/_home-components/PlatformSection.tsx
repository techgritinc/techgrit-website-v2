import Image from "next/image";
import type { DeliveryEngineData } from "@/cms/api/home/delivery-engine";

const CAPABILITY_TONE = {
  blue: { iconBg: "bg-[rgba(2,132,199,0.16)]", iconColor: "text-blue-light" },
  teal: { iconBg: "bg-[rgba(15,118,110,0.2)]", iconColor: "text-teal-light" },
} as const;

const METRIC_COLORS = ["text-amber-light", "text-blue-light", "text-teal-light"];

export default function PlatformSection({ data }: { data: DeliveryEngineData }) {
  const { badgeLabel, title, subtitle, capabilities, dashboard } = data;

  return (
    <section id="platform" className="scroll-mt-(--nav-height)">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-[1fr_1.05fr] items-center gap-tg-20 px-9 py-[96px] max-tg-md:py-[76px] max-tg-sm:py-[56px] max-tg-md:grid-cols-1 max-tg-md:gap-tg-17">
        <div>
          <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase leading-[normal]">{badgeLabel}</div>
          <h2 className="mt-3 text-[46px] font-bold tracking-[var(--ls-snug)] text-white leading-[1.04]">{title}</h2>
          <p className="mt-5 max-w-110 text-[17.5px] leading-[1.65] text-muted">{subtitle}</p>

          <div className="mt-8.5 flex flex-col gap-5.5">
            {capabilities.map((capability) => {
              const tone = CAPABILITY_TONE[capability.tone];
              return (
                <div key={capability.title} className="flex items-start gap-3.5">
                  <div className={`flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-[11px] ${tone.iconBg}`}>
                    {capability.icon && (
                      <Image src={capability.icon.url} alt={capability.icon.alt} width={20} height={20} className={tone.iconColor} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[17px] tracking-normal leading-[normal] text-white">{capability.title}</h3>
                    <p className="mt-1.25 text-[14px] leading-[1.5] text-faint">{capability.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-y-[6%] -inset-x-[4%] z-0 bg-[radial-gradient(circle_at_62%_40%,rgba(232,119,34,0.22),transparent_64%)] blur-[34px]"
          />
          <div className="relative z-1 overflow-hidden rounded-xl border border-border bg-console-bg shadow-[var(--shadow-console-card)] backdrop-blur-lg">
            <div className="flex items-center gap-tg-2 border-b border-border-8 bg-glass-faint px-tg-7 py-tg-5">
              <span className="h-tg-3a w-tg-3a rounded-full bg-mac-red" />
              <span className="h-tg-3a w-tg-3a rounded-full bg-mac-yellow" />
              <span className="h-tg-3a w-tg-3a rounded-full bg-mac-green" />
              <span className="ml-2 text-2xs font-semibold text-text-60 leading-[normal]">{dashboard.title}</span>
              <span className="ml-auto inline-flex items-center gap-tg-1a rounded-full border border-green/35 bg-green/12 px-tg-3 py-tg-1 text-3xs font-bold tracking-08 text-green leading-[normal]">
                <span
                  className="h-tg-1a w-tg-1a animate-[tgblink_1.6s_ease-in-out_infinite] rounded-full bg-green motion-reduce:animate-none"
                  aria-hidden="true"
                />
                {dashboard.badgeLabel}
              </span>
            </div>

            <div className="grid grid-cols-[repeat(3,1fr)] gap-tg-4 p-tg-8 max-tg-sm:p-tg-5">
              {dashboard.metrics.map((stat, index) => (
                <div key={stat.id} className="rounded-card border border-border-8 bg-glass-4 p-tg-5">
                  <div className={`font-display text-stat font-bold leading-[normal] ${METRIC_COLORS[index % METRIC_COLORS.length]}`}>{stat.value}</div>
                  <div className="text-3xs font-bold tracking-08 text-dim uppercase leading-[normal] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="px-tg-8 pb-tg-1a">
              <div className="mb-tg-4 text-3xs font-bold tracking-label text-text-40 uppercase leading-[normal]">Agent Pipeline</div>
              {dashboard.pipeline.map((agent, index) => (
                <div key={agent.id} className={`${index === dashboard.pipeline.length - 1 ? 'mb-0.5' : 'mb-2'} flex items-center gap-tg-4`}>
                  <span className="h-tg-2 w-tg-2 shrink-0 rounded-full" style={{ background: agent.color }} />
                  <span className="w-tg-82 leading-[normal] shrink-0 text-2xs font-semibold text-nav-sub">{agent.label}</span>
                  <div className="relative h-tg-1a flex-1 overflow-hidden rounded-full bg-glass-8">
                    <div className="h-full rounded-full" style={{ width: `${agent.percent}%`, background: agent.color }} />
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[30%] animate-[tgshimmer_2.4s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] motion-reduce:animate-none"
                      style={{ animationDelay: agent.delay }}
                    />
                  </div>
                  <span className="w-tg-13 shrink-0 text-right text-xs-alt font-bold text-text-55">{agent.percent}%</span>
                </div>
              ))}
            </div>

            <div className="mt-tg-2 flex items-center justify-between border-t border-border-8 px-tg-8 py-tg-4a max-tg-sm:px-tg-3 max-tg-sm:py-tg-3">
              <span className="text-12 leading-[normal] text-dim max-tg-sm:text-[10.5px] max-tg-sm:tracking-tight">{dashboard.footerText}</span>
              <span className="text-12 leading-[normal] font-bold text-green max-tg-sm:text-[10.5px]">{dashboard.deadline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
