import type {Metadata} from 'next'
import {Outfit, Work_Sans} from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
// ssr:false keeps the loader purely client-side — no SSR HTML, no hydration
// mismatch, and localStorage is safely readable on first render.
const PageLoaderVideo = dynamic(() => import('@/components/PageLoaderVideo'), { ssr: false })
import {client} from '@/sanity/lib/client'
import {siteSettingsQuery} from '@/sanity/lib/queries'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Credence Asia Group | Apparel Sourcing & Production Partner',
  description:
    'Credence Asia Group supports apparel brands with product development, sourcing, sampling, production coordination, quality control, and delivery across global manufacturing networks.',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-charcoal">
        <PageLoaderVideo />
        <SmoothScroll>
          {children}
          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  )
}
