'use client'

import { useEffect, useState } from 'react'
import { urlFor } from '@/sanity/lib/image'

/* ── Types ──────────────────────────────────────────────────── */

type CategoryProduct = {
  _id: string
  aspect: number | null
  lqip: string | null
  image: unknown
}

type CollectionCategory = {
  _id: string
  title: string
  slug: string | null
  background: string
  products: CategoryProduct[]
}

type Props = {
  categories: CollectionCategory[]
}

/* ── Helpers ────────────────────────────────────────────────── */

const BG: Record<string, string> = {
  ivory: '#F6F1E8',
  cream: '#EFE6D8',
  celadon: '#E2E8D9',
  mist: '#D5DDE8',
}

/* Strips "wear" suffix and takes first word — "Denimwear" → "DENIM", "Activewear" → "ACTIVE" */
function shortLabel(title: string): string {
  return title.replace(/wear$/i, '').split(/\s+/)[0].toUpperCase()
}

/* ── Striped placeholder for empty categories ───────────────── */

function PlaceholderGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      paddingTop: '28px',
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            aspectRatio: '3 / 4',
            borderRadius: '4px',
            background: 'rgba(223,212,191,0.28)',
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(200,188,162,0.18) 5px, rgba(200,188,162,0.18) 10px)',
          }}
        />
      ))}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────── */

export default function CollectionView({ categories }: Props) {
  const [active, setActive] = useState<string>(categories[0]?.slug ?? '')

  useEffect(() => {
    const anchors = categories.map((c) => c.slug).filter(Boolean) as string[]
    if (!anchors.length) return
    const observers = anchors.map((slug) => {
      const el = document.getElementById(slug)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(slug) },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [categories])

  return (
    <main style={{ minHeight: '100vh', background: '#F6F1E8', paddingTop: '68px' }}>

      {/* ── Sticky secondary nav ──────────────────────────── */}
      <nav
        aria-label="Collection categories"
        style={{
          position: 'sticky',
          top: '68px',
          zIndex: 40,
          background: 'rgba(246,241,232,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(223,212,191,0.7)',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 clamp(20px,4vw,44px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Mini wordmark */}
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(37,36,33,0.45)',
            flexShrink: 0,
          }}>
            Credence Asia
          </span>

          {/* Category anchor links */}
          <div style={{
            display: 'flex',
            gap: 'clamp(10px,2vw,24px)',
            overflowX: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none' as const,
          }}>
            {categories.filter((c) => c.slug).map((cat) => {
              const isActive = active === cat.slug
              return (
                <a
                  key={cat._id}
                  href={`#${cat.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    position: 'relative',
                    padding: '13px 0',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#3C4A34' : 'rgba(37,36,33,0.38)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'color 0.2s',
                  }}
                >
                  {shortLabel(cat.title)}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#3C4A34',
                      borderRadius: '1px',
                    }} />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: 'clamp(52px,9vw,116px) clamp(20px,4vw,44px) clamp(40px,6vw,68px)',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(100,112,82,0.85)',
          margin: '0 0 20px',
        }}>
          The Collection — 2026
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: 'clamp(36px,6.5vw,80px)',
          lineHeight: 1.06,
          margin: '0 0 20px',
          fontWeight: 300,
          letterSpacing: '-0.015em',
          maxWidth: '14em',
          color: '#252421',
        }}>
          Let the clothes{' '}
          <span style={{ fontWeight: 600 }}>speak for themselves.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          maxWidth: '460px',
          fontSize: 'clamp(14px,1.4vw,16px)',
          lineHeight: 1.65,
          color: 'rgba(37,36,33,0.52)',
          margin: 0,
          fontWeight: 300,
        }}>
          No labels. No captions. A quiet gallery of everything we make — browse
          by category, or simply scroll.
        </p>

      </section>

      {/* ── Category sections ─────────────────────────────────── */}
      {categories.map((cat, catIdx) => {
        const bg = BG[cat.background] ?? '#F6F1E8'
        const slug = cat.slug || `cat-${catIdx + 1}`
        const index = `.${String(catIdx + 1).padStart(2, '0')}`

        return (
          <section
            key={cat._id}
            id={slug}
            style={{
              background: bg,
              padding: 'clamp(40px,7vw,88px) 0 clamp(48px,8vw,96px)',
              scrollMarginTop: '124px',
            }}
          >
            <div style={{
              maxWidth: '1320px',
              margin: '0 auto',
              padding: '0 clamp(20px,4vw,44px)',
            }}>

              {/* Section header */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: 'rgba(100,112,82,0.75)',
                }}>
                  {index}
                </span>
                <h2 style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 'clamp(28px,5vw,58px)',
                  margin: 0,
                  lineHeight: 1,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#252421',
                }}>
                  {cat.title}
                </h2>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px',
                  fontWeight: 400,
                  color: 'rgba(37,36,33,0.38)',
                }}>
                  {cat.products.length} {cat.products.length === 1 ? 'piece' : 'pieces'}
                </span>
              </div>

              {/* Hairline divider */}
              <div style={{
                height: '1px',
                background: 'rgba(223,212,191,0.9)',
                margin: '20px 0 0',
              }} />

              {/* Masonry or placeholder */}
              {cat.products.length > 0 ? (
                <div style={{
                  columns: 'min(230px, 44vw)',
                  columnGap: 'clamp(10px,1.6vw,18px)',
                  paddingTop: '28px',
                }}>
                  {cat.products.map((p, pIdx) => {
                    const imgUrl = p.image
                      ? urlFor(p.image as any)
                        .width(900)
                        .auto('format')
                        .quality(80)
                        .fit('max')
                        .url()
                      : null
                    if (!imgUrl) return null
                    return (
                      <div
                        key={p._id}
                        style={{
                          aspectRatio: p.aspect ? String(p.aspect) : '3 / 4',
                          breakInside: 'avoid',
                          marginBottom: 'clamp(10px,1.6vw,18px)',
                          position: 'relative',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          background: p.lqip
                            ? `url(${p.lqip}) center/cover no-repeat`
                            : 'rgba(239,230,216,0.5)',
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          loading={catIdx === 0 && pIdx < 4 ? 'eager' : 'lazy'}
                          decoding="async"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <PlaceholderGrid />
              )}
            </div>
          </section>
        )
      })}

    </main>
  )
}
