import { Hono } from 'hono';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
const app = new Hono();

app.get('/', async (c) => {
  const { rows } = await pool.query('SELECT floor(random() * 100 + 1) AS random_number');
  return c.json({
    greeting: process.env.GREETING,
    random_number: rows[0].random_number,
  });
});

export default app;