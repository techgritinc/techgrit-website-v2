"use client";

import { useMemo, useState } from "react";
import { RoleFilters } from "./role-filters";
import { RoleCard } from "./role-card";
import { ApplicationDialog } from "./application-dialog";
import type { ApplicationContext } from "./application-dialog";
import type { DepartmentFilter, OpenRole } from "../_data/careers-data";

const CLOSED_CONTEXT: ApplicationContext = { mode: "role", roleSlug: null, roleTitle: null };

export function OpenRolesSection({ filters, roles }: { filters: DepartmentFilter[]; roles: OpenRole[] }) {
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]?.value ?? "all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationContext, setApplicationContext] = useState<ApplicationContext>(CLOSED_CONTEXT);

  const visibleRoles = useMemo(
    () => (activeFilter === "all" ? roles : roles.filter((role) => role.department === activeFilter)),
    [activeFilter, roles]
  );

  function handleApply(role: OpenRole) {
    setApplicationContext({ mode: "role", roleSlug: role.slug, roleTitle: role.title });
    setIsDialogOpen(true);
  }

  return (
    <section id="roles" className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[50px] pb-[30px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em] text-primary">Open roles</h2>
          <RoleFilters filters={filters} activeFilter={activeFilter} onSelect={setActiveFilter} />
        </div>

        <div className="mt-7 flex flex-col gap-3.5">
          {visibleRoles.length > 0 ? (
            visibleRoles.map((role) => <RoleCard key={role.slug} role={role} onApply={handleApply} />)
          ) : (
            <p className="py-10 text-center text-[15px] text-text-60">No roles match this filter right now.</p>
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
