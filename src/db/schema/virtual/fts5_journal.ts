import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { journal } from '~/db/schema/journal';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

/**
 * Virtual table `fts5_journal` using FTS5.
 * @description
 * Is needed as Drizzle-ORM does not yet support virtual tables.
 */
export const fts5Journal = sqliteTable('fts5_journal', {
  id: integer('id', { mode: 'number' })
    .notNull()
    .references(() => journal.id),
  notes: text('notes', { mode: 'text' }),
});

export type FTS5Journal = InferSelectModel<typeof fts5Journal>;

export type NewFTS5Journal = InferInsertModel<typeof fts5Journal>;

export type UpdateFTS5Journal = SQLiteUpdateSetSource<typeof fts5Journal>;
