---
name: generate-minds-icons
description: Use when generating a NEW Minds Mind-persona icon that doesn't already exist in this skill's assets/icons/ folder. Produces a brand-compliant 240x240px, dual-tone (indigo + orange), transparent-background PNG icon. Requires the image-gen skill for the generation step and adds the required reference, post-processing and validation; do not use image-gen on its own for a Mind icon. Triggers include "generate an icon for [Mind]", "make a new Mind icon", "we need an icon for [persona] that doesn't exist yet".
---

# Generate Minds icons

Wraps the `image-gen` skill with the post-processing Minds icons require: forcing
exactly 240×240px, a transparent background, and exactly two flat colors
(`brand-blue-500` / `#5568A7` and `brand-orange-500` / `#FC8F1E`). Raw generated
output cannot guarantee any of this on its own — always run it through this
pipeline for a Mind icon, never place the raw PNG/WEBP on a page.

`SKILL_DIR` below means the folder this `SKILL.md` is in — `.claude/skills/generate-minds-icons/`
inside the design harness. Resolve it to an absolute path before running anything.

| Path | What's in it |
|---|---|
| `assets/icons/icon-<name>.webp` | The shipped library: 30 dual-tone Mind-persona icons (indigo base, orange on one detail). |
| `assets/icons/icon-app-default.svg` | Generic Mind icon, for a Mind with no icon of its own. |
| `assets/icons/icon-skill-default.svg` | Generic skill icon. |
| `scripts/postprocess_icon.py` | Snaps colors, keeps alpha, pads/resizes to 240×240. |
| `scripts/validate_icon.py` | Checks size, transparency and the two-color rule. |

## When to use

Only when the user asks for a new icon. Claude never generates one on its own — if
a page needs an icon that doesn't exist, stop and ask.

Only after confirming the icon doesn't already exist — list `SKILL_DIR/assets/icons/`
first. If the Mind already has an icon, reuse that file; do not draw a new one. If a
Mind simply has no icon and the user doesn't want a new one, use
`icon-app-default.svg`.

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
2. **Python package `Pillow`**: `python3 -c "import PIL"`; if that fails,
   `pip3 install pillow`.

## Pipeline

Work in a scratch directory, not the project.

1. **Pick a reference.** Find the closest existing file in `SKILL_DIR/assets/icons/`
   (same or adjacent category to the new Mind) to use as the generation reference —
   this keeps the new icon's silhouette weight and style consistent with the shipped
   set.

2. **Generate the raw icon with `image-gen`.** Load the `image-gen` skill and follow
   it — it picks the CLI (Codex by default), runs it, and recovers the file. Give it:
   - **Reference image:** `SKILL_DIR/assets/icons/<closest-match>.webp` (absolute path)
   - **Output:** `icon-raw.png` in the scratch directory
   - **Aspect ratio:** `1:1`
   - **Prompt:**

     ```text
     Generate an icon: a single flat illustrated icon for "<Mind name / concept>",
     in the same illustrated dual-tone style as the attached reference — an indigo
     (#5568A7) base shape with one orange (#FC8F1E) accent picking out a single
     meaningful detail. Transparent background (PNG with alpha, no background at
     all — not white, not a solid color), no gradients, no shading, no outlines, no
     text, no drop shadow, centered with generous margin.
     ```

3. **Post-process to a compliant PNG:**

   ```bash
   python3 "$SKILL_DIR/scripts/postprocess_icon.py" icon-raw.png icon.png
   ```

   This snaps every opaque pixel to the nearest of {`#5568A7`, `#FC8F1E`}, leaves
   transparent pixels untouched, and pads/resizes to exactly 240×240px on a
   transparent canvas.

4. **Validate:**

   ```bash
   python3 "$SKILL_DIR/scripts/validate_icon.py" icon.png
   ```

   - **PASS** → done. Move `icon.png` to the consuming project's images folder (ask
     if it isn't obvious) — not into `SKILL_DIR/assets/icons/`, which is the fixed
     brand library — and report the path and which CLI made it. Only add it to the
     library if the user explicitly asks.
   - **FAIL** → read the printed reasons and retry step 2 **once** with an adjusted
     prompt (e.g. "background may not be transparent" → the generation likely filled
     in a white or colored background, emphasize "PNG with true alpha transparency,
     confirm no background fill of any kind"; "colors not matching indigo/orange" →
     emphasize "exactly two flat colors, no gradients, no anti-aliasing, no shading";
     "icon may be blank" → the subject may have been too small or off-canvas,
     emphasize "centered, filling most of the frame"). Re-run steps 3–4.
   - **Still FAIL after the retry** → stop. Show the user `icon.png` and the
     validator's output, and ask how to proceed rather than shipping a broken icon.

## Common mistakes

- Generating without `image-gen` installed, or calling `codex`/`grok` directly —
  point the user to the repo instead.
- Placing the raw generated PNG/WEBP on a page — skips every guarantee this skill
  exists to provide. Always run the full pipeline.
- Asking for a white or solid-color background in the generation prompt — the output
  needs real alpha transparency; a solid background must be regenerated, not composited
  away, since this pipeline has no background-removal step.
- Skipping the reference image — produces an icon that doesn't match the existing
  set's weight and style.
- Treating a FAIL as a pass because "it looks close enough" — the validator exists so
  a subtly-off icon (three colors instead of two, an opaque background, wrong canvas
  size) doesn't ship.
