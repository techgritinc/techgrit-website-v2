import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center justify-center">
      <div className="mx-auto max-w-[640px] px-9 py-[110px] text-center">
        <div
          data-rise
          style={{ animationDelay: ".12s" }}
          className="font-display text-[clamp(90px,14vw,150px)] font-bold leading-[0.9] tracking-[-0.04em] text-gradient"
        >
          404
        </div>

        <h1
          data-rise
          style={{ animationDelay: ".2s" }}
          className="mt-5 text-[clamp(26px,3.2vw,36px)] font-bold leading-[1.15] tracking-[-0.03em] text-white"
        >
          We can&apos;t find that page. 
        </h1>

        <p data-rise style={{ animationDelay: ".28s" }} className="mx-auto mt-4 max-w-[440px] text-[17px] leading-[1.65] text-secondary">
          The page you&apos;re looking for may have been moved, renamed, or never existed. Let&apos;s get you back on track.
        </p>

        <div data-rise style={{ animationDelay: ".36s" }} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button href="/" variant="primary" size="hero" className="min-h-[52px] !px-7 !py-[15px] !text-[16px] !font-bold leading-[normal]">
            Back to home
          </Button>
          <Button href={ROUTES.contactUs} variant="ghost" size="hero" className="min-h-[52px] !px-[26px] !py-4 !text-[16px] !font-bold leading-[normal]">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
