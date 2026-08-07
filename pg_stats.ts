import { Hono } from 'hono';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const app = new Hono();

app.get('/', async (c) => {
  const { rows } = await pool.query('SELECT * FROM pg_stat_activity');
  return c.json({
    greeting: process.env.GREETING,
    stats: rows
  });
});

export default app;