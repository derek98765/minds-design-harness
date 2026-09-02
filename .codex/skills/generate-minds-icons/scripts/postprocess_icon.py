#!/usr/bin/env python3
"""Convert a generated image into a brand-compliant Minds icon PNG.

Usage:
    python3 postprocess_icon.py <input.png> <output.png>
"""
import argparse

from PIL import Image

CANVAS = 240
INDIGO = (85, 104, 167)
ORANGE = (252, 143, 30)
PALETTE = [INDIGO, ORANGE]
ALPHA_THRESHOLD = 32


def nearest_palette_color(rgb):
    def distance(a, b):
        return sum((x - y) ** 2 for x, y in zip(a, b))

    return min(PALETTE, key=lambda color: distance(rgb, color))


def quantize_to_palette(image: Image.Image) -> Image.Image:
    """Map visible pixels to the approved palette and preserve transparency."""
    image = image.convert("RGBA")
    source_pixels = image.load()
    width, height = image.size
    output = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    output_pixels = output.load()
    cache = {}

    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = source_pixels[x, y]
            if alpha < ALPHA_THRESHOLD:
                continue
            rgb = (red, green, blue)
            if rgb not in cache:
                cache[rgb] = nearest_palette_color(rgb)
            new_red, new_green, new_blue = cache[rgb]
            output_pixels[x, y] = (new_red, new_green, new_blue, 255)

    return output


def resize_to_canvas(image: Image.Image, size: int = CANVAS) -> Image.Image:
    """Fit artwork onto a square transparent canvas without distortion."""
    image = image.copy()
    image.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - image.width) // 2, (size - image.height) // 2)
    canvas.paste(image, offset, image)
    return canvas


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_png")
    parser.add_argument("output_png")
    args = parser.parse_args()

    image = Image.open(args.input_png).convert("RGBA")
    image = resize_to_canvas(image)
    # Resampling creates blended edge colors, so palette snapping must be last.
    image = quantize_to_palette(image)
    image.save(args.output_png)
    print(f"Wrote {args.output_png}")


if __name__ == "__main__":
    main()
