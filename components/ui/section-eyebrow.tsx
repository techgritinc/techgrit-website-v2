const TONE_COLORS = {
  orange: "var(--color-orange)",
  amber: "var(--color-amber-light)",
} as const;

export function SectionEyebrow({
  children,
  accentColor,
  tone = "orange",
  showAccent = true,
  className,
  style,
}: {
  children: React.ReactNode;
  accentColor?: string;
  tone?: "orange" | "amber";
  showAccent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const color = accentColor ?? TONE_COLORS[tone];
  return (
    <div className={`mb-4 inline-flex items-center gap-3 ${className || ""}`.trim()} style={style}>
      {showAccent && <span style={{ width: 24, height: 2, background: color }} />}
      <span className="eyebrow" style={{ color, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}
