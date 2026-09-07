import { ArrowRightIcon } from "@/components/ui/icons";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { FindFitSection } from "@/cms/types/engagement-models-types";

// "Not Sure Which Model Fits Your Needs?" — a new CMS component
// (`about-us.audience-insight`) with no existing renderer elsewhere in the
// codebase. One card with a single left accent border on the whole block.
// Rows pair by array index across both groups (see engagement-models.ts's
// own mapper comment), so each "Your Goal" row renders directly beside its
// matching "Recommended Model" row with an arrow between them — no vertical
// divider, no bullet/icon marker. On small devices each pair stacks
// (goal → arrow → model) rather than dumping every goal above every model.
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
            <div className="mb-5 hidden sm:grid sm:grid-cols-[1fr_28px_1fr] sm:gap-4">
              <div className="text-[15px] font-extrabold uppercase tracking-[0.14em] text-text-55">
                {section.goalColumn.label}
              </div>
              <div aria-hidden="true" />
              <div className="text-[15px] font-extrabold uppercase tracking-[0.14em] text-text-55">
                {section.modelColumn.label}
              </div>
            </div>
            <ul className="flex flex-col gap-6 sm:gap-4">
              {section.goalColumn.rows.map((row, index) => {
                const modelRow = section.modelColumn.rows[index];
                if (!modelRow) return null;
                return (
                  <li
                    key={row.id}
                    className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_28px_1fr] sm:gap-4"
                  >
                    <span className="text-[14.5px] font-semibold leading-[1.4] text-white">{row.text}</span>
                    <ArrowRightIcon className="h-4 w-4 shrink-0 rotate-90 text-orange sm:rotate-0" />
                    <span className="text-[14.5px] font-semibold leading-[1.4] text-white">{modelRow.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
