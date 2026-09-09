import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { BlogFilterBar } from "./blog-filter-bar";
import { BlogPostGrid } from "./blog-post-grid";
import type { BlogPost, Topic } from "../_data/types";

// `posts` arrives already filtered by the CMS's own `?category=` param (see
// getBlogData in cms/api/insights/blog.ts) — no client-side filtering happens here.
export function BlogFilterableSection({
  topics,
  posts,
  activeCategory,
  defaultCategory,
}: {
  topics: Topic[];
  posts: BlogPost[];
  activeCategory: string;
  defaultCategory: string;
}) {
  const resetHref =
    defaultCategory === "all" ? `${ROUTES.blog}/` : `${ROUTES.blog}/?category=${defaultCategory}`;

  return (
    <>
      <BlogFilterBar topics={topics} activeCategory={activeCategory} />

      <div aria-live="polite" aria-atomic="true">
        {posts.length === 0 ? (
          <section>
            <div className="tg-container py-[var(--space-11)] px-[var(--space-15)] flex flex-col items-center gap-4 text-center">
              <p className="text-[15.5px] text-text-soft">No posts match this topic yet.</p>
              <Button href={resetHref} variant="ghost" size="sm">
                Reset filter
              </Button>
            </div>
          </section>
        ) : (
          <BlogPostGrid posts={posts} />
        )}
      </div>
    </>
  );
}
