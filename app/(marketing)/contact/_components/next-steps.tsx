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
    <div className="border-t border-white/10 pt-[44px] leading-[normal]">
      <h2 className="text-[clamp(24px,2.8vw,32px)] font-bold tracking-[-0.03em] text-white text-center leading-[normal] font-['Calibri',_'Carlito',_'Segoe_UI',_system-ui,_-apple-system,_sans-serif]">
        What happens next
      </h2>
      <div className="grid grid-cols-1 tg-md:grid-cols-[repeat(3,1fr)] mt-[34px] gap-[24px]">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative bg-white/[0.04] border border-white/10 rounded-[18px] px-[26px] py-[28px] leading-[normal]"
          >
            <span className="disp text-[15px] font-bold text-[#F7B733] leading-[normal] tracking-normal font-['Calibri',_'Carlito',_'Segoe_UI',_system-ui,_-apple-system,_sans-serif]">
              {step.number}
            </span>
            <h3 className="mt-3 text-[18px] font-bold text-white leading-[normal] tracking-normal font-['Calibri',_'Carlito',_'Segoe_UI',_system-ui,_-apple-system,_sans-serif]">
              {step.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-white/[0.62] tracking-normal font-['Calibri',_'Carlito',_'Segoe_UI',_system-ui,_-apple-system,_sans-serif]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
