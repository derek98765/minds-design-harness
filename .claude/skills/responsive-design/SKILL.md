---
name: responsive-design
description: Adapt desktop-first designs to tablet and mobile by progressively reducing paddings, font sizes, gaps, and reshaping layouts so they look intentional on small screens — not just shrunken. Use when the user mentions responsive design, mobile layout, mobile view, "looks broken on mobile", image cropping at small widths, banner/hero needs responsive treatment, or wants a desktop-only design to work on smaller devices.
version: 1.1.0
user-invocable: true
argument-hint: "[target component or page]"
---

Adapt desktop-first interfaces to smaller viewports. The goal: each breakpoint looks *intentional*, not a shrunken desktop layout.

## Preflight — Read Before Editing

1. **Design tokens** — find `tokens.css` / `tailwind.config`. If typography tokens auto-scale at breakpoints, don't add per-breakpoint `text-[Xpx]` overrides — that defeats the system.
2. **Breakpoints** — confirm the scale (Tailwind defaults: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`).
3. **Component library** — check `src/components/ui/`. Extend, don't duplicate.
4. **CLAUDE.md** — respect rules about hardcoding colors, spacing, etc.

## Core Principles

### 1. Progressively reduce, don't just shrink

At each breakpoint going down, reduce:
- **Padding** — ~50–60% of desktop. `px-[80px]` → `md:px-48` → `px-20`; `py-48` → `md:py-32` → `py-20`.
- **Gaps** — tighten vertical rhythm. `gap-48` → `md:gap-32` → `gap-24` (between sections); `gap-24` → `md:gap-20` → `gap-16` (inside sections).
- **Font sizes** — drop one tier (`h3 → h4 → h5`, `body-large → body-default`). Free if tokens auto-scale.
- **Fixed widths** — replace with `w-full` or `max-w-*`.

### 2. Reshape, don't squeeze

- **Multi-column grids** → step down one column at a time (4→3→2→1, 3→2→1, 2→1). Don't jump straight to 1.
- **Side-by-side rows** → `flex-col md:flex-row`.
- **Wide tables** → card-per-row on mobile (§7).
- **Inline labels + values** → stack label above value when space runs out.

#### Column reduction — Tailwind patterns
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24"   // 3-col
className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"                   // 2-col
```
Min readable cell width: ~260–320px for content cards, ~160px for compact stats. Drop a column when `viewport / columns < min`.

#### Awkward near-full-width containers → stretch to full width

If a `w-fit` / `inline-flex` container ends up ≳ 70% of viewport on mobile (wide enough to dominate, narrow enough to leave an ugly gutter), **stretch it to `w-full`** at that breakpoint. Also redistribute inner columns equally:

```jsx
<div className="w-full md:w-fit flex items-stretch md:items-center gap-20 md:gap-48 ...">
  <div className="flex-1 md:flex-initial flex flex-col gap-8 md:gap-12">…</div>
  <div className="w-px self-stretch bg-neutral-200 shrink-0" aria-hidden />
  <div className="flex-1 md:flex-initial flex flex-col gap-8 md:gap-12">…</div>
</div>
```

Don't apply this to individual buttons or pills — only to container/group elements (stats bars, tab strips, filter rows).

### 3. Sticky side panels → sticky bottom section on mobile

A desktop sticky right rail (CTA, key stats, eligibility panel) must stay reachable on mobile. Two approaches:

**Option A — `position: sticky` (preferred when panel is tall or has scrollable content):** The panel stays in document flow and pins only when it reaches the bottom of the viewport. Cancel parent padding with negative margins to go edge-to-edge.

```jsx
<aside className="
  sticky bottom-0 z-30 bg-base-white
  rounded-t-[24px] shadow-[0_-8px_24px_rgba(0,0,0,0.06)]
  -mx-20 md:-mx-48                          /* cancel parent padding → edge-to-edge */
  max-h-[80vh] overflow-y-auto scrollbar-none
  lg:sticky lg:bottom-auto lg:top-[84px]
  lg:rounded-[24px] lg:shadow-none lg:bg-transparent lg:mx-0
  lg:max-h-[calc(100vh-84px)]
">
```

**Option B — `position: fixed`:** Use only for small, always-visible bars (price + CTA). Add `pb-[calc(barHeight+env(safe-area-inset-bottom))]` on the page so content isn't hidden behind it.

#### Collapsible header bar

When the panel contains substantial content, add an expand/collapse header on mobile. Use a 3-column grid so the title stays visually centered with the chevron on the right:

```jsx
<button
  className="lg:hidden grid w-full grid-cols-[20px_1fr_20px] items-center gap-8 px-20 py-20 border-b border-[rgba(0,0,0,0.06)] ..."
  onClick={() => setExpanded(v => !v)}
>
  <span aria-hidden />                          {/* spacer — same width as chevron */}
  <span className="flex items-center justify-center gap-8">
    {/* icon + title */}
  </span>
  <ChevronDown className={expanded ? "rotate-180" : ""} aria-hidden />
</button>
<div className={`${expanded ? "block" : "hidden"} lg:block`} id="panel-content">
  {/* panel body */}
</div>
```

Default state: **expanded**. No drag handle (this is not a draggable sheet modal). Use `border-[rgba(0,0,0,0.06)]` for the header divider — subtle hairline, not `border-neutral-200`.

**Don't pin** decorative or low-priority rails (related content, ads). Only convert when the panel holds a primary action or critical context.

### 4. Full-bleed images inside padded containers

When a hero/banner image should go edge-to-edge on mobile but sits inside a padded page container, break it out with negative margins:

```jsx
<div className="-mx-20 w-[calc(100%+40px)] md:mx-0 md:w-full overflow-hidden md:rounded-[24px]">
  <img className="block w-full h-[240px] md:h-auto object-cover object-center md:object-contain" ... />
</div>
```

- Remove border radius on mobile (fully bleed), add it back on `md:`.
- Set a fixed height on mobile (`h-[240px]`) so the image reads as a designed banner, not a stretched photo.
- Use `object-cover object-center` to crop from the center of the source.

### 5. Keep tags, badges, and buttons on a single line

Always add `whitespace-nowrap` to pills/badges/chips. Pair with `shrink-0` when inside a flex row.

```jsx
<span className="inline-flex ... whitespace-nowrap shrink-0">No Tier</span>
```

If the label still overflows: reduce `px`, drop font size, shorten copy, or reshape the parent. Never let a pill wrap — it always looks broken.

### 6. Tab strips → scroll or collapse to a dropdown

When a tab row no longer fits, don't wrap it to a second line and don't shrink the labels. Pick by **how far past the edge it runs**:

| Overflow | Pattern |
|---|---|
| A few tabs past the viewport (~1–1.5 screens) | **Horizontal scroll** — keeps every option visible and one tap away |
| Many tabs, or a long tail the user must hunt through (≳2 screens) | **Collapse to a dropdown / select** — a scroll strip that runs for screens hides its own tail |

Scrolling preserves *glanceability*: the user sees the options exist and switches with one tap. That advantage disappears once the strip is long enough that reaching the last tab is a swiping chore — at that point a dropdown showing the current selection plus a full list on tap is both faster and more honest about how many options there are. Count matters less than distance: 6 short labels may fit fine, while 4 long ones may not.

If a dropdown is the right call, keep the desktop tabs and swap only at the breakpoint — same state, two presentations:

```jsx
{/* mobile: dropdown */}
<div className="md:hidden">
  <label className="sr-only" htmlFor="section-select">Section</label>
  <select
    id="section-select"
    value={active}
    onChange={e => setActive(e.target.value)}
    className="w-full min-h-[44px] text-[16px] px-16 ..."   /* ≥16px — §9 */
  >
    {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
  </select>
</div>

{/* tablet and up: tabs */}
<div role="tablist" className="hidden md:flex md:flex-wrap items-center gap-12">…</div>
```

A native `<select>` gets the platform picker free (iOS wheel, Android sheet) — worth preferring over a custom menu unless the options need icons or descriptions. It's also the one place `hidden md:block` is legitimate rather than an overflow band-aid (§2), because it swaps in a genuinely different control, not the same one hidden.

#### Horizontal scroll — one axis only

When scrolling is the right call, **constrain the scroll to the horizontal axis alone:** `overflow-x-auto` paired with `overflow-y-hidden`. Never `overflow-auto` (both axes) and never `overflow-y-auto` on a tab strip.

```jsx
<div
  role="tablist"
  className="
    flex md:flex-wrap items-center gap-8 md:gap-12
    overflow-x-auto overflow-y-hidden md:overflow-visible
    overscroll-x-contain scrollbar-none
    -mx-20 px-20 md:mx-0 md:px-0        /* bleed to edges so the last tab isn't clipped mid-gutter */
  "
>
  {tabs.map(t => (
    <button key={t.id} role="tab" className="shrink-0 whitespace-nowrap min-h-[44px] px-16 ...">
      {t.label}
    </button>
  ))}
</div>
```

- **`overflow-y-hidden` is the load-bearing part.** A bare `overflow-x-auto` computes the *other* axis to `auto`, not `visible` — so the strip becomes a vertical scroll container too. It's usually invisible (nothing overflows vertically), but a focus ring, a hover lift, or an active-tab underline sitting a pixel outside the box turns into a stray vertical scrollbar and a container that jiggles a few pixels on tap.
- **`shrink-0` on every tab** — without it flex compresses them to fit and nothing ever overflows, so the strip silently never scrolls. Pair with `whitespace-nowrap` (§5) so labels don't wrap mid-word.
- **`overscroll-x-contain`** stops a horizontal swipe past the last tab from triggering browser back-navigation or rubber-banding the page.
- **Bleed to the viewport edges** with `-mx-20 px-20`. A scroll container that stops at the page gutter clips the last tab against whitespace and reads as broken rather than scrollable.
- **Don't hide the affordance entirely.** `scrollbar-none` is fine, but the strip must *look* scrollable — leave the next tab partially visible at the right edge, or add a fade mask. A row that ends flush on a tab boundary looks complete, and users never swipe it.
- Keep touch targets ≥44px (§8); scrollable tabs are still tap targets.
- This is a **tab-strip** pattern, not a data pattern — wide *tables* still become cards (§7), never a horizontal scroll.

### 7. Wide tables → card-per-row on mobile

Never horizontally scroll a data table. Transform it: each row becomes a card, column headers move inline above each value.

```jsx
{/* Desktop */}
<div className="hidden md:flex flex-col gap-4">
  <div className="grid grid-cols-[140px_96px_1fr] px-24 py-8"> {/* headers */} </div>
  <div className="flex flex-col gap-4 rounded-[12px] bg-neutral-50 overflow-hidden">
    {rows.map(row => (
      <div key={row.id} className="grid grid-cols-[140px_96px_1fr] items-center px-24 py-24"> {/* cells */} </div>
    ))}
  </div>
</div>

{/* Mobile card stack */}
<div className="flex md:hidden flex-col gap-12">
  {rows.map(row => (
    <div key={row.id} className="flex flex-col gap-16 rounded-[12px] bg-neutral-50 p-20">
      <div className="grid grid-cols-2 gap-20">           {/* equal-width for comparable cols */}
        <div className="flex flex-col gap-4">
          <p className="m-0 text-caption font-bold uppercase text-neutral-400">Tier</p>
          <Pill>{row.tier}</Pill>
        </div>
        <div className="flex flex-col gap-4">
          <p className="m-0 text-caption font-bold uppercase text-neutral-400">Rewards</p>
          <p className="m-0 font-extrabold text-h5">{row.reward}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="m-0 text-caption font-bold uppercase text-neutral-400">Who Qualifies</p>
        <p className="m-0 text-body-default text-neutral-600">{row.who}</p>
      </div>
    </div>
  ))}
</div>
```

Use `grid grid-cols-2` inside cards when two columns are comparable (e.g. tier + reward) to guarantee a 50/50 split. For a narrow column inside a card, equal widths may give too much room — stack vertically instead.

### 8. Touch targets

Interactive elements need ≥ 44×44 CSS px. Add padding or `min-h-[44px]` / `min-w-[44px]` on the element (not just the icon).

### 9. Form inputs — ≥16px font size on mobile

iOS Safari auto-zooms the viewport when a user focuses a text field whose font size is under 16px, and doesn't zoom back out. Every focusable text control needs **≥16px** at mobile widths:

`<input>` (text, email, password, search, tel, url, number, date), `<textarea>`, `<select>`, and any `contenteditable`.

```jsx
{/* text-body-default must resolve to ≥16px at mobile; otherwise pin it */}
<input type="email" className="text-[16px] md:text-body-default ..." />
```

- If typography tokens auto-scale, verify the mobile tier still lands ≥16px — mobile body tokens often drop to 14px, which triggers the zoom.
- Scaling text *down* on mobile (§1) does **not** apply to inputs — this is the one place mobile keeps the larger size.
- The visual size can still be reduced elsewhere (label, helper text, placeholder is fine at 16px too — placeholder inherits the input's size, so don't shrink it separately).
- Never "fix" this with `<meta name="viewport" content="user-scalable=no">` or `maximum-scale=1` — it blocks pinch-zoom and fails WCAG 1.4.4.

### 10. Modals — bottom sheet on mobile, scroll the body, pin the CTA

**On mobile, a modal is a bottom sheet.** It anchors to the bottom edge, spans full width, and rounds only its top corners — never a centered, floating card with side gutters. It becomes a centered dialog at `md:` and up.

When content exceeds the viewport, the action buttons must never scroll out of reach. Cap the height, make **only the body** scroll, and keep header and footer pinned.

Three-part flex column: fixed header → `flex-1 overflow-y-auto` body → fixed footer.

```jsx
<div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
  <div className="
    flex flex-col w-full md:max-w-[560px]
    max-h-[90dvh]
    rounded-t-[24px] md:rounded-[24px] bg-base-white overflow-hidden
  ">
    <div className="shrink-0 px-20 py-20 md:px-24 border-b border-[rgba(0,0,0,0.06)]">
      {/* title + close */}
    </div>

    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-20 py-20 md:px-24">
      {/* body — the only scrolling region */}
    </div>

    <div className="
      shrink-0 px-20 py-16 md:px-24
      border-t border-[rgba(0,0,0,0.06)] bg-base-white
      pb-[calc(16px+env(safe-area-inset-bottom))] md:pb-16
    ">
      <button className="w-full min-h-[44px] ...">Confirm</button>
    </div>
  </div>
</div>
```

- **`min-h-0` on the scroll body is required** — a flex child defaults to `min-height:auto` and refuses to shrink, so the body grows past the container and pushes the footer off-screen instead of scrolling.
- **`dvh` not `vh`** — mobile browser chrome collapses/expands; `vh` measures the tallest state, so the footer sits below the fold until the user scrolls the page.
- **`env(safe-area-inset-bottom)`** on the footer keeps the CTA clear of the iOS home indicator.
- **`overscroll-contain`** stops scroll chaining to the page behind the modal.
- **Bottom sheet on mobile, centered dialog on desktop** — the three paired classes that do it:
  - `items-end md:items-center` on the overlay — anchors the sheet to the bottom edge.
  - `w-full md:max-w-[560px]` — full-bleed on mobile, constrained on desktop. No horizontal margin on mobile; the sheet touches both edges.
  - `rounded-t-[24px] md:rounded-[24px]` — top corners only on mobile (bottom corners are off-screen), all four on desktop.
- Animate the sheet in with `translate-y-full → translate-y-0`, not a scale/fade — it should read as rising from the bottom edge. Fade the scrim separately.
- The sheet grows to fit its content up to the `90dvh` cap — don't force it to full height when the content is short.
- No drag handle unless the sheet is actually swipe-dismissable; a decorative grabber implies an interaction that isn't there.
- **Cap at `max-h-[90dvh]`** — leaves a consistent sliver of the underlying page visible so the modal reads as an overlay. Don't cap with a fixed `px` value.
- If the footer holds two buttons, stack them `flex-col-reverse md:flex-row` so the primary sits on top on mobile and on the right on desktop.

Same rule applies to bottom sheets, drawers, and side panels with actions — the confirming action is pinned, the content scrolls.

### 11. Text-over-image overlays

For **left text + right/background image** layouts, apply this 3-part pattern:

1. **Cap text column to ~70% on mobile** — reserve right 30% as image-only reveal. `w-[70%] md:w-full md:max-w-[720px]`.

2. **Left-anchored gradient overlay** — between `<img>` and text, `absolute inset-y-0 left-0`, `aria-hidden pointer-events-none`. Width slightly wider than text column (`w-[80%] md:w-[85%] xl:w-[70%]`). Match solid color to image's left-edge color.
   ```jsx
   style={{ background: "linear-gradient(to right, #dfe6f1 0%, #dfe6f1 35%, rgba(223,230,241,0.88) 65%, transparent 100%)" }}
   ```

3. **`object-position` per breakpoint** — for wide hero art with focal content on the right of the source: `object-[75%_center] md:object-right`. Higher % moves the crop window right, pulling right-side artwork *left* into the frame. If user says "move image right," raise %; if "character bleeding under text," lower %. Adjust in 5–10% increments.

### 12. Dev tooling

Check that any dev panel/FAB doesn't collide with mobile content (especially a sticky bottom panel). Move to a corner with `safe-area-inset` support.

## Workflow

1. Read the target component in full.
2. Run preflight (tokens, breakpoints, component library, CLAUDE.md).
3. Apply principles above; prefer tokens over hardcoded values.
4. For text-over-image: apply the full 3-part pattern.
5. Verify at ~390px (mobile), ~768px (tablet), ≥1280px (desktop). When the browser window itself can't be narrowed to mobile width, use the device-frame technique below instead of skipping mobile verification.

### Verifying mobile without resizing the browser

When the tool driving the browser can't shrink the actual viewport (e.g. a fixed-size embedded preview), don't skip mobile verification — simulate the device size *inside* the existing viewport with a temporary frame.

Wrap the page (or drop an overlay) in a fixed-size box matching the target device — **393×844 for mobile** (iPhone 14/15 logical size) — centered in whatever canvas the tool gives you, with its own scroll/overflow boundary so the contents inside behave exactly as they would in a real 393px-wide viewport.

```html
<div style="
  position: fixed; inset: 0; z-index: 99999;
  display: flex; align-items: center; justify-content: center;
  background: #1a1a1a;
">
  <iframe
    src="<page-under-test>"
    style="
      width: 393px; height: 844px;
      border: 8px solid #000; border-radius: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    "
  ></iframe>
</div>
```

- **Prefer an `<iframe>` over a plain `<div>` wrapper.** An iframe gets its own layout viewport, so `100vw`/`100dvh`, media queries, and `env(safe-area-inset-*)` all resolve as if the window were actually 393×844 — a resized `<div>` does not, and media-query-driven layouts (most of this skill) will silently keep rendering their desktop branch.
- **This is a scaffold, not a deliverable.** It exists only so you (and the user, via screenshot) can see the mobile layout without touching the real viewport. Remove it completely — the wrapper markup, any injected styles, the iframe — once mobile verification is done. Never ship it or leave it commented out.
- Take the screenshot of what's *inside* the frame, not the full 1920×1080 canvas, so the user is previewing the device size, not a small box floating in a large one.
- If the tool can genuinely resize its viewport (most browser automation can, via a `setViewportSize`/`resize` call), use that directly instead — it's simpler and exercises the real viewport rather than a simulated one. Reach for the frame technique only when a true resize isn't available.
- Same technique works for the ~768px tablet check — swap the frame to 768×1024.

## Quick Reference

| Aspect | Desktop | Tablet (md) | Mobile |
|---|---|---|---|
| Section padding X | 80px | 48px | 20px |
| Section padding Y | 48px | 32px | 20px |
| Card padding | 24–32px | 24px | 16–20px |
| Gap between sections | 48px | 32px | 24px |
| Gap inside section | 24px | 20px | 16px |
| Hero heading | h3/h4 | h4 | h5 |
| Body copy | body-large | body-large | body-default |
| Input / textarea / select text | — | — | **≥16px** (never smaller) |
| Modal shape | centered dialog | centered dialog | bottom sheet, `max-h-[90dvh]` |
| Tab strip | full row | full row / wrap | scroll-x (few) or `<select>` (many) |
| Grid columns | 3–4 | 2 | 1 |

## Anti-patterns

- Hardcoding `text-[Xpx]` when tokens auto-scale.
- Same padding across all breakpoints.
- `hidden md:block` to "fix" overflow — reshape instead. (Swapping tabs for a `<select>` is the exception: a different control, not the same one hidden.)
- `overflow-auto` or a bare `overflow-x-auto` on a tab strip — pair it with `overflow-y-hidden` or you get a stray vertical scroll container.
- Tabs that wrap to a second line, or shrink their labels, instead of scrolling.
- Missing `shrink-0` on scrollable tabs — flex compresses them and the strip never scrolls at all.
- A scroll strip running for screens when a dropdown would show the whole list at once.
- A tab strip that ends flush at the viewport edge — nothing signals it scrolls.
- Touch targets under 44px.
- Text inputs under 16px on mobile — iOS Safari auto-zooms on focus and never zooms back.
- Disabling zoom (`user-scalable=no` / `maximum-scale=1`) to hide the input-zoom problem.
- Letting a modal's CTA scroll out of view — cap height and pin the footer instead.
- Scrolling the whole modal rather than just its body (header and actions must stay put).
- Omitting `min-h-0` on a flex scroll body — it silently pushes the footer off-screen.
- `max-h-[80vh]` on a mobile modal — use `dvh` so browser chrome doesn't hide the footer.
- A centered, gutter-margined dialog on mobile — modals are bottom sheets below `md:`.
- A drag handle on a sheet that can't actually be swiped away.
- Text over a busy image with no gradient treatment.
- `fixed bottom-0` when `sticky bottom-0` would flow better with the document.
- `inline-flex w-full` — `inline-flex` ignores explicit widths; use `flex` instead.
