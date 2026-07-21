/**
 * Approved partner logos for the "global brands" section.
 * Add / remove entries here to control what renders on the site.
 * Component reads this array — no other file needs editing.
 *
 * All current assets: 320 × 80 px (4:1 wordmark).
 */

export type Partner = {
  /** Display name — used as <img> alt text */
  name: string
  /** Path under /public */
  src: string
  /** Drives optical-normalisation sizing */
  shape: 'wordmark' | 'symbol'
  /** Real PNG dimensions — prevents CLS via next/image */
  intrinsic: {w: number; h: number}
  /** Optional outbound link; renders an accessible <a> when set */
  url?: string
}

const WM: Pick<Partner, 'shape' | 'intrinsic'> = {
  shape: 'wordmark',
  intrinsic: {w: 320, h: 80},
}

// ─── 10 approved logos (all 320 × 80 wordmarks) ──────────────────────────────
export const PARTNERS: Partner[] = [
  {name: 'CLAAS',                src: '/assets/logos/customers/11.png', ...WM},
  {name: 'STIHL',                src: '/assets/logos/customers/12.png', ...WM},
  {name: 'MUFTI',                src: '/assets/logos/customers/13.png', ...WM},
  {name: 'Volkswagen',           src: '/assets/logos/customers/14.png', ...WM},
  {name: 'Five Seasons',         src: '/assets/logos/customers/15.png', ...WM},
  {name: 'BALILAB',              src: '/assets/logos/customers/16.png', ...WM},
  {name: 'World Wide Sportsman', src: '/assets/logos/customers/17.png', ...WM},
  {name: 'Superdry',             src: '/assets/logos/customers/18.png', ...WM},
  {name: 'Läderach',             src: '/assets/logos/customers/19.png', ...WM},
  {name: 'MASCOT',               src: '/assets/logos/customers/20.png', ...WM},
]

/** Grid shows fallback text instead of an empty/sparse grid below this count */
export const MIN_GRID_COUNT = 4

export const FALLBACK_TRUST_LINE =
  'Trusted by leading European and North American retailers and brands.'
