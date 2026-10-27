import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { ValuePropositionTile, WhySection } from "../_data/types";

function WhyTile({ tile }: { tile: ValuePropositionTile }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border-8 bg-glass-3 p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
        {tile.icon && <Image src={tile.icon.url} alt={tile.icon.alternativeText} width={20} height={20} />}
      </span>
      <div>
        <h4 className="text-[16.5px] leading-[normal] font-bold text-white">{tile.title}</h4>
        <p className="mt-1.5 text-[14px] leading-[1.55] text-60">{tile.description}</p>
      </div>
    </div>
  );
}

export function AiModernizationWhy({ section }: { section: WhySection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-10 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.tiles.map((tile) => (
              <WhyTile key={tile.order} tile={tile} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
