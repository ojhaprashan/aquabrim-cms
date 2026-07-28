import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import env from './config/env.js';
import adminRoutes from './routes/admin/index.js';
import frontendRoutes from './routes/frontend/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// In development, allow any localhost origin so Vite port drift (5173/5174/…)
// never breaks the admin. In production, allow the configured client URLs —
// CLIENT_URL may be a comma-separated list (e.g. the admin panel + the public
// site), so both the CMS and the website can call the API.
const allowedOrigins = (env.clientUrl || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const corsOrigin =
  env.nodeEnv === 'development'
    ? (origin, cb) => cb(null, !origin || /^http:\/\/localhost:\d+$/.test(origin))
    : (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin));

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Serve uploaded images/files statically at /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'aquabrim-cms-api' });
});

// Admin (CMS) endpoints — set/update content. Protected inside the router.
app.use('/api/admin', adminRoutes);
// Frontend endpoints — public reads for the website.
app.use('/api', frontendRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
