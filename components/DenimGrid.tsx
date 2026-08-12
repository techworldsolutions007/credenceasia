'use client'

import {urlFor} from '@/sanity/lib/image'

/* ── Types ── */
export type GridImage = {
  _key: string
  alt?: string | null
  lqip?: string | null
  image: unknown
}

export type DenimGridProps = {
  layout: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  images: GridImage[]
  headline?: string | null
}

/* ── Constants ── */
const MONO = "'Cutive Mono', monospace"
const DIM = 'rgba(239,230,216,0.5)'
const MUTED = 'rgba(37,36,33,0.42)'

/* ── Helpers ── */
function imgSrc(img: GridImage, w: number): string {
  return urlFor(img.image as Parameters<typeof urlFor>[0])
    .width(w)
    .auto('format')
    .quality(82)
    .fit('max')
    .url()
}

function Cell({
  img,
  w = 800,
  eager,
  style,
}: {
  img: GridImage
  w?: number
  eager?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px,2vw,24px)',
        ...style,
      }}
    >
      <img
        src={imgSrc(img, w)}
        alt={img.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
      />
    </div>
  )
}

/* ── Layout A · Staggered Rail ── */
function LayoutA({imgs}: {imgs: GridImage[]}) {
  const offsets = ['0', 'clamp(10px,2.4vw,54px)', 'clamp(0px,1.2vw,26px)', 'clamp(14px,3vw,68px)']
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(140px,17vw,250px),1fr))',
        gap: 'clamp(8px,1.4vw,18px)',
        alignItems: 'start',
      }}
    >
      {imgs.slice(0, 4).map((img, i) => (
        <figure key={img._key} style={{margin: 0, transform: `translateY(${offsets[i]})`}}>
          <Cell img={img} style={{aspectRatio: '2/3'}} w={600} eager={i === 0} />
        </figure>
      ))}
    </div>
  )
}

/* ── Layout B · Hero + Row ── */
function LayoutB({imgs, headline}: {imgs: GridImage[]; headline?: string | null}) {
  const offsets = ['0', 'clamp(10px,2.2vw,44px)', '0', 'clamp(10px,2.2vw,44px)']
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(140px,15vw,220px),1fr))',
        gap: 'clamp(8px,1.4vw,18px)',
        alignItems: 'start',
      }}
    >
      {imgs[0] && (
        <figure
          style={{
            margin: 0,
            gridColumn: 'span 2',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px,1.2vw,16px)',
          }}
        >
          <Cell img={imgs[0]} style={{aspectRatio: '4/3'}} w={1000} eager />
          {headline && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 'clamp(13px,1.9vw,20px)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.35,
              }}
            >
              {headline}
            </div>
          )}
        </figure>
      )}
      {imgs.slice(1, 5).map((img, i) => (
        <figure key={img._key} style={{margin: 0, transform: `translateY(${offsets[i]})`}}>
          <Cell img={img} style={{aspectRatio: '2/3'}} w={600} />
        </figure>
      ))}
    </div>
  )
}

/* ── Layout C · Even Five-Up ── */
function LayoutC({imgs}: {imgs: GridImage[]}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(140px,15vw,220px),1fr))',
        gap: 'clamp(8px,1.4vw,18px)',
        alignItems: 'start',
      }}
    >
      {imgs.slice(0, 5).map((img) => (
        <figure key={img._key} style={{margin: 0}}>
          <Cell img={img} style={{aspectRatio: '2/3'}} w={600} />
        </figure>
      ))}
    </div>
  )
}

/* ── Layout D · Lifestyle Mix ── */
function LayoutD({imgs, headline}: {imgs: GridImage[]; headline?: string | null}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(140px,16vw,240px),1fr))',
        gap: 'clamp(8px,1.4vw,18px)',
        alignItems: 'start',
      }}
    >
      {imgs[0] && (
        <figure style={{margin: 0, gridColumn: 'span 2'}}>
          <Cell img={imgs[0]} style={{aspectRatio: '1/1'}} w={1000} eager />
        </figure>
      )}
      {imgs[1] && (
        <figure style={{margin: 0}}>
          <Cell img={imgs[1]} style={{aspectRatio: '2/3'}} w={600} />
        </figure>
      )}
      {imgs[2] && (
        <figure
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px,1.2vw,16px)',
          }}
        >
          {headline && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 'clamp(11px,1.5vw,15px)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.4,
              }}
            >
              {headline}
            </div>
          )}
          <Cell img={imgs[2]} style={{aspectRatio: '2/3'}} w={600} />
        </figure>
      )}
      {imgs[3] && (
        <figure style={{margin: 0, transform: 'translateY(clamp(8px,1.6vw,32px))'}}>
          <Cell img={imgs[3]} style={{aspectRatio: '2/3'}} w={600} />
        </figure>
      )}
    </div>
  )
}

/* ── Layout E · Edge-to-Edge Mosaic ── */
function LayoutE({imgs, headline}: {imgs: GridImage[]; headline?: string | null}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(120px,13vw,200px),1fr))',
        gridAutoRows: 'clamp(100px,10.5vw,158px)',
        gridAutoFlow: 'dense',
        gap: 'clamp(3px,0.5vw,6px)',
      }}
    >
      {imgs[0] && (
        <Cell img={imgs[0]} style={{gridColumn: 'span 2', gridRow: 'span 3'}} w={1000} eager />
      )}
      {imgs[1] && <Cell img={imgs[1]} style={{gridRow: 'span 2'}} w={600} />}
      {imgs[2] && <Cell img={imgs[2]} style={{gridRow: 'span 2'}} w={600} />}
      <div
        style={{
          gridColumn: 'span 2',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 4px 6px 2px',
          fontFamily: MONO,
          fontSize: 'clamp(10px,1.1vw,13px)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          lineHeight: 1.5,
          color: MUTED,
        }}
      >
        {headline}
      </div>
      {imgs[3] && <Cell img={imgs[3]} style={{gridRow: 'span 2'}} w={600} />}
      {imgs[4] && (
        <Cell img={imgs[4]} style={{gridColumn: 'span 2', gridRow: 'span 2'}} w={1000} />
      )}
      {imgs[5] && <Cell img={imgs[5]} style={{gridRow: 'span 2'}} w={600} />}
      {imgs[6] && (
        <Cell img={imgs[6]} style={{gridColumn: 'span 2', gridRow: 'span 3'}} w={1000} />
      )}
      {imgs[7] && <Cell img={imgs[7]} style={{gridRow: 'span 2'}} w={600} />}
      {imgs[8] && <Cell img={imgs[8]} style={{gridRow: 'span 2'}} w={600} />}
      {imgs[9] && (
        <Cell img={imgs[9]} style={{gridColumn: 'span 2', gridRow: 'span 2'}} w={1000} />
      )}
    </div>
  )
}

/* ── Layout F · Swipe Strip ── */
function LayoutF({imgs}: {imgs: GridImage[]}) {
  const sizes: {flex: string; ratio: string; bottom?: boolean}[] = [
    {flex: 'clamp(180px,26vw,320px)', ratio: '3/4'},
    {flex: 'clamp(140px,18vw,230px)', ratio: '2/3', bottom: true},
    {flex: 'clamp(180px,26vw,320px)', ratio: '1/1'},
    {flex: 'clamp(140px,18vw,230px)', ratio: '2/3', bottom: true},
    {flex: 'clamp(180px,26vw,320px)', ratio: '3/4'},
  ]
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 'clamp(8px,1.2vw,16px)',
          overflowX: 'auto',
          paddingBottom: 14,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {imgs.slice(0, 5).map((img, i) => {
          const s = sizes[i]
          return (
            <figure
              key={img._key}
              style={{
                margin: 0,
                flex: `0 0 ${s.flex}`,
                scrollSnapAlign: 'start',
                alignSelf: s.bottom ? 'flex-end' : 'auto',
              }}
            >
              <Cell img={img} style={{aspectRatio: s.ratio}} w={800} eager={i === 0} />
            </figure>
          )
        })}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#8d8981',
          marginTop: 4,
        }}
      >
        scroll →
      </div>
    </>
  )
}

/* ── Main export ── */
export default function DenimGrid({layout, images, headline}: DenimGridProps) {
  if (!images?.length) return null
  return (
    <div>
      {layout === 'A' && <LayoutA imgs={images} />}
      {layout === 'B' && <LayoutB imgs={images} headline={headline} />}
      {layout === 'C' && <LayoutC imgs={images} />}
      {layout === 'D' && <LayoutD imgs={images} headline={headline} />}
      {layout === 'E' && <LayoutE imgs={images} headline={headline} />}
      {layout === 'F' && <LayoutF imgs={images} />}
    </div>
  )
}
