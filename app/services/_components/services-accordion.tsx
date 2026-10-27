"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { AccordionSection, ServiceAccordionItem, ServiceAccent } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ChevronIcon } from "@/components/ui/icons";

const BADGE_BG: Record<ServiceAccent, string> = {
  blue: "var(--color-icon-bg-blue)",
  orange: "var(--color-overlay-orange)",
  teal: "var(--color-icon-bg-teal)",
};

const BADGE_COLOR: Record<ServiceAccent, string> = {
  blue: "var(--color-blue-light)",
  orange: "var(--color-amber-light)",
  teal: "var(--color-teal-light)",
};

const DIVIDER_GRADIENT: Record<ServiceAccent, string> = {
  blue: "var(--gradient-divider-blue)",
  orange: "var(--gradient-divider-orange)",
  teal: "var(--gradient-divider-teal)",
};

function ServiceImage({ item }: { item: ServiceAccordionItem }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
      {item.image ? (
        <Image
          src={item.image.url}
          alt={item.image.alternativeText}
          width={item.image.width}
          height={item.image.height}
          sizes="50vw"
          priority
          className="block h-[260px] w-full object-cover"
        />
      ) : (
        <div className="flex h-[260px] items-center justify-center text-center text-sm bg-glass-4 text-faint">
          Drop a service image
        </div>
      )}
    </div>
  );
}

function ApproachSteps({ item }: { item: ServiceAccordionItem }) {
  if (item.supportingItems.kind !== "orderedApproach") return null;
  const { items, label } = item.supportingItems;
  const accent = BADGE_COLOR[item.accentColor];

  return (
    <div className="mt-[36px]">
      <div className="mb-5 text-[13px] font-bold uppercase leading-[normal] tracking-[0.12em] text-dim">
        {label}
      </div>
      <div className="grid grid-cols-1 gap-x-[48px] border-b border-white/10 min-[921px]:grid-cols-3">
        {items.map((step) => (
          <div
            key={step.stepNumber}
            className="flex gap-4 border-t border-white/10 py-5 leading-[normal] tracking-[normal]"
          >
            <span
              className="font-display pt-[3px] text-[14px] font-bold leading-[normal] tracking-[normal] text-[var(--step-accent)]"
              style={{ ["--step-accent" as string]: accent }}
            >
              {String(step.stepNumber).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[16.5px] font-bold leading-[normal] text-white tracking-[normal]">{step.title}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-text-56">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityGrid({ item }: { item: ServiceAccordionItem }) {
  if (item.supportingItems.kind !== "capabilityGrid") return null;
  const { items } = item.supportingItems;

  return (
    <div className="mt-9 grid grid-cols-1 gap-5 tg-sm:grid-cols-2 min-[921px]:grid-cols-3">
      {items.map((capability) => (
        <div
          key={capability.title}
          className="rounded-[16px] border border-border-image bg-glass-4 p-[22px]"
        >
          <h3 className="text-[16.5px] font-bold text-white leading-[normal] tracking-[normal]">{capability.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.55] text-text-60">
            {capability.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle }: { item: ServiceAccordionItem; isOpen: boolean; onToggle: () => void }) {
  // Measured max-height transition instead of an animated `grid-template-rows` track — the fr-unit
  // technique forces a full grid re-layout every frame, which visibly flickers when combined with this
  // card's `backdrop-filter` sitting over the page's continuously-animating ambient orbs. The resting
  // states (0px closed / "none" open) need no measurement and are correct on first paint (SSR-safe, no
  // flash); a pixel height is only measured transiently during an actual toggle, matching the standard
  // "animate to auto height" pattern.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? "none" : "0px");
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    if (isOpen) {
      setMaxHeight(`${inner.scrollHeight}px`);
      const handleEnd = (event: TransitionEvent) => {
        if (event.propertyName === "max-height") {
          setMaxHeight("none");
        }
      };
      wrapper.addEventListener("transitionend", handleEnd);
      return () => wrapper.removeEventListener("transitionend", handleEnd);
    }

    setMaxHeight(`${inner.scrollHeight}px`);
    const frame = requestAnimationFrame(() => setMaxHeight("0px"));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div
      className={`transform-gpu overflow-hidden rounded-2xl border bg-glass-4 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ease-[ease] ${
        isOpen
          ? "border-[var(--color-border-orange-35)] shadow-[var(--shadow-accordion-open-glow)]"
          : "border-border-image shadow-none"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="grid w-full cursor-pointer appearance-none grid-cols-[auto_1fr_auto] items-center gap-6 border-0 bg-transparent px-[30px] py-[26px] text-left outline-none"
        style={{
          ["--badge-bg" as string]: BADGE_BG[item.accentColor],
          ["--badge-color" as string]: BADGE_COLOR[item.accentColor],
        }}
      >
        <span className="font-display inline-flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--badge-bg)] leading-[normal] text-[20px] font-bold tracking-[var(--ls-normal)] text-[var(--badge-color)]">
          {item.sequenceNumber}
        </span>
        <div>
          <div className="text-12 leading-[normal] font-bold uppercase tracking-[var(--ls-hint)] text-[var(--badge-color)]">
            {item.categoryLabel}
          </div>
          <div className="mt-1.5 text-[22px] font-bold leading-[1.2] tracking-[var(--ls-normal)] text-white">
            {item.heading}
          </div>
        </div>
        <span
          className={`inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-border-18 text-icon-stroke leading-[normal] transition-[transform,background-image] duration-300 ease-[ease] ${
            isOpen ? "rotate-180 bg-[image:var(--gradient-hover-orange-amber)]" : "rotate-0 bg-transparent"
          }`}
        >
          <ChevronIcon width={16} height={16} />
        </span>
      </button>
      <div
        ref={wrapperRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{ maxHeight }}
      >
        <div ref={innerRef} className="px-[30px] pb-[34px]">
          <div className="mb-7 h-px" style={{ background: DIVIDER_GRADIENT[item.accentColor] }} />
          <div className="grid grid-cols-1 items-center gap-[48px] max-[920px]:gap-[34px] min-[921px]:grid-cols-2">
            {item.accentColor === "orange" ? (
              <>
                <div className="order-2">
                  <ServiceImage item={item} />
                </div>
                <div className="order-1">
                  <p className="text-[16.5px] leading-[1.7]">{item.description}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[16.5px] leading-[1.7]">{item.description}</p>
                </div>
                <div>
                  <ServiceImage item={item} />
                </div>
              </>
            )}
          </div>
          <ApproachSteps item={item} />
          <CapabilityGrid item={item} />
        </div>
      </div>
    </div>
  );
}

export function ServicesAccordion({ section }: { section: AccordionSection }) {
  const [openId, setOpenId] = useState<string | null>(section.items[0].id);

  return (
    <section id="svc-accordion" className="relative scroll-mt-24 leading-[normal]">
      <div className="tg-container max-[920px]:px-9 pt-[30px] pb-15 leading-[normal]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            <div className="mb-3 text-2xs font-bold uppercase leading-[normal] tracking-widest text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06]">{section.heading}</h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-text-66">
              {section.subheading}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {section.items.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
