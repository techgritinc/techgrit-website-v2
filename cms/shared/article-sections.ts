import { mapSectionIcon } from "./reusable-sections";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";
import type {
  CapabilityGridSection,
  CaseStudyImage,
  CaseStudyTable,
  NarrativeBlockEntry,
  TableColumnTone,
  ResponsibilitySection,
  StrapiContentSectionItem,
  StrapiKeyResponsibilitiesSection,
  StrapiPdModernizationCapabilitiesSection,
  StrapiServiceDetailSection,
  StrapiSummarySection,
  TechStackSection,
} from "../types/case-study-detail-types";
 
export function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${day} ${month}, ${date.getUTCFullYear()}`;
}
 
export function mapImage(asset: StrapiMedia, preferred: ("small" | "medium" | "large")[]): CaseStudyImage {
  const picked = pickMediaAsset(asset, preferred);
  return {
    url: resolveMediaUrl(picked.url),
    alt: asset.alternativeText ?? "",
    width: picked.width,
    height: picked.height,
  };
}

export function splitParagraphs(subtitle: string | null): string[] {
  if (!subtitle) return [];
  return subtitle
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export const TABLE_TONES = new Set(["muted", "accent", "positive"]);

// Accepts only the three tones DataTable knows about, so a typo or a new value in the CMS
// degrades to "no tone" rather than emitting a class name that doesn't exist.
function parseColumnTone(tone: string | null | undefined): TableColumnTone | null {
  if (!tone) return null;
  const normalized = tone.trim().toLowerCase();
  return TABLE_TONES.has(normalized) ? (normalized as TableColumnTone) : null;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}


export function normalizeTable(
  columns: { label: string; tone?: string | null }[] | null,
  rows: Record<string, string>[] | null
): CaseStudyTable | null {
  if (!columns?.length || !rows?.length) return null;

  const headers = columns.map((column) => column.label.trim());
  const rowKeys = Object.keys(rows[0]);

  const keyForColumn = headers.map((header, headerIndex) => {
    const normalizedHeader = normalizeKey(header);
    const matches = rowKeys
      .filter((key) => normalizedHeader.startsWith(normalizeKey(key)))
      .sort((a, b) => b.length - a.length);
    return matches[0] ?? rowKeys[headerIndex];
  });

  return {
    headers,
    tones: columns.map((column) => parseColumnTone(column.tone)),
    rows: rows.map((row) => keyForColumn.map((key) => (key ? row[key] ?? "" : ""))),
  };
}


export function mapContentSectionItem(item: StrapiContentSectionItem, index: number): NarrativeBlockEntry {
  return {
    type: "narrativeBlock",
    order: index + 1,
    title: item.title.trim(),
    paragraphs: splitParagraphs(item.subtitle),
    extraTitle: item.extraTitle?.trim() || null,
    features: item.features.map((feature, featureIndex) => ({
      order: featureIndex + 1,
      title: feature.title?.trim() ?? "",
      subtitle: feature.subtitle,
      description: feature.description?.length ? feature.description : null,
      table: normalizeTable(feature.columns, feature.rows),
      ctaLabel: feature.ctaLabel,
      ctaLink: feature.ctaLink,
      icon: mapSectionIcon(feature.icon),
      images: feature.image.map((asset) => mapImage(asset, ["small", "medium"])),
    })),
    images: item.architectureImage.map((asset) => mapImage(asset, ["medium", "large"])),
  };
}

export function mapSummary(cms: StrapiSummarySection, order: number): NarrativeBlockEntry {
  return {
    type: "narrativeBlock",
    order,
    title: cms.title.trim(),
    paragraphs: splitParagraphs(cms.subtitle),
    extraTitle: null,
    features: [],
    images: [],
  };
}

export function mapServiceDetail(cms: StrapiServiceDetailSection, order: number): TechStackSection {
  return {
    type: "techStack",
    order,
    title: cms.title.trim(),
    cards: cms.approachSteps.map((step, stepIndex) => ({
      order: stepIndex + 1,
      stepLabel: step.stepLabel ?? String(stepIndex + 1),
      icon: mapSectionIcon(step.icon),
      title: step.title?.trim() ?? "",
      subtitle: step.subtitle,
    })),
  };
}

export function mapCapabilityGrid(cms: StrapiPdModernizationCapabilitiesSection, order: number): CapabilityGridSection {
  return {
    type: "capabilityGrid",
    order,
    title: cms.title.trim(),
    subtitle: cms.subtitle,
    cards: cms.capabilityCard.map((card, cardIndex) => ({
      order: cardIndex + 1,
      title: card.title.trim(),
      subtitle: card.subtitle,
      note: card.note,
      bullets: card.features.map((feature, featureIndex) => ({
        order: featureIndex + 1,
        text: feature.title?.trim() ?? "",
      })),
    })),
  };
}

export function mapKeyResponsibilities(
  cms: StrapiKeyResponsibilitiesSection,
  order: number
): ResponsibilitySection {
  return {
    type: "responsibilityList",
    order,
    title: cms.title.trim(),
    extraTitle: cms.extraTitle?.trim() || null,
    groups: cms.ResponsibilityGroup.map((group) => ({
      heading: group.name ? group.name.trim() : null,
      items: group.ResponsibilityItems.map((item) => item.subtitle),
    })),
  };
}
