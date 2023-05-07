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
import { ContactContext } from '../../context';
import { ContactItem } from '../../context/Contact';
import { Fields, sortAscending, sortDescending } from '../../utils';

export default function () {
  const contact = useContext(ContactContext);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isSortedByTitleFirst, setIsSortedByTitleFirst] = useState(true);
  // Track the last string searched
  const [lastSearch, setLastSearch] = useState('');
  const fields = new Fields<ContactItem>([
    {
      key: 'title',
      label: 'Title',
      type: 'string',
      hasCard: false,
      required: true,
      autoFocus: true,
    },
    {
      key: 'nickname',
      label: 'Nickname',
      type: 'string',
      required: true,
      cardIsSrOnly: false,
    },
    {
      key: 'firstName',
      label: 'First Name',
      type: 'string',
      required: true,
      cardIsSrOnly: false,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'string',
      required: true,
      cardIsSrOnly: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'note',
      cardIsSrOnly: false,
    },
    {
      key: 'status',
      label: 'Active Status',
      type: 'boolean',
      cardIsSrOnly: false,
    },
  ]);

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
    contact.delete(id);
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = (data: any, id: string) => {
    contact.update(id, data);
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = (data: any) => {
    contact.create(data);
    setIsCreateMode(false);
  };

  // Force refresh of visible entries on context update
  useEffect(filterItems, [contact.store]);

  return (
    <>
      <Heading value='Contacts' />
      <Searchbar onSubmit={filterItems} onChange={filterItems} />
      <div className='flex flex-row'>
        <div className='flex'>
          <FilterBar
            items={[
              {
                activeIcon: <SortAlphaDown />,
                inactiveIcon: <SortAlphaDownAlt />,
                setState: setIsSortedByTitleFirst,
                state: isSortedByTitleFirst,
              },
            ]}
          />
        </div>
        <ItemCounter itemCount={contact.search(lastSearch).length} />
      </div>
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard
            fields={fields.get()}
            title='Create Contact'
            onCancel={closeCreateMode}
            onSubmit={createItem}
          />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {(isSortedByTitleFirst ? sortAscending : sortDescending)(
          contact.search(lastSearch),
          'nickname'
        ).map((item) => (
          <Card
            key={item._id}
            fields={fields.get(item)}
            editableTitle='Update Entry'
            title={item.title}
            item={item}
            onDelete={deleteItem}
            onUpdate={updateItem}
          />
        ))}
      </div>
    </>
  );
}
