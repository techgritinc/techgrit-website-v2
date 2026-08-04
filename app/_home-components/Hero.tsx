import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { DELIVERY_STATS } from "./home-data";

export default function Hero() {
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

      <div className="relative z-raised mx-auto flex min-h-[60vh] w-full max-w-(--container-max) items-center px-9 pt-27 pb-15">
        <div className="max-w-195">
          <a
            href="/webinar"
            className="group opacity-0 [animation-delay:0.02s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mb-4 inline-flex items-center gap-5 rounded-full border border-border-orange-strong bg-[image:var(--gradient-live-badge)] py-[12px] pr-[30px] pl-[12px] leading-[normal] shadow-[var(--shadow-live-badge)] backdrop-blur-10 transition-transform"
          >
            <Badge tone="live" size="lg">
              <span className="relative inline-flex h-[11px] w-[11px] shrink-0">
                <span className="absolute inset-0 rounded-full bg-green shadow-[var(--shadow-glow-green)]" />
                <span
                  aria-hidden="true"
                  className="absolute -inset-[3px] rounded-full border-2 border-border-green-85 animate-[tgLiveRipple_1.8s_cubic-bezier(0.2,0.7,0.2,1)_infinite] motion-reduce:animate-none"
                />
              </span>
              Live Webinar
            </Badge>
            <span className="text-[17px] tracking-[-0.085px] font-semibold text-bright">Orchestrating the AI-First SDLC</span>
            <span aria-hidden="true" className="shrink-0 text-[20px] font-bold leading- text-amber-light">
              &rarr;
            </span>
          </a>

          <h1 className="mt-[22px] opacity-0 [animation-delay:0.12s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100">
            Software is no longer built.
            <br />
            It&apos;s <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">orchestrated.</span>
          </h1>

          <p className="opacity-0 [animation-delay:0.2s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-[26px] max-w-[540px] text-[18.5px] leading-[1.65] text-secondary">
            TechGrit is the AI-First Software Engine. We&rsquo;ve replaced manual SDLCs with OrbitAI, our agentic
            orchestration platform that takes you from a vision to industrial-grade production in weeks, not years.
          </p>

          <div className="opacity-0 [animation-delay:0.28s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" size="hero" className="leading-[normal]">
              Build Your AI-First Future <span aria-hidden="true" className="text-[17px]">&rarr;</span>
            </Button>
            <Button href="#methodology" variant="ghost" size="hero" className="px-[26px] leading-[normal]">
              View the OrbitAI&trade; Methodology <span aria-hidden="true" className="text-[17px] text-orange">&rarr;</span>
            </Button>
          </div>

          <div className="opacity-0 [animation-delay:0.36s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mt-[46px] flex items-stretch gap-[34px] max-tg-sm:gap-[18px]">
            {DELIVERY_STATS.map((stat, i) => (
              <div key={stat.id} className={i > 0 ? "border-l border-border-strong pl-[34px]" : undefined}>
                <div
                  className={[
                    "font-display inline-flex items-baseline text-stat-count leading-[normal] font-bold tracking-stat-count text-primary",
                    i === 0 ? "gap-[2px]" : "gap-2",
                  ].join(" ")}
                >
                  <span className={stat.gradient ? "bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent" : undefined}>
                    {stat.count !== undefined ? <AnimatedStat target={stat.count} /> : stat.staticValue}
                  </span>
                  {stat.suffix && <span className={stat.suffixClassName}>{stat.suffix}</span>}
                </div>
                <div className="mt-1 text-12 font-bold tracking-stat text-dim uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
