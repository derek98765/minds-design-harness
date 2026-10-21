# Icons

Read this when a control needs an icon.

The Master Mind and the specialist Minds are the 3D characters in
`assets/minds-mascot/`. Named Minds also have a dual-tone app icon (a piggy bank for
Finance Buddy, a bowl for Meal Planner, and so on) in
`assets/brand/icons/icon-<name>.webp`. Reuse those. Do not draw a new one.

---

## UI icons

Interface icons — nav, rows, menus, empty states — are Lucide, stroke 1.5,
`currentColor`, sized to the control. On glass they use the cool grey text
tokens (`--text-label-cool` at rest, `--blue-lit` when selected or hovered).

Do not mix a filled brand illustration into a row of stroke icons. The
antenna-head mark (`assets/brand/logo/logo-mark-blue.svg`, or `logo-mark-white.svg` on dark) is the logo mark, used for the
favicon and small brand spots, like a nav item that links to Minds. It is not a generic icon.

---

## When a picture is needed instead

| Need | Use |
|---|---|
| "Which Mind is this?" | `assets/minds-mascot/idle-pose/mind-<id>.webp`, `assets/minds-mascot/toy-card/card-<id>.webp`, or `assets/brand/icons/icon-<name>.webp` |
| "This is Minds" | `assets/brand/logo/` |
| A small control | A Lucide icon |

If a Lucide icon does not say the thing, use a word. Do not generate a custom
glyph to fill one button.
