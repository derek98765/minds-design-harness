#!/usr/bin/env node
/**
 * check-button-text.mjs — keep button labels on one line.
 *
 * A wrapped button label inflates the pill into a two-line lozenge and destroys
 * the silhouette the generous padding exists to create. Two rules follow:
 *
 *   1. Every button carries `whitespace-nowrap`.
 *   2. Because a nowrap label OVERFLOWS instead of wrapping, a row holding two
 *      or more buttons must stack on mobile (`flex-col` + `sm:flex-row`).
 *      A bare `flex flex-wrap` row is the exact shape that breaks at 390px:
 *      flex-wrap moves whole buttons to the next line, but it cannot stop a
 *      single too-wide button from running off the screen.
 *
 * Neither is catchable by check-spacing or check-hardcoded — the values are all
 * legal, it is the combination that is wrong.
 *
 * Usage:
 *   node checks/check-button-text.mjs <file-or-dir> [...more]
 *
 * Exit code 0 = clean, 1 = violations found.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, extname, relative, resolve, dirname, sep } from 'node:path';

const EXTS = new Set(['.html', '.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte', '.astro', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'brand', 'assets']);

const HARNESS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function walk(target, out = [], isRoot = false) {
  if (!isRoot && (resolve(target) === HARNESS_ROOT || resolve(target).startsWith(HARNESS_ROOT + sep))) return out;
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

// A pill with real padding is a button. `rounded-full` alone is not enough —
// avatars, dots and chips are round too, so require button-scale x-padding.
const BUTTON_PADDING = /\bpx-(?:24|36|40|48)\b/;
const isButtonish = (cls) => /\brounded-full\b/.test(cls) && BUTTON_PADDING.test(cls);

// Pull every class attribute out of a line, HTML and JSX alike.
const CLASS_ATTR = /(?:class|className)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;

function classAttrs(line) {
  const out = [];
  for (const m of line.matchAll(CLASS_ATTR)) {
    out.push({ cls: m[1] ?? m[2] ?? m[3] ?? '', index: m.index });
  }
  return out;
}

function checkFile(file) {
  const violations = [];
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split('\n');

  if (/design-harness-ignore-file:\s*button-text/.test(raw)) return violations;

  lines.forEach((line, i) => {
    if (/design-harness-ignore\b/.test(line)) return;

    for (const { cls, index } of classAttrs(line)) {
      // ── Rule 1: a button must not be allowed to wrap ──────────────────
      if (isButtonish(cls) && !/\bwhitespace-nowrap\b/.test(cls)) {
        violations.push({
          file, line: i + 1, col: index + 1, rule: 'nowrap',
          detail: 'button label can wrap to two lines',
          fix: 'add `whitespace-nowrap`',
        });
      }
      if (/\bwhitespace-normal\b/.test(cls) && isButtonish(cls)) {
        violations.push({
          file, line: i + 1, col: index + 1, rule: 'nowrap',
          detail: '`whitespace-normal` re-enables wrapping on a button',
          fix: 'remove it — button text is always one line',
        });
      }

      // ── Rule 2: a multi-button row must stack on mobile ───────────────
      // Only flag a flex row that does NOT already stack. `flex-col` with an
      // `sm:flex-row` is the correct shape; so is a plain `flex-col`.
      const isFlexRow = /\bflex\b/.test(cls) && !/\bflex-col\b/.test(cls) && !/\binline-flex\b/.test(cls);
      if (isFlexRow && countButtonsInRow(lines, i) >= 2) {
        violations.push({
          file, line: i + 1, col: index + 1, rule: 'stack',
          detail: 'row holds 2+ buttons but never stacks — they overflow at 390px',
          fix: 'use `flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`',
        });
      }
    }
  });

  return violations;
}

// Count buttons in the handful of lines following a row opener. Buttons in this
// system are one-per-line, so a small window is enough and keeps this a simple
// text check rather than a parser.
function countButtonsInRow(lines, startIdx) {
  let depth = 0;
  let count = 0;
  for (let i = startIdx; i < Math.min(startIdx + 12, lines.length); i++) {
    const line = lines[i];
    for (const { cls } of classAttrs(line)) {
      if (isButtonish(cls)) count++;
    }
    // Stop at the row's closing tag, approximated by a dedent to a closing div.
    if (i > startIdx && /^\s*<\/(div|section)>/.test(line)) {
      if (depth === 0) break;
      depth--;
    }
    if (i > startIdx && /<div[^>]*>/.test(line) && !/<\/div>/.test(line)) depth++;
  }
  return count;
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('usage: node checks/check-button-text.mjs <file-or-dir> [...]');
  process.exit(2);
}

const files = targets.flatMap(t => walk(t, [], true));
const all = files.flatMap(checkFile);

if (all.length === 0) {
  console.log(`✓ button text — ${files.length} file(s) checked, no violations`);
  process.exit(0);
}

console.error(`\n✗ button text — ${all.length} violation(s) in ${new Set(all.map(v => v.file)).size} file(s)\n`);
console.error('  Button labels are always one line. A wrapped label turns the pill into');
console.error('  a lozenge; a nowrap label that is too long overflows instead, so the');
console.error('  ROW has to stack on mobile.\n');

for (const v of all) {
  const loc = `${relative(process.cwd(), v.file)}:${v.line}:${v.col}`;
  console.error(`  ${loc}`);
  console.error(`    ${v.detail}`);
  console.error(`    ${v.fix}\n`);
}

console.error('  If a button still overflows at 390px once stacked, the label is too');
console.error('  long — propose shorter copy. Never shrink padding or type to fit.\n');
process.exit(1);
