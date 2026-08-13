'use client'

import {urlFor} from '@/sanity/lib/image'

/* ── Types ── */
export type GridImage = {
  _key: string
  alt?: string | null
  lqip?: string | null
  image: unknown
}

export type DenimGridProps = {
  layout: 'A' | 'B' | 'C' | 'D' | 'E'
  images: GridImage[]
}

/* ── Styles ─────────────────────────────────────────────────────────────────
   Injected as a real <style> tag so they survive every rendering path
   (SSR, client nav, 'use client' boundary). "dg-" prefix scopes all names.  */
const CSS = `
.dg-cell{background:#ede8de}
.dg-cell img{width:100%;height:auto;display:block}

/* GRID A — 4-col portrait grid (9 imgs) */
.dg-a{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-a .dg-big{grid-column:span 2;grid-row:span 2}

/* GRID B — 1 wide + 4 portrait single row (5 imgs) */
.dg-b{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:clamp(6px,.8vw,10px)}

/* GRID C — 1 big left + 3 cols right, cols step narrower (9 imgs) */
.dg-c{display:grid;grid-template-columns:2fr 1.4fr 1.1fr 0.9fr;gap:clamp(6px,.8vw,10px)}
.dg-c .dg-big{grid-column:1;grid-row:1/3}
.dg-c .dg-c7{grid-column:1/3}
.dg-c .dg-c8{grid-column:3/5}

/* GRID D — asymmetric mosaic explicit placement (10 imgs) */
.dg-d{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-d0{grid-column:1;grid-row:1}
.dg-d1{grid-column:2;grid-row:1}
.dg-d2{grid-column:3/5;grid-row:1}
.dg-d3{grid-column:1/3;grid-row:2/4}
.dg-d4{grid-column:3;grid-row:2}
.dg-d5{grid-column:4;grid-row:2}
.dg-d6{grid-column:3/5;grid-row:3}
.dg-d7{grid-column:1;grid-row:4}
.dg-d8{grid-column:2/4;grid-row:4}
.dg-d9{grid-column:4;grid-row:4}

/* GRID E — 5 equal tall portraits (5 imgs) */
.dg-e{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(6px,.8vw,10px)}

/* TABLET 640-1023px */
@media(max-width:1023px) and (min-width:640px){
  .dg-a{grid-template-columns:repeat(2,1fr)}
  .dg-a .dg-big{grid-column:span 2;grid-row:span 2}
  .dg-b{grid-template-columns:repeat(2,1fr)}
  .dg-b .dg-wide{grid-column:span 2}
  .dg-c{grid-template-columns:repeat(3,1fr)}
  .dg-c .dg-big{grid-column:span 2;grid-row:span 2}
  .dg-c .dg-c7,.dg-c .dg-c8{grid-column:auto;grid-row:auto}
  .dg-d{grid-template-columns:repeat(3,1fr)}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
  .dg-d2{grid-column:span 2}
  .dg-d3{grid-column:span 2;grid-row:span 2}
  .dg-d6{grid-column:span 2}
  .dg-d8{grid-column:span 2}
  .dg-e{grid-template-columns:repeat(3,1fr)}
  .dg-e .dg-e5{grid-column:span 2}
}

/* MOBILE <640px */
@media(max-width:639px){
  .dg-a{grid-template-columns:1fr 1fr}
  .dg-a .dg-big{grid-column:1/-1;grid-row:auto}
  .dg-b{grid-template-columns:1fr 1fr}
  .dg-b .dg-wide{grid-column:1/-1}
  .dg-c{grid-template-columns:1fr 1fr}
  .dg-c .dg-big{grid-column:1/-1;grid-row:auto}
  .dg-c .dg-c7,.dg-c .dg-c8{grid-column:auto;grid-row:auto}
  .dg-d{grid-template-columns:1fr 1fr}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
  .dg-d2{grid-column:1/-1}
  .dg-d3{grid-column:1/-1}
  .dg-d6{grid-column:1/-1}
  .dg-d8{grid-column:1/-1}
  .dg-e{grid-template-columns:1fr 1fr}
  .dg-e .dg-e5{grid-column:1/-1}
}
`

/* ── Helpers ── */
function imgSrc(img: GridImage, w: number): string {
  return urlFor(img.image as Parameters<typeof urlFor>[0])
    .width(w)
    .auto('format')
    .quality(82)
    .fit('crop')
    .url()
}

function Cell({
  img,
  w = 800,
  eager,
  cls,
}: {
  img: GridImage
  w?: number
  eager?: boolean
  cls?: string
}) {
  return (
    <div className={['dg-cell', cls].filter(Boolean).join(' ')}>
      <img
        src={imgSrc(img, w)}
        alt={img.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}

/* ── Grid A · 4-col portrait grid (9 images) ─────────────────────────────
 *
 * [ img0 ][ img1 ][ img2 ][ img3 ]   row 1 — 4 equal portraits
 * [ img4 ][ img5 ][    img8 big   ]  rows 2-3 — 2 small + big 2×2
 * [ img6 ][ img7 ][    img8 big   ]
 *
 * Upload: imgs 0-7 → 600 × 800 px · img8 → 1200 × 1600 px
 */
function GridA({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-a">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager />}
      {imgs[1] && <Cell img={imgs[1]} w={600} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} />}
      {imgs[3] && <Cell img={imgs[3]} w={600} />}
      {imgs[4] && <Cell img={imgs[4]} w={600} />}
      {imgs[5] && <Cell img={imgs[5]} w={600} />}
      {imgs[8] && <Cell img={imgs[8]} w={1200} cls="dg-big" />}
      {imgs[6] && <Cell img={imgs[6]} w={600} />}
      {imgs[7] && <Cell img={imgs[7]} w={600} />}
    </div>
  )
}

/* ── Grid B · single-row strip (5 images) ────────────────────────────────
 *
 * [ img0 — wide 2fr ] [ img1 ] [ img2 ] [ img3 ] [ img4 ]
 *
 * Upload: img0 → 800 × 1200 px · imgs 1-4 → 400 × 1200 px
 */
function GridB({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-b">
      {imgs[0] && <Cell img={imgs[0]} w={1200} eager cls="dg-wide" />}
      {imgs[1] && <Cell img={imgs[1]} w={500} />}
      {imgs[2] && <Cell img={imgs[2]} w={500} />}
      {imgs[3] && <Cell img={imgs[3]} w={500} />}
      {imgs[4] && <Cell img={imgs[4]} w={500} />}
    </div>
  )
}

/* ── Grid C · bento (9 images) ───────────────────────────────────────────
 *
 * [ img0 — 2×2 big  ] [ img1 ] [ img2 ]   rows 1-2
 * [ img0 — 2×2 big  ] [ img3 ] [ img4 ]
 * [ img5 ][ img6 ][ img7 ][ img8 ]         row 3 — 4 equal squares
 *
 * Upload: img0 → 1200 × 1200 px · imgs 1-8 → 600 × 600 px
 */
/* Grid C layout (desktop):
 * [ img0 BIG  ] [ img1 ] [ img2 ] [ img3 ]   row 1  (cols: 2fr 1.4fr 1.1fr 0.9fr)
 * [ img0 BIG  ] [ img4 ] [ img5 ] [ img6 ]   row 2  (shorter)
 * [ img7 c7   |  img7  ] [ img8 c8  | img8 ] row 3  (shorter still)
 */
function GridC({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-c">
      {imgs[0] && <Cell img={imgs[0]} w={1200} eager cls="dg-big" />}
      {imgs[1] && <Cell img={imgs[1]} w={700} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} />}
      {imgs[3] && <Cell img={imgs[3]} w={500} />}
      {imgs[4] && <Cell img={imgs[4]} w={700} />}
      {imgs[5] && <Cell img={imgs[5]} w={600} />}
      {imgs[6] && <Cell img={imgs[6]} w={500} />}
      {imgs[7] && <Cell img={imgs[7]} w={900} cls="dg-c7" />}
      {imgs[8] && <Cell img={imgs[8]} w={900} cls="dg-c8" />}
    </div>
  )
}

/* ── Grid D · asymmetric mosaic (10 images) ──────────────────────────────
 *
 * Desktop pattern (4 cols × 4 rows):
 *   [ d0 ][ d1 ][    d2 wide    ]      row 1
 *   [   d3 big (2×2)   ][ d4 ][ d5 ]  row 2
 *   [   d3 continued   ][   d6 wide ]  row 3
 *   [ d7 ][   d8 wide  ][ d9 ]         row 4
 *
 * Upload sizes:
 *   d0, d1, d4, d5, d7, d9  →  600 × 600 px   (1:1 square)
 *   d2, d6, d8              →  1200 × 600 px  (2:1 wide)
 *   d3                      →  1200 × 1200 px (1:1 big square)
 */
function GridD({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-d">
      {imgs[0] && <Cell img={imgs[0]} w={600}  eager cls="dg-d0" />}
      {imgs[1] && <Cell img={imgs[1]} w={600}        cls="dg-d1" />}
      {imgs[2] && <Cell img={imgs[2]} w={1200}       cls="dg-d2" />}
      {imgs[3] && <Cell img={imgs[3]} w={1200}       cls="dg-d3" />}
      {imgs[4] && <Cell img={imgs[4]} w={600}        cls="dg-d4" />}
      {imgs[5] && <Cell img={imgs[5]} w={600}        cls="dg-d5" />}
      {imgs[6] && <Cell img={imgs[6]} w={1200}       cls="dg-d6" />}
      {imgs[7] && <Cell img={imgs[7]} w={600}        cls="dg-d7" />}
      {imgs[8] && <Cell img={imgs[8]} w={1200}       cls="dg-d8" />}
      {imgs[9] && <Cell img={imgs[9]} w={600}        cls="dg-d9" />}
    </div>
  )
}

/* ── Grid E · 5 equal tall portraits (5 images) ──────────────────────────
 *
 * Desktop — single row, 5 equal columns:
 *   [ img0 ] [ img1 ] [ img2 ] [ img3 ] [ img4 ]
 *
 * Tablet (640-1023px) — 3 cols, img4 spans 2 cols on last row.
 * Mobile (<640px)     — 2 cols, img4 spans full width.
 *
 * Upload: all 5 images → 500 × 1500 px  (ratio 1:3 portrait)
 */
function GridE({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-e">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager />}
      {imgs[1] && <Cell img={imgs[1]} w={600} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} />}
      {imgs[3] && <Cell img={imgs[3]} w={600} />}
      {imgs[4] && <Cell img={imgs[4]} w={600} cls="dg-e5" />}
    </div>
  )
}

/* ── Main export ── */
export default function DenimGrid({layout, images}: DenimGridProps) {
  if (!images?.length) return null
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{__html: CSS}} />
      {layout === 'B' && <GridB imgs={images} />}
      {layout === 'C' && <GridC imgs={images} />}
      {layout === 'D' && <GridD imgs={images} />}
      {layout === 'E' && <GridE imgs={images} />}
      {layout !== 'B' && layout !== 'C' && layout !== 'D' && layout !== 'E' && <GridA imgs={images} />}
    </>
  )
}
