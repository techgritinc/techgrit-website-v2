import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import type { SolutionsWeSupportSection } from "@/cms/types/healthcare";

export function HealthcareSolutionsWeSupport({ section }: { section: SolutionsWeSupportSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-15" data-reveal>
        <div className="mx-auto mb-11 max-w-[700px] text-center">
          <SectionEyebrow showAccent={false} className="justify-center leading-[normal]">
            {section.eyebrow}
          </SectionEyebrow>
          <h2 className="text-[clamp(30px,3.4vw,40px)] leading-[1.08] tracking-[-0.03em] font-bold text-white">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="mx-auto mt-4 text-[17px] leading-[1.65] tracking-normal text-[var(--color-text-66)]">
              {section.subtitle}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {section.tiles.map((tile) => (
            <div
              key={tile.order}
              className="flex items-start gap-3 rounded-xl border border-border-8 bg-glass-3 px-5 py-4 transition-colors duration-300 hover:border-[var(--color-border-orange-medium)] hover:bg-glass-4"
            >
              <span className="status-dot status-orange mt-[7px]" />
              <h3 className="text-[15px] leading-[1.35] tracking-normal font-bold text-white">{tile.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
