import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import Database from 'tauri-plugin-sql-api';

import { migrate } from '~/db/utils/migrator';
import { schema } from '~/db/utils/schema';

export class DbBase {
  private static dbName: string = 'journal.db';
  private static connection: Database | null = null;
  private static hasInitSchemaThisConnection: boolean = false;
  private static isRunningMigration: boolean = false;
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
      if (!this.hasInitSchemaThisConnection && !this.isRunningMigration) {
        this.isRunningMigration = true;
        // Check if a table exists (this means the database has been created before)
        const query = sql.raw(`
          select exists(select 1
                   from "sqlite_master"
                   where type = "table"
                   limit 1) as 'hasAnyTables',
                 exists(
                   select 1
                   from "sqlite_master"
                   where "sqlite_master"."type" = "table" and "sqlite_master"."name" = "__drizzle_migrations"
                   limit 1) as 'hasMigrationsTable';
        `);
        const result = await this.client.all(query);

        // Run migration queries
        if (result.length > 0 && Array.isArray(result[0]) && result[0].length === 2) {
          const [r] = result;
          const hasAnyTables = r[0] === 1 ? true : false;
          const hasMigrationsTable = r[1] === 1 ? true : false;

          await migrate(this.client, async (migrationQueries) => {
            if (migrationQueries.length > 0) {
              if (hasAnyTables && !hasMigrationsTable) {
                // Handler for update from v2.0.0
                // If there are tables but no migration table, remove the initial migration queries
                // Need to do this logic for backward compatibility with first SQL migration
                migrationQueries.splice(0, 6);
                migrationQueries.splice(1, 1);
              }

              await this.client.run(sql.raw(migrationQueries.join('')));
            }
          });

          this.hasInitSchemaThisConnection = true;
          this.isRunningMigration = false;
        } else {
          throw new Error('Unexpected response from migrations table.');
        }
      }

      return this.connection;
    } catch (error) {
      throw new Error('Initialising the database.');
    }
  }
}
