import Image from "next/image";
import type { ShowcaseSection } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function AboutUsShowcase({ section }: { section: ShowcaseSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1140px] px-[36px] pb-[56px] pt-[14px]">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.12] shadow-[0_40px_90px_-34px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_-80px_120px_-60px_rgba(0,0,0,0.85)]"
            />
            {section.image ? (
              <Image
                src={section.image.url}
                alt={section.image.alternativeText}
                width={section.image.width}
                height={section.image.height}
                priority
                sizes="100vw"
                className="block h-[460px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[460px] items-center justify-center bg-glass bg-[radial-gradient(circle_at_30%_100%,var(--color-overlay-orange),transparent_60%)] p-[var(--space-14)] text-center text-[length:var(--text-sm)] text-faint">
                Drop a hero image — your team, office, or workspace
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
