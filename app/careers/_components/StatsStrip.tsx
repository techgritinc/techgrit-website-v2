import type { Stat } from "@/cms/types/careers-types";

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 py-5">
        <div className="grid grid-cols-4 gap-[18px] border-t border-b border-border-image py-[30px] max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[36px] font-bold leading-[normal] text-amber-light">{stat.value}</div>
              <div className="mt-1 text-[14px] leading-[normal] text-text-60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
