import MediaSlot from "@/components/ui/MediaSlot";
import type { TrustedClientsData } from "@/cms/api/home/trusted-clients";

export default function TrustedClients({ data }: { data: TrustedClientsData }) {
  // [Option A only] Duplicate the logo set so the `tgmarquee` keyframe
  // (translateX(0) -> -50%) loops seamlessly — after one cycle the second copy
  // sits exactly where the first began. The copy is aria-hidden so it isn't
  // announced twice.
  const marqueeLogos = [...data.logos, ...data.logos];
  // [Option A only] Keep a steady scroll speed no matter how many logos exist.
  // Higher multiplier = longer loop = slower scroll.
  const durationSeconds = Math.max(data.logos.length, 1) * 4.5;

  return (
    <section aria-label="Trusted by our clients" className="relative z-raised border-t border-border-hairline-08 bg-ink">
      <div className="mx-auto max-w-[1280px] px-9 py-14 max-tg-sm:py-10">
        <div className="text-center text-12 font-bold tracking-24 text-ghost uppercase">Trusted by our clients</div>

        {/* ===== OPTION A: AUTO-SCROLL MARQUEE (active) ===== */}
        <div
          role="group"
          aria-label="Client logos"
          tabIndex={0}
          className="scrollbar-none mt-8 overflow-x-auto py-2 max-tg-sm:-mx-9"
        >
          <ul
            className="flex w-max items-center animate-[tgmarquee_40s_linear_infinite] hover:[animation-play-state:paused]"
            style={{ animationDuration: `${durationSeconds}s` }}
          >
            {marqueeLogos.map((logo, index) => (
              <li
                key={`${logo.id}-${index}`}
                aria-hidden={index >= data.logos.length}
                className="mr-4 flex h-[74px] shrink-0 items-center justify-center rounded-lg bg-white px-4 shadow-[var(--shadow-card),0_0_0_1px_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[var(--shadow-card-hover),var(--shadow-orange-border)]"
              >
                <MediaSlot
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={logo.height}
                  style={{ height: logo.height, width: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
