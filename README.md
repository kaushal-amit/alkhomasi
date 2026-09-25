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

`npm run build` also **prerenders** the page: it renders the React app to HTML
at build time (`src/entry-server.jsx` → `scripts/prerender.mjs`) and injects it
into `dist/index.html`, which the browser then hydrates. The page is therefore
readable by search engines, link previews and visitors without JavaScript.

## Contact form

Submissions go through `src/lib/submitLead.js`:

- **With `VITE_FORM_ENDPOINT` set** (in `.env` or your host's build settings),
  the form POSTs JSON to that URL — e.g. Formspree, Web3Forms, Basin, or your
  own API/CRM webhook.
- **Without it**, the form opens the visitor's email app with the enquiry
  pre-filled to `info@alkhomasi.com`, so no enquiry is silently lost.

The form validates inline, includes a hidden honeypot field against simple
bots, and shows sending / sent / error states.

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
  hooks/motion.js             Reduced-motion + in-view hooks for looping demos
  lib/submitLead.js           Contact-form delivery (endpoint or mailto fallback)
  entry-server.jsx            Build-time render used by scripts/prerender.mjs
  App.jsx                     Composes all sections
  index.css                   Tailwind + brand utility classes
tailwind.config.js            Brand color tokens, fonts, keyframes
```

## Design system

Defined in `tailwind.config.js` and `src/index.css` — use these instead of
one-off values:

- **Type scale:** `text-2xs` 11 · `xs` 12.5 · `sm` 14 · `base` 16 · `lg` 18 ·
  `xl` 20 · `2xl` 24 · fluid headings `text-h3`, `text-h2`, `text-display`.
- **Radii:** `rounded-xl` 12 (small) · `rounded-2xl` 18 (medium) ·
  `rounded-3xl` 28 (large) · `rounded-full` (pills).
- **Buttons:** `btn-primary`, `btn-secondary`, `btn-ghost-light` (on dark),
  `link-arrow` (text link + arrow chip); sizes `btn-sm` / `btn-lg`;
  `icon-btn` for icon-only buttons.
- **Surfaces:** `card-surface` (light) and `card-dark` (navy feature panel).
- **Section rhythm:** `section-y-lg` for key sections, `section-y` standard,
  `section-y-sm` for supporting sections.
- **Contrast:** small text on navy uses at least `text-white/60`.
- **Motion:** looping demos pause when off-screen and respect
  `prefers-reduced-motion` (`src/hooks/motion.js`).

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
- `public/robots.txt` and `public/sitemap.xml` assume the site is served at
  `https://alkhomasi.com/` — update both if the domain differs.
- Contact details live in `src/data/site.js`. The WhatsApp link assumes the
  number is Indian (`+91`); update `whatsappHref` there if that changes.
