// ─────────────────────────────────────────────────────────────────────────────
// Company proof & trust content.
//
// Every section driven by this file stays HIDDEN until its list/field has real
// content, so the live site never shows placeholder or invented claims.
// Fill these in with real, verifiable information only.
//
// To preview how the sections look before real content exists, run:
//   VITE_CONTENT_PREVIEW=true npm run dev
// which swaps in the bracketed placeholders from content.example.js.
// ─────────────────────────────────────────────────────────────────────────────
import example from './content.example.js'

const content = {
  // Headline numbers shown under the hero, e.g. { value: '120+', label: 'Projects delivered' }
  stats: [],

  // Client / partner names you have permission to show. `logo` is optional:
  // a path under /public (e.g. '/clients/acme.svg'); without it the name is shown.
  clients: [],

  // Short case studies: { client, industry, title, challenge, solution, results: ['...'], services: ['AI Agents'] }
  caseStudies: [],

  // Testimonials you have permission to publish: { quote, name, role, company }
  testimonials: [],

  // Industries you serve: { name, desc }  (icon is chosen automatically)
  industries: [],

  // Social profile URLs — leave '' to hide an icon
  social: {
    linkedin: '',
    x: '',
    instagram: '',
    facebook: '',
    youtube: '',
  },

  // Legal pages — leave '' to hide a link
  legal: {
    privacyUrl: '',
    termsUrl: '',
  },
}

export default import.meta.env.VITE_CONTENT_PREVIEW === 'true' ? example : content
