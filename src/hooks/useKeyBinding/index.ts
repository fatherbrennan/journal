import { useContext } from 'react';

import { KeyBindingContext } from '~/context';

export const useKeybinding = () => {
  const context = useContext(KeyBindingContext);

  if (!context) {
    throw new Error('useKeybinding must be used within KeyBindingContext.Provider');
  }

  return context;
};
