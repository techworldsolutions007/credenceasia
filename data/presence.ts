export type MarkerRole = 'production' | 'group-hq' | 'design-hub'

export type LabelSide =
  | 'right' | 'left' | 'top' | 'bottom'
  | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface PresenceMarker {
  id: string
  name: string
  role: MarkerRole
  lat: number
  lng: number
  note: string
  /** Which direction the label leaves the dot; per-marker collision avoidance. */
  labelSide: LabelSide
  /** Optional fine-tune [dx, dy] added on top of side placement. */
  labelOffset?: [number, number]
}

export const PRESENCE_MARKERS: PresenceMarker[] = [
  { id: 'NYC', name: 'New York',   role: 'design-hub',
    lat: 40.71, lng: -74.01,
    note: 'Design hub on the East Coast.',
    labelSide: 'right' },
  { id: 'CPH', name: 'Copenhagen', role: 'design-hub',
    lat: 55.68, lng: 12.57,
    note: 'Color, print, graphics, silhouette and washing research.',
    labelSide: 'right' },
  { id: 'HKG', name: 'Hong Kong',  role: 'group-hq',
    lat: 22.30, lng: 114.17,
    note: 'Sourcing, costing, sample coordination.',
    labelSide: 'right' },
  { id: 'BGD', name: 'Bangladesh', role: 'production',
    lat: 23.68, lng: 90.36,
    note: '36 lines, 3,000 machines, 3,700 employees.',
    labelSide: 'top-left' },
  { id: 'IND', name: 'India', role: 'production',
    lat: 21.15, lng: 79.09,
    note: 'Activewear, tops and beachwear. 350+ machines.',
    labelSide: 'bottom-left' },
  { id: 'CHN', name: 'China',      role: 'production',
    lat: 36.0,  lng: 105.0,
    note: '200 machines, 400 workers.',
    labelSide: 'top-right' },
  { id: 'MMR', name: 'Myanmar',    role: 'production',
    lat: 19.73, lng: 96.52,
    note: 'Cut-and-sew capacity through audited partners.',
    labelSide: 'bottom-left' },
  { id: 'KHM', name: 'Cambodia',   role: 'production',
    lat: 12.57, lng: 104.99,
    note: 'Casual and uniform-grade garment manufacturing.',
    labelSide: 'bottom-right' },
  { id: 'VNM', name: 'Vietnam',    role: 'production',
    lat: 16.0,  lng: 107.8,
    note: 'Scalable cut-and-sew capacity.',
    labelSide: 'right' },
]

/** Base (dx, dy) plus SVG text anchor + baseline per side.
 *  Offsets are in SVG viewBox units, leaving room for a leader line + gap. */
export const LABEL_PLACEMENT: Record<LabelSide, {
  dx: number
  dy: number
  anchor: 'start' | 'middle' | 'end'
  baseline: 'auto' | 'central' | 'hanging'
}> = {
  'right':        { dx:  22, dy:   0, anchor: 'start',  baseline: 'central' },
  'left':         { dx: -22, dy:   0, anchor: 'end',    baseline: 'central' },
  'top':          { dx:   0, dy: -18, anchor: 'middle', baseline: 'auto'    },
  'bottom':       { dx:   0, dy:  20, anchor: 'middle', baseline: 'hanging' },
  'top-right':    { dx:  16, dy: -14, anchor: 'start',  baseline: 'auto'    },
  'top-left':     { dx: -16, dy: -14, anchor: 'end',    baseline: 'auto'    },
  'bottom-right': { dx:  16, dy:  16, anchor: 'start',  baseline: 'hanging' },
  'bottom-left':  { dx: -16, dy:  16, anchor: 'end',    baseline: 'hanging' },
}

export const ROLE_COLOR: Record<MarkerRole, string> = {
  production:   '#57694A', // leaf green — manufacturing countries
  'group-hq':   '#37475E', // navy — Hong Kong HQ
  'design-hub': '#53637E', // slate blue — Copenhagen design
}

export const ROLE_LABEL: Record<MarkerRole, string> = {
  production:   'Production',
  'group-hq':   'Marketing & Finance',
  'design-hub': 'Design Hub',
}

/** ISO 3166-1 numeric codes of countries where we have presence.
 *  world-atlas 110m stores feature IDs as ISO numeric strings; we parse to number. */
export const HIGHLIGHT_BY_ISO_NUMERIC: Record<number, MarkerRole> = {
  50:  'production',   // Bangladesh
  104: 'production',   // Myanmar
  116: 'production',   // Cambodia
  156: 'production',   // China
  208: 'design-hub',   // Denmark
  356: 'production',   // India
  704: 'production',   // Vietnam
  840: 'design-hub',   // United States (New York)
}
