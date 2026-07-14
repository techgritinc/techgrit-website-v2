import type { AchievementsSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsAchievements({ section }: { section: AchievementsSection }) {
  return (
    <section className="section-sm">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="glass-card">
            <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
              {section.stats.map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-gradient"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--fw-bold)",
                      fontSize: "clamp(40px, 5vw, 56px)",
                      letterSpacing: "var(--ls-tight)",
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
                      letterSpacing: "var(--ls-widest)",
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
