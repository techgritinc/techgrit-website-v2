import Button from "@/components/ui/Button";
import { GlassCard, GlassCardDescription, GlassCardTitle } from "@/components/ui/GlassCard";
import MediaSlot from "@/components/ui/MediaSlot";
import type { BlogSectionData } from "@/cms/api/home/blog-section";

// Cycled by index so any number of CMS posts still get one of the 3 reference
// header treatments — the homepage always renders 3 teaser cards in practice.
const VARIANTS = [
  { topicColorClass: "text-amber-light", headerGradientClass: "bg-[image:var(--gradient-blog-teaser-orange)]", hoverShadowClass: "hover:shadow-blog-teaser-orange-hover", restShadowClass: "shadow-blog-teaser-orange" },
  { topicColorClass: "text-blue-light", headerGradientClass: "bg-[image:var(--gradient-blog-teaser-blue)]", hoverShadowClass: "hover:shadow-blog-teaser-blue-hover", restShadowClass: "shadow-blog-teaser-blue" },
  { topicColorClass: "text-teal-light", headerGradientClass: "bg-[image:var(--gradient-blog-teaser-teal)]", hoverShadowClass: "hover:shadow-blog-teaser-teal-hover", restShadowClass: "shadow-blog-teaser-teal" },
];

export default function BlogSection({ data }: { data: BlogSectionData }) {
  const { badgeLabel, title, viewAllLabel, viewAllLink, posts } = data;

  return (
    <section id="blog" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-21 pb-20">
        <div className="mb-tg-15 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-2xs leading-[normal] font-bold tracking-widest text-orange uppercase">{badgeLabel}</div>
            <h2 className="mt-3.5 max-w-[560px] text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.06] tracking-[-0.03em] text-white">
              {title}
            </h2>
          </div>
          <Button href={viewAllLink} variant="ghost" className="px-tg-9! py-tg-5a! min-h-tg-19a! text-[15px] leading-[normal]">
            {viewAllLabel} <span aria-hidden="true" className="text-orange text-[16px]">&rarr;</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {posts.map((post, index) => {
            const variant = VARIANTS[index % VARIANTS.length];
            return (
              <a key={post.id} href={post.ctaLink}>
                <GlassCard
                  variant="blogTeaser"
                  hoverBorderColor=""
                  className={`${variant.hoverShadowClass} ${variant.restShadowClass}`}
                >
                  <div className={`relative flex h-[190px] items-center justify-center overflow-hidden ${variant.headerGradientClass}`}>
                    <MediaSlot src={post.image?.url ?? null} alt={post.image?.alt ?? post.title} fill sizes="(min-width: 960px) 33vw, 100vw" />
                  </div>
                  <div className="pt-tg-10 px-tg-11 pb-tg-12">
                    <div className="flex items-center gap-tg-3 text-blog-meta font-bold tracking-blog-meta uppercase leading-[normal]">
                      <span className={variant.topicColorClass}>{post.topic}</span>
                    </div>
                    <GlassCardTitle variant="blogTeaser" title={post.title}>{post.title}</GlassCardTitle>
                    <GlassCardDescription variant="blogTeaser" title={post.excerpt}>{post.excerpt}</GlassCardDescription>
                    <div className={`mt-tg-6 inline-flex items-center gap-tg-1b text-[14px] leading-[normal] font-bold ${variant.topicColorClass}`}>
                      {post.ctaLabel} <span aria-hidden="true">&rarr;</span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
