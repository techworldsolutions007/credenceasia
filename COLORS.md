# Credence Asia — Brand Color Palette

Three anchor colors from the homepage section backgrounds:
**Cream `#EFE6D8`** · **Sage Green `#A3AD92`** · **Mist Blue `#D5DDE8`**

Every other value is a tint or shade of one of these three.

---

## Cream / Neutral Surfaces

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| ivory | `#F6F1E8` | `bg-ivory` / `text-ivory` | Page base background |
| cream | `#EFE6D8` | `bg-cream` / `text-cream` | Raised section background |
| parchment | `#E7DCC6` | `bg-parchment` | Deep cream, subtle contrast |
| beige | `#DFD4BF` | `border-beige` | Hairline borders on light backgrounds |
| sand | `#C9BCA2` | `bg-sand` | Strong borders, muted chips |
| charcoal | `#252421` | `text-charcoal` / `bg-charcoal` | Primary ink / dark fills |

---

## Green Family

Anchored to brand green `#A3AD92`. Used for sustainability, primary actions, and the brand's core identity.

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| celadon | `#E2E8D9` | `bg-celadon` | Lightest green tint, subtle section fills |
| sage | `#A3AD92` | `bg-sage` / `text-sage` | Brand green, section backgrounds, CTA bands |
| medgreen | `#8A957A` | `bg-medgreen` | Mid-tone green fill |
| olive | `#647052` | `text-olive` | Eyebrows, small lagobels (e.g. `.01`, `.02`) |
| leaf | `#57694A` | `text-leaf` | Strong green text on light backgrounds |
| moss | `#46543E` | `bg-moss` | Primary button hover state |
| **soil** | `#3C4A34` | `bg-soil` / `text-soil` | **PRIMARY accent** — buttons, active nav, key highlights |
| forest | `#2E3A28` | `bg-forest` | Dark green section fills |

---

## Blue Family

Anchored to brand blue `#D5DDE8`. Used for customers, partnership themes, and secondary accents.

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| haze | `#E6EBF2` | `bg-haze` | Lightest blue tint |
| mist / skyblue | `#D5DDE8` | `bg-mist` | Brand blue, section backgrounds |
| **clay** | `#53637E` | `text-clay` | **SECONDARY accent** — eyebrows, labels, links |
| navy | `#37475E` | `bg-navy` / `text-navy` | Dark blue sections, deep accents |

---

## Usage Rules

| Situation | Color |
|---|---|
| Page background | `ivory` |
| Section background (alternate) | `cream` |
| Primary CTA button | `soil` (hover → `moss`) |
| Secondary / dark button | `charcoal` |
| Section eyebrow numbers `.01` | `olive` at 80% opacity |
| Hairline borders | `beige` at 60% opacity (`border-beige/60`) |
| Body text | `charcoal` |
| Muted body / captions | `charcoal` at 55–60% opacity |
| Heading accent (light weight) | `soil` at 60% opacity (`text-soil/60`) |
| CTA band background | `sage` or `cream` |

---

## Opacity Conventions

Tailwind opacity modifiers used across the codebase:

- `text-charcoal/55` — muted body copy
- `text-charcoal/40` — very muted labels / dividers
- `text-soil/60` — light-weight heading words
- `text-olive/80` — eyebrow numbers
- `border-beige/60` — all hairline rules
- `bg-cream/60` — card backgrounds over ivory

---

## Fonts

| Role | Font | CSS variable |
|---|---|---|
| Headings / editorial | Work Sans | `--font-serif` / `font-serif` |
| Body / UI labels | Outfit Variable | `--font-sans` / `font-sans` |

**Weight pattern:** `font-light` (300) for de-emphasis within headings, `font-semibold` (600) for the bold word — this contrast is the primary visual differentiator across the site.
