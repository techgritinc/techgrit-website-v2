import React, { HTMLAttributes } from "react";

export type GlassCardVariant = "default" | "reimagine" | "industry" | "blogCard" | "blogFeatured";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: GlassCardVariant;
  hoverBorderColor?: string; // Optional tailwind border color class on hover (e.g., 'hover:border-orange-strong')
}

const CARD_VARIANTS: Record<GlassCardVariant, string> = {
  default: "rounded-2xl border-border-image bg-glass-4 px-tg-14a py-tg-14 hover:-translate-y-tg-1c",
  reimagine: "rounded-[20px] border-border bg-[rgba(255,255,255,0.04)] p-8 hover:-translate-y-[5px]",
  industry: "rounded-[20px] border-border-image bg-glass-4 overflow-hidden hover:-translate-y-[5px]",
  blogCard: "rounded-2xl border-border-image bg-glass-4 overflow-hidden hover:-translate-y-[6px]",
  blogFeatured: "rounded-4xl border-border bg-glass-4 overflow-hidden hover:-translate-y-[5px]",
};

export function GlassCard({ 
  children, 
  className = "", 
  variant = "default",
  hoverBorderColor = "hover:border-[rgba(232,119,34,0.6)]", 
  ...props 
}: GlassCardProps) {
  // We remove the default hoverBorderColor from 'reimagine' if it was meant to be pure hover:border-orange
  // but we can let the parent pass hoverBorderColor or rely on the class structure.
  return (
    <div
      className={`group border backdrop-blur-md transition-all duration-300 ease-out ${CARD_VARIANTS[variant]} ${hoverBorderColor} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassCardIconProps {
  children: React.ReactNode;
  wrapperClassName?: string;
  variant?: GlassCardVariant;
}

const ICON_VARIANTS: Record<GlassCardVariant, string> = {
  default: "mb-tg-9a h-tg-19a w-tg-19a rounded-lg",
  reimagine: "mb-5.5 h-13 w-13 rounded-md",
  industry: "mb-5.5 h-13 w-13 rounded-md",
  blogCard: "mb-5.5 h-13 w-13 rounded-md",
  blogFeatured: "mb-5.5 h-13 w-13 rounded-md",
};

export function GlassCardIcon({ children, wrapperClassName = "", variant = "default" }: GlassCardIconProps) {
  return (
    <div
      className={`flex items-center justify-center ${ICON_VARIANTS[variant]} ${wrapperClassName}`}
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
  industry: "text-[23px]",
  blogCard: "text-[18.5px] font-bold text-white",
  blogFeatured: "text-[length:var(--text-blog-card)] font-display",
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
  industry: "mt-2.5 text-[15px] leading-[1.6]",
  blogCard: "mt-2.5 text-[14.5px] leading-[1.6]",
  blogFeatured: "mt-2.5 text-15-5 leading-[var(--lh-body)] text-64 max-w-tg-blog-featured-desc",
};

export function GlassCardDescription({ children, className = "", variant = "default" }: GlassCardDescriptionProps) {
  return (
    <p className={`text-muted ${DESC_VARIANTS[variant]} ${className}`}>
      {children}
    </p>
  );
}
