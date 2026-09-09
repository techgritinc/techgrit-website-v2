import type { ResponsibilitySection } from "@/cms/types/case-study-detail-types";
import { BlocksContent } from "@/components/ui/BlocksContent";
import { ResultCard } from "@/components/ui/ResultCard";
import { NarrativeHeading } from "./ArticleNarrative";

export function ArticleResponsibilitySection({ section }: { section: ResponsibilitySection }) {
  return (
    <div>
      <NarrativeHeading id={`narrative-${section.order}`}>{section.title}</NarrativeHeading>
      <div className="mt-[16px] flex flex-col gap-[22px]">
        {section.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-[14px]">
            {group.heading ? <h3 className="text-[20px] leading-[normal]">{group.heading}</h3> : null}
            {group.items.map((blocks, itemIndex) => (
              <div key={itemIndex} className="flex flex-col gap-[14px]">
                <BlocksContent content={blocks} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Pull-quote, same ResultCard treatment as the content-section blocks. */}
      {section.extraTitle ? <ResultCard description={section.extraTitle} /> : null}
    </div>
  );
}
