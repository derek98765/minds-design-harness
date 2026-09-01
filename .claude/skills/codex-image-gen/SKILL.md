---
name: codex-image-gen
description: Use when the user wants to generate or edit an image via OpenAI / ChatGPT / Codex (gpt-image-2). Triggers include "generate an image with codex/chatgpt/gpt", "用 codex/chatgpt 出圖", "make an icon/banner/illustration via codex". Not for Gemini Gems (use gemini-gem-image) or other providers (wavespeed-ai, poe-api).
---

# Codex (ChatGPT) Image Generation

## When to use

Only when the user wants OpenAI's `gpt-image-2` (the model behind ChatGPT image generation) via the Codex CLI's built-in `$imagegen` skill. For Gemini Gems use `gemini-gem-image`. For other providers prefer `wavespeed-ai` or `poe-api`.

## Prerequisites

- `codex` CLI installed (`which codex`; needs ≥ v0.115 for built-in image gen)
- Signed in once via `codex login`, or `OPENAI_API_KEY` set for API-priced batches
- Built-in image generation is enabled by default; no extra config needed

### Installing codex if it's missing

Run `which codex` first. If it's not found:

1. Check for npm: `which npm`. If missing, install Node.js (which bundles npm) —
   `brew install node` on macOS, or point the user to https://nodejs.org. Do not
   proceed to step 2 until `npm --version` works.
2. Install the Codex CLI globally: `npm install -g @openai/codex`.
3. Sign in once: `codex login` (or export `OPENAI_API_KEY` for API-priced batches).

If any of these steps needs elevated permissions or the user hasn't approved a global
npm install, stop and ask rather than silently skipping image generation or falling
back to a placeholder.

## How to invoke

```bash
codex exec --skip-git-repo-check -s workspace-write \
  'Generate an image: <DESCRIBE>. Save it as <OUTPUT.png> in the current directory.'
```

Key flags:

- `-s workspace-write` — **required** so codex can write the saved file into cwd (default sandbox is read-only and the copy step silently fails)
- `--skip-git-repo-check` — only if cwd is not a git repo
- `-i <FILE>` (repeatable) — attach reference image(s) for edit/inpaint flows

Codex always also saves the raw source under `~/.codex/generated_images/<session-id>/ig_*.png`, so even if the cwd write is blocked you can recover the file from there.

## Editing an existing image

```bash
codex exec -s workspace-write -i input.png \
  'Modify the attached image to <CHANGE>. Save as edited.png in the cwd.'
```

## API-priced batches

For many images, export `OPENAI_API_KEY` first — codex routes generation through the Images API at standard API pricing instead of consuming Codex usage limits.

```bash
export OPENAI_API_KEY=sk-...
codex exec -s workspace-write '$imagegen — 20 product thumbnails, white bg, ...'
```

## Quick reference

| Task                | Command sketch |
|---------------------|----------------|
| Generate            | `codex exec -s workspace-write 'gen <prompt>, save as out.png'` |
| Edit existing       | `codex exec -s workspace-write -i ref.png '<edit prompt>'` |
| Multiple references | `codex exec -s workspace-write -i a.png -i b.png '<prompt>'` |
| Force API pricing   | `OPENAI_API_KEY=sk-... codex exec ...` |
| Find recent output  | `find ~/.codex/generated_images -type f -mmin -5` |

## Common mistakes

- **Forgot `-s workspace-write`** → codex generates fine, but the inner `cp`/`sips` fails with `Operation not permitted` and the cwd ends up empty. The png still exists under `~/.codex/generated_images/<session-id>/`. Either re-run with the flag, or `cp` from there.
- **Asked for non-standard dimensions in the prompt** → gpt-image-2 returns its native sizes (often 1024² or 1254²). Resize after with `sips -z H W out.png`.
- **Used `--dangerously-bypass-approvals-and-sandbox` instead of `-s workspace-write`** → works but overbroad. Prefer `-s workspace-write`.
- **Forgot to verify the file** → after the command, run `ls -la <OUTPUT.png>` (or `find ~/.codex/generated_images -type f -mmin -5`) before reporting success.

## Troubleshooting

- `codex: command not found` → install/upgrade the Codex CLI.
- Says it ran but no file → run `codex login`, confirm CLI ≥ v0.115; check `~/.codex/generated_images/` for the raw output.
- Want richer prompt presets → install the community gallery skill (`$gpt-image`): see https://github.com/wuyoscar/gpt_image_2_skill (copies a skill folder into `~/.codex/skills/`).
