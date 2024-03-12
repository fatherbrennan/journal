import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { tableMetrics } from '~/db/utils/metrics';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

export const contacts = sqliteTable('contacts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title', { length: 128 }).notNull(),
  nickname: text('nickname', { length: 20 }).notNull(),
  firstName: text('first_name', { length: 30 }).notNull(),
  lastName: text('last_name', { length: 30 }).notNull(),
  status: integer('status', { mode: 'boolean' }).notNull().default(true),
  notes: text('notes', { mode: 'text' }),
  ...tableMetrics,
});

export type Contact = InferSelectModel<typeof contacts>;

export type NewContact = InferInsertModel<typeof contacts>;

export type SetContact = SQLiteUpdateSetSource<typeof contacts>;
