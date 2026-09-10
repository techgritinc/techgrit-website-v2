import Image from "next/image";
import Link from "next/link";
import type {
  CaseStudyImage,
  NarrativeBlockEntry,
  NarrativeFeatureItem,
} from "@/cms/types/case-study-detail-types";
import { BlocksContent } from "@/components/ui/BlocksContent";
import { DataTable } from "@/components/ui/DataTable";
import { MetricsGrid } from "@/components/ui/MetricsStrip";
import { ResultCard } from "@/components/ui/ResultCard";

export function NarrativeHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[26px] font-bold tracking-[var(--ls-normal)] scroll-mt-[100px] leading-[normal]"
    >
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

function NarrativeFeatureImages({
  images,
  variant,
}: {
  images: CaseStudyImage[];
  variant: NarrativeFeatureVariant;
}) {
  if (variant === "panel") {
    return (
      <div className="mt-[18px] flex flex-col gap-[14px]">
        {images.map((image, index) => (
          <div
            key={index}
            className="mx-auto rounded-xl overflow-hidden border border-border-faint"
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
        ))}
      </div>
    );
  }

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

function NarrativeFeatureRow({
  feature,
  variant,
}: {
  feature: NarrativeFeatureItem;
  variant: NarrativeFeatureVariant;
}) {
  const isPanel = variant === "panel";

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
          isPanel ? (
            // Left-orange-accent box around the heading alone — the same border/surface
            // ResultCard uses, so an article's sub-heading reads as a marker in the flow
            // rather than boxing the prose and figures that follow it.
            <div className="rounded-[16px] border border-white/10 border-l-[3px] border-l-orange bg-white/4 px-tg-9 py-tg-7 backdrop-blur-[8px]">
              <h3 className="text-[24px] leading-[1.25]">{feature.title}</h3>
            </div>
          ) : (
            <h3 className="text-[17px] font-semibold leading-[1.45]">{feature.title}</h3>
          )
        ) : null}
        {feature.subtitle ? (
          <p className="mt-[8px] text-[15.5px] leading-[1.7] text-secondary">{feature.subtitle}</p>
        ) : null}

        {/* Figure sits directly under the heading, ahead of the prose — the image is what
         * establishes what the section is about, so it reads better before the text than
         * as a trailing afterthought. */}
        {feature.images.length ? (
          <NarrativeFeatureImages images={feature.images} variant={variant} />
        ) : null}
        {feature.description ? (
          <div className="mt-[12px] flex flex-col gap-[10px]">
            <BlocksContent content={feature.description} />
          </div>
        ) : null}
        {feature.table ? (
          <DataTable
            headers={feature.table.headers}
            rows={feature.table.rows}
            columnTones={feature.table.tones}
            caption={feature.title}
          />
        ) : null}
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

function isBareMetricFeature(feature: NarrativeFeatureItem): boolean {
  return Boolean(
    feature.title &&
      feature.subtitle &&
      !feature.description &&
      !feature.table &&
      !feature.images.length &&
      !feature.icon &&
      !feature.ctaLink
  );
}

function NarrativeFeatures({
  features,
  variant,
}: {
  features: NarrativeFeatureItem[];
  variant: NarrativeFeatureVariant;
}) {
  if (features.length >= 2 && features.every(isBareMetricFeature)) {
    return (
      <div className="mt-[22px]">
        <MetricsGrid
          metrics={features.map((feature) => ({
            order: feature.order,
            value: feature.title,
            label: feature.subtitle ?? "",
          }))}
          align="center"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] mt-[22px]">
      {features.map((feature) => (
        <NarrativeFeatureRow key={feature.order} feature={feature} variant={variant} />
      ))}
    </div>
  );
}

function NarrativePictures({ images }: { images: CaseStudyImage[] }) {
  if (images.length === 1) {
    const image = images[0];
    return (
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

export type NarrativeFeatureVariant = "plain" | "panel";

export function ArticleNarrativeBlock({
  entry,
  featureVariant = "plain",
}: {
  entry: NarrativeBlockEntry;
  featureVariant?: NarrativeFeatureVariant;
}) {
  const id = `narrative-${entry.order}`;

  return (
    <div>
      {entry.title ? <NarrativeHeading id={id}>{entry.title}</NarrativeHeading> : null}
      {entry.paragraphs.length ? <NarrativeBullets paragraphs={entry.paragraphs} /> : null}
      {entry.features.length ? (
        <NarrativeFeatures features={entry.features} variant={featureVariant} />
      ) : null}
      {entry.images.length ? <NarrativePictures images={entry.images} /> : null}
      {entry.extraTitle ? <ResultCard description={entry.extraTitle} /> : null}
    </div>
  );
}
