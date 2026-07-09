# Credence Asia Group — Website Build Task Log

**Project:** Corporate website rebuild  
**Stack:** Next.js 16.2.9 · React 19 · Tailwind CSS v4 · Sanity CMS v5 · GSAP 3 · Lenis  
**Last updated:** 2026-07-03

---

## Completed Work

### 1. Project Foundation
- Bootstrapped Next.js 16 app with React 19, Tailwind CSS v4, TypeScript
- Configured `tsconfig.json` with path aliases (`@/`)
- Set up `next.config.ts` for Sanity image domain and SVG support
- Installed all core dependencies: GSAP 3.15, Motion/React 12, Lenis smooth scroll, Lucide React, D3-geo, topojson-client, world-atlas, MapLibre GL

### 2. Design System (`app/globals.css`)
- Registered full brand palette as CSS custom properties under `@theme inline`:
  - Neutral scale: `ivory` (#F6F1E8), `cream` (#EFE6D8), `beige` (#D8C7A8), `sand` (#CBB89D)
  - Warm accent: `soil` (#6B4F3A), `clay` (#9A6B4F)
  - Green scale: `olive` (#6F7A4F), `sage` (#A3A985), `leaf` (#4F6F46), `moss` (#586A3D), `forest` (#243D2B)
  - Neutral dark: `charcoal` (#252421)
- Font variables: Playfair Display (`--font-playfair` / `font-display`), Geist Sans, Geist Mono
- Utility class `.section-num` (10px, 0.22em letter-spacing, uppercase)
- Section background alternation pattern: `bg-ivory` ↔ `bg-cream`, dark `bg-forest` for CTAs

### 3. Sanity CMS Integration
- Installed `sanity` v5, `next-sanity` v13, `@sanity/image-url`, `@sanity/vision`
- Configured `sanity.config.ts` with Structure Tool and Vision plugin at `/studio`
- Set up `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`, `sanity/lib/live.ts`, `sanity/lib/queries.ts`
- Mounted Sanity Studio at `app/studio/[[...tool]]/page.tsx`

#### Sanity Schema Types (14 schemas)
| Schema | Purpose |
|---|---|
| `homePage` | Hero, About, Sustainability, Product, CTA sections content |
| `aboutPage` | About page content |
| `contactPage` | Contact page content |
| `sustainabilityPage` | Full sustainability page content |
| `product` | Product entries linked to categories |
| `productCategory` | Apparel product categories |
| `productionLocation` | Factory/sourcing locations |
| `country` | Countries in sourcing network |
| `customer` | Partner brand logos |
| `partnerLogo` | Fallback partner logo schema |
| `certificationLogo` | Certifications displayed on site |
| `sustainabilityItem` | Individual sustainability feature cards |
| `siteSettings` | Global site settings (name, logo, SEO) |

### 4. App Layout (`app/layout.tsx`)
- Root layout with Geist Sans + Geist Mono + Playfair Display (Google Fonts)
- Integrated `SmoothScroll` (Lenis) wrapper
- `Navbar` and `Footer` mounted globally
- `PageLoader` for initial load animation

### 5. Global Components
- **`components/Navbar.tsx`** — site navigation
- **`components/Footer.tsx`** — site footer
- **`components/PageLoader.tsx`** — entry animation
- **`components/SmoothScroll.tsx`** — Lenis smooth scroll provider

### 6. Shared UI Components (`components/shared/`)
- `SectionHeading.tsx` — consistent heading pattern (light modifier + semibold primary)
- `Button.tsx` — primary/secondary button variants
- `SmartImage.tsx` — Sanity image with fallback
- `DuotoneImage.tsx` — duotone image effect
- `ImagePlaceholder.tsx` — skeleton/fallback placeholder
- `BrandLogo.tsx` — logo display component
- `CertImage.tsx` — certification badge display

### 7. Magic UI Components (`components/ui/`)
- `fanned-card-stack.tsx`
- `map.tsx`
- `shimmer-button.tsx`
- `spotlight.tsx`
- `world-map.tsx`

### 8. Home Page (`app/page.tsx`)
Server component fetching from Sanity in parallel. Sections in order:

| # | Section | Component |
|---|---|---|
| .01 | Hero | `HomeHero` |
| .02 | Who We Are / About | `WhoWeAre` |
| .03 | Production Map | `ProductionMapSection` → `PresenceMap` |
| .04 | Our Approach | `OurApproach` |
| .05 | Sustainability Preview | `SustainabilityPreview` |
| .06 | Product Preview | `ProductPreview` |
| .07 | Customers / Partners | `CustomersPreview` |
| — | Final CTA | `FinalCTA` |

#### Home Section Components (`components/home/`)
- `HomeHero.tsx` — hero with Sanity data
- `WhoWeAre.tsx` — about blurb with image and key points
- `OurApproach.tsx` — process steps
- `SustainabilityPreview.tsx` — sustainability card preview
- `ProductPreview.tsx` — product category preview grid
- `CustomersPreview.tsx` — partner logos row
- `FinalCTA.tsx` — contact call-to-action
- `ProductionMap.tsx` — home map wrapper
- `SectionBreak.tsx` — decorative divider
- `partners.ts` — static partner data fallback

### 9. Production/Presence Map (`components/sections/`)
- **`PresenceMap.tsx`** — inline SVG world map using D3 NaturalEarth1 projection (20°W–145°E, 55°N–8°S), country paths from world-atlas 110m, dot markers from `data/presence.ts`, GSAP ScrollTrigger animations
- **`ProductionMapSection.tsx`** — section wrapper (contained in `max-w-7xl`), replaces previous full-bleed layout
- **`AsiaProductionMap.tsx`** — earlier MapLibre GL attempt (superseded by PresenceMap)
- **`GarmentJourney.tsx`** — garment journey flow visualization
- `data/presence.ts` — sourcing country dot marker coordinates

### 10. Inner Pages

#### About (`app/about/page.tsx`)
Full about page with Sanity data.

#### Contact (`app/contact/`)
- `page.tsx` — contact page
- `ContactForm.tsx` — client-side contact form component

#### Customers (`app/customers/page.tsx`)
Partners/customers showcase page.

#### Sustainability (`app/sustainability/page.tsx`)
Full sustainability page.

#### Collection (`app/collection/`)
- `page.tsx` — collection listing page
- Components in `components/collection/`:
  - `CollectionHero.tsx`
  - `CollectionPageClient.tsx`
  - `CategoryFilter.tsx`
  - `CollectionCTA.tsx`
  - `CapabilityHighlights.tsx`
  - `B2BStorySection.tsx`
  - `CertificationsSection.tsx`
  - `ProductCapabilityCard.tsx`

### 11. Data & Scripts
- `data/presence.ts` — dot marker data for PresenceMap
- `scripts/` — utility/seeding scripts
- `types/` — shared TypeScript type definitions
- `lib/` — shared utility functions

### 12. Static Assets (`public/`)
- `credence_asia_logo_hd_transparent.png` — brand logo
- `hero-atelier.png` — hero background image
- `manufacturing-studio.png` — about/studio image
- `product-capabilities.png` — product section image
- `sustainable-fibers.png` — sustainability section image
- `asia-vector.svg` — Asia vector map graphic
- `assets/` — additional static assets

---

## Page Routing Summary

| Route | Type | Description |
|---|---|---|
| `/` | Server Component | Home page |
| `/about` | Page | About Credence Asia |
| `/collection` | Page | Product collection |
| `/contact` | Page | Contact form + details |
| `/customers` | Page | Partner brands |
| `/sustainability` | Page | Sustainability story |
| `/studio/[[...tool]]` | Sanity Studio | CMS admin |

---

## Key Conventions

- **Section backgrounds:** `bg-ivory` and `bg-cream` alternate; `bg-forest` for dark CTAs
- **Heading pattern:** `<span className="font-light text-soil/70">Modifier</span> <span className="font-semibold">Primary.</span>`
- **Section numbers:** `.section-num` utility class, `.01` through `.07`
- **Images:** All CMS images go through `@sanity/image-url` builder via `SmartImage`
- **Animations:** GSAP + ScrollTrigger for scroll-driven; Motion/React for interactive
- **Smooth scroll:** Lenis via `SmoothScroll` wrapper in root layout
- **Data fetching:** All Sanity fetches use `.catch(() => null/[])` fallback pattern
- **Revalidation:** `export const revalidate = 60` on all page-level server components
