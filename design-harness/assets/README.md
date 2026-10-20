# Assets

The current Minds character library, copied from the shipped app. These are 3D
cartoon characters. The old flat Abby poses, hand stickers, lifestyle photos,
and dual-tone persona icons are gone.

Marketing scenes live in `characters/`. Product cuts of the Master Mind and
the one-click catalogue live in `master-mind/` and `one-click/`.

Compress before you ship a large file on a page. Several side-view clips are
the full source.

---

## Logo — `logo/`

| File | Use |
|---|---|
| `minds-blue.svg` | Default on the cool wash, on white, on glass. |
| `minds-white.svg` | On photography and on any dark surface. |
| `mark.svg` | The antenna head alone. Favicon and sizes below 120px wide. |

Rules: [../spec/brand-logo.md](../spec/brand-logo.md).

---

## Master Mind — `master-mind/`

The flagship character. Glossy blue, three antennae, large eyes, olive beanie
with a mountain patch, white puffer, orange utility vest, cargo pants, chunky
sneakers, a walkie-talkie in one hand. This is the figure on the homepage hero
and in the launch modal's custom-Mind column.

| File | Use |
|---|---|
| `hero-idle.mp4` + `hero-idle-poster.webp` | Homepage hero, idle. |
| `hero-walk.mp4` + `hero-walk-poster.webp` | Homepage hero, walk. |
| `launch-idle.mp4` + `launch-idle-poster.webp` | Launch-a-Mind modal. A crop of the hero idle, framed on the figure. |
| `full-body.webp` | Cutout on black. Product UI, cards, empty states. |
| `side-view.webp` + `side-view.mp4` | Three-quarter still and clip. |
| `profile.png` | The still used on Profile. |

Do not redraw him, recolor him, or swap the costume. If a page needs the
Master Mind, use one of these files.

---

## One-click Minds — `one-click/`

Each specialist is the same blue character in a job costume. Four cuts:

| Folder | What it is |
|---|---|
| `full-body/` | Transparent-style full figure, one file per Mind. |
| `side-view/` | Three-quarter still (`.webp`) and clip (`.mp4`). |
| `figurines/` | Text-free figure art (`*-notext.webp`). The product draws the name in CSS. |
| `cards/` | Collector cards, full size and a `-s` cut (480px wide) for small tiles. |
| `transparent/` | Extra cutouts for General Assistant and Sales, used by the launch modal. |

**Cards** are finished compositions: blue backing, the figure in a blister,
accessory pockets down the side, an orange edition block. Use the file whole.
Do not rebuild the card in CSS and do not edit the type baked into it.

**Figurines** (`*-notext.webp`) are the figure without the card typography.
Use these when the name is set in HTML.

| Card id | Mind |
|---|---|
| `general-assistant` | General Assistant |
| `sales-mind` | Sales |
| `bizz-mind` | Bizz |
| `superior-trader` | Superior Trader |
| `game-designer` | Game Designer |
| `email-manager` | Email Manager |
| `scrum-master` | Scrum Master |
| `fitness-coach` | Fitness Coach |
| `chef-mind` | Personal Chef |
| `recruiter-mind` | Recruiter |
| `football-mind` | Football |
| `decision-mind` | Decision |
| `content-mind` | Content |
| `research-mind` | Research |
| `product-builder-mind` | Product Builder |
| `learning-coach-mind` | Learning Coach |
| `follow-up-mind` | Follow-Up |
| `gtm-mind` | GTM |
| `chief-of-staff-mind` | Chief of Staff |
| `toycard-new` | Generic card, for a Mind that does not have its own yet |

`cards/toycard-<id>.webp` is the full card. `toycard-<id>-s.webp` is the small
cut for a tile around 110–160px tall. Four extra figurines have no card yet:
`mind_brit_wit`, `mind_formula_1`, `mind_legal_assistant`, `mind_mystic`.

Rules: [../spec/brand-mascot.md](../spec/brand-mascot.md).

---

## Marketing cast — `characters/`

The 3D figures used on the homepage, About, Everyday Examples, and For
Everyone. Same blue body and antennae as the product cast. Use the file
whole. Do not crop a person out of a scene and do not restage it.

Lifestyle photos of real people with a small character dropped beside them
are not in this folder. Those compositions are retired.

### Poses — `characters/poses/`

The character with no costume, on a plain ground. Eight turns (`abby-01` to
`abby-08`), a wave (`build-your-own-mind-avatar.webp`), a figure holding an
object (`hero-object.webp`), and the gift hands (`gift.webp`).

### Homepage — `characters/homepage/`

| Files | What they are |
|---|---|
| `what-are-minds-*.webp` | Chef, email manager, fitness coach, general assistant, with their props. |
| `pic-bizz.webp`, `pic-email-manager.webp`, `pic-general-ass.webp`, `pic-small-chef.webp` | Tight cutouts for the "meet them" row. |
| `flywheel-relay.webp` | Four costumed figures in a loop. |
| `minds-neighbours.webp` | Five figures looking down into the camera. |
| `footer.webp`, `footer-mobile.webp` | The footer strip: work, making, play, a group. |
| `idle-1-poster.webp` … `idle-6-poster.webp` | Homepage tour stills. Living room, kitchen, gym, and the rooms between. |
| `transition-1-poster.webp` … `transition-7-poster.webp` | The frames between those rooms. |
| `hero-everyday.webp` | Everyday-life collage. |
| `cine-02-late-night-bed.webp` | Late-night scene. |
| `rolla-and-sticks-figma-scene.webp` | Studio planning scene. |

### About — `characters/about/`

`about-hero-img.png` is the About hero collage (kitchen and desk).
`abby-digital-hands.webp` is the Master Mind with the floating panels.

### Everyday examples — `characters/everyday/`

`everyday-hero.webp` is the page hero. The six stories are
`collaboration.webp`, `care.webp`, `wellbeing.webp`, `shop.webp`,
`event.webp`, and `game.webp`.

### For everyone — `characters/for-everyone/`

`laptop-hands.webp` is the hero (the blue hands at a laptop).
`scenarios/scenario-left.webp`, `scenario-center.webp`, and
`scenario-right.webp` are the room scenes. `scenarios/avatar-*.webp` are the
three portrait circles beside those stories.
