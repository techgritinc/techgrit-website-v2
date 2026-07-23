import Link from "next/link";
import type { TeamRole } from "../_data/types";

export function TeamPanel({ team }: { team: TeamRole[] }) {
  const teamSize = team.reduce((total, role) => total + role.count, 0);

  return (
    <aside className="order-first tg-md:sticky tg-md:order-none top-[98px]">
      <div className="bg-glass-faint border border-border-faint rounded-xl px-[22px] py-[24px]">
        <div className="text-[12px] font-bold tracking-[var(--ls-label)] uppercase text-[var(--color-text-dim)] mb-[16px] leading-[normal]">
          The team &middot; {teamSize} at peak
        </div>
        <div className="flex flex-col gap-[9px]">
          {team.map((role) => (
            <div key={role.role} className="flex items-center justify-between text-[14px] leading-[normal]">
              <span className="text-text-role">{role.role}</span>
              <span className="font-display font-bold text-teal-light">
                {role.count}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="flex items-center justify-center mt-[20px] gap-[8px] text-[14.5px] font-bold p-[13px] rounded-md leading-[normal] text-primary"
          style={{ background: "var(--gradient-brand)" }}
        >
          Start a project<span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </aside>
  );
}
