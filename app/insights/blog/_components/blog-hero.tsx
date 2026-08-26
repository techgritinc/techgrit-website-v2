import type { BlogHeroContent } from "../_data/types";

export function BlogHero({ content }: { content: BlogHeroContent }) {
  const highlightIndex = content.heading.lastIndexOf(content.headingHighlight);
  const before = content.heading.slice(0, highlightIndex);

  return (
    <section>
      <div className="mx-auto max-w-tg-blog-hero px-9 pt-tg-22 pb-tg-11 text-center">
        <div className="opacity-0 [animation-delay:0.05s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mb-tg-11 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-glass px-4 py-2 leading-[normal]">
          <span className="text-[12.5px] font-bold tracking-wider text-strong uppercase">
            {content.eyebrow}
          </span>
        </div>
        <h1 className="opacity-0 [animation-delay:0.12s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 text-[length:var(--text-blog-hero)] leading-[1.04] tracking-[-0.035em]">
          {before}
          <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">
            {content.headingHighlight}
          </span>
        </h1>
        <p className="opacity-0 [animation-delay:0.2s] animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100 mx-auto mt-tg-9 max-w-tg-blog-lead text-[18px] leading-[29.7px] text-secondary">
          {content.lead}
        </p>
      </div>
    </section>
  );
}
