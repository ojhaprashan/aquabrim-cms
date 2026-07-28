-- Aquabrim CMS schema
-- Run with: npm run migrate

-- Remove tables from the earlier draft (we now keep a single content table).
DROP TABLE IF EXISTS content_blocks;
DROP TABLE IF EXISTS media;

-- Admin accounts (for logging into the CMS).
CREATE TABLE IF NOT EXISTS admins (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL DEFAULT 'Admin',
  email       VARCHAR(160) NOT NULL UNIQUE,
  password    VARCHAR(200) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The one content table. Every page of the site is one row.
--   slug    -> unique id used by the frontend (e.g. "home", "about-us")
--   name    -> human label shown in the CMS ("Home", "About Us")
--   content -> ALL of the page's data as JSON (text, images, lists, ...)
-- Because content is JSONB, each page can hold whatever shape it needs
-- without any schema changes.
CREATE TABLE IF NOT EXISTS pages (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(160) NOT NULL UNIQUE,
  name        VARCHAR(200) NOT NULL,
  content     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages (slug);
