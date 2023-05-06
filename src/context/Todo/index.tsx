import { createContext, useEffect, useState } from 'react';

import { fsInitFromFile, fsWriteFile, TodoStore } from '../../utils';

import type {
  Context,
  ContextProvider,
  StoreContainer,
} from '../../../types/types';

export interface TodoItemValue {
  /**
   * Data.
   */
  value: string;
}

export interface TodoItem extends TodoItemValue {
  /**
   * Array of subitems.
   */
  subItems: StoreContainer<TodoItemValue>;
}

/**
 * Todo context type.
 */
type TodoContextType = TodoStore;

// Get todo file contents and the absolute path to the todo file
const [todoData, todoPath] = await fsInitFromFile<StoreContainer<TodoItem>>(
  'todo.json',
  []
);

// Initialize context
const context: TodoContextType = new TodoStore();

export const TodoContext: Context<TodoContextType> = createContext(context);

export const TodoContextProvider: ContextProvider = ({ children }) => {
  const [store, setStore] = useState(todoData);
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Populate context
  const context: TodoContextType = new TodoStore({
    setStore,
    store,
    isActive,
    setIsActive,
    isFullscreen,
    setIsFullscreen,
  });

  useEffect(() => {
    // Update file every time store is updated
    fsWriteFile(todoPath, store);
  }, [store]);

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
};
