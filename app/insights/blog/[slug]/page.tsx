import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetailPageContent } from "@/cms/api/blog-detail";
import { BlogDetailView } from "../_components/blog-detail-view";

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

  return <BlogDetailView content={content} />;
}
