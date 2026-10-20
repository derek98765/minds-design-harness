# Characters

Read this when a page uses the Master Mind or a one-click Mind.

The cast is 3D. A glossy blue body, three ball-tipped antennae, simple limbs,
and a costume that says the job. The old flat Abby, the hand stickers, and the
beige blister packs are retired. Do not place those, and do not generate a
new character to fill a gap.

---

## Master Mind

`assets/master-mind/`. He is the homepage hero and the figure in the
launch-a-Mind modal when someone is making their own Mind.

Costume is fixed: olive beanie, orange utility vest over a white puffer,
cargo pants, sneakers, walkie-talkie. The homepage plays `hero-idle.mp4` and
`hero-walk.mp4` inside the living-room scene. The launch modal plays
`launch-idle.mp4`, which is the same idle framed tighter on him.

Use a still (`full-body.webp`, `profile.png`, a poster) when the page cannot
play video. Do not invent a new pose.

---

## One-click Minds

`assets/one-click/`. Nineteen specialists have a collector card. Each also has
a full-body cutout, a side-view still, and a side-view clip.

| You need | Use |
|---|---|
| A tile or a chooser, the card is the point | `cards/toycard-<id>.webp`, or `-s` when the card is small |
| The figure with the name set in HTML | `figurines/<name>-notext.webp` |
| A portrait on a page, no packaging | `full-body/<id>.webp` or `side-view/` |
| Motion | The matching `.mp4` in `side-view/` |

The card is a finished picture: blue card, blister, accessory pockets, orange
edition block. Ship the file. Do not redraw the pockets, recolor the card, or
typeset a new name on top of a card that already has one.

`toycard-new.webp` is the generic card. Use it only for a Mind that has no
card of its own.

---

## Marketing scenes

`assets/characters/`. These are the figures and rooms from the homepage,
About, Everyday Examples, and For Everyone. The product cuts above are for
UI. These files are for a marketing page that needs the same scene the site
already ships.

`characters/poses/` is the uncostumed character. Reach for a pose when a
section needs the figure alone, with no job costume and no room around it.

The file list is in [../assets/README.md](../assets/README.md).

---

## How many figures

One hero figure per section. A homepage scene may show the cast in the
background of a single illustration, the way the living-room hero does. A row
of cards is a catalogue, not a crowd of loose figures. Do not drop a character
into a corner to fill space.

---

## What not to do

- Do not redraw, recolor, or restyle a shipped character.
- Do not composite the old photography of real people with a flat Abby.
- Do not use hand stickers. That accent system is gone.
- Do not generate a new Mind image from a prompt when a file in `assets/`
  already exists. New character art is produced with the app's own pipeline,
  not from this harness.
