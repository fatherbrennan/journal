import { useState } from 'react';

import { IconButton } from '..';
import { Edit, Plus } from '../../icons';
import EditableTodoItem from './EditableTodoItem';
import TodoItemCheckbox from './TodoItemCheckbox';

interface TodoItemProps {
  /**
   * Todo item unique identifier. Omitted on item creation.
   */
  id: string;

  /**
   * Todo subitem unique identifier. Omitted on subitem creation.
   */
  subitemId?: string;

  /**
   * Item value.
   */
  value: string;

  /**
   * Callback function to execute on create event.
   * Event fires when create subitem button is clicked.
   * @param id Unique identifier of todo item.
   */
  onCreate?: (id: string) => void;

  /**
   * Callback function to execute on delete event.
   * @param id Unique identifier of todo item.
   * @param subitemId Unique identifier of todo subitem (is subitem of `id`).
   */
  onDelete?: (id: string, subitemId?: string) => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param id Unique identifier of todo item.
   * @param subitemId Unique identifier of todo subitem (is subitem of `id`).
   */
  onSubmit: (data: any, id: string, subitemId?: string) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [deleteTimeoutId, setDeleteTimeoutId] = useState<NodeJS.Timeout>();

  /**
   * Trigger create event for parent component.
   */
  const createSubitem = () => {
    props.onCreate!(props.id);
  };

  /**
   * Trigger delete event for parent component.
   */
  const deleteItem = () => {
    props.onDelete!(props.id!, props.subitemId);
    setIsDeleteMode(false);
  };

  /**
   * Cancel the delete timeout.
   */
  const cancelDeleteItem = () => {
    clearTimeout(deleteTimeoutId);
    setDeleteTimeoutId(undefined);
    setIsDeleteMode(false);
  };

  /**
   * Cancel update.
   */
  const cancelUpdateItem = () => {
    setIsUpdateMode(false);
  };

  /**
   * Trigger submit event for parent component.
   * @param data Data from editable item form as key:value.
   */
  const updateItem = (data: any) => {
    props.onSubmit(data, props.id!, props.subitemId);
    setIsUpdateMode(false);
  };

  /**
   * Set item to delete mode.
   */
  const attemptDeleteItem = () => {
    setDeleteTimeoutId(setTimeout(deleteItem, 3000));
    setIsDeleteMode(true);
  };

  /**
   * Transform component to update mode.
   */
  const attemptUpdateItem = () => {
    setIsUpdateMode(true);
  };

  return (
    <div className='group flex justify-between w-full my-2'>
      {isUpdateMode ? (
        <EditableTodoItem
          value={props.value}
          onCancel={cancelUpdateItem}
          onSubmit={updateItem}
        />
      ) : (
        <div className='flex flex-row items-center w-full rounded-lg hover:bg-primary'>
          <TodoItemCheckbox
            isChecked={isDeleteMode}
            onClick={isDeleteMode ? cancelDeleteItem : attemptDeleteItem}
          />
          <label className='flex-grow overflow-auto'>{props.value}</label>
          <div className='flex invisible group-hover:visible'>
            <IconButton onClick={attemptUpdateItem} icon={<Edit />} />
            {/* Don't include add subitem button on subitems */}
            {props.subitemId === undefined && (
              <IconButton onClick={createSubitem} icon={<Plus />} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
