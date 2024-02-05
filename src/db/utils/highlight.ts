import { sql } from 'drizzle-orm';

import type { SQL, Table } from 'drizzle-orm';

import type { SQLiteTableMetrics } from '~/db/utils/metrics';

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
