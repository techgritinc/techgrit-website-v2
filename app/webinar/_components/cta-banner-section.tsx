import Button from "@/components/ui/Button";
import type { CtaBannerContent } from "../_data/types";

export function CtaBannerSection({ content }: { content: CtaBannerContent }) {
  const [before, after] = content.headingHighlight
    ? content.heading.split(content.headingHighlight)
    : [content.heading, ""];

  return (
    <section className="relative">
      <div className="tg-container !px-9" style={{ paddingTop: 30, paddingBottom: 90 }}>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-glass-4 px-10 py-20 max-tg-sm:py-10 text-center backdrop-blur-cta">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[120px] left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-overlay-orange-strong blur-glow-lg"
          />
          <div className="relative">
            {content.badgeLabel && (
              <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase leading-[normal]">
                {content.badgeLabel}
              </div>
            )}
            <h2 className="font-display mt-4 text-testimonial-stat tg-sm:text-[52px] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              {before}
              {content.headingHighlight && <span className="text-gradient">{content.headingHighlight}</span>}
              {after}
            </h2>
            <p className="mx-auto mt-5.5 max-w-[600px] text-md tg-sm:text-lg-fixed leading-[1.6] text-secondary">
              {content.subtitle}
            </p>
            <div className="mt-9.5 flex flex-col items-center gap-5">
              <Button
                href={content.ctaHref}
                size="lg"
                className="!leading-[normal] !gap-[10px] !rounded-[13px] !px-[34px] !py-[15px] !text-[17px] !whitespace-normal hover:!shadow-btn-primary"
              >
                {content.ctaLabel}{" "}
                <span aria-hidden="true" className="text-[18px]">
                  &rarr;
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
