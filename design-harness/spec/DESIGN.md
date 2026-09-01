# Minds Design System

> Category: AI & Consumer
> Warm off-white canvas, extrabold Manrope type, orange-and-indigo brand pair. Light-mode only.

**This is the core spec — read it before any UI work.** For logo, mascot, imagery,
icons, or copy voice, see the routing table at the end.

## 1. Overview & Brand Vibe

**Purpose.** Minds are consumer-focused AI agent companions and specialists designed to handle everyday tasks with zero friction. Users can customize a Mind or start with a one-click template Mind, and start interacting instantly through email or connected social apps. Therefore, the interface must feel approachable, friendly, human, and familiar while showing unique personalities.

**Audience.** Everyday consumers first (busy parents, small business owners). Builders second.

**The name is "Minds."** Never write "Animoca Minds" in a headline, body copy, or UI
label. The lockup "By Animoca Brands" exists only inside the logo artwork — never
retype it as text.

Minds reads as a warm consumer product, not software infrastructure. The canvas is an off-white with real warmth in it (#ece7e0), never a cool gray, alternating with pure white section by section so the page advances through color change rather than rules or boxes. The effect is closer to a well-set magazine than a dashboard.

The signature move is extrabold Manrope at large sizes carrying plain-language promises. Type is the loudest element on every page; everything else stays quiet enough to let it lead. Against that, exactly two brand colors do the work — orange for action, indigo for structure — with orange rationed so strictly it reads as instruction rather than decoration.

The shape system is uniformly soft: every button is a pill, cards and images round generously, and no hard dividers appear anywhere. Depth is nearly absent — shadows only where something genuinely floats. The same tokens, type, and components serve marketing pages and logged-in screens alike; only the density changes.

Key Characteristics:
- Warm off-white canvas (#ece7e0) alternating with pure white (#ffffff) — light mode only, no dark theme
- Manrope exclusively, extrabold (800) headlines at large sizes with negative tracking
- Two brand colors: orange (#fd8d1d) for action, indigo (#394f95) for structure
- Universal pill buttons (`rounded-full`) — no square button variants
- Whitespace and background change as the only section dividers; no hairline rules
- Near-zero elevation; shadows only where something truly floats
- Calm scroll-reveal motion — fade-and-lift only, no parallax or scroll-jacking
- Plain-language copy over feature lists; concrete outcomes over abstractions

## 2. Color Palette & Roles

> Source of truth: `kit/tokens.css`. Never hardcode these hexes in components — use the
> token classes (`bg-beige-100`, `text-brand-orange-500`).

The palette runs 50–900 in four families. The full ramps are rendered in
`style-guide/index.html`; the values that carry the brand are below.

### Core
- **Brand Orange 500** (#fd8d1d) — `brand-orange-500`: Primary CTA, active state, key highlight. The action color; use sparingly so it always means "act."
- **Brand Blue 500** (#394f95) — `brand-blue-500`: Eyebrow labels, links, quiet UI, inverted section canvas.
- **Warm Canvas** (#ece7e0) — `beige-100`: The default page surface. Warm, not gray.
- **Pure White** (#ffffff) — the alternating section surface and card background.

### Text
- **Neutral 900** (#1a1a1a) — headings and high-contrast text.
- **Neutral 600** (#5a5855) — body copy on light surfaces. The default reading color.
- **Neutral 400** (#888888) — muted outlines, tertiary labels, ghost-button borders.
- **Neutral 200** (#cccccc) — dividers and card outlines.
- On the indigo canvas, text goes `beige-100` with orange reserved for the CTA.

### Semantic roles
Prefer these — they say what a color is *for*:
`--color-primary` · `--color-accent` · `--color-text` · `--color-text-muted` ·
`--color-bg` · `--color-bg-alt` · `--color-bg-inverted` · `--color-border`
plus `--color-success` (#31a963), `--color-error` (#dd3131), `--color-warning` (#f5c800).

### Usage Rules
- Adjacent sections never share a background. Warm canvas → white → warm canvas is the default rhythm.
- On the indigo canvas, headings go light, body goes a light neutral, and the CTA stays orange.
- Orange is for action and highlight only. It is not a surface color and not a heading color.
- No dark mode exists. Do not introduce dark variants or `prefers-color-scheme` blocks.
- Third-party brand colors (Telegram blue, WeChat green) are for channel identity only — never as UI accents.

## 3. Typography Rules

Type is the primary visual device. Layouts rely on big, confident text and generous whitespace rather than dividing lines or boxes.

### Font Family
- Primary: `Manrope`, fallback `sans-serif` — `--font-family-primary`. Used for every piece of Latin text. There is no secondary or display family.
- Chinese: `Noto Sans TC` (traditional) and `Noto Sans SC` (simplified).

### Weights
300 light · 400 regular · 500 medium · 600 semibold · 700 bold · 800 extrabold.

### Hierarchy

| Role | Size (desktop → ≤1024px → ≤767px) | Weight | Line Height | Letter Spacing | Notes |
|------|-----------------------------------|--------|-------------|----------------|-------|
| H1 | 56px → 48px → 40px | 800 | 115% | −0.28px | Page and hero headlines |
| H2 | 44px → 36px → 30px | 800 | 115% | −0.22px | Section headlines |
| H3 | 34px → 28px → 24px | 800 | 115% | 0 | Sub-sections, card heroes |
| H4 | 28px → 24px → 20px | 800 | 115% | 0 | Feature titles |
| H5 | 22px → 20px → 18px | 700 | 115% | 0 | Small headings |
| Body XLarge | 18px → 17px → 16px | 400 | 155% | 0 | Lede paragraphs, large body |
| Body Large | 16px → 16px → 15px | 400 | 155% | 0 | Standard reading text |
| Body Default | 14px → 14px → 13px | 400 | 155% | 0 | Dense UI copy |
| Body Small | 13px → 13px → 13px | 400 | 155% | 0 | Secondary metadata |
| Body XSmall | 12px → 12px → 12px | 400 | 155% | 0 | Fine print |
| Caption Large | 16px → 15px → 14px | 500 | 140% | +0.24px | Uppercase eyebrows |
| Caption | 12px → 12px → 11px | 500 | 140% | +0.24px | Badges, micro labels |

Use the token classes (`text-h1`, `text-body-large`) — never raw px. The responsive steps are built into the tokens, so a single `text-h1` already scales across all three breakpoints.

### Principles
- **Extrabold or quiet, nothing between.** Headlines sit at 800; body sits at 400. The gap between them is the hierarchy. Mid-weights (500/600) appear only on eyebrows, buttons, and small labels.
- **Tracking runs opposite by scale.** Headlines tighten (H1 −0.28px, H2 −0.22px); eyebrows and captions open up (+0.24px). Everything between sits at zero.
- **Headlines may highlight one phrase in indigo.** One phrase per headline, and never in orange — orange belongs to actions.
- **Body text stays muted.** `neutral-600` on light surfaces, a light neutral on indigo. Readable but never competing with the headline.
- **Eyebrows are uppercase medium.** `caption-large`, weight 500, +0.24px tracking, colored `brand-blue-500`.

### Don'ts
- **No all-caps headlines.** Eyebrows are uppercase; headlines never are.
- No excessive or cramped line height — headings sit at 115%, body at 155%.
- No manual letter-spacing beyond the tokens.

## 4. Component Stylings

### Buttons

Every brand button is `rounded-full`. Text is extrabold (800) at all sizes.

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `brand-orange-500` | white | — | brightness 110% |
| `secondary` | `brand-blue-500` | white | — | brightness 125% |
| `tertiary` | `neutral-900` | white | — | `neutral-600` |
| `tertiary-light` | white | `neutral-900` | — | `neutral-50` |
| `outline-primary` | transparent | `brand-orange-500` | 1px `brand-orange-500` | fills orange, text white |
| `outline-secondary` | transparent | `brand-blue-500` | 1px `brand-blue-500` | fills indigo, text white |
| `outline-muted` | transparent | `neutral-900` | 1px `neutral-400` | border + text → `neutral-900` |
| `outline-light` | transparent | `beige-100` | 1px `beige-100` | fills white, text `neutral-900` |
| `link-primary` | transparent | `brand-orange-500` | — | underlined, brightness 110% |

Sizes:

| Size | Padding (v/h) | Font | Renders ≈ |
|------|---------------|------|-----------|
| `sm` | 8 / 24px | 16px | 40px tall |
| `md` | 12 / 36px | 18px | 50px tall — **the default** |
| `lg` | 16 / 40px | 18px | 58px tall |
| `xl` | 16 / 48px | 20px | 61px tall |

Padding is deliberately generous — the wide horizontal padding is part of the brand
silhouette. A size must never be *shorter* than the one below it; that's a bug, not a
variant.

`xl` deliberately keeps `lg`'s vertical padding and grows through width and type size
instead. Raising both would make it tower over `lg`, because the larger font adds line-box
height on top of the extra padding — the button ends up reading as a slab rather than a
bigger button.

Rules: use `primary` on any background. `secondary` and `tertiary` on light backgrounds only. `tertiary-light` and `outline-light` on dark or colored backgrounds. Link variants carry no padding.

#### Button text is always one line

A button label never wraps. Wrapping inflates the pill into a two-line lozenge and
destroys the silhouette that the generous padding exists to create. Every button
carries `whitespace-nowrap` — it is load-bearing, not decoration, and must never be
removed or overridden with `whitespace-normal`.

Because the text cannot wrap, a label that is too wide **overflows** instead. So
`whitespace-nowrap` alone is not the fix — the container has to give. When two buttons
sit side by side and no longer fit, in this order:

1. **Stack them vertically.** The row is what breaks first, so make the row responsive
   rather than shrinking the buttons:
   `flex flex-col items-stretch gap-12 sm:flex-row sm:flex-wrap sm:items-center`
   A stacked pair is a normal, correct Minds layout — not a degraded fallback.
2. **Shorten the label.** If a button still overflows at 390px once stacked, the copy is
   the problem. Two or three words is the target — "Start free", not "Start your free
   trial today". Stop and propose shorter wording to the user rather than choosing it
   silently; the label is copy, and copy is their call. See
   [voice-and-copy.md](voice-and-copy.md).

Never shrink padding, reduce the font size, or drop to a smaller size variant to make a
long label fit. Those all trade away the brand silhouette to rescue copy that should
have been shorter.

`checks/check-button-text.mjs` catches both halves — a button missing
`whitespace-nowrap`, and a button row that never stacks.

### Cards
- Background: white on the warm canvas; warm canvas on white sections.
- Radius: `--radius-xl` (24px) for large feature surfaces, `--radius-lg` (16px) for standard cards, `--radius-md` (12px) for images and small tiles.
- Border: `neutral-200` hairline where separation is needed; many cards use none and rely on background contrast.
- Shadow: none by default.
- Padding: 24–40px depending on density.

### Inputs
- Background: white.
- Border: 1px `neutral-200` or `--color-border-soft`.
- Radius: `--radius-md`, or `rounded-full` for search fields.
- Focus: `brand-blue-500` border.
- **Font size must be ≥16px on mobile.** Below that, iOS Safari zooms on focus and the page jumps. Use `text-[16px] md:text-body-default`.

### Pills, Chips & Badges
- Radius: `rounded-full` always.
- Neutral chip: white background, `brand-blue-500` text, `neutral-200` border; hover fills indigo with white text.
- Tint badges: `brand-orange-100` or `brand-blue-100` surface with matching dark text.
- Font: caption weight 500, uppercase for status labels.

### Icon Buttons
- `rounded-full`, white background, `neutral-200` border.
- Hover fills with `brand-orange-500` or `brand-blue-500` and flips the icon to white.

### Component Reuse
Reuse what ships in `kit/react/components/ui/` before writing anything new. Do not create
one-off wrappers for what these already cover. For the HTML lane, copy the section blocks
from `kit/html/starter.html`.

## 5. Layout & Spacing

Layouts are single-column and vertically stacked — full-bleed sections that alternate background color, one idea per section. Structure comes from whitespace and background change, not from borders or boxes. Sections breathe; cards are dense.

### Spacing Scale (critical)
Spacing runs on a custom token scale in **literal pixels**. **Only these values are valid:**

```
1, 2, 3, 4, 8, 12, 16, 20, 24, 36, 40, 48, 60, 72, 84, 96, 108, 120, 160, 200, 240
```

`gap-12` is 12px, not 48px. Any number outside the list silently falls back to Tailwind's
4px default scale and renders at grossly the wrong size — `py-10` becomes 40px — with no
error thrown. When an in-between value is needed, round **down** to the nearest token.
`checks/check-spacing.mjs` catches every violation.

### Section Rhythm
- Horizontal padding: tight on mobile, opening to wide desktop gutters, with the most focused sections inset furthest.
- Vertical padding: grows with viewport, largest values reserved for major breaks between ideas.
- On very wide screens, cap and center content rather than letting it stretch edge to edge.
- Prose is constrained to a comfortable measure even inside a full-width section, so paragraphs never run the full screen.

### Spacing Hierarchy
Spacing encodes relationship — tight between a label and the heading it belongs to, moderate between stacked paragraphs, wider between distinct blocks within a section, widest between the two halves of a split layout.

### Two-Column Sections
Stack vertically on mobile and split at desktop, with the image and text sides swapping order down the page so the eye zigzags rather than marching down one edge.

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| `--radius-full` | pill | All buttons, pills, chips, avatars, icon buttons |
| `--radius-xl` | 24px | Large surfaces, feature cards, spotlight modules |
| `--radius-lg` | 16px | Standard cards |
| `--radius-md` | 12px | Images, small tiles, inputs |
| `--radius-sm` | 8px | Micro surfaces, inline tags |

## 6. Depth & Elevation

| Token | Treatment | Use |
|-------|-----------|-----|
| `--shadow-none` | Flat, no shadow | Sections, most cards — the default |
| (border) | Hairline `neutral-200` | Cards and inputs needing containment on the same-tone surface |
| `--shadow-hover` | `0 4px 16px rgba(0,0,0,0.10)` | Cards that genuinely lift on hover |
| `--shadow-feature` | `0 10px 30px -12px rgba(57,79,149,0.18)` | Indigo-tinted lift for featured surfaces |
| `--shadow-sticky` | `0 -4px 16px rgba(0,0,0,0.08)` | Sticky bottom bars and docked action rows |

Depth is deliberately minimal. Separation comes from background-color change and whitespace; shadows appear only where something truly floats above the page. Never stack shadows to create hierarchy that spacing should be doing.

## 7. Motion

Motion confirms that content has arrived. It never performs.

### Scroll Reveal
The React lane ships `useScrollReveal()`; add `data-reveal` to children and `data-delay` for stagger (typically 80ms steps).

| Variant | Initial state | Animation |
|---------|--------------|-----------|
| `fade-up` | opacity 0, translateY 14px | 700ms `cubic-bezier(0.22, 1, 0.36, 1)` |
| `fade-up-scale` | opacity 0, translateY 14px, scale 0.985 | 760ms, same easing |
| `fade-up-soft` | opacity 0, translateY 8px | 560ms, same easing |
| `reveal-line` | opacity 0, scaleX 0.75 | 650ms, same easing |

Each element reveals once, then stops being observed. In the HTML lane, either omit reveals
entirely or use a short CSS transition with the same easing (`--ease-reveal`).

### Interaction
- Hover and color transitions: `--duration-base` (200ms), occasionally `--duration-fast`.
- Layout and opacity transitions: `--duration-layout` (300ms), ease-out.
- Count-up animations for headline statistics, triggered on scroll into view.

### Restraint
No parallax. No scroll-jacking. No spring physics or bounce. No animation that blocks reading or delays an action.

## 8. Do's and Don'ts

### Do
- Use spacing tokens from the valid list; round down when between values.
- Reference colors, sizes, and spacing through token classes.
- Alternate section backgrounds — warm canvas, white, warm canvas.
- Keep orange for actions and highlights only.
- Set headlines extrabold with tightened tracking, and give them room.
- Reuse the components in `kit/`.
- Constrain prose width even inside full-bleed sections.
- Run `checks/` before calling a page done.

### Don't
- Don't use spacing numbers outside the token scale. Tailwind doesn't error on an unknown
  value — it silently resolves against the built-in 4px scale, so `py-10` becomes 40px and
  `gap-14` becomes 56px, and the layout looks broken rather than throwing.
  Common offenders: `py-5`, `gap-6`, `py-10`, `gap-10`, `py-14`, `gap-14`, `gap-28`, `py-28`.
  Always step *down* — `py-8` not `py-10`, `gap-12` not `gap-14`.
- Don't hardcode hex values, px sizes, or layout properties via `style={{}}`. Inline styles override responsive classes and cause bugs.
- Don't add a dark mode or `prefers-color-scheme` blocks.
- Don't use orange as a surface or heading color, and never as a headline highlight.
- Don't separate sections with hairline rules — background change and whitespace do that job.
- Don't add shadows to create hierarchy that spacing should create.
- Don't introduce a second font family or a serif display face.
- Don't build square buttons — every brand button is a pill.
- Don't let button text wrap to two lines, and don't fix a long label by shrinking the
  padding or type. Stack the button row on mobile, or propose shorter copy to the user.
- Don't set an all-caps headline.
- Don't write "Animoca Minds" as text.
- Don't assume SVG `fontSize` matches CSS px. SVG font sizes are user units that scale with
  the `viewBox` and rendered width — `fontSize="10"` inside `viewBox="0 0 480 240"` renders
  far smaller than a `10px` CSS node beside it. If labels inside and outside an SVG must
  match, move both outside as HTML.

## 9. Responsive Behavior

### Breakpoints
Typography tokens step at two breakpoints; layout uses Tailwind defaults.

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | ≤767px | Smallest type step. Single column, tight side padding, stacked split sections. |
| Tablet | 768–1024px | Middle type step. Two-column grids begin; padding opens up. |
| Desktop | ≥1025px | Full type scale. Split sections go side-by-side, wide gutters. |
| Wide | ≥1536px | Content caps and centers; gutters absorb the extra width. |

### Collapsing Strategy
- Split sections stack image-above-text on mobile.
- Multi-column card grids collapse to a single column, or to a horizontally scrollable row where the content suits it.
- Horizontal padding shrinks first; vertical section padding shrinks second.
- Button rows stack vertically before their labels are allowed to wrap — button padding and type never shrink.
- Nav collapses to a hamburger with a full-screen sheet.

### Touch
All primary actions are pill buttons with generous padding, which keeps them comfortably tappable. Icon buttons are fully round with adequate hit area. **Verify at 390px** — nothing should overflow the viewport, and no button text should wrap or run past the screen edge. 390px is where a side-by-side button pair fails first; stack the row there. See [Button text is always one line](#button-text-is-always-one-line).

## 10. Agent Prompt Guide

### Quick Reference
- Action / primary CTA: `brand-orange-500` (#fd8d1d)
- Structure / eyebrow / link: `brand-blue-500` (#394f95)
- Default page surface: `beige-100` (#ece7e0)
- Alternating surface: white (#ffffff)
- Heading text: `neutral-900` (#1a1a1a)
- Body text: `neutral-600` (#5a5855)
- Inverted section canvas: `brand-blue-500`
- Font: Manrope, 800 for headings, 400 for body

### Example Prompts
- "Build a Minds hero on the warm canvas (`bg-beige-100`): uppercase indigo eyebrow at `text-caption-large` weight 500, extrabold `text-h1` headline with one phrase in `text-brand-blue-500`, muted `neutral-600` lede, and a primary size-`md` pill CTA. Split two-column at `lg`, image right."
- "Create a feature card grid on white: 16px radius white cards with `neutral-200` hairlines, extrabold `text-h4` titles, `neutral-600` body, no shadow."
- "Build an inverted stat section on `brand-blue-500`: light extrabold headline, oversized count-up number, orange label text, and an `outline-light` secondary CTA next to a primary orange CTA."

### Iteration Guide
1. Lock the section background rhythm first — warm canvas, white, warm canvas.
2. Set the type ramp before anything else; the headline carries the section.
3. Add exactly one orange action per section. If there are two, one is wrong.
4. Check every spacing number against the token list.
5. Add motion last, and sparingly.
6. Verify at 390px before calling it done.
7. Run `checks/` and walk `checks/review-checklist.md`.

## Where to look next

Read these only when the task calls for it — they are situational, not core.

| If the page involves… | Read |
|---|---|
| The logo — placement, sizing, a header or footer | [brand-logo.md](brand-logo.md) |
| Abby the mascot, or hand-sticker accents | [brand-mascot.md](brand-mascot.md) |
| Choosing or generating photography and hero imagery | [brand-imagery.md](brand-imagery.md) |
| Drawing a new icon rather than reusing one | [brand-iconography.md](brand-iconography.md) |
| Writing or rewriting headlines and body copy | [voice-and-copy.md](voice-and-copy.md) |

The source brand guideline PDFs are in `brand-guideline/` — a 1-page lite version and
the 34-page full version, with [its own README](../brand-guideline/README.md) on which
to read when. They are slow and expensive to read, so consult them only when these
markdown specs genuinely don't answer the question.
