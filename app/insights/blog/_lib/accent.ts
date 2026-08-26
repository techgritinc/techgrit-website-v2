import type { BlogAccentToken } from "../_data/types";

// Mirrors each BlogAccentToken to its app/tokens.css hex value, so per-post
// cover/glow/tag treatments (research.md §5) can derive rgba() strings the
// same way the reference's own hexA(hex, a) helper does.
const ACCENT_HEX: Record<BlogAccentToken, string> = {
  "blue-light": "#38bdf8",
  orange: "#E87722",
  amber: "#F59E0B",
  "teal-light": "#2dd4bf",
  blue: "#0284C7",
  yellow: "#FBBF24",
  purple: "#A78BFA",
};

export function accentHex(token: BlogAccentToken): string {
  return ACCENT_HEX[token];
}

export function hexA(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
