import { useState } from 'react';

import type { ChangeEvent } from 'react';

import type { FormGroupSharedProps } from './FormGroup';

interface InputToggleAttributes extends FormGroupSharedProps {
  /**
   * `<input type="checkbox" />` `checked` attribute.
   */
  checked: boolean;
}

export function InputToggle({ formHandler, id, label, autoFocus, checked, required }: InputToggleAttributes) {
  const [check, setCheck] = useState<boolean>(checked);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCheck(newValue);
    formHandler(id, newValue);
  };

  return (
    <input
      id={id}
      title={label}
      className="h-6 w-11 appearance-none rounded-full border-none bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] checked:bg-teal-300 checked:bg-none checked:after:translate-x-full hover:checked:bg-teal-300 focus:checked:bg-teal-300 focus:hover:checked:bg-teal-300"
      type='checkbox'
      checked={check}
      autoFocus={autoFocus}
      required={required}
      onChange={onChange}
    />
  );
}
