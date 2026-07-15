import Button from "@/components/ui/Button";
import MediaSlot from "@/components/ui/MediaSlot";
import { INDUSTRY_CARDS } from "./home-data";

const ICON_BORDER: Record<string, string> = {
  fintech: "border-[rgba(2,132,199,0.45)]",
  healthcare: "border-[rgba(15,118,110,0.5)]",
  construction: "border-[rgba(245,158,11,0.5)]",
};

const ICON_COLOR: Record<string, string> = {
  fintech: "text-blue-light",
  healthcare: "text-teal-light",
  construction: "text-yellow",
};

export default function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-15 pb-25">
        <div className="flex flex-wrap items-end justify-between gap-7.5">
          <div>
            <h2 className="max-w-[560px] text-[44px] leading-[1.04]">
              Building the Future of Industry Platforms.
            </h2>
            <p className="mt-4 max-w-[540px] text-[17.5px] leading-[1.6] text-muted">
              Our AI-first engineering approach helps organizations modernize infrastructure and unlock innovation
              across key industries.
            </p>
          </div>
          <Button href="/services" variant="ghost">
            Explore Industry Solutions <span aria-hidden="true" className="text-orange">&rarr;</span>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {INDUSTRY_CARDS.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.id}
                className="relative overflow-hidden rounded-[20px] border border-border bg-[rgba(255,255,255,0.04)] backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-[5px]"
              >
                <div className="relative h-[178px] w-full">
                  <MediaSlot
                    src={industry.image?.src}
                    alt={industry.image?.alt ?? industry.title}
                    fill
                    sizes="(max-width: 960px) 100vw, 33vw"
                  />
                  <div
                    className={`absolute bottom-[-22px] left-4.5 flex h-[46px] w-[46px] items-center justify-center rounded-md border bg-ink ${ICON_BORDER[industry.id]}`}
                  >
                    <Icon className={ICON_COLOR[industry.id]} />
                  </div>
                </div>
                <div className="px-7 pt-8.5 pb-7.5">
                  <h3 className="text-[23px]">{industry.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">{industry.description}</p>
                  {industry.href && (
                    <a
                      href={industry.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-yellow"
                    >
                      Explore Construction <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
