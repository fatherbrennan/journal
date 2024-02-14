import { useEffect, useId, useRef, useState } from 'react';

import { AppStates } from '~/context/KeyBinding';
import { useKeybinding } from '~/hooks';
import { Search } from '~/icons';

import type { ChangeEvent } from 'react';

import type { KeyBindingCreateObject } from '~/context';

interface SearchbarProps {
  /**
   * Callback function to execute on change events.
   * @param data Data from form as key:value.
   * @param event Change event.
   */
  handler: (data: string, event: any) => void;
}

export function Searchbar({ handler }: SearchbarProps) {
  const [value, setValue] = useState<string>('');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { deleteKeyBindings, setKeyBindings, setAppState } = useKeybinding();
  const id = useId();

  /**
   * Remove running timeout if one exists.
   */
  const clearTimeoutById = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };

  /**
   * Update the latest input value, and fire passed `onChange` event after short period to avoid hitting database excessively.
   * @param event Change event.
   */
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target;
    setValue(value);

    clearTimeoutById();

    // Adding to a Set removes duplicate strings
    const uniqueSearchWords = [...new Set(value.match(/\w+/g) || [])].map((word) => word + '*').join(' ');

    setTimeoutId(window.setTimeout(() => handler(uniqueSearchWords, event), 200));
  };

  useEffect(() => {
    const bindings: KeyBindingCreateObject[] = [
      {
        key: '/',
        hasFocusInField: false,
        handler: (event) => {
          event.preventDefault();
          inputRef.current?.focus();
        },
      },
      {
        key: 'Escape',
        hasFocusInField: true,
        handler: (event) => {
          event.preventDefault();
          inputRef.current?.blur();
        },
      },
    ];

    setKeyBindings(bindings);

    return () => deleteKeyBindings(bindings);
  }, []);

  // Clear existing timeout if the component is unloaded
  useEffect(() => () => clearTimeoutById(), []);

  return (
    <div className='flex flex-col items-center w-full mb-6'>
      <form
        className='flex items-center w-2/3 max-w-xl'
        onSubmit={(event) => {
          event.preventDefault();
          handler(value, event);
        }}
      >
        <label htmlFor={id} className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>{<Search />}</div>
          <input
            ref={inputRef}
            type='text'
            id={id}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 '
            placeholder='Search'
            value={value}
            onChange={onChange}
            onFocus={() => setAppState(AppStates.hasFocusInField, true)}
            onBlur={() => setAppState(AppStates.hasFocusInField, false)}
          />
        </div>
      </form>
    </div>
  );
}
