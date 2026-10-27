# Minds Design System — v2

> Category: AI & Consumer
> Cool near-white wash, frosted glass, lit gradient controls, extrabold Manrope.
> Light mode only.

**This is the core spec — read it before any UI work.** It describes the system
that ships on the homepage and on Profile. Brand specs (logo, mascot, imagery,
icons, copy voice) are separate documents kept in the Minds design harness.

v1 (warm beige canvas, flat orange pills, near-zero shadow) is retired. Do not
build new pages in that language.

## 1. Overview & Brand Vibe

**Purpose.** Minds are consumer-focused AI agent companions. The interface
should feel approachable and current: light, glassy, and quietly luminous,
with colour used as light rather than as flat paint.

**Audience.** Everyday consumers first. Builders second.

**The name is "Minds."** Never write "Animoca Minds" in a headline, body copy,
or UI label. The lockup "By Animoca Brands" exists only inside the logo artwork.

The ground is a cool off-white wash (`#f6f7fa` → `#fbfcfe`, top to bottom),
not a warm beige and not a cool gray slab. Profile adds a faint blue spotlight
that follows the pointer. Surfaces float: cards are translucent white with a
lit top edge and a blue-grey drop. Filled buttons are top-lit gradients with
an inset rim, so they read as thick, not flat.

Two temperatures of grey do the reading work. Cool grey sits on glass and on
the page. Warm grey is for warm-tinted content, not for the page ground.
Orange is the loud action — the thing the screen is asking for. Blue is the
working action and the selected state.

Key characteristics:
- Cool wash ground on every v2 page, fixed behind the content
- Frosted glass cards and, where a panel needs a rim, nested glass (outer lens, inner body, 3px gap)
- Lit solids for filled controls: top-lit gradient, inset highlight, tinted drop
- Manrope. Marketing headlines are extrabold and large. Product UI uses the smaller steps of the same `text-*` scale
- Orange for the page's primary ask. Blue (`--blue-lit`) for in-context actions and for selection
- Light mode only. No dark theme

## 2. Color Palette & Roles

> Source of truth: `src/assets/styles/tokens-v2.css`. Never hardcode these hexes.
> Components use aliases (`--text-body-cool`, `--blue-lit`, `--orange`).
> Numbered ramp steps (`--blue-600`, `--grey-warm-400`) stay inside the token file.

### Scope
The scale and the aliases are on `:root`, so any page can use them. The
component classes (`.btn-lit-orange-v2`, `.checkbox-v2`, …) are scoped
`.v2 .x-v2` and do nothing without a `.v2` ancestor. A v2 page imports
`tokens-v2.css` and wraps its content in `<div className="v2">`. Anything
portalled to `<body>` (Radix menus and dialogs, the toast) sits outside that
subtree: put `v2` on the portalled content, or use the literals in
`glass/glassMenuStyles.js`.

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

The legacy `--ink-*` / `--line-card` / `--tray-*` names are a `.v2`-scoped
migration shim for Profile. New code uses the aliases above.

### Ground
- **The wash** — `linear-gradient(180deg, #f6f7fa, #fbfcfe)`, painted on `body:has(.v2)` with `background-attachment: fixed`, so it runs unbroken behind the floating nav. It applies to every v2 page at once and stays cool. If one page needs a different ground, give that page's sections a background; don't edit the wash.
- `--canvas` `#fafafa` (`--bg-page-neutral`) — the flat canvas colour under it.
- `--bg-card` white. Opaque cards and the secondary button.
- `--bg-modal` `#fbfcfe` — the modal surface.
- `--bg-panel-cool` — the cool panel fill (a Mind card's lower section, a hover fill).
- `--glass-card` — white at 0.85 alpha. Do not lower it; content has to stay readable.

### Status
`--success`, `--warning`, `--error`, `--yellow`, each with a `-soft` wash. An on/off switch that means "running" uses the green lit gradient (`--gradient-switch-on`), not blue.

### Usage
- Do not paint a section in flat brand orange or flat brand navy. The inverted indigo band from v1 is not part of v2.
- Orange is a control or a small status. It is not a heading colour and not a large fill.
- On glass, text is cool (`--text-title-cool`, `--text-body-cool`). Warm grey reads brown on a cool panel.
- One loud orange action per view. Other actions in that view are blue lit, or the white secondary button.

## 3. Typography

Type is the primary visual device. Layouts rely on big, confident text and generous whitespace rather than dividing lines or boxes.

### Font Family
- Primary: `Manrope`, fallback `sans-serif` — `--font-family-primary`. Used for every piece of Latin text. There is no secondary or display family.
- Chinese: `Noto Sans TC` (traditional) and `Noto Sans SC` (simplified).

### Weights
300 light · 400 regular · 500 medium · 600 semibold · 700 bold · 800 extrabold.

### Hierarchy

One scale for every page — marketing and product alike. Defined in `tokens.css`.

| Class | Size (desktop → ≤1024px → ≤767px) | Weight | Line height | Tracking | Use |
|-------|-----------------------------------|--------|-------------|----------|-----|
| `text-display` | 56 → 48 → 40 | set at call site (800) | **59 → 51 → 42px** | −0.28px | Hero headlines |
| `text-h1` | 44 → 36 → 30 | set at call site (800) | **49 → 40 → 33px** | −0.22px | Page-level marketing headlines |
| `text-h2` | 32 → 28 → 24 | **800** | **38 → 34 → 29px** | **−0.5 → −0.4 → −0.3px** | Section headlines, big figures |
| `text-h3` | 28 → 24 → 20 | set at call site (800) | **34 → 29 → 24px** | 0 | Feature titles |
| `text-h4` | 24 → 21 → 19 | **800** | **29 → 26 → 23px** | **−0.24 → −0.2 → −0.16px** | Product page titles (`PageTitle`) |
| `text-h5` | 22 → 20 → 18 | set at call site (700) | **28 → 25 → 23px** | 0 | Small headings |
| `text-h6` | 19 → 18 → 17 | **700** | **24 → 23 → 22px** | **−0.2 → −0.2 → −0.1px** | Card headings — smallest heading |
| `text-item-title` | 15 | **700** | **21px** | 0 | Item, card and row names, empty-state titles. Not a heading |
| `text-body-xl` | 18 → 18 → 16 | set at call site | `leading-body` | 0 | Lede paragraphs |
| `text-body-lg` | 16 → 16 → 15 | set at call site | `leading-body` | 0 | Reading text |
| `text-body-md` | 14 → 14 → 13 | set at call site | `leading-body` | 0 | Default UI copy |
| `text-body-sm` | 13 | set at call site | `leading-body` / `leading-normal` | 0 | Secondary text |
| `text-body-xs` | 12 | set at call site | `leading-body` | 0 | Fine print, meta |
| `text-label` | 11 | **700** | **15px** | **+0.06em, uppercase** | Section labels |

**Bold values are built into the class.** Every heading class carries its own whole-pixel line-height, stepping down with its size — don't add `leading-*` to a heading. `text-h2`, `text-h4`, `text-h6`, `text-item-title` and `text-label` also carry their weight; give `text-display`, `text-h1`, `text-h3` and `text-h5` a weight at the call site. Body tiers set size only: pair them with `leading-body`. Every tier is a Tailwind utility, so `font-*`, `leading-*`, `tracking-*` and `md:`-style variants on the same element override it. Add `t-num` for tabular figures.

Use these classes, never raw px. The responsive steps are built in, so one class scales across all three breakpoints. Heading **tags** follow the page outline (one `<h1>` per page, sections `<h2>`, …), not the visual size — choose the class for the size and the tag for the structure.

### Principles
- **Extrabold or quiet, nothing between.** Headlines sit at 800; body sits at 400. The gap between them is the hierarchy. Mid-weights (500/600) appear only on eyebrows and small labels; buttons are 700.
- **Tracking runs opposite by scale.** Large headlines tighten (display −0.28px, h1 −0.22px, h2 −0.5px); labels and eyebrows open up (+0.06em). Everything between sits at zero.
- **Headlines may highlight one phrase.** One phrase per headline, in `--blue-lit`. Never orange.
- **Body text stays muted.** `--text-body-cool` on the wash and on glass. Readable but never competing with the headline.
- **Eyebrows are small and uppercase.** `text-label` (or `text-body-lg uppercase` on marketing pages) in `--text-muted-cool`.
- **Buttons are sentence case.** Bold, no tracking, never `text-label` or uppercase.

### Don'ts
- **No all-caps headlines.** Eyebrows are uppercase; headlines never are.
- No cramped line height — heading line heights are whole pixels (display 59px down to h6 22px); body sits at 155%.
- No manual letter-spacing beyond the tokens.

## 4. Component Stylings

Reuse what ships before writing a new control: `src/components/ui/`, the
Profile kit (`src/app/pages/Profile/components/kit.jsx`), and the v2 components
listed below. The `/style-guide` page (dev only) renders every one of them with
its source file — check it first.

### Buttons
Every button is a pill (`--r-pill`), bold, sentence case, one line (`whitespace-nowrap`).

**Product UI — `Action`** (`components/billing/ui.jsx`, built on the kit's `Btn`):

| `look` | What it is | When |
|---------|------------|------|
| `primary` | `.btn-lit-orange-v2`: `--btn-primary-orange-bg` + `--btn-primary-orange-shadow` | The action the screen exists to get. One per view. |
| `primary-blue` | `.btn-lit-blue-v2`: `--btn-primary-blue-bg` + `--btn-primary-blue-shadow` | The default filled action when several actions share a view (Chat, confirm). |
| `secondary` | `.btn-outline-blue-v2`: white fill, cool hairline, `--blue-lit` label | The quiet button beside a lit primary. Add `.btn-danger-v2` for a destructive one. |
| `text` | Grey label, underline on hover, no fill | Dismissals ("Not now"). |
| `link` | `.text-link-v2`, `--blue-lit` | Inline links. |
| `muted` + `disabled` | Flat cool grey pill at full opacity | A status, not an action ("Current plan"). |
| `buy` | `primary` or `primary-blue`, per the buy-colour setting | Upgrade and purchase buttons. |

Sizes (height · type): `sm` 32px · 13px, `md` 38px · 13px (default), `lg` 44px · 15px.

**Marketing pages** — `.btn-grad-orange-v2` / `.btn-grad-blue-v2` (in
`pages/Home/home.css`, scoped `.v2.home-v2`): the same lit tokens at 48px tall,
24px side padding, 15px bold.

A lit button is the pair: gradient **and** shadow. The shadow holds the inset rim. A gradient without the shadow is a flat fill and is wrong. Disabled lit buttons drop the gradient and the shadow and sit pale and flat.

`components/ui/button.jsx` (`Button`) is the v1 button and is still on some
marketing sections. Don't use it for new v2 UI.

Do not shrink padding or type to fit a long label. Stack the row on small screens:

`flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`

### Glass
- **Content card** — `.glass-card-v2` (the kit's `Card` uses it). One panel. White at 0.85, 14px blur, saturate 1.35, inset white top edge, `--elev-card` drop; hover lifts to `--elev-card-hover`. Radius `--r-lg` (16px). Not `.v2`-scoped, so it works anywhere.
- **No-blur variant** — add `.glass-noblur-v2` on a card that hosts `mix-blend-multiply` media (the Mind portraits). Backdrop blur isolates the blend and leaves white corners.
- **Nested shell** — the rail and the glass menus: an outer lens (`--glass-outer`, `--glass-rim`) around an inner body (`--glass-inner`) with a 3px gap. The gap is the rim. Collapsing it to one bordered div flattens the glass. Portalled menus take their values from `glass/glassMenuStyles.js`.
- Glass needs the v2 wash behind it. On a flat colour, blur is invisible.
- Do not put warm-grey text on a cool glass surface.

### Cards that are not glass
An opaque white card is allowed on the wash, with `.card-elev-v2` for the drop
and `--line-cool` if it needs an edge. Do not alternate beige cards and white
cards. That was the v1 rule.

### Inputs
- Fill: white, or `--bg-field-neutral` / `--bg-field-cool` for a field that sits on the open canvas (the v2 `SearchBar` goes white on focus). `--grey-cool-50` disappears into the wash.
- Edge: `--line-strong-cool` or `--line-cool` at rest; on focus a 1px `--blue-lit` ring (box-shadow / `ring-1`), not an outline that squares the radius.
- Radius: pill for single-line fields and search; large corners for `Textarea`.
- Font size: 16px on mobile, 14px from md up (`text-[16px] md:text-[14px]`).
- Components: `Textarea`, `SearchSelect`, `LimitInput` (number with save), `SearchBar v2`.

### Checkbox, radio, switch
- **Checkbox** — `Checkbox` + `.checkbox-v2`: a glass box at rest; checked is lit blue, the same `--btn-primary-blue-*` tokens as the button.
- **Radio / pick tile** — `.pick-tile-v2` + `.pick-radio-v2`: selection lives on `aria-pressed`, and the tile and its radio both read it. Checked is a plain blue gradient disc.
- **Switch** — `OnlineSwitch`: green `--gradient-switch-on` when on, because "on" here means "running". Vertical on the Mind card, horizontal on Mind detail.
- **Step disc** — `.step-disc-v2`: a lit orange ordinal. Every disc looks the same; no checkmarks.

### Selection
Tabs, dropdowns, and segmented filters mark the current choice in `--blue-lit`, not orange.
- Tabs come in three shapes: pill (`LaunchTabs`), segment (`Segmented`, My Minds) and line (`ModeTabs`, Referral). Don't mix shapes within one group.
- Dropdowns: `GlassTrigger` + `GlassMenuRow` (`glass/GlassMenu.jsx`), or `MindSelectMenu` to pick a Mind.
- Multi-pick answers: `ChoiceChip`, selection on `aria-pressed`.
- The active rail item is a translucent blue pill (`--glass-pill`) with `--blue-lit` ink and no border.

### Icon buttons
`IconBtn` (kit): 32px (or 40), `--r-sm` corners, `--text-muted-cool` icon that
goes `--text-title-cool` over `--bg-panel-cool` on hover. Repeated secondary
actions down a list are always icons, never text buttons.

### Feedback and overlays
- **Modal** — `Modal` / `SplitModal` (`components/ui/modal.jsx`): a bottom sheet on phones, a centred card from md, on `--bg-modal`. Only the body scrolls, with a fade over the bottom edge while more is hidden.
- **Toast** — `toast` from `Profile/toastV2.jsx` (sonner's call shape): success / error / info / warning / loading, optional action.
- **Inline notice** — `.inline-notice-v2` with `-info` / `-success` / `-warning` / `-error`.
- **Status pill** — the kit's `Pill`, tones neutral / cool / success / blue / warning / error.
- **Loading** — `LoadingMark` for a view waiting on one thing with no shape yet; skeletons for content that has a shape.
- **Scrollbar** — `.scroll-cool-v2` (dialogs, launch modal) or `.scroll-neutral-v2` (Profile rail) on the element that scrolls.

## 5. Layout & Spacing

Marketing pages are full-bleed sections stacked vertically. The ground is the wash; a section changes by what it contains (a photograph, a glass band, its own background), not by swapping beige and white.

Product pages are an app frame: floating nav, optional fixed rail, content column capped near `--max-w` (1680px).

### Spacing scale
Literal pixels. Only these values:

```
1, 2, 3, 4, 8, 12, 16, 20, 24, 36, 40, 48, 60, 72, 84, 96, 108, 120, 160, 200, 240
```

`gap-12` is 12px. A number outside the list falls through to Tailwind's 4px scale with no error. Round down. The scale is defined in `tokens.css`; v2 has no scale of its own.

### Radius
| Token | Value | Use |
|-------|-------|-----|
| `--r-pill` | pill | Buttons, chips, avatars, single-line fields |
| `--r-xl` | 20px | Large glass shells, feature surfaces |
| `--r-lg` | 16px | Cards |
| `--r-md` | 12px | Images, small tiles |
| `--r-sm` | 8px | Micro surfaces, icon buttons |

### Breakpoints
Type steps at 1024px and 767px. Layout uses Tailwind defaults. Verify at 390px.

## 6. Depth & Elevation

Elevation is part of the language. Drops are blue-grey, not neutral grey — a grey drop under glass reads as dirt.

| Token | Use |
|-------|-----|
| `--elev-card` | Resting cards and glass cards |
| `--elev-card-hover` | The card under the pointer |
| `--elev-card-selected` | The chosen card. Deeper and bluer than hover |
| `--shadow-lit-blue` / `--shadow-lit-orange` | Only on the matching lit button (via `--btn-primary-*-shadow`) |
| `--glass-shadow` | The nested glass shell |

Do not invent a second shadow to separate sections. Do not stack shadows for hierarchy that spacing should be doing.

## 7. Motion

Motion confirms that something arrived or changed. It does not perform.

- Hover and colour: ~140–200ms, ease.
- Reveals: fade and a short rise, `cubic-bezier(0.22, 1, 0.36, 1)`, once (`.card-appear-v2`, `.card-reveal-v2`, `useScrollReveal`). Reveal an image on its own `onLoad`, never on `img.decode()`.
- Respect `prefers-reduced-motion`.
- No parallax, no scroll-jacking, no bounce.

## 8. Do's and Don'ts

### Do
- Import `tokens-v2.css`, wrap the page in `.v2`, and use the v2 aliases and classes.
- Use lit orange for the one primary ask, lit blue for the other filled actions.
- Set glass text in cool grey.
- Keep button labels on one line. Stack the row before shortening type.
- Check `/style-guide` for an existing component first.
- Verify at 390px.

### Don't
- Don't revive the beige canvas, the flat orange pill, or the indigo section band.
- Don't use a `.x-v2` class outside a `.v2` ancestor, and don't expect `.v2` styles inside a portal.
- Don't edit the `body:has(.v2)` wash for one page — it restyles every v2 page.
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
| Mobile | ≤767px | Smallest type step. Single column. Inputs at 16px. Modals become bottom sheets. |
| Tablet | 768–1024px | Middle marketing type. Grids open. |
| Desktop | ≥1025px | Full type. Split sections sit side by side. The Profile rail appears from lg. |
| Wide | ≥1536px | Content caps at `--max-w`. The wash stays fixed. |

Button rows stack before labels wrap. Split sections stack image below text. The nav may collapse to a sheet. Check 390px for overflow, especially button edges.

## 10. Agent Prompt Guide

### Quick reference
- Ground: `import "@/assets/styles/tokens-v2.css"` and a `.v2` wrapper
- Loud CTA: `<Action look="primary">` (product) or `.btn-grad-orange-v2` (marketing)
- Other filled CTA: `<Action look="primary-blue">` or `.btn-grad-blue-v2`
- Quiet pair: `<Action look="secondary">`
- Card: the kit's `Card` (`.glass-card-v2`)
- Page title (product): `text-h4` in `--text-title-cool` (`PageTitle`)
- Page title (marketing): `text-display`, one phrase in `--blue-lit`
- Body: `--text-body-cool`
- Eyebrow: `text-label` in `--text-muted-cool`

### Iteration
1. Import the v2 tokens and wrap the page in `.v2`.
2. Set type before decoration. Marketing headlines stay large.
3. Add one lit orange action. Everything else is blue or secondary.
4. Check every spacing number against the token list.
5. Verify at 390px.

## Reference

The `/style-guide` page (dev only) renders the v2 tokens, glass, and every
component, each with its source file. Compare against it.

<!-- harness-only:start -->
<!-- Everything above this block is synced from animocaminds-frontend's
     DESIGN.md by its update-design-harness skill: edit it there, not here.
     This block belongs to the harness: edit it here; the sync keeps it. -->

## In this harness

`design-harness/styles-and-components/tokens.css` is the frontend's
`tokens-v2.css`, plus an appendix of the legacy tokens the synced components
still use. `react/` holds the synced component library and v2 components.

### Where to look next

| If the page involves… | Read |
|---|---|
| The logo | [brand-logo.md](design-harness/spec/brand-logo.md) |
| The Master Mind, a one-click Mind, or a marketing scene | [brand-mascot.md](design-harness/spec/brand-mascot.md) |
| A hero scene or which character file to use | [brand-imagery.md](design-harness/spec/brand-imagery.md) |
| A UI icon | [brand-iconography.md](design-harness/spec/brand-iconography.md) |
| Headlines and body copy | [voice-and-copy.md](design-harness/spec/voice-and-copy.md) |

### Checks

Before calling a page done, run the scripts in [checks/](design-harness/checks/)
and walk [review-checklist.md](design-harness/checks/review-checklist.md).
`check-spacing.mjs` catches spacing numbers outside the 21-step scale;
`check-button-text.mjs` catches wrapping button labels; `check-hardcoded.mjs`
catches hardcoded values that have a token.

### Visual reference

[style-guide.html](design-harness/styles-and-components/style-guide.html) is a
snapshot of the frontend's `/style-guide` page: the v2 tokens, glass, and every
component. Compare against it, and against the full-page captures in
[sample-screens/](design-harness/sample-screens/).
<!-- harness-only:end -->
