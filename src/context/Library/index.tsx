import { createContext, useEffect, useState } from 'react';

import { SearchStore, fsInitFromFile, fsWriteFile } from '../../utils';

import type {
  Context,
  ContextProvider,
  StoreContainer,
} from '../../../types/types';

export interface LibraryItem {
  /**
   * Label of data.
   */
  label: string;

  /**
   * Data.
   */
  value: string;
}

/**
 * Library context type.
 */
type LibraryContextType = SearchStore<LibraryItem>;

// Get library file contents and the absolute path to the library file
const [libraryData, libraryPath] = await fsInitFromFile<
  StoreContainer<LibraryItem>
>('library.json', []);

// Initialize context
const context: LibraryContextType = new SearchStore();

export const LibraryContext: Context<LibraryContextType> =
  createContext(context);

export const LibraryContextProvider: ContextProvider = ({ children }) => {
  const [store, setStore] = useState(libraryData);

  // Populate context
  const context: LibraryContextType = new SearchStore({
    setStore,
    store,
    searchKeys: ['label'],
  });

  useEffect(() => {
    // Update file every time store is updated
    fsWriteFile(libraryPath, store);
  }, [store]);

  return (
    <LibraryContext.Provider value={context}>
      {children}
    </LibraryContext.Provider>
  );
};
