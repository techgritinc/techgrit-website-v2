import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetailPageContent } from "@/cms/api/blog-detail";
import { ArticleCapabilityGrid } from "@/components/ui/ArticleCapabilityGrid";
import { ArticleNarrativeBlock } from "@/components/ui/ArticleNarrative";
import { ArticleResponsibilitySection } from "@/components/ui/ArticleResponsibilitySection";
import { ArticleTechStack } from "@/components/ui/ArticleTechStack";
import { FinalCtaBanner } from "@/components/ui/FinalCtaBanner";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { BLOG_ARTICLE_COLUMN, BlogArticleHeader } from "../_components/blog-article-header";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getBlogDetailPageContent(slug);
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getBlogDetailPageContent(slug);

  if (!content) notFound();

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
