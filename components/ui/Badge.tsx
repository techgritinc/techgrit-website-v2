import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone = "orange" | "glass" | "blue" | "teal" | "accent" | "orangeOutline" | "live";
export type BadgeSize = "sm" | "lg";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  size?: BadgeSize;
  children: ReactNode;
};

/* Figma SG 15 · Badges, status & progress — pills are radius 999, no uppercase, no extra tracking. */
const BASE = "inline-flex items-center rounded-full font-medium";

const SIZE_CLASSES: Record<BadgeSize, string> = {
  /** Status chip / Live chip: 14px/20, 12px x 6px padding, 8px gap. */
  sm: "gap-2 px-[12px] py-[6px] text-[14px] leading-5",
  /** Eyebrow badge: 16px/24, 18px x 10px padding, 10px gap. */
  lg: "gap-[10px] px-[18px] py-[10px] text-base leading-6",
};

/** Eyebrow badge: accent tint 8% fill, accent border 35%, accent text. */
const EYEBROW = "bg-[rgb(var(--tg-accent-solid-rgb)/0.08)] border border-[rgb(var(--tg-accent-solid-rgb)/0.35)] text-[color:var(--tg-text-accent)]";
/** Status chip: 5% ink fill, 14% ink border, primary text. */
const STATUS = "bg-[rgb(var(--tg-contrast-rgb)/0.05)] border border-[rgb(var(--tg-contrast-rgb)/0.14)] text-primary";
/** Live chip: success tint 12% fill, success text, no border. */
const LIVE = "bg-[rgb(var(--tg-success-rgb)/0.12)] text-[color:var(--tg-status-success)]";

const TONE_CLASSES: Record<BadgeTone, string> = {
  orange: EYEBROW,
  orangeOutline: EYEBROW,
  accent: EYEBROW,
  glass: STATUS,
  blue: STATUS,
  teal: STATUS,
  live: LIVE,
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
