"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ChevronRightIcon, CloseIcon, PlayIcon } from "@/components/ui/icons";
import { TESTIMONIALS } from "./home-data";

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { isDown: true, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const state = dragState.current;
    if (!state.isDown || !track) return;
    const delta = event.clientX - state.startX;
    if (Math.abs(delta) > 4) state.moved = true;
    track.scrollLeft = state.startScrollLeft - delta;
  }

  function endDrag() {
    dragState.current.isDown = false;
  }

  function openLightbox(index: number) {
    if (dragState.current.moved) return; // a drag, not a click
    setOpenIndex(index);
  }

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex]);

  const current = openIndex !== null ? TESTIMONIALS[openIndex] : null;

  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-9 pt-15 pb-25 text-center">
        <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase">What our clients say</div>
        <h2 className="mt-3.5 text-[42px] leading-[1.06]">Trusted by forward-thinking teams.</h2>
        <p className="mx-auto mt-3.5 max-w-[520px] text-base leading-[1.55] text-muted">
          Empowering fast-growing companies with AI-powered solutions built for scale.
        </p>
      </div>

      <div className="relative mx-auto max-w-[1320px] pb-22.5">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab gap-5.5 overflow-x-auto px-10 pt-7.5 pb-6 text-left select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x proximity" }}
        >
          {TESTIMONIALS.map((testimonial, index) => {
            if (testimonial.type === "video") {
              return (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative min-h-[340px] w-[358px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] border border-border-orange bg-[image:var(--gradient-testimonial-video)] p-0 text-left outline-none transition-all duration-300 ease-out hover:-translate-y-1.5"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div aria-hidden="true" className="absolute inset-0 [background:radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.22),transparent_55%)]" />
                  <div aria-hidden="true" className="font-display absolute -top-3.5 right-4 text-[120px] leading-none font-bold text-text-13">
                    {testimonial.initials}
                  </div>
                  <div className="absolute top-4.5 left-4.5 leadinig-none inline-flex items-center gap-[7px] rounded-full border border-border-28 bg-badge-ink-45 px-3 py-1 text-[11px] font-bold tracking-wider text-white backdrop-blur-sm">
                    <span className="h-[7px] w-[7px] rounded-full bg-white" />
                    VIDEO
                  </div>
                  <div className="absolute top-[43%] left-1/2 flex h-17 w-17 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white-96 shadow-card">
                    <PlayIcon className="text-orange" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-[image:var(--gradient-testimonial-fade)] px-5.5 pt-8.5 pb-5">
                    <p className="text-15-5 leading-[1.45] font-semibold text-white">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="mt-3 text-[14.5px] leading-[normal] font-bold text-white">{testimonial.name}</div>
                    <div className="text-[13px] leading-[normal] text-nav-sub">{testimonial.role}</div>
                  </div>
                </button>
              );
            }

            return (
              <div
                key={testimonial.name}
                className="flex min-h-[340px] w-[358px] shrink-0 flex-col rounded-[20px] border border-border-image bg-glass-4 p-7.5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1.5"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-4 flex gap-0.5 text-[15px] tracking-[2px] text-amber">
                  {"★★★★★".slice(0, testimonial.rating ?? 5)}
                </div>
                <p className="flex-1 text-[16.5px] leading-[1.55] font-medium text-primary">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-5.5 flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-phase-node)] font-display text-[15px] font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-[15px] leading-[normal] font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-[13px] leading-[normal] text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 bottom-22.5 w-22.5 bg-[image:var(--gradient-testimonial-edge)]" />

        <div className="mt-1.5 flex items-center justify-center gap-[9px] text-[13px] text-muted font-semibold tracking-04 text-text-55">
          <span>Drag to explore more stories</span>
          <span className="motion-safe:animate-[tgnudgex_1.4s_ease-in-out_infinite]">
            <ChevronRightIcon className="text-orange" />
          </span>
        </div>
      </div>

      {current && (
        <div
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} testimonial`}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-modal-backdrop p-6 backdrop-blur-md"
        >
          <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-[900px]">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10.5 w-10.5 items-center justify-center rounded-full border border-border-22 bg-glass-10 text-white outline-none"
            >
              <CloseIcon />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
              {current.videoUrl ? (
                <video src={current.videoUrl} controls autoPlay className="h-full w-full" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[image:var(--gradient-testimonial-placeholder)]">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white-96 shadow-card">
                    <PlayIcon width={30} height={30} className="text-orange" />
                  </div>
                  <div className="text-xs font-semibold tracking-04 text-text-75">Video testimonial</div>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="text-[16px] font-bold text-primary">{current.name}</div>
              <div className="text-[14px] text-muted">{current.role}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
