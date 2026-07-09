import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {
  homePageQuery,
  featuredProductCategoriesQuery,
  featuredSustainabilityItemsQuery,
  countriesQuery,
  customersQuery,
} from '@/sanity/lib/queries'
import HomeHero from '@/components/home/HomeHero'
import WhoWeAre from '@/components/home/WhoWeAre'
import ProductionMapSection from '@/components/sections/ProductionMapSection'
import OurApproach from '@/components/home/OurApproach'
import SustainabilityPreview from '@/components/home/SustainabilityPreview'
import ProductPreview from '@/components/home/ProductPreview'
import CustomersPreview from '@/components/home/CustomersPreview'
import FinalCTA from '@/components/home/FinalCTA'
import {getCertificateLogos} from '@/lib/certificates'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Credence Asia Group | Apparel Sourcing & Production Partner',
  description:
    'Credence Asia Group supports apparel brands with product development, sourcing, sampling, production coordination, quality control, and delivery across global manufacturing networks.',
}

export default async function HomePage() {
  const [homePage, categories, partnerLogos, sustainItems, countries, certificateLogos] = await Promise.all([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(featuredProductCategoriesQuery).catch(() => []),
    client.fetch(customersQuery).catch(() => []),
    client.fetch(featuredSustainabilityItemsQuery).catch(() => []),
    client.fetch(countriesQuery).catch(() => []),
    getCertificateLogos(),
  ])

  return (
    <main>
      <HomeHero data={homePage} />
      <WhoWeAre
        aboutTitle={homePage?.aboutTitle}
        aboutText={homePage?.aboutText}
        aboutImage={homePage?.aboutImage}
        aboutPoints={homePage?.aboutPoints}
      />
      <ProductionMapSection countries={countries} />
      <OurApproach />
      <SustainabilityPreview
        items={sustainItems}
        sustainabilityTitle={homePage?.sustainabilityTitle}
        sustainabilityText={homePage?.sustainabilityText}
        certificateLogos={certificateLogos}
      />
      <ProductPreview
        categories={categories}
        productTitle={homePage?.productTitle}
        productText={homePage?.productText}
      />
      <CustomersPreview
        partners={partnerLogos}
        customersTitle={homePage?.customersTitle}
        customersText={homePage?.customersText}
      />
      <FinalCTA
        ctaTitle={homePage?.ctaTitle}
        ctaText={homePage?.ctaText}
        ctaPrimaryButtonText={homePage?.ctaPrimaryButtonText}
        ctaPrimaryButtonLink={homePage?.ctaPrimaryButtonLink}
        ctaSecondaryButtonText={homePage?.ctaSecondaryButtonText}
        ctaSecondaryButtonLink={homePage?.ctaSecondaryButtonLink}
      />
    </main>
  )
}
