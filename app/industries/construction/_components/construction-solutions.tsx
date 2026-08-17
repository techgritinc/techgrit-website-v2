import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { SolutionsSection } from "@/cms/types/construction";

export function ConstructionSolutions({ section }: { section: SolutionsSection }) {
  return (
    <section id="solutions" className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[50px] pb-[30px]" data-reveal>
        <div className="mb-[40px] max-w-[760px] mt-[-9px]">
          <SectionEyebrow tone="amber" className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
          <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[22px]">
          {section.solutions.map((solution) => (
            <GlassCard
              key={solution.order}
              variant="constructionSolution"
              hoverBorderColor=""
            >
              {solution.icon ? (
                <GlassCardIcon
                  variant="constructionSolution"
                  wrapperClassName="border"
                  style={{
                    background:
                      "linear-gradient(140deg, color-mix(in srgb, var(--color-amber) 22%, transparent), color-mix(in srgb, var(--color-orange) 10%, transparent))",
                    borderColor: "color-mix(in srgb, var(--color-amber) 30%, transparent)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small CMS-hosted SVG, no next/image benefit */}
                  <img src={solution.icon.url} alt={solution.icon.alt} width={20} height={20} />
                </GlassCardIcon>
              ) : null}
              <GlassCardTitle className="leading-[normal] tracking-[normal]" variant="constructionSolution">{solution.title}</GlassCardTitle>
              <GlassCardDescription variant="constructionSolution">{solution.description}</GlassCardDescription>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
