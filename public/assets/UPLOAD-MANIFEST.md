# Asset upload manifest

This document maps every image from the company profile PDF
(`CREDENCE ASIA GROUP- COMPANY PROFILE.pdf`) to the place in this
project where it should live.

There are two destinations.

1. **Sanity Studio** for content images that may change over time.
   The website reads these via the `urlFor()` helper. To upload,
   open `/studio` in the browser, find the matching document, and
   upload the image into the named field. The site picks it up
   immediately (60 second ISR window).
2. **`/public/assets/`** for fixed assets that ship with the code.
   Brand chrome, certification logos, and any image that is
   referenced by static path. To use, extract the image from the
   PDF and save it to the listed path.

## How to extract images from the PDF

Use one of these.

- **Adobe Acrobat**: open the PDF, right click the image, choose
  "Save Image As" or "Export Selected Image".
- **pdfimages (poppler-utils)**: run
  `pdfimages -all "CREDENCE ASIA GROUP- COMPANY PROFILE.pdf" out`
  in a terminal. Output files are named `out-000.png`, `out-001.png`
  and so on.
- **macOS Preview**: select the image, copy, paste into Preview, save as PNG.
- **Screenshot tool**: last resort, lossy.

Always save in the format and naming convention listed below.

## PDF page 1, hero cover

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 1 | Atelier or showroom interior with garment racks, navy shirt dress on form, white walls, lush green plant foreground | **Sanity** > Home Page > Hero Image | 1200x1600 portrait |

## PDF page 2, About

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 2 | Sepia toned coastal rocks in still water with quote overlay | **Sanity** > Home Page > Section Break Image, AND `/public/assets/illustrations/about-rocks.jpg` | 1920x1080 landscape |

## PDF page 3, Heritage and Values

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 3 | Cream knitwear close up, folded sweater stack | **Sanity** > Home Page > About Image, AND `/public/assets/illustrations/heritage-knitwear.jpg` | 1100x1375 portrait |

## PDF page 4, We Care mood

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 4 | Soft green natural texture with water drops, sustainability mood | `/public/assets/illustrations/we-care-mood.jpg` | 1400x1750 portrait |

## PDF page 5, We Care diagram

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 5 | Three segment wheel diagram with the 10 commitments arranged around it | not used as raster, rebuilt as SVG component | n/a |
| 5 | 11 sustainable fiber certification logos (GOTS, BCI, GRS 100% Recycled, LENZING Viscose, LENZING EcoVero, naia RENEW, REPREVE, OCS Blended, OCS 100, Refibra TENCEL, Global Recycled Standard) | `/public/assets/certifications/{slug}.png` for each, AND optionally uploaded to Sanity > Certification Logo documents | 300x150 transparent PNG each |

### Certification slugs

- `gots.png`              Global Organic Textile Standard
- `bci.png`               Better Cotton Initiative
- `grs-100-recycled.png`  Global Recycled Standard, 100% recycled mark
- `lenzing-viscose.png`   LENZING Viscose
- `lenzing-ecovero.png`   LENZING EcoVero
- `naia-renew.png`        Naia Renew
- `repreve.png`           REPREVE
- `ocs-blended.png`       Organic Content Standard Blended
- `ocs-100.png`           Organic Content Standard 100
- `refibra.png`           Refibra TENCEL with recycled cotton
- `global-recycled.png`   Global Recycled Standard (Textile Exchange)

Plus the five social and compliance certifications.

- `bsci.png`              Business Social Compliance Initiative
- `sedex.png`             Sedex SMETA
- `oekotex.png`           Oeko-Tex Standard 100
- `wrap.png`              Worldwide Responsible Accredited Production
- `gmp.png`               Good Manufacturing Practice

## PDF page 7, Product Expertise

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 7 | Sharp pencil tip touching paper, macro detail | `/public/assets/illustrations/product-expertise-pencil.jpg` | 900x1200 portrait |

## PDF pages 8 to 10, Women product photography

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 8 | 12 women product shots, white background, full body | `/public/assets/products/women/women-{01..12}.jpg` | 600x800 each, portrait |
| 9 | 12 women product shots, white background, full body | `/public/assets/products/women/women-{13..24}.jpg` | 600x800 each, portrait |
| 10 | 12 women product shots, white background, full body | `/public/assets/products/women/women-{25..36}.jpg` | 600x800 each, portrait |

## PDF pages 11 to 13, Men product photography

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 11 | 12 men product shots, white background, full body | `/public/assets/products/men/men-{01..12}.jpg` | 600x800 each, portrait |
| 12 | 12 men product shots, white background, full body | `/public/assets/products/men/men-{13..24}.jpg` | 600x800 each, portrait |
| 13 | 12 men product shots, white background, full body | `/public/assets/products/men/men-{25..36}.jpg` | 600x800 each, portrait |

## PDF page 14, Bangladesh facility

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 14 | Red brick building exterior | `/public/assets/facilities/bangladesh/exterior.jpg` | 1200x900 |
| 14 | Sewing line with pink garments and operators | `/public/assets/facilities/bangladesh/sewing-line.jpg` | 1200x900 |
| 14 | Cutting and warehouse area with workers | `/public/assets/facilities/bangladesh/cutting-floor.jpg` | 1200x900 |
| 14 | Design or merchant office with monitors | `/public/assets/facilities/bangladesh/office.jpg` | 1200x900 |
| 14 | Showroom interior with orange and green seating | `/public/assets/facilities/bangladesh/showroom.jpg` | 1200x900 |

Also upload each to **Sanity** > Garment Journey > Stage Photo if those stages map to Bangladesh.

## PDF page 15, China facility

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 15 | Building exterior with red flower beds | `/public/assets/facilities/china/exterior.jpg` | 1200x900 |
| 15 | Cutting workshop and warehouse composite | `/public/assets/facilities/china/cutting-warehouse.jpg` | 1200x900 |
| 15 | Sewing workshop composite | `/public/assets/facilities/china/sewing.jpg` | 1200x900 |
| 15 | Quality checking system composite | `/public/assets/facilities/china/quality-check.jpg` | 1200x900 |
| 15 | Quality controlling system composite | `/public/assets/facilities/china/quality-control.jpg` | 1200x900 |

## PDF page 16, India facility

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 16 | Showroom reception area | `/public/assets/facilities/india/showroom.jpg` | 1200x900 |
| 16 | Sewing operators at machines | `/public/assets/facilities/india/sewing.jpg` | 1200x900 |
| 16 | Cutting table with pink garments | `/public/assets/facilities/india/cutting.jpg` | 1200x900 |
| 16 | Garment sorting area | `/public/assets/facilities/india/sorting.jpg` | 1200x900 |

## PDF page 17, Customer logos

Each of these 25 logos goes to `/public/assets/logos/{slug}.png`.
A logo download script will attempt to fetch most of these
automatically. Any that fail land as styled silhouette tiles
using the brand name.

| Brand | Slug |
|---|---|
| Liberte Essentiel | `liberte-essentiel.png` |
| co'couture | `cocouture.png` |
| rosemunde Copenhagen | `rosemunde.png` |
| FREE/QUENT | `freequent.png` |
| Herff Jones | `herff-jones.png` |
| Walmart | `walmart.png` |
| BMW | `bmw.png` |
| COVERSTORY | `coverstory.png` |
| NEO NOIR | `neo-noir.png` |
| U.S. Polo Assn. | `us-polo-assn.png` |
| CLAAS | `claas.png` |
| STIHL | `stihl.png` |
| MUFTI | `mufti.png` |
| Volkswagen | `vw.png` |
| TJX | `tjx.png` |
| BALILAB | `balilab.png` |
| mavi | `mavi.png` |
| Sanetta | `sanetta.png` |
| Bass Pro Shops | `bass-pro-shops.png` |
| 7 For All Mankind | `7-for-all-mankind.png` |
| KTM | `ktm.png` |
| madame | `madame.png` |
| HILTI | `hilti.png` |
| Tilly's | `tillys.png` |
| Audi | `audi.png` |

Each logo PNG should have a transparent background and ideally be
at least 300px wide on the long edge. Aim for visual weight
consistency across the grid.

## PDF page 18, Contact

| PDF page | Description | Destination | Recommended size |
|---|---|---|---|
| 18 | Hope Sea Industrial Centre, exterior of the Hong Kong office building | `/public/assets/office/hope-sea-building.jpg` | 1200x900 |
| 18 | Google Maps screenshot of office location | not used, replaced with a live map embed on the contact page | n/a |

## After uploads

Once the Sanity uploads are done, the website will replace the
placeholder tiles with the uploaded photos automatically.

For static assets in `/public/assets/`, the components that reference
them are listed in the next file: `ASSET-REFERENCES.md`.
