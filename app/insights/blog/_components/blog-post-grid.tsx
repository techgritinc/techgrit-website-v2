import Image from "next/image";
import { GlassCard, GlassCardDescription, GlassCardTitle } from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import MediaSlot from "@/components/ui/MediaSlot";
import { ACCENT_VAR, accentMix, categoryAccent } from "@/lib/accent";
import type { BlogPost } from "../_data/types";
import { CardLink } from "@/components/ui/CardLink";


export function BlogPostGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-11 pb-tg-21">
        <div className="grid grid-cols-3 gap-6 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
          {posts.map((post) => {
            const accent = categoryAccent(post.categorySlug);
            return (
              <CardLink key={post.id} href={post.href} style={{ display: "contents" }}>
                <GlassCard variant="blogCard" hoverBorderColor="" className="flex flex-col">
                  <div className="relative flex h-[140px] shrink-0 items-end overflow-hidden border-b border-border-8 p-4">
                    {post.image ? (
                      <>
                        <Image
                          src={post.image.url}
                          alt={post.image.alternativeText}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(150deg, ${accentMix(accent, 35)}, var(--color-ink-glass-35))`,
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -top-10 -right-[30px] size-tg-180 rounded-full blur-glow"
                          style={{ background: accentMix(accent, 24) }}
                        />
                      </>
                    ) : (
                      <MediaSlot src={null} alt={post.title} fill />
                    )}
                    <Badge
                      tone="accent"
                      className="relative !gap-[7px] !px-[12px] !py-[6px] !text-[11px] !font-bold !tracking-[0.1em] leading-[normal]"
                      style={{
                        color: "var(--color-text-primary)",
                        background: accentMix(accent, 32),
                        borderColor: accentMix(accent, 50),
                      }}
                    >
                      {post.topic}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pt-6 pb-[26px]">
                    <GlassCardTitle
                      variant="blogCard"
                      title={post.title}
                      className="!mt-0 leading-[1.32] tracking-[normal]"
                    >
                      {post.title}
                    </GlassCardTitle>
                    <div className="flex-1">
                      <GlassCardDescription
                        variant="blogCard"
                        title={post.excerpt}
                        className="text-muted"
                      >
                        {post.excerpt}
                      </GlassCardDescription>
                    </div>
                    <div className="mt-[20px] flex items-center gap-tg-3a border-t border-border-8 pt-4">
                      <div
                        className="leading-[normal] flex size-tg-14 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold text-badge-text"
                        style={{ background: `linear-gradient(135deg, ${ACCENT_VAR[accent]}, ${accentMix(accent, 60)})` }}
                      >
                        {post.author.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[13.5px] font-bold text-primary leading-[normal]">
                          {post.author.name}
                        </div>
                        <div className="text-[12.5px] text-dim leading-[normal]">
                          {post.publishDate}
                          {post.publishDate && post.readTime && " · "}
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </CardLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
