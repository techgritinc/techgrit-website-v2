import { LightningIcon, BookIcon, HomeIcon, HeartIcon, BarChartIcon, UsersIcon } from "@/components/ui/icons";
import type { Benefit, BenefitIconName } from "../_data/careers-data";

const ICON_COMPONENTS: Record<BenefitIconName, (props: { className?: string }) => React.JSX.Element> = {
  lightning: LightningIcon,
  book: BookIcon,
  home: HomeIcon,
  heart: HeartIcon,
  barChart: BarChartIcon,
  users: UsersIcon,
};

const ICON_ACCENT_CLASSES: Record<BenefitIconName, { bg: string; border: string; text: string }> = {
  lightning: { bg: "bg-overlay-orange-12", border: "border-border-orange-30", text: "text-amber-light" },
  book: { bg: "bg-overlay-blue", border: "border-border-blue-light-30", text: "text-blue-light" },
  home: { bg: "bg-overlay-teal-light-12", border: "border-border-teal-light-30", text: "text-teal-light" },
  heart: { bg: "bg-overlay-amber-12", border: "border-border-amber-30", text: "text-yellow" },
  barChart: { bg: "bg-overlay-orange-12", border: "border-border-orange-30", text: "text-amber-light" },
  users: { bg: "bg-overlay-blue", border: "border-border-blue-light-30", text: "text-blue-light" },
};

export function WhyJoinSection({ heading, benefits }: { heading: string; benefits: Benefit[] }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 pt-14 pb-[30px]">
        <h2 className="max-w-[680px] text-[clamp(28px,3.4vw,40px)] font-bold leading-[normal] tracking-[-0.03em]">{heading}</h2>

        <div className="mt-[34px] grid grid-cols-3 gap-5 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
          {benefits.map((benefit) => {
            const Icon = ICON_COMPONENTS[benefit.icon];
            const accent = ICON_ACCENT_CLASSES[benefit.icon];

            return (
              <div
                key={benefit.title}
                className="rounded-[18px] border border-border-image bg-glass-4 p-[28px_26px]"
              >
                <div
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-[12px] border ${accent.bg} ${accent.border} ${accent.text}`}
                >
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mt-4 text-[18.5px] font-bold leading-[normal] tracking-[0] text-primary">{benefit.title}</h3>
                <p className="mt-[9px] text-[14.5px] leading-[1.6] text-60">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
