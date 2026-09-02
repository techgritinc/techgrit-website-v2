"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { CloseIcon, PlayIcon } from "@/components/ui/icons";
import { DEFAULT_CULTURE_GALLERY_DATA } from "@/cms/api/home/culture-gallery";

export interface LifeGalleryImage {
  /** Stable, content-independent identity for keying `.map()` renders (Principle III). */
  id: string;
  src: string | null;
  alt: string;
  type?: "image" | "video";
}

interface LifeGalleryProps {
  id?: string;
  heading?: string;
  description?: string;
  /** Defaults to the shared static eyebrow text (Home/Careers aren't CMS-driven yet); About passes the CMS's own badgeLabel. */
  eyebrow?: string;
  /** Defaults to the shared static photo set (Home/Careers aren't CMS-driven yet); About passes its own CMS-sourced photos. */
  // images?: LifeGalleryImage[];
  /** Home-only "Explore Careers" / "Meet the team" navigation row — Careers and About don't render it. */
  showActions?: boolean;
  /** CMS-driven overrides — Careers/About omit these and keep the static defaults below. */
  images?: LifeGalleryImage[];
  primaryBtnLabel?: string;
  primaryBtnLink?: string;
  secondaryBtnLabel?: string;
  secondaryBtnLink?: string;
  /** Home-only: show just the video item (dropping the photos), centered instead of
   * the full grid. Careers/About don't pass this and keep the unfiltered photo+video grid. */
  videoOnly?: boolean;
}

/** One shared "Life at TechGrit" section — identical grid on Home, Careers, and About; the eyebrow/photos default to a static set but can be overridden by CMS-sourced data. */
export default function LifeGallery({
  id,
  heading = "Life at TechGrit.",
  description = "The people and the culture behind the engineering.",
  eyebrow = "Inside TechGrit",
  // images = CULTURE_GALLERY_IMAGES,
  showActions = false,
  images = DEFAULT_CULTURE_GALLERY_DATA.images,
  primaryBtnLabel = DEFAULT_CULTURE_GALLERY_DATA.primaryBtn.label,
  primaryBtnLink = DEFAULT_CULTURE_GALLERY_DATA.primaryBtn.href,
  secondaryBtnLabel = DEFAULT_CULTURE_GALLERY_DATA.secondaryBtn.label,
  secondaryBtnLink = DEFAULT_CULTURE_GALLERY_DATA.secondaryBtn.href,
  videoOnly = false,
}: LifeGalleryProps) {
  const displayImages = videoOnly ? images.filter((item) => item.type === "video") : images;
  const [previewItem, setPreviewItem] = useState<LifeGalleryImage | null>(null);

  useEffect(() => {
    if (!previewItem) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPreviewItem(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [previewItem]);

  return (
    <section id={id} className="relative scroll-mt-[96px]">
      <div className="mx-auto max-w-(--container-max) px-9 pt-[60px] pb-[80px] leading-normal" data-reveal>
        <div className="mx-auto mb-11 max-w-[680px] text-center">
          <SectionEyebrow showAccent={false} className="leading-normal !mb-[17px]">
            {eyebrow}
          </SectionEyebrow>
          <h2 className="font-display text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            {heading}
          </h2>
          <p className="mx-auto mt-4 text-[17px] leading-[1.6] text-muted">{description}</p>
        </div>

        <div
          className={videoOnly ? "flex justify-center" : "grid grid-cols-4 gap-4 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1"}
          data-gallery
        >
          {displayImages.map((item) => {
            const isVideo = item.type === "video";
            return (
              <figure
                key={item.id}
                onClick={isVideo ? () => setPreviewItem(item) : undefined}
                onKeyDown={
                  isVideo
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setPreviewItem(item);
                        }
                      }
                    : undefined
                }
                role={isVideo ? "button" : undefined}
                tabIndex={isVideo ? 0 : undefined}
                aria-label={isVideo ? `Play ${item.alt || "video"} with sound` : undefined}
                className={[
                  "relative m-0 overflow-hidden rounded-xl border border-border-8 bg-glass-3 transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1",
                  isVideo ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange" : "",
                  // The video's own source footage is 16:9 — matching that (instead of the
                  // photos' 3:4 portrait crop) keeps its full frame in view on first render,
                  // including the logo watermark in the bottom-left corner.
                  videoOnly ? "w-full max-w-[520px] aspect-video" : "aspect-[3/4]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {isVideo ? (
                  <>
                    <video
                      src={item.src ?? undefined}
                      aria-hidden="true"
                      // object-contain instead of object-cover for the video-only tile: cropping
                      // to fill the box (whatever its aspect ratio) cuts into either the corner
                      // logo or people's faces depending on which edge gets clipped — showing
                      // the full, uncropped frame is the only way to keep both in view.
                      className={`absolute inset-0 h-full w-full ${videoOnly ? "object-contain" : "object-cover"}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-black/15 transition-colors duration-200 hover:bg-black/30" />
                    <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
                        <PlayIcon className="text-orange" width={18} height={18} />
                      </div>
                    </div>
                  </>
                ) : (
                  <MediaSlot src={item.src} alt={item.alt} fill sizes="(max-width: 960px) 50vw, 25vw" />
                )}
              </figure>
            );
          })}
        </div>

        {showActions && (
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryBtnLink} size="md" className="leading-normal text-[15.5px] px-[27px] py-[16px]">
              {primaryBtnLabel} <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href={secondaryBtnLink} variant="ghost" size="md" className="leading-normal text-[16px] px-[27px] py-[15.5px]">
              {secondaryBtnLabel}{" "}
              <span aria-hidden="true" className="text-orange">
                &rarr;
              </span>
            </Button>
          </div>
        )}
      </div>

      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewItem.alt || "Video"} preview`}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-modal-backdrop p-6 backdrop-blur-md"
        >
          <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-[900px]">
            <button
              type="button"
              onClick={() => setPreviewItem(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10.5 w-10.5 items-center justify-center rounded-full border border-border-22 bg-glass-10 text-white outline-none"
            >
              <CloseIcon />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
              <video src={previewItem.src ?? undefined} controls autoPlay className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
