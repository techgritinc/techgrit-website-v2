import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { splitHighlight } from "@/cms/utils/text";
import type { HeroData } from "@/cms/api/home/hero";

export default function Hero({ data }: { data: HeroData }) {
  const { badge, title, highlightTitle, subtitle, primaryBtn, secondaryBtn, stats } = data;
  const { before, highlight, after } = splitHighlight(title, highlightTitle);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-ink-deep">
        <video
          src="/assets/hero/wave.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-[64%_46%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.74)_30%,rgba(0,0,0,0.26)_56%,rgba(0,0,0,0)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      <div className="relative z-raised mx-auto flex min-h-[60vh] w-full max-w-(--container-max) items-center px-4 tg-sm:px-9 pt-27 pb-10 tg-sm:pb-15">
        <div className="max-w-195">
          {badge && (
            <a
              href={badge.href}
              className="group opacity-0 [animation-delay:0.02s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mb-4 inline-flex max-w-full items-center gap-2 tg-sm:gap-5 rounded-full border border-border-orange-strong bg-[image:var(--gradient-live-badge)] py-1.5 tg-sm:py-3 pr-3.5 tg-sm:pr-7.5 pl-1.5 tg-sm:pl-3 leading-[normal] shadow-[var(--shadow-live-badge)] backdrop-blur-10 transition-transform"
            >
              <Badge tone="live" size="lg" className="shrink-0 max-tg-sm:gap-1.5 max-tg-sm:px-3 max-tg-sm:py-1.5 max-tg-sm:text-[10.5px]">
                <span className="relative inline-flex h-2.75 w-2.75 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-green shadow-[var(--shadow-glow-green)]" />
                  <span
                    aria-hidden="true"
                    className="absolute -inset-0.75 rounded-full border-2 border-border-green-85 animate-[tgLiveRipple_1.8s_cubic-bezier(0.2,0.7,0.2,1)_infinite] motion-reduce:animate-none"
                  />
                </span>
                {badge.label}
              </Badge>
              <span className="text-xs tg-sm:text-base tracking-[-0.085px] font-semibold text-bright leading-tight">{badge.text}</span>
              <span aria-hidden="true" className="shrink-0 text-18 tg-sm:text-[20px] font-bold text-amber-light">
                &rarr;
              </span>
            </a>
          )}

          <h1 className="mt-5.5 opacity-0 [animation-delay:0.12s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100">
            {before.trimEnd()}
            <br className="hidden tg-sm:inline" />
            {" "}
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">{highlight}</span>
            <br className="hidden tg-sm:inline" />
            {" "}
            {after.trimStart()}
          </h1>

          <p className="opacity-0 [animation-delay:0.2s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-4 tg-sm:mt-6.5 max-w-135 text-[16px] tg-sm:text-[18.5px] leading-[1.65] text-secondary">
            {subtitle}
          </p>

          <div className="opacity-0 [animation-delay:0.28s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-9 flex flex-wrap items-center gap-4">
            <Button href={primaryBtn.href} size="hero" className="leading-[normal] !text-xs tg-sm:text-md">
              {primaryBtn.label} <span aria-hidden="true" className="text-[17px]">&rarr;</span>
            </Button>
            <Button href={secondaryBtn.href} variant="ghost" size="hero" className="px-6.5 leading-[normal] !text-xs tg-sm:text-md">
              {secondaryBtn.label} <span aria-hidden="true" className="text-[17px] text-orange">&rarr;</span>
            </Button>
          </div>

          <div className="opacity-0 [animation-delay:0.36s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-11.5 flex items-stretch gap-2.5 tg-sm:gap-8.5">
            {stats.map((stat, i) => (
              <div key={stat.id} className={i > 0 ? "border-l border-border-strong pl-2.5 tg-sm:pl-8.5" : undefined}>
                <div
                  className={[
                    "font-display inline-flex items-baseline text-[20px] tg-sm:text-stat-count leading-[normal] font-bold tracking-stat-count text-primary",
                    i < 3 ? "gap-0.5" : "gap-2",
                  ].join(" ")}
                >
                  <span>{stat.count !== undefined ? <AnimatedStat target={stat.count} /> : stat.staticValue}</span>
                  {stat.suffix && (
                    <span className={stat.suffixClassName?.replace("text-stat", "text-[12px] tg-sm:text-stat")}>
                      {stat.suffix}
                    </span>
                  )}
                  {stat.postSuffix && (
                    <span className={stat.postSuffixClassName?.replace("text-stat", "text-[12px] tg-sm:text-stat")}>
                      {stat.postSuffix}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[8.5px] leading-tight tg-sm:text-12 font-bold tracking-stat text-dim uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
