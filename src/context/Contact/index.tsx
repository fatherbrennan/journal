import { createContext, useEffect, useState } from 'react';

import { SearchStore, fsInitFromFile, fsWriteFile } from '../../utils';

import type {
  Context,
  ContextProvider,
  StoreContainer,
} from '../../../types/types';

export interface ContactItem {
  /**
   * First name.
   */
  firstName: string;

  /**
   * Last name.
   */
  lastName?: string;

  /**
   * Nickname.
   * Used as the tagname.
   */
  nickname: string;

  /**
   * Contact related notes.
   */
  notes: string;

  /**
   * Is the contact active.
   */
  status: boolean;

  /**
   * Contact title/position.
   */
  title: string;
}

/**
 * Contact context type.
 */
type ContactContextType = SearchStore<ContactItem>;

// Get contact file contents and the absolute path to the contact file
const [contactData, contactPath] = await fsInitFromFile<
  StoreContainer<ContactItem>
>('contact.json', []);

// Initialize context
const context: ContactContextType = new SearchStore();

export const ContactContext: Context<ContactContextType> =
  createContext(context);

export const ContactContextProvider: ContextProvider = ({ children }) => {
  const [store, setStore] = useState(contactData);

  // Populate context
  const context: ContactContextType = new SearchStore({
    setStore,
    store,
    searchKeys: ['nickname', 'title', 'firstName', 'lastName'],
  });

  useEffect(() => {
    // Update file every time store is updated
    fsWriteFile(contactPath, store);
  }, [store]);

  return (
    <ContactContext.Provider value={context}>
      {children}
    </ContactContext.Provider>
  );
};
