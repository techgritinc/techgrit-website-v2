import type { ReactNode } from "react";
import Link from "next/link";

export interface IconTileProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  /** "compact" = related-service card type scale, "default" = why-tile type scale. */
  size?: "compact" | "default";
}

const TITLE_CLASS: Record<"compact" | "default", string> = {
  compact: "text-[14.5px] font-bold text-white",
  default: "text-[16.5px] font-bold text-white",
};

const DESC_CLASS: Record<"compact" | "default", string> = {
  compact: "mt-1 text-[12.5px] leading-[1.45] text-text-55",
  default: "mt-1.5 text-[14px] leading-[1.55] text-60",
};

/**
 * Generic icon-led compact tile/card — flex row with an icon chip, a title,
 * and a description. Confirmed reusable across "What We Do" pages' related-
 * service and value-proposition sections (see specs/TMS-86/research.md §4).
 * No page-specific copy inside the component.
 */
export function IconTile({ icon, title, description, href, size = "default" }: IconTileProps) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-orange-30 bg-[var(--color-overlay-orange-14)] text-amber-light">
        {icon}
      </span>
      <div>
        <h5 className={TITLE_CLASS[size]}>{title}</h5>
        <p className={DESC_CLASS[size]}>{description}</p>
      </div>
    </>
  );

  const className =
    "flex items-start gap-3.5 rounded-lg border border-border-8 bg-glass-3 p-4.5 transition-[transform,border-color,background] duration-200 ease-out hover:-translate-y-[3px] hover:border-[var(--color-border-orange-medium)] hover:bg-[rgba(232,119,34,0.05)]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
