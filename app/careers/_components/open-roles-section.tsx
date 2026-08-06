"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/ui/FilterBar";
import { RoleFilters } from "./role-filters";
import { RoleCard } from "./role-card";
import { ApplicationDialog } from "./application-dialog";
import type { ApplicationContext } from "./application-dialog";
import type { DepartmentFilter, OpenRole } from "../_data/careers-data";

const CLOSED_CONTEXT: ApplicationContext = { mode: "role", roleSlug: null, roleTitle: null };

export function OpenRolesSection({
  filters,
  roles,
}: {
  filters: DepartmentFilter[];
  roles: OpenRole[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]?.value ?? "all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationContext, setApplicationContext] = useState<ApplicationContext>(CLOSED_CONTEXT);

  const visibleRoles = useMemo(
    () =>
      activeFilter === "all" ? roles : roles.filter((role) => role.department === activeFilter),
    [activeFilter, roles],
  );

  function handleApply(role: OpenRole) {
    setApplicationContext({ mode: "role", roleSlug: role.slug, roleTitle: role.title });
    setIsDialogOpen(true);
  }

  return (
    <section id="roles" className="relative scroll-mt-[96px]">
      <div className="mx-auto max-w-[1280px] px-[36px] pt-[50px] pb-[12px]">
        <h2 className="font-body text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em] text-white">
          Open roles
        </h2>
      </div>

      <div className="sticky top-[80px] z-[60] mt-[20px] border-y border-white/[0.06] bg-black/[0.72] backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-[1280px] items-center gap-[10px] overflow-x-auto px-[36px] py-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-[6px] shrink-0 whitespace-nowrap text-[11.5px] font-bold tracking-[0.14em] text-white/[0.42] uppercase">
            Filter
          </span>
          <RoleFilters filters={filters} activeFilter={activeFilter} onSelect={setActiveFilter} />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-[36px] pt-[24px] pb-[30px]">
        <div className="flex flex-col gap-[14px]">
          {visibleRoles.length > 0 ? (
            visibleRoles.map((role) => (
              <RoleCard key={role.slug} role={role} onApply={handleApply} />
            ))
          ) : (
            <p className="py-10 text-center text-[15px] text-text-60">
              No roles match this filter right now.
            </p>
          )}
        </div>
      </div>

      <ApplicationDialog
        isOpen={isDialogOpen}
        context={applicationContext}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
}
