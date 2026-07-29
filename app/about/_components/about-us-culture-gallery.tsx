import Image from "next/image";
import type { CultureGallerySection, CulturePhoto } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

function layoutClass(layout: CulturePhoto["layout"]) {
  if (layout === "tall") return "sm:row-span-2";
  if (layout === "wide") return "sm:col-span-2";
  return "";
}

export function AboutUsCultureGallery({ section }: { section: CultureGallerySection }) {
  return (
    <section className="section">
      <div className="tg-container" style={{ paddingInline: "var(--space-15)" }}>
        <RevealOnScroll>
          <div className="mx-auto mb-11 text-center content-max-lg">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 className="text-about-h2 text-values-h2 text-who-you-are-h2">{section.title}</h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[var(--space-7)] sm:auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            {section.photos.map((photo, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl ${layoutClass(photo.layout)}`}
                style={{ border: "1px solid var(--color-border-image)", minHeight: 200 }}
              >
                {photo.image ? (
                  <Image
                    src={photo.image.url}
                    alt={photo.image.alternativeText}
                    fill
                    sizes="(max-width: 1140px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center text-center"
                    style={{
                      minHeight: 200,
                      padding: "var(--space-8)",
                      background: "var(--color-glass)",
                      color: "var(--color-text-faint)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    Team photo coming soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
