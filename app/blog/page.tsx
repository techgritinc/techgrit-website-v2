import { BLOG_CONTENT } from "./_data/blog-content";
import { BlogHero } from "./_components/blog-hero";
import { FeaturedPost } from "./_components/featured-post";
import { BlogFilterableSection } from "./_components/blog-filterable-section";
import { NewsletterPanel } from "./_components/newsletter-panel";

export default function BlogPage() {
  return (
    <>
      <BlogHero content={BLOG_CONTENT.hero} />
      <FeaturedPost post={BLOG_CONTENT.featuredPost} />
      <BlogFilterableSection topics={BLOG_CONTENT.topics} posts={BLOG_CONTENT.posts} />
      <NewsletterPanel content={BLOG_CONTENT.newsletter} />
    </>
  );
}
