import Link from "next/link";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function CaseStudiesFinalCta({ variant = "list" }: { variant?: "list" | "detail" }) {
  return (
    <section>
      <div className="tg-container pt-[20px] pb-[90px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden flex flex-wrap items-center justify-between rounded-4xl bg-ink-mid border border-border-faint px-[48px] py-[54px] gap-[30px]"
          >
            <div
              aria-hidden="true"
              className="absolute top-[-100px] right-[6%] w-[360px] h-[360px] rounded-full bg-overlay-orange-soft blur-[110px]"
            />
            <div className="relative max-w-[620px]">
              <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.08] tracking-[var(--ls-snug)]">
                Step into an <span className="text-gradient">AI-first future.</span>
              </h2>
              <p className="mt-[14px] text-[16.5px] leading-[var(--lh-relaxed)] text-text-quiet">
                {variant === "detail"
                  ? "Explore how to leverage AI-driven insights and tools to gain a competitive edge and build a smarter tomorrow."
                  : "The era of artificial intelligence is here. Explore how to leverage AI-driven insights and tools to gain a competitive edge and build a smarter tomorrow."}
              </p>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary btn-lg relative gap-[10px] text-[16px] px-[30px] py-[16px] rounded-[12px] whitespace-nowrap"
            >
              Get in Touch <span aria-hidden="true" className="text-[17px]">&#8594;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
