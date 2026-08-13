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

/* ── Styles ──────────────────────────────────────────────────────────────────
   All cells use  aspect-ratio + object-fit:cover  so the crop proportion is
   identical on every screen size. No fixed pixel heights anywhere.           */
const CSS = `
.dg-cell{position:relative;overflow:hidden;background:#ede8de}
.dg-cell img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.dg-hint{position:absolute;bottom:6px;left:6px;font-family:'Cutive Mono',monospace;font-size:clamp(9px,2.2vw,10px);letter-spacing:.06em;color:rgba(255,255,255,.92);background:rgba(0,0,0,.52);padding:2px 6px;border-radius:2px;pointer-events:none;white-space:nowrap;line-height:1.5}

/* GRID A — 4 equal cols, all portrait 3:4 (9 imgs)
   Normal cells: 3:4.  Big 2×2 spans 2cols×2rows → naturally 3:4 at 2× scale.
   Upload: imgs 0-7 = 600×800 px · img8 (big) = 1200×1600 px */
.dg-a{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-a .dg-cell{aspect-ratio:3/4}
.dg-a .dg-big{grid-column:span 2;grid-row:span 2}

/* GRID B — 5 tall portraits, single row (5 imgs)
   Feature (2fr) drives row height at 2:3.  Portrait cols (1fr) inherit that
   row height → each renders at 1:3.  Same on every screen size.
   Upload: img0 (feature) = 800×1200 px · imgs 1-4 = 400×1200 px */
.dg-b{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:clamp(6px,.8vw,10px)}
.dg-b .dg-wide{aspect-ratio:2/3}
.dg-b .dg-cell:not(.dg-wide){aspect-ratio:1/3}

/* GRID C — diagonal 4-col, cols + rows step down (9 imgs)
   Big cell (col1 rows 1+2) has aspect-ratio 2:3 → drives row heights.
   Right cells (.dg-cr) fill the row via grid-stretch on desktop; on mobile
   they fall back to their own 3:4 aspect-ratio.
   Bottom cells c7/c8 (wide landscape) are unavoidable in this layout.
   Upload: img0 = 800×1200 px · imgs 1-6 = 600×800 px
           img7 = 900×500 px  · img8 = 700×500 px */
.dg-c{display:grid;grid-template-columns:2fr 1.4fr 1.1fr 0.9fr;gap:clamp(6px,.8vw,10px)}
.dg-c .dg-big{grid-column:1;grid-row:1/3;aspect-ratio:2/3}
.dg-c .dg-cr{aspect-ratio:3/4}
.dg-c .dg-c7{grid-column:1/3;aspect-ratio:9/5}
.dg-c .dg-c8{grid-column:3/5;aspect-ratio:7/5}

/* GRID D — portrait-first mosaic (10 imgs)
   All cells base aspect-ratio 1:1 (square).
   d0 and d2 span 2 rows → automatically render at 1:2 tall portrait.
   Row 1: [d0 tall][d1][d2 tall][d3]
   Row 2: [d0     ][d4][d2     ][d5]
   Row 3: [d6][d7][d8][d9]
   Upload: d0,d2 = 600×1200 px · d1,d3,d4,d5 = 600×600 px · d6-d9 = 600×600 px */
.dg-d{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-d .dg-cell{aspect-ratio:1/1}
.dg-d0{grid-column:1;grid-row:1/3}
.dg-d1{grid-column:2;grid-row:1}
.dg-d2{grid-column:3;grid-row:1/3}
.dg-d3{grid-column:4;grid-row:1}
.dg-d4{grid-column:2;grid-row:2}
.dg-d5{grid-column:4;grid-row:2}
.dg-d6{grid-column:1;grid-row:3}
.dg-d7{grid-column:2;grid-row:3}
.dg-d8{grid-column:3;grid-row:3}
.dg-d9{grid-column:4;grid-row:3}

/* GRID E — 5 equal tall portraits (5 imgs)
   Upload: all 5 = 600×900 px (2:3) */
.dg-e{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(6px,.8vw,10px)}
.dg-e .dg-cell{aspect-ratio:2/3}

/* TABLET 640-1023px — fewer columns, aspect-ratios stay the same */
@media(max-width:1023px) and (min-width:640px){
  .dg-a{grid-template-columns:repeat(2,1fr)}
  .dg-a .dg-big{grid-column:span 2;grid-row:span 2}
  .dg-b{grid-template-columns:1fr 1fr}
  .dg-b .dg-wide{grid-column:span 2}
  .dg-b .dg-cell:not(.dg-wide){aspect-ratio:2/3}
  .dg-c{grid-template-columns:repeat(3,1fr)}
  .dg-c .dg-big{grid-column:span 2;grid-row:span 2}
  .dg-c .dg-c7,.dg-c .dg-c8{grid-column:auto;grid-row:auto;aspect-ratio:3/4}
  .dg-d{grid-template-columns:repeat(3,1fr)}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
  .dg-d0,.dg-d2{grid-row:span 2}
  .dg-e{grid-template-columns:repeat(3,1fr)}
  .dg-e .dg-e5{grid-column:span 2}
}

/* MOBILE <640px — 2 cols, aspect-ratios stay the same = same crop as desktop */
@media(max-width:639px){
  .dg-a{grid-template-columns:1fr 1fr}
  .dg-a .dg-big{grid-column:1/-1;grid-row:auto}
  .dg-b{grid-template-columns:1fr 1fr}
  .dg-b .dg-wide{grid-column:1/-1}
  .dg-b .dg-cell:not(.dg-wide){aspect-ratio:3/4}
  .dg-c{grid-template-columns:1fr 1fr}
  .dg-c .dg-big{grid-column:1/-1;grid-row:auto}
  .dg-c .dg-c7,.dg-c .dg-c8{grid-column:auto;grid-row:auto;aspect-ratio:3/4}
  .dg-d{grid-template-columns:1fr 1fr}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
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
  hint,
}: {
  img: GridImage
  w?: number
  eager?: boolean
  cls?: string
  hint?: string
}) {
  return (
    <div className={['dg-cell', cls].filter(Boolean).join(' ')}>
      <img
        src={imgSrc(img, w)}
        alt={img.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {hint && <span className="dg-hint">{hint}</span>}
    </div>
  )
}

/* ── Grid A · 4-col portrait grid (9 images) ─────────────────────────────
 *
 * [ img0 ][ img1 ][ img2 ][ img3 ]        row 1 — 4 portraits
 * [ img4 ][ img5 ][  img8 big 2×2  ]      rows 2-3
 * [ img6 ][ img7 ][  img8 big 2×2  ]
 *
 * Cell ratio: 3:4.  Upload: imgs 0-7 = 600×800 px · img8 = 1200×1600 px
 */
function GridA({imgs}: {imgs: GridImage[]}) {
  const P = '600 × 800 px'
  const B = '1200 × 1600 px'
  return (
    <div className="dg-a">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager hint={P} />}
      {imgs[1] && <Cell img={imgs[1]} w={600}       hint={P} />}
      {imgs[2] && <Cell img={imgs[2]} w={600}       hint={P} />}
      {imgs[3] && <Cell img={imgs[3]} w={600}       hint={P} />}
      {imgs[4] && <Cell img={imgs[4]} w={600}       hint={P} />}
      {imgs[5] && <Cell img={imgs[5]} w={600}       hint={P} />}
      {imgs[8] && <Cell img={imgs[8]} w={1200} cls="dg-big" hint={B} />}
      {imgs[6] && <Cell img={imgs[6]} w={600}       hint={P} />}
      {imgs[7] && <Cell img={imgs[7]} w={600}       hint={P} />}
    </div>
  )
}

/* ── Grid B · 5 tall portraits, single row (5 images) ────────────────────
 *
 * [ img0 — feature 2fr ] [ img1 ] [ img2 ] [ img3 ] [ img4 ]
 *
 * Feature drives row height at 2:3.  Portrait columns inherit that height
 * and render at 1:3 (half the width, same height).
 * Upload: img0 = 800×1200 px (2:3) · imgs 1-4 = 400×1200 px (1:3)
 */
function GridB({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-b">
      {imgs[0] && <Cell img={imgs[0]} w={1000} eager cls="dg-wide" hint="800 × 1200 px" />}
      {imgs[1] && <Cell img={imgs[1]} w={500}              hint="400 × 1200 px" />}
      {imgs[2] && <Cell img={imgs[2]} w={500}              hint="400 × 1200 px" />}
      {imgs[3] && <Cell img={imgs[3]} w={500}              hint="400 × 1200 px" />}
      {imgs[4] && <Cell img={imgs[4]} w={500}              hint="400 × 1200 px" />}
    </div>
  )
}

/* ── Grid C · diagonal 4-col (9 images) ──────────────────────────────────
 *
 * [ img0 big ] [ img1 ] [ img2 ] [ img3 ]  row 1
 * [ img0 big ] [ img4 ] [ img5 ] [ img6 ]  row 2
 * [  img7 c7  wide  ] [  img8 c8  wide  ]  row 3
 *
 * img0 (big, col1 rows1-2): aspect-ratio 2:3 drives row heights.
 * imgs 1-6 (.dg-cr): fill row height on desktop; 3:4 on mobile.
 * imgs 7-8 (c7, c8): wide landscape cells — unavoidable in this layout.
 *
 * Upload: img0 = 800×1200 px · imgs 1-6 = 600×800 px
 *         img7 = 900×500 px  · img8 = 700×500 px
 */
function GridC({imgs}: {imgs: GridImage[]}) {
  const P = '600 × 800 px'
  return (
    <div className="dg-c">
      {imgs[0] && <Cell img={imgs[0]} w={1000} eager cls="dg-big"  hint="800 × 1200 px" />}
      {imgs[1] && <Cell img={imgs[1]} w={700}        cls="dg-cr"   hint={P} />}
      {imgs[2] && <Cell img={imgs[2]} w={600}        cls="dg-cr"   hint={P} />}
      {imgs[3] && <Cell img={imgs[3]} w={500}        cls="dg-cr"   hint={P} />}
      {imgs[4] && <Cell img={imgs[4]} w={700}        cls="dg-cr"   hint={P} />}
      {imgs[5] && <Cell img={imgs[5]} w={600}        cls="dg-cr"   hint={P} />}
      {imgs[6] && <Cell img={imgs[6]} w={500}        cls="dg-cr"   hint={P} />}
      {imgs[7] && <Cell img={imgs[7]} w={900}        cls="dg-c7"   hint="900 × 500 px" />}
      {imgs[8] && <Cell img={imgs[8]} w={700}        cls="dg-c8"   hint="700 × 500 px" />}
    </div>
  )
}

/* ── Grid D · portrait-first mosaic (10 images) ──────────────────────────
 *
 * Base cell: 1:1 square.  d0 + d2 span 2 rows → render at 1:2 tall portrait.
 *
 * [ d0 tall ] [ d1 sq ] [ d2 tall ] [ d3 sq ]   row 1
 * [ d0      ] [ d4 sq ] [ d2      ] [ d5 sq ]   row 2
 * [ d6 sq ] [ d7 sq ] [ d8 sq ] [ d9 sq ]        row 3
 *
 * Upload: d0, d2 = 600×1200 px (1:2) · all others = 600×600 px (1:1)
 */
function GridD({imgs}: {imgs: GridImage[]}) {
  const TALL = '600 × 1200 px'
  const SQ   = '600 × 600 px'
  return (
    <div className="dg-d">
      {imgs[0] && <Cell img={imgs[0]} w={600}  eager cls="dg-d0" hint={TALL} />}
      {imgs[1] && <Cell img={imgs[1]} w={600}        cls="dg-d1" hint={SQ}   />}
      {imgs[2] && <Cell img={imgs[2]} w={600}        cls="dg-d2" hint={TALL} />}
      {imgs[3] && <Cell img={imgs[3]} w={600}        cls="dg-d3" hint={SQ}   />}
      {imgs[4] && <Cell img={imgs[4]} w={600}        cls="dg-d4" hint={SQ}   />}
      {imgs[5] && <Cell img={imgs[5]} w={600}        cls="dg-d5" hint={SQ}   />}
      {imgs[6] && <Cell img={imgs[6]} w={600}        cls="dg-d6" hint={SQ}   />}
      {imgs[7] && <Cell img={imgs[7]} w={600}        cls="dg-d7" hint={SQ}   />}
      {imgs[8] && <Cell img={imgs[8]} w={600}        cls="dg-d8" hint={SQ}   />}
      {imgs[9] && <Cell img={imgs[9]} w={600}        cls="dg-d9" hint={SQ}   />}
    </div>
  )
}

/* ── Grid E · 5 equal tall portraits (5 images) ──────────────────────────
 *
 * [ img0 ] [ img1 ] [ img2 ] [ img3 ] [ img4 ]
 *
 * Upload: all 5 = 600×900 px (2:3)
 */
function GridE({imgs}: {imgs: GridImage[]}) {
  const HINT = '600 × 900 px · 2:3'
  return (
    <div className="dg-e">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager hint={HINT} />}
      {imgs[1] && <Cell img={imgs[1]} w={600}       hint={HINT} />}
      {imgs[2] && <Cell img={imgs[2]} w={600}       hint={HINT} />}
      {imgs[3] && <Cell img={imgs[3]} w={600}       hint={HINT} />}
      {imgs[4] && <Cell img={imgs[4]} w={600} cls="dg-e5" hint={HINT} />}
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
