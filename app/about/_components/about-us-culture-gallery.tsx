import LifeGallery, { type LifeGalleryImage } from "@/app/_home-components/LifeGallery";
import type { CultureGallerySection } from "../_data/types";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutUsCultureGallery({ section }: { section: CultureGallerySection }) {
  const images: LifeGalleryImage[] = section.photos.map((photo) => ({
    src: photo.image?.url ?? null,
    alt: photo.image?.alternativeText ?? "",
    span: "default",
    captionLabel: photo.captionLabel,
    caption: photo.caption,
  }));

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-[36px] py-[80px]">
        <div className="mx-auto mb-[50px] max-w-[680px] text-center">
          <SectionEyebrow showAccent={false} className="mb-4 justify-center">
            {section.eyebrow}
          </SectionEyebrow>
          <h2 className="text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            {section.title}
          </h2>
          <p className="mx-auto mt-[16px] text-[17px] leading-[1.6] text-white/66">
            {section.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-[16px] max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
          {section.photos.map((photo, i) => (
            <figure
              key={i}
              className="group relative m-0 aspect-[3/4] overflow-hidden rounded-[18px] border border-white/10 bg-white/5 transition-all duration-[300ms] ease-[cubic-bezier(.2,.7,.2,1)]"
            >
              {photo.image?.url && (
                <img
                  src={photo.image.url}
                  alt={photo.image.alternativeText || "Team photo"}
                  className="block h-full w-full object-cover"
                />
              )}
              <div
                className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))] p-[22px_18px_18px] opacity-0 transition-all duration-[300ms] ease-out translate-y-[6px] group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="mb-[4px] text-[11px] font-bold uppercase tracking-[0.14em] text-amber-light">
                  {photo.captionLabel}
                </div>
                <figcaption className="text-[14px] font-semibold leading-[1.35] text-white">
                  {photo.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
