import { Fragment, useContext, useState } from 'react';

import { Button, ItemCounter } from '..';
import { TodoContext } from '../../context';
import EditableTodoItem from './EditableTodoItem';
import TodoItem from './TodoItem';

interface TodoListProps {
  /**
   * Show item counter.
   */
  hasItemCount?: boolean;
}

export default function TodoList(props: TodoListProps) {
  const todo = useContext(TodoContext);
  const [createSubitemId, setCreateSubitemId] = useState<string>();
  const [isCreateMode, setIsCreateMode] = useState(false);

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
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = (id: string) => {
    todo.delete(id);
  };

  /**
   * Delete subitem.
   * @param id Item identifier.
   */
  const deleteSubitem = (id: string, subitemId?: string) => {
    todo.deleteSubitem(id, subitemId!);
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = (data: any, id: string) => {
    todo.update(id, data);
  };

  /**
   * Update subitem.
   * @param data Form submit data.
   * @param id Item identifier.
   * @param subitemId Subitem identifier.
   */
  const updateSubitem = (data: any, id: string, subitemId?: string) => {
    todo.updateSubitem(id, subitemId!, data);
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = (data: any) => {
    todo.create({
      ...data,
      subItems: [],
    });
    closeCreateMode();
  };

  /**
   * Create a new subitem.
   * @param data Form submit data.
   */
  const createSubitem = (data: any) => {
    todo.createSubitem(createSubitemId!, data);
    closeCreateSubitemMode();
  };

  return (
    <>
      {props.hasItemCount && <ItemCounter itemCount={todo.store.length} />}
      {todo.store.map((item) => (
        <Fragment key={item._id}>
          <TodoItem
            id={item._id}
            value={item.value}
            onCreate={setCreateSubitemId}
            onDelete={deleteItem}
            onSubmit={updateItem}
          />
          {(item.subItems.length > 0 || createSubitemId !== undefined) && (
            <div className='pl-6'>
              {item.subItems.map((subItem) => (
                <TodoItem
                  key={subItem._id}
                  id={item._id}
                  subitemId={subItem._id}
                  value={subItem.value}
                  onDelete={deleteSubitem}
                  onSubmit={updateSubitem}
                />
              ))}
              {createSubitemId === item._id && (
                <EditableTodoItem
                  value=''
                  onCancel={closeCreateSubitemMode}
                  onSubmit={createSubitem}
                />
              )}
            </div>
          )}
        </Fragment>
      ))}
      {isCreateMode ? (
        <EditableTodoItem
          value=''
          onSubmit={createItem}
          onCancel={closeCreateMode}
        />
      ) : (
        <Button onClick={toggleCreateMode}>New Item</Button>
      )}
    </>
  );
}
