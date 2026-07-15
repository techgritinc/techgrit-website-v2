import Button from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section id="contact" className="relative scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-[1180px] px-9 pt-9 pb-27.5">
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-[rgba(255,255,255,0.04)] px-10 py-20 text-center backdrop-blur-cta">
          <div
            aria-hidden="true"
            className="absolute bottom-[-120px] left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-orange opacity-30 blur-[90px]"
          />
          <div className="relative">
            <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase">See how we help teams win</div>
            <h2 className="mt-4 text-[52px] leading-[1.04]">
              Ready to build at the
              <br />
              speed of thought?
            </h2>
            <p className="mx-auto mt-5.5 max-w-[600px] text-[18.5px] leading-[1.6] text-secondary">
              Let&rsquo;s move past the &ldquo;Copilot&rdquo; era and into the Agentic era. See how TechGrit can
              transform your roadmap from a backlog into a launchpad.
            </p>
            <div className="mt-9.5 flex flex-col items-center gap-5">
              <Button href="mailto:support@techgrit.com?subject=OrbitAI%20Demo%20Request" size="lg">
                Schedule an OrbitAI Demo <span aria-hidden="true">&rarr;</span>
              </Button>
              <a
                href="#methodology"
                className="inline-flex items-center gap-2 border-b border-border-orange-strong pb-1 text-[15.5px] font-semibold text-primary"
              >
                Explore how our 6-week framework can accelerate your next big bet{" "}
                <span aria-hidden="true" className="text-orange">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
