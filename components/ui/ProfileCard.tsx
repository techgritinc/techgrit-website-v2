import Image from "next/image";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { LinkedInIcon } from "@/components/ui/icons";
import type { LeaderProfile } from "@/cms/types/leadership-types";

export default function ProfileCard({ profile }: { profile: LeaderProfile }) {
  return (
    <GlassCard
      variant="leaderProfile"
      hoverBorderColor="hover:border-[var(--color-border-orange-medium)]"
      className="h-full"
    >
      <div className="relative mb-6.5 h-27.5 w-27.5 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-hover-orange-border-40)]">
        {profile.image ? (
          <Image
            src={profile.image.url}
            alt={profile.image.alternativeText || profile.name}
            fill
            sizes="110px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="text-11 leading-[normal] font-extrabold tracking-hint text-orange uppercase">{profile.role}</div>
      <GlassCardTitle variant="leaderProfile" className="mt-2.5">
        {profile.name}
      </GlassCardTitle>
      <GlassCardDescription variant="leaderProfile">{profile.bio}</GlassCardDescription>
      {profile.linkedInUrl ? (
        <div className="mt-auto pt-5">
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.75 rounded-30 border border-border-14 bg-glass-4 px-3.5 py-2 text-2xs leading-[normal] font-bold tracking-normal text-60 transition-colors duration-200 hover:border-[var(--color-border-orange-medium)] hover:bg-[var(--color-overlay-orange-08)] hover:text-white focus-visible:border-[var(--color-border-orange-medium)] focus-visible:bg-[var(--color-overlay-orange-08)] focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange)]"
          >
            <LinkedInIcon width={14} height={14} />
            LinkedIn
          </a>
        </div>
      ) : null}
    </GlassCard>
  );
}
