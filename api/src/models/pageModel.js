import { query } from '../config/db.js';

// The only data model in the app: the `pages` table.
// All controllers (admin + frontend) go through these helpers.
const Page = {
  // Fetch every page (used by the CMS list screen).
  getAll: async () => {
    const { rows } = await query('SELECT * FROM pages ORDER BY id');
    return rows;
  },

  // Fetch one page by its slug, or null if it doesn't exist.
  getBySlug: async (slug) => {
    const { rows } = await query('SELECT * FROM pages WHERE slug = $1', [slug]);
    return rows[0] || null;
  },

  // Create the page if new, otherwise update it (upsert by slug).
  save: async (slug, name, content) => {
    const { rows } = await query(
      `INSERT INTO pages (slug, name, content)
       VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO UPDATE
         SET name = COALESCE(EXCLUDED.name, pages.name),
             content = EXCLUDED.content,
             updated_at = now()
       RETURNING *`,
      [slug, name, content],
    );
    return rows[0];
  },
};

export default Page;
