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

  // Projects for the "Projects" section. AI projects are listed first, then
  // live ones. Only publish work you have permission to show.
  // {
  //   title: 'Product name',
  //   formerly: 'Old name',            // optional
  //   category: 'fintech',             // legal | trading | edtech | fintech | food | business | tracking
  //   ai: true,                        // shows the AI badge and sorts first
  //   status: 'live',                  // 'live' shows the Live badge; omit for earlier work
  //   region: 'Kuwait',                // optional
  //   platform: 'Web · iOS · Android', // optional
  //   summary: 'One or two sentences on what it does and for whom.',
  //   highlights: ['Key capability'],  // optional
  //   services: ['AI Solutions'],      // names from src/data/services.js (name or shortName)
  //   image: '/projects/acme.webp',    // optional cover under /public; a branded cover is drawn without it
  //   links: [{ label: 'Visit website', href: 'https://…' }], // optional
  // }
  projects: [
    {
      title: 'Alitqan AI',
      category: 'legal',
      ai: true,
      status: 'live',
      region: 'Kuwait',
      platform: 'Web · Android',
      summary:
        'An AI legal assistant for lawyers, law firms, legal consultants and law students in Kuwait. It answers questions from Kuwaiti laws, decrees, ministerial decisions and court rulings, with clear explanations.',
      highlights: [
        'Answers grounded in an organised database of Kuwaiti law',
        'Supports legal research, memorandums and contract review',
        'Built for law firms, consultants and students',
      ],
      services: ['AI Solutions', 'AI Agents'],
      links: [{ label: 'Visit alitqan.ai', href: 'https://alitqan.ai' }],
    },
    {
      title: 'YASA',
      category: 'edtech',
      ai: true,
      status: 'live',
      region: 'Middle East',
      platform: 'Mobile app',
      summary:
        'A live-learning platform that connects students from grade 6 to 12 with expert teachers through interactive, face-to-face video lessons — on demand, in about a minute.',
      highlights: [
        'Instant one-to-one video lessons with expert tutors',
        'All subjects from grade 6 to grade 12',
        'Smart tools that support teachers and students',
      ],
      services: ['AI Solutions', 'Business Software'],
    },
    {
      title: 'Daily Trading AI',
      category: 'trading',
      ai: true,
      summary: 'An AI product that supports day-to-day trading with data-driven market analysis.',
      services: ['AI Solutions', 'Data & BI'],
    },
    {
      title: '121order',
      formerly: '8Tiffins',
      category: 'food',
      status: 'live',
      region: 'Kuwait',
      platform: 'Web · iOS · Android',
      summary:
        'A food-ordering app that lets customers order from several restaurant brands in a single order. It began as 8Tiffins, a subscription service for home-style Indian meals, and grew into a multi-brand virtual food court.',
      highlights: [
        'Multiple brands in one order and one delivery',
        'Meal subscriptions with flexible schedules',
        'Live order tracking',
      ],
      services: ['Business Software', 'System Integration'],
      links: [{ label: 'Visit 121order.com', href: 'https://121order.com' }],
    },
    {
      title: '2easy2pay',
      category: 'fintech',
      status: 'live',
      region: 'Kuwait',
      platform: 'Android',
      summary:
        'A mobile app for prepaid recharges, data cards and postpaid bill payments across Kuwait’s mobile operators — quick, simple and secure.',
      highlights: [
        'Prepaid and data-card recharges',
        'Postpaid mobile bill payments',
        'Plans from Zain, Ooredoo and Viva in one place',
      ],
      services: ['Business Software', 'System Integration'],
      links: [
        {
          label: 'Get it on Google Play',
          href: 'https://play.google.com/store/apps/details?id=com.twoeasytwopay.customerutility',
        },
      ],
    },
    {
      title: 'SWIPE — Mobile Point of Sale',
      category: 'fintech',
      platform: 'Mobile app',
      summary:
        'A smartphone point-of-sale app that lets businesses take card payments anywhere. The merchant enters the amount and swipes the card, the customer confirms with their PIN, and an SMS receipt is sent straight away.',
      highlights: [
        'Card payments for restaurants, shops, clinics and salons',
        'PIN confirmation with instant SMS receipts',
        'Transactions managed in real time',
      ],
      services: ['Business Software', 'System Integration'],
    },
    {
      title: 'COC Kuwait',
      category: 'business',
      region: 'Kuwait',
      summary: 'Software for company registration and renewal, with the workflow and document management behind it.',
      highlights: ['Registration and renewal workflows', 'Document management'],
      services: ['Workflow Automation', 'Business Software'],
    },
    {
      title: 'School Bus & Children Tracking',
      category: 'tracking',
      platform: 'Mobile app',
      summary: 'A mobile solution for tracking school buses and the children travelling on them.',
      services: ['Business Software', 'System Integration'],
    },
  ],

  // Client reviews you have permission to publish:
  // { quote, name, role, company, rating: 5 (optional, 1–5), photo: '/clients/jane.webp' (optional) }
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
