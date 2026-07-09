'use client'

import {useMemo, useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {ComposableMap, Geographies, Geography} from 'react-simple-maps'

// TopoJSON world country outlines at 110m resolution (bundled locally)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const GEO_DATA = require('world-atlas/countries-110m.json') as Record<string, unknown>

// ─── Coordinate system ────────────────────────────────────────────────────────
//
// Both the ComposableMap projection and our project() function share the same
// 800 × 400 equirectangular space:
//   x = (lng + 180) × (800 / 360)
//   y = (90  - lat) × (400 / 180)
//
// react-simple-maps v3 with projection="geoEquirectangular", scale=800/(2π),
// width=800, height=400 internally calls:
//   projection.scale(800/(2π)).translate([400, 200])
// which produces identical output to the formulas above. ✓

// ─── Asia-focused crop window ─────────────────────────────────────────────────
//   Longitude  −36° → 153°   (UK/Europe through East Asia)
//   Latitude    −8° → 86°    (South Asia through Arctic)
const VB = {x: 320, y: 8, w: 420, h: 210} as const

// CSS scaling to show exactly the VB region inside the container.
// Both dimensions scale by the same factor (2:1 aspect matches 800×400 ÷ VB 2:1).
const SCALE   = 800 / VB.w               // ≈ 1.905
const BG_W    = SCALE * 100              // % of container width  ≈ 190.5 %
const BG_H    = SCALE * 100              // % of container height ≈ 190.5 %
const BG_LEFT = -(VB.x / 800) * BG_W    // % left offset          ≈ −76.2 %
const BG_TOP  = -(VB.y / 400) * BG_H    // % top  offset          ≈  −3.8 %

// ─── Types ────────────────────────────────────────────────────────────────────
interface MapPoint { lat: number; lng: number; label?: string }
interface MapDot   { start: MapPoint; end: MapPoint }

interface WorldMapProps {
  dots?:        MapDot[]
  lineColor?:   string   // arc + pin colour
  bgColor?:     string   // ocean / background
  landColor?:   string   // country fill
  borderColor?: string   // country border stroke
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function project(lat: number, lng: number) {
  return {
    x: (lng + 180) * (800 / 360),
    y: (90  - lat) * (400 / 180),
  }
}

function curvedPath(start: MapPoint, end: MapPoint) {
  const s = project(start.lat, start.lng)
  const e = project(end.lat,   end.lng)
  const cx = (s.x + e.x) / 2
  const cy = Math.min(s.y, e.y) - 50      // arc apex above the straight line
  return `M ${s.x} ${s.y} Q ${cx} ${cy} ${e.x} ${e.y}`
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function WorldMap({
  dots        = [],
  lineColor   = '#4F6F46',
  bgColor     = '#EFE6D8',
  landColor   = '#DDD4BE',
  borderColor = '#C4A87A',
}: WorldMapProps) {
  const [tooltip, setTooltip] = useState<{
    label: string; xPct: number; yPct: number
  } | null>(null)

  // One pin per unique geographic point across all connections
  const uniquePoints = useMemo(() => {
    const seen = new Set<string>()
    return dots
      .flatMap((d) => [d.start, d.end])
      .filter((p) => {
        const key = `${p.lat},${p.lng}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
  }, [dots])

  function showTooltip(pt: MapPoint) {
    if (!pt.label) return
    const {x, y} = project(pt.lat, pt.lng)
    setTooltip({
      label: pt.label,
      xPct: (x - VB.x) / VB.w,
      yPct: (y - VB.y) / VB.h,
    })
  }

  return (
    <div
      className="relative aspect-[2/1] w-full select-none overflow-hidden"
      style={{backgroundColor: bgColor}}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* ── Background: country outline map, CSS-cropped to Asia region ────── */}
      <div
        className="pointer-events-none absolute"
        style={{
          width:  `${BG_W}%`,
          height: `${BG_H}%`,
          left:   `${BG_LEFT}%`,
          top:    `${BG_TOP}%`,
        }}
      >
        <ComposableMap
          projection="geoEquirectangular"
          projectionConfig={{
            scale:  800 / (2 * Math.PI),   // aligns with project() formula
            center: [0, 0],
          }}
          width={800}
          height={400}
          style={{width: '100%', height: '100%', display: 'block'}}
        >
          <Geographies geography={GEO_DATA}>
            {({geographies}) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={landColor}
                  stroke={borderColor}
                  strokeWidth={0.35}
                  strokeLinejoin="round"
                  tabIndex={-1}
                  style={{
                    default: {outline: 'none'},
                    hover:   {outline: 'none', fill: landColor},
                    pressed: {outline: 'none'},
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Edge fade blends the map into the section background top and bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            ${bgColor} 0%,
            transparent 10%,
            transparent 90%,
            ${bgColor} 100%)`,
        }}
      />

      {/* ── SVG overlay: animated arcs + location pins ────────────────────── */}
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Credence Asia global production network"
      >
        <defs>
          {/* Arc line fades at both ends so it blends with the map edges */}
          <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={bgColor}   stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={bgColor}   stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connection arcs draw in on scroll, one after another */}
        {dots.map((dot, i) => (
          <motion.path
            key={`arc-${i}`}
            d={curvedPath(dot.start, dot.end)}
            fill="none"
            stroke="url(#arc-grad)"
            strokeWidth="1.1"
            style={{pointerEvents: 'none'}}
            initial={{pathLength: 0}}
            whileInView={{pathLength: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 1.5, delay: 0.15 * i, ease: 'easeOut'}}
          />
        ))}

        {/* Location pins, deduplicated, staggered pulse rings */}
        {uniquePoints.map((pt, i) => {
          const {x, y} = project(pt.lat, pt.lng)
          const isActive = tooltip?.label === pt.label

          return (
            <g
              key={`pin-${i}`}
              onMouseEnter={() => showTooltip(pt)}
              onMouseLeave={() => setTooltip(null)}
              style={{cursor: pt.label ? 'pointer' : 'default'}}
            >
              {/* Expanding pulse ring */}
              <circle cx={x} cy={y} r="3" fill={lineColor} opacity="0.3">
                <animate
                  attributeName="r"
                  from="3" to="12"
                  dur="2.2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.3" to="0"
                  dur="2.2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Solid dot grows on hover */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 5 : 3}
                fill={lineColor}
                opacity={isActive ? 1 : 0.9}
              />

              {/* Transparent hit area, generous for easy hover */}
              <circle cx={x} cy={y} r="12" fill="transparent" />
            </g>
          )
        })}
      </svg>

      {/* ── Country label tooltip ─────────────────────────────────────────── */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={tooltip.label}
            className="pointer-events-none absolute z-20 flex flex-col items-center"
            style={{
              // Clamp horizontally so labels near edges don't clip
              left:      `${Math.min(Math.max(tooltip.xPct * 100, 8), 92)}%`,
              top:       `${tooltip.yPct * 100}%`,
              transform: 'translate(-50%, calc(-100% - 14px))',
            }}
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 4}}
            transition={{duration: 0.15, ease: 'easeOut'}}
          >
            {/* Label chip */}
            <div
              className="whitespace-nowrap px-3 py-[5px] text-[10px] font-medium uppercase tracking-[0.2em] text-ivory shadow-md"
              style={{backgroundColor: '#252421'}}
            >
              {tooltip.label}
            </div>
            {/* Stem connecting label to pin */}
            <div
              className="h-3 w-px"
              style={{backgroundColor: '#252421', opacity: 0.65}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
