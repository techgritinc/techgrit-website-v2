import { BlocksContent } from "@/components/ui/BlocksContent";
import type { ResponsibilityListBodySection } from "@/cms/types/job-detail-types";

export function JobResponsibilityList({ section }: { section: ResponsibilityListBodySection }) {
  return (
    <section className="tg-container px-[var(--space-15)] py-[10px]">
      <div className="max-w-[1040px]">
        <h2 className="text-[26px] leading-[normal]">{section.title}</h2>
        <div className="mt-[20px] flex flex-col gap-[22px]">
          {section.groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.heading ? <h3 className="text-[20px] leading-[normal]">{group.heading}</h3> : null}
              <div className={group.heading ? "mt-[10px] flex flex-col gap-[10px]" : "flex flex-col gap-[10px]"}>
                {group.items.map((blocks, itemIndex) => (
                  <BlocksContent key={itemIndex} content={blocks} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {section.trailingText ? (
          <p className="mt-[18px] text-[16px] leading-[1.75] text-secondary">{section.trailingText}</p>
        ) : null}
      </div>
    </section>
  );
}
