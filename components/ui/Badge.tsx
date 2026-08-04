import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "orange" | "glass" | "blue" | "teal" | "accent" | "orangeOutline" | "live";
export type BadgeSize = "sm" | "lg";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  size?: BadgeSize;
  children: ReactNode;
};

const BASE = "inline-flex items-center rounded-full font-extrabold uppercase";

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "gap-1.5 px-[11px] py-[5px] text-[10.5px] tracking-wider",
  /** Hero Live-Webinar badge sizing (v2.2 Phase 2) — reference-exact, distinct from `sm`. */
  lg: "gap-3 px-5 py-[11px] text-[13.5px] tracking-widest",
};

const TONE_CLASSES: Record<BadgeTone, string> = {
  orange: "bg-[image:var(--gradient-brand)] text-badge-text",
  glass: "bg-glass border border-border text-primary backdrop-blur-sm",
  blue: "bg-[rgba(2,132,199,0.16)] text-blue-light",
  teal: "bg-[rgba(15,118,110,0.20)] text-teal-light",
  accent: "bg-glass-4 border border-border",
  orangeOutline: "bg-[var(--color-overlay-orange-10)] border border-[var(--color-border-orange-soft)] text-strong",
  /** Hero Live-Webinar badge — same gradient/text as `orange`, plus its own chip shadow. */
  live: "bg-[image:var(--gradient-brand)] text-badge-text shadow-[var(--shadow-live-badge-chip)]",
};

/** Shared status/label pill primitive (FR-014). */
export default function Badge({ tone = "orange", size = "sm", className, children, ...rest }: BadgeProps) {
  const classes = [BASE, SIZE_CLASSES[size], TONE_CLASSES[tone], className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
