import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import type { AnySection, StrapiMedia } from "./shared";

export type StrapiTrustedClientImage = {
  id: number;
  image: StrapiMedia[];
};

export type StrapiTrustedClientsSection = {
  id: number;
  images: StrapiTrustedClientImage[];
  __component: "home.trusted-clients";
};

export type TrustedClientLogo = { id: string; src: string | null; alt: string; height: number };

export type TrustedClientsData = { logos: TrustedClientLogo[] };

export function pickTrustedClientsSection(sections: AnySection[]): StrapiTrustedClientsSection | undefined {
  return sections.find((s): s is StrapiTrustedClientsSection => s.__component === "home.trusted-clients");
}

export const DEFAULT_TRUSTED_CLIENTS_DATA: TrustedClientsData = {
  logos: [
    { id: "evolve", src: "/logos/client-evolve.png", alt: "Evolve", height: 28 },
    { id: "sunnyday", src: "/logos/client-sunnyday.png", alt: "Sunny Day Fund", height: 44 },
    { id: "bcbs", src: "/logos/client-bcbs.png", alt: "BlueCross BlueShield", height: 36 },
    { id: "aqua", src: "/logos/client-aqua.png", alt: "AquA Finance", height: 44 },
    { id: "commsai", src: "/logos/client-commsai.png", alt: "CommsAI", height: 40 },
    { id: "turnqey", src: "/logos/client-turnqey.png", alt: "Turnqey", height: 28 },
  ],
};

// The reference renders each logo at `height: Xpx, width: auto` with a *different*
// height per client (28/44/36/44/40/28) so that every logo reads at a comparable
// visual size despite very different aspect ratios (a wide wordmark vs. a round
// badge) — this also happens to control how many logos fit per row before wrapping,
// which is why a uniform height regressed the reference's row-wrap layout. The CMS
// has no per-logo "display height" field, so known clients are matched by their
// (stable) alt text; anything new falls back to a neutral default.
const KNOWN_LOGO_HEIGHTS: Record<string, number> = {
  evolve: 28,
  "sunny day": 44,
  bluecross: 36,
  aqua: 44,
  commsai: 40,
  turnkey: 28,
};

function heightForLogo(alt: string): number {
  const lower = alt.toLowerCase();
  const match = Object.entries(KNOWN_LOGO_HEIGHTS).find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : 40;
}

export function toTrustedClients(section: StrapiTrustedClientsSection): TrustedClientsData {
  const logos: TrustedClientLogo[] = section.images.map((entry) => {
    const media = entry.image[0];
    const asset = media ? pickMediaAsset(media, ["small", "thumbnail"]) : null;
    const alt = media?.alternativeText ?? "";
    return {
      id: String(entry.id),
      src: asset ? resolveMediaUrl(asset.url) : null,
      alt,
      height: heightForLogo(alt),
    };
  });
  return { logos: logos.length > 0 ? logos : DEFAULT_TRUSTED_CLIENTS_DATA.logos };
}
