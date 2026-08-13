import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { CULTURE_GALLERY_IMAGES } from "./home-data";

export interface LifeGalleryImage {
  /** Stable, content-independent identity for keying `.map()` renders (Principle III). */
  id: string;
  src: string | null;
  alt: string;
}

interface LifeGalleryProps {
  id?: string;
  heading?: string;
  description?: string;
  /** Home-only "Explore Careers" / "Meet the team" navigation row — Careers and About don't render it. */
  showActions?: boolean;
}

/** One shared "Life at TechGrit" section — identical grid and photo set on Home, Careers, and About. */
export default function LifeGallery({
  id,
  heading = "Life at TechGrit.",
  description = "The people and the culture behind the engineering.",
  showActions = false,
}: LifeGalleryProps) {
  return (
    <section id={id} className="relative scroll-mt-[96px]">
      <div className="mx-auto max-w-(--container-max) px-9 pt-[60px] pb-[80px] leading-normal" data-reveal>
        <div className="mx-auto mb-11 max-w-[680px] text-center">
          <SectionEyebrow showAccent={false} className="leading-normal !mb-[17px]">
            Inside TechGrit
          </SectionEyebrow>
          <h2 className="font-display text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            {heading}
          </h2>
          <p className="mx-auto mt-4 text-[17px] leading-[1.6] text-muted">{description}</p>
        </div>

        <div className="grid grid-cols-4 gap-4 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1" data-gallery>
          {CULTURE_GALLERY_IMAGES.map((item) => (
            <figure
              key={item.id}
              className="relative m-0 aspect-[3/4] overflow-hidden rounded-xl border border-border-8 bg-glass-3  transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1"
            >
              <MediaSlot src={item.src} alt={item.alt} fill sizes="(max-width: 960px) 50vw, 25vw" />
            </figure>
          ))}
        </div>

        {showActions && (
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Button href="/careers" size="md" className="leading-normal text-[15.5px] px-[27px] py-[16px]">
              Explore Careers <span aria-hidden="true">&rarr;</span>
            </Button>
            <Button href="/about" variant="ghost" size="md" className="leading-normal text-[16px] px-[27px] py-[15.5px]">
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
 