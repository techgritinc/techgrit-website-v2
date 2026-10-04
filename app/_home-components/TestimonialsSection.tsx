"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import { CheckIcon, ChevronRightIcon, ClockIcon, CloseIcon, PlayIcon, QuoteIcon } from "@/components/ui/icons";
import type { ReviewsData } from "@/cms/api/home/reviews";

export default function TestimonialsSection({ data }: { data: ReviewsData }) {
  const { badgeLabel, title, subtitle, testimonials, metrics } = data;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalVideoContainer, setModalVideoContainer] = useState<HTMLDivElement | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { isDown: true, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.style.cursor = "grabbing";
    track.style.scrollSnapType = "none";
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
    const track = trackRef.current;
    if (track) {
      track.style.cursor = "grab";
      track.style.scrollSnapType = "x proximity";
    }
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

  const current = openIndex !== null ? testimonials[openIndex] : null;

  return (
    <section className="scroll-mt-24 relative">
      <div data-reveal className="mx-auto max-w-[1280px] px-9 pt-20 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[640px]">
            <div className="text-2xs leading-[normal] font-bold tracking-widest text-orange uppercase">{badgeLabel}</div>
            <h2 className="mt-3.5 text-[42px] leading-[1.06]">{title}</h2>
            <p className="mt-3.5 text-base leading-[1.55] text-muted">{subtitle}</p>
          </div>

          {metrics.length > 0 && (
            <div className="flex items-center gap-8 max-tg-sm:gap-4 rounded-16 border border-border-8 bg-glass-3 px-tg-11 py-tg-8 max-tg-sm:px-4 max-tg-sm:py-3.5 backdrop-blur-md max-tg-sm:mx-auto">
              {metrics.map((metric, index) => (
                <Fragment key={metric.id}>
                  {index > 0 && <div aria-hidden="true" className="h-9 w-px bg-border-14" />}
                  <div>
                    <div className="font-display text-testimonial-stat font-bold tracking-[var(--ls-normal)] text-primary leading-[normal]">
                      {metric.value}
                      <span className="text-amber-light">{metric.suffix}</span>
                    </div>
                    <div className="mt-0.5 text-11 font-bold tracking-label text-dim uppercase leading-[normal]">{metric.label}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <div data-reveal className="relative pb-15 overflow-hidden">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab gap-5.5 overflow-x-auto px-20 pt-6 pb-7 text-left select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x proximity", WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((testimonial, index) => {
            if (testimonial.type === "video") {
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative h-[340px] w-[380px] shrink-0 cursor-pointer overflow-hidden rounded-[22px] border border-border-orange-45 bg-[image:var(--gradient-testimonial-video)] p-0 text-left outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-testimonial-hover-video"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {testimonial.videoUrl ? (
                    <AutoplayVideo
                      src={testimonial.videoUrl}
                      className="absolute inset-0 h-full w-full object-cover"
                      previewClassName="h-full w-full"
                      portalTarget={openIndex === index ? modalVideoContainer : undefined}
                    />
                  ) : (
                    <>
                      <div aria-hidden="true" className="absolute inset-0 [background:radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.28),transparent_60%)]" />
                      <div aria-hidden="true" className="font-display absolute -top-6 right-3 text-[140px] leading-none font-bold tracking-[-0.06em] text-text-13">
                        {testimonial.initials}
                      </div>
                    </>
                  )}
                  <div aria-hidden="true" className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.55))]" />
                  <QuoteIcon
                    aria-hidden="true"
                    width={76}
                    height={76}
                    className="absolute top-24 left-5 text-white opacity-[var(--opacity-14)]"
                  />
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div
                      className="leading-[normal] inline-flex items-center gap-[7px] rounded-full border border-border-28 bg-badge-ink-50 py-[6px] px-[12px] text-[11px] font-bold text-white backdrop-blur-sm tracking-[1.54px]"
                      style={{ fontFamily: "Arial" }}
                    >
                      <span className="h-[7px] w-[7px] rounded-full bg-white" />
                      VIDEO
                    </div>
                    {testimonial.videoDuration && (
                      <div
                        className="inline-flex items-center gap-tg-1c rounded-2xl bg-badge-ink-40 py-[5px] px-[11px] text-[11px] font-bold text-bright backdrop-blur-sm leading-[normal]"
                        style={{ fontFamily: "Arial" }}
                      >
                        <ClockIcon width={10} height={10} strokeWidth={2.5} />
                        {testimonial.videoDuration}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      aria-hidden="true"
                      className="absolute inset-[-12px] rounded-full bg-[rgba(255,255,255,0.2)]"
                      style={{ animation: "tgpulse 2.4s ease-in-out infinite" }}
                    />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,255,255,0.98)] shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
                      <PlayIcon className="text-orange" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-[image:var(--gradient-testimonial-fade)] px-6 pt-8.5 pb-5.5">
                    <div
                      className="mb-2.5 flex gap-0.5 text-[13px] tracking-[2px] leading-[normal] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]"
                      style={{ fontFamily: "Arial" }}
                    >
                      {"★★★★★"}
                    </div>
                    <p
                      className="text-[15.5px] leading-[1.45] font-semibold text-white"
                      style={{ fontFamily: "Arial" }}
                    >&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="mt-[14px] flex items-center gap-[11px]">
                      <div className="font-display flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.95)] text-[14px] font-bold text-orange">
                        {testimonial.initials}
                      </div>
                      <div className="min-w-0">
                        <div
                          className="text-[14.5px] leading-[normal] font-bold text-white"
                          style={{ fontFamily: "Arial" }}
                        >{testimonial.name}</div>
                        <div
                          className="text-[12.5px] leading-[normal] text-nav-sub"
                          style={{ fontFamily: "Arial" }}
                        >{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <div
                key={testimonial.id}
                className="relative flex h-[340px] w-[380px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-border-image bg-[image:var(--gradient-testimonial-card)] pt-[26px] px-[26px] pb-[24px] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-testimonial-hover-text"
                style={{ scrollSnapAlign: "start" }}
              >
                <QuoteIcon
                  aria-hidden="true"
                  width={110}
                  height={110}
                  className="absolute -top-1.5 right-3 text-orange opacity-[var(--opacity-06)]"
                />
                <div className="relative mb-4 flex items-center justify-between gap-tg-4">
                  <div className="flex gap-0.5 text-[14px] tracking-[2px] text-amber leading-[normal]">
                    {"★★★★★".slice(0, testimonial.rating ?? 0)}
                  </div>
                  {testimonial.verified && (
                    <div className="inline-flex items-center gap-tg-1c text-3xs font-bold tracking-wider text-green uppercase leading-[normal]">
                      <CheckIcon width={11} height={11} />
                      Verified
                    </div>
                  )}
                </div>
                <p className="relative flex-1 text-[15px] leading-[23.25px] font-normal text-primary">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="relative mt-4 pt-4 border-t border-border-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-phase-node)] font-display text-[15px] font-bold text-white shadow-testimonial-avatar">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-[14.5px] leading-[normal] font-bold text-primary">{testimonial.name}</div>
                    <div className="text-[12.5px] leading-[normal] text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 bottom-0 w-[140px] bg-[image:var(--gradient-testimonial-edge)]" />
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 bg-[image:var(--gradient-testimonial-edge-left)]" />

        <div className="mt-1.5 flex items-center justify-center gap-[9px] text-[13px] text-muted font-semibold tracking-04 text-text-55">
          <span className="motion-safe:animate-[tgnudgex_1.4s_ease-in-out_infinite]">
            <ChevronRightIcon className="text-orange" />
          </span>
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
                <div ref={setModalVideoContainer} className="h-full w-full" />
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
