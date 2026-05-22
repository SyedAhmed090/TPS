import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Promotions from './pages/Promotions'
import FreeQuote from './pages/FreeQuote'

// About
import About from './pages/about/About'
import CustomPatchCompany from './pages/about/CustomPatchCompany'
import LowMinimum from './pages/about/LowMinimum'
import Blog from './pages/about/Blog'
import DoItYourself from './pages/about/DoItYourself'
import FAQs from './pages/about/FAQs'
import HowToOrder from './pages/about/HowToOrder'
import Testimonials from './pages/about/Testimonials'
import Contact from './pages/about/Contact'

// Patches
import Patches from './pages/patches/Patches'
import BackingTypes from './pages/patches/BackingTypes'
import BackingTypeDetail from './pages/patches/BackingTypeDetail'
import PatchCategories from './pages/patches/PatchCategories'
import PatchCategoryDetail from './pages/patches/PatchCategoryDetail'
import PatchStyles from './pages/patches/PatchStyles'
import PatchStyleDetail from './pages/patches/PatchStyleDetail'
import PatchBorders from './pages/patches/PatchBorders'
import ThreadsAndTwills from './pages/patches/ThreadsAndTwills'
import CamoTwill from './pages/patches/CamoTwill'

// Products
import Products from './pages/products/Products'
import ProductDetail from './pages/products/ProductDetail'

// Pricing
import Pricing from './pages/pricing/Pricing'
import EmbroideredPricing from './pages/pricing/EmbroideredPricing'

// Footer pages
import PrivacyPolicy from './pages/footer/PrivacyPolicy'
import ReturnPolicy from './pages/footer/ReturnPolicy'
import Resources from './pages/footer/Resources'
import Sitemap from './pages/footer/Sitemap'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </>
  )
}
