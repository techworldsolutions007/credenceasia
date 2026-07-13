import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'

import AboutHero  from '@/components/about/AboutHero'
import GlobalHubs from '@/components/about/GlobalHubs'
import TrustProof from '@/components/about/TrustProof'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About | Credence Asia Group',
  description:
    'Founded in 2016 in Hong Kong, Credence Asia Group links European and American design and market knowledge with Asian manufacturing. Conscious quality and value through design.',
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery).catch(() => null)

  return (
    <main className="min-h-screen bg-ivory pt-[68px]">
      <AboutHero title={data?.title} introText={data?.introText} />
      <GlobalHubs />
      <TrustProof />
    </main>
  )
}
