# Minds design harness

Build campaign and landing pages that look like they came from the Minds design team,
without being a designer.

## Set it up

Copy three things into your project folder:

```
your-project/
├── CLAUDE.md          ← from this repo's root
├── AGENTS.md          ← from this repo's root
└── design-harness/    ← this whole folder
```

`CLAUDE.md` has to sit at the **top level of your project** — Claude Code only reads it
from there, never from inside a subfolder. That file is what makes everything else apply
automatically. (`AGENTS.md` is the same content, for tools that look for that name.)

## Use it

Open Claude Code in your project and describe the page you want:

> Build a registration page for our Minds launch event on March 3rd.

That's the whole workflow. Claude picks up the rules and builds to them. You don't need
to know the design system — it does.

## What you get

A page that uses the right colours, type, spacing, and section rhythm, and that has been
checked against the rules before it's handed to you.

## If you want to build by hand instead

| You want | Start from |
|---|---|
| A static one-page site | `design-harness/kit/html/starter.html` — copy it, replace the content |
| Something with forms or logic | `design-harness/kit/react/` |
| To see what's available | Open `design-harness/style-guide/index.html` in a browser |

Then check your work — point it at what you changed, not the whole project:

```bash
node design-harness/checks/check-spacing.mjs src
node design-harness/checks/check-hardcoded.mjs src
node design-harness/checks/check-button-text.mjs src
```

## The one thing worth knowing

Spacing numbers are **literal pixels**, and only these 21 exist:

```
1  2  3  4  8  12  16  20  24  36  40  48  60  72  84  96  108  120  160  200  240
```

`gap-16` is 16px. But `py-10` is **not** 10px — 10 isn't on the list, so it silently
renders at 40px and the layout breaks with no error. When in doubt, round down.
`check-spacing.mjs` catches this.

## What's in here

```
spec/             The design rules. DESIGN.md is the core; the brand-*.md files
                  cover logo, mascot, imagery, icons, and copy voice.
kit/              The parts — tokens.css, HTML starter, React components.
style-guide/      One HTML page showing every colour, text size, button and
                  section, live in a browser. Open it to see what "on-brand" looks like.
checks/           Scripts that catch mistakes, plus a human review checklist.
assets/           Logos, Abby the mascot, hand stickers, photography.
brand-guideline/  The two brand guideline PDFs — full and lite. See its README
                  for which to read when.
```

## Questions a designer would ask you

If you're unsure whether a page is right, the fast answers:

- **Backgrounds alternate?** Warm canvas → white → warm canvas. Never two the same in a row.
- **How much orange?** One action per section. That's it.
- **Checked on a phone?** 390px wide. Always.

The full list is in [checks/review-checklist.md](checks/review-checklist.md).
