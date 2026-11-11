import Image from "next/image";
import Button from "@/components/ui/Button";
import type { AccentKey, OpenRole } from "@/cms/types/careers-types";

const ACCENT_CLASSES: Record<AccentKey, string> = {
  orange: "bg-orange shadow-glow-role-orange",
  yellow: "bg-yellow shadow-glow-role-yellow",
  teal: "bg-teal-light shadow-glow-role-teal",
  blue: "bg-blue-light shadow-glow-role-blue",
};

export function RoleCard({ role }: { role: OpenRole }) {
  return (
    <div className="group flex flex-col items-start justify-between gap-[12px] rounded-[16px] border border-white/10 bg-white/[0.04] px-[24px] py-[20px] transition-[transform,border-color] duration-200 ease-[ease] hover:translate-x-[5px] md:flex-row md:items-center md:gap-[20px] leading-[normal]">
      <div className="flex items-center gap-[16px]">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ACCENT_CLASSES[role.accent]}`} />
        <div>
          <h3 className="font-body text-[18px] font-bold leading-[normal] tracking-[0] text-white">
            {role.title}
          </h3>
          <div className="mt-[4px] flex flex-wrap items-center gap-[12px] text-[14px] tracking-[0] text-white/60">
            <span className="inline-flex items-center gap-[4px] capitalize">{role.department}</span>
            <span className="inline-flex items-center gap-[4px]">
              {role.locationIcon && (
                <Image className="tg-icon" src={role.locationIcon.url} alt={role.locationIcon.alt} width={14} height={14} />
              )}
              {role.location}
            </span>
            <span className="inline-flex items-center gap-[4px]">
              {role.clockIcon && (
                <Image className="tg-icon" src={role.clockIcon.url} alt={role.clockIcon.alt} width={14} height={14} />
              )}
              {role.type}
            </span>
          </div>
        </div>
      </div>
      <Button
        href={role.ctaLink}
        variant="ghost"
        className="!shrink-0 !rounded-[12px] !px-[20px] !py-[12px] !text-white leading-[normal]"
      >
        {role.ctaLabel} <span className="text-[14px] text-amber-light">&#8594;</span>
      </Button>
    </div>
  );
}
