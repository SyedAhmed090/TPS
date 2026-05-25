import { readFileSync, writeFileSync, existsSync } from 'fs'

const SITE_URL = 'https://www.thepatchsolutions.com'

// Load env vars from .env.local for local dev (CI/CD already has them in process.env)
if (!process.env.VITE_SUPABASE_URL && existsSync('.env.local')) {
  const lines = readFileSync('.env.local', 'utf-8').split('\n')
  for (const line of lines) {
    const eq = line.indexOf('=')
    if (eq === -1 || line.startsWith('#')) continue
    const key = line.slice(0, eq).trim()
    const val = line.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

const STATIC_PAGES = [
  { loc: '/',                                              priority: '1.0', changefreq: 'daily' },
  { loc: '/gallery',                                       priority: '0.8', changefreq: 'weekly' },
  { loc: '/promotions',                                    priority: '0.8', changefreq: 'weekly' },
  { loc: '/contact',                                       priority: '0.8', changefreq: 'monthly' },
  { loc: '/rush-order',                                    priority: '0.8', changefreq: 'weekly' },
  { loc: '/free-quote',                                    priority: '0.9', changefreq: 'monthly' },
  { loc: '/request-samples',                               priority: '0.7', changefreq: 'monthly' },
  { loc: '/design-templates',                              priority: '0.6', changefreq: 'monthly' },
  { loc: '/about',                                         priority: '0.8', changefreq: 'monthly' },
  { loc: '/about/custom-patch-company',                    priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/low-minimum-embroidered-patches',         priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/blog',                                    priority: '0.7', changefreq: 'weekly' },
  { loc: '/about/do-it-yourself',                          priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/faqs',                                    priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/how-to-order',                            priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/testimonials',                            priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/artwork-guidelines',                      priority: '0.6', changefreq: 'monthly' },
  { loc: '/about/usa-manufacturing',                       priority: '0.6', changefreq: 'monthly' },
  { loc: '/patches',                                       priority: '0.8', changefreq: 'weekly' },
  { loc: '/patches/backing-types',                         priority: '0.7', changefreq: 'weekly' },
  { loc: '/patches/backing-types/heat-seal-patches',       priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/pin-patches',             priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/plastic-patches',         priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/self-stick-patches',      priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/unbacked-patches',        priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/hook-loop-patches',       priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/backing-types/magnetic-patches',        priority: '0.6', changefreq: 'weekly' },
  { loc: '/patches/categories',                            priority: '0.7', changefreq: 'weekly' },
  { loc: '/patches/styles',                                priority: '0.7', changefreq: 'weekly' },
  { loc: '/patches/patch-borders',                         priority: '0.6', changefreq: 'monthly' },
  { loc: '/patches/threads-and-twills',                    priority: '0.6', changefreq: 'monthly' },
  { loc: '/patches/threads-and-twills/camo-twill',         priority: '0.6', changefreq: 'monthly' },
  { loc: '/products',                                      priority: '0.8', changefreq: 'weekly' },
  { loc: '/products/embroidered-patches',                  priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/woven-patches',                        priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/dye-sublimation-patches',              priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/felt-patches',                         priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/pvc-patches',                          priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/leather-patches',                      priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/chenille-patches',                     priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/blank-patches',                        priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/bullion-crest-patches',                priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/combination-patches',                  priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/pvc-patch-keychains',                  priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/custom-patch-keychains',               priority: '0.7', changefreq: 'weekly' },
  { loc: '/products/brand-merchandise',                    priority: '0.7', changefreq: 'weekly' },
  { loc: '/pricing',                                       priority: '0.8', changefreq: 'weekly' },
  { loc: '/pricing/embroidered-patches',                   priority: '0.7', changefreq: 'weekly' },
  { loc: '/custom-military-patches',                       priority: '0.8', changefreq: 'weekly' },
  { loc: '/iron-on-patches-bulk',                          priority: '0.8', changefreq: 'weekly' },
  { loc: '/custom-pvc-patches',                            priority: '0.8', changefreq: 'weekly' },
  { loc: '/custom-embroidered-patches',                    priority: '0.8', changefreq: 'weekly' },
  { loc: '/motorcycle-club-patches',                       priority: '0.8', changefreq: 'weekly' },
  { loc: '/scout-patches',                                 priority: '0.8', changefreq: 'weekly' },
  { loc: '/privacy-policy',                                priority: '0.3', changefreq: 'monthly' },
  { loc: '/return-policy',                                 priority: '0.3', changefreq: 'monthly' },
  { loc: '/resources',                                     priority: '0.4', changefreq: 'monthly' },
  { loc: '/sitemap',                                       priority: '0.3', changefreq: 'monthly' },
]

async function getBlogPosts() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_posts?select=slug,updated_at,published_at&published=eq.true&order=published_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

function urlEntry({ loc, priority, changefreq, lastmod }) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function generate() {
  const today = new Date().toISOString().split('T')[0]
  const posts = await getBlogPosts()

  const staticXml = STATIC_PAGES.map(p => urlEntry({ ...p, lastmod: today })).join('\n')
  const blogXml = posts.map(p => urlEntry({
    loc: `/about/blog/${p.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: (p.updated_at || p.published_at || today).split('T')[0],
  })).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticXml}

  <!-- Blog Posts — auto-generated at build time -->
${blogXml}

</urlset>
`

  writeFileSync('public/sitemap.xml', xml)
  console.log(`✓ Sitemap: ${STATIC_PAGES.length} static pages + ${posts.length} blog posts`)
}

generate().catch(err => {
  console.warn('⚠ Sitemap generation failed (continuing build):', err.message)
})
