'use client'

import {useState, useEffect, useRef, useCallback} from 'react'
import Image from 'next/image'

// ── Design constants (from Lookbook.dc.html) ──────────────────────────────────
const HINTS  = ['jacket','jeans','tshirt','swim shorts','outerwear','knitwear','shirt','shorts','denim','tee','coat','trousers']
const AR     = ['3 / 4','1 / 1','4 / 5','2 / 3','3 / 4','1 / 1','2 / 3','4 / 5','3 / 4','3 / 4','1 / 1','2 / 3']
const PACKED = [[2,5],[1,3],[1,4],[1,3],[2,4],[1,4],[1,3],[2,5],[1,4],[1,3],[1,3],[2,4]] as const
const RADII  = ['999px 999px 16px 16px','16px','999px','16px 999px 999px 16px','999px 16px 999px 16px','16px','999px 999px 16px 16px','999px','16px','16px 16px 999px 999px','999px 16px 16px 999px','16px']
const TILT   = [-1.8,1.2,-0.7,2.1,-1.4,0.8,-2.3,1.6,-1,1.9,-1.6,1.1]
const LEAD   = [0,74,26,110,48,92]
const RATE   = [1,-0.62,0.44,-1,0.72,-0.5]

const ACCENT   = '#e8542f'
const COUNT    = 24
const TILE_MIN = 240
const GAP      = 16
const FUNK     = 1.0

// ── Image mapping to public assets ────────────────────────────────────────────
const IMG_MAP: Record<string, string> = {
  jacket:        '/assets/collection/outerwear.png',
  jeans:         '/assets/collection/denim.png',
  tshirt:        '/assets/collection/casualwear.png',
  'swim shorts': '/assets/collection/beachwear.png',
  outerwear:     '/assets/collection/outerwear.png',
  knitwear:      '/assets/collection/knits.png',
  shirt:         '/assets/collection/woven.png',
  shorts:        '/assets/collection/casualwear.png',
  denim:         '/assets/collection/denim.png',
  tee:           '/assets/collection/casualwear.png',
  coat:          '/assets/collection/outerwear.png',
  trousers:      '/assets/collection/woven.png',
}

type Layout = 'cascade' | 'shapes' | 'packed' | 'uniform'

interface Slot {
  id: string
  hint: string
  ar: string
  cs: number
  rs: number
  radius: string
  tilt: number
  ox: number
  oy: number
  accent: string
  src: string
}

// Build slot data once (stable across renders)
const SLOTS: Slot[] = Array.from({length: COUNT}, (_, i) => {
  const p    = PACKED[i % PACKED.length]
  const hot  = i % 5 === 2
  const hint = HINTS[i % HINTS.length]
  return {
    id:     `look-${String(i + 1).padStart(3, '0')}`,
    hint,
    ar:     AR[i % AR.length],
    cs:     p[0],
    rs:     p[1],
    radius: RADII[i % RADII.length],
    tilt:   +(TILT[i % TILT.length] * FUNK).toFixed(2),
    ox:     hot ? Math.round(12 * FUNK) : 0,
    oy:     hot ? Math.round(14 * FUNK) : 0,
    accent: hot ? ACCENT : 'rgba(0,0,0,.05)',
    src:    IMG_MAP[hint] ?? '/assets/collection/casualwear.png',
  }
})

const LAYOUTS: {id: Layout; label: string}[] = [
  {id: 'cascade', label: 'Cascade'},
  {id: 'shapes',  label: 'Shapes' },
  {id: 'packed',  label: 'Packed' },
  {id: 'uniform', label: 'Uniform'},
]

// ── Main component ─────────────────────────────────────────────────────────────
export default function LookbookGrid() {
  const [layout, setLayout] = useState<Layout>('cascade')
  const [cols,   setCols  ] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)
  const cascadeRef   = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>(0)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.clientWidth || window.innerWidth
    const n = Math.max(2, Math.min(7, Math.floor(w / TILE_MIN)))
    setCols(prev => prev !== n ? n : prev)
  }, [])

  useEffect(() => {
    measure()
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  // Scroll parallax — cascade only
  useEffect(() => {
    if (layout !== 'cascade') return
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const el = cascadeRef.current
        if (!el) return
        const p = Math.min(1, (document.scrollingElement || document.documentElement).scrollTop / 900)
        for (let k = 0; k < el.children.length; k++) {
          (el.children[k] as HTMLElement).style.transform =
            `translate3d(0,${(RATE[k % RATE.length] * 84 * p).toFixed(1)}px,0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [layout])

  const rowUnit = Math.round(TILE_MIN * 0.34)

  // Build cascade columns
  const columns: {lead: number; items: Slot[]}[] = Array.from({length: cols}, (_, c) => ({
    lead:  Math.round(LEAD[c % LEAD.length] * (0.35 + 0.65 * FUNK)),
    items: [] as Slot[],
  }))
  SLOTS.forEach((s, i) => columns[i % cols].items.push(s))

  return (
    <div ref={containerRef} style={{padding: 'clamp(8px,1.6vw,26px)'}}>
      {/* Layout switcher */}
      <div style={{display: 'flex', gap: '6px', marginBottom: '36px', justifyContent: 'center', flexWrap: 'wrap'}}>
        {LAYOUTS.map(l => (
          <button
            key={l.id}
            onClick={() => setLayout(l.id)}
            style={{
              padding: '7px 20px',
              fontSize: '10.5px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              border: layout === l.id ? '1px solid #252421' : '1px solid rgba(37,36,33,0.22)',
              background: layout === l.id ? '#252421' : 'transparent',
              color: layout === l.id ? '#f4f1ea' : 'rgba(37,36,33,0.55)',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Cascade */}
      {layout === 'cascade' && (
        <div ref={cascadeRef} style={{display: 'flex', alignItems: 'flex-start', gap: `${GAP}px`}}>
          {columns.map((col, ci) => (
            <div
              key={ci}
              style={{flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${GAP}px`, marginTop: `${col.lead}px`, willChange: 'transform'}}
            >
              {col.items.map(slot => <CascadeItem key={slot.id} slot={slot} />)}
            </div>
          ))}
        </div>
      )}

      {/* Shapes */}
      {layout === 'shapes' && (
        <div style={{display: 'grid', gap: `${GAP}px`, gridAutoFlow: 'dense', gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_MIN}px, 1fr))`, gridAutoRows: `${rowUnit}px`}}>
          {SLOTS.map(slot => <GridItem key={slot.id} slot={slot} mode="shapes" />)}
        </div>
      )}

      {/* Packed */}
      {layout === 'packed' && (
        <div style={{display: 'grid', gap: `${GAP}px`, gridAutoFlow: 'dense', gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_MIN}px, 1fr))`, gridAutoRows: `${rowUnit}px`}}>
          {SLOTS.map(slot => <GridItem key={slot.id} slot={slot} mode="packed" />)}
        </div>
      )}

      {/* Uniform */}
      {layout === 'uniform' && (
        <div style={{display: 'grid', gap: `${GAP}px`, gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_MIN}px, 1fr))`}}>
          {SLOTS.map(slot => <UniformItem key={slot.id} slot={slot} />)}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CascadeItem({slot}: {slot: Slot}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        transform: hovered ? 'rotate(0deg) scale(1.05)' : `rotate(${slot.tilt}deg)`,
        zIndex: hovered ? 5 : 'auto',
        transition: 'transform 0.55s cubic-bezier(.16,.9,.2,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent offset shape */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: slot.radius,
        background: slot.accent,
        transform: `translate(${slot.ox}px, ${slot.oy}px)`,
      }} />
      {/* Image */}
      <div style={{
        position: 'relative',
        aspectRatio: slot.ar,
        overflow: 'hidden',
        borderRadius: hovered ? '8px' : slot.radius,
        background: 'rgba(0,0,0,.05)',
        filter: hovered ? 'saturate(1.15) contrast(1.08)' : 'saturate(0.94) contrast(1.04)',
        boxShadow: hovered ? `0 26px 60px -26px ${ACCENT}` : 'none',
        transition: 'filter 0.55s, border-radius 0.55s, box-shadow 0.55s',
      }}>
        <Image src={slot.src} alt={slot.hint} fill style={{objectFit: 'cover'}} sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
    </div>
  )
}

function GridItem({slot, mode}: {slot: Slot; mode: 'shapes' | 'packed'}) {
  const [hovered, setHovered] = useState(false)
  const isShapes = mode === 'shapes'
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: hovered ? '6px' : (isShapes ? slot.radius : '10px'),
        background: isShapes ? slot.accent : 'rgba(0,0,0,.04)',
        gridColumn: `span ${slot.cs}`,
        gridRow: `span ${slot.rs}`,
        transform: hovered ? (isShapes ? 'scale(1.03) rotate(-1deg)' : 'scale(1.02)') : 'none',
        zIndex: hovered ? 5 : 'auto',
        transition: isShapes
          ? 'transform 0.5s cubic-bezier(.2,.8,.2,1), border-radius 0.5s'
          : 'transform 0.45s cubic-bezier(.2,.7,.2,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={slot.src} alt={slot.hint} fill style={{objectFit: 'cover'}} sizes="(max-width: 768px) 50vw, 25vw" />
    </div>
  )
}

function UniformItem({slot}: {slot: Slot}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
        borderRadius: '10px',
        background: 'rgba(0,0,0,.04)',
        transform: hovered ? 'scale(1.02)' : 'none',
        zIndex: hovered ? 5 : 'auto',
        transition: 'transform 0.45s cubic-bezier(.2,.7,.2,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={slot.src} alt={slot.hint} fill style={{objectFit: 'cover'}} sizes="(max-width: 768px) 50vw, 25vw" />
    </div>
  )
}
