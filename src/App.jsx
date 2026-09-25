import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CapabilityStrip from './components/CapabilityStrip.jsx'
import ServicesExplorer from './components/ServicesExplorer.jsx'
import AIAgents from './components/AIAgents.jsx'
import WorkflowAutomation from './components/WorkflowAutomation.jsx'
import BusinessSoftware from './components/BusinessSoftware.jsx'
import BusinessIntelligence from './components/BusinessIntelligence.jsx'
import SystemIntegration from './components/SystemIntegration.jsx'
import DigitalTransformation from './components/DigitalTransformation.jsx'
import WhyAlKhomasi from './components/WhyAlKhomasi.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ContactModal from './components/ContactModal.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import { ContactModalProvider } from './components/ContactModalContext.jsx'

export default function App() {
  return (
    <ContactModalProvider>
      {/* overflow-x: clip (not hidden) so sticky elements keep working */}
      <div data-modal-background className="[overflow-x:clip]">
        <Navbar />
        <main>
          <Hero />
          <CapabilityStrip />
          <ServicesExplorer />
          <AIAgents />
          <WorkflowAutomation />
          <BusinessSoftware />
          <BusinessIntelligence />
          <SystemIntegration />
          <DigitalTransformation />
          <WhyAlKhomasi />
          <HowWeWork />
          <FinalCTA />
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
