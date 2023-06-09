import { useContext, useEffect, useState } from 'react';
import { SortAlphaDown, SortAlphaDownAlt } from 'react-bootstrap-icons';

import {
  Button,
  Card,
  EditableCard,
  FilterBar,
  Heading,
  ItemCounter,
  Searchbar,
} from '../../components';
import { LibraryContext } from '../../context';
import { Fields, sortAscending, sortDescending } from '../../utils';

import type { LibraryItem } from '../../context/Library';

export default function () {
  const library = useContext(LibraryContext);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isSortedByLabelFirst, setIsSortedByLabelFirst] = useState(true);
  // Track the last string searched
  const [lastSearch, setLastSearch] = useState('');
  const fields = new Fields<LibraryItem>([
    {
      key: 'label',
      label: 'Label',
      hasCard: false,
      required: true,
      autoFocus: true,
    },
    { key: 'value', label: 'Value', type: 'note', required: true },
  ]);

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
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = (data: any) => {
    library.create(data);
    setIsCreateMode(false);
  };

  /**
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = (id: string) => {
    library.delete(id);
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = (data: any, id: string) => {
    library.update(id, data);
  };

  // Force refresh of visible entries on context update
  useEffect(filterItems, [library.store]);

  return (
    <>
      <Heading value='Library' />
      <Searchbar onSubmit={filterItems} onChange={filterItems} />
      <div className='flex flex-row'>
        <div className='flex'>
          <FilterBar
            items={[
              {
                activeIcon: <SortAlphaDown />,
                inactiveIcon: <SortAlphaDownAlt />,
                setState: setIsSortedByLabelFirst,
                state: isSortedByLabelFirst,
              },
            ]}
          />
        </div>
        <ItemCounter itemCount={library.store.length} />
      </div>
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard
            fields={fields.get()}
            title={'Create Item'}
            onSubmit={createItem}
            onCancel={closeCreateMode}
          />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {(isSortedByLabelFirst ? sortAscending : sortDescending)(
          library.search(lastSearch),
          'label'
        ).map((item) => (
          <Card
            key={item._id}
            editableTitle='Update Item'
            fields={fields.get(item)}
            item={item}
            title={item.label}
            onDelete={deleteItem}
            onUpdate={updateItem}
          />
        ))}
      </div>
    </>
  );
}
