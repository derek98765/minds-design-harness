---
name: generate-one-click-mind-images
description: Generate a new one-click Mind toy-figurine blister-pack image when no suitable approved image exists in design-harness/assets/toy-figurines. Use for requests to create a figurine or blister pack for a new Mind; do not regenerate an existing approved persona or use this for general mascot imagery.
---

# Generate one-click Mind images

Create an 800x942 transparent PNG that matches the shipped One-Click Mind blister
packs. Use native Codex image generation with an approved figurine as the reference;
do not launch a nested `codex exec` process.

## Before proposing or generating

1. Read [brand-mascot.md](../../../design-harness/spec/brand-mascot.md) and the
   one-click Mind guidance in
   [brand-imagery.md](../../../design-harness/spec/brand-imagery.md).
2. Check `design-harness/assets/toy-figurines/` and
   `design-harness/assets/README.md`. Reuse an approved figurine when the requested
   persona already exists.

## Define the art direction

If the user supplied an outfit, held props, and four side-pocket items, preserve
those choices and proceed.

If those details are missing, ask what the Mind does, who uses it, and for any
concrete workflow details. From the answer, propose:

- an outfit that communicates the job instantly, including one or two signature
  held or worn props; and
- four distinct accessory items, ordered top to bottom, each representing a
  different capability or moment in the Mind's workflow.

Show the outfit and four-item proposal to the user and wait for explicit approval
before generating. Revise and reconfirm if requested. This approval pause applies
only when Codex supplied or materially inferred the visual details.

## Choose and inspect a reference

Pick the closest approved figurine by job category. Inspect that local image before
generation so the new work preserves Abby's anatomy, proportions, lighting, package
construction, and composition.

## Generate

Call the native image-generation tool with the chosen local reference in
`referenced_image_paths`. The prompt should identify the approved outfit and list
the four approved pocket items in top-to-bottom order. Require all of the following:

- the same collector-toy blister-pack style, proportions, and framing as the
  reference;
- Abby's head, crown antennae, dot eyes, and core body proportions unchanged;
- only the outfit, held props, and four pocket contents changed;
- a translucent beige blister card, plain beige banner with orange band, euro-slot
  hang-hole, four clear accessory pockets on the right, and the existing gold
  `Limited Edition` seal;
- no added title or persona text, no added border, no external drop shadow, and no
  new watermark;
- an 800:942 portrait composition with true alpha transparency around the die-cut
  card silhouette.

Use the generated image's local output path. If the tool does not provide a usable
local file, report that limitation instead of inventing a path.

## Verify and deliver

Use Pillow to inspect the output:

```bash
python3 -c "from PIL import Image; im=Image.open('<file>'); print(im.size, im.mode, im.getchannel('A').getextrema() if 'A' in im.getbands() else 'no alpha')"
```

The deliverable must be exactly 800x942 pixels, have an alpha channel, and contain
some transparent pixels outside the opaque card. If the image has the correct
composition and aspect ratio but only its pixel dimensions differ, resize it once
with high-quality resampling. Do not stretch or crop a materially different aspect
ratio; regenerate instead.

Inspect the final image and confirm:

- Abby's head, crown, eyes, and proportions still match the reference;
- the outfit and all four items match the approved details;
- the banner, orange band, hang-hole, four pockets, and seal remain intact; and
- there is no unwanted text, border, shadow, or opaque outer background.

Regenerate with a corrected prompt when any visual requirement fails. Save the
verified PNG in the consuming project's `src/images/`, not in the fixed
`design-harness/assets/toy-figurines/` library. Report the final path, represented
Mind, chosen reference, and verified dimensions/transparency.
