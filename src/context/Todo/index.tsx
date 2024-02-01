import { createContext, useState } from 'react';

import type { Context, Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

interface TodoContextType {
  isActive: boolean;
  itemCount: number;
  setItemCount: Dispatch<SetStateAction<number>>;
  toggleVisibility: () => void;
}

// Initialize context
const context: TodoContextType = {
  isActive: true,
  itemCount: 0,
  setItemCount: () => {},
  toggleVisibility: () => {},
};

export const TodoContext: Context<TodoContextType> = createContext<TodoContextType>(context);

export const TodoContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const toggleVisibility = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  // Populate context
  const context: TodoContextType = {
    isActive,
    itemCount,
    setItemCount,
    toggleVisibility,
  };

  return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>;
};
