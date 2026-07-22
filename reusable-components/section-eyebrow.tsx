export function SectionEyebrow({
  children,
  accentColor,
}: {
  children: React.ReactNode;
  accentColor?: string;
}) {
  const color = accentColor ?? "var(--color-orange)";
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <span style={{ width: 24, height: 2, background: color }} />
      <span className="eyebrow" style={{ color }}>
        {children}
      </span>
    </div>
  );
}
