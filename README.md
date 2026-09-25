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
  components/
    Navbar.jsx               Sticky nav, scroll compaction, mobile menu
    Hero.jsx                 Headline + animated workflow visual
    CapabilityStrip.jsx      Scrolling capability marquee
    SolutionsOverview.jsx    "What We Build" — transformation spine + 6 capabilities
    AIAgents.jsx             Interactive tabbed AI-agent demo panel
    WorkflowAutomation.jsx   Clickable automation node flow
    BusinessSoftware.jsx     Dashboard-style UI demonstration
    BusinessIntelligence.jsx Analytics dashboard visual (KPIs, chart, trend line)
    SystemIntegration.jsx    Radial integration map (ERP/CRM/APIs/Cloud/DB)
    DigitalTransformation.jsx Before/after comparison
    HowWeWork.jsx             6-step process timeline
    WhyAlKhomasi.jsx          6 differentiator points
    FinalCTA.jsx              Closing call to action
    Contact.jsx               Contact details + requirement form
    Footer.jsx                Footer navigation and tagline
    SectionHeading.jsx        Shared eyebrow/title/description block
    Reveal.jsx                Scroll-reveal wrapper (IntersectionObserver)
  App.jsx                     Composes all sections
  index.css                   Tailwind + brand utility classes
tailwind.config.js             Brand color tokens, type scale, keyframes
```

## Brand tokens

| Token      | Hex       |
|------------|-----------|
| `navy`     | `#062B63` |
| `primary`  | `#0868C9` |
| `bright`   | `#168BE0` |
| `haze`     | `#EFF7FF` |
| `ink`      | `#0B1F3A` |

Typefaces: **Sora** (display/headings) + **Inter** (body), loaded via Google Fonts
in `index.html`.

## Notes

- All copy, services and contact details come directly from the content brief —
  no invented clients, stats, testimonials or claims.
- The AI-agent, workflow, dashboard and integration visuals are clearly framed
  as capability demonstrations, not live product screenshots or real data.
- The contact form is a working frontend form (client-side only); wire its
  `onSubmit` in `Contact.jsx` to your email/CRM endpoint of choice.
