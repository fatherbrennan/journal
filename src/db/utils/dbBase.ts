import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import Database from 'tauri-plugin-sql-api';

import rawSql from '~/db/drizzle/0000_uneven_hannibal_king.sql?raw';
import rawSql1 from '~/db/drizzle/0001_icy_loners.sql?raw';
import { contacts } from '~/db/schema/contacts';
import { journal } from '~/db/schema/journal';
import { library } from '~/db/schema/library';
import { todos, todosRelations } from '~/db/schema/todos';
import { todosSubitems, todosSubitemsRelations } from '~/db/schema/todos_subitems';
import { fts5Contacts } from '~/db/schema/virtual/fts5_contacts';
import { fts5Journal } from '~/db/schema/virtual/fts5_journal';
import { fts5Library } from '~/db/schema/virtual/fts5_library';

const tableSchema = {
  contacts,
  journal,
  library,
  todos,
  todosSubitems,
  fts5Contacts,
  fts5Journal,
  fts5Library,
};

const schema = {
  ...tableSchema,
  todosRelations,
  todosSubitemsRelations,
};

export type DbTableSchema = typeof tableSchema;

export type DbTables = DbTableSchema[keyof DbTableSchema];

export type DbTableNames = DbTables['_']['name'];

export class DbBase {
  private static dbName: string = 'journal.db';
  private static connection: Database | null = null;
  private static hasInitSchemaThisConnection: boolean = false;
  public static client = drizzle(
    async (sql, params, method) => {
      try {
        const connection = await this.getConnection();

        const changePlaceholders = (rawQuery: string): string => {
          let index = 1;
          return rawQuery.replace(/\?/g, () => `$${index++}`);
        };

        const formattedSql = changePlaceholders(sql);

        if (method === 'run') {
          const result = await connection.execute(formattedSql, params);
          const rows = [result];
          return { rows: rows };
        } else {
          const result = await connection.select<{ [key: string]: unknown }[]>(formattedSql, params);
          const rows = result.map(Object.values);
          return { rows: rows };
        }
      } catch (error: unknown) {
        console.error('Error from sqlite client.', error);
        return { rows: [] };
      }
    },
    { schema }
  );

  /**
   * Get the existing database connection.
   * @returns Existing connection to the database.
   */
  private static async getConnection(): Promise<Database> {
    try {
      if (!this.connection) {
        // Try to reconnect
        return await this.connect();
      }

      return this.connection;
    } catch (error) {
      throw new Error(String(error) || 'Not connected to the database.');
    }
  }

  /**
   * Create a connection to the database.
   */
  private static async connect(): Promise<Database> {
    try {
      if (!this.connection) {
        this.connection = await Database.load(`sqlite:${this.dbName}`);
      }

      // Perform initial setup, and possibly create initial schema in database
      if (!this.hasInitSchemaThisConnection) {
        // Check if a table exists (this means the database has been created before)
        const query = sql`
                select 1
                from sqlite_master
                where type = ${'table'}
                limit 1
              `;
        const result = await this.client.all(query);

        // Create initial database if tables do not exist
        if (result.length === 0) {
          const query = sql.raw(rawSql + rawSql1);
          await this.client.run(query);
          this.hasInitSchemaThisConnection = true;
        }
      }

      return this.connection;
    } catch (error) {
      throw new Error('Initialising the database.');
    }
  }
}
