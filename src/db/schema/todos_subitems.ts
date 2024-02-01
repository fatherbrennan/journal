import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { todos } from '~/db/schema/todos';
import { tableMetrics } from '~/db/utils/metrics';

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const todosSubitems = sqliteTable('todos_subitems', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  todoId: integer('todo_id', { mode: 'number' })
    .notNull()
    .references(() => todos.id),
  value: text('value', { mode: 'text', length: 1024 }).notNull(),
  isChecked: integer('is_checked', { mode: 'boolean' }).notNull().default(false),
  ...tableMetrics,
});

export type TodoSubitem = InferSelectModel<typeof todosSubitems>;

export type NewTodoSubitem = InferInsertModel<typeof todosSubitems>;

export const todosSubitemsRelations = relations(todosSubitems, ({ one }) => ({
  todo: one(todos, {
    fields: [todosSubitems.todoId],
    references: [todos.id],
  }),
}));
