import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PatchCalculator from './components/PatchCalculator'
import PageLoader from './components/PageLoader'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import AdminRoute from './components/admin/AdminRoute'

// Admin pages
const AdminLogin  = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard      = lazy(() => import('./pages/admin/Dashboard'))
const AdminQuotes    = lazy(() => import('./pages/admin/Quotes'))
const AdminOrders    = lazy(() => import('./pages/admin/Orders'))
const AdminContacts  = lazy(() => import('./pages/admin/Contacts'))
const AdminCustomers = lazy(() => import('./pages/admin/Customers'))
const BlogManager    = lazy(() => import('./pages/admin/BlogManager'))
const DiscountCodes  = lazy(() => import('./pages/admin/DiscountCodes'))
const SampleRequests = lazy(() => import('./pages/admin/SampleRequests'))
const AdminSettings  = lazy(() => import('./pages/admin/Settings'))

// Account pages
const AccountLogin    = lazy(() => import('./pages/account/Login'))
const AccountSignUp   = lazy(() => import('./pages/account/SignUp'))
const ResetPassword   = lazy(() => import('./pages/account/ResetPassword'))
const Account         = lazy(() => import('./pages/account/Account'))

const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Promotions = lazy(() => import('./pages/Promotions'))
const FreeQuote = lazy(() => import('./pages/FreeQuote'))
const RequestSample = lazy(() => import('./pages/RequestSample'))
const RushOrder = lazy(() => import('./pages/RushOrder'))
const NotFound = lazy(() => import('./pages/NotFound'))

// About
const About = lazy(() => import('./pages/about/About'))
const CustomPatchCompany = lazy(() => import('./pages/about/CustomPatchCompany'))
const LowMinimum = lazy(() => import('./pages/about/LowMinimum'))
const Blog = lazy(() => import('./pages/about/Blog'))
const BlogPost = lazy(() => import('./pages/about/BlogPost'))
const DoItYourself = lazy(() => import('./pages/about/DoItYourself'))
const FAQs = lazy(() => import('./pages/about/FAQs'))
const HowToOrder = lazy(() => import('./pages/about/HowToOrder'))
const Testimonials = lazy(() => import('./pages/about/Testimonials'))
const ArtworkGuidelines = lazy(() => import('./pages/about/ArtworkGuidelines'))
const USAManufacturing = lazy(() => import('./pages/about/USAManufacturing'))
const Contact = lazy(() => import('./pages/about/Contact'))

// Landing Pages
const CustomMilitaryPatches = lazy(() => import('./pages/landing/CustomMilitaryPatches'))
const IronOnPatchesBulk = lazy(() => import('./pages/landing/IronOnPatchesBulk'))
const CustomPVCPatches = lazy(() => import('./pages/landing/CustomPVCPatches'))
const CustomEmbroideredPatches = lazy(() => import('./pages/landing/CustomEmbroideredPatches'))
const MotorcycleClubPatches = lazy(() => import('./pages/landing/MotorcycleClubPatches'))
const ScoutPatches = lazy(() => import('./pages/landing/ScoutPatches'))

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

function AdminApp() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="quotes"    element={<AdminQuotes />} />
            <Route path="orders"    element={<AdminOrders />} />
            <Route path="contacts"  element={<AdminContacts />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="blog"      element={<BlogManager />} />
            <Route path="discounts" element={<DiscountCodes />} />
            <Route path="samples"   element={<SampleRequests />} />
            <Route path="settings"  element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default function App() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/admin')) return <AdminApp />

  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main */}
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/free-quote" element={<FreeQuote />} />
              <Route path="/request-samples" element={<RequestSample />} />
              <Route path="/rush-order" element={<RushOrder />} />

              {/* Account */}
              <Route path="/account/login"          element={<AccountLogin />} />
              <Route path="/account/signup"         element={<AccountSignUp />} />
              <Route path="/account/reset-password" element={<ResetPassword />} />
              <Route path="/account"                element={<Account />} />

              {/* About */}
              <Route path="/about" element={<About />} />
              <Route path="/about/custom-patch-company" element={<CustomPatchCompany />} />
              <Route path="/about/low-minimum-embroidered-patches" element={<LowMinimum />} />
              <Route path="/about/blog" element={<Blog />} />
              <Route path="/about/blog/:slug" element={<BlogPost />} />
              <Route path="/about/do-it-yourself" element={<DoItYourself />} />
              <Route path="/about/faqs" element={<FAQs />} />
              <Route path="/about/how-to-order" element={<HowToOrder />} />
              <Route path="/about/testimonials" element={<Testimonials />} />
              <Route path="/about/artwork-guidelines" element={<ArtworkGuidelines />} />
              <Route path="/about/usa-manufacturing" element={<USAManufacturing />} />
              <Route path="/contact" element={<Contact />} />

              {/* SEO Landing Pages */}
              <Route path="/custom-military-patches" element={<CustomMilitaryPatches />} />
              <Route path="/iron-on-patches-bulk" element={<IronOnPatchesBulk />} />
              <Route path="/custom-pvc-patches" element={<CustomPVCPatches />} />
              <Route path="/custom-embroidered-patches" element={<CustomEmbroideredPatches />} />
              <Route path="/motorcycle-club-patches" element={<MotorcycleClubPatches />} />
              <Route path="/scout-patches" element={<ScoutPatches />} />

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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {(() => {
        const noCalc = ['/privacy-policy', '/return-policy', '/sitemap', '/resources', '/contact', '/free-quote', '/request-samples', '/gallery', '/rush-order', '/about/blog', '/account', '/promotions', '/custom-military-patches', '/iron-on-patches-bulk', '/custom-pvc-patches', '/custom-embroidered-patches', '/motorcycle-club-patches', '/scout-patches']
        return pathname !== '/' && !noCalc.some(p => pathname === p || pathname.startsWith(p + '/')) && <CalcSection />
      })()}
      <Footer />
    </AuthProvider>
  )
}
