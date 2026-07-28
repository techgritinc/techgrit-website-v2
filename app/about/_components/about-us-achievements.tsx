import type { AchievementsSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsAchievements({ section }: { section: AchievementsSection }) {
  return (
    <section className="section-sm">
      <div className="tg-container-lg">
        <RevealOnScroll>
          <div className="glass-card glass-card-md" style={{ borderRadius: "var(--radius-4xl)" }}>
            <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
              {section.stats.map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-gradient text-achievement-stat"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--fw-bold)",
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
