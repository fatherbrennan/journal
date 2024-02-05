import { sql } from 'drizzle-orm';

import type { SQL } from 'drizzle-orm';

/**
 * Return SQL to generate timestamp from given UTC time string. If omitted, will use current time.
 * @param time Date in UTC. Example: `'1999-01-31'` or `'2024-01-10T21:47:00.517Z'`.
 * @returns SQL to generate timestamp in seconds.
 */
export function date(time?: string): SQL<number> {
  return time ? sql<number>`(unixepoch(${time}))` : sql<number>`(unixepoch())`;
}
