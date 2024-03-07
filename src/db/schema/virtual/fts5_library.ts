import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { library } from '~/db/schema/library';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

/**
 * Virtual table `fts5_library` using FTS5.
 * @description
 * Is needed as Drizzle-ORM does not yet support virtual tables.
 */
export const fts5Library = sqliteTable('fts5_library', {
  id: integer('id', { mode: 'number' })
    .notNull()
    .references(() => library.id),
  label: text('label', { mode: 'text' }),
});

export type FTS5Library = InferSelectModel<typeof fts5Library>;

export type NewFTS5Library = InferInsertModel<typeof fts5Library>;

export type UpdateFTS5Library = SQLiteUpdateSetSource<typeof fts5Library>;
