const STEPS = [
  {
    number: "01",
    title: "We read your note",
    body: "A senior engineer — not a sales rep — reviews your message and what you're trying to achieve.",
  },
  {
    number: "02",
    title: "A 30-min discovery call",
    body: "We dig into scope, constraints, and timeline — and tell you honestly whether we're the right fit.",
  },
  {
    number: "03",
    title: "A clear plan & quote",
    body: "You get a proposed approach, team shape, and a path to a working build in weeks — not quarters.",
  },
];

export default function NextSteps() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 44 }}>
      <h2 style={{ fontSize: "clamp(24px,2.8vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", textAlign: "center" }}>What happens next</h2>
      <div className="grid grid-cols-1 tg-md:grid-cols-3" style={{ marginTop: 34, gap: 24 }}>
        {STEPS.map((step) => (
          <div
            key={step.number}
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 18,
              padding: "28px 26px",
            }}
          >
            <span
              style={{
                fontFamily: '"Space Grotesk", "Manrope", sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: "#F7B733",
              }}
            >
              {step.number}
            </span>
            <h3 style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {step.title}
            </h3>
            <p
              style={{
                marginTop: 8,
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
