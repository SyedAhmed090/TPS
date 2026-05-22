import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PatchCalculator from './components/PatchCalculator'

const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Promotions = lazy(() => import('./pages/Promotions'))
const FreeQuote = lazy(() => import('./pages/FreeQuote'))

// About
const About = lazy(() => import('./pages/about/About'))
const CustomPatchCompany = lazy(() => import('./pages/about/CustomPatchCompany'))
const LowMinimum = lazy(() => import('./pages/about/LowMinimum'))
const Blog = lazy(() => import('./pages/about/Blog'))
const DoItYourself = lazy(() => import('./pages/about/DoItYourself'))
const FAQs = lazy(() => import('./pages/about/FAQs'))
const HowToOrder = lazy(() => import('./pages/about/HowToOrder'))
const Testimonials = lazy(() => import('./pages/about/Testimonials'))
const Contact = lazy(() => import('./pages/about/Contact'))

// Patches
const Patches = lazy(() => import('./pages/patches/Patches'))
const BackingTypes = lazy(() => import('./pages/patches/BackingTypes'))
const BackingTypeDetail = lazy(() => import('./pages/patches/BackingTypeDetail'))
const PatchCategories = lazy(() => import('./pages/patches/PatchCategories'))
const PatchCategoryDetail = lazy(() => import('./pages/patches/PatchCategoryDetail'))
const PatchStyles = lazy(() => import('./pages/patches/PatchStyles'))
const PatchStyleDetail = lazy(() => import('./pages/patches/PatchStyleDetail'))
const PatchBorders = lazy(() => import('./pages/patches/PatchBorders'))
const ThreadsAndTwills = lazy(() => import('./pages/patches/ThreadsAndTwills'))
const CamoTwill = lazy(() => import('./pages/patches/CamoTwill'))

// Products
const Products = lazy(() => import('./pages/products/Products'))
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'))

// Pricing
const Pricing = lazy(() => import('./pages/pricing/Pricing'))
const EmbroideredPricing = lazy(() => import('./pages/pricing/EmbroideredPricing'))

// Footer pages
const PrivacyPolicy = lazy(() => import('./pages/footer/PrivacyPolicy'))
const ReturnPolicy = lazy(() => import('./pages/footer/ReturnPolicy'))
const Resources = lazy(() => import('./pages/footer/Resources'))
const Sitemap = lazy(() => import('./pages/footer/Sitemap'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function CalcSection() {
  return (
    <section style={{ background: 'var(--navy-mid)', padding: '5.5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,147,26,0.03) 0px, rgba(200,147,26,0.03) 1px, transparent 1px, transparent 32px)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Instant Estimate</span>
          <h2 className="section-title light">Price Your Custom Patches</h2>
          <p className="section-subtitle light" style={{ margin: '0 auto' }}>Get an instant estimate before requesting your free official quote.</p>
        </div>
        <PatchCalculator />
      </div>
    </section>
  )
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<div />}>
          <Routes>
            {/* Main */}
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/free-quote" element={<FreeQuote />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/custom-patch-company" element={<CustomPatchCompany />} />
            <Route path="/about/low-minimum-embroidered-patches" element={<LowMinimum />} />
            <Route path="/about/blog" element={<Blog />} />
            <Route path="/about/do-it-yourself" element={<DoItYourself />} />
            <Route path="/about/faqs" element={<FAQs />} />
            <Route path="/about/how-to-order" element={<HowToOrder />} />
            <Route path="/about/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />

            {/* Patches */}
            <Route path="/patches" element={<Patches />} />
            <Route path="/patches/backing-types" element={<BackingTypes />} />
            <Route path="/patches/backing-types/:slug" element={<BackingTypeDetail />} />
            <Route path="/patches/categories" element={<PatchCategories />} />
            <Route path="/patches/categories/:slug" element={<PatchCategoryDetail />} />
            <Route path="/patches/styles" element={<PatchStyles />} />
            <Route path="/patches/styles/:slug" element={<PatchStyleDetail />} />
            <Route path="/patches/patch-borders" element={<PatchBorders />} />
            <Route path="/patches/threads-and-twills" element={<ThreadsAndTwills />} />
            <Route path="/patches/threads-and-twills/camo-twill" element={<CamoTwill />} />

            {/* Products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />

            {/* Pricing */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/embroidered-patches" element={<EmbroideredPricing />} />

            {/* Footer */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </Suspense>
      </main>
      {pathname !== '/' && <CalcSection />}
      <Footer />
    </>
  )
}
