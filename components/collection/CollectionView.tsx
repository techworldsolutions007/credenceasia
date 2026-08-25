'use client'

import DenimGrid from '@/components/DenimGrid'
import type {DenimGridDoc} from '@/app/(site)/collection/page'

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
  grids: DenimGridDoc[]
}

export default function CollectionView({categories, grids}: Props) {
  return (
    <main style={{minHeight: '100vh', background: '#F6F1E8', paddingTop: '68px'}}>
      <style>{`
        @keyframes ca-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>

      {/* ── Marquee ── */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(223,212,191,0.7)',
        borderBottom: '1px solid rgba(223,212,191,0.7)',
        padding: '11px 0',
        background: 'rgba(239,230,216,0.25)',
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ca-marquee 36s linear infinite',
          willChange: 'transform',
        }}>
          {[0, 1, 2, 3].map((pass) =>
            categories.map((cat) => (
              <span
                key={`${pass}-${cat._id}`}
                style={{display: 'inline-flex', alignItems: 'center', flexShrink: 0}}
                aria-hidden={pass > 0 ? true : undefined}
              >
                <span style={{
                  padding: '0 clamp(18px,2.8vw,36px)',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'rgba(37,36,33,0.42)',
                  whiteSpace: 'nowrap',
                }}>
                  {cat.title}
                </span>
                <span
                  style={{width: '1px', height: '13px', background: 'rgba(223,212,191,0.85)', flexShrink: 0}}
                  aria-hidden="true"
                />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Hero text ── */}
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: 'clamp(48px,8vw,104px) clamp(20px,4vw,44px) clamp(40px,6vw,68px)',
      }}>
        <h1 style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: 'clamp(36px,6.5vw,80px)',
          lineHeight: 1.06,
          margin: '0 0 20px',
          fontWeight: 300,
          letterSpacing: '-0.015em',
          maxWidth: '12em',
          color: '#252421',
        }}>
          The full range,{' '}
          <span style={{fontWeight: 600}}>one source.</span>
        </h1>
        <p style={{
          maxWidth: '460px',
          fontSize: 'clamp(14px,1.4vw,16px)',
          lineHeight: 1.65,
          color: 'rgba(37,36,33,0.52)',
          margin: 0,
          fontWeight: 300,
        }}>
          Woven, Knits, Denim, Outerwear — everything a programme needs,
          under one roof.
        </p>
      </div>

      {/* ── Denim Grid sections ── */}
      {grids.length > 0 && (
        <section style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 clamp(20px,4vw,44px) clamp(80px,12vw,140px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px,6vw,72px)',
        }}>
          {grids.map((grid) => (
            <DenimGrid
              key={grid._id}
              layout={grid.layout}
              images={grid.images ?? []}
            />
          ))}
        </section>
      )}
    </main>
  )
}
