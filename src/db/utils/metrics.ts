import { integer } from 'drizzle-orm/sqlite-core';

import { date } from '~/db/utils';

import type { SQLDate } from '~/db/utils';

export const tableMetrics = {
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(date()).$type<SQLDate>(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$type<SQLDate>()
    .$default(() => date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }).$type<SQLDate>(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull().default(false),
};
