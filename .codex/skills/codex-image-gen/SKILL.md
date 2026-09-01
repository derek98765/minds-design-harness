---
name: codex-image-gen
description: Generate or edit bitmap images with Codex's native OpenAI image-generation capability when the user asks for an image, icon, banner, illustration, or image edit through Codex or ChatGPT. Do not use for repo-native SVG, HTML/CSS, canvas, or established vector assets.
---

# Codex image generation

Use Codex's native `imagegen` capability directly. Do not launch a nested `codex exec`
process or require an API key for ordinary generation.

## Workflow

1. Decide whether the output should be a bitmap. Edit the source for existing SVG,
   vector, or code-native assets.
2. For edits, inspect every target image first. Include all target images as references;
   ask the user to reattach any unavailable image.
3. State the subject, composition, style, lighting, palette, aspect ratio, background,
   and material exclusions in the generation prompt.
4. Generate without reconfirming when the request is clear.
5. Return the generated preview and output hint. When adding it to the project, save it
   at the requested path or a clear asset path and verify that the file exists.

## Minds-specific work

Before generating campaign or landing-page imagery, read:

- [../../../design-harness/spec/DESIGN.md](../../../design-harness/spec/DESIGN.md)
- [../../../design-harness/spec/brand-imagery.md](../../../design-harness/spec/brand-imagery.md)
- [../../../design-harness/spec/brand-mascot.md](../../../design-harness/spec/brand-mascot.md) when Abby or hand
  stickers are involved

Use supplied brand assets as references when fidelity matters. Do not recreate the
Minds logo as raster artwork when an approved logo asset exists.

## Quality checks

- Inspect legibility, anatomy, edges, cropping, unwanted text, and brand fit.
- Do not claim an exact custom pixel size unless the saved output was verified at that
  size; resize afterward when exact dimensions are required.
- Prefer transparent backgrounds for reusable cutouts and opaque backgrounds for
  finished compositions unless the user specifies otherwise.
- For variants, preserve requested constants and change only the named dimensions.
