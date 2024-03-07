import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { contacts } from '~/db/schema/contacts';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

/**
 * Virtual table `fts5_contacts` using FTS5.
 * @description
 * Is needed as Drizzle-ORM does not yet support virtual tables.
 */
export const fts5Contacts = sqliteTable('fts5_contacts', {
  id: integer('id', { mode: 'number' }).references(() => contacts.id),
  title: text('title', { length: 128 }).notNull(),
  nickname: text('nickname', { length: 20 }).notNull(),
  firstName: text('first_name', { length: 30 }).notNull(),
  lastName: text('last_name', { length: 30 }).notNull(),
});

export type FTS5Contacts = InferSelectModel<typeof fts5Contacts>;

export type NewFTS5Contacts = InferInsertModel<typeof fts5Contacts>;

export type UpdateFTS5Contacts = SQLiteUpdateSetSource<typeof fts5Contacts>;
