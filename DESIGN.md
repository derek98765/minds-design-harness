# Minds Design System — v2

> Category: AI & Consumer
> Cool near-white wash, frosted glass, lit gradient controls, extrabold Manrope.
> Light mode only.

**This is the core spec — read it before any UI work.** It describes the system
that ships on the homepage and on Profile. For logo, mascot, imagery, icons, or
copy voice, see the routing table at the end.

v1 of this harness (warm beige canvas, flat orange pills, near-zero shadow) is
retired. Do not build new pages in that language.

## 1. Overview & Brand Vibe

**Purpose.** Minds are consumer-focused AI agent companions. The interface
should feel approachable and current: light, glassy, and quietly luminous,
with colour used as light rather than as flat paint.

**Audience.** Everyday consumers first. Builders second.

**The name is "Minds."** Never write "Animoca Minds" in a headline, body copy,
or UI label. The lockup "By Animoca Brands" exists only inside the logo artwork.

The ground is a cool off-white wash (`#f6f7fa` → `#fbfcfe`), not a warm beige
and not a cool gray slab. Soft blue and orange blooms sit behind marketing
pages so glass has something to frost. Profile adds a faint blue spotlight
that follows the pointer. Surfaces float: cards are translucent white with a
lit top edge and a blue-grey drop. Filled buttons are top-lit gradients with
an inset rim, so they read as thick, not flat.

Two temperatures of grey do the reading work. Cool grey sits on glass and on
the page. Warm grey is for warm-tinted content, not for the page ground.
Orange is the loud action — the thing the screen is asking for. Blue is the
working action and the selected state.

Key characteristics:
- Cool wash ground, with optional blue and orange radial blooms on marketing pages
- Frosted glass cards and, where a panel needs a rim, nested glass (outer lens, inner body, 3px gap)
- Lit solids for filled controls: top-lit gradient, inset highlight, tinted drop
- Manrope. Marketing headlines are extrabold and large. Product UI uses the compact `.t-*` scale
- Orange for the page's primary ask. Blue (`--blue-lit`) for in-context actions and for selection
- Light mode only. No dark theme

## 2. Color Palette & Roles

> Source of truth: `design-harness/kit/tokens.css`. Never hardcode these hexes.
> Components use aliases (`--text-body-cool`, `--blue-lit`, `--orange`).
> Numbered ramp steps (`--blue-600`, `--grey-warm-400`) stay inside the token file.

### Brand
- **Orange** `#fd8d1d` — `--orange` (`--orange-600`). The loud action.
- **Orange lit** `#fca044` — `--orange-lit`. The highlight stop in an orange gradient.
- **Blue** `#394f95` — `--blue` (`--blue-800`). Brand navy. Text on white when a deep blue is required.
- **Blue lit** `#425cb3` — `--blue-lit` (`--blue-600`). The blue CTAs, links, and active states actually use. Navy goes muddy on a tinted fill; this is the brighter step.
- **Blue tint** `#7d91d4` — `--blue-tint`. Recedes. Selected borders, quiet emphasis.
- **Blue soft** `#eaefff` — `--blue-soft`. Near-white wash.

### Greys
Three ramps, same steps: `50 / 100 / 200 / 400 / 600 / 700 / 950`. `50` is lightest.

| Role | Warm | Cool | Neutral |
|------|------|------|---------|
| Title | `--text-title-warm` | `--text-title-cool` | `--text-title-neutral` |
| Body | `--text-body-warm` | `--text-body-cool` | `--text-body-neutral` |
| Muted | `--text-muted-warm` | `--text-muted-cool` | `--text-muted-neutral` |
| Label | `--text-label-warm` | `--text-label-cool` | `--text-label-neutral` |

Cool is the default on glass and on the page. Warm is for content that sits on a warm surface. Neutral is achromatic: the page canvas token, offline and disabled text.

Lines follow the same temperatures: `--line-light-*`, `--line-*`, `--line-strong-*` (steps 50, 100, 200).

### Ground
- `--canvas-top` `#f6f7fa` → `--canvas-bottom` `#fbfcfe`. The page wash. It stays cool.
- `--bg-card` white. Opaque cards and the secondary button.
- `--bg-panel-cool` — the cool panel fill (a Mind card's lower section).
- `--glass-card` — white at 0.85 alpha. Do not lower it; content has to stay readable.

### Status
`--success`, `--warning`, `--error`, `--yellow`, each with a `-soft` wash. An on/off switch that means "running" uses the green lit gradient (`--gradient-switch-on`), not blue.

### Usage
- Do not paint a section in flat brand orange or flat brand navy. The inverted indigo band from v1 is not part of v2.
- Orange is a control, a small status, or a bloom in the background. It is not a heading colour and not a large fill.
- On glass, text is cool (`--text-title-cool`, `--text-body-cool`). Warm grey reads brown on a cool panel.
- One loud orange action per view. Other actions in that view are blue lit, or the white secondary button.

## 3. Typography

Manrope only, for Latin. `Noto Sans TC` / `Noto Sans SC` for Chinese. No second display face.

### Marketing scale
Landing pages and campaign heroes. Token classes: `text-h1` … `text-h5`, `text-body-*`, `text-caption-*`.

| Role | Desktop → ≤1024 → ≤767 | Weight |
|------|-------------------------|--------|
| H1 | 56 / 48 / 40 | 800 |
| H2 | 44 / 36 / 30 | 800 |
| H3 | 34 / 28 / 24 | 800 |
| H4 | 28 / 24 / 20 | 800 |
| H5 | 22 / 20 / 18 | 700 |
| Body large | 16 | 400 |
| Body default | 14, and **16 on mobile** | 400 |

Headlines track tight (`-0.02em`). Eyebrows are caption-large, weight 500, open tracking, and on v2 they are cool grey (`--text-muted-cool`), not brand blue — unless a single phrase in a headline is the highlight, in which case that phrase is `--blue-lit`.

The homepage hero line is smaller than H1 on purpose (`clamp(22px, 2.4vw, 36px)`), so the statement stays one line above the scene. Use that size for a line that has to sit over photography. Do not set a marketing H1 in the product scale.

### Product scale
Profile and other app surfaces. Classes: `.t-display`, `.t-h1`, `.t-h1-sm`, `.t-h2`, `.t-h3`, `.t-body`, `.t-sm`, `.t-xs`, `.t-label`.

| Class | Desktop | Use |
|-------|---------|-----|
| `.t-display` | 34px / 800 | The largest product heading |
| `.t-h1` | 32px / 800 | Page title |
| `.t-h1-sm` | 24px / 800 | Section title when the page title is gone |
| `.t-h2` | 19px / 700 | Card titles |
| `.t-body` | 14px / 400 | Reading copy |
| `.t-label` | 11px / 700, uppercase | Eyebrows on cards. Cool grey, not blue |

`.t-label` is uppercase. Headlines are not.

### Principles
- Extrabold or quiet. Headlines 800 (700 on `.t-h2` / `.t-h3`). Body 400. Mid weights are for eyebrows, buttons, and labels.
- Body copy is muted cool or warm grey, not pure black.
- At most one highlighted phrase per headline, in `--blue-lit`.
- Mobile form fields render at ≥16px. iOS Safari zooms below that.

## 4. Component Stylings

Reuse `design-harness/kit/` before writing a new control.

### Buttons
Every button is a pill (`--r-pill`). Label is one line (`whitespace-nowrap`).

| Variant | What it is | When |
|---------|------------|------|
| `.btn-lit-orange` | `--btn-primary-orange-bg` + `--btn-primary-orange-shadow` | The action the screen exists to get. One per view. |
| `.btn-lit-blue` | `--btn-primary-blue-bg` + `--btn-primary-blue-shadow` | The default filled action when several actions share a view (Chat, confirm). |
| `.btn-secondary-v2` | White fill, cool hairline, `--blue-lit` label | The quiet button beside a lit primary. |
| Text | `--btn-text-blue` or `--btn-text-orange`, no fill, no shadow | Inline actions. |

A lit button is the pair: gradient **and** shadow. The shadow holds the inset rim. A gradient without the shadow is a flat fill and is wrong. Disabled lit buttons drop the gradient and the shadow and sit pale and flat.

Sizes stay generous: `sm` 8/24, `md` 12/36 (default), `lg` 16/40, `xl` 16/48. Do not shrink padding or type to fit a long label. Stack the row on small screens:

`flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`

Over photography, the secondary control may be a translucent white pill if the white secondary button does not hold. Check it against the image at the button's actual position.

### Glass
- **Content card** — `.glass-card`. One panel. White at 0.85, 14px blur, saturate 1.35, inset white top edge, `--elev-card` drop. Radius `--r-lg` (16px). Hover lifts to `--elev-card-hover`.
- **Nested shell** — `.glass-shell` + `.glass-shell-inner`. The rail and any panel that needs a lit rim. The 3px padding is the rim. Collapsing it to one bordered div flattens the glass.
- Glass needs a non-flat ground behind it. On a marketing page, add `.canvas-blooms`. On a flat colour, blur is invisible.
- Do not put warm-grey text on a cool glass surface.

### Cards that are not glass
An opaque white card is allowed on the wash, with `--elev-card` and `--line-cool` if it needs an edge. Do not alternate beige cards and white cards. That was the v1 rule.

### Inputs
- Fill: `--bg-field-cool` (or `--bg-field-neutral` on the open canvas). `--grey-cool-50` disappears into the wash.
- Edge: `--line-cool` at rest, `--blue` on focus (1px box-shadow ring, not an outline that squares the radius).
- Radius: `--r-md`, or pill for search.
- Font size ≥16px on mobile.
- Checkbox, radio, and switch: the on state is a lit solid. A switch that means "on / running" is green. A checked checkbox is lit blue.

### Selection
Tabs, dropdowns, and segmented filters mark the current choice in `--blue-lit`, not orange. The active rail item is a translucent blue pill (`--glass-pill`) with `--blue-lit` ink and no border.

### Icon buttons
Round, glass or white, cool hairline. Hover may fill with the lit blue or lit orange gradient and flip the icon to white.

## 5. Layout & Spacing

Marketing pages are full-bleed sections stacked vertically. The ground is the wash; a section changes by what it contains (a photograph, a glass band, a bloom), not by swapping beige and white.

Product pages are an app frame: floating nav, optional fixed rail, content column capped near `--max-w` (1680px).

### Spacing scale
Literal pixels. Only these values:

```
1, 2, 3, 4, 8, 12, 16, 20, 24, 36, 40, 48, 60, 72, 84, 96, 108, 120, 160, 200, 240
```

`gap-12` is 12px. A number outside the list falls through to Tailwind's 4px scale with no error. Round down. `checks/check-spacing.mjs` catches it.

### Radius
| Token | Value | Use |
|-------|-------|-----|
| `--r-pill` | pill | Buttons, chips, avatars |
| `--r-xl` | 20px | Large glass shells, feature surfaces |
| `--r-lg` | 16px | Cards |
| `--r-md` | 12px | Inputs, images, small tiles |
| `--r-sm` | 8px | Micro surfaces |

### Breakpoints
Type steps at 1024px and 767px. Layout uses Tailwind defaults. Verify at 390px.

## 6. Depth & Elevation

Elevation is part of the language. Drops are blue-grey, not neutral grey — a grey drop under glass reads as dirt.

| Token | Use |
|-------|-----|
| `--elev-card` | Resting cards and glass cards |
| `--elev-card-hover` | The card under the pointer |
| `--elev-card-selected` | The chosen card. Deeper and bluer than hover |
| `--shadow-lit-blue` / `--shadow-lit-orange` | Only on the matching lit button |
| `--glass-shadow` | The nested glass shell |

Do not invent a second shadow to separate sections. Do not stack shadows for hierarchy that spacing should be doing.

## 7. Motion

Motion confirms that something arrived or changed. It does not perform.

- Hover and colour: ~160–200ms, ease.
- Scroll reveal, when used: fade and a short rise, `cubic-bezier(0.22, 1, 0.36, 1)`, once.
- No parallax, no scroll-jacking, no bounce.

## 8. Do's and Don'ts

### Do
- Use the v2 aliases and the recipe classes.
- Put the page on the cool wash. Add blooms when the page has glass over a marketing ground.
- Use lit orange for the one primary ask, lit blue for the other filled actions.
- Set glass text in cool grey.
- Keep button labels on one line. Stack the row before shortening type.
- Run `checks/` and walk `checks/review-checklist.md`.
- Verify at 390px.

### Don't
- Don't revive the beige canvas, the flat orange pill, or the indigo section band.
- Don't hardcode a hex that already has a token.
- Don't reference a ramp step from a component. Repoint the alias.
- Don't use warm grey on cool glass.
- Don't lower `--glass-card` below 0.85.
- Don't ship a lit button without its shadow.
- Don't use orange as a heading colour or as a large surface.
- Don't add a dark mode.
- Don't write "Animoca Minds" as text.
- Don't use a spacing number outside the 21-step list.

## 9. Responsive Behavior

| Name | Width | What changes |
|------|-------|----------------|
| Mobile | ≤767px | Smallest type step. Single column. Inputs at 16px. |
| Tablet | 768–1024px | Middle marketing type. Grids open. |
| Desktop | ≥1025px | Full type. Split sections sit side by side. |
| Wide | ≥1536px | Content caps. The wash and blooms stay fixed. |

Button rows stack before labels wrap. Split sections stack image below text. The nav may collapse to a sheet. Check 390px for overflow, especially button edges.

## 10. Agent Prompt Guide

### Quick reference
- Ground: `.v2` or `.v2-canvas`, plus `.canvas-blooms` on marketing pages
- Loud CTA: `.btn-lit-orange`
- Other filled CTA: `.btn-lit-blue`
- Quiet pair: `.btn-secondary-v2`
- Card: `.glass-card`
- Page title (product): `.t-h1` in `--text-title-cool`
- Page title (marketing): `text-h1`, one phrase in `--blue-lit`
- Body: `--text-body-cool`
- Eyebrow: `.t-label` or caption-large, `--text-muted-cool`

### Iteration
1. Set the cool wash, and blooms if the page is glass over a marketing ground.
2. Set type before decoration. Marketing headlines stay large.
3. Add one lit orange action. Everything else is blue or secondary.
4. Check every spacing number against the token list.
5. Verify at 390px.
6. Run `checks/` and walk the review checklist.

## Where to look next

| If the page involves… | Read |
|---|---|
| The logo | [brand-logo.md](design-harness/spec/brand-logo.md) |
| The Master Mind, a one-click Mind, or a marketing scene | [brand-mascot.md](design-harness/spec/brand-mascot.md) |
| A hero scene or which character file to use | [brand-imagery.md](design-harness/spec/brand-imagery.md) |
| A UI icon | [brand-iconography.md](design-harness/spec/brand-iconography.md) |
| Headlines and body copy | [voice-and-copy.md](design-harness/spec/voice-and-copy.md) |

`design-harness/style-guide/index.html` renders the v2 tokens, glass, and lit controls. Compare against that, and against the full-page captures in `ui-examples/`.
