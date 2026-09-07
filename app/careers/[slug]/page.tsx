import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobDetailContent } from "@/cms/api/job-detail";
import { JobDetailHeader } from "./_components/job-detail-header";
import { JobSummarySection } from "./_components/job-summary-section";
import { JobResponsibilityList } from "./_components/job-responsibility-list";
import { JobDetailFinalCta } from "./_components/job-detail-final-cta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getJobDetailContent(slug);
  if (!content) return {};
  return { title: content.seo.title, description: content.seo.description };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getJobDetailContent(slug);
  if (!content) notFound();

  return (
    <main>
      <JobDetailHeader header={content.header} applicationForm={content.applicationForm} roleSlug={slug} />
      {content.body.map((section, index) =>
        section.type === "summary" ? (
          <JobSummarySection key={index} section={section} />
        ) : (
          <JobResponsibilityList key={index} section={section} />
        ),
      )}
      <JobDetailFinalCta content={content.finalCta} />
    </main>
  );
}
