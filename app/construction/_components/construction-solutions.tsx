import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { SolutionsSection } from "../_data/types";

const SOLUTION_ICON_PATHS: Record<number, React.ReactNode> = {
  1: (
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>
  ),
  2: (
    <>
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  3: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </>
  ),
  4: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  5: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </>
  ),
  6: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
};

function SolutionIcon({ order }: { order: number }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-amber-light)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SOLUTION_ICON_PATHS[order]}
    </svg>
  );
}

export function ConstructionSolutions({ section }: { section: SolutionsSection }) {
  return (
    <section id="solutions" className="">
      <div className="tg-container">
        <div className="mb-[40px] max-w-[760px]">
          <SectionEyebrow tone="amber">{section.eyebrow}</SectionEyebrow>
          <h2 className="leading-[1.08]" style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[22px]">
          {section.solutions.map((solution) => (
            <GlassCard
              key={solution.order}
              variant="constructionSolution"
              hoverBorderColor=""
            >
              <GlassCardIcon
                variant="constructionSolution"
                wrapperClassName="border"
                style={{
                  background:
                    "linear-gradient(140deg, color-mix(in srgb, var(--color-amber) 22%, transparent), color-mix(in srgb, var(--color-orange) 10%, transparent))",
                  borderColor: "color-mix(in srgb, var(--color-amber) 30%, transparent)",
                }}
              >
                <SolutionIcon order={solution.order} />
              </GlassCardIcon>
              <GlassCardTitle className="leading-[normal] tracking-[normal]" variant="constructionSolution">{solution.title}</GlassCardTitle>
              <GlassCardDescription variant="constructionSolution">{solution.description}</GlassCardDescription>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
