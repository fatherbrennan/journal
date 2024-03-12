import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { todosSubitems } from '~/db/schema/todos_subitems';
import { tableMetrics } from '~/db/utils/metrics';
import { themes } from '~/db/utils/theme';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  value: text('value', { mode: 'text', length: 1024 }).notNull(),
  isChecked: integer('is_checked', { mode: 'boolean' }).notNull().default(false),
  theme: text('theme', { mode: 'text', enum: themes }).notNull().default('default'),
  ...tableMetrics,
});

export type Todos = InferSelectModel<typeof todos>;

export type NewTodos = InferInsertModel<typeof todos>;

export type SetTodos = SQLiteUpdateSetSource<typeof todos>;

export const todosRelations = relations(todos, ({ many }) => ({
  subitems: many(todosSubitems),
}));
