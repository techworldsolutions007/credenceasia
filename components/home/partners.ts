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

// ─── 18 approved logos from /assets/logos/customers/2 ───────────────────────
export const PARTNERS: Partner[] = [
  {name: 'Partner Brand 1',  src: '/assets/logos/customers/2/1.png', ...WM},
  {name: 'Partner Brand 2',  src: '/assets/logos/customers/2/2.png', ...WM},
  {name: 'Partner Brand 3',  src: '/assets/logos/customers/2/3.png', ...WM},
  {name: 'Partner Brand 4',  src: '/assets/logos/customers/2/4.png', ...WM},
  {name: 'Partner Brand 5',  src: '/assets/logos/customers/2/5.png', ...WM},
  {name: 'Partner Brand 6',  src: '/assets/logos/customers/2/6.png', ...WM},
  {name: 'Partner Brand 7',  src: '/assets/logos/customers/2/7.png', ...WM},
  {name: 'Partner Brand 8',  src: '/assets/logos/customers/2/8.png', ...WM},
  {name: 'Partner Brand 9',  src: '/assets/logos/customers/2/9.png', ...WM},
  {name: 'Partner Brand 10', src: '/assets/logos/customers/2/10.png', ...WM},
  {name: 'Partner Brand 11', src: '/assets/logos/customers/2/11.png', ...WM},
  {name: 'Partner Brand 12', src: '/assets/logos/customers/2/12.png', ...WM},
  {name: 'Partner Brand 13', src: '/assets/logos/customers/2/13.png', ...WM},
  {name: 'Partner Brand 14', src: '/assets/logos/customers/2/14.png', ...WM},
  {name: 'Partner Brand 15', src: '/assets/logos/customers/2/15.png', ...WM},
  {name: 'Partner Brand 16', src: '/assets/logos/customers/2/16.png', ...WM},
  {name: 'Partner Brand 17', src: '/assets/logos/customers/2/17.png', ...WM},
  {name: 'Partner Brand 18', src: '/assets/logos/customers/2/18.png', ...WM},
]

/** Grid shows fallback text instead of an empty/sparse grid below this count */
export const MIN_GRID_COUNT = 4

export const FALLBACK_TRUST_LINE =
  'Trusted by leading European and North American retailers and brands.'
