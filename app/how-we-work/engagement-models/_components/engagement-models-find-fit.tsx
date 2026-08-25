import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { FindFitSection } from "@/cms/types/engagement-models-types";

// "Not Sure Which Model Fits Your Needs?" — a new CMS component
// (`about-us.audience-insight`) with no existing renderer elsewhere in the
// codebase. One card with a single left accent border on the whole block;
// two divs side by side ("Your Goal", "Recommended Model") separated by one
// vertical divider (no per-row horizontal lines); both sides render their
// points with the same highlighted (bold white) text and a bullet marker.
// On small devices the two divs simply stack — the full "Your Goal" list,
// then the full "Recommended Model" list below it — not interleaved by row.
export function EngagementModelsFindFit({ section }: { section: FindFitSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1000px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            {section.eyebrow && (
              <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
                {section.eyebrow}
              </div>
            )}
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <div className="rounded-2xl border border-border-8 border-l-[3px] border-l-orange bg-glass-3 px-tg-11 py-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-0">
              <div className="sm:pr-9">
                <div className="mb-4 text-[17px] font-extrabold uppercase tracking-[0.14em] text-text-55">
                  {section.goalColumn.label}
                </div>
                <ul className="flex flex-col gap-4">
                  {section.goalColumn.rows.map((row) => (
                    <li key={row.id} className="flex items-center gap-3">
                      {row.icon ? (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center text-orange">
                          <Image src={row.icon.url} alt={row.icon.alternativeText} width={16} height={16} />
                        </span>
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      )}
                      <span className="text-[14.5px] font-semibold leading-[1.4] text-white">{row.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:border-l sm:border-border-8 sm:pl-9">
                <div className="mb-4 text-[17px] font-extrabold uppercase tracking-[0.14em] text-text-55">
                  {section.modelColumn.label}
                </div>
                <ul className="flex flex-col gap-4">
                  {section.modelColumn.rows.map((row) => (
                    <li key={row.id} className="flex items-center gap-3">
                      {row.icon ? (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center text-orange">
                          <Image src={row.icon.url} alt={row.icon.alternativeText} width={16} height={16} />
                        </span>
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      )}
                      <span className="text-[14.5px] font-semibold leading-[1.4] text-white">{row.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
