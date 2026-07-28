// Applies schema.sql, seeds the default admin, and creates an empty row for
// each site page. Usage: npm run migrate
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

import pool from '../config/db.js';
import env from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The pages that exist on the site (from the header menu + footer policies).
const PAGES = [
  { slug: 'home', name: 'Home' },
  { slug: 'about-us', name: 'About Us' },
  { slug: 'products', name: 'Products' },
  { slug: 'blogs', name: 'Blog' },
  { slug: 'contact-us', name: 'Contact Us' },
  { slug: 'pricing-policy', name: 'Pricing Policy' },
  { slug: 'privacy-policy', name: 'Privacy Policy' },
  { slug: 'refund-policy', name: 'Refund Policy' },
  { slug: 'shipping-policy', name: 'Shipping Policy' },
  { slug: 'terms-and-conditions', name: 'Terms and Conditions' },
  { slug: 'warranty-policy', name: 'Warranty Policy' },
];

const run = async () => {
  const client = await pool.connect();
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schema);
    console.log('✓ Schema applied');

    // Seed the default admin if none exists yet.
    const { rows } = await client.query('SELECT id FROM admins WHERE email = $1', [env.admin.email]);
    if (rows.length === 0) {
      const hash = await bcrypt.hash(env.admin.password, 10);
      await client.query(
        'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3)',
        ['Admin', env.admin.email, hash],
      );
      console.log(`✓ Seeded default admin: ${env.admin.email} / ${env.admin.password}`);
    } else {
      console.log('• Admin already exists, skipping seed');
    }

    // Ensure a row exists for every page (empty content, edited later in the CMS).
    for (const p of PAGES) {
      await client.query(
        `INSERT INTO pages (slug, name, content)
         VALUES ($1, $2, '{}'::jsonb)
         ON CONFLICT (slug) DO NOTHING`,
        [p.slug, p.name],
      );
    }
    console.log(`✓ Ensured ${PAGES.length} page rows`);

    console.log('✓ Migration complete');
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
};

run();
