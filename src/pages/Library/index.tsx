import { useEffect, useState } from 'react';
import { SortAlphaDown, SortAlphaDownAlt } from 'react-bootstrap-icons';

import { Button, Card, EditableCard, FilterBar, Heading, ItemCounter, Searchbar, StatefulIconButton } from '~/components';
import { Library } from '~/db/schema/library';
import { Db } from '~/db/utils/db';
import { usePagination } from '~/hooks';
import { Fields } from '~/utils';

import type { SQLOrderKeys } from '~/db/utils';

interface LibraryFormData {
  label: string;
  value: string;
}

export function Library() {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [order, setOrder] = useState<SQLOrderKeys>('asc');
  const [search, setSearch] = useState('');
  const { activePage, count, items, itemsPerPage, handleDbResponse, onPage, onPrev, onNext, totalPages } = usePagination<Awaited<ReturnType<typeof Db.getLibrary>>['result']>();
  const fields = new Fields([
    { key: 'label', label: 'Label', required: true, isHtml: true, hasCard: false, autoFocus: true },
    { key: 'value', label: 'Value', required: true, type: 'note' },
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
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = async (data: LibraryFormData) => {
    await Db.createLibrary(data);
    getLibrary();
    setIsCreateMode(false);
  };

  /**
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = async (id: Library['id']) => {
    await Db.deleteLibrary(id);
    getLibrary();
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = async (data: LibraryFormData, id: Library['id']) => {
    await Db.updateLibrary(id, data);
    getLibrary();
  };

  /**
   * Get library items based on order and search.
   */
  const getLibrary = () => {
    Db.getLibrary({
      activePage,
      itemsPerPage,
      order,
      search,
    }).then(handleDbResponse);
  };

  // Force refresh of visible entries on context update
  useEffect(getLibrary, [activePage, itemsPerPage, order, search]);

  return (
    <>
      <Heading value='Library' />
      <Searchbar handler={setSearch} />
      <div className='flex flex-row justify-between'>
        <FilterBar>
          <StatefulIconButton
            activeTitle='Sort by label descending!'
            inactiveTitle='Sort by label ascending!'
            activeIcon={<SortAlphaDownAlt />}
            inactiveIcon={<SortAlphaDown />}
            onActive={() => setOrder('asc')}
            onInactive={() => setOrder('desc')}
          />
        </FilterBar>
        <ItemCounter itemCount={count} />
      </div>
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard fields={fields.get()} title={'Create Item'} onSubmit={createItem} onCancel={closeCreateMode} />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {items.map((item) => (
          <Card key={item.id} editableTitle='Update Item' fields={fields.get(item)} item={item} isTitleHtml title={item.label} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
      </div>
    </>
  );
}
