import Image from "next/image";
import type { OverviewSection, ServiceAccent } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

const LABEL_COLOR: Record<ServiceAccent, string> = {
  blue: "var(--color-blue-light)",
  orange: "var(--color-amber-light)",
  teal: "var(--color-teal-light)",
};

const HOVER_BORDER: Record<ServiceAccent, string> = {
  blue: "var(--color-border-blue-strong)",
  orange: "var(--color-border-orange-strong)",
  teal: "var(--color-border-teal-strong)",
};

export function ServicesOverview({ section }: { section: OverviewSection }) {
  return (
    <section>
      <div className="tg-container" style={{ paddingTop: 20, paddingBottom: 70 }}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-3">
            {section.cards.map((card) => (
              <a
                key={card.targetId}
                href={`#${card.targetId}`}
                className="block hover:-translate-y-1.5 hover:border-[var(--card-hover-border)] transition-[transform,border-color] duration-[250ms] ease-out"
                style={{
                  ["--card-hover-border" as string]: HOVER_BORDER[card.accentColor],
                  background: "var(--color-glass)",
                  border: "1px solid var(--color-border-image)",
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  backdropFilter: "blur(var(--blur-md))",
                }}
              >
                {card.image ? (
                  <Image
                    src={card.image.url}
                    alt={card.image.alternativeText}
                    width={card.image.width}
                    height={card.image.height}
                    sizes="(min-width: 960px) 33vw, 100vw"
                    style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center text-center"
                    style={{ height: 170, background: "var(--color-glass)", color: "var(--color-text-faint)", fontSize: "var(--text-sm)" }}
                  >
                    Drop a service image
                  </div>
                )}
                <div style={{ padding: "26px 28px 30px" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: "var(--fw-bold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: LABEL_COLOR[card.accentColor],
                    }}
                  >
                    {card.sequenceLabel}
                  </div>
                  <h3 style={{ marginTop: 10, fontSize: 22 }}>{card.title}</h3>
                  <p style={{ marginTop: 9, fontSize: 15, lineHeight: 1.6, color: "var(--color-text-faint)" }}>
                    {card.description}
                  </p>
                  <span
                    style={{
                      marginTop: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 14.5,
                      fontWeight: "var(--fw-bold)",
                      color: "var(--color-amber-light)",
                    }}
                  >
                    Explore <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
