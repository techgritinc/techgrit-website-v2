"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
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
  /** About-only: instead of the static grid, run the images/video as a continuously
   * auto-scrolling strip that drifts leftward (tgmarquee keyframe). Home/Careers don't
   * pass this and keep the plain grid. */
  autoScroll?: boolean;
}

/** Every video tile (in any of the three layout modes below) is clickable — it opens the
 * shared lightbox so the visitor can watch with sound, rather than fighting the
 * always-muted background loop. Photo tiles are unaffected. */
function GalleryTile({
  item,
  tileKey,
  onPreview,
  aspectClassName = "aspect-[3/4]",
  videoFit = "cover",
  previewPortalTarget,
}: {
  item: LifeGalleryImage;
  /** Identifies this specific tile, distinct from `item.id` when the same item renders
   * more than once (the autoScroll marquee duplicates its list) — without it, opening
   * the preview for one copy would hand the portal target to both simultaneously. */
  tileKey: string;
  onPreview: (item: LifeGalleryImage, tileKey: string) => void;
  aspectClassName?: string;
  videoFit?: "cover" | "contain";
  previewPortalTarget?: HTMLElement | null;
}) {
  const isVideo = item.type === "video";

  return (
    <figure
      onClick={isVideo ? () => onPreview(item, tileKey) : undefined}
      onKeyDown={
        isVideo
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onPreview(item, tileKey);
              }
            }
          : undefined
      }
      role={isVideo ? "button" : undefined}
      tabIndex={isVideo ? 0 : undefined}
      aria-label={isVideo ? `Play ${item.alt || "video"} with sound` : undefined}
      className={[
        "relative m-0 overflow-hidden rounded-xl border border-border-8 bg-glass-3 transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1",
        aspectClassName,
        isVideo ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isVideo ? (
        <>
          <AutoplayVideo
            src={item.src ?? ""}
            className={`absolute inset-0 h-full w-full ${videoFit === "contain" ? "object-contain" : "object-cover"}`}
            previewClassName="h-full w-full"
            portalTarget={previewPortalTarget}
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
  autoScroll = false,
}: LifeGalleryProps) {
  const displayImages = videoOnly ? images.filter((item) => item.type === "video") : images;
  const [previewItem, setPreviewItem] = useState<LifeGalleryImage | null>(null);
  const [previewTileKey, setPreviewTileKey] = useState<string | null>(null);
  const [modalVideoContainer, setModalVideoContainer] = useState<HTMLDivElement | null>(null);

  function openPreview(item: LifeGalleryImage, tileKey: string) {
    setPreviewItem(item);
    setPreviewTileKey(tileKey);
  }

  function closePreview() {
    setPreviewItem(null);
    setPreviewTileKey(null);
  }

  useEffect(() => {
    if (!previewItem) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePreview();
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

        {videoOnly ? (
          <div className="flex justify-center" data-gallery>
            {displayImages.map((item) => (
              <div key={item.id} className="w-full max-w-[520px]">
                <GalleryTile
                  item={item}
                  tileKey={item.id}
                  onPreview={openPreview}
                  aspectClassName="aspect-video"
                  videoFit="contain"
                  previewPortalTarget={previewTileKey === item.id ? modalVideoContainer : undefined}
                />
              </div>
            ))}
          </div>
        ) : autoScroll ? (
          // Duplicating the list once and animating exactly -50% (tgmarquee) creates a
          // seamless infinite loop: the moment the first copy scrolls fully offscreen,
          // the second copy is sitting exactly where the first one started.
          <div className="overflow-hidden" data-gallery>
            <div className="flex w-max gap-4 motion-safe:animate-[tgmarquee_28s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...displayImages, ...displayImages].map((item, index) => (
                <div key={`${item.id}-${index}`} className="w-[220px] shrink-0 max-tg-sm:w-[160px]">
                  <GalleryTile
                    item={item}
                    tileKey={`${item.id}-${index}`}
                    onPreview={openPreview}
                    previewPortalTarget={previewTileKey === `${item.id}-${index}` ? modalVideoContainer : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1" data-gallery>
            {displayImages.map((item) => (
              <GalleryTile
                key={item.id}
                item={item}
                tileKey={item.id}
                onPreview={openPreview}
                previewPortalTarget={previewTileKey === item.id ? modalVideoContainer : undefined}
              />
            ))}
          </div>
        )}

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
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewItem.alt || "Video"} preview`}
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
