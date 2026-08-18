import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import type { CareersHeroContent, CollageImage } from "@/cms/types/careers-types";

const COLLAGE_SPAN_CLASSES: Record<CollageImage["span"], string> = {
  tall: "row-span-2",
  default: "",
  wide: "col-span-2",
};

export function CareersHero({ content }: { content: CareersHeroContent }) {
  const highlightIndex = content.heading.indexOf(content.headingHighlight);
  const before = content.heading.slice(0, highlightIndex);
  const after = content.heading.slice(highlightIndex + content.headingHighlight.length);

  return (
    <section>
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1.05fr_0.95fr] items-center gap-14 px-9 pt-[74px] pb-[30px] max-tg-md:grid-cols-1 max-tg-md:gap-9">
        <div>
          <div
            data-rise
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border-orange-30 bg-overlay-orange-10 px-4 py-2 leading-[normal] [animation-delay:.05s]"
          >
            <span className="text-2xs font-bold tracking-wider text-strong uppercase">{content.eyebrow}</span>
          </div>

          <h1 data-rise className="font-display text-[clamp(40px,5.2vw,58px)] font-bold leading-[1.03] tracking-[-0.035em] text-white [animation-delay:.12s]">
            {before}
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">
              {content.headingHighlight}
            </span>
            {after}
          </h1>

          <p data-rise className="mt-5 max-w-[500px] text-[18px] leading-[1.65] text-secondary [animation-delay:.2s]">{content.lead}</p>

          <div data-rise className="mt-[30px] flex flex-wrap gap-3.5 [animation-delay:.28s]">
            <Button href={content.primaryCta.href} variant="primary" size="hero" className="min-h-[52px] !px-7 !py-[15px] !text-[16px] !font-bold leading-[normal]">
              {content.primaryCta.label} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
            </Button>
            <Button href={content.secondaryCta.href} variant="ghost" size="hero" className="min-h-[52px] !px-[26px] !py-4 !text-[16px] !font-bold leading-[normal]">
              {content.secondaryCta.label} 
            </Button>
          </div>
        </div>

        <div data-rise className="[animation-delay:.22s]">
          <div className="grid grid-cols-2 auto-rows-[150px] gap-3.5 max-tg-md:auto-rows-[180px]">
            {content.images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-[18px] border border-border-image ${COLLAGE_SPAN_CLASSES[image.span]}`}
              >
                <MediaSlot src={image.src} alt={image.alt} fill sizes="(max-width: 960px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
