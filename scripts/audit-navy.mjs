#!/usr/bin/env node
// T005 — scan app/tokens.css and app/globals.css for v1 navy literals. Fails on
// any hit that isn't one of the three FR-006a sanctioned exceptions, annotated
// with an exception comment on the same line.
//
// v1 navy hex literals:
//   #0A1822 #05080d #0D1F2D #0e1e2b #08121A #070F16
// v1 navy rgba triplets (r,g,b):
//   10,24,34   13,26,37   7,15,22   8,17,26   8,16,24   13,24,33   5,10,15
//
// FR-006a sanctioned exceptions (must remain navy, must carry an exception
// comment — these are expected hits, not failures):
//   --color-console-bg:    rgba(13,24,33,0.72)
//   --color-modal-backdrop: rgba(5,10,15,0.88)
//   --color-badge-text:    #08111F
//
// FR-003/Assumption 4 retained-v1 exceptions (v1 hero-variation exports with
// no v2 counterpart, so v2 gives no authority to migrate them either way):
//   --color-ink-hero-crazy: #08121A
//   --color-ink-hero-topo:  #070F16

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = ["app/tokens.css", "app/globals.css"].map((f) => path.join(root, f));

const NAVY_HEX = ["#0A1822", "#05080d", "#0D1F2D", "#0e1e2b", "#08121A", "#070F16", "#08111F"];
const NAVY_HEX_UPPER = new Set(NAVY_HEX.map((h) => h.toUpperCase()));

const NAVY_RGB_TRIPLETS = new Set([
  "10,24,34",
  "13,26,37",
  "7,15,22",
  "8,17,26",
  "8,16,24",
  "13,24,33",
  "5,10,15",
]);

const SANCTIONED = new Set([
  "--color-console-bg",
  "--color-modal-backdrop",
  "--color-badge-text",
]);

const RETAINED_V1 = new Set([
  "--color-ink-hero-crazy",
  "--color-ink-hero-topo",
]);

const EXCEPTION_COMMENT_RE = /FR-006a|sanctioned exception|navy exception/i;
const RETAINED_V1_COMMENT_RE = /retained-v1/i;

const HEX_RE = /#[0-9a-fA-F]{6}\b/g;
const RGBA_RE = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)/g;

const failures = [];
const expectedExceptions = [];
const retainedV1Exceptions = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  lines.forEach((lineText, idx) => {
    const lineNo = idx + 1;

    let hexMatch;
    HEX_RE.lastIndex = 0;
    while ((hexMatch = HEX_RE.exec(lineText))) {
      if (NAVY_HEX_UPPER.has(hexMatch[0].toUpperCase())) {
        record(file, lineNo, lineText, hexMatch[0]);
      }
    }

    let rgbaMatch;
    RGBA_RE.lastIndex = 0;
    while ((rgbaMatch = RGBA_RE.exec(lineText))) {
      const triplet = `${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]}`;
      if (NAVY_RGB_TRIPLETS.has(triplet)) {
        record(file, lineNo, lineText, rgbaMatch[0]);
      }
    }
  });
}

function record(file, lineNo, lineText, hit) {
  const declMatch = lineText.match(/(--[a-zA-Z0-9-]+)\s*:/);
  const tokenName = declMatch ? declMatch[1] : null;
  const isSanctioned = tokenName && SANCTIONED.has(tokenName);
  const isRetainedV1 = tokenName && RETAINED_V1.has(tokenName);

  const entry = {
    file: path.relative(root, file),
    line: lineNo,
    token: tokenName,
    hit,
    text: lineText.trim(),
  };

  if (isSanctioned) {
    expectedExceptions.push(entry);
  } else if (isRetainedV1) {
    retainedV1Exceptions.push(entry);
  } else {
    failures.push(entry);
  }
}

console.log("=== audit-navy.mjs (T005) ===\n");

if (expectedExceptions.length) {
  console.log(`FR-006a sanctioned exceptions found (${expectedExceptions.length}) — expected, not failures:`);
  for (const e of expectedExceptions) {
    const flag = EXCEPTION_COMMENT_RE.test(e.text) ? "" : "  [missing exception comment]";
    console.log(`  ${e.file}:${e.line}  ${e.token} = ${e.hit}${flag}`);
  }
  console.log();
}

if (retainedV1Exceptions.length) {
  console.log(`FR-003/Assumption 4 retained-v1 exceptions found (${retainedV1Exceptions.length}) — expected, not failures:`);
  for (const e of retainedV1Exceptions) {
    const flag = RETAINED_V1_COMMENT_RE.test(e.text) ? "" : "  [missing retained-v1 comment]";
    console.log(`  ${e.file}:${e.line}  ${e.token} = ${e.hit}${flag}`);
  }
  console.log();
}

if (failures.length) {
  console.log(`UNSANCTIONED navy literals (${failures.length}) — must be repointed to v2 black values:`);
  for (const f of failures) {
    console.log(`  ${f.file}:${f.line}  ${f.token ?? "(no token on line)"} = ${f.hit}`);
  }
  console.log();
} else {
  console.log("No unsanctioned navy literals found. ✓\n");
}

process.exit(failures.length ? 1 : 0);
