import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { tableMetrics } from '~/db/utils/metrics';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

import type { SQLDate } from '~/db/types';

export const journal = sqliteTable('journal', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  date: integer('date', { mode: 'timestamp' }).notNull().$type<SQLDate | Date>(),
  notes: text('notes', { mode: 'text' }),
  isBookmarked: integer('is_bookmarked', { mode: 'boolean' }).notNull().default(false),
  ...tableMetrics,
});

export type Journal = InferSelectModel<typeof journal>;

export type NewJournal = InferInsertModel<typeof journal>;

export type SetJournal = SQLiteUpdateSetSource<typeof journal>;
