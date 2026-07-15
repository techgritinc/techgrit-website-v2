import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "gap-[7px] rounded-sm px-[18px] py-2.5 text-xs",
  md: "gap-2 rounded-card px-[26px] py-3.5 text-sm",
  lg: "gap-[9px] rounded-card px-7 py-4 text-base",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[image:var(--gradient-brand)] text-white shadow-btn-primary hover:-translate-y-0.5 hover:shadow-btn-hover active:translate-y-0 active:shadow-btn-primary",
  ghost: "bg-glass border border-border-strong text-primary backdrop-blur-sm hover:border-orange",
  outline: "bg-transparent border border-border text-primary hover:border-orange hover:bg-glass",
};

/** Shared CTA/link-button primitive (FR-013) — Button/Badge/FormField are the
 * three reusable components this feature introduces in place of per-section
 * markup; styling is Tailwind utility classes referencing tokens.css custom
 * properties, not globals.css's .btn* classes (see plan.md Constitution Check). */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, href, ...rest } = props;
  const classes = [BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
