const TONE_COLORS = {
  orange: "var(--color-orange)",
  amber: "var(--color-amber-light)",
} as const;

export function SectionEyebrow({
  children,
  accentColor,
  tone = "orange",
  showAccent = true,
}: {
  children: React.ReactNode;
  accentColor?: string;
  tone?: "orange" | "amber";
  showAccent?: boolean;
}) {
  const color = accentColor ?? TONE_COLORS[tone];
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      {showAccent && <span style={{ width: 24, height: 2, background: color }} />}
      <span className="eyebrow" style={{ color }}>
        {children}
      </span>
    </div>
  );
}
