#!/usr/bin/env python3
"""Guitar Home Screen icon for the /music/ app.

Same style as the meals app icon (flat dark silhouette on solid amber
#e8b04b): a simple acoustic guitar, drawn with PIL, rotated diagonally.
Regenerate with: python3 music/assets/make_icon.py
Outputs: icon-512.png, icon-192.png, apple-touch-icon.png (180), favicon.png (32)
"""
from PIL import Image, ImageDraw

AMBER = (232, 176, 75)      # #e8b04b — matches the site accent + meals icon
DARK = (11, 11, 14)         # #0b0b0e — matches the meals icon / theme-color
OUT = "music/assets"

S = 4  # supersample factor; draw at 2048, downscale to 512


def draw_guitar():
    """Draw a vertical acoustic guitar on a transparent layer, return it."""
    W = 512 * S
    layer = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = W // 2

    # Headstock (slightly tapered) and neck
    d.polygon([(cx - 34 * S, 60 * S), (cx + 34 * S, 60 * S),
               (cx + 42 * S, 170 * S), (cx - 42 * S, 170 * S)], fill=DARK)
    d.rectangle([cx - 24 * S, 160 * S, cx + 24 * S, 560 * S], fill=DARK)
    # Frets — thin amber lines across the neck
    for y in (205, 250, 295, 340, 385, 430, 475):
        d.rectangle([cx - 24 * S, y * S, cx + 24 * S, (y + 4) * S], fill=AMBER)

    # Body: narrower upper bout + wide lower bout (overlapping ellipses = waist pinch)
    d.ellipse([cx - 100 * S, 400 * S, cx + 100 * S, 600 * S], fill=DARK)
    d.ellipse([cx - 170 * S, 560 * S, cx + 170 * S, 890 * S], fill=DARK)
    # Sound hole + bridge, in amber so they read on the dark body
    d.ellipse([cx - 58 * S, 588 * S, cx + 58 * S, 704 * S], fill=AMBER)
    d.rectangle([cx - 72 * S, 786 * S, cx + 72 * S, 798 * S], fill=AMBER)
    return layer


def main():
    W = 512 * S
    base = Image.new("RGB", (W, W), AMBER)
    guitar = draw_guitar().rotate(-38, resample=Image.BICUBIC, expand=True)
    # Scale the rotated guitar to fit inside the frame with padding.
    fit = int(W * 0.97)
    f = fit / max(guitar.size)
    guitar = guitar.resize((int(guitar.width * f), int(guitar.height * f)), Image.LANCZOS)
    base.paste(guitar, ((W - guitar.width) // 2, (W - guitar.height) // 2), guitar)
    icon512 = base.resize((512, 512), Image.LANCZOS)
    icon512.save(f"{OUT}/icon-512.png")
    icon512.resize((192, 192), Image.LANCZOS).save(f"{OUT}/icon-192.png")
    icon512.resize((180, 180), Image.LANCZOS).save(f"{OUT}/apple-touch-icon.png")
    icon512.resize((32, 32), Image.LANCZOS).save(f"{OUT}/favicon.png")
    print("wrote icon-512, icon-192, apple-touch-icon (180), favicon (32)")


if __name__ == "__main__":
    main()
