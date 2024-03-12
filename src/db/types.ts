import type { date, tableSchema } from '~/db/utils';

import type { BuildColumns, ColumnBuilderBase, ColumnBuilderBaseConfig, ColumnDataType } from 'drizzle-orm';
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

export type DbTableSchema = typeof tableSchema;

export type DbTables = DbTableSchema[keyof DbTableSchema];

export type DbTableNames = DbTables['_']['name'];

export type SQLDate = ReturnType<typeof date>;

export type SQLiteTableBuilderConfigMap = Record<string, ColumnBuilderBase<ColumnBuilderBaseConfig<ColumnDataType, string>, object>>;

export type SQLiteTableBuilder<TTableName extends DbTableNames, TConfigMap extends SQLiteTableBuilderConfigMap> = SQLiteTableWithColumns<{
  columns: BuildColumns<string, TConfigMap, 'sqlite'>;
  dialect: 'sqlite';
  name: TTableName;
  schema: undefined;
}>;
