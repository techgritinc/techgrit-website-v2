import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import type { EngineeringServicesSection } from "@/cms/shared/industry-sections";

// Shared Industries-page engineering-services row list — generalized verbatim from
// Healthcare's original component. Each row renders whichever icon the CMS supplies and no
// icon slot when it supplies none — no fallback/placeholder of any kind (including the CMS's
// own stepLabel), per Healthcare's own explicit "no fallback logic, ever" precedent. This is
// intentionally uniform even though FinTech's data has zero icons across all 7 rows.
export function IndustryServiceRows({ section }: { section: EngineeringServicesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-15 pb-15" data-reveal>
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div className="-mt-0.75">
            <SectionEyebrow showAccent={false} className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
            <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.1] tracking-[-0.03em]">{section.title}</h2>
          </div>
          <div className="border-t border-border-faint">
            {section.cards.map((card) => (
              <div key={card.order} className="flex gap-5.5 border-b border-border-faint py-6.5">
                <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[10px] bg-overlay-amber">
                  {card.icon ? (
                    <Image src={card.icon.url} alt={card.icon.alt || ""} width={18} height={18} />
                  ) : null}
                </span>
                <div>
                  <h3 className="leading-[normal] tracking-[normal] text-[19px]">{card.title}</h3>
                  <p className="mt-1.75 text-sm leading-[1.6] text-60">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
