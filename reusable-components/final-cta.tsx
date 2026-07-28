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
}: {
  section: FinalCtaContent;
  tone?: "orange" | "amber";
  paddingTop?: number | string;
  titleLineHeight?: number | string;
}) {
  const glow = tone === "amber" ? "var(--color-overlay-amber-strong)" : "var(--color-overlay-orange-strong)";
  const eyebrowColor = tone === "amber" ? "var(--color-amber-light)" : "var(--color-orange)";
  return (
    <section>
      <div className="tg-container" style={{ maxWidth: 1180, paddingTop: paddingTop, paddingBottom: 110 }}>
          <div
            className="glass-card glass-card-lg mx-auto text-center"
            style={{ position: "relative", overflow: "hidden",padding:"var(--space-27) var(--space-16a)" }}
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
                  fontWeight: "var(--fw-bold)",
                  letterSpacing: "var(--ls-widest)",
                  textTransform: "uppercase",
                  color: eyebrowColor,
                }}
              >
                {section.eyebrow}
              </div>
              <h2 className="mt-4" style={{ fontSize: "clamp(34px, 4.4vw, 48px)", lineHeight: titleLineHeight }}>{section.title}</h2>
              <p className="mx-auto mt-5" style={{ maxWidth: 600, color: "var(--color-text-secondary)", fontSize: "clamp(16px, 1.4vw, 18px)" }}>
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
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 17px)",
                    gap: "10px",
                    padding: "17px 34px",
                    borderRadius: 13,
                    lineHeight: "normal",
                  }}
                >
                  {section.ctaLabel} <span aria-hidden="true" style={{ fontSize: "clamp(17px, 1.4vw, 18px)" }}>&#8594;</span>
                </Button>
                {section.secondaryCta && (
                  <Button
                    href={section.secondaryCta.link}
                    className="leading-[normal] text-[16px]"
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
