import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import type { RationaleTile, WhyItMattersSection } from "@/cms/types/leadership-types";

function WhyItMattersTile({ tile }: { tile: RationaleTile }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border-8 bg-glass-3 p-6 transition-colors duration-300 hover:border-[var(--color-border-orange-medium)] hover:bg-glass-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
        {tile.icon ? <Image src={tile.icon.url} alt={tile.icon.alt} width={20} height={20} /> : null}
      </span>
      <div>
        <h3 className="text-[16.5px] leading-[normal] tracking-normal font-bold text-white">{tile.title}</h3>
        <p className="mt-1.5 text-14 leading-[1.55] tracking-normal text-60">{tile.description}</p>
      </div>
    </div>
  );
}

export function LeadershipWhyItMatters({ section }: { section: WhyItMattersSection }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 py-15">
        <div className="mx-auto mb-11 max-w-[700px] text-center">
          <SectionEyebrow showAccent={false} className="justify-center leading-[normal]">
            {section.eyebrow}
          </SectionEyebrow>
          <h2 className="text-[clamp(30px,3.4vw,40px)] leading-[1.08] tracking-[-0.03em] font-bold text-white">
            {section.title}
          </h2>
          <p className="mx-auto mt-4 text-[17px] leading-[1.65] tracking-normal text-[var(--color-text-66)]">{section.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-tg-md:grid-cols-1">
          {section.tiles.map((tile) => (
            <WhyItMattersTile key={tile.order} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
