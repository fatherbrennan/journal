import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { tableMetrics } from '~/db/utils/metrics';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const library = sqliteTable('library', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  label: text('label').unique().notNull(),
  value: text('value', { mode: 'text' }).notNull(),
  ...tableMetrics,
});

export type Library = InferSelectModel<typeof library>;

export type NewLibrary = InferInsertModel<typeof library>;
