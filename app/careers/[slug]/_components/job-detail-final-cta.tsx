import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import Button from "@/components/ui/Button";
import type { CtaBannerFields } from "@/cms/shared/reusable-sections";

// Mirrors app/insights/case-studies/_components/case-studies-final-cta.tsx's own left-text/
// right-button panel shape — this section is the same shared "page-reusable-sections.cta-banner"
// component (mapCtaBanner) already used by 8+ other pages, so no bespoke CMS shape here.
export function JobDetailFinalCta({ content }: { content: CtaBannerFields }) {
  const [before, after] = content.titleHighlight ? content.title.split(content.titleHighlight) : [content.title, ""];

  return (
    <section>
      <div className="tg-container pt-[90px] pb-[90px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div className="relative overflow-hidden flex flex-wrap items-center justify-between rounded-4xl bg-[var(--color-glass-faint)] border border-[var(--color-border)] backdrop-blur-[var(--blur-cta)] px-[48px] py-[54px] gap-[30px]">
            <div
              aria-hidden="true"
              className="absolute top-[-100px] right-[6%] w-[360px] h-[360px] rounded-full bg-overlay-orange-soft blur-[110px]"
            />
            <div className="relative max-w-[620px]">
              <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.08] tracking-[var(--ls-snug)]">
                {before}
                {content.titleHighlight ? <span className="text-gradient">{content.titleHighlight}</span> : null}
                {after}
              </h2>
              <p className="mt-[14px] text-[16.5px] leading-[var(--lh-relaxed)] text-text-quiet">
                {content.description}
              </p>
            </div>
            <Button
              href={content.primaryCtaLink}
              variant="primary"
              className="relative gap-[10px] text-[16px] !px-[30px] !py-[15px] !rounded-[12px] !min-h-[52px] whitespace-nowrap"
            >
              {content.primaryCtaLabel} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
