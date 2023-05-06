import { createContext, useEffect, useState } from 'react';

import { fsInitFromFile, fsWriteFile } from '../../utils';

import type {
  Context,
  ContextProvider,
  StoreContainer,
} from '../../../types/types';
import { JournalStore } from '../../utils';

export interface JournalItem {
  /**
   * Time value in milliseconds.
   */
  ts: number;

  /**
   * Formatted date string of `ts`.
   */
  date: string;

  /**
   * Journal entry notes for `date`.
   */
  notes: string;
}

/**
 * Journal context type.
 */
type JournalContextType = JournalStore;

// Get journal file contents and the absolute path to the journal file
const [journalData, journalPath] = await fsInitFromFile<
  StoreContainer<JournalItem>
>('journal.json', []);

// Initialize context
const context: JournalContextType = new JournalStore();

export const JournalContext: Context<JournalContextType> =
  createContext(context);

export const JournalContextProvider: ContextProvider = ({ children }) => {
  const [store, setStore] = useState(journalData);

  // Populate context
  const context: JournalContextType = new JournalStore({
    setStore,
    store,
    searchKeys: ['date', 'notes'],
  });

  useEffect(() => {
    // Update file every time store is updated
    fsWriteFile(journalPath, store);
  }, [store]);

  return (
    <JournalContext.Provider value={context}>
      {children}
    </JournalContext.Provider>
  );
};
