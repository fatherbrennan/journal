import { integer } from 'drizzle-orm/sqlite-core';

import { date } from '~/db/utils/date';

import type { DbTableNames, SQLDate, SQLiteTableBuilder } from '~/db/types';

export type SQLiteTableMetrics = SQLiteTableBuilder<DbTableNames, typeof tableMetrics>;

export const tableMetrics = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(date()).$type<SQLDate>(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$type<SQLDate>()
    .$default(() => date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }).$type<SQLDate>(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull().default(false),
};
