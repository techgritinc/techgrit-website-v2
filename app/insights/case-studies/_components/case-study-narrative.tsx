import Image from "next/image";
import type { NarrativeBlockEntry, NarrativeFeatureItem, NarrativeImage as NarrativeImageType } from "@/cms/types/case-study-detail-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

function NarrativeHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[26px] font-bold tracking-[var(--ls-normal)] scroll-mt-[100px] leading-[normal]">
      {children}
    </h2>
  );
}

function NarrativeBullets({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-[14px] mt-[16px]">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-[16.5px] leading-[1.75] text-secondary">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function NarrativeFeatureImages({ images }: { images: NarrativeImageType[] }) {
  return (
    <div className="mt-[12px] flex flex-wrap gap-[10px]">
      {images.map((image, index) => (
        <div key={index} className="w-full max-w-[160px] rounded-lg overflow-hidden border border-border-faint">
          <Image src={image.url} alt={image.alt} width={320} height={320} className="w-full h-auto block" />
        </div>
      ))}
    </div>
  );
}

function NarrativeFeatureRow({ feature }: { feature: NarrativeFeatureItem }) {
  return (
    <div className="flex items-start gap-[14px] bg-glass-faint border border-border-faint rounded-lg px-[20px] py-[18px] leading-[normal]">
      {feature.icon ? (
        <Image
          src={feature.icon.url}
          alt={feature.icon.alt}
          width={20}
          height={20}
          className="shrink-0 mt-[2px]"
        />
      ) : null}
      <div className="flex-1">
        <p className="text-[15.5px] leading-[1.6] text-text-subtle">{feature.title}</p>
        {feature.subtitle ? (
          <p className="mt-[6px] text-[14px] leading-[1.6] text-text-soft">{feature.subtitle}</p>
        ) : null}
        {feature.images.length ? <NarrativeFeatureImages images={feature.images} /> : null}
      </div>
    </div>
  );
}

function NarrativeFeatures({ features }: { features: NarrativeFeatureItem[] }) {
  return (
    <div className="flex flex-col gap-[14px] mt-[22px]">
      {features.map((feature) => (
        <NarrativeFeatureRow key={feature.order} feature={feature} />
      ))}
    </div>
  );
}

function NarrativePictures({ images }: { images: NarrativeImageType[] }) {
  if (images.length === 1) {
    const image = images[0];
    return (
      <div className="mt-[22px] mx-auto w-full max-w-[560px] rounded-2xl overflow-hidden border border-border-faint">
        <Image src={image.url} alt={image.alt} width={600} height={600} className="w-full h-auto block" />
      </div>
    );
  }

  return (
    <div className="mt-[22px] grid grid-cols-2 max-tg-sm:grid-cols-1 gap-[16px]">
      {images.map((image, index) => (
        <div key={index} className="rounded-2xl overflow-hidden border border-border-faint">
          <Image src={image.url} alt={image.alt} width={600} height={600} className="w-full h-auto block" />
        </div>
      ))}
    </div>
  );
}


function NarrativeEntryContent({ entry }: { entry: NarrativeBlockEntry }) {
  const id = `narrative-${entry.order}`;

  return (
    <div>
      <NarrativeHeading id={id}>{entry.title}</NarrativeHeading>
      {entry.subheading ? <h3 className="mt-[18px] leading-[normal]">{entry.subheading}</h3> : null}
      {entry.paragraphs.length ? <NarrativeBullets paragraphs={entry.paragraphs} /> : null}
      {entry.features.length ? <NarrativeFeatures features={entry.features} /> : null}
      {entry.images.length ? <NarrativePictures images={entry.images} /> : null}
    </div>
  );
}

export function CaseStudyNarrative({ entries }: { entries: NarrativeBlockEntry[] }) {
  return (
    <div className="flex flex-col gap-[var(--space-19)]">
      {entries.map((entry) => (
        <RevealOnScroll key={entry.order}>
          <NarrativeEntryContent entry={entry} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
