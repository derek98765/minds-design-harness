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

## Three sets

`assets/photos/` is split three ways:

| Set | Shows | Reach for it when |
|---|---|---|
| **`product/`** | Abby with the product itself — building a Mind, a Mind just created, the connected-apps network | Launching a one-click Mind, or announcing a feature. **The usual right answer for a product page.** |
| **`everyday-user/`** | Real people mid-task with Abby in the scene — kitchens, laundry, family, a home desk, a café | The primary consumer audience: busy parents, small business owners |
| **`builder/`** | Studios, multi-monitor setups, a laptop mid-build | The secondary audience: developers and founders |

Pick the set that matches the page's reader. A one-click-Mind landing page for
consumers should not lead with a builder image — and a feature launch usually wants
`product/` rather than a person at a desk.

`assets/README.md` lists every file with what it shows.

---

## Generating new imagery

Never leave a placeholder box — check `assets/` first, and if nothing fits, generate
the real image. The brand guideline fixes the style prompt. **Do not edit the fixed
portion** — that is what keeps every generated image consistent.

**Every generation scenario reaches for an existing file as its reference image
first.** Which folder depends on what you're generating:

| Generating… | Reference folder | Formula |
|---|---|---|
| A realistic photo of a human with a Mind | `assets/photos/everyday-user/` or `assets/photos/builder/` | Fixed style prompt + subject, using the closest matching photo as reference |
| A realistic product photo (a Mind with a physical product) | `assets/photos/product/` | Fixed style prompt + subject, using the closest matching photo as reference |
| A new icon | `assets/icons/` | Handled by the dedicated `generate-minds-icons` skill — see below, do not freehand this one |
| A one-click Mind's toy-figurine image | `assets/toy-figurines/` | Handled by the dedicated `generate-one-click-mind-images` skill — see below, do not freehand this one |
| A default Mind image (Abby herself, not a one-click Mind) | `assets/mascot/` | Abby reference-image formula, using `assets/mascot/turnaround/abby-ref-02-4views.webp` |

Pick the closest existing file in the folder as the attached reference — for a
realistic photo that means matching audience and setting (a kitchen scene stays close
to another kitchen scene, not a studio shot); for Abby/toy-figurine generation it means
matching pose or product category. This keeps lighting, materials, and character
consistent with what's already shipped rather than drifting on every new generation.

### Realistic people or product photos (Midjourney, or Codex/`gpt-image-2`)

Formula: **fixed brand style + reference image + custom subject**

Fixed brand style — keep this exactly as written:

```
Cinematic lifestyle photography, super bright high-key daylight. A scene featuring
soft cream neutrals and natural wood tones, accented by vibrant pops of blue and
orange. Shot on 50mm f/1.8 lens, shallow depth of field, soft bokeh, sharp focus on
skin textures. Minimal grain, 8k resolution.
```

Attach the closest matching file from `photos/everyday-user/`, `photos/builder/`, or
`photos/product/` (per the table above) as a style/composition reference, then append
only the subject, e.g.:

```
A lady busy at work, expression positive with small smile
```

Via the `codex-image-gen` skill:

```
codex exec --skip-git-repo-check -s workspace-write \
  -i design-harness/assets/photos/everyday-user/<closest-match>.webp \
  'Generate an image: Cinematic lifestyle photography, super bright high-key daylight.
   A scene featuring soft cream neutrals and natural wood tones, accented by vibrant
   pops of blue and orange. Shot on 50mm f/1.8 lens, shallow depth of field, soft
   bokeh, sharp focus on skin textures. Minimal grain, 8k resolution. <SUBJECT>.
   Save it as src/images/<name>.png in the current directory.'
```

### Abby herself (Gemini, ChatGPT, or Codex/`gpt-image-2`)

Formula: **reference image + custom subject** — no separate style prompt needed, the
reference carries the style.

Attach `assets/mascot/turnaround/abby-ref-02-4views.webp` as the character reference,
then describe only the change:

```
Take the character ref and make a top-down shot of it with its arms crossed.
```

Always pass the reference. Describing Abby in words alone produces a different
character every time.

### One-click Mind toy figurines

Do not freehand this one either. Use the `generate-one-click-mind-images` skill — it
interviews for (or proposes and gets approval on) the Mind's outfit and its 4
accessory items before generating anything, attaches the closest matching file from
`assets/toy-figurines/` as the reference, and enforces the exact 800×942px transparent
output every shipped figurine uses. See the "One-Click Mind blister packs" section of
[brand-mascot.md](brand-mascot.md) for the anatomy this has to match.

### New icons

Do not freehand icon generation with the formulas above. Use the `generate-minds-icons`
skill instead — it wraps `codex-image-gen` with the post-processing an icon needs that
the general photo/character formulas above don't provide: a fixed 240×240px canvas, a
transparent background, and quantization to exactly two flat colors (indigo + one
orange accent). It uses the closest match in `assets/icons/` as the generation
reference, same as any other category here. See
[brand-iconography.md](brand-iconography.md) for the color rules an icon must satisfy.

### Saving a generated image

- **Save into the consuming project's `src/images/`** — this harness gets copied into
  a working project, and generated images belong with that project's other source
  assets, not inside `design-harness/assets/` (that folder is the fixed brand library,
  not a scratch space for generations).
- Requires the `codex` CLI. If it isn't installed, stop and have the user run
  `npm install -g @openai/codex` (installing Node/npm first if needed) rather than
  shipping a placeholder — see the `codex-image-gen` skill for the full prerequisite
  and troubleshooting steps.
- Run the image through the same [Using an image on a page](#using-an-image-on-a-page)
  and [Don'ts](#donts) rules below as any other photo — radius, aspect ratio, no text
  baked in, no cool/grey tones. Toy-figurine and mascot generations are exempt from the
  radius/crop rules below — they're placed as full character art, not cropped photos.

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
- A CTA placed over a photo uses the `tertiary-light` (solid white) or `outline-light`
  button variant, not `primary` or `secondary` — see DESIGN.md §4 Buttons. Solid white is
  there for contrast against the image, so confirm it actually reads at the button's
  exact placement, not just against the photo's average tone.

---

## Don'ts

- No cool grey or blue-toned photography — the whole palette is warm.
- No heavy filters, vignettes, or duotone treatments.
- No stock imagery that hasn't been checked against the look above.
- No text baked into an image. Overlay it in HTML so it stays selectable, responsive,
  and translatable.
