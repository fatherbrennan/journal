import DomPurify from 'dompurify';
import { useState } from 'react';

import { EditableCard, IconButton } from '~/components';
import { Bin, Bookmark, BookmarkFill, Check, Edit, X } from '~/icons';

import type { Field, PlainObject } from '~/../types/types';

interface CardPropsShared {
  /**
   * Field options.
   */
  fields: Field[];

  /**
   * Editable card title (on update).
   */
  editableTitle: string;

  /**
   * Card title.
   */
  title: string;

  /**
   * If title is HTML.
   */
  isTitleHtml?: boolean;

  /**
   * Item data. Item to be indexed by `fields[number].key`.
   */
  item: PlainObject<any>;

  /**
   * Callback function to execute on delete event.
   * @param id Unique identifier.
   */
  onDelete: (id: number) => void;

  /**
   * Callback function to execute on submit event.
   * @param data Data from form as key:value.
   * @param id Unique identifier.
   */
  onUpdate: (data: any, id: number) => void;
}

interface CardProps extends CardPropsShared {
  bookmark?: {
    /**
     * @default false
     */
    isBookmarked: boolean;
    onBookmark: () => void;
  };
}

export function Card({ editableTitle, fields, bookmark, item, isTitleHtml, title, onDelete, onUpdate }: CardProps) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const isBookmarked = bookmark?.isBookmarked ?? false;

  const santitizeHtml = (html: string) => ({
    __html: DomPurify.sanitize(html, {
      ALLOWED_TAGS: ['mark'],
    }),
  });

  /**
   * Bookmark item.
   */
  const bookmarkItem = () => {
    bookmark!.onBookmark();
  };

  /**
   * Delete item.
   */
  const deleteItem = () => {
    onDelete(item.id);
  };

  /**
   * Update item.
   * @param data Data from form as key:value.
   */
  const updateItem = (data: any) => {
    onUpdate(data, item.id);
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
    <EditableCard fields={fields} title={editableTitle} onSubmit={updateItem} onCancel={cancelUpdateItem} />
  ) : (
    <div className='w-full p-4 mb-8 overflow-auto bg-white border border-gray-200 rounded-lg shadow group max-w-7xl sm:p-6'>
      <div className='flex justify-between mb-3'>
        {title && (
          <h5
            className={`mb-0 text-base font-semibold text-gray-900 md:text-xl${isTitleHtml ? ' *:text-teal-400 *:bg-transparent' : ''}`}
            {...(isTitleHtml ? { dangerouslySetInnerHTML: santitizeHtml(title) } : { children: title })}
          />
        )}

        <div className='flex flex-row invisible group-hover:visible'>
          {isDeleteMode ? (
            <>
              <IconButton onClick={deleteItem} icon={<Check />} />
              <IconButton onClick={() => setIsDeleteMode(false)} icon={<X />} />
            </>
          ) : (
            <>
              {bookmark && <IconButton onClick={bookmarkItem} icon={isBookmarked ? <BookmarkFill /> : <Bookmark />} />}
              <IconButton onClick={attemptUpdateItem} icon={<Edit />} />
              <IconButton onClick={() => setIsDeleteMode(true)} icon={<Bin />} />
            </>
          )}
        </div>
      </div>
      {fields.map(
        (field) =>
          (field.hasCard || field.hasCard === undefined) && (
            <div key={field.key} className='text-sm'>
              {field.isHtml ? (
                <>
                  <label
                    className={field.cardIsSrOnly === false ? 'text-gray-600 font-semibold mt-2 block *:text-teal-400 *:bg-transparent' : 'sr-only'}
                    dangerouslySetInnerHTML={santitizeHtml(item[field.key])}
                  ></label>
                  <p className='font-normal text-gray-500 whitespace-pre-line *:text-teal-400 *:bg-transparent' dangerouslySetInnerHTML={santitizeHtml(item[field.key])}></p>
                </>
              ) : (
                <>
                  <label className={field.cardIsSrOnly === false ? 'text-gray-600 font-semibold mt-2 block' : 'sr-only'}>{field.label}</label>
                  <p className='font-normal text-gray-500 whitespace-pre-line'>
                    {typeof item[field.key] === 'boolean' ? (item[field.key] ? 'Active' : 'Inactive') : item[field.key]}
                  </p>
                </>
              )}
            </div>
          )
      )}
    </div>
  );
}
