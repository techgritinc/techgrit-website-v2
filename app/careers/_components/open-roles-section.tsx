"use client";

import { useMemo, useState } from "react";
import { RoleFilters } from "./role-filters";
import { RoleCard } from "./role-card";
import type { DepartmentFilter, OpenRole, OpenRolesContent } from "@/cms/types/careers-types";

export function OpenRolesSection({
  content,
  filters,
  roles,
}: {
  content: OpenRolesContent;
  filters: DepartmentFilter[];
  roles: OpenRole[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>(
    filters.find((filter) => filter.isDefault)?.value ?? filters[0]?.value ?? "all",
  );

  const visibleRoles = useMemo(
    () =>
      activeFilter === "all" ? roles : roles.filter((role) => role.department === activeFilter),
    [activeFilter, roles],
  );

  return (
    <section id="roles" className="relative scroll-mt-[96px]">
      <div className="mx-auto max-w-[1280px] px-[36px] pt-[50px] pb-[12px]">
        <h2 className="font-body text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em] text-white">
          {content.heading}
        </h2>
        {content.subtitle && (
          <p className="mt-4 max-w-[680px] text-[17px] leading-[1.6] text-text-60">{content.subtitle}</p>
        )}
      </div>

      <div className="sticky top-[80px] z-[60] mt-[20px] border-y border-white/[0.06] bg-black/[0.72] backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-[1280px] items-center gap-[10px] overflow-x-auto px-[36px] py-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-[6px] shrink-0 whitespace-nowrap text-[11.5px] font-bold tracking-[0.14em] text-white/[0.42] uppercase">
            {content.filterLabel}
          </span>
          <RoleFilters filters={filters} activeFilter={activeFilter} onSelect={setActiveFilter} />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-[36px] pt-[24px] pb-[30px]">
        <div className="flex flex-col gap-[14px]">
          {visibleRoles.length > 0 ? (
            visibleRoles.map((role) => <RoleCard key={role.slug} role={role} />)
          ) : (
            <p className="py-10 text-center text-[15px] text-text-60">
              No roles match this filter right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
