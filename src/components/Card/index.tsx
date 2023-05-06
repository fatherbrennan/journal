import { useState } from 'react';

import { EditableCard, IconButton } from '..';
import { Bin, Check, Edit, X } from '../../icons';

import type { Field, PlainObject } from '../../../types/types';

interface CardProps {
  /**
   * Field options.
   */
  fields: Array<Field>;

  /**
   * Editable card title (on update).
   */
  editableTitle: string;

  /**
   * Card title.
   */
  title: string;

  /**
   * Item data. Item to be indexed by `fields[number].key`.
   */
  item: PlainObject<any>;

  /**
   * Callback function to execute on delete event.
   * @param id Unique identifier.
   */
  onDelete: (id: string) => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param id Unique identifier.
   */
  onUpdate: (data: any, id: string) => void;
}

export default function Card(props: CardProps) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  /**
   * Delete item.
   */
  const deleteItem = () => {
    props.onDelete(props.item._id);
  };

  /**
   * Update item.
   * @param data Data from form as key:value.
   */
  const updateItem = (data: any) => {
    props.onUpdate(data, props.item._id);
    setIsUpdateMode(false);
  };

  /**
   * Attempt to update item.
   * Modify card state to editable.
   */
  const attemptUpdateItem = () => {
    setIsUpdateMode(true);
  };

  /**
   * Cancel attempt to update item.
   * Modify editable card state to card.
   */
  const cancelUpdateItem = () => {
    setIsUpdateMode(false);
  };

  return isUpdateMode ? (
    <EditableCard
      fields={props.fields}
      title={props.editableTitle}
      onSubmit={updateItem}
      onCancel={cancelUpdateItem}
    />
  ) : (
    <div className='group w-full max-w-7xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 mb-8 overflow-auto'>
      <div className='flex justify-between mb-3'>
        {props.title && (
          <h5 className='mb-0 text-base font-semibold text-gray-900 md:text-xl'>
            {props.title}
          </h5>
        )}
        <div className='flex flex-row invisible group-hover:visible'>
          {isDeleteMode ? (
            <>
              <IconButton onClick={deleteItem} icon={<Check />} />
              <IconButton onClick={() => setIsDeleteMode(false)} icon={<X />} />
            </>
          ) : (
            <>
              <IconButton onClick={attemptUpdateItem} icon={<Edit />} />
              <IconButton
                onClick={() => setIsDeleteMode(true)}
                icon={<Bin />}
              />
            </>
          )}
        </div>
      </div>
      {props.fields.map(
        (field) =>
          (field.hasCard || field.hasCard === undefined) && (
            <div key={field.key} className='text-sm'>
              <label
                className={
                  field.cardIsSrOnly === false
                    ? 'text-gray-600 font-semibold mt-2 block'
                    : 'sr-only'
                }
              >
                {field.label}
              </label>
              <p className='text-gray-500 font-normal whitespace-pre-line'>
                {props.item[field.key] === true ||
                props.item[field.key] === false
                  ? props.item[field.key]
                    ? 'Active'
                    : 'Inactive'
                  : props.item[field.key]}
              </p>
            </div>
          )
      )}
    </div>
  );
}
