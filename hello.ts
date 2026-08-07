import { Hono } from 'hono';
import { Pool } from 'pg';
import { parseEnv } from '@neon/env';
import config from './neon';

const env = parseEnv(config, 'hello');

const pool = new Pool({ connectionString: env.postgres.databaseUrl, max: 5 });
const app = new Hono();

app.get('/', async (c) => {
  const { rows } = await pool.query('SELECT version()');
  return c.json({
    greeting: env.function.GREETING,
    database: rows[0].version,
  });
});

export default app;