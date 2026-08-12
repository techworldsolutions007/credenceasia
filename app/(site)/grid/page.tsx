import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import DenimGrid, {type GridImage, type DenimGridProps} from '@/components/DenimGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Grid | Credence Asia Group',
  description: 'Editorial denim grid layouts — Credence Asia Group.',
}

const DENIM_GRID_QUERY = `
  *[_type == "denimGrid"] | order(_updatedAt desc) {
    _id,
    title,
    layout,
    headline,
    images[] {
      _key,
      alt,
      "lqip": image.asset->metadata.lqip,
      image
    }
  }
`

type DenimGridDoc = {
  _id: string
  title?: string | null
  layout: DenimGridProps['layout']
  headline?: string | null
  images: GridImage[]
}

export default async function GridPage() {
  const grids = await client
    .fetch<DenimGridDoc[]>(DENIM_GRID_QUERY, {}, {next: {revalidate: 60}})
    .catch(() => [] as DenimGridDoc[])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f2f0eb',
        paddingTop: '80px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');
      `}</style>

      {/* Header */}
      <header
        style={{
          maxWidth: 1560,
          margin: '0 auto',
          padding:
            'clamp(32px,5vw,56px) clamp(14px,3vw,40px) clamp(24px,3vw,36px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          borderBottom: '1px solid #17171a',
        }}
      >
        <div
          style={{
            fontFamily: "'Cutive Mono', monospace",
            fontSize: 'clamp(20px,4vw,34px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          Credence
        </div>
        <div
          style={{
            fontFamily: "'Cutive Mono', monospace",
            fontSize: 'clamp(9px,1.4vw,11px)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6b6862',
          }}
        >
          Grid Options
        </div>
      </header>

      {/* Grid sections */}
      <div
        style={{
          maxWidth: 1560,
          margin: '0 auto',
          padding:
            'clamp(28px,4vw,56px) clamp(14px,3vw,40px) 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px,4vw,56px)',
        }}
      >
        {grids.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40vh',
              fontFamily: "'Cutive Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8d8981',
            }}
          >
            No grids published yet — create one in Sanity Studio
          </div>
        ) : (
          grids.map((grid, idx) => (
            <section
              key={grid._id}
              style={{
                border: '1px dashed #b9b4aa',
                padding: 'clamp(14px,2.4vw,30px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 14,
                  marginBottom: 'clamp(14px,2vw,26px)',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Cutive Mono', monospace",
                    fontWeight: 400,
                    fontSize: 'clamp(14px,2.4vw,22px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {grid.title ?? `Layout ${grid.layout}`}
                </h2>
                <span
                  style={{
                    fontFamily: "'Cutive Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.24em',
                    color: '#8d8981',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <DenimGrid
                layout={grid.layout}
                images={grid.images ?? []}
                headline={grid.headline}
              />
            </section>
          ))
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1560,
          margin: '0 auto',
          padding: '10px clamp(14px,3vw,40px) 40px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'Cutive Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#8d8981',
          borderTop: '1px solid #17171a',
        }}
      >
        <span>Credence</span>
        <span>SS26</span>
      </footer>
    </main>
  )
}
