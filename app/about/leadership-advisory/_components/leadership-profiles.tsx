import ProfileCard from "@/components/ui/ProfileCard";
import type { LeaderProfile } from "@/cms/types/leadership-types";

export function LeadershipProfiles({ profiles }: { profiles: LeaderProfile[] }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 py-15">
        <div className="grid grid-cols-3 gap-7 max-tg-md:mx-auto max-tg-md:max-w-[480px] max-tg-md:grid-cols-1">
          {profiles.map((profile) => (
            <ProfileCard key={profile.order} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
