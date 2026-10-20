# Icons

Read this when a control needs an icon.

A Mind is not an icon. The Master Mind and the one-click Minds are the 3D
characters in `assets/`. The old dual-tone persona icons (a piggy bank for
Finance Buddy, a bowl for Meal Planner, and the rest of that set) are retired.
Do not draw a new one.

---

## UI icons

Interface icons — nav, rows, menus, empty states — are Lucide, stroke 1.5,
`currentColor`, sized to the control. On glass they use the cool grey text
tokens (`--text-label-cool` at rest, `--blue-lit` when selected or hovered).

Do not mix a filled brand illustration into a row of stroke icons. The
antenna-head mark (`assets/logo/mark.svg`) is the logo mark, used for the
favicon and for the Minds nav item. It is not a generic icon.

---

## When a picture is needed instead

| Need | Use |
|---|---|
| "Which Mind is this?" | The Mind's card, full-body, or side-view |
| "This is Minds" | `assets/logo/` |
| A small control | A Lucide icon |

If a Lucide icon does not say the thing, use a word. Do not generate a custom
glyph to fill one button.
