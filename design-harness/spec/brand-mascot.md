# Characters

Read this when a page uses the Master Mind or a specialist Mind.

The cast is 3D. A big glossy blue round head on a small body, a cluster of
ball-tipped antennae fanning out from the back of the head, glossy blue hands,
and a costume that says the job. The head is most of the figure. The old flat
Abby, the hand stickers, and the beige blister packs are retired. Do not place
those, and do not generate a new character to fill a gap.

---

## The face

Every Mind has a face. It is what makes the character read as alive and
not as a blue ball.

- **Eyes:** two big round white eyes with black pupils, set close together
  high on the front of the head.
- **Mouth:** at rest, a small round "o", as in `idle-pose/` and the avatars.
  In action, the face changes: a wink, an open grin, a laugh. See
  `dynamic-pose/` and the scenes in `artwork/`.

A Mind with no eyes, or a plain sphere with antennae, is the old look. Do not
use it. Do not redraw the eyes, swap the expression, or add a mouth to a
file that does not have one. If a page needs a different expression, pick
the file that already has it.

---

## Master Mind

The flagship character. Use him when a page talks about Minds as a whole,
or about someone making their own Mind.

Costume is fixed: olive beanie, orange utility vest over a white puffer,
cargo pants, sneakers, walkie-talkie. The cutout is
`assets/minds-mascot/idle-pose/master-mind.webp`. His living-room scenes are
`assets/artwork/illustrations/minds-only/home-hero-idle.webp` and
`illustrations/with-human/home-hero-walk.webp`.

Do not invent a new pose.

---

## Specialist Minds

Nineteen specialists, each dressed for one job. Each has a full-body cutout and a collector card.

| You need | Use |
|---|---|
| A portrait on a page, no packaging | `assets/minds-mascot/idle-pose/mind-<id>.webp` |
| A figure with energy, mid-action | `assets/minds-mascot/dynamic-pose/` (three Minds only) |
| A tile or a chooser, the card is the point | `assets/minds-mascot/toy-card/card-<id>.webp` |

The card is a finished picture: blue card, blister, accessory pockets, orange
edition block. It has no name on it. Set the name in HTML. Do not redraw the
pockets or recolor the card.

---

## Marketing scenes

`assets/artwork/`. These are the shipped Minds scenes. The cutouts above are
for UI. These files are for a marketing page. They are split by use: `info-graphics/`, `avatars/`
(split into `humans/` and `minds/`), `illustrations/` (split into
`with-human/` and `minds-only/`).

The file list is in [../assets/README.md](../assets/README.md).

---

## How many figures

One hero figure per section. A scene may show other Minds in the background
of a single illustration, the way `home-hero-idle.webp` does. A row
of cards is a catalogue, not a crowd of loose figures. Do not drop a character
into a corner to fill space.

---

## What not to do

- Do not redraw, recolor, or restyle a shipped character.
- Do not use a faceless Mind. Every Mind has eyes and a mouth.
- Do not composite the old photography of real people with a flat Abby.
- Do not use hand stickers. That accent system is gone.
- Do not generate a new Mind image from a prompt when a file in `assets/`
  already exists. New character art comes from the Minds team, not from this
  harness.
