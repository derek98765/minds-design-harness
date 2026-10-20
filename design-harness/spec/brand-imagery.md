# Imagery

Read this when a page needs a hero, a scene, or a character image.

---

## The look

Shipped imagery is 3D illustration, not photography of real people. The
homepage hero is a bright modern interior — wood, warm daylight, a living
room and kitchen — populated by the blue cast. The Master Mind is in front.
The specialists are in the room behind him, each in their own costume.

What makes a scene recognisable:

- Bright, soft daylight. Not a cool grey office and not a dark studio.
- A real room, lived in: sofa, kitchen, plants, stairs. Not a void and not a
  stock boardroom.
- The characters are the 3D cast from `assets/`. Same blue body, same
  antennae, costumes that match the job.
- Orange and blue show up in clothing and props. They are not a color grade
  laid over the whole picture.

What it is not: the old lifestyle photos with a flat Abby composited beside a
person, hand-sticker accents, or a beige toy package.

---

## What to reach for

| The page needs | Use |
|---|---|
| A marketing hero | `assets/master-mind/hero-idle.mp4` or `hero-walk.mp4`, with the matching poster |
| The launch-a-Mind moment | `assets/master-mind/launch-idle.mp4` |
| A specific Mind, as a product | `assets/one-click/full-body/` or `side-view/` |
| A catalogue of Minds | `assets/one-click/cards/` |
| The figure only, name in HTML | `assets/one-click/figurines/` |
| A homepage room, a group, or a tour still | `assets/characters/homepage/` |
| The character alone, no costume | `assets/characters/poses/` |
| About, Everyday Examples, or For Everyone | The matching folder in `assets/characters/` |

There is no photo library in this harness. Do not invent one, and do not
generate a stand-in character. If none of the shipped files fits, stop and
ask, rather than producing a new figure that will not match the cast.

---

## Motion

Homepage and launch modal play short loops. Always provide the poster image
as the first frame. Do not autoplay a clip that has no still fallback.

---

## Text in images

Collector cards already contain their own type. Leave it. Everywhere else,
including the text-free figurines, the name and the description are HTML.
Do not bake a headline into a scene.
