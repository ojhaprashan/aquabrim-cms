import app from './app.js';
import env from './config/env.js';
import pool from './config/db.js';

const start = async () => {
  try {
    // Verify the database is reachable before we start accepting requests.
    await pool.query('SELECT 1');
    console.log('✓ Connected to PostgreSQL');

    app.listen(env.port, () => {
      console.log(`✓ API running at http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('✗ Failed to start server:', err.message);
    console.error('  Check that PostgreSQL is running and .env is correct.');
    process.exit(1);
  }
};

start();
