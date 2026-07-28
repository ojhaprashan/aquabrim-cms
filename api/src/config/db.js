import pg from 'pg';
import env from './env.js';

const { Pool } = pg;

// Prefer a single connection string when provided, otherwise fall back to parts.
const pool = env.databaseUrl
  ? new Pool({ connectionString: env.databaseUrl })
  : new Pool({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
      database: env.db.database,
    });

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

// Small helper so callers write `query(sql, params)` instead of pulling clients.
export const query = (text, params) => pool.query(text, params);

export default pool;
