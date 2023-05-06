import { CheckLg } from 'react-bootstrap-icons';

import type { MouseEventHandler } from 'react';

interface TodoItemCheckboxProps {
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

export default function TodoItemCheckbox(props: TodoItemCheckboxProps) {
  const isChecked = !!props.isChecked;
  const isDisabled = !!props.isDisabled;

  return (
    <div className='select-none flex justify-center items-center min-h-7 max-h-7 min-w-7 max-w-7 rounded-full border border-gray-300 mx-1'>
      <button
        className={`flex items-center justify-center rounded-full h-5 w-5${
          isDisabled
            ? ' cursor-default'
            : isChecked
            ? ' bg-teal-400 hover:bg-teal-200'
            : ' hover:bg-teal-100'
        }`}
        type='button'
        title='Mark Item as Complete!'
        onClick={isDisabled ? undefined : props.onClick}
      >
        <CheckLg
          className={
            isChecked ? 'fill-white' : 'fill-gray-300 hover:fill-white'
          }
        />
      </button>
    </div>
  );
}
