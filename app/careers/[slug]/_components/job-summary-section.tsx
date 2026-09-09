import type { SummaryBodySection } from "@/cms/types/job-detail-types";

export function JobSummarySection({ section }: { section: SummaryBodySection }) {
  return (
    <section className="tg-container px-[var(--space-15)] py-[10px]">
      <div className="max-w-[1040px]">
        {section.title ? <h2 className="text-[26px] leading-[normal]">{section.title}</h2> : null}
        <div className={section.title ? "mt-[16px] flex flex-col gap-[14px]" : "flex flex-col gap-[14px]"}>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[16px] leading-[1.75] text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
