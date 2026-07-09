'use client'

import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import topologyData from 'world-atlas/countries-110m.json'
import {
  PRESENCE_MARKERS,
  ROLE_COLOR,
  ROLE_LABEL,
  LABEL_PLACEMENT,
  HIGHLIGHT_BY_ISO_NUMERIC,
} from '@/data/presence'
import type { MarkerRole } from '@/data/presence'

gsap.registerPlugin(ScrollTrigger)

// ─── Module-level: projection & path data computed once at load time ──────────

const W = 960
const H = 360
const VIEWBOX_PAD = 24
const MOBILE_QUERY = '(max-width: 639px)'

// Region we want visible: 25°W–150°E, 58°N–10°S (Western Europe → SE Asia).
const REGION = { west: -25, east: 150, south: -10, north: 58 }

// Bounding polygon fed to fitExtent. Two subtleties:
//
//   1. Winding: d3-geo interprets exterior rings with the interior on the LEFT
//      (walking along vertices in order). Going TL → TR → BR → BL puts the
//      interior on the left = our small rectangle. The reverse winding would be
//      interpreted as the complement — that's why the earlier version showed the
//      whole world.
//
//   2. Densification: d3-geo treats straight lines between polygon vertices as
//      great-circle geodesics. A single edge from (-25°, 58°N) to (150°, 58°N)
//      arcs way north toward the pole, which blew up path.bounds vertically and
//      left horizontal slack that let the Americas/Australia peek in. Sampling
//      the top and bottom edges every 5° keeps them on their parallel of latitude.
const BOUNDS_POLY = (() => {
  const ring: [number, number][] = []
  // Top edge west→east along 58°N (TL → TR)
  for (let lng = REGION.west; lng < REGION.east; lng += 5) ring.push([lng, REGION.north])
  ring.push([REGION.east, REGION.north])   // TR
  ring.push([REGION.east, REGION.south])   // BR
  // Bottom edge east→west along -10°S (BR → BL)
  for (let lng = REGION.east - 5; lng > REGION.west; lng -= 5) ring.push([lng, REGION.south])
  ring.push([REGION.west, REGION.south])   // BL
  ring.push([REGION.west, REGION.north])   // close to TL
  return {
    type: 'Feature' as const,
    geometry: { type: 'Polygon' as const, coordinates: [ring] },
    properties: {},
  }
})()

const projection = geoNaturalEarth1().fitExtent([[0, 0], [W, H]], BOUNDS_POLY)
const clippedProjection = geoNaturalEarth1().fitExtent([[0, 0], [W, H]], BOUNDS_POLY)
clippedProjection.clipExtent([[0, 0], [W, H]])
const pathGen = geoPath(projection)
const boundsPathGen = geoPath(clippedProjection)

type WorldTopo = Topology<{ countries: GeometryCollection; land: GeometryCollection }>
const topo = topologyData as unknown as WorldTopo

const ALL_FEATURES = (
  feature(topo, topo.objects.countries) as GeoJSON.FeatureCollection
).features
const LAND_FEATURES = (
  feature(topo, topo.objects.land) as GeoJSON.FeatureCollection
).features

// Compute paths once, skip anything that projects outside the canvas or clips to nothing.
type SvgBounds = [[number, number], [number, number]]
type LandPath = { d: string; bounds: SvgBounds }
type CountryPath = { d: string; role: MarkerRole; bounds: SvgBounds }

function toIsoNumeric(id: string | number | undefined): number {
  if (id === undefined) return NaN
  const n = typeof id === 'string' ? parseInt(id, 10) : id
  return Number.isFinite(n) ? n : NaN
}

function hasFiniteBounds(bounds: SvgBounds) {
  return bounds.every((pair) => pair.every(Number.isFinite))
}

function mergeBounds(paths: CountryPath[]): SvgBounds {
  return paths.reduce<SvgBounds>(
    (acc, path) => [
      [
        Math.min(acc[0][0], path.bounds[0][0]),
        Math.min(acc[0][1], path.bounds[0][1]),
      ],
      [
        Math.max(acc[1][0], path.bounds[1][0]),
        Math.max(acc[1][1], path.bounds[1][1]),
      ],
    ],
    [[Infinity, Infinity], [-Infinity, -Infinity]]
  )
}

function expandBounds(bounds: SvgBounds, pad: number): SvgBounds {
  return [
    [bounds[0][0] - pad, bounds[0][1] - pad],
    [bounds[1][0] + pad, bounds[1][1] + pad],
  ]
}

function formatViewBox(bounds: SvgBounds) {
  const width = bounds[1][0] - bounds[0][0]
  const height = bounds[1][1] - bounds[0][1]
  return `${bounds[0][0].toFixed(2)} ${bounds[0][1].toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)}`
}

function formatAspectRatio(bounds: SvgBounds) {
  const width = bounds[1][0] - bounds[0][0]
  const height = bounds[1][1] - bounds[0][1]
  return `${width.toFixed(2)} / ${height.toFixed(2)}`
}

const LAND_PATH: LandPath | null = (() => {
  const land = LAND_FEATURES[0]
  if (!land) return null
  const geo = land as Parameters<typeof pathGen>[0]
  const d = pathGen(geo)
  if (!d) return null
  const bounds = boundsPathGen.bounds(geo) as SvgBounds
  if (!hasFiniteBounds(bounds)) return null
  return { d, bounds }
})()

const COUNTRY_PATHS: CountryPath[] = ALL_FEATURES
  .map((f): CountryPath | null => {
    const geo = f as Parameters<typeof pathGen>[0]
    const d = pathGen(geo)
    if (!d) return null
    const bounds = boundsPathGen.bounds(geo) as SvgBounds
    if (!hasFiniteBounds(bounds)) return null
    const iso = toIsoNumeric(f.id as string | number | undefined)
    const role = HIGHLIGHT_BY_ISO_NUMERIC[iso]
    if (!role) return null
    return { d, role, bounds }
  })
  .filter((p): p is CountryPath => p !== null)

// Highlighted paths render on top so their stronger stroke wins at shared borders.
const HIGHLIGHT_PATHS = COUNTRY_PATHS

const MAP_BOUNDS = LAND_PATH?.bounds ?? mergeBounds(COUNTRY_PATHS)
const DESKTOP_VIEW_BOUNDS = expandBounds(MAP_BOUNDS, VIEWBOX_PAD)

// Mobile crop: pixel-x where 60°E lands in the full projection.
const MOBILE_X0 = Math.round((projection([60, 20]) ?? [W * 0.5, 0])[0])
const MOBILE_GEO_BOUNDS: SvgBounds = [
  [MOBILE_X0, MAP_BOUNDS[0][1]],
  [MAP_BOUNDS[1][0], MAP_BOUNDS[1][1]],
]
const MOBILE_VIEW_BOUNDS = expandBounds(MOBILE_GEO_BOUNDS, VIEWBOX_PAD)

function subscribeToMobileQuery(callback: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getMobileSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
}

function getServerMobileSnapshot() {
  return false
}

// ─── Marker geometry helpers ──────────────────────────────────────────────────

const HALO_R  = 7   // halo ring radius (was 12 — now capped per spec)
const DOT_R   = 5

function makeLeader(dx: number, dy: number): { x1: number; y1: number; x2: number; y2: number } | null {
  const dist = Math.hypot(dx, dy)
  if (dist <= 10) return null
  const cos = dx / dist
  const sin = dy / dist
  return {
    x1: HALO_R * cos,          // start at halo edge
    y1: HALO_R * sin,
    x2: dx - 3 * cos,          // end ~3 px before label anchor
    y2: dy - 3 * sin,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PresenceMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getServerMobileSnapshot
  )

  // Copenhagen sits west of the mobile crop; hide it on mobile and surface it
  // in the text note above the map instead.
  const projectedMarkers = useMemo(
    () => PRESENCE_MARKERS
      .filter((m) => !(isMobile && m.id === 'CPH'))
      .map((m) => {
        const pt = projection([m.lng, m.lat])
        if (!pt) return null
        return { ...m, x: pt[0], y: pt[1] }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null),
    [isMobile]
  )

  const viewBounds = isMobile ? MOBILE_VIEW_BOUNDS : DESKTOP_VIEW_BOUNDS
  const geoBounds = isMobile ? MOBILE_GEO_BOUNDS : MAP_BOUNDS
  const viewBox = formatViewBox(viewBounds)
  const aspectRatio = formatAspectRatio(viewBounds)
  const clipRect = {
    x: geoBounds[0][0],
    y: geoBounds[0][1],
    width: geoBounds[1][0] - geoBounds[0][0],
    height: geoBounds[1][1] - geoBounds[0][1],
  }

  // GSAP scroll-triggered animation. Runs after hydration so the marker
  // positions in the DOM match the projected coordinates (no pop-from-origin).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const st = { trigger: containerRef.current, start: 'top 75%', once: true }

      // 1. Land: fade in with a whisper of scale
      gsap.from('.pm-land, .pm-highlight', {
        opacity: 0,
        scale: 0.985,
        transformOrigin: '50% 50%',
        duration: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: st,
      })

      // 2. Core dots pop after land settles
      gsap.from('.pm-dot', {
        scale: 0,
        opacity: 0,
        transformOrigin: '0px 0px',
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 0.85,
        scrollTrigger: st,
      })

      // 3. Halo rings expand (0.6 → 1)
      gsap.from('.pm-halo', {
        scale: 0.6,
        opacity: 0,
        transformOrigin: '0px 0px',
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.9,
        scrollTrigger: st,
      })

      // 4. Leader lines fade in with their dot
      gsap.from('.pm-leader', {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.9,
        scrollTrigger: st,
      })

      // 5. Labels fade up
      gsap.from('.pm-label', {
        y: 6,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.95,
        scrollTrigger: st,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  const clipId = 'pm-clip'
  const landFadeId = 'pm-land-fade'
  const landMaskId = 'pm-land-mask'

  return (
    <div ref={containerRef} className="mx-auto max-w-[960px] text-charcoal">
      {/* Mobile-only text note surfacing Copenhagen off-map */}
      {isMobile && (
        <p className="mx-auto mb-3 max-w-[18rem] px-4 text-center type-eyebrow text-clay/80">
          + Copenhagen design hub, managed from Hong Kong
        </p>
      )}

      {/* Aspect-ratio wrapper prevents layout shift */}
      <div style={{ aspectRatio: aspectRatio }} className="w-full">
        <svg
          viewBox={viewBox}
          aria-label="Map showing Credence Asia production presence from Europe through Southeast Asia"
          role="img"
          className="h-full w-full"
        >
          <defs>
            {/* Crop at the padded viewBox edge without drawing artificial border lines. */}
            <clipPath id={clipId}>
              <rect
                x={clipRect.x}
                y={clipRect.y}
                width={clipRect.width}
                height={clipRect.height}
              />
            </clipPath>
            <linearGradient
              id={landFadeId}
              x1="0"
              y1={clipRect.y}
              x2="0"
              y2={clipRect.y + 40}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="black" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
            <mask
              id={landMaskId}
              x={clipRect.x}
              y={clipRect.y}
              width={clipRect.width}
              height={clipRect.height}
              maskUnits="userSpaceOnUse"
            >
              <rect
                x={clipRect.x}
                y={clipRect.y}
                width={clipRect.width}
                height={clipRect.height}
                fill="white"
              />
              <rect
                x={clipRect.x}
                y={clipRect.y}
                width={clipRect.width}
                height={40}
                fill={`url(#${landFadeId})`}
              />
            </mask>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            {/* ── Base landmass: one silhouette, no internal country borders */}
            <g className="pm-land">
              {LAND_PATH && (
                <path
                  d={LAND_PATH.d}
                  mask={`url(#${landMaskId})`}
                  fill="currentColor"
                  fillOpacity={0.045}
                  stroke="currentColor"
                  strokeWidth={0.6}
                  strokeOpacity={0.25}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
            </g>

            {/* ── Presence countries: the only individual country outlines */}
            <g className="pm-highlight">
              {HIGHLIGHT_PATHS.map((p, i) => (
                <path
                  key={`h${i}`}
                  d={p.d}
                  fill={ROLE_COLOR[p.role as MarkerRole]}
                  fillOpacity={0.09}
                  stroke="currentColor"
                  strokeWidth={0.7}
                  strokeOpacity={0.45}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
            </g>
          </g>

          {/* ── Markers (rendered above clip so labels can extend anywhere) ── */}
          {projectedMarkers.map((m) => {
            const color = ROLE_COLOR[m.role]
            const place = LABEL_PLACEMENT[m.labelSide]
            const dx = place.dx + (m.labelOffset?.[0] ?? 0)
            const dy = place.dy + (m.labelOffset?.[1] ?? 0)
            const leader = makeLeader(dx, dy)

            return (
              <g key={m.id} transform={`translate(${m.x.toFixed(2)}, ${m.y.toFixed(2)})`}>
                {leader && (
                  <line
                    className="pm-leader"
                    x1={leader.x1} y1={leader.y1}
                    x2={leader.x2} y2={leader.y2}
                    stroke="currentColor"
                    strokeWidth={0.5}
                    strokeOpacity={0.3}
                  />
                )}
                {/* Halo — 14px diameter, 15% opacity of role color */}
                <circle
                  className="pm-halo"
                  r={HALO_R}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.15}
                />
                {/* Core dot */}
                <circle
                  className="pm-dot"
                  r={DOT_R}
                  fill={color}
                />
                {/* Label — 10.5px uppercase, 75% ink, no overlap */}
                <text
                  className="pm-label"
                  x={dx}
                  y={dy}
                  fontSize={10.5}
                  textAnchor={place.anchor}
                  dominantBaseline={place.baseline}
                  fill="currentColor"
                  fillOpacity={0.75}
                  style={{
                    fontFamily: 'inherit',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {m.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Legend — 40px below map, centered ── */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        {(Object.entries(ROLE_LABEL) as [MarkerRole, string][]).map(([role, label]) => (
          <span
            key={role}
            className="inline-flex items-center gap-2 type-eyebrow text-charcoal/60"
          >
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: ROLE_COLOR[role] }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
