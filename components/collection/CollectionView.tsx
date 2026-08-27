'use client'

import AnimateIn from '@/components/shared/AnimateIn'
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

export default function CollectionView({categories: _categories, grids}: Props) {
  return (
    <main className="min-h-screen bg-[#f4f1ea] pt-[68px]">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{background: 'linear-gradient(200deg, var(--color-mist) 0%, var(--color-haze) 50%, var(--color-ivory) 100%)'}}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(83,99,126,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <AnimateIn>
            <p className="type-eyebrow mb-5 text-soil/70">Collection</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="type-hero mb-6 text-charcoal">
              The full range,{' '}
              <span className="font-semibold">one source.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mx-auto max-w-md type-body text-charcoal/65">
              Woven, Knits, Denim, Outerwear — everything a programme needs, under one roof.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Denim Grid sections ── */}
      <section className="bg-[#f4f1ea] pb-24">
        {grids.length > 0 ? (
          <div
            style={{
              maxWidth: '1320px',
              margin: '0 auto',
              padding: 'clamp(28px,4vw,56px) clamp(14px,3vw,40px) 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(40px,6vw,72px)',
            }}
          >
            {grids.map((grid) => (
              <DenimGrid
                key={grid._id}
                layout={grid.layout}
                images={grid.images ?? []}
              />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
