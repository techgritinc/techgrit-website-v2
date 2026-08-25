import React, { HTMLAttributes } from "react";

export type GlassCardVariant =
  | "default"
  | "reimagine"
  | "reimagineDiff"
  | "reimagineWhy"
  | "industry"
  | "blogCard"
  | "blogFeatured"
  | "blogTeaser"
  | "constructionChallenge"
  | "constructionSolution"
  | "constructionImpact"
  | "webinarUpcoming"
  | "webinarReleased"
  | "leaderProfile";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: GlassCardVariant;
  hoverBorderColor?: string; // Optional tailwind border color class on hover (e.g., 'hover:border-orange-strong')
}

const CARD_VARIANTS: Record<GlassCardVariant, string> = {
  default: "rounded-2xl border-border-image bg-glass-4 px-tg-14a py-tg-14 hover:-translate-y-tg-1c",
  reimagine: "rounded-[20px] border-border bg-[rgba(255,255,255,0.04)] p-8 hover:-translate-y-[5px]",
  reimagineDiff:
    "flex flex-col rounded-3xl border-border-9 bg-glass-3 p-tg-11 hover:-translate-y-[5px]",
  reimagineWhy: "rounded-3xl border-border-9 bg-glass-3 py-tg-15 px-tg-17",
  industry: "rounded-2xl border-border-9 bg-glass-3 p-tg-13 pb-tg-14 hover:-translate-y-[5px]",
  blogCard: "rounded-2xl border-border-image bg-glass-4 overflow-hidden hover:-translate-y-[6px]",
  blogFeatured: "rounded-4xl border-border bg-glass-4 overflow-hidden hover:-translate-y-[5px]",
  blogTeaser: "flex flex-col overflow-hidden rounded-2xl border-border-image bg-glass-4 hover:-translate-y-[6px]",
  constructionChallenge: "rounded-[16px] border-border-image bg-glass-4 px-5 py-[22px]",
  constructionSolution: "rounded-[18px] border-border-image bg-glass-4 px-7 py-[30px] hover:-translate-y-[6px]",
  constructionImpact: "rounded-[20px] border-border-image bg-glass-4 px-7 py-8 hover:-translate-y-[6px]",
  webinarUpcoming: "rounded-3xl border-[var(--color-border-amber-30)] bg-[image:var(--gradient-webinar-upcoming)] px-9 py-[38px]",
  webinarReleased: "rounded-2xl border-border-image bg-glass-4 overflow-hidden hover:-translate-y-[5px]",
  leaderProfile: "flex flex-col items-center rounded-3xl border-border bg-glass-4 px-8 py-10 text-center hover:-translate-y-[5px]",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  {
    children,
    className = "",
    variant = "default",
    hoverBorderColor = "hover:border-[rgba(232,119,34,0.6)]",
    ...props
  },
  ref,
) {
  // We remove the default hoverBorderColor from 'reimagine' if it was meant to be pure hover:border-orange
  // but we can let the parent pass hoverBorderColor or rely on the class structure.
  return (
    <div
      ref={ref}
      className={`group border backdrop-blur-md transition-all duration-300 ease-out ${CARD_VARIANTS[variant]} ${hoverBorderColor} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

interface GlassCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  wrapperClassName?: string;
  variant?: GlassCardVariant;
}

const ICON_VARIANTS: Record<GlassCardVariant, string> = {
  default: "mb-tg-9a h-tg-19a w-tg-19a rounded-lg",
  reimagine: "mb-5.5 h-13 w-13 rounded-md",
  reimagineDiff: "mb-3.5 h-6.5 w-6.5",
  reimagineWhy: "h-11 w-11 shrink-0",
  industry: "mb-tg-17 h-14 w-14 rounded-full",
  blogCard: "mb-5.5 h-13 w-13 rounded-md",
  blogFeatured: "mb-5.5 h-13 w-13 rounded-md",
  blogTeaser: "h-18 w-18",
  constructionChallenge: "mb-[14px] h-10 w-10 rounded-[10px]",
  constructionSolution: "mb-5 h-[50px] w-[50px] rounded-[13px]",
  constructionImpact: "mb-5.5 h-13 w-13 rounded-md",
  webinarUpcoming: "mb-5.5 h-13 w-13 rounded-md",
  webinarReleased: "mb-5.5 h-13 w-13 rounded-md",
  leaderProfile: "mb-6 h-27.5 w-27.5 rounded-full",
};

export function GlassCardIcon({ children, wrapperClassName = "", variant = "default", ...props }: GlassCardIconProps) {
  return (
    <div
      className={`flex items-center justify-center ${ICON_VARIANTS[variant]} ${wrapperClassName}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassCardTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlassCardVariant;
}

const TITLE_VARIANTS: Record<GlassCardVariant, string> = {
  default: "text-21 font-bold text-white",
  reimagine: "text-lg font-medium",
  reimagineDiff: "text-[22px] mt-1 font-bold text-white leading-[26.84px] tracking-[-0.22px]",
  reimagineWhy: "text-[22px] leading-[normal] tracking-[normal]",
  industry: "text-industry-title leading-[normal] tracking-title-tight",
  blogCard: "text-[18.5px] font-bold text-white",
  blogFeatured: "text-[length:var(--text-blog-card)] font-display",
  blogTeaser: "mt-tg-4 text-[19px] font-bold text-white tracking-[normal] leading-[1.32]",
  constructionChallenge: "text-15-5 font-bold text-primary leading-[1.3]",
  constructionSolution: "text-[19px]",
  constructionImpact: "text-[18.5px]",
  webinarUpcoming: "text-[clamp(22px,2.6vw,30px)] font-bold text-white leading-[1.15] tracking-[-0.02em]",
  webinarReleased: "text-[18.5px] font-bold text-white leading-[1.3] tracking-normal",
  leaderProfile: "text-[22px] font-bold text-white leading-[normal] tracking-[var(--ls-normal)]",
};

export function GlassCardTitle({ children, className = "", variant = "default" }: GlassCardTitleProps) {
  return (
    <h3 className={`${TITLE_VARIANTS[variant]} ${className}`}>
      {children}
    </h3>
  );
}

interface GlassCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlassCardVariant;
}

const DESC_VARIANTS: Record<GlassCardVariant, string> = {
  default: "mt-tg-3a text-15-5 leading-relaxed",
  reimagine: "mt-2.5 text-[15.5px] leading-[1.6]",
  reimagineDiff: "mt-2.5 text-[14.5px] leading-[22.475px] text-muted tracking-normal line-clamp-3 min-h-[67.425px]",
  reimagineWhy: "mt-2 text-[15px] leading-[1.55] text-muted",
  industry: "mt-2.5 text-sm leading-[1.6] text-60",
  blogCard: "mt-2.5 text-[14.5px] leading-[1.6]",
  blogFeatured: "mt-2.5 text-15-5 leading-[var(--lh-body)] text-64 max-w-tg-blog-featured-desc",
  blogTeaser: "mt-tg-3 text-[14.5px] leading-[1.6] text-muted",
  constructionChallenge: "mt-2 text-sm text-faint leading-[1.6]",
  constructionSolution: "mt-[10px] text-[14.5px] text-muted leading-[1.6]",
  constructionImpact: "mt-[10px] text-[14.5px] text-muted leading-[1.6]",
  webinarUpcoming: "mt-3 text-15-5 leading-[1.6] text-[var(--color-text-66)]",
  webinarReleased: "mt-2.5 text-[14.5px] leading-[1.6] text-muted",
  leaderProfile: "mt-3.5 text-14 leading-[1.65] tracking-normal text-[var(--color-text-66)]",
};

export function GlassCardDescription({ children, className = "", variant = "default" }: GlassCardDescriptionProps) {
  return (
    <p className={`${DESC_VARIANTS[variant]} ${className}`}>
      {children}
    </p>
  );
}
