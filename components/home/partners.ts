/**
 * Approved partner logos for the "global brands" section.
 * Add / remove entries here to control what renders on the site.
 * Component reads this array — no other file needs editing.
 *
 * All current assets: 1000 × 250 px (4:1 wordmark).
 * When 15.png, 17.png, 18.png are ready, append them below.
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
  intrinsic: {w: 1000, h: 250},
}

// ─── 15 approved logos (all 1000 × 250 wordmarks) ────────────────────────────
// Files 15.png · 17.png · 18.png not yet in /public — add entries when ready.
export const PARTNERS: Partner[] = [
  {name: 'Liberte Essentiel', src: '/assets/logos/customers/1.png',  ...WM},
  {name: "co'couture",        src: '/assets/logos/customers/2.png',  ...WM},
  {name: 'rosemunde',         src: '/assets/logos/customers/3.png',  ...WM},
  {name: 'FREE/QUENT',        src: '/assets/logos/customers/4.png',  ...WM},
  {name: 'Herff Jones',       src: '/assets/logos/customers/5.png',  ...WM},
  {name: 'Walmart',           src: '/assets/logos/customers/6.png',  ...WM},
  {name: 'BMW',               src: '/assets/logos/customers/7.png',  ...WM},
  {name: 'COVERSTORY',        src: '/assets/logos/customers/8.png',  ...WM},
  {name: 'NEO NOIR',          src: '/assets/logos/customers/9.png',  ...WM},
  {name: 'U.S. Polo Assn.',   src: '/assets/logos/customers/10.png', ...WM},
  {name: 'CLAAS',             src: '/assets/logos/customers/11.png', ...WM},
  {name: 'STIHL',             src: '/assets/logos/customers/12.png', ...WM},
  {name: 'MUFTI',             src: '/assets/logos/customers/13.png', ...WM},
  {name: 'Volkswagen',        src: '/assets/logos/customers/14.png', ...WM},
  {name: 'BALILAB',           src: '/assets/logos/customers/16.png', ...WM},
  // Add when files are ready:
  // {name: 'TJX',    src: '/assets/logos/customers/15.jpeg', ...WM},
  // {name: '???',    src: '/assets/logos/customers/17.jpeg', ...WM},
  // {name: '???',    src: '/assets/logos/customers/18.jpeg', ...WM},
]

/** Grid shows fallback text instead of an empty/sparse grid below this count */
export const MIN_GRID_COUNT = 4

export const FALLBACK_TRUST_LINE =
  'Trusted by leading European and North American retailers and brands.'
