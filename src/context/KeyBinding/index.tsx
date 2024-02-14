import { createContext } from 'react';

import type { Context, FC, PropsWithChildren } from 'react';

export const AppStates = {
  hasFocusInField: 'hasFocusInField',
} as const;

const appStates = {
  hasFocusInField: false,
};

export type AppStatesType = typeof appStates;

export type AppStatesKeys = keyof AppStatesType;

export interface KeyBindingObject extends AppStatesType {
  key?: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
}

export interface KeyBindingCreateObject extends KeyBindingObject {
  handler: (event: KeyboardEvent) => void;
}

type KeyBindingAppState = (appState: AppStatesKeys, value?: boolean) => void;

type KeyBindingAdd = (keyBindings: KeyBindingCreateObject[]) => void;

type KeyBindingRemove = (keyBindings: KeyBindingCreateObject[]) => void;

type KeyBindings = { [binding: string]: KeyBindingCreateObject['handler'] };

interface KeyBindingContextType {
  setAppState: KeyBindingAppState;
  setKeyBindings: KeyBindingAdd;
  deleteKeyBindings: KeyBindingRemove;
}

// Initialize context
const context: KeyBindingContextType = {
  setAppState: () => {},
  setKeyBindings: () => {},
  deleteKeyBindings: () => {},
};

export const KeyBindingContext: Context<KeyBindingContextType> = createContext<KeyBindingContextType>(context);

export const KeyBindingContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const bindings: KeyBindings = Object.create(null);
  const Code = {
    altKey: 'ak',
    ctrlKey: 'ck',
    metaKey: 'mk',
    shiftKey: 'sk',
    ...AppStates,
  } as const;
  let lastEventListener: ((event: KeyboardEvent) => void) | null = null;

  const encode = ({ key, ...codes }: KeyBindingObject): string => {
    // const getCode = (code: keyof typeof Code) => (!!codes[code] ? Code[code] : '');
    // return (key ?? '') + getCode('altKey') + getCode('ctrlKey') + getCode('metaKey') + getCode('shiftKey') + getCode('hasFocusInField');

    let code = key ? key + '|' : '';

    Object.entries(codes).forEach(([key, useKey]) => {
      useKey && (code += Code[key as keyof Omit<KeyBindingObject, 'key'>] + '|');
    });

    return code;
  };

  const setListener = () => {
    if (lastEventListener) {
      window.removeEventListener('keydown', lastEventListener);
    }

    lastEventListener = (event: KeyboardEvent) => {
      const { altKey, ctrlKey, metaKey, shiftKey, key } = event;
      const handler = bindings[encode({ altKey, ctrlKey, metaKey, shiftKey, key, ...appStates })];
      handler && handler(event);
    };

    window.addEventListener('keydown', lastEventListener);
  };

  const setAppState: KeyBindingAppState = (appState, value) => {
    appStates[appState] = !!value;
    setListener();
  };

  const setKeyBindings: KeyBindingAdd = (keyBindings) => {
    for (let i = 0; i < keyBindings.length; i++) {
      const { handler, ...codes } = keyBindings[i];
      bindings[encode(codes)] = handler;
    }
    setListener();
  };

  const deleteKeyBindings: KeyBindingRemove = (keyBindings) => {
    for (let i = 0; i < keyBindings.length; i++) {
      const { handler: _handler, ...codes } = keyBindings[i];
      delete bindings[encode(codes)];
    }
    setListener();
  };

  // Populate context
  const context: KeyBindingContextType = {
    setAppState,
    setKeyBindings,
    deleteKeyBindings,
  };

  return <KeyBindingContext.Provider value={context}>{children}</KeyBindingContext.Provider>;
};
