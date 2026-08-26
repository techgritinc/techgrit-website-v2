import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import Button from "@/components/ui/Button";

// No fallback content lives here — every field is required and comes from the caller.
// The CMS-driven list page passes the real cta-banner section; the still-static detail
// page (app/insights/case-studies/[slug]/page.tsx) passes its own literal placeholder copy until
// that page is migrated too. Either way, this component holds no content of its own.
export function CaseStudiesFinalCta({
  title,
  titleHighlight,
  description,
  ctaLabel,
  ctaLink,
}: {
  title: string;
  titleHighlight: string | null;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}) {
  const [before, after] = titleHighlight ? title.split(titleHighlight) : [title, ""];

  return (
    <section>
      <div className="tg-container pt-[20px] pb-[90px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden flex flex-wrap items-center justify-between rounded-4xl bg-[var(--color-glass-faint)] border border-[var(--color-border)] backdrop-blur-[var(--blur-cta)] px-[48px] py-[54px] gap-[30px]"
          >
            <div
              aria-hidden="true"
              className="absolute top-[-100px] right-[6%] w-[360px] h-[360px] rounded-full bg-overlay-orange-soft blur-[110px]"
            />
            <div className="relative max-w-[620px]">
              <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.08] tracking-[var(--ls-snug)]">
                {before}
                {titleHighlight ? <span className="text-gradient">{titleHighlight}</span> : null}
                {after}
              </h2>
              <p className="mt-[14px] text-[16.5px] leading-[var(--lh-relaxed)] text-text-quiet">
                {description}
              </p>
            </div>
            <Button
              href={ctaLink}
              variant="primary"
              className="relative gap-[10px] text-[16px] !px-[30px] !py-[15px] !rounded-[12px] !min-h-[52px] whitespace-nowrap"
            >
              {ctaLabel} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
