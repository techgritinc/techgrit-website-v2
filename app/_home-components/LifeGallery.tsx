import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import { CULTURE_GALLERY_IMAGES } from "./home-data";

export interface LifeGalleryImage {
  src: string;
  alt: string;
  span: "tall" | "wide" | "default" | "wide3";
  /** Careers-only hover-caption category label (e.g. "The team"). Left `undefined` for `home`. */
  captionLabel?: string;
  /** Careers-only hover-caption text paired with `captionLabel`. Left `undefined` for `home`. */
  caption?: string;
}

const SPAN_CLASSES: Record<LifeGalleryImage["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  wide3: "col-span-3",
  default: "",
};

interface LifeGalleryProps {
  id?: string;
  variant?: "home" | "careers";
  heading?: string;
  description?: string;
  images?: LifeGalleryImage[];
  columns?: 3 | 4;
}

export default function LifeGallery({
  id,
  variant = "home",
  heading = "Life at TechGrit.",
  description = "The people and the culture behind the engineering.",
  images = CULTURE_GALLERY_IMAGES,
  columns = 3,
}: LifeGalleryProps) {
  const gridColsClass = columns === 4 ? "grid-cols-4" : "grid-cols-[1.4fr_1fr_1fr]";
  const cellRadiusClass = variant === "careers" ? "rounded-[20px]" : "rounded-xl";

  return (
    <section id={id} className="relative scroll-mt-[96px]">
      <div
        className={`mx-auto max-w-[1280px] px-[36px] leading-normal ${
          variant === "careers" ? "pt-[80px] pb-[80px]" : "pt-7.5 pb-22.5 "
        }`}
        data-reveal
      >
        {variant === "home" ? (
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-6 bg-orange" />
              <span className="text-[12.5px] font-bold tracking-widest text-orange uppercase">
                Inside TechGrit
              </span>
            </div>
            <h2 className="font-display text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heading}
            </h2>
            <p className="mx-auto mt-4 text-[17px] leading-[1.6] text-muted">{description}</p>
          </div>
        ) : (
          <div className="mx-auto mb-[44px] max-w-[720px] text-center">
            <div className="mb-[14px] text-[12.5px] font-bold tracking-[0.16em] text-[#E87722] uppercase">
              Inside TechGrit
            </div>
            <h2 className="font-body text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heading}
            </h2>
            <p className="mx-auto mt-[16px] text-[17px] leading-[1.6] text-[rgba(255,255,255,0.66)]">
              {description}
            </p>
          </div>
        )}

        <div
          className={`grid ${
            variant === "careers"
              ? "grid-cols-4 gap-[16px] max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1"
              : `${gridColsClass} gap-[18px] auto-rows-[200px] max-tg-md:auto-rows-[170px] max-tg-md:grid-cols-2`
          }`}
          data-gallery
        >
          {images.map((item, index) => {
            let sizes = "(max-width: 960px) 50vw, 33vw";
            if (item.span === "wide3") sizes = "(max-width: 960px) 100vw, 75vw";
            else if (item.span === "wide") sizes = "(max-width: 960px) 100vw, 50vw";

            return (
              <figure
                key={`${item.src}-${index}`}
                className={`group relative m-0 block overflow-hidden ${
                  variant === "careers"
                    ? "aspect-[3/4] rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] transition-[transform] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transition-property:transform,border-color] hover:-translate-y-[4px]"
                    : `${cellRadiusClass} ${SPAN_CLASSES[item.span]}`
                }`}
              >
                <MediaSlot src={item.src} alt={item.alt} fill sizes={sizes} />
                {variant === "careers" && item.captionLabel && item.caption && (
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

        {variant === "home" && (
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Button href="/careers" size="md">
              Explore Careers <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href="/about" variant="ghost" size="md">
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
