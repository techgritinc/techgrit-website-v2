import type { NarrativeBlock } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import MediaSlot from "@/components/ui/MediaSlot";
import { ArrowRightIcon } from "@/components/ui/icons";

function NarrativeHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[26px] font-bold tracking-[var(--ls-normal)] scroll-mt-[100px] leading-[normal]">
      {children}
    </h2>
  );
}

function NarrativeBullets({ bullets }: { bullets: string[] }) {
  return (
    <div className="flex flex-col gap-[14px] mt-[22px]">
      {bullets.map((point, index) => (
        <div
          key={index}
          className="flex items-start gap-[14px] bg-glass-faint border border-border-faint rounded-lg px-[20px] py-[18px] leading-[normal]"
        >
          <ArrowRightIcon className="shrink-0 mt-[2px]" style={{ color: "var(--color-amber-light)" }} />
          <p className="text-[15.5px] leading-[1.6] text-text-subtle">{point}</p>
        </div>
      ))}
    </div>
  );
}

function NarrativePictures({ pictures }: { pictures: string[] }) {
  if (pictures.length === 1) {
    return (
      <div className="relative mt-[22px] mx-auto w-full max-w-[560px] aspect-[16/10] rounded-2xl overflow-hidden border border-border-faint">
        <MediaSlot src={pictures[0]} alt="" fill sizes="(max-width: 768px) 100vw, 560px" />
      </div>
    );
  }

  const columns = Math.min(pictures.length, 2);
  return (
    <div
      className="mt-[22px] grid max-tg-sm:grid-cols-1 gap-[16px]"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {pictures.map((picture, index) => (
        <div
          key={index}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-faint"
        >
          <MediaSlot src={picture} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      ))}
    </div>
  );
}

function NarrativeBlockContent({ block }: { block: NarrativeBlock }) {
  return (
    <div>
      {block.heading ? <NarrativeHeading id={block.id}>{block.heading}</NarrativeHeading> : null}
      {block.descriptions?.length ? (
        <div className="flex flex-col gap-[14px] mt-[16px]">
          {block.descriptions.map((description, index) => (
            <p key={index} className="text-[16.5px] leading-[1.75] text-secondary">
              {description}
            </p>
          ))}
        </div>
      ) : null}
      {block.subheading ? <h3 className="mt-[18px] leading-[normal]">{block.subheading}</h3> : null}
      {block.paragraphs?.length ? (
        <div className="flex flex-col gap-[14px] mt-[16px]">
          {block.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[16.5px] leading-[1.75] text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      {block.bullets?.length ? <NarrativeBullets bullets={block.bullets} /> : null}
      {block.pictures?.length ? <NarrativePictures pictures={block.pictures} /> : null}
    </div>
  );
}

export function CaseStudyNarrative({ blocks }: { blocks?: NarrativeBlock[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-19)]">
      {blocks?.map((block) => (
        <RevealOnScroll key={block.id}>
          <NarrativeBlockContent block={block} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
