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
    <div className="group flex flex-col items-start justify-between gap-3.5 rounded-[16px] border border-border-image bg-glass-4 px-[26px] py-[22px] transition-[transform,border-color] duration-200 ease-[ease] hover:translate-x-[5px] md:flex-row md:items-center md:gap-5">
      <div className="flex items-center gap-[18px]">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${ACCENT_CLASSES[role.accent]}`} />
        <div>
          <h3 className="text-[18.5px] font-bold leading-[normal] tracking-[0] text-primary">{role.title}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-3.5 text-[13.5px] text-text-60">
            <span className="inline-flex items-center gap-1.5 capitalize">{role.department}</span>
            <span className="inline-flex items-center gap-1.5">
              <LocationIcon />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon width="14" height="14" />
              {role.type}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="md"
        onClick={() => onApply(role)}
        className="!rounded-[11px] !bg-glass-strong !px-5 !py-3 !text-[14.5px] hover:!border-orange hover:!bg-overlay-orange-12"
      >
        Apply <span className="text-amber-light">&#8594;</span>
      </Button>
    </div>
  );
}
