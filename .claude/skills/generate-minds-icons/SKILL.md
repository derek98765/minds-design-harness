---
name: generate-minds-icons
description: Use when generating a NEW Minds Mind-persona icon that doesn't already exist in assets/icons/. Produces a brand-compliant 240x240px, dual-tone (indigo + orange), transparent-background PNG icon. Do not use codex-image-gen directly for icons; this skill wraps it with the required post-processing. Triggers include "generate an icon for [Mind]", "make a new Mind icon", "we need an icon for [persona] that isn't in assets/icons/".
---

# Generate Minds icons

Wraps `codex-image-gen` with the post-processing Minds icons require: forcing exactly
240×240px, a transparent background, and exactly two flat colors (`brand-blue-500` /
`#5568A7` and `brand-orange-500` / `#FC8F1E`). Raw `codex-image-gen` output cannot
guarantee any of this on its own — always run it through this pipeline for a Mind
icon, never place the raw PNG/WEBP on a page.

## When to use

Only after confirming the icon doesn't already exist — check `assets/icons/` and
`assets/README.md` first (30 named Mind-persona icons plus `app-icon-default.svg` /
`skill-icon-default.svg`). See [../../../design-harness/spec/brand-iconography.md](../../../design-harness/spec/brand-iconography.md)
for the full "check before drawing" order and the color rules this pipeline enforces.

## Prerequisites

- `codex` CLI — see the `codex-image-gen` skill's Prerequisites for the install check
  (`npm install -g @openai/codex`).
- Python package `Pillow`:

  ```bash
  python3 -c "import PIL" 2>&1
  ```

  If the import fails, install it: `pip3 install pillow`.

## Pipeline

1. **Pick a reference.** Find the closest existing file in `assets/icons/` (same or
   adjacent category to the new Mind) to use as the generation reference — this keeps
   the new icon's silhouette weight and style consistent with the shipped set.

2. **Generate the raw icon** via `codex-image-gen`, requesting a flat, dual-tone icon
   on a **transparent background**.

   ```bash
   codex exec --skip-git-repo-check -s workspace-write \
     -i design-harness/assets/icons/<closest-match>.webp \
     'Generate an icon: a single flat illustrated icon for "<Mind name / concept>",
      in the same illustrated dual-tone style as the attached reference — an indigo
      (#5568A7) base shape with one orange (#FC8F1E) accent picking out a single
      meaningful detail. Transparent background (PNG with alpha, no background at
      all — not white, not a solid color), no gradients, no shading, no outlines, no
      text, no drop shadow, centered with generous margin. Save it as
      <scratch>/icon-raw.png in the current directory.'
   ```

3. **Post-process to a compliant PNG:**

   ```bash
   python3 .claude/skills/generate-minds-icons/scripts/postprocess_icon.py \
     <scratch>/icon-raw.png <scratch>/icon.png
   ```

   This snaps every opaque pixel to the nearest of {`#5568A7`, `#FC8F1E`}, leaves
   transparent pixels untouched, and pads/resizes to exactly 240×240px on a
   transparent canvas.

4. **Validate:**

   ```bash
   python3 .claude/skills/generate-minds-icons/scripts/validate_icon.py <scratch>/icon.png
   ```

   - **PASS** → done. Move `icon.png` to its destination (the consuming project's
     `src/images/`, matching the convention in
     [brand-imagery.md](../../../design-harness/spec/brand-imagery.md) — not into
     `design-harness/assets/icons/`, which is the fixed library) and report the path.
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

- Using `codex-image-gen` directly and placing its raw PNG/WEBP on a page — skips
  every guarantee this skill exists to provide. Always run the full pipeline.
- Asking for a white or solid-color background in the generation prompt — the output
  needs real alpha transparency; a solid background must be regenerated, not composited
  away, since this pipeline has no background-removal step.
- Skipping the reference image (`-i`) — produces an icon that doesn't match the
  existing set's weight and style, the same problem `brand-imagery.md` calls out for
  Abby and toy-figurine generation.
- Treating a FAIL as a pass because "it looks close enough" — the validator exists so
  a subtly-off icon (three colors instead of two, an opaque background, wrong canvas
  size) doesn't ship.
