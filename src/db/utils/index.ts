import { sql } from 'drizzle-orm';

export const selectCount = {
  count: sql<number>`count(*)`.mapWith(Number),
};

export const getOffset = (activePage: number, itemsPerPage: number) => (activePage === 1 ? 0 : (activePage - 1) * itemsPerPage);

export { date } from '~/db/utils/date';
export { Db, SQLOrder } from '~/db/utils/db';
export { DbBase } from '~/db/utils/dbBase';
export { highlight } from '~/db/utils/highlight';
export { match } from '~/db/utils/match';
export { schema, tableSchema } from '~/db/utils/schema';
export { sd } from '~/db/utils/sd';

export type { SQLOrderKeys, SQLOrderValues } from '~/db/utils/db';
