import Button from "@/components/ui/Button";
import type { CtaBannerData } from "@/cms/api/home/cta-banner";

export default function FinalCta({ data }: { data: CtaBannerData }) {
  const { badgeLabel, title, subtitle, primaryCta, secondaryCta } = data;

  return (
    <section id="contact" className="relative scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-14 pb-25">
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-glass-4 px-10 py-20 max-tg-sm:py-10 text-center backdrop-blur-cta">
          <div
            aria-hidden="true"
            className="absolute bottom-[-120px] left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-overlay-orange-strong blur-glow-lg"
          />
          <div className="relative">
            <div className="leading-[normal] text-[12.5px] font-bold tracking-widest text-orange uppercase">{badgeLabel}</div>
            <h2 className="font-display mt-4 text-testimonial-stat tg-sm:text-[52px] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              {title}
            </h2>
            <p className="mx-auto mt-5.5 max-w-[600px] text-md tg-sm:text-lg-fixed leading-[1.6] text-secondary">{subtitle}</p>
            <div className="mt-9.5 flex flex-col items-center gap-5">
              <Button
                href={primaryCta.href}
                size="lg"
                className="!leading-[normal] !gap-[10px] !rounded-[13px] !px-[34px] !py-[15px] !text-[17px] !whitespace-normal hover:!shadow-btn-primary"
              >
                {primaryCta.label} <span aria-hidden="true" className="text-[18px]">&rarr;</span>
              </Button>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border-b border-border-orange-medium pb-[3px] text-14-5 font-semibold text-muted leading-[normal] transition-colors duration-200 hover:text-primary"
              >
                {secondaryCta.label}{" "}
                <span aria-hidden="true" className="text-orange">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
