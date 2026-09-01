#!/usr/bin/env node
/**
 * check-hardcoded.mjs — catch values that should be tokens.
 *
 * Flags:
 *   1. Hex color literals            → use a token from kit/tokens.css
 *   2. Raw px font sizes             → use text-h1 / text-body-large etc.
 *   3. Inline style={{}} in JSX      → overrides responsive classes, causes bugs
 *   4. "Animoca Minds" in copy       → the brand is "Minds"
 *   5. Arbitrary Tailwind values     → bg-[#fd8d1d], text-[22px]
 *
 * kit/tokens.css is exempt — it is where the raw values are allowed to live.
 *
 * Usage:
 *   node checks/check-hardcoded.mjs <file-or-dir> [...more]
 *
 * Exit code 0 = clean, 1 = violations found.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';

const EXTS = new Set(['.html', '.jsx', '.tsx', '.js', '.ts', '.css', '.vue', '.svelte', '.astro', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'brand', 'assets']);
// Files allowed to contain raw values, because they define them.
const EXEMPT = new Set(['tokens.css']);

const RULES = [
  {
    id: 'hex',
    // 3, 6 or 8 digit hex. Skip if the line looks like a token definition.
    re: /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/g,
    skipLine: l => /--color-|@color|tokens\.css/.test(l),
    msg: 'hardcoded hex color',
    fix: 'use a token — bg-brand-orange-500, text-neutral-600, var(--color-bg)',
  },
  {
    id: 'font-px',
    re: /font-size\s*:\s*\d+(?:\.\d+)?px/g,
    skipLine: l => /--font-size-/.test(l),
    msg: 'raw px font size',
    fix: 'use a type token — text-h2, text-body-large, var(--font-size-h3)',
  },
  {
    id: 'arbitrary',
    // Tailwind arbitrary values: bg-[#fff], text-[22px], p-[13px].
    // Note `ch`/`ex` units are NOT matched — a max-w-[60ch] measure is the
    // correct way to constrain prose and has no token equivalent.
    re: /\b[a-z-]+-\[(?:#[0-9a-fA-F]{3,8}|\d+(?:\.\d+)?(?:px|rem))\]/g,
    skipLine: () => false,
    // Button type sizes are their own scale (DESIGN.md §4), and 16px is the
    // documented iOS anti-zoom minimum for form fields.
    skipMatch: m => ['text-[16px]', 'text-[18px]', 'text-[20px]'].includes(m),
    msg: 'arbitrary Tailwind value',
    fix: 'use a token-backed utility instead of bracket syntax',
  },
  {
    id: 'inline-style',
    re: /style=\{\{/g,
    skipLine: () => false,
    msg: 'inline style object',
    fix: 'inline styles beat responsive classes — move this into className',
  },
  {
    id: 'brand-name',
    re: /Animoca\s+Minds/gi,
    skipLine: l => /logo|lockup|By Animoca Brands|legacy|CHECK|brand-name/i.test(l),
    msg: 'wrong brand name',
    fix: 'the brand is "Minds" — "By Animoca Brands" belongs only inside logo artwork',
  },
];

function walk(target, out = []) {
  let st;
  try { st = statSync(target); } catch { return out; }
  if (st.isDirectory()) {
    for (const entry of readdirSync(target)) {
      if (SKIP_DIRS.has(entry) || entry.startsWith('.')) continue;
      walk(join(target, entry), out);
    }
  } else if (EXTS.has(extname(target)) && !EXEMPT.has(basename(target))) {
    out.push(target);
  }
  return out;
}

function checkFile(file) {
  const found = [];
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split('\n');

  // A file-wide opt-out for pages that must show raw values to teach them
  // (the showcase renders the footgun on purpose). Put this anywhere in the file:
  //   design-harness-ignore-file: hardcoded
  if (/design-harness-ignore-file:\s*hardcoded/.test(raw)) return found;

  lines.forEach((line, i) => {
    // Per-line opt-out: append `design-harness-ignore` in a comment.
    if (/design-harness-ignore\b/.test(line)) return;

    for (const rule of RULES) {
      if (rule.skipLine(line)) continue;
      for (const m of line.matchAll(rule.re)) {
        if (rule.skipMatch?.(m[0])) continue;
        found.push({
          file, line: i + 1, col: m.index + 1,
          match: m[0], msg: rule.msg, fix: rule.fix,
        });
      }
    }
  });

  return found;
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('usage: node checks/check-hardcoded.mjs <file-or-dir> [...]');
  process.exit(2);
}

const files = targets.flatMap(t => walk(t));
const all = files.flatMap(checkFile);

if (all.length === 0) {
  console.log(`✓ hardcoded — ${files.length} file(s) checked, no violations`);
  process.exit(0);
}

console.error(`\n✗ hardcoded — ${all.length} violation(s) in ${new Set(all.map(v => v.file)).size} file(s)\n`);

for (const v of all) {
  const loc = `${relative(process.cwd(), v.file)}:${v.line}:${v.col}`;
  console.error(`  ${loc}`);
  console.error(`    ${v.msg}: ${v.match}`);
  console.error(`    ${v.fix}\n`);
}

process.exit(1);
