# The Patch Solutions — Developer Documentation

Production site: [thepatchsolutions.com](https://www.thepatchsolutions.com)  
Repository: `SyedAhmed090/TPS` — all work on `main`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 7 |
| Routing | React Router v6 |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| Edge Functions | Deno (TypeScript) |
| Email | Resend API |
| Error Monitoring | Sentry (`@sentry/react`) — activate via env var |
| CAPTCHA | Cloudflare Turnstile — activate via env var |
| Hosting | Netlify |
| CSS | Plain CSS variables + inline styles (no Tailwind, no CSS modules) |

---

## Local Setup

```bash
git clone https://github.com/SyedAhmed090/TPS.git
cd TPS
npm install
```

Create `.env.local` at the project root:

```env
VITE_SUPABASE_URL=https://thmjdzxxrfsnvvmaurab.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_TeeUN5xZpjcgtRT9nm-XtQ_0WJGLKh6
VITE_SITE_URL=http://localhost:5173

# Optional — leave blank to disable in development
VITE_SENTRY_DSN=
VITE_TURNSTILE_SITE_KEY=
```

```bash
npm run dev        # start dev server at localhost:5173
npm run build      # generate sitemap + production build → dist/
npm run preview    # preview production build locally
```

---

## Environment Variables

### Frontend (Vite — baked into the bundle at build time)

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase public/anon key |
| `VITE_SITE_URL` | Yes | Used for redirect URLs (use `https://www.thepatchsolutions.com` in prod) |
| `VITE_SENTRY_DSN` | No | Sentry DSN — Sentry is disabled if this is empty |
| `VITE_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key — CAPTCHA is disabled if empty |

### Edge Functions (Supabase Secrets — server-side only, never in frontend)

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Auto-injected by Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Auto-injected by Supabase |
| `RESEND_API_KEY` | Resend email API key |
| `ADMIN_EMAIL` | Where admin notification emails go |
| `SITE_URL` | Used in email links (e.g. `https://www.thepatchsolutions.com`) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret — CAPTCHA skip if absent |

---

## Project Structure

```
TPS/
├── public/                   # Static files copied as-is to dist/
│   ├── sitemap.xml           # Auto-regenerated at build time — do not edit manually
│   ├── robots.txt
│   ├── _redirects            # Netlify SPA redirect rule (/* → /index.html 200)
│   ├── favicon.ico
│   ├── logo.jpg
│   └── hero-patch.jpg
│
├── scripts/
│   └── generate-sitemap.mjs  # Runs before vite build; queries Supabase for blog posts
│
├── src/
│   ├── main.jsx              # React entry point; Sentry init + ErrorBoundary
│   ├── App.jsx               # All routes defined here
│   ├── index.css             # Global CSS, variables, responsive breakpoints
│   │
│   ├── components/
│   │   ├── Navbar.jsx        # Full navbar with mega-menus and mobile hamburger
│   │   ├── Footer.jsx
│   │   ├── TopBar.jsx        # Gold announcement bar above navbar
│   │   ├── PatchCalculator.jsx  # Instant price calculator (state persisted to localStorage)
│   │   ├── ErrorBoundary.jsx
│   │   ├── PageLoader.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── admin/AdminRoute.jsx  # Protects /admin/* routes
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── FreeQuote.jsx     # Main quote form (FormData, artwork upload, discount code)
│   │   ├── RequestSample.jsx # Free sample request form
│   │   ├── DesignTemplates.jsx  # Template download page (update downloadUrl when files ready)
│   │   ├── RushOrder.jsx
│   │   ├── Gallery.jsx
│   │   ├── Promotions.jsx
│   │   ├── about/            # Blog, Contact, FAQs, etc.
│   │   ├── admin/            # Admin panel pages (see Admin section below)
│   │   ├── account/          # Customer account portal (protected routes)
│   │   ├── auth/             # Login, SignUp, ResetPassword, UpdatePassword
│   │   ├── patches/          # Patch type info pages
│   │   ├── products/         # Product detail pages
│   │   ├── pricing/          # Pricing pages
│   │   ├── landing/          # SEO landing pages (military, motorcycle, etc.)
│   │   └── footer/           # PrivacyPolicy, ReturnPolicy, Resources, Sitemap
│   │
│   ├── hooks/
│   │   ├── useFormSubmit.js  # DRY wrapper for supabase.functions.invoke with loading/error state
│   │   ├── useReveal.js      # Scroll-reveal animation hook
│   │   ├── useSEO.js         # Sets document.title and meta description
│   │   └── useCountdown.js   # Countdown timer hook
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx   # Supabase auth state (user, profile, signOut)
│   │
│   ├── lib/
│   │   └── supabase.js       # Supabase client (anon key only — safe for frontend)
│   │
│   ├── styles/
│   │   └── formStyles.js     # Shared inline style objects for all public forms
│   │
│   ├── utils/
│   │   └── validation.js     # Client-side validators: validateQuoteForm, validateContactForm, validateSampleForm
│   │
│   └── data/
│       ├── siteData.js       # Static content (gallery, testimonials, product info)
│       ├── pricingData.js    # Pricing tables
│       └── blogData.js       # Fallback blog data
│
├── supabase/
│   ├── functions/
│   │   ├── _shared/
│   │   │   ├── cors.ts            # CORS headers shared across all functions
│   │   │   ├── supabaseAdmin.ts   # Service-role Supabase client (server-only)
│   │   │   └── emailTemplates.ts  # All 10 HTML email templates
│   │   ├── submit-quote/          # Quote form handler
│   │   ├── submit-contact/        # Contact form handler
│   │   ├── request-sample/        # Sample request handler
│   │   ├── update-order-status/   # Order status + email trigger
│   │   ├── send-proof-approval/   # Send proof to customer (admin-triggered)
│   │   ├── validate-discount/     # Validate discount codes
│   │   └── test-email/            # Test email delivery (admin-only)
│   │
│   └── migrations/
│       └── 20260525000000_add_blog_tags.sql  # Adds tags[] column to blog_posts
│
├── netlify.toml              # Build config: npm run build → dist/, Node 22
└── package.json
```

---

## Routing

All routes are defined in `src/App.jsx`. Admin routes (`/admin/*`) render a completely separate app tree with no Navbar/Footer. Everything else shares the public layout.

**Protected routes** (require Supabase auth session): `/account/*`  
**Admin routes** (require `admin_users` table entry): `/admin/*`

---

## Key Patterns

### Form submission
All public forms use the `useFormSubmit(functionName)` hook:
```js
const { submit, loading, submitError } = useFormSubmit('submit-quote')
const ok = await submit(formDataOrObject)
if (ok) setSent(true)
```
The hook calls `supabase.functions.invoke(functionName, { body: data })` and handles loading/error state. `FreeQuote` passes a `FormData` object (for file uploads); `Contact` and `RequestSample` pass plain objects.

### CAPTCHA
Cloudflare Turnstile is conditionally rendered on all three public forms. It only activates when `VITE_TURNSTILE_SITE_KEY` is set. The edge functions verify the token using `TURNSTILE_SECRET_KEY` from Supabase secrets — they skip verification if the secret is absent, making CAPTCHA fully opt-in.

### Sentry
Initialized in `main.jsx`. The entire app is wrapped in `<Sentry.ErrorBoundary>`. Sentry is only enabled when `VITE_SENTRY_DSN` is set — it's a no-op otherwise.

### Price Calculator
State is persisted to `localStorage` under key `tps_calc_state`. The calculator is rendered on multiple pages (Home, Pricing, etc.) and restores user selections between visits.

### CSS conventions
All design tokens are CSS variables defined in `src/index.css`:
```css
--navy, --navy-mid, --gold, --gold-light, --red,
--cream, --white, --text-dark, --gray-mid,
--font-display, --font-heading, --font-body,
--nav-height: 68px, --topbar-height: 32px
```
Responsive breakpoints: `≤900px` (tablet/mobile nav), `≤600px` (mobile).

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `quotes` | Quote requests from the website |
| `orders` | Customer orders (status: `pending → in_production → shipped → delivered → cancelled`) |
| `contacts` | Contact form submissions |
| `sample_requests` | Free sample kit requests |
| `discount_codes` | Promo codes (percent or fixed, usage limits, expiry) |
| `admin_users` | Admin accounts (linked to Supabase auth) |
| `customers` | Customer profiles (linked to Supabase auth) |
| `blog_posts` | Blog content (title, slug, content JSON, tags[], category, published) |
| `email_logs` | Log of every email sent (template, status, Resend ID) |

Storage buckets: `artwork-uploads` (private, 5-year signed URLs for admin access)

---

## Edge Functions

Deploy edge functions via Supabase CLI:
```bash
supabase functions deploy <function-name>
```

All functions:
- Return `CORS` headers for browser compatibility
- Handle `OPTIONS` preflight requests
- Use the service-role client (`supabaseAdmin`) for DB writes
- Only `submit-quote` accepts `FormData` (multipart) — all others accept JSON

| Function | Trigger | Auth required |
|----------|---------|---------------|
| `submit-quote` | Quote form submit | No (public) |
| `submit-contact` | Contact form submit | No (public) |
| `request-sample` | Sample form submit | No (public) |
| `update-order-status` | Admin orders page | Yes (admin) |
| `send-proof-approval` | Admin quotes page | Yes (admin) |
| `validate-discount` | Quote form (discount check) | No (public) |
| `test-email` | Admin settings page | Yes (admin) |

---

## Email System

All emails are sent via the **Resend API** from `noreply@thepatchsolutions.com`. Templates are defined in `supabase/functions/_shared/emailTemplates.ts`.

Templates: `quoteConfirmation`, `quoteNotification`, `contactConfirmation`, `contactNotification`, `sampleConfirmation`, `sampleNotification`, `proofApproval`, `orderInProduction`, `orderShipped`, `orderDelivered`

Every send is logged to the `email_logs` table with status (`sent`/`failed`) and Resend message ID.

---

## Deployment (Netlify)

Site auto-deploys on push to `main`.

Build process:
1. `node scripts/generate-sitemap.mjs` — queries Supabase for published blog posts, regenerates `public/sitemap.xml`
2. `vite build` — compiles React app to `dist/`
3. Netlify serves `dist/` with the `_redirects` SPA rule

**Required Netlify environment variables** (Site → Environment variables):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL` = `https://www.thepatchsolutions.com`
- `VITE_SENTRY_DSN` (optional — activates error monitoring)
- `VITE_TURNSTILE_SITE_KEY` (optional — activates CAPTCHA)

---

## Activating Optional Features

### Sentry (error monitoring)
1. Create project at sentry.io → React
2. Copy the DSN
3. Add `VITE_SENTRY_DSN=<dsn>` to Netlify env vars → redeploy

### Cloudflare Turnstile (CAPTCHA)
1. Create site at dash.cloudflare.com → Turnstile
2. Add `VITE_TURNSTILE_SITE_KEY=<key>` to Netlify env vars
3. Add `TURNSTILE_SECRET_KEY=<secret>` to Supabase → Project Settings → Edge Functions → Secrets
4. Redeploy

### Design Template Downloads
Upload AI/PSD/PDF files to Supabase Storage → `templates` bucket (create it as public), then update the `downloadUrl` field for each template in `src/pages/DesignTemplates.jsx`.

---

## Adding a Blog Post

Blog posts are managed from the admin panel at `/admin/blog`. Each post has:
- `title`, `slug` (URL-friendly ID), `excerpt`, `category`, `tags[]`
- `content` — JSON array of sections: `{ type: 'paragraph'|'heading'|'list'|'tip'|'warning', text: '...', items: [...] }`
- `cover_image` — URL to the featured image
- `read_time` — estimated minutes
- `published` — toggle to make it live

When a post is published, the sitemap automatically includes it on the next deploy.
