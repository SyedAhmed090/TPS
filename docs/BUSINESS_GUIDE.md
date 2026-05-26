# The Patch Solutions — Business & Admin Guide

This guide is for business owners and non-technical team members. No coding knowledge required.

---

## What Is This Website?

**The Patch Solutions** is a custom patch manufacturing business. The website does two things:

1. **Attracts customers** — product pages, blog content, gallery, pricing information, and SEO landing pages bring people to the site from Google
2. **Converts visitors into orders** — quote forms, sample requests, a price calculator, and contact forms capture leads and turn them into paying customers

The business sells custom patches of multiple types: embroidered, woven, PVC, chenille, leather, and dye sublimation. Minimum order is 25 patches per design.

---

## The Website at a Glance

### What visitors can do
- Browse patch types, styles, and backing options
- Use the **Instant Price Calculator** to get an estimate
- **Request a free quote** (main conversion goal)
- **Request free samples** (shipped within 2–3 business days)
- Place a **rush order** request
- Download **design templates** (AI/PSD/PDF)
- Read the **blog** for guides and tips
- Browse the **gallery**
- Create an **account** to track their quotes and orders
- Contact the team directly

### What you (the business) receive
Every form submission triggers:
- An email notification to the admin email address
- A confirmation email to the customer
- A record saved in the admin panel for tracking

---

## Accessing the Admin Panel

Go to: **your-site.com/admin**

Log in with your admin credentials. You will see the dashboard with a sidebar on the left.

> If you need to create a new admin account, it must be done through Supabase. Contact your developer.

---

## Admin Panel Sections

### Dashboard
The homepage of the admin panel. Shows:
- Summary counts (quotes, orders, contacts, sample requests)
- Recent activity at a glance
- Quick links to each section

The sidebar also shows **live badges** (red numbers) next to Quotes and Contacts when new unread items come in.

---

### Quotes (`/admin/quotes`)

Every time someone fills in the **Free Quote** form on the website, it appears here.

**What you'll see for each quote:**
- Customer name, email, phone
- Patch type, size, quantity range
- Special notes and artwork file (if uploaded)
- Estimated price (from the calculator if they used it)
- Discount code used (if any)
- Submission date and IP address

**What to do with a quote:**
1. Review the details
2. If the customer uploaded artwork, download it from the link provided
3. Reply to them directly by email with a formal quote and digital proof
4. Once they approve and pay, create an Order

---

### Orders (`/admin/orders`)

Tracks all customer orders from start to delivery.

**Order statuses — this is the full lifecycle:**

| Status | Meaning | Email sent to customer |
|--------|---------|----------------------|
| `Pending` | Order received, not yet started | None |
| `In Production` | Manufacturing has begun | ✓ "Your order is in production" |
| `Shipped` | Patches dispatched | ✓ "Your order has shipped" with tracking |
| `Delivered` | Confirmed delivered | ✓ "Your patches have arrived" |
| `Cancelled` | Order cancelled | None |

**To update an order status:**
1. Find the order in the list
2. Use the dropdown in the **Update** column to change the status
3. The system automatically emails the customer when you change to In Production, Shipped, or Delivered

**To add tracking information:**
1. Enter the tracking number in the **Tracking** column
2. Select the carrier (UPS, FedEx, USPS, DHL)
3. Click **Save & Notify** — this updates the record and emails the customer with their tracking link

**Searching and filtering:**
- Use the search bar to find by customer name, email, or order number
- Use the status filter buttons to view only orders at a specific stage

---

### Contacts (`/admin/contacts`)

All messages submitted through the **Contact Us** page appear here.

Each contact shows the customer's name, email, subject, and full message. Reply directly to their email address.

---

### Customers (`/admin/customers`)

A list of all registered customer accounts. Shows name, email, and when they signed up. Customers can track their own quotes and orders when logged in.

---

### Blog (`/admin/blog`)

Manage the blog that lives at **/about/blog** on the website. Blog posts help with Google rankings when written about relevant topics.

**To edit an existing post:**
1. Click **Edit** next to any post
2. Update the title, category, tags, excerpt, or read time
3. Click **Save Changes**

**Categories available:**
- Embroidery Tips
- How-To
- Industry News
- Company Updates
- Patch Care

**Tags:** Enter comma-separated keywords (e.g. `iron-on, tutorial, embroidery`). These allow visitors to filter posts by topic.

**To publish / unpublish a post:**
- Click the **Live / Draft** toggle button next to any post
- Green = Live (visible to visitors), Grey = Draft (hidden)

**Note:** New blog posts and their URLs are automatically added to the sitemap the next time the site is deployed.

---

### Discount Codes (`/admin/discounts`)

Create and manage promotional discount codes that customers can enter on the **Free Quote** form.

**When creating a code:**
- **Code** — the text customers type in (e.g. `SUMMER20`) — always uppercase
- **Type** — Percent (e.g. 20% off) or Fixed amount (e.g. $10 off)
- **Value** — the discount amount
- **Usage limit** — maximum number of times the code can be used (leave blank for unlimited)
- **Expiry date** — when the code stops working (leave blank for no expiry)
- **Active** — toggle to enable/disable the code

---

### Sample Requests (`/admin/samples`)

Every time someone fills in the **Request Free Sample** form, it appears here with their:
- Full name and contact info
- Which patch types they're interested in
- Any notes they left

**How it works:** We create a sample patch and send the customer **high-resolution photos and a video** via email — no physical shipment. Once you've sent the photos/video, click **Mark Sent** to update the record.

---

### Settings (`/admin/settings`)

Admin account settings and site configuration. Also contains a **Test Email** button to verify the email system is working.

---

## Customer Accounts

Customers can create a free account on the website. When logged in, they can:
- See all their previous quote requests
- Track the status of their orders
- Update their profile (name, company, phone)

If a customer submits a quote while logged in, the quote is automatically linked to their account.

---

## Email Notifications

Every form submission triggers **two emails automatically:**
1. A confirmation to the customer (so they know it was received)
2. A notification to the admin email (`info@thepatchsolutions.com`)

### Order status emails are triggered by you (the admin)
When you change an order status in the admin panel, the system sends the customer a status update email. You do not need to manually write or send these — they are sent automatically the moment you change the status.

**Emails sent automatically by the system:**

| Trigger | Who receives it |
|---------|----------------|
| New quote submitted | Customer + Admin |
| New contact message | Customer + Admin |
| New sample request | Customer (confirmation) + Admin (notification with email to send photos to) |
| Order moved to In Production | Customer only |
| Order marked as Shipped | Customer only (with tracking info) |
| Order marked as Delivered | Customer only |
| Proof approval sent | Customer only |

All sent emails are logged in the database. If an email fails, it is marked as `failed` in the log.

---

## Design Templates Page

The **Design Templates** page (`/design-templates`) is linked from the navbar. It shows template cards for all 6 patch types (Embroidered, Woven, PVC, Chenille, Leather, Dye Sublimation).

Currently, the **Request Template** buttons link to an email. To add actual downloadable files:
1. Upload the AI/PSD/PDF template files to **Supabase Storage** → `templates` bucket
2. Ask your developer to update the download links in the code

---

## SEO & Blog Strategy

The website has several SEO-focused pages targeting specific search terms:
- `/custom-military-patches`
- `/iron-on-patches-bulk`
- `/custom-pvc-patches`
- `/custom-embroidered-patches`
- `/motorcycle-club-patches`
- `/scout-patches`

The **blog** is the main ongoing SEO tool. Publishing 2–4 posts per month on topics like "how to apply iron-on patches", "embroidered vs woven patches", or "custom patches for sports teams" will gradually increase organic traffic.

The sitemap at `/sitemap.xml` automatically includes all published blog posts every time the site is deployed.

---

## Adding a Custom Domain

Currently the site is at a Netlify URL. To connect `thepatchsolutions.com`:
1. Go to **Netlify → Domain management → Add domain**
2. Add `thepatchsolutions.com` and `www.thepatchsolutions.com`
3. Update your domain's DNS records to point to Netlify (Netlify will show you exactly what to add)
4. Update `VITE_SITE_URL` in Netlify environment variables to `https://www.thepatchsolutions.com`
5. In Supabase → Authentication → URL Configuration, add `https://www.thepatchsolutions.com` to the allowed redirect URLs

---

## Features Pending Activation

These features are built and ready — they just need credentials to be added to Netlify.

### Error Monitoring (Sentry)
Automatically detects and reports site errors in production. When something breaks, you get an email alert with details instead of finding out from a customer complaint.
- **To activate:** Create a free account at sentry.io → get DSN → add `VITE_SENTRY_DSN` to Netlify environment variables

### CAPTCHA (Cloudflare Turnstile)
Prevents bots from spamming your quote and contact forms with fake leads.
- **To activate:** Create a free site at dash.cloudflare.com/turnstile → add `VITE_TURNSTILE_SITE_KEY` to Netlify and `TURNSTILE_SECRET_KEY` to Supabase secrets

---

## Quick Reference

| Task | Where |
|------|-------|
| View new quote requests | Admin → Quotes |
| Update an order status | Admin → Orders → Status dropdown |
| Add tracking to an order | Admin → Orders → Tracking column |
| Publish/unpublish a blog post | Admin → Blog → Live/Draft toggle |
| Create a discount code | Admin → Discount Codes |
| View sample requests | Admin → Samples |
| View contact messages | Admin → Contacts |
| Test email delivery | Admin → Settings |
| View customer accounts | Admin → Customers |

---

## Contact for Technical Help

For any technical issues with the website, database, or hosting — contact your developer with:
- A screenshot of the problem
- The URL where it happened
- What you were trying to do when it occurred
