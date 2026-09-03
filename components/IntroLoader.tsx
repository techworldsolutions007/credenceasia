// Server-component passthrough — no 'use client' needed here.
// PageLoaderVideo already has 'use client' so Next.js SSRs it and
// hydrates it on the client. This file exists only so layout.tsx
// does not need to be changed.
import PageLoaderVideo from '@/components/PageLoaderVideo'

export default function IntroLoader() {
  return <PageLoaderVideo />
}
