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
   Feature (2fr) drives row height at 2:3.  Portrait cols (1.5fr) inherit that
   row height → each renders at 1:2.  Same on every screen size.
   Upload: img0 (feature) = 800×1200 px · imgs 1-4 = 600×1200 px (1:2) */
.dg-b{display:grid;grid-template-columns:2fr 1.5fr 1.5fr 1.5fr 1.5fr;gap:clamp(6px,.8vw,10px)}
.dg-b .dg-wide{aspect-ratio:2/3}
.dg-b .dg-cell:not(.dg-wide){aspect-ratio:1/2}

/* GRID C — bento mosaic (8 imgs, 4 cols × 3 rows)
   1×1 square cells drive row height = col-width.
   Spanning cells fill their tracks naturally.
   ┌───────┬───────┬───────┬───────┐
   │c0(1×2)│cn(1×2)│c1(1×2)│  c2   │
   │       │       │       ├───────┤
   │       │       │       │  c3   │
   ├───────┴───────┴───────┴───────┤
   │  c4   │   c5  (2×1)   │  c6   │
   └───────┴───────────────┴───────┘
   Upload: c0,cn,c1 = 600×1200 px (1:2) · c2,c3,c4,c6 = 600×600 px (1:1)
           c5 = 1200×600 px (2:1) */
.dg-c{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-c2,.dg-c3,.dg-c4,.dg-c6{aspect-ratio:1/1}
.dg-c0{grid-column:1;grid-row:1/3}
.dg-cn{grid-column:2;grid-row:1/3}
.dg-c1{grid-column:3;grid-row:1/3}
.dg-c2{grid-column:4;grid-row:1}
.dg-c3{grid-column:4;grid-row:2}
.dg-c4{grid-column:1;grid-row:3}
.dg-c5{grid-column:2/4;grid-row:3}
.dg-c6{grid-column:4;grid-row:3}

/* GRID D — 4-col square grid (12 imgs)
   All cells equal 1:1.  Auto-flow fills 3 rows of 4.
   Upload: all 12 = 600×600 px */
.dg-d{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.8vw,10px)}
.dg-d .dg-cell{aspect-ratio:1/1}

/* GRID E — 5 equal tall portraits (5 imgs)
   Upload: all 5 = 600×900 px (2:3) */
.dg-e{display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(6px,.8vw,10px)}
.dg-e .dg-cell{aspect-ratio:2/3}

/* TABLET 640-1023px — fewer columns, aspect-ratios stay the same */
@media(max-width:1023px) and (min-width:640px){
  .dg-a{grid-template-columns:repeat(2,1fr)}
  .dg-a .dg-big{grid-column:span 2;grid-row:span 2}
  .dg-b{grid-template-columns:2fr 1.5fr 1.5fr 1.5fr 1.5fr}
  .dg-b .dg-cell:not(.dg-wide){aspect-ratio:1/2}
  .dg-c{grid-template-columns:repeat(4,1fr)}
  .dg-d{grid-template-columns:repeat(4,1fr)}
  .dg-e{grid-template-columns:repeat(3,1fr)}
  .dg-e .dg-e5{grid-column:span 2}
}

/* MOBILE <640px — 2 cols, aspect-ratios stay the same = same crop as desktop */
@media(max-width:639px){
  .dg-a{grid-template-columns:1fr 1fr}
  .dg-a .dg-big{grid-column:1/-1;grid-row:auto}
  .dg-b{grid-template-columns:2fr 1.5fr 1.5fr 1.5fr 1.5fr}
  .dg-b .dg-cell:not(.dg-wide){aspect-ratio:1/2}
  .dg-c{grid-template-columns:repeat(2,1fr)}
  .dg-c0,.dg-cn,.dg-c1,.dg-c2,.dg-c3,.dg-c4,.dg-c5,.dg-c6{grid-column:auto;grid-row:auto;aspect-ratio:1/1}
  .dg-d{grid-template-columns:repeat(4,1fr)}
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
 * and render at 1:2 (3/4 the width, same height).
 * Upload: img0 = 800×1200 px (2:3) · imgs 1-4 = 600×1200 px (1:2)
 */
function GridB({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-b">
      {imgs[0] && <Cell img={imgs[0]} w={1000} eager cls="dg-wide" hint="800 × 1200 px" />}
      {imgs[1] && <Cell img={imgs[1]} w={600}              hint="600 × 1200 px" />}
      {imgs[2] && <Cell img={imgs[2]} w={600}              hint="600 × 1200 px" />}
      {imgs[3] && <Cell img={imgs[3]} w={600}              hint="600 × 1200 px" />}
      {imgs[4] && <Cell img={imgs[4]} w={600}              hint="600 × 1200 px" />}
    </div>
  )
}

/* ── Grid C · bento mosaic (8 images) ────────────────────────────────────
 *
 * ┌───────┬───────┬───────┬───────┐
 * │c0(1×2)│cn(1×2)│c1(1×2)│  c2   │
 * │       │       │       ├───────┤
 * │       │       │       │  c3   │
 * ├───────┴───────┴───────┴───────┤
 * │  c4   │   c5  (2×1)   │  c6   │
 * └───────┴───────────────┴───────┘
 *
 * Upload: c0, cn, c1 = 600×1200 px (1:2) · c2, c3, c4, c6 = 600×600 px (1:1)
 *         c5 = 1200×600 px (2:1)
 */
function GridC({imgs}: {imgs: GridImage[]}) {
  return (
    <div className="dg-c">
      {imgs[0] && <Cell img={imgs[0]} w={600}  eager cls="dg-c0" hint="600 × 1200 px"  />}
      {imgs[7] && <Cell img={imgs[7]} w={600}        cls="dg-cn" hint="600 × 1200 px"  />}
      {imgs[1] && <Cell img={imgs[1]} w={600}        cls="dg-c1" hint="600 × 1200 px"  />}
      {imgs[2] && <Cell img={imgs[2]} w={600}        cls="dg-c2" hint="600 × 600 px"   />}
      {imgs[3] && <Cell img={imgs[3]} w={600}        cls="dg-c3" hint="600 × 600 px"   />}
      {imgs[4] && <Cell img={imgs[4]} w={600}        cls="dg-c4" hint="600 × 600 px"   />}
      {imgs[5] && <Cell img={imgs[5]} w={1200}       cls="dg-c5" hint="1200 × 600 px"  />}
      {imgs[6] && <Cell img={imgs[6]} w={600}        cls="dg-c6" hint="600 × 600 px"   />}
    </div>
  )
}

/* ── Grid D · 4-col square grid (12 images) ──────────────────────────────
 *
 * [ 0 ] [ 1 ] [ 2 ] [ 3 ]   row 1
 * [ 4 ] [ 5 ] [ 6 ] [ 7 ]   row 2
 * [ 8 ] [ 9 ] [10 ] [11 ]   row 3
 *
 * Upload: all 12 = 600×600 px (1:1)
 */
function GridD({imgs}: {imgs: GridImage[]}) {
  const SQ = '600 × 600 px'
  return (
    <div className="dg-d">
      {imgs[0]  && <Cell img={imgs[0]}  w={600} eager hint={SQ} />}
      {imgs[1]  && <Cell img={imgs[1]}  w={600}       hint={SQ} />}
      {imgs[2]  && <Cell img={imgs[2]}  w={600}       hint={SQ} />}
      {imgs[3]  && <Cell img={imgs[3]}  w={600}       hint={SQ} />}
      {imgs[4]  && <Cell img={imgs[4]}  w={600}       hint={SQ} />}
      {imgs[5]  && <Cell img={imgs[5]}  w={600}       hint={SQ} />}
      {imgs[6]  && <Cell img={imgs[6]}  w={600}       hint={SQ} />}
      {imgs[7]  && <Cell img={imgs[7]}  w={600}       hint={SQ} />}
      {imgs[8]  && <Cell img={imgs[8]}  w={600}       hint={SQ} />}
      {imgs[9]  && <Cell img={imgs[9]}  w={600}       hint={SQ} />}
      {imgs[10] && <Cell img={imgs[10]} w={600}       hint={SQ} />}
      {imgs[11] && <Cell img={imgs[11]} w={600}       hint={SQ} />}
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
