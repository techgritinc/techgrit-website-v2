#!/usr/bin/env node
// T051 — catalogue-vs-usage audit. Greps every `var(--…)` reference across
// components/**, app/**/*.tsx, and app/globals.css, and reports any referenced
// token name absent from app/tokens.css (audit SC-002 names). CSS silently
// resolves an undefined custom property to nothing rather than erroring, so a
// clean `npm run build` does not catch this — this script does.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "app/tokens.css");

const DECL_RE = /^\s*(--[a-zA-Z0-9-]+)\s*:/gm;
const catalogue = new Set();
{
  const src = readFileSync(tokensPath, "utf8");
  let m;
  while ((m = DECL_RE.exec(src))) catalogue.add(m[1]);
}

function walk(dir, exts, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".next")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, exts, out);
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

const targets = [
  ...walk(path.join(root, "components"), [".tsx", ".ts", ".css"]),
  ...walk(path.join(root, "app"), [".tsx", ".ts"]),
];
targets.push(path.join(root, "app/globals.css"));

const VAR_RE = /var\(\s*(--[a-zA-Z0-9-]+)/g;
const missing = new Map(); // tokenName -> [{file, line}]

for (const file of targets) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lines = src.split("\n");
  lines.forEach((lineText, idx) => {
    let m;
    VAR_RE.lastIndex = 0;
    while ((m = VAR_RE.exec(lineText))) {
      const name = m[1];
      if (!catalogue.has(name)) {
        const rel = path.relative(root, file);
        if (!missing.has(name)) missing.set(name, []);
        missing.get(name).push({ file: rel, line: idx + 1 });
      }
    }
  });
}

console.log("=== audit-usage.mjs (T051) ===\n");
console.log(`tokens.css catalogue: ${catalogue.size} declarations`);
console.log(`Scanned ${targets.length} files under components/, app/.\n`);

if (missing.size) {
  console.log(`REFERENCED BUT UNDECLARED tokens (${missing.size}) — resolves to nothing at runtime, no build error:`);
  for (const [name, sites] of [...missing.entries()].sort()) {
    console.log(`  ${name}  (${sites.length} reference${sites.length > 1 ? "s" : ""})`);
    for (const s of sites.slice(0, 5)) {
      console.log(`    ${s.file}:${s.line}`);
    }
    if (sites.length > 5) console.log(`    ...and ${sites.length - 5} more`);
  }
  console.log();
} else {
  console.log("No referenced-but-undeclared tokens found. ✓\n");
}

process.exit(missing.size ? 1 : 0);
