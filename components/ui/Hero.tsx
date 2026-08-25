import type { ReactNode } from "react";
import Button from "@/components/ui/Button";

export interface HeroCrumb {
  id: string;
  label: string;
  href?: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroProps {
  crumbs?: HeroCrumb[];
  eyebrow: string;
  title: string;
  /** Exact substring of `title` rendered via the shared `.text-gradient` span. */
  titleHighlight: string;
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Right-card main content — this page: an image; other "What We Do" pages: a stat grid, etc. */
  media: ReactNode;
  /** Bottom caption line inside the card, e.g. "PRISM™ · OrbitAI™ frameworks in every engagement". */
  mediaCaption?: string;
  /** When true, `media` fills the card edge-to-edge (no padding/gradient/blur chrome) — for a plain image instead of a stat grid. */
  mediaFill?: boolean;
}

/**
 * Generic "What We Do" service-page hero: breadcrumbs, eyebrow, gradient-highlighted
 * headline, subtitle, CTA pair, and a right-side media card. Confirmed reusable across
 * the sibling service-page prototypes (see specs/TMS-86/research.md §4) — the card's
 * chrome (padding, radius, gradient, decorative blur corner, caption divider) is owned
 * here; `media`/`mediaCaption` are the only page-specific slots.
 */
// CMS content for `title`/`titleHighlight` isn't always exact-substring-consistent
// (case and trailing punctuation can differ between the two fields), so a plain
// `title.split(titleHighlight)` can silently fail to match and fall back to
// concatenating both strings — a visible duplicated-text bug. This finds the
// highlight case-insensitively and slices the *original* title text (preserving its
// real casing/punctuation) rather than substituting the separate highlight string; if
// no match exists at all, the whole title renders plainly with no gradient span.
function splitTitleHighlight(title: string, highlight: string): [string, string, string] {
  const needle = highlight.trim().replace(/[.!?]+$/, "");
  if (!needle) return [title, "", ""];
  const start = title.toLowerCase().indexOf(needle.toLowerCase());
  if (start === -1) return [title, "", ""];
  let end = start + needle.length;
  while (end < title.length && /[.!?]/.test(title[end])) end++;
  return [title.slice(0, start), title.slice(start, end), title.slice(end)];
}

export function Hero({
  crumbs = [],
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  media,
  mediaCaption,
  mediaFill = false,
}: HeroProps) {
  const [before, highlighted, after] = splitTitleHighlight(title, titleHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[88px] pb-10">
        {crumbs.length > 0 && (
          <div
            data-rise
            className="mb-5 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.08em] text-text-55"
            style={{ animationDelay: ".05s" }}
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.id} className="inline-flex items-center gap-2">
                {i > 0 && <span className="opacity-40">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="transition-colors leading-[normal] hover:text-white">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white leading-[normal]">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div
              data-rise
              className="mb-[24px] inline-flex items-center gap-[10px] rounded-[40px] border border-[rgba(232,119,34,0.35)] bg-[rgba(232,119,34,0.10)] px-[14px] py-[7px] min-h-[30px]"
              style={{ animationDelay: ".12s" }}
            >
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[50%] bg-[#E87722]"
                style={{ boxShadow: "0 0 12px #E87722" }}
              />
              <span className="text-[12px] leading-[normal] font-[800] uppercase tracking-[0.14em] text-[#fdba74]">
                {eyebrow}
              </span>
            </div>
            <h1
              data-rise
              className="font-bold text-white text-[44px] leading-[1.02] tracking-[-0.04em] md:text-[56px]"
              style={{ animationDelay: ".18s" }}
            >
              {before}
              {highlighted && <span className="text-gradient">{highlighted}</span>}
              {after}
            </h1>
            <p
              data-rise
              className="mt-[22px] max-w-[600px] text-[18px] leading-[1.65] text-secondary"
              style={{ animationDelay: ".26s" }}
            >
              {subtitle}
            </p>
            <div
              data-rise
              className="mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animationDelay: ".34s" }}
            >
              <Button href={primaryCta.href} variant="primary" size="hero" className="leading-[normal] !whitespace-normal !shrink !px-[26px] !py-[15px] !min-h-[52px]">
                {primaryCta.label} <span aria-hidden="true" className="text-[17px] leading-[normal]">&#8594;</span>
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="ghost" size="hero" className="leading-[normal] !text-[15px] !px-[22px] !py-[14px]">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
          <div data-rise className="relative leading-[normal]" style={{ animationDelay: ".35s" }}>
            <div
              className={[
                "relative overflow-hidden rounded-4xl border border-border-orange-22",
                mediaFill ? "" : "p-[34px]",
              ].join(" ")}
              style={
                mediaFill
                  ? undefined
                  : { background: "linear-gradient(160deg, var(--color-overlay-orange-10), rgba(245,158,11,0.02))" }
              }
            >
              {!mediaFill && (
                <div
                  aria-hidden="true"
                  className="absolute -top-[60px] -right-10 h-[220px] w-[220px] rounded-full bg-overlay-orange-25"
                  style={{ filter: "blur(60px)" }}
                />
              )}
              <div className="relative">{media}</div>
              {mediaCaption && (
                <div
                  className={[
                    "mt-5 flex items-center gap-2.5 border-t border-border-orange-18 pt-5",
                    mediaFill ? "p-[20px]" : "",
                  ].join(" ")}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-green-live"
                    style={{ animation: "tgblink 2s ease-in-out infinite" }}
                  />
                  <span className="text-[12.5px] font-semibold text-text-75">{mediaCaption}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
