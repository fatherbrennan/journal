import { createContext, useEffect } from 'react';

import type { Context, FC, PropsWithChildren } from 'react';

export interface KeyBindingObject {
  key?: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  handler?: (event: KeyboardEvent) => void;
}

type KeyBindingAdd = (keyBindings: KeyBindingObject | KeyBindingObject[]) => void;

type KeyBindingRemove = (keyBindings: KeyBindingObject | KeyBindingObject[]) => void;

interface KeyBindingContextType {
  add: KeyBindingAdd;
  remove: KeyBindingRemove;
}

// Initialize context
const context: KeyBindingContextType = {
  add: () => {},
  remove: () => {},
};

export const KeyBindingContext: Context<KeyBindingContextType> = createContext<KeyBindingContextType>(context);

export const KeyBindingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  let bindings: { [binding: string]: KeyBindingObject['handler'] } = Object.create(null);
  const Code = {
    altKey: 'a',
    ctrlKey: 'c',
    metaKey: 'm',
    shiftKey: 's',
  } as const;

  const encode = ({ altKey, ctrlKey, metaKey, shiftKey, key }: KeyBindingObject): string => {
    return (!!altKey ? Code['altKey'] : '') + (!!ctrlKey ? Code['ctrlKey'] : '') + (!!metaKey ? Code['metaKey'] : '') + (!!shiftKey ? Code['shiftKey'] : '') + (key ?? '');
  };

  const add: KeyBindingAdd = (keyBindings) => {
    if (Array.isArray(keyBindings)) {
      for (let i = 0; i < keyBindings.length; i++) {
        bindings = { ...bindings, [encode(keyBindings[i])]: keyBindings[i].handler };
      }
    } else {
      bindings = { ...bindings, [encode(keyBindings)]: keyBindings.handler };
    }
  };

  const remove: KeyBindingRemove = (keyBindings) => {
    if (Array.isArray(keyBindings)) {
      for (let i = 0; i < keyBindings.length; i++) {
        delete bindings[encode(keyBindings[i])];
      }
    } else {
      delete bindings[encode(keyBindings)];
    }
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      const { altKey, ctrlKey, metaKey, shiftKey, key } = event;
      const handler = bindings[encode({ altKey, ctrlKey, metaKey, shiftKey, key })];
      handler && handler(event);
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, []);

  // Populate context
  const context: KeyBindingContextType = {
    add,
    remove,
  };

  return <KeyBindingContext.Provider value={context}>{children}</KeyBindingContext.Provider>;
};
