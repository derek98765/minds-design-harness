# Imagery

Read this when a page needs a hero, a scene, or a character image.

---

## The look

Shipped imagery is 3D illustration, not photography of real people. The
signature scene (`master-mind-waving-in-living-room-with-minds-behind.webp`) is a bright modern interior — wood,
warm daylight, a living room and kitchen — populated by the blue cast. The
Master Mind is in front. The specialist Minds are in the room behind him,
each in their own costume.

What makes a scene recognisable:

- Bright, soft daylight. Not a cool grey office and not a dark studio.
- A real room, lived in: sofa, kitchen, plants, stairs. Not a void and not a
  stock boardroom.
- The characters are the 3D cast from `assets/`. Same glossy blue round
  head, same antennae, the same face (big round eyes, a small mouth that
  changes with the moment), costumes that match the job. See
  [brand-mascot.md](brand-mascot.md).
- Orange and blue show up in clothing and props. They are not a color grade
  laid over the whole picture.

What it is not: the old lifestyle photos with a flat Abby composited beside a
person, hand-sticker accents, a beige toy package, or a faceless blue sphere.

---

## What to reach for

| The page needs | Use |
|---|---|
| A marketing hero, section background, or story image | `assets/artwork/illustrations/` — `with-human/` when the page is about people and Minds together, `minds-only/` for Minds alone |
| An info-graphic or "how it works" section | `assets/artwork/info-graphics/` |
| A Mind with more energy than a standing pose | `assets/minds-mascot/dynamic-pose/` (three Minds only) |
| A profile picture or small portrait | `assets/artwork/avatars/humans/` or `avatars/minds/` |
| A specific Mind, as a product | `assets/minds-mascot/idle-pose/mind-<id>.webp` |
| A catalogue of Minds, name in HTML | `assets/minds-mascot/toy-card/card-<id>.webp` |

There is no photo library in this harness. Do not invent one, and do not
generate any image yourself — not a character, a scene, or a stand-in. If none
of the shipped files fits, stop and ask the user. Say what the page needs and
which files came closest.

---

## Motion

If a page plays a short looping clip, always provide a still image as the
first frame. Do not autoplay a clip that has no still fallback.

---

## Text in images

The toy cards in `assets/minds-mascot/toy-card/` are text-free. The name and the
description are HTML, on cards and everywhere else.
Do not bake a headline into a scene.
