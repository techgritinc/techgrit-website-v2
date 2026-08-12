"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { PlayIcon } from "@/components/ui/icons";
import type { WebinarHeroContent, HeroCollageTile } from "../_data/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeStatus = "idle" | "error" | "success";

export function HeroSection({ content }: { content: WebinarHeroContent }) {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Client-side only — no backend/email-CRM call (spec.md FR-015).
    setErrorMessage(null);
    setStatus("success");
  }

  const [before, after] = content.heading.split(content.headingHighlight);

  return (
    <section className="relative">
      <div
        className="tg-container !px-9 grid grid-cols-1 items-center gap-9 tg-md:grid-cols-2 tg-md:gap-[60px]"
        style={{ paddingTop: 74, paddingBottom: 40 }}
      >
        <div>
          <Badge
            tone="orangeOutline"
            data-rise
            className="!py-tg-2 !px-4 !text-2xs !font-bold !gap-tg-3 motion-reduce:!opacity-100 leading-[normal]"
            style={{ animationDelay: ".05s", marginBottom: 24 }}
          >
            {content.badgeLabel}
          </Badge>
          <h1
            data-rise
            className="text-[length:var(--text-webinar-hero)] leading-[1.04] tracking-[-0.035em] motion-reduce:!opacity-100"
            style={{ animationDelay: ".12s" }}
          >
            {before}
            <span className="text-gradient">{content.headingHighlight}</span>
            {after}
          </h1>
          <p
            data-rise
            className="mt-5 max-w-[500px] text-[18px] leading-[1.65] text-secondary motion-reduce:!opacity-100"
            style={{ animationDelay: ".2s" }}
          >
            {content.lead}
          </p>
          <form
            onSubmit={handleSubmit}
            noValidate
            data-rise
            className="mt-[30px] flex max-w-[460px] flex-wrap gap-3 motion-reduce:!opacity-100"
            style={{ animationDelay: ".28s" }}
          >
            <FormField
              label="Email address"
              name="email"
              type="email"
              required
              placeholder={content.formPlaceholder}
              containerClassName="min-w-[220px] flex-1"
              inputClassName="!rounded-card !py-tg-5a !px-tg-7 placeholder:!font-normal !h-[52px] placeholder:!text-white/36"
            />
            <Button
              type="submit"
              style={{ fontFamily: "Arial, sans-serif" }}
              className="!py-tg-5a !px-tg-11 !text-[15.5px] !shadow-btn-subscribe !h-[52px] leading-[normal]"
            >
              {status === "success" ? "Subscribed ✓" : content.formCtaLabel}
            </Button>
          </form>
          {status === "success" && (
            <p className="mt-3.5 text-xs font-semibold text-teal-light leading-[normal]">{content.successText}</p>
          )}
          {status === "error" && errorMessage && (
            <p role="alert" className="mt-3 text-sm font-semibold text-error">
              {errorMessage}
            </p>
          )}
        </div>
        <div data-rise className="motion-reduce:!opacity-100" style={{ animationDelay: ".24s" }}>
          <HeroCollage tiles={content.collage} />
        </div>
      </div>
    </section>
  );
}

function HeroCollage({ tiles }: { tiles: HeroCollageTile[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 max-tg-sm:grid-cols-2">
      {tiles
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((tile) => (
          <CollageTile key={tile.position} tile={tile} />
        ))}
    </div>
  );
}

function CollageTile({ tile }: { tile: HeroCollageTile }) {
  if (tile.kind === "photo" && tile.image) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-tile border border-border-image">
        <Image
          src={tile.image.src}
          alt={tile.image.alt}
          fill
          sizes="(max-width: 560px) 50vw, (max-width: 1140px) 33vw, 15vw"
          className={[
            "object-cover",
            tile.image.objectPosition === "left" && "object-left",
            tile.image.objectPosition === "right" && "object-right",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
    );
  }

  if (tile.kind === "spin-ring") {
    return (
      <div className="flex aspect-square items-center justify-center rounded-tile border border-border-orange-soft bg-overlay-orange-06">
        <div className="h-10 w-10 animate-[tgspin_3.5s_linear_infinite] rounded-full border-[3px] border-[var(--color-border-orange-medium)] border-t-orange" />
      </div>
    );
  }

  if (tile.kind === "play-triangle") {
    return (
      <div className="flex aspect-square items-center justify-center rounded-tile border border-dashed border-border-amber-medium bg-overlay-amber-04">
        <PlayIcon variant="sharp" width={26} height={26} fill="none" stroke="var(--color-yellow)" strokeWidth={2} />
      </div>
    );
  }

  // pulse-dot
  return (
    <div className="flex aspect-square items-center justify-center rounded-tile border border-border-blue-light-soft bg-overlay-blue-light-06">
      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-overlay-blue-light-18">
        <div className="h-3 w-3 rounded-full bg-blue-light" />
      </div>
    </div>
  );
}
