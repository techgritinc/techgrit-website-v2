import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyDetailPageContent } from "@/cms/api/case-study-detail";
import { CaseStudyDetailView } from "../_components/case-study-detail-view";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCaseStudyDetailPageContent(slug);
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getCaseStudyDetailPageContent(slug);

  if (!content) notFound();

  return <CaseStudyDetailView content={content} />;
}
