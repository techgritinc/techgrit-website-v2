import type { Metadata } from "next";
import { getBlogData } from "@/cms/api/blog";
import { BlogHero } from "./_components/blog-hero";
import { FeaturedPost } from "./_components/featured-post";
import { BlogFilterableSection } from "./_components/blog-filterable-section";
import { NewsletterPanel } from "./_components/newsletter-panel";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBlogData();
  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function BlogPage() {
  const content = await getBlogData();

  return (
    <>
      <BlogHero content={content.hero} />
      <FeaturedPost post={content.featuredPost} />
      <BlogFilterableSection topics={content.topics} posts={content.posts} />
      <NewsletterPanel content={content.newsletter} />
    </>
  );
}
