import { CheckLg } from 'react-bootstrap-icons';

import type { MouseEventHandler } from 'react';

interface TodoItemCheckboxProps {
  /**
   * True when the item is checked.
   */
  isCheckActive?: boolean;

  /**
   * True when the item is checked.
   */
  isChecked?: boolean;

  /**
   * When true, use default (arrow) cursor.
   */
  isDisabled?: boolean;

  /**
   * Callback function for the button click event.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function TodoItemCheckbox({ onClick, ...props }: TodoItemCheckboxProps) {
  const isCheckActive = !!props.isCheckActive;
  const isChecked = !!props.isChecked;
  const isDisabled = !!props.isDisabled;
  const className = 'flex items-center justify-center w-5 h-5 rounded-full';

  return (
    <div className={`flex items-center justify-center mx-1 border rounded-full select-none min-h-7 max-h-7 min-w-7 max-w-7${isChecked ? ' border-gray-100' : ' border-gray-200'}`}>
      {!isDisabled ? (
        <button
          className={`${className}${isCheckActive ? ' bg-teal-400 hover:bg-teal-200' : ' hover:bg-teal-100'}`}
          type='button'
          title={`Mark Item as ${isChecked ? 'Inc' : 'C'}omplete!`}
          onClick={onClick}
        >
          <CheckLg className={isCheckActive ? 'fill-white' : 'fill-gray-300 hover:fill-white'} />
        </button>
      ) : (
        <span className={className}></span>
      )}
    </div>
  );
}
