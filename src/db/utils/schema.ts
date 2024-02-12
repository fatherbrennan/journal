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
