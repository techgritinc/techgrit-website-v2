import Button from "@/components/ui/Button";
import { ClockIcon, LocationIcon } from "@/components/ui/icons";
import type { AccentKey, OpenRole } from "../_data/careers-data";

const ACCENT_CLASSES: Record<AccentKey, string> = {
  orange: "bg-orange shadow-glow-role-orange",
  yellow: "bg-yellow shadow-glow-role-yellow",
  teal: "bg-teal-light shadow-glow-role-teal",
  blue: "bg-blue-light shadow-glow-role-blue",
};

export function RoleCard({ role, onApply }: { role: OpenRole; onApply: (role: OpenRole) => void }) {
  return (
    <div className="group flex flex-col items-start justify-between gap-[14px] rounded-[16px] border border-white/10 bg-white/[0.04] px-[26px] py-[22px] transition-[transform,border-color] duration-200 ease-[ease] hover:translate-x-[5px] md:flex-row md:items-center md:gap-[20px] leading-[normal]">
      <div className="flex items-center gap-[18px]">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ACCENT_CLASSES[role.accent]}`} />
        <div>
          <h3 className="font-body text-[18.5px] font-bold leading-[normal] tracking-[0] text-white">
            {role.title}
          </h3>
          <div className="mt-[6px] flex flex-wrap items-center gap-[14px] text-[13.5px] tracking-[0] text-white/60">
            <span className="inline-flex items-center gap-[6px] capitalize">{role.department}</span>
            <span className="inline-flex items-center gap-[6px]">
              <LocationIcon className="leading-[normal]" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <ClockIcon width="14" height="14" />
              {role.type}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => onApply(role)}
        style={{fontFamily:"Arial"}}
        className="!shrink-0 !rounded-[12px] !px-[22px] !py-[12px] !text-[14.5px] !text-white leading-[normal] hover:!border-border-ghost-hover hover:!bg-[image:var(--gradient-ghost-hover)] w-[109.432px] h-[42.8646px]"
      >
        Apply <span className="text-[15px] text-amber-light">&#8594;</span>
      </Button>
    </div>
  );
}
