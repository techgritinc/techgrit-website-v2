import { GlassCard, GlassCardDescription, GlassCardTitle } from "@/components/ui/GlassCard";
import { NetworkNodeIcon } from "@/components/ui/icons";
import type { FeaturedPost as FeaturedPostContent } from "../_data/types";

export function FeaturedPost({ post }: { post: FeaturedPostContent }) {
  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-11 pb-tg-4">
        <a href={post.href} style={{ display: "contents" }}>
          <GlassCard
            variant="blogFeatured"
            hoverBorderColor=""
            className="grid grid-cols-[1.05fr_0.95fr] items-stretch max-tg-md:grid-cols-1"
          >
            <div className="flex flex-col justify-center gap-4 py-12 px-11 leading-[normal]">
              <span className="self-start inline-flex items-center gap-2 rounded-full bg-overlay-orange px-3 py-1.5 text-12 font-bold tracking-wider text-amber-light uppercase">
                {post.topic}
              </span>
              <GlassCardTitle variant="blogFeatured" className="!mt-0 leading-[var(--lh-snug)]">
                {post.title}
              </GlassCardTitle>
              <GlassCardDescription variant="blogFeatured" className="!mt-0">
                {post.excerpt}
              </GlassCardDescription>
              <div className="mt-2 flex items-center gap-3.5">
                <div className="flex size-tg-42 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-xs font-bold text-primary leading-[normal]">
                  {post.author.initials}
                </div>
                <div className="leading-[normal]">
                  <div className="text-[14.5px] leading-[normal] font-bold text-primary">{post.author.name}</div>
                  <div className="text-[13px] leading-[normal] text-muted">
                    {post.author.role} &middot; {post.readTime}
                  </div>
                </div>
              </div>
              <span className="mt-2 inline-flex w-fit items-center gap-2 text-[15px] font-bold text-amber-light">
                {post.ctaLabel} <span aria-hidden="true" className="text-[17px]">&rarr;</span>
              </span>
            </div>

            <div className="relative flex min-h-tg-320 items-center justify-center overflow-hidden bg-[image:var(--gradient-blog-featured)]">
              <div
                aria-hidden="true"
                className="absolute size-tg-300 rounded-full bg-overlay-orange-22 blur-glow-md"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 [background-image:radial-gradient(var(--color-glass-strong)_1px,transparent_1.5px)] [background-size:22px_22px]"
              />
              <NetworkNodeIcon className="relative" />
            </div>
          </GlassCard>
        </a>
      </div>
    </section>
  );
}
