import Image from "next/image";
import type { Benefit, BenefitIconName } from "@/cms/types/careers-types";

// The CMS has no color field for benefits — each chip's accent color is derived from
// `iconName` (itself derived by position, see cms/api/careers.ts), regardless of whether a
// real CMS icon renders inside it.
const ICON_ACCENT_CLASSES: Record<BenefitIconName, { bg: string; border: string; text: string }> = {
  lightning: {
    bg: "bg-overlay-orange-12",
    border: "border-border-orange-30",
    text: "text-amber-light",
  },
  book: { bg: "bg-overlay-blue", border: "border-border-blue-light-30", text: "text-blue-light" },
  home: {
    bg: "bg-overlay-teal-light-12",
    border: "border-border-teal-light-30",
    text: "text-teal-light",
  },
  heart: { bg: "bg-overlay-amber-12", border: "border-border-amber-30", text: "text-yellow" },
  barChart: {
    bg: "bg-overlay-orange-12",
    border: "border-border-orange-30",
    text: "text-amber-light",
  },
  users: { bg: "bg-overlay-blue", border: "border-border-blue-light-30", text: "text-blue-light" },
};

export function WhyJoinSection({ heading, benefits }: { heading: string; benefits: Benefit[] }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 pt-14 pb-[30px]">
        <h2 className="font-body max-w-[680px] text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em] text-white">
          {heading}
        </h2>

        <div className="mt-[34px] grid grid-cols-3 gap-5 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
          {benefits.map((benefit) => {
            const accent = ICON_ACCENT_CLASSES[benefit.iconName];

            return (
              <div
                key={benefit.title}
                className="rounded-[18px] border border-border-image bg-glass-4 p-[28px_26px]"
              >
                <div
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border ${accent.bg} ${accent.border} ${accent.text}`}
                >
                  {benefit.icon && (
                    <Image src={benefit.icon.url} alt={benefit.icon.alt} width={22} height={22} />
                  )}
                </div>
                <h3 className="font-body mt-4 text-[18.5px] font-bold leading-[normal] tracking-[0] text-white">
                  {benefit.title}
                </h3>
                <p className="mt-[9px] text-[14.5px] leading-[1.6] text-text-60">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
