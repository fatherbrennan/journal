import { sql } from 'drizzle-orm';

import { readMigrationFiles } from '~/db/utils/migrator/migrator';

import type { SqliteRemoteDatabase } from 'drizzle-orm/sqlite-proxy';

export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;

export async function migrate<TSchema extends Record<string, unknown>>(db: SqliteRemoteDatabase<TSchema>, callback: ProxyMigrator) {
  const migrations = await readMigrationFiles();

  const migrationTableCreate = sql`
    create table if not exists "__drizzle_migrations" (
      id integer primary key autoincrement not null,
      hash text not null,
      created_at integer
    )
  `;

  await db.run(migrationTableCreate);

  const dbMigrations = await db.values<[number, string, string]>(sql`select id, hash, created_at from "__drizzle_migrations" order by created_at desc limit 1;`);

  const lastDbMigration = dbMigrations[0] ?? undefined;

  const queriesToRun: string[] = [];
  for (const migration of migrations) {
    if (!lastDbMigration || Number(lastDbMigration[2])! < migration.folderMillis) {
      queriesToRun.push(...migration.sql, `insert into "__drizzle_migrations" ("hash", "created_at") values('${migration.hash}', '${migration.folderMillis}');`);
    }
  }

  await callback(queriesToRun);
}
