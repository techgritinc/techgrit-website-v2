#!/usr/bin/env node
// T052 — v2-traceability audit. Checks each `lg`-baseline value in app/tokens.css
// against the v2 value sets extracted in research.md §5/§7/§8, and flags any
// value with zero v2 occurrences and no retention comment. Mechanically enforces
// FR-001/FR-002/FR-021's duplicate-value check.
//
// Excludes: md/sm responsive band values (none exist yet pre-migration — see
// baseline-computed.md) and any declaration whose trailing comment documents one
// of the four provenance classes: retained-v1, v2-exception, designed (FR-016
// responsive bands), or direct-only (Principle I exception, handled by
// audit-tokens.mjs instead).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "app/tokens.css");
const src = readFileSync(tokensPath, "utf8");

// v2 value sets, extracted from research.md (2026-07) — kept as plain numbers,
// no units, since app/tokens.css declares each family in a consistent unit.
const V2_LINE_HEIGHTS = new Set([
  0.74, 1, 1.02, 1.03, 1.04, 1.05, 1.06, 1.08, 1.1, 1.13, 1.15, 1.16, 1.2, 1.22,
  1.3, 1.32, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75,
]);
const V2_LETTER_SPACINGS_EM = new Set([
  -0.06, -0.045, -0.04, -0.035, -0.03, -0.02, -0.01, -0.005, 0.02, 0.03, 0.04,
  0.05, 0.06, 0.08, 0.1, 0.12, 0.13, 0.14, 0.16, 0.18, 0.2, 0.24,
]);
const V2_RADII_PX = new Set([
  3, 4, 6, 7, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 70, 80,
]);
const V2_BLUR_PX = new Set([
  6, 8, 10, 11, 12, 14, 16, 18, 34, 55, 60, 70, 80, 90, 100, 110, 115, 120, 130,
  140, 150,
]);
const V2_TRANSITIONS_S = new Set([0.15, 0.2, 0.22, 0.25, 0.35]);

const RETENTION_RE = /retained-v1|v2-exception|designed|direct-only/i;

const FAMILIES = [
  { prefix: "--lh-", unit: "", set: V2_LINE_HEIGHTS, label: "line-height" },
  { prefix: "--ls-", unit: "em", set: V2_LETTER_SPACINGS_EM, label: "letter-spacing" },
  { prefix: "--radius-", unit: "px", set: V2_RADII_PX, label: "radius", skipValues: [9999] },
  { prefix: "--blur-", unit: "px", set: V2_BLUR_PX, label: "blur" },
  { prefix: "--transition-", unit: "s", set: V2_TRANSITIONS_S, label: "transition-duration", extractLeading: true },
];

const DECL_RE = /^\s*(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);(.*)$/gm;

const flagged = [];
const ok = [];

let m;
while ((m = DECL_RE.exec(src))) {
  const name = m[1];
  const rawValue = m[2].trim();
  const trailing = m[3] || "";
  const lineNo = src.slice(0, m.index).split("\n").length;

  const family = FAMILIES.find((f) => name.startsWith(f.prefix));
  if (!family) continue;
  if (family.skipValues) {
    const bare = parseFloat(rawValue);
    if (family.skipValues.includes(bare)) continue;
  }

  let numeric;
  if (family.extractLeading) {
    const lm = rawValue.match(/^([\d.]+)s/);
    numeric = lm ? parseFloat(lm[1]) : NaN;
  } else if (family.unit) {
    const lm = rawValue.match(new RegExp(`^(-?[\\d.]+)${family.unit}`));
    numeric = lm ? parseFloat(lm[1]) : NaN;
  } else {
    numeric = parseFloat(rawValue);
  }

  if (Number.isNaN(numeric)) continue;

  const entry = { name, value: rawValue, numeric, family: family.label, line: lineNo };

  if (family.set.has(numeric)) {
    ok.push(entry);
  } else if (RETENTION_RE.test(trailing)) {
    ok.push({ ...entry, retained: true });
  } else {
    flagged.push(entry);
  }
}

console.log("=== audit-v2-trace.mjs (T052) ===\n");
console.log(`Checked ${ok.length + flagged.length} lg-baseline declarations across: ${FAMILIES.map((f) => f.label).join(", ")}\n`);

if (flagged.length) {
  console.log(`FLAGGED (${flagged.length}) — zero v2 occurrences, no retention comment:`);
  for (const f of flagged) {
    console.log(`  tokens.css:${f.line}  ${f.name}: ${f.value}  [${f.family}]`);
  }
  console.log();
} else {
  console.log("No unexplained value mismatches against the v2 traceability set. ✓\n");
}

// --- FR-021 catalogue half: same-value duplicates. Groups declarations by their
// exact literal value (skipping var()-indirections and clamp() formulas, which
// are expected to differ from plain literals) and reports any value held by more
// than one token name.
const byValue = new Map();
{
  const ALL_DECL_RE = /^\s*(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/gm;
  let dm;
  while ((dm = ALL_DECL_RE.exec(src))) {
    const name = dm[1];
    const value = dm[2].trim();
    if (value.startsWith("var(") || value.startsWith("clamp(") || value.startsWith("linear-gradient(")) continue;
    // Only compare within the color/shadow family — cross-family px coincidences
    // (e.g. --space-2 and --blur-md both being 8px) are unrelated units, not
    // FR-021 duplicates.
    if (!/^--(color|gradient|shadow)-/.test(name)) continue;
    if (!byValue.has(value)) byValue.set(value, []);
    byValue.get(value).push(name);
  }
}
const duplicateGroups = [...byValue.entries()].filter(([, names]) => names.length > 1);

if (duplicateGroups.length) {
  console.log(`SAME-VALUE DUPLICATES (${duplicateGroups.length} values, FR-021) — two or more token names holding an identical literal:`);
  for (const [value, names] of duplicateGroups) {
    console.log(`  ${value}  →  ${names.join(", ")}`);
  }
  console.log();
} else {
  console.log("No same-value duplicate tokens found. ✓\n");
}

process.exit(flagged.length || duplicateGroups.length ? 1 : 0);
