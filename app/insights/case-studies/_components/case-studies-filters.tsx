import type { CaseStudyTab } from "@/cms/types/case-studies-types";

export function CaseStudiesFilters({
  tabs,
  active,
  onSelect,
}: {
  tabs: CaseStudyTab[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2.5" role="group" aria-label="Filter case studies by category">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(tab.value)}
            className={
              isActive
                ? "leading-[normal] cursor-pointer rounded-full border border-transparent bg-[image:var(--gradient-brand)] px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-primary shadow-chip-active transition-all duration-200 ease-out"
                : "leading-[normal] cursor-pointer rounded-full border border-border-14 bg-glass-4 px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-secondary transition-all duration-200 ease-out"
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
