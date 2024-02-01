import { join } from 'path';

import type { Config } from 'drizzle-kit';

export const DRIZZLE_DIR = './src/db/drizzle';

const userDataPath =
  process.platform === 'win32' ? process.env.APPDATA : process.platform === 'darwin' ? `${process.env.HOME}/Library/Application` : `${process.env.HOME}/.local/share`;

if (!userDataPath) {
  throw new Error('Cannot get platform specific path.');
}

export default {
  schema: './src/db/schema/*.ts',
  out: DRIZZLE_DIR,
  driver: 'better-sqlite',
  dbCredentials: {
    url: join(userDataPath, 'Journal', 'journal.db'),
  },
} satisfies Config;
