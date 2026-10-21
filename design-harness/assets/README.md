# Assets

| Folder | What's in it |
|---|---|
| `artwork/` | Images for pages: info-graphics, avatars, illustrations. |
| `minds-mascot/` | Clean cutouts of the Minds, and their toy cards. |
| `brand/` | Logos, Mind icons, and the Manrope font. |

Use every file whole. Do not crop a figure out of a scene, redraw a
character, or recolor one. Compress a large file before you ship it.

Rules: [../spec/brand-mascot.md](../spec/brand-mascot.md),
[../spec/brand-imagery.md](../spec/brand-imagery.md),
[../spec/brand-logo.md](../spec/brand-logo.md).

---

## `artwork/`

| Folder | Use for | Files |
|---|---|---|
| `info-graphics/` | Info-graphic and explainer sections. Clean, on transparent or plain ground. | `minds-toolkit-01` … `-04` (a Mind with its props floating around it), `minds-ecosystem-flywheel` (four Minds in a loop), `about-digital-hands` (Master Mind with floating panels) |
| `avatars/humans/` | Profile pictures and small portraits of people: beside a quote, a story, a chat message, a user list. | `avatar-human-<name>.webp`: 23 square portraits on soft gradients (256px). |
| `avatars/minds/` | Profile pictures for Minds. | `avatar-mind-<id>.webp`: 24 square Mind portraits on soft gradients (256px). Same ids as `minds-mascot/` except `chief-of-staff`, plus `master-mind`, `founder`, `assistant-coach`, `classic`, `classic-skin`, `classic-default`. |
| `illustrations/minds-only/` | Heroes, section backgrounds, and story images with Minds only. | `home-hero-idle` (Master Mind in the living room), `home-tour-idle-1` … `-6` (living room, kitchen, gym, and the rooms between), `home-minds-neighbours` (five Minds looking down at the camera), and three collages to use as one block: `about-hero`, `everyday-hero`, `home-footer` |
| `illustrations/with-human/` | The same, where a person shares the scene with Minds. | `home-hero-walk` (a man welcoming the Master Mind home), `home-late-night-bed` (a girl and a Mind on a bed at night), `home-studio-planning` (two people planning with Minds in a studio) |

---

## `minds-mascot/`

| Folder | Files |
|---|---|
| `idle-pose/` | `master-mind.webp` (olive beanie, orange vest, walkie-talkie) and `mind-<id>.webp`, each specialist Mind standing in its job costume. |
| `dynamic-pose/` | `mind-bizz-action`, `mind-email-manager-action`, `mind-general-assistant-action`: half-body action poses with a livelier face (wink, open grin). Small files (270×225). |
| `toy-card/` | `card-<id>.webp`: the Mind in a blister with accessory pockets. No name on it — set the name in HTML. |

Mind ids: `bizz`, `chief-of-staff`, `content`, `decision`, `email-manager`,
`fitness-coach`, `follow-up`, `football`, `game-designer`,
`general-assistant`, `gtm`, `learning-coach`, `personal-chef`,
`product-builder`, `recruiter`, `research`, `sales`, `scrum-master`,
`superior-trader`.

---

## `brand/`

### `logo/`

| File | Use |
|---|---|
| `logo-minds-blue.svg` | Default. On the cool wash, on white, on glass. |
| `logo-minds-white.svg` | On photography and on any dark surface. |
| `logo-mark-blue.svg` | The antenna head alone. Favicon and sizes below 120px wide. |
| `logo-mark-white.svg` | The mark in white, for photography and dark surfaces. |
| `logo-minds-blue.png`, `logo-minds-white.png` | PNG copies, for places that can't take SVG. |

### `icons/`

| File | Use |
|---|---|
| `icon-<name>.webp` | Dual-tone app icon for a named Mind: indigo base, orange on one detail. Use when a page names that Mind. |
| `icon-app-default.svg` | Generic Mind icon, for a Mind with no icon of its own. |
| `icon-skill-default.svg` | Generic skill icon. |

Reuse an existing icon. Do not draw a new one for a Mind that already has one.

### `fonts/`

Manrope, the brand typeface, from Google Fonts. Free to use and ship under
the SIL Open Font License (`OFL.txt`) — keep that file with the fonts.

| File | Use |
|---|---|
| `Manrope-Variable.woff2` | Web pages. One file covers every weight, 200–800. |
| `Manrope-Variable.ttf` | Install on your computer for Figma and other design tools. |
| `static/Manrope-<Weight>.ttf` | One file per weight, ExtraLight to ExtraBold. For apps that don't handle variable fonts, like some slide and office tools. |

To self-host instead of loading from Google Fonts:

```css
@font-face {
  font-family: "Manrope";
  src: url("Manrope-Variable.woff2") format("woff2");
  font-weight: 200 800;
  font-display: swap;
}
```
