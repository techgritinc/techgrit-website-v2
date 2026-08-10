import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { CULTURE_GALLERY_IMAGES } from "./home-data";

export interface LifeGalleryImage {
  /** Stable, content-independent identity for keying `.map()` renders (Principle III). */
  id?: string;
  src: string;
  alt: string;
  span: "tall" | "wide" | "default" | "wide3";
  /** Category label shown in the tile's hover-caption overlay (e.g. "The team"). */
  captionLabel?: string;
  /** Caption sentence paired with `captionLabel` in the tile's hover-caption overlay. */
  caption?: string;
}

interface LifeGalleryProps {
  id?: string;
  variant?: "home" | "careers";
  heading?: string;
  description?: string;
  images?: LifeGalleryImage[];
  /** Accepted for backward compatibility with existing callers (e.g. Careers' `columns={4}`); both variants render a fixed 4-column grid, so this prop no longer affects rendering. */
  columns?: 3 | 4;
}

export default function LifeGallery({
  id,
  variant = "home",
  heading = "Life at TechGrit.",
  description = "The people and the culture behind the engineering.",
  images = CULTURE_GALLERY_IMAGES,
}: LifeGalleryProps) {
  return (
    <section id={id} className="relative scroll-mt-[96px]">
      <div
        className={`mx-auto max-w-(--container-max) px-9 leading-normal ${
          variant === "careers" ? "pt-[80px] pb-[80px]" : "pt-[60px] pb-[80px]"
        }`}
        data-reveal
      >
        {variant === "home" ? (
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <SectionEyebrow showAccent={false} className="leading-[normal] !mb-[17px]">Inside TechGrit</SectionEyebrow>
            <h2 className="font-display text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heading}
            </h2>
            <p className="mx-auto mt-4 text-[17px] leading-[1.6] text-muted">{description}</p>
          </div>
        ) : (
          <div className="mx-auto mb-[44px] max-w-[720px] text-center">
            <div className="mb-[14px] text-[12.5px] font-bold tracking-[0.16em] text-orange uppercase">
              Inside TechGrit
            </div>
            <h2 className="font-body text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heading}
            </h2>
            <p className="mx-auto mt-[16px] text-[17px] leading-[1.6] text-text-66">
              {description}
            </p>
          </div>
        )}

        {variant === "home" ? (
          <div
            className="grid grid-cols-4 gap-[16px] max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1"
            data-gallery
          >
            {images.map((item) => (
              <figure
                key={item.id}
                className="group relative m-0 aspect-[3/4] overflow-hidden rounded-xl border border-border-8 bg-glass-3 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-[4px] hover:border-hover-orange-border-40"
              >
                <MediaSlot
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 960px) 50vw, 25vw"
                />
                {/* <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1.5 bg-[image:var(--gradient-life-cap)] px-tg-7 pt-tg-9 pb-tg-7 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-1 text-11 font-bold tracking-life-cap text-amber-light uppercase">
                    {item.captionLabel}
                  </div>
                  <p className="text-xs font-semibold leading-[1.35] text-white">{item.caption}</p>
                </figcaption> */}
              </figure>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-4 gap-[16px] max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1"
            data-gallery
          >
            {images.map((item, index) => {
              let sizes = "(max-width: 960px) 50vw, 33vw";
              if (item.span === "wide3") sizes = "(max-width: 960px) 100vw, 75vw";
              else if (item.span === "wide") sizes = "(max-width: 960px) 100vw, 50vw";

              return (
                <figure
                  key={`${item.src}-${index}`}
                  className="group relative m-0 block aspect-[3/4] overflow-hidden rounded-xl border border-border-8 bg-glass-3 transition-[transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transition-property:transform,border-color] hover:-translate-y-[4px]"
                >
                  <MediaSlot src={item.src} alt={item.alt} fill sizes={sizes} />
                  {item.captionLabel && item.caption && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 translate-y-[6px] px-[18px] pt-[22px] pb-[18px] opacity-0 transition-[opacity,transform] duration-300 ease-[ease] group-hover:translate-y-0"
                    >
                      {/* <div className="mb-[4px] text-[11px] font-bold tracking-[0.14em] text-[#F7B733] uppercase">
                        {item.captionLabel}
                      </div> */}
                      {/* <figcaption className="text-[14px] font-semibold leading-[1.35] text-white">
                        {item.caption}
                      </figcaption> */}
                    </div>
                  )}
                </figure>
              );
            })}
          </div>
        )}

        {variant === "home" && (
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Button href="/careers" size="md" className="leading-[normal] text-[15.5px] px-[27px] py-[16px]">
              Explore Careers <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href="/about" variant="ghost" size="md" className="leading-[normal] text-[16px] px-[27px] py-[15.5px]">
              Meet the team{" "}
              <span aria-hidden="true" className="text-orange">
                &rarr;
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
