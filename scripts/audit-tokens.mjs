#!/usr/bin/env node
// T004 — bidirectional audit of app/tokens.css declarations vs. app/globals.css's
// @theme inline mapping block (Constitution Principle I). A token declared in
// tokens.css with no matching @theme inline entry doesn't error at build time —
// the bare Tailwind utility it should power silently falls back to Tailwind's own
// shipped default instead (the TMS-62 failure class). This script makes that gap
// visible instead of silent.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "app/tokens.css");
const globalsPath = path.join(root, "app/globals.css");

const tokensSrc = readFileSync(tokensPath, "utf8");
const globalsSrc = readFileSync(globalsPath, "utf8");

// --- Parse tokens.css: every top-level `--name: value;` declaration, plus an
// exception flag if its trailing comment on the same line documents it as
// intentionally unmapped (Principle I exception / direct-only).
const DECL_RE = /^\s*(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);(.*)$/gm;
const catalogue = new Map(); // name -> { exception: bool, line }

{
  let m;
  while ((m = DECL_RE.exec(tokensSrc))) {
    const name = m[1];
    const trailing = m[3] || "";
    const exception = /unmapped per Principle I exception|direct-only/i.test(trailing);
    // compute line number lazily
    const upTo = tokensSrc.slice(0, m.index);
    const lineNo = upTo.split("\n").length;
    catalogue.set(name, { exception, line: lineNo });
  }
}

// --- Parse globals.css's @theme inline block only (between `@theme inline {`
// and its matching closing brace) for `--name: var(--other);` or literal entries.
const themeStart = globalsSrc.indexOf("@theme inline");
if (themeStart === -1) {
  console.error("FATAL: could not find `@theme inline {` block in app/globals.css");
  process.exit(2);
}
const braceStart = globalsSrc.indexOf("{", themeStart);
let depth = 0;
let i = braceStart;
for (; i < globalsSrc.length; i++) {
  if (globalsSrc[i] === "{") depth++;
  else if (globalsSrc[i] === "}") {
    depth--;
    if (depth === 0) break;
  }
}
const themeBlock = globalsSrc.slice(braceStart + 1, i);

const MAPPING_RE = /(--[a-zA-Z0-9-]+)\s*:\s*var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g;
const mappedSourceTokens = new Set(); // the tokens.css names referenced via var(--x) inside @theme inline
{
  let m;
  while ((m = MAPPING_RE.exec(themeBlock))) {
    mappedSourceTokens.add(m[2]);
  }
}

// --- (a) catalogue tokens with no mapping entry, excluding documented exceptions
const unmapped = [];
for (const [name, info] of catalogue) {
  if (info.exception) continue;
  if (!mappedSourceTokens.has(name)) {
    unmapped.push({ name, line: info.line });
  }
}

// --- (b) mapping entries referencing a tokens.css name that no longer exists there
const danglingMappings = [];
for (const name of mappedSourceTokens) {
  if (!catalogue.has(name)) {
    danglingMappings.push(name);
  }
}

const hasIssues = unmapped.length > 0 || danglingMappings.length > 0;

console.log("=== audit-tokens.mjs (T004) ===");
console.log(`tokens.css declarations: ${catalogue.size}`);
console.log(`@theme inline mapped source tokens: ${mappedSourceTokens.size}`);
console.log();

if (unmapped.length) {
  console.log(`(a) UNMAPPED tokens.css declarations (${unmapped.length}) — no @theme inline entry, not flagged as an exception:`);
  for (const u of unmapped.sort((x, y) => x.line - y.line)) {
    console.log(`  tokens.css:${u.line}  ${u.name}`);
  }
  console.log();
} else {
  console.log("(a) No unmapped, non-exception tokens.css declarations. ✓");
  console.log();
}

if (danglingMappings.length) {
  console.log(`(b) DANGLING @theme inline mappings (${danglingMappings.length}) — reference a tokens.css name that doesn't exist:`);
  for (const d of danglingMappings.sort()) {
    console.log(`  ${d}`);
  }
  console.log();
} else {
  console.log("(b) No dangling @theme inline mappings. ✓");
  console.log();
}

process.exit(hasIssues ? 1 : 0);
