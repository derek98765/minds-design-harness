#!/usr/bin/env node
/**
 * check-spacing.mjs — catch the silent Tailwind spacing failure.
 *
 * Spacing numbers in this design system are LITERAL PIXELS. Only 21 values
 * are defined. Tailwind v4 does not error on an undefined spacing number —
 * it quietly resolves against its built-in 4x scale, so `py-10` renders 40px
 * and the layout breaks with no warning. This script makes that loud.
 *
 * Usage:
 *   node checks/check-spacing.mjs <file-or-dir> [...more]
 *   node checks/check-spacing.mjs .
 *
 * Exit code 0 = clean, 1 = violations found.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const VALID = [1, 2, 3, 4, 8, 12, 16, 20, 24, 36, 40, 48, 60, 72, 84, 96, 108, 120, 160, 200, 240];
const VALID_SET = new Set(VALID);

// Utilities whose numeric argument comes from the spacing scale.
const PREFIXES = [
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me',
  'gap', 'gap-x', 'gap-y',
  'space-x', 'space-y',
  'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h',
  'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y',
  'size', 'basis', 'scroll-m', 'scroll-p', 'translate-x', 'translate-y',
];

const EXTS = new Set(['.html', '.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte', '.astro', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'brand', 'assets']);

// Matches an optional variant chain (md:, hover:, lg:group-hover:) then prefix-number.
// Negative margins (-mt-8) are handled by the leading -? .
const pattern = new RegExp(
  String.raw`(?<![\w-])-?(?:(?:[a-z0-9@[\]().%-]+:)*)(` +
    PREFIXES.map(p => p.replace(/-/g, '\\-')).join('|') +
  String.raw`)-(\d+)(?![\w.%-])`,
  'g'
);

function nearestValid(n) {
  // Round DOWN to the nearest token, per the design system rule.
  const below = VALID.filter(v => v <= n);
  return below.length ? below[below.length - 1] : VALID[0];
}

function walk(target, out = []) {
  let st;
  try { st = statSync(target); } catch { return out; }
  if (st.isDirectory()) {
    for (const entry of readdirSync(target)) {
      if (SKIP_DIRS.has(entry) || entry.startsWith('.')) continue;
      walk(join(target, entry), out);
    }
  } else if (EXTS.has(extname(target))) {
    out.push(target);
  }
  return out;
}

function checkFile(file) {
  const violations = [];
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split('\n');

  // File-wide opt-out, for pages that demonstrate bad values on purpose:
  //   design-harness-ignore-file: spacing
  if (/design-harness-ignore-file:\s*spacing/.test(raw)) return violations;

  lines.forEach((line, i) => {
    // Skip lines that are clearly defining the scale itself.
    if (/--spacing-|--space-/.test(line)) return;
    // Per-line opt-out: append `design-harness-ignore` in a comment.
    if (/design-harness-ignore\b/.test(line)) return;

    for (const m of line.matchAll(pattern)) {
      const [full, prefix, digits] = m;
      const n = Number(digits);
      if (VALID_SET.has(n)) continue;
      // 0 is always valid — `gap-0`, `m-0`, `inset-x-0` mean zero in any scale.
      if (n === 0) continue;

      // Fractional-ish utilities like w-1/2 are excluded by the regex already.
      violations.push({
        file, line: i + 1, col: m.index + 1,
        found: full.trim(),
        prefix, value: n,
        suggestion: `${prefix}-${nearestValid(n)}`,
        renders: n * 4,
      });
    }
  });

  return violations;
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('usage: node checks/check-spacing.mjs <file-or-dir> [...]');
  process.exit(2);
}

const files = targets.flatMap(t => walk(t));
const all = files.flatMap(checkFile);

if (all.length === 0) {
  console.log(`✓ spacing — ${files.length} file(s) checked, no violations`);
  process.exit(0);
}

console.error(`\n✗ spacing — ${all.length} violation(s) in ${new Set(all.map(v => v.file)).size} file(s)\n`);
console.error('  These numbers are NOT in the spacing scale. Tailwind will silently');
console.error('  resolve them against its 4px scale and render the wrong size.\n');

for (const v of all) {
  const loc = `${relative(process.cwd(), v.file)}:${v.line}:${v.col}`;
  console.error(`  ${loc}`);
  console.error(`    ${v.found}  →  renders ${v.renders}px, not ${v.value}px`);
  console.error(`    use ${v.suggestion}  (round down to the nearest token)\n`);
}

console.error(`  Valid values: ${VALID.join(', ')}\n`);
process.exit(1);
