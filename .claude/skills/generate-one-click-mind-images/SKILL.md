---
name: generate-one-click-mind-images
description: Use when generating a NEW one-click Mind toy-card image that doesn't already exist in assets/minds-mascot/toy-card/. Interviews the user for the Mind's outfit and 4 accessory items (or proposes them for approval if the user hasn't specified), then generates an 800x994px PNG matching the shipped collector-card art direction. Do not use codex-image-gen directly for this; this skill supplies the reference image, prompt structure, and dimension/format constraints codex-image-gen needs. Triggers include "generate a one-click Mind image for [name]", "make a toy card for [Mind]", "we need a collector card for a Mind that isn't in toy-card".
---

# Generate one-click Mind images

Produces a new collector card in the shipped one-click Mind style (see
[../../../design-harness/spec/brand-mascot.md](../../../design-harness/spec/brand-mascot.md)): the Mind dressed and posed for its
job, packaged as a collector toy. Wraps `codex-image-gen`: this skill supplies the
reference image and the constraints codex-image-gen can't guarantee on its own
(exact canvas size, transparent corners, keeping the Mind's face and body unchanged).

## When to use

Only when the user asks for a new card. Claude never generates one on its own —
if a page needs a Mind that has no card, stop and ask.

Check `assets/minds-mascot/toy-card/` and `assets/README.md` first (19 named Minds).
If the Mind is in the list, reuse the existing file; do not regenerate it.

## Prerequisites

`codex` CLI — see the `codex-image-gen` skill's Prerequisites for the install check
(`npm install -g @openai/codex`). No other dependencies; this skill does not
post-process the output (unlike `generate-minds-icons`) because a card only needs
dimension and transparency checks, not color snapping.

## Step 1 — Gather the Mind's outfit and 4 items

Ask the user to describe the new Mind. Two paths, depending on what they give you:

**They already describe the look explicitly** — an outfit (clothing, colors, props
the Mind holds or wears) and the 4 accessory items for the side pockets. Skip straight
to Step 2 with what they gave you.

**They don't have that level of detail yet** — ask for enough about the Mind to work
from: what job it does, who uses it, and any concrete details about how it works (2-3
sentences is enough — don't demand more than that). Then, from that description,
propose:
- **The outfit** — what the Mind wears and holds, matching its job the way the shipped
  set does (`card-personal-chef.webp` → chef's hat, apron, spoon and pan;
  `card-recruiter.webp` → suit, tie, lanyard, clipboard and phone; `card-content.webp` →
  streetwear jacket, selfie stick, lightbulb). One or two signature props in the
  Mind's hands, plus clothing that reads instantly as the job.
- **The 4 accessory items** for the side pockets — each a small object or UI snippet
  that shows one thing the Mind actually does (see the shipped examples: a laptop
  screen, a resume, a diploma, a "We're hiring" sign). Four distinct capabilities or
  moments, not four variations on the same idea.

Present the proposed outfit and 4 items back to the user and **wait for explicit
approval before generating anything**. If they want changes, revise and re-confirm —
don't generate on a guess.

## Step 2 — Pick a reference

Pick the closest matching file in `assets/minds-mascot/toy-card/` to the new Mind's job
category (or the closest analog if nothing matches closely) — this keeps proportions,
lighting, card layout, and the Mind's head and face consistent with the shipped set.
See `assets/README.md` for the full list of Mind ids.

## Step 3 — Generate via codex-image-gen

```bash
codex exec --skip-git-repo-check -s workspace-write \
  -i design-harness/assets/minds-mascot/toy-card/<closest-match>.webp \
  'Take the attached collector-toy card and make a new one for a different
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
   Save it as <scratch>/mind-card-raw.png in the current directory.'
```

Key constraints, and why each is in the prompt:
- **800×994px** — every shipped card is exactly this size; verify after
  generation (`python3 -c "from PIL import Image; print(Image.open('<file>').size)"`)
  and re-run with a size correction if it drifts, since gpt-image-2 returns its own
  native sizes by default.
- **Transparent corners** — the shipped files are RGBA. The card itself is fully
  opaque; only the area outside its rounded corners is transparent. Verify with
  `Image.open('<file>').split()[-1].getextrema()` — it should be `(0, 255)`, and the
  top-left pixel should be transparent.
- **Reference image via `-i`** — always pass one. Describing the card in words alone
  produces packaging and a Mind that drift from the shipped set.

## Step 4 — Verify and report

1. Confirm dimensions are exactly 800×994px and the corners are transparent (Step 3
   checks above).
2. Look at the generated image: does the Mind's head, antennae and face match the
   reference unchanged — two big round eyes and a mouth, not a blank sphere? Do the
   outfit and the 4 items match what was approved in Step 1? Is the card layout
   (hang tab, both labels, orange speech bubble, 4 pockets, Minds logo, barcode) intact?
3. If anything is off, regenerate with a corrected prompt rather than shipping it —
   this is a produced-asset art direction, not a rough placeholder.
4. Save into the consuming project's `src/images/` (not into
   `design-harness/assets/minds-mascot/toy-card/`, which is the fixed brand library) and
   report the path and what Mind it represents.

## Common mistakes

- Generating without getting explicit approval on the outfit/items first — the user
  asked to review and approve the proposal before any image is generated when they
  haven't given full detail themselves.
- Skipping the reference image, or picking a reference from an unrelated job category
  when a closer match exists.
- Not verifying the output dimensions — gpt-image-2 defaults to its own native sizes
  (often 1024² or similar) unless explicitly corrected after the fact.
- A Mind with no face, or a changed face. Every shipped card has the same eyes and
  small "o" mouth; only the outfit and props change.
- Putting the Mind's name on the card. None of the 19 shipped cards has it. The only
  text is "COLLECTOR SERIES", "LIMITED EDITION", and the Minds logo; the orange speech
  bubble is empty. The name goes in HTML.
