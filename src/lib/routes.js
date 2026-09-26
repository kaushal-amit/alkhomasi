import { COMPANY } from '../data/site.js'
import { SERVICES, servicePath, serviceBySlug } from '../data/services.js'

// Every page that is prerendered at build time (scripts/prerender.mjs).
export const ROUTES = ['/', ...SERVICES.map(servicePath)]

const normalize = (pathname = '/') => {
  let p = pathname.replace(/index\.html$/, '')
  if (!p.endsWith('/')) p += '/'
  return p
}

export function resolveRoute(pathname) {
  const path = normalize(pathname)
  if (path === '/') return { page: 'home', path }
  const match = path.match(/^\/services\/([^/]+)\/$/)
  const service = match && serviceBySlug(match[1])
  if (service) return { page: 'service', path, service }
  return { page: 'notfound', path }
}

const organization = () => ({
  '@type': 'Organization',
  '@id': `${COMPANY.siteUrl}/#organization`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: `${COMPANY.siteUrl}/`,
  logo: `${COMPANY.siteUrl}/icon-512.png`,
  email: COMPANY.email,
  telephone: COMPANY.phoneDisplay.replace(/\s/g, ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postalCode,
    addressCountry: COMPANY.address.country,
  },
})

// <head> content for a route: title, description, canonical URL and JSON-LD.
export function getMeta(route) {
  const base = COMPANY.siteUrl
  if (route.page === 'service') {
    const s = route.service
    return {
      title: `${s.name} | ${COMPANY.name}`,
      description: `${s.desc}`,
      url: `${base}${route.path}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organization(),
          {
            '@type': 'Service',
            name: s.name,
            description: s.desc,
            serviceType: s.name,
            provider: { '@id': `${base}/#organization` },
            areaServed: 'Worldwide',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${s.name} capabilities`,
              itemListElement: s.capabilities.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c.label } })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
              { '@type': 'ListItem', position: 2, name: s.name, item: `${base}${route.path}` },
            ],
          },
        ],
      },
    }
  }
  if (route.page === 'notfound') {
    return { title: `Page not found | ${COMPANY.name}`, description: 'The page you were looking for could not be found.', url: null, noindex: true }
  }
  return {
    title: `${COMPANY.name} | AI Solutions, Automation & Business Software`,
    description: `${COMPANY.legalName} designs and builds AI solutions, AI agents, workflow automation, business software and system integrations — built around the way your business works.`,
    url: `${base}/`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization(),
        { '@type': 'WebSite', name: COMPANY.name, url: `${base}/`, publisher: { '@id': `${base}/#organization` } },
      ],
    },
  }
}
