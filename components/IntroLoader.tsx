'use client'

import dynamic from 'next/dynamic'

// dynamic + ssr:false must live inside a 'use client' component.
// This thin wrapper is imported by the Server Component layout.
const PageLoaderVideo = dynamic(
  () => import('@/components/PageLoaderVideo'),
  { ssr: false },
)

export default function IntroLoader() {
  return <PageLoaderVideo />
}
