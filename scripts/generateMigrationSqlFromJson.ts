import { mkdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

interface JSONContact {
  _id: string;
  title: string;
  nickname: string;
  firstName: string;
  lastName: string;
  notes: string;
  status: boolean;
}

interface JSONJournal {
  _id: string;
  date: string;
  notes: string;
  /** Timestamp in ms */
  ts: number;
}

interface JSONLibrary {
  _id: string;
  label: string;
  value: string;
}

interface JSONTodo {
  _id: string;
  value: string;
  subItems: {
    _id: string;
    value: string;
  }[];
}

(async () => {
  const __dirname = resolve();
  const path = {
    inputDir: join(__dirname, 'data'),
    outDir: join(__dirname, 'out'),
  };
  const jsonDb = {
    contacts: { jsonPath: 'contact.json', sqlPath: 'contacts.sql', sqlTableName: 'contacts' },
    journal: { jsonPath: 'journal.json', sqlPath: 'journal.sql', sqlTableName: 'journal' },
    library: { jsonPath: 'library.json', sqlPath: 'library.sql', sqlTableName: 'library' },
    todos: { jsonPath: 'todo.json', sqlPath: 'todos.sql', sqlTableName: 'todos' },
    todosSubitems: { jsonPath: 'todo.json', sqlPath: 'todos_subitems.sql', sqlTableName: 'todos_subitems' },
  };
  const dict = [
    { value: "''", pattern: /'/g },
    { value: 'Patrick', pattern: /\bpatrick\b/g },
    { value: 'filter', pattern: /\bphilter\b/g },
    { value: 'am', pattern: /(?<=\d)\sAM\b/g },
    { value: 'pm', pattern: /(?<=\d)\sPM\b/g },
  ];
  const updateTextAgainstDictionary = (text: string): string => {
    for (let i = 0; i < dict.length; i++) {
      const { pattern, value } = dict[i];
      text = text.replace(pattern, value);
    }
    return text;
  };
  const boolean = (boolean: boolean) => (boolean ? 1 : 0);
  const text = (text: string) => `'${updateTextAgainstDictionary(text)}'`;

  await mkdir(path.outDir, { recursive: true });

  const migrateContacts = async () => {
    const { jsonPath, sqlPath, sqlTableName } = jsonDb.contacts;
    const json = await readFile(resolve(path.inputDir, jsonPath), 'utf8');
    const entities = JSON.parse(json) as JSONContact[];

    let sql: string = '';

    for (let i = 0; i < entities.length; i++) {
      const { firstName, lastName, nickname, notes, status, title } = entities[i];
      sql += `insert into "${sqlTableName}" ("title", "nickname", "first_name", "last_name", "status", "notes", "updated_at") values (${text(title)}, ${text(nickname)}, ${text(
        firstName
      )}, ${text(lastName)}, ${boolean(status)}, ${text(notes)}, (unixepoch()));\n`;
    }

    await writeFile(resolve(path.outDir, sqlPath), sql, 'utf8');
  };

  const migrateJournal = async () => {
    const { jsonPath, sqlPath, sqlTableName } = jsonDb.journal;
    const json = await readFile(resolve(path.inputDir, jsonPath), 'utf8');
    const entities = JSON.parse(json) as JSONJournal[];

    let sql: string = '';

    for (let i = 0; i < entities.length; i++) {
      const { notes, ts } = entities[i];
      sql += `insert into "${sqlTableName}" ("date", "notes", "updated_at") values (${ts / 1000}, ${text(notes)}, (unixepoch()));\n`;
    }

    await writeFile(resolve(path.outDir, sqlPath), sql, 'utf8');
  };

  const migrateLibrary = async () => {
    const { jsonPath, sqlPath, sqlTableName } = jsonDb.library;
    const json = await readFile(resolve(path.inputDir, jsonPath), 'utf8');
    const entities = JSON.parse(json) as JSONLibrary[];

    let sql: string = '';

    for (let i = 0; i < entities.length; i++) {
      const { label, value } = entities[i];
      sql += `insert into "${sqlTableName}" ("label", "value", "updated_at") values (${text(label)}, ${text(value)}, (unixepoch()));\n`;
    }

    await writeFile(resolve(path.outDir, sqlPath), sql, 'utf8');
  };

  const migrateTodos = async () => {
    const { jsonPath, sqlPath, sqlTableName } = jsonDb.todos;
    const json = await readFile(resolve(path.inputDir, jsonPath), 'utf8');
    const entities = JSON.parse(json) as JSONTodo[];

    let sql: string = '';
    let todosSubitemsSql: string = '';

    for (let i = 0; i < entities.length; i++) {
      const { value, subItems } = entities[i];
      sql += `insert into "${sqlTableName}" ("value", "is_checked", "updated_at") values (${text(value)}, ${boolean(false)}, (unixepoch()));\n`;

      for (let ii = 0; ii < subItems.length; ii++) {
        const { value } = subItems[ii];
        todosSubitemsSql += `insert into "${jsonDb.todosSubitems.sqlTableName}" ("todo_id", "value", "is_checked", "updated_at") values (${i + 1}, ${text(value)}, ${boolean(
          false
        )}, (unixepoch()));\n`;
      }
    }

    await writeFile(resolve(path.outDir, sqlPath), sql, 'utf8');
    await writeFile(resolve(path.outDir, jsonDb.todosSubitems.sqlPath), todosSubitemsSql, 'utf8');
  };

  await migrateContacts();
  await migrateJournal();
  await migrateLibrary();
  await migrateTodos();
})();
