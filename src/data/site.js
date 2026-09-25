// Single source of truth for company contact details and requirement types,
// so the top bar, contact section, modal and footer never drift apart.
export const COMPANY = {
  name: 'AL-KHOMASI',
  legalName: 'AL-KHOMASI SOFTWARE PRIVATE LIMITED',
  // Public site address — used for canonical URLs, sitemap and social previews
  siteUrl: 'https://alkhomasi.com',
  tagline: 'AI Solutions & Digital Transformation Partner',
  motto: 'Identify. Automate. Integrate. Scale.',
  phone: '8878571610',
  phoneDisplay: '+91 88785 71610',
  phoneHref: 'tel:+918878571610',
  whatsappHref: 'https://wa.me/918878571610',
  email: 'info@alkhomasi.com',
  // Corporate Identification Number — shown in the footer when set
  cin: '',
  address: {
    street: '1st Floor, Utkarsh Arcade, New Shivaji Nagar, Thatipur, R.K. Puri',
    city: 'Gwalior',
    region: 'Madhya Pradesh',
    postalCode: '474011',
    country: 'IN',
  },
  addressLines: [
    '1st Floor, Utkarsh Arcade, New Shivaji Nagar, Thatipur,',
    'R.K. Puri, Gwalior, Madhya Pradesh – 474011',
  ],
}

export const REQUIREMENT_TYPES = [
  'AI Solution',
  'AI Agent',
  'Workflow Automation',
  'Business Software',
  'Data & Business Intelligence',
  'System Integration',
  'Digital Transformation',
  'Not sure yet — need advice',
]
