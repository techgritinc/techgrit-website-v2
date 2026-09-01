import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogData } from "@/cms/api/insights/blog";
import { NewsletterPanel } from "@/components/ui/NewsletterPanel";
import { BlogHero } from "./_components/blog-hero";
import { FeaturedPost } from "./_components/featured-post";
import { BlogFilterableSection } from "./_components/blog-filterable-section";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBlogData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const content = await getBlogData(category);
  if (!content) notFound();

  return (
    <main>
      {content.hero ? <BlogHero content={content.hero} /> : null}
      {content.featuredPost ? <FeaturedPost post={content.featuredPost} /> : null}
      <BlogFilterableSection topics={content.topics} posts={content.posts} activeCategory={category ?? "all"} />
      {content.newsletter ? <NewsletterPanel content={content.newsletter} category="blog" /> : null}
    </main>
  );
}
