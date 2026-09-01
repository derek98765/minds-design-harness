# Imagery

Read this when choosing a hero image, or generating new photography.

---

## The look

Minds photography is **warm, bright, and lived-in.** Real people mid-task in real
rooms, shot in natural high-key daylight, with Abby composited into the scene as a
companion.

What makes it recognisable:

- **Warm interiors** — wood, cream walls, plants, kitchens, cafés, home desks
- **Natural high-key daylight** — bright and soft, never moody or heavily shadowed
- **People genuinely doing something** — cooking, working, organising — not posing at camera
- **Relaxed, warm expressions** — a small real smile, not a stock grin
- **Orange and blue accents in the props** — a mug, a speaker cone, a chair
- **Shallow depth of field** — soft background, sharp on the subject

What it is not: corporate stock photography, people in suits shaking hands in a
glass boardroom, cool grey offices, or anyone pointing at a laptop in delight.

---

## Two audiences

`assets/photos/` is split the way the brand splits:

| Set | Who | Scenes |
|---|---|---|
| **everyday-user** | Busy parents, small business owners — the primary audience | Kitchens, laundry, family, a home desk, a café |
| **builder** | Developers and founders — secondary | Studios, workshops, a laptop mid-build |

Pick from the set that matches the page's reader. A one-click-Mind landing page for
consumers should not lead with a builder image.

---

## Generating new imagery

The brand guideline fixes the style prompt. **Do not edit the fixed portion** — that is
what keeps every generated image consistent.

### Realistic people (Midjourney)

Formula: **fixed brand style + custom image subject**

Fixed brand style — keep this exactly as written:

```
Cinematic lifestyle photography, super bright high-key daylight. A scene featuring
soft cream neutrals and natural wood tones, accented by vibrant pops of blue and
orange. Shot on 50mm f/1.8 lens, shallow depth of field, soft bokeh, sharp focus on
skin textures. Minimal grain, 8k resolution.
```

Then append only the subject, e.g.:

```
A lady busy at work, expression positive with small smile
```

### Abby (Gemini or ChatGPT)

Formula: **Abby's reference image + custom image subject**

Attach the four-view turnaround from `assets/mascot/` as the character reference, then
describe only the change:

```
Take the character ref and make a top-down shot of it with its arms crossed.
```

Always pass the reference. Describing Abby in words produces a different character
every time.

---

## Using an image on a page

- **Radius:** `--radius-md` (12px) for images and small tiles; `--radius-xl` (24px) for
  large feature surfaces.
- **Never full-bleed edge to edge** on desktop — images sit inside the content column
  with the canvas visible around them.
- **Aspect ratio:** 4:3 or 3:2 for split sections. Avoid tall portrait crops in a
  two-column layout; they break the vertical rhythm.
- **On mobile**, the image goes *below* the text in a split section, never above the
  headline.
- Do not overlay text directly on a photo unless there is a genuinely empty area with
  enough contrast. The type is the loudest element on a Minds page and it needs a clean
  surface — the warm canvas usually serves better.

---

## Don'ts

- No cool grey or blue-toned photography — the whole palette is warm.
- No heavy filters, vignettes, or duotone treatments.
- No stock imagery that hasn't been checked against the look above.
- No text baked into an image. Overlay it in HTML so it stays selectable, responsive,
  and translatable.
