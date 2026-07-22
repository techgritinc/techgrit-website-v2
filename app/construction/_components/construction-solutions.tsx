import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import type { SolutionsSection } from "../_data/types";

const SOLUTION_ICON_PATHS: Record<number, React.ReactNode> = {
  1: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  2: (
    <>
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-4 4" />
    </>
  ),
  3: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="18" x2="15" y2="18" />
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
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  6: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
};

function SolutionIcon({ order }: { order: number }) {
  return (
    <svg
      width="20"
      height="20"
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
    <section id="solutions" className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow tone="amber">{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {section.solutions.map((solution) => (
              <div key={solution.order} className="card" style={{ padding: "30px 26px" }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-lg)",
                    background: "rgba(247, 183, 51, 0.14)",
                  }}
                >
                  <SolutionIcon order={solution.order} />
                </div>
                <h3 className="mt-4" style={{ fontSize: "18px" }}>{solution.title}</h3>
                <p className="mt-2" style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", lineHeight: 1.6 }}>
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
