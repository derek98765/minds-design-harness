#!/usr/bin/env python3
"""Validate a generated Minds icon's size, alpha channel, and palette.

Usage:
    python3 validate_icon.py <icon.png>
"""
import sys

from PIL import Image

EXPECTED_SIZE = 240
MIN_OPAQUE_FRACTION = 0.02
MAX_OPAQUE_FRACTION = 0.85
ALPHA_THRESHOLD = 32
INDIGO = (85, 104, 167)
ORANGE = (252, 143, 30)
PALETTE_TOLERANCE = 10


def closest_palette_distance(rgb, palette):
    return min(sum((a - b) ** 2 for a, b in zip(rgb, color)) for color in palette)


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: validate_icon.py <icon.png>")

    image = Image.open(sys.argv[1])
    errors = []

    if image.mode != "RGBA":
        errors.append(
            f"image mode is {image.mode}, expected RGBA (needs an alpha channel)"
        )
        image = image.convert("RGBA")

    width, height = image.size
    if width != EXPECTED_SIZE or height != EXPECTED_SIZE:
        errors.append(
            f"canvas is {width}x{height}, expected {EXPECTED_SIZE}x{EXPECTED_SIZE}"
        )

    pixels = list(image.getdata())
    visible = [(r, g, b) for r, g, b, alpha in pixels if alpha >= ALPHA_THRESHOLD]

    if not visible:
        errors.append("no opaque pixels found; icon may be blank or fully transparent")
    else:
        opaque_fraction = len(visible) / len(pixels)
        if opaque_fraction < MIN_OPAQUE_FRACTION:
            errors.append(
                f"only {opaque_fraction:.1%} of the canvas is opaque; icon may be blank"
            )
        elif opaque_fraction > MAX_OPAQUE_FRACTION:
            errors.append(
                f"{opaque_fraction:.1%} of the canvas is opaque; background may not be transparent"
            )

        off_palette = [
            rgb
            for rgb in set(visible)
            if closest_palette_distance(rgb, [INDIGO, ORANGE])
            > PALETTE_TOLERANCE**2
        ]
        if off_palette:
            errors.append(
                f"found {len(off_palette)} off-palette color(s), for example "
                f"{off_palette[0]}; expected only Minds indigo and orange"
            )

    if errors:
        print("FAIL")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)

    print("PASS")


if __name__ == "__main__":
    main()
