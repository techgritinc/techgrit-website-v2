import Image from "next/image";
import type { ShowcaseSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsShowcase({ section }: { section: ShowcaseSection }) {
  return (
    <section>
      <div className="tg-container-md" style={{ paddingTop: "var(--space-5)", paddingBottom: "var(--space-20)" }}>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 24,
              border: "1px solid var(--color-border)",
              boxShadow: "0 40px 90px -34px rgba(0,0,0,0.8)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ zIndex: 2, boxShadow: "inset 0 -80px 120px -60px rgba(10,24,34,0.85)" }}
            />
            {section.image ? (
              <Image
                src={section.image.url}
                alt={section.image.alternativeText}
                width={section.image.width}
                height={section.image.height}
                priority
                sizes="100vw"
                style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }}
              />
            ) : (
              <div
                className="flex items-center justify-center text-center"
                style={{
                  height: 460,
                  padding: "var(--space-14)",
                  background:
                    "radial-gradient(circle at 30% 100%, var(--color-overlay-orange), transparent 60%), var(--color-glass)",
                  color: "var(--color-text-faint)",
                  fontSize: "var(--text-sm)",
                }}
              >
                Drop a hero image — your team, office, or workspace
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
