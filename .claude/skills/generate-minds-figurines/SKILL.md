---
name: generate-minds-figurines
description: Use when generating a NEW one-click Mind image that doesn't already exist in this skill's assets/ folder — either a transparent full-body PNG cutout (880x960) or a collector toy card (800x994). Asks which type the user wants, interviews them for the Mind's outfit (and, for a card, the 4 accessory items) or proposes them for approval, then generates an image matching the shipped Minds art direction. Requires the image-gen skill for the generation step and supplies the reference images, prompt structure, and dimension/format constraints; do not use image-gen on its own for a Mind figurine. Triggers include "generate a Minds figurine for [name]", "generate a one-click Mind image for [name]", "make a toy card for [Mind]", "make a transparent PNG of the [Mind] Mind", "we need a Mind cutout / collector card that doesn't exist yet".
---

# Generate Minds figurines

Produces a new one-click Mind image in the current Minds art direction: a 3D Mind
with a big glossy blue round head, a cluster of ball-tipped antennae fanning out
from the back of the head, glossy blue hands, a small body, and a costume that says
the job. Two output types:

| Type | What it is | Size |
|---|---|---|
| **Transparent PNG** | Full-body cutout of the Mind standing in its job costume, holding its props, on a transparent background. | 880×960, RGBA |
| **Toy card** | The same Mind packaged as a collector toy: blue card, blister, 4 accessory pockets. | 800×994, RGBA (transparent only outside the rounded corners) |

`SKILL_DIR` below means the folder this `SKILL.md` is in — `.claude/skills/generate-minds-figurines/`
inside the design harness. Resolve it to an absolute path before running anything.

| Path | What's in it |
|---|---|
| `assets/transparent/mind-<id>.webp` | The shipped transparent cutouts, one per specialist Mind. |
| `assets/transparent/master-mind.webp` | Master Mind (olive beanie, orange vest, walkie-talkie). |
| `assets/toy-card/card-<id>.webp` | The shipped collector cards, one per specialist Mind. |

Shipped Mind ids (both folders): `bizz`, `chief-of-staff`, `content`, `decision`,
`email-manager`, `fitness-coach`, `follow-up`, `football`, `game-designer`,
`general-assistant`, `gtm`, `learning-coach`, `personal-chef`, `product-builder`,
`recruiter`, `research`, `sales`, `scrum-master`, `superior-trader`.

The old look — flat Abby, hand stickers, beige blister packs, a faceless blue
sphere — is retired. Never use it as a reference or produce it.

## When to use

Only when the user asks for a new image. Claude never generates one on its own —
if a page needs a Mind that has no image, stop and ask.

Check `SKILL_DIR/assets/transparent/` and `SKILL_DIR/assets/toy-card/` first. If the Mind
already has the requested type, reuse the existing file; do not regenerate it.

## Prerequisites

1. **The `image-gen` skill** — it runs the actual generation (Codex or Grok CLI).
   Check it's installed:

   ```bash
   ls ~/.claude/skills/image-gen/SKILL.md .claude/skills/image-gen/SKILL.md 2>/dev/null
   ```

   If neither path exists, **stop** and tell the user to install it, then start a new
   Claude Code session:

   ```bash
   git clone https://github.com/derek98765/image-gen /tmp/image-gen \
     && cp -r /tmp/image-gen/skills/image-gen ~/.claude/skills/
   ```

   Repo: https://github.com/derek98765/image-gen. Don't call `codex` or `grok`
   directly as a workaround.
2. **Python package `Pillow`** for the checks: `python3 -c "import PIL"`; if that
   fails, `pip3 install pillow`.

No post-processing script: these images only need dimension and transparency
checks, not color snapping (unlike `generate-minds-icons`).

## Step 0 — Pick the output type

If the user said which they want ("transparent PNG", "cutout", "toy card",
"collector card", "both"), use that. Otherwise ask: **transparent PNG, toy card, or
both?** Don't guess.

**Both** → do the PNG first, get the user's approval on it, then use the approved
PNG as an extra reference for the card so the Mind is identical in the two images.

## Step 1 — Gather the Mind's outfit (and, for a card, its 4 items)

Two paths, depending on what the user gives you:

**They already describe the look explicitly** — an outfit (clothing, colors, props
the Mind holds or wears), plus the 4 accessory items if it's a card. Skip straight
to Step 2 with what they gave you.

**They don't have that level of detail yet** — ask for enough about the Mind to work
from: what job it does, who uses it, and any concrete details about how it works (2-3
sentences is enough — don't demand more than that). Then propose:
- **The outfit** — what the Mind wears and holds, matching its job the way the shipped
  set does (`personal-chef` → chef's hat, white chef's jacket, green apron, wooden
  spoon and a pan with a fried egg; `recruiter` → navy suit, tie, lanyard badge,
  clipboard and phone; `content` → streetwear jacket, selfie stick, lightbulb). One or
  two signature props in the Mind's hands, plus clothing that reads instantly as the
  job.
- **Card only: the 4 accessory items** for the side pockets — each a small object or
  UI snippet that shows one thing the Mind actually does (the recruiter card has a
  laptop screen, a diploma, a resume, a "We're hiring" sign). Four distinct
  capabilities or moments, not four variations on the same idea.

Present the proposal and **wait for explicit approval before generating anything**.
If they want changes, revise and re-confirm — don't generate on a guess.

## Step 2 — Pick a reference

Pick the closest matching Mind id to the new Mind's job category (or the closest
analog if nothing matches closely) and use its file from the folder for the chosen
type — `assets/transparent/mind-<id>.webp` for a PNG, `assets/toy-card/card-<id>.webp` for a
card. This keeps proportions, lighting, the head and face, and (for a card) the
layout consistent with the shipped set.

## Step 3 — Generate with image-gen

Work in a scratch directory, not the project. Load the `image-gen` skill and follow
it — it picks the CLI (Codex by default), runs it, and recovers the file. Give it
the reference image (absolute path), the output name, and the prompt below.

### Transparent PNG

- **Reference image:** `SKILL_DIR/assets/transparent/mind-<closest-match>.webp`
- **Output:** `mind-raw.png`
- **Prompt:**

  ```text
  Take the attached 3D Mind character cutout and make a new one for a different
  one-click Mind, in exactly the same style, proportions, lighting, render
  quality and framing: a full-body figure standing front-facing in a relaxed idle
  pose, centered, feet near the bottom edge. Keep the Mind exactly as in the
  reference — big glossy blue round head that is most of the figure, the cluster
  of ball-tipped blue antennae fanning out from the back of the head, glossy blue
  hands, and the face (two big round white eyes with black pupils set close
  together high on the head, small round "o" mouth). Change only the outfit and
  the held props. No text, no logo, no ground shadow, no floor.

  Outfit and props: <OUTFIT DESCRIPTION — approved in Step 1>.

  Output must be exactly 880x960px PNG with a fully transparent background (real
  alpha, not white, not a solid color, not a checkerboard) — only the figure is
  opaque.
  ```

### Toy card

- **Reference image:** `SKILL_DIR/assets/toy-card/card-<closest-match>.webp`
- **Output:** `mind-card-raw.png`
- **Prompt:**

  ```text
  Take the attached collector-toy card and make a new one for a different
  one-click Mind, in exactly the same style, proportions, and packaging: deep
  blue card with rounded corners, white hang tab at top center, "COLLECTOR
  SERIES" top left, "LIMITED EDITION" top right, an empty orange speech bubble
  top right, a cream blister tray holding the Mind on the left, 4 clear
  accessory pockets down the right side, the white Minds logo bottom left, and
  a barcode bottom right. Keep the Mind exactly as in the reference — glossy
  blue round head, the antennae, glossy blue hands, and the face (big round
  white eyes with black pupils, small round "o" mouth). Change only the outfit,
  the held props, and the contents of the 4 side pockets. No Mind name or other
  new text on the card.

  Outfit: <OUTFIT DESCRIPTION — approved in Step 1>.

  4 side-pocket items, top to bottom: 1) <ITEM 1>. 2) <ITEM 2>. 3) <ITEM 3>.
  4) <ITEM 4>.

  Output must be exactly 800x994px, transparent only outside the rounded card
  corners, matching the reference canvas exactly — no added border, no drop
  shadow outside the card, no watermark.
  ```

For **both**, pass the approved PNG as a second reference image and add "The Mind in
the blister must be the character from the second attached image, unchanged" to the
card prompt.

Key constraints, and why each is in the prompt:
- **Exact size** (880×960 PNG, 800×994 card) — every shipped file of that type is
  exactly this size. Neither CLI hits a custom pixel size on its own (Grok only
  takes an aspect ratio), so verify
  (`python3 -c "from PIL import Image; print(Image.open('<file>').size)"`) and
  correct it — re-run with a size correction, or resize/pad only if the aspect ratio
  already matches (`sips -z H W <file>`).
- **Transparency** — all shipped files are RGBA. Check with
  `Image.open('<file>').split()[-1].getextrema()`; it should be `(0, 255)` and the
  top-left pixel should be transparent. For a PNG, the whole background must be
  transparent (no white halo or solid fill around the figure); for a card, only the
  area outside the rounded corners is.
- **Reference image** — always pass one. Describing the Mind or the card in
  words alone produces a character and packaging that drift from the shipped set.

## Step 4 — Verify and report

1. Confirm the dimensions and transparency (Step 3 checks above).
2. Look at the generated image:
   - Does the Mind's head, antennae and face match the reference unchanged — two big
     round eyes and a small "o" mouth, not a blank sphere?
   - Do the outfit (and, for a card, the 4 items) match what was approved in Step 1?
   - **PNG:** a single full-body figure, nothing else — no floor, shadow, text or
     background.
   - **Card:** is the layout (hang tab, both labels, orange speech bubble, 4 pockets,
     Minds logo, barcode) intact, with no name on it?
3. If anything is off, regenerate with a corrected prompt rather than shipping it —
   this is a produced-asset art direction, not a rough placeholder.
4. Save into the consuming project's images folder (ask if it isn't obvious) as
   `mind-<id>.png` / `card-<id>.png` — not into `SKILL_DIR/assets/`, which is the
   fixed brand library — and report the path, which Mind it represents, and which
   CLI made it. Only add
   it to the library if the user explicitly asks.

## Common mistakes

- Generating without `image-gen` installed, or calling `codex`/`grok` directly —
  point the user to the repo instead.
- Picking the output type yourself when the user didn't say — ask.
- Generating without getting explicit approval on the outfit/items first.
- Using a card as the reference for a PNG (or vice versa) — the packaging leaks into
  the cutout, or the card loses its layout. Use the folder that matches the type.
- Skipping the reference image, or picking one from an unrelated job category when a
  closer match exists.
- Not verifying the output dimensions — both CLIs default to their own native sizes
  (often 1024² or similar).
- A Mind with no face, or a changed face. Every shipped Mind has the same eyes and
  small "o" mouth; only the outfit and props change.
- Putting the Mind's name on a card. None of the 19 shipped cards has it. The only
  text is "COLLECTOR SERIES", "LIMITED EDITION", and the Minds logo; the orange speech
  bubble is empty. The name goes in HTML.
