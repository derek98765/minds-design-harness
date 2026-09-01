# Minds design harness — agent rules

You are building a **Minds** campaign or landing page. Follow these exactly.
They override your defaults.

## Keep agent instructions mirrored

`CLAUDE.md` and `AGENTS.md` are mirrors. Whenever you change either file, make the
same change to the other file in the same commit so their contents remain identical.

## Before you write any UI

Read [design-harness/spec/DESIGN.md](design-harness/spec/DESIGN.md). It is short and it is the system.

## The brand is "Minds"

Never write "Animoca Minds" in body copy, headlines, or UI. The lockup
"By Animoca Brands" exists only inside the logo artwork — never retype it as text.

## Non-negotiables

1. **Spacing numbers are literal pixels, and only these 21 are valid:**

   `1, 2, 3, 4, 8, 12, 16, 20, 24, 36, 40, 48, 60, 72, 84, 96, 108, 120, 160, 200, 240`

   `gap-8` is 8px, not 32px. A number outside this list **fails silently** — Tailwind
   resolves it against its built-in 4px scale, so `py-10` renders 40px and the layout
   breaks without an error. When a value falls between tokens, round **down**.
   Common mistakes: `py-5`, `gap-6`, `py-10`, `gap-10`, `py-14`, `gap-14`, `gap-28`, `py-28`.

2. **Never hardcode a color, size, radius, or shadow.** Everything lives in
   [design-harness/kit/tokens.css](design-harness/kit/tokens.css). Use `bg-brand-orange-500`, not `#fd8d1d`.

3. **Never use inline `style={{}}` for anything in the token system.** It overrides
   responsive classes and causes bugs that look like design mistakes.

4. **Reuse what's in `design-harness/kit/`.** Do not build a one-off button, card, or input.

5. **Orange is for action only.** Exactly one orange CTA per section. If there are two,
   one of them is wrong. Orange is never a section/large-block background and never a heading
   color. Five exceptions, all specific to the indigo section canvas — blue-on-blue disappears
   there, so it's the one surface where orange substitutes for blue: the headline highlight
   (still at most one phrase); the eyebrow above a headline; a numbered-step circle (blue by
   default elsewhere, including white — every circle in one list stays the same color); a
   genuinely small, non-clickable accent anywhere — a status badge, a pagination dot, an
   icon-button hover fill; and a checked checkbox, radio, or on/off switch, which fills orange
   as its binary yes/no state on any background. None of these extend to a large fill or a
   full-width bar.

   **Which CTA color:** `primary` (orange) is the default for a CTA sitting directly on the
   section canvas. Use `secondary` (blue) instead when the CTA is inside a card, or when the
   page background is a warm brown/orange photo tone — orange would either disappear into it
   or read as a second orange competing with the section's real CTA. This doesn't relax the
   one-orange-CTA rule; a blue button in a card was never competing for orange to begin with.

6. **Blue marks the selected state in tabs, dropdowns, and filter toggles — not orange.**
   Active tab label + underline, the selected item in a dropdown menu, the selected icon in a
   segmented/toggle-tab filter (e.g. All / Online / Offline) — all `brand-blue-500`. Don't
   confuse a toggle-**tab** filter group (a choice among options, blue) with an on/off
   **switch** (a binary checked state, orange) — same word, opposite color, different
   component. This selected-state blue isn't a CTA and doesn't compete with the one-orange
   rule above.

7. **Adjacent sections never share a background.** The rhythm is warm canvas → white →
   warm canvas. Structure comes from background change and whitespace, never from
   hairline rules.

8. **No dark mode.** Do not add `prefers-color-scheme` blocks or dark variants.

9. **Mobile inputs must render at ≥16px.** iOS Safari auto-zooms below that. Use
   `text-[16px] md:text-body-default` on any `input`, `textarea`, or `select`.

10. **Button text is always one line.** Every button carries `whitespace-nowrap` — never
    remove it. Since the label then overflows instead of wrapping, the row has to give:
    put two side-by-side buttons in
    `flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`
    so they stack on mobile. If a stacked button still overflows at 390px, the label is
    too long — **stop and propose shorter wording to the user** instead of picking it
    yourself. Never shrink padding, type, or the size variant to fit a long label.

11. **Never leave a placeholder box where a page needs a real image.** Check
    `design-harness/assets/` first — Abby poses, hand stickers, and existing photography
    live there. If nothing fits, generate one with the `codex-image-gen` skill following
    the formula in [design-harness/spec/brand-imagery.md](design-harness/spec/brand-imagery.md), and save it to the
    consuming project's own `src/images/` (not into `design-harness/assets/`, which is
    the fixed brand library). `codex-image-gen` needs the `codex` CLI installed
    (`npm install -g @openai/codex`) — if it's missing, stop and walk the user through
    installing it (and Node/npm first, if needed) rather than falling back to a
    placeholder.

## Before you say you're done

Run the checks and fix anything they report:

```bash
node design-harness/checks/check-spacing.mjs <your-file-or-dir>
node design-harness/checks/check-hardcoded.mjs <your-file-or-dir>
node design-harness/checks/check-button-text.mjs <your-file-or-dir>
```

Point them at the page or folder you changed (e.g. `src`), not the whole project.

Then walk [design-harness/checks/review-checklist.md](design-harness/checks/review-checklist.md) — it covers what a
script cannot judge. Verify the page at 390px wide before calling it finished.

## Which lane to build in

| Situation | Lane |
|---|---|
| Static one-pager, no form logic, needs to open in a browser | `design-harness/kit/html/starter.html` |
| Has forms, state, routing, or data | `design-harness/kit/react/` |

## Read these only when the task calls for it

Do not read these by default — they are situational.

| If the page involves… | Read |
|---|---|
| The Minds logo — placement, sizing, a header/footer | [design-harness/spec/brand-logo.md](design-harness/spec/brand-logo.md) |
| Abby the mascot, or hand-sticker accents | [design-harness/spec/brand-mascot.md](design-harness/spec/brand-mascot.md) |
| Choosing or generating photography / hero imagery | [design-harness/spec/brand-imagery.md](design-harness/spec/brand-imagery.md) |
| Drawing a new icon (not reusing an existing one) | [design-harness/spec/brand-iconography.md](design-harness/spec/brand-iconography.md) |
| Writing or rewriting headlines and body copy | [design-harness/spec/voice-and-copy.md](design-harness/spec/voice-and-copy.md) |

`design-harness/brand-guideline/` holds the two source PDFs. Consult them only if the markdown specs
genuinely don't answer the question — they are slow and expensive to read. Start with
`brand-guideline-lite.pdf` (1 page); reach for `brand-guideline-full.pdf` (34 pages)
only when the lite version doesn't cover it. The full version wins if they conflict.
See [design-harness/brand-guideline/README.md](design-harness/brand-guideline/README.md).

## What "good" looks like

[design-harness/style-guide/index.html](design-harness/style-guide/index.html) renders every token, component, and composed
section. When unsure whether your output is on-brand, compare it against the style-guide
blocks rather than guessing.

## Before starting a new page's UI

Look at [design-harness/ui-examples/](design-harness/ui-examples/) — full-page screenshots of real, shipped Minds
pages (home, for-everyone, about, a campaign page, bazaar, tutorials). Where the style
guide shows components in isolation, this shows how they compose into a real page:
section rhythm, density, and how much content actually fills a section. Skim it before
laying out a new page, especially one similar to a page already in there.
