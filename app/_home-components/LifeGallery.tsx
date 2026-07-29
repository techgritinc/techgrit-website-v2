import MediaSlot from "@/components/ui/MediaSlot";
import { CULTURE_GALLERY_IMAGES } from "./home-data";

export interface LifeGalleryImage {
  src: string;
  alt: string;
  span: "tall" | "wide" | "default" | "wide3";
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
    <section id={id} className="relative">
      <div
        className={`mx-auto max-w-(--container-max) px-9 ${
          variant === "careers" ? "pt-[50px] pb-[30px]" : "pt-7.5 pb-22.5"
        }`}
      >
        {variant === "home" ? (
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-6 bg-orange" />
              <span className="text-[12.5px] font-bold tracking-widest text-orange uppercase">Inside TechGrit</span>
            </div>
            <h2 className="font-display text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heading}
            </h2>
            <p className="mx-auto mt-4 text-[17px] leading-[1.6] text-muted">{description}</p>
          </div>
        ) : (
          <>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em]">{heading}</h2>
            <p className="mt-3 max-w-[560px] text-[16.5px] leading-[1.6] text-68">{description}</p>
          </>
        )}

        <div
          className={`grid auto-rows-[200px] ${gridColsClass} ${
            variant === "careers" ? "mt-[30px] gap-4" : "gap-[18px]"
          } ${
            variant === "careers" ? "max-tg-md:auto-rows-[180px]" : "max-tg-md:auto-rows-[170px]"
          } max-tg-md:grid-cols-2`}
        >
          {images.map((item, index) => {
            // Fix blurriness: adjust sizes prop based on the grid span so Next.js serves a high-res image
            let sizes = "(max-width: 960px) 50vw, 33vw";
            if (item.span === "wide3") sizes = "(max-width: 960px) 100vw, 75vw";
            else if (item.span === "wide") sizes = "(max-width: 960px) 100vw, 50vw";
            
            return (
              <div
                key={`${item.src}-${index}`}
                className={`relative overflow-hidden ${cellRadiusClass} ${SPAN_CLASSES[item.span]}`}
              >
                <MediaSlot src={item.src} alt={item.alt} fill sizes={sizes} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
