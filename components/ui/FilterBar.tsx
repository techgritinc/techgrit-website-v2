import type { ReactNode } from "react";

type FilterBarProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Shared sticky filter shell (v2.2 Phase 1) — wraps filter-chip components
 * (e.g. TopicFilter, RoleFilters) in a labeled, dark, sticky bar. Not yet
 * wired into any page in this slice. */
export default function FilterBar({ label, children, className }: FilterBarProps) {
  const classes = [
    "sticky top-nav z-raised flex flex-wrap items-center gap-4 border-b border-border-subtle bg-nav-glass px-6 py-4 backdrop-blur-nav",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <span className="text-xs font-bold tracking-widest text-secondary uppercase">{label}</span>
      <div className="flex flex-wrap items-center gap-2.5">{children}</div>
    </div>
  );
}
