"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import { CloseIcon, PlayIcon } from "@/components/ui/icons";
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
  const [previewImage, setPreviewImage] = useState<CollageImage | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [modalVideoContainer, setModalVideoContainer] = useState<HTMLDivElement | null>(null);

  function openPreview(image: CollageImage, index: number) {
    setPreviewImage(image);
    setPreviewIndex(index);
  }

  function closePreview() {
    setPreviewImage(null);
    setPreviewIndex(null);
  }

  useEffect(() => {
    if (!previewImage) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePreview();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [previewImage]);

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
            {content.images.map((image, index) => {
              const isVideo = image.type === "video";
              return (
                <div
                  key={index}
                  onClick={isVideo ? () => openPreview(image, index) : undefined}
                  onKeyDown={
                    isVideo
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openPreview(image, index);
                          }
                        }
                      : undefined
                  }
                  role={isVideo ? "button" : undefined}
                  tabIndex={isVideo ? 0 : undefined}
                  aria-label={isVideo ? `Play ${image.alt || "video"} with sound` : undefined}
                  className={[
                    "relative overflow-hidden rounded-[18px] border border-border-image",
                    COLLAGE_SPAN_CLASSES[image.span],
                    isVideo ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isVideo ? (
                    <>
                      <AutoplayVideo
                        src={image.src}
                        className={`absolute inset-0 h-full w-full object-cover ${image.span === "wide" ? "object-[50%_25%]" : ""}`}
                        previewClassName="h-full w-full"
                        portalTarget={previewIndex === index ? modalVideoContainer : undefined}
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-black/15 transition-colors duration-200 hover:bg-black/30" />
                      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
                          <PlayIcon className="text-orange" width={18} height={18} />
                        </div>
                      </div>
                    </>
                  ) : (
                    // The "wide" tile spans the full grid width at a single 150px row height —
                    // much shorter/wider than the source photos, so object-cover only ever shows
                    // a ~37% vertical slice of the frame. A pure top anchor (0%) crops right at
                    // the hairline with no headroom; 25% leaves a little breathing room above the
                    // faces and lets the crop continue down through the shoulders.
                    <MediaSlot
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 960px) 50vw, 25vw"
                      className={image.span === "wide" ? "object-[50%_25%]" : undefined}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewImage.alt || "Video"} preview`}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-modal-backdrop p-6 backdrop-blur-md"
        >
          <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-[900px]">
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10.5 w-10.5 items-center justify-center rounded-full border border-border-22 bg-glass-10 text-white outline-none"
            >
              <CloseIcon />
            </button>
            <div ref={setModalVideoContainer} className="relative aspect-video overflow-hidden rounded-xl bg-ink" />
          </div>
        </div>
      )}
    </section>
  );
}
