import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "nav" | "footer" | "hero";

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
  "inline-flex items-center justify-center shrink-0 whitespace-nowrap font-bold transition-all duration-200 ease-[ease] cursor-pointer disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "gap-[7px] rounded-sm px-[18px] py-2.5 text-xs",
  md: "gap-2 rounded-card px-[26px] py-3.5 text-sm",
  lg: "gap-[9px] rounded-card px-7 py-4 text-base",
  nav: "gap-2 rounded-[11px] px-[22px] py-[12px] text-[15px] leading-[normal]",
  footer: "gap-[8px] rounded-[11px] px-[20px] py-[12px] text-[14.5px] leading-[normal]",
  hero: "gap-[9px] rounded-card px-7 py-4 text-[16px]",
};

// Primary's glow shadow scales with size: the compact nav button uses the
// dedicated --shadow-nav-btn token plus its own hover intensity (matching the
// reference's header CTA on every page); the larger sizes keep the bigger
// --shadow-btn-primary/-hover pair used by hero/final-CTA buttons.
// `nav`'s hover uses --shadow-nav-btn-hover (TMS-63 v2) — previously repeated the default
// shadow on hover, which is the "CTA hover divergence" spec.md's V2 Update unifies across every
// page (`footer` is unchanged, out of this feature's header-only scope).
const PRIMARY_SHADOW_CLASSES: Record<ButtonSize, string> = {
  sm: "shadow-btn-primary hover:shadow-btn-hover active:shadow-btn-primary",
  md: "shadow-btn-primary hover:shadow-btn-hover active:shadow-btn-primary",
  lg: "shadow-btn-primary hover:shadow-btn-hover active:shadow-btn-primary",
  nav: "shadow-nav-btn hover:shadow-nav-btn-hover active:shadow-nav-btn",
  footer: "shadow-nav-btn hover:shadow-nav-btn active:shadow-nav-btn",
  hero: "shadow-btn-primary active:shadow-btn-primary",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-[image:var(--gradient-brand)] text-white hover:-translate-y-[2px] active:translate-y-0",
  ghost: "bg-glass border border-border-strong text-primary backdrop-blur-sm",
  outline: "bg-transparent border border-border text-primary hover:border-orange hover:bg-glass",
};

/** Shared CTA/link-button primitive (FR-013) — Button/Badge/FormField are the
 * three reusable components this feature introduces in place of per-section
 * markup; styling is Tailwind utility classes referencing tokens.css custom
 * properties, not globals.css's .btn* classes (see plan.md Constitution Check). */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, href, ...rest } = props;
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    variant === "primary" ? PRIMARY_SHADOW_CLASSES[size] : "",
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

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
