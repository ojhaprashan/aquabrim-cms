// Pushes a PENDING content change into the `pages` table.
//
//   npm run seed                   -> add the new posts; leave existing ones alone
//   npm run seed -- --force        -> also overwrite posts already in the database
//   npm run seed -- --prune-images -> delete seed-data/images once installed
//
// This is not a full re-seed of the site. ./seed-data holds only what is waiting
// to go live — the pages listed in SEEDS below, the posts not yet published, and
// the images those posts introduce. Anything already synced is deleted from here,
// so running this on the server cannot touch content someone edited in the CMS.
//
// Because seed-data holds only the NEW posts, this script MERGES rather than
// overwrites (see mergeContent). The whole blog is a single JSONB row, so writing
// the seed file over it would delete every post the file does not contain. Adding
// a post is therefore safe to run against production at any time.
//
// A live page already has its images in uploads/, which is gitignored — so a NEW
// image can only reach the server through seed-data/images, and this script
// installs those into uploads/ before writing the content that points at them.
//
// blogs.json is generated from the frontend's own data file by
// `node scripts/generate-cms-seed.mjs` in the aquabrim_new repo. Note that the
// generator still writes products.json and copies every image; delete what is
// already synced again after running it.
//
// The site reads its products and blog posts from this database only — there is
// no fallback copy served to visitors — so a page's row must be populated before
// the site is built (`next build` is a static export and reads the CMS at build
// time).
//
// --prune-images reclaims the duplicate copy on a disk-tight server. Restore the
// images from git before seeding again:
//   git checkout -- src/db/seed-data/images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.join(__dirname, 'seed-data');
// Images ship inside seed-data (git-tracked) and are installed into uploads/
// here. uploads/ itself is gitignored because it holds runtime uploads, so seed
// images copied straight there would never reach the server.
const SEED_IMAGES_DIR = path.join(SEED_DIR, 'images');
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

// Copy the seed images into the folder the API serves at /uploads.
// Existing files are overwritten so a re-seed always matches the content.
const installImages = () => {
  if (!fs.existsSync(SEED_IMAGES_DIR)) {
    console.warn(`• no seed images at ${SEED_IMAGES_DIR} — skipping image install`);
    return 0;
  }
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(SEED_IMAGES_DIR)) {
    const from = path.join(SEED_IMAGES_DIR, name);
    if (!fs.statSync(from).isFile()) continue;
    fs.copyFileSync(from, path.join(UPLOADS_DIR, name));
    n += 1;
  }
  return n;
};

// Remove the seed copies once they are safely in uploads/. Verifies each file
// actually landed first — deleting the only other copy on a failed install would
// leave the server with content pointing at images that no longer exist anywhere.
const pruneSeedImages = () => {
  if (!fs.existsSync(SEED_IMAGES_DIR)) return 0;
  let removed = 0;
  for (const name of fs.readdirSync(SEED_IMAGES_DIR)) {
    const from = path.join(SEED_IMAGES_DIR, name);
    if (!fs.statSync(from).isFile()) continue;

    const installed = path.join(UPLOADS_DIR, name);
    if (!fs.existsSync(installed) || fs.statSync(installed).size !== fs.statSync(from).size) {
      console.warn(`• keeping ${name} — not found in uploads/ (or size differs)`);
      continue;
    }
    fs.unlinkSync(from);
    removed += 1;
  }
  return removed;
};

// slug -> the file holding that page's content.
//
// Only the pages with a pending change are listed here. Everything else — the
// products page and the rest of the site — is already in the database and is
// deliberately NOT seeded, so a deploy can never overwrite content that was
// edited in the CMS. Their seed files were removed once synced; recover one from
// git history if a page ever has to be rebuilt from scratch:
//   git log --diff-filter=D -- api/src/db/seed-data/products.json
const SEEDS = [
  { slug: 'blogs', name: 'Blog', file: 'blogs.json' },
];

const force = process.argv.includes('--force');
const pruneImages = process.argv.includes('--prune-images');

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
  if (slug === 'blogs') return `${content?.posts?.posts?.length ?? 0} posts`;
  return `${Object.keys(content || {}).length} sections`;
};

// Merge a seed file into what the page already holds, rather than replacing it.
//
// The whole blog is ONE row, so a straight overwrite would delete every post the
// seed file does not happen to contain. That is the wrong shape for this project:
// blogs.json carries only the posts waiting to go live, so the seed has to ADD
// them to whatever is already published instead of standing in for it.
//
// Rules:
//   - a post whose slug is already there is updated in place, keeping its position
//   - a post whose slug is new is appended
//   - every other post is left exactly as it is
//   - page-level settings (seo, hero, featured, newsletter, cta) are only applied
//     when the seed file actually carries them, so a posts-only file cannot wipe
//     copy that was edited in the CMS
//
// Returns { content, added, updated } — the merged content to write.
const mergeContent = (existing, incoming) => {
  const base = existing && typeof existing === 'object' ? existing : {};

  // Page-level sections: take only the keys the seed file defines.
  const merged = { ...base };
  for (const [key, value] of Object.entries(incoming)) {
    if (key !== 'posts') merged[key] = value;
  }

  const currentPosts = Array.isArray(base.posts?.posts) ? base.posts.posts : [];
  const incomingPosts = Array.isArray(incoming.posts?.posts) ? incoming.posts.posts : [];

  if (!incomingPosts.length) {
    return { content: merged, added: 0, updated: 0 };
  }

  const posts = [...currentPosts];
  let added = 0;
  let updated = 0;

  for (const post of incomingPosts) {
    const slug = (post?.slug ?? '').trim();
    // A post with no slug has no address and would never be published anyway.
    if (!slug) continue;

    const at = posts.findIndex((p) => (p?.slug ?? '').trim() === slug);
    if (at >= 0) {
      posts[at] = post;
      updated += 1;
    } else {
      posts.push(post);
      added += 1;
    }
  }

  merged.posts = { ...(base.posts || {}), ...(incoming.posts || {}), posts };
  return { content: merged, added, updated };
};

const run = async () => {
  const client = await pool.connect();
  try {
    // Images first: content rows reference /uploads/<name>, so the files must be
    // in place before those references go live.
    const images = installImages();
    console.log(`✓ images: installed ${images} file(s) into ${UPLOADS_DIR}`);

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

      // An empty page is filled outright; an existing one is merged into, so
      // nothing already published is lost. `--force` is no longer needed to add
      // a post — it only decides whether a post already in the database may be
      // overwritten by the seed file's copy of it.
      const fresh = rows.length === 0 || isEmpty(existing);
      const { content: merged, added, updated } = fresh
        ? { content, added: (content?.posts?.posts ?? []).length, updated: 0 }
        : mergeContent(existing, content);

      if (!fresh && updated > 0 && !force) {
        console.log(
          `• ${seed.slug}: ${updated} post(s) in the seed file already exist in the database. ` +
            'They were left untouched — re-run with `npm run seed -- --force` to overwrite them.',
        );
      }

      // Without --force, an existing post keeps whatever the database holds.
      const toWrite =
        !fresh && !force && updated > 0
          ? mergeContent(existing, {
              ...content,
              posts: {
                ...(content.posts || {}),
                posts: (content.posts?.posts ?? []).filter(
                  (p) =>
                    !(existing?.posts?.posts ?? []).some(
                      (e) => (e?.slug ?? '').trim() === (p?.slug ?? '').trim(),
                    ),
                ),
              },
            }).content
          : merged;

      if (fresh || added > 0 || (updated > 0 && force)) {
        await client.query(
          `INSERT INTO pages (slug, name, content)
           VALUES ($1, $2, $3)
           ON CONFLICT (slug) DO UPDATE
             SET content = EXCLUDED.content, updated_at = now()`,
          [seed.slug, seed.name, toWrite],
        );
      }

      const total = (toWrite?.posts?.posts ?? []).length;
      console.log(
        fresh
          ? `✓ ${seed.slug}: seeded ${summarise(seed.slug, content)}`
          : `✓ ${seed.slug}: ${added} added, ${force ? updated : 0} updated, ` +
            `${total} post(s) now on the page`,
      );
    }
    if (pruneImages) {
      const removed = pruneSeedImages();
      console.log(
        `✓ images: pruned ${removed} seed copy/copies — restore with ` +
          '`git checkout -- src/db/seed-data/images` before seeding again'
      );
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
