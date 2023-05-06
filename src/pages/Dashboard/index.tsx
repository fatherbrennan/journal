import { useContext, useEffect, useState } from 'react';

import {
  Button,
  Card,
  EditableCard,
  Heading,
  ItemCounter,
  Searchbar,
} from '../../components';
import { JournalContext } from '../../context';
import { JournalItem } from '../../context/Journal';
import { Fields } from '../../utils';

export default function () {
  const journal = useContext(JournalContext);
  const [isCreateMode, setIsCreateMode] = useState(false);
  // Track the last string searched
  const [lastSearch, setLastSearch] = useState('');
  const fields = new Fields<JournalItem>([
    {
      key: 'dateString',
      label: 'Date String',
      hasCard: false,
      hasForm: false,
      required: true,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      hasCard: false,
      isSrOnly: true,
      required: true,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'note',
      hasForm: true,
      isSrOnly: true,
      required: true,
      autoFocus: true,
    },
  ]);

  /**
   * Return an ISO date.
   * @param ts Timestamp. If omitted, use current date.
   * @returns Date formatted in ISO.
   */
  const dateISO = (ts?: number) => {
    return (ts === undefined ? new Date() : new Date(ts))
      .toISOString()
      .split('T')[0];
  };

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
   * Update visible items based on input pattern.
   * If `pattern` is omitted, the last known pattern is used.
   * @param pattern Filter string.
   */
  const filterItems = (pattern?: string) => {
    try {
      setLastSearch(pattern === undefined ? lastSearch : pattern);
    } catch (error) {
      // Avoid invalid regexp patterns e.g. `abc[`
      return;
    }
  };

  /**
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = (id: string) => {
    journal.delete(id);
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = (data: any, id: string) => {
    const date = new Date(data.date);
    journal.update(id, {
      date: journal.format(date),
      notes: data.notes,
      ts: date.getTime(),
    });
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = (data: any) => {
    const date = new Date(data.date);
    journal.create({
      date: journal.format(date),
      notes: data.notes,
      ts: date.getTime(),
    });
    setIsCreateMode(false);
  };

  // Force refresh of visible entries on context update
  useEffect(filterItems, [journal.store]);

  return (
    <>
      <Heading value='Log' />
      <Searchbar onSubmit={filterItems} onChange={filterItems} />
      <ItemCounter itemCount={journal.search(lastSearch).length} />
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard
            fields={fields.get({
              date: dateISO(),
            })}
            title={'Create Entry'}
            onSubmit={createItem}
            onCancel={closeCreateMode}
          />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {journal.search(lastSearch).map((item) => (
          <Card
            key={item._id}
            fields={fields.get({
              date: dateISO(item.ts),
              notes: item.notes,
            })}
            editableTitle='Update Entry'
            title={item.date}
            item={item}
            onDelete={deleteItem}
            onUpdate={updateItem}
          />
        ))}
      </div>
    </>
  );
}
