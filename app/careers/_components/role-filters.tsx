import type { DepartmentFilter } from "../_data/careers-data";

export function RoleFilters({
  filters,
  activeFilter,
  onSelect,
}: {
  filters: DepartmentFilter[];
  activeFilter: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter roles by department">
      {filters.map((filter) => {
        const active = filter.value === activeFilter;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(filter.value)}
            className={
              active
                ? "cursor-pointer rounded-full border border-border-orange-strong bg-overlay-orange px-[15px] py-[9px] text-[13.5px] font-bold leading-[normal] whitespace-nowrap text-primary transition-all duration-[180ms] ease-[ease]"
                : "cursor-pointer rounded-full border border-border-14 bg-glass-4 px-[15px] py-[9px] text-[13.5px] font-bold leading-[normal] whitespace-nowrap text-text-70 transition-all duration-[180ms] ease-[ease]"
            }
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
