-- ============================================================
-- TPS BACKEND SCHEMA
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS quotes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  status            text DEFAULT 'new' CHECK (status IN ('new','reviewing','quoted','approved','in_production','shipped','completed','cancelled')),
  name              text NOT NULL,
  email             text NOT NULL,
  phone             text,
  organization      text,
  patch_type        text NOT NULL,
  size              text NOT NULL,
  quantity          integer NOT NULL,
  coverage          text,
  backing           text,
  colors            integer DEFAULT 8,
  metallic_thread   boolean DEFAULT false,
  rush_order        boolean DEFAULT false,
  turnaround_needed text,
  artwork_url       text,
  artwork_filename  text,
  special_notes     text,
  estimated_price   numeric(10,2),
  final_price       numeric(10,2),
  discount_code     text,
  discount_amount   numeric(10,2),
  assigned_to       text,
  internal_notes    text,
  ip_address        text,
  source_page       text
);

CREATE TABLE IF NOT EXISTS contacts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz DEFAULT now(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  subject     text,
  message     text NOT NULL,
  status      text DEFAULT 'unread' CHECK (status IN ('unread','read','replied')),
  replied_at  timestamptz,
  ip_address  text
);

CREATE TABLE IF NOT EXISTS discount_codes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz DEFAULT now(),
  code             text UNIQUE NOT NULL,
  type             text NOT NULL CHECK (type IN ('percent','fixed')),
  value            numeric(10,2) NOT NULL,
  label            text NOT NULL,
  active           boolean DEFAULT true,
  usage_limit      integer,
  usage_count      integer DEFAULT 0,
  expires_at       timestamptz,
  min_order_amount numeric(10,2)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  slug              text UNIQUE NOT NULL,
  title             text NOT NULL,
  excerpt           text,
  category          text,
  author            text DEFAULT 'TPS Team',
  published         boolean DEFAULT false,
  published_at      timestamptz,
  featured_image_url text,
  read_time         text,
  content           jsonb,
  meta_title        text,
  meta_description  text,
  view_count        integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS customers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz DEFAULT now(),
  auth_user_id  uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text UNIQUE NOT NULL,
  full_name     text,
  phone         text,
  organization  text,
  address_line1 text,
  address_line2 text,
  city          text,
  state         text,
  zip           text,
  country       text DEFAULT 'US',
  notes         text,
  total_orders  integer DEFAULT 0,
  total_spent   numeric(10,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  quote_id          uuid REFERENCES quotes(id),
  customer_id       uuid REFERENCES customers(id),
  status            text DEFAULT 'pending' CHECK (status IN ('pending','paid','in_production','quality_check','shipped','delivered','cancelled')),
  patch_type        text NOT NULL,
  size              text NOT NULL,
  quantity          integer NOT NULL,
  unit_price        numeric(10,2) NOT NULL,
  total_price       numeric(10,2) NOT NULL,
  discount_code     text,
  discount_amount   numeric(10,2) DEFAULT 0,
  rush_order        boolean DEFAULT false,
  rush_fee          numeric(10,2) DEFAULT 0,
  shipping_address  jsonb,
  tracking_number   text,
  carrier           text,
  shipped_at        timestamptz,
  delivered_at      timestamptz,
  proof_url         text,
  proof_approved_at timestamptz,
  internal_notes    text,
  artwork_url       text
);

CREATE TABLE IF NOT EXISTS email_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz DEFAULT now(),
  to_email      text NOT NULL,
  template      text NOT NULL,
  subject       text NOT NULL,
  status        text DEFAULT 'sent' CHECK (status IN ('sent','failed','bounced')),
  related_id    uuid,
  related_type  text,
  error_message text,
  resend_id     text
);

CREATE TABLE IF NOT EXISTS sample_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz DEFAULT now(),
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  organization  text,
  address_line1 text NOT NULL,
  address_line2 text,
  city          text NOT NULL,
  state         text NOT NULL,
  zip           text NOT NULL,
  patch_interest text[],
  notes         text,
  status        text DEFAULT 'pending' CHECK (status IN ('pending','approved','shipped','declined'))
);

CREATE TABLE IF NOT EXISTS admin_users (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email        text NOT NULL,
  name         text NOT NULL,
  role         text DEFAULT 'staff' CHECK (role IN ('admin','staff','viewer')),
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key        text PRIMARY KEY,
  value      text,
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- UTILITY FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION increment_view_count(post_slug text)
RETURNS void AS $$
  UPDATE blog_posts SET view_count = view_count + 1 WHERE slug = post_slug;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_quotes_email        ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_status       ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at   ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id  ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at   ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_slug           ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published      ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_category       ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_discount_code       ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_active     ON discount_codes(active);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE quotes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers       ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users     ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings        ENABLE ROW LEVEL SECURITY;

-- Helper: is_admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE auth_user_id = auth.uid()
    AND role IN ('admin','staff')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- QUOTES
CREATE POLICY "quotes_insert_anon"
  ON quotes FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "quotes_select_admin"
  ON quotes FOR SELECT TO authenticated
  USING (is_admin());

CREATE POLICY "quotes_update_admin"
  ON quotes FOR UPDATE TO authenticated
  USING (is_admin());

-- CONTACTS
CREATE POLICY "contacts_insert_anon"
  ON contacts FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_select_admin"
  ON contacts FOR SELECT TO authenticated
  USING (is_admin());

CREATE POLICY "contacts_update_admin"
  ON contacts FOR UPDATE TO authenticated
  USING (is_admin());

-- DISCOUNT_CODES
CREATE POLICY "discount_codes_select_anon"
  ON discount_codes FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "discount_codes_all_admin"
  ON discount_codes FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- BLOG_POSTS
CREATE POLICY "blog_posts_select_published"
  ON blog_posts FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "blog_posts_all_admin"
  ON blog_posts FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- CUSTOMERS
CREATE POLICY "customers_select_own"
  ON customers FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR is_admin());

CREATE POLICY "customers_update_own"
  ON customers FOR UPDATE TO authenticated
  USING (auth_user_id = auth.uid() OR is_admin());

CREATE POLICY "customers_insert_auth"
  ON customers FOR INSERT TO authenticated
  WITH CHECK (auth_user_id = auth.uid() OR is_admin());

-- ORDERS
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT TO authenticated
  USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "orders_all_admin"
  ON orders FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- EMAIL_LOGS
CREATE POLICY "email_logs_all_admin"
  ON email_logs FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- SAMPLE_REQUESTS
CREATE POLICY "sample_requests_insert_anon"
  ON sample_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "sample_requests_all_admin"
  ON sample_requests FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ADMIN_USERS
CREATE POLICY "admin_users_all_admin"
  ON admin_users FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- SETTINGS
CREATE POLICY "settings_select_anon"
  ON settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "settings_update_admin"
  ON settings FOR UPDATE TO authenticated
  USING (is_admin());

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('artwork-uploads', 'artwork-uploads', false, 26214400,
   ARRAY['application/pdf','image/svg+xml','image/png','image/jpeg','application/postscript','image/vnd.adobe.photoshop']),
  ('blog-images', 'blog-images', true, 5242880,
   ARRAY['image/jpeg','image/png','image/webp']),
  ('proof-files', 'proof-files', false, 10485760,
   ARRAY['application/pdf','image/jpeg','image/png'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "artwork_upload_anon"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'artwork-uploads');

CREATE POLICY "artwork_select_admin"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'artwork-uploads' AND is_admin());

CREATE POLICY "blog_images_public"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_admin_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND is_admin());

CREATE POLICY "proof_files_admin"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'proof-files' AND is_admin())
  WITH CHECK (bucket_id = 'proof-files' AND is_admin());

-- ============================================================
-- SEED DATA — DISCOUNT CODES
-- ============================================================

INSERT INTO discount_codes (code, type, value, label, active) VALUES
  ('WELCOME10', 'percent', 10, '10% off — Welcome discount', true),
  ('SAVE15',    'percent', 15, '15% off — Promo code',       true),
  ('FLAT20',    'fixed',   20, '$20 off — Flat discount',    true),
  ('MILITARY',  'percent', 12, '12% off — Military discount',true),
  ('BULK500',   'percent',  8, '8% off — Bulk order discount',true)
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- SEED DATA — SETTINGS
-- ============================================================

INSERT INTO settings (key, value) VALUES
  ('admin_email',     'info@thepatchsolutions.com'),
  ('company_name',    'The Patch Solutions'),
  ('company_phone',   '1-800-PATCHES'),
  ('company_address', 'United States')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SEED DATA — BLOG POSTS
-- ============================================================

INSERT INTO blog_posts (slug, title, excerpt, category, author, published, published_at, featured_image_url, read_time, content, meta_title, meta_description)
VALUES (
  'how-to-iron-on-a-patch',
  'How to Iron On a Patch: The Complete Guide',
  'Everything you need to know about applying iron-on patches at home — temperatures, fabrics, tips for a permanent bond.',
  'DIY Guides',
  'TPS Team',
  true,
  '2025-05-10 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '6 min read',
  '[{"type":"heading","text":"What You''ll Need"},{"type":"list","items":["Household iron (or heat press)","Thin pressing cloth (a cotton pillowcase works perfectly)","Hard flat surface — a wooden table or ironing board with a hard pad","Your patch","The garment you''re attaching to"]},{"type":"heading","text":"Step-by-Step Application"},{"type":"paragraph","text":"Iron-on patches have a heat-activated adhesive bonded to their backing — a thermoplastic glue that melts under high heat and fuses into the fabric fibers of your garment. When it cools, it creates a strong bond. The key to a long-lasting application is achieving the right temperature, applying even pressure, and allowing adequate cool-down time."},{"type":"heading","text":"Temperature Guide by Fabric"},{"type":"list","items":["Cotton and denim: highest heat setting, press firmly for 45 seconds","Polyester blends: medium-high heat, press for 35 seconds","Wool: medium heat with a pressing cloth","Synthetic blends and athletic wear: test a small area first"]},{"type":"tip","text":"Always use a pressing cloth between the iron and the patch — direct contact can melt synthetic threads or flatten the texture of embroidered patches."},{"type":"heading","text":"What If the Patch Peels?"},{"type":"paragraph","text":"If the patch starts to lift at the edges or peels off after washing, it almost always comes down to insufficient heat, insufficient pressure, or an incompatible fabric. Re-position and press again for 45–60 seconds, then immediately flip and press from the back."},{"type":"heading","text":"Should I Also Sew It?"},{"type":"paragraph","text":"For patches that need to survive heavy use and frequent washing, we strongly recommend reinforcing the iron-on bond with a row of stitching around the perimeter."},{"type":"warning","text":"Heat seal patches on nylon, waterproof, or treated fabrics may not bond properly. Test on a hidden area first."}]'::jsonb,
  'How to Iron On a Patch: The Complete Guide — The Patch Solutions',
  'Complete guide to applying iron-on patches at home. Learn the right temperature, pressure, and technique for a permanent bond that lasts.'
),
(
  '5-reasons-embroidered-patches-outlast-printed',
  '5 Reasons Embroidered Patches Outlast Printed Ones',
  'Embroidery vs. printing — it''s not a close contest. Here''s the science and craft behind why thread-sewn patches hold up for decades.',
  'Industry',
  'TPS Team',
  true,
  '2025-04-22 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '5 min read',
  '[{"type":"paragraph","text":"Walk into any vintage shop and pick up a jacket from the 1970s with an embroidered patch on it. Odds are the embroidery still looks crisp, the colors still pop, and the stitches are still holding tight."},{"type":"heading","text":"1. Thread Is a Physical Structure, Ink Is a Surface Coating"},{"type":"paragraph","text":"Embroidery threads are physically woven through and into the backing material — they are interlocked, looped, and locked in place by the embroidery structure itself. They cannot flake, peel, or wash off."},{"type":"heading","text":"2. UV Resistance — Colors That Don''t Fade"},{"type":"paragraph","text":"Embroidery thread is dyed at the fiber level during manufacturing using UV-stable disperse dyes. These dyes are locked inside the fiber itself, not sitting on the surface."},{"type":"heading","text":"3. Washing Durability"},{"type":"paragraph","text":"For an embroidered patch, washing has essentially no effect on the design integrity. The threads are structurally part of the patch; the dyes are locked inside the fibers."},{"type":"tip","text":"Professional embroiderers use industrial-grade threads rated for 60°C washing — the same used in commercial uniform laundering."},{"type":"heading","text":"4. Texture and Tactile Quality"},{"type":"paragraph","text":"Embroidered patches have a three-dimensional raised quality that printed patches simply cannot replicate. The raised texture means there is no single flat surface to crack, peel, or abrade."},{"type":"heading","text":"5. The Backing Matters Too"},{"type":"paragraph","text":"Quality embroidered patches are produced on heavy-duty twill backing, typically 100% polyester twill that is itself highly resistant to wear, washing, and UV degradation."},{"type":"tip","text":"If your design has photographic gradients or more than 15 distinct colors, consider dye sublimation patches — they''re the right tool for that job."}]'::jsonb,
  '5 Reasons Embroidered Patches Outlast Printed Ones — The Patch Solutions',
  'Discover why embroidered patches last decades longer than printed alternatives. Thread structure, UV resistance, and washing durability explained.'
),
(
  'pvc-vs-embroidered-patches',
  'PVC vs. Embroidered Patches: Which Is Right for You?',
  'Two excellent options — very different results. We break down exactly when to choose PVC rubber over traditional embroidered patches.',
  'Product Guide',
  'TPS Team',
  true,
  '2025-04-05 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '5 min read',
  '[{"type":"paragraph","text":"Both PVC rubber patches and embroidered patches are excellent, durable, professional-quality options — but they''re designed for different applications and produce very different visual and tactile results."},{"type":"heading","text":"What Is a PVC Patch?"},{"type":"paragraph","text":"PVC patches are made from molded polyvinyl chloride rubber. The design is created in multiple layers of colored PVC that are molded and bonded together, producing a three-dimensional result with crisp color separation and a bold, graphic look."},{"type":"heading","text":"What Is an Embroidered Patch?"},{"type":"paragraph","text":"Embroidered patches are produced by sewing colored thread onto a woven twill backing using industrial embroidery machines. They can be produced with varying levels of thread coverage — from 50% to 100%."},{"type":"heading","text":"Choose PVC When..."},{"type":"list","items":["Your design has more than 15 colors","The patch will be exposed to water, mud, rain, or outdoor conditions","You want a bold, three-dimensional look","It''s going on tactical gear or MOLLE vests","You want a swappable hook-and-loop attachment"]},{"type":"heading","text":"Choose Embroidered When..."},{"type":"list","items":["You want the traditional uniform or club patch look","Your design has clean lines and fewer than 15 thread colors","The patch is going on a dress uniform or formal garment","Heritage and tradition matter to the recipient"]},{"type":"tip","text":"Many customers order both — PVC for morale patches and field gear, embroidered for the main uniform patch."}]'::jsonb,
  'PVC vs. Embroidered Patches: Which Is Right for You? — The Patch Solutions',
  'Detailed comparison of PVC rubber patches vs embroidered patches. Learn which type suits your application, design, and budget.'
),
(
  'history-of-motorcycle-club-patch',
  'The History of the Motorcycle Club Patch',
  'From WWII veterans to today''s riding clubs — the evolution of the MC patch spans 80 years of American identity, brotherhood, and tradition.',
  'History',
  'TPS Team',
  true,
  '2025-03-18 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '7 min read',
  '[{"type":"heading","text":"The Post-War Origins (1945–1950)"},{"type":"paragraph","text":"The motorcycle club patch is one of the most recognizable symbols in American subculture — and its origins are inseparable from the experience of World War II veterans returning home in 1945. These men had spent years in military units defined by tight camaraderie, shared hardship, and a powerful sense of collective identity reinforced by unit insignia."},{"type":"heading","text":"The Birth of the Three-Piece Set"},{"type":"paragraph","text":"The format that defines motorcycle club identity to this day — the three-piece back patch — evolved in the late 1940s and early 1950s. It consists of a top rocker (club name), a center patch (club emblem), and a bottom rocker (club location or territory)."},{"type":"heading","text":"The AMA and the 1%er Culture"},{"type":"paragraph","text":"Following the Hollister incident of 1947, outlaw clubs adopted the ''1%er'' designation with pride, wearing a diamond-shaped patch as a badge of honor and defiance."},{"type":"tip","text":"The ''1%er'' diamond patch is one of the most recognizable patches in motorcycle culture — its meaning has evolved from rebellion to tradition over seven decades."},{"type":"heading","text":"Patch Hierarchy and What Colors Mean"},{"type":"paragraph","text":"In the traditional MC world, patches are not accessories or decorations — they are earned. The term ''colors'' refers to the complete back patch set. A member wearing club colors is representing every other member of that club."},{"type":"heading","text":"Modern MC Patch Culture"},{"type":"paragraph","text":"Today''s MC landscape is more diverse than at any point in its history — veteran organizations, Christian motorcycle clubs, law enforcement riding clubs, and countless recreational touring groups."},{"type":"warning","text":"Wearing another club''s colors without permission is considered a serious breach of MC protocol. When ordering custom MC patches, make sure your design is original to your club."}]'::jsonb,
  'The History of the Motorcycle Club Patch — The Patch Solutions',
  'Explore 80 years of MC patch history — from WWII veterans to modern riding clubs. The story of the three-piece set and outlaw culture.'
),
(
  'how-to-sew-on-a-patch',
  'How to Sew On a Patch by Hand or Machine',
  'Sewing is the most durable patch attachment method — and easier than you think. Complete guide to hand and machine sewing techniques.',
  'DIY Guides',
  'TPS Team',
  true,
  '2025-03-02 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '5 min read',
  '[{"type":"heading","text":"Why Sew Instead of Iron?"},{"type":"paragraph","text":"While iron-on heat seal is convenient, sewing a patch on is the gold standard for durability and permanence. A sewn patch cannot peel, lift at the edges, or delaminate — it is mechanically anchored to the garment through the fabric itself."},{"type":"heading","text":"What You''ll Need"},{"type":"list","items":["Thread in a color matching the patch border","Needle — embroidery needle for hand sewing, denim needle for machine","Scissors","Pins or fabric clips","Optional: thimble for thick materials like denim"]},{"type":"heading","text":"Hand Sewing: Step by Step"},{"type":"list","items":["Thread your needle with about 18 inches of thread and knot one end","Pin or clip the patch securely in position","Start from the back side of the fabric","Use a whipstitch or blanket stitch along the merrowed border","Keep stitches small and even — approximately 3mm apart","Remove pins as you approach them","When complete, knot the thread securely on the back side"]},{"type":"tip","text":"For most patches, a whipstitch in thread that matches the border color is nearly invisible and very strong."},{"type":"heading","text":"Machine Sewing: Step by Step"},{"type":"list","items":["Baste the patch in place first","Set stitch length to 2.5–3mm","Sew around the perimeter just inside the merrowed border","Pivot at corners by stopping with needle down in fabric","Backstitch at the start and finish to lock the seam"]},{"type":"warning","text":"For BSA merit badge sashes: the sash fabric is thin — use a fine needle and a shorter stitch length (2mm) to avoid puckering."}]'::jsonb,
  'How to Sew On a Patch by Hand or Machine — The Patch Solutions',
  'Complete sewing guide for attaching patches by hand or machine. Whipstitch, blanket stitch, and machine sewing techniques explained.'
),
(
  'designing-your-first-custom-patch',
  'Designing Your First Custom Patch: A Beginner''s Guide',
  'Never ordered a custom patch before? This complete guide walks you through every decision — from patch type to artwork submission.',
  'Getting Started',
  'TPS Team',
  true,
  '2025-02-14 00:00:00+00',
  'https://placehold.co/1200x600/142340/C8931A?text=Custom+Patches',
  '8 min read',
  '[{"type":"heading","text":"Step 1: Decide What the Patch Is For"},{"type":"paragraph","text":"Before you think about colors, sizes, or file formats, get completely clear on what this patch is for and who it''s for. This single decision shapes almost every other choice in the process."},{"type":"heading","text":"Step 2: Choose Your Patch Type"},{"type":"paragraph","text":"Embroidered patches are the most popular and versatile type. Woven patches allow extremely fine detail. PVC rubber patches are waterproof and bold. Dye sublimation patches are appropriate for photographic imagery."},{"type":"tip","text":"When in doubt, start with embroidered. It''s the most versatile, most popular, and works for 90% of applications."},{"type":"heading","text":"Step 3: Choose Your Size"},{"type":"paragraph","text":"Patches almost always look smaller on a garment than they do in a design file. 1–1.5 inches for hat patches; 2–3 inches for chest patches; 3–4 inches for jacket patches; 5–8 inches for MC back patches."},{"type":"heading","text":"Step 4: Choose Your Shape"},{"type":"paragraph","text":"The most popular shapes are round, rectangle, and shield. Beyond these, virtually any shape is possible with a custom die-cut merrowed border."},{"type":"heading","text":"Step 5: Choose Coverage and Colors"},{"type":"paragraph","text":"For embroidered patches, coverage percentage determines how much backing is covered by thread. At 100% coverage, the entire patch surface is dense thread with no background visible — the premium option."},{"type":"heading","text":"Step 6: Prepare Your Artwork"},{"type":"list","items":["AI or EPS files: the best possible starting point","PDF (vector): excellent","PNG at 300+ DPI: acceptable","Hand-drawn sketch: we''ll digitize it","No artwork at all: describe your vision and our team creates it"]},{"type":"warning","text":"Word documents and PowerPoint files cannot be used for production."},{"type":"heading","text":"Step 7: Choose Your Backing"},{"type":"paragraph","text":"Backing determines how the patch attaches. Heat seal (iron-on) for most garments. Hook and loop for tactical gear. Sew-on for MC vests and uniforms. Pin-back for hats and lapels."},{"type":"tip","text":"Request a free sample before placing your full order. We''ll send you a sample of our work so you can see and feel the quality before ordering."}]'::jsonb,
  'Designing Your First Custom Patch: A Beginner''s Guide — The Patch Solutions',
  'Never ordered a custom patch before? Step-by-step guide covering patch type, size, shape, coverage, artwork, and backing selection.'
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- AUTO-CREATE CUSTOMER PROFILE ON SIGNUP
-- Run this in Supabase SQL Editor after the schema above
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO customers (auth_user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- MIGRATION 001 — Run this block if schema was already applied
-- Fixes column mismatches found between edge functions & schema
-- ============================================================

-- 1. quotes: add auth_user_id so logged-in quotes appear in "My Quotes"
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. quotes: add quantity_range text (the form sends "25–49" not an integer)
--    and make quantity nullable so range-only submissions don't fail
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS quantity_range text;
ALTER TABLE quotes
  ALTER COLUMN quantity DROP NOT NULL;

-- 3. quotes: allow customers to see their own quotes
DROP POLICY IF EXISTS "quotes_select_admin" ON quotes;
CREATE POLICY "quotes_select_own_or_admin"
  ON quotes FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR is_admin());

-- 4. quotes: index for customer account queries
CREATE INDEX IF NOT EXISTS idx_quotes_auth_user_id ON quotes(auth_user_id);

-- 5. orders: add human-readable order_number column
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS order_number text;

-- Auto-generate order_number on insert (e.g. TPS-2025-0001)
CREATE SEQUENCE IF NOT EXISTS tps_order_seq START 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := 'TPS-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('tps_order_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- 6. orders: add auth_user_id for direct customer ownership queries
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_orders_auth_user_id ON orders(auth_user_id);

-- Update orders RLS: allow customers to see their own orders by auth_user_id too
DROP POLICY IF EXISTS "orders_select_own" ON orders;
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT TO authenticated
  USING (
    auth_user_id = auth.uid()
    OR customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
    OR is_admin()
  );

-- 7. orders: approve-proof should be customer-owned action
CREATE POLICY "orders_approve_proof_own"
  ON orders FOR UPDATE TO authenticated
  USING (auth_user_id = auth.uid() OR customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid()))
  WITH CHECK (true);

-- 8. sample_requests: add country column (was in function insert but missing from schema)
ALTER TABLE sample_requests
  ADD COLUMN IF NOT EXISTS country text DEFAULT 'US';

-- 9. sample_requests: add auth_user_id for logged-in customers
ALTER TABLE sample_requests
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
