import type { DepartmentFilter } from "@/cms/types/careers-types";

import Button from "@/components/ui/Button";

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
    <div
      className="flex items-center gap-[10px]"
      role="group"
      aria-label="Filter roles by department"
    >
      {filters.map((filter) => {
        const active = filter.value === activeFilter;
        return (
          <Button
            key={filter.value}
            variant="outline"
            aria-pressed={active}
            onClick={() => onSelect(filter.value)}
            className={
              active
                ? "!shrink-0 !whitespace-nowrap !rounded-[30px] !border !border-orange/60 !bg-orange/[0.16] !px-[15px] !py-[9px] !text-[13.5px] !font-bold !text-white leading-[normal]"
                : "!shrink-0 !whitespace-nowrap !rounded-[30px] !border !border-white/[0.14] !bg-white/[0.04] !px-[15px] !py-[9px] !text-[13.5px] !font-bold !text-white/70 leading-[normal]"
            }
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
