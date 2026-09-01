# Iconography

Read this only when you need to **draw a new icon**. If an existing icon works, reuse it —
most pages should never reach this file.

---

## Three principles

1. **Clarity** — an icon must communicate its meaning immediately. Prefer a literal
   metaphor over a clever abstract one. A calendar means a calendar.
2. **Consistency** — the 24px grid, the 1.5px stroke, and shared corner radii are what
   make a set feel like one family rather than a collection.
3. **Simplicity** — reduce to the essence. Decorative detail muddies the shape at small
   sizes, which is where icons actually live.

---

## Geometry

| Spec | Value |
|---|---|
| Artboard | **24 × 24px** |
| Live area | **20 × 20px** |
| Padding | **2px** on every side |
| Stroke | **1.5px** |

Keep all artwork inside the 20px live area. The 2px padding stops icons clipping at the
edges and keeps them optically balanced against each other.

**The 1.5px stroke is the defining characteristic of the set.** It sits deliberately
between a 1px stroke (which disappears on lower-density screens) and a 2px stroke (which
reads as chunky). Do not vary it between icons.

---

## Color

Every icon exists in two treatments:

**Dual-tone** — indigo as the base with orange picking out one meaningful detail. Use on
light surfaces where the icon carries some weight, such as a feature grid.

**Single-color** — one flat color throughout. Use white on the indigo canvas, or indigo
where the icon is purely functional and shouldn't compete.

Rules:
- Orange in a dual-tone icon highlights **one** element, the same way orange works
  everywhere else in the system. Never color the whole icon orange.
- On the indigo canvas, icons go white — not orange.
- Never introduce a third color into an icon.

---

## In use

- Feature-grid icons typically sit at 24px in a tinted rounded square
  (`brand-orange-100` or `brand-blue-100`) with `--radius-md`.
- Inline icons beside text align to the text's optical center, not its bounding box.
- Icon buttons are `rounded-full`, white with a `neutral-200` border, filling with
  orange or indigo on hover and flipping the icon to white.

---

## Before drawing a new one

Check in order:

1. Does `assets/icons/` already cover it? 30 named Mind-persona icons live there
   (`finance_buddy.webp`, `meal_planner.webp`, etc.), plus `app-icon-default.svg` and
   `skill-icon-default.svg` as generic fallbacks. See [../assets/README.md](../assets/README.md) for the full
   list. If the page is representing a specific named Mind, reuse its icon rather than
   drawing a new one — and if that Mind isn't in the set yet, use a default instead of
   inventing one.
2. Does a **hand sticker** communicate it better? For a warm, human accent beside a
   headline, a sticker often beats a UI icon — see [brand-mascot.md](brand-mascot.md).
3. Is an icon needed at all? Minds pages lean on type and whitespace. An icon per bullet
   point is usually decoration, not clarification.
