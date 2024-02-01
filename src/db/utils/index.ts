import { eq, sql } from 'drizzle-orm';

import type { BuildColumns, ColumnBuilderBase, ColumnBuilderBaseConfig, ColumnDataType, SQL, Table } from 'drizzle-orm';
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

import type { DbTableNames } from '~/db/utils/dbBase';
import type { tableMetrics } from './metrics';

type SQLiteTableBuilderConfigMap = Record<string, ColumnBuilderBase<ColumnBuilderBaseConfig<ColumnDataType, string>, object>>;

export type SQLiteTableBuilder<TTableName extends DbTableNames, TConfigMap extends SQLiteTableBuilderConfigMap> = SQLiteTableWithColumns<{
  columns: BuildColumns<string, TConfigMap, 'sqlite'>;
  dialect: 'sqlite';
  name: TTableName;
  schema: undefined;
}>;

export type SQLiteTableMetrics = SQLiteTableBuilder<DbTableNames, typeof tableMetrics>;

/**
 * Return SQL to generate timestamp from given UTC time string. If omitted, will use current time.
 * @param time Date in UTC. Example: `'1999-01-31'` or `'2024-01-10T21:47:00.517Z'`.
 * @returns SQL to generate timestamp in seconds.
 */
export function date(time?: string): SQL<number> {
  return time ? sql<number>`(unixepoch(${time}))` : sql<number>`(unixepoch())`;
}

export type SQLDate = ReturnType<typeof date>;

type SdReturn<T extends SQLiteTableMetrics | undefined> = T extends SQLiteTableMetrics ? SQL<unknown> : { isDeleted: boolean };

/**
 * Return SQLite syntax for `highlight()` auxiliary function.
 * @param table DrizzleORM table.
 * @param nColumn An integer indicating the index of the FTS table column to read the text from. Columns are numbered from left to right starting at zero.
 * @returns SQLite syntax for `highlight()` auxiliary function.
 */
export function highlight<TTable extends Table>(tableName: TTable['_']['name'], nColumn: number): SQL<string> {
  return sql`highlight(${sql.raw(tableName)}, ${nColumn}, '<mark>', '</mark>')`;
}

/**
 * Create valid SQL for FTS search string.
 * @param tableName Name of the database table.
 * @param search Valid FTS match search string.
 * @param columns Database column names.
 * @returns SQL FTS search string.
 */
export function match<TTable extends Table, TColumNames = TTable['_']['columns'][keyof TTable['_']['columns']]['_']['name']>(
  tableName: TTable['_']['name'],
  search: string,
  ...columns: [TColumNames, ...TColumNames[]]
): SQL<string> {
  return sql.raw(`${tableName} match '{${columns.join(' ')}} : ${search}'`) as SQL<string>;
}

/**
 * Return relevent soft delete query value.
 * @param table DrizzleORM table.
 * @param isDeleted Boolean to determine the value of `is_deleted`.
 * @returns `where` query object if `table` is provided, otherwise an object for `set` keyword query.
 * @example
 * ```ts
 * this.sd(journal);            // eq(journal.isDeleted, false)
 * this.sd();                   // { isDeleted: false }
 * this.sd(journal, true);      // eq(journal.isDeleted, true)
 * this.sd(undefined, true);    // { isDeleted: true }
 * ```
 */
export function sd<T extends SQLiteTableMetrics | undefined>(table?: T, isDeleted: boolean = false): SdReturn<T> {
  return table ? (eq(table.isDeleted, isDeleted) as SdReturn<T>) : ({ isDeleted } as SdReturn<T>);
}

export const selectCount = {
  count: sql<number>`count(*)`.mapWith(Number),
};

export const getOffset = (activePage: number, itemsPerPage: number) => (activePage === 1 ? 0 : (activePage - 1) * itemsPerPage);

export { Db, SQLOrder } from '~/db/utils/db';
export { DbBase } from '~/db/utils/dbBase';

export type { SQLOrderKeys, SQLOrderValues } from '~/db/utils/db';
