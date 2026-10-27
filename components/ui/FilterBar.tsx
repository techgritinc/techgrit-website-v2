import type { ReactNode } from "react";

type FilterBarProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Shared sticky filter shell (v2.2 Phase 1) — wraps filter-chip components
 * (e.g. TopicFilter, RoleFilters) in a labeled, dark, sticky bar. First wired
 * to /blog (v2.2 FR-028); Case Studies (FR-024) can reuse unchanged. */
export default function FilterBar({ label, children, className }: FilterBarProps) {
  const outerClasses = [
    "sticky top-nav z-[var(--z-sticky)] border-b border-border-subtle bg-nav-glass backdrop-blur-nav w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={outerClasses}>
      <div className="mx-auto flex max-w-(--container-max) items-center gap-2.5 px-9 py-3.5 overflow-x-auto scrollbar-none">
        <span className="text-xs-alt font-bold tracking-filter-label text-ghost uppercase shrink-0 whitespace-nowrap mr-1.5 leading-[normal]">{label}</span>
        {children}
      </div>
    </div>
  );
}
