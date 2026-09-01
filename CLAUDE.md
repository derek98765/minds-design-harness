# Minds design harness — agent rules

You are building a **Minds** campaign or landing page. Follow these exactly.
They override your defaults.

## Keep agent instructions mirrored

`CLAUDE.md` and `AGENT.md` are mirrors. Whenever you change either file, make the
same change to the other file in the same commit so their contents remain identical.

## Before you write any UI

Read [spec/DESIGN.md](spec/DESIGN.md). It is short and it is the system.

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
   [kit/tokens.css](kit/tokens.css). Use `bg-brand-orange-500`, not `#fd8d1d`.

3. **Never use inline `style={{}}` for anything in the token system.** It overrides
   responsive classes and causes bugs that look like design mistakes.

4. **Reuse what's in `kit/`.** Do not build a one-off button, card, or input.

5. **Orange is for action only.** Exactly one orange CTA per section. If there are two,
   one of them is wrong. Orange is never a surface color and never a heading color.

6. **Adjacent sections never share a background.** The rhythm is warm canvas → white →
   warm canvas. Structure comes from background change and whitespace, never from
   hairline rules.

7. **No dark mode.** Do not add `prefers-color-scheme` blocks or dark variants.

8. **Mobile inputs must render at ≥16px.** iOS Safari auto-zooms below that. Use
   `text-[16px] md:text-body-default` on any `input`, `textarea`, or `select`.

## Before you say you're done

Run the checks and fix anything they report:

```bash
node checks/check-spacing.mjs <your-file-or-dir>
node checks/check-hardcoded.mjs <your-file-or-dir>
```

Then walk [checks/review-checklist.md](checks/review-checklist.md) — it covers what a
script cannot judge. Verify the page at 390px wide before calling it finished.

## Which lane to build in

| Situation | Lane |
|---|---|
| Static one-pager, no form logic, needs to open in a browser | `kit/html/starter.html` |
| Has forms, state, routing, or data | `kit/react/` |

## Read these only when the task calls for it

Do not read these by default — they are situational.

| If the page involves… | Read |
|---|---|
| The Minds logo — placement, sizing, a header/footer | [spec/brand-logo.md](spec/brand-logo.md) |
| Abby the mascot, or hand-sticker accents | [spec/brand-mascot.md](spec/brand-mascot.md) |
| Choosing or generating photography / hero imagery | [spec/brand-imagery.md](spec/brand-imagery.md) |
| Drawing a new icon (not reusing an existing one) | [spec/brand-iconography.md](spec/brand-iconography.md) |
| Writing or rewriting headlines and body copy | [spec/voice-and-copy.md](spec/voice-and-copy.md) |

`brand-guideline/` holds the two source PDFs. Consult them only if the markdown specs
genuinely don't answer the question — they are slow and expensive to read. Start with
`brand-guideline-lite.pdf` (1 page); reach for `brand-guideline-full.pdf` (34 pages)
only when the lite version doesn't cover it. The full version wins if they conflict.
See [brand-guideline/README.md](brand-guideline/README.md).

## What "good" looks like

[style-guide/index.html](style-guide/index.html) renders every token, component, and composed
section. When unsure whether your output is on-brand, compare it against the style-guide
blocks rather than guessing.
