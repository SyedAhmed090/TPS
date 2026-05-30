import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'
import useSEO from '../../hooks/useSEO'

const SITEMAP = [
  {
    section: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Promotions', href: '/promotions' },
      { label: 'Free Quote', href: '/free-quote' },
    ],
  },
  {
    section: 'About',
    links: [
      { label: 'About Overview', href: '/about' },
      { label: 'Custom Patch Company', href: '/about/custom-patch-company' },
      { label: 'Low Minimum Patches', href: '/about/low-minimum-embroidered-patches' },
      { label: 'Blog', href: '/about/blog' },
      { label: 'Do It Yourself', href: '/about/do-it-yourself' },
      { label: 'FAQs', href: '/about/faqs' },
      { label: 'How to Order', href: '/about/how-to-order' },
      { label: 'Testimonials', href: '/about/testimonials' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    section: 'Patches',
    links: [
      { label: 'All Patches', href: '/patches' },
      { label: 'Backing Types', href: '/patches/backing-types' },
      { label: 'Heat Seal Patches', href: '/patches/backing-types/heat-seal-patches' },
      { label: 'Pin Patches', href: '/patches/backing-types/pin-patches' },
      { label: 'Hook & Loop Patches', href: '/patches/backing-types/hook-loop-patches' },
      { label: 'Magnetic Patches', href: '/patches/backing-types/magnetic-patches' },
      { label: 'Patch Categories', href: '/patches/categories' },
      { label: 'Iron-On Patches', href: '/patches/categories/iron-on-patches' },
      { label: 'Morale Patches', href: '/patches/categories/morale-patches' },
      { label: 'Sew-On Patches', href: '/patches/categories/sew-on-patches' },
      { label: 'Patch Styles', href: '/patches/styles' },
      { label: 'Military Patches', href: '/patches/styles/military-patches' },
      { label: 'Biker Patches', href: '/patches/styles/biker-patches' },
      { label: 'Police Patches', href: '/patches/styles/police-patches' },
      { label: 'Sports Patches', href: '/patches/styles/sports-patches' },
      { label: 'Patch Borders', href: '/patches/patch-borders' },
      { label: 'Threads & Twills', href: '/patches/threads-and-twills' },
      { label: 'Camo Twill', href: '/patches/threads-and-twills/camo-twill' },
    ],
  },
  {
    section: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Embroidered Patches', href: '/products/embroidered-patches' },
      { label: 'Woven Patches', href: '/products/woven-patches' },
      { label: 'Dye Sublimation', href: '/products/dye-sublimation-patches' },
      { label: 'Felt Patches', href: '/products/felt-patches' },
      { label: 'PVC Patches', href: '/products/pvc-patches' },
      { label: 'Leather Patches', href: '/products/leather-patches' },
      { label: 'Chenille Patches', href: '/products/chenille-patches' },
      { label: 'Blank Patches', href: '/products/blank-patches' },
      { label: 'Bullion Crest Patches', href: '/products/bullion-crest-patches' },
      { label: 'Combination Patches', href: '/products/combination-patches' },
      { label: 'PVC Patch Keychains', href: '/products/pvc-patch-keychains' },
      { label: 'Custom Patch Keychains', href: '/products/custom-patch-keychains' },
      { label: 'Brand Merchandise', href: '/products/brand-merchandise' },
    ],
  },
  {
    section: 'Design Services',
    links: [
      { label: 'Embroidery Digitizing', href: '/digitizing' },
      { label: 'Vector Conversion', href: '/vector-conversion' },
      { label: 'Design Templates', href: '/design-templates' },
      { label: 'Artwork Guidelines', href: '/about/artwork-guidelines' },
    ],
  },
  {
    section: 'Pricing',
    links: [
      { label: 'Pricing Overview', href: '/pricing' },
      { label: 'Embroidered Patch Pricing', href: '/pricing/embroidered-patches' },
    ],
  },
  {
    section: 'Legal & Info',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Return Policy', href: '/return-policy' },
      { label: 'Resources', href: '/resources' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
]

export default function Sitemap() {
  useReveal()
  useSEO('Sitemap', 'Complete sitemap for The Patch Solutions website.')
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Sitemap' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Navigation</span>
          <h1>Sitemap</h1>
          <p>A complete list of all pages on The Patch Solutions website.</p>
        </div>
      </section>

      <section className="container">
        <div className="sitemap-grid reveal">
          {SITEMAP.map(group => (
            <div key={group.section} className="sitemap-col">
              <h3>{group.section}</h3>
              <ul>
                {group.links.map(l => (
                  <li key={l.href}>
                    <Link to={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
