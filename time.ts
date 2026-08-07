import { Hono } from 'hono';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const app = new Hono();

app.get('/', async (c) => {
  const { rows } = await pool.query('SELECT NOW()');
  return c.json({
    greeting: process.env.GREETING,
    time: rows[0].now,
    timezone: process.env.TZ ?? 'UTC',
  });
});

export default app;