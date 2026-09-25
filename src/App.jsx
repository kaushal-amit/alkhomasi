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
import ContactModal from './components/ContactModal.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import { ContactModalProvider } from './components/ContactModalContext.jsx'

// Page order: promise → proof → what we build → see it working → results →
// who it's for → why us → how we work → questions → contact.
// ProofStrip, CaseStudies and Industries render only once real content is
// added in src/data/content.js.
export default function App() {
  return (
    <ContactModalProvider>
      {/* overflow-x: clip (not hidden) so sticky elements keep working */}
      <div data-modal-background className="[overflow-x:clip]">
        <Navbar />
        <main>
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
        </main>
        <Footer />
      </div>
      <FloatingActions />
      <ContactModal />
    </ContactModalProvider>
  )
}
