import { ArticleCapabilityGrid } from "@/components/ui/ArticleCapabilityGrid";
import { ArticleNarrativeBlock } from "@/components/ui/ArticleNarrative";
import { ArticleResponsibilitySection } from "@/components/ui/ArticleResponsibilitySection";
import { ArticleTechStack } from "@/components/ui/ArticleTechStack";
import { FinalCtaBanner } from "@/components/ui/FinalCtaBanner";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { BlogDetailPageContent } from "@/cms/types/blog-detail-types";
import { BLOG_ARTICLE_COLUMN, BlogArticleHeader } from "./blog-article-header";

/** The blog article body, shared by the public page and the draft /preview page. */
export function BlogDetailView({ content }: { content: BlogDetailPageContent }) {
  const body = content.sections.filter((section) => section?.type !== "finalCta");
  const finalCta = content.sections.find((section) => section?.type === "finalCta");

  return (
    <main>
      <BlogArticleHeader header={content.header} />

      <article>
        <div className="tg-container pt-[10px] pb-[40px] px-[var(--space-15)]">
          <div className={`${BLOG_ARTICLE_COLUMN} flex flex-col gap-[var(--space-19)]`}>
            {body.map((section, index) => (
              <RevealOnScroll key={`${section?.type}-${index}`}>
                {section?.type === "responsibilityList" ? (
                  <ArticleResponsibilitySection section={section} />
                ) : section?.type === "techStack" ? (
                  <ArticleTechStack section={section} />
                ) : section?.type === "capabilityGrid" ? (
                  <ArticleCapabilityGrid section={section} />
                ) : section?.type === "narrativeBlock" ? (
                  <ArticleNarrativeBlock entry={section} featureVariant="panel" />
                ) : null}
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </article>

      {finalCta ? (
        <FinalCtaBanner
          title={finalCta.title}
          titleHighlight={finalCta.titleHighlight}
          description={finalCta.description}
          ctaLabel={finalCta.primaryCtaLabel}
          ctaLink={finalCta.primaryCtaLink}
        />
      ) : null}
    </main>
  );
}
