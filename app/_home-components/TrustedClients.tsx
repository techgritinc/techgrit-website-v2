import MediaSlot from "@/components/ui/MediaSlot";
import { TRUSTED_CLIENT_LOGOS } from "./home-data";

export default function TrustedClients() {
  return (
    <section aria-label="Trusted by our clients" className="relative z-raised border-t border-border-hairline-08 bg-ink">
      <div className="mx-auto max-w-[1280px] px-9 py-14">
        <div className="text-center text-12 font-bold tracking-24 text-ghost uppercase">Trusted by our clients</div>
        <div
          role="group"
          aria-label="Client logos"
          tabIndex={0}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center"
        >
          {TRUSTED_CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex h-[74px] shrink-0 items-center justify-center rounded-lg bg-white px-4 shadow-[var(--shadow-card),0_0_0_1px_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[var(--shadow-card-hover),var(--shadow-orange-border)]"
            >
              <MediaSlot
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={logo.height}
                style={{ height: logo.height, width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
