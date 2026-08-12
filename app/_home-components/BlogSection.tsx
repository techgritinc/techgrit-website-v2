import Button from "@/components/ui/Button";
import { GlassCard, GlassCardDescription, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import { CopilotToAgenticIcon, EradicateDebtIcon, InfiniteScalabilityIcon } from "@/components/ui/icons";
import type { IconComponent } from "./home-data";

type BlogTeaserPost = {
  id: string;
  topic: string;
  title: string;
  excerpt: string;
  readTime: string;
  icon: IconComponent;
  topicColorClass: string;
  headerGradientClass: string;
  highlightPositionClass: string;
  hoverBorderColorClass: string;
  hoverShadowClass: string;
  restShadowClass: string;
};

// Content is static and homepage-local — reference-exact per spec.md Clarifications
// (Session 2026-08-06), not a dynamic pull from app/blog/_data/blog-content.ts (which
// has no icon field, no featured/top-3 concept, and only placeholder "#" hrefs).
const BLOG_TEASER_POSTS: BlogTeaserPost[] = [
  {
    id: "ai-first-sdlc",
    topic: "AI-First SDLC",
    title: "From Copilot to Agentic: what changes when AI owns the SDLC.",
    excerpt: "Autonomous agents don't just suggest code — they own entire domains of the software lifecycle.",
    readTime: "6 min read",
    icon: CopilotToAgenticIcon,
    topicColorClass: "text-amber-light",
    headerGradientClass: "bg-[image:var(--gradient-blog-teaser-orange)]",
    highlightPositionClass: "bg-[radial-gradient(circle_at_30%_30%,var(--color-glow-white-18),transparent_55%)]",
    hoverBorderColorClass: "",
    hoverShadowClass: "hover:shadow-blog-teaser-orange-hover",
    restShadowClass: "shadow-blog-teaser-orange",
  },
  {
    id: "sprint-to-scale",
    topic: "Engineering",
    title: "Six weeks to production: what makes the Sprint-to-Scale framework work.",
    excerpt: "A look inside the four-phase framework that turns a prompt into a shipped product.",
    readTime: "8 min read",
    icon: EradicateDebtIcon,
    topicColorClass: "text-blue-light",
    headerGradientClass: "bg-[image:var(--gradient-blog-teaser-blue)]",
    highlightPositionClass: "bg-[radial-gradient(circle_at_70%_30%,var(--color-glow-white-18),transparent_55%)]",
    hoverBorderColorClass: "",
    hoverShadowClass: "hover:shadow-blog-teaser-blue-hover",
    restShadowClass: "shadow-blog-teaser-blue",
  },
  {
    id: "qa-agent",
    topic: "Quality",
    title: "The QA agent: what happens when tests write themselves.",
    excerpt: "Coverage moves from a lagging indicator to a real-time signal when quality is agent-owned.",
    readTime: "5 min read",
    icon: InfiniteScalabilityIcon,
    topicColorClass: "text-teal-light",
    headerGradientClass: "bg-[image:var(--gradient-blog-teaser-teal)]",
    highlightPositionClass: "bg-[radial-gradient(circle_at_50%_30%,var(--color-glow-white-18),transparent_55%)]",
    hoverBorderColorClass: "",
    hoverShadowClass: "hover:shadow-blog-teaser-teal-hover",
    restShadowClass: "shadow-blog-teaser-teal",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-21 pb-20">
        <div className="mb-tg-15 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-2xs leading-[normal] font-bold tracking-widest text-orange uppercase">From the blog</div>
            <h2 className="mt-3.5 max-w-[560px] text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.06] tracking-[-0.03em] text-white">
              Perspectives on AI-first delivery.
            </h2>
          </div>
          <Button href="/blog" variant="ghost" className="px-tg-9! py-tg-5a! min-h-tg-19a! text-[15px] leading-[normal]">
            Visit the blog <span aria-hidden="true" className="text-orange text-[16px]">&rarr;</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {BLOG_TEASER_POSTS.map((post) => {
            const Icon = post.icon;
            return (
              <a key={post.id} href="/blog">
                <GlassCard
                  variant="blogTeaser"
                  hoverBorderColor={post.hoverBorderColorClass}
                  className={`${post.hoverShadowClass} ${post.restShadowClass}`}
                >
                  <div className={`relative flex h-[190px] items-center justify-center overflow-hidden ${post.headerGradientClass}`}>
                    <div aria-hidden="true" className={`absolute inset-0 ${post.highlightPositionClass}`} />
                    <GlassCardIcon variant="blogTeaser" wrapperClassName="relative">
                      <Icon stroke="var(--color-icon-stroke)" strokeWidth={1.6} width={72} height={72} />
                    </GlassCardIcon>
                  </div>
                  <div className="pt-tg-10 px-tg-11 pb-tg-12">
                    <div className="flex items-center gap-tg-3 text-blog-meta font-bold tracking-blog-meta uppercase leading-[normal]">
                      <span className={post.topicColorClass}>{post.topic}</span>
                      <span className="text-35">&middot;</span>
                      <span className="text-55">{post.readTime}</span>
                    </div>
                    <GlassCardTitle variant="blogTeaser">{post.title}</GlassCardTitle>
                    <GlassCardDescription variant="blogTeaser">{post.excerpt}</GlassCardDescription>
                    <div className={`mt-tg-6 inline-flex items-center gap-tg-1b text-[14px] leading-[normal] font-bold ${post.topicColorClass}`}>
                      Read more <span aria-hidden="true">&rarr;</span>
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
