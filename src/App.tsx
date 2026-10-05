import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProblemSection } from './components/ProblemSection'
import { ProcessFlow } from './components/ProcessFlow'
import { FeatureBento } from './components/FeatureBento'
import { FieldShowcase } from './components/FieldShowcase'
import { HonestySection } from './components/HonestySection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { MobileCTA } from './components/MobileCTA'

function App() {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <a
        href="#main-content"
        className="sr-only rounded-full bg-amber px-4 py-2 text-sm font-medium text-amber-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <ProblemSection />
        <ProcessFlow />
        <HonestySection />
        <FieldShowcase />
        <FeatureBento />
        <CTASection />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}

export default App
