# Credence Asia Group — Product Requirements Document

**Project:** Corporate website rebuild  
**Owner:** Credence Asia Group, Hong Kong  
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Sanity CMS v5 · GSAP 3 · Lenis  
**Status:** In active development  
**Last updated:** 2026-07-02

---

## 1. Business Context

Credence Asia Group is a B2B apparel sourcing and production company founded in 2016 in Hong Kong. They connect European and American brands with Asian manufacturing across Bangladesh, India, China, Vietnam, Cambodia, and Myanmar. Design and trend intelligence operates from a Copenhagen hub.

**Primary business goal of the website:** Generate qualified sourcing enquiries from apparel brand buyers, sourcing directors, and product development teams. The site is not a consumer-facing catalogue — it is a B2B credentials deck and a direct-to-director contact gateway.

**Two named founders handle all inbound:**
- **Amita Prakash** — Director | amita@credenceasialtd.com | +852 6100 5224
- **Shashi Ranjan** — Director | shashi@credenceasialtd.com | +852 9285 4595

**Office:** Unit 608, 8/F, Hope Sea Industrial Centre, 26 Lam Hing Street, Kowloon Bay, Hong Kong  
**Office phone:** +852 2650 0058

---

## 2. Target Audience

| Persona | Job title examples | What they need from the site |
|---|---|---|
| **Sourcing director** | Head of Sourcing, VP Supply Chain | Factory compliance docs, country coverage, volume capacity |
| **Brand buyer** | Senior Buyer, Merch Director | Product range, sample speed, MOQ flexibility |
| **Product developer** | PD Manager, Tech Design Lead | Development pathway, sampling capability, quality specs |
| **Small brand founder** | Brand owner, Creative Director | Trust signals, direct human contact, clear process |

**Not the audience:** Garment workers, factories, general public, job seekers.

---

## 3. Design System

### 3.1 Colour Palette

All tokens are registered in `app/globals.css` under `@theme inline`:

| Token | Hex | Usage |
|---|---|---|
| `ivory` | `#F6F1E8` | Page base, card backgrounds |
| `cream` | `#EFE6D8` | Section alternation (odd sections) |
| `beige` | `#D8C7A8` | Divider lines, grid hairlines, borders |
| `sand` | `#CBB89D` | Secondary text on dark |
| `soil` | `#6B4F3A` | Primary accent, buttons, CTAs |
| `clay` | `#9A6B4F` | Eyebrow labels, secondary accents |
| `olive` | `#6F7A4F` | Section numbers, tertiary accents |
| `sage` | `#A3A985` | Muted green, used on dark bg (forest) |
| `leaf` | `#4F6F46` | List bullet accents |
| `moss` | `#586A3D` | Card accent gradients |
| `forest` | `#243D2B` | Dark section backgrounds (sustainability CTA) |
| `charcoal` | `#252421` | Body text, headings |

**Section background alternation rule:** `bg-ivory` ↔ `bg-cream`. Dark sections (`bg-forest`) used for Sustainability and contact CTAs.

### 3.2 Typography

| Role | Font | Variable |
|---|---|---|
| Display / headings | Playfair Display | `--font-playfair` / `font-display` |
| Body | Geist Sans | `--font-geist-sans` / `font-sans` |
| Mono | Geist Mono | `--font-geist-mono` / `font-mono` |

**Heading style pattern** (used consistently across all sections):
```tsx
<span className="font-light text-soil/70">Modifier word</span>{' '}
<span className="font-semibold">Primary word.</span>
```

**Section number style** (`.section-num` utility class):
```
font-size: 10px · letter-spacing: 0.22em · text-transform: uppercase
```
Numbers run `.01` through `.07` on the home page, scoped per section.

### 3.3 Spacing

`section-py` utility — `padding-block: clamp(6rem, 10vw, 9rem)` — applied to every section for fluid vertical rhythm with no breakpoint jump.

### 3.4 Grid Technique

All multi-column card grids use the `gap-px bg-beige/40` hairline divider technique:
- Grid container: `gap-px bg-beige/40` (or `bg-beige/50` on cream backgrounds)
- Individual cells: `bg-ivory` (or matching section bg)
- The 1px gap exposes the grid background as hairline rules in both axes — no explicit border declarations needed, no double-border on adjacent cells

### 3.5 Breakpoints

Standard Tailwind: `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px

---

## 4. Pages

### 4.1 Home (`/`)

**Route:** `app/page.tsx`  
**Data strategy:** `revalidate = 60` (ISR, 60-second cache). All Sanity data has graceful fallbacks to hardcoded defaults — page works without a CMS connection.

**Section sequence:**

| # | Section | Component | Background | Section number |
|---|---|---|---|---|
| 1 | Hero (full-screen carousel) | `HomeHero` | Dark image + scrim | — |
| 2 | Who We Are | `WhoWeAre` | `bg-cream` | `.01` |
| 3 | Production Map | `ProductionMapSection` | `bg-ivory` | `.02` |
| 4 | What We Do (capabilities grid) | `OurApproach` | `bg-cream` | `.03` |
| 5 | Sustainability preview | `SustainabilityPreview` | `bg-forest` | `.04` |
| 6 | Product expertise | `ProductPreview` | `bg-ivory` | `.05` |
| 7 | Customer logos | `CustomersPreview` | `bg-cream` | `.06` |
| 8 | Contact CTA | `FinalCTA` | `bg-cream` (image left / content right) | `.07` |

---

#### HomeHero

**Design:** Full-screen image carousel with embedded navigation bar, large watermark type, and bottom content overlay.

**Carousel:** 4 slides (`/hero-atelier.png`, `/manufacturing-studio.png`, `/product-capabilities.png`, `/sustainable-fibers.png`). Auto-advances every 5 seconds. Manual prev/next via chevron buttons. Thumbnail strip for direct jump.

**Overlay content (bottom-left):**
- `<h1>` "European design, / Asian production scale." — Playfair Display
- Subtext paragraph
- "Start an Enquiry" text link → `/contact`

**Navigation (embedded in hero):**
- Logo: `/credence_asia_logo_hd_transparent.png` (brightness-0 invert = white)
- Desktop: centred nav links, right-side CTA buttons (Collection, Start Enquiry)
- Mobile: hamburger → full-screen overlay with Playfair-style large nav links

**Animations (GSAP load timeline, scoped to `heroRef`):**
1. Masked line-by-line h1 reveal: inner `hh-line` spans animate `yPercent: 110 → 0`, stagger 0.12s, ease `power4.out`, duration 1.1s, starts at 0.35s
2. Sub paragraph: `fromTo` opacity 0 → 1, y 30 → 0, duration 0.85s, overlaps headline tail
3. CTA link: same pattern, 0.075s behind sub
4. Watermark: `from({opacity: 0})` fades to its inline 0.06 opacity, duration 1.8s, starts at 0.5s
5. **FOUC prevention:** CSS sets `.hh-line { transform: translateY(110%) }`, `.hh-sub, .hh-cta { opacity: 0 }` before JS runs. `@media (prefers-reduced-motion: reduce)` overrides both to final state.

---

#### WhoWeAre

**Design:** Two-column layout at `xl` (1280px). Left: section number, clay line, Playfair heading "Built for sourcing teams.", three body paragraphs. Right: fixed-height image with clip-path reveal and offset border decoration.

**Image:** Sanity `aboutImage` → `urlFor().width(1100).quality(82)`. Fallback: dot-grid placeholder with SVG icon.

**Image heights:** `h-72` (mobile) → `sm:h-80` → `xl:h-[500px]`

**Animations (GSAP ScrollTrigger):**
- `.wwa-line` — `scaleX: 0 → 1`, `transformOrigin: left center`, `power4.inOut`, 1.0s
- `.wwa-left > *` — cascade: y 34 → 0, opacity 0 → 1, stagger 0.11s, `power3.out`, delay 0.15s
- `.wwa-img-wrap` — clip-path `inset(0 0 100% 0) → inset(0 0 0% 0)`, 1.35s, `power4.inOut`
- `.wwa-img-inner` — scale `1.08 → 1`, paired with clip reveal, 1.35s, `power4.out`
- All triggers at `start: 'top 80–82%'`, `once: true`

---

#### ProductionMapSection

**Design:** Interactive SVG/MapLibre map showing the 6 production countries. Countries data from Sanity `countriesQuery`.

**Component:** `components/sections/ProductionMapSection.tsx` → wraps `AsiaProductionMap.tsx`

---

#### OurApproach

**Design:** Capabilities grid — 6 cards in a `lg:grid-cols-3` layout (2 rows × 3 columns, clean, no orphans). All cards are `<Link href="/contact">`.

**Grid technique:** `gap-px bg-beige/40` hairline dividers. Outer `border border-beige/60` wraps the whole block.

**Card anatomy:**
- Number label (`01`–`06`) in `text-[10px] tracking-[0.28em] text-olive/55`
- Title in `text-[13px] font-semibold uppercase tracking-[0.18em]`
- Body paragraph
- Stat line (bottom, separated by `border-t border-beige/60`): standardised numeric/unit data point
- `ArrowUpRight` (14px) as hover affordance on the right of the stat line
- Accent underline: `absolute bottom-0 left-0 h-[2px] w-0` → `group-hover:w-full` with per-card gradient

**Cards (final 6):**

| # | Label | Stat |
|---|---|---|
| 01 | Sampling & Prototyping | 7-day sample window |
| 02 | Sourcing & Costing | 40+ mill partners |
| 03 | Manufacturing & Scale | 14 M+ units / year |
| 04 | Compliance & QC | AQL 1.5 – 2.5 |
| 05 | Logistics | FOB · CIF · DAP · DDP |
| 06 | Partnership | 5-year avg. client tenure |

**Design decisions:**
- 7 → 6 by merging Scale Flexibility into Manufacturing (overlapping concepts). Clean 2×3 grid.
- Icons removed — replaced with numbered labels. Lucide icons were 1.25 stroke-weight, small, low contrast — they floated without anchoring. Numbers match the editorial section-number language used site-wide.
- Stat line standardised to numeric/unit data points only. Previously mixed promises ("SAMPLE IN 7 DAYS"), navigation labels, and specs in the same visual slot.

**Animations:**
- `.oa-num`, `.oa-heading > span`, `.oa-sub` — y 22 → 0, opacity, stagger 0.08s
- `.oa-col` — y 30 → 0, opacity, stagger 0.07s, trigger on `.oa-grid`

---

#### SustainabilityPreview

**Design:** Dark section (`bg-forest`). Three blocks: (1) heading + founder quote, (2) 4 named pillars in `sm:grid-cols-2`, (3) We Care chips + certification row.

**Four pillars:** Fairness · Responsibility · Lasting Quality · Sustainability

**Five compliance certs:** BSCI · Sedex · Oeko-Tex · WRAP · GMP

**Link:** "Read the full sustainability statement" → `/sustainability`

**Animations:** Uses `useGSAP` hook (from `@gsap/react`) scoped to `containerRef`. Pillar cards, chips, and certs all stagger in on scroll.

---

#### ProductPreview

**Design:** `bg-ivory`. Header row (title + subtitle). 6 product-type tiles in `lg:grid-cols-3`. Each tile is a `<Link href="/collection">` with a clip-path reveal animation.

**Product tiles (hardcoded fallback):** Outerwear · Knits · Denim · Activewear · Workwear · Casualwear

**Tile anatomy:** `SmartImage` with dark overlay gradient, product index number, title, short text, expanding tracking CTA with arrow.

**Hover (CSS-only):** `.pp-card:hover img { transform: scale(1.06) }` with `transition: 0.85s cubic-bezier(.22,1,.36,1)` — wrapped in `@media (prefers-reduced-motion: no-preference)`.

**Animations:**
- Header: y 50/26 → 0 with delays, `once: true` ✓
- Cards: `fromTo clipPath inset(0 0 100% 0) → inset(0 0 0% 0)`, staggered via `delay: i * 0.08`, `once: true`, `immediateRender: false` ✓ (both required — without `once: true` cards re-triggered on scroll; without `immediateRender: false` cards became invisible on mount)

---

#### CustomersPreview

**Design:** `bg-cream`. Logo wall in a 5-column × 3-row grid (15 logos, zero orphans). `gap-px bg-beige/40` hairline technique. Each cell: `h-28` white cell with `next/image` logo.

**Logo data:** Static files in `/public/assets/logos/1.png` through `16.png` (file `15.png` missing). Configured in `components/home/partners.ts`.

**Logo treatment:** `grayscale opacity-60` at rest → `group-hover:grayscale-0 group-hover:opacity-100`. All logos are 1000×250 wordmarks.

**Ghost cells:** `COL_LCM = 15`. `ghostCount = (15 - (count % 15)) % 15`. With 15 logos, `ghostCount = 0` — no padding needed. Formula handles future logo additions gracefully.

**Fallback:** If `PARTNERS.length < 4` (MIN_GRID_COUNT), grid is replaced with a single line of trust copy.

**Accessibility:** `<ul role="list">` / `<li>`. `<a>` with `aria-label="Visit {name} (opens in new tab)"` when URL is set. Ghost cells have `aria-hidden="true"`.

**Current 15 approved logos:**

| File | Brand |
|---|---|
| 1.png | Liberte Essentiel |
| 2.png | co'couture |
| 3.png | rosemunde |
| 4.png | FREE/QUENT |
| 5.png | Herff Jones |
| 6.png | Walmart |
| 7.png | BMW |
| 8.png | COVERSTORY |
| 9.png | NEO NOIR |
| 10.png | U.S. Polo Assn. |
| 11.png | CLAAS |
| 12.png | STIHL |
| 13.png | MUFTI |
| 14.png | Volkswagen |
| 16.png | BALILAB |

**Missing files (commented out in partners.ts):** `15.png` (TJX), `17.png` (name TBD), `18.png` (name TBD)

---

#### FinalCTA

**Design:** Two-column layout (`xl:grid-cols-2`), min-height 680px. Left: full-bleed `manufacturing-studio.png` with clip-path reveal + scale animation + `bg-charcoal/25` overlay. Right: `bg-cream` panel with section number `.07`, clay line, Playfair heading, subtext, single soil-coloured mailto button, founder name links.

**Mailto:** `amita@credenceasialtd.com?cc=shashi@credenceasialtd.com&subject=Sourcing Enquiry — Credence Asia`

**Design rationale:** Replaced previous dark-gradient section with complex 3-field form (category/quantity/timeline), ShimmerButton, and trust badges. New approach is direct-to-mail — no form submission, no processing, no SMTP dependency. Matches the ".one ahead" editorial aesthetic the client referenced.

**Animations:**
- Image: clip-path `inset(0 0 100% 0) → inset(0 0 0% 0)` paired with scale `1.08 → 1`
- Right column: clay line scaleX draw + `fcta-right > *` y 32 → 0 cascade

---

### 4.2 About (`/about`)

**Route:** `app/about/page.tsx`

**Sections:**

1. **Hero** — Dark gradient (`#252421 → #3D2E23 → #6B4F3A`), dot-grid overlay, large Playfair h1, intro text. Optional Sanity hero image at 15% opacity as mix-blend-overlay.

2. **About company** — Two-column (5fr/6fr at md): copy paragraphs left, SmartImage right.

3. **Heritage and values** — Founded 2016 story, 4 value cards in `sm:grid-cols-2` hairline grid, founder blockquote in `border-l-2 border-soil/40`.

4. **What we offer** — 10 capability cards in `lg:grid-cols-3` hairline grid. Numbered `01`–`10`. Hover: `hover:bg-beige/30`.

5. **Manufacturing facilities** — 3 factories (Bangladesh, China, Cambodia) in `md:grid-cols-3`. Each has location, detail type, and bullet-point specs. Myanmar and Vietnam listed as "Also present in".

6. **CTA** — `bg-forest`, centred, single link to `/contact`.

**Key manufacturing stats (Bangladesh):**
- 2 units · 36 production lines · 3,000 machines · 3,700 employees · 1 M pcs/month
- In-house embroidery and washing plant

---

### 4.3 Collection (`/collection`)

**Route:** `app/collection/page.tsx`

**Sections:**
- Collection hero (client component)
- Category filter (Women / Men / Kids)
- Product grid with `SmartImage` cards
- B2B story section
- Capability highlights
- Collection CTA

**Data:** Products fetched via `*[_type == "product"] | order(order asc, name asc)` from Sanity.

**Product types in scope:** Outerwear · Knits · Denim · Activewear · Workwear · Casualwear

---

### 4.4 Sustainability (`/sustainability`)

**Route:** `app/sustainability/page.tsx`

**Four pillars:** Fairness · Responsibility · Lasting Quality · Sustainability

**We Care framework:** 10 outer commitments including Human rights, Safe workplaces, Environmental resilience, Sustainable design, Ethical processes.

**Fibre/material certifications:** GOTS · BCI · GRS 100% Recycled (+ others)

**Compliance certifications:** BSCI · Sedex · Oeko-Tex · WRAP · GMP

**Component:** `CertificationsSection` in `components/sustainability/`

---

### 4.5 Contact (`/contact`)

**Route:** `app/contact/page.tsx`

**Sections:**

1. **Hero** — Warm gradient (`#CBB89D → #EFE6D8 → #F6F1E8`), dot-grid overlay, "Brief our team in Hong Kong."

2. **Direct contacts** — Two cards side-by-side (Amita Prakash / Shashi Ranjan). Each shows name, role, phone (tel: link), email (mailto: link).

3. **Enquiry form + map** — Two-column. Left: `ContactForm` (client component). Right: office address, embedded Google Maps iframe (no API key — uses `maps.google.com/maps?q=` embed), "Open in Google Maps" link, SmartImage of office building.

4. **Business note** — `bg-forest`, centred paragraph describing the engagement model.

**ContactForm (`app/contact/ContactForm.tsx`):** Client component. Fields: name, email, company, category, message. Standard HTML form — currently needs submission endpoint wiring.

---

### 4.6 Customers (`/customers`)

**Route:** `app/customers/page.tsx`

Status: Exists as a route. Detailed section content to be confirmed.

---

### 4.7 Studio (`/studio`)

**Route:** `app/studio/[[...tool]]/page.tsx`

Sanity Studio embedded in the app. Content editors access all CMS fields here.

---

## 5. Technical Stack

### 5.1 Core

| Package | Version | Role |
|---|---|---|
| Next.js | 16.2.9 | App router, ISR, image optimisation |
| React | 19 | UI layer |
| TypeScript | — | Type safety throughout |
| Tailwind CSS | v4 | `@import "tailwindcss"` syntax, `@theme inline` for tokens |

### 5.2 Animation

| Package | Version | Role |
|---|---|---|
| GSAP | ^3.15.0 | All scroll and load animations |
| `@gsap/react` | ^2.1.2 | `useGSAP` hook (used in SustainabilityPreview) |
| Lenis | ^1.3.23 | Smooth scroll (`lerp: 0.08, smoothWheel: true`) |

**Lenis ↔ ScrollTrigger wiring** (`components/SmoothScroll.tsx`):
```js
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
setTimeout(() => ScrollTrigger.refresh(), 300) // after layout settles
```

**All animations respect `prefers-reduced-motion`:** Components check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and early-return if true. CSS initial states (`globals.css`) have matching `@media (prefers-reduced-motion: reduce)` overrides that show final state immediately.

### 5.3 CMS

| Package | Version | Role |
|---|---|---|
| Sanity | v5 | Headless CMS, hosted |
| `next-sanity` | — | Client, `urlFor`, queries |

**Config:** `sanity.config.ts` · CLI: `sanity.cli.ts`
**Schema:** `sanity/` directory
**Image handling:** `urlFor(image).width(N).quality(82).auto('format').url()` — auto-selects WebP/AVIF by browser support

**All Sanity fetches have `.catch(() => null)` or `.catch(() => [])` fallbacks** — pages render with hardcoded defaults if CMS is unreachable.

### 5.4 Other Dependencies

- `lucide-react` — Icons (used in OurApproach arrows, hero chevrons, navigation)
- `maplibre-gl` — Production map (AsiaProductionMap)

---

## 6. Component Inventory

### Shared components (`components/shared/`)

| Component | Purpose |
|---|---|
| `SmartImage` | Sanity image wrapper. Renders `<img>` via `urlFor()`, handles ratio, tone (light/dark placeholder), fallback with label text. Forces `aspectRatio` via inline style — use raw `<img>` + `urlFor` directly when a fixed height is needed instead. |
| `SectionHeading` | `eyebrow` + `title` + optional `subtitle`. Used on About and Collection pages. |
| `ImagePlaceholder` | Decorative placeholder for missing images. |
| `BrandLogo` | Brand mark component. |
| `Button` | Shared button primitive. |
| `DuotoneImage` | Duotone image effect. |

### UI primitives (`components/ui/`)

| Component | Purpose |
|---|---|
| `shimmer-button` | Shimmer CTA button (used in older FinalCTA, now replaced) |
| `spotlight` | Radial spotlight hover effect (used in HomeHero, removed from OurApproach) |
| `map` | Map component wrapper |
| `world-map` | World map visualisation |
| `fanned-card-stack` | Decorative card stack UI |

### Layout components (`components/`)

| Component | Purpose |
|---|---|
| `Navbar` | Main navigation bar (shown on inner pages; hero embeds its own nav) |
| `Footer` | Site footer with Sanity `siteSettingsQuery` data |
| `SmoothScroll` | Lenis initialisation wrapper — wraps all page content in layout |
| `PageLoader` | Loading screen shown before page paint |

---

## 7. Animation Patterns Reference

### Pattern A — Section header cascade (all sections)
```
ScrollTrigger start: 'top 82%', once: true
Elements: section-num, clay line, h2, sub paragraph
From: y 22–34, opacity 0
Duration: 0.75–0.85s, ease power3.out, stagger 0.08–0.11s
```

### Pattern B — Decorative line draw
```
gsap.from('.xxx-line', { scaleX: 0, transformOrigin: 'left center',
  duration: 1.0, ease: 'power4.inOut' })
Triggers alongside section header, same ScrollTrigger.
```

### Pattern C — Card stagger rise
```
gsap.from('.xxx-col', { y: 30, opacity: 0, duration: 0.65,
  stagger: 0.07–0.13, ease: 'power3.out' })
Trigger: grid container, start: 'top 80%', once: true
```

### Pattern D — Image clip-path reveal + scale
```
gsap.fromTo('.xxx-img-wrap',
  { clipPath: 'inset(0 0 100% 0)' },
  { clipPath: 'inset(0 0 0% 0)', duration: 1.35, ease: 'power4.inOut' })
gsap.fromTo('.xxx-img-inner',
  { scale: 1.08 },
  { scale: 1, duration: 1.35, ease: 'power4.out' })
Both triggered together at start: 'top 80%'
```

### Pattern E — Hero load timeline (HomeHero only, no ScrollTrigger)
```
tl.from('.hh-line',    { yPercent: 110, stagger: 0.12, duration: 1.1, ease: 'power4.out' }, 0.35)
tl.fromTo('.hh-sub',   { opacity:0, y:30 }, { opacity:1, y:0, duration:0.85 }, '-=0.52')
tl.fromTo('.hh-cta',   { opacity:0, y:30 }, { opacity:1, y:0, duration:0.75 }, '-=0.6')
tl.from('.hh-mark',    { opacity:0, duration:1.8, ease:'power2.out' }, 0.5)
```

### Critical rules
- Always `immediateRender: false` on `fromTo` tweens inside ScrollTrigger — prevents initial "from" state being applied on mount before trigger fires
- Always `once: true` on scroll-triggered reveals — prevents re-triggering on scroll-back
- Use `gsap.context(() => {...}, ref)` to scope selectors to the component's DOM subtree
- Always `return () => ctx.revert()` from `useEffect` for cleanup on unmount
- `from()` not `to()` when the "from" state is not the current CSS/GSAP state — a `to()` reads GSAP's internal tracked value (default 0) not the CSS value

---

## 8. Sanity CMS Schema

### Document types in use

| Type | Fields queried |
|---|---|
| `homePage` | `aboutTitle`, `aboutText`, `aboutImage`, `aboutPoints`, `sustainabilityTitle`, `sustainabilityText`, `productTitle`, `productText`, `customersTitle`, `customersText`, `ctaTitle`, `ctaText`, `ctaPrimaryButtonText`, `ctaPrimaryButtonLink`, `heroImage` |
| `product` | `_id`, `name`, `title`, `category`, `description`, `capabilityLine`, `capabilities`, `image` |
| `productCategory` | Featured categories for `ProductPreview` |
| `sustainabilityItem` | Featured items for `SustainabilityPreview` |
| `country` | Countries for production map |
| `customer` | Customer/partner logos (legacy; home page now uses static logo files) |
| `siteSettings` | Footer data |
| `aboutPage` | `title`, `introText`, `heroImage`, `ctaTitle`, `ctaText`, `address`, `phone`, `image` |
| `contactPage` | `title`, `introText`, `address`, `phone`, `image` |
| `sustainabilityPage` | Sustainability detail page content |
| `certification` | Certifications with `slug`, `name`, `full` description |

**Image pipeline:** All Sanity images go through `urlFor(source).width(W).quality(82).auto('format').url()`. Format auto-selection provides WebP/AVIF where supported.

---

## 9. SEO and Metadata

Each page exports a `metadata` object from Next.js:

| Page | Title |
|---|---|
| `/` | Credence Asia Group \| Apparel Sourcing & Production Partner |
| `/about` | About \| Credence Asia Group |
| `/collection` | Product expertise \| Credence Asia Group |
| `/sustainability` | Sustainability \| Credence Asia Group |
| `/contact` | Contact \| Credence Asia Group |

Meta descriptions are hardcoded in each page file and describe the B2B sourcing value proposition. No dynamic CMS-driven meta yet — future enhancement.

---

## 10. Assets

### Public directory (`/public/`)

| File | Dimensions | Used in |
|---|---|---|
| `credence_asia_logo_hd_transparent.png` | — | Navbar, HomeHero (white via `brightness-0 invert`) |
| `hero-atelier.png` | 1717×916 | HomeHero carousel slide 1 |
| `manufacturing-studio.png` | 1536×1024 | HomeHero carousel slide 2, FinalCTA left panel |
| `product-capabilities.png` | 1706×922 | HomeHero carousel slide 3 |
| `sustainable-fibers.png` | 1717×916 | HomeHero carousel slide 4 |
| `asia-vector.svg` | — | Production map background |
| `assets/logos/1–16.png` (excl. 15) | 1000×250 | Customer logo wall |

### Missing assets (blocked work)

| File | Brand | Status |
|---|---|---|
| `assets/logos/15.png` | TJX | Not provided — entry commented out in `partners.ts` |
| `assets/logos/17.png` | Unknown | Not provided — entry commented out |
| `assets/logos/18.png` | Unknown | Not provided — entry commented out |

---

## 11. Open Items and Pending Work

### High priority

| # | Item | Detail |
|---|---|---|
| P1 | Contact form submission | `ContactForm.tsx` has fields but no server action or API route for submission. Needs endpoint: Resend / Nodemailer / Formspree. |
| P2 | Logo files 15, 17, 18 | Get files from client. Uncomment entries in `partners.ts`, fill brand names. Logo dimensions must be 1000×250 for the current `WM` preset. |
| P3 | `next/image` domain whitelist | Any externally-hosted images need domain added to `next.config` `remotePatterns`. |

### Medium priority

| # | Item | Detail |
|---|---|---|
| M1 | OG image / social card | No `opengraph-image` file exists. Add a 1200×630 card per route for LinkedIn and WhatsApp sharing (primary B2B share channels). |
| M2 | Customers page (`/customers`) | Route exists but content is placeholder. Should be an expanded logo wall with optional case study cards. |
| M3 | Page scroll animations on inner pages | About, Collection, Sustainability, Contact have no GSAP animations. Applying Pattern A (header cascade) and Pattern C (card rise) to their sections would bring them up to home page quality. |
| M4 | Dynamic CMS meta | `title` and `description` metadata are hardcoded per page. Could pull from Sanity `siteSettings` or page-level fields for editor control. |
| M5 | `PageLoader` polish | Confirm the loading screen dismisses cleanly and doesn't compete with the hero load timeline. |

### Low priority / backlog

| # | Item | Detail |
|---|---|---|
| L1 | Cookie consent / analytics | No tracking or consent banner. Add if analytics (GA4, Plausible) are required. |
| L2 | Sitemap and robots.txt | Auto-generate via `app/sitemap.ts` and `app/robots.ts`. |
| L3 | Error boundaries | No `error.tsx` or `not-found.tsx` pages. |
| L4 | Print stylesheet | B2B buyers sometimes print credentials pages — a minimal print CSS would preserve the brand feel. |
| L5 | Map accessibility | `AsiaProductionMap` should have a text fallback listing all production countries for keyboard/screen reader users. |

---

## 12. Known Bugs (resolved)

| Bug | Root cause | Fix |
|---|---|---|
| `TypeError: Cannot read properties of null (reading 'split')` in BrandInitials | Sanity returned `null` for unpublished customer names | Added `name ?? ''` guard + `'?'` fallback for empty initials |
| Product cards invisible on mount | `fromTo` in ProductPreview lacked `immediateRender: false` — initial clip-path state applied on mount before trigger fired | Added `immediateRender: false` |
| Product cards re-triggered on scroll-back | ScrollTrigger config missing `once: true` | Added `once: true` |
| WhoWeAre image too large on desktop | `items-stretch` + `h-full` caused image to grow to match text column height | Switched to `items-center` + fixed height (`h-72 sm:h-80 xl:h-[500px]`) |
| SmartImage conflict with fixed height | SmartImage enforces `style={{ aspectRatio }}` via inline style, conflicting with `h-full` parent | Bypassed SmartImage; used `urlFor()` directly with a raw `<img>` tag in WhoWeAre |
| Hero h1 animation no-op | Used `tl.to('.hh-line', {yPercent: 0})` — GSAP reads its own tracked value (0) as start, not the CSS `translateY(110%)` | Changed to `tl.from('.hh-line', {yPercent: 110})` so GSAP owns both endpoints |

---

## 13. Coding Conventions

- **No comments** except for non-obvious constraints, workarounds, or hidden invariants
- **No unused variables** — prefix with `_` only when a parameter is required by a type signature
- **Props typed inline** with `type Props = {...}` above the component
- **Fallback pattern**: `field ?? DEFAULT_CONSTANT` — all CMS fields have hardcoded defaults
- **GSAP scope**: Always `gsap.context(() => {...}, ref)` — never global selectors in component animation code
- **CSS class naming**: `{section-abbr}-{element}` — e.g., `wwa-line`, `cp-cell`, `hh-mark`. Abbreviations are unique per component to prevent cross-component selector collisions
- **Tailwind v4**: No `tailwind.config.ts` — tokens are declared in `globals.css` `@theme inline` block. Use `className` strings directly; no `cn()` utility is needed for most cases
- **ISR**: All data-fetching pages export `revalidate = 60`

---

*Document maintained alongside the codebase. Update this file when sections, pages, or technical decisions change.*
