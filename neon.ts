import { defineConfig } from '@neon/config/v1';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

export default defineConfig({
  preview: {
    functions: {
      hello: {
        name: 'Hello API',
        source: './hello.ts',
        env: {
          GREETING: process.env.GREETING ?? 'Hello World',
        }
      }
    }
  }
});