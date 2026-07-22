import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import MediaSlot from "@/components/ui/MediaSlot";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { ChevronIcon } from "@/components/ui/icons";
import { DELIVERY_STATS, TRUSTED_CLIENT_LOGOS } from "./home-data";

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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,0.95)_0%,rgba(5,8,13,0.74)_30%,rgba(5,8,13,0.26)_56%,rgba(5,8,13,0)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.5)_0%,rgba(5,8,13,0)_20%,rgba(5,8,13,0)_60%,rgba(8,17,26,0.92)_100%)]" />
      </div>

      <div className="relative z-raised mx-auto flex min-h-[60vh] w-full max-w-(--container-max) items-center px-9 pt-24 pb-10">
        <div className="max-w-[700px]">
          <a
            href="https://www.youtube.com/@TechGritInc"
            className="group opacity-0 [animation-delay:0.02s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mb-[18px] inline-flex items-center gap-[11px] rounded-full border border-border-orange bg-glass py-[7px] pr-4 pl-[7px] leading-[normal] backdrop-blur-sm transition-shadow hover:shadow-[0_14px_32px_-14px_rgba(232,119,34,0.65)]"
          >
            <Badge tone="orange">Live Webinar</Badge>
            <span className="text-[13.5px] font-semibold text-[rgba(255,255,255,0.9)]">Orchestrating the AI-First SDLC</span>
            <span aria-hidden="true" className="shrink-0 text-sm text-amber-light">
              &rarr;
            </span>
          </a>

          <div className="opacity-0 [animation-delay:0.05s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mb-7 ml-3.5 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-glass-strong px-4 py-2 leading-[normal] backdrop-blur-sm">
            <span
              className="h-2 w-2 shrink-0 animate-[tgblink_2s_ease-in-out_infinite] rounded-full bg-green shadow-[0_0_12px_2px_rgba(52,211,153,0.85)] motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-bold tracking-wide text-primary uppercase">
              AI-First Software Development Partner
            </span>
          </div>

          <h1 className="opacity-0 [animation-delay:0.12s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 leading-[0.99]">
            Software is no longer built.
            <br />
            It&rsquo;s{" "}
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">orchestrated.</span>
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
              <div key={stat.label} className={i > 0 ? "border-l border-border-strong pl-[34px]" : undefined}>
                <div
                  className={[
                    "font-display text-[36px] leading-[normal] font-bold tracking-[-0.03em]",
                    stat.gradient ? "bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent" : "text-primary",
                  ].join(" ")}
                >
                  {stat.count !== undefined ? (
                    <>
                      <AnimatedStat target={stat.count} />
                      {stat.suffix}
                    </>
                  ) : (
                    stat.staticValue
                  )}
                </div>
                <div className="mt-1 text-12 font-bold tracking-stat text-dim uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#platform"
        className="opacity-0 [animation-delay:0.6s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 relative z-raised mx-auto mt-1.5 flex flex-col items-center gap-[7px] text-[10.5px] font-bold tracking-[0.22em] text-dim uppercase"
      >
        <span>Scroll</span>
        <ChevronIcon width={20} height={20} className="animate-[tgbounce_1.8s_ease-in-out_infinite] motion-reduce:animate-none" />
      </a>

      <div className="relative z-raised mx-auto mt-[30px] max-w-[1180px] px-9 pb-9">
        <div className="border-t border-border-subtle pt-8">
          <div className="text-center text-12 font-bold tracking-[0.2em] text-ghost uppercase">Trusted by our clients</div>
          <div className="mt-7 flex items-center justify-center gap-3 max-tg-sm:justify-start max-tg-sm:overflow-x-auto max-tg-sm:[scrollbar-width:none] max-tg-sm:[&::-webkit-scrollbar]:hidden">
            {TRUSTED_CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="flex h-[74px] shrink-0 items-center justify-center rounded-lg bg-white px-4 shadow-[var(--shadow-card),0_0_0_1px_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[var(--shadow-card-hover),var(--shadow-orange-border)]"
              >
                <MediaSlot
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={logo.height}
                  style={{ height: logo.height, width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
