# The Patch Solutions — Backend Setup Guide

## Overview

The backend is powered by **Supabase** (PostgreSQL + Edge Functions + Auth + Storage) and **Resend** (transactional email).

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `the-patch-solutions` (or similar)
3. Database password: save this securely
4. Region: US East (closest to your users)
5. Copy:
   - **Project URL** → goes in `VITE_SUPABASE_URL`
   - **anon/public key** → goes in `VITE_SUPABASE_ANON_KEY`
   - **service_role key** → goes in edge function secrets (never in frontend)

---

## 2. Run the Database Schema

1. In Supabase dashboard → **SQL Editor**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run**

This creates all 10 tables, RLS policies, storage buckets, and seeds discount codes + blog posts.

---

## 3. Set Up Environment Variables

Create `.env.local` at the project root (already exists as template):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SITE_URL=https://www.thepatchsolutions.com
```

**Never commit `.env.local`** — it's in `.gitignore`.

---

## 4. Set Up Resend (Email)

1. Go to [resend.com](https://resend.com) → Create account
2. Add & verify your domain (thepatchsolutions.com)
3. Create an API key
4. In Supabase → **Edge Functions** → **Secrets**, add:
   - `RESEND_API_KEY` = your Resend API key
   - `ADMIN_EMAIL` = `info@thepatchsolutions.com`
   - `SITE_URL` = `https://www.thepatchsolutions.com`

---

## 5. Deploy Edge Functions

Install the Supabase CLI and run:

```bash
supabase login
supabase link --project-ref your-project-ref
supabase functions deploy submit-quote
supabase functions deploy submit-contact
supabase functions deploy validate-discount
supabase functions deploy request-sample
supabase functions deploy send-proof-approval
supabase functions deploy update-order-status
supabase functions deploy test-email
```

Or use the Supabase dashboard → **Edge Functions** → Deploy from GitHub.

---

## 6. Create the First Admin User

1. In Supabase → **Authentication** → **Users** → **Add User**
2. Enter the admin email and a strong password
3. Copy the user's `id` from the users list
4. In **SQL Editor**, run:

```sql
INSERT INTO public.admin_users (user_id, email, name)
VALUES ('paste-user-id-here', 'admin@thepatchsolutions.com', 'Admin');
```

5. Sign in at `/admin/login`

---

## 7. Configure Storage

The schema creates two storage buckets automatically:
- `artwork-uploads` — private (customer artwork)
- `proof-files` — private (design proofs)

If storage policies fail, run the `INSERT INTO storage.buckets` section of `schema.sql` manually.

---

## 8. Test Everything

1. Submit a quote via `/free-quote` — should receive two emails
2. Submit a contact via `/contact` — should receive two emails
3. Request samples via `/request-samples` — should receive two emails
4. Test the calculator discount code: `WELCOME10`
5. Log in to `/admin` and verify quote/contact appeared
6. Use the test-email function: POST to `/functions/v1/test-email` with auth header and `{ "to": "your@email.com", "template": "quote_confirmation" }`

---

## Table Summary

| Table | Purpose |
|-------|---------|
| `quotes` | Quote requests from all forms |
| `contacts` | Contact form submissions |
| `discount_codes` | Promo codes for the calculator |
| `blog_posts` | CMS for the blog |
| `customers` | Customer accounts linked to auth.users |
| `orders` | Orders converted from quotes |
| `email_logs` | Log of all sent emails |
| `sample_requests` | Free sample requests |
| `admin_users` | Admin role assignments |
| `settings` | Site configuration key/value pairs |

---

## Local Development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`. With `.env.local` set up, all Supabase calls work in dev.
