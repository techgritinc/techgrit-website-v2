import Button from "@/components/ui/Button";

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  secondaryCta?: { label: string; link: string };
}

export function FinalCta({
  section,
  tone = "orange",
  paddingTop = 40,
  titleLineHeight,
  titleFontSize = "clamp(34px, 4.4vw, 48px)",
  eyebrowColor: eyebrowColorOverride,
  eyebrowWeight = "var(--fw-bold)",
  descriptionLineHeight,
  descriptionFontSize = "var(--text-18)",
  descriptionMaxWidth = 600,
  maxWidth = 1180,
  paddingBottom = 110,
  primaryBtnClassName = "",
  secondaryBtnClassName = "",
  cardClassName = "",
}: {
  section: FinalCtaContent;
  tone?: "orange" | "amber";
  paddingTop?: number | string;
  titleLineHeight?: number | string;
  /** Override the title's clamp() when a reference specifies different values than the default. */
  titleFontSize?: string;
  /** Override the eyebrow's color when a reference wants a different tint than the tone default. */
  eyebrowColor?: string;
  /** Override the eyebrow's font-weight when a reference wants 800 instead of the 700 default. */
  eyebrowWeight?: string;
  /** Override the description's line-height when a reference specifies one explicitly. */
  descriptionLineHeight?: number | string;
  /** Override the description's font-size when a reference specifies one other than the --text-18 default. */
  descriptionFontSize?: string;
  /** Override the description's max-width when a reference specifies one other than 600px. */
  descriptionMaxWidth?: number;
  maxWidth?: number;
  paddingBottom?: number | string;
  primaryBtnClassName?: string;
  secondaryBtnClassName?: string;
  cardClassName?: string;
}) {
  const glow = tone === "amber" ? "var(--color-overlay-amber-strong)" : "var(--color-overlay-orange-strong)";
  const eyebrowColor = eyebrowColorOverride ?? (tone === "amber" ? "var(--color-amber-light)" : "var(--color-orange)");
  return (
    <section>
      <div className="mx-auto px-9 w-full" style={{ maxWidth: maxWidth, paddingTop: paddingTop, paddingBottom: paddingBottom }}>
          <div
            className={`glass-card glass-card-lg mx-auto text-center ${cardClassName}`}
            style={{ position: "relative", overflow: "hidden", padding: "var(--space-27) var(--space-16a)" }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -120,
                left: "50%",
                transform: "translateX(-50%)",
                width: 520,
                height: 340,
                borderRadius: "50%",
                background: glow,
                filter: "blur(90px)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: "var(--text-2xs)",
                  fontWeight: eyebrowWeight,
                  letterSpacing: "var(--ls-widest)",
                  textTransform: "uppercase",
                  color: eyebrowColor,
                  lineHeight: "normal",
                }}
              >
                {section.eyebrow}
              </div>
              <h2 className="mt-4" style={{ fontSize: titleFontSize, lineHeight: titleLineHeight }}>{section.title}</h2>
              <p
                className="mx-auto mt-5"
                style={{
                  maxWidth: descriptionMaxWidth,
                  fontSize: descriptionFontSize,
                  color: "var(--color-text-secondary)",
                  lineHeight: descriptionLineHeight,
                }}
              >
                {section.description}
              </p>
              <div
                className="flex flex-wrap items-center justify-center"
                style={{ marginTop: 34, gap: 15 }}
              >
                <Button
                  href={section.ctaLink}
                  variant="primary"
                  size="lg"
                  className={primaryBtnClassName}
                  style={{
                    gap: "10px",
                    padding: "17px 34px",
                    borderRadius: 13,
                    lineHeight: "normal",
                  }}
                >
                  <span className="text-[length:var(--text-base)]">
                    {section.ctaLabel}
                  </span>{" "}
                  <span
                    aria-hidden="true"
                    className="text-[length:var(--text-base)] md:text-[length:var(--text-18)]"
                  >
                    &#8594;
                  </span>
                </Button>
                {section.secondaryCta && (
                  <Button
                    href={section.secondaryCta.link}
                    className={`leading-[normal] text-[16px] ${secondaryBtnClassName}`}
                    variant="ghost"
                    size="lg"
                  >
                    {section.secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
