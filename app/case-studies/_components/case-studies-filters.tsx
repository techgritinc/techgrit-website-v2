export function CaseStudiesFilters({
  categories,
  active,
  onSelect,
}: {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2.5" role="group" aria-label="Filter case studies by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category)}
            className={
              isActive
                ? "leading-[normal] cursor-pointer rounded-full border border-transparent bg-[image:var(--gradient-brand)] px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-primary shadow-chip-active transition-all duration-200 ease-out"
                : "leading-[normal] cursor-pointer rounded-full border border-border-14 bg-glass-4 px-tg-7 py-tg-3 text-[13.5px] font-bold tracking-01 whitespace-nowrap text-secondary transition-all duration-200 ease-out"
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
