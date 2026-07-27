import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "orange" | "glass" | "blue" | "teal" | "accent";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  children: ReactNode;
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-full px-[11px] py-[5px] text-[10.5px] font-extrabold tracking-wider uppercase";

const TONE_CLASSES: Record<BadgeTone, string> = {
  orange: "bg-[image:var(--gradient-brand)] text-badge-text",
  glass: "bg-glass border border-border text-primary backdrop-blur-sm",
  blue: "bg-[rgba(2,132,199,0.16)] text-blue-light",
  teal: "bg-[rgba(15,118,110,0.20)] text-teal-light",
  accent: "bg-glass-4 border border-border",
};

/** Shared status/label pill primitive (FR-014). */
export default function Badge({ tone = "orange", className, children, ...rest }: BadgeProps) {
  const classes = [BASE, TONE_CLASSES[tone], className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
