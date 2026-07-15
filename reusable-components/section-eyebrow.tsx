export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <span style={{ width: 24, height: 2, background: "var(--color-orange)" }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
