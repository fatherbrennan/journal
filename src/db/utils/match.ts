import { sql } from 'drizzle-orm';

import type { SQL, Table } from 'drizzle-orm';

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
