import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDraftDetailPageContent } from "@/cms/api/blog-detail";
import { BlogDetailView } from "@/app/insights/blog/_components/blog-detail-view";
import { isValidPreviewSecret } from "@/lib/preview-secret";

// Draft preview of a blog post, opened from the CMS's Preview button. Cookie-less on purpose
// (it must work over plain HTTP on dev): the shared secret in the URL is checked on every
// request, the draft is fetched server-side, and nothing here is cached or indexed.
// The public route is untouched, so published pages keep their normal caching.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ secret?: string | string[] }>;
};

export default async function Preview({ params, searchParams }: Props) {
  const [{ slug }, { secret }] = await Promise.all([params, searchParams]);

  if (!isValidPreviewSecret(secret)) notFound();

  const content = await getBlogDraftDetailPageContent(slug);
  if (!content) notFound();

  return <BlogDetailView content={content} />;
}
