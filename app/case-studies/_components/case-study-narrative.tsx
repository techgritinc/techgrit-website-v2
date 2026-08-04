import type { NarrativeSection } from "../_data/types";
import { ArchitectureDiagram } from "./architecture-diagram";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

function NarrativeHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[26px] font-bold tracking-[var(--ls-normal)] scroll-mt-[100px]">
      {children}
    </h2>
  );
}

export function CaseStudyNarrative({ sections }: { sections: NarrativeSection[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-19)]">
      {sections.map((section) => (
        <RevealOnScroll key={section.id}>
          <div>
            <NarrativeHeading id={section.id}>{section.heading}</NarrativeHeading>

            {section.id === "background" || section.id === "solutions" ? (
              <div className="flex flex-col gap-[14px] mt-[16px]">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[16.5px] leading-[1.75] text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {section.id === "challenge" ? (
              <>
                <p className="mt-[16px] text-[16.5px] leading-[1.75] text-secondary">
                  {section.intro}
                </p>
                <div className="flex flex-col gap-[14px] mt-[22px]">
                  {section.painPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-[14px] bg-glass-faint border border-border-faint rounded-lg px-[20px] py-[18px]"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-amber-light)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-[2px]"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      <p className="text-[15.5px] leading-[1.6] text-text-subtle">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {section.id === "architecture" ? (
              <>
                <p className="mt-[16px] text-[16.5px] leading-[1.75] text-secondary">
                  {section.intro}
                </p>
                <ArchitectureDiagram flow={section.flow} />
              </>
            ) : null}
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
