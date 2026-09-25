import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProofStrip from './components/ProofStrip.jsx'
import ServicesExplorer from './components/ServicesExplorer.jsx'
import SeeItInAction from './components/SeeItInAction.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import Industries from './components/Industries.jsx'
import WhyAlKhomasi from './components/WhyAlKhomasi.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ServicePage from './components/ServicePage.jsx'
import NotFound from './components/NotFound.jsx'
import ContactModal from './components/ContactModal.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import { ContactModalProvider } from './components/ContactModalContext.jsx'
import { PageProvider } from './lib/page.jsx'
import { resolveRoute, getMeta } from './lib/routes.js'
import { initSpotlight } from './lib/spotlight.js'

// Home page order: promise → proof → what we build → see it working →
// results → who it's for → why us → how we work → questions → contact.
// ProofStrip, CaseStudies and Industries render only once real content is
// added in src/data/content.js.
function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicesExplorer />
      <SeeItInAction />
      <CaseStudies />
      <Industries />
      <WhyAlKhomasi />
      <HowWeWork />
      <FAQ />
      <Contact />
    </>
  )
}

// `url` is passed during prerendering; in the browser the current path is used.
export default function App({ url }) {
  const route = resolveRoute(url ?? window.location.pathname)

  // Keep the tab title right in development (production HTML is prerendered with it)
  useEffect(() => {
    document.title = getMeta(route).title
  }, [route.path])

  useEffect(() => initSpotlight(), [])

  return (
    <PageProvider value={route}>
      <ContactModalProvider>
        {/* overflow-x: clip (not hidden) so sticky elements keep working */}
        <div data-modal-background className="[overflow-x:clip]">
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {route.page === 'home' && <HomePage />}
            {route.page === 'service' && <ServicePage service={route.service} />}
            {route.page === 'notfound' && <NotFound />}
          </main>
          <Footer />
        </div>
        <FloatingActions />
        <ContactModal />
      </ContactModalProvider>
    </PageProvider>
  )
}
