# Abby & the hand stickers

Read this when a page uses the mascot or the hand-sticker accents.

---

## Who Abby is

Abby is the character behind the brand — a glossy metallic-blue sphere with a small
crown of antennae, two dot eyes, simple limbs and rounded boots. She is the friendly
face of the identity.

Abby embodies three values: **Empathy, Foresight, Acuity.** She anticipates, adapts,
and helps. She is capable and warm, never sarcastic, never a robot butler.

She is *always in motion* — the poses are expressive and mid-gesture. A static,
front-facing Abby standing to attention is off-brand.

Poses are in `assets/mascot/poses/` (21 renders); the model sheet is in
`assets/mascot/turnaround/`.

---

## When to use which asset

This is the decision most pages get wrong:

| You need | Use | Why |
|---|---|---|
| A warm human hero image | **Lifestyle photography** with Abby composited in | Real people doing real tasks; Abby is the companion in the scene |
| Personality without people | **Abby alone** on a plain warm background | Product moments, empty states, confirmations |
| A small accent beside text | **A hand sticker** | Punctuates a point without a full character |
| A decorative shape | **None of the above** | Abby is a character, not a graphic element |

**Do not use Abby as decoration.** She is a character with a personality — dropping
her into a corner to fill space reads as clip-art.

---

## Poses

`assets/mascot/poses/` holds 21 approved poses; `assets/mascot/turnaround/` holds the
model sheet (front, back, left, right, plus a combined four-view reference).

- Pick a pose whose gesture **matches what the copy says.** Pointing at the headline,
  arms crossed while "thinking", waving on a welcome screen.
- One Abby per section. Two in the same viewport reads as chaos.
- The turnaround is a *reference sheet* for generating new imagery — not artwork to
  place on a page.

Never redraw, recolor, or restyle Abby. She is fixed artwork. If you need a pose that
does not exist, generate it from the reference — see [brand-imagery.md](brand-imagery.md).

---

## Hand stickers

`assets/stickers/solo/` holds 8 bare gestures (pointing, OK, open palm, waving);
`assets/stickers/props/` holds 6 compositions holding an object (a card, coins, a
checklist, a phone).

They are a **separate accent system** from Abby herself:

- Use them beside a stat, a list item, a feature title, or a testimonial — small,
  punctuating a single point.
- One or two per page. They lose all impact in a row of six.
- They pair naturally with orange props (a pencil, a card, a star) — that is the
  established look, not an accident.
- Do not mix a hand sticker into a scene that already has a full Abby.

---

## One-Click Mind blister packs

The One-Click Minds have their own art direction: a collector-toy blister pack, warm
beige card, orange banner strip, and 4 accessory items in clear pockets down the right
side showing what the Mind can do.

Anatomy of the pack (matching the shipped files — see `assets/toy-figurines/`):
- **Top banner** — plain warm-beige card with a euro-slot hang-hole; no name/type text
- **Orange strip** — a solid band beneath the banner, no "COLLECTOR SERIES" text
- **The figure** — Abby dressed and posed for the job, holding one or two signature props
- **4 accessory items** — small objects or UI snippets in individual clear pockets,
  each showing a distinct thing the Mind does
- **Limited Edition seal** — gold circular seal, bottom right

18 of these are already produced and live in `assets/toy-figurines/` — see
[../assets/README.md](../assets/README.md) for the full list. Check there first for any one-click Mind you're
featuring (a launch page, a Minds directory, a pricing card) and reuse the matching
file. This is a produced asset: do not assemble a new blister pack in CSS, edit an
existing one, or recolor/recompose the figure. For a Mind that isn't in the set yet,
use the `generate-one-click-mind-images` skill rather than freehanding it — it
interviews for the outfit and 4 items (or proposes them for approval) and generates a
new figurine matching this anatomy.

---

## Backgrounds for Abby

Abby sits on warm, quiet surfaces: the beige canvas, a soft gradient, or a real
photographed environment. She does not sit on the orange brand color — the blue and
orange fight at that saturation.
