import Button from "@/components/ui/Button";
import type { ClosingCtaContent } from "@/cms/types/careers-types";

export function CareersCta({ content }: { content: ClosingCtaContent }) {
  const [headingLead] = content.heading.split(content.headingHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) pt-[32px] pb-[96px]">
        <div className="relative flex flex-wrap items-center justify-between gap-[32px] overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.04] px-[48px] py-[48px] backdrop-blur-[12px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[100px] right-[6%] h-[360px] w-[360px] rounded-full bg-overlay-orange-18 blur-[110px]"
          />

          <div className="relative max-w-[620px]">
            <h2 className="font-body text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {headingLead}
              <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">
                {content.headingHighlight}
              </span>
            </h2>
            <p className="mt-3.5 text-[16px] leading-[1.6] tracking-[0] text-text-70">
              {content.copy}
            </p>
          </div>

          <Button
            href={content.ctaLink ?? undefined}
            className="!h-[52px] !w-[226.594px] !gap-[8px] !rounded-[12px] !px-[32px] !py-[16px]"
          >
            {content.ctaLabel} <span className="text-[16px] font-normal">&#8594;</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
