import Image from "next/image";
import Link from "next/link";
import type {
  CaseStudyImage,
  NarrativeBlockEntry,
  NarrativeFeatureItem,
} from "@/cms/types/case-study-detail-types";
import { BlocksContent } from "@/components/ui/BlocksContent";
import { DataTable } from "@/components/ui/DataTable";
import { ResultCard } from "@/components/ui/ResultCard";

export function NarrativeHeading({ id, children }: { id: string; children: React.ReactNode }) {
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


function NarrativeFeatureImages({ images }: { images: CaseStudyImage[] }) {
  return (
    <div className="mt-[12px] flex flex-wrap gap-[10px]">
      {images.map((image, index) => (
        <div key={index} className="rounded-lg overflow-hidden border border-border-faint">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto max-w-full block"
          />
        </div>
      ))}
    </div>
  );
}


function NarrativeFeatureRow({ feature }: { feature: NarrativeFeatureItem }) {
  return (
    <div className="flex items-start gap-[14px]">
      {feature.icon ? (
        <Image
          src={feature.icon.url}
          alt={feature.icon.alt}
          width={20}
          height={20}
          className="shrink-0 mt-[6px]"
        />
      ) : null}
      <div className="flex-1 min-w-0">
        
        {feature.title ? (
          <h3 className="text-[17px] font-semibold leading-[1.45]">{feature.title}</h3>
        ) : null}
        {feature.subtitle ? (
          <p className="mt-[8px] text-[15.5px] leading-[1.7] text-secondary">{feature.subtitle}</p>
        ) : null}
        
        {feature.description ? (
          <div className="mt-[12px] flex flex-col gap-[10px]">
            <BlocksContent content={feature.description} />
          </div>
        ) : null}
        {feature.table ? (
          <DataTable headers={feature.table.headers} rows={feature.table.rows} caption={feature.title} />
        ) : null}
        {feature.images.length ? <NarrativeFeatureImages images={feature.images} /> : null}
        {/* The CMS carries a per-feature link (unset on every current case study) — rendered
         * so it appears the moment an editor fills it in, rather than being silently dropped. */}
        {feature.ctaLink && feature.ctaLabel ? (
          <Link
            href={feature.ctaLink}
            className="mt-[10px] inline-flex items-center gap-[8px] text-[14px] font-semibold text-amber-light"
          >
            {feature.ctaLabel} <span aria-hidden="true">&#8594;</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function NarrativeFeatures({ features }: { features: NarrativeFeatureItem[] }) {
  return (
    // Wider gap than the previous card list needed — without panel borders separating them,
    // whitespace is what keeps consecutive entries from reading as one block.
    <div className="flex flex-col gap-[26px] mt-[22px]">
      {features.map((feature) => (
        <NarrativeFeatureRow key={feature.order} feature={feature} />
      ))}
    </div>
  );
}

function NarrativePictures({ images }: { images: CaseStudyImage[] }) {
  if (images.length === 1) {
    const image = images[0];
    return (
      // Centered and capped at the asset's own width so a diagram is never upscaled past
      // its native resolution to fill the column (which both blurred it and made a modest
      // snapshot image dominate the section).
      <div
        className="mt-[22px] mx-auto rounded-2xl overflow-hidden border border-border-faint"
        style={{ maxWidth: `min(100%, ${image.width}px)` }}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="w-full h-auto block"
        />
      </div>
    );
  }

  return (
    <div className="mt-[22px] grid grid-cols-2 max-tg-sm:grid-cols-1 gap-[16px]">
      {images.map((image, index) => (
        <div key={index} className="rounded-2xl overflow-hidden border border-border-faint">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-auto block"
          />
        </div>
      ))}
    </div>
  );
}

export function CaseStudyNarrativeBlock({ entry }: { entry: NarrativeBlockEntry }) {
  const id = `narrative-${entry.order}`;

  return (
    <div>
      <NarrativeHeading id={id}>{entry.title}</NarrativeHeading>
      {entry.paragraphs.length ? <NarrativeBullets paragraphs={entry.paragraphs} /> : null}
      {entry.features.length ? <NarrativeFeatures features={entry.features} /> : null}
      {entry.images.length ? <NarrativePictures images={entry.images} /> : null}
      {/* Pull-quote closes the section — same ResultCard treatment the Orbit AI pages give
       * their extraTitle, and the same end-of-section placement as the responsibility
       * sections, since the quote reads as a summary of what precedes it. */}
      {entry.extraTitle ? <ResultCard description={entry.extraTitle} /> : null}
    </div>
  );
}
