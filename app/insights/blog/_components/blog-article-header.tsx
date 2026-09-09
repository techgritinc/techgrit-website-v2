import Link from "next/link";
import type { BlogArticleHeader } from "@/cms/types/blog-detail-types";

export const BLOG_ARTICLE_COLUMN = "mx-auto max-w-[760px]";
export function BlogArticleHeader({ header }: { header: BlogArticleHeader }) {
  const hasMeta = Boolean(header.publishedDate || header.readTime);

  return (
    <header>
      <div className="tg-container pt-[48px] pb-[26px] px-[var(--space-15)]">
        <div className={BLOG_ARTICLE_COLUMN}>
          <Link
            href={header.allPostsUrl}
            data-rise
            className="inline-flex items-center gap-[8px] mb-[30px] text-[14px] font-semibold text-text-faint"
          >
            <span aria-hidden="true">&#8592;</span> {header.allPostsLabel}
          </Link>

          <div data-rise style={{ animationDelay: ".1s" }}>
            {header.categoryLabel ? (
              <span className="text-[var(--text-2xs)] font-bold tracking-[var(--ls-widest)] uppercase text-orange">
                {header.categoryLabel}
              </span>
            ) : null}
            {hasMeta ? (
              <div className="mt-[12px] text-[14px] leading-[1.5] text-text-soft">
                {header.publishedDate}
                {header.publishedDate && header.readTime ? <span aria-hidden="true"> &#183; </span> : null}
                {header.readTime}
              </div>
            ) : null}

            <h1
              className={`${header.categoryLabel || hasMeta ? "mt-[14px]" : ""} text-[clamp(30px,3.6vw,44px)] leading-[1.12] tracking-[-0.03em]`}
            >
              {header.title}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
