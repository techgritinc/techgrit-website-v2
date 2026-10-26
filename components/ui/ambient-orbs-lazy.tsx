"use client";

import dynamic from "next/dynamic";

const AmbientOrbs = dynamic(
  () => import("@/components/ui/ambient-orbs").then((m) => ({ default: m.AmbientOrbs })),
  { ssr: false },
);

export default function AmbientOrbsLazy() {
  return <AmbientOrbs />;
}
