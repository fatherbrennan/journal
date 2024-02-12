import { useEffect, useState } from 'react';
import { PersonCheck, PersonX, SortAlphaDown, SortAlphaDownAlt } from 'react-bootstrap-icons';

import { Button, Card, EditableCard, FilterBar, Heading, ItemCounter, PaginationBar, Searchbar, StatefulIconButton } from '~/components';
import { Db } from '~/db/utils';
import { usePagination } from '~/hooks';
import { Fields } from '~/utils';

import type { Contact } from '~/db/schema/contacts';
import type { SQLOrderKeys } from '~/db/utils';

interface ContactFormData {
  title: string;
  nickname: string;
  firstName: string;
  lastName: string;
  notes: string;
  status: boolean;
}

export function Contacts() {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [doShowInactive, setDoShowInactive] = useState(false);
  const [order, setOrder] = useState<SQLOrderKeys>('asc');
  const [search, setSearch] = useState('');
  const { activePage, count, items, itemsPerPage, pageNumbers, rangeMin, rangeMax, handleDbResponse, onPage, onPrev, onNext } =
    usePagination<Awaited<ReturnType<typeof Db.getContacts>>['result']>();
  const fields = new Fields([
    { key: 'title', label: 'Title', type: 'string', hasCard: false, required: true, isHtml: true, autoFocus: true },
    { key: 'nickname', label: 'Nickname', type: 'string', required: true, isHtml: true, cardIsSrOnly: false },
    { key: 'firstName', label: 'First Name', type: 'string', required: true, isHtml: true, cardIsSrOnly: false },
    { key: 'lastName', label: 'Last Name', type: 'string', required: true, isHtml: true, cardIsSrOnly: false },
    { key: 'notes', label: 'Notes', type: 'note', cardIsSrOnly: false },
    { key: 'status', label: 'Active Status', type: 'boolean', value: true, cardIsSrOnly: false },
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
   * Delete item.
   * @param id Item identifier.
   */
  const deleteItem = async (id: Contact['id']) => {
    await Db.deleteContact(id);
    getContacts();
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = async (data: ContactFormData, id: Contact['id']) => {
    await Db.updateContact(id, data);
    getContacts();
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = async (data: ContactFormData) => {
    await Db.createContact(data);
    getContacts();
    setIsCreateMode(false);
  };

  /**
   * Get contact items based on order and search.
   */
  const getContacts = () => {
    Db.getContacts({
      activePage,
      itemsPerPage,
      order,
      search,
      doShowInactive,
    }).then(handleDbResponse);
  };

  // Force refresh of visible entries on context update
  useEffect(getContacts, [activePage, itemsPerPage, order, search, doShowInactive]);

  return (
    <>
      <Heading value='Contacts' />
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
          <StatefulIconButton
            activeTitle='Hide inactive contacts!'
            inactiveTitle='Show inactive contacts!'
            inactiveIcon={<PersonCheck />}
            activeIcon={<PersonX />}
            onActive={() => setDoShowInactive(false)}
            onInactive={() => setDoShowInactive(true)}
          />
        </FilterBar>
        <ItemCounter itemCount={count} />
      </div>
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard fields={fields.get()} title='Create Contact' onCancel={closeCreateMode} onSubmit={createItem} />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {items.map((item) => (
          <Card key={item.id} fields={fields.get(item)} editableTitle='Update Entry' isTitleHtml title={item.title} item={item} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
        <PaginationBar activePage={activePage} pageNumbers={pageNumbers} rangeMin={rangeMin} rangeMax={rangeMax} onPage={onPage} onPrev={onPrev} onNext={onNext} />
      </div>
    </>
  );
}
