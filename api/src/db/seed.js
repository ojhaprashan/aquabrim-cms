// Loads the site's full content into the `pages` table.
//
//   npm run seed          -> only fills pages whose content is still empty
//   npm run seed -- --force  -> overwrites, even if the page has been edited
//
// The JSON in ./seed-data is generated from the frontend's built-in data files
// by `node scripts/generate-cms-seed.mjs` in the aquabrim_new repo. The site
// reads its products and blog posts from this database only — there is no
// fallback copy served to visitors — so these rows must be populated before the
// site is built.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.join(__dirname, 'seed-data');

// slug -> the file holding that page's content.
const SEEDS = [
  { slug: 'products', name: 'Products', file: 'products.json' },
  { slug: 'blogs', name: 'Blog', file: 'blogs.json' },
];

const force = process.argv.includes('--force');

// A page counts as empty when it has no content at all, or only empty sections.
const isEmpty = (content) => {
  if (!content || typeof content !== 'object') return true;
  return Object.values(content).every(
    (section) =>
      section == null ||
      (typeof section === 'object' && Object.keys(section).length === 0),
  );
};

// Short description of what a payload contains, for the log line.
const summarise = (slug, content) => {
  if (slug === 'products') return `${content?.catalog?.products?.length ?? 0} products`;
  if (slug === 'blogs') return `${content?.posts?.posts?.length ?? 0} posts`;
  return `${Object.keys(content || {}).length} sections`;
};

const run = async () => {
  const client = await pool.connect();
  try {
    for (const seed of SEEDS) {
      const file = path.join(SEED_DIR, seed.file);
      if (!fs.existsSync(file)) {
        console.error(`✗ ${seed.slug}: missing ${seed.file} — run generate-cms-seed.mjs first`);
        process.exitCode = 1;
        continue;
      }

      const content = JSON.parse(fs.readFileSync(file, 'utf-8'));

      const { rows } = await client.query('SELECT content FROM pages WHERE slug = $1', [seed.slug]);
      const existing = rows[0]?.content;

      if (!force && rows.length > 0 && !isEmpty(existing)) {
        console.log(
          `• ${seed.slug}: already has content — skipped. ` +
            'Re-run with `npm run seed -- --force` to overwrite.',
        );
        continue;
      }

      await client.query(
        `INSERT INTO pages (slug, name, content)
         VALUES ($1, $2, $3)
         ON CONFLICT (slug) DO UPDATE
           SET content = EXCLUDED.content, updated_at = now()`,
        [seed.slug, seed.name, content],
      );
      console.log(`✓ ${seed.slug}: seeded ${summarise(seed.slug, content)}${force ? ' (forced)' : ''}`);
    }
    console.log('✓ Seed complete');
  } catch (err) {
    console.error('✗ Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
};

run();
