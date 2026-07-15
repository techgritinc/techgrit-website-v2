import MediaSlot from "@/components/ui/MediaSlot";
import { CULTURE_GALLERY_IMAGES } from "./home-data";

const SPAN_CLASSES: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  default: "",
};

export default function LifeGallery() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-(--container-max) px-9 pt-7.5 pb-22.5">
        <div className="mx-auto mb-11 max-w-[680px] text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-[2px] w-6 bg-orange" />
            <span className="text-[12.5px] font-bold tracking-widest text-orange uppercase">Inside TechGrit</span>
          </div>
          <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.1]">Life at TechGrit.</h2>
          <p className="mx-auto mt-4 text-lg leading-[1.6] text-muted">
            The people and the culture behind the engineering.
          </p>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr_1fr] grid-rows-[repeat(2,200px)] gap-4.5 max-tg-md:grid-cols-2">
          {CULTURE_GALLERY_IMAGES.map((item) => (
            <div key={item.image?.src ?? item.span} className={`relative overflow-hidden rounded-xl ${SPAN_CLASSES[item.span]}`}>
              <MediaSlot
                src={item.image?.src}
                alt={item.image?.alt ?? "TechGrit team"}
                fill
                sizes="(max-width: 960px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
