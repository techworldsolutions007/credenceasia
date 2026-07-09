'use client'

import {useState} from 'react'
import {Map, MapMarker, MapGeoJSON} from '@/components/ui/map'

type MapCountry = {
  name: string
  svgId?: string
}

type Props = {
  countries: MapCountry[]
  activeId?: string | null
  onActivate?: (id: string | null) => void
}

const COUNTRY_COORDS: Record<string, {lat: number; lng: number}> = {
  CHN: {lat: 33.0,  lng: 108.0},
  IND: {lat: 22.5,  lng: 78.9},
  BGD: {lat: 23.68, lng: 90.36},
  KHM: {lat: 12.57, lng: 104.99},
  MMR: {lat: 19.73, lng: 96.52},
  VNM: {lat: 16.0,  lng: 107.8},
}

// Hubs are rendered in addition to the country list so they always show
// even when Sanity has no country documents for them.
const HUBS = [
  {id: 'CPH', name: 'Copenhagen',  role: 'Design hub',   lat: 55.68, lng: 12.57},
  {id: 'HKG', name: 'Hong Kong',   role: 'Group HQ',     lat: 22.30, lng: 114.17},
]

// Natural Earth countries at 1:110m, served from jsdelivr.
// We use the 50m dataset so Hong Kong appears as a separate feature
// from China (110m absorbs HK into the China polygon).
const WORLD_GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_50m_admin_0_countries.geojson'

// ISO_A3 codes for production countries and hubs.
// Used by the MapGeoJSON match expressions below to paint these countries
// distinctly from the rest of the world.
const PRODUCTION_ISO = ['BGD', 'IND', 'CHN', 'VNM', 'KHM', 'MMR'] as const
const HQ_ISO         = ['HKG'] as const
const DESIGN_ISO     = ['DNK'] as const

const ALL_HIGHLIGHTED = [...PRODUCTION_ISO, ...HQ_ISO, ...DESIGN_ISO] as readonly string[]

// Viewport that frames Copenhagen, the Asian production cluster, and HK.
// Centred between Europe and East Asia so both ends are visible at one glance.
const INITIAL_VIEWPORT = {
  center: [70, 32] as [number, number],
  zoom: 2.1,
  bearing: 0,
  pitch: 0,
}

export default function AsiaProductionMap({countries, activeId, onActivate}: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null)

  // Build pin data. Production countries first, then the hubs.
  const productionPins = countries
    .filter((c) => c.svgId && COUNTRY_COORDS[c.svgId])
    .map((c) => ({
      id: c.svgId!,
      name: c.name,
      role: 'Production',
      lat: COUNTRY_COORDS[c.svgId!].lat,
      lng: COUNTRY_COORDS[c.svgId!].lng,
      kind: 'production' as const,
    }))

  const hubPins = HUBS.map((h) => ({
    id: h.id,
    name: h.name,
    role: h.role,
    lat: h.lat,
    lng: h.lng,
    kind: h.id === 'CPH' ? ('design' as const) : ('hq' as const),
  }))

  return (
    <div
      className="relative w-full overflow-hidden bg-cream/30"
      style={{height: 'clamp(360px, 50vw, 560px)', touchAction: 'pan-y'}}
    >
      <Map
        blank
        viewport={INITIAL_VIEWPORT}
        attributionControl={false}
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        touchPitch={false}
        boxZoom={false}
        keyboard={false}
        className="h-full w-full"
      >
        {/* Country shapes. Production countries painted leaf, HQ leaf,
            design hub clay, everything else subtle sage. */}
        <MapGeoJSON
          data={WORLD_GEOJSON_URL}
          fillPaint={{
            'fill-color': [
              'match',
              ['get', 'ISO_A3'],
              [...PRODUCTION_ISO], '#4F6F46',
              [...HQ_ISO],         '#4F6F46',
              [...DESIGN_ISO],     '#9A6B4F',
              '#A3A985',
            ],
            'fill-opacity': [
              'match',
              ['get', 'ISO_A3'],
              [...ALL_HIGHLIGHTED], 0.45,
              0.12,
            ],
          }}
          linePaint={{
            'line-color': [
              'match',
              ['get', 'ISO_A3'],
              [...ALL_HIGHLIGHTED], '#252421',
              '#6B4F3A',
            ],
            'line-opacity': [
              'match',
              ['get', 'ISO_A3'],
              [...ALL_HIGHLIGHTED], 0.55,
              0.18,
            ],
            'line-width': [
              'match',
              ['get', 'ISO_A3'],
              [...ALL_HIGHLIGHTED], 0.8,
              0.4,
            ],
          }}
        />

        {/* Production country markers */}
        {productionPins.map((pin) => (
          <MapMarker key={pin.id} longitude={pin.lng} latitude={pin.lat}>
            <PinElement
              pin={pin}
              isActive={activeId === pin.id}
              isHover={hoverId === pin.id}
              onClick={() => onActivate?.(activeId === pin.id ? null : pin.id)}
              onMouseEnter={() => setHoverId(pin.id)}
              onMouseLeave={() => setHoverId(null)}
            />
          </MapMarker>
        ))}

        {/* Hub markers, always visible */}
        {hubPins.map((pin) => (
          <MapMarker key={pin.id} longitude={pin.lng} latitude={pin.lat}>
            <PinElement
              pin={pin}
              isActive={activeId === pin.id}
              isHover={hoverId === pin.id}
              onClick={() => onActivate?.(activeId === pin.id ? null : pin.id)}
              onMouseEnter={() => setHoverId(pin.id)}
              onMouseLeave={() => setHoverId(null)}
            />
          </MapMarker>
        ))}
      </Map>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-4 bg-ivory/90 px-3 py-2 type-eyebrow text-charcoal/85 backdrop-blur-sm">
        <span className="inline-flex items-center gap-2">
          <span className="block h-2 w-2 rounded-full bg-soil" />
          Production
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="block h-2 w-2 rounded-full bg-leaf" />
          Group HQ
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="block h-2 w-2 rounded-full bg-clay" />
          Design hub
        </span>
      </div>
    </div>
  )
}

type PinProps = {
  pin: {id: string; name: string; role: string; kind: 'production' | 'hq' | 'design'}
  isActive: boolean
  isHover: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function PinElement({pin, isActive, isHover, onClick, onMouseEnter, onMouseLeave}: PinProps) {
  const color =
    pin.kind === 'hq'    ? 'bg-leaf border-leaf'  :
    pin.kind === 'design' ? 'bg-clay border-clay' :
                            'bg-soil border-soil'

  const ringColor =
    pin.kind === 'hq'    ? 'bg-leaf/25' :
    pin.kind === 'design' ? 'bg-clay/25' :
                            'bg-soil/25'

  const showLabel = isActive || isHover

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`${pin.name}, ${pin.role}`}
      aria-pressed={isActive}
      className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer focus-visible:outline-none"
    >
      {/* Outer pulse ring, only when active or hovered */}
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          showLabel ? `h-8 w-8 ${ringColor} animate-ping-slow` : 'h-0 w-0 opacity-0'
        }`}
      />

      {/* Core dot */}
      <span
        className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.5px] transition-all duration-300 ${color} ${
          isActive ? 'scale-125 shadow-[0_0_14px_rgba(79,111,70,0.5)]' : 'group-hover:scale-110'
        }`}
      >
        <span className="h-[5px] w-[5px] rounded-full bg-ivory/95" />
      </span>

      {/* Label */}
      {showLabel && (
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-charcoal px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-ivory shadow-lg">
          {pin.name}
          <span className="ml-2 text-clay">{pin.role}</span>
        </span>
      )}
    </button>
  )
}
