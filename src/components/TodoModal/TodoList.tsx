import { Fragment, useContext, useEffect, useState } from 'react';

import { Button, ItemCounter } from '~/components';
import { TodoContext } from '~/context';
import { Db, Theme } from '~/db/utils';
import { usePagination } from '~/hooks';
import { EditableTodoItem } from './EditableTodoItem';
import { TodoItem } from './TodoItem';

import type { Todos } from '~/db/schema/todos';
import type { TodoSubitem } from '~/db/schema/todos_subitems';
import type { ThemeTypeKeys } from '~/db/utils/theme';

interface TodoListProps {
  /**
   * When `true`, will display the item count.
   */
  doHideItemCount?: boolean;
}

export function TodoList({ doHideItemCount = false }: TodoListProps) {
  const [createSubitemId, setCreateSubitemId] = useState<Todos['id']>();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const { count, items, handleDbResponse } = usePagination<Awaited<ReturnType<typeof Db.getTodos>>['result']>();
  const todoContext = useContext(TodoContext);

  /**
   * Toggle create card visibility.
   */
  const toggleCreateMode = () => {
    setIsCreateMode(!isCreateMode);
  };

  /**
   * Remove create card.
   */
  const closeCreateMode = () => {
    setIsCreateMode(false);
  };

  /**
   * Remove create card.
   */
  const closeCreateSubitemMode = () => {
    setCreateSubitemId(undefined);
  };

  /**
   * Check item.
   * @param id Item identifier.
   * @param checked Check value.
   */
  const checkItem = async (id: Todos['id'], checked?: boolean) => {
    await Db.checkTodo(id, checked);
    getTodos();
  };

  /**
   * Check subitem.
   * @param subitemId Item identifier.
   * @param checked Check value.
   */
  const checkSubitem = async (subitemId: TodoSubitem['id'], checked?: boolean) => {
    await Db.checkTodoSubitem(subitemId, checked);
    getTodos();
  };

  /**
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = async (id: Todos['id']) => {
    await Db.deleteTodo(id);
    getTodos();
  };

  /**
   * Delete subitem.
   * @param subitemId Item identifier.
   */
  const deleteSubitem = async (subitemId: TodoSubitem['id']) => {
    await Db.deleteTodoSubitem(subitemId);
    getTodos();
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = async (data: any, id: Todos['id']) => {
    await Db.updateTodo(id, data);
    getTodos();
  };

  /**
   * Update subitem.
   * @param data Form submit data.
   * @param subitemId Subitem identifier.
   */
  const updateSubitem = async (data: any, subitemId: TodoSubitem['id']) => {
    await Db.updateTodoSubitem(subitemId, data);
    getTodos();
  };

  /**
   * Update item theme.
   * @param theme New theme.
   * @param id Item identifier.
   */
  const updateItemTheme = async (theme: ThemeTypeKeys, id: Todos['id']) => {
    await Db.updateTodo(id, { theme });
    getTodos();
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = async (data: any) => {
    await Db.createTodo(data);
    getTodos();
    closeCreateMode();
  };

  /**
   * Create a new subitem.
   * @param data Form submit data.
   */
  const createSubitem = async (data: any) => {
    await Db.createTodoSubitem({ ...data, todoId: createSubitemId! });
    getTodos();
    closeCreateSubitemMode();
  };

  /**
   * Get todo items and their subitems.
   */
  const getTodos = () => {
    Db.getTodos().then(handleDbResponse);
  };

  useEffect(getTodos, []);

  useEffect(() => todoContext.setItemCount(count), [count]);

  return (
    <>
      {!doHideItemCount && <ItemCounter itemCount={count} />}
      <div className='overflow-auto'>
        {items.map((item) => (
          <Fragment key={item.id}>
            <TodoItem
              id={item.id}
              value={item.value}
              theme={Theme[item.theme]}
              isChecked={item.isChecked}
              onCreate={setCreateSubitemId}
              onCheck={checkItem}
              onDelete={deleteItem}
              onTheme={updateItemTheme}
              onSubmit={updateItem}
            />
            {(item.subitems.length > 0 || createSubitemId !== undefined) && (
              <div className='pl-6'>
                {item.subitems.map((subitem) => (
                  <TodoItem
                    key={item.id + subitem.id}
                    id={subitem.id}
                    value={subitem.value}
                    theme={Theme[item.theme]}
                    isChecked={subitem.isChecked}
                    onDelete={deleteSubitem}
                    onCheck={checkSubitem}
                    onSubmit={updateSubitem}
                    isSubitem
                  />
                ))}
                {createSubitemId === item.id && <EditableTodoItem value='' onCancel={closeCreateSubitemMode} onSubmit={createSubitem} />}
              </div>
            )}
          </Fragment>
        ))}
        {isCreateMode ? <EditableTodoItem value='' onSubmit={createItem} onCancel={closeCreateMode} /> : <Button onClick={toggleCreateMode}>New Item</Button>}
      </div>
    </>
  );
}
