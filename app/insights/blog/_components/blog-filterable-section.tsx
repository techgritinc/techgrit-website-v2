import { BlogFilterBar } from "./blog-filter-bar";
import { BlogPostGrid } from "./blog-post-grid";
import type { BlogPost, Topic } from "../_data/types";

// `posts` arrives already filtered by the CMS's own `?category=` param (see
// getBlogData in cms/api/insights/blog.ts) — no client-side filtering happens here.
export function BlogFilterableSection({
  topics,
  posts,
  activeCategory,
}: {
  topics: Topic[];
  posts: BlogPost[];
  activeCategory: string;
}) {
  return (
    <>
      <BlogFilterBar topics={topics} activeCategory={activeCategory} />
      <BlogPostGrid posts={posts} />
    </>
  );
}
