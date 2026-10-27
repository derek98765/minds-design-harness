# Minds design harness — agent rules

You are building a **Minds** campaign or landing page. Follow these exactly.
They override your defaults.

## Keep agent instructions mirrored

`CLAUDE.md` and `AGENTS.md` are mirrors. Whenever you change either file, make the
same change to the other file in the same commit so their contents remain identical.

## Before you write any UI

Read [DESIGN.md](DESIGN.md). It is short and it is the system.

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
   [design-harness/styles-and-components/tokens.css](design-harness/styles-and-components/tokens.css). Use `var(--orange)` or `bg-orange`, not `#fd8d1d`.

3. **Never use inline `style={{}}` for anything in the token system.** It overrides
   responsive classes and causes bugs that look like design mistakes.

4. **Reuse what's in `design-harness/styles-and-components/`.** Do not build a one-off button, card, or input.

5. **Orange is for action only.** Exactly one orange CTA per section. If there are two,
   one of them is wrong. Orange is never a section/large-block background and never a heading
   color. The headline highlight (at most one phrase) is `--blue-lit`, and the eyebrow above a
   headline is cool grey (`--text-muted-cool`). Outside the CTA, orange appears only as a small,
   non-clickable accent — a status badge, an icon-button hover fill — or as the soft blooms in
   the page background. Never a large fill or a full-width bar.

   **Checked controls are not orange.** A checked checkbox or radio is lit blue
   (`--gradient-blue` + `--shadow-lit-blue`). An on/off switch that means "running" is green
   (`--gradient-switch-on`).

   **Which CTA color:** `primary` (orange) is the default for a CTA sitting directly on the
   section canvas. Use `secondary` (blue) instead when the CTA is inside a card, or when the
   page background is a warm brown/orange photo tone — orange would either disappear into it
   or read as a second orange competing with the section's real CTA. This doesn't relax the
   one-orange-CTA rule; a blue button in a card was never competing for orange to begin with.

6. **Blue marks the selected state in tabs, dropdowns, and filter toggles — not orange.**
   Active tab label + underline, the selected item in a dropdown menu, the selected icon in a
   segmented/toggle-tab filter (e.g. All / Online / Offline) — all `--blue-lit`. Don't
   confuse a toggle-**tab** filter group (a choice among options, blue) with an on/off
   **switch** (a binary "running" state, green) — same word, different color, different
   component. This selected-state blue isn't a CTA and doesn't compete with the one-orange
   rule above.

7. **The ground is one cool wash; sections don't alternate backgrounds.** Every page sits on
   the v2 wash (`.v2`, plus `.canvas-blooms` on marketing pages so glass has something to
   frost). A section changes by what it contains — a photograph, a glass band, a bloom — not
   by swapping beige and white, and never by a hairline rule. The v1 warm canvas and indigo
   band are retired.

8. **No dark mode.** Do not add `prefers-color-scheme` blocks or dark variants.

9. **Mobile inputs must render at ≥16px.** iOS Safari auto-zooms below that. Use
   `text-[16px] md:text-body` on any `input`, `textarea`, or `select`.

10. **Button text is always one line.** Every button carries `whitespace-nowrap` — never
    remove it. Since the label then overflows instead of wrapping, the row has to give:
    put two side-by-side buttons in
    `flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`
    so they stack on mobile. If a stacked button still overflows at 390px, the label is
    too long — **stop and propose shorter wording to the user** instead of picking it
    yourself. Never shrink padding, type, or the size variant to fit a long label.

11. **Never leave a placeholder box where a page needs a real image.** Check
    `design-harness/assets/` first — `artwork/` has info-graphics, avatars, and
    illustrations, `minds-mascot/` has clean Mind cutouts and toy cards, `brand/` has the
    logos and icons. If nothing fits, **stop and ask the user**: say what the page needs
    and which files came closest. Do not generate an image yourself. If the user then
    asks for a new icon or toy card, use the `generate-minds-icons` or
    `generate-minds-figurines` skill, and save the result to the consuming
    project's own `src/images/` (not into `design-harness/assets/`, which is the fixed
    brand library). Both skills need the `image-gen` skill installed
    (https://github.com/derek98765/image-gen); if it's missing, point the user there.

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
| Static one-pager, no form logic, needs to open in a browser | `design-harness/styles-and-components/html/starter.html` |
| Has forms, state, routing, or data | `design-harness/styles-and-components/react/` |

## Read these only when the task calls for it

Do not read these by default — they are situational.

| If the page involves… | Read |
|---|---|
| The Minds logo — placement, sizing, a header/footer | [design-harness/spec/brand-logo.md](design-harness/spec/brand-logo.md) |
| The Master Mind or a one-click Mind character | [design-harness/spec/brand-mascot.md](design-harness/spec/brand-mascot.md) |
| Choosing a hero, scene, or character image | [design-harness/spec/brand-imagery.md](design-harness/spec/brand-imagery.md) |
| A specific Mind's icon, or drawing a new icon | [design-harness/spec/brand-iconography.md](design-harness/spec/brand-iconography.md) |
| Writing or rewriting headlines and body copy | [design-harness/spec/voice-and-copy.md](design-harness/spec/voice-and-copy.md) |

`design-harness/brand-guideline/` holds the two source PDFs. Consult them only if the markdown specs
genuinely don't answer the question — they are slow and expensive to read. Start with
`brand-guideline-lite.pdf` (1 page); reach for `brand-guideline-full.pdf` (34 pages)
only when the lite version doesn't cover it. The full version wins if they conflict.
See [design-harness/brand-guideline/README.md](design-harness/brand-guideline/README.md).

## What "good" looks like

[design-harness/styles-and-components/style-guide.html](design-harness/styles-and-components/style-guide.html) shows every token and every component in
`design-harness/styles-and-components/react/`, with how to use each one. When unsure whether your output is
on-brand, compare it against the style guide rather than guessing.

## Before starting a new page's UI

Look at [design-harness/sample-screens/](design-harness/sample-screens/) — full-page screenshots of real, shipped Minds
pages (the homepage, the launch-a-Mind modal, and the signed-in profile pages). Where the style
guide shows components in isolation, this shows how they compose into a real page:
section rhythm, density, and how much content actually fills a section. Skim it before
laying out a new page, especially one similar to a page already in there.
