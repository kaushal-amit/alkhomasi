# AL-KHOMASI — Website Frontend

A premium single-page marketing site for **AL-KHOMASI SOFTWARE PRIVATE LIMITED**,
built with React, Vite and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/`, ready to deploy to any static host
(Vercel, Netlify, S3 + CloudFront, etc.).

## Project structure

```
src/
  data/site.js                Company contact details + requirement types (single source)
  components/
    Navbar.jsx                Contact ticker, sticky nav with scroll-spy, mobile menu
    Hero.jsx                  Headline, trust points + animated "live" workflow card
    CapabilityStrip.jsx       Scrolling capability marquee
    ServicesExplorer.jsx      Sticky dark rail + six service panels with capability tiles
    AIAgents.jsx              Tabbed AI-agent demo (activity steps + typed reply)
    WorkflowAutomation.jsx    Auto-playing six-step automation flow
    BusinessSoftware.jsx      Dashboard-style interface demonstration
    BusinessIntelligence.jsx  Analytics dashboard visual (KPIs, chart, trend line)
    SystemIntegration.jsx     Radial integration map (ERP/CRM/APIs/Cloud/DB)
    DigitalTransformation.jsx Before/after comparison table
    WhyAlKhomasi.jsx          Method ring (Identify/Automate/Integrate/Scale) + 6 differentiators
    HowWeWork.jsx             Six-step process timeline
    FinalCTA.jsx              Closing call to action
    FAQ.jsx                   Accordion of common questions
    Contact.jsx               Dark info panel + requirement form
    ContactModal.jsx          "Let's Talk" dialog (focus trap, Esc to close)
    ContactForm.jsx           Shared form used by Contact and the modal
    ContactModalContext.jsx   Open/close state for the modal
    FloatingActions.jsx       "Get a Call Back" tab, WhatsApp button, back-to-top
    Footer.jsx                Footer navigation, contact details
    Logo.jsx, SectionHeading.jsx, Reveal.jsx   Shared building blocks
  App.jsx                     Composes all sections
  index.css                   Tailwind + brand utility classes
tailwind.config.js            Brand color tokens, fonts, keyframes
```

## Brand tokens

| Token      | Hex       |
|------------|-----------|
| `navy`     | `#062B63` |
| `primary`  | `#0868C9` |
| `bright`   | `#168BE0` |
| `haze`     | `#EFF7FF` |
| `ink`      | `#0B1F3A` |
| `navy-deep`| `#041B42` |
| `sky`      | `#5CC2FF` |

Typefaces: **Sora** (display/headings) + **Plus Jakarta Sans** (body), loaded via Google Fonts
in `index.html`.

## Notes

- All copy, services and contact details come directly from the content brief —
  no invented clients, stats, testimonials or claims.
- The AI-agent, workflow, dashboard and integration visuals are clearly framed
  as capability demonstrations, not live product screenshots or real data.
- The contact form is a working frontend form (client-side only); wire
  `handleSubmit` in `ContactForm.jsx` to your email/CRM endpoint of choice.
  Both the Contact section and the "Let's Talk" modal use it.
- Contact details live in `src/data/site.js`. The WhatsApp link assumes the
  number is Indian (`+91`); update `whatsappHref` there if that changes.
