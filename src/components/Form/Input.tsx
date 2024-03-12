import { useState } from 'react';

import { AppStates } from '~/context/KeyBinding';
import { useKeybinding } from '~/hooks';

import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

import type { FormGroupSharedProps } from './FormGroup';

interface InputAttributes extends FormGroupSharedProps {
  /**
   * HTML `<input>` type.
   */
  type: HTMLInputTypeAttribute;
}

export function Input({ formHandler, id, label, autoFocus, required, type, value }: InputAttributes) {
  const [text, setText] = useState(value?.toString() ?? '');
  const { setAppState } = useKeybinding();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    formHandler(id, newValue);
  };

  return (
    <input
      id={id}
      title={label}
      className='w-full px-2 py-1 text-sm font-normal text-gray-500 bg-transparent border border-transparent border-gray-100 rounded-xl hover:border-gray-300'
      type={type}
      value={text?.toString()}
      autoFocus={autoFocus}
      required={required}
      onChange={onChange}
      onFocus={() => setAppState(AppStates.hasFocusInField, true)}
      onBlur={() => setAppState(AppStates.hasFocusInField, false)}
    />
  );
}
