---
name: generate-minds-icons
description: Generate a new Minds persona icon when no suitable approved icon exists in design-harness/assets/icons. Produces a 240x240 transparent PNG restricted to the Minds indigo and orange palette. Use for requests such as "generate an icon for this Mind" or "make a new Mind icon"; do not use for existing icons or general illustrations.
---

# Generate Minds icons

Create a new Minds persona icon with native Codex image generation, then run the
included deterministic post-processing and validation scripts. Never ship the raw
generated image as the icon.

## Before generating

1. Read [brand-iconography.md](../../../design-harness/spec/brand-iconography.md).
2. Check `design-harness/assets/icons/` and `design-harness/assets/README.md`. Reuse
   an approved icon when one already represents the persona.
3. Choose the closest approved icon by subject or category as the visual reference.
4. Verify Pillow is available with `python3 -c "import PIL"`. If it is missing,
   ask before installing it because installation changes the user's environment.

## Generate the raw icon

Inspect the chosen reference image, then call the native image-generation tool with
that local file in `referenced_image_paths`. Do not launch a nested `codex exec`
process. Ask for:

- one centered, flat icon representing the requested Mind or concept;
- the same silhouette weight and illustrated style as the reference;
- an indigo (`#5568A7`) base with one orange (`#FC8F1E`) accent that identifies a
  meaningful detail;
- true alpha transparency outside the artwork;
- no background fill, gradient, shading, outline, text, or drop shadow;
- generous clear space around the icon.

Use the generated image's local output path as the raw input. If the tool does not
provide a usable local file, report that limitation instead of inventing a path.

## Post-process and validate

Run both commands from the repository root, using absolute or repository-relative
paths that identify the actual generated file and intended scratch output:

```bash
python3 .codex/skills/generate-minds-icons/scripts/postprocess_icon.py \
  <scratch>/icon-raw.png <scratch>/icon.png
python3 .codex/skills/generate-minds-icons/scripts/validate_icon.py \
  <scratch>/icon.png
```

The post-processor maps opaque pixels to the two approved colors, preserves
transparency, and fits the artwork onto a 240x240 transparent canvas.

- On `PASS`, inspect the processed image and save it in the consuming project's
  `src/images/`; do not add it to the fixed `design-harness/assets/icons/` library.
- On `FAIL`, use the validator's reasons to adjust the generation prompt and retry
  generation once. Run post-processing and validation again.
- If the second attempt still fails, stop and show the latest image and validator
  output to the user. Do not ship a failing icon.

When finished, report the final file path and the persona or concept it represents.

## Guardrails

- Always provide a shipped icon as a reference; prose alone does not preserve the
  set's visual weight reliably.
- A solid background must be regenerated. Color quantization is not background
  removal.
- Treat validator failures as blocking, even when the output looks close.
