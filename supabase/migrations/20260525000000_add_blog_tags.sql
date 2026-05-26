-- Add tags array to blog_posts for taxonomy filtering
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Index for fast tag filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category) WHERE published = true;
