export const countriesQuery = `*[_type == "country"] | order(order asc, name asc){
  _id, name, tag, role, svgId, isHub, specialties, order
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName, logo, email, phone, address,
  instagram, linkedin, footerText,
  metaTitle, metaDescription, ogImage
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  heroEyebrow, heroTitle, heroText, heroImage,
  heroPrimaryButtonText, heroPrimaryButtonLink,
  heroSecondaryButtonText, heroSecondaryButtonLink,
  aboutTitle, aboutText, aboutImage, aboutPoints, sectionBreakImage,
  productionTitle, productionText,
  journeyStages[]{
    _key,
    label,
    stat,
    statLabel,
    image,
    variant
  },
  sustainabilityTitle, sustainabilityText,
  productTitle, productText,
  customersTitle, customersText,
  ctaTitle, ctaText,
  ctaPrimaryButtonText, ctaPrimaryButtonLink,
  ctaSecondaryButtonText, ctaSecondaryButtonLink
}`

export const featuredProductCategoriesQuery = `*[_type == "productCategory" && isFeatured == true] | order(order asc, name asc)[0...6]{
  _id, name, slug, image, shortText
}`

export const customersQuery = `*[_type == "customer"] | order(order asc, name asc){
  _id, name, logo, type, country, website, isFeatured
}`

export const featuredCustomersQuery = `*[_type == "customer" && isFeatured == true] | order(order asc, name asc){
  _id, name, logo, type, country
}`

export const featuredSustainabilityItemsQuery = `*[_type == "sustainabilityItem" && isFeatured == true] | order(order asc)[0...3]{
  _id, title, shortText, icon
}`

export const contactPageQuery = `*[_type == "contactPage"][0]{
  title, introText, image, email, phone, address
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title, introText, heroImage,
  whoTitle, whoText,
  whatTitle, whatText,
  image, ctaTitle, ctaText
}`

export const sustainabilityPageQuery = `*[_type == "sustainabilityPage"][0]{
  title, introText, heroImage,
  sections[]{ sectionTitle, sectionText, sectionImage },
  ctaTitle, ctaText
}`

export const partnerLogosQuery = `*[_type == "partnerLogo" && isActive != false] | order(order asc, name asc){
  _id, name, logo
}`
