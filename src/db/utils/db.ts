import { and, asc, desc, eq, gt, lt } from 'drizzle-orm';

import { contacts } from '~/db/schema/contacts';
import { journal } from '~/db/schema/journal';
import { library } from '~/db/schema/library';
import { todos } from '~/db/schema/todos';
import { todosSubitems } from '~/db/schema/todos_subitems';
import { fts5Contacts } from '~/db/schema/virtual/fts5_contacts';
import { fts5Journal } from '~/db/schema/virtual/fts5_journal';
import { fts5Library } from '~/db/schema/virtual/fts5_library';
import { DbBase, getOffset, highlight, match, sd, selectCount } from '~/db/utils';

import type { Contact, NewContact } from '~/db/schema/contacts';
import type { Journal, NewJournal } from '~/db/schema/journal';
import type { Library, NewLibrary } from '~/db/schema/library';
import type { NewTodos, Todos } from '~/db/schema/todos';
import type { NewTodoSubitem, TodoSubitem } from '~/db/schema/todos_subitems';
import type { SQLDate } from '~/db/utils';

export const SQLOrder = {
  asc: asc,
  desc: desc,
} as const;

export type SQLOrderKeys = keyof typeof SQLOrder;

export type SQLOrderValues = (typeof SQLOrder)[SQLOrderKeys];

export class Db {
  public static async getJournals({
    activePage,
    itemsPerPage,
    order,
    search,
    dateAfter,
    dateBefore,
  }: {
    activePage: number;
    itemsPerPage: number;
    order: SQLOrderKeys;
    search: string;
    dateAfter?: SQLDate;
    dateBefore?: SQLDate;
  }) {
    const orderByFn = SQLOrder[order];
    const orderBy = [orderByFn(journal.date), orderByFn(journal.createdAt)];
    const offset = getOffset(activePage, itemsPerPage);
    const whereConditions = [];
    search && whereConditions.push(match<typeof fts5Journal>('fts5_journal', search, 'notes'));
    const where = and(sd(journal), dateBefore ? gt(journal.date, dateBefore) : undefined, dateAfter ? lt(journal.date, dateAfter) : undefined, ...whereConditions);
    const select = search
      ? {
          id: journal.id,
          ts: journal.date,
          notes: highlight<typeof fts5Journal>('fts5_journal', 1),
        }
      : {
          id: journal.id,
          ts: journal.date,
          notes: journal.notes,
        };
    const from = search ? fts5Journal : journal;
    const baseQuery = DbBase.client.select(select).from(from);
    const baseCountQuery = DbBase.client.select(selectCount).from(from);

    if (search) {
      baseQuery.leftJoin(journal, eq(fts5Journal.id, journal.id));
      baseCountQuery.leftJoin(journal, eq(fts5Journal.id, journal.id));
    }

    const result = await baseQuery
      .where(where)
      .orderBy(...orderBy)
      .limit(itemsPerPage)
      .offset(offset);

    const count = await baseCountQuery.where(where);

    return { count: count[0].count, result };
  }

  public static async createJournal(record: NewJournal) {
    return await DbBase.client.insert(journal).values(record);
  }

  public static async deleteJournal(recordId: Journal['id']) {
    return await DbBase.client.update(journal).set(sd(undefined, true)).where(eq(journal.id, recordId));
  }

  public static async updateJournal(recordId: Journal['id'], record: NewJournal) {
    return await DbBase.client.update(journal).set(record).where(eq(journal.id, recordId));
  }

  public static async getContacts({
    activePage,
    itemsPerPage,
    order,
    search,
    doShowInactive,
  }: {
    activePage: number;
    itemsPerPage: number;
    order: SQLOrderKeys;
    search: string;
    doShowInactive: boolean;
  }) {
    const orderByFn = SQLOrder[order];
    const orderBy = [orderByFn(contacts.title), orderByFn(contacts.createdAt)];
    const offset = getOffset(activePage, itemsPerPage);
    const whereConditions = [];
    search && whereConditions.push(match<typeof fts5Contacts>('fts5_contacts', search, 'nickname', 'first_name', 'last_name', 'title'));
    const where = and(sd(contacts), !doShowInactive ? eq(contacts.status, !doShowInactive) : undefined, ...whereConditions);
    const select = search
      ? {
          id: contacts.id,
          title: highlight<typeof fts5Contacts>('fts5_contacts', 1),
          nickname: highlight<typeof fts5Contacts>('fts5_contacts', 2),
          firstName: highlight<typeof fts5Contacts>('fts5_contacts', 3),
          lastName: highlight<typeof fts5Contacts>('fts5_contacts', 4),
          notes: contacts.notes,
          status: contacts.status,
        }
      : {
          id: contacts.id,
          title: contacts.title,
          nickname: contacts.nickname,
          firstName: contacts.firstName,
          lastName: contacts.lastName,
          notes: contacts.notes,
          status: contacts.status,
        };
    const from = search ? fts5Contacts : contacts;
    const baseQuery = DbBase.client.select(select).from(from);
    const baseCountQuery = DbBase.client.select(selectCount).from(from);

    if (search) {
      baseQuery.leftJoin(contacts, eq(fts5Contacts.id, contacts.id));
      baseCountQuery.leftJoin(contacts, eq(fts5Contacts.id, contacts.id));
    }

    const result = await baseQuery
      .where(where)
      .orderBy(...orderBy)
      .limit(itemsPerPage)
      .offset(offset);

    const count = await baseCountQuery.where(where);

    return { count: count[0].count, result };
  }

  public static async createContact(record: NewContact) {
    return await DbBase.client.insert(contacts).values(record);
  }

  public static async deleteContact(recordId: Contact['id']) {
    return await DbBase.client.update(contacts).set(sd(undefined, true)).where(eq(contacts.id, recordId));
  }

  public static async updateContact(recordId: Contact['id'], record: NewContact) {
    return await DbBase.client.update(contacts).set(record).where(eq(contacts.id, recordId));
  }

  public static async getLibrary({ activePage, itemsPerPage, order, search }: { activePage: number; itemsPerPage: number; order: SQLOrderKeys; search: string }) {
    const orderByFn = SQLOrder[order];
    const orderBy = [orderByFn(library.label), orderByFn(library.createdAt)];
    const offset = getOffset(activePage, itemsPerPage);
    const whereConditions = [];
    search && whereConditions.push(match<typeof fts5Library>('fts5_library', search, 'label'));
    const where = and(sd(library), ...whereConditions);
    const select = search
      ? {
          id: library.id,
          label: highlight<typeof fts5Library>('fts5_library', 1),
          value: library.value,
        }
      : {
          id: library.id,
          label: library.label,
          value: library.value,
        };
    const from = search ? fts5Library : library;
    const baseQuery = DbBase.client.select(select).from(from);
    const baseCountQuery = DbBase.client.select(selectCount).from(from);

    if (search) {
      baseQuery.leftJoin(library, eq(fts5Library.id, library.id));
      baseCountQuery.leftJoin(library, eq(fts5Library.id, library.id));
    }

    const result = await baseQuery
      .where(where)
      .orderBy(...orderBy)
      .limit(itemsPerPage)
      .offset(offset);

    const count = await baseCountQuery.where(where);

    return { count: count[0].count, result };
  }

  public static async createLibrary(record: NewLibrary) {
    return await DbBase.client.insert(library).values(record);
  }

  public static async deleteLibrary(recordId: Library['id']) {
    return await DbBase.client.update(library).set(sd(undefined, true)).where(eq(library.id, recordId));
  }

  public static async updateLibrary(recordId: Library['id'], record: NewLibrary) {
    return await DbBase.client.update(library).set(record).where(eq(library.id, recordId));
  }

  public static async getTodos() {
    const orderBy = SQLOrder.asc(todos.isChecked);
    const where = sd(todos);

    // TODO: Issue: `query.todos.findMany()` is not mapping fields
    const rows = await DbBase.client.query.todos.findMany({
      columns: {
        id: true,
        value: true,
        isChecked: true,
      },
      where,
      with: {
        subitems: {
          columns: {
            id: true,
            value: true,
            isChecked: true,
          },
          where,
          orderBy,
        },
      },
      orderBy,
    });

    // TODO: Issue: `query.todos.findMany()` is not mapping fields, just returning barebone database response.
    type Row = (typeof rows)[number];
    const result: typeof rows = (rows as unknown as [Row['id'], Row['value'], Row['isChecked'], string][]).map((row) => ({
      id: row[0],
      value: row[1],
      isChecked: !!row[2],
      subitems: (JSON.parse(row[3]) as [Row['subitems'][number]['id'], Row['subitems'][number]['value'], Row['isChecked']][]).map((srow) => ({
        id: srow[0],
        value: srow[1],
        isChecked: !!srow[2],
      })),
    }));

    const count = await DbBase.client.select(selectCount).from(todos).where(where);

    return { count: count[0].count, result };
  }

  public static async createTodo(record: NewTodos) {
    return await DbBase.client.insert(todos).values(record);
  }

  public static async checkTodo(recordId: Todos['id'], isChecked = true) {
    // Check the parent todo item and all related subitems
    await DbBase.client.transaction(async (tx) => {
      await tx.update(todos).set({ isChecked }).where(eq(todos.id, recordId));
      await tx.update(todosSubitems).set({ isChecked }).where(eq(todosSubitems.todoId, recordId));
    });
  }

  public static async deleteTodo(recordId: Todos['id']) {
    // Delete the parent todo item and all related subitems
    await DbBase.client.transaction(async (tx) => {
      await tx.update(todos).set(sd(undefined, true)).where(eq(todos.id, recordId));
      await tx.update(todosSubitems).set(sd(undefined, true)).where(eq(todosSubitems.todoId, recordId));
    });
  }

  public static async updateTodo(recordId: Todos['id'], record: NewTodos) {
    return await DbBase.client.update(todos).set(record).where(eq(todos.id, recordId));
  }

  public static async createTodoSubitem(record: NewTodoSubitem) {
    return await DbBase.client.insert(todosSubitems).values(record);
  }

  public static async checkTodoSubitem(recordId: TodoSubitem['id'], isChecked = true) {
    if (!isChecked) {
      await DbBase.client.transaction(async (tx) => {
        const [{ todoId }] = await tx.update(todosSubitems).set({ isChecked }).where(eq(todosSubitems.id, recordId)).returning();
        await tx.update(todos).set({ isChecked }).where(eq(todos.id, todoId));
      });
      return;
    }

    return await DbBase.client.update(todosSubitems).set({ isChecked }).where(eq(todosSubitems.id, recordId));
  }

  public static async deleteTodoSubitem(recordId: TodoSubitem['id']) {
    return await DbBase.client.update(todosSubitems).set(sd(undefined, true)).where(eq(todosSubitems.id, recordId));
  }

  public static async updateTodoSubitem(recordId: TodoSubitem['id'], record: NewTodoSubitem) {
    return await DbBase.client.update(todosSubitems).set(record).where(eq(todosSubitems.id, recordId));
  }
}
