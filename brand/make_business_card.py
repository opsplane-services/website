#!/usr/bin/env python3
"""
Generate the OpsPlane Services business card as print-ready PDF.

Output (in this directory):
  opsplane-business-card.pdf            85x55mm trim + 3mm bleed, TrimBox/BleedBox set
  opsplane-business-card-cropmarks.pdf  the same with crop marks, for printers that ask

Two pages: page 1 is the front (dark), page 2 the back (light).

Run with the scratch venv that has reportlab, pypdf, pillow and fonttools:
    ./.venv/bin/python make_business_card.py
"""

import re
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import CMYKColor
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

HERE = Path(__file__).resolve().parent
FONTS = HERE / "fonts"
LOGO_SRC = HERE.parent / "public" / "logo-icon.png"

# --- geometry -------------------------------------------------------------
# European standard card. Bleed is the printer's margin for cutting drift;
# the trim box is where the blade actually lands.
TRIM_W, TRIM_H = 85 * mm, 55 * mm
BLEED = 3 * mm
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
SAFE = 6 * mm  # keep type this far inside the trim

# --- colour ---------------------------------------------------------------
# K-only black: on small type, four-plate rich black shows any misregistration
# as coloured fringing. Solid areas use a light rich black for depth.
K = CMYKColor(0, 0, 0, 1)
K55 = CMYKColor(0, 0, 0, 0.55)
K25 = CMYKColor(0, 0, 0, 0.25)
WHITE = CMYKColor(0, 0, 0, 0)
RICH_BLACK = CMYKColor(0.30, 0.20, 0.20, 1)

REGULAR, MEDIUM, SEMIBOLD = "Inter", "Inter-Medium", "Inter-SemiBold"

# --- content --------------------------------------------------------------
NAME = "Szabo Oliver Mihaly"
ROLE = "CEO"
COMPANY = "OpsPlane Services Ltd."
EMAIL = "opsplane@opsplane.eu"
WEBSITE = "opsplane.eu"
TAGLINE = "Cloud-native operations platform"


def x(mm_from_left: float) -> float:
    """Trim-relative x to page x."""
    return BLEED + mm_from_left * mm


def y(mm_from_bottom: float) -> float:
    """Trim-relative y to page y."""
    return BLEED + mm_from_bottom * mm


def register_fonts() -> None:
    for name, file in [
        (REGULAR, "Inter-Regular-static.ttf"),
        (MEDIUM, "Inter-Medium-static.ttf"),
        (SEMIBOLD, "Inter-SemiBold-static.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))


def white_logo() -> Path:
    """The mark reversed out, for the dark face. Alpha is preserved."""
    out = HERE / "logo-icon-white.png"
    src = Image.open(LOGO_SRC).convert("RGBA")
    r, g, b, a = src.split()
    inverted = Image.merge(
        "RGBA",
        (r.point(lambda v: 255 - v), g.point(lambda v: 255 - v), b.point(lambda v: 255 - v), a),
    )
    inverted.save(out)
    return out


def tracked(c: canvas.Canvas, text: str, font: str, size: float, tracking: float,
            baseline: float, cx: float | None = None, left: float | None = None) -> None:
    """Letterspaced text. Character spacing lives on the text object, not the canvas."""
    width = c.stringWidth(text, font, size) + tracking * (len(text) - 1)
    start = left if left is not None else cx - width / 2
    to = c.beginText(start, baseline)
    to.setFont(font, size)
    to.setCharSpace(tracking)
    to.textOut(text)
    c.drawText(to)


def draw_front(c: canvas.Canvas, logo_white: Path) -> None:
    # Claim the default font state before anything else, so reportlab does not
    # emit its built-in Helvetica into page resources — preflight flags that as
    # an unembedded font even when no glyph uses it.
    c.setFont(REGULAR, 8)

    # Bleed to the page edge, not the trim edge, so a drifting cut still lands on ink.
    c.setFillColor(RICH_BLACK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    size = 13 * mm
    c.drawImage(
        str(logo_white),
        x(42.5) - size / 2,
        y(27),
        width=size,
        height=size,
        mask="auto",
    )

    # Solid white throughout: a tint on a dark ground would need transparency,
    # which is one more thing for a RIP to get wrong. Size carries the hierarchy.
    c.setFillColor(WHITE)
    tracked(c, "OPSPLANE SERVICES", MEDIUM, 7.4, 1.5, y(21), cx=x(42.5))
    tracked(c, TAGLINE.upper(), REGULAR, 5.0, 0.7, y(16), cx=x(42.5))


def draw_back(c: canvas.Canvas) -> None:
    c.setFont(REGULAR, 8)
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    icon = 8.5 * mm
    c.drawImage(str(LOGO_SRC), x(SAFE / mm), y(55 - 6 - 8.5), width=icon, height=icon, mask="auto")

    left = x(SAFE / mm)

    c.setFillColor(K)
    tracked(c, NAME, SEMIBOLD, 10.5, -0.15, y(31), left=left)

    c.setFillColor(K55)
    c.setFont(REGULAR, 7)
    c.drawString(left, y(26.4), f"{ROLE} · {COMPANY}")

    c.setStrokeColor(K25)
    c.setLineWidth(0.3)
    c.line(left, y(20.5), x(85 - SAFE / mm), y(20.5))

    c.setFillColor(K)
    c.setFont(REGULAR, 7.6)
    c.drawString(left, y(14.5), EMAIL)
    c.setFillColor(K55)
    c.drawString(left, y(9.5), WEBSITE)


def crop_marks(c: canvas.Canvas, ox: float, oy: float) -> None:
    """Marks at the four trim corners, offset clear of the bleed."""
    c.setStrokeColor(K)
    c.setLineWidth(0.25)
    length, gap = 4 * mm, BLEED + 1 * mm
    for cx, sx in ((ox + BLEED, -1), (ox + BLEED + TRIM_W, 1)):
        for cy, sy in ((oy + BLEED, -1), (oy + BLEED + TRIM_H, 1)):
            c.line(cx + sx * gap, cy, cx + sx * (gap + length), cy)
            c.line(cx, cy + sy * gap, cx, cy + sy * (gap + length))


def build(path: Path, marks: bool) -> None:
    margin = 8 * mm if marks else 0
    pw, ph = PAGE_W + 2 * margin, PAGE_H + 2 * margin

    c = canvas.Canvas(str(path), pagesize=(pw, ph))
    c.setTitle("OpsPlane Services — business card")
    c.setAuthor(NAME)

    logo_white = white_logo()

    for draw in (draw_front, draw_back):
        c.saveState()
        c.translate(margin, margin)
        if draw is draw_front:
            draw(c, logo_white)
        else:
            draw(c)
        c.restoreState()
        if marks:
            crop_marks(c, margin, margin)
        c.showPage()

    c.save()
    set_boxes(path, margin)


def set_boxes(path: Path, margin: float) -> None:
    """Tell the RIP where the trim and bleed actually are."""
    reader = PdfReader(str(path))
    writer = PdfWriter()
    for page in reader.pages:
        page.trimbox.lower_left = (margin + BLEED, margin + BLEED)
        page.trimbox.upper_right = (margin + BLEED + TRIM_W, margin + BLEED + TRIM_H)
        page.bleedbox.lower_left = (margin, margin)
        page.bleedbox.upper_right = (margin + PAGE_W, margin + PAGE_H)
        writer.add_page(page)
    with open(path, "wb") as fh:
        writer.write(fh)


if __name__ == "__main__":
    register_fonts()
    build(HERE / "opsplane-business-card.pdf", marks=False)
    build(HERE / "opsplane-business-card-cropmarks.pdf", marks=True)
    print("wrote opsplane-business-card.pdf and opsplane-business-card-cropmarks.pdf")
