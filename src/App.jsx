import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CapabilityStrip from './components/CapabilityStrip.jsx'
import SolutionsOverview from './components/SolutionsOverview.jsx'
import AIAgents from './components/AIAgents.jsx'
import WorkflowAutomation from './components/WorkflowAutomation.jsx'
import BusinessSoftware from './components/BusinessSoftware.jsx'
import BusinessIntelligence from './components/BusinessIntelligence.jsx'
import SystemIntegration from './components/SystemIntegration.jsx'
import DigitalTransformation from './components/DigitalTransformation.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import WhyAlKhomasi from './components/WhyAlKhomasi.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CapabilityStrip />
        <SolutionsOverview />
        <AIAgents />
        <WorkflowAutomation />
        <BusinessSoftware />
        <BusinessIntelligence />
        <SystemIntegration />
        <DigitalTransformation />
        <HowWeWork />
        <WhyAlKhomasi />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
