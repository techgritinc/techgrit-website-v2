import type { AchievementsSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsAchievements({ section }: { section: AchievementsSection }) {
  return (
    <section className="section-sm">
      <div className="tg-container" style={{ maxWidth: 1180 }}>
        <RevealOnScroll>
          <div className="glass-card" style={{ borderRadius: "var(--radius-4xl)", padding: "44px 40px" }}>
            <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
              {section.stats.map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-gradient"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--fw-bold)",
                      fontSize: "clamp(40px, 5vw, 56px)",
                      letterSpacing: "var(--ls-snug)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--fw-bold)",
                      letterSpacing: "var(--ls-wider)",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
