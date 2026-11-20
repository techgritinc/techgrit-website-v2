import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyDraftDetailPageContent } from "@/cms/api/case-study-detail";
import { CaseStudyDetailView } from "@/app/insights/case-studies/_components/case-study-detail-view";
import { isValidPreviewSecret } from "@/lib/preview-secret";

// Draft preview of a case study, opened from the CMS's Preview button. Cookie-less on purpose
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

  const content = await getCaseStudyDraftDetailPageContent(slug);
  if (!content) notFound();

  return <CaseStudyDetailView content={content} />;
}
