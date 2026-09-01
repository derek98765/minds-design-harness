#!/usr/bin/env python3
"""Check a generated Minds icon PNG against brand rules.

Exits 0 and prints "PASS" if the icon is usable, exits 1 and prints each
failure otherwise. Intended to gate a retry: run once, and if it fails,
regenerate with an adjusted prompt before trying again.

Usage:
    python3 validate_icon.py <icon.png>
"""
import sys

from PIL import Image

EXPECTED_SIZE = 240      # px, per brand-imagery.md
MAX_COLORS = 2           # indigo + orange
MIN_OPAQUE_FRACTION = 0.02   # icon must cover at least 2% of the canvas
MAX_OPAQUE_FRACTION = 0.85   # and not be a near-solid fill (background leaking in)
ALPHA_THRESHOLD = 32

INDIGO = (85, 104, 167)
ORANGE = (252, 143, 30)
PALETTE_TOLERANCE = 10  # allow minor rounding drift from resize/save


def fail(msg, errors):
    errors.append(msg)


def closest_palette_distance(rgb, palette):
    return min(sum((a - b) ** 2 for a, b in zip(rgb, p)) for p in palette)


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: validate_icon.py <icon.png>")

    path = sys.argv[1]
    img = Image.open(path)

    errors = []

    if img.mode != "RGBA":
        fail(f"image mode is {img.mode}, expected RGBA (needs an alpha channel)", errors)
        img = img.convert("RGBA")

    w, h = img.size
    if w != EXPECTED_SIZE or h != EXPECTED_SIZE:
        fail(f"canvas is {w}x{h}, expected {EXPECTED_SIZE}x{EXPECTED_SIZE}", errors)

    px = list(img.getdata())
    total = len(px)
    opaque = [(r, g, b) for r, g, b, a in px if a >= ALPHA_THRESHOLD]

    if not opaque:
        fail("no opaque pixels found — icon may be blank or fully transparent", errors)
    else:
        opaque_fraction = len(opaque) / total
        if opaque_fraction < MIN_OPAQUE_FRACTION:
            fail(f"only {opaque_fraction:.1%} of the canvas is opaque — icon may be blank", errors)
        elif opaque_fraction > MAX_OPAQUE_FRACTION:
            fail(f"{opaque_fraction:.1%} of the canvas is opaque — background may not be transparent", errors)

        off_palette = [
            rgb for rgb in set(opaque)
            if closest_palette_distance(rgb, [INDIGO, ORANGE]) > PALETTE_TOLERANCE ** 2
        ]
        if off_palette:
            fail(
                f"found {len(off_palette)} distinct color(s) not matching indigo/orange "
                f"(e.g. {off_palette[0]}) — expected at most {MAX_COLORS} brand colors",
                errors,
            )

    if errors:
        print("FAIL")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)

    print("PASS")
    sys.exit(0)


if __name__ == "__main__":
    main()
