import { useState } from 'react';

import { IconButton } from '~/components';
import { Bin, Check, Edit, Plus, X } from '~/icons';
import { EditableTodoItem } from './EditableTodoItem';
import { TodoItemCheckbox } from './TodoItemCheckbox';

import type { Todos } from '~/db/schema/todos';
import type { TodoSubitem } from '~/db/schema/todos_subitems';

interface TodoItemProps {
  /**
   * To Do item unique identifier. Omitted on item creation.
   */
  id: Todos['id'] | TodoSubitem['id'];

  /**
   * Item value.
   */
  value: Todos['value'];

  /**
   * Should component act as a subitem.
   */
  isSubitem?: boolean;

  /**
   * Should component act as a checked item.
   */
  isChecked?: boolean;

  /**
   * Callback function to execute on create event.
   * Event fires when create subitem button is clicked.
   * @param id Unique identifier of todo item.
   */
  onCreate?: (id: Todos['id'] | TodoSubitem['id']) => void;

  /**
   * Callback function to execute on check event.
   * @param id Unique identifier of todo item.
   * @param checked Check value.
   */
  onCheck?: (id: Todos['id'] | TodoSubitem['id'], checked?: boolean) => void;

  /**
   * Callback function to execute on delete event.
   * @param id Unique identifier of todo item.
   */
  onDelete?: (id: Todos['id'] | TodoSubitem['id']) => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param id Unique identifier of todo item.
   */
  onSubmit: (data: any, id: Todos['id'] | TodoSubitem['id']) => void;
}

export function TodoItem({ id, value, isSubitem = false, isChecked = false, onCreate, onCheck, onDelete, onSubmit }: TodoItemProps) {
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [checkTimeoutId, setCheckTimeoutId] = useState<NodeJS.Timeout>();

  /**
   * Trigger create event for parent component.
   */
  const createSubitem = () => {
    onCreate!(id);
  };

  /**
   * Trigger delete event for parent component.
   */
  const deleteItem = () => {
    onDelete!(id);
  };

  /**
   * Trigger check event for parent component.
   */
  const checkItem = () => {
    onCheck!(id, !isChecked);
    setIsCheckMode(false);
  };

  /**
   * Cancel the check timeout.
   */
  const cancelCheckItem = () => {
    clearTimeout(checkTimeoutId);
    setCheckTimeoutId(undefined);
    setIsCheckMode(false);
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
    onSubmit(data, id);
    setIsUpdateMode(false);
  };

  /**
   * Set item to check mode.
   */
  const attemptCheckItem = () => {
    setCheckTimeoutId(setTimeout(checkItem, 3000));
    setIsCheckMode(true);
  };

  /**
   * Transform component to update mode.
   */
  const attemptUpdateItem = () => {
    setIsUpdateMode(true);
  };

  return (
    <div className='flex justify-between w-full my-2 group'>
      {isUpdateMode ? (
        <EditableTodoItem value={value} onCancel={cancelUpdateItem} onSubmit={updateItem} />
      ) : (
        <div className='flex flex-row items-center w-full rounded-lg hover:bg-primary'>
          <TodoItemCheckbox isChecked={isChecked} isCheckActive={isCheckMode} onClick={isCheckMode ? cancelCheckItem : attemptCheckItem} />
          <label className={`flex-grow overflow-auto${isChecked ? ' text-gray-400' : ''}`}>{value}</label>
          <div className='flex invisible group-hover:visible'>
            {isChecked ? (
              isDeleteMode ? (
                <>
                  <IconButton onClick={deleteItem} icon={<Check />} />
                  <IconButton onClick={() => setIsDeleteMode(false)} icon={<X />} />
                </>
              ) : (
                <IconButton onClick={() => setIsDeleteMode(true)} icon={<Bin />} />
              )
            ) : (
              <>
                <IconButton onClick={attemptUpdateItem} icon={<Edit />} />
                {!isSubitem && <IconButton onClick={createSubitem} icon={<Plus />} />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
