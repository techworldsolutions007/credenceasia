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
.dg-cell{position:relative;overflow:hidden;background:#ede8de}
.dg-cell img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.dg-hint{position:absolute;bottom:7px;left:7px;font-family:'Cutive Mono',monospace;font-size:clamp(9px,2.5vw,11px);letter-spacing:.07em;color:rgba(255,255,255,.93);background:rgba(0,0,0,.48);padding:2px 7px;border-radius:2px;pointer-events:none;white-space:nowrap;line-height:1.5}

/* GRID A — 4-col portrait grid (9 imgs) */
.dg-a{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:clamp(200px,30vw,400px);gap:clamp(6px,.8vw,10px)}
.dg-a .dg-big{grid-column:span 2;grid-row:span 2}

/* GRID B — 1 wide + 4 portrait single row (5 imgs) */
.dg-b{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;grid-template-rows:clamp(360px,48vw,640px);gap:clamp(6px,.8vw,10px)}

/* GRID C — bento 2x2 + 4 medium + 4 bottom (9 imgs) */
.dg-c{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:clamp(140px,22vw,300px);gap:clamp(6px,.8vw,10px)}
.dg-c .dg-big{grid-column:span 2;grid-row:span 2}

/* GRID D — asymmetric mosaic explicit placement (10 imgs) */
.dg-d{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,clamp(140px,22vw,300px));gap:clamp(6px,.8vw,10px)}
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
.dg-e{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:clamp(420px,56vw,720px);gap:clamp(6px,.8vw,10px)}

/* TABLET 640-1023px */
@media(max-width:1023px) and (min-width:640px){
  .dg-a{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(180px,28vw,320px)}
  .dg-a .dg-big{grid-column:span 2;grid-row:span 1}
  .dg-b{grid-template-columns:repeat(2,1fr);grid-template-rows:none;grid-auto-rows:clamp(240px,36vw,420px)}
  .dg-b .dg-wide{grid-column:span 2}
  .dg-c{grid-template-columns:repeat(3,1fr);grid-auto-rows:clamp(120px,20vw,240px)}
  .dg-d{grid-template-columns:repeat(3,1fr);grid-template-rows:none;grid-auto-rows:clamp(140px,22vw,260px)}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
  .dg-d2{grid-column:span 2}
  .dg-d3{grid-column:span 2;grid-row:span 2}
  .dg-d6{grid-column:span 2}
  .dg-d8{grid-column:span 2}
  .dg-e{grid-template-columns:repeat(3,1fr);grid-template-rows:none;grid-auto-rows:clamp(320px,44vw,560px)}
  .dg-e .dg-e5{grid-column:span 2}
}

/* MOBILE <640px */
@media(max-width:639px){
  .dg-a{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(140px,40vw,220px)}
  .dg-a .dg-big{grid-column:span 2;grid-row:span 1}
  .dg-b{grid-template-columns:repeat(2,1fr);grid-template-rows:none;grid-auto-rows:clamp(180px,46vw,280px)}
  .dg-b .dg-wide{grid-column:span 2}
  .dg-c{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(110px,28vw,180px)}
  .dg-d{grid-template-columns:repeat(2,1fr);grid-template-rows:none;grid-auto-rows:clamp(130px,38vw,200px)}
  .dg-d0,.dg-d1,.dg-d2,.dg-d3,.dg-d4,.dg-d5,.dg-d6,.dg-d7,.dg-d8,.dg-d9{grid-column:auto;grid-row:auto}
  .dg-d2{grid-column:span 2}
  .dg-d3{grid-column:span 2;grid-row:span 1}
  .dg-d6{grid-column:span 2}
  .dg-d8{grid-column:span 2}
  .dg-e{grid-template-columns:repeat(2,1fr);grid-template-rows:none;grid-auto-rows:clamp(260px,60vw,400px)}
  .dg-e .dg-e5{grid-column:span 2}
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
 * [ img0 ][ img1 ][ img2 ][ img3 ]   row 1 — 4 equal portraits
 * [ img4 ][ img5 ][    img8 big   ]  rows 2-3 — 2 small + big 2×2
 * [ img6 ][ img7 ][    img8 big   ]
 *
 * Upload: imgs 0-7 → 600 × 800 px · img8 → 1200 × 1600 px
 */
function GridA({imgs}: {imgs: GridImage[]}) {
  const S = '600 × 800 px'
  const B = '1200 × 1600 px'
  return (
    <div className="dg-a">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager hint={S} />}
      {imgs[1] && <Cell img={imgs[1]} w={600} hint={S} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} hint={S} />}
      {imgs[3] && <Cell img={imgs[3]} w={600} hint={S} />}
      {imgs[4] && <Cell img={imgs[4]} w={600} hint={S} />}
      {imgs[5] && <Cell img={imgs[5]} w={600} hint={S} />}
      {imgs[8] && <Cell img={imgs[8]} w={1200} cls="dg-big" hint={B} />}
      {imgs[6] && <Cell img={imgs[6]} w={600} hint={S} />}
      {imgs[7] && <Cell img={imgs[7]} w={600} hint={S} />}
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
      {imgs[0] && <Cell img={imgs[0]} w={1200} eager cls="dg-wide" hint="800 × 1200 px" />}
      {imgs[1] && <Cell img={imgs[1]} w={500} hint="400 × 1200 px" />}
      {imgs[2] && <Cell img={imgs[2]} w={500} hint="400 × 1200 px" />}
      {imgs[3] && <Cell img={imgs[3]} w={500} hint="400 × 1200 px" />}
      {imgs[4] && <Cell img={imgs[4]} w={500} hint="400 × 1200 px" />}
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
function GridC({imgs}: {imgs: GridImage[]}) {
  const S = '600 × 600 px'
  const B = '1200 × 1200 px'
  return (
    <div className="dg-c">
      {imgs[0] && <Cell img={imgs[0]} w={1200} eager cls="dg-big" hint={B} />}
      {imgs[1] && <Cell img={imgs[1]} w={600} hint={S} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} hint={S} />}
      {imgs[3] && <Cell img={imgs[3]} w={600} hint={S} />}
      {imgs[4] && <Cell img={imgs[4]} w={600} hint={S} />}
      {imgs[5] && <Cell img={imgs[5]} w={600} hint={S} />}
      {imgs[6] && <Cell img={imgs[6]} w={600} hint={S} />}
      {imgs[7] && <Cell img={imgs[7]} w={600} hint={S} />}
      {imgs[8] && <Cell img={imgs[8]} w={600} hint={S} />}
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
  const SQ   = '600 × 600 px'
  const WIDE = '1200 × 600 px'
  const BIG  = '1200 × 1200 px'
  return (
    <div className="dg-d">
      {imgs[0] && <Cell img={imgs[0]} w={600}  eager cls="dg-d0" hint={SQ}   />}
      {imgs[1] && <Cell img={imgs[1]} w={600}        cls="dg-d1" hint={SQ}   />}
      {imgs[2] && <Cell img={imgs[2]} w={1200}       cls="dg-d2" hint={WIDE} />}
      {imgs[3] && <Cell img={imgs[3]} w={1200}       cls="dg-d3" hint={BIG}  />}
      {imgs[4] && <Cell img={imgs[4]} w={600}        cls="dg-d4" hint={SQ}   />}
      {imgs[5] && <Cell img={imgs[5]} w={600}        cls="dg-d5" hint={SQ}   />}
      {imgs[6] && <Cell img={imgs[6]} w={1200}       cls="dg-d6" hint={WIDE} />}
      {imgs[7] && <Cell img={imgs[7]} w={600}        cls="dg-d7" hint={SQ}   />}
      {imgs[8] && <Cell img={imgs[8]} w={1200}       cls="dg-d8" hint={WIDE} />}
      {imgs[9] && <Cell img={imgs[9]} w={600}        cls="dg-d9" hint={SQ}   />}
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
  const HINT = '500 × 1500 px · 1:3 ratio'
  return (
    <div className="dg-e">
      {imgs[0] && <Cell img={imgs[0]} w={600} eager hint={HINT} />}
      {imgs[1] && <Cell img={imgs[1]} w={600} hint={HINT} />}
      {imgs[2] && <Cell img={imgs[2]} w={600} hint={HINT} />}
      {imgs[3] && <Cell img={imgs[3]} w={600} hint={HINT} />}
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
