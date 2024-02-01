import { useEffect, useState } from 'react';
import { CalendarCheck, CalendarX, SortNumericDown, SortNumericDownAlt } from 'react-bootstrap-icons';

import { Button, CalendarButton, Card, EditableCard, FilterBar, Heading, ItemCounter, PaginationBar, Searchbar, StatefulIconButton } from '~/components';
import { Db, date } from '~/db/utils';
import { usePagination } from '~/hooks';
import { DateUtils, Fields } from '~/utils';

import type { Journal } from '~/db/schema/journal';
import type { SQLDate, SQLOrderKeys } from '~/db/utils';

interface JournalFormData {
  /**
   * ISO date string (YYYY-MM-DD).
   */
  date: string;
  notes: string;
}

export function Dashboard() {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [order, setOrder] = useState<SQLOrderKeys>('desc');
  const [search, setSearch] = useState('');
  const [dateBefore, setDateBefore] = useState<SQLDate>();
  const [dateAfter, setDateAfter] = useState<SQLDate>();
  const { activePage, count, items, itemsPerPage, pageNumbers, rangeMin, rangeMax, handleDbResponse, onPage, onPrev, onNext } =
    usePagination<Awaited<ReturnType<typeof Db.getJournals>>['result']>();

  const fields = new Fields([
    { key: 'dateString', label: 'Date String', hasCard: false, hasForm: false, required: true },
    { key: 'date', label: 'Date', type: 'date', hasCard: false, isSrOnly: true, required: true },
    { key: 'notes', label: 'Notes', type: 'note', hasForm: true, isSrOnly: true, required: true, autoFocus: true, isHtml: true },
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
  const deleteItem = async (id: Journal['id']) => {
    await Db.deleteJournal(id);

    getJournals();
  };

  /**
   * Update item.
   * @param data Form submit data.
   * @param id Item identifier.
   */
  const updateItem = async (data: JournalFormData, id: Journal['id']) => {
    await Db.updateJournal(id, {
      date: date(data.date),
      notes: data.notes,
    });

    getJournals();
  };

  /**
   * Create a new item.
   * @param data Form submit data.
   */
  const createItem = async (data: JournalFormData) => {
    await Db.createJournal({
      ...data,
      date: date(data.date),
    });

    getJournals();
    setIsCreateMode(false);
  };

  /**
   * Get journal items based on order and search.
   */
  const getJournals = () => {
    Db.getJournals({
      activePage,
      itemsPerPage,
      order,
      search,
      dateBefore,
      dateAfter,
    }).then(handleDbResponse);
  };

  // Force refresh of visible entries on context update
  useEffect(getJournals, [activePage, itemsPerPage, order, search, dateBefore, dateAfter]);

  return (
    <>
      <Heading value='Log' />
      <Searchbar handler={setSearch} />
      <div className='flex flex-row justify-between'>
        <FilterBar>
          <StatefulIconButton
            activeTitle='Sort by latest!'
            inactiveTitle='Sort by oldest!'
            activeIcon={<SortNumericDown />}
            inactiveIcon={<SortNumericDownAlt />}
            onActive={() => setOrder('desc')}
            onInactive={() => setOrder('asc')}
          />
          <CalendarButton icon={<CalendarCheck />} label='Filter entries from start date!' handler={setDateBefore} />
          <CalendarButton icon={<CalendarX />} label='Filter entries from end date!' handler={setDateAfter} />
        </FilterBar>
        <ItemCounter itemCount={count} />
      </div>
      <div className='flex flex-col items-center'>
        {isCreateMode ? (
          <EditableCard
            fields={fields.get({
              date: DateUtils.ISO(),
            })}
            title={'Create Entry'}
            onSubmit={createItem}
            onCancel={closeCreateMode}
          />
        ) : (
          <Button onClick={toggleCreateMode}>Create</Button>
        )}
        {items.map((item) => (
          <Card
            key={item.id}
            fields={fields.get({
              date: DateUtils.ISO(Number(item.ts)),
              notes: item.notes,
            })}
            editableTitle='Update Entry'
            title={DateUtils.format(Number(item.ts))}
            item={item}
            onDelete={deleteItem}
            onUpdate={updateItem}
          />
        ))}
        <PaginationBar activePage={activePage} pageNumbers={pageNumbers} rangeMin={rangeMin} rangeMax={rangeMax} onPage={onPage} onPrev={onPrev} onNext={onNext} />
      </div>
    </>
  );
}
