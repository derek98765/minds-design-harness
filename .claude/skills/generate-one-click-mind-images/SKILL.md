---
name: generate-one-click-mind-images
description: Use when generating a NEW one-click Mind toy-figurine blister-pack image that doesn't already exist in assets/toy-figurines/. Interviews the user for the Mind's outfit and 4 accessory items (or proposes them for approval if the user hasn't specified), then generates an 800x942px transparent PNG matching the shipped blister-pack art direction. Do not use codex-image-gen directly for this; this skill supplies the reference image, prompt structure, and dimension/format constraints codex-image-gen needs. Triggers include "generate a one-click Mind image for [name]", "make a toy figurine for [Mind]", "we need a blister pack for a Mind that isn't in toy-figurines".
---

# Generate one-click Mind images

Produces a new entry in the "One-Click Mind blister packs" art direction (see
[../../../design-harness/spec/brand-mascot.md](../../../design-harness/spec/brand-mascot.md)) — Abby dressed and posed for a specific
one-click Mind, packaged as a collector toy. Wraps `codex-image-gen`: this skill
supplies the reference image and the constraints codex-image-gen can't guarantee on
its own (exact canvas size, transparent background, matching the shipped anatomy).

## When to use

Only after confirming the Mind doesn't already have a figurine — check
`assets/toy-figurines/` and `assets/README.md` first (18 named Minds). If the Mind is
in the list, reuse the existing file; do not regenerate it.

## Prerequisites

`codex` CLI — see the `codex-image-gen` skill's Prerequisites for the install check
(`npm install -g @openai/codex`). No other dependencies; this skill does not
post-process the output (unlike `generate-minds-icons`) because a blister-pack image
only needs dimension/transparency constraints, not color quantization or vectorizing.

## Step 1 — Gather the Mind's outfit and 4 items

Ask the user to describe the new Mind. Two paths, depending on what they give you:

**They already describe the look explicitly** — an outfit (clothing, colors, props
Abby is holding/wearing) and the 4 accessory items for the side slots. Skip straight
to Step 2 with what they gave you.

**They don't have that level of detail yet** — ask for enough about the Mind to work
from: what job it does, who uses it, and any concrete details about how it works (2-3
sentences is enough — don't demand more than that). Then, from that description,
propose:
- **The outfit** — what Abby wears and holds, matching her job the way the shipped
  set does (`mind_personal_chef.webp` → chef's hat, apron, knife and pan;
  `mind_recruiter.webp` → suit, tie, lanyard, clipboard and phone; `mind_content.webp` →
  streetwear jacket, selfie stick, lightbulb). One or two signature props in Abby's
  hands, plus clothing that reads instantly as the job.
- **The 4 accessory items** for the side slots — each a small object or UI snippet
  that shows one thing the Mind actually does (see the shipped examples: a laptop
  screen, a resume card, a burndown chart, a stop-sign icon). Four distinct
  capabilities or moments, not four variations on the same idea.

Present the proposed outfit and 4 items back to the user and **wait for explicit
approval before generating anything**. If they want changes, revise and re-confirm —
don't generate on a guess.

## Step 2 — Pick a reference

Pick the closest matching file in `assets/toy-figurines/` to the new Mind's job
category (or the closest analog if nothing matches closely) — this keeps proportions,
lighting, packaging style, and Abby's head/crown consistent with the shipped set. See
`assets/README.md` for the full list mapped to Mind personas.

## Step 3 — Generate via codex-image-gen

```bash
codex exec --skip-git-repo-check -s workspace-write \
  -i design-harness/assets/toy-figurines/<closest-match>.webp \
  'Take the attached collector-toy blister-pack reference and make a new one for a
   different one-click Mind, in exactly the same style, proportions, and packaging
   (translucent beige blister card, orange banner strip, euro-slot hang-hole, 4 clear
   accessory pockets down the right side, gold "Limited Edition" seal bottom right).
   Keep Abby'\''s head, crown antennae, and dot eyes exactly as in the reference —
   change only her outfit and held props, and the contents of the 4 side pockets.

   Outfit: <OUTFIT DESCRIPTION — approved in Step 1>.

   4 side-pocket items, top to bottom: 1) <ITEM 1>. 2) <ITEM 2>. 3) <ITEM 3>.
   4) <ITEM 4>.

   Output must be exactly 800x942px with a transparent background around the die-cut
   card silhouette, matching the reference'\''s canvas exactly — no added border, no
   drop shadow outside the card, no watermark beyond the existing gold seal.
   Save it as <scratch>/mind-figurine-raw.png in the current directory.'
```

Key constraints, and why each is in the prompt:
- **800×942px** — every shipped figurine is exactly this size; verify after
  generation (`python3 -c "from PIL import Image; print(Image.open('<file>').size)"`)
  and re-run with a size correction if it drifts, since gpt-image-2 returns its own
  native sizes by default.
- **Transparent background** — the shipped files are RGBA with real transparency
  around the card's rounded/die-cut silhouette (not a fully transparent card interior
  — the beige card itself stays opaque). Verify with
  `Image.open('<file>').split()[-1].getextrema()` — it should NOT be `(255, 255)`
  (fully opaque); some transparency should be present.
- **Reference image via `-i`** — always pass one. Describing the blister-pack style
  in words alone produces packaging that drifts from the shipped set, the same
  problem `brand-imagery.md` calls out for Abby and icon generation.

## Step 4 — Verify and report

1. Confirm dimensions are exactly 800×942px and the file has real transparency (Step 3
   checks above).
2. Look at the generated image: does Abby's head/crown/eyes match the reference
   unchanged? Does the outfit and do the 4 items match what was approved in Step 1? Is
   the packaging anatomy (banner, orange strip, hang-hole, 4 pockets, seal) intact?
3. If anything is off, regenerate with a corrected prompt rather than shipping it —
   this is a produced-asset art direction, not a rough placeholder.
4. Save into the consuming project's `src/images/` (not into
   `design-harness/assets/toy-figurines/`, which is the fixed brand library — see
   [brand-imagery.md](../../../design-harness/spec/brand-imagery.md) for this convention) and report the path and
   what Mind it represents.

## Common mistakes

- Generating without getting explicit approval on the outfit/items first — the user
  asked to review and approve the proposal before any image is generated when they
  haven't given full detail themselves.
- Skipping the reference image, or picking a reference from an unrelated job category
  when a closer match exists.
- Not verifying the output dimensions — gpt-image-2 defaults to its own native sizes
  (often 1024² or similar) unless explicitly corrected after the fact.
- Assuming the banner shows the Mind's name/type as text. It doesn't, in any of the 18
  shipped files — the banner is a plain beige strip with an orange band and hang-hole,
  no typography. Match the actual files, not older written descriptions of them.
