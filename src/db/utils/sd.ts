import { eq } from 'drizzle-orm';

import type { SQL } from 'drizzle-orm';

import type { SQLiteTableMetrics } from '~/db/utils/metrics';

type SdReturn<T extends SQLiteTableMetrics | undefined> = T extends SQLiteTableMetrics ? SQL<unknown> : { isDeleted: boolean };

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
