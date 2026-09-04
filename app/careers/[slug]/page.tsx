import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobDetailContent } from "./_data/job-detail-content";
import { JobDetailHeader } from "./_components/job-detail-header";
import { JobDetailSectionBlock } from "./_components/job-detail-body";
import { JobDetailFinalCta } from "./_components/job-detail-final-cta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getJobDetailContent(slug);
  if (!content) return {};
  return { title: content.seo.title, description: content.seo.description };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = getJobDetailContent(slug);
  if (!content) notFound();

  return (
    <main>
      <JobDetailHeader header={content.header} />
      {content.sections.map((section, index) => (
        <JobDetailSectionBlock key={index} section={section} />
      ))}
      <JobDetailFinalCta {...content.finalCta} />
    </main>
  );
}
