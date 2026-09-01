#!/usr/bin/env python3
"""Turn a raw codex-image-gen PNG into a brand-compliant Minds icon PNG.

Pipeline: load -> quantize opaque pixels to {indigo, orange} while preserving
transparency -> resize/pad to 240x240 on a transparent canvas.

Usage:
    python3 postprocess_icon.py <input.png> <output.png>
"""
import argparse

from PIL import Image

CANVAS = 240

INDIGO = (85, 104, 167)      # #5568A7 — assets/icons brand indigo
ORANGE = (252, 143, 30)      # #FC8F1E — assets/icons brand orange

PALETTE = [INDIGO, ORANGE]

ALPHA_THRESHOLD = 32  # below this, a pixel is treated as background and stays transparent


def nearest_palette_color(rgb):
    def dist(a, b):
        return sum((x - y) ** 2 for x, y in zip(a, b))

    return min(PALETTE, key=lambda c: dist(rgb, c))


def quantize_to_palette(img: Image.Image) -> Image.Image:
    """Map every non-transparent pixel to the nearest of {indigo, orange};
    leave transparent pixels untouched."""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out_px = out.load()
    cache = {}
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < ALPHA_THRESHOLD:
                continue
            rgb = (r, g, b)
            if rgb not in cache:
                cache[rgb] = nearest_palette_color(rgb)
            nr, ng, nb = cache[rgb]
            out_px[x, y] = (nr, ng, nb, 255)
    return out


def resize_to_canvas(img: Image.Image, size: int = CANVAS) -> Image.Image:
    """Fit the artwork into a size x size transparent canvas without distortion."""
    img = img.copy()
    img.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - img.width) // 2, (size - img.height) // 2)
    canvas.paste(img, offset, img)
    return canvas


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_png")
    parser.add_argument("output_png")
    args = parser.parse_args()

    img = Image.open(args.input_png)
    img = quantize_to_palette(img)
    img = resize_to_canvas(img, CANVAS)
    img.save(args.output_png)

    print(f"Wrote {args.output_png}")


if __name__ == "__main__":
    main()
