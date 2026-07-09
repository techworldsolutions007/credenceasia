import {type SchemaTypeDefinition} from 'sanity'

import {siteSettings} from './siteSettings'
import {country} from './country'
import {product} from './product'
import {homePage} from './homePage'
import {productCategory} from './productCategory'
import {productionLocation} from './productionLocation'
import {customer} from './customer'
import {sustainabilityItem} from './sustainabilityItem'
import {contactPage} from './contactPage'
import {aboutPage} from './aboutPage'
import {sustainabilityPage} from './sustainabilityPage'
import {partnerLogo} from './partnerLogo'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    siteSettings,
    country,
    product,
    homePage,
    productCategory,
    productionLocation,
    customer,
    sustainabilityItem,
    partnerLogo,
    contactPage,
    aboutPage,
    sustainabilityPage,
  ],
}
