# Brand — business card

## Files

| File | Use |
|---|---|
| `opsplane-business-card.pdf` | Give this to the printer. 85×55 mm trim, 3 mm bleed, TrimBox/BleedBox set. Page 1 front, page 2 back. |
| `opsplane-business-card-cropmarks.pdf` | Same card with crop marks, for printers that ask for them. |
| `preview-card-front.png` / `preview-card-back.png` | On-screen previews. Not for print. |
| `make_business_card.py` | Regenerates both PDFs. |
| `fonts/` | Inter static instances (SIL Open Font License — free to embed commercially). |

## Specification for the printer

- Format 85 × 55 mm, double sided
- 3 mm bleed on all four edges; type is kept 6 mm inside the trim
- CMYK, text is K-only (no rich black on small type)
- The dark face is a rich black (C30 M20 Y20 K100) so the solid area does not look washed out
- All fonts embedded

## Changing the details

Edit the constants at the top of `make_business_card.py` (name, role, company,
email, website, tagline), then regenerate:

```bash
python -m venv .venv && ./.venv/bin/pip install reportlab pypdf pillow
./.venv/bin/python make_business_card.py
```
