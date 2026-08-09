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
    <section id="contact" style={{ position: "relative", scrollMarginTop: 96 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 36px 100px" }}>
          <div
            style={{ position: "relative", overflow: "hidden", borderRadius: 28, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: "80px 40px", textAlign: "center" }}
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
                background: "rgba(232,119,34,0.28)",
                filter: "blur(90px)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#E87722",
                }}
              >
                {section.eyebrow}
              </div>
              <h2 style={{ marginTop: 16, fontSize: "clamp(34px, 4.4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.06 }}>{section.title}</h2>
              <p
                style={{ margin: "20px auto 0", fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", maxWidth: 600 }}
              >
                {section.description}
              </p>
              <div
                style={{ marginTop: 34, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 15 }}
              >
                <a
                  href={section.ctaLink}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "linear-gradient(135deg,#F59E0B,#E87722)",
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: 700,
                    padding: "15px 34px",
                    borderRadius: 13,
                    boxShadow: "0 18px 44px -12px rgba(232,119,34,0.85)",
                    minHeight: 52,
                    transition: "transform .2s ease",
                  }}
                  className="hover:-translate-y-[2px]"
                >
                  {section.ctaLabel} <span style={{ fontSize: 18 }}>&#8594;</span>
                </a>
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
