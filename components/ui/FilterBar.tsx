import type { ReactNode } from "react";

type FilterBarProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Shared sticky filter shell (v2.2 Phase 1) — a full-bleed sticky, dark,
 * bordered bar with a centered `max-w-[1280px]` content row, matching the
 * page-section container width every other section already uses. */
export default function FilterBar({ label, children, className }: FilterBarProps) {
  const classes = [
    "sticky top-nav z-raised border-t border-b border-border-subtle bg-nav-glass backdrop-blur-nav",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 overflow-x-auto px-9 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-xs font-bold tracking-widest text-secondary uppercase">{label}</span>
        <div className="flex items-center gap-2.5">{children}</div>
      </div>
    </div>
  );
}
