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

        {/* ── Many more – glitter text ── */}
        <div className="relative mt-16 mb-2 flex justify-center py-14 select-none overflow-hidden">
          <p className="glitter-many-text text-[clamp(1.6rem,4vw,3.2rem)] font-bold uppercase tracking-[0.18em]">
            &amp; many more products
          </p>
          <span className="glitter-spark sp1" aria-hidden />
          <span className="glitter-spark sp2" aria-hidden />
          <span className="glitter-spark sp3" aria-hidden />
          <span className="glitter-spark sp4" aria-hidden />
          <span className="glitter-spark sp5" aria-hidden />
          <span className="glitter-spark sp6" aria-hidden />
        </div>

        <style>{`
          .glitter-many-text {
            background: linear-gradient(
              110deg,
              #7a6040 0%,
              #b8935a 18%,
              #e5c97a 32%,
              #fffbe8 42%,
              #e5c97a 52%,
              #b8935a 66%,
              #7a6040 80%,
              #c9a96e 90%,
              #fffbe8 100%
            );
            background-size: 250% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: glitter-shine 4s linear infinite;
          }
          @keyframes glitter-shine {
            0%   { background-position: 0% center; }
            100% { background-position: 250% center; }
          }

          /* four-point sparkle stars */
          .glitter-spark {
            position: absolute;
            pointer-events: none;
            animation: spark-pop 2s ease-in-out infinite;
            opacity: 0;
          }
          .glitter-spark::before,
          .glitter-spark::after {
            content: '';
            position: absolute;
            inset: 0;
            margin: auto;
            background: #e5c97a;
            border-radius: 999px;
          }
          .glitter-spark::before { width: 100%; height: 18%; }
          .glitter-spark::after  { width: 18%; height: 100%; }

          .sp1 { width:18px; height:18px; top:18%; left:6%;   animation-delay:0s;    }
          .sp2 { width:12px; height:12px; top:70%; left:12%;  animation-delay:0.6s;  }
          .sp3 { width:22px; height:22px; top:15%; left:82%;  animation-delay:1.1s;  }
          .sp4 { width:14px; height:14px; top:72%; left:88%;  animation-delay:0.3s;  }
          .sp5 { width:16px; height:16px; top:20%; left:48%;  animation-delay:0.9s;  }
          .sp6 { width:10px; height:10px; top:75%; left:55%;  animation-delay:1.5s;  }

          @keyframes spark-pop {
            0%,100% { opacity:0; transform:scale(0) rotate(0deg);   }
            40%      { opacity:1; transform:scale(1) rotate(20deg);  }
            70%      { opacity:.6; transform:scale(.9) rotate(-10deg);}
          }

          @media (prefers-reduced-motion: reduce) {
            .glitter-many-text { animation: none; background-position: 40% center; }
            .glitter-spark     { display: none; }
          }
        `}</style>
      </section>
    </main>
  )
}
