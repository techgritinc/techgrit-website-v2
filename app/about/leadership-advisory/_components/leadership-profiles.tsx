import ProfileCard from "@/components/ui/ProfileCard";
import type { LeaderProfile } from "@/cms/types/leadership-types";

export function LeadershipProfiles({
  title,
  subtitle,
  profiles,
}: {
  title?: string;
  subtitle?: string;
  profiles: LeaderProfile[];
}) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 py-15">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {title}
            </h2>
            {subtitle && <p className="mt-3.5 text-base leading-[1.55] text-60">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-3 gap-7 max-tg-md:mx-auto max-tg-md:max-w-[480px] max-tg-md:grid-cols-1">
          {profiles.map((profile) => (
            <ProfileCard key={profile.order} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
