import { sql } from 'drizzle-orm';

import { contacts } from '~/db/schema/contacts';
import { journal } from '~/db/schema/journal';
import { library } from '~/db/schema/library';
import { todos, todosRelations } from '~/db/schema/todos';
import { todosSubitems, todosSubitemsRelations } from '~/db/schema/todos_subitems';
import { fts5Contacts } from '~/db/schema/virtual/fts5_contacts';
import { fts5Journal } from '~/db/schema/virtual/fts5_journal';
import { fts5Library } from '~/db/schema/virtual/fts5_library';

export const tableSchema = {
  contacts,
  journal,
  library,
  todos,
  todosSubitems,
  fts5Contacts,
  fts5Journal,
  fts5Library,
};

export const schema = {
  ...tableSchema,
  todosRelations,
  todosSubitemsRelations,
};

export const selectCount = {
  count: sql<number>`count(*)`.mapWith(Number),
};

export const getOffset = (activePage: number, itemsPerPage: number) => (activePage === 1 ? 0 : (activePage - 1) * itemsPerPage);

export { date } from '~/db/utils/date';
export { Db, SQLOrder } from '~/db/utils/db';
export { DbBase } from '~/db/utils/dbBase';
export { highlight } from '~/db/utils/highlight';
export { match } from '~/db/utils/match';
export { sd } from '~/db/utils/sd';
