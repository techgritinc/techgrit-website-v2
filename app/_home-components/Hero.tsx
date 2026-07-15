import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import MediaSlot from "@/components/ui/MediaSlot";
import { ChevronIcon } from "@/components/ui/icons";
import { DELIVERY_STATS, TRUSTED_CLIENT_LOGOS } from "./home-data";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-ink-deep">
        <video
          src="/assets/hero/wave.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,13,0.95)_0%,rgba(5,8,13,0.74)_30%,rgba(5,8,13,0.26)_56%,rgba(5,8,13,0)_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,13,0.5)_0%,rgba(5,8,13,0)_20%,rgba(5,8,13,0)_60%,rgba(8,17,26,0.92)_100%)]" />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[60vh] w-full max-w-(--container-max) items-center px-9 pt-24 pb-10">
        <div className="max-w-[700px]">
          <a
            href="https://www.youtube.com/@TechGritInc"
            className="mb-4 inline-flex items-center gap-[11px] rounded-full border border-border-orange bg-glass py-[7px] pr-4 pl-[7px] backdrop-blur-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-orange"
          >
            <Badge tone="orange">Live Webinar</Badge>
            <span className="text-[13.5px] font-semibold text-secondary">Orchestrating the AI-First SDLC</span>
            <span aria-hidden="true" className="text-sm text-amber-light">
              &rarr;
            </span>
          </a>

          <div className="mb-7 ml-3.5 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-glass px-4 py-2 backdrop-blur-sm">
            <span
              className="h-2 w-2 animate-[tgblink_2s_ease-in-out_infinite] rounded-full bg-green shadow-[0_0_12px_2px_rgba(52,211,153,0.85)] motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-bold tracking-wide text-primary uppercase">
              AI-First Software Development Partner
            </span>
          </div>

          <h1 className="leading-[0.99]">
            Software is no longer built.
            <br />
            It&rsquo;s{" "}
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">orchestrated.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-lg leading-[1.65] text-secondary">
            TechGrit is the AI-First Software Engine. We&rsquo;ve replaced manual SDLCs with OrbitAI, our agentic
            orchestration platform that takes you from a vision to industrial-grade production in weeks, not years.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Build Your AI-First Future <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href="#methodology" variant="ghost" size="lg">
              View the OrbitAI&trade; Methodology <span aria-hidden="true" className="text-orange">&rarr;</span>
            </Button>
          </div>

          <div className="mt-11 flex items-stretch gap-8">
            {DELIVERY_STATS.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "border-l border-border-subtle pl-8" : undefined}>
                <div className="font-display text-[36px] font-bold tracking-[-0.03em] text-primary">{stat.value}</div>
                <div className="mt-1 text-xs font-bold tracking-widest text-ghost uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#platform"
        className="relative z-[1] mx-auto mt-1.5 flex flex-col items-center gap-1.5 text-[10.5px] font-bold tracking-[0.22em] text-muted uppercase"
      >
        <span>Scroll</span>
        <ChevronIcon width={20} height={20} />
      </a>

      <div className="relative z-[1] mx-auto max-w-[1180px] px-9 py-9">
        <div className="border-t border-border-subtle pt-8">
          <div className="text-center text-xs font-bold tracking-[0.2em] text-ghost uppercase">Trusted by our clients</div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {TRUSTED_CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="flex h-[74px] items-center justify-center rounded-lg bg-white px-4 shadow-card transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-card-hover"
              >
                <MediaSlot src={logo.src} alt={logo.alt} width={120} height={40} className="h-7 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
