import migration0 from '~/db/drizzle/0000_uneven_hannibal_king.sql?raw';
import migration1 from '~/db/drizzle/0001_icy_loners.sql?raw';
import migration2 from '~/db/drizzle/0002_motionless_punisher.sql?raw';
import migration3 from '~/db/drizzle/0003_misty_the_hunter.sql?raw';
import journal from '~/db/drizzle/meta/_journal.json';

const migration = {
  '0000_uneven_hannibal_king': migration0,
  '0001_icy_loners': migration1,
  '0002_motionless_punisher': migration2,
  '0003_misty_the_hunter': migration3,
};

export interface MigrationMeta {
  sql: string[];
  folderMillis: number;
  hash: string;
  bps: boolean;
}

export async function readMigrationFiles(): Promise<MigrationMeta[]> {
  const migrationQueries: MigrationMeta[] = [];

  for (const journalEntry of journal.entries) {
    try {
      const query = migration[journalEntry.tag as keyof typeof migration];

      const result = query.split('--> statement-breakpoint').map((it) => {
        return it;
      });

      async function sha256(query: string): Promise<string> {
        const data = new TextEncoder().encode(query);
        const hash = await window.crypto.subtle.digest('SHA-256', data);
        let hex = '';
        const view = new DataView(hash);
        for (let i = 0; i < view.byteLength; i += 4) {
          hex += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return hex;
      }

      migrationQueries.push({
        sql: result,
        bps: journalEntry.breakpoints,
        folderMillis: journalEntry.when,
        hash: await sha256(query),
      });
    } catch {
      throw new Error(`No SQL ${journalEntry.tag} found`);
    }
  }

  return migrationQueries;
}
